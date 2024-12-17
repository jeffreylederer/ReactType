import { z } from 'zod';

export const PlayerFormDataSchema = z.object({
    membershipId: z.string(),
    leagueid: z.string()

   
});

export type PlayerFormData = z.infer<typeof PlayerFormDataSchema>;


