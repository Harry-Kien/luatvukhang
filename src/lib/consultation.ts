import { validAppointmentDate } from "./appointment-date";
import { z } from "zod";
export const consultationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  phone: z
    .string()
    .trim()
    .max(25)
    .regex(/^[+\d\s().-]*$/),
  service: z.string().trim().max(160),
  message: z.string().trim().min(15).max(3000),
  consent: z.literal(true),
  language: z.enum(["vi", "en", "zh"]),
  website: z.string().max(0),
  idempotencyKey: z.uuid(),
  preferredDate: z
    .string()
    .max(10)
    .refine((value) => validAppointmentDate(value)),
});
