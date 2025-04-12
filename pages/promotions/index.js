import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function PromotionsPage() {
  const { t } = useTranslation('common');
  
  // Données de démonstration pour les promotions saisonnières
  const seasonalDeals = [
    {
      id: 'spring-2025',
      title: 'Saison Printemps 2025',
      description: 'Découvrez notre sélection de produits pour profiter du printemps !',
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946',
      discount: 'Jusqu\'à 30% de réduction',
      endDate: '25 avril 2025'
    },
    {
      id: 'summer-ready',
      title: 'Préparez l\'été',
      description: 'Tout ce dont vous avez besoin pour être prêt pour l\'été',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      discount: 'Jusqu\'à 25% de réduction',
      endDate: '15 mai 2025'
    }
  ];
  
  // Promotions par catégorie
  const categoryDeals = [
    {
      category: 'Électronique',
      products: [
        {
          id: '1',
          title: 'Casque Audio Sans Fil Bluetooth - Réduction de Bruit Active',
          price: '89.99',
          originalPrice: '129.99',
          discount: '-30%',
          image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
        },
        {
          id: '3',
          title: 'Enceinte Bluetooth Portable Étanche',
          price: '49.99',
          originalPrice: '79.99',
          discount: '-38%',
          image: 'https://m.media-amazon.com/images/I/71bJHOF+jNL._AC_SL1500_.jpg',
        }
      ]
    },
    {
      category: 'Maison',
      products: [
        {
          id: '4',
          title: 'Machine à Café Automatique avec Broyeur à Grains',
          price: '249.99',
          originalPrice: '349.99',
          discount: '-28%',
          image: 'https://m.media-amazon.com/images/I/71VsYKBkpZL._AC_SL1500_.jpg',
        },
        {
          id: '5',
          title: 'Robot Aspirateur et Laveur Intelligent',
          price: '179.99',
          originalPrice: '249.99',
          discount: '-28%',
          image: 'https://m.media-amazon.com/images/I/61OzWwfusRL._AC_SL1500_.jpg',
        }
      ]
    }
  ];
  
  return (
    <Layout title="Promotions de Saison">
      <div className="promotions-page">
        <div className="hero-banner">
          <div className="hero-content">
            <h1>Nouvelle Saison '25 avril</h1>
            <p>Profitez de nos offres spéciales pour la nouvelle saison avec des réductions exclusives jusqu'à 40% !</p>
            <div className="countdown">
              <div className="countdown-item">
                <span className="count">13</span>
                <span className="label">Jours</span>
              </div>
              <div className="countdown-item">
                <span className="count">08</span>
                <span className="label">Heures</span>
              </div>
              <div className="countdown-item">
                <span className="count">45</span>
                <span className="label">Minutes</span>
              </div>
              <div className="countdown-item">
                <span className="count">29</span>
                <span className="label">Secondes</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="promotions-container">
          <section className="seasonal-deals">
            <h2>Promotions Saisonnières</h2>
            <div className="deals-grid">
              {seasonalDeals.map(deal => (
                <div key={deal.id} className="deal-card">
                  <div className="deal-image" style={{ backgroundImage: `url(${deal.image})` }}>
                    <div className="deal-discount">{deal.discount}</div>
                  </div>
                  <div className="deal-content">
                    <h3>{deal.title}</h3>
                    <p>{deal.description}</p>
                    <div className="deal-info">
                      <span className="end-date">Fin le {deal.endDate}</span>
                      <Link href={`/promotions/${deal.id}`} legacyBehavior>
                        <a className="view-deal">Voir les offres</a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {categoryDeals.map(category => (
            <section key={category.category} className="category-deals">
              <h2>{category.category}</h2>
              <div className="products-grid">
                {category.products.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-discount">{product.discount}</div>
                    <div className="product-image">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="product-details">
                      <Link href={`/product/${product.id}`} legacyBehavior>
                        <a className="product-title">{product.title}</a>
                      </Link>
                      <div className="product-pricing">
                        <span className="current-price">{product.price} €</span>
                        <span className="original-price">{product.originalPrice} €</span>
                      </div>
                      <Link href={`/product/${product.id}`} legacyBehavior>
                        <a className="view-product">Voir le produit</a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .promotions-page {
          padding-bottom: 3rem;
        }
        
        .hero-banner {
          background-color: #232f3e;
          background-image: linear-gradient(135deg, #232f3e 0%, #37475a 100%);
          color: white;
          padding: 3rem 0;
          margin-bottom: 2rem;
        }
        
        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          text-align: center;
        }
        
        .hero-content h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .countdown {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }
        
        .countdown-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .count {
          font-size: 2.5rem;
          font-weight: bold;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        
        .label {
          font-size: 0.9rem;
          color: #ccc;
        }
        
        .promotions-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .seasonal-deals {
          margin-bottom: 3rem;
        }
        
        h2 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #333;
        }
        
        .deals-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        
        .deal-card {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          background-color: white;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .deal-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .deal-image {
          height: 200px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .deal-discount {
          position: absolute;
          top: 15px;
          right: 15px;
          background-color: #cc0c39;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.9rem;
        }
        
        .deal-content {
          padding: 1.5rem;
        }
        
        .deal-content h3 {
          font-size: 1.5rem;
          margin-bottom: 0.75rem;
          color: #232f3e;
        }
        
        .deal-content p {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.5;
        }
        
        .deal-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .end-date {
          color: #e47911;
          font-weight: 500;
        }
        
        .view-deal {
          display: inline-block;
          background-color: #febd69;
          color: #232f3e;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .view-deal:hover {
          background-color: #f3a847;
        }
        
        .category-deals {
          margin-bottom: 3rem;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        .product-card {
          border: 1px solid #e3e3e3;
          border-radius: 8px;
          overflow: hidden;
          background-color: white;
          position: relative;
          transition: box-shadow 0.2s;
        }
        
        .product-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .product-discount {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #cc0c39;
          color: white;
          font-weight: bold;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        
        .product-image {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background-color: #f9f9f9;
        }
        
        .product-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .product-details {
          padding: 1rem;
        }
        
        .product-title {
          color: #0066c0;
          text-decoration: none;
          display: block;
          font-size: 0.95rem;
          line-height: 1.4;
          height: 4.2em;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }
        
        .product-title:hover {
          color: #c45500;
          text-decoration: underline;
        }
        
        .product-pricing {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
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
        
        .view-product {
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
        
        .view-product:hover {
          background-color: #f3a847;
        }
        
        @media (max-width: 992px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .countdown-item .count {
            width: 60px;
            height: 60px;
            font-size: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .deals-grid {
            grid-template-columns: 1fr;
          }
          
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .hero-content p {
            font-size: 1rem;
          }
          
          .countdown {
            gap: 0.75rem;
          }
          
          .countdown-item .count {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
          
          .countdown {
            gap: 0.5rem;
          }
          
          .countdown-item .count {
            width: 40px;
            height: 40px;
            font-size: 1.25rem;
          }
          
          .label {
            font-size: 0.8rem;
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
