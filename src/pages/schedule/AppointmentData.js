import { useParams, useNavigate } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { showNotification } from '@mantine/notifications'
import { addHours } from 'date-fns'
import { InputWrapper, Button } from '@mantine/core'
import Values from '../../hooks/UpdateGet.js'
import Set from '../../hooks/UpdateSet.js'

const AppointmentData = () => {
  const { scheduleId } = useParams()
  const navigate = useNavigate()
  const initialValues = Values(scheduleId)
  return (
    <div>
      <Formik
        initialValues={{
          name: initialValues.name,
          birthDate: addHours(new Date(initialValues.birthDate), 3),
          AppointmentDay: addHours(new Date(initialValues.appointmentday), 3),
          situation: initialValues.situation
        }}
        enableReinitialize= {true}
        onSubmit={async (values) => {
          try {
            Set(values, scheduleId)
            showNotification({
              color: 'green',
              title: 'Success',
              message: 'Scheduling was successful updated'
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
              <InputWrapper
                id='name'
                required
                label='Name'
                description='User Fullname'
              />
              <Field name='name' type='text' placeholder='Jhon Doe' value={values.name}/>
            </div>
            <div>
              <InputWrapper
                id='Birth Date'
                required
                label='BirthDate'
                description='User birth date'
              />
              <DatePicker
                autoComplete='off'
                selected={values.birthDate}
                className='birthDate'
                name='birthDate'
                onChange={(date) => setFieldValue('birthDate', date)}
                maxDate={new Date()}
                showYearDropdown
                yearDropdownItemNumber={100}
                scrollableYearDropdown
              />
            </div>
            <div>
              <InputWrapper
                id='AppointmentDay'
                required
                label='AppointmentDay'
                description='AppointmentDay'
              />
              <DatePicker
                autoComplete='off'
                selected={values.AppointmentDay}
                className='AppointmentDay'
                name='AppointmentDay'
                onChange={(date) => setFieldValue('AppointmentDay', date)}
                minDate={new Date()}
                showTimeSelect
                timeFormat='p'
                timeIntervals={60}
                dateFormat='Pp'
              />
              <InputWrapper
                id='Situation'
                required
                label='Situation'
              />
              <Field
              type="checkbox"
              id="situation"
              name="situation"
              placeholder="Vaccinated?"
              selected={values.situation}
              autoComplete="off"/>
            </div>
            <Button variant='outline' color='dark' mt={20} type='submit'>
              Change the schedule
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AppointmentData
