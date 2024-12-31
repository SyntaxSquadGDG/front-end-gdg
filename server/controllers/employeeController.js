const { activityLogs } = require('../data/activity');
const { permissionsData } = require('../data/permissions');
const Employee = require('../models/employeeModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getEmployees = async (req, res) => {
  const token = req.headers.authorization; // Retrieve the Authorization header
  const cookies = req.cookies; // Retrieve cookies from the request

  console.log(token);
  console.log(cookies);

  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 5; // Default to 5 items per page if not provided

  // Calculate the number of items to skip based on the current page and limit
  const skip = (page - 1) * limit;

  try {
    const employees = await Employee.find().skip(skip).limit(limit);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createEmployee = async (req, res) => {
  const { firstName, lastName, email, password, roles } = req.body;

  try {
    // Check if employee with the same email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: 'Employee with this email already exists' });
    }

    // Validate roles (if provided)
    if (roles && roles.length > 0) {
      const validRoles = await Role.find({ _id: { $in: roles } }); // Check if all provided roles exist
      if (validRoles.length !== roles.length) {
        return res
          .status(400)
          .json({ message: 'One or more roles are invalid' });
      }
    }

    // Create a new employee, set roles to an empty array if not provided
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      password, // You might want to hash the password before saving it in a real app
      roles: roles || [], // Set roles to an empty array if it's not provided
    });

    // Save the new employee to the database
    const employee = await newEmployee.save();

    res.status(201).json(employee); // Return the created employee
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the employee by the custom 'id' field
    const result = await Employee.deleteOne({ id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the employee by its custom 'id' field
    const employee = await Employee.findOne({ id });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee); // Return the found employee
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  try {
    // Check if name is provided

    // Find the employee by its custom 'id' field and update its name
    const updatedEmployee = await Employee.findOneAndUpdate(
      { id },
      { firstName, lastName, email },
      { new: true }, // Return the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee); // Return the updated employee
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getRoles = async (req, res) => {
  const { id } = req.params; // roleId is passed as a URL parameter
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 5; // Default to 5 items per page if not provided
  const skip = (page - 1) * limit;

  console.log(id);

  try {
    // Find the role by custom roleId and populate employees
    const employee = await Employee.findOne({ id: id }).populate({
      path: 'roles', // Assuming 'employees' is a field in the Role schema
      options: {
        skip,
        limit,
      },
    });

    if (!role) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee.roles); // Return populated employees
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getPermissions = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit, 10) || 5; // Default to 10 items per page if not provided

  // Calculate the number of items to skip
  const skip = (page - 1) * limit;

  // Paginate the static data
  const paginatedData = permissionsData.slice(skip, skip + limit);

  res.status(200).json(paginatedData);
};

const getLogs = (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    // Convert query params to integers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    // Calculate pagination
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Paginate activity logs
    const paginatedLogs = activityLogs.slice(startIndex, endIndex);

    res.json(paginatedLogs);
  } catch (e) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getActivePlan = (req, res) => {
  try {
    res.json({ active: 'enterprise' });
  } catch (e) {
    res.status(500).json({ message: 'Server Error', id: 1 });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
  getRoles,
  getPermissions,
  getLogs,
  getActivePlan,
};

