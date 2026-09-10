const { z } = require('zod');

const categorySchema = z.object({
  imageUrl: z.union([z.string().url({ message: "Invalid URL format" }), z.literal(""), z.null(), z.undefined()]).transform(val => val === "" ? null : val),
  bannerUrl: z.union([z.string().url({ message: "Invalid URL format" }), z.literal(""), z.null(), z.undefined()]).transform(val => val === "" ? null : val).optional(),
});

try {
  categorySchema.parse({
  });
  console.log("Validation passed");
} catch (e) {
  console.log(JSON.stringify(e.errors, null, 2));
}
