import { GoogleGenAI } from '@google/genai';
import { GenerateReasonV1Payload, GenerateReasonV2Payload } from '../validations/reason.js';

export const gemini = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
});

// model
const MODEL_V1 = 'gemini-3.1-flash-lite-preview';
const MODEL_V2 = 'gemini-2.5-flash-lite';
const MODEL_V3 = 'gemini-2.5-flash';
const models = [MODEL_V1, MODEL_V2, MODEL_V3];

// reason v1
export async function generateReasonV1WithFallback(payload: GenerateReasonV1Payload): Promise<string> {
	let lastError: unknown;
	for (const model of models) {
		try {
			console.log(`Trying model: ${model}`);
			const contents = promtGenerateReasonV1(payload);
			const result = await gemini.models.generateContent({
				model,
				contents,
			});
			console.log(`Success using model: ${model}`);
			return result.text?.toString() || '';
		} catch (err: unknown) {
			console.log(`Model failed: ${model}`);
			lastError = err;
		}
	}
	throw lastError;
}
export const promtGenerateReasonV1 = ({ myName, targetName, reason, style, language }: GenerateReasonV1Payload) => {
	const reasonPrompt = {
		school: 'Terlambat/tidak bisa datang ke sekolah.',
		work: 'Terlambat/tidak bisa datang ke kantor/tempat kerja.',
		familyEvent: 'Terlambat/tidak bisa datang ke acara keluarga.',
		hangOut: 'Terlambat/tidak bisa datang ke acara nongkrong bareng temen temen.',
	}[reason];
	const stylePrompt = {
		normal: 'Buat alasan yang masuk akal, sopan, realistis, dan terdengar seperti manusia.',
		stupid: 'Buat alasan yang konyol, sedikit bodoh, tapi masih mungkin dipercaya dan lucu.',
		absurd: 'Buat alasan yang sangat aneh dan nyeleneh, tidak masuk akal, kreatif, dan menghibur.',
	}[style];
	const languageName = {
		id: 'Indonesia',
		en: 'Inggris',
		jp: 'Jepang',
	}[language];

	return `
Kamu adalah pembuat alasan yang kreatif.

Tujuan:
- Nama Pengirim: ${myName || '- Tidak ada nama diberikan.'}
- Nama Penerima: ${targetName || '- Tidak ada nama diberikan.'}
- Alasan: ${reasonPrompt}
- Gaya: ${stylePrompt}

Aturan:
- Jika Nama Pengirim tidak kosong, sebutkan nama tersebut secara natural di dalam alasan.
- Jika Nama Penerima tidak kosong, sebutkan nama tersebut secara natural di dalam alasan.
- Jika hanya salah satu nama yang diisi, gunakan hanya nama tersebut dan jangan membuat nama lainnya.
- Jika kedua nama kosong (""), jangan menyebut nama siapa pun.
- Jangan pernah mengubah ejaan nama yang diberikan.
- Jangan mengarang nama baru.
- Langsung tulis alasannya saja.
- Gunakan bahasa ${languageName}.
- Panjang 1-3 kalimat.
- Jangan menggunakan poin.
- Jangan menggunakan emoji.
- Jangan menyebut bahwa alasan dibuat oleh AI.
- Jangan memberikan penjelasan tambahan.
`.trim();
};

// reason v2
export async function generateReasonV2WithFallback(payload: GenerateReasonV2Payload): Promise<string> {
	let lastError: unknown;
	for (const model of models) {
		try {
			console.log(`Trying model: ${model}`);
			const contents = promtGenerateReasonV2(payload);
			const result = await gemini.models.generateContent({
				model,
				contents,
			});
			console.log(`Success using model: ${model}`);
			return result.text?.toString() || '';
		} catch (err: unknown) {
			console.log(`Model failed: ${model}`);
			lastError = err;
		}
	}
	throw lastError;
}
export const promtGenerateReasonV2 = ({ myName, targetName, scenario, style, language }: GenerateReasonV2Payload) => {
	const scenarioPrompt = {
		school: 'Terlambat/tidak bisa datang ke sekolah.',
		work: 'Terlambat/tidak bisa datang ke kantor/tempat kerja.',
		familyEvent: 'Terlambat/tidak bisa datang ke acara keluarga.',
		hangOut: 'Terlambat/tidak bisa datang ke acara nongkrong bareng temen temen.',
	}[scenario];
	const stylePrompt = {
		normal: 'Buat alasan yang masuk akal, sopan, realistis, dan terdengar seperti manusia.',
		funny: 'Buat alasan yang konyol/lucu, sedikit bodoh, tapi masih mungkin dipercaya dan lucu.',
		absurd: 'Buat alasan yang sangat aneh dan nyeleneh, tidak masuk akal, kreatif, dan menghibur.',
	}[style];
	const languageName = {
		id: 'Indonesia',
		en: 'Inggris',
		jp: 'Jepang',
	}[language];

	return `
Kamu adalah pembuat alasan yang kreatif.

Tujuan:
- Nama Pengirim: ${myName || '- Tidak ada nama diberikan.'}
- Nama Penerima: ${targetName || '- Tidak ada nama diberikan.'}
- Skenario: ${scenarioPrompt}
- Gaya: ${stylePrompt}

Aturan:
- Jika Nama Pengirim tidak kosong, sebutkan nama tersebut secara natural di dalam alasan.
- Jika Nama Penerima tidak kosong, sebutkan nama tersebut secara natural di dalam alasan.
- Jika hanya salah satu nama yang diisi, gunakan hanya nama tersebut dan jangan membuat nama lainnya.
- Jika kedua nama kosong (""), jangan menyebut nama siapa pun.
- Jangan pernah mengubah ejaan nama yang diberikan.
- Jangan mengarang nama baru.
- Langsung tulis alasannya saja.
- Gunakan bahasa ${languageName}.
- Panjang 1-3 kalimat.
- Jangan menggunakan poin.
- Jangan menggunakan emoji.
- Jangan menyebut bahwa alasan dibuat oleh AI.
- Jangan memberikan penjelasan tambahan.
`.trim();
};
