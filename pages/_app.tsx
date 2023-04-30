import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react';
import SplashScreen from '../components/SplashScreen';

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10000);

    return () => clearTimeout(timer);
  }, []);

  return loading ? <SplashScreen /> : <Component {...pageProps} />
}