import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { contact, images, categories, whatsappLink } from "@/lib/site";
import { CtaBand, PageHero, SectionHead } from "@/components/site/blocks";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — CKB Construction Limited" },
      { name: "description", content: "CKB Construction Limited provides construction and industrial supplies, equipment, materials and HSE manpower support in Nigeria." },
      { property: "og:title", content: "About CKB Construction Limited" },
      { property: "og:description", content: "Supporting the people and projects that build industries." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: About,
});

const coreValues = ["Reliability", "Integrity", "Quality", "Safety", "Professionalism", "Responsiveness"];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Supporting the people and projects that build industries."
        text="CKB Construction Limited provides construction and industrial supply solutions, equipment, materials, and specialist HSE manpower support for demanding project environments."
        image={images.equipmentImg}
      />

      <section className="container-site grid gap-12 py-24 md:grid-cols-12">
        <div className="md:col-span-5"><SectionHead eyebrow="Company overview" title="A project-support partner, not just a vendor." /></div>
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7">
          <p>CKB Construction Limited is a Nigerian company supplying scaffolding systems, construction equipment, personal protective equipment, industrial materials and construction supplies.</p>
          <p>We serve oil and gas, construction and civil engineering, infrastructure, industrial operations and EPC projects — sectors where dependable supply and a strong safety culture directly affect project outcomes.</p>
          <p>Beyond materials, we support clients with specialist HSE personnel, helping project teams maintain safer operations on site.</p>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <div className="border-t-2 border-accent bg-card p-10 shadow-elevated">
            <p className="eyebrow">Our mission</p>
            <h2 className="mt-4 font-display text-2xl font-extrabold uppercase">Delivering reliability. Supporting progress.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">To provide reliable construction and industrial supply solutions, quality equipment, essential materials, and skilled HSE personnel that support safe, efficient, and successful project delivery.</p>
          </div>
          <div className="border-t-2 border-accent bg-card p-10 shadow-elevated">
            <p className="eyebrow">Our vision</p>
            <h2 className="mt-4 font-display text-2xl font-extrabold uppercase">A trusted partner in building tomorrow.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">To become a trusted and recognised partner in Nigeria's construction and industrial sectors, known for dependable supplies, quality service, safety-conscious solutions, and lasting business relationships.</p>
          </div>
        </div>
      </section>

      <section className="container-site py-24">
        <SectionHead eyebrow="Core values" title="What guides how we work." />
        <div className="mt-12 grid grid-cols-2 border-l border-t md:grid-cols-3">
          {coreValues.map((v, i) => (
            <div key={v} className="border-b border-r p-8">
              <span className="font-display text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-2xl font-extrabold uppercase">{v}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy py-24 text-on-dark">
        <div className="container-site">
          <SectionHead dark eyebrow="What we do" title="Supply and support across four categories." />
          <div className="mt-12 grid gap-px bg-line-dark md:grid-cols-4">
            {categories.map((c) => (
              <Link key={c.slug} to="/products" search={{ category: c.slug }} className="group bg-navy p-8 hover:bg-graphite">
                <span className="font-display text-4xl font-black text-accent">{c.code}</span>
                <h3 className="mt-6 font-display text-lg font-bold uppercase">{c.name}</h3>
                <p className="mt-3 text-sm text-on-dark-muted">{c.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex gap-6">
            <Link to="/products" className="link-arrow">Products &amp; supplies <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/services" className="link-arrow">Services <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 py-24 md:grid-cols-12">
        <div className="md:col-span-5"><SectionHead eyebrow="Why work with CKB" title="Fewer suppliers. Clearer communication." /></div>
        <ul className="space-y-6 md:col-span-6 md:col-start-7">
          {[
            "One point of contact for scaffolding, equipment, PPE, materials and HSE personnel.",
            "Quotations based on your actual quantities, location and delivery timeline.",
            "Safety considered alongside supply — protective equipment and HSE support in one place.",
            "A direct enquiry process by form, phone or WhatsApp.",
          ].map((t) => (
            <li key={t} className="border-l-2 border-accent pl-5 text-lg">{t}</li>
          ))}
        </ul>
      </section>

      <section className="container-site py-24">
        <div className="relative overflow-hidden bg-navy p-10 text-on-dark md:p-16">
          <div className="absolute -right-24 top-0 h-full w-1/3 skew-x-[-18deg] bg-accent/10" />
          <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <p className="eyebrow">Work with us</p>
              <h2 className="display-lg mt-4 max-w-2xl">Need supplies, equipment or HSE support for your project?</h2>
              <p className="mt-5 max-w-xl text-lg text-on-dark-muted">Request a quote with your quantities and delivery location, or reach the team directly — we respond during business hours.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/quote" className="btn-accent">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/contact" className="btn-outline-light">Contact the Team</Link>
              </div>
            </div>
            <div className="border-t border-line-dark pt-8 md:col-span-5 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <p className="text-xs font-bold uppercase tracking-wider text-on-dark-muted">Or reach us directly</p>
              {contact.phone && (
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="mt-4 block font-display text-2xl font-extrabold tracking-wide hover:text-accent">{contact.phone}</a>
              )}
              {whatsappLink("Hello CKB, I have an enquiry about your supplies and services.") && (
                <a href={whatsappLink("Hello CKB, I have an enquiry about your supplies and services.")!} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-whatsapp hover:underline">
                  <MessageCircle className="h-4 w-4" /> Chat with us on WhatsApp
                </a>
              )}
              <p className="mt-4 text-sm text-on-dark-muted">{contact.hours}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
