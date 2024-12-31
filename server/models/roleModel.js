const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    employees: [
      {
        type: Number, // References another document
        ref: 'Employee', // Name of the referenced model
      },
    ],
  },
  { timestamps: true },
);

roleSchema.pre('validate', function (next) {
  if (!this.id) {
    this.id = parseInt(this._id.toString().substring(0, 8), 16);
  }
  next();
});

module.exports = mongoose.model('Role', roleSchema);

