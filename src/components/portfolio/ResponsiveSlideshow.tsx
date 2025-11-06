import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAssetPath } from '../../utils/assetPath';
import './ResponsiveSlideshow.css';

interface ResponsiveSlideshowProps {
  images: string[];
  projectName: string;
  accentColor?: string;
  imageBasePath?: string;
}

export default function ResponsiveSlideshow({ 
  images, 
  projectName,
  accentColor = '#FFD700',
  imageBasePath = 'assets/resumes/AtaCem/project_images'
}: ResponsiveSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [containerHeight, setContainerHeight] = useState<number>(400);
  const [containerWidth, setContainerWidth] = useState<number | 'auto'>('auto');
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
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
    resetTimer(); // Reset timer when manually changing slide
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? numOfSlides - 1 : prev - 1));
    resetTimer(); // Reset timer when using prev button
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % numOfSlides);
    resetTimer(); // Reset timer when using next button
  };

  // Get project folder name from projectName
  const getProjectFolder = () => {
    if (projectName === 'Kişisel çizimler') {
      return 'kisisel_cizimler';
    }
    // Lunscale için klasör adı Lundscale
    if (projectName === 'Lunscale') {
      return 'Lundscale';
    }
    return projectName;
  };

  const projectFolder = getProjectFolder();
  const currentImage = images[currentSlide];
  // Build path - encode folder and image names but keep slashes
  const imagePath = getAssetPath(`${imageBasePath}/${projectFolder}/${currentImage}`);

  // Check if this is Durih project and slide 3, 4, or 5 (index 2, 3, 4)
  const isDurihVertical = projectName === 'Durih' && (currentSlide === 2 || currentSlide === 3 || currentSlide === 4);
  // Check if this is DDs CMR project
  const isDDsCMR = projectName === 'DDs CMR';
  
  // Calculate max-width based on project and slide
  const getMaxWidth = () => {
    if (isDurihVertical) {
      // Yarıya düşür
      // Desktop: 500px -> 250px
      // Tablet: 400px -> 200px  
      // Mobile: 300px -> 150px
      if (window.innerWidth <= 450) {
        return '150px'; // Mobile
      } else if (window.innerWidth <= 850) {
        return '200px'; // Tablet
      }
      return '250px'; // Desktop
    }
    if (isDDsCMR) {
      // 0.75 scale (%75)
      // Desktop: 500px -> 375px
      // Tablet: 400px -> 300px
      // Mobile: 300px -> 225px
      if (window.innerWidth <= 450) {
        return '225px'; // Mobile
      } else if (window.innerWidth <= 850) {
        return '300px'; // Tablet
      }
      return '375px'; // Desktop
    }
    // Normal size
    if (window.innerWidth <= 450) {
      return '300px'; // Mobile
    } else if (window.innerWidth <= 850) {
      return '400px'; // Tablet
    }
    return '500px'; // Desktop
  };

  // Handle image load to adjust container size dynamically to fit image exactly
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const wrapper = wrapperRef.current;
    if (!wrapper || !img) return;

    // Wait a bit for the image to render
    setTimeout(() => {
      // Get actual rendered image dimensions
      const renderedWidth = img.offsetWidth;
      const renderedHeight = img.offsetHeight;
      
      if (renderedWidth === 0 || renderedHeight === 0) return;
      
      // Container should be exactly the image size (no padding needed)
      // Update container size smoothly without resetting
      setContainerWidth(renderedWidth);
      setContainerHeight(renderedHeight);
    }, 50);
  };

  return (
    <div className="slideshow-wrapper">
      <motion.div 
        ref={wrapperRef}
        className="slider-wrapper"
        initial={{ height: 400, width: 'auto', x: '-50%' }}
        animate={{ 
          height: containerHeight,
          width: typeof containerWidth === 'number' ? containerWidth : 'auto',
          x: '-50%'
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ display: 'inline-block', left: '50%', position: 'relative' }}
      >
        <div className="slider-inner">
          <article>
            <img
              ref={imgRef}
              key={`${projectName}-${currentSlide}-${currentImage}`}
              src={imagePath} 
              alt={`${projectName} - ${currentSlide + 1}`} 
              loading="eager"
              style={{
                opacity: 0,
                transition: 'opacity 0.4s ease-in-out',
                maxWidth: getMaxWidth()
              }}
              onLoad={(e) => {
                const img = e.currentTarget;
                requestAnimationFrame(() => {
                  img.style.opacity = '1';
                });
                handleImageLoad(e);
              }}
              onError={(e) => {
                console.error('Image load error:', {
                  imagePath,
                  projectName,
                  projectFolder,
                  currentImage,
                  fullPath: `${imageBasePath}/${projectFolder}/${currentImage}`
                });
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23222" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="20" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
              }}
            />
          </article>
        </div>

        {/* Prev/Next Controls - Inside container */}
        {numOfSlides > 1 && (
          <div className="slider-prev-next-control">
          <button
            className="slider-prev-btn"
            onClick={handlePrev}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#fff',
              opacity: 0.7,
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={24} color="#777" />
          </button>
          <button
            className="slider-next-btn"
            onClick={handleNext}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#fff',
              opacity: 0.7,
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
            aria-label="Next"
          >
            <ChevronRight size={24} color="#777" />
          </button>
          </div>
        )}
      </motion.div>

      {/* Dot Controls */}
      {numOfSlides > 1 && (
        <div className="slider-dot-control">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={currentSlide === index ? 'active' : ''}
              style={{
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                width: '10px',
                height: '10px',
                background: currentSlide === index ? accentColor : '#bbb',
                margin: '0 5px',
                transition: 'all 0.3s',
                border: 'none',
                padding: 0,
              }}
              onMouseEnter={(e) => {
                if (currentSlide !== index) {
                  e.currentTarget.style.background = '#ccc';
                }
              }}
              onMouseLeave={(e) => {
                if (currentSlide !== index) {
                  e.currentTarget.style.background = '#bbb';
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

