export interface Package {
  id: string;
  name: string;
  category: "static" | "store" | "app";
  monthlyPrice: number | null;
  annualPrice: number | null;
  /** Optional CMS upgrade pricing — when set, the card shows a "with CMS" toggle. */
  cmsMonthlyAddon?: number;
  cmsAnnualAddon?: number;
  features: string[];
  cmsFeatures?: string[];
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
    cmsMonthlyAddon: 200,
    cmsAnnualAddon: 2000,
    features: [
      "Up to 5 pages",
      "Mobile responsive",
      "Basic SEO setup",
      "Contact form",
      "1 revision round",
    ],
    cmsFeatures: ["Content Management System", "Admin dashboard", "Easy content updates"],
  },
  {
    id: "business-static",
    name: "Business Static",
    category: "static",
    monthlyPrice: 599,
    annualPrice: 5999,
    cmsMonthlyAddon: 250,
    cmsAnnualAddon: 2500,
    features: [
      "Up to 10 pages",
      "Mobile responsive",
      "Advanced SEO",
      "Google Analytics",
      "Social media integration",
      "2 revision rounds",
    ],
    cmsFeatures: ["Content Management System", "Blog integration", "Multi-user admin access"],
    popular: true,
  },
  {
    id: "premium-static",
    name: "Premium Static",
    category: "static",
    monthlyPrice: 899,
    annualPrice: 8999,
    cmsMonthlyAddon: 400,
    cmsAnnualAddon: 4000,
    features: [
      "Unlimited pages",
      "Premium animations",
      "Full SEO suite",
      "Google Analytics & Search Console",
      "Priority support",
      "3 revision rounds",
    ],
    cmsFeatures: ["Advanced CMS", "Custom plugins", "API integration", "Multi-user access"],
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
