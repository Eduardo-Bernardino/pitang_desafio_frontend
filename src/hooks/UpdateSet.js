import axios from '../services/api'

const SetData = async (values, id) => {
  try {
    const data = {
      name: values.name,
      birthDate: values.birthDate.toISOString(),
      appointmentday: values.AppointmentDay.toISOString(),
      situation: values.situation
    }
    await axios.put(`/schedule/${id}`, data)
  } catch (error) { console.log(error) }
}

export default SetData
