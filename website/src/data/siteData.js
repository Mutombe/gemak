export const siteInfo = {
  name: "Gemak Security Shop",
  tagline: "Harnessing Technology For Your Convenience",
  phone: ["+263 773 910 305", "+263 715 015 250", "+263 864 429 6356"],
  email: "info@gemaksecurity.co.zw",
  website: "www.gemaksecurity.co.zw",
  address: "59 Central Avenue, Harare, Zimbabwe",
  social: {
    facebook: "https://facebook.com/gemaksecurity",
    instagram: "https://instagram.com/gemaksecurity",
    twitter: "https://twitter.com/gemaksecurity",
    whatsapp: "https://wa.me/263773910305",
    linkedin: "https://linkedin.com/company/gemaksecurity",
  },
};

export const branches = [
  { city: "Harare", address: "59 Central Avenue", isHQ: true },
  { city: "Chitungwiza", address: "Chitungwiza Branch" },
  { city: "Bulawayo", address: "Bulawayo Branch" },
  { city: "Gweru", address: "Gweru Branch" },
  { city: "Mutare", address: "Mutare Branch" },
  { city: "Chinhoyi", address: "Chinhoyi Branch" },
  { city: "Bindura", address: "Bindura Branch" },
  { city: "Masvingo", address: "Masvingo Branch" },
  { city: "Kariba", address: "Kariba Branch" },
];

export const services = [
  {
    id: "cctv",
    title: "CCTV & Surveillance",
    subtitle: "Eyes That Never Sleep",
    description:
      "Complete CCTV installation and monitoring solutions for homes, businesses, and commercial properties. From HD cameras to AI-powered analytics, we provide end-to-end surveillance systems.",
    features: [
      "HD & 4K Camera Systems",
      "Remote Viewing & Mobile Apps",
      "Night Vision Technology",
      "AI Motion Detection",
      "Cloud & Local Storage",
      "24/7 Monitoring",
    ],
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
    icon: "Camera",
  },
  {
    id: "alarms",
    title: "Alarm Systems",
    subtitle: "Instant Response, Total Protection",
    description:
      "State-of-the-art alarm systems for residential and commercial properties. Our systems include door/window sensors, motion detectors, and instant alert notifications.",
    features: [
      "Wireless Alarm Panels",
      "Door & Window Sensors",
      "Motion Detectors",
      "Smoke & Gas Detection",
      "Mobile Alerts",
      "Armed Response Integration",
    ],
    image: "10.webp",
    icon: "ShieldAlert",
  },
  {
    id: "gate-automation",
    title: "Gate Automation & Intercoms",
    subtitle: "Smart Access Control",
    description:
      "Automated gate systems and intercom solutions for seamless property access control. Sliding gates, swing gates, and boom barriers with video intercom integration.",
    features: [
      "Sliding Gate Motors",
      "Swing Gate Automation",
      "Video Intercoms",
      "Keypad Access",
      "Remote Control",
      "Boom Barriers",
    ],
    image: "9.webp",
    icon: "DoorOpen",
  },
  {
    id: "electric-fence",
    title: "Electric Fencing",
    subtitle: "Perimeter Defense Systems",
    description:
      "High-voltage electric fence installations for maximum perimeter security. Energizers, monitoring systems, and professional installation for residential and commercial properties.",
    features: [
      "High-Voltage Energizers",
      "Perimeter Monitoring",
      "Alarm Integration",
      "Lightning Protection",
      "Battery Backup",
      "Zone Management",
    ],
    image: "7.jpg",
    icon: "Zap",
  },
  {
    id: "guard-services",
    title: "Guard Equipment & Services",
    subtitle: "Professional Security Personnel",
    description:
      "Complete guard equipment supply including uniforms, boots, communication devices, and tactical gear. We equip security teams with the best tools for the job.",
    features: [
      "Security Uniforms",
      "Combat & Patrol Boots",
      "Two-Way Radios",
      "Tactical Flashlights",
      "Duty Belts & Accessories",
      "Reflective Gear",
    ],
    image: "11.jpg",
    icon: "Shield",
  },
  {
    id: "smart-home",
    title: "Smart Home Security",
    subtitle: "Connected & Intelligent Living",
    description:
      "Transform your home with integrated smart security. Control cameras, alarms, locks, and lights from a single app. Seamless automation for modern living.",
    features: [
      "Smart Locks",
      "Automated Lighting",
      "App Control",
      "Voice Integration",
      "Scheduled Routines",
      "Energy Monitoring",
    ],
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
    icon: "Home",
  },
];

