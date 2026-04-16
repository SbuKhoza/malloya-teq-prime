export interface Package {
  id: string;
  name: string;
  category: "static" | "dynamic" | "store" | "app";
  monthlyPrice: number | null;
  annualPrice: number | null;
  features: string[];
  popular?: boolean;
  cta?: string;
}

export const websitePackages: Package[] = [
  {
    id: "starter-static",
    name: "Starter Static",
    category: "static",
    monthlyPrice: 399,
    annualPrice: 3999,
    features: [
      "Up to 5 pages",
      "Mobile responsive",
      "Basic SEO setup",
      "Contact form",
      "1 revision round",
    ],
  },
  {
    id: "business-static",
    name: "Business Static",
    category: "static",
    monthlyPrice: 599,
    annualPrice: 5999,
    features: [
      "Up to 10 pages",
      "Mobile responsive",
      "Advanced SEO",
      "Google Analytics",
      "Social media integration",
      "2 revision rounds",
    ],
    popular: true,
  },
  {
    id: "premium-static",
    name: "Premium Static",
    category: "static",
    monthlyPrice: 899,
    annualPrice: 8999,
    features: [
      "Unlimited pages",
      "Premium animations",
      "Full SEO suite",
      "Google Analytics & Search Console",
      "Priority support",
      "3 revision rounds",
    ],
  },
  {
    id: "cms-business",
    name: "CMS Business",
    category: "dynamic",
    monthlyPrice: 799,
    annualPrice: 7999,
    features: [
      "Content Management System",
      "Blog integration",
      "Up to 15 pages",
      "SEO optimized",
      "Admin dashboard",
      "2 revision rounds",
    ],
  },
  {
    id: "cms-pro",
    name: "CMS Pro",
    category: "dynamic",
    monthlyPrice: 1299,
    annualPrice: 12999,
    features: [
      "Advanced CMS",
      "Multi-user access",
      "Unlimited pages",
      "Custom plugins",
      "API integration",
      "Priority support",
      "3 revision rounds",
    ],
    popular: true,
  },
  {
    id: "store-starter",
    name: "Store Starter",
    category: "store",
    monthlyPrice: 999,
    annualPrice: 9999,
    features: [
      "Up to 50 products",
      "Payment gateway",
      "Order management",
      "Mobile responsive",
      "Basic SEO",
      "Email notifications",
    ],
  },
  {
    id: "store-advanced",
    name: "Store Advanced",
    category: "store",
    monthlyPrice: 1799,
    annualPrice: 17999,
    features: [
      "Unlimited products",
      "Multiple payment gateways",
      "Inventory management",
      "Discount & coupon system",
      "Advanced analytics",
      "Priority support",
    ],
    popular: true,
  },
];

export const appPackages: Package[] = [
  {
    id: "basic-app",
    name: "Basic App",
    category: "app",
    monthlyPrice: null,
    annualPrice: null,
    features: [
      "Single platform (Android or iOS)",
      "Up to 5 screens",
      "Basic functionality",
      "Push notifications",
      "App store submission",
    ],
    cta: "Request App Quote",
  },
  {
    id: "business-app",
    name: "Business App",
    category: "app",
    monthlyPrice: null,
    annualPrice: null,
    features: [
      "Cross-platform (Android & iOS)",
      "Up to 15 screens",
      "API integration",
      "User authentication",
      "Analytics dashboard",
      "Push notifications",
    ],
    popular: true,
    cta: "Request App Quote",
  },
  {
    id: "enterprise-app",
    name: "Enterprise App",
    category: "app",
    monthlyPrice: null,
    annualPrice: null,
    features: [
      "Full custom development",
      "Unlimited screens",
      "Advanced backend",
      "Admin panel",
      "Real-time features",
      "Ongoing maintenance",
    ],
    cta: "Request App Quote",
  },
];

export const includedBenefits = [
  "Free Monthly Hosting",
  "Free .co.za Domain of customer choice",
  "3 Professional Email Addresses",
];
