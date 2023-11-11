import { db } from './firebase.js';
import { useEffect, useState, useRef } from 'react';
import firebase from 'firebase';

function Post(props) {

    const [comentarios, setComentarios] = useState([]);
    const comentarioRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        const unsubscribe = db.collection('posts').doc(props.id).collection('comentarios').orderBy('timestamp', 'desc').onSnapshot(function (snapshot) {
            if (isMounted) {
                setComentarios(snapshot.docs.map(function (document) {
                    return { id: document.id, info: document.data() }
                }));
            }
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, []);

    function comentar(id, e) {
        e.preventDefault();

        const comentarioAtual = comentarioRef.current.value;

        if (comentarioAtual.trim() !== "") {
            db.collection('posts').doc(id).collection('comentarios').add({
                nome: props.user,
                comentario: comentarioAtual,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert('Comentário feito com sucesso: ' + id);
            comentarioRef.current.value = "";
        } else {
            alert('O comentário não pode estar vazio!');
        }
    }

    return (
        <div className='postSingle'>
            <img src={props.info.image} alt="Imagem do post" />
            <p><b>{props.info.username}</b> {props.info.titulo}</p>

            <div className='coments'>
                <h2>Últimos comentários:</h2>
                {comentarios && comentarios.map(function (val) {
                    return (
                        <div key={val.id} className='coment-single'>
                            <p><b>{val.info.nome}</b> {val.info.comentario}</p>
                        </div>
                    )
                })}
            </div>
            {
                (props.user) ?
                    <form onSubmit={(e) => comentar(props.id, e)}>
                        <textarea ref={comentarioRef} id={"comentario-" + props.id}></textarea>
                        <input type='submit' value="Comentar!" />
                    </form>
                    :
                    <div></div>
            }

        </div>
    );
}

export default Post;
