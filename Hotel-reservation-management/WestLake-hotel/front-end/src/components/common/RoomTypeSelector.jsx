import React, { useState, useEffect } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes()
      .then((data) => {
        setRoomTypes(data);
      })
      .catch((error) => {
        console.error("Error fetching room types:", error);
      });
  }, []);

  return (
    <>
      <div>
        <select
          required
          className="form-select"
          name="roomType"
          onChange={(e) => {
            handleRoomInputChange(e); // Update the room type
          }}
          value={newRoom.roomType || ""} // Ensure default value is not empty or undefined
        >
          <option value="">Chọn một loại phòng</option>
          {roomTypes.filter((type) => type).map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default RoomTypeSelector;
