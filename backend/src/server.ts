import redemptionRouter from './routes/redemption.router';
import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';

const app = express();

// Using express middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Routes for all redemption related queries (currently the only kind on this app)
app.use('/redemption', redemptionRouter);

app.listen(3000, () => {
  console.log('Running on port: ' + 3000);
});
