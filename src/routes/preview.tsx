import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast, Toaster } from "sonner";
import { useState, useEffect } from "react";
import {
  getStoredWeddingData,
  getStoredPackage,
  WeddingData,
} from "@/lib/dummy-data";
import {
  Heart,
  MapPin,
  Calendar,
  Gift,
  MessageCircle,
  Home as HomeIcon,
  Users,
  Image as ImageIcon,
  Compass,
  Lock,
} from "lucide-react";

import { z } from "zod";

export const Route = createFileRoute("/preview")({
  validateSearch: (search) => z.object({
    theme: z.string().optional()
  }).parse(search),
  component: Preview,
});

function Preview() {
  const { theme: queryTheme } = Route.useSearch();
  const [wedding, setWedding] = useState<WeddingData>(getStoredWeddingData());
  const [activePkg, setActivePkg] = useState("Sakinah");
  const [selectedTemplate, setSelectedTemplate] = useState("sakinah");
  const [isOpen, setIsOpen] = useState(false);
  const [previewModePhone, setPreviewModePhone] = useState(true);

  const isMonochrome = selectedTemplate === "monochrome" || selectedTemplate === "basic" || selectedTemplate === "t6" || selectedTemplate === "t9";

  const getTheme = (id: string) => {
    const norm = id.toLowerCase();
    const isMono = norm === "monochrome" || norm === "basic" || norm === "t6" || norm === "t9";
    const isRose = norm === "rose_red" || norm === "t2" || norm === "blossom" || norm === "bliss";
    const isMawaddah = norm === "t3" || norm === "chic";
    const isLuxury = norm === "dark_gold" || norm === "dark_gold_2" || norm === "t4";
    const isGarden = norm === "bloom" || norm === "t5" || norm === "bloom_bliss" || norm === "blossom_celebration";
    const isRoyal = norm === "t7";
    const isSweet = norm === "t8" || norm === "blossom";
    const isSakinah = norm === "t10";
    const isCobaBuatkan = norm === "t11";

    if (isCobaBuatkan) {
      return {
        bg: "bg-gradient-to-tr from-slate-950 via-violet-950 to-slate-900 text-white min-h-screen",
        coverBg: "bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 text-white",
        cardBg: "rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-md p-6 text-center relative overflow-hidden shadow-2xl text-white",
        btn: "bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white rounded-xl text-xs font-semibold cursor-pointer border-0",
        btnOutline: "border-white/20 hover:bg-white/10 text-white rounded-xl text-xs cursor-pointer bg-transparent",
        textGold: "text-fuchsia-400 font-bold",
        fontHead: "font-display",
        borderGold: "border-white/10",
        badge: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",
        avatar: "bg-gradient-to-br from-violet-400 to-fuchsia-500 text-white rounded-full",
        emoji: "💻"
      };
    }

    if (isMono) {
      return {
        bg: "bg-gradient-to-b from-zinc-100 via-white to-zinc-100 text-zinc-900",
        coverBg: "bg-white text-zinc-900",
        cardBg: "bg-white border-zinc-950 rounded-none border-2 p-5 text-center relative overflow-hidden text-zinc-900",
        btn: "bg-zinc-950 hover:bg-zinc-900 text-white rounded-none border border-zinc-950 cursor-pointer text-xs",
        btnOutline: "border-zinc-950 hover:bg-zinc-100 text-zinc-950 rounded-none border cursor-pointer text-xs bg-white",
        textGold: "text-zinc-950 font-bold",
        fontHead: "font-serif",
        borderGold: "border-zinc-950",
        badge: "bg-zinc-950 text-white hover:bg-zinc-950",
        avatar: "bg-zinc-950 text-white rounded-none border-2 border-zinc-950",
        emoji: "✦ ✦ ✦"
      };
    }

    if (isSakinah) {
      return {
        bg: "bg-gradient-to-br from-[#f8f5f0] via-[#fdfbf7] to-[#eedfc2]/40 text-stone-900",
        coverBg: "bg-gradient-to-b from-[#f8f5f0] via-[#fdfbf7] to-background text-stone-900",
        cardBg: "rounded-[2rem] border border-[#8c7853]/30 bg-white/95 p-6 text-center relative overflow-hidden shadow-md text-stone-900",
        btn: "bg-[#8c7853] hover:bg-[#726241] text-white rounded-full text-xs font-semibold cursor-pointer border-0",
        btnOutline: "border-[#8c7853]/40 hover:bg-[#8c7853]/10 text-[#8c7853] rounded-full text-xs cursor-pointer bg-white",
        textGold: "text-[#8c7853] font-bold",
        fontHead: "font-display",
        borderGold: "border-[#8c7853]/20",
        badge: "bg-[#8c7853] text-white",
        avatar: "bg-gradient-to-br from-[#bda87f] to-[#8c7853] text-white rounded-full",
        emoji: "🦢"
      };
    }

    if (isRose) {
      return {
        bg: "bg-gradient-to-br from-rose-50 via-pink-50/30 to-rose-100/40 text-rose-950",
        coverBg: "bg-gradient-to-b from-rose-50 via-pink-50/50 to-background text-rose-950",
        cardBg: "rounded-2xl border border-rose-200 bg-white/80 p-5 text-center relative overflow-hidden shadow-md text-rose-950",
        btn: "bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs font-semibold cursor-pointer",
        btnOutline: "border-rose-300 hover:bg-rose-50 text-rose-500 hover:text-rose-600 rounded-full text-xs cursor-pointer",
        textGold: "text-rose-500",
        fontHead: "font-display",
        borderGold: "border-rose-200",
        badge: "bg-rose-500 text-white",
        avatar: "bg-gradient-to-br from-rose-400 to-pink-500 text-white rounded-full",
        emoji: "🌹"
      };
    }

    if (isMawaddah) {
      return {
        bg: "bg-gradient-to-br from-amber-50 via-yellow-50/30 to-amber-100/30 text-amber-950",
        coverBg: "bg-gradient-to-b from-amber-50 via-ivory to-background text-amber-950",
        cardBg: "rounded-2xl border border-amber-200 bg-white p-5 text-center relative overflow-hidden shadow-sm text-amber-950",
        btn: "bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs font-semibold cursor-pointer",
        btnOutline: "border-amber-300 hover:bg-amber-50 text-amber-700 rounded-full text-xs cursor-pointer",
        textGold: "text-amber-600",
        fontHead: "font-display",
        borderGold: "border-amber-200",
        badge: "bg-amber-600 text-white",
        avatar: "bg-gradient-to-br from-amber-400 to-yellow-500 text-white rounded-full",
        emoji: "💛"
      };
    }

    if (isLuxury) {
      return {
        bg: "bg-gradient-to-br from-zinc-900 via-stone-900 to-black text-stone-100",
        coverBg: "bg-gradient-to-b from-stone-950 via-zinc-900 to-stone-950 text-stone-100",
        cardBg: "rounded-2xl border border-amber-500/30 bg-zinc-950 p-5 text-center relative overflow-hidden shadow-xl text-stone-100",
        btn: "bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-bold rounded-full text-xs cursor-pointer",
        btnOutline: "border-amber-500/50 hover:bg-amber-500/10 text-amber-400 rounded-full text-xs cursor-pointer",
        textGold: "text-amber-400 font-bold",
        fontHead: "font-display",
        borderGold: "border-amber-500/25",
        badge: "bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold",
        avatar: "bg-gradient-to-br from-amber-400 to-yellow-500 text-black rounded-full",
        emoji: "✨"
      };
    }

    if (isGarden) {
      return {
        bg: "bg-gradient-to-br from-green-50 via-emerald-50/20 to-emerald-100/30 text-emerald-950",
        coverBg: "bg-gradient-to-b from-green-50 via-ivory to-background text-emerald-950",
        cardBg: "rounded-2xl border border-emerald-200 bg-white/90 p-5 text-center relative overflow-hidden shadow-sm text-emerald-950",
        btn: "bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold cursor-pointer",
        btnOutline: "border-emerald-300 hover:bg-emerald-50 text-emerald-700 rounded-full text-xs cursor-pointer",
        textGold: "text-emerald-600",
        fontHead: "font-display",
        borderGold: "border-emerald-200",
        badge: "bg-emerald-600 text-white",
        avatar: "bg-gradient-to-br from-emerald-400 to-green-500 text-white rounded-full",
        emoji: "🌿"
      };
    }

    if (isRoyal) {
      return {
        bg: "bg-gradient-to-br from-slate-900 via-blue-950 to-zinc-950 text-amber-100",
        coverBg: "bg-gradient-to-b from-blue-950 via-slate-900 to-zinc-950 text-amber-100",
        cardBg: "rounded-2xl border border-amber-400/40 bg-slate-950 p-5 text-center relative overflow-hidden shadow-xl text-amber-100",
        btn: "bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full text-xs font-semibold cursor-pointer",
        btnOutline: "border-amber-400/50 hover:bg-amber-400/10 text-amber-300 rounded-full text-xs cursor-pointer",
        textGold: "text-amber-400",
        fontHead: "font-display",
        borderGold: "border-amber-400/30",
        badge: "bg-amber-500 text-slate-950",
        avatar: "bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 rounded-full",
        emoji: "👑"
      };
    }

    if (isSweet) {
      return {
        bg: "bg-gradient-to-br from-pink-50 via-purple-50/20 to-indigo-100/30 text-purple-950",
        coverBg: "bg-gradient-to-b from-pink-50 via-ivory to-background text-purple-950",
        cardBg: "rounded-2xl border border-pink-200 bg-white/90 p-5 text-center relative overflow-hidden shadow-sm text-purple-950",
        btn: "bg-pink-500 hover:bg-pink-600 text-white rounded-full text-xs font-semibold cursor-pointer",
        btnOutline: "border-pink-300 hover:bg-pink-50 text-pink-700 rounded-full text-xs cursor-pointer",
        textGold: "text-pink-500",
        fontHead: "font-display",
        borderGold: "border-pink-200",
        badge: "bg-pink-500 text-white",
        avatar: "bg-gradient-to-br from-pink-400 to-purple-500 text-white rounded-full",
        emoji: "🌸"
      };
    }

    // Default Sakinah Theme
    return {
      bg: "bg-gradient-to-br from-cream via-ivory to-gold-soft/20 text-foreground",
      coverBg: "bg-gradient-to-b from-cream via-ivory to-background text-foreground",
      cardBg: "rounded-2xl border border-border bg-card p-5 text-center relative overflow-hidden shadow-sm text-foreground",
      btn: "bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold cursor-pointer",
      btnOutline: "border-border hover:bg-gold-soft/10 text-muted-foreground hover:text-foreground rounded-full text-xs cursor-pointer",
      textGold: "text-gold",
      fontHead: "font-display",
      borderGold: "border-gold/15",
      badge: "bg-gold text-primary-foreground",
      avatar: "bg-gradient-to-br from-gold to-gold-soft text-white rounded-full",
      emoji: "🌸"
    };
  };

  const theme = getTheme(selectedTemplate);

  const [activeTab, setActiveTab] = useState("Home");
  const [tabKey, setTabKey] = useState(0); // Trigger tab slide-in transition
  const [wishes, setWishes] = useState<any[]>([
    { name: "Dewi Lestari", relation: "Sahabat Wanita", text: "Selamat menempuh hidup baru bibi & rarw! Semoga sakinah mawaddah warahmah selalu." },
    { name: "Yusuf Kuncoro", text: "Selamat ya, semoga berkah pernikahannya." }
  ]);
  const [wishName, setWishName] = useState("");
  const [wishRelation, setWishRelation] = useState("Teman");
  const [wishText, setWishText] = useState("");

  // Live countdown state
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  // Update target countdown live
  useEffect(() => {
    let targetTime = new Date("2026-05-30T14:30:00").getTime();
    if (wedding.akad && wedding.akad.date) {
      try {
        const parsed = new Date(wedding.akad.date).getTime();
        if (!isNaN(parsed)) {
          targetTime = parsed;
        }
      } catch (e) {}
    }

    const nowAtStart = new Date().getTime();
    let isPast = targetTime - nowAtStart < 0;

    const finalTarget = isPast 
      ? nowAtStart + (5 * 24 * 60 * 60 * 1000) + (12 * 60 * 60 * 1000) + (34 * 60 * 1000) + (12 * 1000)
      : targetTime;

    const updateTimer = () => {
      const now = new Date().getTime();
      let diff = finalTarget - now;

      if (diff < 0) {
        diff = 0;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds, isPast });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [wedding]);

  // Muat data dari localStorage saat render pertama
  useEffect(() => {
    setWedding(getStoredWeddingData());
    setActivePkg(getStoredPackage());
    setSelectedTemplate(queryTheme || localStorage.getItem("sakinah_selected_template") || "sakinah");

    // Dengarkan perubahan jika user mengubah sesuatu di dashboard
    const handleStorageChange = () => {
      setWedding(getStoredWeddingData());
      setActivePkg(getStoredPackage());
      setSelectedTemplate(queryTheme || localStorage.getItem("sakinah_selected_template") || "sakinah");
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("sakinah_package_changed", handleStorageChange);
    window.addEventListener("sakinah_template_changed", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("sakinah_package_changed", handleStorageChange);
      window.removeEventListener("sakinah_template_changed", handleStorageChange);
    };
  }, []);

  const handleBukaUndangan = () => {
    setIsOpen(true);
    toast.success("Musik dimainkan (Beautiful - Instrumental 🎵)");
  };

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishText.trim()) {
      toast.error("Nama dan ucapan doa harus diisi!");
      return;
    }
    const newWish = { name: wishName, relation: wishRelation, text: wishText };
    setWishes([newWish, ...wishes]);
    setWishName("");
    setWishText("");
    toast.success("Doa & ucapan restu Anda berhasil dikirim!");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setTabKey((prev) => prev + 1); // Reset tab transition animation
  };

  const isFeatureLocked = (feature: string) => {
    if (activePkg === "Sakinah") {
      if (feature === "Cerita" || feature === "Ucapan" || feature === "Kado") return true;
    }
    return false;
  };

  const isMapAddressUnset = (address: string) => {
    return !address || address.trim() === "" || address.trim() === "Peta belum diatur";
  };

  const renderMapPreview = (address: string, mapsUrl?: string) => {
    if (!mapsUrl || mapsUrl.trim() === "") {
      return (
        <div className="h-36 rounded-lg bg-cream/40 border border-gold/15 flex flex-col items-center justify-center text-[10px] text-muted-foreground p-3 text-center">
          <Compass className="h-5 w-5 text-gold/60 mb-1" />
          <span>Lokasi: {address}</span>
          <span className="text-[8px] text-muted-foreground/80 mt-1">(Tautan Peta belum diatur di Dashboard)</span>
        </div>
      );
    }

    if (mapsUrl.includes("<iframe")) {
      let cleanedIframe = mapsUrl
        .replace(/width="[0-9%]+"/, 'width="100%"')
        .replace(/height="[0-9%]+"/, 'height="100%"');
      if (!cleanedIframe.includes("style=")) {
        cleanedIframe = cleanedIframe.replace("<iframe", '<iframe style="border:0; width:100%; height:100%; border-radius:0.5rem;"');
      }
      return (
        <div 
          className="h-36 w-full rounded-lg overflow-hidden border border-border bg-muted/40"
          dangerouslySetInnerHTML={{ __html: cleanedIframe }}
        />
      );
    }

    return (
      <a 
        href={mapsUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="h-36 rounded-lg bg-gradient-to-br from-cream/50 to-gold-soft/20 border border-gold/20 flex flex-col items-center justify-center text-[10px] text-muted-foreground hover:bg-gold-soft/30 transition p-4 text-center cursor-pointer group"
      >
        <MapPin className="h-6 w-6 text-gold group-hover:scale-110 transition mb-1" />
        <span className="font-semibold text-foreground">Klik untuk Buka Google Maps</span>
        <span className="text-[8px] text-gold mt-1 max-w-full px-2 truncate">{mapsUrl}</span>
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-muted/40 py-8 px-4 flex flex-col justify-center items-center">
      <Toaster position="top-right" richColors />
      
      {/* Tombol Kembali & Toggle Mode */}
      <div className={`w-full ${previewModePhone ? "max-w-md" : "max-w-5xl"} mb-4 flex justify-between items-center px-2 transition-all duration-300`}>
        <Link to="/dashboard">
          <Button size="sm" variant="outline" className="rounded-full text-xs font-semibold">
            ← Dashboard
          </Button>
        </Link>
        <div className="flex bg-muted border border-border p-1 rounded-full text-[10px] items-center gap-1">
          <button
            type="button"
            onClick={() => setPreviewModePhone(true)}
            className={`px-3 py-1 rounded-full flex items-center gap-1 font-semibold transition cursor-pointer border-0 bg-transparent
              ${previewModePhone ? "bg-background text-foreground shadow-sm font-bold" : "text-muted-foreground hover:text-foreground"}`}
          >
            📱 Mobile
          </button>
          <button
            type="button"
            onClick={() => setPreviewModePhone(false)}
            className={`px-3 py-1 rounded-full flex items-center gap-1 font-semibold transition cursor-pointer border-0 bg-transparent
              ${!previewModePhone ? "bg-background text-foreground shadow-sm font-bold" : "text-muted-foreground hover:text-foreground"}`}
          >
            💻 Desktop Web
          </button>
        </div>
      </div>

      {previewModePhone ? (
        /* Frame Handphone Simulator */
        <div className={`max-w-md w-full aspect-[9/19] min-h-[680px] h-[820px] max-h-[88vh] rounded-[2.5rem] overflow-hidden border-8 border-foreground bg-background shadow-2xl relative flex flex-col ${isMonochrome ? "border-zinc-950" : ""}`}>
          
          {/* Cover Undangan (Awal Mula Dibuka) */}
          {!isOpen ? (
            <section className={`absolute inset-0 z-50 ${theme.coverBg} flex flex-col items-center justify-center text-center p-6 select-none overflow-hidden animate-fade-in`}>
              
              {/* Corner border ornaments for Monochrome */}
              {isMonochrome && (
                <>
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-zinc-950" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-zinc-950" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-zinc-950" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-zinc-950" />
                </>
              )}

              {/* Floral branch ornaments for t10 (Sakinah Theme) & t11 */}
              {(selectedTemplate === "t10" || selectedTemplate === "t11") && (
                <>
                  <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none select-none opacity-90 animate-fade-in">
                    <svg viewBox="0 0 100 100" className={`w-full h-full ${selectedTemplate === "t11" ? "fill-fuchsia-500/10" : "fill-[#8c7853]/25"}`}>
                      <path d="M 0 0 C 40 10, 80 50, 100 100 C 60 80, 20 40, 0 0 Z" />
                    </svg>
                  </div>
                  <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none select-none opacity-90 animate-fade-in">
                    <svg viewBox="0 0 100 100" className={`w-full h-full ${selectedTemplate === "t11" ? "fill-fuchsia-500/10" : "-scale-x-100 fill-[#8c7853]/25"}`}>
                      <path d="M 0 0 C 40 10, 80 50, 100 100 C 60 80, 20 40, 0 0 Z" />
                    </svg>
                  </div>
                </>
              )}

              {/* Hiasan Bunga Mini / Bintang */}
              <div className={`absolute top-8 ${isMonochrome ? "text-zinc-950 font-serif text-xl" : "text-[#8c7853] text-2xl animate-pulse"}`}>
                {selectedTemplate === "t10" ? "🕊️" : selectedTemplate === "t11" ? "💻" : isMonochrome ? "✦ ✦ ✦" : "🌸"}
              </div>
              
              <div className={`text-[10px] tracking-[0.4em] uppercase ${theme.textGold} mb-4`}>THE WEDDING OF</div>

              {(selectedTemplate === "t10" || selectedTemplate === "t11") && (
                <div className="mb-4 animate-bounce duration-1000">
                  <span className="text-4xl">{selectedTemplate === "t11" ? "💻" : "🕊️"}</span>
                </div>
              )}
              
              <div className="space-y-1">
                <h1 className={`${theme.fontHead} text-4xl font-extrabold capitalize tracking-tight`}>
                  {wedding.groom.nickname}
                </h1>
                <div className={`${theme.fontHead} text-2xl ${theme.textGold} italic my-1 font-semibold`}>&</div>
                <h1 className={`${theme.fontHead} text-4xl font-extrabold capitalize tracking-tight`}>
                  {wedding.bride.nickname}
                </h1>
              </div>

              <div className="mt-8 text-xs text-muted-foreground tracking-wide font-semibold">
                Akan segera melangsungkan pernikahan pada:
              </div>
              <div className={`mt-2 text-sm font-bold ${theme.fontHead}`}>
                Sabtu, 30 Mei 2026
              </div>

              {/* Live Ticking Countdown */}
              <div className={`mt-6 p-4 max-w-xs w-full mx-auto ${isMonochrome ? "bg-zinc-50 border border-zinc-950 rounded-none" : "rounded-2xl bg-gold-soft/30 border border-gold/15"}`}>
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">
                  {countdown.isPast ? "Simulasi Hitung Mundur (Acara Berlalu)" : "Hitung Mundur Acara"}
                </div>
                <div className="grid grid-cols-4 gap-1.5 mt-2">
                  {[
                    { v: countdown.days, l: "Hari" },
                    { v: countdown.hours, l: "Jam" },
                    { v: countdown.minutes, l: "Menit" },
                    { v: countdown.seconds, l: "Detik" },
                  ].map((item, idx) => (
                    <div key={idx} className={`rounded-lg p-1.5 text-center ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "bg-background/80"}`}>
                      <div className={`${theme.fontHead} text-base font-black ${theme.textGold} leading-none`}>
                        {item.v.toString().padStart(2, "0")}
                      </div>
                      <div className="text-[7px] text-muted-foreground uppercase font-bold mt-1">
                        {item.l}
                      </div>
                    </div>
                  ))}
                </div>
                {countdown.isPast && (
                  <div className="text-[8px] text-rose-600 font-bold mt-2 uppercase tracking-wider animate-pulse">
                    ⚠️ STATUS: ACARA TELAH BERLALU
                  </div>
                )}
              </div>

              <Button
                onClick={handleBukaUndangan}
                className={`mt-8 ${theme.btn} px-8 py-5 h-auto flex items-center gap-2 group transform hover:scale-105 transition duration-300`}
              >
                <Heart className={`h-4 w-4 ${isMonochrome ? "fill-zinc-950 text-white" : "fill-primary-foreground"} group-hover:scale-125 transition`} />
                Buka Undangan
              </Button>
              
              <div className={`absolute bottom-6 ${isMonochrome ? "text-zinc-950 font-serif text-xl" : "text-gold text-2xl animate-pulse"}`}>
                {isMonochrome ? "✦ ✦ ✦" : "🌸"}
              </div>
            </section>
          ) : (
            /* Setelah Buka Undangan (Layout dengan Bottom Bar) */
            <div className={`flex-1 flex flex-col justify-between h-full ${isMonochrome ? "bg-white text-zinc-900" : "bg-background"} overflow-hidden`}>
              
              {/* Tampilan Content Area (Scrollable) */}
              <div key={tabKey} className={`flex-1 overflow-y-auto scrollbar-none w-full animate-tab-slide ${activePkg === "Sakinah" ? "pb-20" : "pb-16"}`}>
                
                {/* TAB 1: HOME */}
                {activeTab === "Home" && (
                  <section className={`${isMonochrome ? "bg-white text-zinc-900 relative" : "bg-gradient-to-b from-cream/40 via-background to-background"} min-h-full flex flex-col items-center justify-center p-6 text-center select-none py-16`}>
                    
                    {isMonochrome && (
                      <>
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-zinc-950" />
                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-zinc-950" />
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-zinc-950" />
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-zinc-950" />
                      </>
                    )}

                    <div className={`text-[9px] tracking-[0.3em] uppercase ${theme.textGold} mb-3`}>THE WEDDING OF</div>
                    <h1 className={`${theme.fontHead} text-3xl font-black capitalize`}>
                      {wedding.groom.nickname} & {wedding.bride.nickname}
                    </h1>
                    <p className="text-xs text-muted-foreground mt-4 max-w-xs leading-relaxed">
                      Akan segera melangsungkan pernikahan pada hari bahagia kami.
                    </p>
                    
                    {/* Countdown live */}
                    <div className={`my-8 p-4 w-full max-w-xs mx-auto ${isMonochrome ? "bg-zinc-50 border border-zinc-950 rounded-none" : "rounded-2xl bg-gold-soft/20 border border-gold/10"}`}>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { v: countdown.days, l: "Hari" },
                          { v: countdown.hours, l: "Jam" },
                          { v: countdown.minutes, l: "Menit" },
                          { v: countdown.seconds, l: "Detik" },
                        ].map((item, idx) => (
                          <div key={idx} className={`rounded-xl p-2.5 text-center ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "bg-background/80"}`}>
                            <div className={`${theme.fontHead} text-lg font-black ${theme.textGold}`}>
                              {item.v.toString().padStart(2, "0")}
                            </div>
                            <div className="text-[8px] text-muted-foreground uppercase font-bold mt-1">
                              {item.l}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground font-semibold">
                      Sabtu, 30 Mei 2026
                    </div>
                    <div className={`mt-8 ${isMonochrome ? "text-zinc-900 font-serif text-xl animate-pulse" : "text-gold text-2xl"}`}>
                      {isMonochrome ? "✦ ✦ ✦" : "💍"}
                    </div>
                  </section>
                )}

                {/* TAB 2: MEMPELAI */}
                {activeTab === "Mempelai" && (
                  <section className="p-6 space-y-6 text-center py-10 relative">
                    {isMonochrome && (
                      <>
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-zinc-950 pointer-events-none" />
                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-zinc-950 pointer-events-none" />
                      </>
                    )}
                    <div className="space-y-2">
                      <p className={`${theme.fontHead} text-xl ${theme.textGold}`}>Assalamu'alaikum</p>
                      <p className="text-xs text-muted-foreground leading-relaxed italic max-w-sm mx-auto">
                        Dengan Rahmat Allah yang Maha Kuasa, InsyaAllah kami akan melangsungkan pernikahan pada:
                      </p>
                      <p className="text-xs font-semibold">Sabtu, 30 Mei 2026</p>
                    </div>

                    {/* Profil Pria */}
                    <div className={theme.cardBg}>
                      {isMonochrome && (
                        <>
                          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                        </>
                      )}
                      <div className={`mx-auto h-20 w-20 flex items-center justify-center ${theme.fontHead} text-xl font-bold mb-3 ${theme.avatar}`}>
                        {wedding.groom.nickname.charAt(0).toUpperCase()}
                      </div>
                      <div className={`${theme.fontHead} text-lg font-black capitalize`}>
                        {wedding.groom.fullName}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Putra dari <br />
                        <span className="font-semibold text-foreground">{wedding.groom.father}</span> &{" "}
                        <span className="font-semibold text-foreground">{wedding.groom.mother}</span>
                      </p>
                    </div>

                    {/* Profil Wanita */}
                    <div className={theme.cardBg}>
                      {isMonochrome && (
                        <>
                          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                        </>
                      )}
                      <div className={`mx-auto h-20 w-20 flex items-center justify-center ${theme.fontHead} text-xl font-bold mb-3 ${theme.avatar}`}>
                        {wedding.bride.nickname.charAt(0).toUpperCase()}
                      </div>
                      <div className={`${theme.fontHead} text-lg font-black capitalize`}>
                        {wedding.bride.fullName}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Putri dari <br />
                        <span className="font-semibold text-foreground">{wedding.bride.father}</span> &{" "}
                        <span className="font-semibold text-foreground">{wedding.bride.mother}</span>
                      </p>
                    </div>
                  </section>
                )}

                {/* TAB 3: UNDANGAN (MENAMPILKAN ACARA & FITUR SCROLLABLE) */}
                {activeTab === "Undangan" && (
                  <section className="p-6 space-y-8 py-10 relative">
                    {isMonochrome && (
                      <>
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-zinc-950 pointer-events-none" />
                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-zinc-950 pointer-events-none" />
                      </>
                    )}
                    <div className="text-center space-y-2">
                      <h2 className={`${theme.fontHead} text-2xl font-bold`}>Undangan dan Acara</h2>
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                        Bahagia rasanya apabila anda berkenan hadir dan memberikan doa restu kepada kami. Kami mengundang anda untuk hadir dalam acara resepsi pernikahan kami berikut ini.
                      </p>
                    </div>

                    {/* Card Akad Nikah */}
                    <div className={theme.cardBg}>
                      {!isMonochrome && <div className="absolute top-0 inset-x-0 h-1 bg-gold" />}
                      {isMonochrome && (
                        <>
                          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                        </>
                      )}
                      <h3 className={`${theme.fontHead} text-lg font-black`}>Akad Nikah</h3>
                      <div className="my-3 flex flex-col items-center justify-center gap-1 text-xs">
                        <div className={`flex items-center gap-1.5 font-semibold ${theme.textGold}`}>
                          <Calendar className="h-3.5 w-3.5" />
                          Sabtu, 30 Mei 2026
                        </div>
                        <div className="text-muted-foreground">Pukul 14:30 - 14:30 WIB</div>
                      </div>
                      <div className="text-[10px] text-muted-foreground flex justify-center items-start gap-1">
                        <MapPin className={`h-3.5 w-3.5 ${theme.textGold} shrink-0 mt-0.5`} />
                        <span>{wedding.akad.venue}</span>
                      </div>
                    </div>

                    {/* Card Resepsi */}
                    <div className={theme.cardBg}>
                      {!isMonochrome && <div className="absolute top-0 inset-x-0 h-1 bg-gold" />}
                      {isMonochrome && (
                        <>
                          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                        </>
                      )}
                      <h3 className={`${theme.fontHead} text-lg font-black`}>Resepsi Pernikahan</h3>
                      <div className="my-3 flex flex-col items-center justify-center gap-1 text-xs">
                        <div className={`flex items-center gap-1.5 font-semibold ${theme.textGold}`}>
                          <Calendar className="h-3.5 w-3.5" />
                          Minggu, 31 Mei 2026
                        </div>
                        <div className="text-muted-foreground">Pukul 14:30 - 14:30 WIB</div>
                      </div>
                      <div className="text-[10px] text-muted-foreground flex justify-center items-start gap-1">
                        <MapPin className={`h-3.5 w-3.5 ${theme.textGold} shrink-0 mt-0.5`} />
                        <span>{wedding.resepsi.venue}</span>
                      </div>
                    </div>

                    {/* Kisah Cinta (Scrollable) */}
                    <div className={`border-t ${theme.borderGold} pt-6 space-y-4`}>
                      <h3 className={`${theme.fontHead} text-lg font-bold text-center flex items-center justify-center gap-1.5`}>
                        {isMonochrome ? "✦ Kisah Cinta Kami" : "💖 Kisah Cinta Kami"}
                      </h3>
                      {isFeatureLocked("Cerita") ? (
                        <div className={theme.cardBg}>
                          {isMonochrome && (
                            <>
                              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                            </>
                          )}
                          <Lock className={`h-5 w-5 mx-auto ${theme.textGold}`} />
                          <div className="text-xs font-semibold">Fitur Cerita Terkunci</div>
                          <p className="text-[10px] text-muted-foreground">
                            Upgrade paket untuk mengaktifkan kisah cinta.
                          </p>
                        </div>
                      ) : (
                        <div className="text-center py-4 text-xs text-muted-foreground italic">
                          Belum ada cerita cinta yang dibagikan.
                        </div>
                      )}
                    </div>

                    {/* Galeri Foto (Scrollable) */}
                    <div className={`border-t ${theme.borderGold} pt-6 space-y-4`}>
                      <h3 className={`${theme.fontHead} text-lg font-bold text-center flex items-center justify-center gap-1.5`}>
                        {isMonochrome ? "✦ Galeri Foto Bahagia" : "📸 Galeri Foto Bahagia"}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className={`aspect-square flex items-center justify-center text-[9px] text-muted-foreground font-semibold ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "rounded-xl bg-gradient-to-br from-cream to-gold-soft/30 border border-gold/10"}`}>
                            Foto Galeri {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Kado Nikah (Scrollable) */}
                    <div className={`border-t ${theme.borderGold} pt-6 space-y-4`}>
                      <h3 className={`${theme.fontHead} text-lg font-bold text-center flex items-center justify-center gap-1.5`}>
                        {isMonochrome ? "✦ Kado Digital (Cashless)" : "🎁 Kado Digital (Cashless)"}
                      </h3>
                      {isFeatureLocked("Kado") ? (
                        <div className={theme.cardBg}>
                          {isMonochrome && (
                            <>
                              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                            </>
                          )}
                          <Lock className={`h-5 w-5 mx-auto ${theme.textGold}`} />
                          <div className="text-xs font-semibold">Fitur Kado Terkunci</div>
                          <p className="text-[10px] text-muted-foreground">
                            Kado digital eksklusif hanya aktif mulai paket Mawaddah.
                          </p>
                        </div>
                      ) : (
                        <div className="text-center py-2 text-xs text-muted-foreground italic">
                          Fitur Kado Digital Aktif (Silahkan kirim ke rekening tertera)
                        </div>
                      )}
                    </div>

                    {/* Doa & Harapan (Scrollable) */}
                    <div className={`border-t ${theme.borderGold} pt-6 space-y-4`}>
                      <h3 className={`${theme.fontHead} text-lg font-bold text-center flex items-center justify-center gap-1.5`}>
                        {isMonochrome ? "✦ Doa & Harapan Tamu" : "💬 Doa & Harapan Tamu"}
                      </h3>
                      {isFeatureLocked("Ucapan") ? (
                        <div className={theme.cardBg}>
                          {isMonochrome && (
                            <>
                              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                            </>
                          )}
                          <Lock className={`h-5 w-5 mx-auto ${theme.textGold}`} />
                          <div className="text-xs font-semibold">Fitur Doa & RSVP Terkunci</div>
                          <p className="text-[10px] text-muted-foreground">
                            Tersedia mulai dari paket keanggotaan Mawaddah.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Form Doa */}
                          <form onSubmit={handleSendWish} className={`space-y-3 p-4 text-xs ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "bg-cream/10 rounded-xl border border-border"}`}>
                            <div className="space-y-1">
                              <Label className="text-[9px]">Nama Anda</Label>
                              <Input
                                value={wishName}
                                onChange={(e) => setWishName(e.target.value)}
                                placeholder="Nama lengkap..."
                                className={`text-xs h-8 bg-background ${isMonochrome ? "rounded-none border-zinc-950" : ""}`}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-[9px]">Pesan Doa Restu</Label>
                              <Textarea
                                value={wishText}
                                onChange={(e) => setWishText(e.target.value)}
                                placeholder="Tulis ucapan selamat..."
                                className={`text-xs ${isMonochrome ? "rounded-none border-zinc-950" : ""}`}
                                rows={2}
                              />
                            </div>
                            <Button type="submit" className={`w-full ${theme.btn} h-8 py-0 flex items-center justify-center font-semibold`}>
                              Kirim Doa Restu
                            </Button>
                          </form>

                          {/* List Doa */}
                          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {wishes.map((w, idx) => (
                              <div key={idx} className={`p-3 text-[10px] space-y-1 ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "bg-muted/30 rounded-lg border border-border/60"}`}>
                                <div className="font-bold flex justify-between items-center">
                                  <span>{w.name}</span>
                                  <Badge className={`text-[7px] h-3.5 font-bold px-1.5 ${theme.badge}`}>{w.relation || "Teman"}</Badge>
                                </div>
                                <p className="text-muted-foreground">"{w.text}"</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* TAB 4: MAP */}
                {activeTab === "Map" && (
                  <section className="p-6 space-y-6 py-10 relative">
                    {isMonochrome && (
                      <>
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-zinc-950 pointer-events-none" />
                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-zinc-950 pointer-events-none" />
                      </>
                    )}
                    <div className="text-center mb-2">
                      <h2 className={`${theme.fontHead} text-2xl font-bold`}>Peta Lokasi Acara</h2>
                    </div>

                    {/* Lokasi Akad */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lokasi Akad Nikah</h3>
                      <div className={`p-4 space-y-3 ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "rounded-xl border border-border bg-muted/20"}`}>
                        {isMapAddressUnset(wedding.akad.venue) ? (
                          <div className="text-xs text-muted-foreground text-center py-4 italic">Peta belum diatur</div>
                        ) : (
                          <>
                            <div className="text-xs font-semibold flex items-start gap-1.5">
                              <MapPin className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${theme.textGold}`} />
                              {wedding.akad.venue}
                            </div>
                            {renderMapPreview(wedding.akad.venue, wedding.akad.maps)}
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className={`w-full ${theme.btnOutline} py-2 h-auto`}
                              onClick={() => {
                                const url = wedding.akad.maps && wedding.akad.maps.startsWith("http") 
                                  ? wedding.akad.maps 
                                  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.akad.venue)}`;
                                window.open(url, "_blank");
                              }}
                            >
                              Buka Google Maps
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Lokasi Resepsi */}
                    <div className="space-y-2 pt-2">
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lokasi Resepsi Pernikahan</h3>
                      <div className={`p-4 space-y-3 ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "rounded-xl border border-border bg-muted/20"}`}>
                        {isMapAddressUnset(wedding.resepsi.venue) ? (
                          <div className="text-xs text-muted-foreground text-center py-4 italic">Peta belum diatur</div>
                        ) : (
                          <>
                            <div className="text-xs font-semibold flex items-start gap-1.5">
                              <MapPin className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${theme.textGold}`} />
                              {wedding.resepsi.venue}
                            </div>
                            {renderMapPreview(wedding.resepsi.venue, wedding.resepsi.maps)}
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className={`w-full ${theme.btnOutline} py-2 h-auto`}
                              onClick={() => {
                                const url = wedding.resepsi.maps && wedding.resepsi.maps.startsWith("http") 
                                  ? wedding.resepsi.maps 
                                  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.resepsi.venue)}`;
                                window.open(url, "_blank");
                              }}
                            >
                              Buka Google Maps
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </section>
                )}
              </div>

              {/* FIXED BOTTOM NAVIGATION BAR (MAKSIMAL 4 NAVIGASI KUNCI) */}
              <nav className={`absolute inset-x-0 z-30 h-14 border-t flex items-center justify-around text-[10px] font-bold shadow-[0_-2px_10px_rgba(0,0,0,0.05)] select-none ${isMonochrome ? "bg-white border-zinc-950 text-zinc-900" : "bg-background border-border text-muted-foreground"} ${activePkg === "Sakinah" ? "bottom-5" : "bottom-0"}`}>
                {[
                  { tab: "Home", icon: HomeIcon },
                  { tab: "Mempelai", icon: Users },
                  { tab: "Undangan", icon: Calendar },
                  { tab: "Map", icon: Compass },
                ].map((item) => {
                  const isActive = activeTab === item.tab;
                  return (
                    <button
                      key={item.tab}
                      type="button"
                      onClick={() => handleTabChange(item.tab)}
                      className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition relative border-0 bg-transparent cursor-pointer
                        ${isActive ? (isMonochrome ? "text-zinc-950 font-black" : "text-gold") : (isMonochrome ? "text-zinc-400 hover:text-zinc-900 font-normal" : "hover:text-foreground")}`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.tab}</span>
                      {isActive && <span className={`absolute bottom-1 w-4 h-0.5 rounded-full ${isMonochrome ? "bg-zinc-950" : "bg-gold"}`} />}
                    </button>
                  );
                })}
              </nav>

              {/* WATERMARK KHUSUS PAKET GRATIS (SAKINAH) DI BAWAH BOTTOM BAR */}
              {activePkg === "Sakinah" && (
                <div className={`absolute bottom-0 inset-x-0 z-30 h-5 border-t flex items-center justify-center text-[8px] font-semibold select-none ${isMonochrome ? "bg-zinc-100 border-zinc-200 text-zinc-600" : "bg-rose-50 border-rose-100 text-rose-600 dark:bg-rose-950/30 dark:border-rose-900/40"}`}>
                  Undangan ini dibuat gratis menggunakan <span className={`font-bold ml-1 ${isMonochrome ? "text-zinc-900" : "text-rose-700 dark:text-rose-400"}`}>sakinahweb.lovable.app</span>
                </div>
              )}

            </div>
          )}

        </div>
      ) : (
        /* Desktop Browser Simulator Frame */
        <div className="w-full max-w-5xl h-[720px] rounded-3xl border border-border shadow-2xl bg-background flex flex-col overflow-hidden transition-all duration-300 animate-scale-in">
          
          {/* Browser Window Header Control Bar */}
          <div className="bg-muted px-4 py-3 flex items-center gap-3 border-b border-border/85 shrink-0 select-none">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500 block" />
              <span className="h-3 w-3 rounded-full bg-amber-500 block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500 block" />
            </div>
            <div className="flex-1 bg-background text-[10px] text-muted-foreground px-4 py-1.5 rounded-lg border font-mono select-all flex items-center justify-between">
              <span>https://{wedding.subdomain || "di-ra"}.sakinahweb.lovable.app</span>
              <span className="text-emerald-600 font-bold">🔒 Secure Connection</span>
            </div>
          </div>

          {/* Desktop Content Screen (Same layout, but responsive desktop grids) */}
          <div className="flex-1 overflow-hidden relative flex flex-col text-foreground">
            
            {/* Invitation Cover overlay (if closed) */}
            {!isOpen ? (
              <section className={`absolute inset-0 z-50 ${theme.coverBg} ${theme.text} flex flex-col items-center justify-center text-center p-8 select-none overflow-hidden animate-fade-in`}>
                
                {/* Corner border ornaments for Monochrome */}
                {isMonochrome && (
                  <>
                    <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-zinc-950" />
                    <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-zinc-950" />
                    <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-zinc-950" />
                    <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-zinc-950" />
                  </>
                )}

                {/* Sakinah / Coba Buatkan custom floral/branch graphics */}
                {(selectedTemplate === "t10" || selectedTemplate === "t11") && (
                  <>
                    <div className="absolute top-0 left-0 w-32 h-32 opacity-80 pointer-events-none">
                      <svg viewBox="0 0 100 100" className={`w-full h-full ${selectedTemplate === "t11" ? "fill-fuchsia-500/10" : "fill-[#8c7853]/25"}`}>
                        <path d="M 0 0 C 40 10, 80 50, 100 100 C 60 80, 20 40, 0 0 Z" />
                      </svg>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-80 pointer-events-none -scale-x-100">
                      <svg viewBox="0 0 100 100" className={`w-full h-full ${selectedTemplate === "t11" ? "fill-fuchsia-500/10" : "fill-[#8c7853]/25"}`}>
                        <path d="M 0 0 C 40 10, 80 50, 100 100 C 60 80, 20 40, 0 0 Z" />
                      </svg>
                    </div>
                  </>
                )}

                <div className={`text-[12px] tracking-[0.6em] uppercase ${theme.textGold} mb-6`}>THE WEDDING OF</div>

                <div className="flex md:flex-row flex-col items-center justify-center gap-6 md:gap-12 my-6">
                  <h1 className={`${theme.fontHead} text-5xl md:text-7xl font-extrabold capitalize`}>
                    {wedding.groom.nickname}
                  </h1>
                  <span className={`${theme.fontHead} text-4xl ${theme.textGold} italic font-semibold`}>&</span>
                  <h1 className={`${theme.fontHead} text-5xl md:text-7xl font-extrabold capitalize`}>
                    {wedding.bride.nickname}
                  </h1>
                </div>

                <div className="mt-8 text-sm text-muted-foreground tracking-widest font-semibold uppercase">
                  Akan segera melangsungkan pernikahan pada:
                </div>
                <div className={`mt-3 text-lg font-bold tracking-wider ${theme.fontHead}`}>
                  Sabtu, 30 Mei 2026
                </div>

                {/* Countdown list */}
                <div className={`mt-8 p-5 max-w-md w-full mx-auto ${isMonochrome ? "bg-zinc-50 border border-zinc-950 rounded-none" : "rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"}`}>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { v: countdown.days, l: "Hari" },
                      { v: countdown.hours, l: "Jam" },
                      { v: countdown.minutes, l: "Menit" },
                      { v: countdown.seconds, l: "Detik" },
                    ].map((item, idx) => (
                      <div key={idx} className={`rounded-xl p-3 text-center ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "bg-black/20"}`}>
                        <div className={`${theme.fontHead} text-2xl font-black ${theme.textGold} leading-none`}>
                          {item.v.toString().padStart(2, "0")}
                        </div>
                        <div className="text-[9px] text-muted-foreground uppercase font-bold mt-1.5">
                          {item.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleBukaUndangan}
                  className={`mt-10 ${theme.btn} px-10 py-6 text-sm h-auto flex items-center gap-2 group transform hover:scale-105 transition duration-300`}
                >
                  <Heart className={`h-5 w-5 ${isMonochrome ? "fill-zinc-950 text-white" : "fill-primary-foreground"} group-hover:scale-125 transition`} />
                  Buka Undangan Web
                </Button>
              </section>
            ) : (
              /* Desktop Layout (dengan top header navigation bar dan scrollable sections) */
              <div className={`flex-1 flex flex-col justify-between h-full ${isMonochrome ? "bg-white text-zinc-900 animate-fade-in" : "bg-background animate-fade-in"} overflow-hidden`}>
                
                {/* Desktop Top Header Navigation Bar */}
                <header className={`h-16 px-8 border-b flex items-center justify-between select-none shrink-0 ${isMonochrome ? "bg-white border-zinc-950 text-zinc-900" : "bg-background/95 backdrop-blur border-border"}`}>
                  <div className={`font-display font-bold text-sm tracking-widest ${theme.textGold}`}>
                    {wedding.groom.nickname.toUpperCase()} & {wedding.bride.nickname.toUpperCase()}
                  </div>
                  <nav className="flex items-center gap-6 text-xs font-semibold">
                    {[
                      { tab: "Home", label: "Utama" },
                      { tab: "Mempelai", label: "Mempelai" },
                      { tab: "Undangan", label: "Acara & Cerita" },
                      { tab: "Map", label: "Peta Lokasi" },
                    ].map((item) => {
                      const isActive = activeTab === item.tab;
                      return (
                        <button
                          key={item.tab}
                          type="button"
                          onClick={() => handleTabChange(item.tab)}
                          className={`relative py-1 cursor-pointer border-0 bg-transparent transition font-semibold
                            ${isActive ? (isMonochrome ? "text-zinc-950 font-bold" : "text-gold") : (isMonochrome ? "text-zinc-400 hover:text-zinc-950" : "text-muted-foreground hover:text-foreground")}`}
                        >
                          {item.label}
                          {isActive && <span className={`absolute bottom-0 inset-x-0 h-0.5 rounded-full ${isMonochrome ? "bg-zinc-950" : "bg-gold"}`} />}
                        </button>
                      );
                    })}
                  </nav>
                </header>

                {/* Content Area */}
                <div key={tabKey} className={`flex-1 overflow-y-auto scrollbar-thin p-8 max-w-full ${theme.bg} ${theme.text}`}>
                  
                  {/* TAB 1: HOME */}
                  {activeTab === "Home" && (
                    <div className="grid md:grid-cols-2 gap-8 items-center min-h-[400px] max-w-4xl mx-auto py-8">
                      <div className="space-y-4 text-left">
                        <div className={`text-[11px] tracking-[0.4em] uppercase ${theme.textGold}`}>SAVE THE DATE</div>
                        <h1 className={`${theme.fontHead} text-5xl font-black capitalize leading-tight`}>
                          {wedding.groom.fullName} <br />
                          <span className={theme.textGold}>&</span> <br />
                          {wedding.bride.fullName}
                        </h1>
                        <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                          Kami mengundang Anda untuk hadir menyaksikan momen sakral pernikahan kami dan memberikan doa restu.
                        </p>
                        <div className="pt-4 flex gap-4 text-xs font-bold items-center">
                          <span>📅 Sabtu, 30 Mei 2026</span>
                          <span>📍 {wedding.akad.venue}</span>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className={theme.cardBg + " w-full max-w-xs p-8 text-foreground"}>
                          <div className="text-3xl animate-bounce mb-3">💍</div>
                          <div className="text-xs text-muted-foreground mb-4">Hitung Mundur Hari Bahagia</div>
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              { v: countdown.days, l: "Hari" },
                              { v: countdown.hours, l: "Jam" },
                              { v: countdown.minutes, l: "Menit" },
                              { v: countdown.seconds, l: "Detik" },
                            ].map((item, idx) => (
                              <div key={idx} className="bg-black/10 rounded-lg p-1.5 text-center">
                                <div className={`${theme.fontHead} text-base font-black ${theme.textGold}`}>{item.v}</div>
                                <div className="text-[7px] text-muted-foreground uppercase">{item.l}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: MEMPELAI */}
                  {activeTab === "Mempelai" && (
                    <div className="max-w-4xl mx-auto py-4 space-y-8">
                      <div className="text-center space-y-2">
                        <p className={`${theme.fontHead} text-2xl ${theme.textGold}`}>Kedua Mempelai</p>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                          Maha suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan.
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6 text-foreground">
                        <div className={theme.cardBg + " p-6 flex flex-col items-center"}>
                          <div className={`h-24 w-24 flex items-center justify-center ${theme.fontHead} text-3xl font-bold mb-4 ${theme.avatar}`}>
                            {wedding.groom.nickname.charAt(0).toUpperCase()}
                          </div>
                          <h3 className={`${theme.fontHead} text-xl font-black capitalize`}>{wedding.groom.fullName}</h3>
                          <p className="text-xs text-muted-foreground mt-2 text-center">
                            Putra tercinta dari: <br />
                            <span className="font-semibold text-foreground">{wedding.groom.father}</span> & <span className="font-semibold text-foreground">{wedding.groom.mother}</span>
                          </p>
                        </div>
                        <div className={theme.cardBg + " p-6 flex flex-col items-center"}>
                          <div className={`h-24 w-24 flex items-center justify-center ${theme.fontHead} text-3xl font-bold mb-4 ${theme.avatar}`}>
                            {wedding.bride.nickname.charAt(0).toUpperCase()}
                          </div>
                          <h3 className={`${theme.fontHead} text-xl font-black capitalize`}>{wedding.bride.fullName}</h3>
                          <p className="text-xs text-muted-foreground mt-2 text-center">
                            Putri tercinta dari: <br />
                            <span className="font-semibold text-foreground">{wedding.bride.father}</span> & <span className="font-semibold text-foreground">{wedding.bride.mother}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: UNDANGAN */}
                  {activeTab === "Undangan" && (
                    <div className="max-w-4xl mx-auto py-4 space-y-10">
                      <div className="grid md:grid-cols-2 gap-6 text-foreground">
                        <div className={theme.cardBg + " p-6"}>
                          <h3 className={`${theme.fontHead} text-lg font-black border-b pb-2 mb-4`}>Akad Nikah</h3>
                          <div className="space-y-3 text-xs text-left">
                            <p className="flex items-center gap-2">📅 <strong>Hari/Tanggal:</strong> Sabtu, 30 Mei 2026</p>
                            <p className="flex items-center gap-2">🕒 <strong>Waktu:</strong> 14:30 WIB - Selesai</p>
                            <p className="flex items-start gap-2">📍 <strong>Tempat:</strong> {wedding.akad.venue}</p>
                          </div>
                        </div>
                        <div className={theme.cardBg + " p-6"}>
                          <h3 className={`${theme.fontHead} text-lg font-black border-b pb-2 mb-4`}>Resepsi</h3>
                          <div className="space-y-3 text-xs text-left">
                            <p className="flex items-center gap-2">📅 <strong>Hari/Tanggal:</strong> Minggu, 31 Mei 2026</p>
                            <p className="flex items-center gap-2">🕒 <strong>Waktu:</strong> 14:30 WIB - Selesai</p>
                            <p className="flex items-start gap-2">📍 <strong>Tempat:</strong> {wedding.resepsi.venue}</p>
                          </div>
                        </div>
                      </div>

                      {/* Ucapan & Doa */}
                      <div className="grid md:grid-cols-12 gap-8 border-t border-border pt-8 text-foreground">
                        <div className="md:col-span-5 text-left">
                          <h4 className={`${theme.fontHead} text-lg font-bold mb-3`}>Kirim Doa Restu</h4>
                          <p className="text-xs text-muted-foreground mb-4">Berikan ucapan selamat & harapan terbaik untuk kami berdua.</p>
                          {isFeatureLocked("Ucapan") ? (
                            <div className="p-4 bg-muted/40 rounded-xl text-center text-xs text-muted-foreground border">
                              Fitur RSVP & Ucapan Terkunci. Upgrade Paket untuk mengaktifkan.
                            </div>
                          ) : (
                            <form onSubmit={handleSendWish} className="space-y-3 text-xs">
                              <div className="space-y-1">
                                <Label>Nama Lengkap</Label>
                                <Input value={wishName} onChange={e => setWishName(e.target.value)} className="bg-background h-8 text-xs font-semibold" />
                              </div>
                              <div className="space-y-1">
                                <Label>Pesan Harapan</Label>
                                <Textarea value={wishText} onChange={e => setWishText(e.target.value)} className="bg-background text-xs" rows={2} />
                              </div>
                              <Button type="submit" className={theme.btn + " w-full h-8 text-xs font-bold"}>Kirim Ucapan</Button>
                            </form>
                          )}
                        </div>
                        <div className="md:col-span-7 text-left space-y-4">
                          <h4 className={`${theme.fontHead} text-lg font-bold`}>Doa & Harapan Tamu</h4>
                          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-2">
                            {wishes.map((w, idx) => (
                              <div key={idx} className="p-3 bg-muted/30 border rounded-xl text-xs space-y-1">
                                <div className="font-bold flex justify-between items-center">
                                  <span>{w.name}</span>
                                  <Badge className={theme.badge + " text-[8px] px-1 h-4 border-0"}>{w.relation || "Teman"}</Badge>
                                </div>
                                <p className="text-muted-foreground italic">"{w.text}"</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: MAP */}
                  {activeTab === "Map" && (
                    <div className="max-w-4xl mx-auto py-4 space-y-6">
                      <div className="text-center">
                        <h2 className={`${theme.fontHead} text-2xl font-bold`}>Peta Lokasi Acara</h2>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6 text-left text-foreground">
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lokasi Akad Nikah</h4>
                          <div className="p-4 border rounded-2xl space-y-3 bg-white/80">
                            <p className="text-xs font-semibold">{wedding.akad.venue}</p>
                            {renderMapPreview(wedding.akad.venue, wedding.akad.maps)}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lokasi Resepsi</h4>
                          <div className="p-4 border rounded-2xl space-y-3 bg-white/80">
                            <p className="text-xs font-semibold">{wedding.resepsi.venue}</p>
                            {renderMapPreview(wedding.resepsi.venue, wedding.resepsi.maps)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                </div>

                {/* Footer Watermark for Free package */}
                {activePkg === "Sakinah" && (
                  <div className={`h-8 border-t flex items-center justify-center text-[9px] font-semibold select-none shrink-0 ${isMonochrome ? "bg-zinc-100 border-zinc-200 text-zinc-600" : "bg-rose-50 border-rose-100 text-rose-600 dark:bg-rose-950/30 dark:border-rose-900/40"}`}>
                    Undangan digital gratis dibuat di <span className="font-bold text-rose-700 ml-1">sakinahweb.lovable.app</span>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
