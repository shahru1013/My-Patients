const moment = require("moment/moment.js");
const sql = require("./db.js");

// constructor
const Admin = ()=>{};


Admin.findOnePatientByPhone = (data, result) => {
  console.log("email  -- "+data+" "+data.mobile);
  sql.query(`SELECT * FROM patient_info WHERE mobile = "${data.mobile}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found patient: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: {err} }, null);
  });
};

Admin.insertANewPatient = (data, result) =>{

  sql.query(`INSERT INTO patient_info (id, first_name, last_name, gender, age, address, mobile, email) VALUES ('', '${data?.first_name || ''}', '${data?.last_name || ''}', '${data?.gender || ''}', '${data?.age || ''}', '${data?.address || ''}', '${data?.mobile || ''}', '${data?.email || ''}');`, (err, res)=>{
    if(err){
      result({ kind: {err} }, null);
    }else{
      result(null, { id: res?.insertId });
    }
  })  
}

Admin.insertAPrescription = (data, pat_id, result) =>{
  console.log('dataaa press ',pat_id, data);
  //INSERT INTO `prescriptions` (`id`, `patient_id`, `symptoms`, `tests`, `advice`, `prescription`, `date`, `doctor_id`, `fees`, `payment_option`, `appointment_time`) VALUES (NULL, '4', 'dcskb', 'cds', '', '', '2022-12-16 17:46:19.000000', '', '', '', '2022-12-16 17:46:19.000000');
 //SELECT * FROM prescriptions WHERE id = SCOPE_IDENTITY()
  sql.query(`INSERT INTO prescriptions (id, patient_id, symptoms, tests, advice, prescription, date, doctor_id, fees, payment_option, appointment_time, systolic, diastolic, temparature, heart_rate) VALUES ('', '${pat_id}', '${JSON.stringify(data?.allsymps) || []}', '${JSON.stringify(data?.allTests) || []}', '${JSON.stringify(data?.allAdvices) || []}', '${JSON.stringify(data?.allMedicines) || []}', '${moment(new Date()).format("DD/MM/YYYY")}', '', '', '', '${new Date()}', '${data?.systolic || 0}', '${data?.diastolic || 0}', '${data?.bodyTemp || 0}', '${data?.heartRate || 0}');`, (err, res)=>{
    console.log('eerrr ', err, res);
    if(err){
      result({ kind: {err} }, null);
    }else{
      result(null, { data: res });
    }
  })  
}


Admin.getPrescriptionById = (pId, result)=>{
   sql.query(`Select * from prescriptions where patient_id = '${pId}' order by id desc;`, (err, res)=>{
     result(err, res)
   })
}

module.exports = Admin;
