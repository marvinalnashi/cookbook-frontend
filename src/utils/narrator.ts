function removeEmojis(text: string): string {
    return text.replace(
        /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2B50}-\u{2B55}\u{24C2}-\u{1F251}]/gu,
        ""
    ).trim();
}

export function speakVisibleText() {
    const narratorEnabled = localStorage.getItem("narratorMode") === "true";
    if (!narratorEnabled || typeof window === "undefined") return;

    const utterance = new SpeechSynthesisUtterance();
    const textContent = document.body.innerText;
    const cleanedText = removeEmojis(textContent);
    const volume = parseFloat(localStorage.getItem("sfxVolume") || "0.7");

    utterance.text = cleanedText;
    utterance.volume = volume;
    utterance.rate = 1;
    utterance.lang = "en-US";

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}