import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();
 
const port = process.env.PORT || 5000;

const app = express();

// Request Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => res.send('API running'));

app.use('/api/users', userRoutes);

// From errorMiddleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

 





















































// // Get Profile
// app.get("/profile/:id", (req, res) => {
//   const { id } = req.params;
//   let found = false;
//   dataBase.users.forEach((user) => {
//     if (user.id === id) {
//       found = true;
//       return res.json(user);
//     }
//   });

//   if (!found) {
//     res.status(404).json("Not found");
//   }
// });

// // App Entries
// app.post("/image", (req, res) => {
//     const { id } = req.body;
//     let found = false;
//     dataBase.users.forEach((user) => {
//       if (user.id === id) {
//         found = true;
//         user.entries++;
//         return res.json(user.entries);
//       }
//     });
  
//     if (!found) {
//       res.status(404).json("Not found");
//     }
//   });