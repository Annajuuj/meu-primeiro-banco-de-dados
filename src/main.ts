import express from "express";
import {db, firestore} from '../banco_de_dados/firebase';

const app = express();

app.use(express.json())

app.get('/', (req, res) =>{
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
})

app.listen(3000,function(){
    console.log("Serviço rodando em http://localhost:3000");
});


