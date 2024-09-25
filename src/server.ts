import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/database';

dotenv.config();

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});