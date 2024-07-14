package com.datn.westlakehotel.request;

import com.datn.westlakehotel.model.BookedRoom;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * @author Nguyen Van An
 */
@Data
@NoArgsConstructor
public class BookingRequest {
    private Integer roomId;
    private String guestFullName;
    private String guestEmail;
    private int numOfAdults;
    private int numOfChildren;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer price;

    public static BookedRoom toEntity(BookingRequest request){
        return BookedRoom.builder()
                .guestFullName(request.guestFullName)
                .guestEmail(request.guestEmail)
                .NumOfAdults(request.numOfAdults)
                .NumOfChildren(request.numOfChildren)
                .checkInDate(request.checkInDate)
                .checkOutDate(request.checkOutDate)
                .totalNumOfGuest(request.numOfAdults + request.numOfChildren)
                .build();
    }
}