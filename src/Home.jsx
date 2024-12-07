import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Home.css';
import TextToSpeech from './TextToSpeech';
import image1 from './images/doce.jpg';
import image2 from './images/brinquedo.jpg';
import image3 from './images/abraço.jpg';


const reinforcers = [
  { id: 1, name: 'Doce', image: image1 },
  { id: 2, name: 'Brinquedo', image: image2 },
  { id: 3, name: 'Zoi', image: 'https://firebasestorage.googleapis.com/v0/b/agora-sei-710e3.appspot.com/o/zoe.jpeg?alt=media&token=e136aeec-d794-408c-8625-150cfcffa991' },
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
      <header className="home-header col-md-12 d-flex">
        <div className="col-md-9">
          <h1>Reforçadores</h1>
        </div>
        <div className="col-md-3">
          <button className='bg-success rounded'>
            <a href="/add-item" className='text-light text-decoration-none'>Cadastrar Reforçador</a>
          </button>
          <button className='bg-primary rounded'  style={{ marginLeft: "2px" }}>
            <a href="/item-list" className='text-light text-decoration-none'>Lista de Personalizados</a>
          </button>
        </div>
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