const { z } = require("zod");

const BusinessCreateSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional().default(""),
  address: z.string().optional().default(""),
  neighborhood: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  website: z.string().url().optional().or(z.literal("")).default(""),
  instagram: z.string().optional().default(""),
  imageUrl: z.string().url().optional().or(z.literal("")).default(""),
  tags: z.array(z.string()).optional().default([]),
});

const SubmissionCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

module.exports = { BusinessCreateSchema, SubmissionCreateSchema };
