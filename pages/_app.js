import { appWithTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import LiveChat from '../components/LiveChat';
import '../styles/globals.css';
import '../styles/legal.css';
import '../styles/product.css';

function MyApp({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Éviter les erreurs de rendu côté serveur pour le composant LiveChat
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <>
      <Component {...pageProps} />
      {isMounted && <LiveChat />}
    </>
  );
}

export default appWithTranslation(MyApp);
