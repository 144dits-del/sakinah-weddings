import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Flower2 } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-ivory/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-cream text-gold">
            <Flower2 className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-xl tracking-wide">SakinahWeb</div>
            <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Wedding Invitation</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-9 text-sm tracking-wide md:flex">
          <Link to="/marketplace" className="hover:text-gold transition">Template</Link>
          <a href="#harga" className="hover:text-gold transition">Paket</a>
          <a href="#kenapa" className="hover:text-gold transition">Tentang</a>
          <a href="#faq" className="hover:text-gold transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden sm:block"><Button variant="ghost" size="sm" className="rounded-full">Masuk</Button></Link>
          <Link to="/register">
            <Button size="sm" className="rounded-full bg-gold hover:bg-gold/90 text-primary-foreground px-5 shadow-sm">Daftar Gratis</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
