import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { images, services } from "@/lib/site";
import { CtaBand, PageHero, WhatsAppLink } from "@/components/site/blocks";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — CKB Construction Limited" },
      { name: "description", content: "Scaffolding supply, construction equipment supply, industrial material supply and HSE manpower support." },
      { property: "og:title", content: "Services — CKB Construction" },
      { property: "og:description", content: "Project support that goes beyond materials and equipment." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Project support that goes beyond materials and equipment." text="From supply of scaffolding and machinery to specialist HSE personnel, CKB supports the practical needs of project teams." image={images.industrialImg} />
      {services.map((s, i) => (
        <section key={s.slug} id={s.slug} className={`scroll-mt-32 py-20 ${i % 2 ? "bg-secondary" : ""}`}>
          <div className="container-site grid gap-12 md:grid-cols-2 md:items-center">
            <img src={s.image} alt="" loading="lazy" className={`aspect-[4/3] w-full object-cover ${i % 2 ? "md:order-2" : ""}`} />
            <div>
              <p className="eyebrow">Service {String(i + 1).padStart(2, "0")}</p>
              <h2 className="display-lg mt-4">{s.title}</h2>
              <p className="mt-5 text-lg text-muted-foreground">{s.summary}</p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest">Typical requirements</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">{s.requirements.map((r) => <li key={r}>— {r}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest">Scope of support</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">{s.scope.map((r) => <li key={r}>— {r}</li>)}</ul>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link to="/quote" search={{ service: s.title }} className="btn-accent">Enquire <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/products" search={{ category: s.related }} className="link-arrow">Related products</Link>
                <WhatsAppLink message={`Hello CKB Construction Limited, I would like to enquire about your ${s.title} service. Kindly provide further information.`} />
              </div>
            </div>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
