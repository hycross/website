import '@/styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react";
import AppContainer from "../components/AppContainer";
import type { AppProps } from 'next/app'
import theme from "../config/theme";
import { useState, useEffect } from 'react';
import SplashScreen from '../components/SplashScreen';

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <SplashScreen />
  ) : (
    <ChakraProvider theme={theme}>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </ChakraProvider>
  );
}