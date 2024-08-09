import { z, defineCollection, reference } from "astro:content";

export const collections = {
  posts: defineCollection({
    type: "content", // v2.5.0 and later
    schema: z.object({
      title: z.string().max(60, { message: "Title is too long" }),
      category: z.string(),
      description: z.string().max(200, { message: "Description is too long" }),
      date: z.date(),
      author: reference("teams"),
      draft: z.boolean(),
      relatedPosts: z.array(reference("posts")).optional(),
    }),
  }),
  author: defineCollection({
    type: "data", // v2.5.0 and later
    schema: ({ image }) =>
      z.object({
        name: z.string(),
        bio: z.string(),
        email: z.string().email(),
        role: z.enum(["author", "editor", "admin"]),
        headshot: image().refine((url) => url),
      }),
  }),
};
