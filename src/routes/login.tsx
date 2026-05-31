import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "dits144@gmail.com") {
      localStorage.setItem("sakinah_user_email", email);
      localStorage.setItem("sakinah_user_role", "admin");
      window.location.href = "/admin";
    } else {
      localStorage.setItem("sakinah_user_email", email);
      localStorage.setItem("sakinah_user_role", "user");
      window.location.href = "/dashboard";
    }
  };

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
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          <div>
            <h1 className="font-display text-3xl font-bold">Masuk</h1>
            <p className="text-sm text-muted-foreground mt-1">Masukkan email & kata sandi kamu</p>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="kamu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-xs"
            />
          </div>
          <div className="space-y-2">
            <Label>Kata Sandi</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-xs"
            />
          </div>
          <div className="flex justify-between text-xs">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-border text-gold focus:ring-gold" /> Ingat saya
            </label>
            <a className="text-gold hover:underline font-semibold" href="#">Lupa sandi?</a>
          </div>
          <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-primary-foreground font-semibold rounded-full h-10">
            Masuk
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Belum punya akun? <Link to="/register" className="text-gold hover:underline font-semibold">Daftar</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
