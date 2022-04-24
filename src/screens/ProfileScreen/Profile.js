import React from 'react'
import auth from '@react-native-firebase/auth'
import { ProfileAvatar } from './ProfileAvatar'
import CustomInput from '../../components/CustomInput'
import { useForm } from 'react-hook-form'
import styled from 'styled-components/native'
import CustomBtn from '../../components/CustomBtn'
import firestore from '@react-native-firebase/firestore'
import { profileFields } from '../../config/constants'
import { UserContext } from '../../state/userContext'
import { showErrorToast, showSuccessToast } from '../../util'
import { COLORS } from '../../theme/colors'
import LightBgHeading from '../../components/LightBgHeading'

const Profile = () => {
  const user = auth().currentUser
  const [context] = React.useContext(UserContext)

  const profile = context.databaseUser

  const [isLoading, setLoading] = React.useState(false)
  const profileFieldKeys = profileFields.map(f => f.name)
  const { control, handleSubmit, setValue } = useForm()

  React.useEffect(() => {
    if (profile) {
      profileFieldKeys.map(key => {
        setValue(key, profile[key] ?? '')
      })
      return
    }

    profileFieldKeys.map(key => {
      setValue(key, user[key] ?? '')
    })
  }, [])

  const updateProfile = async data => {
    // console.log('data', data)

    setLoading(true)
    await auth().currentUser.updateProfile({ emailVerified: true })

    try {
      await firestore().collection('Users').doc(user.uid).set({
        displayName: data.displayName,
        country: data.country,
        phoneNumber: data.phoneNumber,
        email: data.email,
      })
      showSuccessToast('Profile updated successfully')
      setLoading(false)
    } catch (error) {
      showErrorToast('Error updating profile')
      console.log('error updating profile', error)
    }
  }

  console.log(
    'profile user11',
    // field['email'],
    // !!profile && !!profile['email'] ? profile['email'] : user['email'],
  )

  // !!profile && !!profile[field.name] ? profile[field.name] :

  return (
    <>
      <Header>
        <LightBgHeading size={30}>
          {profile && profile['displayName']
            ? profile['displayName']
            : user['displayName']}
        </LightBgHeading>
        <ProfileAvatar />
      </Header>
      <Container>
        {profileFields.map(field => (
          <CustomInput
            key={field.name}
            disabled={field.name === 'email'}
            name={field.name}
            placeholder={field.placeholder}
            defaultValue={
              profile && profile[field.name] ? profile[field.name] : user[field.name]
            }
            control={control}
          />
        ))}

        <CustomBtn onPress={handleSubmit(updateProfile)} isLoading={isLoading}>
          Update
        </CustomBtn>
      </Container>
    </>
  )
}

const Header = styled.View`
  background-color: ${COLORS.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 25%;
`

const Container = styled.View`
  padding: 10px;
`

export default Profile
