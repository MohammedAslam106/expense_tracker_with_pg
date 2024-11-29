import { categories } from "@/helpers/sql-queries/db-tables";
import { z } from "zod";
import { categoryRequest } from "./category";

export const expenenseRequest=z.object({
    id:z.string().optional(),
    user_id:z.string().optional(),
    title:z.string(),
    description: z.string(),
    amount: z.number(),
    payment_status: z.enum(['Paid','Partialy Paid','Unpaid']).default('Unpaid'),
    categories:z.array(categoryRequest).optional(),
    createdAt:z.date().optional(),
    updatedAt:z.date().optional()
})

export const expenenseResponse=z.object({
    success:z.boolean(),
    message:z.string(),
    data:z.array(
        expenenseRequest.extend({
            categories:z.array(categoryRequest)
        })
    )
})