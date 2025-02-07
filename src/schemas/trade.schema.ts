import { z } from 'zod';

export const tradeSchema = z.object({
  fiatValue: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0.0, {
      message: `Value must be a number and greater than 0`,
    }),
  cryptoValue: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0.0, {
      message: 'Value must be a number and greater than 0',
    }),
});

export type TradeSchema = z.infer<typeof tradeSchema>;
