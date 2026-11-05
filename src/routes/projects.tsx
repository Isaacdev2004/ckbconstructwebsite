import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/site";
import { CtaBand, PageHero } from "@/components/site/blocks";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects & Experience — CKB Construction Limited" },
      { name: "description", content: "Scaffolding, construction equipment, industrial materials, PPE and HSE personnel for construction, infrastructure, industrial and oil and gas projects." },
      { property: "og:title", content: "Projects & Experience — CKB Construction" },
      { property: "og:description", content: "What CKB supplies to construction, industrial and oil and gas projects." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Projects,
});

const areas: { category: string; title: string; text: string; image: string; service?: string }[] = [
  {
    category: "Scaffolding",
    title: "Access at height",
    text: "Tubes, fittings, frames, ringlock, cuplock, boards, platforms and access towers for façades, maintenance and multi-storey work.",
    image: images.scaffoldImg,
    service: "Scaffolding Supply",
  },
  {
    category: "Construction",
    title: "Building and civil sites",
    text: "Machinery, power equipment, lifting gear and site tools for building, civil engineering and infrastructure works.",
    image: images.equipmentImg,
    service: "Construction Equipment Supply",
  },
  {
    category: "Industrial supply",
    title: "Plant and operating sites",
    text: "Building materials, consumables, and electrical and mechanical supplies for facilities, shutdowns and ongoing operations.",
    image: images.industrialImg,
    service: "Industrial & Material Supply",
  },
  {
    category: "PPE",
    title: "Protective equipment",
    text: "Helmets, footwear, hi-vis, harnesses and the rest of the kit a crew needs before work starts.",
    image: images.ppeImg,
    service: "PPE & Safety Supplies",
  },
  {
    category: "Oil & gas",
    title: "Facilities and maintenance",
    text: "Access, safety equipment and HSE personnel for operational sites, turnarounds and plant maintenance.",
    image: images.heroImg,
  },
  {
    category: "HSE support",
    title: "Safety cover on site",
    text: "HSE officers, supervisors, managers, safety engineers and environmental personnel, supplied to the client's requirements and subject to availability.",
    image: images.hseImg,
    service: "HSE Manpower Support",
  },
];

function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Projects & experience"
        title="What we supply to a project."
        text="Scaffolding and access, construction equipment, industrial materials, PPE and HSE personnel for construction, infrastructure, industrial and oil and gas sites."
        image={images.scaffoldImg}
      />
      <section className="container-site py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">Project support</p>
            <h2 className="display-lg mt-4">Quoted to the site, the quantities and the timeline.</h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground md:col-span-5">
            One enquiry can cover access, machinery, materials and safety cover. Share the location and what the job needs, and the team will respond with a quotation.
          </p>
        </div>
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <article key={area.title} className="flex flex-col">
              <div className="overflow-hidden">
                <img src={area.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </div>
              <p className="eyebrow mt-5 text-slate">{area.category}</p>
              <h3 className="mt-2 font-display text-xl font-bold uppercase">{area.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{area.text}</p>
              <Link to="/quote" search={area.service ? { service: area.service } : {}} className="link-arrow mt-5 w-fit">
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CtaBand
        title="Tell us what the project needs."
        text="Location, quantities and timing are enough to start. Our team will review the requirement and come back with a quotation."
      />
    </>
  );
}
