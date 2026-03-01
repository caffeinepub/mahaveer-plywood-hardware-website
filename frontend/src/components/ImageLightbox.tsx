import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  title: string;
  description: string;
}

interface ImageLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(Math.max(0, currentIndex - 1));
      if (e.key === 'ArrowRight') onNavigate(Math.min(images.length - 1, currentIndex + 1));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, images.length, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Content */}
      <div
        className="relative max-w-5xl w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden bg-black">
          <img
            src={current.src}
            alt={current.title}
            className="w-full max-h-[70vh] object-contain"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <h3 className="text-white font-serif font-bold text-xl">{current.title}</h3>
          <p className="text-white/70 text-sm mt-1">{current.description}</p>
          <p className="text-white/40 text-xs mt-2">{currentIndex + 1} / {images.length}</p>
        </div>

        {/* Navigation */}
        {currentIndex > 0 && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {currentIndex < images.length - 1 && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}
