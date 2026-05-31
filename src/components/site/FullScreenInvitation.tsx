import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
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
  Volume2,
} from "lucide-react";

interface FullScreenInvitationProps {
  subdomain: string;
  guestName?: string;
  guestAddress?: string;
}

export default function FullScreenInvitation({
  subdomain,
  guestName,
  guestAddress,
}: FullScreenInvitationProps) {
  const [wedding, setWedding] = useState<WeddingData>(getStoredWeddingData());
  const [activePkg, setActivePkg] = useState("Sakinah");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [tabKey, setTabKey] = useState(0); // Digunakan untuk mereset animasi transisi
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

  useEffect(() => {
    // Muat data mempelai
    const storedData = getStoredWeddingData();
    setWedding(storedData);
    setActivePkg(getStoredPackage());

    // Dengarkan jika ada perubahan paket
    const handlePkgChange = () => {
      setActivePkg(getStoredPackage());
    };
    window.addEventListener("sakinah_package_changed", handlePkgChange);
    return () => {
      window.removeEventListener("sakinah_package_changed", handlePkgChange);
    };
  }, [subdomain]);

  const handleBukaUndangan = () => {
    setIsOpen(true);
    toast.success("Musik latar belakang dimainkan (Beautiful - Instrumental 🎵)");
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
    setTabKey((prev) => prev + 1); // Trigger reset animasi tabSlideIn
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
    <div className="min-h-screen w-full bg-gradient-to-br from-cream via-ivory to-gold-soft/20 flex justify-center items-center py-0 md:py-4 px-0">
      
      {/* Container utama: Terpusat di PC (max-w-md), alami 100% di HP */}
      <div className="w-full max-w-md bg-background min-h-screen md:min-h-[800px] md:h-[840px] md:rounded-[2rem] overflow-hidden shadow-2xl relative flex flex-col justify-between border border-border/40">
        
        {/* 1. COVER PAGE (BEFORE OPENING) */}
        {!isOpen ? (
          <section className="absolute inset-0 z-50 bg-gradient-to-b from-cream via-ivory to-background flex flex-col items-center justify-center text-center p-6 select-none overflow-hidden animate-fade-in">
            {/* Floral Ornament top */}
            <div className="absolute top-12 text-gold text-3xl animate-pulse">🌸</div>
            
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold font-bold mb-4">THE WEDDING OF</div>
            
            <div className="space-y-2">
              <h1 className="font-display text-5xl font-black text-foreground capitalize tracking-tight">
                {wedding.groom.nickname}
              </h1>
              <div className="font-display text-3xl text-gold italic my-2 font-semibold">&</div>
              <h1 className="font-display text-5xl font-black text-foreground capitalize tracking-tight">
                {wedding.bride.nickname}
              </h1>
            </div>

            <div className="mt-8 text-xs text-muted-foreground tracking-wide font-semibold">
              Akan segera melangsungkan pernikahan pada:
            </div>
            <div className="mt-2 text-base text-foreground font-display font-bold">
              Sabtu, 30 Mei 2026
            </div>

            {/* Live Ticking Countdown */}
            <div className="mt-6 p-4 rounded-2xl bg-gold-soft/30 border border-gold/15 max-w-xs w-full mx-auto">
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
                  <div key={idx} className="bg-background/80 rounded-lg p-1.5 text-center">
                    <div className="font-display text-base font-black text-gold leading-none">
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

            {/* Personalized Envelope block for Guests */}
            {guestName && (
              <div className="mt-8 bg-white/80 backdrop-blur border border-gold/15 p-4 rounded-2xl max-w-xs w-full mx-auto text-xs shadow-sm">
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </div>
                <div className="font-display font-bold text-sm text-gold capitalize">
                  {guestName}
                </div>
                {guestAddress && (
                  <div className="text-[9px] text-muted-foreground mt-0.5 capitalize">
                    di {guestAddress}
                  </div>
                )}
              </div>
            )}

            <Button
              onClick={handleBukaUndangan}
              className="mt-8 bg-gold hover:bg-gold/90 text-primary-foreground font-semibold rounded-full px-8 py-3 shadow-md flex items-center gap-2 group transform hover:scale-105 transition duration-300 text-xs"
            >
              <Heart className="h-4 w-4 fill-primary-foreground group-hover:scale-125 transition" />
              Buka Undangan
            </Button>
            
            <div className="absolute bottom-12 text-gold text-3xl animate-pulse">🌸</div>
          </section>
        ) : (
          /* 2. LIVE INVITATION (MAIN INTERACTIVE AREA) */
          <div className="flex-1 flex flex-col justify-between h-full bg-background overflow-hidden relative">
            
            {/* Tampilan Content Area dengan Animasi transisi tabSlideIn */}
            <div key={tabKey} className="flex-1 overflow-y-auto pb-16 scrollbar-none w-full animate-tab-slide">
              
              {/* TAB 1: HOME */}
              {activeTab === "Home" && (
                <section className="bg-gradient-to-b from-cream/40 via-background to-background min-h-full flex flex-col items-center justify-center p-6 text-center select-none py-20">
                  <div className="text-[9px] tracking-[0.3em] uppercase text-gold font-bold mb-3">THE WEDDING OF</div>
                  <h1 className="font-display text-4xl font-black text-foreground capitalize leading-tight">
                    {wedding.groom.nickname} & {wedding.bride.nickname}
                  </h1>
                  <p className="text-xs text-muted-foreground mt-4 max-w-xs leading-relaxed">
                    Akan segera melangsungkan pernikahan pada hari bahagia kami.
                  </p>
                  
                  {/* Countdown live */}
                  <div className="my-8 p-4 rounded-2xl bg-gold-soft/20 border border-gold/10 w-full max-w-xs mx-auto">
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { v: countdown.days, l: "Hari" },
                        { v: countdown.hours, l: "Jam" },
                        { v: countdown.minutes, l: "Menit" },
                        { v: countdown.seconds, l: "Detik" },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-background/80 rounded-xl p-2.5 text-center">
                          <div className="font-display text-lg font-black text-gold">
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
                  <div className="mt-8 text-gold text-2xl">💍</div>
                </section>
              )}

              {/* TAB 2: MEMPELAI */}
              {activeTab === "Mempelai" && (
                <section className="p-6 space-y-6 text-center py-12">
                  <div className="space-y-2">
                    <p className="font-display text-xl text-gold font-semibold">Assalamu'alaikum</p>
                    <p className="text-xs text-muted-foreground leading-relaxed italic max-w-sm mx-auto">
                      Dengan Rahmat Allah yang Maha Kuasa, InsyaAllah kami akan melangsungkan pernikahan pada:
                    </p>
                    <p className="text-xs text-foreground font-semibold">Sabtu, 30 Mei 2026</p>
                  </div>

                  {/* Profil Pria */}
                  <div className="bg-cream/20 p-5 rounded-2xl border border-border/60">
                    <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-gold to-gold-soft flex items-center justify-center font-display text-xl font-bold text-white mb-3">
                      {wedding.groom.nickname.charAt(0).toUpperCase()}
                    </div>
                    <div className="font-display text-lg font-black capitalize text-foreground">
                      {wedding.groom.fullName}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Putra dari <br />
                      <span className="font-semibold text-foreground">{wedding.groom.father}</span> &{" "}
                      <span className="font-semibold text-foreground">{wedding.groom.mother}</span>
                    </p>
                  </div>

                  {/* Profil Wanita */}
                  <div className="bg-cream/20 p-5 rounded-2xl border border-border/60">
                    <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-gold to-gold-soft flex items-center justify-center font-display text-xl font-bold text-white mb-3">
                      {wedding.bride.nickname.charAt(0).toUpperCase()}
                    </div>
                    <div className="font-display text-lg font-black capitalize text-foreground">
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

              {/* TAB 3: UNDANGAN (MENAMPILKAN ACARA & SELURUH FITUR TAMBAHAN SECARA SCROLLABLE) */}
              {activeTab === "Undangan" && (
                <section className="p-6 space-y-8 py-12">
                  <div className="text-center space-y-2">
                    <h2 className="font-display text-2xl font-bold text-foreground">Undangan dan Acara</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                      Bahagia rasanya apabila anda berkenan hadir dan memberikan doa restu kepada kami. Kami mengundang anda untuk hadir dalam acara resepsi pernikahan kami berikut ini.
                    </p>
                  </div>

                  {/* Card Akad Nikah */}
                  <div className="rounded-2xl border border-border bg-card p-5 text-center relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gold" />
                    <h3 className="font-display text-lg font-black text-foreground">Akad Nikah</h3>
                    <div className="my-3 flex flex-col items-center justify-center gap-1 text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-gold">
                        <Calendar className="h-3.5 w-3.5" />
                        Sabtu, 30 Mei 2026
                      </div>
                      <div className="text-muted-foreground">Pukul 14:30 - 14:30 WIB</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground flex justify-center items-start gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                      <span>{wedding.akad.venue}</span>
                    </div>
                  </div>

                  {/* Card Resepsi */}
                  <div className="rounded-2xl border border-border bg-card p-5 text-center relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gold" />
                    <h3 className="font-display text-lg font-black text-foreground">Resepsi Pernikahan</h3>
                    <div className="my-3 flex flex-col items-center justify-center gap-1 text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-gold">
                        <Calendar className="h-3.5 w-3.5" />
                        Minggu, 31 Mei 2026
                      </div>
                      <div className="text-muted-foreground">Pukul 14:30 - 14:30 WIB</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground flex justify-center items-start gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                      <span>{wedding.resepsi.venue}</span>
                    </div>
                  </div>

                  {/* 1. SECT: CERITA CINTA (INLINE) */}
                  <div className="border-t border-border/60 pt-6 space-y-4">
                    <h3 className="font-display text-xl font-bold text-center text-foreground flex items-center justify-center gap-1.5">
                      💖 Kisah Cinta Kami
                    </h3>
                    {isFeatureLocked("Cerita") ? (
                      <div className="bg-cream/40 border border-gold/15 p-5 rounded-2xl text-center space-y-3">
                        <Lock className="h-5 w-5 text-gold mx-auto" />
                        <div className="text-xs font-semibold">Fitur Cerita Terkunci</div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                          Fitur Cerita Cinta terkunci pada paket Sakinah. Upgrade untuk mengaktifkannya.
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-xs text-muted-foreground italic">
                        Belum ada cerita cinta yang dibagikan.
                      </div>
                    )}
                  </div>

                  {/* 2. SECT: FOTO GALERI (INLINE) */}
                  <div className="border-t border-border/60 pt-6 space-y-4">
                    <h3 className="font-display text-xl font-bold text-center text-foreground flex items-center justify-center gap-1.5">
                      📸 Galeri Foto Bahagia
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-cream to-gold-soft/30 border border-gold/10 flex items-center justify-center text-[9px] text-muted-foreground font-semibold">
                          Foto Galeri {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. SECT: KADO NIKAH (INLINE) */}
                  <div className="border-t border-border/60 pt-6 space-y-4">
                    <h3 className="font-display text-xl font-bold text-center text-foreground flex items-center justify-center gap-1.5">
                      🎁 Kado Digital (Cashless)
                    </h3>
                    {isFeatureLocked("Kado") ? (
                      <div className="bg-cream/40 border border-gold/15 p-5 rounded-2xl text-center space-y-3">
                        <Lock className="h-5 w-5 text-gold mx-auto" />
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

                  {/* 4. SECT: DOA DAN HARAPAN (INLINE) */}
                  <div className="border-t border-border/60 pt-6 space-y-4">
                    <h3 className="font-display text-xl font-bold text-center text-foreground flex items-center justify-center gap-1.5">
                      💬 Doa & Harapan Tamu
                    </h3>
                    {isFeatureLocked("Ucapan") ? (
                      <div className="bg-cream/40 border border-gold/15 p-5 rounded-2xl text-center space-y-3">
                        <Lock className="h-5 w-5 text-gold mx-auto" />
                        <div className="text-xs font-semibold">Fitur Doa & RSVP Terkunci</div>
                        <p className="text-[10px] text-muted-foreground">
                          Tersedia mulai dari paket keanggotaan Mawaddah.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Form Doa */}
                        <form onSubmit={handleSendWish} className="space-y-3 bg-cream/10 p-4 rounded-xl border border-border text-xs">
                          <div className="space-y-1">
                            <Label className="text-[9px]">Nama Anda</Label>
                            <Input
                              value={wishName}
                              onChange={(e) => setWishName(e.target.value)}
                              placeholder="Nama lengkap..."
                              className="text-xs h-8 bg-background"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[9px]">Pesan Doa Restu</Label>
                            <Textarea
                              value={wishText}
                              onChange={(e) => setWishText(e.target.value)}
                              placeholder="Tulis ucapan selamat..."
                              className="text-xs"
                              rows={2}
                            />
                          </div>
                          <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-primary-foreground text-xs rounded-full h-8 font-semibold">
                            Kirim Doa Restu
                          </Button>
                        </form>

                        {/* List Doa */}
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {wishes.map((w, idx) => (
                            <div key={idx} className="p-3 bg-muted/30 rounded-lg border border-border/60 text-[10px] space-y-1">
                              <div className="font-bold text-foreground flex justify-between items-center">
                                <span>{w.name}</span>
                                <Badge className="text-[7px] h-3.5 bg-gold-soft/40 text-gold font-bold px-1.5">{w.relation || "Teman"}</Badge>
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
                <section className="p-6 space-y-6 py-12">
                  <div className="text-center mb-2">
                    <h2 className="font-display text-2xl font-bold text-foreground">Peta Lokasi Acara</h2>
                  </div>

                  {/* Lokasi Akad */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lokasi Akad Nikah</h3>
                    <div className="rounded-xl border border-border p-4 space-y-3 bg-muted/20">
                      {isMapAddressUnset(wedding.akad.venue) ? (
                        <div className="text-xs text-muted-foreground text-center py-4 italic">Peta belum diatur</div>
                      ) : (
                        <>
                          <div className="text-xs font-semibold text-foreground flex items-start gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                            {wedding.akad.venue}
                          </div>
                          {renderMapPreview(wedding.akad.venue, wedding.akad.maps)}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full text-xs rounded-full cursor-pointer hover:bg-gold-soft"
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
                    <div className="rounded-xl border border-border p-4 space-y-3 bg-muted/20">
                      {isMapAddressUnset(wedding.resepsi.venue) ? (
                        <div className="text-xs text-muted-foreground text-center py-4 italic">Peta belum diatur</div>
                      ) : (
                        <>
                          <div className="text-xs font-semibold text-foreground flex items-start gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                            {wedding.resepsi.venue}
                          </div>
                          {renderMapPreview(wedding.resepsi.venue, wedding.resepsi.maps)}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full text-xs rounded-full cursor-pointer hover:bg-gold-soft"
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
            <nav className="absolute bottom-0 inset-x-0 z-30 h-14 bg-background border-t border-border flex items-center justify-around text-[10px] font-bold text-muted-foreground shadow-[0_-2px_10px_rgba(0,0,0,0.05)] select-none">
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
                    onClick={() => handleTabChange(item.tab)}
                    className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition relative
                      ${isActive ? "text-gold" : "hover:text-foreground"}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.tab}</span>
                    {isActive && <span className="absolute bottom-1 w-4 h-0.5 rounded-full bg-gold" />}
                  </button>
                );
              })}
            </nav>

          </div>
        )}

      </div>
    </div>
  );
}
