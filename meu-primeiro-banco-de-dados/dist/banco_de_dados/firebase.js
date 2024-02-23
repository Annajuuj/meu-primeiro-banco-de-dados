"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestore = exports.db = void 0;
const app_1 = require("firebase/app");
const firestore = __importStar(require("firebase/firestore"));
exports.firestore = firestore;
const firebaseConfig = {
    apiKey: "AIzaSyARC_Zxq40khYiyiZ357DXsjY8ggYJ_aRk",
    authDomain: "teste-1c96d.firebaseapp.com",
    projectId: "teste-1c96d",
    storageBucket: "teste-1c96d.appspot.com",
    messagingSenderId: "766998349001",
    appId: "1:766998349001:web:478aaa644e02217e6cf918",
};
const firebase = (0, app_1.initializeApp)(firebaseConfig);
exports.db = firestore.getFirestore(firebase);
console.log("Conectado ao Firebase!");