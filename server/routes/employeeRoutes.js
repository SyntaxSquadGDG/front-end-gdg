const express = require('express');
const {
  getEmployees,
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
  getRoles,
  getPermissions,
  getLogs,
} = require('../controllers/employeeController');
const router = express.Router();

router
  .route('/') // Use `route` for handling both GET and POST requests to the same path
  .get(getEmployees) // GET request to fetch all employees
  .post(createEmployee); // POST request to create a new employee

router
  .route('/:id')
  .delete(deleteEmployee)
  .get(getEmployeeById)
  .put(updateEmployee);

router.route('/:id/roles').get(getRoles);
router.route('/:id/permissions').get(getPermissions);
router.route('/:id/activities').get(getLogs);

module.exports = router;

