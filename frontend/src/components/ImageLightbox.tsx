import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxImage {
  src: string;
  title: string;
  description: string;
}

interface ImageLightboxProps {
  image: LightboxImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageLightbox({ image, onClose, onPrev, onNext }: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-11 h-11 flex items-center justify-center bg-secondary/80 hover:bg-secondary rounded-full transition-colors z-10"
        aria-label="Close"
      >
        <X className="w-5 h-5 text-foreground" />
      </button>

      {/* Prev Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-secondary/80 hover:bg-secondary rounded-full transition-colors z-10"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-secondary/80 hover:bg-secondary rounded-full transition-colors z-10"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
      </button>

      {/* Image Container */}
      <div
        className="relative max-w-[95vw] max-h-[90vh] w-full mx-4 sm:mx-12"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.title}
          className="w-full max-h-[75vh] object-contain rounded-xl"
        />
        <div className="mt-3 text-center px-2">
          <h3 className="text-base sm:text-lg font-bold text-foreground">{image.title}</h3>
          <p className="text-xs sm:text-sm text-foreground/60 mt-1">{image.description}</p>
        </div>
      </div>
    </div>
  );
}
