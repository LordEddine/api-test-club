import express from 'express';
import studentRoutes from './routes/studentRoutes'
import clubRoutes from './routes/clubRoutes';
import 'dotenv/config';
import prisma from './prisma/prisma.js';

const app = express();

app.use(express.json());

app.use('/clubs', clubRoutes)
app.use('/etudiants', studentRoutes); // http:localhost:3000/etudiants/......

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});