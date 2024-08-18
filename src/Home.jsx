import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Home.css';
import TextToSpeech from './TextToSpeech';
import image1 from './images/doce.jpg';
import image2 from './images/brinquedo.jpg';
import image3 from './images/abraço.jpg';


const reinforcers = [
    { id: 1, name: 'Doce', image: image1},
    { id: 2, name: 'Brinquedo', image: image2 },
    { id: 3, name: 'Abraço', image: image3 },
    // Adicione mais reforçadores conforme necessário
  ];
  
  const ReinforcerCard = ({ name, image }) => {
    return (
      <div className="reinforcer-card">
        <img src={image} alt={name} className="reinforcer-image" />
        <h3 className="reinforcer-name">{name}</h3>
        <TextToSpeech text={name} />
      </div>
    );
  };
  
  const Home = () => {
    return (
      <div className="home-container">
        <header className="home-header">
          <h1>Reforçadores</h1>
        </header>
        <div className="reinforcer-grid">
          {reinforcers.map(reinforcer => (
            <ReinforcerCard key={reinforcer.id} name={reinforcer.name} image={reinforcer.image} />
          ))}
        </div>
      </div>
    );
  };
  
  export default Home;