import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../../components/Layout';

// Articles de blog (simulés, dans une application réelle, ces données viendraient d'une API ou CMS)
const blogPosts = [
  {
    id: 'meilleurs-casques-audio-2025',
    title: 'Les 5 Meilleurs Casques Audio Sans Fil en 2025',
    excerpt: 'Découvrez notre sélection des meilleurs casques audio sans fil avec réduction de bruit active pour une expérience sonore immersive.',
    content: `
      <p>Dans un monde où la mobilité et le confort sont devenus essentiels, les casques audio sans fil se sont imposés comme des accessoires incontournables. Que ce soit pour travailler, voyager ou simplement profiter de votre musique préférée, un bon casque sans fil avec réduction de bruit peut véritablement transformer votre expérience d'écoute.</p>
      
      <p>Pour vous aider à faire le meilleur choix, nous avons testé et comparé des dizaines de modèles pour vous présenter notre sélection des 5 meilleurs casques audio sans fil en 2025.</p>
      
      <h2>1. Sony WH-1000XM5 - Le meilleur dans l'ensemble</h2>
      
      <p>Sony continue de dominer le marché avec sa cinquième génération de casques à réduction de bruit. Le WH-1000XM5 offre:</p>
      
      <ul>
        <li>Une réduction de bruit inégalée grâce à 8 microphones et un nouveau processeur</li>
        <li>Une qualité sonore exceptionnelle avec prise en charge des codecs LDAC et DSEE Extreme</li>
        <li>Une autonomie impressionnante de 30 heures</li>
        <li>Un confort optimal même lors d'utilisations prolongées</li>
      </ul>
      
      <p>Prix: <strong>329,99€</strong></p>
      
      <a href="https://www.amazon.fr/dp/B09XVL3FV4" class="affiliate-link">Voir le prix sur Amazon</a>
      
      <h2>2. Bose Noise Cancelling 800 - Le plus confortable</h2>
      
      <p>Bose a toujours excellé dans le confort, et leur nouveau modèle ne fait pas exception. Le NC 800 propose:</p>
      
      <ul>
        <li>Un design ergonomique ultra-léger (seulement 220g)</li>
        <li>Une réduction de bruit adaptative avec 11 niveaux</li>
        <li>Un son équilibré et naturel avec EQ personnalisable</li>
        <li>Une connexion multipoint permettant de se connecter à deux appareils simultanément</li>
      </ul>
      
      <p>Prix: <strong>299,95€</strong></p>
      
      <a href="https://www.amazon.fr/dp/B0123456" class="affiliate-link">Voir le prix sur Amazon</a>
      
      <h2>3. Apple AirPods Max - Le meilleur pour l'écosystème Apple</h2>
      
      <p>Pour les utilisateurs d'iPhone, iPad et Mac, les AirPods Max offrent une intégration parfaite:</p>
      
      <ul>
        <li>Une expérience utilisateur fluide avec connexion instantanée</li>
        <li>L'audio spatial pour une expérience sonore immersive</li>
        <li>Une qualité de fabrication premium avec châssis en aluminium</li>
        <li>Un excellent microphone pour les appels</li>
      </ul>
      
      <p>Prix: <strong>479,00€</strong></p>
      
      <a href="https://www.amazon.fr/dp/B08PZDNQP4" class="affiliate-link">Voir le prix sur Amazon</a>
      
      <h2>4. Sennheiser Momentum 4 Wireless - La meilleure autonomie</h2>
      
      <p>Si vous recherchez un casque qui ne vous laissera jamais tomber, le Momentum 4 est fait pour vous:</p>
      
      <ul>
        <li>Une autonomie record de 60 heures avec ANC activé</li>
        <li>La signature sonore Sennheiser avec des basses profondes et des aigus cristallins</li>
        <li>Un excellent rapport qualité-prix</li>
      </ul>
      
      <p>Prix: <strong>249,99€</strong></p>
      
      <a href="https://www.amazon.fr/dp/B0B1V5K2ZP" class="affiliate-link">Voir le prix sur Amazon</a>
      
      <h2>5. Jabra Elite 85h - Le meilleur rapport qualité-prix</h2>
      
      <p>Pour ceux qui recherchent un excellent casque sans se ruiner:</p>
      
      <ul>
        <li>Une réduction de bruit efficace</li>
        <li>Un son personnalisable via l'application</li>
        <li>Une résistance à l'eau certifiée IP54</li>
        <li>Une autonomie de 36 heures</li>
      </ul>
      
      <p>Prix: <strong>179,99€</strong></p>
      
      <a href="https://www.amazon.fr/dp/B07RQ366VK" class="affiliate-link">Voir le prix sur Amazon</a>
      
      <h2>Comparatif : Quel casque choisir selon vos besoins ?</h2>
      
      <table class="comparison-table">
        <tr>
          <th>Modèle</th>
          <th>Autonomie</th>
          <th>Réduction de bruit</th>
          <th>Pour qui ?</th>
        </tr>
        <tr>
          <td>Sony WH-1000XM5</td>
          <td>30h</td>
          <td>★★★★★</td>
          <td>Voyageurs fréquents, audiophiles</td>
        </tr>
        <tr>
          <td>Bose NC 800</td>
          <td>24h</td>
          <td>★★★★☆</td>
          <td>Utilisateurs recherchant le confort avant tout</td>
        </tr>
        <tr>
          <td>Apple AirPods Max</td>
          <td>20h</td>
          <td>★★★★☆</td>
          <td>Utilisateurs de produits Apple</td>
        </tr>
        <tr>
          <td>Sennheiser Momentum 4</td>
          <td>60h</td>
          <td>★★★☆☆</td>
          <td>Personnes ayant besoin d'une grande autonomie</td>
        </tr>
        <tr>
          <td>Jabra Elite 85h</td>
          <td>36h</td>
          <td>★★★☆☆</td>
          <td>Budget contraint, utilisation polyvalente</td>
        </tr>
      </table>
      
      <h2>Verdict : Quel est le meilleur casque audio sans fil en 2025 ?</h2>
      
      <p>Si votre budget le permet, le <strong>Sony WH-1000XM5</strong> reste notre recommandation générale pour son excellence dans tous les domaines. Pour ceux qui cherchent une alternative plus abordable sans compromis majeurs, le <strong>Jabra Elite 85h</strong> offre un excellent rapport qualité-prix.</p>
      
      <p>Pour les utilisateurs d'iPhone qui veulent une intégration parfaite, les <strong>AirPods Max</strong> restent le choix idéal, malgré leur prix élevé.</p>
      
      <p>Notre conseil : profitez des offres promotionnelles sur Amazon, car ces modèles premium peuvent bénéficier de réductions significatives lors d'événements comme les Prime Days ou le Black Friday.</p>
    `,
    image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
    date: '12 avril 2025',
    author: 'Thomas Dupont',
    category: 'Audio',
    keywords: ['casque audio', 'bluetooth', 'sans fil', 'réduction de bruit'],
    relatedProducts: [
      {
        id: '1',
        title: 'Sony WH-1000XM5',
        image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
        price: '329.99',
        rating: 4.8,
      },
      {
        id: '3',
        title: 'Bose Noise Cancelling 800',
        image: 'https://m.media-amazon.com/images/I/71D3vN8rikL._AC_SL1500_.jpg',
        price: '299.95',
        rating: 4.7,
      }
    ]
  },
  {
    id: 'comparatif-smartphones-milieu-de-gamme',
    title: 'Comparatif: Les Meilleurs Smartphones Milieu de Gamme en 2025',
    excerpt: 'Analyse détaillée des smartphones offrant le meilleur rapport qualité/prix cette année, avec performances, autonomie et qualité photo.',
    image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg',
    date: '10 avril 2025',
    author: 'Marie Leroy',
    category: 'Smartphones',
    keywords: ['smartphone', 'android', 'comparatif', 'milieu de gamme'],
  }
];

