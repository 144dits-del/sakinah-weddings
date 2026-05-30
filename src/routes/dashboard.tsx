import { createFileRoute, Link } from "@tanstack/react-router";
import { UserSidebar } from "@/components/dashboard/UserSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/dummy-data";
import {
  Lock,
  Settings,
  Image,
  Music,
  Heart,
  Gift,
  MessageCircle,
  Users,
  Calendar,
  Mail,
  Palette,
  Video,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

const features = [
  { i: Settings, t: "Pengaturan Umum" },
  { i: Palette, t: "Pilih Tema" },
  { i: Users, t: "Data Mempelai" },
  { i: Heart, t: "Cerita Cinta" },
  { i: Calendar, t: "Informasi Acara" },
  { i: Mail, t: "RSVP Undangan" },
  { i: Image, t: "Foto Galeri" },
  { i: Music, t: "Background Music", premium: true },
  { i: Video, t: "Video Galeri", premium: true },
  { i: Gift, t: "Kado Nikah" },
  { i: MessageCircle, t: "Doa & Harapan" },
  { i: MessageCircle, t: "Wedding Wall", premium: true },
];

function Dashboard() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <UserSidebar active="Dashboard" />
      <main className="flex-1 p-5 md:p-8 max-w-full overflow-x-hidden">
        <div className="mb-6">
          <h1 className="font-display text-3xl">Hai, Raditya Anwar 👋</h1>
          <p className="text-muted-foreground mt-1">Kelola undangan pernikahan kalian dari sini.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs text-muted-foreground">Paket Aktif</div>
            <div className="font-display text-xl mt-1">Gratis Sakinah</div>
            <Badge variant="secondary" className="mt-2">
              Free
            </Badge>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs text-muted-foreground">URL Undangan</div>
            <div className="font-mono text-sm mt-1">raditya-nurul.sakinahweb.id</div>
            <Link to="/preview">
              <Button size="sm" variant="outline" className="mt-2">
                Lihat Website
              </Button>
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs text-muted-foreground">RSVP Masuk</div>
            <div className="font-display text-2xl mt-1">
              42 <span className="text-base text-muted-foreground">tamu</span>
            </div>
          </div>
        </div>

        {/* Upgrade banner */}
        <div className="rounded-2xl bg-gradient-to-r from-gold-soft via-cream to-gold-soft border border-gold/30 p-6 md:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <div>
            <Badge className="bg-gold text-primary-foreground mb-2">Penawaran Terbatas</Badge>
            <h3 className="font-display text-2xl">Upgrade Premium</h3>
            <p className="text-muted-foreground mt-1">
              Buka semua fitur eksklusif hanya <b className="text-foreground">{formatRupiah(89000)}</b>
              <span className="line-through ml-2 text-sm">{formatRupiah(100000)}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/preview">
              <Button variant="outline">Lihat Website</Button>
            </Link>
            <Button className="bg-gold hover:bg-gold/90 text-primary-foreground">Upgrade Premium</Button>
          </div>
        </div>

        <h2 className="font-display text-xl mb-4">Pengaturan Undangan</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((f) => (
            <button
              key={f.t}
              className="text-left rounded-2xl border border-border bg-card p-5 hover:shadow-md transition relative group"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft mb-3">
                <f.i className="h-5 w-5" />
              </div>
              <div className="font-medium flex items-center gap-2">
                {f.t}
                {f.premium && <Lock className="h-3.5 w-3.5 text-gold" />}
              </div>
              {f.premium && (
                <Badge className="absolute top-3 right-3 bg-gold text-primary-foreground text-[10px]">Premium</Badge>
              )}
              <p className="text-xs text-muted-foreground mt-1">Kelola {f.t.toLowerCase()}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
