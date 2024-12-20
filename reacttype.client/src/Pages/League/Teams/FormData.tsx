import { z } from 'zod';

export const FormDataSchema = z.object({
    id: z.coerce.number(),
    leagueid: z.coerce.number(),
    skip: z.coerce.number(),
    viceSkip: z.coerce.number(),
    lead: z.coerce.number(),
    teamNo: z.coerce.number(),
    divisionId: z.coerce.number()
});

export type FormData = z.infer<typeof FormDataSchema>;


