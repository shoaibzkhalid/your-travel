import React from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { UserContext } from '../state/userContext'
import { showSuccessToast } from '.'

export const useAuthUser = () => {
  const [context, setProfile] = React.useContext(UserContext)
  const authUser = auth().currentUser
  const [user, setUser] = React.useState(undefined)
  const [userVerified, setUserVerified] = React.useState(user?.emailVerified)

  React.useEffect(() => {
    ;(async () => {
      const storedUser = await firestore().collection('Users').doc(authUser.uid).get()
      // console.log('data authuser', storedUser.data())

      setProfile({
        ...context,
        databaseUser: storedUser.data(),
      })
    })()

    const subscriberToAuth = auth().onAuthStateChanged(user => {
      // console.log('check authchange', user, user?.emailVerified)
      if (user && !user?.emailVerified) {
        showSuccessToast('Please verify your email')
      }

      setUser(user)
    })

    const subscriberToUser = auth().onUserChanged(user => {
      if (!user) {
        setUserVerified(false)
      }
      if (user?.emailVerified) {
        setUserVerified(true)
      }
    })

    return () => {
      subscriberToAuth()
      subscriberToUser()
    }
  }, [user])

  return { user, userVerified }
}
