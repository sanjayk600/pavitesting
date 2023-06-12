import { React } from "react";
import { Navbar } from "../../components";
import { useStateValue } from "../../context/StateProvider";
import { Link } from "react-router-dom";
import "./style/style.css";

function LecturerDashboard() {
  const [{ user }, dispatch] = useStateValue();

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
          <Link to="/viewLectures" className="card">
            <div className="card-content">
              <i className="fas fa-calendar-alt fa-7x" />
              <div className="cardContentText">
                <br />
                <h2>Lecture Schedule</h2>
              </div>
            </div>
          </Link>
          <Link to="/feedback" className="card">
            <div className="card-content">
              <i className="fas fa-comment fa-7x" />
              <br />
              <br />

              <h2>View Feedback</h2>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LecturerDashboard;
