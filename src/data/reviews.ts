export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "Thabo Mokoena",
    text: "Fast and professional service. Malloya Teq delivered my website ahead of schedule and it looks absolutely stunning.",
    rating: 5,
    avatar: "TM",
  },
  {
    id: "2",
    name: "Naledi Dlamini",
    text: "Best developer I worked with. They understood my vision perfectly and brought it to life with incredible attention to detail.",
    rating: 5,
    avatar: "ND",
  },
  {
    id: "3",
    name: "Johan van der Merwe",
    text: "Great support and affordable pricing. The team was always available and went above and beyond for my business.",
    rating: 5,
    avatar: "JM",
  },
  {
    id: "4",
    name: "Amahle Nkosi",
    text: "My business grew after launch. Online sales increased by 300% within the first month. Absolutely worth every rand.",
    rating: 5,
    avatar: "AN",
  },
  {
    id: "5",
    name: "Sipho Mabaso",
    text: "The mobile app they built for us is flawless. Our customers love it and our retention rate doubled.",
    rating: 5,
    avatar: "SM",
  },
];
