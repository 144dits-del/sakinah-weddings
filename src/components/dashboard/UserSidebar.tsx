import { Link, useRouterState } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

const menu = [
  "Dashboard","Pengaturan Umum","Pilih Tema","Mempelai Pria","Mempelai Wanita","Cerita Cinta",
  "Informasi Acara","Informasi Undangan","RSVP Undangan","Acara Tambahan","Bahasa Custom","Kirim Undangan",
  "Foto Galeri","Background Music","Slide Image","Video Galeri","Kado Nikah","Doa dan Harapan",
  "Wedding Wall","Pemberitahuan","Pengaturan Akun","Photo Profile","Kata Sandi","Histori Transaksi",
];

const premium = new Set(["Background Music","Video Galeri","Wedding Wall","Slide Image","Bahasa Custom"]);

export function UserSidebar({ active = "Dashboard" }: { active?: string }) {
  return (
    <aside className="hidden md:flex w-64 shrink-0 border-r border-border bg-sidebar flex-col h-screen sticky top-0">
      <Link to="/" className="flex items-center gap-2 p-5 border-b border-border">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-primary-foreground font-display text-sm">S</span>
        <span className="font-display text-lg">SakinahWeb</span>
      </Link>
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5 text-sm">
        {menu.map(m => (
          <Link to="/dashboard" key={m}
            className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-sidebar-accent
              ${m === active ? "bg-sidebar-accent text-foreground font-medium" : "text-muted-foreground"}`}>
            <span>{m}</span>
            {premium.has(m) && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold/20 text-gold">PRO</span>}
          </Link>
        ))}
        <Link to="/login" className="flex items-center gap-2 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 mt-2">
          <LogOut className="h-4 w-4" /> Keluar
        </Link>
      </nav>
    </aside>
  );
}
