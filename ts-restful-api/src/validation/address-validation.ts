import { z, ZodType } from "zod";

export class AddressValidation {
  static readonly CREATE: ZodType = z.object({
    contact_id: z.number().positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(10),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100),
    email: z.string().min(1).max(100),
    phone: z.string().min(1).max(20),
  });

  static readonly SEARCH: ZodType = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    phone: z.string().min(1),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
