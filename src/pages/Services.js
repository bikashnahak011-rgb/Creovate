import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaVideo, FaImage, FaGlobe, FaChartBar, FaCheck, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useWhatsApp from '../useWhatsApp';
import './Services.css';

const services = [
  { icon: <FaVideo />, title: 'Video Editing', slug: 'video-editing', color: '#ff6b35', img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80', desc: 'Professional video editing for Gaming, Reels, YouTube, and any occasion.', features: ['Color Grading', 'Transitions & Effects', 'Background Music', 'Subtitles/Captions', 'Watermark Preview'], premium: 49, pro: 69 },
  { icon: <FaImage />, title: 'Photo Editing', slug: 'photo-editing', color: '#7c3aed', img: 'https://i.pinimg.com/736x/a6/67/74/a66774c3ddec131e5842373877769d91.jpg', desc: 'Professional photo editing, banners, logos, thumbnails and more.', features: ['Background Removal', 'Color Correction', 'Logo Design', 'Thumbnail Design', 'Banner Creation'], premium: 20, pro: 35 },
  { icon: <FaGlobe />, title: 'Website Building', slug: 'website-building', color: '#0ea5e9', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80', desc: 'Beautiful websites for Wedding, Birthday, Portfolio and personal use.', features: ['Responsive Design', 'Mobile Friendly', 'Contact Form', 'Gallery Section', 'Fast Delivery'], premium: 999, pro: 1299 },
  { icon: <FaChartBar />, title: 'Presentations', slug: 'presentations', color: '#10b981', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80', desc: 'Stunning PowerPoint/Google Slides for business, academic or personal tasks.', features: ['Custom Design', 'Animations', 'Charts & Graphs', 'Professional Layout', 'Any Topic'], premium: 119, pro: 149 },
];

export default function Services() {
  const { open } = useWhatsApp();
  const navigate = useNavigate();
  const [orderForm, setOrderForm] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [sent, setSent] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [showPlanModal, setShowPlanModal] = useState(false);

  useEffect(() => {
    const hasSeenPlanModal = localStorage.getItem('servicesPlanModalSeen');
    if (!hasSeenPlanModal) {
      setShowPlanModal(true);
      localStorage.setItem('servicesPlanModalSeen', 'true');
    }
  }, []);

  const openOrder = (service, plan, price) => {
    setOrderForm({ service, plan, price });
    setForm({ name: '', description: '' });
    setSent(false);
  };

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    const order = { ...form, service: orderForm.service, plan: orderForm.plan, price: orderForm.price };
    await axios.post('http://localhost:5000/api/orders', order).catch(() => {});
    open(`Hi Bikash! 👋\nName: ${form.name}\nService: ${orderForm.service}\nPlan: ${orderForm.plan} (Rs.${orderForm.price})\nDetails: ${form.description}`);
    setSent(true);
  };

  return (
    <div className="services-page">
      {/* Plan Modal */}
      {showPlanModal && (
        <div className="modal-overlay" onClick={() => setShowPlanModal(false)}>
          <div className="modal plan-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPlanModal(false)}>✕</button>
            <h3>Choose Your Plan</h3>
            <div className="plan-options">
              <div className="plan-card">
                <div className="plan-icon">⭐</div>
                <h4>Premium</h4>
                <p>Basic Transition, Colour Grading, Take some time to Delivery</p>
              </div>
              <div className="plan-card pro">
                <div className="plan-icon">🔥</div>
                <h4>Premium Pro</h4>
                <p>Advanced Effects, Custom Animations, Priority Support, 2K&4K, Quick Delivery</p>
              </div>
            </div>
            <button className="btn-orange" onClick={() => setShowPlanModal(false)}>
              Continue to Services
            </button>
          </div>
        </div>
      )}

      <div className="services-hero">
        <div className="services-hero-copy">
          <h1>Creative Services Built for Growth</h1>
          <p className="p1">Fast, polished, and affordable creative work with direct WhatsApp support for every project.</p>
          <div className="services-plan-cards">
            <div className="plan-box premium">
              <div className="plan-badge">Premium</div>
              <h3>₹1149/mo</h3>
              <p>You can Get This Services for +1 Month</p>
              <ul>
                <li>+5 Video Editing</li>
                <li>+8 Photo Editing</li>
                <li>+1 Build Website</li>
                <li>+1 Presentation</li>
              </ul>
            </div>
            <div className="plan-box pro">
              <div className="plan-badge pro">Premium Pro</div>
              <h3>₹1899/mo</h3>
              <p>You Can Get This Services +2 Month</p> 
              <ul>
                <li>+8 Video Editing</li>
                <li>+10 Photo Editing</li>
                <li>+2 Build Website</li>
                <li>+3 Presentation</li>
              </ul>
            </div>
          </div>
          <button className="btn-glow" onClick={() => setShowPlanModal(true)}>
            View Plan Details
          </button>
        </div>
      </div>

      <div className="services-list">
        {services.map((s, i) => (
          <div className="service-row" key={i} style={{'--accent': s.color}}>
            <div className="service-row-img">
              <div className={`service-row-img-wrapper ${loadedImages[i] ? 'loaded' : 'loading'}`}>
                <img 
                  src={s.img} 
                  alt={s.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(i)}
                />
              </div>
              <div className="service-row-icon" style={{background: s.color}}>{s.icon}</div>
            </div>
            <div className="service-row-info">
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
              <ul>
                {s.features.map((f, j) => <li key={j}><FaCheck color={s.color} /> {f}</li>)}
              </ul>
              <div className="pricing-cards">
                <div className="price-card">
                  <h4>Premium</h4>
                  <div className="price">₹{s.premium}</div>
                  <button className="btn-orange" onClick={() => openOrder(s.title, 'Premium', s.premium)}>
                    <FaWhatsapp /> Order
                  </button>
                </div>
                <div className="price-card pro">
                  <span className="pro-badge">🔥 Best</span>
                  <h4>Premium Pro</h4>
                  <div className="price">₹{s.pro}</div>
                  <button className="btn-orange" onClick={() => openOrder(s.title, 'Premium Pro', s.pro)}>
                    <FaWhatsapp /> Order
                  </button>
                </div>
              </div>
              <button className="btn-explore" onClick={() => navigate(`/services/${s.slug}`)}>
                Explore {s.title} <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Modal */}
      {orderForm && !sent && (
        <div className="modal-overlay" onClick={() => setOrderForm(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Order: {orderForm.service}</h3>
            <p className="modal-plan">{orderForm.plan} — <strong>₹{orderForm.price}</strong></p>
            <form onSubmit={submitOrder}>
              <input placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              <textarea placeholder="Describe what you need..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4} />
              <button type="submit" className="btn-orange"><FaWhatsapp /> Confirm & Chat on WhatsApp</button>
              <button type="button" className="btn-cancel" onClick={() => setOrderForm(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {sent && (
        <div className="modal-overlay" onClick={() => setSent(false)}>
          <div className="modal success-modal">
            <div className="success-icon">✅</div>
            <h3>Order Placed!</h3>
            <p>Your order saved! WhatsApp opening to chat with Bikash...</p>
            <button className="btn-orange" onClick={() => { setSent(false); setOrderForm(null); }}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}
