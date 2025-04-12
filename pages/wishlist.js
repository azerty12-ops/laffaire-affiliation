import { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import Head from 'next/head';

export default function WishlistPage() {
  const { t } = useTranslation('common');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  
  useEffect(() => {
    // Récupérer la liste de souhaits du localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(wishlist);
    setIsLoading(false);
    setIsEmpty(wishlist.length === 0);
  }, []);
  
  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    // Mettre à jour le compteur dans la navigation
    document.dispatchEvent(new CustomEvent('wishlist-updated', { 
      detail: { count: updatedWishlist.length } 
    }));
    
    if (updatedWishlist.length === 0) {
      setIsEmpty(true);
    }
  };
  
  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.setItem('wishlist', JSON.stringify([]));
    
    // Mettre à jour le compteur dans la navigation
    document.dispatchEvent(new CustomEvent('wishlist-updated', { 
      detail: { count: 0 } 
    }));
    
    setIsEmpty(true);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Layout>
      <Head>
        <title>Ma Liste de Souhaits | 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒</title>
        <meta name="description" content="Consultez et gérez votre liste de souhaits personnalisée avec tous les produits que vous avez sauvegardés pour plus tard." />
        <link rel="canonical" href="https://laffaire-italique.windsurf.build/wishlist" />
      </Head>

      <div className="wishlist-container">
        <header className="wishlist-header">
          <h1>Ma Liste de Souhaits</h1>
          <p className="wishlist-intro">
            Retrouvez ici tous les produits que vous avez sauvegardés pour les consulter ultérieurement.
          </p>
        </header>

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Chargement de votre liste de souhaits...</p>
          </div>
        ) : isEmpty ? (
          <div className="empty-wishlist">
            <div className="empty-icon">💔</div>
            <h2>Votre liste de souhaits est vide</h2>
            <p>Vous n'avez pas encore ajouté de produits à votre liste de souhaits.</p>
            <Link href="/" legacyBehavior>
              <a className="browse-button">Découvrir nos produits</a>
            </Link>
          </div>
        ) : (
          <>
            <div className="wishlist-actions">
              <div className="wishlist-count">
                <strong>{wishlistItems.length}</strong> produit{wishlistItems.length > 1 ? 's' : ''} dans votre liste
              </div>
              <button onClick={clearWishlist} className="clear-wishlist">
                Vider la liste
              </button>
            </div>

            <div className="wishlist-grid">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item">
                  <button 
                    className="remove-button" 
                    onClick={() => removeFromWishlist(item.id)}
                    aria-label="Retirer de la liste de souhaits"
                  >
                    ×
                  </button>
                  
                  <Link href={`/product/${item.id}`} legacyBehavior>
                    <a className="item-link">
                      <div className="item-image">
                        <Image 
                          src={item.image} 
                          alt={item.title}
                          width={150}
                          height={150}
                          objectFit="contain"
                        />
                      </div>
                      <div className="item-details">
                        <h3 className="item-title">{item.title}</h3>
                        <div className="item-price">{item.price}€</div>
                        <div className="item-date">
                          Ajouté le {formatDate(item.dateAdded)}
                        </div>
                      </div>
                    </a>
                  </Link>
                  
                  <div className="item-actions">
                    <a 
                      href={item.amazonUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="amazon-button"
                    >
                      Acheter sur Amazon
                    </a>
                    <Link href={`/product/${item.id}`} legacyBehavior>
                      <a className="view-details">
                        Voir les détails
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .wishlist-container {
          padding: 2rem 0;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .wishlist-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .wishlist-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .wishlist-intro {
          color: #666;
        }
        
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-left-color: var(--primary-color);
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .empty-wishlist {
          text-align: center;
          padding: 3rem;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        
        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        
        .empty-wishlist h2 {
          margin-bottom: 1rem;
        }
        
        .empty-wishlist p {
          margin-bottom: 2rem;
          color: #666;
        }
        
        .browse-button {
          display: inline-block;
          background-color: var(--primary-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-weight: bold;
          transition: background-color 0.2s;
        }
        
        .browse-button:hover {
          background-color: #3a4e64;
        }
        
        .wishlist-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }
        
        .clear-wishlist {
          background: none;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          color: var(--error-color);
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .clear-wishlist:hover {
          background-color: #fff5f5;
          border-color: var(--error-color);
        }
        
        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .wishlist-item {
          position: relative;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 1.5rem;
          background-color: white;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .wishlist-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .remove-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #f9f9f9;
          border: 1px solid #eee;
          color: #666;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 1;
        }
        
        .remove-button:hover {
          background-color: #ffebee;
          color: var(--error-color);
          border-color: #ffcdd2;
        }
        
        .item-link {
          display: block;
          color: inherit;
          text-decoration: none;
        }
        
        .item-image {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }
        
        .item-details {
          margin-bottom: 1.5rem;
        }
        
        .item-title {
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .item-price {
          font-size: 1.3rem;
          font-weight: bold;
          color: var(--error-color);
          margin-bottom: 0.5rem;
        }
        
        .item-date {
          font-size: 0.9rem;
          color: #888;
        }
        
        .item-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .amazon-button {
          display: block;
          background-color: var(--secondary-color);
          color: var(--text-color);
          padding: 0.75rem 0;
          border-radius: 4px;
          font-weight: bold;
          text-align: center;
          transition: all 0.2s;
        }
        
        .amazon-button:hover {
          background-color: #f0a94c;
        }
        
        .view-details {
          display: block;
          text-align: center;
          padding: 0.75rem 0;
          border: 1px solid var(--primary-color);
          border-radius: 4px;
          color: var(--primary-color);
          transition: all 0.2s;
        }
        
        .view-details:hover {
          background-color: #f0f7ff;
        }
        
        @media (max-width: 768px) {
          .wishlist-grid {
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
