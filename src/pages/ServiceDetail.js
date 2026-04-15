import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaCheck, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import useWhatsApp from '../useWhatsApp';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import './ServiceDetail.css';

const serviceData = {
  'video-editing': {
    title: 'Video Editing',
    color: '#ff6b35',
    banner: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80',
    desc: 'Professional video editing for every need — gaming, reels, YouTube and more.',
    premium: 49, pro: 69,
    subcategories: [
      {
        title: 'Gaming Videos',
        img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80',
        desc: 'Epic gaming montages, highlights, and gameplay edits with effects and music.',
        features: ['Kill Highlights', 'Epic Transitions', 'Gaming Music', 'Text Effects', 'Color Grading'],
      },
      {
        title: 'Reels & Shorts',
        img: 'https://i.pinimg.com/736x/ea/e1/24/eae124894b63a41758a311c5da351143.jpg',
        desc: 'Viral-ready Instagram Reels, YouTube Shorts and TikTok videos.',
        features: ['Trending Transitions', 'Beat Sync', 'Captions', 'Fast Cuts', 'Filters'],
      },
      {
        title: 'YouTube Videos',
        img: 'https://images.openai.com/static-rsc-4/CalBjylrGLyRx90SoGFaenGGXovunVfDG_NUojG68Uauw-wH9xGFwRON532Qof1RUo40Jlkk61jL3xrj3DZD9NBhRtjN21dYq03OoxlmFkciQjijW22GUQvhnPZoRGGRnwc5_wjqNb_MYDvOEOYoitVNRbI0Z7D2iZw7WbqlB5cgdiLr8tULwvPV7VJn95Hi?purpose=fullsize',
        desc: 'Full YouTube video editing with intro, outro, and professional cuts.',
        features: ['Intro & Outro', 'Color Correction', 'Background Music', 'Subtitles', 'Thumbnail'],
      },
      {
        title: 'Wedding & Events',
        img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80',
        desc: 'Beautiful wedding and event highlight videos with cinematic feel.',
        features: ['Cinematic Edit', 'Love Music', 'Slow Motion', 'Color Grading', 'Titles'],
      },
    ],
    gallery: [
      {
        title: 'Gaming Montage Before/After',
        description: 'High-energy game edit with color enhancement.',
        subcategoryTitle: 'Gaming Videos',
        image: 'https://i.pinimg.com/736x/e3/83/77/e38377f8e0044f0fc7e7bd87d21da2ec.jpg'
      },
      {
        title: 'Reels Short Cut',
        description: 'Quick reels edit with fast transitions.',
        subcategoryTitle: 'Reels & Shorts',
        image: 'https://images.openai.com/static-rsc-4/xqRjO0FcDneXBkpq3McTZ6mNJcXtB4FzJTl68FUUfkFyGAd2r9Ku9a9P_FCxHCmjZ1Kij7R0URuP-7eD15C1z_fGhUATNCTpAc8Qu6dZwK7A553lHHWFVXYyru-LDnoz8f7aeAFL_jfdEOzyWi-eq04kK-bemGQ_PmOHvgZwj7pszjm9-A0qu2S4153sT6ke?purpose=fullsize'
      },
      {
        title: 'YouTube Thumbnail Upgrade',
        description: 'Bright, clickable thumbnail styling.',
        subcategoryTitle: 'YouTube Videos',
        image: 'https://images.openai.com/static-rsc-4/KcLh3N2Es6L2TUKx5M5tnVrh5Wh3p2wnES38RjfPWNslcgKvmGIqsQ_VxsVmL10FBhKIcGo7E5c7m3QBAfTnN-kwF3WDmXvV08A6cBvpzWYId_tTTw-lNFsqC_zgCF8O5tnu4JYeFbk3dUWo9t7xMeyjuv_c5ZKZpgIBs3mPMb105jaNFZlDhb1XSM1fD_26?purpose=fullsize'
      },
      {
        title: 'Wedding Highlight Showreel',
        description: 'Cinematic wedding highlight look.',
        subcategoryTitle: 'Wedding & Events',
        image: 'https://i.pinimg.com/736x/60/67/97/60679774d83857273aac2fa7c8ceac63.jpg'
      }
    ]
  },
  'photo-editing': {
    title: 'Photo Editing',
    color: '#7c3aed',
    banner: 'https://i.pinimg.com/1200x/68/0c/6d/680c6d9cbea257aed55dfa14f20e9dd7.jpg',
    desc: 'Professional photo editing, design and creative work for all your needs.',
    premium: 20, pro: 35,
    subcategories: [
      {
        title: 'Professional Photo Editing',
        img: 'https://i.pinimg.com/736x/5e/06/cf/5e06cf694f56b9222ef3ce4ad96b17a5.jpg',
        desc: 'Skin retouching, color correction and professional photo enhancement.',
        features: ['Skin Retouching', 'Background Removal', 'Color Correction', 'Lighting Fix', 'Object Removal'],
      },
      {
        title: 'Logo Design',
        img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80',
        desc: 'Creative and professional logo design for your brand or business.',
        features: ['Custom Design', 'Multiple Concepts', 'PNG & SVG', 'Brand Colors', 'Fast Delivery'],
      },
      {
        title: 'Thumbnail Design',
        img: 'https://i.pinimg.com/1200x/ff/a7/e8/ffa7e8c353732b11c96532a1f373c85d.jpg',
        desc: 'Eye-catching YouTube and social media thumbnails that get clicks.',
        features: ['Bold Text', 'Attractive Colors', 'Face Cutout', 'Custom Background', 'High CTR Design'],
      },
      {
        title: 'Banner & Poster',
        img: 'https://i.pinimg.com/736x/38/07/62/380762b3649a8dfbc27eca343c126750.jpg',
        desc: 'Stunning banners and posters for social media, events and promotions.',
        features: ['Social Media Size', 'Print Ready', 'Custom Design', 'Brand Colors', 'Fast Delivery'],
      },
    ],
    gallery: [
      {
        title: 'Photo Retouch Before/After',
        description: 'Skin and color correction example.',
        subcategoryTitle: 'Professional Photo Editing',
        image: 'https://i.pinimg.com/1200x/d3/ec/3d/d3ec3d9ee8e3cfa4c85b11209600a7ec.jpg'
      },
      {
        title: 'Logo Design Reveal',
        description: 'Project example for brand identity.',
        subcategoryTitle: 'Logo Design',
        image: 'https://i.pinimg.com/1200x/a4/66/90/a46690bc89bb8c0addc132a6bc62563a.jpg'
      },
      {
        title: 'Thumbnail Creative',
        description: 'High-converting thumbnail build.',
        subcategoryTitle: 'Thumbnail Design',
        image: 'https://i.pinimg.com/736x/77/d4/53/77d45397eb9964e8c7c1a002a7d93ae4.jpg'
      },
      {
        title: 'Poster Visual Impact',
        description: 'Poster design sample with strong contrast.',
        subcategoryTitle: 'Banner & Poster',
        image: 'https://i.pinimg.com/1200x/d4/b8/f9/d4b8f9a965ada05816219f382658885b.jpg'
      }
    ]
  },
  'website-building': {
    title: 'Website Building',
    color: '#0ea5e9',
    banner: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80',
    desc: 'Beautiful, responsive websites for every occasion and purpose.',
    premium: 999, pro: 1299,
    subcategories: [
      {
        title: 'Wedding Website',
        img: 'https://i.pinimg.com/1200x/c0/fb/71/c0fb71c37b709851ce5b6e9c37d2cdee.jpg',
        desc: 'Beautiful wedding websites with gallery, RSVP and event details.',
        features: ['Photo Gallery', 'RSVP Form', 'Event Timeline', 'Couple Story', 'Mobile Friendly'],
      },
      {
        title: 'Birthday Website',
        img: 'https://i.pinimg.com/1200x/4a/e7/ec/4ae7ec658ef77c3950d3f6828ea1e97e.jpg',
        desc: 'Fun and colorful birthday celebration websites with wishes and photos.',
        features: ['Photo Gallery', 'Wishes Section', 'Countdown Timer', 'Animations', 'Share Link'],
      },
      {
        title: 'Portfolio Website',
        img: 'https://i.pinimg.com/1200x/60/5b/63/605b63fc1116b7632be5ba5f74621f03.jpg',
        desc: 'Professional portfolio to showcase your work and attract clients.',
        features: ['Projects Gallery', 'About Section', 'Contact Form', 'Skills Section', 'Resume Download'],
      },
      {
        title: 'Business Website',
        img: 'https://i.pinimg.com/736x/87/1a/64/871a6418e3827bd59b9bb82c455c697e.jpg',
        desc: 'Clean business websites to grow your brand and reach more customers.',
        features: ['Services Section', 'Contact Form', 'Google Maps', 'Testimonials', 'SEO Ready'],
      },
    ],
    gallery: [
      {
        title: 'Wedding Website Sample',
        description: 'Responsive wedding website design.',
        subcategoryTitle: 'Wedding Website',
        image: 'https://i.pinimg.com/1200x/37/d6/6b/37d66bf4ff000d460758f676922241bb.jpg'
      },
      {
        title: 'Birthday Page Preview',
        description: 'Interactive birthday invitation landing page.',
        subcategoryTitle: 'Birthday Website',
        image: 'https://i.pinimg.com/736x/f4/35/86/f435865811c2e663d20002a87a476255.jpg'
      },
      {
        title: 'Portfolio Showcase',
        description: 'Clean portfolio layout for creators.',
        subcategoryTitle: 'Portfolio Website',
        image: 'https://i.pinimg.com/1200x/cd/9d/c0/cd9dc0beae48d935f04aa27d67588ad0.jpg'
      },
      {
        title: 'Business Web Template',
        description: 'Professional business landing page example.',
        subcategoryTitle: 'Business Website',
        image: 'https://i.pinimg.com/1200x/35/98/4a/35984a9a381262c5a62014b0a43dba09.jpg'
      }
    ]
  },
  'presentations': {
    title: 'Presentations',
    color: '#10b981',
    banner: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80',
    desc: 'Stunning presentations for any task — business, academic or personal.',
    premium: 119, pro: 149,
    subcategories: [
      {
        title: 'Academic Presentation',
        img: 'https://i.pinimg.com/736x/9f/06/ae/9f06aee1108bc82ef7595a2abd91fbf8.jpg',
        desc: 'Professional slides for college projects, thesis and seminars.',
        features: ['Clean Layout', 'Charts & Graphs', 'Citations', 'Animations', 'Any Subject'],
      },
      {
        title: 'Business Presentation',
        img: 'https://i.pinimg.com/1200x/1b/2b/bc/1b2bbc4da3e30242bcd8c9b32cfa8711.jpg',
        desc: 'Impressive business pitches, reports and company presentations.',
        features: ['Brand Colors', 'Data Charts', 'Infographics', 'Professional Design', 'Pitch Deck'],
      },
      {
        title: 'Creative Presentation',
        img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&q=80',
        desc: 'Colorful and creative slides for events, shows and personal use.',
        features: ['Bold Design', 'Animations', 'Custom Icons', 'Vibrant Colors', 'Unique Style'],
      },
      {
        title: 'Personal Presentation',
        img: 'https://i.pinimg.com/736x/c7/f8/86/c7f886e66b95a4c432279a5fe734f5b6.jpg',
        desc: 'Personal intro, resume or any custom presentation for any purpose.',
        features: ['Custom Layout', 'Personal Branding', 'Photo Integration', 'Clean Design', 'Any Topic'],
      },
    ],
    gallery: [
      {
        title: 'Academic Slide Set',
        description: 'Modern academic presentation template.',
        subcategoryTitle: 'Academic Presentation',
        image: 'https://i.pinimg.com/1200x/88/6c/51/886c51920b754b484f42f847c6c81c9b.jpg'
      },
      {
        title: 'Business Deck Example',
        description: 'Corporate pitch deck sample.',
        subcategoryTitle: 'Business Presentation',
        image: 'https://i.pinimg.com/736x/15/8b/d8/158bd8c588c74eb11365f8e9ec1e200f.jpg'
      },
      {
        title: 'Creative Slide Visual',
        description: 'Creative design with bold colors.',
        subcategoryTitle: 'Creative Presentation',
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80'
      },
      {
        title: 'Personal Portfolio Slide',
        description: 'Personal branding presentation layout.',
        subcategoryTitle: 'Personal Presentation',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80'
      }
    ]
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { open } = useWhatsApp();
  const service = serviceData[slug];

  const [orderForm, setOrderForm] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [sent, setSent] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  if (!service) return <div style={{padding:'100px',textAlign:'center'}}><h2>Service not found</h2></div>;

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const openOrder = (subTitle, plan, price) => {
    setOrderForm({ service: `${service.title} - ${subTitle}`, plan, price });
    setForm({ name: '', description: '' });
    setSent(false);
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    const order = { ...form, service: orderForm.service, plan: orderForm.plan, price: orderForm.price };
    await axios.post('http://localhost:5000/api/orders', order).catch(() => {});
    open(`Hi Bikash! 👋\nName: ${form.name}\nService: ${orderForm.service}\nPlan: ${orderForm.plan} (Rs.${orderForm.price})\nDetails: ${form.description}`);
    setSent(true);
  };

  return (
    <div className="detail-page">
      {/* Banner */}
      <div className="detail-banner" style={{backgroundImage: `url(${service.banner})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="detail-banner-overlay">
          <button className="back-btn" onClick={() => navigate('/services')}><FaArrowLeft /> Back to Services</button>
          <h1>{service.title}</h1>
          <p>{service.desc}</p>
          <div className="detail-pricing">
            <span className="price-badge">Premium ₹{service.premium}</span>
            <span className="price-badge pro">Premium Pro ₹{service.pro}</span>
          </div>
        </div>
      </div>

      {/* Subcategories */}
      <div className="detail-content">
        <h2>Choose Your <span style={{color: service.color}}>Category</span></h2>
        <p className="detail-sub">Select what you need and order instantly via WhatsApp</p>
        <div className="subcategory-grid">
          {service.subcategories.map((sub, i) => (
            <div className="sub-card" key={i} style={{'--color': service.color}}>
              <div className={`sub-img-wrap ${loadedImages[i] ? 'loaded' : 'loading'}`}>
                <img 
                  src={sub.img} 
                  alt={sub.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(i)}
                />
              </div>
              <div className="sub-info">
                <h3>{sub.title}</h3>
                <p>{sub.desc}</p>
                <ul>
                  {sub.features.map((f, j) => (
                    <li key={j}><FaCheck color={service.color} size={12} /> {f}</li>
                  ))}
                </ul>
                <div className="sub-order-btns">
                  <button className="btn-orange" onClick={() => openOrder(sub.title, 'Premium', service.premium)}>
                    <FaWhatsapp /> ₹{service.premium}
                  </button>
                  <button className="btn-pro" style={{background: service.color}} onClick={() => openOrder(sub.title, 'Premium Pro', service.pro)}>
                    <FaWhatsapp /> ₹{service.pro} Pro
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Gallery (URL-based image referencing) */}
        <BeforeAfterGallery
          serviceSlug={slug}
          subcategoryTitle={null}
          galleryImages={service.gallery || []}
        />
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
        <div className="modal-overlay" onClick={() => { setSent(false); setOrderForm(null); }}>
          <div className="modal success-modal">
            <div className="success-icon">✅</div>
            <h3>Order Placed!</h3>
            <p>WhatsApp is opening to chat with Bikash directly!</p>
            <button className="btn-orange" onClick={() => { setSent(false); setOrderForm(null); }}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}
