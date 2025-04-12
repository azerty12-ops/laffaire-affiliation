import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';

// Articles de blog (simulés, dans une application réelle, ces données viendraient d'une API ou CMS)
const blogPosts = [
  {
    id: 'meilleurs-casques-audio-2025',
    title: 'Les 5 Meilleurs Casques Audio Sans Fil en 2025',
    excerpt: 'Découvrez notre sélection des meilleurs casques audio sans fil avec réduction de bruit active pour une expérience sonore immersive.',
    image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
    date: '12 avril 2025',
    category: 'Audio',
    keywords: ['casque audio', 'bluetooth', 'sans fil', 'réduction de bruit'],
  },
  {
    id: 'comparatif-smartphones-milieu-de-gamme',
    title: 'Comparatif: Les Meilleurs Smartphones Milieu de Gamme en 2025',
    excerpt: 'Analyse détaillée des smartphones offrant le meilleur rapport qualité/prix cette année, avec performances, autonomie et qualité photo.',
    image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg',
    date: '10 avril 2025',
    category: 'Smartphones',
    keywords: ['smartphone', 'android', 'comparatif', 'milieu de gamme'],
  },
  {
    id: 'guide-achat-friteuse-sans-huile',
    title: 'Guide d\'Achat: Comment Choisir sa Friteuse Sans Huile en 2025',
    excerpt: 'Tous nos conseils pour choisir la friteuse sans huile adaptée à vos besoins: capacité, puissance, programmes et fonctionnalités essentielles.',
    image: 'https://m.media-amazon.com/images/I/71+W2rPZl4L._AC_SL1500_.jpg',
    date: '5 avril 2025',
    category: 'Électroménager',
    keywords: ['friteuse sans huile', 'air fryer', 'cuisine', 'guide d\'achat'],
  },
  {
    id: 'tendances-mode-printemps-ete',
    title: 'Les Tendances Mode Printemps-Été 2025 à Petits Prix',
    excerpt: 'Découvrez les pièces tendance de la saison disponibles sur Amazon et comment les associer pour un look stylé sans se ruiner.',
    image: 'https://m.media-amazon.com/images/I/71epzwGQ4KL._AC_SL1500_.jpg',
    date: '1 avril 2025',
    category: 'Mode',
    keywords: ['mode', 'tendances', 'printemps-été', 'fashion'],
  },
  {
    id: 'astuces-optimisation-espace-maison',
    title: '10 Astuces et Produits pour Optimiser l\'Espace dans votre Maison',
    excerpt: 'Solutions pratiques et accessoires malins pour maximiser l\'espace dans chaque pièce de votre maison, même dans les petits appartements.',
    image: 'https://m.media-amazon.com/images/I/719zB7Uo9kL._AC_SL1500_.jpg',
    date: '28 mars 2025',
    category: 'Maison',
    keywords: ['rangement', 'optimisation', 'espace', 'petits espaces', 'maison'],
  },
];

export default function BlogIndex() {
  const { t } = useTranslation('common');

  return (
    <Layout 
      title="Blog | Conseils, Guides d'Achat et Comparatifs"
      description="Découvrez nos articles, guides d'achat et comparatifs pour vous aider à choisir les meilleurs produits Amazon adaptés à vos besoins."
    >
      <div className="blog-container">
        <div className="blog-header">
          <h1>Blog 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒</h1>
          <p className="blog-intro">
            Découvrez nos articles, guides d'achat et comparatifs pour vous aider à choisir les meilleurs produits adaptés à vos besoins.
          </p>
          
          <div className="blog-categories">
            <span className="category-tag all active">Tous</span>
            <span className="category-tag">Audio</span>
            <span className="category-tag">Smartphones</span>
            <span className="category-tag">Électroménager</span>
            <span className="category-tag">Mode</span>
            <span className="category-tag">Maison</span>
          </div>
        </div>
        
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <Link href={`/blog/${post.id}`} legacyBehavior>
                <a>
                  <div className="blog-card-image">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      width={400}
                      height={250}
                      objectFit="cover"
                    />
                  </div>
                  <div className="blog-card-content">
                    <span className="blog-category">{post.category}</span>
                    <h2 className="blog-title">{post.title}</h2>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <div className="blog-meta">
                      <span className="blog-date">{post.date}</span>
                      <span className="blog-read-more">Lire l'article</span>
                    </div>
                  </div>
                </a>
              </Link>
            </article>
          ))}
        </div>

        <div className="blog-newsletter">
          <h2>Abonnez-vous à notre newsletter</h2>
          <p>Recevez nos derniers articles et bons plans directement dans votre boîte mail.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Votre adresse email" required />
            <button type="submit">S'abonner</button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .blog-container {
          padding: 2rem 0;
        }
        
        .blog-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .blog-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .blog-intro {
          max-width: 800px;
          margin: 0 auto 2rem;
          font-size: 1.1rem;
          color: #666;
        }
        
        .blog-categories {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 2rem 0;
        }
        
        .category-tag {
          padding: 0.5rem 1rem;
          background-color: #f2f2f2;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .category-tag.active, .category-tag:hover {
          background-color: var(--primary-color);
          color: white;
        }
        
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .blog-card {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }
        
        .blog-card:hover {
          transform: translateY(-10px);
        }
        
        .blog-card-image {
          height: 200px;
          overflow: hidden;
        }
        
        .blog-card-content {
          padding: 1.5rem;
        }
        
        .blog-category {
          display: inline-block;
          font-size: 0.8rem;
          background-color: var(--secondary-color);
          color: var(--primary-color);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          margin-bottom: 0.75rem;
        }
        
        .blog-title {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        
        .blog-excerpt {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        
        .blog-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }
        
        .blog-date {
          color: #888;
        }
        
        .blog-read-more {
          color: var(--primary-color);
          font-weight: bold;
        }
        
        .blog-newsletter {
          background-color: #f9f9f9;
          padding: 3rem;
          border-radius: 8px;
          text-align: center;
          margin: 3rem 0;
        }
        
        .blog-newsletter h2 {
          margin-bottom: 1rem;
        }
        
        .blog-newsletter p {
          margin-bottom: 1.5rem;
          color: #666;
        }
        
        .newsletter-form {
          display: flex;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .newsletter-form input {
          flex-grow: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          font-size: 1rem;
        }
        
        .newsletter-form button {
          background-color: var(--primary-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0 4px 4px 0;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .newsletter-form button:hover {
          background-color: #3a4e64;
        }
        
        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
          
          .newsletter-form {
            flex-direction: column;
          }
          
          .newsletter-form input {
            border-radius: 4px;
            margin-bottom: 0.5rem;
          }
          
          .newsletter-form button {
            border-radius: 4px;
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
