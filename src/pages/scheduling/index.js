import { Formik, Field, Form } from 'formik'
import { InputWrapper, Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { subHours, subDays } from 'date-fns'

const Scheduling = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          BirthDate: '',
          AppointmentDay: ''
        }}
        onSubmit={async (values) => {
          try {
            values.BirthDate.toISOString()
            values.BirthDate = subHours(values.BirthDate, 3)
            values.AppointmentDay.toISOString()
            values.AppointmentDay = subHours(values.AppointmentDay, 3)
            await axios.post('/schedule', {
              name: values.name,
              birthDate: values.BirthDate,
              appointmentday: values.AppointmentDay
            })
            showNotification({
              color: 'green',
              title: 'Success',
              message: 'Scheduling was successful'
            })
            navigate('/schedule')
          } catch (error) {
            console.error(error)
            showNotification({
              color: 'red',
              title: 'Error',
              message: error.response.data.message
            })
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div>
            <InputWrapper id='name' required label='Name' description='User Fullname'/>
              <Field name='name' type='text' placeholder='Jhon Doe' autoComplete='off'/>
            </div>
            <div>
            <InputWrapper id='Birth Date' required label='BirthDate' description='User birth date'/>
              <DatePicker
                autoComplete='off'
                selected={values.BirthDate}
                className='BirthDate'
                name='BirthDate'
                onChange={(date) => setFieldValue('BirthDate', date)}
                maxDate={new Date()}
                showYearDropdown
                dateFormatCalendar='MMMM'
                yearDropdownItemNumber={100}
                scrollableYearDropdown
              />
            </div>
            <div>
            <InputWrapper id='AppointmentDay' required label='AppointmentDay' description='AppointmentDay'/>
              <DatePicker
                autoComplete='off'
                selected={values.AppointmentDay}
                className='AppointmentDay'
                name='AppointmentDay'
                onChange={(date) => setFieldValue('AppointmentDay', date)}
                minDate={subDays(new Date(), 0)}
                showTimeSelect
                timeFormat='p'
                timeIntervals={60}
                dateFormat='Pp'
              />
            </div>
              <Button variant='outline' color='dark' mt={20} type='submit'>
                Make the Appointment
              </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Scheduling
