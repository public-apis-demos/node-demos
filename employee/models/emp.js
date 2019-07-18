const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employee_name: {
    type: String,
    required: true
  },
  employee_salary: {
    type: Number,
    required: true
  },
  employee_age: {
    type: Number,
    required: true
  },
  profile_image: {
    type: String
  }
});
module.exports = mongoose.model("employee", employeeSchema);
