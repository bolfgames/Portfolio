import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAssetPath } from '../../utils/assetPath';
import './TweenMaxSlideshow.css';

interface TweenMaxSlideshowProps {
  images: string[];
  projectName: string;
  accentColor?: string;
  imageBasePath?: string;
}

export default function TweenMaxSlideshow({ 
  images, 
  projectName,
  accentColor = '#FFD700',
  imageBasePath = 'assets/resumes/Erdem/project_images'
}: TweenMaxSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const intervalRef = useRef<number | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const numOfSlides = images.length;

  // Reset timer function
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (numOfSlides <= 1) return;
    
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % numOfSlides);
    }, 5000);
  };

  // Animate slide transition with GSAP
  useEffect(() => {
    // Small delay to ensure refs are populated
    const timer = setTimeout(() => {
      if (slidesRef.current.length === 0 || imagesRef.current.length === 0) {
        console.log('TweenMaxSlideshow: Refs not ready', { 
          slidesLength: slidesRef.current.length, 
          imagesLength: imagesRef.current.length,
          currentSlide 
        });
        return;
      }

      // Kill previous timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const currentSlideEl = slidesRef.current[currentSlide];
      const currentImageEl = imagesRef.current[currentSlide];
      
      if (!currentSlideEl || !currentImageEl) {
        console.log('TweenMaxSlideshow: Missing slide or image refs', { currentSlide, slidesLength: slidesRef.current.length, imagesLength: imagesRef.current.length });
        return;
      }

      // Hide all slides first
      slidesRef.current.forEach((slide, index) => {
        if (slide && index !== currentSlide) {
          gsap.set(slide, { opacity: 0, display: 'none' });
        }
      });

      // Show current slide immediately with initial hidden state
      gsap.set(currentSlideEl, { display: 'flex', opacity: 0 });
      gsap.set(currentImageEl, { opacity: 0, scale: 0.9 });
      
      // Start animation
      timelineRef.current = gsap.timeline();
      timelineRef.current
        .to(currentSlideEl, 
          { opacity: 1, duration: 0.6, ease: 'power2.out' }
        )
        .to(currentImageEl,
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
    }, 100);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [currentSlide, numOfSlides]);

  // Auto-advance every 5 seconds - reset when slide changes
  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfSlides, currentSlide]);

  if (images.length === 0) {
    return null;
  }

  const handleSlideChange = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    resetTimer();
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? numOfSlides - 1 : prev - 1));
    resetTimer();
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % numOfSlides);
    resetTimer();
  };

  // Get project folder name from projectName
  const getProjectFolder = () => {
    if (projectName === 'Texture') {
      return 'texture_transparent';
    }
    return projectName;
  };

  const projectFolder = getProjectFolder();
  const imagePaths = images.map(img => 
    getAssetPath(`${imageBasePath}/${projectFolder}/${img}`)
  );

  // Debug: Log paths for first image
  useEffect(() => {
    if (imagePaths.length > 0) {
      console.log('TweenMaxSlideshow Debug:', {
        projectName,
        projectFolder,
        imageBasePath,
        firstImage: images[0],
        firstImagePath: imagePaths[0],
        totalImages: images.length
      });
    }
  }, [projectName, projectFolder, imageBasePath, images, imagePaths]);

  return (
    <div className="tweenmax-slideshow-wrapper" ref={containerRef}>
      <div className="tweenmax-slider-container">
        {images.map((image, index) => (
          <div
            key={`${projectName}-${index}`}
            ref={(el) => {
              if (el) slidesRef.current[index] = el;
            }}
            className={`tweenmax-slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              display: index === currentSlide ? 'flex' : 'none',
              opacity: index === currentSlide ? 1 : 0,
            }}
          >
            <div className="tweenmax-slide-content">
              <img
                ref={(el) => {
                  if (el) imagesRef.current[index] = el;
                }}
                src={imagePaths[index]}
                alt={`${projectName} - ${index + 1}`}
                className="tweenmax-slide-image"
                loading={index === currentSlide ? 'eager' : 'lazy'}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
                onLoad={() => {
                  // Debug: Log successful image load
                  if (index === currentSlide) {
                    console.log('TweenMaxSlideshow: Image loaded', { index, imagePath: imagePaths[index] });
                  }
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.error('Image load error:', {
                    imagePath: imagePaths[index],
                    projectName,
                    projectFolder,
                    image,
                    fullPath: `${imageBasePath}/${projectFolder}/${image}`
                  });
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23222" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="20" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
          </div>
        ))}

        {/* Prev/Next Controls */}
        {numOfSlides > 1 && (
          <div className="tweenmax-controls">
            <button
              className="tweenmax-prev-btn"
              onClick={handlePrev}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                opacity: 0.8,
                border: `2px solid ${accentColor}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={28} color={accentColor} />
            </button>
            <button
              className="tweenmax-next-btn"
              onClick={handleNext}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                opacity: 0.8,
                border: `2px solid ${accentColor}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Next"
            >
              <ChevronRight size={28} color={accentColor} />
            </button>
          </div>
        )}
      </div>

      {/* Dot Controls */}
      {numOfSlides > 1 && (
        <div className="tweenmax-dots">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`tweenmax-dot ${currentSlide === index ? 'active' : ''}`}
              style={{
                cursor: 'pointer',
                borderRadius: '50%',
                display: 'inline-block',
                width: '12px',
                height: '12px',
                background: currentSlide === index ? accentColor : 'rgba(255, 255, 255, 0.5)',
                margin: '0 6px',
                transition: 'all 0.3s ease',
                border: 'none',
                padding: 0,
                transform: currentSlide === index ? 'scale(1.2)' : 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (currentSlide !== index) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentSlide !== index) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

