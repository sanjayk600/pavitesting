import React from "react";
import { useStateValue } from "../../context/StateProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import LectureImage from "../../images/IMG_0347.jpg";
import "./style/style.css";
function LectureBox(props) {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    console.log(user);
  }, []);

  function acceptLectureRequest(id) {
    return function () {
      axios
        .get("http://localhost:8001/acceptLectureRequest", {
          params: {
            id: id,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Lecture request accepted",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    };
  }

  function registerForLecture(id) {
    axios
      .get("http://localhost:8001/registerForLecture", {
        params: {
          docId: id,
          studentId: user.studentrollno,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Registered for lecture",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  }

  return (
    <div className="lecture-box">
      <img src={LectureImage} alt={props.title} />
      <p data-testid="title">Title {props.title}</p>
      <p>Date {props.date}</p>
      <p>Time {props.time}</p>
      <p>Lecturer {props.lecturer}</p>
      {props.status == "pending" ? (
        <p>Status Pending</p>
      ) : (
        <p>Status Accepted</p>
      )}
      {/* <a href="#" className="register-button">
        Register
      </a> */}
      {user.type == "lecturer" && props.status == "pending" ? (
        <button
          className="AddLectureButton"
          onClick={acceptLectureRequest(props.id)}
        >
          Accept
        </button>
      ) : (
        <></>
      )}
      {user.type == "student" && !props.alreadyRegistered ? (
        <button
          className="register-button"
          onClick={() => registerForLecture(props.id)}
        >
          Register
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default LectureBox;
