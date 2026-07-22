import e from 'express';
import { generateReason } from '../controllers/reason.controller.js';

const r = e.Router();
r.post('/generate', generateReason);

export default r;
