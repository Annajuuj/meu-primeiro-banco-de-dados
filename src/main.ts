import express from "express";
import { db, firestore } from '../banco_de_dados/firebase';
import { doc } from "firebase/firestore";

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Bem vindo a minha primeira API né pae😎💕');
});

app.post('/usuario', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;

    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'usuarios'),
            {
                nome: nome,
                email: email,
                telefone: telefone,
            })
        res.send("Usuário adicionado com sucesso: " + docRef.id)
    } catch (e) {
        console.log("Erro ao adicionar usuário: ", e)
        res.status(500).send(e)
    }


});

app.put('/atualizarUsuario/:id', async (req, res) => {
    const id = req.params.id
    const nome = req.body.nome

    try {
        await firestore.updateDoc(firestore.doc(db, 'usuarios', id), {
            nome: nome,
        })
        res.send('Usuários atualizado com sucesso!')
    } catch (e) {
        console.log('Erro ao atualizar o usuário: ' + e)

        res.status(500).send('Erro ao atualizar o usuários: ' + e)
    }
})

app.get('/listarUsuarios', async (req, res) => {
    try {
        const usuarios = await firestore.getDocs(firestore.collection(db, 'usuarios'))

        const usuarioLista = usuarios.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        res.send(usuarioLista);
    } catch (e) {
        console.log("Erro ao listar usuário:" + e)
        res.status(500).send("Erro ao listar usuários:" + e)
    }
})

app.listen(3000, function () {
    console.log("Serviço rodando em http://localhost:3000");
});



