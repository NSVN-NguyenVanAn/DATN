package com.datn.westlakehotel.config;

import com.datn.westlakehotel.exception.InvalidBookingRequestException;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Component
public class BookingStorageConfig {
    public static final long expiration = 15 * 60 * 1000;
    private Set<Session> sessions = new HashSet<>();

    public Session checkSessionAndCreateOrUpdate(String title, Object payload){
        if(Boolean.TRUE.equals(isExistSession(title))){
            Session session = getSession(title);
            if(isExpiredSession(session)){
                session.expiration = Instant.now().plusMillis(BookingStorageConfig.expiration);
            } else {
                Duration duration = Duration.between(Instant.now(), session.expiration);
                long interval = duration.getSeconds();

                StringBuilder stringBuilder = new StringBuilder("Không thể tạo phiên thanh toán liên tục, hãy thử lại sau ");
                if(interval < 60){
                    stringBuilder.append(interval).append(" giây!");
                } else {
                    stringBuilder.append(interval / 60).append(" phút!");
                }
                throw new InvalidBookingRequestException(stringBuilder.toString());
            }
        } else {
            addNewSession(title, payload);
        }

        return getSession(title);
    }

    public Session getSession(String title){
        return sessions.stream()
                .filter(s -> s.title.equals(title))
                .findFirst().orElse(null);
    }

    public boolean isExistSession(Session session){
        return sessions.stream().anyMatch(session::equals);
    }

    public boolean isExistSession(String title){
        return sessions.stream().anyMatch(s -> s.title.equals(title));
    }

    public boolean isExpiredSession (Session session){
        return Instant.now().isAfter(session.expiration);
    }

    public void addNewSession (String title, Object payload){
        if(Boolean.FALSE.equals(isExistSession(title))) {
            sessions.add(new Session(title, payload));
        }
    }

    public void removeSession (Session session){
        if(Boolean.TRUE.equals(isExistSession(session))){
            sessions.removeIf(session::equals);
        }
    }


    @Data
    public static class Session {
        private String title;
        private Object payload;
        private Instant expiration;

        public Session(Object payload) {
            this.title = "SESSION_PAYMENT_";
            this.expiration = Instant.now().plusMillis(BookingStorageConfig.expiration);
            this.payload = payload;
        }

        public Session(String title, Object payload) {
            this.title = title;
            this.expiration = Instant.now().plusMillis(BookingStorageConfig.expiration);
            this.payload = payload;
        }
    }
}