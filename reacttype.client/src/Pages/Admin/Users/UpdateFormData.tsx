import { z } from 'zod';


export const UpdateFormDataSchema = z.object({
    id: z.number(),
    roleId: z.coerce.number(),
    username: z.string().min(1, "User name is required").max(450, "User name is limited to 450 characters"),
    password: z.string().min(1, "Password is required").max(50, "Password is limited to 450 characters"),
    displayName: z.string().min(1, "Display name is required").max(50, "Display name is limited to 50 characters"),
    isActive: z.boolean(),
    lastLoggedIn: z.date(),
    serialNumber: z.string(),
    role: z.string()
});

export type UpdateFormData = z.infer<typeof UpdateFormDataSchema>;