import React from 'react'
import { useState, createContext } from 'react'

// Context (state) of HomeContext -- location and destination etc

const defaultValue = {
  selectedIcon: 'hotels',
  location: null,
  userCountry: null,
  destination: '',
  destinationLocation: null,
  covidDataOfUserCountry: null,
}

export const HomeContext = createContext([defaultValue, v => {}])

export const HomeContextProvider = props => {
  const [state, setState] = useState(defaultValue)

  return (
    <HomeContext.Provider value={[state, setState]}>
      {props.children}
    </HomeContext.Provider>
  )
}
