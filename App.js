import React from 'react';
import Navigation from './src/navigation';
import { CustomStatusBar } from './src/components/CustomStatusBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <CustomStatusBar />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
