package com.datn.westlakehotel.response;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author Nguyen Van An
 */
@Data
@NoArgsConstructor
public class RoomResponse {
    private Long id;

    private String roomType;
    private String roomNo;
    private BigDecimal roomPrice;
    private String roomDes;
    private boolean isBooked;
    private String photo;
    private List<BookingResponse>bookings;

    public RoomResponse(Long id, String roomType, String roomNo, BigDecimal roomPrice, String roomDes) {
        this.id = id;
        this.roomType = roomType;
        this.roomNo = roomNo;
        this.roomPrice = roomPrice;
        this.roomDes = roomDes;
    }

    public RoomResponse(Long id, String roomType, String roomNo, BigDecimal roomPrice, String roomDes, boolean isBooked,
                        byte[] photoBytes , List<BookingResponse> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomNo = roomNo;
        this.roomPrice = roomPrice;
        this.roomDes = roomDes;
        this.isBooked = isBooked;
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
       this.bookings = bookings;
    }

}
