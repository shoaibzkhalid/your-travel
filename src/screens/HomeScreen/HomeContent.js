import React from 'react'
import { View } from 'react-native'
import { HomeContext } from '../../state/homeContext'
import { LightBgTxt } from '../../components/LightBgTxt'
import Landmarks from './Landmarks'
import { Fragment } from 'react/cjs/react.production.min'
import CustomBtn from '../../components/CustomBtn'
import Events from './Events'
import CustomMap from './CustomMap'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'
import { COLORS } from '../../theme/colors'
import { useLocation } from '../../util/useLocation'
import CovidCards from './CovidCards'
import styled from 'styled-components/native'
import { ICONS } from '../../theme/icons'
import { DarkBgTxt } from '../../components/DarkBgTxt'

const HomeContent = () => {
  const [homeContext] = React.useContext(HomeContext)

  const { handleDestination } = useLocation()
  const [destination, setDestination] = React.useState('')
  const { navigate } = useNavigation()
  const { selectedIcon } = homeContext
  const covidData = homeContext.covidDataOfUserCountry

  // console.log('check data', homeContext.covidDataOfUserCountry)

  const content = () => {
    return (
      <View style={{ flex: 1 }}>
        <LightBgTxt>Search {selectedIcon}</LightBgTxt>

        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          autoComplete={'off'}
          underlineColor={COLORS.primary}
          theme={{ colors: { primary: COLORS.primary } }}
          placeholder="Type your destination here..."
          style={[{ backgroundColor: 'transparent', color: 'red' }]}
          onChangeText={text => setDestination(text)}
        />

        <BtnContainer>
          <CustomBtn icon={'search'} onPress={() => handleDestination(destination)}>
            Search
          </CustomBtn>
          <CustomBtn
            color={COLORS.secondary}
            icon={selectedIcon}
            onPress={() => navigate('Search', { destination })}>
            <DarkBgTxt>Find {selectedIcon}</DarkBgTxt>
          </CustomBtn>
        </BtnContainer>
        {covidData && <CovidCards data={covidData} />}

        <CustomMap />
      </View>
    )
  }

  switch (selectedIcon) {
    case 'hotels':
      return content()

    case 'flights':
      return content()

    case 'landmarks':
      return <Landmarks />

    case 'events':
      return <Events />
      break
    default:
      return null
      break
  }
}

const BtnContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export default HomeContent
