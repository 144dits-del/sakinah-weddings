import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background">
      <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-gold-soft/40 to-cream">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-primary-foreground font-display">S</span>
          <span className="font-display text-xl">SakinahWeb</span>
        </Link>
        <div>
          <h2 className="font-display text-4xl">Mulai gratis hari ini</h2>
          <p className="mt-3 text-muted-foreground">Bergabung dengan 12,000+ pasangan bahagia.</p>
        </div>
        <div className="text-sm text-muted-foreground">© 2026 SakinahWeb</div>
      </div>
      <div className="flex items-center justify-center p-6">
        <form onSubmit={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }} className="w-full max-w-sm space-y-5">
          <div>
            <h1 className="font-display text-3xl">Daftar Akun</h1>
            <p className="text-sm text-muted-foreground mt-1">Buat akun gratis dalam 30 detik</p>
          </div>
          <div className="space-y-2"><Label>Nama Lengkap</Label><Input required /></div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" required /></div>
          <div className="space-y-2"><Label>Kata Sandi</Label><Input type="password" required /></div>
          <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-primary-foreground">Buat Akun</Button>
          <p className="text-center text-sm text-muted-foreground">Sudah punya akun? <Link to="/login" className="text-gold hover:underline">Masuk</Link></p>
        </form>
      </div>
    </div>
  );
}
