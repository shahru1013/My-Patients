import React, { Component } from "react";
import "./mainbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileImage from "../Images/bluewater.jpg";
import { faBars, faLocationArrow, faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";
import DoctorIcon from "../Images/doctor_icon_1.png";
import InputBase from "@mui/material/InputBase";
import SearchBody from "../SearchBox/SearchBody";
import PatientDashboard from "../PatientDashboard/PatientDashboard";
import { connect } from "react-redux";
import Prescription from "../Prescription/Prescription";
import { setIsDashBoardVisible, setIsNewPrescriptionVisible } from "../../redux-action/action";
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
    const { dispatch } = this.props;
     if(clickedId === "li-new-prescription"){
       dispatch(setIsNewPrescriptionVisible(true));
       dispatch(setIsDashBoardVisible(false));
     }

     if(clickedId === "li-dashboard"){
       dispatch(setIsNewPrescriptionVisible(false));
       dispatch(setIsDashBoardVisible(true));
     }

     if(clickedId === "li-treat-another"){
      dispatch(setIsNewPrescriptionVisible(false));
       dispatch(setIsDashBoardVisible(false));
     }

    }, 300);
  }

  /* Responsive navbar open */
  responsiveNavOpen() {
    let elem = document.getElementById("responsive-nav-id");

    if (!this.state.navOpen) {
      elem.style.height = "150px";
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
                  onClick={() => this.navClickHandle("prescription", "li-new-prescription")}
                  id="li-home"
                >
                  Prepare a new prescription
                </li>
                <li
                  tabIndex="1"
                  onClick={() => this.navClickHandle("treat", "li-treat-another")}
                  id="li-about"
                >
                  Treat another patient
                </li>

                <li
                  tabIndex="1"
                  onClick={() => this.navClickHandle("dash", "li-dashboard")}
                  id="li-about"
                >
                  Dashboard
                </li>
              </ul>
            </div>
            {
              (!this.props?.appData?.isDoctorDashboard && !this.props?.appData?.isNewPrescriptionVisible)  &&
            <div className="search-me" id="search-me">
                 <SearchBody/>
             </div>
            }
            {
             (this.props?.appData?.isDoctorDashboard && !this.props?.appData?.isNewPrescriptionVisible) &&
             <div className="patient-dashboard">
                 <PatientDashboard/>
             </div>
            }  

            {
             this.props?.appData?.isNewPrescriptionVisible &&
             <div className="patient-dashboard patient-dashboard-head" style={{marginTop: '100px'}}>
                 
                {<div className="patient-info">

                <p className='title'>Patient Information</p>

                <div className="patient-basic-info">
                      <div className="p-name">
                        <p>Daniel Hateru</p>
                        <span>{"37 yo (Male)"}</span>
                      </div>
                      <div className="p-address common-flex">
                          <FontAwesomeIcon className='fa-icon' style={{marginTop: '4px'}} icon={faLocationArrow}/>
                          <span>
                          <p>South city park, Melborne</p>
                          <p>Australia</p>
                          </span>
                      </div>
                      <div className="p-contact">

                          <div className="phohe common-flex">
                              <FontAwesomeIcon className='fa-icon' icon={faPhone}/>
                              <p>+880178723628768</p>
                          </div>

                          <div className="email common-flex">
                              <FontAwesomeIcon className='fa-icon' icon={faMailBulk}/>
                              <p>akjbkhvkv@bitb.com</p>
                          </div>
                      </div>
                </div>
                </div>}

                {
                  <div className="patient-info" style={{marginTop:'20px'}}>
                  <p className='title'>Basic Checkups</p>

                 <div className="patient-basic-info">

                  {<div className="basic-checkups">

                    <p style={{marginLeft: '20px', fontSize: '19px', textDecoration: 'underline'}}>Blood Pressure</p>
                    <div className="blood-pressure-input">

                     <div className="boxes">

                      <p>Systolic</p>

                     <input
                       title="mmHg"
                       type={"number"}
                       placeholder="mmHg"
                       required

                      />

                     </div>
                     <div className="boxes">
                       <p style={{height: '28px'}}></p>
                       <p style={{fontWeight: 'bold', fontSize: '25px'}}>{"/"}</p>
                     </div>

                     <div className="boxes">
                      

                      <p>Diastolic</p>

                     <input
                       title="mmHg"
                       type={"number"}
                       placeholder="mmHg"
                       required

                      />

                     </div>
                     </div>     

                  </div>}

                  
                  {/* {<div className="basic-checkups">

                    <p style={{marginLeft: '20px', fontSize: '19px', textDecoration: 'underline'}}>Body Temperature</p>
                    <div className="blood-pressure-input">

                     <div className="boxes">

                      <p>Temperature</p>

                     <input
                       title="bt"
                       type={"number"}
                       placeholder="degree"
                       required

                      />

                     </div>
                     </div>     

                  </div>} */}

                   {<div className="basic-checkups">

                    <p style={{marginLeft: '20px', fontSize: '19px', textDecoration: 'underline'}}>Body Temperature</p>
                    <div className="blood-pressure-input">

                     <div className="boxes">

                      <p>Temperature</p>

                     <input
                       title="bt"
                       type={"number"}
                       placeholder="degree"
                       required

                      />

                     </div>
                     </div>     

                  </div>}

                  
                  {<div className="basic-checkups">

                      <p style={{marginLeft: '20px', fontSize: '19px', textDecoration: 'underline'}}>Heart rate</p>
                      <div className="blood-pressure-input">

                      <div className="boxes">

                        <p>Rate/min</p>

                      <input
                        title="bt"
                        type={"number"}
                        placeholder="count"
                        required

                        />

                      </div>
                      </div>     

                      </div>}

                  </div>
                  </div>


                }

                 <Prescription
                  isEditable = {true}
                 />
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
