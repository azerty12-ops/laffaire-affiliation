import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export default function ProductCard({ product }) {
  const { t } = useTranslation('common');
  
  return (
    <div className="product-card">
      <Link href={`/product/${product.id}`} legacyBehavior>
        <a>
          <div className="product-image-container">
            <Image 
              src={product.image} 
              alt={product.title}
              width={200}
              height={200}
              className="product-image"
            />
          </div>
          <h3 className="product-title">{product.title}</h3>
          <div className="product-price">{product.price}€</div>
          <div className="product-rating">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
        </a>
      </Link>
      <a 
        href={product.amazonUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="amazon-button"
      >
        {t('product.buy_now')}
      </a>
    </div>
  );
}
