import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background">
      <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-cream to-gold-soft/40">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-primary-foreground font-display">S</span>
          <span className="font-display text-xl">SakinahWeb</span>
        </Link>
        <div>
          <h2 className="font-display text-4xl">Selamat datang kembali</h2>
          <p className="mt-3 text-muted-foreground">Lanjutkan perjalanan undangan pernikahan kalian.</p>
        </div>
        <div className="text-sm text-muted-foreground">© 2026 SakinahWeb</div>
      </div>
      <div className="flex items-center justify-center p-6">
        <form onSubmit={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }} className="w-full max-w-sm space-y-5">
          <div>
            <h1 className="font-display text-3xl">Masuk</h1>
            <p className="text-sm text-muted-foreground mt-1">Masukkan email & kata sandi kamu</p>
          </div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="kamu@email.com" required /></div>
          <div className="space-y-2"><Label>Kata Sandi</Label><Input type="password" placeholder="••••••••" required /></div>
          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" /> Ingat saya</label>
            <a className="text-gold hover:underline" href="#">Lupa sandi?</a>
          </div>
          <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-primary-foreground">Masuk</Button>
          <p className="text-center text-sm text-muted-foreground">Belum punya akun? <Link to="/register" className="text-gold hover:underline">Daftar</Link></p>
        </form>
      </div>
    </div>
  );
}
