const { z } = require('zod');

const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  description: z.string().optional(),
  parentId: z.union([z.string().uuid({ message: "Invalid UUID" }), z.literal(""), z.null(), z.undefined()]).transform(val => val === "" ? null : val),
  status: z.enum(["ACTIVE", "UPCOMING", "INACTIVE"]).optional(),
  imageUrl: z.union([z.string().url({ message: "Invalid URL format" }), z.literal(""), z.null(), z.undefined()]).transform(val => val === "" ? null : val),
  bannerUrl: z.union([z.string().url({ message: "Invalid URL format" }), z.literal(""), z.null(), z.undefined()]).transform(val => val === "" ? null : val),
});

try {
  categorySchema.parse({
    name: "Test Cat",
    slug: "test-cat",
    parentId: null,
    status: "ACTIVE",
    description: "",
    imageUrl: ""
  });
  console.log("Validation passed");
} catch (e) {
  console.log(e.errors);
}
