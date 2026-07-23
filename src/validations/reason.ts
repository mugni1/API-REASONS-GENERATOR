import z from 'zod';

export const generateReasonV1Validate = z.object({
	myName: z.string('my name is required').max(20, 'maximum my name must have 20 character').optional().default(''),
	targetName: z
		.string('target name is required')
		.max(20, 'maximum target name must have 20 character')
		.optional()
		.default(''),
	language: z
		.enum(['id', 'en', 'jp'], {
			error: "language must be 'id', 'en', or 'jp'",
		})
		.optional()
		.default('id'),
	reason: z.enum(['school', 'work', 'familyEvent', 'hangOut'], {
		error: "reason must be 'school', 'work', 'familyEvent', or 'hangOut'",
	}),
	style: z.enum(['normal', 'stupid', 'absurd'], {
		error: "style must be 'normal', 'stupid', or 'absurd'",
	}),
});
export type GenerateReasonV1Payload = z.infer<typeof generateReasonV1Validate>;

export const generateReasonV2Validate = z.object({
	maker: z.string('maker is required').max(20, 'maximum maker must have 20 character').optional(),
	target: z.string('target is required').max(20, 'maximum target must have 20 character').optional(),
	language: z
		.enum(['id', 'en', 'jp'], {
			error: "language must be 'id', 'en', or 'jp'",
		})
		.optional()
		.default('id'),
	scenario: z.enum(['school', 'work', 'familyEvent', 'hangOut'], {
		error: "scenario must be 'school', 'work', 'familyEvent', or 'hangOut'",
	}),
	style: z.enum(['normal', 'funny', 'absurd'], {
		error: "style must be 'normal', 'funny', or 'absurd'",
	}),
});
export type GenerateReasonV2Payload = z.infer<typeof generateReasonV2Validate>;
export type CreateReasonV2Payload = GenerateReasonV2Payload & {
	reason: string;
};
