import { faGoodreads } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp, faLocationArrow, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import BloodPressureChart from '../PatientCharts/BloodPressureChart';
import HeartBitChart from '../PatientCharts/HeartBitChart';
import PrescriptionList from '../PrevPrescriptions/PrescriptionList';
import './style.css';

export default function PatientDashboard() {
  const [patientData, setPatientData] = useState(null);

  useEffect(()=>{

    const patientId = localStorage.getItem('p_id');

    axios(
      {
        method: 'GET',
        url: 'http://localhost:8080/get-prescriptions',
        params: {
          patientId: patientId
        }
      }
    ).then((res)=>{
      console.log('prescrip ', res.data, res.data?.length);
      setPatientData(res.data);
    }).catch((err)=>{
      alert('Error: Please try again!')
    })

  },[]);

  return (
    <div className='patient-dashboard-head'>

      <div className="patient-info">

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


          <p className='title ps-title'>Patient Summary</p>
          <div className="patient-summary">
                <div className="p-name">
                   <p className='ac-condition'>Active Conditions:</p>
                    
                    <div className='disease-list-body'>
                        
                        <div className="disease-list">

                           <div className="d-name">
                              Diabetes: 
                           </div>
                           <div className="d-summary">
                              Type 1 Diabates
                           </div>

                        </div>

                          <div className="disease-list">

                           <div className="d-name">
                              Ensomnia: 
                           </div>
                           <div className="d-summary">
                              Incomplete sleep
                           </div>

                        </div>
                        
                        <div className="disease-list">

                            <div className="d-name">
                              Tension Type: 
                            </div>
                            <div className="d-summary">
                              Mild
                            </div>
                            </div>

                    </div>
                   
                </div>
                <div className="p-address common-flex">
                    <span>
                    <p className='ac-condition'>Upcoming Appointments</p>
                     
                    <div className="last-appoint-head">
                  
                  <div className='last-appoint'>
                     <div className="date">
                       02 April 2022
                     </div>
                     <span>Srart Prescribing</span>
                  </div>

                  <FontAwesomeIcon className='fa-icon arrow-up' icon={faArrowUp}/>
              </div>

                    </span>
                </div>

                <div className="p-address common-flex">
                    <span>
                    <p className='ac-condition'>Last Appontment</p>

                    <div>
                 <div className="last-appoint-head">
                  
                      <div className='last-appoint'>
                         <div className="date">
                           12 March 2021
                         </div>
                         <div className="days">
                           176 days ago
                         </div>
                         
                         <span style={{border: '1px solid #A5A09F', backgroundColor: '#A5A09F', padding: '2px', textAlign: 'center'}}>Follow Up</span>
                      </div>

                      <FontAwesomeIcon className='fa-icon arrow-up' icon={faArrowUp}/>
                  </div>
                    </div>
                    </span>
                </div>
          </div>

          <div className="charts charts-1">

          <div className="heart-bit-chart chart-w">
            <HeartBitChart/>
          </div>

          <div className="blood-pressure-chart chart-w">
            <BloodPressureChart/>
          </div>

          </div>

          <div className="prev-prescriptions">

           {patientData && <PrescriptionList patientData={patientData}/>}

          </div>
          

      </div>

    </div>
  )
}
