export interface PortfolioItem {
  id: string;
  name: string;
  category: "static" | "dynamic" | "store";
  screenshot: string;
  url: string;
  description: string;
  /** Platform labels shown as chips, e.g. ["iOS", "ANDROID"] */
  platforms?: string[];
  /** Icon name from lucide-react used for the product badge */
  icon?: "MapPin" | "Truck" | "Search" | "Store";
  /** Brand color for the icon blob */
  color?: "teal" | "orange" | "purple" | "red";
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "xplore-soweto",
    name: "Xplore Soweto",
    category: "dynamic",
    screenshot: "https://images.unsplash.com/photo-1561037404-61cd46fb660b?w=800&h=600&fit=crop",
    url: "#",
    description: "Discover Soweto — routes, stories & hidden spots.",
    platforms: ["iOS", "ANDROID"],
    icon: "MapPin",
    color: "teal",
  },
  {
    id: "fleetcounta",
    name: "Fleetcounta",
    category: "dynamic",
    screenshot: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop",
    url: "#",
    description: "Fleet & driver cost calculator.",
    platforms: ["iOS", "ANDROID"],
    icon: "Truck",
    color: "orange",
  },
  {
    id: "aislespy",
    name: "Aislespy",
    category: "dynamic",
    screenshot: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop",
    url: "#",
    description: "Smart shopping lists with running totals.",
    platforms: ["iOS", "ANDROID"],
    icon: "Search",
    color: "purple",
  },
  {
    id: "malloya-store",
    name: "Malloya Store",
    category: "store",
    screenshot: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    url: "#",
    description: "Quality digital products & online store.",
    platforms: [],
    icon: "Store",
    color: "red",
  },
];
