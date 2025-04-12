import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/Layout';

export default function TermsPage() {
  const { t } = useTranslation('common');
  
  return (
    <Layout title={t('footer.terms')}>
      <div className="legal-page">
        <h1>{t('footer.terms')}</h1>
        
        <section className="legal-section">
          <h2>1. Conditions Générales</h2>
          <p>
            Bienvenue sur 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒, un site d'affiliation Amazon. En accédant à ce site, vous acceptez d'être lié par les présentes conditions d'utilisation, toutes les lois et réglementations applicables, et acceptez que vous êtes responsable du respect des lois locales applicables.
          </p>
          <p>
            Si vous n'acceptez pas l'une de ces conditions, il vous est interdit d'utiliser ou d'accéder à ce site. Les documents contenus dans ce site web sont protégés par le droit d'auteur et les lois sur les marques applicables.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>2. Liens d'Affiliation</h2>
          <p>
            𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒 participe au Programme Partenaires d'Amazon, un programme d'affiliation conçu pour permettre à des sites de percevoir une rémunération grâce à la création de liens vers Amazon.
          </p>
          <p>
            Lorsque vous cliquez sur un lien d'affiliation et effectuez un achat sur Amazon, nous recevons une commission sans frais supplémentaires pour vous.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>3. Limitation de Responsabilité</h2>
          <p>
            Les documents sur le site web de 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒 sont fournis "tels quels". 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒 ne donne aucune garantie, expresse ou implicite, et décline et nie par la présente toutes les autres garanties, y compris, sans limitation, les garanties implicites ou les conditions de qualité marchande, d'adéquation à un usage particulier, ou de non-violation de la propriété intellectuelle ou autre violation des droits.
          </p>
          <p>
            En aucun cas, 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒 ou ses fournisseurs ne seront responsables de tout dommage (y compris, sans limitation, les dommages pour perte de données ou de profit, ou en raison d'une interruption d'activité) découlant de l'utilisation ou de l'impossibilité d'utiliser les documents sur le site Internet de 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒, même si 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒 ou un représentant autorisé de 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒 a été informé oralement ou par écrit de la possibilité de tels dommages.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>4. Modifications</h2>
          <p>
            𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒 peut réviser ces conditions d'utilisation de son site web à tout moment sans préavis. En utilisant ce site web, vous acceptez d'être lié par la version alors en vigueur des présentes conditions d'utilisation.
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
