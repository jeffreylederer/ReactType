import { z } from 'zod';


export const UpdateFormDataSchema = z.object({
    id: z.number(),
    gameDate: z.date({
        required_error: "Please select a game date",
        invalid_type_error: "That's not a legal game date!"
    }),
    leagueid: z.number(),
    cancelled: z.boolean(),
    playOffs: z.boolean()
});

export type UpdateFormData = z.infer<typeof UpdateFormDataSchema>;


