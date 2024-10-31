import { z } from "zod";

export const expenseForm=z.object({
    title:z.string(),
    description:z.string(),
    totalAmount:z.number(),
    paidAmount:z.number(),
    categories:z.array(z.string())
})