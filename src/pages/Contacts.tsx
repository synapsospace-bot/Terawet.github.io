import { useLanguage } from '@/lib/languageContext';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, User, MessageCircle, Send, Mail, AlertTriangle } from 'lucide-react';
import terawetContactsImg from '@/assets/terawet-contacts.png';

const PHONE = '380502365858';

const Contacts = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('contacts.title')}</h1>

      <div className="max-w-3xl mx-auto space-y-10">
        {/* Banner image */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img src={terawetContactsImg} alt="Terawet — Зробіть свій ґрунт розумним" className="w-full h-auto" />
        </div>

        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          {t('contacts.partnerText')}
        </p>

        {/* Bulgaria warehouse notice */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {t('contacts.bulgariaNotice')}
          </p>
        </div>

        {/* Contact info */}
        <div className="max-w-lg mx-auto space-y-6">
          <div className="flex items-start gap-4">
            <User className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-medium">{t('contacts.manager')}</p>
              <p className="text-muted-foreground">{t('contacts.managerName')}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-medium">{t('contacts.phone')}</p>
              <a href="tel:+380502365858" className="text-muted-foreground hover:text-primary block">+38 (050) 236-58-58</a>
              <a href="tel:+380636885262" className="text-muted-foreground hover:text-primary block">+38 (063) 688-52-62</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-medium">Email</p>
              <a href="mailto:Terawet.original@gmail.com" className="text-muted-foreground hover:text-primary">terawet.original@gmail.com</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-medium">{t('contacts.address')}</p>
              <p className="text-muted-foreground">{t('contacts.companyName')}</p>
              <p className="text-muted-foreground">{t('contacts.cityAddress')}</p>
              <p className="text-muted-foreground">{t('contacts.streetAddress')}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
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
      </div>
    </div>
  );
};

export default Contacts;