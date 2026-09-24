import { useLanguage } from '@/lib/languageContext';
import { Sprout, Globe, Leaf, Award, Users, ShieldCheck, FileCheck, FlaskConical } from 'lucide-react';

const About = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('aboutPage.title')}</h1>

      <div className="max-w-3xl mx-auto space-y-12">
        {/* History */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-bold">{t('aboutPage.history')}</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">{t('aboutPage.historyText')}</p>
        </section>

        {/* Mission */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-bold">{t('aboutPage.mission')}</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">{t('aboutPage.missionText')}</p>
        </section>

        {/* Patents & Scientific Verification (TC017) */}
        <section className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-bold">Патенти та лабораторні випробування</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ефективність та екологічна безпека полімерів TERAWET підтверджена 25 роками міжнародної практики, офіційними патентами та сертифікованими лабораторними дослідженнями:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <div className="flex items-center gap-2 font-semibold text-foreground mb-1">
                <FileCheck className="h-5 w-5 text-primary" />
                Міжнародні патенти
              </div>
              <p className="text-xs text-muted-foreground">
                Запатентована формула полімерної решітки з калійним зв'язуванням, що розкладається на 100% природним шляхом без токсичних залишків.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <div className="flex items-center gap-2 font-semibold text-foreground mb-1">
                <FlaskConical className="h-5 w-5 text-primary" />
                Лабораторні випробування
              </div>
              <p className="text-xs text-muted-foreground">
                Акредитовані лабораторні аналізи підтверджують коефіцієнт водопоглинання до 400x та безпечність для ґрунтової мікрофлори.
              </p>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border">
          {[
            { icon: Sprout, key: 'years' },
            { icon: Globe, key: 'countries' },
            { icon: Leaf, key: 'eco' },
          ].map(({ icon: Icon, key }) => (
            <div key={key} className="text-center p-6 rounded-lg bg-muted/50">
              <Icon className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-1">{t(`about.${key}`)}</h3>
              <p className="text-sm text-muted-foreground">{t(`about.${key}Desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
