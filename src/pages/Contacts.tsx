import { useState } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, User, MessageCircle, Send, Mail, AlertTriangle, CheckCircle, SendHorizonal } from 'lucide-react';
import terawetContactsImg from '@/assets/terawet-contacts.png';

const PHONE = '380502365858';

const Contacts = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    volume: '',
    message: '',
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setFormError("Будь ласка, заповніть обов'язкові поля: Ім'я та Номер телефону");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    // Simulate reliable submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('contacts.title')}</h1>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Banner image */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-border">
          <img src={terawetContactsImg} alt="Terawet — Зробіть свій ґрунт розумним" className="w-full h-auto" />
        </div>

        <p className="text-sm text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto">
          {t('contacts.partnerText')}
        </p>

        {/* Bulgaria warehouse notice */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {t('contacts.bulgariaNotice')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact info column */}
          <div className="space-y-6 bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
            <h2 className="text-xl font-bold mb-4">Прямі контакти</h2>
            <div className="flex items-start gap-4">
              <User className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium text-sm">{t('contacts.manager')}</p>
                <p className="text-muted-foreground text-sm">{t('contacts.managerName')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium text-sm">{t('contacts.phone')}</p>
                <a href="tel:+380502365858" className="text-muted-foreground hover:text-primary block text-sm">+38 (050) 236-58-58</a>
                <a href="tel:+380636885262" className="text-muted-foreground hover:text-primary block text-sm">+38 (063) 688-52-62</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium text-sm">Email</p>
                <a href="mailto:Terawet.original@gmail.com" className="text-muted-foreground hover:text-primary text-sm">terawet.original@gmail.com</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium text-sm">{t('contacts.address')}</p>
                <p className="text-muted-foreground text-sm">{t('contacts.companyName')}</p>
                <p className="text-muted-foreground text-sm">{t('contacts.cityAddress')}</p>
                <p className="text-muted-foreground text-sm">{t('contacts.streetAddress')}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Button asChild className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  {t('contacts.whatsapp')}
                </a>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <a href="https://t.me/Terawet_bot" target="_blank" rel="noopener noreferrer">
                  <Send className="h-4 w-4" />
                  {t('contacts.telegram')}
                </a>
              </Button>
            </div>
          </div>

          {/* Wholesale inquiry form column */}
          <div className="bg-card p-6 md:p-8 rounded-2xl border border-primary/20 shadow-sm relative">
            <h2 className="text-xl font-bold mb-2">Оптова заявка та консультація</h2>
            <p className="text-xs text-muted-foreground mb-6">
              Залиште заявку на оптову партію від 25 кг або отримайте індивідуальну комерційну пропозицію:
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-center space-y-3">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto" />
                <h3 className="font-bold text-lg text-green-800 dark:text-green-200">Заявка на опт успішно надіслана!</h3>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Дякуємо! Наш комерційний відділ зв'яжеться з вами протягом найближчого робочого часу для надання КП.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', company: '', volume: '', message: '' });
                  }}
                  className="mt-2"
                >
                  Надіслати ще одну заявку
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Ваше ім'я <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Наприклад: Олександр"
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Номер телефону <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+380..."
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Компанія / Господарство
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="ФГ, агрохолдинг чи приватне"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Орієнтовний об'єм (кг)
                    </label>
                    <input
                      type="text"
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                      placeholder="наприклад: 50 кг або 1 тонна"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Деталі замовлення або коментар
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Вкажіть культуру або запитання..."
                    className="w-full p-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full h-11 font-semibold gap-2">
                  <SendHorizonal className="h-4 w-4" />
                  {isSubmitting ? 'Відправка...' : 'Надіслати заявку на опт'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;