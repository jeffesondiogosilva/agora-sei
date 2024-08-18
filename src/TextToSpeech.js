import React from 'react';

const TextToSpeech = ({ text }) => {
    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'pt-BR'; // Define o idioma para português do Brasil

            // Filtra as vozes disponíveis para pt-BR
            const voices = window.speechSynthesis.getVoices();
            const portugueseVoices = voices.filter(voice => voice.lang === 'pt-BR');

            if (portugueseVoices.length > 0) {
                utterance.voice = portugueseVoices[0]; // Seleciona a primeira voz em pt-BR
            }

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
