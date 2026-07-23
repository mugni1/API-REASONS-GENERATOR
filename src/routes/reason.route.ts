import e from 'express';
import { generateReasonV1 } from '../controllers/reason.controller.js';

const r = e.Router();
r.post('/generate/v1', generateReasonV1);

export default r;
