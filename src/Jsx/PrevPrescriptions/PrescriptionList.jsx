import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Prescription from '../Prescription/Prescription';

export default function PrescriptionList(props) {
  const [startDate, setStartDate] = useState(new Date());
  const patientData = props?.patientData;

  
  console.log('pppp  dd ', patientData, props);
  const medicines = JSON.parse(patientData?.data[0]?.prescription);

 const advice = JSON.parse(patientData?.data[0]?.advice)

 const symptoms = []//JSON.parse(patientData?.data[0]?.symptoms)

 const tests = JSON.parse(patientData?.data[0]?.tests)

  return (
    <div className="presc-list-head">

        <p className='title ps-title'>Previous Prescriptions</p>
       
        <div className="date-pick">
          <p>Pick a Date</p> 

         <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='d-picker'/>
        </div>

        <div className="pat-prescription">

            <Prescription
             medicine = {medicines}
             advice = {advice}
             symptoms = {symptoms}
             tests = {tests}
             isEditable = {false}
            />

        </div>

    </div>
  )
}
