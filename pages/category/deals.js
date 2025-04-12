import { useState } from 'react';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../../components/Layout';

export default function DealsPage() {
  const { t } = useTranslation('common');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Liste des catégories pour les ventes flash
  const categories = [
    { id: 'all', name: 'Toutes les ventes' },
    { id: 'electronics', name: 'Électronique' },
    { id: 'home', name: 'Maison' },
    { id: 'fashion', name: 'Mode' },
    { id: 'beauty', name: 'Beauté' },
    { id: 'sports', name: 'Sports & Loisirs' }
  ];
  
  // Données de démonstration pour les ventes flash
  const flashDeals = [
    {
      id: '1',
      title: 'Casque Audio Sans Fil Bluetooth - Réduction de Bruit Active',
      category: 'electronics',
      price: '89.99',
      originalPrice: '129.99',
      discount: '-30%',
      image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
      endTime: '2025-04-13T23:59:59',
      percentSold: 65,
      rating: 4.5
    },
    {
      id: '3',
      title: 'Enceinte Bluetooth Portable Étanche',
      category: 'electronics',
      price: '49.99',
      originalPrice: '79.99',
      discount: '-38%',
      image: 'https://m.media-amazon.com/images/I/71bJHOF+jNL._AC_SL1500_.jpg',
      endTime: '2025-04-14T23:59:59',
      percentSold: 78,
      rating: 4.3
    },
    {
      id: '4',
      title: 'Machine à Café Automatique avec Broyeur à Grains',
      category: 'home',
      price: '249.99',
      originalPrice: '349.99',
      discount: '-28%',
      image: 'https://m.media-amazon.com/images/I/71VsYKBkpZL._AC_SL1500_.jpg',
      endTime: '2025-04-15T23:59:59',
      percentSold: 42,
      rating: 4.7
    },
    {
      id: '5',
      title: 'Robot Aspirateur et Laveur Intelligent',
      category: 'home',
      price: '179.99',
      originalPrice: '249.99',
      discount: '-28%',
      image: 'https://m.media-amazon.com/images/I/61OzWwfusRL._AC_SL1500_.jpg',
      endTime: '2025-04-13T23:59:59',
      percentSold: 85,
      rating: 4.4
    },
    {
      id: '6',
      title: 'Montre Connectée avec Mesure SpO2 et Suivi du Sommeil',
      category: 'electronics',
      price: '89.99',
      originalPrice: '129.99',
      discount: '-30%',
      image: 'https://m.media-amazon.com/images/I/61GXQtA4T8L._AC_SL1500_.jpg',
      endTime: '2025-04-14T23:59:59',
      percentSold: 53,
      rating: 4.6
    },
    {
      id: '7',
      title: 'Chaussures de Running Légères pour Homme',
      category: 'fashion',
      price: '59.99',
      originalPrice: '89.99',
      discount: '-33%',
      image: 'https://m.media-amazon.com/images/I/71UeYgGrToL._AC_UY500_.jpg',
      endTime: '2025-04-16T23:59:59',
      percentSold: 37,
      rating: 4.2
    },
    {
      id: '8',
      title: 'Sèche-Cheveux Ionique Professionnel',
      category: 'beauty',
      price: '39.99',
      originalPrice: '59.99',
      discount: '-33%',
      image: 'https://m.media-amazon.com/images/I/71FAovMQwIL._SL1500_.jpg',
      endTime: '2025-04-15T23:59:59',
      percentSold: 62,
      rating: 4.4
    },
    {
      id: '9',
      title: 'Tente de Camping Familiale 4 Personnes',
      category: 'sports',
      price: '119.99',
      originalPrice: '169.99',
      discount: '-29%',
      image: 'https://m.media-amazon.com/images/I/61n6Es+4dKL._AC_SL1200_.jpg',
      endTime: '2025-04-17T23:59:59',
      percentSold: 28,
      rating: 4.3
    }
  ];
  
  // Filtrer les offres en fonction de la catégorie active
  const filteredDeals = activeCategory === 'all' 
    ? flashDeals 
    : flashDeals.filter(deal => deal.category === activeCategory);
    
  // Formater l'heure de fin
  const formatEndTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'long',
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <Layout title="Ventes Flash">
      <div className="deals-page">
        <div className="deals-header">
          <div className="deals-container">
            <h1>Ventes Flash</h1>
            <p>Offres à durée limitée sur une sélection de produits. Faites vite !</p>
          </div>
        </div>
        
        <div className="deals-container">
          <div className="categories-filter">
            <ul>
              {categories.map(category => (
                <li key={category.id}>
                  <button 
                    className={activeCategory === category.id ? 'active' : ''}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="deals-grid">
            {filteredDeals.map(deal => (
              <div key={deal.id} className="deal-card">
                <div className="deal-discount">{deal.discount}</div>
                <div className="deal-image">
                  <img src={deal.image} alt={deal.title} />
                </div>
                <div className="deal-details">
                  <Link href={`/product/${deal.id}`} legacyBehavior>
                    <a className="deal-title">{deal.title}</a>
                  </Link>
                  
                  <div className="deal-rating">
                    {'★'.repeat(Math.floor(deal.rating))}
                    {'☆'.repeat(5 - Math.floor(deal.rating))}
                    <span className="rating-count">{deal.rating}</span>
                  </div>
                  
                  <div className="deal-pricing">
                    <span className="current-price">{deal.price} €</span>
                    <span className="original-price">{deal.originalPrice} €</span>
                  </div>
                  
                  <div className="deal-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${deal.percentSold}%` }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {deal.percentSold}% vendus
                    </div>
                  </div>
                  
                  <div className="deal-time">
                    <span className="time-icon">⏱️</span>
                    <span className="time-text">
                      Termine le {formatEndTime(deal.endTime)}
                    </span>
                  </div>
                  
                  <Link href={`/product/${deal.id}`} legacyBehavior>
                    <a className="view-deal">Voir l'offre</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {filteredDeals.length === 0 && (
            <div className="no-deals">
              <p>Aucune vente flash disponible pour cette catégorie actuellement.</p>
              <button onClick={() => setActiveCategory('all')} className="reset-filter">
                Afficher toutes les ventes
              </button>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .deals-page {
          padding-bottom: 3rem;
        }
        
        .deals-header {
          background-color: #232f3e;
          padding: 2rem 0;
          margin-bottom: 2rem;
          color: white;
        }
        
        .deals-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        
        .deals-header p {
          font-size: 1.1rem;
          opacity: 0.8;
        }
        
        .categories-filter {
          margin-bottom: 2rem;
          border-bottom: 1px solid #e3e3e3;
        }
        
        .categories-filter ul {
          display: flex;
          list-style: none;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          gap: 0.5rem;
        }
        
        .categories-filter button {
          background: none;
          border: none;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          cursor: pointer;
          white-space: nowrap;
          border-radius: 20px;
          transition: all 0.2s;
        }
        
        .categories-filter button:hover {
          background-color: #f5f5f5;
        }
        
        .categories-filter button.active {
          background-color: #febd69;
          color: #232f3e;
          font-weight: 500;
        }
        
        .deals-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .deal-card {
          border: 1px solid #e3e3e3;
          border-radius: 8px;
          overflow: hidden;
          background-color: white;
          position: relative;
          transition: box-shadow 0.2s;
        }
        
        .deal-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .deal-discount {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #cc0c39;
          color: white;
          font-weight: bold;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.9rem;
          z-index: 1;
        }
        
        .deal-image {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background-color: #f9f9f9;
        }
        
        .deal-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .deal-details {
          padding: 1rem;
        }
        
        .deal-title {
          color: #0066c0;
          text-decoration: none;
          display: block;
          font-size: 0.95rem;
          line-height: 1.4;
          height: 4.2em;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        
        .deal-title:hover {
          color: #c45500;
          text-decoration: underline;
        }
        
        .deal-rating {
          color: #ff9900;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        
        .rating-count {
          color: #555;
          margin-left: 0.25rem;
        }
        
        .deal-pricing {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        
        .current-price {
          font-size: 1.2rem;
          font-weight: bold;
          color: #B12704;
        }
        
        .original-price {
          font-size: 0.9rem;
          color: #888;
          text-decoration: line-through;
        }
        
        .deal-progress {
          margin-bottom: 0.75rem;
        }
        
        .progress-bar {
          height: 8px;
          background-color: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.25rem;
        }
        
        .progress-fill {
          height: 100%;
          background-color: #cc0c39;
          border-radius: 4px;
        }
        
        .progress-text {
          font-size: 0.8rem;
          color: #cc0c39;
          font-weight: 500;
        }
        
        .deal-time {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          color: #555;
          font-size: 0.9rem;
        }
        
        .view-deal {
          display: inline-block;
          width: 100%;
          background-color: #febd69;
          color: #232f3e;
          text-align: center;
          padding: 0.5rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .view-deal:hover {
          background-color: #f3a847;
        }
        
        .no-deals {
          text-align: center;
          padding: 3rem;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        
        .no-deals p {
          margin-bottom: 1rem;
          color: #666;
        }
        
        .reset-filter {
          background-color: #febd69;
          color: #232f3e;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .reset-filter:hover {
          background-color: #f3a847;
        }
        
        @media (max-width: 992px) {
          .deals-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .deals-header h1 {
            font-size: 1.5rem;
          }
          
          .deals-header p {
            font-size: 1rem;
          }
        }
        
        @media (max-width: 576px) {
          .deals-grid {
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
