import { useLanguage } from '@/lib/languageContext';
import { Sprout, Globe, Leaf, Award, Users } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('aboutPage.title')}</h1>

      <div className="max-w-3xl mx-auto space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-bold">{t('aboutPage.history')}</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">{t('aboutPage.historyText')}</p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-bold">{t('aboutPage.mission')}</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">{t('aboutPage.missionText')}</p>
        </section>

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
