import { doctorSchema } from '../schema/doctor'
const mongoose = require('mongoose')

const DoctorModel = mongoose.model('doctor', doctorSchema)

export { DoctorModel }
