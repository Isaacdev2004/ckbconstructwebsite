import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/ckb-logo.jpg";
import { contact } from "@/lib/site";

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products & Supplies" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/hse", label: "HSE & Quality" },
  { to: "/projects", label: "Projects" },
] as const;

export function Logo({ className = "h-12" }: { className?: string }) {
  return <img src={logo} alt="CKB Construction Limited" className={`${className} w-auto object-contain`} />;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-background transition-shadow ${scrolled ? "shadow-elevated" : ""}`}>
      <div className="hidden bg-navy text-on-dark-muted md:block">
        <div className="container-site flex h-9 items-center justify-between text-xs">
          <span className="tracking-[0.18em] uppercase">Construction · Industrial Supplies · HSE Support</span>
          <div className="flex gap-6">
            {contact.phone && <a href={`tel:${contact.phone}`} className="hover:text-on-dark">{contact.phone}</a>}
            {contact.email && <a href={`mailto:${contact.email}`} className="hover:text-on-dark">{contact.email}</a>}
            <Link to="/contact" className="font-semibold text-on-dark hover:text-accent">Contact us</Link>
          </div>
        </div>
      </div>
      <div className="container-site flex h-24 items-center justify-between gap-6 border-b">
        <Link to="/" aria-label="CKB Construction Limited home" className="shrink-0">
          <Logo className="h-20" />
        </Link>
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:underline data-[status=active]:decoration-accent data-[status=active]:decoration-2 data-[status=active]:underline-offset-8"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/quote" className="btn-accent hidden sm:inline-flex">
            Request a Quote
          </Link>
          <button
            className="inline-flex h-11 w-11 items-center justify-center border xl:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-navy/60" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-navy text-on-dark animate-in slide-in-from-right">
            <div className="flex items-center justify-between border-b border-line-dark p-5">
              <span className="eyebrow">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col overflow-y-auto p-5" aria-label="Mobile">
              {navItems.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: n.to === "/" }}
                  className="flex items-center justify-between border-b border-line-dark py-4 font-display text-lg font-bold uppercase data-[status=active]:text-accent"
                >
                  {n.label}
                  <ArrowRight className="h-4 w-4 opacity-50" />
                </Link>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="border-b border-line-dark py-4 font-display text-lg font-bold uppercase">
                Contact Us
              </Link>
            </nav>
            <div className="p-5">
              <Link to="/quote" onClick={() => setOpen(false)} className="btn-accent w-full justify-center">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
