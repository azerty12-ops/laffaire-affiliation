import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../../components/Layout';

export default function OrdersPage() {
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = useState('orders');
  
  // Données de démonstration pour les commandes
  const demoOrders = [
    {
      id: '402-7621893-6530733',
      date: '12 avril 2025',
      total: '89.99 €',
      status: 'Livré',
      items: [
        {
          title: 'Casque Audio Sans Fil Bluetooth - Réduction de Bruit Active',
          image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
          price: '89.99 €',
        }
      ]
    },
    {
      id: '402-3326744-1230912',
      date: '5 avril 2025',
      total: '329.99 €',
      status: 'En cours de livraison',
      items: [
        {
          title: 'Smartphone 6.5" FHD+ - 128Go, 6Go RAM - Triple Caméra 48MP',
          image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg',
          price: '329.99 €',
        }
      ]
    }
  ];
  
  // Données de démonstration pour les retours
  const demoReturns = [
    {
      id: '402-7621893-6530733-01',
      date: '14 avril 2025',
      order: '402-7621893-6530733',
      status: 'Retour reçu',
      refundStatus: 'Remboursement traité',
      item: {
        title: 'Casque Audio Sans Fil Bluetooth - Réduction de Bruit Active',
        image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
        price: '89.99 €',
      }
    }
  ];

  return (
    <Layout title={activeTab === 'orders' ? 'Vos Commandes' : 'Vos Retours'}>
      <div className="orders-page">
        <div className="orders-container">
          <div className="orders-tabs">
            <button 
              className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Vos Commandes
            </button>
            <button 
              className={`tab-button ${activeTab === 'returns' ? 'active' : ''}`}
              onClick={() => setActiveTab('returns')}
            >
              Vos Retours
            </button>
          </div>

          {activeTab === 'orders' ? (
            <>
              <h1>Vos Commandes</h1>
              
              {demoOrders.length > 0 ? (
                <div className="orders-list">
                  {demoOrders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-header-section">
                          <div className="order-label">Commande passée le</div>
                          <div className="order-value">{order.date}</div>
                        </div>
                        <div className="order-header-section">
                          <div className="order-label">Total</div>
                          <div className="order-value">{order.total}</div>
                        </div>
                        <div className="order-header-section">
                          <div className="order-label">N° de commande</div>
                          <div className="order-value">{order.id}</div>
                        </div>
                      </div>
                      
                      <div className="order-status">
                        <div className={`status-badge ${order.status === 'Livré' ? 'delivered' : 'processing'}`}>
                          {order.status}
                        </div>
                      </div>
                      
                      {order.items.map((item, index) => (
                        <div key={`${order.id}-item-${index}`} className="order-item">
                          <div className="item-image">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <div className="item-details">
                            <h3>{item.title}</h3>
                            <p className="item-price">{item.price}</p>
                            <div className="item-actions">
                              <a href="#" className="order-action-link">Acheter à nouveau</a>
                              {order.status === 'Livré' && (
                                <a href="#" className="order-action-link">Demander un retour</a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-orders">
                  <div className="empty-state">
                    <h3>Vous n'avez pas encore passé de commande</h3>
                    <p>Une fois que vous aurez passé une commande, vous pourrez la suivre ici.</p>
                    <a href="/" className="browse-link">Découvrir des produits</a>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <h1>Vos Retours</h1>
              
              {demoReturns.length > 0 ? (
                <div className="returns-list">
                  {demoReturns.map(returnItem => (
                    <div key={returnItem.id} className="return-card">
                      <div className="return-header">
                        <div className="return-header-section">
                          <div className="return-label">Retour initié le</div>
                          <div className="return-value">{returnItem.date}</div>
                        </div>
                        <div className="return-header-section">
                          <div className="return-label">N° de retour</div>
                          <div className="return-value">{returnItem.id}</div>
                        </div>
                        <div className="return-header-section">
                          <div className="return-label">Pour la commande</div>
                          <div className="return-value">{returnItem.order}</div>
                        </div>
                      </div>
                      
                      <div className="return-status">
                        <div className="status-badge processing">
                          {returnItem.status}
                        </div>
                        <div className="refund-status">
                          {returnItem.refundStatus}
                        </div>
                      </div>
                      
                      <div className="return-item">
                        <div className="item-image">
                          <img src={returnItem.item.image} alt={returnItem.item.title} />
                        </div>
                        <div className="item-details">
                          <h3>{returnItem.item.title}</h3>
                          <p className="item-price">{returnItem.item.price}</p>
                          <div className="item-actions">
                            <a href="#" className="order-action-link">Voir les détails</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-returns">
                  <div className="empty-state">
                    <h3>Vous n'avez pas encore effectué de retour</h3>
                    <p>Une fois que vous aurez initié un retour, vous pourrez le suivre ici.</p>
                    <a href="/orders" className="browse-link">Voir vos commandes</a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .orders-page {
          padding: 2rem 0;
        }
        
        .orders-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .orders-tabs {
          display: flex;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #e3e3e3;
        }
        
        .tab-button {
          background: none;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          color: #555;
          font-weight: 500;
        }
        
        .tab-button.active {
          border-bottom-color: #232f3e;
          color: #232f3e;
        }
        
        h1 {
          margin-bottom: 2rem;
          font-size: 1.8rem;
          color: #333;
        }
        
        .orders-list, .returns-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .order-card, .return-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .order-header, .return-header {
          background-color: #f5f5f5;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          border-bottom: 1px solid #ddd;
        }
        
        .order-header-section, .return-header-section {
          min-width: 200px;
        }
        
        .order-label, .return-label {
          font-size: 0.8rem;
          color: #555;
          margin-bottom: 0.25rem;
        }
        
        .order-value, .return-value {
          font-weight: 500;
          color: #232f3e;
        }
        
        .order-status, .return-status {
          padding: 1rem;
          background-color: #fff;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .status-badge.delivered {
          background-color: #dff0d8;
          color: #3c763d;
        }
        
        .status-badge.processing {
          background-color: #d9edf7;
          color: #31708f;
        }
        
        .refund-status {
          font-size: 0.85rem;
          color: #3c763d;
        }
        
        .order-item, .return-item {
          padding: 1.5rem;
          display: flex;
          gap: 1.5rem;
          border-bottom: 1px solid #eee;
        }
        
        .item-image {
          width: 100px;
          flex-shrink: 0;
        }
        
        .item-image img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        
        .item-details {
          flex-grow: 1;
        }
        
        .item-details h3 {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #232f3e;
        }
        
        .item-price {
          font-weight: bold;
          color: #B12704;
          margin-bottom: 1rem;
        }
        
        .item-actions {
          display: flex;
          gap: 1rem;
        }
        
        .order-action-link {
          color: #0066c0;
          text-decoration: none;
          font-size: 0.9rem;
        }
        
        .order-action-link:hover {
          color: #c45500;
          text-decoration: underline;
        }
        
        .empty-state {
          padding: 3rem;
          text-align: center;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        
        .empty-state h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #333;
        }
        
        .empty-state p {
          color: #666;
          margin-bottom: 1.5rem;
        }
        
        .browse-link {
          display: inline-block;
          background-color: #febd69;
          color: #232f3e;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .browse-link:hover {
          background-color: #f3a847;
        }
        
        @media (max-width: 768px) {
          .order-header, .return-header {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .order-header-section, .return-header-section {
            min-width: auto;
          }
          
          .order-item, .return-item {
            flex-direction: column;
          }
          
          .item-image {
            width: 150px;
            margin: 0 auto 1rem;
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
