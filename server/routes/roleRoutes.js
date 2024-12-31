const express = require('express');
const {
  getRoles,
  createRole,
  deleteRole,
  getRoleById,
  updateRole,
  getEmployees,
} = require('../controllers/roleController');
const {
  getPermissions,
  getLogs,
} = require('../controllers/employeeController');
const router = express.Router();

router
  .route('/') // Use `route` for handling both GET and POST requests to the same path
  .get(getRoles) // GET request to fetch all employees
  .post(createRole); // POST request to create a new employee

router.route('/:id').delete(deleteRole).get(getRoleById).put(updateRole);

router.route('/:id/employees').get(getEmployees);
router.route('/:id/permissions').get(getPermissions);
router.route('/:id/activities').get(getLogs);

module.exports = router;

