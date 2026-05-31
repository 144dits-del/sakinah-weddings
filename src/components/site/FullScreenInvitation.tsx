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
  const [wishes, setWishes] = useState<any[]>([
    { name: "Dewi Lestari", relation: "Sahabat Wanita", text: "Selamat menempuh hidup baru bibi & rarw! Semoga sakinah mawaddah warahmah selalu." },
    { name: "Yusuf Kuncoro", text: "Selamat ya, semoga berkah pernikahannya." }
  ]);
  const [wishName, setWishName] = useState("");
  const [wishRelation, setWishRelation] = useState("Teman");
  const [wishText, setWishText] = useState("");

  useEffect(() => {
    // Muat data mempelai
    const storedData = getStoredWeddingData();
    setWedding(storedData);
    setActivePkg(getStoredPackage());
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

  const isFeatureLocked = (feature: string) => {
    if (activePkg === "Sakinah") {
      if (feature === "Cerita" || feature === "Ucapan") return true;
    }
    return false;
  };

  const isMapAddressUnset = (address: string) => {
    return !address || address.trim() === "" || address.trim() === "Peta belum diatur";
  };

  return (
    <div className="min-h-screen bg-background w-full text-foreground relative flex flex-col justify-between overflow-hidden">
      
      {/* 1. COVER PAGE (BEFORE OPENING) */}
      {!isOpen ? (
        <section className="absolute inset-0 z-50 bg-gradient-to-b from-cream via-ivory to-background flex flex-col items-center justify-center text-center p-6 select-none overflow-hidden">
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

          {/* Countdown State EXPIRED */}
          <div className="mt-6 p-4 rounded-2xl bg-gold-soft/30 border border-gold/15 max-w-xs mx-auto">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Hitung Mundur Acara</div>
            <div className="font-display text-2xl font-black text-rose-600 tracking-wider mt-1.5 animate-pulse">
              EXPIRED
            </div>
            <div className="text-[8px] text-muted-foreground mt-1 font-semibold">Tanggal pernikahan telah berlalu</div>
          </div>

          {/* Personalized Envelope block for Guests */}
          {guestName && (
            <div className="mt-8 bg-white/80 backdrop-blur border border-gold/15 p-4 rounded-2xl max-w-xs w-full mx-auto text-xs shadow-sm">
              <div className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </div>
              <div className="font-display font-bold text-sm text-foreground capitalize">
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
          
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto pb-16 scrollbar-none w-full max-w-md mx-auto">
            
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
                
                <div className="my-8 flex justify-center gap-2 max-w-full">
                  {[{ v: "EX", l: "Hari" }, { v: "PI", l: "Jam" }, { v: "RE", l: "Menit" }, { v: "D", l: "Detik" }].map((c, i) => (
                    <div key={i} className="bg-gold-soft/50 rounded-xl p-3 w-16 text-center border border-gold/10">
                      <div className="font-display text-lg font-black text-rose-600">{c.v}</div>
                      <div className="text-[8px] text-muted-foreground uppercase font-bold">{c.l}</div>
                    </div>
                  ))}
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

            {/* TAB 3: UNDANGAN */}
            {activeTab === "Undangan" && (
              <section className="p-6 space-y-6 py-12">
                <div className="text-center space-y-2">
                  <h2 className="font-display text-2xl font-bold text-foreground">Undangan dan Acara</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    Bahagia rasanya apabila anda berkenan hadir dan memberikan doa restu kepada kami. Kami mengundang anda untuk hadir dalam acara resepsi pernikahan kami berikut ini.
                  </p>
                </div>

                {/* Card Akad Nikah */}
                <div className="rounded-2xl border border-border bg-card p-5 text-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gold" />
                  <h3 className="font-display text-lg font-black text-foreground">Akad Nikah</h3>
                  <div className="my-3 flex flex-col items-center justify-center gap-1 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Calendar className="h-3.5 w-3.5 text-gold" />
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
                <div className="rounded-2xl border border-border bg-card p-5 text-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gold" />
                  <h3 className="font-display text-lg font-black text-foreground">Resepsi Pernikahan</h3>
                  <div className="my-3 flex flex-col items-center justify-center gap-1 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Calendar className="h-3.5 w-3.5 text-gold" />
                      Minggu, 31 Mei 2026
                    </div>
                    <div className="text-muted-foreground">Pukul 14:30 - 14:30 WIB</div>
                  </div>
                  <div className="text-[10px] text-muted-foreground flex justify-center items-start gap-1">
                    <MapPin className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                    <span>{wedding.resepsi.venue}</span>
                  </div>
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
                        <div className="h-28 rounded-lg bg-cream/40 border border-gold/15 flex items-center justify-center text-[10px] text-muted-foreground">
                          Pratinjau Peta Akad Nikah
                        </div>
                        <Button size="sm" variant="outline" className="w-full text-xs rounded-full">
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
                        <div className="h-28 rounded-lg bg-cream/40 border border-gold/15 flex items-center justify-center text-[10px] text-muted-foreground">
                          Pratinjau Peta Resepsi
                        </div>
                        <Button size="sm" variant="outline" className="w-full text-xs rounded-full">
                          Buka Google Maps
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* TAB 5: CERITA */}
            {activeTab === "Cerita" && (
              <section className="p-6 py-12">
                {isFeatureLocked("Cerita") ? (
                  <div className="text-center space-y-4 py-8">
                    <div className="h-12 w-12 rounded-full bg-gold-soft mx-auto flex items-center justify-center text-gold">
                      <Lock className="h-5 w-5" />
                    </div>
                    <h3 className="font-display font-semibold text-base">Cerita Cinta Terkunci</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      Fitur Cerita Cinta terkunci untuk Paket Sakinah. Upgrade ke paket minimal{" "}
                      <span className="text-gold font-bold">Mawaddah</span> untuk mengaktifkannya.
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-4 py-8">
                    <div className="text-3xl text-gold">💖</div>
                    <h3 className="font-display font-semibold text-base">Belum Ada Cerita Cinta</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      Mempelai belum membagikan cerita cinta indah mereka.
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* TAB 6: PHOTO */}
            {activeTab === "Photo" && (
              <section className="p-6 py-12 space-y-4">
                <div className="text-center">
                  <h2 className="font-display text-2xl font-bold text-foreground">Galeri Foto</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-cream to-gold-soft/40 border border-gold/10 flex items-center justify-center text-[10px] text-muted-foreground">
                      Foto Dummy {i + 1}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TAB 7: UCAPAN */}
            {activeTab === "Ucapan" && (
              <section className="p-6 py-12 space-y-6">
                <div className="text-center">
                  <h2 className="font-display text-2xl font-bold text-foreground">Doa & Harapan</h2>
                </div>

                {isFeatureLocked("Ucapan") ? (
                  <div className="rounded-xl border border-gold/15 bg-cream/30 p-4 text-center text-xs text-muted-foreground">
                    ⚠️ Fitur doa & RSVP tersedia mulai paket <b>Mawaddah</b>.
                  </div>
                ) : (
                  <>
                    {/* Form Doa */}
                    <form onSubmit={handleSendWish} className="space-y-3 bg-cream/20 p-4 rounded-2xl border border-border/80">
                      <div className="space-y-1">
                        <Label className="text-[10px] font-semibold">Nama Lengkap</Label>
                        <Input
                          value={wishName}
                          onChange={(e) => setWishName(e.target.value)}
                          placeholder="Tulis nama Anda..."
                          className="text-xs h-8 bg-background"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] font-semibold">Hubungan / Status</Label>
                        <select
                          value={wishRelation}
                          onChange={(e) => setWishRelation(e.target.value)}
                          className="w-full text-xs h-8 px-2 rounded-md border border-input bg-background"
                        >
                          <option value="Teman">Teman</option>
                          <option value="Keluarga">Keluarga</option>
                          <option value="Rekan Kerja">Rekan Kerja</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] font-semibold">Doa & Harapan</Label>
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

                    {/* Daftar Doa */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Doa Masuk ({wishes.length})</h3>
                      <div className="space-y-2">
                        {wishes.map((w, idx) => (
                          <div key={idx} className="p-3 bg-muted/40 rounded-xl border border-border text-[11px] space-y-1">
                            <div className="flex justify-between items-center font-bold text-foreground">
                              <span>{w.name}</span>
                              <Badge className="text-[8px] h-4 bg-gold-soft text-gold px-1.5">{w.relation || "Teman"}</Badge>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">"{w.text}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </section>
            )}
          </div>

          {/* FIXED BOTTOM NAVIGATION BAR */}
          <nav className="absolute bottom-0 inset-x-0 z-30 h-14 bg-background border-t border-border flex items-center justify-around text-[9px] font-bold text-muted-foreground shadow-[0_-2px_10px_rgba(0,0,0,0.05)] select-none">
            {[
              { tab: "Home", icon: HomeIcon },
              { tab: "Mempelai", icon: Users },
              { tab: "Undangan", icon: Calendar },
              { tab: "Map", icon: Compass },
              { tab: "Cerita", icon: Heart },
              { tab: "Photo", icon: ImageIcon },
              { tab: "Ucapan", icon: MessageCircle },
            ].map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className={`flex flex-col items-center justify-center gap-0.5 w-12 h-full transition relative
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
  );
}
