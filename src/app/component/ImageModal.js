"use client";
import { useEffect, useRef, useState } from "react";
import "../result-icse/gallery.css";

const ImageModal = ({ images, currentIndex, setCurrentIndex, closeModal }) => {
  const [zoom, setZoom] = useState(1);
  const imageRef = useRef(null);

  const handleWheel = (event) => {
    event.preventDefault();
    const newZoom = zoom + event.deltaY * -0.01;
    setZoom(Math.min(Math.max(newZoom, 1), 3));
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") prevImage();
    if (event.key === "Escape") closeModal();
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="modal">
      <button className="close-btn" onClick={closeModal}>&times;</button>
      <button className="prev-btn" onClick={prevImage}>&#10094;</button>
      <button className="next-btn" onClick={nextImage}>&#10095;</button>

      <div className="modal-content" onWheel={handleWheel}>
        <img
          ref={imageRef}
          src={images[currentIndex].src}
          alt="Fullscreen"
          style={{ transform: `scale(${zoom})` }}
          className="modal-image"
        />
      </div>
    </div>
  );
};

export default ImageModal;
