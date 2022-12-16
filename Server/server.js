const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


/**
 * create table sql
 * CREATE TABLE `doctors_desk`.`patient_info` (`id` INT NOT NULL AUTO_INCREMENT , `first_name` VARCHAR(100) NOT NULL , `last_name` VARCHAR(100) NOT NULL , `gender` VARCHAR(100) NOT NULL , `age` INT NOT NULL , `address` VARCHAR(200) NOT NULL , `mobile` VARCHAR(20) NOT NULL , `email` VARCHAR(30) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
 * CREATE TABLE `doctors_desk`.`prescriptions` (`id` INT NOT NULL AUTO_INCREMENT , `patient_id` INT NOT NULL , `symptoms` VARCHAR(2000) NOT NULL , `tests` VARCHAR(2000) NOT NULL , `advice` VARCHAR(2000) NOT NULL , `prescription` VARCHAR(4000) NOT NULL , `date` DATETIME NOT NULL , `doctor_id` INT NOT NULL , `fees` INT NOT NULL , `payment_option` INT NOT NULL , `appointment_time` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
 */

require("./app/routes/admin.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
