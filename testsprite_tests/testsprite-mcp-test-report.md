# TestSprite AI Testing Report (MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** terawet_web
- **Date:** 2026-09-24
- **Prepared by:** TestSprite AI & Antigravity Automation
- **Target URL:** http://localhost:5173
- **Test Framework:** TestSprite Playwright Autonomous Agent
- **Total Test Cases Executed:** 27

---

## 2️⃣ Requirement Validation Summary

### 🌐 Мультиязичність (i18n & Locale Persistence)
- **TC002: Switch language and continue browsing in the chosen locale** — ✅ **Passed**
  - Мова успішно перемикається на англійську, стан зберігається в контексті.
- **TC004: Switch the site language and continue browsing** — ✅ **Passed**
  - Повна адаптація інтерфейсу при зміні локалі.
- **TC005: Switch language and move from home to catalog** — ✅ **Passed**
  - Мова залишається обраною при переходах між сторінками.
- **TC010: Keep the selected language after moving to another page** — ✅ **Passed**
  - Стан мови не скидається при роутингу.
- **TC011: Keep language selection while moving between pages** — ✅ **Passed**
  - Стабільна робота мовного перемикача.
- **TC025: Stay on a supported language when an unsupported locale is chosen** — ✅ **Passed**
  - Fallback на базову мову (українська) працює без збоїв.

### 🧭 Навігація та Роутинг (Navigation & Layout)
- **TC003: Navigate across the main site sections from the header** — ✅ **Passed**
  - Усі посилання в шапці сайту відкривають правильні розділи.
- **TC012: Open the catalog from the home hero call to action** — ✅ **Passed**
  - Кнопка «Каталог» у Hero-секції коректно веде на `/catalog`.
- **TC019: Launch the brand video from the home hero** — ✅ **Passed**
  - Кнопка відкриття відео веде на офіційний YouTube-канал бренду.
- **TC023: Open home from global navigation after visiting About** — ✅ **Passed**
  - Повернення на головну зі сторінки «Про нас» працює стабільно.
- **TC026: Open a missing route and keep site navigation available** — ✅ **Passed**
  - Сторінка 404 (NotFound) відображається коректно, залишаючи доступ до меню.

### 📦 Каталог продукції (Product Catalog)
- **TC008: View all core product categories in the catalog** — ✅ **Passed**
  - Усі базові категорії (Hydrogel, Care, Bulk) присутні та рендеряться.
- **TC014: Inspect an industrial bulk product and its packaging details** — ✅ **Passed**
  - Деталі упаковок 25кг та 1кг відображаються коректно.
- **TC021: Browse featured products on the home showcase** — ✅ **Passed**
  - Інтерактивний блок демонстрації товарів на головній працює без помилок.
- **TC024: Show an empty state when catalog data is unavailable** — ✅ **Passed**
  - Захист від порожніх даних у каталозі працює коректно.
- **TC016: Switch product categories in the catalog** — ❌ **Failed**
  - *Причина:* На сторінці каталогу відсутні кнопки швидкої фільтрації за категоріями (всі товари виводяться єдиним списком).

### 📞 Контакти та Форма замовлення (Contacts & Inquiry)
- **TC015: View company details on the contacts page** — ✅ **Passed**
  - Номери телефонів, пошта та адреса компанії відображаються коректно.
- **TC007: Submit a wholesale inquiry successfully** — ❌ **Failed**
  - *Причина:* На сторінці контактів відсутня інтерактивна HTML-форма для введення заявки на опт (є лише прямі контакти та месенджери).
- **TC020: Show validation errors for incomplete inquiry details** — ⚠️ **Blocked**
  - Заблоковано через відсутність полів форми на сторінці контактів.

### 🧮 Калькулятор дозування (Application & Dosage)
- **TC001: Calculate a recommended dosage from valid inputs** — ⚠️ **Blocked**
  - *Причина:* На сторінці `/application` розрахунок винесено на зовнішнього Telegram-бота (@Terawet_bot), на сторінці немає вбудованого веб-калькулятора.
- **TC009: Browse application scenarios and guidance** — ⚠️ **Blocked**
  - *Причина:* Сценарії застосування показані статичним текстом без табів для швидкого перемикання (Ліс / Сад / Поле).
- **TC022: Show validation errors for incomplete dosage input** — ⚠️ **Blocked**
  - Заблоковано через відсутність форми на сторінці.

### 🎙️ Голосовий AI-асистент (ElevenLabs Conversational Widget)
- **TC006: Open the voice advisor from the home page** — ✅ **Passed**
  - Віджет успішно монтується та розгортається при натисканні.
- **TC013: Get consultation guidance from the voice advisor** — ❌ **Failed**
  - *Причина:* Сесія віджета перервалася (`Connection closed unexpectedly before session could be established`) через відсутність публічного ElevenLabs Agent ID або ліміт з'єднань.
- **TC018 / TC027: Voice advisor fallback & permissions** — ⚠️ **Blocked**
  - Потребує налаштованого робочого ключа/ID агента.

---

## 3️⃣ Coverage & Matching Metrics

| Функціональний блок | Всього тестів | ✅ Успішно (Passed) | ❌ Помилки / Блокування | % Успіху |
| :--- | :---: | :---: | :---: | :---: |
| **Мультиязичність (i18n)** | 6 | 6 | 0 | **100%** |
| **Навігація та Роутинг** | 5 | 5 | 0 | **100%** |
| **Каталог товарів** | 5 | 4 | 1 | **80%** |
| **Контакти та Інформація** | 3 | 1 | 2 | **33.3%** |
| **Калькулятор внесення** | 3 | 0 | 3 | **0%** *(є в боті, нема на сайті)* |
| **AI Голосовий віджет** | 5 | 1 | 4 | **20%** *(потрібен Agent ID)* |
| **РАЗОМ** | **27** | **17** | **10** | **63.0%** |

---

## 4️⃣ Key Gaps / Risks & Рекомендації щодо виправлення

1. **Вбудований калькулятор дозування на сайті (Пріоритет: Високий):**
   * *Проблема:* Зараз розрахунок пропонується робити через Telegram-бота (@Terawet_bot).
   * *Рішення:* Додати на сторінку `/application` інтерактивну форму (культура, площа в гектарах або кількість дерев ➔ розрахунок кількості кілограмів Terawet) із кнопкою «Замовити розрахований об'єм».

2. **Інтерактивна форма лідогенерації в Контактах (Пріоритет: Високий):**
   * *Проблема:* Є лише статичні контакти, але клієнт не може залишити заявку в 1 клік прямо на сайті.
   * *Рішення:* Додати форму (Ім'я, Телефон, Компанія, Повідомлення) з відправкою через вебхук в n8n / Telegram.

3. **Фільтри за категоріями в Каталозі (Пріоритет: Середній):**
   * *Проблема:* Всі товари відображаються загальним списком без фільтрів.
   * *Рішення:* Додати чіпси/кнопки швидкого фільтра («Всі», «Гідрогель», «Догляд», «Опт 25кг»).

4. **Активація ElevenLabs Voice Widget (Пріоритет: Середній):**
   * *Проблема:* Віджет присутній, але для живого діалогу потребує підключення публічного `agent-id` від ElevenLabs.
