import mongoose from 'mongoose';

export const ConnectDB = async () => {
	try {
		await mongoose.connect(String(process.env.MONGODB_URI));
		// const host = conn.connection.host;
		// const db = conn.connection.name;
		console.log(`Mongodb connect`);
	} catch (error: unknown) {
		const msg = error instanceof Error ? error.message : String(error);
		console.log(`Mongodb connection failed: ${msg}`);
	}
};
