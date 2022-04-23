import React from 'react';
import { IconButton } from 'react-native-paper';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { ICONS } from '../../theme/icons';
import { DarkBgTxt } from '../../components/DarkBgTxt';
import { HomeContext } from '../../state/homeContext';
import { SIZES } from '../../theme/sizes';

const HomeIcons = () => {
  const [homeIcon, setHomeIcon] = React.useContext(HomeContext);
  const icons = ['flights', 'hotels', 'landmarks', 'events'];

  return (
    <Container>
      {icons.map(icon => (
        <HomeIcon key={icon}>
          <IconBtnContainer active={icon === homeIcon} onPress={() => setHomeIcon(icon)}>
            <IconButton icon={ICONS[icon]} />
          </IconBtnContainer>
          <DarkBgTxt>{icon}</DarkBgTxt>
        </HomeIcon>
      ))}
    </Container>
  );
};

const Container = styled.View`
  /* background-color: ${COLORS.error}; */
  padding: 10px;
  flex-flow: row nowrap;
`;

const HomeIcon = styled.View`
  /* background-color: ${COLORS.lightPrimary}; */

  align-items: center;
`;

const IconBtnContainer = styled.TouchableOpacity`
  background-color: ${({ active }) =>
    `${active ? COLORS.secondary : COLORS.lightPrimary}`};
  padding: 10px;

  margin: 10px;
  border-radius: ${SIZES.borderRadius}px;
`;

export default HomeIcons;
