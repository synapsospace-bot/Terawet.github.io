import { useState } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { Link } from 'react-router-dom';
import { CheckCircle, Calculator, Trees, Sprout, Wheat, Droplets, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import mechanismImg from '@/assets/mechanism.png';
import ecosystemImg from '@/assets/ecosystem.png';
import biocomplexesImg from '@/assets/biocomplexes.png';
import reservoirImg from '@/assets/reservoir.png';
import impactImg from '@/assets/ecosystem-impact.png';
import forestryImg from '@/assets/forestry.jpg';

const scenarios = [
  {
    id: 'forestry',
    title: 'Лісове господарство',
    titleEn: 'Forestry',
    icon: Trees,
    dosageText: '10–20 г на саджанець при посадці у прикореневу зону.',
    benefit: 'Приживлюваність сіянців зростає до 98% навіть у посушливі періоди.',
  },
  {
    id: 'orchards',
    title: 'Сади та виноградники',
    titleEn: 'Orchards & Vineyards',
    icon: Sprout,
    dosageText: '25–40 г під дерево або 15–25 г під виноградний кущ.',
    benefit: 'Забезпечує рівномірне дозрівання плодів та захист від стресу посухи.',
  },
  {
    id: 'agriculture',
    title: 'Польові культури / Агро',
    titleEn: 'Agriculture & Open Fields',
    icon: Wheat,
    dosageText: '25–50 кг на 1 гектар при суцільному або рядковому внесенні.',
    benefit: 'Скорочення потреби у поливі до 50% та збереження внесених добрив у ґрунті.',
  },
  {
    id: 'landscape',
    title: 'Газони та ландшафт',
    titleEn: 'Landscaping & Lawns',
    icon: Droplets,
    dosageText: '40–60 г на 1 м² при підготовці ґрунту під посів чи рулонний газон.',
    benefit: 'Ідеально зелений та густий газон без вигорання на пекучому сонці.',
  },
];

const Application = () => {
  const { lang, t } = useLanguage();
  const [selectedScenario, setSelectedScenario] = useState('forestry');
  const [calcScenario, setCalcScenario] = useState('field');
  const [areaAmount, setAreaAmount] = useState<number | ''>(1);
  const [calcResult, setCalcResult] = useState<{ totalKg: number; bags25: number; bags1: number; note: string } | null>({
    totalKg: 35,
    bags25: 1,
    bags1: 10,
    note: 'Розраховано для площі 1 га (норма ~35 кг/га)',
  });

  const infographics = [
    { image: mechanismImg, titleKey: 'app.mechanism.title', descKey: 'app.mechanism.desc' },
    { image: reservoirImg, titleKey: 'app.reservoir.title', descKey: 'app.reservoir.desc' },
    { image: ecosystemImg, titleKey: 'app.ecosystem.title', descKey: 'app.ecosystem.desc' },
    { image: impactImg, titleKey: 'app.impact.title', descKey: 'app.impact.desc' },
    { image: biocomplexesImg, titleKey: 'app.bio.title', descKey: 'app.bio.desc' },
    { image: forestryImg, titleKey: 'app.forestry.title', descKey: 'app.forestry.desc' },
  ];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(areaAmount) || 0;
    if (amount <= 0) {
      setCalcResult(null);
      return;
    }

    let rate = 35; // kg per unit
    let note = '';

    if (calcScenario === 'field') {
      rate = 35;
      const totalKg = Math.round(amount * rate);
      const bags25 = Math.floor(totalKg / 25);
      const bags1 = totalKg % 25;
      note = `Для ${amount} га відкритого ґрунту при нормі 35 кг/га`;
      setCalcResult({ totalKg, bags25, bags1, note });
    } else if (calcScenario === 'trees') {
      rate = 0.03; // 30g per tree
      const totalKg = Math.max(1, Math.round(amount * rate));
      const bags25 = Math.floor(totalKg / 25);
      const bags1 = totalKg % 25;
      note = `Для ${amount} саджанців / дерев при нормі 30 г на корінь`;
      setCalcResult({ totalKg, bags25, bags1, note });
    } else if (calcScenario === 'vineyard') {
      rate = 0.02; // 20g per vine
      const totalKg = Math.max(1, Math.round(amount * rate));
      const bags25 = Math.floor(totalKg / 25);
      const bags1 = totalKg % 25;
      note = `Для ${amount} кущів винограду при нормі 20 г на кущ`;
      setCalcResult({ totalKg, bags25, bags1, note });
    } else if (calcScenario === 'lawn') {
      rate = 0.05; // 50g per m2
      const totalKg = Math.max(1, Math.round(amount * rate));
      const bags25 = Math.floor(totalKg / 25);
      const bags1 = totalKg % 25;
      note = `Для ${amount} м² газону при нормі 50 г/м²`;
      setCalcResult({ totalKg, bags25, bags1, note });
    }
  };

  const activeScenarioData = scenarios.find((s) => s.id === selectedScenario) || scenarios[0];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('app.title')}</h1>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Interactive Scenario Selector */}
        <section className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Сценарії застосування та норми внесення
          </h2>
          <p className="text-muted-foreground mb-6">
            Оберіть ваш напрямок для перегляду технології внесення та рекомендацій:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {scenarios.map((sc) => {
              const Icon = sc.icon;
              const isSelected = selectedScenario === sc.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setSelectedScenario(sc.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary font-semibold shadow-sm'
                      : 'border-border bg-background hover:bg-muted/50 text-muted-foreground'
                  }`}
                >
                  <Icon className="h-6 w-6 mb-2" />
                  <span className="text-xs md:text-sm">{lang === 'en' ? sc.titleEn : sc.title}</span>
                </button>
              );
            })}
          </div>

          <div className="p-5 rounded-xl bg-muted/40 border border-border">
            <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              {lang === 'en' ? activeScenarioData.titleEn : activeScenarioData.title}
            </h3>
            <p className="text-sm text-foreground mb-2">
              <span className="font-medium">Рекомендована норма:</span> {activeScenarioData.dosageText}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Ефект:</span> {activeScenarioData.benefit}
            </p>
          </div>
        </section>

        {/* Interactive Dosage Calculator */}
        <section id="calculator" className="bg-gradient-to-br from-primary/5 via-card to-primary/10 p-6 md:p-8 rounded-2xl border border-primary/20 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Калькулятор дозування Terawet</h2>
              <p className="text-sm text-muted-foreground">Розрахуйте точну потребу гідрогелю під ваші площі та культури</p>
            </div>
          </div>

          <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Напрямок / Культура
              </label>
              <select
                value={calcScenario}
                onChange={(e) => setCalcScenario(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="field">Польові культури (гектари)</option>
                <option value="trees">Сад / Дерева (кількість)</option>
                <option value="vineyard">Виноградники (кущі)</option>
                <option value="lawn">Газони та ландшафт (м²)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                {calcScenario === 'field'
                  ? 'Площа (у гектарах, га)'
                  : calcScenario === 'lawn'
                  ? 'Площа (у м²)'
                  : 'Кількість рослин / дерев'}
              </label>
              <input
                type="number"
                min="1"
                step="any"
                value={areaAmount}
                onChange={(e) => setAreaAmount(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="Введіть число"
                required
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-end">
              <Button type="submit" className="w-full h-10 font-semibold gap-2">
                <Calculator className="h-4 w-4" />
                Розрахувати дозування
              </Button>
            </div>
          </form>

          {calcResult && (
            <div className="p-6 rounded-xl bg-card border border-primary/30 shadow-sm animate-in fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-primary mb-1">Результат розрахунку</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-foreground">
                    {calcResult.totalKg} кг <span className="text-base font-normal text-muted-foreground">гідрогелю Terawet</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{calcResult.note}</p>
                </div>

                <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>📦 Мішків 25 кг: <span className="font-bold text-foreground">{calcResult.bags25}</span></p>
                    <p>🛍️ Пакетів 1 кг: <span className="font-bold text-foreground">{calcResult.bags1}</span></p>
                    <p className="text-green-600 dark:text-green-400 font-medium">💧 Економія поливу: до 50%</p>
                  </div>
                  <Button asChild size="sm" className="gap-2 shrink-0">
                    <Link to="/catalog">
                      Замовити
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>

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
