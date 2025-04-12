import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export default function ReviewSystem({ productId, initialReviews = [] }) {
  const { t } = useTranslation('common');
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    comment: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Calculer la note moyenne
  const averageRating = reviews.length 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;
  
  // Statistiques des notes
  const ratingStats = [5, 4, 3, 2, 1].map(rate => {
    const count = reviews.filter(review => review.rating === rate).length;
    const percentage = reviews.length ? (count / reviews.length) * 100 : 0;
    return { rate, count, percentage };
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: name === 'rating' ? parseInt(value, 10) : value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!newReview.name || !newReview.email || !newReview.comment) {
      setFormError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    // Dans une application réelle, on enverrait les données à une API
    // Pour cette démo, on simule l'ajout de l'avis
    const reviewToAdd = {
      id: `review-${Date.now()}`,
      ...newReview,
      date: new Date().toLocaleDateString('fr-FR'),
      verified: true,
      likes: 0,
      dislikes: 0,
      productId,
    };
    
    setReviews([reviewToAdd, ...reviews]);
    setSubmitted(true);
    setFormError('');
    setNewReview({
      name: '',
      email: '',
      rating: 5,
      title: '',
      comment: '',
    });
    
    // Dans une vraie application, on enverrait l'avis à une API
    // fetch('/api/reviews', { method: 'POST', body: JSON.stringify(reviewToAdd) })
  };
  
  const resetForm = () => {
    setSubmitted(false);
  };
  
  const handleVote = (reviewId, voteType) => {
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        if (voteType === 'like') {
          return { ...review, likes: review.likes + 1 };
        } else {
          return { ...review, dislikes: review.dislikes + 1 };
        }
      }
      return review;
    }));
    
    // Dans une vraie application, on enverrait le vote à une API
    // fetch(`/api/reviews/${reviewId}/vote`, { method: 'POST', body: JSON.stringify({ voteType }) })
  };
  
  return (
    <div className="review-system">
      <h2 className="reviews-title">Avis clients ({reviews.length})</h2>
      
      <div className="reviews-overview">
        <div className="rating-average">
          <div className="big-rating">{averageRating.toFixed(1)}</div>
          <div className="rating-stars">
            {'★'.repeat(Math.round(averageRating))}
            {'☆'.repeat(5 - Math.round(averageRating))}
          </div>
          <div className="total-reviews">{reviews.length} avis</div>
        </div>
        
        <div className="rating-distribution">
          {ratingStats.map(stat => (
            <div key={stat.rate} className="rating-bar">
              <div className="rating-label">{stat.rate} étoiles</div>
              <div className="rating-progress">
                <div className="rating-progress-fill" style={{ width: `${stat.percentage}%` }}></div>
              </div>
              <div className="rating-count">{stat.count}</div>
            </div>
          ))}
        </div>
      </div>
      
      {!submitted ? (
        <div className="review-form-container">
          <h3>Laisser un avis</h3>
          {formError && <div className="form-error">{formError}</div>}
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <label htmlFor="rating">Votre note *</label>
              <div className="rating-selector">
                {[5, 4, 3, 2, 1].map(rate => (
                  <label key={rate} className="rating-option">
                    <input
                      type="radio"
                      name="rating"
                      value={rate}
                      checked={newReview.rating === rate}
                      onChange={handleInputChange}
                    />
                    <span className="star">{rate} ★</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nom *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newReview.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email * (ne sera pas publié)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newReview.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="title">Titre de votre avis</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newReview.title}
                onChange={handleInputChange}
                placeholder="Résumez votre expérience en une phrase"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="comment">Votre avis *</label>
              <textarea
                id="comment"
                name="comment"
                rows="5"
                value={newReview.comment}
                onChange={handleInputChange}
                placeholder="Partagez votre expérience avec ce produit. Qu'avez-vous aimé ou non ?"
                required
              ></textarea>
            </div>
            
            <div className="form-agreement">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                Je confirme que cet avis est basé sur ma propre expérience et qu'il ne contient pas de langage offensant ou inapproprié.
              </label>
            </div>
            
            <button type="submit" className="submit-review">Soumettre l'avis</button>
          </form>
        </div>
      ) : (
        <div className="thank-you-message">
          <h3>Merci pour votre avis !</h3>
          <p>Votre commentaire a été ajouté avec succès et sera visible par les autres utilisateurs.</p>
          <button onClick={resetForm} className="write-another">Écrire un autre avis</button>
        </div>
      )}
      
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="review-user">
                  <div className="user-avatar">
                    {review.avatar ? (
                      <Image 
                        src={review.avatar} 
                        alt={review.name}
                        width={40}
                        height={40}
                        className="avatar-image"
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="user-info">
                    <div className="user-name">{review.name}</div>
                    <div className="review-date">{review.date}</div>
                  </div>
                </div>
                <div className="review-rating">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              
              {review.title && <h4 className="review-title">{review.title}</h4>}
              
              <div className="review-content">
                <p>{review.comment}</p>
              </div>
              
              <div className="review-footer">
                {review.verified && (
                  <span className="verified-badge">
                    ✓ Achat vérifié
                  </span>
                )}
                
                <div className="review-actions">
                  <button 
                    className="vote-button" 
                    onClick={() => handleVote(review.id, 'like')}
                  >
                    👍 Utile ({review.likes})
                  </button>
                  <button 
                    className="vote-button" 
                    onClick={() => handleVote(review.id, 'dislike')}
                  >
                    👎 Pas utile ({review.dislikes})
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-reviews">
            <p>Aucun avis pour le moment. Soyez le premier à donner votre avis sur ce produit !</p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .review-system {
          margin: 3rem 0;
        }
        
        .reviews-title {
          font-size: 1.8rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid var(--secondary-color);
          padding-bottom: 0.5rem;
        }
        
        .reviews-overview {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        
        .rating-average {
          text-align: center;
          padding-right: 2rem;
          border-right: 1px solid #ddd;
        }
        
        .big-rating {
          font-size: 3rem;
          font-weight: bold;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        
        .rating-stars {
          color: #ff9900;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .total-reviews {
          color: #666;
        }
        
        .rating-distribution {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .rating-bar {
          display: grid;
          grid-template-columns: 100px 1fr 50px;
          align-items: center;
          gap: 1rem;
        }
        
        .rating-label {
          text-align: right;
          font-size: 0.9rem;
        }
        
        .rating-progress {
          height: 12px;
          background-color: #eee;
          border-radius: 10px;
          overflow: hidden;
        }
        
        .rating-progress-fill {
          height: 100%;
          background-color: #ff9900;
        }
        
        .rating-count {
          font-size: 0.9rem;
          color: #666;
        }
        
        .review-form-container {
          margin-bottom: 3rem;
          padding: 1.5rem;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        
        .review-form-container h3 {
          margin-bottom: 1.5rem;
        }
        
        .form-error {
          padding: 1rem;
          background-color: #ffebee;
          color: #d32f2f;
          border-radius: 4px;
          margin-bottom: 1.5rem;
        }
        
        .review-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
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
          font-family: inherit;
          font-size: 1rem;
        }
        
        .rating-selector {
          display: flex;
          gap: 1rem;
        }
        
        .rating-option {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .rating-option input {
          margin-right: 0.5rem;
        }
        
        .star {
          color: #ff9900;
        }
        
        .form-agreement {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        
        .form-agreement input {
          margin-top: 0.3rem;
        }
        
        .form-agreement label {
          font-size: 0.9rem;
          color: #666;
        }
        
        .submit-review {
          align-self: flex-start;
          background-color: var(--primary-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .submit-review:hover {
          background-color: #3a4e64;
        }
        
        .thank-you-message {
          padding: 2rem;
          background-color: #f2f9f5;
          border: 1px solid #a5d6b7;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .thank-you-message h3 {
          color: #2e7d48;
          margin-bottom: 1rem;
        }
        
        .write-another {
          margin-top: 1rem;
          background-color: var(--primary-color);
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .review-item {
          padding: 1.5rem;
          border: 1px solid #eee;
          border-radius: 8px;
          background-color: white;
        }
        
        .review-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        
        .review-user {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        
        .avatar-placeholder {
          width: 100%;
          height: 100%;
          background-color: var(--primary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: bold;
        }
        
        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .user-name {
          font-weight: 500;
        }
        
        .review-date {
          font-size: 0.9rem;
          color: #666;
        }
        
        .review-rating {
          color: #ff9900;
          font-size: 1.2rem;
        }
        
        .review-title {
          margin-bottom: 1rem;
        }
        
        .review-content {
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .review-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }
        
        .verified-badge {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          background-color: #f2f9f5;
          color: #2e7d48;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        
        .review-actions {
          display: flex;
          gap: 1rem;
        }
        
        .vote-button {
          background: none;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 0.5rem 0.75rem;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .vote-button:hover {
          background-color: #f2f2f2;
        }
        
        .no-reviews {
          padding: 2rem;
          text-align: center;
          background-color: #f9f9f9;
          border-radius: 8px;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .reviews-overview {
            grid-template-columns: 1fr;
          }
          
          .rating-average {
            padding-right: 0;
            padding-bottom: 1.5rem;
            border-right: none;
            border-bottom: 1px solid #ddd;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .review-header {
            flex-direction: column;
            gap: 1rem;
          }
          
          .review-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

// Exemples d'avis pour la démo
export const demoReviews = [
  {
    id: 'review-1',
    name: 'Sophie Martin',
    rating: 5,
    title: 'Excellent rapport qualité/prix',
    comment: 'J\'ai acheté ce produit il y a un mois et j\'en suis vraiment satisfaite. La qualité est au rendez-vous et les fonctionnalités correspondent parfaitement à mes besoins. Je recommande vivement !',
    date: '10/04/2025',
    verified: true,
    likes: 12,
    dislikes: 1,
  },
  {
    id: 'review-2',
    name: 'Thomas Dubois',
    rating: 4,
    title: 'Très bon produit avec quelques défauts mineurs',
    comment: 'Le produit est globalement très bon et correspond à la description. Le seul bémol concerne l\'autonomie qui est un peu inférieure à ce qui est annoncé. Sinon, les matériaux sont de qualité et le design est élégant.',
    date: '05/04/2025',
    verified: true,
    likes: 8,
    dislikes: 2,
  },
  {
    id: 'review-3',
    name: 'Julie Leroy',
    rating: 5,
    title: 'Parfait !',
    comment: 'Rien à redire, c\'est exactement ce que je cherchais. Livraison rapide, produit bien emballé et de très bonne qualité. Je suis ravie de mon achat.',
    date: '01/04/2025',
    verified: true,
    likes: 15,
    dislikes: 0,
  },
  {
    id: 'review-4',
    name: 'Alexandre Bernard',
    rating: 3,
    title: 'Mitigé',
    comment: 'Le produit est correct mais pas exceptionnel. Certaines fonctionnalités sont bien pensées, d\'autres moins. Pour le prix, j\'espérais mieux. À réfléchir avant d\'acheter.',
    date: '28/03/2025',
    verified: false,
    likes: 3,
    dislikes: 5,
  },
];
