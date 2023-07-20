import express, { Application } from 'express';
import cors from 'cors';

function configExpress(app: Application) {
  app.use(cors());
  app.use(express.json());
};

export default configExpress;