export const productCategories = [
  "All",
  "CCTV Cameras",
  "Accessories",
  "Self Defense",
  "Footwear",
  "Communication",
  "Alarm Systems",
  "Gate Automation",
];

export const products = [
  // CCTV Cameras
  {
    id: 1,
    name: "Hikvision Bullet Camera",
    category: "CCTV Cameras",
    price: 45,
    oldPrice: 55,
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80",
    badge: "Best Seller",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Dahua Dome Camera 4MP",
    category: "CCTV Cameras",
    price: 38,
    oldPrice: 48,
    image: "3.jpg",
    badge: "New",
    rating: 4.6,
  },
  {
    id: 3,
    name: "PTZ Camera 360°",
    category: "CCTV Cameras",
    price: 120,
    oldPrice: 150,
    image:
      "https://images.unsplash.com/photo-1589935447067-5531094415d1?w=400&q=80",
    badge: "Premium",
    rating: 4.9,
  },
  {
    id: 5,
    name: "8-Channel NVR Kit",
    category: "CCTV Cameras",
    price: 180,
    oldPrice: 220,
    image: "/5.jpg",
    badge: "Popular",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Spy Camera Clock",
    category: "CCTV Cameras",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=400&q=80",
    rating: 4.3,
  },
  // Accessories
  {
    id: 9,
    name: "1TB Hard Drive",
    category: "Accessories",
    price: 40,
    oldPrice: 50,
    image:
      "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&q=80",
    badge: "Sale",
    rating: 4.7,
  },
  // Self Defense
  {
    id: 13,
    name: "TW 1502 Type Taser",
    category: "Self Defense",
    price: 10,
    image: "6.jpg",
    badge: "Popular",
    rating: 4.3,
  },
  {
    id: 15,
    name: "Tactical Stun Flashlight",
    category: "Self Defense",
    price: 20,
    image: "1.jpg",
    badge: "Hot",
    rating: 4.5,
  },
  {
    id: 16,
    name: "Shooting Taser",
    category: "Self Defense",
    price: 65,
    oldPrice: 80,
    image: "2.webp",
    badge: "Premium",
    rating: 4.8,
  },
  // Footwear
  {
    id: 17,
    name: "TTP Security Boots",
    category: "Footwear",
    price: 25,
    image:
      "12.webp",
    rating: 4.5,
  },
  {
    id: 18,
    name: "Pioneer Security Boots",
    category: "Footwear",
    price: 35,
    image:
      "13.png",
    badge: "Best Seller",
    rating: 4.7,
  },
  // Communication
  {
    id: 21,
    name: "Baofeng UV-5R Radio",
    category: "Communication",
    price: 25,
    oldPrice: 35,
    image:
      "14.webp",
    badge: "Best Seller",
    rating: 4.8,
  },
  // Alarm Systems
  // Gate Automation
  {
    id: 26,
    name: "Video Intercom System",
    category: "Gate Automation",
    price: 85,
    image:
      "9.webp",
    rating: 4.6,
  },
];

