package com.datn.westlakehotel.service;

import com.datn.westlakehotel.exception.InternalServerException;
import com.datn.westlakehotel.exception.ResourceNotFoundException;
import com.datn.westlakehotel.model.Room;
import com.datn.westlakehotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * @author Nguyen Van An
 */

@Service
@RequiredArgsConstructor
public class RoomService implements IRoomService {
    private final RoomRepository roomRepository;
    @Override
    public Room addNewRoom(MultipartFile file, String roomType, String roomNo, BigDecimal roomPrice, String roomDes) throws SQLException, IOException {
        if (roomNo != null ) {
            if (roomRepository.existsByRoomNo(roomNo)) {
                throw new InternalServerException("Số phòng đã tồn tại");
            }
        }
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomNo(roomNo);
        room.setRoomPrice(roomPrice);
        room.setRoomDes(roomDes);
        if (!file.isEmpty()){
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }
        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if(theRoom.isEmpty()){
            throw new ResourceNotFoundException("Sorry, Room not found!");
        }
        Blob photoBlob = theRoom.get().getPhoto();
        if(photoBlob != null){
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        return null;
    }

    @Override
    public void deleteRoom(Long roomId) {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if(theRoom.isPresent()){
            roomRepository.deleteById(roomId);
        }
    }

    @Override
    public Room updateRoom(Long roomId, String roomType, String roomNo, BigDecimal roomPrice, String roomDes, byte[] photoBytes) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        // Kiểm tra xem roomNo đã tồn tại trong cơ sở dữ liệu (trừ chính phòng hiện tại)
        if (roomNo != null && !roomNo.equals(room.getRoomNo())) {
            if (roomRepository.existsByRoomNo(roomNo)) {
                throw new InternalServerException("Số phòng đã tồn tại");
            }
        }

        if (roomType != null) room.setRoomType(roomType);
        if (roomNo != null) room.setRoomNo(roomNo);
        if (roomPrice != null) room.setRoomPrice(roomPrice);
        if (roomDes != null) room.setRoomDes(roomDes);
        if (photoBytes != null && photoBytes.length > 0) {
            try {
                room.setPhoto(new SerialBlob(photoBytes));
            } catch (SQLException ex) {
                throw new InternalServerException("Lỗi chỉnh sửa phòng");
            }
        }
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> getRoomById(Long roomId) {
        return Optional.of(roomRepository.findById(roomId).get());
    }

    @Override
    public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        return roomRepository.findAvailableRoomsByDatesAndType(checkInDate, checkOutDate, roomType);
    }

    @Override
    public boolean checkRoomAvailability(Long roomId, LocalDate checkInDate, LocalDate checkOutDate) {
        return !roomRepository.isRoomBooked(roomId, checkInDate, checkOutDate); // Sử dụng phương thức từ RoomRepository
    }

}
