import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from './controllers/auth.js';
import auth from './routes/auth.js';
import user from './routes/user.js';
import transaction from './routes/transaction.js';


// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url); // to grab file url
const __dirname = path.dirname(__filename); // to grab file directory
dotenv.config();
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // to store images locally on dev

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// ROUTES FOR FILES
app.post('/auth/register', upload.single('picture'), register);

// ROUTES
app.use('/auth', auth);
app.use('/user', user);
app.use('/transaction', transaction);

// MONGOOSE
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)))
  .catch((error) => console.log(error.message));