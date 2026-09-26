(function () {
  var T = {
    fr: {
      _title: "ClubPulse — Athletic Bordj El Bahri (ABB)",
      eyebrow: "Application officielle du club", title: "Athletic Bordj El Bahri",
      lead: "Inscriptions, planning des entraînements, événements et annonces du club — dans votre poche.",
      download: "Télécharger l'APK Android", apkMeta: "Version", mb: "Mo", openWeb: "Ouvrir la démo web",
      note: "Gratuit · Android 7.0 ou plus · Français, العربية, English",
      installTitle: "Installer en 3 étapes",
      s1t: "Téléchargez", s1: "Touchez le bouton doré ci-dessus depuis votre téléphone Android.",
      s2t: "Autorisez", s2: "Si Android le demande, autorisez l'installation depuis votre navigateur (« sources inconnues »).",
      s3t: "Ouvrez", s3: "Ouvrez le fichier téléchargé, installez, puis lancez ClubPulse ABB.",
      featuresTitle: "Tout le club dans une app",
      f1t: "Inscription en ligne", f1: "Créez votre dossier, joignez vos documents et suivez sa validation.",
      f2t: "Planning clair", f2: "Entraînements et matchs par jour, semaine ou mois, avec confirmation de présence.",
      f3t: "Événements", f3: "Tournois, galas, portes ouvertes : inscrivez-vous en un clic.",
      f4t: "Annonces & notifications", f4: "Recevez les infos du club, de votre discipline et de votre groupe.",
      d1: "Football", d2: "Boxe", d3: "Natation", d4: "Volleyball",
      sponsor: "Sponsor officiel", city: "Bordj El Bahri, Alger"
    },
    ar: {
      _title: "ClubPulse — أتلتيك برج البحري (ABB)",
      eyebrow: "التطبيق الرسمي للنادي", title: "أتلتيك برج البحري",
      lead: "التسجيلات، جدول التدريبات، الفعاليات وإعلانات النادي — في جيبك.",
      download: "تحميل تطبيق أندرويد (APK)", apkMeta: "الإصدار", mb: "ميغابايت", openWeb: "فتح النسخة التجريبية على الويب",
      note: "مجاني · أندرويد 7.0 أو أحدث · Français، العربية، English",
      installTitle: "التثبيت في 3 خطوات",
      s1t: "حمّل", s1: "اضغط على الزر الذهبي أعلاه من هاتفك الأندرويد.",
      s2t: "اسمح", s2: "إذا طلب أندرويد ذلك، اسمح بالتثبيت من متصفحك («مصادر غير معروفة»).",
      s3t: "افتح", s3: "افتح الملف الذي تم تحميله، ثبّته، ثم شغّل ClubPulse ABB.",
      featuresTitle: "النادي كله في تطبيق واحد",
      f1t: "التسجيل عبر الإنترنت", f1: "أنشئ ملفك، أرفق وثائقك وتابع المصادقة عليه.",
      f2t: "جدول واضح", f2: "التدريبات والمباريات حسب اليوم أو الأسبوع أو الشهر، مع تأكيد الحضور.",
      f3t: "الفعاليات", f3: "دورات، حفلات، أبواب مفتوحة: سجّل بنقرة واحدة.",
      f4t: "الإعلانات والإشعارات", f4: "تلقَّ أخبار النادي واختصاصك وفوجك.",
      d1: "كرة القدم", d2: "الملاكمة", d3: "السباحة", d4: "الكرة الطائرة",
      sponsor: "الراعي الرسمي", city: "برج البحري، الجزائر العاصمة"
    },
    en: {
      _title: "ClubPulse — Athletic Bordj El Bahri (ABB)",
      eyebrow: "The club's official app", title: "Athletic Bordj El Bahri",
      lead: "Registrations, training schedule, events and club announcements — in your pocket.",
      download: "Download the Android APK", apkMeta: "Version", mb: "MB", openWeb: "Open the web demo",
      note: "Free · Android 7.0 or later · Français, العربية, English",
      installTitle: "Install in 3 steps",
      s1t: "Download", s1: "Tap the gold button above on your Android phone.",
      s2t: "Allow", s2: "If Android asks, allow installs from your browser (\"unknown sources\").",
      s3t: "Open", s3: "Open the downloaded file, install it, then launch ClubPulse ABB.",
      featuresTitle: "The whole club in one app",
      f1t: "Online registration", f1: "Create your application, attach documents and track its approval.",
      f2t: "Clear schedule", f2: "Training and matches by day, week or month, with attendance confirmation.",
      f3t: "Events", f3: "Tournaments, galas, open days: register in one tap.",
      f4t: "Announcements & notifications", f4: "Get news from the club, your discipline and your group.",
      d1: "Football", d2: "Boxing", d3: "Swimming", d4: "Volleyball",
      sponsor: "Official sponsor", city: "Bordj El Bahri, Algiers"
    }
  };
  var KEY = "abb_lang";
  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && T[q]) return q;
    try { var s = localStorage.getItem(KEY); if (s && T[s]) return s; } catch (e) {}
    return "fr";
  }
  function apply(lang) {
    var t = T[lang] || T.fr, html = document.documentElement;
    html.lang = lang; html.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t._title;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n"); if (t[k] != null) el.textContent = t[k];
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    var web = document.getElementById("web-link"); if (web) web.setAttribute("href", "app/?lang=" + lang);
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }
  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { apply(b.getAttribute("data-lang")); });
  });
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
  apply(pick());
})();
