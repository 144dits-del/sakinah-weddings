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
  akad: { date: string; start: string; end: string; venue: string };
  resepsi: { date: string; start: string; end: string; venue: string };
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
];

export const packages: Package[] = [
  { id: "p1", name: "Gratis Sakinah", price: 0, features: ["Template gratis", "Subdomain sakinahweb.id", "RSVP dasar", "Galeri 10 foto"] },
  { id: "p2", name: "Premium", price: 89000, originalPrice: 100000, highlight: true, features: ["Semua template premium", "Subdomain custom", "RSVP unlimited", "Galeri unlimited", "Musik pilihan", "Kado digital", "Wedding wall"] },
  { id: "p3", name: "Eksklusif", price: 199000, features: ["Semua fitur Premium", "Domain .com sendiri", "Custom design", "Priority support", "Video galeri"] },
];

export const transactions: Transaction[] = [
  { id: "TRX001", user: "Raditya Anwar", package: "Premium", amount: 89000, status: "success", date: "2026-05-28" },
  { id: "TRX002", user: "Siti Nurhaliza", package: "Eksklusif", amount: 199000, status: "pending", date: "2026-05-29" },
  { id: "TRX003", user: "Budi Santoso", package: "Premium", amount: 89000, status: "success", date: "2026-05-29" },
  { id: "TRX004", user: "Dewi Lestari", package: "Premium", amount: 89000, status: "failed", date: "2026-05-30" },
  { id: "TRX005", user: "Andi Wijaya", package: "Eksklusif", amount: 199000, status: "success", date: "2026-05-30" },
];

export const users = [
  { id: "u1", name: "Raditya Anwar", email: "raditya@mail.com", package: "Premium", joined: "2026-05-20" },
  { id: "u2", name: "Siti Nurhaliza", email: "siti@mail.com", package: "Eksklusif", joined: "2026-05-22" },
  { id: "u3", name: "Budi Santoso", email: "budi@mail.com", package: "Gratis", joined: "2026-05-25" },
  { id: "u4", name: "Dewi Lestari", email: "dewi@mail.com", package: "Premium", joined: "2026-05-28" },
];

export const adminStats = {
  totalUsers: 1248,
  activeWebsites: 892,
  pendingTransactions: 23,
  totalRevenue: 124500000,
};

export const dummyWedding: WeddingData = {
  subdomain: "raditya-aisyah",
  groom: { fullName: "Raditya Anwar Pratama", nickname: "Raditya", father: "Bapak Anwar Pratama", mother: "Ibu Siti Aminah" },
  bride: { fullName: "Aisyah Nur Hidayah", nickname: "Aisyah", father: "Bapak Hidayat", mother: "Ibu Nurul" },
  religion: "Islam",
  timezone: "WIB",
  akad: { date: "2026-08-15", start: "08:00", end: "10:00", venue: "Masjid Al-Ikhlas, Jl. Melati No.12, Bandung" },
  resepsi: { date: "2026-08-15", start: "11:00", end: "14:00", venue: "Gedung Sasana Budaya, Jl. Asia Afrika No.8, Bandung" },
};

export const formatRupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");
