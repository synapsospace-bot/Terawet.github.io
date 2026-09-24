import { useLanguage } from '@/lib/languageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send } from 'lucide-react';
import productData from '@/lib/products';
import terafoodImg from '@/assets/terafood.png';

const PHONE = '380502365858';

const Catalog = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('catalog.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {productData.map((product) => (
          <Card key={product.id} className="overflow-hidden border-border">
            <div className="aspect-video overflow-hidden">
              {product.video ? (
                <video
                  src={product.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={product.id === 'food' ? terafoodImg : product.image}
                  alt={product.getName(lang)}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold">{product.getName(lang)}</h2>
                {product.price && (
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                    {product.price}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-4">{product.getDescription(lang)}</p>
              <div className="space-y-2 text-sm mb-6">
                <p><span className="font-medium">{t('catalog.application')}:</span> {product.getApplication(lang)}</p>
                <p><span className="font-medium">{t('catalog.dosage')}:</span> {product.getDosage(lang)}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                  <a
                    href={`https://wa.me/${PHONE}?text=${encodeURIComponent(product.getName(lang))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t('catalog.order')}
                  </a>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <a
                    href="https://t.me/Terawet_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Send className="h-4 w-4" />
                    {t('catalog.telegram')}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
