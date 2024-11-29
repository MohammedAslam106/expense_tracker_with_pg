import { z } from "zod";

export const categoryRequest=z.object({
    id:z.string().optional(),
    userId:z.string().optional(),
    title:z.string(),
    description: z.string(),
    createdAt:z.date().optional(),
    updatedAt:z.date().optional()
})

export const categoryResponse=z.object({
    success:z.boolean(),
    message:z.string(),
    data:z.array(categoryRequest)
})