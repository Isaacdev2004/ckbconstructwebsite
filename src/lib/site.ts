import scaffoldImg from "@/assets/scaffold-materials.jpg";
import equipmentImg from "@/assets/equipment.jpg";
import ppeImg from "@/assets/ppe.jpg";
import industrialImg from "@/assets/industrial.jpg";
import hseImg from "@/assets/hse-officer.jpg";
import heroImg from "@/assets/hero-scaffolding.jpg";

export const images = { scaffoldImg, equipmentImg, ppeImg, industrialImg, hseImg, heroImg };

/**
 * Verified company contact details. Leave a value as null until CKB confirms it —
 * nothing is shown on the site for null values.
 */
export const contact = {
  phone: "+234 805 894 6527" as string | null,
  email: null as string | null,
  whatsapp: "2348058946527" as string | null, // international format, digits only
  address: "18 Worukwo Street, Oroworukwo Town, Port Harcourt, Rivers State" as string | null,
  hours: "Monday – Saturday, 8:00am – 5:00pm" as string | null,
  linkedin: null as string | null,
};

export function whatsappLink(message: string) {
  if (!contact.whatsapp) return null;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

const GREETING = "Hello CKB Construction Limited,";

/** Builds a prefilled WhatsApp message that names the page or item the visitor is asking about. */
export function whatsappMessageFor(pathname: string, search: Record<string, unknown> = {}): string {
  if (pathname.startsWith("/products/")) {
    const product = getProduct(pathname.split("/").pop() ?? "");
    if (product) return `${GREETING} I would like to enquire about ${product.name}. Kindly provide further information.`;
  }
  if (pathname === "/quote") {
    const parts = [search["product"], search["service"], search["category"] && getCategory(String(search["category"]))?.name]
      .filter(Boolean)
      .map(String);
    return parts.length
      ? `${GREETING} I would like to request a quote for ${parts.join(" — ")}.`
      : `${GREETING} I would like to request a quote.`;
  }
  const topics: Record<string, string> = {
    "/products": "your products and supplies",
    "/services": "your services",
    "/industries": "supply for my industry",
    "/hse": "your HSE and quality support",
    "/projects": "your past projects",
    "/about": "your company",
    "/contact": "an enquiry",
  };
  const topic = topics[pathname];
  if (topic) return `${GREETING} I am on your website and would like to ask about ${topic}.`;
  return `${GREETING} I would like to make an enquiry. Kindly provide further information.`;
}

export type Category = {
  slug: string;
  code: string;
  name: string;
  short: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "scaffolding",
    code: "A",
    name: "Scaffolding Systems & Accessories",
    short: "Scaffolding",
    description: "Tubes, fittings, boards, frames and system scaffolding for safe access at height.",
    image: scaffoldImg,
  },
  {
    slug: "equipment",
    code: "B",
    name: "Construction Equipment",
    short: "Equipment",
    description: "Machinery, power equipment, lifting and handling equipment for active sites.",
    image: equipmentImg,
  },
  {
    slug: "ppe",
    code: "C",
    name: "Personal Protective Equipment",
    short: "PPE",
    description: "Head-to-toe protective equipment for construction and industrial workforces.",
    image: ppeImg,
  },
  {
    slug: "supplies",
    code: "D",
    name: "Industrial & Construction Supplies",
    short: "Supplies",
    description: "Building materials, consumables, electrical and mechanical project supplies.",
    image: industrialImg,
  },
];

export type Product = { slug: string; name: string; category: string; description: string; image: string };

const productPhotos = import.meta.glob("../assets/products/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function photoFor(slug: string, fallback: string) {
  const match = Object.entries(productPhotos).find(([path]) => path.endsWith(`/${slug}.jpg`));
  return match?.[1] ?? fallback;
}

const p = (category: string, name: string, description: string): Product => {
  const slug = name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const fallback = categories.find((c) => c.slug === category)?.image ?? scaffoldImg;
  return { slug, name, category, description, image: photoFor(slug, fallback) };
};

