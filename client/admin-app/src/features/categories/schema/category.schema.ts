import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  description: z.string().optional(),
  parentId: z.union([z.uuid({ message: "Invalid UUID" }), z.literal(""), z.null(), z.undefined()]).transform(val => val === "" ? null : val).optional(),
  status: z.enum(["ACTIVE", "UPCOMING", "INACTIVE"]).optional(),
  imageUrl: z.union([z.url({ message: "Invalid URL format" }), z.literal(""), z.null(), z.undefined()]).transform(val => val === "" ? null : val).optional(),
  bannerUrl: z.union([z.url({ message: "Invalid URL format" }), z.literal(""), z.null(), z.undefined()]).transform(val => val === "" ? null : val).optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
export type CategoryFormInput = z.input<typeof categorySchema>;
