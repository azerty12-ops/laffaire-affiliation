import { useState } from 'react';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../../components/Layout';

export default function GiftIdeasPage() {
  const { t } = useTranslation('common');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePriceRange, setActivePriceRange] = useState('all');
  
  // Filtres de type de cadeau
  const giftFilters = [
    { id: 'all', name: 'Tous les cadeaux' },
    { id: 'for-him', name: 'Pour lui' },
    { id: 'for-her', name: 'Pour elle' },
    { id: 'for-kids', name: 'Pour les enfants' },
    { id: 'for-home', name: 'Pour la maison' },
    { id: 'for-tech', name: 'Pour les technophiles' }
  ];
  
  // Filtres de prix
  const priceFilters = [
    { id: 'all', name: 'Tous les prix' },
    { id: 'under-20', name: 'Moins de 20€' },
    { id: '20-50', name: '20€ - 50€' },
    { id: '50-100', name: '50€ - 100€' },
    { id: 'above-100', name: 'Plus de 100€' }
  ];
  
  // Données de démonstration pour les collections de cadeaux
  const giftCollections = [
    {
      id: 'top-gifts',
      title: 'Meilleures idées cadeaux',
      description: 'Notre sélection des cadeaux les plus populaires pour toutes les occasions',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'birthday-gifts',
      title: 'Cadeaux d\'anniversaire',
      description: 'Faites plaisir pour un anniversaire avec ces idées originales',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'christmas-gifts',
      title: 'Cadeaux de Noël',
      description: 'Trouvez l\'inspiration pour des cadeaux de Noël qui feront mouche',
      image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    }
  ];
  
  // Données de démonstration pour les idées cadeaux
  const giftIdeas = [
    {
      id: '1',
      title: 'Casque Audio Sans Fil Bluetooth - Réduction de Bruit Active',
      category: 'for-tech',
      price: 89.99,
      image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
      priceRange: '50-100',
      rating: 4.5
    },
    {
      id: '3',
      title: 'Enceinte Bluetooth Portable Étanche',
      category: 'for-tech',
      price: 49.99,
      image: 'https://m.media-amazon.com/images/I/71bJHOF+jNL._AC_SL1500_.jpg',
      priceRange: '20-50',
      rating: 4.3
    },
    {
      id: '4',
      title: 'Machine à Café Automatique avec Broyeur à Grains',
      category: 'for-home',
      price: 249.99,
      image: 'https://m.media-amazon.com/images/I/71VsYKBkpZL._AC_SL1500_.jpg',
      priceRange: 'above-100',
      rating: 4.7
    },
    {
      id: '6',
      title: 'Montre Connectée avec Mesure SpO2 et Suivi du Sommeil',
      category: 'for-tech',
      price: 89.99,
      image: 'https://m.media-amazon.com/images/I/61GXQtA4T8L._AC_SL1500_.jpg',
      priceRange: '50-100',
      rating: 4.6
    },
    {
      id: '7',
      title: 'Chaussures de Running Légères pour Homme',
      category: 'for-him',
      price: 59.99,
      image: 'https://m.media-amazon.com/images/I/71UeYgGrToL._AC_UY500_.jpg',
      priceRange: '50-100',
      rating: 4.2
    },
    {
      id: '8',
      title: 'Sèche-Cheveux Ionique Professionnel',
      category: 'for-her',
      price: 39.99,
      image: 'https://m.media-amazon.com/images/I/71FAovMQwIL._SL1500_.jpg',
      priceRange: '20-50',
      rating: 4.4
    },
    {
      id: '10',
      title: 'Set de Maquillage Professionnel',
      category: 'for-her',
      price: 29.99,
      image: 'https://m.media-amazon.com/images/I/81oqaKFmHEL._AC_SL1500_.jpg',
      priceRange: '20-50',
      rating: 4.5
    },
    {
      id: '11',
      title: 'Robot de Construction pour Enfants',
      category: 'for-kids',
      price: 19.99,
      image: 'https://m.media-amazon.com/images/I/71DQ0OhL3jL._AC_SL1500_.jpg',
      priceRange: 'under-20',
      rating: 4.3
    },
    {
      id: '12',
      title: 'Coffret Vin Premium avec Accessoires',
      category: 'for-him',
      price: 49.99,
      image: 'https://m.media-amazon.com/images/I/81YMn3tEk3L._AC_SL1500_.jpg',
      priceRange: '20-50',
      rating: 4.8
    },
    {
      id: '13',
      title: 'Robot Pâtissier Multifonction',
      category: 'for-home',
      price: 129.99,
      image: 'https://m.media-amazon.com/images/I/619pmDi+G9L._AC_SL1500_.jpg',
      priceRange: 'above-100',
      rating: 4.7
    },
    {
      id: '14',
      title: 'Peluche Interactive pour Enfants',
      category: 'for-kids',
      price: 24.99,
      image: 'https://m.media-amazon.com/images/I/71lT-zTK2WL._AC_SL1500_.jpg',
      priceRange: '20-50',
      rating: 4.4
    },
    {
      id: '15',
      title: 'Diffuseur d\'Huiles Essentielles avec LED',
      category: 'for-home',
      price: 19.99,
      image: 'https://m.media-amazon.com/images/I/61ksXO9h2IL._AC_SL1500_.jpg',
      priceRange: 'under-20',
      rating: 4.6
    }
  ];
  
  // Filtrer les idées cadeaux
  const filteredGifts = giftIdeas.filter(gift => {
    const typeMatch = activeFilter === 'all' || gift.category === activeFilter;
    const priceMatch = activePriceRange === 'all' || gift.priceRange === activePriceRange;
    return typeMatch && priceMatch;
  });
  
  // Fonction pour obtenir le prix formaté
  const formatPrice = (price) => {
    return price.toFixed(2) + ' €';
  };

  return (
    <Layout title="Idées Cadeaux">
      <div className="gift-ideas-page">
        <div className="hero-banner">
          <div className="hero-content">
            <h1>Idées Cadeaux</h1>
            <p>Trouvez le cadeau parfait pour chaque occasion et chaque personne</p>
          </div>
        </div>
        
        <div className="gift-container">
          <section className="gift-collections">
            <h2>Collections Cadeaux</h2>
            <div className="collections-grid">
              {giftCollections.map(collection => (
                <div key={collection.id} className="collection-card">
                  <div className="collection-image" style={{ backgroundImage: `url(${collection.image})` }}>
                    <div className="collection-content">
                      <h3>{collection.title}</h3>
                      <p>{collection.description}</p>
                      <Link href={`/category/gift-ideas/${collection.id}`} legacyBehavior>
                        <a className="view-collection">Explorer</a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section className="gift-ideas">
            <h2>Idées Cadeaux</h2>
            
            <div className="filters-container">
              <div className="filter-group">
                <span className="filter-label">Filtrer par :</span>
                <div className="filters">
                  {giftFilters.map(filter => (
                    <button 
                      key={filter.id}
                      className={activeFilter === filter.id ? 'active' : ''}
                      onClick={() => setActiveFilter(filter.id)}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="filter-group">
                <span className="filter-label">Prix :</span>
                <div className="filters">
                  {priceFilters.map(filter => (
                    <button 
                      key={filter.id}
                      className={activePriceRange === filter.id ? 'active' : ''}
                      onClick={() => setActivePriceRange(filter.id)}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {filteredGifts.length > 0 ? (
              <div className="gifts-grid">
                {filteredGifts.map(gift => (
                  <div key={gift.id} className="gift-card">
                    <div className="gift-image">
                      <img src={gift.image} alt={gift.title} />
                    </div>
                    <div className="gift-details">
                      <Link href={`/product/${gift.id}`} legacyBehavior>
                        <a className="gift-title">{gift.title}</a>
                      </Link>
                      
                      <div className="gift-rating">
                        {'★'.repeat(Math.floor(gift.rating))}
                        {'☆'.repeat(5 - Math.floor(gift.rating))}
                        <span className="rating-count">{gift.rating}</span>
                      </div>
                      
                      <div className="gift-price">
                        {formatPrice(gift.price)}
                      </div>
                      
                      <Link href={`/product/${gift.id}`} legacyBehavior>
                        <a className="view-gift">Voir le produit</a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-gifts">
                <p>Aucun cadeau correspondant à vos critères.</p>
                <button 
                  onClick={() => {
                    setActiveFilter('all');
                    setActivePriceRange('all');
                  }}
                  className="reset-filters"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      
      <style jsx>{`
        .gift-ideas-page {
          padding-bottom: 3rem;
        }
        
        .hero-banner {
          background-color: #232f3e;
          background-image: linear-gradient(45deg, #232f3e 0%, #37475a 100%);
          color: white;
          padding: 3rem 0;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .hero-content h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .hero-content p {
          font-size: 1.2rem;
          opacity: 0.8;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .gift-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        h2 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #333;
        }
        
        .gift-collections {
          margin-bottom: 3rem;
        }
        
        .collections-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .collection-card {
          border-radius: 8px;
          overflow: hidden;
          height: 300px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .collection-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .collection-image {
          position: relative;
          height: 100%;
          background-size: cover;
          background-position: center;
        }
        
        .collection-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%);
        }
        
        .collection-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          color: white;
        }
        
        .collection-content h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .collection-content p {
          font-size: 0.9rem;
          margin-bottom: 1rem;
          opacity: 0.9;
        }
        
        .view-collection {
          display: inline-block;
          background-color: #febd69;
          color: #232f3e;
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .view-collection:hover {
          background-color: #f3a847;
        }
        
        .filters-container {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .filter-group {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        
        .filter-label {
          font-weight: 500;
          color: #333;
          min-width: 100px;
        }
        
        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .filters button {
          background: none;
          border: 1px solid #ddd;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .filters button:hover {
          background-color: #f5f5f5;
        }
        
        .filters button.active {
          background-color: #febd69;
          border-color: #febd69;
          color: #232f3e;
          font-weight: 500;
        }
        
        .gifts-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        .gift-card {
          border: 1px solid #e3e3e3;
          border-radius: 8px;
          overflow: hidden;
          background-color: white;
          transition: box-shadow 0.2s;
        }
        
        .gift-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .gift-image {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background-color: #f9f9f9;
        }
        
        .gift-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .gift-details {
          padding: 1rem;
        }
        
        .gift-title {
          color: #0066c0;
          text-decoration: none;
          display: block;
          font-size: 0.9rem;
          line-height: 1.4;
          height: 5em;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        
        .gift-title:hover {
          color: #c45500;
          text-decoration: underline;
        }
        
        .gift-rating {
          color: #ff9900;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        
        .rating-count {
          color: #555;
          margin-left: 0.25rem;
        }
        
        .gift-price {
          font-size: 1.1rem;
          font-weight: bold;
          color: #B12704;
          margin-bottom: 1rem;
        }
        
        .view-gift {
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
        
        .view-gift:hover {
          background-color: #f3a847;
        }
        
        .no-gifts {
          text-align: center;
          padding: 3rem;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        
        .no-gifts p {
          margin-bottom: 1rem;
          color: #666;
        }
        
        .reset-filters {
          background-color: #febd69;
          color: #232f3e;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .reset-filters:hover {
          background-color: #f3a847;
        }
        
        @media (max-width: 992px) {
          .collections-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .gifts-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .hero-content p {
            font-size: 1rem;
          }
          
          .gifts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .filter-group {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .filter-label {
            min-width: auto;
          }
        }
        
        @media (max-width: 576px) {
          .collections-grid {
            grid-template-columns: 1fr;
          }
          
          .gifts-grid {
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
