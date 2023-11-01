import { Express, Request, Response } from 'express';
import * as babel from '@babel/core';
import bodyParser = require("body-parser");
import express = require('express');
const { transpileModule } = require('typescript');

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(bodyParser.text({ type: '*/*' }));

app.get('/health/live', (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.post('/convert-ts', (req: Request, res: Response) => {
  console.log('Received request to /convert-ts');
  try {
    if (typeof req.body !== 'string') {
      return res.status(400).send('Invalid input: body must be a string');
    }

    const result = transpileModule(req.body, {
      compilerOptions: { module: "CommonJS" },
    });

    res.type('text/javascript').send(result.outputText);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/transpile-esnext', (req: Request, res: Response) => {
  console.log('Received request to /transpile-esnext');
  const inputCode: string = req.body;
  babel.transform(inputCode, {
    presets: ['@babel/preset-env'],
  }, (err: Error | null, result: babel.BabelFileResult | null) => {
    if (err || !result) {
      res.status(500).send(err?.message || 'An error occurred during the transpilation process');
    } else {
      res.type('text/javascript').send(result.code);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
