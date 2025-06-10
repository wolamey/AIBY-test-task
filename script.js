document.addEventListener("DOMContentLoaded", () => {
  const tarifItems = document.querySelectorAll(".main__tarif-item");

  tarifItems.forEach(item => {
    item.addEventListener("click", () => {
      if (item.classList.contains("active")) return;

      tarifItems.forEach(tarif => tarif.classList.remove("active"));

      item.classList.add("active");
    });
  });
});



function getLanguage() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang") || "en"; // По умолчанию английский
    const supportedLanguages = ["de", "en", "es", "fr", "ja", "pt"];
    
    return supportedLanguages.includes(lang) ? lang : "en"; // Проверка, поддерживается ли язык
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
    
    if (!translations) return; 

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (translations[key]) {
            element.innerHTML = translations[key]; 
        }
    });
}

document.addEventListener("DOMContentLoaded", applyTranslations);
