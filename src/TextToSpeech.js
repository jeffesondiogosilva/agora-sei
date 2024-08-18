import React from 'react';

const TextToSpeech = ({ text }) => {
    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Seu navegador não suporta síntese de voz.");
        }
    };

    return (
        <button onClick={handleSpeak}>
            Ouvir título
        </button>
    );
};

export default TextToSpeech;
