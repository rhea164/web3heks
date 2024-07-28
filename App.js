import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import Navigation from './Navigation';
import { Provider as PostProvider } from './src/context/PostContext';
import { Provider as BalanceProvider } from './src/context/BalanceContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <BalanceProvider>
          <PostProvider>
            <Navigation />
          </PostProvider>
        </BalanceProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}