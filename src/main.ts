import express from "express";
import cors from "cors";
import { db, firestore } from '../banco_de_dados/firebase';
import { doc } from "firebase/firestore";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.get('/', (req, res) => {
   return res.json(
        'Bem vindo a minha primeira API né pae😎💕');
});

app.post('/formulario', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const descricao = req.body.descricao;

    console.log(req.body);
    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'formulario'),
            {
                nome: nome,
                email: email,
                telefone: telefone,
                descricao: descricao,
            });

        res.send("Resposta enviada com sucesso: " + docRef.id)
    } catch (e) {
        console.log("Erro ao enviar resposta: ", e)
        res.status(500).send(e)
    }


});

app.put('/atualizarFormulario/:id', async (req, res) => {
    const id = req.params.id
    const nome = req.body.nome

    try {

        await firestore.updateDoc(firestore.doc(db, 'formulario', id), {
            nome: nome,

        });
        res.send('Formulario atualizado com sucesso!')
    } catch (e) {
        console.log('Erro ao atualizar o formulario: ' + e)

        res.status(500).send('Erro ao atualizar o formulario: ' + e)
    }
});

app.get('/listarFormulario', async (req, res) => {
    try {
        const formulario = await firestore.getDocs(firestore.collection(db, 'formulario'))

        const formularioLista = formulario.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        res.send(formularioLista);
    } catch (e) {
        console.log("Erro ao listar formulario:" + e)
        res.status(500).send("Erro ao listar formulario:" + e)
    }
})

app.delete("/deletarformulario/:id",async(req,res)=>{
    const id = req.params.id


    try {
        await firestore.deleteDoc(firestore.doc(db, 'formulario', id))

        res.send("Formulario deletado com sucesso!!")
    } catch (error) {
        res.send("Erro ao deletar formulario: " + error)
    }


});

app.listen(3000, function () {
    console.log("Serviço rodando em http://localhost:3000");
});



