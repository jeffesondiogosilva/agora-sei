// src/components/ItemList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

function ItemList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para monitorar carregamento
    const [error, setError] = useState(null); // Estado para monitorar erros

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'reforcador')); // Certifique-se do nome da coleção
                const itemsData = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setItems(itemsData);
            } catch (err) {
                console.error("Erro ao buscar itens:", err);
                setError("Erro ao carregar itens. Por favor, tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleImageClick = (title) => {
        const utterance = new SpeechSynthesisUtterance(title);
        window.speechSynthesis.speak(utterance);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este item?')) {
            try {
                await deleteDoc(doc(db, 'reforcador', id)); // Remove o documento do Firestore
                setItems(prevItems => prevItems.filter(item => item.id !== id)); // Remove o item da lista localmente
            } catch (err) {
                console.error('Erro ao deletar item:', err);
                alert('Erro ao deletar item. Tente novamente mais tarde.');
            }
        }
    };

    if (loading) {
        return <div>Carregando itens...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="item-list container">
            <h1 className="text-center mb-4">Lista de Reforçadores Personalizados</h1>
            <div className="row">
                {items.map(item => (
                    <div key={item.id} className="col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="card-img-top"
                                onClick={() => handleImageClick(item.title)}
                                style={{ cursor: 'pointer' }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{item.title}</h5>
                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemList;
