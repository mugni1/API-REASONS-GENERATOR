import e, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { response } from './utils/response.js';
import ReasonRouter from './routes/reason.route.js';
import cors from 'cors';
const app = e();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT) || 5051;

app.use(e.json());
app.use(
	cors({
		origin: ['http://localhost:5173', 'http://localhost:3000'],
		credentials: true,
	}),
);

// main routes
app.use('/reason', ReasonRouter);

// global route not found
app.use((_req: Request, res: Response, _next: NextFunction) =>
	response({ res, status: 404, message: 'Route not found' }),
);

// global route error
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	response({ res, status: err.statusCode || 500, message: err.message });
});

// listen server
app.listen(PORT, HOST, () => {
	console.log(`Server berjalan di http://${HOST}:${PORT}`);
});
export default app;
