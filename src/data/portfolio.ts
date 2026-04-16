export interface PortfolioItem {
  id: string;
  name: string;
  category: "static" | "dynamic" | "store";
  screenshot: string;
  url: string;
  description: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    name: "Luxe Properties",
    category: "dynamic",
    screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    url: "#",
    description: "Premium real estate platform with property listings",
  },
  {
    id: "2",
    name: "Safari Outfitters",
    category: "store",
    screenshot: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    url: "#",
    description: "E-commerce store for outdoor adventure gear",
  },
  {
    id: "3",
    name: "Cape Consulting",
    category: "static",
    screenshot: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    url: "#",
    description: "Corporate consulting firm website",
  },
  {
    id: "4",
    name: "Joburg Eats",
    category: "dynamic",
    screenshot: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    url: "#",
    description: "Restaurant ordering and delivery platform",
  },
  {
    id: "5",
    name: "Durban Fitness",
    category: "static",
    screenshot: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    url: "#",
    description: "Fitness studio with class booking",
  },
  {
    id: "6",
    name: "Pretoria Threads",
    category: "store",
    screenshot: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    url: "#",
    description: "Fashion dropshipping store",
  },
];
