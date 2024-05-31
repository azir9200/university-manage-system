import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './modules/student/student.route';
import { UserRoutes } from './modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalError';
import notFound from './app/middlewares/notFoundRoute';
import router from './app/routes';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/', router);
// app.use('/api/v1/users', UserRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next!");

  const a = 11;
  res.send(a);
  console.log('hello testing !')
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;