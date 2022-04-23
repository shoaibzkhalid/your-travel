import { View, Text, Image } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { COLORS } from '../../theme/colors'
import { Card } from 'react-native-paper'
import { SIZES } from '../../theme/sizes'
import Tag from './Tag'

const CustomCard = ({ item }) => {
  const { name, image, price } = item

  return (
    <Container>
      <Card.Cover source={{ uri: image }} style={{ borderRadius: 15 }} />
      <Text style={{ margin: 10, marginTop: 15, fontSize: 20 }}>{name}</Text>

      <CardBottom>
        <TagsContainer>
          <Tag color="green">Breakfast included</Tag>
          <Tag color={COLORS.primary}>Free Cancellation</Tag>
        </TagsContainer>

        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>{price}</Text>
          <Text style={{ fontSize: 12 }}>Inclusive of all taxes</Text>
        </View>
      </CardBottom>
    </Container>
  )
}

const TagsContainer = styled.View`
  align-items: flex-start;
`

const Container = styled.View`
  border-radius: ${SIZES.borderRadiusBg}px;
  background-color: ${COLORS.white};
  margin: 5px 0px;
`

const CardBottom = styled.View`
  flex-direction: row;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`

export default CustomCard
