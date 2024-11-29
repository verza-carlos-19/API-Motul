"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/auth', userRoutes_1.default);
app.use('/products', productsRoutes_1.default);
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto3000');
});
