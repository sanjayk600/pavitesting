import React from "react";
import { useStateValue } from "../../context/StateProvider";
import { Link } from "react-router-dom";
import "./style/style.css";
import Swal from "sweetalert2";

function Navbar() {
  const [{ user }, dispatch] = useStateValue();
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos < currentScrollPos) {
      document.getElementsByClassName("navbar")[0].style.top = "-50px";
    } else {
      document.getElementsByClassName("navbar")[0].style.top = "0";
    }

    prevScrollpos = currentScrollPos;
  };

  var logout = () => {
    Swal.fire({
      iconColor: "red",
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Logout!", "You are logged out.", "success");
        logoutUser();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };
  var logoutUser = () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.clear();
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Lato"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="navbar">
        <div className="navInner">
          <Link to="/" className="navLink">
            HOME
          </Link>
          <Link to="/viewLectures" className="navLink">
            LECTURES
          </Link>

          <Link to="/feedback" className="navLink">
            FEEDBACK
          </Link>
          <Link to="" className="navLink">
            CONTACT
          </Link>

          <div className="navLink" onClick={logout}>
            LOG OUT
          </div>
          {/* <div className="navLink">{user.name}</div> */}
        </div>
      </div>
    </>
  );
}

export default Navbar;
