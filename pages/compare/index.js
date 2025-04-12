import { useState, useEffect } from 'react';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

// Données de démonstration pour les produits
const demoProducts = [
  {
    id: '1',
    title: 'Casque Audio Sans Fil Bluetooth - Réduction de Bruit Active',
    brand: 'SoundMaster',
    price: '89.99',
    rating: 4.5,
    image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456789',
    description: 'Profitez d\'un son exceptionnel avec ce casque audio sans fil Bluetooth. Sa technologie de réduction de bruit active vous permettra de vous immerger complètement dans votre musique en supprimant tous les bruits extérieurs.',
    specifications: {
      'Technologie': 'Bluetooth 5.0',
      'Autonomie': '30 heures',
      'Réduction de bruit': 'Active',
      'Assistant vocal': 'Compatible',
      'Poids': '250g',
      'Charge rapide': 'Oui (5h d\'utilisation en 10min de charge)',
      'Microphone': 'Intégré',
      'Contrôles': 'Tactiles',
      'Pliable': 'Oui',
      'Étanchéité': 'IPX4'
    },
    category: 'Audio'
  },
  {
    id: '2',
    title: 'Smartphone 6.5" FHD+ - 128Go, 6Go RAM - Triple Caméra 48MP',
    brand: 'TechPro',
    price: '329.99',
    rating: 4.2,
    image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456790',
    description: 'Ce smartphone performant dispose d\'un écran FHD+ de 6.5 pouces offrant une expérience visuelle immersive. Équipé d\'un processeur octa-core, de 6Go de RAM et de 128Go de stockage.',
    specifications: {
      'Écran': '6.5" FHD+',
      'Processeur': 'Octa-core 2.4GHz',
      'Mémoire RAM': '6Go',
      'Stockage': '128Go + MicroSD jusqu\'à 512Go',
      'Caméra principale': 'Triple 48MP + 8MP + 2MP',
      'Caméra frontale': '16MP',
      'Batterie': '4500mAh',
      'Système d\'exploitation': 'Android 12',
      'Double SIM': 'Oui',
      'NFC': 'Oui'
    },
    category: 'Smartphones'
  },
  {
    id: '3',
    title: 'Enceinte Bluetooth Portable Étanche',
    brand: 'AudioMax',
    price: '49.99',
    rating: 4.3,
    image: 'https://m.media-amazon.com/images/I/71bJHOF+jNL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456791',
    description: 'Enceinte bluetooth portable avec son stéréo puissant, parfaite pour la plage ou la piscine grâce à sa résistance à l\'eau IPX7. Autonomie de 24 heures.',
    specifications: {
      'Technologie': 'Bluetooth 5.2',
      'Autonomie': '24 heures',
      'Puissance': '20W',
      'Étanchéité': 'IPX7 (immersion temporaire)',
      'Portée': 'Jusqu\'à 30m',
      'Microphone': 'Intégré pour appels',
      'Charge rapide': 'Oui',
      'Batterie': '5000mAh',
      'Poids': '540g',
      'Dimensions': '18 x 7 x 7 cm'
    },
    category: 'Audio'
  },
  {
    id: '4',
    title: 'Machine à Café Automatique avec Broyeur à Grains',
    brand: 'CaféDeluxe',
    price: '249.99',
    rating: 4.7,
    image: 'https://m.media-amazon.com/images/I/71VsYKBkpZL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456792',
    description: 'Machine à café automatique avec broyeur intégré pour un café fraîchement moulu à chaque tasse. Personnalisez l\'intensité, la longueur et la température.',
    specifications: {
      'Type': 'Automatique avec broyeur',
      'Pression': '15 bars',
      'Capacité réservoir d\'eau': '1.8L',
      'Capacité réservoir à grains': '250g',
      'Réglages': 'Intensité, Température, Longueur',
      'Nombre de tasses simultanées': '2',
      'Buse vapeur': 'Oui',
      'Écran': 'LCD',
      'Programme de nettoyage': 'Automatique',
      'Puissance': '1450W'
    },
    category: 'Électroménager'
  },
  {
    id: '5',
    title: 'Robot Aspirateur et Laveur Intelligent',
    brand: 'CleanTech',
    price: '179.99',
    rating: 4.4,
    image: 'https://m.media-amazon.com/images/I/61OzWwfusRL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456793',
    description: 'Robot aspirateur 2-en-1 qui aspire et lave vos sols. Équipé de capteurs intelligents pour éviter les obstacles et d\'une application pour un contrôle à distance.',
    specifications: {
      'Fonctions': 'Aspiration et Lavage',
      'Puissance d\'aspiration': '2500Pa',
      'Capacité du réservoir à poussière': '450ml',
      'Capacité du réservoir d\'eau': '300ml',
      'Autonomie': 'Jusqu\'à 120 minutes',
      'Navigation': 'Capteurs infrarouges',
      'Contrôle': 'Application smartphone, Assistants vocaux',
      'Programmation': 'Jusqu\'à 7 jours',
      'Hauteur': '7.5cm (passe sous la plupart des meubles)',
      'Filtre': 'HEPA'
    },
    category: 'Électroménager'
  }
];

