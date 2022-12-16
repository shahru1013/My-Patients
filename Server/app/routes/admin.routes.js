module.exports = app => {
  const admins = require("../controllers/admin.controller.js");
  const sendDoctorInvitationMail = require("../controllers/admin.sendinvitation");
  var router = require("express").Router();

  app.post("/prepare-new-prescription", admins.FindPatient);
  app.get("/get-prescriptions", admins.GetPrescriptionById);
  
  app.post("/doctor-invitation", sendDoctorInvitationMail);

};
