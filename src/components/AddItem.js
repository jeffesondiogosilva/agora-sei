// src/components/AddItem.js
import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Certifique-se de que a importação está correta
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Importar funções do storage

function AddItem() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !image) {
            alert("Please provide both title and image.");
            return;
        }

        // Referência ao arquivo no Storage
        const fileRef = ref(storage, `images/${image.name}`);
        await uploadBytes(fileRef, image);
        const imageUrl = await getDownloadURL(fileRef);

        try {
            await addDoc(collection(db, 'items'), {
                title: title,
                imageUrl: imageUrl
            });
            setTitle('');
            setImage(null);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
            />
            <button type="submit">Add Item</button>
        </form>
    );
}

export default AddItem;
