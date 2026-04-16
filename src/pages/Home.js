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

  useEffect(() => {
    axios.get(`${API_BASE}/api/feedback`)
      .then(r => setFeedbacks(r.data))
      .catch(err => {
        console.error('Unable to load feedback:', err);
      });
  }, [submitted]);

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
      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <span className="badge">⭐ Trusted by 100+ Happy Clients</span>
          <h1>Your Creative Vision,<br /><span>Delivered Professionally</span></h1>
          <p>Professional video editing, photo editing, website building & presentations. Get premium quality work at affordable prices.</p>
          <div className="hero-btns">
            <Link to="/services" className="btn-orange">Explore Services</Link>
            <button className="btn-outline" onClick={() => open('Hi! I would like to know more about your services')}>Contact Us</button>
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
            <div className="trust-icon">⭐</div>
            <div className="trust-value">4.7/5</div>
            <div className="trust-label">Average Rating</div>
          </div>
          <div className="trust-card">
            <div className="trust-icon">⚡</div>
            <div className="trust-value">24hr</div>
            <div className="trust-label">Fast Delivery</div>
          </div>
          <div className="trust-card">
            <div className="trust-icon">🛡️</div>
            <div className="trust-value">100%</div>
            <div className="trust-label">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
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
                <Link to={`/services/${s.slug}`} className="btn-explore-home">
                  Explore →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section">
        <h2 className="section-title">Why Choose Us</h2>
        <p className="section-sub">We deliver professional quality with exceptional service</p>
        <div className="why-us-grid">
          {[
            { icon: '💰', title: 'Affordable Pricing', desc: 'Premium quality at prices everyone can afford. No hidden charges, transparent pricing.' },
            { icon: '⚡', title: 'Fast Delivery', desc: 'Most projects completed within 24 hours. Urgent orders handled with priority.' },
            { icon: '🔄', title: 'Free Revisions', desc: 'We revise until you are 100% satisfied. Your satisfaction is our priority.' },
            { icon: '💬', title: '24/7 Support', desc: 'Direct WhatsApp support. Real human assistance, no bots, no delays.' },
            { icon: '🎨', title: 'Professional Quality', desc: 'Every project crafted with care, creativity and professional-grade tools.' },
            { icon: '✅', title: 'Proven Results', desc: '100+ successful projects with 4.7/5 average rating from satisfied clients.' },
          ].map((w, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">{w.icon}</div>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-sub">A simple, straightforward process</p>
        <div className="steps">
          {[
            { n: '01', t: 'Contact Us', d: 'Tell us about your project requirements' },
            { n: '02', t: 'We Create', d: 'Our team starts working on your project' },
            { n: '03', t: 'Review & Approve', d: 'You review and approve the final work' },
            { n: '04', t: 'Delivery', d: 'Receive your completed project' },
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
        <h2 className="section-title">Customer Reviews</h2>
        <p className="section-sub">See what our clients are saying</p>
        <div className="feedback-grid">
          {[...defaultFeedbacks, ...feedbacks].slice(0, 6).map((f, i) => {
            const roundedRating = Math.max(0, Math.min(5, Math.round(Number(f.rating) || 0)));
            return (
              <div className="feedback-card" key={i}>
                <div className="stars">{[...Array(roundedRating)].map((_, j) => <FaStar key={j} color="#1dbf73" />)}</div>
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
