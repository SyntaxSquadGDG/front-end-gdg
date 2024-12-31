const Role = require('../models/roleModel');
const Employee = require('../models/employeeModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getRoles = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 5; // Default to 5 items per page if not provided

  // Calculate the number of items to skip based on the current page and limit
  const skip = (page - 1) * limit;

  try {
    const roles = await Role.find().skip(skip).limit(limit);
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createRole = async (req, res) => {
  const { name, employees } = req.body;

  try {
    // Validate roles (if provided)
    // if (employees && employees.length > 0) {
    //   const validEmployees = await Employee.find({ id: { $in: employees } }); // Check if all provided roles exist
    //   if (validEmployees.length !== validEmployees.length) {
    //     return res
    //       .status(400)
    //       .json({ message: 'One or more employees are invalid' });
    //   }
    // }

    // Create a new role, set roles to an empty array if not provided
    const newRole = new Role({
      name: name,
      employees: employees || [], // Set roles to an empty array if it's not provided
    });

    // Save the new role to the database
    const role = await newRole.save();

    res.status(201).json(role); // Return the created employee
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the role by the custom 'id' field
    const result = await Role.deleteOne({ id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the role by its custom 'id' field
    const role = await Role.findOne({ id });

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json(role); // Return the found role
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    // Check if name is provided
    if (!name) {
      return res.status(400).json({ message: 'Role name is required' });
    }

    // Find the role by its custom 'id' field and update its name
    const updatedRole = await Role.findOneAndUpdate(
      { id },
      { name },
      { new: true }, // Return the updated document
    );

    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json(updatedRole); // Return the updated role
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getEmployees = async (req, res) => {
  const { id } = req.params; // roleId is passed as a URL parameter
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 5; // Default to 5 items per page if not provided
  const skip = (page - 1) * limit;

  console.log(id);

  try {
    // Find the role by custom roleId and populate employees
    const role = await Role.findOne({ id: id }).populate({
      path: 'employees', // Assuming 'employees' is a field in the Role schema
      options: {
        skip,
        limit,
      },
    });

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json(role.employees); // Return populated employees
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getRoles,
  createRole,
  deleteRole,
  getRoleById,
  updateRole,
  getEmployees,
};

