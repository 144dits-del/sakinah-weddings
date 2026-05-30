import { Flower2, Instagram, Mail, MessageCircle } from "lucide-react";
import { FloralDivider } from "./Florals";

export function Footer() {
  return (
    <footer className="relative bg-ivory border-t border-border/50 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=400&q=60"
        alt="" aria-hidden
        className="absolute -top-12 -left-12 h-56 w-56 object-cover opacity-15 rounded-full blur-[1px]"
      />
      <img
        src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=60"
        alt="" aria-hidden
        className="absolute -bottom-16 -right-16 h-64 w-64 object-cover opacity-15 rounded-full blur-[1px]"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-gold">
            <Flower2 className="h-5 w-5" />
            <span className="font-display text-2xl tracking-wide">SakinahWeb</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto italic">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri."
          </p>
          <FloralDivider className="mt-6" />
        </div>

        <div className="grid gap-10 md:grid-cols-4 text-sm">
          <div>
            <div className="font-display text-base mb-3">Tentang</div>
            <p className="text-muted-foreground leading-relaxed">Undangan pernikahan digital elegan, dirancang khusus untuk momen suci kalian.</p>
          </div>
          <div>
            <div className="font-display text-base mb-3">Produk</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>Template</li><li>Paket Harga</li><li>Fitur</li><li>Demo</li>
            </ul>
          </div>
          <div>
            <div className="font-display text-base mb-3">Bantuan</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>FAQ</li><li>Tutorial</li><li>Kebijakan</li><li>Syarat & Ketentuan</li>
            </ul>
          </div>
          <div>
            <div className="font-display text-base mb-3">Hubungi Kami</div>
            <div className="flex gap-3 text-muted-foreground">
              <a className="grid h-9 w-9 place-items-center rounded-full bg-cream border border-border hover:text-gold hover:border-gold transition" href="#"><Instagram className="h-4 w-4" /></a>
              <a className="grid h-9 w-9 place-items-center rounded-full bg-cream border border-border hover:text-gold hover:border-gold transition" href="#"><MessageCircle className="h-4 w-4" /></a>
              <a className="grid h-9 w-9 place-items-center rounded-full bg-cream border border-border hover:text-gold hover:border-gold transition" href="#"><Mail className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground">
          © 2026 SakinahWeb · Dibuat dengan cinta untuk pasangan Indonesia
        </div>
      </div>
    </footer>
  );
}
