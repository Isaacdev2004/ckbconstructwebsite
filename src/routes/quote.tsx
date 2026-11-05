import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { categories, services } from "@/lib/site";
import { submitQuote, quoteSchema } from "@/lib/enquiries.functions";
import { Field, WhatsAppLink } from "@/components/site/blocks";

export const Route = createFileRoute("/quote")({
  validateSearch: z.object({ product: z.string().optional(), category: z.string().optional(), service: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Request a Quote — CKB Construction Limited" },
      { name: "description", content: "Request a quotation for scaffolding, construction equipment, PPE, industrial supplies or HSE manpower." },
      { property: "og:title", content: "Request a Quote — CKB Construction" },
      { property: "og:description", content: "Tell us what your project needs and our team will respond." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Quote,
});

const requestTypes = ["Product supply", ...services.map((s) => s.title), "Other"];


function Quote() {
  const s = Route.useSearch();
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [requestType, setRequestType] = useState(s.service ?? (s.product ? "Product supply" : ""));
  const [submittedFor, setSubmittedFor] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = quoteSchema.safeParse(data);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      await submitQuote({ data });
      setSubmittedFor([data["product_name"], data["request_type"]].filter(Boolean).join(" — "));
      setStatus("done");
      window.scrollTo({ top: 0 });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <section className="container-site max-w-2xl py-28 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-accent" />
        <h1 className="display-lg mt-6">Request received.</h1>
        <p className="mt-5 text-lg text-muted-foreground">Thank you. Your quotation request has been recorded and our team will review your requirements.</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <WhatsAppLink
            message={`Hello CKB Construction Limited, I just submitted a quotation request on your website${submittedFor ? ` for ${submittedFor}` : ""}.`}
            label="Follow up on WhatsApp"
          />
          <Link to="/products" className="link-arrow">Back to catalogue</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-site grid gap-14 py-20 md:grid-cols-12">
      <div className="md:col-span-4">
        <p className="eyebrow">Request a quote</p>
        <h1 className="display-lg mt-4">Tell us what your project needs.</h1>
        <p className="mt-5 text-muted-foreground">Share as much detail as you can — quantities, location and timeline help our team respond accurately.</p>
      </div>
      <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2 md:col-span-8">
        <Field label="Full name" name="full_name" required error={errors["full_name"]}><input id="full_name" name="full_name" className="field" /></Field>
        <Field label="Company name" name="company" required error={errors["company"]}><input id="company" name="company" className="field" /></Field>
        <Field label="Business email" name="email" required error={errors["email"]}><input id="email" name="email" type="email" className="field" /></Field>
        <Field label="Phone number" name="phone" required error={errors["phone"]}><input id="phone" name="phone" type="tel" className="field" /></Field>
        <Field label="Job title" name="job_title"><input id="job_title" name="job_title" className="field" /></Field>
        <Field label="Product or service required" name="request_type" required error={errors["request_type"]}>
          <select id="request_type" name="request_type" className="field" value={requestType} onChange={(e) => setRequestType(e.target.value)}>
            <option value="">Select…</option>
            {[...new Set([...(s.service ? [s.service] : []), ...requestTypes])].map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Product category" name="category">
          <select id="category" name="category" className="field" defaultValue={s.category ?? ""}>
            <option value="">Select…</option>
            {categories.map((c) => <option key={c.slug}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Product name" name="product_name"><input id="product_name" name="product_name" className="field" defaultValue={s.product ?? ""} /></Field>
        <Field label="Estimated quantity" name="quantity"><input id="quantity" name="quantity" className="field" /></Field>
        <Field label="Project location" name="project_location"><input id="project_location" name="project_location" className="field" /></Field>
        <Field label="Expected delivery timeline" name="timeline"><input id="timeline" name="timeline" className="field" placeholder="e.g. within 2 weeks" /></Field>
        <div className="sm:col-span-2">
          <Field label="Additional requirements" name="requirements"><textarea id="requirements" name="requirements" rows={5} className="field" /></Field>
        </div>
        {status === "error" && <p className="text-destructive sm:col-span-2">{serverError}</p>}
        <div className="sm:col-span-2">
          <button type="submit" disabled={status === "loading"} className="btn-accent disabled:opacity-60">
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />} Submit request
          </button>
        </div>
      </form>
    </section>
  );
}
