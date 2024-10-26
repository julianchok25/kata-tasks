import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import taskRoutes from './routes/task.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
// Allow JSON data in the body of the request
app.use(express.json());
// CORS
app.use(cors({origin: '*'}));
// ROUTES
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});