export default function CompareProductsPage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Catégories disponibles (déduit des produits)
  const categories = ['all', ...new Set(demoProducts.map(p => p.category))];
  
  // Récupérer les IDs des produits dans l'URL
  useEffect(() => {
    if (router.query.ids) {
      const ids = router.query.ids.split(',');
      const productsToCompare = demoProducts.filter(p => ids.includes(p.id));
      setSelectedProducts(productsToCompare);
    }
  }, [router.query]);
  
  // Gérer la recherche de produits
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    
    const query = searchQuery.toLowerCase();
    let results = demoProducts.filter(product => 
      (product.title.toLowerCase().includes(query) || 
      product.brand.toLowerCase().includes(query)) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    );
    
    // Ne pas inclure les produits déjà sélectionnés
    results = results.filter(product => 
      !selectedProducts.some(p => p.id === product.id)
    );
    
    setSearchResults(results);
  }, [searchQuery, selectedCategory, selectedProducts]);
  
  // Ajouter un produit à la comparaison
  const addProductToCompare = (product) => {
    if (selectedProducts.length >= 4) {
      alert('Vous ne pouvez pas comparer plus de 4 produits à la fois.');
      return;
    }
    
    setSelectedProducts([...selectedProducts, product]);
    setSearchQuery('');
    
    // Mettre à jour l'URL avec les IDs des produits
    const newIds = [...selectedProducts, product].map(p => p.id).join(',');
    router.push(`/compare?ids=${newIds}`, undefined, { shallow: true });
  };
  
  // Supprimer un produit de la comparaison
  const removeProductFromCompare = (productId) => {
    const newSelectedProducts = selectedProducts.filter(p => p.id !== productId);
    setSelectedProducts(newSelectedProducts);
    
    // Mettre à jour l'URL avec les IDs des produits
    if (newSelectedProducts.length > 0) {
      const newIds = newSelectedProducts.map(p => p.id).join(',');
      router.push(`/compare?ids=${newIds}`, undefined, { shallow: true });
    } else {
      router.push('/compare', undefined, { shallow: true });
    }
  };
  
  // Obtenir toutes les clés de spécifications pour les produits sélectionnés
  const getAllSpecKeys = () => {
    const allKeys = new Set();
    selectedProducts.forEach(product => {
      Object.keys(product.specifications).forEach(key => allKeys.add(key));
    });
    return Array.from(allKeys);
  };

  return (
    <Layout title="Comparateur de Produits">
      <div className="compare-page">
        <div className="compare-container">
          <h1>Comparateur de Produits</h1>
          
          <div className="product-search-section">
            <div className="search-header">
              <h2>{selectedProducts.length > 0 
                ? 'Ajouter un autre produit à comparer' 
                : 'Rechercher des produits à comparer'}
              </h2>
              <p>Vous pouvez comparer jusqu'à 4 produits simultanément</p>
            </div>
            
            <div className="search-form">
              <div className="search-inputs">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-selector"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Toutes les catégories' : category}
                    </option>
                  ))}
                </select>
                
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un produit par nom ou marque..."
                  className="search-input"
                />
              </div>
            </div>
            
            {isSearching && (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  <div className="results-grid">
                    {searchResults.map(product => (
                      <div key={product.id} className="result-card">
                        <div className="result-image">
                          <img src={product.image} alt={product.title} />
                        </div>
                        <div className="result-details">
                          <h3 className="result-title">{product.title}</h3>
                          <div className="result-brand">{product.brand}</div>
                          <div className="result-price">{product.price} €</div>
                          <button 
                            className="add-to-compare"
                            onClick={() => addProductToCompare(product)}
                          >
                            Ajouter à la comparaison
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    Aucun produit trouvé pour cette recherche. Essayez avec d'autres termes.
                  </div>
                )}
              </div>
            )}
          </div>
          
          {selectedProducts.length > 0 ? (
            <div className="comparison-section">
              <h2>Produits à comparer</h2>
              
              <div className="comparison-table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th className="feature-column">Caractéristiques</th>
                      {selectedProducts.map(product => (
                        <th key={product.id} className="product-column">
                          <div className="product-column-header">
                            <div className="product-image">
                              <img src={product.image} alt={product.title} />
                            </div>
                            <Link href={`/product/${product.id}`} legacyBehavior>
                              <a className="product-title">{product.title}</a>
                            </Link>
                            <div className="product-price">{product.price} €</div>
                            <div className="product-rating">
                              {'★'.repeat(Math.floor(product.rating))}
                              {'☆'.repeat(5 - Math.floor(product.rating))}
                              <span>{product.rating}</span>
                            </div>
                            <div className="product-actions">
                              <a 
                                href={product.amazonUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="buy-now"
                              >
                                Voir sur Amazon
                              </a>
                              <button 
                                className="remove-btn"
                                onClick={() => removeProductFromCompare(product.id)}
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Marque</td>
                      {selectedProducts.map(product => (
                        <td key={product.id}>{product.brand}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Catégorie</td>
                      {selectedProducts.map(product => (
                        <td key={product.id}>{product.category}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Description</td>
                      {selectedProducts.map(product => (
                        <td key={product.id}>{product.description}</td>
                      ))}
                    </tr>
                    {getAllSpecKeys().map(key => (
                      <tr key={key}>
                        <td>{key}</td>
                        {selectedProducts.map(product => (
                          <td key={product.id}>
                            {product.specifications[key] || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="no-products-selected">
              <div className="info-message">
                <h2>Aucun produit sélectionné</h2>
                <p>Utilisez la recherche ci-dessus pour sélectionner des produits à comparer.</p>
              </div>
              
              <div className="popular-categories">
                <h3>Ou explorez par catégorie</h3>
                <div className="categories-grid">
                  {categories.filter(cat => cat !== 'all').map(category => (
                    <button 
                      key={category}
                      className="category-card"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .compare-page {
          padding: 2rem 0;
        }
        
        .compare-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        h1 {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #232f3e;
        }
        
        h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #333;
        }
        
        .product-search-section {
          margin-bottom: 3rem;
        }
        
        .search-header {
          margin-bottom: 1.5rem;
        }
        
        .search-header p {
          color: #666;
        }
        
        .search-form {
          margin-bottom: 1.5rem;
        }
        
        .search-inputs {
          display: flex;
          gap: 1rem;
        }
        
        .category-selector {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-width: 200px;
          font-size: 1rem;
        }
        
        .search-input {
          flex-grow: 1;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .search-results {
          margin-top: 1.5rem;
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        
        .result-card {
          border: 1px solid #e3e3e3;
          border-radius: 8px;
          overflow: hidden;
          background-color: white;
          display: flex;
          flex-direction: column;
        }
        
        .result-image {
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background-color: #f9f9f9;
        }
        
        .result-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .result-details {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .result-title {
          font-size: 1rem;
          line-height: 1.4;
          height: 2.8em;
          overflow: hidden;
          margin: 0;
        }
        
        .result-brand {
          color: #666;
          font-size: 0.9rem;
        }
        
        .result-price {
          font-weight: bold;
          color: #B12704;
          font-size: 1.1rem;
        }
        
        .add-to-compare {
          margin-top: 0.5rem;
          background-color: #febd69;
          color: #232f3e;
          border: none;
          padding: 0.6rem;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .add-to-compare:hover {
          background-color: #f3a847;
        }
        
        .no-results {
          padding: 2rem;
          text-align: center;
          background-color: #f9f9f9;
          border-radius: 8px;
          color: #666;
        }
        
        .comparison-section {
          overflow-x: auto;
        }
        
        .comparison-table-wrapper {
          overflow-x: auto;
        }
        
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }
        
        .feature-column {
          width: 180px;
          min-width: 180px;
          background-color: #f9f9f9;
        }
        
        .product-column {
          min-width: 220px;
        }
        
        .comparison-table th,
        .comparison-table td {
          padding: 1rem;
          border: 1px solid #e3e3e3;
          vertical-align: top;
        }
        
        .product-column-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        
        .product-image {
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        
        .product-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .product-title {
          color: #0066c0;
          text-decoration: none;
          text-align: center;
          font-size: 0.9rem;
          line-height: 1.4;
        }
        
        .product-title:hover {
          color: #c45500;
          text-decoration: underline;
        }
        
        .product-price {
          font-weight: bold;
          color: #B12704;
        }
        
        .product-rating {
          color: #ff9900;
          font-size: 0.9rem;
        }
        
        .product-rating span {
          color: #666;
          margin-left: 0.25rem;
        }
        
        .product-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }
        
        .buy-now {
          background-color: #febd69;
          color: #232f3e;
          text-align: center;
          padding: 0.5rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          display: block;
          transition: background-color 0.2s;
        }
        
        .buy-now:hover {
          background-color: #f3a847;
        }
        
        .remove-btn {
          background: none;
          border: 1px solid #ddd;
          padding: 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .remove-btn:hover {
          background-color: #f5f5f5;
        }
        
        .no-products-selected {
          padding: 3rem 0;
        }
        
        .info-message {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .info-message p {
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .popular-categories h3 {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .category-card {
          padding: 1.5rem;
          border: 1px solid #e3e3e3;
          border-radius: 8px;
          background-color: white;
          text-align: center;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .category-card:hover {
          background-color: #f9f9f9;
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }
        
        @media (max-width: 768px) {
          .search-inputs {
            flex-direction: column;
          }
          
          .category-selector {
            width: 100%;
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
