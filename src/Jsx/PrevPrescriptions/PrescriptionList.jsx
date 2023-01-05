import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Prescription from '../Prescription/Prescription';
import moment from 'moment/moment';

export default function PrescriptionList(props) {

  const [startDate, setStartDate] = useState(null);
  const [medicines, setMedicines] = useState({});
  const [advice, setadvice] = useState({});
  const [tests, setTests] = useState({});
  const [allDates, setAllDates] = useState([]);
  const [symptoms, setSymptoms] = useState({});

  const patientData = props?.patientData;
  console.log('pppp  dd ', patientData, props);
  





  useEffect(()=>{
    forMateData(props?.patientData);
    console.log('jfdhvj ', props?.patientData);
    setStartDate(new Date(moment(props?.patientData[0].date, 'DD/MM/YYYY')));
    setadvice(JSON.parse(patientData[0]?.advice || {}));
    // setMedicines(JSON.parse(patientData?.data[0]?.prescription || {}));
    setTests(JSON.parse(patientData[0]?.tests ||{}));
    setSymptoms(JSON.parse(patientData[0]?.symptoms || {}));
    let highLight = [];
    props?.patientData?.map((val)=>{
       highLight.push(new Date(moment(val?.date, 'DD/MM/YYYY')));
    })

    setAllDates(highLight);
    
  },[]);

  useEffect(()=>{
    forMateData(props?.patientData);
    console.log('baaaaaaaaaaaaaaaaa');
  },[startDate]);
  

 const forMateData=(data)=>{

  let selectedDate = moment(startDate).format('DD/MM/YYYY');

  data?.map((val)=>{
    console.log({selectedDate}, medicines);
    if(selectedDate == val?.date){
      console.log('fhjfsh ',val);
      setadvice(val?.advice?.length > 5 ?JSON.parse(val?.advice || {}) : []);
      setMedicines(val?.prescription?.length > 5 ? JSON.parse(val?.prescription):[]);

      setTests(val?.tests?.length > 5 ? JSON.parse(val?.tests) : []);
    
      setSymptoms(val?.symptoms?.length > 5 ?JSON.parse(val?.symptoms) : []);
      return;
    }
  })
  
  console.log('sttttt ',  moment(startDate).format('DD/MM/YYYY'), selectedDate);

 }



  console.log({allDates});
  return (
    <div className="presc-list-head">

        <p className='title ps-title'>Previous Prescriptions</p>
       
        <div className="date-pick">
          <p>Pick a Date</p> 

         <DatePicker  onChange={(date) => setStartDate(date)} className='d-picker'
          highlightDates={allDates}
          selected ={startDate}
          />
        </div>
         {console.log('bbb omaga kkk 111 omkkk ',medicines, medicines?.length ,advice ,symptoms , tests )}
        {(medicines?.length) && <div className="pat-prescription">

            <Prescription
             medicine = {medicines}
             advice = {advice}
             symptoms = {symptoms}
             tests = {tests}
             isEditable = {false}
            />

        </div>}

    </div>
  )
}
