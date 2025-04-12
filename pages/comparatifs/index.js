import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import Head from 'next/head';

// Données simulées pour les comparatifs
const comparatifs = [
  {
    id: 'meilleurs-smartphones-2025',
    title: 'Les 10 Meilleurs Smartphones de 2025',
    excerpt: 'Comparatif complet des smartphones haut de gamme, milieu de gamme et entrée de gamme avec tests, benchmarks et analyses détaillées.',
    image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg',
    category: 'Smartphones',
    date: '12 avril 2025',
    productCount: 10
  },
  {
    id: 'top-aspirateurs-robots',
    title: 'Comparatif: Les Meilleurs Aspirateurs Robots en 2025',
    excerpt: 'Découvrez notre comparatif des aspirateurs robots les plus performants du marché, avec tests d\'aspiration, de navigation et d\'autonomie.',
    image: 'https://m.media-amazon.com/images/I/71uxzcDhACL._AC_SL1500_.jpg',
    category: 'Électroménager',
    date: '8 avril 2025',
    productCount: 8
  },
  {
    id: 'meilleures-tablettes',
    title: 'Top 7 des Meilleures Tablettes en 2025',
    excerpt: 'Analyse comparative des tablettes tactiles les plus performantes, avec tests d\'écran, de performances et d\'autonomie.',
    image: 'https://m.media-amazon.com/images/I/61utX8kBDlL._AC_SL1500_.jpg',
    category: 'Tablettes',
    date: '5 avril 2025',
    productCount: 7
  },
  {
    id: 'comparatif-montres-connectees',
    title: 'Comparatif des Montres Connectées: Le Top 8 de 2025',
    excerpt: 'Tests et comparaison des meilleures montres connectées du marché, avec analyse des fonctionnalités santé, sport et connectivité.',
    image: 'https://m.media-amazon.com/images/I/61Ww4abGxCL._AC_SL1500_.jpg',
    category: 'Wearables',
    date: '2 avril 2025',
    productCount: 8
  },
  {
    id: 'casques-audio-comparatif',
    title: 'Les 6 Meilleurs Casques Audio Sans Fil de 2025',
    excerpt: 'Comparatif détaillé des meilleurs casques audio sans fil avec réduction de bruit, tests sonores et évaluation du confort.',
    image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
    category: 'Audio',
    date: '30 mars 2025',
    productCount: 6
  },
  {
    id: 'enceintes-bluetooth-comparatif',
    title: 'Comparatif: Top 5 des Meilleures Enceintes Bluetooth',
    excerpt: 'Tests et comparaison des enceintes Bluetooth portables les plus performantes, avec analyses audio et tests d\'autonomie.',
    image: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg',
    category: 'Audio',
    date: '25 mars 2025',
    productCount: 5
  },
];

