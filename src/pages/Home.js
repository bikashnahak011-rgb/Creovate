import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaVideo, FaImage, FaGlobe, FaChartBar } from 'react-icons/fa';
import axios from 'axios';
import useWhatsApp from '../useWhatsApp';
import './Home.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const services = [
  { icon: <FaVideo />, title: 'Video Editing', slug: 'video-editing', desc: 'Gaming, Reels, YouTube & more. Professional cuts, effects and transitions.', img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&q=80', color: '#ff6b35' },
  { icon: <FaImage />, title: 'Photo Editing', slug: 'photo-editing', desc: 'Banners, Logos, Thumbnails & professional photo retouching.', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80', color: '#7c3aed' },
  { icon: <FaGlobe />, title: 'Website Building', slug: 'website-building', desc: 'Wedding, Birthday, Portfolio websites built clean and fast.', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&q=80', color: '#0ea5e9' },
  { icon: <FaChartBar />, title: 'Presentations', slug: 'presentations', desc: 'Stunning slides for any task — business, academic or personal.', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80', color: '#10b981' },
];

const defaultFeedbacks = [
  { name: 'Amit Sharma', service: 'Video Editing', rating: 5, message: 'Excellent work! The video editing was perfect. Very fast delivery and great communication. Highly recommended to everyone!' },
  { name: 'Priya Gupta', service: 'Photo Editing', rating: 4.8, message: 'Amazing photo editing quality! The colors are vibrant and professional. CREOVATE is the best choice for any creative work.' },
  { name: 'Rahul Verma', service: 'Website Building', rating: 4, message: 'Built a fantastic website for my business. Responsive, beautiful design, and excellent customer support. Worth every penny!' },
];

export default function Home() {
  const { open } = useWhatsApp();
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: '', service: 'Video Editing', rating: 5, message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/api/feedback`)
      .then(r => setFeedbacks(r.data))
      .catch(err => {
        console.error('Unable to load feedback:', err);
      });
  }, [submitted]);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('howItWorksModalSeen');
    if (!hasSeenModal) {
      setShowHowItWorks(true);
      localStorage.setItem('howItWorksModalSeen', 'true');
    }
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/api/feedback`, form);
      setSubmitted(true);
      setForm({ name: '', service: 'Video Editing', rating: 5, message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error('Feedback submission failed:', err);
      alert('Unable to submit feedback right now. Please make sure the backend server is running on http://localhost:5000 and try again.');
    }
  };

  return (
    <div className="home">
      {/* How It Works Modal */}
      {showHowItWorks && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowHowItWorks(false)}>✕</button>
            <div className="modal-header">
              <h2>How It Works</h2>
              <p>Simple 6-step process to get your work done</p>
            </div>
            <div className="modal-steps">
              {[
                { num: '1', text: 'Select your service' },
                { num: '2', text: 'Chat on WhatsApp and share your requirement' },
                { num: '3', text: 'Receive preview (watermarked)' },
                { num: '4', text: 'Make payment' },
                { num: '5', text: 'Get final high-quality delivery' },
                { num: '6', text: 'Then kindly share your feedback' }
              ].map((step, idx) => (
                <div className="modal-step" key={idx}>
                  <div className="step-badge">{step.num}</div>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
            <button className="btn-orange" style={{width: '100%', marginTop: 20}} onClick={() => setShowHowItWorks(false)}>
              Got it! Let's Start 🚀
            </button>
          </div>
        </div>
      )}
      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <span className="badge">🔥 Developer By BIKASH NAHAK</span>
          <h1>Your Creative Vision,<br /><span>Delivered Professionally</span></h1>
          <p>Video editing, photo editing, websites & presentations — all at affordable prices. Order via WhatsApp, pay after preview!</p>
          <p className="hero-trust"> Your Satisfaction is Our Priority</p>
          <div className="hero-btns">
            <button className="btn-orange" onClick={() => open('Hi Bikash! I want to order a service from CREOVATE')}>Order Now 🚀</button>
            <Link to="/services" className="btn-outline">View Services</Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="trust-indicators">
          <div className="trust-card">
            <div className="trust-icon">✅</div>
            <div className="trust-value">100+</div>
            <div className="trust-label">Projects Completed</div>
          </div>
          <div className="trust-card">
            <div className="trust-icon">⚡</div>
            <div className="trust-value">Fast</div>
            <div className="trust-label">Quick Delivery</div>
          </div>
          <div className="trust-card">
            <div className="trust-icon">⭐</div>
            <div className="trust-value">100%</div>
            <div className="trust-label">Client Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
        <p className="section-sub" style={{color:'#ff6b35', fontWeight:600, textTransform:'uppercase', letterSpacing:2}}>What We Offer</p>
        <h2 className="section-title">Our Services</h2>
        <p className="section-sub">Premium quality creative work at the most affordable prices</p>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <div className={`service-img-wrap ${loadedImages[i] ? 'loaded' : 'loading'}`}>
                <img 
                  src={s.img} 
                  alt={s.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(i)}
                />
                <div className="service-icon" style={{background: s.color}}>{s.icon}</div>
              </div>
              <div className="service-info">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <a href={`/services/${s.slug}`} className="btn-orange" style={{fontSize:'13px', padding:'8px 20px', display:'inline-flex', alignItems:'center', gap:6}}>
                  Explore Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <p className="section-sub" style={{color:'#ff6b35', fontWeight:600, textTransform:'uppercase', letterSpacing:2}}>Simple Process</p>
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          {[
            { n: '01', t: 'Order on WhatsApp', d: 'Click Order Now and tell us what you need' },
            { n: '02', t: 'We Start Working', d: 'We begin your project immediately' },
            { n: '03', t: 'Preview Sent', d: 'You get a watermark preview to approve' },
            { n: '04', t: 'Pay & Receive', d: 'Pay via UPI/QR and get the full HD file' },
          ].map((s, i) => (
            <div className="step" key={i}>
              <div className="step-num">{s.n}</div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section className="feedback-section">
        <p className="section-sub" style={{color:'#ff6b35', fontWeight:600, textTransform:'uppercase', letterSpacing:2}}>Testimonials</p>
        <h2 className="section-title">Customer Reviews</h2>
        <div className="feedback-grid">
          {[...defaultFeedbacks, ...feedbacks].slice(0, 6).map((f, i) => {
            const roundedRating = Math.max(0, Math.min(5, Math.round(Number(f.rating) || 0)));
            return (
              <div className="feedback-card" key={i}>
                <div className="stars">{[...Array(roundedRating)].map((_, j) => <FaStar key={j} color="#ff6b35" />)}</div>
                <div className="feedback-message">
                  {f.message.split(/\r?\n/).map((line, idx) => (
                    <p key={idx}>{line || <>&nbsp;</>}</p>
                  ))}
                </div>
                <h5>— {f.name} <span>({f.service})</span></h5>
              </div>
            );
          })}
        </div>

        {/* Leave Feedback Form */}
        <div className="feedback-form-wrap">
          <h3>Leave Your Review</h3>
          {submitted && <p className="success-msg">✅ Thank you for your feedback!</p>}
          <form onSubmit={submitFeedback} className="feedback-form">
            <input placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
              <option>Video Editing</option>
              <option>Photo Editing</option>
              <option>Website Building</option>
              <option>Presentations</option>
            </select>
            <select value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})}>
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{'⭐'.repeat(r)} ({r} Star{r>1?'s':''})</option>)}
            </select>
            <textarea placeholder="Write your review..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows={4} />
            <button type="submit" className="btn-orange">Submit Review</button>
          </form>
        </div>
      </section>
    </div>
  );
}
