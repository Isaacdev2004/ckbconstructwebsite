import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { categories, images, industries, products, shareMeta, siteUrl } from "@/lib/site";
import { CtaBand, SectionHead } from "@/components/site/blocks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CKB Construction Limited — Construction & Industrial Supplies, Nigeria" },
      { name: "description", content: "Scaffolding systems, construction equipment, PPE, industrial supplies and HSE manpower support for Nigeria's construction and oil & gas sectors." },
      { property: "og:type", content: "website" },
      ...shareMeta(
        "CKB Construction Limited — Construction & Industrial Supplies",
        "Scaffolding, equipment, PPE, industrial supplies and HSE manpower support for demanding project environments.",
      ),
    ],
    links: [{ rel: "canonical", href: siteUrl + "/" }],
  }),
  component: Home,
});

const capabilities = [
  { n: "01", title: "Scaffolding Systems", text: "Scaffolding components, access systems, platforms, fittings and related accessories.", image: images.scaffoldImg, to: "/products" as const, search: { category: "scaffolding" } },
  { n: "02", title: "Construction Equipment", text: "Construction machinery, tools, power equipment, lifting and handling equipment, and site equipment.", image: images.equipmentImg, to: "/products" as const, search: { category: "equipment" } },
  { n: "03", title: "PPE & Industrial Supplies", text: "Personal protective equipment, safety materials, industrial consumables and essential project supplies.", image: images.ppeImg, to: "/products" as const, search: { category: "ppe" } },
  { n: "04", title: "HSE Manpower Support", text: "Access to qualified safety and environmental personnel for construction and industrial operations.", image: images.hseImg, to: "/services" as const, search: undefined },
];

const values = [
  ["Supply-focused solutions", "We concentrate on getting the right equipment and materials to your project."],
  ["Multiple project-support categories", "Scaffolding, equipment, PPE, materials and HSE manpower from one partner."],
  ["Construction & industrial understanding", "We know the operating demands of site and plant environments."],
  ["Safety-conscious supply", "Protective equipment and HSE personnel are core to what we offer."],
  ["Responsive quotation process", "A direct enquiry route from request to response."],
  ["Commitment to dependable service", "Clear communication and follow-through on every enquiry."],
];

