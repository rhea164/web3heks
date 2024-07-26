import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import Navigation from './Navigation';
import { Provider } from './src/context/PostContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Provider>
        <Navigation />
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}