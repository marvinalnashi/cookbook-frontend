export function speakVisibleText() {
    const narratorEnabled = localStorage.getItem("narratorMode") === "true";
    if (!narratorEnabled || typeof window === "undefined") return;

    const utterance = new SpeechSynthesisUtterance();
    const textContent = document.body.innerText;
    const volume = parseFloat(localStorage.getItem("sfxVolume") || "0.7");

    utterance.text = textContent;
    utterance.volume = volume;
    utterance.rate = 1;
    utterance.lang = "en-US";

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}
