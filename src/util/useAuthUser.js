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
      // getting user data from firestore
      const storedUser = await firestore().collection('Users').doc(authUser.uid).get()

      // setting user data to context
      setProfile({
        ...context,
        databaseUser: storedUser.data(),
      })
    })()

    // subscribing to user data changes
    const subscriberToAuth = auth().onAuthStateChanged(user => {
      // console.log('check ', user, user?.emailVerified)

      // if user is not verified
      // show prompt to verify email
      if (user && !user?.emailVerified) {
        showSuccessToast('Please verify your email')
      }

      setUser(user)
    })

    // subscribing to user data changes
    const subscriberToUser = auth().onUserChanged(user => {
      if (!user) {
        setUserVerified(false)
      }
      if (user?.emailVerified) {
        setUserVerified(true)
      }
    })

    // unsubscribing from user data changes
    return () => {
      subscriberToAuth()
      subscriberToUser()
    }
  }, [user])

  return { user, userVerified }
}
