import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Swal from "sweetalert2";
import LectureBox from "./LectureBox";
import { useStateValue } from "../../context/StateProvider";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");
jest.mock("../../context/StateProvider");

describe("LectureBox component", () => {
  const lectureProps = {
    id: 1,
    title: "Sample Lecture",
    date: "2023-06-11",
    time: "10:00 AM",
    lecturer: "John Doe",
    status: "pending",
    alreadyRegistered: false,
  };

  test("renders lecture details", () => {
    useStateValue.mockReturnValue([
      { user: { type: "lecturer" } },
      () => {}
    ]);
    render(<LectureBox {...lectureProps} />);

    //expect(screen.getByTestId(lectureProps.title)).toBeInTheDocument();
    //expect(screen.getByText(lectureProps.date)).toBeInTheDocument();
    //expect(screen.getByText(lectureProps.time)).toBeInTheDocument();
    //expect(screen.getByText(lectureProps.lecturer)).toBeInTheDocument();
    expect(screen.getByText("Status Pending")).toBeInTheDocument();
  });

  test("renders Accept button for lecturer when status is pending", () => {
    useStateValue.mockReturnValue([
      { user: { type: "lecturer" } },
      () => {}
    ]);

    render(<LectureBox {...lectureProps} />);

    expect(screen.getByText("Accept")).toBeInTheDocument();
  });

  test("does not render Accept button for student", () => {
    useStateValue.mockReturnValue([
      { user: { type: "student" } },
      () => {}
    ]);

    render(<LectureBox {...lectureProps} />);

    expect(screen.queryByText("Accept")).toBeNull();
  });

  test("registers for lecture when Register button is clicked", async () => {
    const user = { type: "student", studentrollno: "123456" };
    useStateValue.mockReturnValue([{ user }, () => {}]);

    const mockAxiosGet = axios.get.mockResolvedValueOnce({ data: {} });
    const mockSwalFire = jest.spyOn(Swal, "fire");

    render(<LectureBox {...lectureProps} />);

    await fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
        expect(mockAxiosGet).toHaveBeenCalledWith("http://localhost:8001/registerForLecture", {
            params: {
              docId: lectureProps.id,
              studentId: user.studentrollno,
            },
          });
      });


    await screen.findByText("Registered for lecture");
    await waitFor(() => {
        expect(mockSwalFire).toHaveBeenCalledWith({
            icon: "success",
            title: "Registered for lecture",
            showConfirmButton: false,
            timer: 1500,
          });
      });
    
  });
});
