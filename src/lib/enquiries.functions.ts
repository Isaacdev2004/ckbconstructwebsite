import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const opt = (max: number) => z.string().trim().max(max).optional().transform((v) => (v ? v : null));

export const quoteSchema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  company: z.string().trim().min(2, "Enter your company name").max(160),
  email: z.string().trim().email("Enter a valid business email").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(40),
  job_title: opt(120),
  request_type: z.string().trim().min(2, "Select what you need").max(120),
  category: opt(120),
  product_name: opt(160),
  quantity: opt(120),
  project_location: opt(200),
  timeline: opt(120),
  requirements: opt(4000),
});

export const contactSchema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  company: opt(160),
  email: z.string().trim().email("Enter a valid business email").max(200),
  phone: opt(40),
  enquiry_type: z.string().trim().min(2, "Select an enquiry type").max(120),
  subject: z.string().trim().min(2, "Enter a subject").max(200),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(4000),
});

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => quoteSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("quote_requests").insert(data);
    if (error) {
      console.error("quote insert failed", error);
      throw new Error("We couldn't save your request. Please try again.");
    }
    return { ok: true };
  });

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert(data);
    if (error) {
      console.error("contact insert failed", error);
      throw new Error("We couldn't send your message. Please try again.");
    }
    return { ok: true };
  });
