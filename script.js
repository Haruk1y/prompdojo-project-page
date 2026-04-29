const tabButtons = [...document.querySelectorAll("[data-section]")];
const panels = [...document.querySelectorAll("[data-panel]")];
const languageButtons = [...document.querySelectorAll("[data-lang-option]")];
const translationTargets = [...document.querySelectorAll("[data-i18n]")];
const metaDescription = document.querySelector('meta[name="description"]');
const ogDescription = document.querySelector('meta[property="og:description"]');

const translations = {
  ja: {
    "meta.title": "PrompDojo | Project Page",
    "meta.description":
      "PrompDojoは、生成AIを用いた全く新しいパーティゲームです。お題の画像に使われたプロンプトを推定し、最も似た画像を生成できたプレイヤーが勝利となります。",
    "nav.play": "ゲームを開く",
    "concept.title": "AIで、もっとパーティー！",
    "concept.body":
      "PrompDojoは、生成AIを用いた全く新しいパーティゲームです。お題の画像に使われたプロンプトを推定し、最も似た画像を生成できたプレイヤーが勝利となります。",
    "how.title": "見る、書く、生成する",
    "how.modes.note": "5種のゲームモードが存在。続々と追加予定！",
    "how.step1.title": "お題画像を見る",
    "how.step1.body": "主題、背景、色、構図、画風...どれも欠かせない！",
    "how.step2.title": "プロンプトを書く",
    "how.step2.body": "見えた要素をAIが描きやすい言葉に変換しよう！",
    "how.step3.title": "AIで生成する",
    "how.step3.body": "作成しよう！",
    "how.step4.title": "近さを比べる",
    "how.step4.body": "お題画像に似ているほど高スコア！",
    "team.title": "開発メンバー",
    "about.hackathon.name": "Gemini3 Hackathon Tokyo",
    "about.hackathon.result": "で70チーム中3位入賞",
    "about.lab.name": "Supercell AI Innovation Lab Tokyo",
    "about.lab.status": "で開発中！",
    "team.haruki.name": "矢島陽樹",
    "team.shuntaro.name": "徳田俊太朗",
    "team.profile": "東京大学大学院\n情報理工学系研究科\n修士1年",
  },
  en: {
    "meta.title": "PrompDojo | Project Page",
    "meta.description":
      "PrompDojo is an AI party game where players reverse-engineer prompts from AI-generated images and compete to recreate the closest image.",
    "nav.play": "Open Game",
    "concept.title": "More AI, More Party!",
    "concept.body":
      "PrompDojo is a brand-new party game powered by generative AI. Players infer the prompt behind a generated image, and the player who creates the closest match wins.",
    "how.title": "See, Write, Generate",
    "how.modes.note": "5 game modes are live, with more on the way!",
    "how.step1.title": "Study the image",
    "how.step1.body":
      "Subject, background, color, composition, style... every detail matters!",
    "how.step2.title": "Write the prompt",
    "how.step2.body": "Turn what you notice into words the AI can draw from.",
    "how.step3.title": "Generate with AI",
    "how.step3.body": "Create your best shot.",
    "how.step4.title": "Compare the match",
    "how.step4.body": "The closer it is to the target, the higher your score!",
    "team.title": "Development Team",
    "about.hackathon.name": "Gemini3 Hackathon Tokyo",
    "about.hackathon.result": ": 3rd place out of 70 teams",
    "about.lab.name": "Supercell AI Innovation Lab Tokyo",
    "about.lab.status": ": currently in development",
    "team.haruki.name": "Haruki Yajima",
    "team.shuntaro.name": "Shuntaro Tokuda",
    "team.profile":
      "First-year master's student\nGraduate School of Information Science and Technology\nThe University of Tokyo",
  },
};

function selectPanel(section) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.section === section;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === section;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectPanel(button.dataset.section);
  });

  button.addEventListener("keydown", (event) => {
    const currentIndex = tabButtons.indexOf(button);
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;

    if (!direction) {
      return;
    }

    event.preventDefault();
    const nextIndex = (currentIndex + direction + tabButtons.length) % tabButtons.length;
    tabButtons[nextIndex].focus();
    selectPanel(tabButtons[nextIndex].dataset.section);
  });
});

function setLanguage(language) {
  const dictionary = translations[language] ?? translations.ja;

  document.documentElement.lang = language;
  document.body.dataset.lang = language;
  document.title = dictionary["meta.title"];

  if (metaDescription) {
    metaDescription.setAttribute("content", dictionary["meta.description"]);
  }

  if (ogDescription) {
    ogDescription.setAttribute("content", dictionary["meta.description"]);
  }

  translationTargets.forEach((target) => {
    const key = target.dataset.i18n;
    if (key && dictionary[key]) {
      target.textContent = dictionary[key];
    }
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.langOption === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem("prompdojo-language", language);
  } catch {
    // Language persistence is a small convenience; the page works without it.
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.langOption);
  });
});

let initialLanguage = "ja";

try {
  const savedLanguage = localStorage.getItem("prompdojo-language");
  if (savedLanguage && translations[savedLanguage]) {
    initialLanguage = savedLanguage;
  }
} catch {
  initialLanguage = "ja";
}

setLanguage(initialLanguage);
