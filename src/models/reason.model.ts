import mongoose from 'mongoose';
const { Schema } = mongoose;

const ResumeSchema = new Schema(
	{
		maker: String,
		target: String,
		scenario: String,
		style: String,
		language: String,
		reason: String,
	},
	{
		timestamps: true,
		minimize: false,
	},
);

const Reason = mongoose.model('Reason', ResumeSchema);
export default Reason;
