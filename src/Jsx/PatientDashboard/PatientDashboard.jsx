import { faGoodreads } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp, faLocationArrow, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux-action/action';
import BloodPressureChart from '../PatientCharts/BloodPressureChart';
import HeartBitChart from '../PatientCharts/HeartBitChart';
import PrescriptionList from '../PrevPrescriptions/PrescriptionList';
import './style.css';

export default function PatientDashboard(props) {
  const [patientData, setPatientData] = useState(null);
  const [user, setUser]=useState(null);
  const [activeCondition, setActiveCondition]=useState(null);
  const [lastAppointment, setLastAppointment] = useState(null);
  const [heartRate, setHeartRate] = useState(null)
  const [bloodP, setBloodP] = useState(null);
  const dispatch = useDispatch();

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
      console.log('prescrip omaga kkk 111',res, res.data, res.data?.length);
      if(res.data.prescriptions.length <= 0){
        return;
      }else{
  //       const labels = ['12-10-2022', '01-03-2023', '04-06-2023', '11-07-2023', '17-08-2023', '11-10-2023', '12-01-2022'];
  // const heartBit = [60, 65, 66, 63, 75, 82, 60];
//   const labels = ['12-10-2022', '01-03-2023', '04-06-2023', '11-07-2023', '17-08-2023', '11-10-2023', '12-01-2022'];
// const pressureUpper = [110, 125, 106, 127, 110, 109, 116];
// const pressureLower = [80, 85, 76, 83, 85, 82, 80];
        dispatch(setUserData(res.data.user));
        setPatientData(res.data.prescriptions);
        setUser(res.data.user);
        setLastAppointment(res.data.prescriptions[res.data.prescriptions?.length - 1]?.date);
        let levels = [], heartB = [], pUpper = [], pLower = [];
        res.data.prescriptions?.map((val)=>{
           levels.push(val?.date);
           heartB.push(val?.heart_rate || 0);
           pUpper.push(val?.diastolic);
           pLower.push(val?.systolic);
        });
        setHeartRate({
          levels: levels,
          heartBit: heartB
        })

        setBloodP({
          pressureUpper: pUpper,
          pressureLower: pLower,
          levels: levels
        })


      }
    }).catch((err)=>{
      console.log('omaga errrr',{err});
      alert('Error: Please try again! 222')
    })

  },[]);

  return (
    <div className='patient-dashboard-head'>
      {console.log('pdddddddd ',patientData, user)}

     { user?.id && <div className="patient-info">

          <p className='title'>Patient Information</p>

          <div className="patient-basic-info">
                <div className="p-name">
                   <p>{user?.first_name}</p>
                   <span>{user?.age + " yo (Male)"}</span>
                </div>
                <div className="p-address common-flex">
                    <FontAwesomeIcon className='fa-icon' style={{marginTop: '4px'}} icon={faLocationArrow}/>
                    <span>
                    {/* <p>South city park, Melborne</p>
                    <p>Australia</p> */}
                    <p>{user?.address}</p>
                    </span>
                </div>
                <div className="p-contact">

                     <div className="phohe common-flex">
                        <FontAwesomeIcon className='fa-icon' icon={faPhone}/>
                        <p>{user?.mobile}</p>
                     </div>

                     <div className="email common-flex">
                        <FontAwesomeIcon className='fa-icon' icon={faMailBulk}/>
                        <p>{user?.email}</p>
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
                       {new Date().toLocaleDateString()}
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
                           {lastAppointment}
                         </div>
                         {/* <div className="days">
                           176 days ago
                         </div> */}
                         
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
           {heartRate != null && <HeartBitChart val={heartRate}/>}
          </div>

          <div className="blood-pressure-chart chart-w">
            {bloodP != null && <BloodPressureChart val={bloodP}/>}
          </div>

          </div>

          <div className="prev-prescriptions">

           {patientData?.length && <PrescriptionList patientData={patientData}/>}

          </div>
          

      </div>
}
{
  !patientData?.length && <div style={{
    display: 'flex',
    justifyContent: 'center'
  }}>
    <h1>No patient Data Found!</h1>
  </div>
}
    </div>
  )
}
