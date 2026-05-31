import { Link } from "@tanstack/react-router";
import { LogOut, Lock, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getStoredPackage, setStoredPackage } from "@/lib/dummy-data";

const menu = [
  "Dashboard",
  "Pengaturan Umum",
  "Pilih Tema",
  "Mempelai Pria",
  "Mempelai Wanita",
  "Cerita Cinta",
  "Informasi Acara",
  "Informasi Undangan",
  "RSVP Undangan",
  "Acara Tambahan",
  "Bahasa Custom",
  "Kirim Undangan",
  "Foto Galeri",
  "Background Music",
  "Slide Image",
  "Video Galeri",
  "Kado Nikah",
  "Doa dan Harapan",
  "Wedding Wall",
  "Ucapan Meja",
  "Video Undangan",
  "Pemberitahuan",
  "Pengaturan Akun",
  "Photo Profile",
  "Kata Sandi",
  "Histori Transaksi",
];

// Menentukan fitur mana yang membutuhkan paket tertentu
const packageRequirements: Record<string, "Mawaddah" | "Warahmah"> = {
  "Cerita Cinta": "Mawaddah",
  "Acara Tambahan": "Mawaddah",
  "Bahasa Custom": "Mawaddah",
  "Kirim Undangan": "Mawaddah",
  "Background Music": "Mawaddah",
  "Slide Image": "Mawaddah",
  "Kado Nikah": "Mawaddah",
  "Doa dan Harapan": "Mawaddah",
  "Video Galeri": "Mawaddah",
  "Wedding Wall": "Mawaddah",
  "Ucapan Meja": "Mawaddah",
  "Video Undangan": "Warahmah",
};

export function UserSidebar({ active = "Dashboard" }: { active?: string }) {
  const [activePkg, setActivePkg] = useState("Sakinah");

  useEffect(() => {
    setActivePkg(getStoredPackage());

    // Dengarkan perubahan paket global
    const handlePkgChange = () => {
      setActivePkg(getStoredPackage());
    };
    window.addEventListener("sakinah_package_changed", handlePkgChange);
    return () => {
      window.removeEventListener("sakinah_package_changed", handlePkgChange);
    };
  }, []);

  const handlePackageChange = (pkg: string) => {
    setActivePkg(pkg);
    setStoredPackage(pkg);
    window.dispatchEvent(new Event("sakinah_package_changed"));
  };

  const isFeatureLocked = (m: string) => {
    const req = packageRequirements[m];
    if (!req) return false;
    if (activePkg === "Warahmah") return false;
    if (activePkg === "Mawaddah" && req === "Mawaddah") return false;
    return true;
  };

  return (
    <aside className="hidden md:flex w-64 shrink-0 border-r border-border bg-sidebar flex-col h-screen sticky top-0">
      <Link to="/" className="flex items-center gap-2 p-5 border-b border-border">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-primary-foreground font-display text-sm">
          S
        </span>
        <span className="font-display text-lg">SakinahWeb</span>
      </Link>

      {/* Package Switcher (Premium Testing Tool) */}
      <div className="p-4 border-b border-border bg-cream/35">
        <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
          Mode Pengujian Paket:
        </label>
        <div className="relative">
          <select
            value={activePkg}
            onChange={(e) => handlePackageChange(e.target.value)}
            className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-border bg-background cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold text-foreground"
          >
            <option value="Sakinah">Sakinah (Gratis)</option>
            <option value="Mawaddah">Mawaddah (Premium)</option>
            <option value="Warahmah">Warahmah (Eksklusif)</option>
          </select>
          <div className="absolute right-2 top-2.5 pointer-events-none">
            <CheckCircle2 className="h-3.5 w-3.5 text-gold fill-gold-soft" />
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5 text-xs">
        {menu.map((m) => {
          const locked = isFeatureLocked(m);
          return (
            <Link
              to="/dashboard"
              search={{ tab: m }}
              key={m}
              className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-sidebar-accent transition
                ${m === active ? "bg-sidebar-accent text-foreground font-semibold" : "text-muted-foreground"}`}
            >
              <span>{m}</span>
              {packageRequirements[m] && (
                <span className="flex items-center gap-1">
                  {locked ? (
                    <Lock className="h-3 w-3 text-muted-foreground/60" />
                  ) : (
                    <span className="text-[9px] px-1 rounded bg-gold/15 text-gold font-bold">
                      {packageRequirements[m] === "Warahmah" ? "ULTRA" : "PRO"}
                    </span>
                  )}
                </span>
              )}
            </Link>
          );
        })}
        <Link
          to="/login"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 mt-2 text-xs font-medium"
        >
          <LogOut className="h-4 w-4" /> Keluar
        </Link>
      </nav>
    </aside>
  );
}
