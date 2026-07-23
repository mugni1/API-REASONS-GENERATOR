import e from 'express';
import { generateReasonV1, generateReasonV2, getReason } from '../controllers/reason.controller.js';

const r = e.Router();
r.get('/', getReason);
r.post('/generate/v1', generateReasonV1);
r.post('/generate/v2', generateReasonV2);

export default r;
