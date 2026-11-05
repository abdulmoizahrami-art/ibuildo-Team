# آی بیلدو | iBuildo — وب‌سایت تیم (Svelte 5 + Vite)

سایت تک‌صفحه‌ای تیم آی بیلدو؛ فارسی (پیش‌فرض)، انگلیسی و پښتو، با تم سیستم/روشن/تاریک و ریسپانسیو کامل.

## اجرا در VS Code

۱. Node.js نسخه ۲۲ LTS (حداقل ۲۰.۱۹) را از nodejs.org نصب کنید.
۲. پوشه پروژه را در VS Code باز کنید: `File ▸ Open Folder…`
۳. پیشنهاد افزونه‌ها را قبول کنید (Svelte، Prettier، ESLint).
۴. ترمینال داخلی را باز کنید (`` Ctrl+` ``) و بنویسید:

```bash
npm install     # فقط بار اول
npm run dev     # اجرا روی http://localhost:5173
```

## دستورها

| دستور             | کار                            |
| ----------------- | ------------------------------ |
| `npm run dev`     | اجرای محلی با به‌روزرسانی زنده |
| `npm run build`   | ساخت نسخه نهایی در `dist/`     |
| `npm run preview` | دیدن نسخه ساخته‌شده            |
| `npm run lint`    | بررسی خطا و کد بد (ESLint)     |
| `npm run format`  | مرتب‌سازی خودکار کد (Prettier) |
| `npm test`        | اجرای تست‌ها (Vitest)          |

## ساختار پروژه

```
src/
├─ main.js                      نقطه شروع
├─ App.svelte                   چیدمان صفحه + همگام‌سازی زبان/تم با <html>
├─ styles/
│  ├─ tokens.css                رنگ‌ها، فونت‌ها، نقاط شکست (رنگ برند اینجاست)
│  └─ global.css                ریست، دکمه، کارت، کانتینر
├─ assets/                      brand/logo.svg و عکس‌های تیم
└─ lib/
   ├─ config.js                 شماره واتساپ/تلفن و منوی ناوبری
   ├─ i18n/                     fa.js · en.js · ps.js (+ تست هم‌ساختار بودن)
   ├─ state/settings.svelte.js  زبان، تم و تابع t('hero.title')
   ├─ data/                     services · team · process · icons
   ├─ services/contact.js       ارسال فرم (به API خودتان وصل کنید)
   ├─ utils/                    validation · links · particles · path (+ تست)
   ├─ sections/                 Hero · About · Services · Team · Process · Contact
   └─ components/
      ├─ layout/                Header · Footer · Background · Particles · CircuitLines
      ├─ ui/                    Logo · Icon · LangSwitch · ThemeToggle · SectionHeading
      ├─ cards/                 ServiceCard · TeamCard
      ├─ contact/               ContactInfo · ContactForm
      └─ illustrations/         HeroIllustration · AboutIcons
```

اصل ساده ساختار: **sections** صفحه را می‌چینند، **components** تکه‌های کوچک و قابل‌استفاده مجدد هستند،
**data** محتوای قابل‌ویرایش است، **utils** توابع ساده و قابل‌تست‌اند و **state** وضعیت برنامه را نگه می‌دارد.

## کارهای رایج

| کار                 | کجا                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| شماره واتساپ و تلفن | `src/lib/config.js`                                                                             |
| تغییر هر متن        | `src/lib/i18n/fa.js` (و en.js, ps.js) — کلیدها باید در هر سه یکی باشند؛ `npm test` بررسی می‌کند |
| تغییر رنگ برند      | `src/styles/tokens.css` (`--accent-rgb`)                                                        |
| عضو جدید تیم        | عکس در `src/assets/team/` + یک خط در `data/team.js` + متن‌ها در i18n                            |
| سرویس جدید          | یک خط در `data/services.js` + `services.items.<id>` در i18n                                     |
| زبان جدید           | یک فایل در `i18n/` + یک خط در `LANGS` در `state/settings.svelte.js`                             |
| دریافت واقعی فرم    | `src/lib/services/contact.js` (Formspree، ربات تلگرام یا API خودتان)                            |

## مفهوم‌های Svelte در این پروژه

- **کامپوننت**: هر `.svelte` = `<script>` + HTML + `<style>` (استایل فقط برای همان فایل).
- **`$state`**: متغیر واکنشی (`settings.svelte.js`, `ContactForm.svelte`).
- **`$props()`**: ورودی کامپوننت (`ServiceCard.svelte`, `Icon.svelte`).
- **`$effect`**: اجرای کد با تغییر state (`App.svelte`).
- **`{#each}` / `{#if}`**: حلقه و شرط (`Services.svelte`, `ContactForm.svelte`).
- **`bind:value`**: اتصال دوطرفه فرم (`ContactForm.svelte`).
- **`onMount`**: کد بعد از نمایش کامپوننت (`Particles.svelte`).
- **`{@html}`**: فقط برای متن‌های خودمان در i18n و آیکون‌ها، هرگز برای ورودی کاربر.

## هنوز باقی است

- شماره واتساپ و تلفن خالی است (تا آن موقع دکمه‌ها به فرم می‌روند).
- فرم به سرور وصل نیست.
- ترجمه پښتو را یک پشتوزبان مرور کند.
