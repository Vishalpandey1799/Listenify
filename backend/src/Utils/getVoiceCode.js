export const getVoiceCode = (language, voice) => {
  if (language === "Hindi") {
    return voice === "Female" ? "hi-IN-shweta" : "hi-IN-amit";
  } else if (language === "English") {
    return voice === "Female" ? "en-UK-juliet" : "en-US-terrell";
  }
  return "en-US-terrell";  
};
