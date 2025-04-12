import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../../components/Layout';

export default function AccountPage() {
  const { t } = useTranslation('common');
  
  return (
    <Layout title="Compte et Listes">
      <div className="account-page">
        <div className="account-container">
          <h1>Compte et Listes</h1>
          
          <div className="account-grid">
            <div className="account-section">
              <h2>Votre compte</h2>
              <div className="account-card">
                <div className="card-content">
                  <h3>Vos commandes</h3>
                  <p>Suivez, retournez ou achetez à nouveau des articles</p>
                  <a href="/orders" className="account-link">Voir vos commandes</a>
                </div>
              </div>
              
              <div className="account-card">
                <div className="card-content">
                  <h3>Informations de connexion et sécurité</h3>
                  <p>Modifiez votre nom, e-mail ou mot de passe</p>
                  <a href="/account/security" className="account-link">Modifier</a>
                </div>
              </div>
              
              <div className="account-card">
                <div className="card-content">
                  <h3>Adresses</h3>
                  <p>Modifiez vos adresses et préférences de livraison</p>
                  <a href="/account/addresses" className="account-link">Modifier</a>
                </div>
              </div>
            </div>
            
            <div className="account-section">
              <h2>Vos listes</h2>
              <div className="account-card">
                <div className="card-content">
                  <h3>Liste de souhaits</h3>
                  <p>Gérez vos produits sauvegardés</p>
                  <a href="/wishlist" className="account-link">Voir votre liste</a>
                </div>
              </div>
              
              <div className="account-card">
                <div className="card-content">
                  <h3>Alertes de prix</h3>
                  <p>Suivez les changements de prix des produits qui vous intéressent</p>
                  <a href="/account/price-alerts" className="account-link">Voir vos alertes</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .account-page {
          padding: 2rem 0;
        }
        
        .account-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        h1 {
          margin-bottom: 2rem;
          font-size: 1.8rem;
          color: #333;
          border-bottom: 1px solid #e3e3e3;
          padding-bottom: 0.5rem;
        }
        
        .account-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        
        .account-section h2 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #333;
        }
        
        .account-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: all 0.2s;
        }
        
        .account-card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        
        .card-content {
          padding: 1.5rem;
        }
        
        .card-content h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #232f3e;
        }
        
        .card-content p {
          color: #666;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        
        .account-link {
          display: inline-block;
          color: #0066c0;
          text-decoration: none;
          font-size: 0.9rem;
        }
        
        .account-link:hover {
          color: #c45500;
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          .account-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
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
