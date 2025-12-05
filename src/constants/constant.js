export const userAvatar = `https://occ-0-3587-58.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229`;

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};

export const PLACEHOLDER_TEXT = {
  en: "What would you like to watch today?",
  hi: "आज आप क्या देखना चाहेंगे?",
  ur: "آپ آج کیا دیکھنا چاہیں گے؟",
  es: "¿Qué te gustaría ver hoy?",
  fr: "Que souhaitez-vous regarder aujourd'hui ?",
  jp: "今日は何を見たいですか？",
  kr: "오늘 무엇을 보고 싶나요?",
};

export const TMDB_LANGUAGE_CODES = {
  en: "en-US",
  hi: "hi-IN",
  ur: "ur-PK",
  es: "es-ES",
  fr: "fr-FR",
  jp: "ja-JP",
  kr: "ko-KR",
};

export const IMG_CDN_URL = import.meta.env.VITE_IMG_URL;

export const OPEN_API_KEY = import.meta.env.VITE_OPEN_API_KEY;
