import React, { Component } from "react";
import "./mainbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileImage from "../Images/bluewater.jpg";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import DoctorIcon from "../Images/doctor_icon_1.png";
import InputBase from "@mui/material/InputBase";
import SearchBody from "../SearchBox/SearchBody";
import PatientDashboard from "../PatientDashboard/PatientDashboard";
import { connect } from "react-redux";
class Mainbody extends Component {
  constructor() {
    super();
    this.state = {};
  }
  /* Componentdidmount method */
  componentDidMount() {
    
  }

  /* Move to the clicked section with smooth scroll and change clicked buttons color*/
  navClickHandle(destinationId, clickedId) {
    let elem = document.getElementById("responsive-nav-id");

    if (this.state.navOpen) {
      elem.style.height = "0px";
    }
    setTimeout(() => {
     
    }, 300);
  }

  /* Responsive navbar open */
  responsiveNavOpen() {
    let elem = document.getElementById("responsive-nav-id");

    if (!this.state.navOpen) {
      elem.style.height = "100px";
    } else {
      elem.style.height = "0px";
    }
    this.setState({
      navOpen: !this.state.navOpen,
    });
  }

  // go to link
  goTo(link) {
    window.open(link, "_blank");
  }
  render() {
    return (
      <div className="main-body">
        <div className="body-resize">
          {/* Left Navbar start */}
          <div className="left-section">
            <img
              src={ProfileImage}
              alt="profile"
              style={{
                marginLeft: "20px",
                height: "95%",
                width: "auto",
                maxWidth: "100px",
                borderRadius: "50%",
                marginTop: "3px",
              }}
            />
            {/* Image and name section start */}
            <div className="img-name-sec">
              <p>Dr. Abdul Kashem</p>
            </div>

            {/*responsive navbar */}

            {/* Navbar section end */}
            <div className="social-section">
              <ul>
                <li id="nav-bars-res" onClick={() => this.responsiveNavOpen()}>
                  <FontAwesomeIcon icon={faBars} />
                </li>
                <li style={{ fontSize: "17px" }}>
                  <p>Appointments</p>{" "}
                </li>
              </ul>
            </div>
          </div>

          {/* Left Navbar end */}
          <div className="right-section">
            <div className="responsive-navbar" id="responsive-nav-id">
              <ul>
                {/* <img src={ProfileImage} alt="profile"/> */}
                <li
                  tabIndex="1"
                  onClick={() => this.navClickHandle("home", "li-home")}
                  id="li-home"
                >
                  Prepare a new prescription
                </li>
                <li
                  tabIndex="1"
                  onClick={() => this.navClickHandle("about-me", "li-about")}
                  id="li-about"
                >
                  Treat another patient
                </li>
              </ul>
            </div>
            {
              !this.props?.appData?.isDoctorDashboard &&
            <div className="search-me" id="search-me">
                 <SearchBody/>
             </div>
            }
            {
             this.props?.appData?.isDoctorDashboard &&
             <div className="patient-dashboard">
                 <PatientDashboard/>
             </div>
            }



             
             
             

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  console.log("state  y",state.AppData);
  return{
    appData: state.AppData
 }
}

export default connect(mapStateToProps)(Mainbody);
