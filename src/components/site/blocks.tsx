import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink, whatsappMessageFor } from "@/lib/site";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-on-dark">
      <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="container-site py-24 md:py-32">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-xl mt-5 max-w-4xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-on-dark-muted">{text}</p>
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, text, dark = false }: { eyebrow: string; title: string; text?: string; dark?: boolean }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-lg mt-4">{title}</h2>
      {text && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-on-dark-muted" : "text-muted-foreground"}`}>{text}</p>}
    </div>
  );
}

export function CtaBand({
  title = "Planning your next project? Let's discuss your supply requirements.",
  text = "Tell us what your project needs. Our team can review your requirements and help you make an enquiry.",
}: { title?: string; text?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy text-on-dark">
      <div className="absolute -right-24 top-0 h-full w-1/3 skew-x-[-18deg] bg-accent/10" />
      <div className="container-site relative grid gap-10 py-20 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="eyebrow">Start an enquiry</p>
          <h2 className="display-lg mt-4">{title}</h2>
          <p className="mt-5 max-w-xl text-on-dark-muted">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
          <Link to="/quote" className="btn-accent">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/contact" className="btn-outline-light">Contact CKB</Link>
        </div>
      </div>
    </section>
  );
}

export function WhatsAppLink({ message, label = "Enquire on WhatsApp", className = "" }: { message: string; label?: string; className?: string }) {
  const href = whatsappLink(message);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 text-sm font-bold text-whatsapp hover:underline ${className}`}>
      <MessageCircle className="h-4 w-4" /> {label}
    </a>
  );
}

export function WhatsAppFloat() {
  const location = useRouterState({ select: (s) => s.location });
  const href = whatsappLink(whatsappMessageFor(location.pathname, location.search as Record<string, unknown>));
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with CKB on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-on-dark shadow-elevated transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

export function Placeholder({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-2 border-dashed border-input bg-secondary p-8">
      <p className="eyebrow text-slate">Awaiting verified content</p>
      <h3 className="mt-3 font-display text-xl font-bold uppercase">{title}</h3>
      <p className="mt-2 text-muted-foreground">{text}</p>
    </div>
  );
}

export function Field({ label, name, error, required, children }: { label: string; name: string; error?: string | undefined; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block" htmlFor={name}>
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider">{label}{required && <span className="text-accent"> *</span>}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-destructive">{error}</span>}
    </label>
  );
}
