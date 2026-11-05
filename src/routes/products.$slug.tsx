import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getCategory, getProduct, products } from "@/lib/site";
import { WhatsAppLink } from "@/components/site/blocks";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product, category: getCategory(product.category)! };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — CKB Construction Limited` },
          { name: "description", content: `${loaderData.product.description} Request a quotation from CKB Construction Limited.` },
          { property: "og:title", content: `${loaderData.product.name} — CKB Construction` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:type", content: "product" },
        ]
      : [{ title: "Product unavailable — CKB Construction" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="container-site py-32 text-center">
      <h1 className="display-lg">Product not found</h1>
      <Link to="/products" className="link-arrow mt-8">Back to catalogue</Link>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product, category } = Route.useLoaderData();
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  return (
    <>
      <section className="container-site py-12">
        <Link to="/products" search={{ category: category.slug }} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {category.name}
        </Link>
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover" />
          <div>
            <p className="eyebrow">{category.name}</p>
            <h1 className="display-lg mt-4">{product.name}</h1>
            <p className="mt-6 text-lg text-muted-foreground">{product.description}</p>
            <div className="mt-8 border-l-2 border-accent bg-secondary p-5 text-sm text-muted-foreground">
              Specifications, sizes and availability are confirmed on quotation. Share your quantity, project location and timeline so our team can respond accurately.
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link to="/quote" search={{ product: product.name, category: category.name }} className="btn-accent">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <WhatsAppLink message={`Hello CKB Construction Limited, I would like to enquire about ${product.name}. Kindly provide further information.`} />
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="bg-secondary py-16">
          <div className="container-site">
            <h2 className="font-display text-2xl font-extrabold uppercase">Related products</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <Link key={r.slug} to="/products/$slug" params={{ slug: r.slug }} className="overflow-hidden border bg-card hover:border-foreground">
                  <img src={r.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <div className="p-5">
                    <p className="eyebrow text-slate">{category.short}</p>
                    <h3 className="mt-2 font-display font-bold uppercase">{r.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
