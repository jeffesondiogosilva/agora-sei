// src/components/AddItem.js
import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Certifique-se de importar corretamente
import { collection, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function AddItem() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false); // Estado para monitorar upload

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !image) {
            alert("Por favor, forneça um título e uma imagem.");
            return;
        }

        setUploading(true); // Inicia o estado de upload

        try {
            // Cria um ID único para o documento
            const newId = doc(collection(db, 'reforcador')).id;

            // Upload da imagem para o Storage
            const fileRef = ref(storage, `images/${newId}_${image.name}`);
            await uploadBytes(fileRef, image);
            const imageUrl = await getDownloadURL(fileRef);

            // Salva o documento no Firestore
            await setDoc(doc(db, 'reforcador', newId), {
                id: newId,
                title: title,
                imageUrl: imageUrl,
            });

            // Reseta os campos do formulário
            setTitle('');
            setImage(null);
            alert("Reforçador adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar reforçador:", error);
            alert("Erro ao adicionar reforçador. Verifique o console para mais detalhes.");
        } finally {
            setUploading(false); // Finaliza o estado de upload
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
                {uploading ? "Enviando..." : "Adicionar Reforçador"}
            </button>

            {/* Link para voltar */}
            <div className="mt-3">
                <a href="/" className="btn btn-link">Voltar</a>
            </div>

            <button className='bg-success rounded'>
                <a href="/add-item" className='text-light text-decoration-none'>Lista de Personalizados</a>
            </button>
        </form>
    );
}

export default AddItem;
