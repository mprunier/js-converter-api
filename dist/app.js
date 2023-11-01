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
const babel = __importStar(require("@babel/core"));
const bodyParser = require("body-parser");
const express = require("express");
const { transpileModule } = require('typescript');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.text({ type: '*/*' }));
app.get('/health/live', (req, res) => {
    res.sendStatus(200);
});
app.post('/convert-ts', (req, res) => {
    console.log('Received request to /convert-ts');
    try {
        if (typeof req.body !== 'string') {
            return res.status(400).send('Invalid input: body must be a string');
        }
        const result = transpileModule(req.body, {
            compilerOptions: { module: "CommonJS" },
        });
        res.type('text/javascript').send(result.outputText);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/transpile-esnext', (req, res) => {
    console.log('Received request to /transpile-esnext');
    const inputCode = req.body;
    babel.transform(inputCode, {
        presets: ['@babel/preset-env'],
    }, (err, result) => {
        if (err || !result) {
            res.status(500).send((err === null || err === void 0 ? void 0 : err.message) || 'An error occurred during the transpilation process');
        }
        else {
            res.type('text/javascript').send(result.code);
        }
    });
});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
