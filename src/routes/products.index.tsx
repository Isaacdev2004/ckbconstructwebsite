import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo } from "react";
import { z } from "zod";
import { categories, images, products } from "@/lib/site";
import { CtaBand, PageHero } from "@/components/site/blocks";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/products/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Products & Supplies — CKB Construction Limited" },
      { name: "description", content: "Scaffolding systems, construction equipment, PPE and industrial supplies available on request from CKB Construction Limited." },
      { property: "og:title", content: "Products & Supplies — CKB Construction" },
      { property: "og:description", content: "Equipment, materials and essential supplies for project delivery." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Products,
});

function Products() {
  const { category, q } = Route.useSearch();
  const navigate = useNavigate({ from: "/products/" });
  const list = useMemo(() => {
    const term = (q ?? "").toLowerCase();
    return products.filter(
      (p) => (!category || p.category === category) && (!term || p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)),
    );
  }, [category, q]);

  return (
    <>
      <PageHero
        eyebrow="Products & supplies"
        title="Equipment, materials and essential supplies for project delivery."
        text="Explore CKB's range of scaffolding systems, construction equipment, PPE, industrial materials, and project supplies. All items are supplied on quotation."
        image={images.scaffoldImg}
      />
      <section className="container-site py-16">
        <div className="flex flex-col gap-6 border-b pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
            <FilterChip active={!category} onClick={() => navigate({ search: (s) => ({ ...s, category: undefined }) })}>All</FilterChip>
            {categories.map((c) => (
              <FilterChip key={c.slug} active={category === c.slug} onClick={() => navigate({ search: (s) => ({ ...s, category: c.slug }) })}>
                {c.short}
              </FilterChip>
            ))}
          </div>
          <label className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="field pl-10"
              placeholder="Search the catalogue"
              value={q ?? ""}
              onChange={(e) => navigate({ search: (s) => ({ ...s, q: e.target.value || undefined }), replace: true })}
              aria-label="Search products"
            />
          </label>
        </div>

        {categories
          .filter((c) => !category || c.slug === category)
          .map((c) => {
            const items = list.filter((p) => p.category === c.slug);
            if (!items.length) return null;
            return (
              <div key={c.slug} className="mt-14">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-3xl font-black text-accent">{c.code}</span>
                  <h2 className="font-display text-2xl font-extrabold uppercase">{c.name}</h2>
                </div>
                <p className="mt-2 text-muted-foreground">{c.description}</p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((p) => (
                    <article key={p.slug} className="flex flex-col border bg-card">
                      <img src={p.image} alt={p.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                      <div className="flex flex-1 flex-col p-5">
                        <p className="eyebrow text-slate">{c.short}</p>
                        <h3 className="mt-2 font-display text-lg font-bold uppercase">{p.name}</h3>
                        <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
                        <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4 text-xs font-bold uppercase tracking-wider">
                          <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-accent">View details</Link>
                          <Link to="/quote" search={{ product: p.name, category: c.name }} className="text-accent hover:underline">Request quote</Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        {!list.length && <p className="py-20 text-center text-muted-foreground">No products match your search. Try another term, or request a quote describing what you need.</p>}
      </section>
      <CtaBand title="Can't find what you need?" text="Describe the item and quantity — our team will review whether it can be sourced for your project." />
    </>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${active ? "bg-navy text-on-dark" : "border hover:border-foreground"}`}
    >
      {children}
    </button>
  );
}
