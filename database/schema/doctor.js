const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, default: null },
  lastName: { type: String, default: null },
  credentials: [{ type: String, required: true }],
  medicalSchools: [{ type: String, required: true }],
  gender: { type: String, enum: ['male', 'female'], default: null },
  isActive: { type: Boolean, default: false },
  licenses: [{ type: String, required: true }],
  birthDate: { type: Date, required: true }
})

export { doctorSchema }