const featured = ["Scaffolding Tubes", "Scaffolding Boards", "Generators", "Power Tools", "Safety Helmets", "Industrial Consumables"];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy text-on-dark">
        <img src={images.heroImg} alt="Scaffolding around an industrial processing facility at sunset" width={1920} height={1088} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="container-site grid min-h-[78vh] items-end gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-8">
            <p className="eyebrow">Construction | Industrial Supplies | HSE Support</p>
            <h1 className="display-xl mt-6">Building project confidence through reliable industrial supplies.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-on-dark-muted">
              From scaffolding systems and construction equipment to industrial supplies and specialist HSE personnel, CKB Construction Limited supports the demands of Nigeria's construction and industrial sectors.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/quote" className="btn-accent">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
              <a href="#capabilities" className="btn-outline-light">Explore our capabilities</a>
            </div>
          </div>
          <div className="hidden md:col-span-4 md:block">
            <div className="border-l-2 border-accent pl-6">
              {categories.map((c) => (
                <Link key={c.slug} to="/products" search={{ category: c.slug }} className="flex items-center justify-between border-b border-line-dark py-3 text-sm font-semibold hover:text-accent">
                  <span><span className="mr-3 text-accent">{c.code}</span>{c.name}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="container-site grid gap-12 py-24 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">Who we are</p>
          <h2 className="display-lg mt-4">The supplies and support your projects depend on.</h2>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7">
          <p>
            CKB Construction Limited provides essential construction equipment, scaffolding systems, industrial materials, personal protective equipment and specialist manpower support to construction, industrial and infrastructure projects.
          </p>
          <p>
            We work as a practical procurement and project-support partner — helping clients source the equipment they need, obtain essential materials, and access skilled safety personnel.
          </p>
          <Link to="/about" className="link-arrow text-foreground">About CKB <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="bg-secondary py-24">
        <div className="container-site">
          <SectionHead eyebrow="Core capabilities" title="Four ways we support project delivery." />
          <div className="mt-14 grid gap-6 md:grid-cols-12">
            {capabilities.map((c, i) => (
              <Link
                key={c.n}
                to={c.to}
                search={c.search as never}
                className={`group relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden bg-navy p-8 text-on-dark ${i === 0 || i === 3 ? "md:col-span-7" : "md:col-span-5"}`}
              >
                <img src={c.image} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 -z-10 bg-fade-overlay" />
                <span className="absolute left-8 top-8 font-display text-5xl font-black text-accent">{c.n}</span>
                <h3 className="font-display text-2xl font-extrabold uppercase">{c.title}</h3>
                <p className="mt-3 max-w-md text-on-dark-muted">{c.text}</p>
                <span className="link-arrow mt-6 w-fit">Explore <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CKB */}
      <section className="container-site grid gap-14 py-24 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="sticky top-32">
            <p className="eyebrow">Why CKB</p>
            <h2 className="display-lg mt-4">A practical partner for demanding project environments.</h2>
            <img src={images.industrialImg} alt="Welder working on steel pipework" loading="lazy" className="mt-10 aspect-[4/3] w-full object-cover" />
          </div>
        </div>
        <ol className="md:col-span-6 md:col-start-7">
          {values.map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 border-b py-7 first:border-t">
              <span className="font-display text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-xl font-bold uppercase">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-graphite py-24 text-on-dark">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead dark eyebrow="Industries we support" title="Built for the sectors that keep projects moving." />
            <Link to="/industries" className="link-arrow">All industries <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-14 grid gap-px bg-line-dark md:grid-cols-5">
            {industries.map((ind) => (
              <div key={ind.name} className="group relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden bg-graphite p-6">
                <img src={ind.image} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40 transition-opacity group-hover:opacity-70" />
                <div className="absolute inset-0 -z-10 bg-fade-overlay" />
                <h3 className="font-display text-lg font-extrabold uppercase">{ind.name}</h3>
                <p className="mt-3 text-sm text-on-dark-muted">{ind.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-site py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Featured categories" title="Equipment and supplies on request." />
          <Link to="/products" className="link-arrow">Full catalogue <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((name) => {
            const prod = products.find((x) => x.name === name)!;
            const cat = categories.find((c) => c.slug === prod.category)!;
            return (
              <Link key={name} to="/products/$slug" params={{ slug: prod.slug }} className="group">
                <div className="overflow-hidden"><img src={prod.image} alt={prod.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                <p className="eyebrow mt-5 text-slate">{cat.short}</p>
                <h3 className="mt-2 flex items-center justify-between font-display text-xl font-bold uppercase">{prod.name} <ArrowUpRight className="h-5 w-5 text-accent" /></h3>
              </Link>
            );
          })}
        </div>
      </section>

      {/* HSE */}
      <section className="grid bg-navy text-on-dark md:grid-cols-2">
        <img src={images.hseImg} alt="HSE officer inspecting an industrial site" loading="lazy" className="h-full max-h-[640px] w-full object-cover" />
        <div className="flex flex-col justify-center p-10 md:p-16">
          <p className="eyebrow">HSE &amp; Safety</p>
          <h2 className="display-lg mt-4">Safety is an essential part of every successful project.</h2>
          <p className="mt-6 text-lg leading-relaxed text-on-dark-muted">
            Alongside PPE and safety supplies, CKB supports clients with safety and environmental personnel — HSE officers, supervisors, managers, safety engineers and environmental specialists — subject to project requirements and availability.
          </p>
          <Link to="/hse" className="btn-accent mt-10 w-fit">Explore HSE Services <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="container-site grid gap-12 py-24 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">Projects &amp; experience</p>
          <h2 className="display-lg mt-4">What we supply to a project.</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Scaffolding, equipment, industrial materials, PPE and HSE cover for construction, industrial and oil and gas sites.
          </p>
          <Link to="/projects" className="link-arrow mt-8">View project support <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-3 gap-3 md:col-span-7">
          {[
            { title: "Scaffolding", image: images.scaffoldImg },
            { title: "Industrial supply", image: images.industrialImg },
            { title: "HSE support", image: images.hseImg },
          ].map((item) => (
            <Link key={item.title} to="/projects" className="group">
              <div className="overflow-hidden">
                <img src={item.image} alt="" className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <p className="mt-3 font-display text-sm font-bold uppercase">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
