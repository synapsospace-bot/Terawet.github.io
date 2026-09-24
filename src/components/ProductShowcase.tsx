import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/languageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Droplets, TrendingUp, Timer, Leaf } from 'lucide-react';
import slideWater from '@/assets/slide-water-savings.jpg';
import slidePolymer from '@/assets/slide-polymer.jpg';
import slideVineyard from '@/assets/slide-vineyard.jpg';

const slides = [
  {
    image: slidePolymer,
    titleKey: 'slide.polymer.title',
    subtitleKey: 'slide.polymer.subtitle',
    stats: [
      { icon: Droplets, valueKey: 'slide.polymer.stat1', labelKey: 'slide.polymer.stat1Label' },
      { icon: Timer, valueKey: 'slide.polymer.stat2', labelKey: 'slide.polymer.stat2Label' },
    ],
  },
  {
    image: slideWater,
    titleKey: 'slide.water.title',
    subtitleKey: 'slide.water.subtitle',
    stats: [
      { icon: TrendingUp, valueKey: 'slide.water.stat1', labelKey: 'slide.water.stat1Label' },
      { icon: Droplets, valueKey: 'slide.water.stat2', labelKey: 'slide.water.stat2Label' },
    ],
  },
  {
    image: slideVineyard,
    titleKey: 'slide.vineyard.title',
    subtitleKey: 'slide.vineyard.subtitle',
    stats: [
      { icon: Leaf, valueKey: 'slide.vineyard.stat1', labelKey: 'slide.vineyard.stat1Label' },
      { icon: TrendingUp, valueKey: 'slide.vineyard.stat2', labelKey: 'slide.vineyard.stat2Label' },
    ],
  },
];

const ProductShowcase = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{t('slides.title')}</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">{t('slides.subtitle')}</p>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          {/* Background image */}
          <div className="relative h-[400px] md:h-[520px]">
            {slides.map((s, i) => (
              <img
                key={i}
                src={s.image}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === current ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16 max-w-2xl">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {t(slide.titleKey)}
              </h3>
              <p className="text-white/85 text-base md:text-lg mb-8 leading-relaxed">
                {t(slide.subtitleKey)}
              </p>

              {/* Stats */}
              <div className="flex gap-6 md:gap-10 mb-8">
                {slide.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-bold text-white">{t(stat.valueKey)}</div>
                      <div className="text-xs md:text-sm text-white/70">{t(stat.labelKey)}</div>
                    </div>
                  </div>
                ))}
              </div>


            </div>

            {/* Navigation */}
            <div className="absolute bottom-6 right-6 flex items-center gap-3 z-10">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'w-8 bg-white' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