export default function ComparatifsIndex() {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <Head>
        <title>Comparatifs de Produits | 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒</title>
        <meta name="description" content="Découvrez nos comparatifs détaillés des meilleurs produits du marché. Tests, analyses et recommandations pour vous aider à faire le meilleur choix." />
        <meta name="keywords" content="comparatif produits, tests produits, meilleurs produits, analyse comparative, top produits" />
        <link rel="canonical" href="https://laffaire-italique.windsurf.build/comparatifs" />
      </Head>

      <div className="comparatifs-container">
        <header className="comparatifs-header">
          <h1>Comparatifs de Produits</h1>
          <p className="comparatifs-intro">
            Nos experts testent et comparent les meilleurs produits du marché pour vous aider à faire un choix éclairé. Retrouvez nos analyses détaillées, tests rigoureux et recommandations personnalisées.
          </p>
        </header>

        <div className="comparatifs-filter">
          <div className="filter-title">Filtrer par catégorie :</div>
          <div className="filter-options">
            <button className="filter-button active">Tous</button>
            <button className="filter-button">Smartphones</button>
            <button className="filter-button">Électroménager</button>
            <button className="filter-button">Tablettes</button>
            <button className="filter-button">Audio</button>
            <button className="filter-button">Wearables</button>
          </div>
        </div>

        <div className="comparatifs-grid">
          {comparatifs.map((comparatif) => (
            <article key={comparatif.id} className="comparatif-card">
              <Link href={`/comparatifs/${comparatif.id}`} legacyBehavior>
                <a>
                  <div className="comparatif-image">
                    <Image 
                      src={comparatif.image} 
                      alt={comparatif.title}
                      width={400}
                      height={250}
                      objectFit="cover"
                    />
                    <div className="comparatif-category">{comparatif.category}</div>
                    <div className="comparatif-count">{comparatif.productCount} produits comparés</div>
                  </div>
                  <div className="comparatif-content">
                    <h2 className="comparatif-title">{comparatif.title}</h2>
                    <p className="comparatif-excerpt">{comparatif.excerpt}</p>
                    <div className="comparatif-meta">
                      <span className="comparatif-date">Publié le {comparatif.date}</span>
                      <span className="comparatif-read-more">Voir le comparatif</span>
                    </div>
                  </div>
                </a>
              </Link>
            </article>
          ))}
        </div>

        <div className="features-container">
          <h2 className="features-title">Pourquoi nos comparatifs sont différents</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Tests rigoureux</h3>
              <p>Nous testons chaque produit dans des conditions réelles d'utilisation pour vous fournir des données fiables.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Méthodologie transparente</h3>
              <p>Notre processus de test est systématique et clairement expliqué dans chaque comparatif.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Meilleur rapport qualité/prix</h3>
              <p>Nous identifions les produits offrant le meilleur rapport qualité/prix dans chaque gamme.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Comparatifs régulièrement mis à jour</h3>
              <p>Nos comparatifs sont actualisés en fonction des nouvelles sorties et mises à jour produits.</p>
            </div>
          </div>
        </div>

        <div className="price-comparison-tool">
          <h2>Outil de comparaison de prix</h2>
          <p>Comparez rapidement les prix des produits qui vous intéressent entre différents marchands.</p>
          
          <div className="price-tool-form">
            <select>
              <option value="">Sélectionnez une catégorie</option>
              <option value="smartphones">Smartphones</option>
              <option value="tablettes">Tablettes</option>
              <option value="audio">Audio</option>
              <option value="electromenager">Électroménager</option>
              <option value="wearables">Montres connectées</option>
            </select>
            
            <input type="text" placeholder="Rechercher un produit..." />
            <button className="search-button">Comparer les prix</button>
          </div>
          
          <div className="price-tool-example">
            <div className="example-header">
              <h3>Exemple de comparaison de prix</h3>
              <p>Smartphone XYZ Pro 128Go</p>
            </div>
            
            <div className="merchants-comparison">
              <div className="merchant">
                <div className="merchant-name">Amazon</div>
                <div className="merchant-price">799€</div>
                <a href="#" className="merchant-link">Voir l'offre</a>
              </div>
              
              <div className="merchant best-price">
                <div className="merchant-name">E-commerce A</div>
                <div className="merchant-price">749€</div>
                <div className="best-price-tag">Meilleur prix</div>
                <a href="#" className="merchant-link">Voir l'offre</a>
              </div>
              
              <div className="merchant">
                <div className="merchant-name">E-commerce B</div>
                <div className="merchant-price">829€</div>
                <a href="#" className="merchant-link">Voir l'offre</a>
              </div>
            </div>
          </div>
        </div>

        <div className="price-alert">
          <h2>Alertes de baisse de prix</h2>
          <p>Soyez informé lorsque le prix des produits qui vous intéressent baisse.</p>
          
          <form className="price-alert-form">
            <input type="text" placeholder="Nom du produit" required />
            <input type="email" placeholder="Votre email" required />
            <input type="number" placeholder="Prix souhaité en €" required min="1" step="0.01" />
            <button type="submit">Créer une alerte</button>
          </form>
          
          <p className="alert-notice">En créant une alerte, vous acceptez de recevoir des emails de notre part. Vous pourrez vous désinscrire à tout moment.</p>
        </div>
      </div>

      <style jsx>{`
        .comparatifs-container {
          padding: 2rem 0;
        }
        
        .comparatifs-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .comparatifs-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .comparatifs-intro {
          max-width: 800px;
          margin: 0 auto;
          color: #666;
          line-height: 1.6;
          font-size: 1.1rem;
        }
        
        .comparatifs-filter {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }
        
        .filter-title {
          font-weight: bold;
        }
        
        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .filter-button {
          background-color: #f2f2f2;
          border: none;
          border-radius: 50px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }
        
        .filter-button.active, .filter-button:hover {
          background-color: var(--primary-color);
          color: white;
        }
        
        .comparatifs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .comparatif-card {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
          background-color: white;
        }
        
        .comparatif-card:hover {
          transform: translateY(-10px);
        }
        
        .comparatif-image {
          position: relative;
          height: 200px;
        }
        
        .comparatif-category {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background-color: var(--secondary-color);
          color: var(--primary-color);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: bold;
        }
        
        .comparatif-count {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
        }
        
        .comparatif-content {
          padding: 1.5rem;
        }
        
        .comparatif-title {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        
        .comparatif-excerpt {
          color: #666;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .comparatif-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }
        
        .comparatif-date {
          color: #888;
        }
        
        .comparatif-read-more {
          color: var(--primary-color);
          font-weight: bold;
        }
        
        .features-container {
          background-color: #f9f9f9;
          padding: 3rem 0;
          margin: 3rem 0;
          border-radius: 8px;
        }
        
        .features-title {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.8rem;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .feature-card {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .feature-card h3 {
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        
        .feature-card p {
          color: #666;
          line-height: 1.6;
        }
        
        .price-comparison-tool {
          margin: 3rem 0;
          padding: 2rem;
          background-color: #f2f7ff;
          border-radius: 8px;
        }
        
        .price-comparison-tool h2 {
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .price-comparison-tool > p {
          text-align: center;
          margin-bottom: 2rem;
          color: #666;
        }
        
        .price-tool-form {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          max-width: 800px;
          margin: 0 auto 2rem;
        }
        
        .price-tool-form select, 
        .price-tool-form input {
          flex: 1;
          min-width: 200px;
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .search-button {
          background-color: var(--primary-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .search-button:hover {
          background-color: #3a4e64;
        }
        
        .price-tool-example {
          background-color: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .example-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .example-header h3 {
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
        }
        
        .example-header p {
          font-weight: bold;
          color: #333;
        }
        
        .merchants-comparison {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .merchant {
          padding: 1.5rem;
          border-radius: 8px;
          text-align: center;
          border: 1px solid #eee;
          position: relative;
        }
        
        .merchant.best-price {
          border-color: #4CAF50;
          background-color: #f2f9f5;
        }
        
        .merchant-name {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .merchant-price {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--error-color);
        }
        
        .best-price .merchant-price {
          color: #4CAF50;
        }
        
        .best-price-tag {
          position: absolute;
          top: -10px;
          right: -10px;
          background-color: #4CAF50;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: bold;
        }
        
        .merchant-link {
          display: inline-block;
          padding: 0.5rem 1rem;
          background-color: var(--primary-color);
          color: white;
          border-radius: 4px;
          font-size: 0.9rem;
          transition: background-color 0.2s;
        }
        
        .merchant-link:hover {
          background-color: #3a4e64;
        }
        
        .price-alert {
          margin: 3rem 0;
          padding: 2rem;
          background-color: #fff8e1;
          border-radius: 8px;
          text-align: center;
        }
        
        .price-alert h2 {
          margin-bottom: 1rem;
        }
        
        .price-alert > p {
          margin-bottom: 2rem;
          color: #666;
        }
        
        .price-alert-form {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          max-width: 800px;
          margin: 0 auto 1rem;
          justify-content: center;
        }
        
        .price-alert-form input {
          flex: 1;
          min-width: 200px;
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .price-alert-form button {
          background-color: var(--primary-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .price-alert-form button:hover {
          background-color: #3a4e64;
        }
        
        .alert-notice {
          font-size: 0.8rem;
          color: #888;
          margin-top: 1rem;
        }
        
        @media (max-width: 768px) {
          .comparatifs-grid {
            grid-template-columns: 1fr;
          }
          
          .price-tool-form, 
          .price-alert-form {
            flex-direction: column;
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
