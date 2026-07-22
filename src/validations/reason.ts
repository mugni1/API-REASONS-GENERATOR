import z from 'zod';

export const generateReasonValidate = z.object({
	myName: z.string('my name is required').max(20, 'maximum my name must have 20 character').optional().default('-'),
	targetName: z
		.string('target name is required')
		.max(20, 'maximum target name must have 20 character')
		.optional()
		.default('-'),
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
export type GenerateReasonPayload = z.infer<typeof generateReasonValidate>;
