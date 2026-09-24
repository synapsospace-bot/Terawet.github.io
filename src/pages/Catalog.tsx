import { useState } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, Filter, Check } from 'lucide-react';
import productData from '@/lib/products';
import terafoodImg from '@/assets/terafood.png';

const PHONE = '380502365858';

const categories = [
  { id: 'all', labelUk: 'Всі товари', labelEn: 'All Products', labelBg: 'Всички продукти' },
  { id: 'bulk', labelUk: 'Опт (25 кг / 1 кг)', labelEn: 'Bulk (25kg / 1kg)', labelBg: 'На едро' },
  { id: 'Care', labelUk: 'Terawet Care', labelEn: 'Terawet Care', labelBg: 'Terawet Care' },
  { id: 'Protect', labelUk: 'Terawet Gel', labelEn: 'Terawet Gel', labelBg: 'Terawet Gel' },
  { id: 'Food', labelUk: 'Terafood', labelEn: 'Terafood', labelBg: 'Terafood' },
];

const Catalog = () => {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = productData.filter((product) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'bulk') {
      return product.id === 'bulk25' || product.id === 'bulk1' || product.category.toLowerCase().includes('bulk');
    }
    return product.category.toLowerCase() === selectedCategory.toLowerCase() || product.id.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">{t('catalog.title')}</h1>
      
      {/* Category selector / filters */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 mb-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          <Filter className="h-3.5 w-3.5" />
          <span>Категорії продукції</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const label = lang === 'en' ? cat.labelEn : lang === 'bg' ? cat.labelBg : cat.labelUk;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-muted/20 rounded-2xl border border-dashed border-border max-w-xl mx-auto">
          <p className="text-muted-foreground mb-4">У цій категорії поки немає товарів.</p>
          <Button variant="outline" size="sm" onClick={() => setSelectedCategory('all')}>
            Показати всі товари
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border-border flex flex-col justify-between">
              <div>
                <div className="aspect-video overflow-hidden bg-muted">
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
                </CardContent>
              </div>

              <div className="p-6 pt-0 flex flex-wrap gap-3">
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
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
