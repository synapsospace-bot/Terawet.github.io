import { useLanguage } from '@/lib/languageContext';
import { CheckCircle } from 'lucide-react';
import mechanismImg from '@/assets/mechanism.png';
import ecosystemImg from '@/assets/ecosystem.png';
import biocomplexesImg from '@/assets/biocomplexes.png';
import reservoirImg from '@/assets/reservoir.png';
import impactImg from '@/assets/ecosystem-impact.png';
import forestryImg from '@/assets/forestry.jpg';

const Application = () => {
  const { t } = useLanguage();

  const infographics = [
    { image: mechanismImg, titleKey: 'app.mechanism.title', descKey: 'app.mechanism.desc' },
    { image: reservoirImg, titleKey: 'app.reservoir.title', descKey: 'app.reservoir.desc' },
    { image: ecosystemImg, titleKey: 'app.ecosystem.title', descKey: 'app.ecosystem.desc' },
    { image: impactImg, titleKey: 'app.impact.title', descKey: 'app.impact.desc' },
    { image: biocomplexesImg, titleKey: 'app.bio.title', descKey: 'app.bio.desc' },
    { image: forestryImg, titleKey: 'app.forestry.title', descKey: 'app.forestry.desc' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('app.title')}</h1>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* How It Works infographics */}
        <section>
          <h2 className="text-2xl font-bold mb-8">{t('app.howItWorks')}</h2>
          <div className="space-y-10">
            {infographics.map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                  className="w-full h-auto"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to use */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t('app.howTo')}</h2>
          <div className="space-y-4">
            {['step1', 'step2', 'step3'].map((step, i) => (
              <div key={step} className="flex gap-4 items-start p-4 rounded-lg bg-muted/50">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <p className="text-muted-foreground">{t(`app.${step}`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t('app.results')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['result1', 'result2', 'result3', 'result4'].map((r) => (
              <div key={r} className="flex items-start gap-3 p-4 rounded-lg border border-border">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">{t(`app.${r}`)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Application;
