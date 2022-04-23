import React from 'react'
import { View } from 'react-native'
import { HomeContext } from '../../state/homeContext'
import { LightBgTxt } from '../../components/LightBgTxt'
import Landmarks from './Landmarks'
import { Fragment } from 'react/cjs/react.production.min'
import CustomBtn from '../../components/CustomBtn'
import Events from './Events'
import DestMap from './DestMap'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'
import { COLORS } from '../../theme/colors'

const HomeContent = () => {
  const [homeIcon] = React.useContext(HomeContext)
  const [destination, setDestination] = React.useState('')
  const { navigate } = useNavigation()

  switch (homeIcon) {
    case 'hotels':
      return (
        <View style={{ flex: 1 }}>
          <LightBgTxt>Search {homeIcon}</LightBgTxt>

          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            autoComplete={'off'}
            underlineColor={COLORS.primary}
            theme={{ colors: { primary: COLORS.primary } }}
            placeholder="Going to?"
            style={[{ backgroundColor: 'transparent', color: 'red' }]}
            onChangeText={text => setDestination(text)}
          />
          <DestMap />
          <CustomBtn
            icon={'search'}
            onPress={() =>
              navigate('Search', {
                destination,
              })
            }>
            Search
          </CustomBtn>
        </View>
      )

    case 'flights':
      return (
        <Fragment>
          <LightBgTxt>Search {homeIcon}</LightBgTxt>

          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            autoComplete={'off'}
            underlineColor={COLORS.primary}
            theme={{ colors: { primary: COLORS.primary } }}
            placeholder="Going to?"
            style={[{ backgroundColor: 'transparent', color: 'red' }]}
            onChangeText={text => setDestination(text)}
          />

          <DestMap />
          <CustomBtn icon={'search'} onPress={() => navigate('Search')}>
            Search
          </CustomBtn>
        </Fragment>
      )

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

export default HomeContent
