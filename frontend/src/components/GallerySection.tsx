import { useState } from 'react';
import { Camera } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

const galleryItems = [
  {
    src: '/assets/generated/gallery-interior-1.dim_800x600.png',
    title: 'Modern Living Room',
    description: 'Complete interior transformation with premium materials',
  },
  {
    src: '/assets/generated/gallery-kitchen-1.dim_800x600.png',
    title: 'Modular Kitchen',
    description: 'Custom modular kitchen with premium fittings',
  },
  {
    src: '/assets/generated/gallery-wardrobe-1.dim_800x600.png',
    title: 'Designer Wardrobe',
    description: 'Space-optimized wardrobe with luxury finishes',
  },
  {
    src: '/assets/generated/project-electrical.dim_800x600.png',
    title: 'Electrical Installation',
    description: 'Professional electrical work with designer lighting',
  },
  {
    src: '/assets/generated/project-paint-finish.dim_800x600.png',
    title: 'Premium Paint Finish',
    description: 'Expert painting with texture and color consultation',
  },
  {
    src: '/assets/generated/project-full-interior.dim_800x600.png',
    title: 'Full Interior Project',
    description: 'Complete home interior with all services',
  },
];

export default function GallerySection() {
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    title: string;
    description: string;
  } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxImage(galleryItems[index]);
  };

  const closeLightbox = () => setLightboxImage(null);

  const goToPrev = () => {
    const newIndex = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    setLightboxIndex(newIndex);
    setLightboxImage(galleryItems[newIndex]);
  };

  const goToNext = () => {
    const newIndex = (lightboxIndex + 1) % galleryItems.length;
    setLightboxIndex(newIndex);
    setLightboxImage(galleryItems[newIndex]);
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
            Our Work
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Project Gallery
          </h2>
          <p className="text-sm sm:text-base text-foreground/60 max-w-2xl mx-auto">
            Browse through our completed projects and get inspired for your own space.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryItems.map((item, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden rounded-2xl aspect-video bg-secondary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-sm sm:text-base font-bold text-foreground">{item.title}</h3>
                <p className="text-xs sm:text-sm text-foreground/70">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <ImageLightbox
          image={lightboxImage}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </section>
  );
}