export const products: Product[] = [
  p("scaffolding", "Scaffolding Tubes", "Steel scaffolding tubes for tube-and-fitting access structures."),
  p("scaffolding", "Couplers & Fittings", "Couplers, clamps and fittings for connecting scaffold tubes."),
  p("scaffolding", "Scaffolding Boards", "Boards for forming working decks on scaffold structures."),
  p("scaffolding", "Working Platforms", "Platforms that provide stable working surfaces at height."),
  p("scaffolding", "Adjustable Base Jacks", "Base jacks for levelling scaffold structures on uneven ground."),
  p("scaffolding", "Scaffolding Frames", "Frame scaffolding sections for fast, repeatable erection."),
  p("scaffolding", "Ringlock Systems", "Modular ringlock system scaffolding components."),
  p("scaffolding", "Cuplock Systems", "Cuplock system scaffolding components for access and support."),
  p("scaffolding", "Scaffolding Ladders", "Ladders for access between scaffold levels."),
  p("scaffolding", "Access Towers", "Mobile and static access towers for maintenance and installation."),
  p("scaffolding", "Scaffolding Accessories", "Toe boards, guardrail components and related accessories."),
  p("equipment", "Concrete Mixers", "Mixers for on-site concrete production."),
  p("equipment", "Concrete Vibrators", "Vibrators for consolidating poured concrete."),
  p("equipment", "Compaction Equipment", "Plate compactors, rammers and rollers for soil and asphalt."),
  p("equipment", "Generators", "Power generation for sites and industrial facilities."),
  p("equipment", "Welding Equipment", "Welding machines and accessories for fabrication work."),
  p("equipment", "Cutting Equipment", "Cutting machines and tools for steel, concrete and masonry."),
  p("equipment", "Power Tools", "Drills, grinders, saws and other professional power tools."),
  p("equipment", "Industrial Pumps", "Pumps for dewatering, transfer and site operations."),
  p("equipment", "Lifting Equipment", "Hoists, chain blocks, slings and lifting accessories."),
  p("equipment", "Material-Handling Equipment", "Equipment for moving materials safely around site."),
  p("ppe", "Safety Helmets", "Hard hats for head protection on construction and industrial sites."),
  p("ppe", "Safety Boots", "Protective footwear for site and plant environments."),
  p("ppe", "High-Visibility Clothing", "Hi-vis vests and garments for worker visibility."),
  p("ppe", "Protective Gloves", "Gloves for handling, cutting and chemical risks."),
  p("ppe", "Coveralls", "Protective coveralls for industrial and site work."),
  p("ppe", "Safety Goggles", "Eye protection against dust, debris and splashes."),
  p("ppe", "Respiratory Protection", "Masks and respirators for airborne hazards."),
  p("ppe", "Hearing Protection", "Earplugs and earmuffs for high-noise environments."),
  p("ppe", "Safety Harnesses", "Full-body harnesses for work at height."),
  p("ppe", "Fall-Protection Equipment", "Lanyards, anchors and fall-arrest equipment."),
  p("supplies", "Building Materials", "General building materials for construction projects."),
  p("supplies", "Industrial Consumables", "Consumables that keep industrial operations running."),
  p("supplies", "Electrical Supplies", "Electrical materials and components for project use."),
  p("supplies", "Mechanical Supplies", "Mechanical components and supplies for maintenance and builds."),
  p("supplies", "Construction Tools", "Hand tools and site tools for construction crews."),
  p("supplies", "General Project Materials", "Other essential materials sourced to project requirements."),
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((x) => x.slug === slug);

export const services = [
  {
    slug: "scaffolding-supply",
    title: "Scaffolding Supply",
    image: scaffoldImg,
    summary:
      "Supply of scaffolding systems, components, fittings, access equipment and related materials for construction, maintenance and industrial access work.",
    requirements: ["Access for building and civil works", "Plant maintenance and shutdown access", "Replacement components and fittings", "System scaffolding for repeat use"],
    scope: ["Tube-and-fitting components", "Ringlock and cuplock systems", "Boards, platforms and ladders", "Access towers and accessories"],
    related: "scaffolding",
  },
  {
    slug: "equipment-supply",
    title: "Construction Equipment Supply",
    image: equipmentImg,
    summary:
      "Provision of construction machinery, power equipment, tools and project-support equipment that keeps sites productive.",
    requirements: ["Mobilising a new site", "Concrete and compaction works", "Site power and pumping", "Lifting and material handling"],
    scope: ["Concrete mixers and vibrators", "Generators and pumps", "Welding and cutting equipment", "Power tools and lifting gear"],
    related: "equipment",
  },
  {
    slug: "industrial-supply",
    title: "Industrial & Material Supply",
    image: industrialImg,
    summary:
      "Support for procurement requirements involving industrial materials, consumables, PPE and related project supplies.",
    requirements: ["Recurring consumables for operations", "Material lists for project phases", "PPE for new or growing crews", "Hard-to-source items"],
    scope: ["Building and project materials", "Electrical and mechanical supplies", "Industrial consumables", "PPE and safety supplies"],
    related: "supplies",
  },
  {
    slug: "hse-manpower",
    title: "HSE Manpower Support",
    image: hseImg,
    summary:
      "Provision of safety and environmental personnel to support construction and industrial operations. Roles are supplied subject to personnel availability and the client's requirements.",
    requirements: ["Safety cover for new projects", "Shutdown and turnaround support", "Permit-to-work coordination", "Environmental monitoring"],
    scope: ["HSE Officers", "HSE Supervisors", "HSE Managers", "Safety Engineers", "Environmental Officers", "Environmental Advisors", "Fire and Safety Officers", "Permit-to-Work Coordinators"],
    related: "ppe",
  },
];

export const industries = [
  {
    name: "Oil & Gas",
    image: heroImg,
    text: "Scaffolding and access for facilities and maintenance, PPE for plant crews, and specialist HSE personnel for operational sites.",
    needs: ["Scaffolding & access", "Safety equipment", "Maintenance supplies", "HSE personnel"],
  },
  {
    name: "Construction & Civil Engineering",
    image: equipmentImg,
    text: "Site machinery, scaffolding, PPE and project materials for building and civil engineering works.",
    needs: ["Construction machinery", "Scaffolding", "PPE", "Project materials"],
  },
  {
    name: "Infrastructure Development",
    image: scaffoldImg,
    text: "Equipment and materials for public infrastructure and large-scale project environments.",
    needs: ["Compaction & concrete", "Lifting equipment", "Access systems", "Site safety"],
  },
  {
    name: "Industrial Operations",
    image: industrialImg,
    text: "Equipment, consumables, PPE and maintenance materials that keep facilities running safely.",
    needs: ["Industrial consumables", "Maintenance materials", "PPE", "Safety support"],
  },
  {
    name: "Engineering & EPC Projects",
    image: hseImg,
    text: "Supply categories and HSE manpower that can support procurement and execution on EPC contracts.",
    needs: ["Multi-category supply", "Equipment", "HSE manpower", "Material sourcing"],
  },
];

export const enquiryTypes = [
  "Scaffolding Supply",
  "Construction Equipment",
  "PPE & Safety Supplies",
  "Industrial Materials",
  "HSE Manpower",
  "General Business Enquiry",
  "Other",
];
