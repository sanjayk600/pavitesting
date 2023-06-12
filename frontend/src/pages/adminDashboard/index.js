import { React, useEffect, useState } from "react";
import { Navbar, RoomManagement } from "../../components";
import { useStateValue } from "../../context/StateProvider";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./style/style.css";
import "./style/viewGuestLectures.css";

function AdminDashboard() {
  const [{ user }, dispatch] = useStateValue();
  const [LectureHalls, setLectureHalls] = useState([]);
  const [lecturerRequests, setLecturerRequests] = useState([]);
  const Swal = require("sweetalert2");

  useEffect(() => {
    axios.get("http://localhost:8001/lecturerRequests").then((res) => {
      setLecturerRequests(res.data);
    });
  }, []);

  async function approveLecturer(id) {
    const request = await axios.post(
      `http://localhost:8001/approveLecturer?id=${id}`
    );
    return request;
  }

  async function rejectLecturer(id) {
    const request = await axios.post(
      `http://localhost:8001/rejectLecturer?id=${id}`
    );
    return request;
  }

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("http://localhost:8001/lectureHalls");
      setLectureHalls(request.data);
      return request;
    }
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  let { id } = useParams();
  console.log(id);
  // return (
  //   <>
  //     <Navbar />
  //     <RoomManagement />
  //   </>
  // );
  if (!id) {
    return (
      <>
        <Navbar />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />

        <div className="content">
          {/* Cards */}
          <div className="card-container">
            <Link to="/2" className="card">
              <div className="card-content">
                <i className="fas fa-eye fa-7x" />
                <div className="cardContentText">
                  <br />
                  <h2>View Request</h2>
                </div>
              </div>
            </Link>
            <Link to="/viewLectures" className="card">
              <div className="card-content">
                <i className="fas fa-calendar-alt fa-7x" />
                <div className="cardContentText">
                  <br />
                  <h2>Lecture Schedule</h2>
                </div>
              </div>
            </Link>
            <div className="card">
              <div className="card-content">
                <i className="fas fa-comment fa-7x" />
                <br />
                <br />

                <h2>View Feedback</h2>
              </div>
            </div>
            <Link to="/1" className="room">
              <div className="card">
                <div className="card-content">
                  <i className="fas fa-building fa-7x" />
                  <br />
                  <br />
                  <h2>Hall Management</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  } else if (id == 1) {
    return (
      <>
        <Navbar />
        <RoomManagement rooms={LectureHalls} />
      </>
    );
  } else if (id == 2) {
    return (
      <>
        <Navbar />
        <br />
        <br />
        <br />

        <>
          <title>View Guest Lecture Requests</title>
          <div className="requests-container">
            {/* Guest Lecture Request 1 */}

            {lecturerRequests.map((request) => (
              <div className="request-box">
                <h2>Request Details</h2>
                <p>Request ID: {request?.id} </p>
                <p>Requester Name: {request.name}</p>
                <p>Requester Email: {request.email}</p>
                {/* ...Rest of the request details... */}
                <h2>Guest Speaker Information</h2>
                <p>Speaker Name: {request.name}</p>
                {/* ...Rest of the speaker information... */}
                {/* ...Rest of the sections... */}
                <h2>Status and Actions</h2>
                <p>Status: {request?.status || "pending"}</p>
                <button
                  className="action-button"
                  onClick={() => approveLecturer(request.id)}
                >
                  Approve
                </button>
                &nbsp; &nbsp;
                <button
                  className="action-button"
                  onClick={() => rejectLecturer(request.id)}
                >
                  Decline
                </button>
              </div>
            ))}
          </div>
        </>
      </>
    );
  }
}

export default AdminDashboard;
