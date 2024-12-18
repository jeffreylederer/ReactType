import { z } from 'zod';


export const FormDataSchema = z.object({
    gameDate: z.date({
        required_error: "Please select a game date",
        invalid_type_error: "That's not a legal game date!"
    }),
    leagueid: z.number(),
    cancelled: z.boolean(),
    playOffs: z.boolean()
});

export type FormData = z.infer<typeof FormDataSchema>;


