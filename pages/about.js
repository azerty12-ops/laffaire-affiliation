import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/Layout';

export default function AboutPage() {
  const { t } = useTranslation('common');
  
  return (
    <Layout title={t('footer.about')}>
      <div className="legal-page">
        <h1>{t('footer.about')}</h1>
        
        <section className="legal-section">
          <h2>À propos de 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒</h2>
          <p>
            Bienvenue sur 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒, votre destination en ligne pour découvrir les meilleurs produits disponibles sur Amazon. Notre mission est de vous aider à trouver des produits de qualité au meilleur prix.
          </p>
          <p>
            En tant que site d'affiliation Amazon, nous sélectionnons soigneusement des produits dans différentes catégories pour vous offrir une expérience de shopping en ligne optimale.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>Notre Vision</h2>
          <p>
            Chez 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒, nous croyons que le shopping en ligne devrait être simple, agréable et fiable. C'est pourquoi nous nous efforçons de vous présenter uniquement des produits de qualité avec des descriptions détaillées et honnêtes.
          </p>
          <p>
            Notre objectif est de devenir votre ressource de confiance pour tous vos besoins d'achat en ligne, en vous aidant à prendre des décisions d'achat éclairées.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>Comment Nous Fonctionnons</h2>
          <p>
            𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒 participe au Programme Partenaires d'Amazon, un programme d'affiliation conçu pour permettre à des sites de percevoir une rémunération grâce à la création de liens vers Amazon.
          </p>
          <p>
            Lorsque vous cliquez sur un lien de notre site et effectuez un achat sur Amazon, nous recevons une petite commission sans frais supplémentaires pour vous. Cela nous aide à maintenir ce site et à continuer à vous fournir des recommandations de produits de qualité.
          </p>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
