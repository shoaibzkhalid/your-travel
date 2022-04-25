import React from 'react'
import styled from 'styled-components/native'
import { HomeContext } from '../../state/homeContext'
import { COLORS } from '../../theme/colors'
import { SIZES } from '../../theme/sizes'
import { numFormatter } from '../../util'

const CovidCards = ({ data }) => {
  const [home] = React.useContext(HomeContext)

  // Covid Data Ui on HomeScreen
  return (
    <>
      <StyledHeading>Covid Stats of {home.userCountry}</StyledHeading>
      <CardViewContainer>
        <CardView>
          <CardText>Total Cases</CardText>
          <CardTextFigure>{numFormatter(data.cases)}</CardTextFigure>
        </CardView>

        <CardView>
          <CardText>Active</CardText>
          <CardTextFigure>{numFormatter(data.active)}</CardTextFigure>
        </CardView>

        <CardView>
          <CardText>Today</CardText>
          <CardTextFigure>{numFormatter(data.todayCases)}</CardTextFigure>
        </CardView>
      </CardViewContainer>
    </>
  )
}

const StyledHeading = styled.Text`
  margin-top: 5px;
  color: ${COLORS.primary};
  font-size: 20px;
  font-weight: 500;
`

const CardViewContainer = styled.View`
  flex-direction: row;
`

const CardTextFigure = styled.Text`
  color: ${COLORS.primary};
  font-size: 14px;
  font-weight: 600;
`

const CardText = styled.Text`
  color: ${COLORS.black};
  font-size: 14px;
`

const CardView = styled.View`
  margin: 10px;
  background-color: white;
  padding: 10px;
  min-width: 23%;
  border-radius: ${SIZES.borderRadius};
  align-items: center;
`

export default CovidCards
