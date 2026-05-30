import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-primary-foreground font-display text-lg">S</span>
          <span className="font-display text-xl">SakinahWeb</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link to="/marketplace" className="hover:text-gold">Template</Link>
          <a href="#harga" className="hover:text-gold">Harga</a>
          <a href="#cara" className="hover:text-gold">Cara Kerja</a>
          <a href="#faq" className="hover:text-gold">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login"><Button variant="ghost" size="sm">Masuk</Button></Link>
          <Link to="/register"><Button size="sm" className="bg-gold hover:bg-gold/90 text-primary-foreground">Daftar</Button></Link>
        </div>
      </div>
    </header>
  );
}
