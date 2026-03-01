import { ArrowRight, Star, Shield, Award, Zap, Paintbrush } from 'lucide-react';
import QuickEstimateForm from './QuickEstimateForm';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';

export default function HeroSection() {
  const { openWhatsApp } = useWhatsAppContact();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.png"
          alt="Hero background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-primary" />
              Premium Interior Solutions Since 1995
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
              Transform Your
              <span className="block text-primary">Dream Space</span>
              Into Reality
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base lg:text-lg text-foreground/70 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              Premium plywood, modular kitchens, wardrobes, hardware, laminates — plus expert
              electrical & paint services. Complete interior solutions under one roof.
            </p>

            {/* Service Badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mb-6 sm:mb-8">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 border border-border rounded-full text-xs sm:text-sm text-foreground/80">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                Plywood & Hardware
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 border border-border rounded-full text-xs sm:text-sm text-foreground/80">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                Modular Interiors
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs sm:text-sm text-amber-400">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                Electrical Services
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs sm:text-sm text-blue-400">
                <Paintbrush className="w-3 h-3 sm:w-4 sm:h-4" />
                Paint Services
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('pricing')}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base min-h-[44px] w-full sm:w-auto"
              >
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => openWhatsApp('Hello! I would like a free consultation for my interior project.')}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm sm:text-base min-h-[44px] w-full sm:w-auto"
              >
                Free Consultation
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 sm:mt-8 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary">500+</div>
                <div className="text-xs text-foreground/60">Projects Done</div>
              </div>
              <div className="w-px h-8 bg-border hidden sm:block" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary">25+</div>
                <div className="text-xs text-foreground/60">Years Experience</div>
              </div>
              <div className="w-px h-8 bg-border hidden sm:block" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary">100%</div>
                <div className="text-xs text-foreground/60">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Quick Estimate Form */}
          <div className="w-full">
            <QuickEstimateForm />
          </div>
        </div>
      </div>
    </section>
  );
}
