// src/components/ItemList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function ItemList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db, 'items'));
            setItems(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchItems();
    }, []);

    const handleImageClick = (title) => {
        const utterance = new SpeechSynthesisUtterance(title);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="item-list">
            {items.map(item => (
                <div key={item.id} className="item">
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        onClick={() => handleImageClick(item.title)}
                        style={{ cursor: 'pointer' }}
                    />
                    <p>{item.title}</p>
                </div>
            ))}
        </div>
    );
}

export default ItemList;
