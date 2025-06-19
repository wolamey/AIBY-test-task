document.addEventListener("DOMContentLoaded", () => {
  const tarifItems = document.querySelectorAll(".main__tarif-item");

  tarifItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.classList.contains("active")) return;
      tarifItems.forEach((tarif) => tarif.classList.remove("active"));
      item.classList.add("active");
    });
  });

  const lang = getLanguage();
  document.body.classList.add(`lang-${lang}`);
  applyTranslations();
});

function getLanguage() {
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get("lang");
  const browserLang = navigator.language.slice(0, 2);
  const supportedLanguages = ["de", "en", "es", "fr", "ja", "pt"];

  if (langParam && supportedLanguages.includes(langParam)) {
    return langParam;
  }

  return supportedLanguages.includes(browserLang) ? browserLang : "en";
}

async function loadTranslations(lang) {
  try {
    const response = await fetch(`data/${lang}.json`);
    if (!response.ok) {
      throw new Error("Не удалось загрузить файл перевода");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function applyTranslations() {
  const lang = getLanguage();
  const translations = await loadTranslations(lang);

  const prices = {
    weekly: "$3.99",
    yearly: "$39.99"
  };

  if (!translations) return;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[key]) {
      let text = translations[key];

      if (key.toLowerCase().includes("year")) {
        text = text.replaceAll("{{price}}", prices.yearly);
      } else if (key.toLowerCase().includes("week")) {
        text = text.replaceAll("{{price}}", prices.weekly);
      }

      element.innerHTML = text;
    }
  });
}
