import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Swal from "sweetalert2";
import RoomManagement from "./RoomManagement";

jest.mock("axios");
jest.mock("sweetalert2");

describe("RoomManagement component", () => {
  test("should add a lecture hall", () => {
    render(<RoomManagement rooms={[]} />);

    // Mock the Swal.fire function to return a resolved promise with the provided values
    Swal.fire.mockResolvedValueOnce({ isConfirmed: true, value: {} });

    // Find and click the "Add Room" button
    const addRoomButton = screen.getByText("Add Room");
    fireEvent.click(addRoomButton);

    // Assert that the Swal.fire function was called
    expect(Swal.fire).toHaveBeenCalled();

    // Assert that the axios.post function was called with the expected data
    expect(axios.post).toHaveBeenCalledWith("http://localhost:8001/addLectureHall", {
      name: expect.any(String),
      capacity: expect.any(String),
      projectorCount: expect.any(String),
      speakersCount: expect.any(String),
      isAirConditioned: expect.any(String),
      computersCount: expect.any(String),
    });
  });

  test("should delete a lecture hall", () => {
    const mockRooms = [
      { id: 1, name: "Room 1", capacity: 50 },
      { id: 2, name: "Room 2", capacity: 100 },
    ];

    render(<RoomManagement rooms={mockRooms} />);

    // Mock the Swal.fire function to return a resolved promise with the provided values
    Swal.fire.mockResolvedValueOnce({ isConfirmed: true });

    // Find and click the "Delete" button for the first room
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Assert that the Swal.fire function was called
    expect(Swal.fire).toHaveBeenCalled();

    // Assert that the axios.get function was called with the expected URL
    expect(axios.get).toHaveBeenCalledWith("http://localhost:8001/deleteHall?id=1");
  });
});
