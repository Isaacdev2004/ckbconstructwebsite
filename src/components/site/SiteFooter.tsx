import { Link } from "@tanstack/react-router";
import { Logo, navItems } from "./SiteHeader";
import { categories, contact, services } from "@/lib/site";

export function SiteFooter() {
  const hasContact = Object.values(contact).some(Boolean);
  return (
    <footer className="bg-graphite text-on-dark-muted">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="inline-block bg-background p-3"><Logo className="h-28" /></div>
          <p className="mt-6 font-display text-lg font-bold uppercase leading-snug text-on-dark">
            Your trusted partner in construction &amp; industrial supplies.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Delivering quality equipment, reliable supplies and skilled professionals to Nigeria's oil &amp; gas and construction industries.
          </p>
        </div>
        <FooterCol title="Company">
          {navItems.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-on-dark">{n.label}</Link>
          ))}
          <Link to="/contact" className="hover:text-on-dark">Contact Us</Link>
        </FooterCol>
        <FooterCol title="Products">
          {categories.map((c) => (
            <Link key={c.slug} to="/products" search={{ category: c.slug }} className="hover:text-on-dark">{c.name}</Link>
          ))}
        </FooterCol>
        <FooterCol title="Services">
          {services.map((s) => (
            <Link key={s.slug} to="/services" hash={s.slug} className="hover:text-on-dark">{s.title}</Link>
          ))}
        </FooterCol>
        <FooterCol title="Contact">
          {contact.address && <span>{contact.address}</span>}
          {contact.phone && <a href={`tel:${contact.phone}`} className="hover:text-on-dark">{contact.phone}</a>}
          {contact.email && <a href={`mailto:${contact.email}`} className="hover:text-on-dark">{contact.email}</a>}
          {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-on-dark">LinkedIn</a>}
          {!hasContact && <span>Send us an enquiry and our team will respond.</span>}
          <Link to="/quote" className="font-semibold text-accent">Request a Quote →</Link>
        </FooterCol>
      </div>
      <div className="border-t border-line-dark">
        <div className="container-site flex flex-col gap-2 py-6 text-xs md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} CKB Construction Limited. All rights reserved.</span>
          <span className="tracking-[0.18em] uppercase">Health · Safety · Construction</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="md:col-span-2">
      <h3 className="eyebrow mb-5">{title}</h3>
      <div className="flex flex-col gap-3 text-sm">{children}</div>
    </div>
  );
}
