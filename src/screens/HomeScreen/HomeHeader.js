import React, { useContext } from 'react'
import styled from 'styled-components/native'
import { COLORS } from '../../theme/colors'
import { useRoute } from '@react-navigation/native'
import { ICONS } from '../../theme/icons'
import { IconButton } from 'react-native-paper'
import { DarkBgTxt } from '../../components/DarkBgTxt'
import { HomeContext } from '../../state/homeContext'
import { SIZES } from '../../theme/sizes'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const HomeHeader = ({ subText }) => {
  const route = useRoute()
  const [homeContext, setHomeIcon] = useContext(HomeContext)
  const icons = ['hotels', 'flights', 'landmarks', 'events']
  const selectedIcon = homeContext.selectedIcon

  return (
    <Container>
      <HeaderText>MyTravels.com</HeaderText>

      {route.name === 'Home' ? (
        <HomeIcons>
          {icons.map(icon => (
            <HomeIcon key={icon}>
              <IconBtnContainer
                active={icon === selectedIcon}
                onPress={() => setHomeIcon({ ...homeContext, selectedIcon: icon })}>
                <IconButton icon={ICONS[icon]} />
              </IconBtnContainer>
              <DarkBgTxt>{icon}</DarkBgTxt>
            </HomeIcon>
          ))}
        </HomeIcons>
      ) : (
        <HeaderSubheading>{subText}</HeaderSubheading>
      )}
    </Container>
  )
}

const Container = styled.View`
  background-color: ${COLORS.primary};
  padding-bottom: 10px;
  align-items: center;
  height: 25%;
  justify-content: center;
`

const HeaderText = styled.Text`
  font-size: ${hp(4.5)}px;
  color: ${COLORS.white};
  text-align: center;
  font-weight: 500;
  margin-top: 12px;
`

const HeaderSubheading = styled.Text`
  color: ${COLORS.white};
  text-align: center;
  padding: 10px;
  font-size: 20px;
  font-weight: 500;
`

const HomeIcons = styled.View`
  /* background-color: ${COLORS.error}; */
  /* padding: 10px; */
  flex-direction: row;
`

const HomeIcon = styled.View`
  /* background-color: ${COLORS.error}; */
  align-items: center;
  margin: 3px;
  margin-bottom: 20px;
`

const IconBtnContainer = styled.TouchableOpacity`
  background-color: ${({ active }) =>
    `${active ? COLORS.secondary : COLORS.lightPrimary}`};
  padding: 10px;

  margin: 10px;
  border-radius: ${SIZES.borderRadius}px;
`

export default HomeHeader
