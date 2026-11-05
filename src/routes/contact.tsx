import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contact, enquiryTypes, images } from "@/lib/site";
import { submitContact, contactSchema } from "@/lib/enquiries.functions";
import { Field, PageHero, WhatsAppLink } from "@/components/site/blocks";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — CKB Construction Limited" },
      { name: "description", content: "Contact CKB Construction Limited about scaffolding, equipment, PPE, industrial materials or HSE manpower." },
      { property: "og:title", content: "Contact CKB Construction Limited" },
      { property: "og:description", content: "Let's discuss your project requirements." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      await submitContact({ data });
      setStatus("done");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const details = [
    ["Phone", contact.phone],
    ["Email", contact.email],
    ["Address", contact.address],
    ["Business hours", contact.hours],
  ].filter(([, v]) => v);

  return (
    <>
      <PageHero eyebrow="Contact us" title="Let's discuss your project requirements." text="Procurement departments, contractors, project managers and businesses — reach out and our team will respond." image={images.equipmentImg} />
      <section className="container-site grid gap-14 py-20 md:grid-cols-12">
        <aside className="space-y-8 md:col-span-4">
          {details.map(([k, v]) => (
            <div key={k} className="border-l-2 border-accent pl-5">
              <p className="eyebrow text-slate">{k}</p>
              <p className="mt-1 text-lg font-semibold">{v}</p>
            </div>
          ))}
          {!details.length && <p className="text-muted-foreground">Use the form to send your enquiry directly to the CKB team.</p>}
          <WhatsAppLink message="Hello CKB Construction Limited, I would like to make an enquiry. Kindly provide further information." label="Chat with us on WhatsApp" />
        </aside>
        <div className="md:col-span-8">
          {status === "done" ? (
            <div className="bg-secondary p-10 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
              <h2 className="mt-4 font-display text-2xl font-extrabold uppercase">Message received</h2>
              <p className="mt-3 text-muted-foreground">Thank you for contacting CKB. Our team will be in touch.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
              <Field label="Full name" name="full_name" required error={errors["full_name"]}><input id="full_name" name="full_name" className="field" /></Field>
              <Field label="Company / Organisation" name="company"><input id="company" name="company" className="field" /></Field>
              <Field label="Business email" name="email" required error={errors["email"]}><input id="email" name="email" type="email" className="field" /></Field>
              <Field label="Phone number" name="phone"><input id="phone" name="phone" type="tel" className="field" /></Field>
              <Field label="Enquiry type" name="enquiry_type" required error={errors["enquiry_type"]}>
                <select id="enquiry_type" name="enquiry_type" className="field" defaultValue="">
                  <option value="">Select…</option>
                  {enquiryTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Subject" name="subject" required error={errors["subject"]}><input id="subject" name="subject" className="field" /></Field>
              <div className="sm:col-span-2">
                <Field label="Message" name="message" required error={errors["message"]}><textarea id="message" name="message" rows={6} className="field" /></Field>
              </div>
              {status === "error" && <p className="text-destructive sm:col-span-2">{serverError}</p>}
              <div className="sm:col-span-2">
                <button type="submit" disabled={status === "loading"} className="btn-accent disabled:opacity-60">
                  {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />} Send message
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