export const galleryItems = [
  {
    id: 1,
    title: "CCTV Installation — Commercial Complex",
    category: "CCTV",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&q=80",
  },
  {
    id: 2,
    title: "Electric Fence — Residential Estate",
    category: "Electric Fence",
    image:
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&q=80",
  },
  {
    id: 3,
    title: "Gate Automation — Office Park",
    category: "Gate Automation",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
  {
    id: 4,
    title: "Alarm System — Luxury Home",
    category: "Alarms",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
  },
  {
    id: 5,
    title: "CCTV Network — Shopping Mall",
    category: "CCTV",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
  },
  {
    id: 6,
    title: "Smart Home Integration",
    category: "Smart Home",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
  },
  {
    id: 7,
    title: "Perimeter Security — Industrial",
    category: "Electric Fence",
    image:
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&q=80",
  },
  {
    id: 8,
    title: "Guard Equipment Supply",
    category: "Guard Services",
    image:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&q=80",
  },
  {
    id: 9,
    title: "Access Control — Corporate",
    category: "Gate Automation",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
  {
    id: 10,
    title: "Surveillance Upgrade — Hotel",
    category: "CCTV",
    image:
      "https://images.unsplash.com/photo-1589935447067-5531094415d1?w=600&q=80",
  },
  {
    id: 11,
    title: "Smart Lock Installation",
    category: "Smart Home",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
  },
  {
    id: 12,
    title: "Guard Deployment — Event",
    category: "Guard Services",
    image:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&q=80",
  },
];

export const testimonials = [
  {
    name: "Tatenda M.",
    role: "Business Owner, Harare",
    text: "Gemak transformed our office security. The CCTV system is crystal clear and I can monitor everything from my phone. Professional installation team!",
    rating: 5,
  },
  {
    name: "Grace K.",
    role: "Homeowner, Borrowdale",
    text: "The gate automation and intercom system they installed is fantastic. My family feels much safer now. Highly recommend their services.",
    rating: 5,
  },
  {
    name: "David C.",
    role: "Hotel Manager, Bulawayo",
    text: "We equipped our entire security team through Gemak. From boots to radios, everything is top quality. Their prices are unbeatable.",
    rating: 5,
  },
  {
    name: "Rumbidzai N.",
    role: "Farm Owner, Chinhoyi",
    text: "The electric fencing and alarm system has been a game changer for our farm security. The team was professional and thorough.",
    rating: 4,
  },
  {
    name: "Kudakwashe T.",
    role: "Property Developer",
    text: "We use Gemak for all our developments. Consistent quality, competitive pricing, and they always deliver on time.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    role: "School Administrator",
    text: "The complete surveillance system for our school campus was installed efficiently. Parents feel safer knowing we have 24/7 monitoring.",
    rating: 5,
  },
];

export const stats = [
  { value: "10K+", label: "Installations" },
  { value: "9", label: "Branches" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
];

export const searchableContent = [
  {
    title: "CCTV & Surveillance",
    section: "services",
    path: "/services#cctv",
    keywords:
      "cctv camera surveillance monitoring security cameras hikvision dahua",
  },
  {
    title: "Alarm Systems",
    section: "services",
    path: "/services#alarms",
    keywords: "alarm systems security alarms door sensor motion detector",
  },
  {
    title: "Gate Automation",
    section: "services",
    path: "/services#gate-automation",
    keywords: "gate automation intercom sliding gate swing gate motor",
  },
  {
    title: "Electric Fencing",
    section: "services",
    path: "/services#electric-fence",
    keywords: "electric fence fencing perimeter energizer",
  },
  {
    title: "Guard Equipment",
    section: "services",
    path: "/services#guard-services",
    keywords: "guard equipment uniform boots security personnel",
  },
  {
    title: "Smart Home Security",
    section: "services",
    path: "/services#smart-home",
    keywords: "smart home security automation locks lighting",
  },
  {
    title: "Shop",
    section: "shop",
    path: "/shop",
    keywords: "shop buy products purchase equipment",
  },
  {
    title: "CCTV Cameras",
    section: "shop",
    path: "/shop?cat=CCTV+Cameras",
    keywords: "cameras cctv dvr nvr bullet dome ptz spy",
  },
  {
    title: "Self Defense Products",
    section: "shop",
    path: "/shop?cat=Self+Defense",
    keywords: "taser self defense stun flashlight protection",
  },
  {
    title: "Security Footwear",
    section: "shop",
    path: "/shop?cat=Footwear",
    keywords: "boots shoes combat security footwear canvas pioneer",
  },
  {
    title: "Communication Devices",
    section: "shop",
    path: "/shop?cat=Communication",
    keywords: "radio walkie talkie baofeng two-way communication",
  },
  {
    title: "Gallery",
    section: "gallery",
    path: "/gallery",
    keywords: "gallery portfolio projects installations work",
  },
  {
    title: "Contact Us",
    section: "contact",
    path: "/contact",
    keywords: "contact phone email address location directions",
  },
  {
    title: "About Gemak Security",
    section: "about",
    path: "/about",
    keywords: "about us company history mission vision team",
  },
  {
    title: "Harare Branch",
    section: "branches",
    path: "/contact#branches",
    keywords: "harare branch headquarters central avenue",
  },
  {
    title: "Bulawayo Branch",
    section: "branches",
    path: "/contact#branches",
    keywords: "bulawayo branch",
  },
  {
    title: "Accessories",
    section: "shop",
    path: "/shop?cat=Accessories",
    keywords:
      "accessories cables hard drive junction box power supply hdmi cat5 cat6",
  },
];
