const express = require("express");
const router = express.Router();
const employee = require("../models/emp");
// default router
router.get("/", (req, res) => {
  res.json({
    name: "welcome to emp api"
  });
});

// list of employesss
router.get("/employees", async (req, res) => {
  try {
    const emp = await employee.find();
    res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// singe employee
router.get("/employees/:id", singeEmployee, (req, res) => {
  //res.send("single emplyee");
  res.json(res.emp);
});

// create employee
router.post("/create", async (req, res) => {
  const empdata = new employee({
    employee_name: req.body.employee_name,
    employee_salary: req.body.employee_salary,
    employee_age: req.body.employee_age
  });

  console.log(empdata);
  try {
    const response = await empdata.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// upddate the employee
router.put("/update/:id", singeEmployee, async (req, res) => {
  //res.send("update");

  if (req.body.employee_name != null) {
    res.emp.employee_name = req.body.employee_name;
  }
  if (req.body.employee_salary != null) {
    res.emp.employee_salary = req.body.employee_salary;
  }
  if (req.body.employee_age != null) {
    res.emp.employee_age = req.body.employee_age;
  }

  try {
    var data = await res.emp.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete the employee
router.delete("/delete/:id", singeEmployee, async (req, res) => {
  //res.send("delete");
  console.log(req, ree);
  try {
    await res.emp.remove();
    res.json({ message: "Deleted employee record" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function singeEmployee(req, res, next) {
  let emp;
  try {
    emp = await employee.findById(req.params.id);

    console.log(emp, "dataaaaaaaaaaaaaa");
    if (emp == null) {
      return res.status(404).json({ message: "Cannot find empy" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.emp = emp;
  next();
}

module.exports = router;
