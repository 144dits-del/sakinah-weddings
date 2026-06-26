import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloralCorner, FloralDivider, FloralSprig } from "@/components/site/Florals";
import { packages, formatRupiah } from "@/lib/dummy-data";
import { useState, useEffect } from "react";
import FullScreenInvitation from "@/components/site/FullScreenInvitation";
import {
  ArrowRight, Heart, Globe, Image as ImageIcon, Music, Gift, MessageCircle,
  Sparkle, Users, Check, Star, Calendar, Lock, ShieldCheck, Zap, HeartHandshake,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SakinahWeb — Undangan Pernikahan Digital Premium" },
      { name: "description", content: "Wujudkan undangan pernikahan digital elegan, romantis, dan eksklusif dalam hitungan menit." },
      { property: "og:title", content: "SakinahWeb — Undangan Pernikahan Digital Premium" },
      { property: "og:description", content: "Wujudkan undangan pernikahan digital elegan, romantis, dan eksklusif dalam hitungan menit." },
    ],
  }),
  component: Landing,
});

const UNS_HERO = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80";
const UNS_COUPLE_1 = "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80";
const UNS_COUPLE_2 = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80";
const UNS_COUPLE_3 = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80";
const UNS_FLORAL_BG = "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1600&q=80";

const TEMPLATES = [
  { id: "t1", name: "Anggrek Putih", type: "Mawaddah", img: "https://images.unsplash.com/photo-1525772764200-be829a350797?auto=format&fit=crop&w=600&q=80" },
  { id: "t2", name: "Mawar Champagne", type: "Mawaddah", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80" },
  { id: "t3", name: "Melati Klasik", type: "Sakinah", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80" },
  { id: "t4", name: "Sage Garden", type: "Mawaddah", img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=600&q=80" },
];

const features = [
  { icon: Globe, title: "Subdomain Pribadi", desc: "namapasangan.sakinahweb.id eksklusif" },
  { icon: Users, title: "RSVP Tamu", desc: "Konfirmasi kehadiran otomatis" },
  { icon: ImageIcon, title: "Galeri Foto", desc: "Album kenangan tanpa batas" },
  { icon: Music, title: "Musik Latar", desc: "Lagu romantis pilihan kalian" },
  { icon: Gift, title: "Kado Digital", desc: "Transfer & e-wallet aman" },
  { icon: MessageCircle, title: "Wedding Wall", desc: "Doa & ucapan dari tamu" },
];

const reasons = [
  { icon: Sparkle, t: "Desain Eksklusif", d: "Template dirancang oleh desainer profesional dengan estetika wedding modern Indonesia." },
  { icon: Zap, t: "Mudah & Cepat", d: "Wizard 4 langkah, undangan jadi dalam 5 menit tanpa keahlian teknis apapun." },
  { icon: ShieldCheck, t: "Aman & Privat", d: "Data tamu dan kado dilindungi enkripsi. Hanya kalian yang punya akses." },
  { icon: HeartHandshake, t: "Dukungan Penuh", d: "Tim support siap membantu 7 hari seminggu via WhatsApp & email." },
];

const trustLogos = ["Bridestory", "Pernikahan.com", "The Knot ID", "Wedding Market", "Bridestyle"];

const testimonials = [
  { n: "Radit & Dila", c: "Bandung", q: "Tamu kami kagum dengan undangannya. Elegan banget dan fitur RSVP-nya sangat membantu.", img: UNS_COUPLE_1 },
  { n: "Andi & Sari", c: "Jakarta", q: "Prosesnya sangat cepat. Dalam 30 menit undangan sudah siap dibagikan ke 200 tamu.", img: UNS_COUPLE_2 },
  { n: "Budi & Dewi", c: "Surabaya", q: "Template premiumnya benar-benar worth it. Suasana romantisnya terasa sekali.", img: UNS_COUPLE_3 },
];

const faqs = [
  { q: "Berapa lama undangan saya aktif?", a: "Pada paket Mawaddah dan Warahmah, undangan aktif selamanya. Paket Sakinah aktif selama 1 bulan." },
  { q: "Bisakah mengganti template setelah membuat?", a: "Tentu bisa, kapan saja melalui dashboard tanpa biaya tambahan." },
  { q: "Apakah tersedia domain custom?", a: "Ya, paket Warahmah termasuk domain .com pribadi untuk undangan kalian." },
  { q: "Bagaimana metode pembayarannya?", a: "Kami menerima transfer bank, e-wallet (OVO, GoPay, Dana), dan QRIS." },
  { q: "Apakah ada batasan jumlah tamu?", a: "Tidak. Semua paket memberikan undangan dengan jumlah tamu unlimited." },
];

function Landing() {
  const [isSubdomainMode, setIsSubdomainMode] = useState(false);
  const [subdomain, setSubdomain] = useState("");
  const [demoTheme, setDemoTheme] = useState("sakinah");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const searchParams = new URLSearchParams(window.location.search);
      const querySub = searchParams.get("subdomain");

      if (querySub) {
        setIsSubdomainMode(true);
        setSubdomain(querySub);
      } else {
        const host = hostname.toLowerCase();
        let sub = "";

        if (host.includes(".sakinahweb.lovable.app") && host !== "sakinahweb.lovable.app") {
          sub = host.split(".sakinahweb.lovable.app")[0];
        } else if (host.includes(".sakinahweb.id") && host !== "sakinahweb.id") {
          sub = host.split(".sakinahweb.id")[0];
        } else if (host.includes(".sakinah.studio") && host !== "sakinah.studio") {
          sub = host.split(".sakinah.studio")[0];
        } else if (
          !host.startsWith("www.") &&
          host !== "sakinahweb.id" &&
          host !== "sakinahweb.lovable.app" &&
          host !== "sakinah.studio" &&
          host.split(".").length > 2
        ) {
          sub = host.split(".")[0];
        }

        if (sub && sub !== "www") {
          setIsSubdomainMode(true);
          setSubdomain(sub);
        }
      }
    }
  }, []);

  if (isSubdomainMode) {
    return <FullScreenInvitation subdomain={subdomain} />;
  }

  return (
    <div className="min-h-screen bg-ivory text-foreground">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-cream to-ivory" />
        <FloralCorner className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 text-sage opacity-60" />
        <FloralCorner flip className="pointer-events-none absolute -top-10 -right-10 h-72 w-72 text-blush opacity-50" />

        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-cream px-4 py-1.5 text-xs tracking-[0.2em] uppercase text-gold">
              <Sparkle className="h-3.5 w-3.5" />
              Undangan Digital Premium
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Buat Website
              <span className="block italic text-gold">Undangan Pernikahan</span>
              <span className="block">Digital dalam Hitungan Menit</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Dirancang untuk pasangan Indonesia yang menginginkan undangan elegan, romantis,
              dan berkelas — tanpa ribet, tanpa cetak, tanpa batas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/wizard">
                <Button size="lg" className="rounded-full bg-gold hover:bg-gold/90 text-primary-foreground px-7 shadow-md">
                  Mulai Buat Undangan <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button size="lg" variant="outline" className="rounded-full border-gold/40 text-foreground hover:bg-cream px-7">
                  Lihat Template
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[UNS_COUPLE_1, UNS_COUPLE_2, UNS_COUPLE_3].map((s, i) => (
                    <img key={i} src={s} alt="" className="h-8 w-8 rounded-full object-cover border-2 border-ivory" />
                  ))}
                </div>
                <span><b className="text-foreground">12.000+</b> pasangan bahagia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-gold">{Array.from({length:5}).map((_,i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <span><b className="text-foreground">4.9/5</b> rating</span>
              </div>
            </div>
          </div>

          {/* Hero visual — mobile mockup + couple photo */}
          <div className="relative">
            <FloralSprig className="absolute -top-8 -right-4 h-32 w-20 text-sage opacity-70 -rotate-12" />
            <div className="relative grid grid-cols-5 gap-4 items-end">
              <div className="col-span-3">
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-border">
                  <img src={UNS_HERO} alt="Pasangan menikah" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent text-background">
                    <div className="text-[10px] tracking-[0.3em] uppercase opacity-80">The Wedding Of</div>
                    <div className="font-display text-3xl mt-1 italic">Radit & Dila</div>
                    <div className="text-xs mt-1 opacity-90">30 Mei 2026</div>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                {/* Mobile mockup */}
                <div className="relative mx-auto w-full max-w-[210px] rounded-[2rem] border-[8px] border-foreground bg-ivory shadow-2xl overflow-hidden aspect-[9/19]">
                  <div className="relative h-2/3 bg-gradient-to-b from-blush-soft to-cream flex flex-col items-center justify-center text-center px-3">
                    <Heart className="h-4 w-4 text-blush mb-2" />
                    <div className="text-[8px] tracking-[0.25em] text-gold">THE WEDDING OF</div>
                    <div className="font-display text-xl leading-tight mt-1">Radit</div>
                    <div className="font-display text-sm text-gold italic">&</div>
                    <div className="font-display text-xl leading-tight">Dila</div>
                    <div className="text-[8px] text-muted-foreground mt-2">30 · 05 · 2026</div>
                  </div>
                  <div className="p-2 space-y-1.5">
                    {[60, 80, 40].map((w, i) => (
                      <div key={i} className="h-1.5 rounded-full bg-cream" style={{ width: `${w}%` }} />
                    ))}
                    <div className="grid grid-cols-3 gap-1 pt-1">
                      {[UNS_COUPLE_1, UNS_COUPLE_2, UNS_COUPLE_3].map((s, i) => (
                        <div key={i} className="aspect-square rounded bg-cover bg-center" style={{ backgroundImage: `url(${s})` }} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Floating card */}
                <div className="mt-4 rounded-2xl bg-card border border-border p-3 shadow-md flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-sage-soft text-sage"><Heart className="h-4 w-4" /></div>
                  <div className="text-xs">
                    <div className="font-semibold">42 RSVP</div>
                    <div className="text-muted-foreground">tamu hadir</div>
                  </div>
                </div>
              </div>
            </div>
            <FloralSprig className="absolute -bottom-6 -left-6 h-32 w-20 text-blush opacity-70 rotate-180" />
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-border/60 bg-cream/60 py-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Dipercaya untuk Momen Bahagia</p>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-muted-foreground/70 font-display text-lg italic">
            {trustLogos.map(l => <span key={l}>{l}</span>)}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gold">Fitur Lengkap</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Semua yang Kalian Butuhkan</h2>
          <FloralDivider className="mt-5" />
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(f => (
            <div key={f.title} className="group relative rounded-3xl border border-border bg-card p-7 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.12)] transition">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cream to-gold-soft text-gold mb-5">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-xl">{f.title}</div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEMPLATES — editorial catalog */}
      <section className="relative bg-gradient-to-b from-cream/50 via-ivory to-cream/50 py-24 overflow-hidden">
        <FloralSprig className="absolute top-12 right-6 h-40 w-24 text-sage opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-gold">Template Eksklusif</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Template Undangan Romantis</h2>
            <p className="mt-4 text-muted-foreground">Koleksi desain pilihan, dari klasik hingga modern minimalis.</p>
            <FloralDivider className="mt-5" />
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {TEMPLATES.map((t, i) => (
              <div key={t.id} className="group">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-cream ring-1 ring-border shadow-md group-hover:shadow-xl transition">
                  <img src={t.img} alt={t.name} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full ${t.type === "Premium" ? "bg-foreground text-background" : "bg-ivory text-foreground border border-border"}`}>
                      {t.type === "Premium" && <Lock className="inline h-2.5 w-2.5 mr-1" />}{t.type}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between px-1">
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Template 0{i+1}</div>
                    <div className="font-display text-lg mt-0.5">{t.name}</div>
                  </div>
                  <Link to="/marketplace">
                    <button className="text-xs tracking-wide text-gold hover:underline flex items-center gap-1">
                      Lihat <ArrowRight className="h-3 w-3" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/marketplace">
              <Button variant="outline" size="lg" className="rounded-full border-gold/40 hover:bg-cream px-7">
                Jelajahi Semua Template
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* LIVE INTERACTIVE DEMO SIMULATOR */}
      <section className="relative bg-gradient-to-b from-ivory via-cream/30 to-ivory py-24 overflow-hidden border-t border-border/40">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-gold">Live Playground Demo</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Coba Desain Tema Langsung</h2>
            <p className="mt-4 text-muted-foreground">
              Rasakan langsung perbedaan kemewahan Tema Klasik Sakinah dengan Tema Monokrom Minimalis modern dalam satu ketukan!
            </p>
            <FloralDivider className="mt-5" />
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
            {/* Control Panel (Left Side) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-md">
                <h3 className="font-display text-2xl font-bold mb-4">Pengatur Tema Undangan</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Pilih salah satu preset tema terpopuler di bawah ini untuk melihat simulasi visual di samping secara real-time.
                </p>

                <div className="space-y-3">
                  {/* Option 1: Sakinah Theme */}
                  <button
                    onClick={() => setDemoTheme("sakinah")}
                    className={`w-full text-left p-4 rounded-2xl border transition flex items-center gap-4 ${
                      demoTheme === "sakinah"
                        ? "border-gold bg-gold-soft/10 text-foreground ring-1 ring-gold"
                        : "border-border hover:bg-cream bg-transparent"
                    }`}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cream to-gold-soft flex items-center justify-center text-xl shadow-sm shrink-0">
                      🤍
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Sakinah Classic Theme</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">Gold & Cream Floral Elegance</div>
                    </div>
                  </button>

                  {/* Option 2: Monochrome Theme */}
                  <button
                    onClick={() => setDemoTheme("monochrome")}
                    className={`w-full text-left p-4 rounded-2xl border transition flex items-center gap-4 ${
                      demoTheme === "monochrome"
                        ? "border-zinc-950 bg-zinc-50 text-zinc-900 ring-1 ring-zinc-950"
                        : "border-border hover:bg-cream bg-transparent"
                    }`}
                  >
                    <div className="h-10 w-10 rounded-none border border-zinc-950 bg-white text-zinc-950 flex items-center justify-center text-xl shadow-sm shrink-0 font-serif font-black">
                      M
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Monochrome Serif Theme</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">High-Contrast Minimalist Aesthetic</div>
                    </div>
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-border/60 text-xs text-muted-foreground">
                  <span className="font-semibold text-gold">💡 Info Paket:</span> Kedua tema estetik di atas tersedia secara gratis pada paket keanggotaan dasar **Basic (Sakinah)**.
                </div>
              </div>
            </div>

            {/* Mobile Simulator (Right Side) */}
            <div className="lg:col-span-7 flex justify-center">
              <div className={`relative w-full max-w-[340px] aspect-[9/19] rounded-[2.5rem] overflow-hidden border-[10px] shadow-2xl transition duration-500 flex flex-col justify-between ${
                demoTheme === "monochrome"
                  ? "border-zinc-950 bg-white"
                  : "border-foreground bg-background"
              }`}>
                
                {/* Simulated Content */}
                <div className="flex-1 flex flex-col justify-between p-6 text-center select-none relative overflow-hidden transition-all duration-500">
                  {/* Decorative Corner Ornaments for Monochrome */}
                  {demoTheme === "monochrome" && (
                    <>
                      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-zinc-950" />
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-zinc-950" />
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-zinc-950" />
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-zinc-950" />
                    </>
                  )}

                  {/* Top Ornament */}
                  <div className={`mt-6 text-2xl transition duration-500 ${
                    demoTheme === "monochrome" ? "text-zinc-950 font-serif text-lg" : "text-gold animate-pulse"
                  }`}>
                    {demoTheme === "monochrome" ? "✦ ✦ ✦" : "🌸"}
                  </div>

                  <div className="space-y-4 my-auto">
                    <div className={`text-[10px] tracking-[0.4em] uppercase transition ${
                      demoTheme === "monochrome" ? "text-zinc-950 font-bold font-serif" : "text-gold"
                    }`}>
                      THE WEDDING OF
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className={`text-4xl font-extrabold capitalize tracking-tight transition-all duration-500 ${
                        demoTheme === "monochrome" ? "font-serif text-zinc-950" : "font-display text-foreground"
                      }`}>
                        Radit
                      </h3>
                      <div className={`text-2xl italic font-semibold transition ${
                        demoTheme === "monochrome" ? "font-serif text-zinc-950" : "font-display text-gold"
                      }`}>
                        &
                      </div>
                      <h3 className={`text-4xl font-extrabold capitalize tracking-tight transition-all duration-500 ${
                        demoTheme === "monochrome" ? "font-serif text-zinc-950" : "font-display text-foreground"
                      }`}>
                        Dila
                      </h3>
                    </div>

                    <div className="space-y-1 mt-6">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Acara akan diadakan pada:</div>
                      <div className={`text-xs font-bold transition ${
                        demoTheme === "monochrome" ? "font-serif text-zinc-950" : "text-foreground font-display"
                      }`}>
                        Sabtu, 30 Mei 2026
                      </div>
                    </div>
                  </div>

                  {/* Buka Undangan Simulated Button */}
                  <div className="mt-auto mb-6">
                    <button className={`w-full py-3 px-6 text-xs transition duration-500 flex items-center justify-center gap-2 ${
                      demoTheme === "monochrome"
                        ? "bg-zinc-950 text-white rounded-none border border-zinc-950 hover:bg-zinc-900"
                        : "bg-gold text-primary-foreground rounded-full hover:bg-gold/90 font-semibold"
                    }`}>
                      <Heart className={`h-3.5 w-3.5 ${demoTheme === "monochrome" ? "fill-zinc-950 text-white" : "fill-primary-foreground"}`} />
                      Buka Undangan Demo
                    </button>
                  </div>

                  {/* Bottom Ornament */}
                  <div className={`text-2xl transition duration-500 ${
                    demoTheme === "monochrome" ? "text-zinc-950 font-serif text-lg" : "text-gold animate-pulse"
                  }`}>
                    {demoTheme === "monochrome" ? "✦ ✦ ✦" : "🌸"}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KENAPA PILIH */}
      <section id="kenapa" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img src={UNS_COUPLE_1} alt="" className="aspect-[3/4] w-full object-cover rounded-3xl shadow-lg" />
              <img src={UNS_COUPLE_2} alt="" className="aspect-[3/4] w-full object-cover rounded-3xl shadow-lg mt-10" />
            </div>
            <FloralCorner className="absolute -bottom-8 -left-8 h-40 w-40 text-blush opacity-60" />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold">Kenapa Kami</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Kenapa Pilih SakinahWeb?</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Ribuan pasangan memilih SakinahWeb karena kami memahami betapa berharganya
              momen pernikahan kalian.
            </p>
            <div className="mt-8 space-y-5">
              {reasons.map(r => (
                <div key={r.t} className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-cream text-gold">
                    <r.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-lg">{r.t}</div>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="harga" className="relative bg-cream/50 py-24 overflow-hidden">
        <FloralCorner className="absolute -top-8 -right-8 h-48 w-48 text-sage opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-gold">Harga Terjangkau</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Paket Undangan</h2>
            <p className="mt-4 text-muted-foreground">Mulai gratis, upgrade kapan saja sesuai kebutuhan kalian.</p>
            <FloralDivider className="mt-5" />
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {packages.map(p => (
              <div key={p.id} className={`relative rounded-3xl p-8 ${
                p.highlight
                  ? "bg-gradient-to-b from-ivory to-blush-soft/40 border-2 border-gold shadow-xl lg:scale-[1.03]"
                  : "bg-card border border-border shadow-sm"
              }`}>
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gold text-primary-foreground text-[10px] tracking-[0.25em] uppercase px-4 py-1.5 rounded-full shadow">
                      Paling Populer
                    </span>
                  </div>
                )}
                <div className="font-display text-2xl">{p.name}</div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-display">{p.price === 0 ? "Gratis" : formatRupiah(p.price)}</span>
                  {p.originalPrice && <span className="text-sm text-muted-foreground line-through">{formatRupiah(p.originalPrice)}</span>}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{p.price === 0 ? "Selamanya" : "Sekali bayar"}</div>
                <FloralDivider className="my-6" />
                <ul className="space-y-3 text-sm">
                  {p.features.map(f => (
                    <li key={f} className="flex gap-2.5">
                      <Check className="h-4 w-4 text-sage mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/wizard" className="block mt-8">
                  <Button className={`w-full rounded-full ${p.highlight ? "bg-gold hover:bg-gold/90 text-primary-foreground" : ""}`} variant={p.highlight ? "default" : "outline"}>
                    Pilih Paket
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gold">Cerita Mereka</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Pasangan yang Bahagia</h2>
          <FloralDivider className="mt-5" />
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map(t => (
            <div key={t.n} className="rounded-3xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={t.img} alt={t.n} className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <div className="flex text-gold mb-3">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <p className="text-sm italic text-muted-foreground leading-relaxed">"{t.q}"</p>
                <div className="mt-4 pt-4 border-t border-border/60">
                  <div className="font-display text-base">{t.n}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Calendar className="h-3 w-3" />{t.c}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative bg-cream/50 py-24 overflow-hidden">
        <FloralSprig className="absolute top-10 left-6 h-32 w-20 text-blush opacity-50" />
        <FloralSprig className="absolute bottom-10 right-6 h-32 w-20 text-sage opacity-50 -scale-x-100" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-gold">Pertanyaan Umum</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Tanya Jawab</h2>
            <FloralDivider className="mt-5" />
          </div>
          <div className="space-y-3">
            {faqs.map(f => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 open:shadow-md transition">
                <summary className="cursor-pointer font-display text-lg flex justify-between items-center gap-4">
                  {f.q}
                  <span className="text-gold text-2xl leading-none group-open:rotate-45 transition shrink-0">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-16 text-center shadow-xl">
          <img src={UNS_FLORAL_BG} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-ivory/95 via-cream/90 to-blush-soft/80" />
          <div className="relative">
            <Heart className="h-8 w-8 text-gold mx-auto mb-4" />
            <h2 className="font-display text-4xl md:text-5xl">Mulai Perjalanan Cinta Kalian</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Buat undangan pertama kalian gratis. Tidak perlu kartu kredit.
            </p>
            <Link to="/wizard">
              <Button size="lg" className="mt-8 rounded-full bg-gold hover:bg-gold/90 text-primary-foreground px-8 shadow-md">
                Buat Undangan Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
