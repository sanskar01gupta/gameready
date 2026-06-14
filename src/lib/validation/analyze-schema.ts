import { z } from "zod";

export const analyzeSchema = z.object({
  gameSlug: z.string().min(1).max(255),
  cpu: z.string().max(255).nullable().optional(),
  gpu: z.string().max(255).nullable().optional(),
  gpuSecondary: z.string().max(255).nullable().optional(),
  gpuVramGb: z.number().positive().nullable().optional(),
  ramGb: z.number().int().positive().min(1).max(1024),
  detectionMethod: z.enum(["auto", "manual", "mixed"]).default("manual"),
});

export const createReportSchema = z.object({
  gameSlug: z.string().min(1).max(255),
  cpu: z.string().max(255).nullable().optional(),
  gpu: z.string().max(255).nullable().optional(),
  gpuVramGb: z.number().positive().nullable().optional(),
  ramGb: z.number().int().positive(),
  detectionMethod: z.enum(["auto", "manual", "mixed"]).default("manual"),
});

export type AnalyzeInput = z.infer<typeof analyzeSchema>;
export type CreateReportInput = z.infer<typeof createReportSchema>;
