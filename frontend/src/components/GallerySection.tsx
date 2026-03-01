import React, { useState } from 'react';
import { Grid3X3 } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

const GALLERY_IMAGES = [
  {
    src: '/assets/generated/gallery-kitchen.dim_800x600.png',
    title: 'Modern Modular Kitchen',
    description: 'Complete modular kitchen with acrylic finish and premium hardware',
  },
  {
    src: '/assets/generated/gallery-wardrobe.dim_800x600.png',
    title: 'Sliding Wardrobe Design',
    description: 'Space-saving sliding wardrobe with mirror panels and internal organizers',
  },
  {
    src: '/assets/generated/gallery-living.dim_800x600.png',
    title: 'Living Room Interior',
    description: 'Contemporary living room with custom TV unit and ambient lighting',
  },
  {
    src: '/assets/generated/gallery-bedroom.dim_800x600.png',
    title: 'Master Bedroom Suite',
    description: 'Luxurious master bedroom with custom wardrobe and headboard design',
  },
  {
    src: '/assets/generated/gallery-office.dim_800x600.png',
    title: 'Home Office Setup',
    description: 'Ergonomic home office with custom storage and cable management',
  },
  {
    src: '/assets/generated/gallery-bathroom.dim_800x600.png',
    title: 'Bathroom Renovation',
    description: 'Modern bathroom with premium tiles, fixtures, and vanity unit',
  },
  {
    src: '/assets/generated/project-electrical.dim_800x600.png',
    title: 'Electrical & Lighting',
    description: 'Complete electrical solutions with LED cove lighting and smart controls',
  },
  {
    src: '/assets/generated/project-paint-finish.dim_800x600.png',
    title: 'Premium Paint Finish',
    description: 'Decorative texture paint with custom color consultation',
  },
  {
    src: '/assets/generated/project-full-interior.dim_800x600.png',
    title: 'Full Home Interior',
    description: 'Complete home transformation from concept to completion',
  },
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-white">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 border border-gold-300 mb-4">
            <Grid3X3 className="h-4 w-4 text-gold-600" />
            <span className="text-gold-700 text-sm font-semibold tracking-wide uppercase">Our Portfolio</span>
          </div>
          <h2 className="section-title">Project Gallery</h2>
          <p className="section-subtitle">
            A showcase of our finest work — from kitchens to complete home transformations
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3] bg-gold-50"
              onClick={() => setLightboxIndex(index)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.style.background = 'linear-gradient(135deg, oklch(0.95 0.04 82), oklch(0.90 0.07 80))';
                  }
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-serif font-bold text-sm">{image.title}</h3>
                <p className="text-white/80 text-xs mt-1">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <ImageLightbox
            images={GALLERY_IMAGES}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </div>
    </section>
  );
}
