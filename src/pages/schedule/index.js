import { Button, Table, Checkbox } from '@mantine/core'
import { useEffect, useState } from 'react'
import axios from '../../services/api'
import { Pencil } from 'tabler-icons-react'
import { useNavigate } from 'react-router-dom'

const Schedule = () => {
  const [schedules, setSchedules] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [checked, setChecked] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('/schedule')
      .then((response) => setSchedules(response.data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div>
      <h1>Schedule ({schedules.length})</h1>
      <Table horizontalSpacing="sm" verticalSpacing="xs" highlightOnHover mt={12} striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>BirthDate</th>
          <th>AppointmentDay</th>
          <th>Situation</th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule, index) => (
            <tr key={index}>
              <td>{schedule.name}</td>
              <td>{schedule.birthDate}</td>
              <td>{schedule.appointmentday}</td>
              <td>
              <Checkbox checked={schedule.situation} onChange={(event) => setChecked(event.currentTarget.checked)} />
              </td>
              <td>
                <Button
                  leftIcon={<Pencil />}
                  variant="default"
                  color="gray"
                  onClick={() => navigate(schedule.id)}
                >
                  Edit Schedule
                </Button>
              </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default Schedule
