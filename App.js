// App.js
import React, { useContext, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import Navigation from './Navigation';
import { Provider as PostProvider } from './src/context/PostContext';
import { Provider as BalanceProvider, Context as BalanceContext } from './src/context/BalanceContext'

const AppContent = () => {
  const { initializeAccount } = useContext(BalanceContext);

  useEffect(() => {
    initializeAccount();
  }, [initializeAccount]);

  return <Navigation />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <PostProvider>
          <BalanceProvider>
            <AppContent />
          </BalanceProvider>
        </PostProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}