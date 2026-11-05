import { createFileRoute, Link } from "@tanstack/react-router";
import { images, industries } from "@/lib/site";
import { CtaBand, PageHero } from "@/components/site/blocks";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — CKB Construction Limited" },
      { name: "description", content: "Supply and HSE support for oil & gas, construction, infrastructure, industrial operations and EPC projects." },
      { property: "og:title", content: "Industries We Serve — CKB Construction" },
      { property: "og:description", content: "Supporting the industries that keep projects moving." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Industries,
});

function Industries() {
  return (
    <>
      <PageHero eyebrow="Industries" title="Supporting the industries that keep projects moving." text="How CKB's products and services apply to different operating environments." image={images.heroImg} />
      <section className="container-site py-20">
        {industries.map((ind, i) => (
          <article key={ind.name} className="grid gap-10 border-b py-14 md:grid-cols-12 md:items-center">
            <span className="font-display text-5xl font-black text-accent md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <div className="md:col-span-5">
              <h2 className="font-display text-3xl font-extrabold uppercase">{ind.name}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{ind.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {ind.needs.map((n) => <li key={n} className="border px-3 py-1 text-xs font-bold uppercase tracking-wider">{n}</li>)}
              </ul>
              <Link to="/quote" search={{ service: ind.name }} className="link-arrow mt-8">Discuss requirements</Link>
            </div>
            <img src={ind.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover md:col-span-6" />
          </article>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
