import { useEffect, useState } from 'react'
import axios from '../services/api'

export default function SetDate (id) {
  const [Values, setValues] = useState({
    name: '',
    birthDate: new Date(),
    appointmentday: new Date(),
    situation: false
  })

  useEffect(() => {
    axios
      .get(`/schedule/${id}`)
      .then((response) =>
        setValues({
          ...response.data
        }))
  })
  return Values
}
