import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Prescription from '../Prescription/Prescription';

export default function PrescriptionList() {
  const [startDate, setStartDate] = useState(new Date());

  const medicines = [
    {
    medicineName: 'Tab - Napa 500mg',
    takenTime: 'After Meal',
    slot: '1+1+1',
    duration: '7 days'
    },
    {
      medicineName: 'Tab - Napa 500mg',
      takenTime: 'After Meal',
      slot: '1+1+1',
      duration: '7 days'
    },
    {
      medicineName: 'Tab - Clatrizol 500mg',
      takenTime: 'After Meal',
      slot: '1+1+1',
      duration: '7 days'
    },

];

 const advice = [
  'Take proper rest.',
  'Walking 30 minutes',
  'Water as much as 3 liters / day'
 ];

 const symptoms = [
  'Severe Fever',
  'Mild Headache',
  'Ensomnia'
 ]

 const tests = [
  'ECG Digital',
  'Ultrasonography: abdomen',
  'Echo: 600mhz'
 ]

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
