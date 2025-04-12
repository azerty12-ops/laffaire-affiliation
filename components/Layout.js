import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title = '𝑙\'𝑎𝑓𝑓𝑎𝑖𝑟𝑒', description = 'Site d\'affiliation Amazon' }) {
  const { t } = useTranslation('common');
  
  return (
    <>
      <Head>
        <title>{title} | {t('site_name')}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main className="container">
        {children}
      </main>
      
      <Footer />
    </>
  );
}
