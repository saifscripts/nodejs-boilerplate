import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import userRouter from './app/modules/user/user.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routers
app.use('/api/v1/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
