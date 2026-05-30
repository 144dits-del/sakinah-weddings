import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { TemplateCard } from "@/components/site/TemplateCard";
import { templates, packages, formatRupiah } from "@/lib/dummy-data";
import { Check, Heart, Globe, Image, Music, Gift, MessageCircle, Sparkles, Users, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SakinahWeb — Undangan Pernikahan Digital Elegan" },
      { name: "description", content: "Buat website undangan pernikahan digital premium dalam hitungan menit." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Globe, title: "Subdomain Pribadi", desc: "namapasangan.sakinahweb.id" },
  { icon: Users, title: "RSVP Tamu", desc: "Konfirmasi kehadiran realtime" },
  { icon: Image, title: "Galeri Foto", desc: "Album kenangan tak terbatas" },
  { icon: Music, title: "Musik Latar", desc: "Pilih lagu favorit kalian" },
  { icon: Gift, title: "Kado Digital", desc: "Transfer & e-wallet aman" },
  { icon: MessageCircle, title: "Doa & Ucapan", desc: "Wedding wall interaktif" },
  { icon: Heart, title: "Love Story", desc: "Ceritakan perjalanan cinta" },
  { icon: Sparkles, title: "Template Premium", desc: "Desain eksklusif berkelas" },
];

const steps = [
  { n: "01", t: "Pilih Template", d: "Jelajahi koleksi template elegan kami" },
  { n: "02", t: "Isi Data Pernikahan", d: "Lengkapi wizard 4 langkah mudah" },
  { n: "03", t: "Bagikan Link", d: "Kirim undangan via WhatsApp & media sosial" },
];

const testimonials = [
  { n: "Raditya & Aisyah", q: "Prosesnya cepat dan hasilnya sangat elegan. Tamu kami semua kagum!" },
  { n: "Andi & Sari", q: "Fitur RSVP-nya sangat membantu kami mengatur catering." },
  { n: "Budi & Dewi", q: "Template premiumnya worth it banget. Recommended!" },
];

const faqs = [
  { q: "Berapa lama undangan aktif?", a: "Undangan aktif selamanya pada paket Premium dan Eksklusif." },
  { q: "Bisa ganti template setelah dibuat?", a: "Bisa, kapan saja melalui dashboard kamu." },
  { q: "Apakah ada domain custom?", a: "Ya, tersedia pada paket Eksklusif." },
  { q: "Bagaimana cara pembayaran?", a: "Transfer bank, e-wallet, dan QRIS semua didukung." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cream via-background to-gold-soft/30" />
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 text-center">
          <Badge className="bg-gold-soft text-foreground mb-6">✨ Undangan Digital Terbaik 2026</Badge>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-4xl mx-auto">
            Buat Website Undangan Pernikahan Digital Dalam Hitungan Menit
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Desain elegan, fitur lengkap, dan mudah dibagikan. Wujudkan undangan impian kalian hari ini.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/wizard"><Button size="lg" className="bg-gold hover:bg-gold/90 text-primary-foreground">Mulai Buat Undangan <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Link to="/marketplace"><Button size="lg" variant="outline">Lihat Template</Button></Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div>⭐ 4.9/5 dari 2,400+ pengguna</div>
            <div>💍 12,000+ undangan terkirim</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl">Fitur Utama</h2>
          <p className="mt-3 text-muted-foreground">Semua yang kalian butuhkan untuk undangan sempurna</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold-soft text-foreground mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="font-semibold">{f.title}</div>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates */}
      <section className="bg-card/50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl">Template Populer</h2>
              <p className="mt-3 text-muted-foreground">Pilih yang paling cocok dengan tema kalian</p>
            </div>
            <Link to="/marketplace" className="hidden md:block"><Button variant="outline">Lihat Semua</Button></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {templates.filter(t => t.popular).slice(0, 4).map(t => <TemplateCard key={t.id} t={t} />)}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="harga" className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl">Paket Harga</h2>
          <p className="mt-3 text-muted-foreground">Mulai gratis, upgrade kapan saja</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map(p => (
            <div key={p.id} className={`rounded-2xl border p-8 ${p.highlight ? "border-gold bg-gradient-to-b from-gold-soft/40 to-card shadow-lg scale-[1.02]" : "border-border bg-card"}`}>
              {p.highlight && <Badge className="bg-gold text-primary-foreground mb-3">Paling Populer</Badge>}
              <div className="font-display text-2xl">{p.name}</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold">{p.price === 0 ? "Gratis" : formatRupiah(p.price)}</span>
                {p.originalPrice && <span className="text-sm text-muted-foreground line-through">{formatRupiah(p.originalPrice)}</span>}
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map(f => (
                  <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold mt-0.5" />{f}</li>
                ))}
              </ul>
              <Button className={`w-full mt-8 ${p.highlight ? "bg-gold hover:bg-gold/90 text-primary-foreground" : ""}`} variant={p.highlight ? "default" : "outline"}>Pilih Paket</Button>
            </div>
          ))}
        </div>
      </section>

      {/* How */}
      <section id="cara" className="bg-card/50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl">Cara Kerja</h2>
            <p className="mt-3 text-muted-foreground">3 langkah mudah saja</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map(s => (
              <div key={s.n} className="rounded-2xl bg-card border border-border p-8">
                <div className="font-display text-5xl text-gold">{s.n}</div>
                <div className="mt-4 font-semibold text-lg">{s.t}</div>
                <p className="text-muted-foreground mt-2 text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl">Cerita Pasangan</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map(t => (
            <div key={t.n} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="text-gold mb-3">★★★★★</div>
              <p className="italic text-muted-foreground">"{t.q}"</p>
              <div className="mt-4 font-display">— {t.n}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-card/50 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl">Tanya Jawab</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(f => (
              <details key={f.q} className="rounded-xl border border-border bg-card p-5 group">
                <summary className="cursor-pointer font-semibold flex justify-between items-center">{f.q}<span className="text-gold group-open:rotate-45 transition">+</span></summary>
                <p className="mt-3 text-muted-foreground text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-foreground to-foreground/90 text-background p-10 md:p-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl">Siap memulai perjalanan kalian?</h2>
          <p className="mt-3 text-background/70">Buat undangan pertama kalian gratis, sekarang juga.</p>
          <Link to="/wizard"><Button size="lg" className="mt-6 bg-gold hover:bg-gold/90 text-primary-foreground">Mulai Sekarang</Button></Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
