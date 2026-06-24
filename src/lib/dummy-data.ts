// Dummy data structures — siap diganti dengan API/Supabase nanti

export type Template = {
  id: string;
  name: string;
  thumbnail: string;
  type: "gratis" | "premium";
  popular?: boolean;
};

export type Transaction = {
  id: string;
  user: string;
  package: string;
  amount: number;
  status: "pending" | "success" | "failed";
  date: string;
};

export type Package = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  features: string[];
  highlight?: boolean;
};

export type WeddingData = {
  subdomain: string;
  groom: { fullName: string; nickname: string; father: string; mother: string };
  bride: { fullName: string; nickname: string; father: string; mother: string };
  religion: string;
  timezone: string;
  akad: { date: string; start: string; end: string; venue: string; maps?: string };
  resepsi: { date: string; start: string; end: string; venue: string; maps?: string };
};

export const templates: Template[] = [
  { id: "t1", name: "Sakinah Classic", thumbnail: "🤍", type: "gratis", popular: true },
  { id: "t2", name: "Rose Gold", thumbnail: "🌹", type: "premium", popular: true },
  { id: "t3", name: "Mawaddah", thumbnail: "💛", type: "gratis" },
  { id: "t4", name: "Luxury Velvet", thumbnail: "✨", type: "premium" },
  { id: "t5", name: "Garden Bliss", thumbnail: "🌿", type: "premium", popular: true },
  { id: "t6", name: "Minimal Elegance", thumbnail: "🤎", type: "gratis" },
  { id: "t7", name: "Royal Gold", thumbnail: "👑", type: "premium" },
  { id: "t8", name: "Sweet Pastel", thumbnail: "🌸", type: "gratis" },
  { id: "t9", name: "Nikah Monochrome", thumbnail: "🖤", type: "premium", popular: true },
  { id: "t10", name: "Nikah Sakinah", thumbnail: "🦢", type: "premium", popular: true },
  { id: "t11", name: "Coba Buatkan", thumbnail: "💻", type: "premium", popular: true },
];

export const packages: Package[] = [
  { id: "p1", name: "Sakinah", price: 0, features: ["Gratis, selamanya", "Template gratis", "Subdomain sakinahweb.id", "RSVP dasar", "Galeri 10 foto"] },
  { id: "p2", name: "Mawaddah", price: 89000, originalPrice: 100000, highlight: true, features: ["Sekali bayar", "Paling populer", "Semua template premium", "Subdomain custom", "RSVP unlimited", "Galeri unlimited", "Musik pilihan", "Kado digital", "Wedding wall"] },
  { id: "p3", name: "Warahmah", price: 199000, features: ["Sekali bayar", "Eksklusif", "Semua fitur Mawaddah", "Domain .com sendiri", "Custom design", "Priority support", "Video galeri", "Video undangan"] },
];

export const transactions: Transaction[] = [
  { id: "TRX001", user: "adbi", package: "Mawaddah", amount: 89000, status: "success", date: "2026-05-28" },
  { id: "TRX002", user: "Dewi Lestari", package: "Warahmah", amount: 199000, status: "pending", date: "2026-05-29" },
  { id: "TRX003", user: "Budi Santoso", package: "Mawaddah", amount: 89000, status: "success", date: "2026-05-29" },
  { id: "TRX004", user: "Dewi Lestari", package: "Mawaddah", amount: 89000, status: "failed", date: "2026-05-30" },
  { id: "TRX005", user: "Andi Wijaya", package: "Warahmah", amount: 199000, status: "success", date: "2026-05-30" },
];

export const users = [
  { id: "u1", name: "adbi", email: "adbi@mail.com", package: "Mawaddah", joined: "2026-05-20" },
  { id: "u2", name: "Dewi Lestari", email: "dewi@mail.com", package: "Mawaddah", joined: "2026-05-22" },
  { id: "u3", name: "Budi Santoso", email: "budi@mail.com", package: "Sakinah", joined: "2026-05-25" },
  { id: "u4", name: "dits144 (Admin)", email: "dits144@gmail.com", package: "Warahmah", joined: "2026-06-01" },
];

export const adminStats = {
  totalUsers: 1248,
  activeWebsites: 892,
  pendingTransactions: 23,
  totalRevenue: 124500000,
};

export const dummyWedding: WeddingData = {
  subdomain: "di-ra",
  groom: { fullName: "adbi", nickname: "bibi", father: "adsa", mother: "rara" },
  bride: { fullName: "rara", nickname: "rarw", father: "rwqwq", mother: "rrwr" },
  religion: "Islam",
  timezone: "WIB",
  akad: { date: "2026-05-30", start: "14:30", end: "14:30", venue: "sda", maps: "" },
  resepsi: { date: "2026-05-31", start: "14:30", end: "14:30", venue: "21e21dsad", maps: "" },
};

export const STORAGE_KEY = "sakinah_wedding_data";
export const PACKAGE_STORAGE_KEY = "sakinah_active_package";

export const getStoredWeddingData = (): WeddingData => {
  if (typeof window === "undefined") return dummyWedding;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        ...dummyWedding,
        ...parsed,
        groom: { ...dummyWedding.groom, ...parsed.groom },
        bride: { ...dummyWedding.bride, ...parsed.bride },
        akad: { ...dummyWedding.akad, ...parsed.akad },
        resepsi: { ...dummyWedding.resepsi, ...parsed.resepsi },
      };
    } catch (e) {
      console.error(e);
    }
  }
  return dummyWedding;
};

export const setStoredWeddingData = (data: WeddingData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

export const getStoredPackage = (): string => {
  if (typeof window === "undefined") return "Sakinah";
  return localStorage.getItem(PACKAGE_STORAGE_KEY) || "Sakinah";
};

export const setStoredPackage = (pkg: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(PACKAGE_STORAGE_KEY, pkg);
  }
};

export const formatRupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");
