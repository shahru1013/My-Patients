import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Prescription from '../Prescription/Prescription';

export default function PrescriptionList() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="presc-list-head">

        <p className='title ps-title'>Previous Prescriptions</p>
       
        <div className="date-pick">
          <p>Pick a Date</p> 

         <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='d-picker'/>
        </div>

        <div className="pat-prescription">

            <Prescription/>

        </div>

    </div>
  )
}
