"use client"
import React, { useState } from 'react';
import Primary from '../component/primary';
import Menu from '../component/menu';
import Footer from '../component/footer';
import Link from "next/link";

const GlassGallery = () => {
  const [modalImage, setModalImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      image: "/image/result/2024.jpg",
      title: "ICSE 2023",
      description: "In the ICSE 2023 exams, VSN students achieved outstanding results, with many securing top positions and distinctions. Their success is a reflection of hard work, excellent teaching, and a supportive learning environment at the school. The remarkable performance highlights the dedication and commitment of both the students and faculty."
    },
    {
      id: 2,
      image: "/image/result/2024.jpg",
      title: "ICSE 2022",
      description: "VSN students have once again excelled in the ICSE 2022 exams, with many securing top positions and distinctions. Their success is a testament to the hard work, dedication, and commitment of both the students and faculty. The outstanding performance reflects the high standards of teaching and learning at the school."
    },
    {
      id: 3,
      image: "/image/result/2024.jpg",
      title: "ICSE 2021",
      description: "VSN students have once again excelled in the ICSE 2021 exams, with many securing top positions and distinctions. Their success is a testament to the hard work, dedication, and commitment of both the students and faculty. The outstanding performance reflects the high standards of teaching and learning at the school."
    },
    {
      id: 4,
      image: "/image/result/2024.jpg",
      title: "ICSE 2020",
      description: "VSN students have once again excelled in the ICSE 2020 exams, with many securing top positions and distinctions. Their success is a testament to the hard work, dedication, and commitment of both the students and faculty. The outstanding performance reflects the high standards of teaching and learning at the school."
    }
  ];

  return (
    <>
      <Primary />
      <Menu />
      <style jsx>{`
        .gallery-container {
          min-height: 100vh;
          padding: 2rem;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          position: relative;
          overflow: hidden;
        }

        .gallery-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 25%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 25%);
          pointer-events: none;
        }

        .pre-heading {
          text-align: center;
          color: #94a3b8;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .main-heading {
          text-align: center;
          color: #ffffff;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          position: relative;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .main-heading::after {
          content: '';
          display: block;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #38bdf8, #8b5cf6);
          margin: 15px auto 0;
          border-radius: 2px;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .gallery-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
          position: relative;
        }

        .gallery-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(180deg, 
            rgba(56, 189, 248, 0.05) 0%,
            rgba(139, 92, 246, 0.05) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .gallery-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        .gallery-card:hover::before {
          opacity: 1;
        }

        .card-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          cursor: pointer;
          transition: transform 0.4s ease;
        }

        .gallery-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-content {
          padding: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .card-title {
          font-size: 1.25rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
          position: relative;
          display: inline-block;
        }

        .card-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #38bdf8, #8b5cf6);
          transition: width 0.3s ease;
        }

        .gallery-card:hover .card-title::after {
          width: 100%;
        }

        .card-description {
          color: #94a3b8;
          line-height: 1.6;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.95);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: 0;
          animation: modalFade 0.3s ease forwards;
        }

        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal img {
          max-width: 90%;
          max-height: 90vh;
          object-fit: contain;
          transform: scale(0.9);
          opacity: 0;
          animation: imageScale 0.4s ease 0.2s forwards;
        }

        @keyframes imageScale {
          from { 
            transform: scale(0.9);
            opacity: 0;
          }
          to { 
            transform: scale(1);
            opacity: 1;
          }
        }

        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            padding: 1rem;
          }
        }
      `}</style>

      <div className="gallery-container">
        <p className="pre-heading">Capturing Moments That Matter</p>
        <h1 className="main-heading">Our Results of ICSE!</h1>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery-card">
              <img
                src={item.image}
                alt={item.title}
                className="card-image"
                onClick={() => setModalImage(item)}
              />
              <div className="card-content">
                <h2 className="card-title">{item.title}</h2>
                <p className="card-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="buutons" style={{ zIndex: 1000 }}>
          <a href='/'>Home</a>
        </div>
      </div>


      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <button className="close-button">&times;</button>
          <img src={modalImage.image} alt={modalImage.title} />
        </div>
      )}

      <Footer />
    </>
  );
};

export default GlassGallery;