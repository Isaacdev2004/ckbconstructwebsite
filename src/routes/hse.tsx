import { createFileRoute, Link } from "@tanstack/react-router";
import { images, products, services } from "@/lib/site";
import { CtaBand, PageHero, Placeholder, SectionHead } from "@/components/site/blocks";

export const Route = createFileRoute("/hse")({
  head: () => ({
    meta: [
      { title: "HSE & Quality — CKB Construction Limited" },
      { name: "description", content: "HSE manpower, PPE and safety supplies, and a quality-focused approach to supply from CKB Construction Limited." },
      { property: "og:title", content: "HSE & Quality — CKB Construction" },
      { property: "og:description", content: "Committed to safer operations and quality-focused support." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Hse,
});

function Hse() {
  const roles = services.find((s) => s.slug === "hse-manpower")!.scope;
  const ppe = products.filter((p) => p.category === "ppe");
  return (
    <>
      <PageHero eyebrow="HSE & Quality" title="Committed to safer operations and quality-focused support." text="Health, safety and environmental performance shapes every construction and industrial project. We build it into how we supply." image={images.hseImg} />
      <section className="container-site grid gap-12 py-24 md:grid-cols-12">
        <div className="md:col-span-5"><SectionHead eyebrow="HSE philosophy" title="Safety is planned, equipped and staffed." /></div>
        <div className="space-y-5 text-lg text-muted-foreground md:col-span-6 md:col-start-7">
          <p>Construction and industrial environments carry real risk — work at height, heavy equipment, hazardous materials and high-noise operations. Protecting people and the environment depends on the right equipment and competent personnel.</p>
          <p>CKB supports this with protective equipment, safety supplies and access to qualified HSE professionals.</p>
        </div>
      </section>
      <section className="bg-navy py-24 text-on-dark">
        <div className="container-site">
          <SectionHead dark eyebrow="HSE manpower" title="Safety and environmental personnel." text="Roles supplied subject to personnel availability and client requirements." />
          <div className="mt-12 grid gap-px bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((r) => <div key={r} className="bg-navy p-6 font-display font-bold uppercase">{r}</div>)}
          </div>
        </div>
      </section>
      <section className="container-site py-24">
        <SectionHead eyebrow="PPE & safety supplies" title="Protective equipment for every crew." />
        <div className="mt-10 flex flex-wrap gap-3">
          {ppe.map((p) => <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="border px-4 py-2 text-sm font-semibold hover:border-accent">{p.name}</Link>)}
        </div>
      </section>
      <section className="bg-secondary py-24">
        <div className="container-site grid gap-12 md:grid-cols-2">
          <div>
            <SectionHead eyebrow="Quality approach" title="Dependable supply, matched to requirements." />
            <p className="mt-6 text-lg text-muted-foreground">We aim to supply products appropriate to each client's stated requirements, communicate clearly on what can be sourced, and follow through professionally on every order.</p>
          </div>
          <Placeholder title="Certifications & Compliance" text="Verified certifications, registrations and industry approvals will be displayed here once documentation is supplied." />
        </div>
      </section>
      <CtaBand title="Discuss your HSE manpower and PPE requirements." text="Tell us about your site, crew size and safety needs." />
    </>
  );
}
