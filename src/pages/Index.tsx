import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/languageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, Utensils, Package, ArrowRight, Sprout, Globe, Leaf, FlaskConical } from 'lucide-react';
import ProductShowcase from '@/components/ProductShowcase';
import terawetLogo from '@/assets/terawet-logo.png';

const categories = [
  { key: 'care', icon: Droplets, color: 'text-blue-500' },
  { key: 'gel', icon: FlaskConical, color: 'text-orange-500' },
  { key: 'food', icon: Utensils, color: 'text-green-500' },
  { key: 'bulk25', icon: Package, color: 'text-amber-600' },
  { key: 'bulk1', icon: Package, color: 'text-amber-500' },
];

const Index = () => {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10 py-20 md:py-32">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <img src={terawetLogo} alt="Terawet logo" className="h-12 w-auto" />
              <span className="text-sm font-medium uppercase tracking-widest text-primary">Terawet</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/catalog">
                  {t('hero.cta')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a href="https://www.youtube.com/channel/UCcZDTmKXF6Jl8sfHLbLUFBw" target="_blank" rel="noopener noreferrer">
                  {t('hero.video')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Slides */}
      <ProductShowcase />

      {/* Categories */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('cat.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map(({ key, icon: Icon, color }) => (
            <Link to="/catalog" key={key}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group border-border">
                <CardContent className="p-6 text-center">
                  <Icon className={`h-12 w-12 mx-auto mb-4 ${color} group-hover:scale-110 transition-transform`} />
                  <h3 className="font-semibold text-lg mb-2">{t(`cat.${key}`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`cat.${key}.desc`)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* About preview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">{t('about.title')}</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">{t('about.text')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sprout, key: 'years' },
              { icon: Globe, key: 'countries' },
              { icon: Leaf, key: 'eco' },
            ].map(({ icon: Icon, key }) => (
              <div key={key} className="text-center">
                <Icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-1">{t(`about.${key}`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`about.${key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
