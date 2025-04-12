import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/Layout';

export default function PrivacyPage() {
  const { t } = useTranslation('common');
  
  return (
    <Layout title={t('footer.privacy')}>
      <div className="legal-page">
        <h1>{t('footer.privacy')}</h1>
        
        <section className="legal-section">
          <h2>1. Collecte d'informations</h2>
          <p>
            𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒 ne collecte pas directement d'informations personnelles identifiables vous concernant, sauf si vous choisissez de nous les fournir. Nous pouvons recueillir des informations non personnelles sur votre visite, comme les pages que vous consultez ou la durée de votre visite.
          </p>
          <p>
            Lorsque vous cliquez sur des liens d'affiliation vers Amazon ou d'autres sites, ces sites peuvent collecter des données vous concernant conformément à leurs propres politiques de confidentialité.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>2. Utilisation des cookies</h2>
          <p>
            Notre site utilise des cookies pour améliorer votre expérience. Les cookies sont de petits fichiers texte stockés sur votre ordinateur qui nous aident à analyser l'utilisation du site et à personnaliser votre expérience.
          </p>
          <p>
            Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour indiquer quand un cookie est envoyé. Cependant, certaines fonctionnalités du site peuvent ne pas fonctionner correctement si les cookies sont désactivés.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>3. Liens d'affiliation Amazon</h2>
          <p>
            𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒 participe au Programme Partenaires d'Amazon. Cela signifie que lorsque vous cliquez sur un lien vers Amazon depuis notre site et effectuez un achat, nous recevons une petite commission sans frais supplémentaires pour vous.
          </p>
          <p>
            Amazon peut collecter et utiliser des informations conformément à sa propre politique de confidentialité. Nous vous encourageons à consulter la politique de confidentialité d'Amazon pour comprendre comment vos données sont traitées.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>4. Partage d'informations</h2>
          <p>
            Nous ne vendons, n'échangeons ni ne transférons de quelque autre manière que ce soit vos informations personnelles identifiables à des tiers. Cela n'inclut pas les tiers de confiance qui nous aident à exploiter notre site web ou à mener nos activités, tant que ces parties conviennent de garder ces informations confidentielles.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>5. Protection des informations</h2>
          <p>
            Nous mettons en œuvre diverses mesures de sécurité pour maintenir la sécurité de vos informations personnelles. Nous utilisons un cryptage sécurisé pour protéger les informations sensibles transmises en ligne.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>6. Consentement</h2>
          <p>
            En utilisant notre site, vous consentez à notre politique de confidentialité.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>7. Modifications de la politique de confidentialité</h2>
          <p>
            Si nous décidons de changer notre politique de confidentialité, nous publierons ces changements sur cette page. Cette politique a été mise à jour le 12 avril 2025.
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
