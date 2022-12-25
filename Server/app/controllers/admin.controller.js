const Admin = require("../models/admin.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config');

const sql = require("../models/db.js");
/**
 * 
 Insert 
 INSERT INTO `patient_info` (`id`, `first_name`, `last_name`, `gender`, `age`, `address`, `mobile`, `email`) VALUES ('1', 'shahru', 'nayeemm', 'Male', '123', '', '+8801787418344', 'shahru@gm.com');
 INSERT INTO `prescriptions` (`id`, `patient_id`, `symptoms`, `tests`, `advice`, `prescription`, `date`, `doctor_id`, `fees`, `payment_option`, `appointment_time`) VALUES (NULL, '4', 'dcskb', 'cds', '', '', '2022-12-16 17:46:19.000000', '', '', '', '2022-12-16 17:46:19.000000');
 */

exports.FindPatient = (req, res) => {
  console.log("req body "+JSON.stringify(req.body));

  Admin.findOnePatientByPhone({ mobile: req.body.mobile}, function (err, user) {
    if (err || !user) {
      
      Admin.insertANewPatient(req.body, (error, response)=>{
        if(response?.id){
          console.log('data id ', response?.id, req.body);
          const pId = response?.id;
          Admin.insertAPrescription(req.body, response.id, (error, response)=>{
             
            if(!error){
              return res.status(200).send({message: 'successfull', patientId: pId})
            }else{
              return res.status(500).send({message: err})
            }
             
          })

        }
        else{
          return res.status(500).send({kind: 'Failed to insert a new patient'});
        }
      })

      return res.status(500).send({err});
    }else{
      console.log('usssssssss ', user);
      Admin.insertAPrescription(req.body, user.id, (error, response)=>{
        if(!error){
           res.status(200).send({message: 'successfull', patientId: user.id})
        }else{
           res.status(500).send({message: err})
        }
     })
    }
  });
  
};

exports.GetPrescriptionById = (req, res)=>{
  const pId = req.query.patientId;
  if(pId){
    Admin.getPrescriptionById(pId, (err, response)=>{
      console.log('get all prescrip ', response);
      if(!err){

        sql.query(`Select * from patient_info where id = '${pId}';`, (err, userRes)=>{
          if(!err){
            res.status(200).send({message: 'success', prescriptions: response, user: userRes[0]})
          }
        })
      }else{
        res.status(500).send({message: 'error', data: err})
      }

    })
  }
   console.log('reqqq 1  ',req, );
}



