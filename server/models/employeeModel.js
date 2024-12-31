const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true, // Ensure the customId is unique
      required: true, // You might want to ensure it's always set
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId, // References another document
        ref: 'Role', // Name of the referenced model
      },
    ],
  },
  { timestamps: true }, // Disable the default _id field
);

employeeSchema.pre('validate', function (next) {
  if (!this.id) {
    this.id = parseInt(this._id.toString().substring(0, 8), 16);
  }
  next();
});

module.exports = mongoose.model('Employee', employeeSchema);

