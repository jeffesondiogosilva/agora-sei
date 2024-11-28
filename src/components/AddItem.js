// src/components/AddItem.js
import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Certifique-se de que está importando corretamente
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function AddItem() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false); // Adicionado estado para o upload

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !image) {
            alert("Por favor, forneça título e imagem.");
            return;
        }

        setUploading(true); // Define que o upload está em andamento

        try {
            // Upload da imagem para o Storage
            const fileRef = ref(storage, `images/${image.name}`);
            await uploadBytes(fileRef, image);
            const imageUrl = await getDownloadURL(fileRef);

            // Adiciona o documento ao Firestore
            await addDoc(collection(db, 'items'), {
                title: title,
                imageUrl: imageUrl,
            });

            setTitle('');
            setImage(null);
            alert("Item adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
        } finally {
            setUploading(false); // Upload finalizado
        }
    };

    return (        
        <form className="form-control p-4 shadow-sm rounded" onSubmit={handleSubmit}>
            <h1>Cadastro de Reforçador</h1>

            {/* Campo de Título */}
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Título</label>
                <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Digite o título"
                    required
                />
            </div>

            {/* Campo de Upload de Imagem */}
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Imagem</label>
                <input
                    type="file"
                    id="image"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                    required
                />
            </div>

            {/* Botão de Enviar */}
            <button type="submit" className="btn btn-primary" disabled={uploading}>
                {uploading ? "Enviando..." : "Adicionar Item"}
            </button>

            {/* Link para voltar */}
            <div className="mt-3">
                <a href="/" className="btn btn-link">Voltar</a>
            </div>        
        </form>
    );
}

export default AddItem;
