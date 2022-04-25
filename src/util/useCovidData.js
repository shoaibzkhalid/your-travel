import React, { useEffect } from 'react'
import { COVID_API_URL } from '../config/constants'
import { HomeContext } from '../state/homeContext'
import axios from 'axios'

export const useCovidData = () => {
  const [homeContext, setCovidData] = React.useContext(HomeContext)
  const userCountry = homeContext.userCountry

  useEffect(() => {
    ;(async () => {
      if (!userCountry) return
      try {
        // Fetching covid data from the API
        const { data } = await axios(`${COVID_API_URL}/${userCountry}`)
        setCovidData({ ...homeContext, covidDataOfUserCountry: data })
      } catch (error) {
        console.log('Error getting covid data', error)
      }
    })()
  }, [userCountry])
}