// Commentaires simulés
const demoComments = {
  'meilleurs-casques-audio-2025': [
    {
      id: '1',
      author: 'Jean Dupont',
      date: '13 avril 2025',
      content: 'Article très complet ! J\'hésite entre le Sony et le Bose, mais je pense que je vais opter pour le Sony pour son autonomie.',
      rating: 5
    },
    {
      id: '2',
      author: 'Sophie Martin',
      date: '14 avril 2025',
      content: 'J\'utilise le Jabra Elite 85h depuis 6 mois et je confirme que c\'est un excellent rapport qualité-prix. La batterie tient vraiment longtemps !',
      rating: 4
    }
  ]
};

export default function BlogPostPage({ post, comments }) {
  const { t } = useTranslation('common');
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentRating, setCommentRating] = useState(5);
  
  if (!post) {
    return (
      <Layout title="Article non trouvé">
        <div className="error-container">
          <h1>Article non trouvé</h1>
          <p>L'article que vous recherchez n'existe pas ou a été déplacé.</p>
          <Link href="/blog" legacyBehavior>
            <a className="back-to-blog">Retour au blog</a>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const handleSubmitComment = (e) => {
    e.preventDefault();
    alert('Commentaire soumis avec succès ! Dans une application réelle, ce commentaire serait enregistré dans une base de données.');
    setCommentName('');
    setCommentEmail('');
    setCommentContent('');
    setCommentRating(5);
  };

  return (
    <Layout title={post.title}>
      <article className="blog-post">
        <div className="blog-post-header">
          <div className="post-category">{post.category}</div>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <div className="post-author">Par {post.author}</div>
            <div className="post-date">Publié le {post.date}</div>
          </div>
        </div>
        
        <div className="post-featured-image">
          <img src={post.image} alt={post.title} />
        </div>
        
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        
        {post.relatedProducts && post.relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Produits recommandés dans cet article</h2>
            <div className="products-grid">
              {post.relatedProducts.map(product => (
                <div key={product.id} className="product-card">
                  <Link href={`/product/${product.id}`} legacyBehavior>
                    <a className="product-image-link">
                      <img src={product.image} alt={product.title} className="product-image" />
                    </a>
                  </Link>
                  <div className="product-info">
                    <Link href={`/product/${product.id}`} legacyBehavior>
                      <a className="product-title">{product.title}</a>
                    </Link>
                    <div className="product-rating">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                      <span>{product.rating}</span>
                    </div>
                    <div className="product-price">{product.price} €</div>
                    <Link href={`/product/${product.id}`} legacyBehavior>
                      <a className="product-link">Voir le produit</a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="post-tags">
          {post.keywords.map((keyword, index) => (
            <span key={index} className="post-tag">#{keyword}</span>
          ))}
        </div>
        
        <div className="post-comments">
          <h2>Commentaires ({comments.length})</h2>
          
          {comments.length > 0 ? (
            <div className="comments-list">
              {comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-meta">
                    <div className="comment-author">{comment.author}</div>
                    <div className="comment-date">{comment.date}</div>
                  </div>
                  <div className="comment-rating">
                    {'★'.repeat(comment.rating)}
                    {'☆'.repeat(5 - comment.rating)}
                  </div>
                  <div className="comment-content">{comment.content}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-comments">Aucun commentaire pour le moment. Soyez le premier à commenter !</p>
          )}
          
          <div className="comment-form-container">
            <h3>Laisser un commentaire</h3>
            <form className="comment-form" onSubmit={handleSubmitComment}>
              <div className="form-group">
                <label htmlFor="name">Nom *</label>
                <input 
                  type="text" 
                  id="name" 
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email * (ne sera pas publié)</label>
                <input 
                  type="email" 
                  id="email" 
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="rating">Note</label>
                <div className="rating-selector">
                  {[5, 4, 3, 2, 1].map(star => (
                    <span 
                      key={star}
                      className={`star ${commentRating >= star ? 'active' : ''}`}
                      onClick={() => setCommentRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="comment">Commentaire *</label>
                <textarea 
                  id="comment"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  required
                  rows="5"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-comment">
                Publier le commentaire
              </button>
            </form>
          </div>
        </div>
      </article>
      
      <style jsx>{`
        .blog-post {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        
        .blog-post-header {
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .post-category {
          display: inline-block;
          background-color: #f3a847;
          color: #232f3e;
          font-size: 0.9rem;
          padding: 0.3rem 1rem;
          border-radius: 50px;
          margin-bottom: 1rem;
        }
        
        .post-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        
        .post-meta {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          color: #666;
          font-size: 0.95rem;
        }
        
        .post-featured-image {
          width: 100%;
          margin-bottom: 2rem;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .post-featured-image img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        
        .post-content {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #333;
          margin-bottom: 2rem;
        }
        
        .post-content h2 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-size: 1.8rem;
          color: #232f3e;
        }
        
        .post-content p {
          margin-bottom: 1.5rem;
        }
        
        .post-content ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .post-content li {
          margin-bottom: 0.5rem;
        }
        
        .post-content a {
          color: #0066c0;
          text-decoration: none;
        }
        
        .post-content a:hover {
          text-decoration: underline;
          color: #c45500;
        }
        
        .affiliate-link {
          display: inline-block;
          background-color: #febd69;
          color: #232f3e;
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          margin: 1rem 0 2rem;
          transition: background-color 0.2s;
        }
        
        .affiliate-link:hover {
          background-color: #f3a847;
          text-decoration: none;
        }
        
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
        }
        
        .comparison-table th,
        .comparison-table td {
          padding: 0.75rem;
          border: 1px solid #ddd;
          text-align: left;
        }
        
        .comparison-table th {
          background-color: #f2f2f2;
          font-weight: 600;
        }
        
        .comparison-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        .post-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 3rem;
        }
        
        .post-tag {
          background-color: #f2f2f2;
          color: #666;
          padding: 0.3rem 0.75rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        
        .related-products {
          margin-bottom: 3rem;
        }
        
        .related-products h2 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #232f3e;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        
        .product-card {
          border: 1px solid #e3e3e3;
          border-radius: 8px;
          overflow: hidden;
          background-color: white;
          transition: box-shadow 0.2s;
        }
        
        .product-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .product-image {
          width: 100%;
          height: 150px;
          object-fit: contain;
          padding: 1rem;
          background-color: #f9f9f9;
        }
        
        .product-info {
          padding: 1rem;
        }
        
        .product-title {
          color: #0066c0;
          text-decoration: none;
          font-size: 0.95rem;
          line-height: 1.4;
          display: block;
          margin-bottom: 0.5rem;
          height: 2.8em;
          overflow: hidden;
        }
        
        .product-rating {
          color: #ff9900;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        
        .product-rating span {
          color: #666;
          margin-left: 0.25rem;
        }
        
        .product-price {
          font-size: 1.1rem;
          font-weight: bold;
          color: #B12704;
          margin-bottom: 0.75rem;
        }
        
        .product-link {
          display: block;
          background-color: #febd69;
          color: #232f3e;
          text-align: center;
          padding: 0.5rem;
          border-radius: 4px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .product-link:hover {
          background-color: #f3a847;
        }
        
        .post-comments {
          margin-top: 3rem;
        }
        
        .post-comments h2 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #232f3e;
        }
        
        .comments-list {
          margin-bottom: 2rem;
        }
        
        .comment {
          padding: 1.5rem;
          border: 1px solid #e3e3e3;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          background-color: #f9f9f9;
        }
        
        .comment-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        
        .comment-author {
          font-weight: 600;
        }
        
        .comment-date {
          color: #666;
          font-size: 0.9rem;
        }
        
        .comment-rating {
          color: #ff9900;
          margin-bottom: 0.75rem;
        }
        
        .comment-content {
          line-height: 1.6;
        }
        
        .no-comments {
          font-style: italic;
          color: #666;
          margin-bottom: 2rem;
        }
        
        .comment-form-container {
          background-color: #f9f9f9;
          padding: 2rem;
          border-radius: 8px;
        }
        
        .comment-form-container h3 {
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }
        
        .comment-form {
          display: grid;
          gap: 1.5rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-group label {
          font-weight: 500;
        }
        
        .form-group input,
        .form-group textarea {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .rating-selector {
          display: flex;
          flex-direction: row-reverse;
          gap: 0.25rem;
        }
        
        .star {
          font-size: 1.5rem;
          color: #ccc;
          cursor: pointer;
        }
        
        .star.active {
          color: #ff9900;
        }
        
        .submit-comment {
          background-color: #febd69;
          color: #232f3e;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .submit-comment:hover {
          background-color: #f3a847;
        }
        
        .error-container {
          max-width: 600px;
          margin: 4rem auto;
          text-align: center;
        }
        
        .error-container h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .error-container p {
          margin-bottom: 2rem;
          color: #666;
        }
        
        .back-to-blog {
          display: inline-block;
          background-color: #febd69;
          color: #232f3e;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .back-to-blog:hover {
          background-color: #f3a847;
        }
        
        @media (max-width: 768px) {
          .post-title {
            font-size: 2rem;
          }
          
          .post-meta {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .post-content {
            font-size: 1rem;
          }
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = blogPosts.map(post => ({
    params: { id: post.id },
  }));
  
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const post = blogPosts.find(post => post.id === params.id) || null;
  const comments = demoComments[params.id] || [];
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      post,
      comments,
    },
  };
}
