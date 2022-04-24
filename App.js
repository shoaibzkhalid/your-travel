import React from 'react'
import Navigation from './src/navigation'
import { CustomStatusBar } from './src/components/CustomStatusBar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications

const App = () => {
  return (
    <SafeAreaProvider>
      <CustomStatusBar />
      <Navigation />
    </SafeAreaProvider>
  )
}

export default App
