import express from 'express';
import feedbackRoutes from './feedback.js';


const router = express.Router();

router.use('/feedback', feedbackRoutes);

export default router;