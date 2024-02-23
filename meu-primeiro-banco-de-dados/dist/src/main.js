"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_1 = require("../banco_de_dados/firebase");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// TODO: Inserir no código para utilização do json na requisição
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.get("/", (req, res) => {
    return res.json("Bem vindo a minha primeira API");
});
app.post("/formulario", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const descricao = req.body.descricao;
    console.log(req.body);
    try {
        const docRef = yield firebase_1.firestore.addDoc(firebase_1.firestore.collection(firebase_1.db, "formulario"), {
            nome: nome,
            telefone: telefone,
            email: email,
            descricao: descricao,
        });
        res.send("Resposta enviada com sucesso: " + docRef.id);
    }
    catch (e) {
        console.log("Erro ao enviar resposta: ", e);
        res.status(500).send(e);
    }
}));
app.get("/listarFormulario", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formulario = yield firebase_1.firestore.getDocs(firebase_1.firestore.collection(firebase_1.db, "formulario"));
        const formularioLista = formulario.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        res.send(formularioLista);
    }
    catch (e) {
        console.log("Erro ao listar formulário: " + e);
        res.status(500).send("Erro ao listar formulário: " + e);
    }
}));
app.put("/atualizarFormulario/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const nome = req.body.nome;
    try {
        yield firebase_1.firestore.updateDoc(firebase_1.firestore.doc(firebase_1.db, "formulario", id), {
            nome: nome,
        });
        res.send("Formulário atualizado com sucesso!");
    }
    catch (e) {
        console.log("Erro ao atualizar formulário: " + e);
        res.status(500).send("Erro ao atualizar formulário: " + e);
    }
}));
app.delete("/deletarFormulario/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield firebase_1.firestore.deleteDoc(firebase_1.firestore.doc(firebase_1.db, "formulario", id));
        res.send("Formulário deletado com sucesso!");
    }
    catch (e) {
        console.log("Erro ao deletar formulário: " + e);
        res.status(500).send("Erro ao deletar formulário: " + e);
    }
}));
app.listen(3000, function () {
    console.log("Servidor rodando em http://localhost:3000");
});