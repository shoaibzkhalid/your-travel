import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import HomeHeader from '../HomeScreen/HomeHeader'
import CustomBtn from '../../components/CustomBtn'
import { ICONS } from '../../theme/icons'

const ConfirmEmailScreen = () => {
  const { navigate } = useNavigation()

  return (
    <>
      <HomeHeader />
      <View style={styles.root}>
        <Image source={ICONS.mail} />
        <Text style={styles.title}>Confirm your email</Text>
        <Text style={styles.subText}>
          An email has been sent to your address. Verify that to sign in.
        </Text>

        <CustomBtn onPress={() => navigate('SignIn')}>Go to Sign in</CustomBtn>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
    flex: 0.8,
    justifyContent: 'center',
  },
  subText: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
})

export default ConfirmEmailScreen
