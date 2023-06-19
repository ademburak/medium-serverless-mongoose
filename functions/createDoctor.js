import { doctorSchema } from '../database/schema/doctor'
const mongoose = require('mongoose')
const pick = require('lodash/pick')
const pickBy = require('lodash/pickBy')
const identity = require('lodash/identity')
const { DateTime } = require('luxon')
const response = require('../libs/response')
// let cachedDB = null
// async function connectToDatabase (uri, options = { minPoolSize: 1, maxPoolSize: 1 }) {
//   if (!cachedDB) cachedDB = await mongoose.connect(uri, options)
// }
// export const handler = async (event, context) => {
//   try {
//     await connectToDatabase(process.env.MONGO_URI)
//     const data = pickBy(pick(JSON.parse(event.body), [
//       'firstName', 'lastName', 'credentials',
//       'medicalSchools', 'gender', 'isActive', 'licenses',
//       'birthDate'
//     ]), identity)
//     if (data.birthDate) data.birthDate = DateTime.fromFormat(data.birthDate, 'yyyy-MM-dd').toJSDate()
//     console.log(data)
//     // const doctor = await DoctorModel.create(data)
//     const doctor = new DoctorModel(data)
//     doctor.save()

//     return response.success({
//       message: 'Doctor had been created successfully.',
//       data: doctor.toObject()
//     })
//   } catch (e) {
//     console.log(e)
//     return response.fail({ message: e.message })
//   }
// }

let connection = null
async function connectToDatabase (uri, options = { minPoolSize: 1, maxPoolSize: 1 }) {
  if (!connection) connection = await mongoose.createConnection(uri, options)
}

async function getModel (database) {
  const dbConnection = connection.useDb(database)
  return await dbConnection.model('doctor', doctorSchema)
}

export const handler = async (event, context) => {
  try {
    console.log(event.body)
    await connectToDatabase(process.env.MONGO_URI)
    const data = pickBy(pick(JSON.parse(event.body), [
      'firstName', 'lastName', 'credentials',
      'medicalSchools', 'gender', 'isActive', 'licenses',
      'birthDate'
    ]), identity)
    if (data.birthDate) data.birthDate = DateTime.fromFormat(data.birthDate, 'yyyy-MM-dd').toJSDate()
    // const doctor = await DoctorModel.create(data)
    const dbNames = ['burak', 'burak1', 'burak2', 'burak3']
    for (let i = 0; i < dbNames.length; i++) {
      const DoctorModel = await getModel(dbNames[i])
      const doctor = new DoctorModel(data)
      await doctor.save()
    }
    return response.success({
      message: 'Doctor had been created successfully.'
    })
  } catch (e) {
    console.log(e)
    return response.fail({ message: e.message })
  }
}
