import { View } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars'
import Heading from '../../components/Heading'

const Events = () => {
  const [selectedDate, setSelectedDate] = React.useState('')

  // Dates that are marked on pressed
  const getMarkedDates = date => ({ [date]: { selected: true, selectedColor: 'blue' } })

  return (
    <View>
      <Heading>Events</Heading>

      <Calendar
        style={{ margin: 10 }}
        onDayPress={date => setSelectedDate(date.dateString)}
        current={selectedDate}
        markedDates={getMarkedDates(selectedDate)}
      />
    </View>
  )
}

export default Events
