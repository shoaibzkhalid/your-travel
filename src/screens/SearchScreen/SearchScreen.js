import { FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { COLORS } from '../../theme/colors'
import CustomCard from '../../components/CustomCard/CustomCard'
import { dummyData } from '../../config/constants'
import { ICONS } from '../../theme/icons'
import { useNavigation, useRoute } from '@react-navigation/native'

const SearchScreen = () => {
  const route = useRoute()
  const { goBack } = useNavigation()
  const { destination } = route.params

  // Screen which shows search results
  return (
    <>
      <Header>
        <HeaderTextContainer>
          <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => goBack()}>
            <Image
              source={ICONS.back}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <HeaderText>Searched Hotels</HeaderText>
        </HeaderTextContainer>

        <HeaderText style={{ marginTop: 10 }}>{destination || 'Karachi'}</HeaderText>
      </Header>

      <Container>
        <FlatList
          renderItem={({ item }) => <CustomCard item={item} />}
          data={dummyData}
          keyExtractor={item => `${item.name}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </Container>
    </>
  )
}

const Header = styled.View`
  background-color: ${COLORS.primary};
  height: 15%;
`

const Container = styled.View`
  padding: 10px;
  flex: 1;
`

const HeaderText = styled.Text`
  color: ${COLORS.white};
  font-size: 22px;
  font-weight: 500;
  padding-left: 10px;
`
const HeaderTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  padding-left: 0;
`

export default SearchScreen
