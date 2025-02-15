import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    let loadingProgress = 0;
    let animationFrameId;
    let startTime = Date.now();
    const duration = 2000; // 2 seconds total loading time

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      // Ensure smooth progress that always reaches 100%
      if (elapsed < duration) {
        // Use easeOut function for smoother progression
        loadingProgress = Math.min(100, (elapsed / duration) * 100);
        setProgress(loadingProgress);
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Only trigger exit animation after reaching 100%
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => onComplete()
        });
      }
    };

    // Start the progress animation
    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <div ref={logoRef} style={{ marginBottom: '2rem' }}>
        <div style={{
          width: '96px',
          height: '96px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#000000', fontSize: '24px', fontWeight: 'bold' }}>
            <img src="image/footer_logo.png" alt="logo" />
          </span>
        </div>
      </div>

      <div style={{
        width: '256px',
        height: '8px',
        backgroundColor: '#333333',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div
          ref={progressBarRef}
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#ffffff',
            transition: 'width 0.3s ease-out'
          }}
        />
      </div>

      <div style={{
        marginTop: '8px',
        color: '#ffffff',
        fontFamily: 'monospace',
        fontSize: '14px'
      }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default Preloader;