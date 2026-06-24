import { createFileRoute, Link } from "@tanstack/react-router";
import { UserSidebar, menu } from "@/components/dashboard/UserSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast, Toaster } from "sonner";
import { useState, useEffect } from "react";
import {
  getStoredWeddingData,
  setStoredWeddingData,
  getStoredPackage,
  setStoredPackage,
  formatRupiah,
  WeddingData,
  dummyWedding,
} from "@/lib/dummy-data";
import {
  Lock,
  Settings,
  Image as ImageIcon,
  Music,
  Heart,
  Gift,
  MessageCircle,
  Users,
  Calendar,
  Mail,
  Palette,
  Video,
  Plus,
  Trash2,
  MapPin,
  Globe,
  Share2,
  Copy,
  Volume2,
  Sparkles,
  Award,
  Bell,
  User,
  Key,
  CreditCard,
  Tv,
  Check,
  CheckCircle2,
} from "lucide-react";

// Register TanStack Route
export const Route = createFileRoute("/dashboard")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tab: (search.tab as string) || "Dashboard",
    };
  },
  component: Dashboard,
});

// Menentukan fitur mana yang membutuhkan paket minimal
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

// 10 Tema Undangan
const defaultDashboardTemplates = [
  { id: "basic", name: "Basic Theme", type: "Basic", bg: "from-gray-100 to-slate-200", icon: "✏️" },
  { id: "sakinah", name: "Sakinah Theme", type: "Basic", bg: "from-amber-50 to-amber-100", icon: "🤍", popular: true },
  { id: "monochrome", name: "monochrome Theme", type: "Basic", bg: "from-zinc-800 to-zinc-900", icon: "🖤" },
  { id: "dark_gold_2", name: "Dark Gold 2", type: "Premium", bg: "from-zinc-900 via-amber-950 to-zinc-950", icon: "✨" },
  { id: "dark_gold", name: "Dark Gold", type: "Premium", bg: "from-stone-900 to-stone-800", icon: "👑", popular: true },
  { id: "rose_red", name: "Rose Red Theme", type: "Premium", bg: "from-red-50 to-rose-100", icon: "🌹" },
  { id: "bloom", name: "Bloom Theme", type: "Premium", bg: "from-green-50 to-emerald-100", icon: "🌿" },
  { id: "blossom", name: "Blossom Celebration", type: "Premium", bg: "from-pink-50 to-rose-100", icon: "🌸" },
  { id: "chic", name: "Chic Floral", type: "Premium", bg: "from-teal-50 to-cyan-100", icon: "💐", popular: true },
  { id: "bloom_bliss", name: "Bloom Bliss Theme", type: "Premium", bg: "from-indigo-50 to-violet-100", icon: "🔮" },
  { id: "t9", name: "Nikah Monochrome", type: "Premium", bg: "from-zinc-800 to-zinc-950", icon: "🖤", popular: true },
  { id: "t10", name: "Nikah Sakinah", type: "Premium", bg: "from-amber-100 via-stone-50 to-amber-50", icon: "🦢", popular: true },
];

function Dashboard() {
  const { tab } = Route.useSearch();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [activePkg, setActivePkg] = useState("Sakinah");
  
  // Muat daftar template dari localStorage jika ada, dipetakan ke format dashboard
  const [templatesList, setTemplatesList] = useState<any[]>(defaultDashboardTemplates);

  const [weddingData, setWeddingData] = useState<WeddingData>(dummyWedding);
  const [selectedTemplate, setSelectedTemplate] = useState("sakinah");
  const [selectedMusic, setSelectedMusic] = useState("Beautiful - Instrumental");
  const [customLanguage, setCustomLanguage] = useState<Record<string, string>>({});
  
  // States untuk Simulasi Payment Gateway
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingPkg, setPendingPkg] = useState<"Mawaddah" | "Warahmah">("Mawaddah");
  const [paymentMethod, setPaymentMethod] = useState<"QRIS" | "BCA">("QRIS");
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // States untuk forms
  const [domainName, setDomainName] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDesc, setSiteDesc] = useState("");
  const [siteKeywords, setSiteKeywords] = useState("");
  const [invitationNote, setInvitationNote] = useState("");
  const [turutMengundang, setTurutMengundang] = useState("");

  // Mempelai Pria Form
  const [groomFull, setGroomFull] = useState("");
  const [groomNick, setGroomNick] = useState("");
  const [groomFather, setGroomFather] = useState("");
  const [groomMother, setGroomMother] = useState("");
  const [groomHidePhoto, setGroomHidePhoto] = useState(false);

  // Mempelai Wanita Form
  const [brideFull, setBrideFull] = useState("");
  const [brideNick, setBrideNick] = useState("");
  const [brideFather, setBrideFather] = useState("");
  const [brideMother, setBrideMother] = useState("");
  const [brideFront, setBrideFront] = useState(false);
  const [brideBio, setBrideBio] = useState("");

  // Informasi Acara Form
  const [religion, setReligion] = useState("Islam");
  const [timezone, setTimezone] = useState("WIB");
  const [mapType, setMapType] = useState("Static Map");
  
  const [akadShow, setAkadShow] = useState(true);
  const [akadDate, setAkadDate] = useState("");
  const [akadTime, setAkadTime] = useState("");
  const [akadVenue, setAkadVenue] = useState("");
  const [akadMaps, setAkadMaps] = useState("");
  const [akadMain, setAkadMain] = useState(true);

  const [resepsiShow, setResepsiShow] = useState(true);
  const [resepsiDate, setResepsiDate] = useState("");
  const [resepsiTime, setResepsiTime] = useState("");
  const [resepsiVenue, setResepsiVenue] = useState("");
  const [resepsiMaps, setResepsiMaps] = useState("");
  const [resepsiMain, setResepsiMain] = useState(false);

  // RSVP Form
  const [rsvpActive, setRsvpActive] = useState(true);

  // Kado Nikah Form
  const [kadoActive, setKadoActive] = useState(false);
  const [kadoRekening, setKadoRekening] = useState<any[]>([]);
  const [kadoCara, setKadoCara] = useState("Silahkan transfer ke rekening tertera untuk memberikan kado digital.");

  // Kirim Undangan Form
  const [guestName, setGuestName] = useState("");
  const [guestAddress, setGuestAddress] = useState("");

  // Muat data saat load
  useEffect(() => {
    // Keamanan: Cek apakah user telah login
    const email = localStorage.getItem("sakinah_user_email");
    if (!email) {
      setIsAuthorized(false);
      toast.error("Akses ditolak! Silakan masuk ke akun Anda terlebih dahulu.");
      const timer = setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return () => clearTimeout(timer);
    }
    setIsAuthorized(true);

    // Muat templatesList dari localStorage jika ada
    const storedTmpls = localStorage.getItem("sakinah_admin_tmpls");
    if (storedTmpls) {
      try {
        const parsed = JSON.parse(storedTmpls);
        setTemplatesList(parsed.map((t: any) => ({
          id: t.id,
          name: t.name,
          type: t.type === "gratis" ? "Basic" : "Premium",
          icon: t.thumbnail,
          popular: t.popular || false
        })));
      } catch (e) {
        console.error(e);
      }
    }

    const data = getStoredWeddingData();
    setWeddingData(data);
    setActivePkg(getStoredPackage());
    setSelectedTemplate((data.subdomain && localStorage.getItem(`sakinah_selected_template_${data.subdomain}`)) || localStorage.getItem("sakinah_selected_template") || "sakinah");
    setSelectedMusic(localStorage.getItem("sakinah_selected_music") || "Beautiful - Instrumental");

    // Muat data domain & SEO
    setDomainName(data.subdomain);
    setSiteTitle(localStorage.getItem("sakinah_site_title") || `Website Pernikahan ${data.groom.nickname} dan ${data.bride.nickname}`);
    setSiteDesc(localStorage.getItem("sakinah_site_desc") || `Website ini merupakan website Pernikahan ${data.groom.fullName} dan ${data.bride.fullName} yang akan segera melakukan resepsi pernikahan. Silahkan berikan doa dan harapan untuk kami berdua.`);
    setSiteKeywords(localStorage.getItem("sakinah_site_keywords") || `Pernikahan ${data.groom.fullName} dan ${data.bride.fullName}, Nikah Online, Webnikah, Nikah adbi, Nikah rara`);

    // Muat nama mempelai
    setGroomFull(data.groom.fullName);
    setGroomNick(data.groom.nickname);
    setGroomFather(data.groom.father);
    setGroomMother(data.groom.mother);
    setGroomHidePhoto(localStorage.getItem("sakinah_groom_hide_photo") === "true");

    setBrideFull(data.bride.fullName);
    setBrideNick(data.bride.nickname);
    setBrideFather(data.bride.father);
    setBrideMother(data.bride.mother);
    setBrideFront(localStorage.getItem("sakinah_bride_front") === "true");
    setBrideBio(localStorage.getItem("sakinah_bride_bio") || "Mempelai wanita yang shalihah dan anggun.");

    // Muat Acara
    setReligion(data.religion || "Islam");
    setTimezone(data.timezone || "WIB");
    setMapType(localStorage.getItem("sakinah_map_type") || "Static Map");

    setAkadDate(data.akad.date);
    setAkadTime(`${data.akad.start} - ${data.akad.end}`);
    setAkadVenue(data.akad.venue);
    setAkadMaps(data.akad.maps || "");
    setAkadMain(localStorage.getItem("sakinah_akad_main") !== "false");

    setResepsiDate(data.resepsi.date);
    setResepsiTime(`${data.resepsi.start} - ${data.resepsi.end}`);
    setResepsiVenue(data.resepsi.venue);
    setResepsiMaps(data.resepsi.maps || "");
    setResepsiMain(localStorage.getItem("sakinah_resepsi_main") === "true");

    // Muat RSVP
    setRsvpActive(localStorage.getItem("sakinah_rsvp_active") !== "false");

    // Muat Kado
    setKadoActive(localStorage.getItem("sakinah_kado_active") === "true");
    const storedRek = localStorage.getItem("sakinah_kado_rekening");
    let reks = [];
    if (storedRek) {
      try {
        const parsed = JSON.parse(storedRek);
        if (Array.isArray(parsed)) reks = parsed;
      } catch (e) {}
    }
    setKadoRekening(reks);
    setKadoCara(localStorage.getItem("sakinah_kado_cara") || "Silahkan transfer ke rekening tertera untuk memberikan kado digital.");

    // Muat Bahasa custom
    const storedLang = localStorage.getItem("sakinah_custom_language");
    let langs = {
      coverText: "Akan segera melangsungkan pernikahan",
      coverButton: "Buka Undangan",
      openingTitle: "Assalamu'alaikum",
      openingText: "Dengan Rahmat Allah yang Maha Kuasa...",
    };
    if (storedLang) {
      try {
        const parsed = JSON.parse(storedLang);
        if (parsed && typeof parsed === "object") langs = { ...langs, ...parsed };
      } catch (e) {}
    }
    setCustomLanguage(langs);

    // Muat Informasi Undangan
    setTurutMengundang(localStorage.getItem("sakinah_turut_mengundang") || "Seluruh Keluarga Besar");
    setInvitationNote(localStorage.getItem("sakinah_invitation_note") || "Tanpa mengurangi rasa hormat, mohon kehadirannya.");

    // Dengarkan perubahan paket global & templates list
    const handlePkgChange = () => {
      setActivePkg(getStoredPackage());
    };
    const handleTemplatesChange = () => {
      const stored = localStorage.getItem("sakinah_admin_tmpls");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setTemplatesList(parsed.map((t: any) => ({
            id: t.id,
            name: t.name,
            type: t.type === "gratis" ? "Basic" : "Premium",
            icon: t.thumbnail,
            popular: t.popular || false
          })));
        } catch (e) {
          console.error(e);
        }
      }
    };
    window.addEventListener("sakinah_package_changed", handlePkgChange);
    window.addEventListener("sakinah_admin_tmpls_changed", handleTemplatesChange);
    return () => {
      window.removeEventListener("sakinah_package_changed", handlePkgChange);
      window.removeEventListener("sakinah_admin_tmpls_changed", handleTemplatesChange);
    };
  }, []);

  const handleSaveWeddingData = (updated: WeddingData) => {
    setStoredWeddingData(updated);
    setWeddingData(updated);
    toast.success("Informasi Pernikahan berhasil disimpan!", { duration: 2500 });
  };

  const handleSaveGeneralSettings = () => {
    const updated = { ...weddingData, subdomain: domainName };
    setStoredWeddingData(updated);
    setWeddingData(updated);
    localStorage.setItem("sakinah_site_title", siteTitle);
    localStorage.setItem("sakinah_site_desc", siteDesc);
    localStorage.setItem("sakinah_site_keywords", siteKeywords);
    toast.success("Pengaturan Domain & SEO berhasil disimpan!");
  };

  const handleSaveGroom = () => {
    const updated = {
      ...weddingData,
      groom: { fullName: groomFull, nickname: groomNick, father: groomFather, mother: groomMother },
    };
    handleSaveWeddingData(updated);
    localStorage.setItem("sakinah_groom_hide_photo", String(groomHidePhoto));
  };

  const handleSaveBride = () => {
    const updated = {
      ...weddingData,
      bride: { fullName: brideFull, nickname: brideNick, father: brideFather, mother: brideMother },
    };
    handleSaveWeddingData(updated);
    localStorage.setItem("sakinah_bride_front", String(brideFront));
    localStorage.setItem("sakinah_bride_bio", brideBio);
  };

  const handleSaveEvents = () => {
    // Parse time
    const akadParts = akadTime.split("-");
    const startAkad = akadParts[0]?.trim() || "14:30";
    const endAkad = akadParts[1]?.trim() || "14:30";

    const resepsiParts = resepsiTime.split("-");
    const startResepsi = resepsiParts[0]?.trim() || "14:30";
    const endResepsi = resepsiParts[1]?.trim() || "14:30";

    const updated = {
      ...weddingData,
      religion,
      timezone,
      akad: { date: akadDate, start: startAkad, end: endAkad, venue: akadVenue, maps: akadMaps },
      resepsi: { date: resepsiDate, start: startResepsi, end: endResepsi, venue: resepsiVenue, maps: resepsiMaps },
    };
    handleSaveWeddingData(updated);
    localStorage.setItem("sakinah_map_type", mapType);
    localStorage.setItem("sakinah_akad_main", String(akadMain));
    localStorage.setItem("sakinah_resepsi_main", String(resepsiMain));
  };

  const handleSaveInvitation = () => {
    localStorage.setItem("sakinah_turut_mengundang", turutMengundang);
    localStorage.setItem("sakinah_invitation_note", invitationNote);
    toast.success("Informasi Undangan berhasil diperbarui!");
  };

  const handleAddRekening = () => {
    if (kadoRekening.length >= 3) {
      toast.error("Maksimal hanya diperbolehkan 3 rekening bank.");
      return;
    }
    const newRek = { bank: "BCA", nomor: "1234567890", pemilik: weddingData.groom.fullName };
    const nextRek = [...kadoRekening, newRek];
    setKadoRekening(nextRek);
    localStorage.setItem("sakinah_kado_rekening", JSON.stringify(nextRek));
    toast.success("Rekening baru berhasil ditambahkan!");
  };

  const handleRemoveRekening = (index: number) => {
    const next = kadoRekening.filter((_, i) => i !== index);
    setKadoRekening(next);
    localStorage.setItem("sakinah_kado_rekening", JSON.stringify(next));
    toast.success("Rekening berhasil dihapus.");
  };

  const handleSaveKado = () => {
    localStorage.setItem("sakinah_kado_active", String(kadoActive));
    localStorage.setItem("sakinah_kado_cara", kadoCara);
    toast.success("Informasi Kado Pernikahan berhasil disimpan!");
  };

  const handleSelectTemplate = (id: string, isPremium: boolean) => {
    if (isPremium && activePkg === "Sakinah") {
      toast.error("Template premium hanya bisa dipilih pada paket minimal Mawaddah.");
      return;
    }
    setSelectedTemplate(id);
    localStorage.setItem("sakinah_selected_template", id);
    if (weddingData.subdomain) {
      localStorage.setItem(`sakinah_selected_template_${weddingData.subdomain}`, id);
    }
    window.dispatchEvent(new Event("sakinah_template_changed"));
    toast.success(`Berhasil mengaktifkan tema: ${templatesList.find((t) => t.id === id)?.name}`);
  };

  const handleSelectMusic = (title: string) => {
    setSelectedMusic(title);
    localStorage.setItem("sakinah_selected_music", title);
    toast.success(`Berhasil memilih musik latar: ${title}`);
  };

  const handleSaveLanguage = () => {
    localStorage.setItem("sakinah_custom_language", JSON.stringify(customLanguage));
    toast.success("Bahasa kustom berhasil disimpan!");
  };

  const handleOpenUpgradePayment = (pkg: "Mawaddah" | "Warahmah") => {
    setPendingPkg(pkg);
    setPaymentMethod("QRIS");
    setIsVerifyingPayment(false);
    setPaymentSuccess(false);
    setShowPaymentModal(true);
  };

  const handleConfirmSimulatedPayment = () => {
    setIsVerifyingPayment(true);
    setTimeout(() => {
      setIsVerifyingPayment(false);
      setPaymentSuccess(true);
      
      // Update package state & storage
      setStoredPackage(pendingPkg);
      setActivePkg(pendingPkg);
      window.dispatchEvent(new Event("sakinah_package_changed"));
      
      // Add successful transaction to simulated history
      const storedTxs = localStorage.getItem("sakinah_admin_txs");
      let currentTxs = [];
      if (storedTxs) {
        try {
          const parsed = JSON.parse(storedTxs);
          if (Array.isArray(parsed)) currentTxs = parsed;
        } catch (e) {}
      }
      const newTx = {
        id: `TRX${Math.floor(1000 + Math.random() * 9000)}`,
        user: weddingData.groom.nickname || "User",
        package: pendingPkg,
        amount: pendingPkg === "Mawaddah" ? 89000 : 199000,
        status: "success",
        date: new Date().toISOString().split("T")[0],
      };
      localStorage.setItem("sakinah_admin_txs", JSON.stringify([newTx, ...currentTxs]));

      toast.success(`Selamat! Pembayaran berhasil diterima. Paket Anda telah aktif sebagai ${pendingPkg}! 🎉`);
    }, 2000);
  };

  const isFeatureLocked = (m: string) => {
    const req = packageRequirements[m];
    if (!req) return false;
    if (activePkg === "Warahmah") return false;
    if (activePkg === "Mawaddah" && req === "Mawaddah") return false;
    return true;
  };

  // Komponen Helper untuk Lock State
  const renderLockedState = (m: string) => {
    const req = packageRequirements[m] || "Mawaddah";
    return (
      <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-cream/40 via-background to-gold-soft/10 p-8 text-center max-w-lg mx-auto my-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gold-soft opacity-10 rounded-full blur-xl" />
        <div className="grid h-16 w-16 place-items-center rounded-full bg-gold-soft mx-auto mb-4 text-gold">
          <Lock className="h-7 w-7" />
        </div>
        <h3 className="font-display text-xl text-foreground font-semibold">Fitur Terkunci (Minimal Paket {req})</h3>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          Fitur kelola <strong>{m}</strong> hanya tersedia untuk pelanggan yang menggunakan paket minimal{" "}
          <span className="text-gold font-bold">{req}</span>. Saat ini Anda menggunakan paket{" "}
          <span className="font-semibold">{activePkg}</span>.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => handleOpenUpgradePayment(req as any)}
            className="bg-gold hover:bg-gold/90 text-primary-foreground font-medium rounded-full px-6 py-2 shadow-sm text-xs cursor-pointer"
          >
            Upgrade ke {req} Sekarang (Simulasi QRIS)
          </Button>
        </div>
      </div>
    );
  };

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-6 select-none">
        <Toaster position="top-right" richColors />
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mb-3" />
        <span className="text-xs text-muted-foreground font-semibold">Memuat Keamanan...</span>
      </div>
    );
  }

  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-6 max-w-sm mx-auto">
        <Toaster position="top-right" richColors />
        <ShieldAlert className="h-16 w-16 text-rose-500 mb-4 animate-bounce" />
        <h1 className="font-display text-2xl font-bold text-foreground">Akses Ditolak!</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Silakan masuk ke akun Anda terlebih dahulu untuk dapat mengelola undangan pernikahan Anda di Dashboard.
        </p>
        <div className="mt-6 flex flex-col gap-2 w-full">
          <Button onClick={() => window.location.href = "/login"} className="bg-gold hover:bg-gold/90 text-primary-foreground font-semibold rounded-full w-full">
            Masuk ke Akun
          </Button>
          <Button onClick={() => window.location.href = "/"} variant="outline" className="rounded-full w-full">
            Kembali ke Landing Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Toaster position="top-right" closeButton richColors />
      <UserSidebar active={tab} />

      <main className="flex-1 p-5 md:p-8 max-w-full overflow-x-hidden">
        {/* HEADER DASHBOARD */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Hai, {weddingData.groom.nickname} & {weddingData.bride.nickname} 👋
            </h1>
            <p className="text-muted-foreground text-xs mt-1">
              Kelola undangan pernikahan Anda dari panel kontrol SakinahWeb.
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/preview" target="_blank">
              <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1.5 text-xs">
                <Share2 className="h-3.5 w-3.5" /> Lihat Website
              </Button>
            </Link>
            <Link to="/wizard">
              <Button size="sm" className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs">
                Buat Ulang di Wizard
              </Button>
            </Link>
          </div>
        </div>

        {/* -------------------- 1. TAB DASHBOARD UTAMA -------------------- */}
        {tab === "Dashboard" && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden">
                <div className="absolute -right-2 -bottom-2 opacity-10 text-gold font-display text-6xl">💎</div>
                <div className="text-xs text-muted-foreground">Paket Aktif</div>
                <div className="font-display text-xl font-bold mt-1 text-foreground flex items-center gap-2">
                  Paket {activePkg}{" "}
                  {activePkg !== "Sakinah" && <Award className="h-4 w-4 text-gold fill-gold-soft" />}
                </div>
                <Badge variant={activePkg === "Sakinah" ? "secondary" : "default"} className="mt-2 text-[10px]">
                  {activePkg === "Sakinah" ? "Free Member" : "Lifetime Premium"}
                </Badge>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden">
                <div className="absolute -right-2 -bottom-2 opacity-10 text-gold font-display text-6xl">🔗</div>
                <div className="text-xs text-muted-foreground">URL Undangan Pribadi</div>
                <div className="font-mono text-xs mt-2 text-gold font-semibold truncate">
                  {weddingData.subdomain}.sakinahweb.id
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 text-[10px] h-7 rounded-full flex items-center gap-1"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://${weddingData.subdomain}.sakinahweb.id`);
                    toast.success("Tautan undangan berhasil disalin ke clipboard!");
                  }}
                >
                  <Copy className="h-3 w-3" /> Salin URL
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden">
                <div className="absolute -right-2 -bottom-2 opacity-10 text-gold font-display text-6xl">👥</div>
                <div className="text-xs text-muted-foreground">Konfirmasi Tamu (RSVP)</div>
                <div className="font-display text-2xl font-bold mt-1 text-foreground">
                  42 <span className="text-xs text-muted-foreground font-normal">tamu mengonfirmasi hadir</span>
                </div>
                <div className="text-[10px] text-emerald-600 mt-2 font-semibold">Tersinkronisasi secara otomatis</div>
              </div>
            </div>

            {/* Upgrade banner khusus Sakinah */}
            {activePkg === "Sakinah" && (
              <div className="rounded-2xl bg-gradient-to-r from-gold-soft via-cream to-gold-soft border border-gold/30 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
                <div>
                  <Badge className="bg-gold text-primary-foreground mb-2 text-[9px] uppercase tracking-wider">
                    Penawaran Terbatas
                  </Badge>
                  <h3 className="font-display text-xl font-bold text-foreground">Upgrade ke Paket Mawaddah</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Buka akses ke semua tema eksklusif premium, galeri foto unlimited, kado digital, musik pilihan,
                    wedding wall, dan masih banyak lagi hanya dengan{" "}
                    <b className="text-foreground">{formatRupiah(89000)}</b>.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleOpenUpgradePayment("Mawaddah")}
                    className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold cursor-pointer"
                  >
                    Buka Paket Mawaddah
                  </Button>
                </div>
              </div>
            )}

            <h2 className="font-display text-lg font-bold mb-4 text-foreground flex items-center gap-2">
              <Settings className="h-4 w-4 text-gold" /> Pengaturan Undangan Anda
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {menu
                .filter((item) => item !== "Dashboard" && item !== "Pemberitahuan")
                .map((m) => {
                  const locked = isFeatureLocked(m);
                  return (
                    <Link
                      key={m}
                      to="/dashboard"
                      search={{ tab: m }}
                      className="text-left rounded-2xl border border-border bg-card p-5 hover:shadow-md transition relative group cursor-pointer"
                    >
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft mb-3 text-gold">
                        {m.includes("Mempelai") ? (
                          <Users className="h-5 w-5" />
                        ) : m.includes("Tema") ? (
                          <Palette className="h-5 w-5" />
                        ) : m.includes("Acara") ? (
                          <Calendar className="h-5 w-5" />
                        ) : m.includes("RSVP") ? (
                          <Mail className="h-5 w-5" />
                        ) : m.includes("Foto") || m.includes("Slide") ? (
                          <ImageIcon className="h-5 w-5" />
                        ) : m.includes("Music") ? (
                          <Music className="h-5 w-5" />
                        ) : m.includes("Kado") ? (
                          <Gift className="h-5 w-5" />
                        ) : (
                          <Sparkles className="h-5 w-5" />
                        )}
                      </div>
                      <div className="font-semibold text-xs flex items-center gap-1.5">
                        {m}
                        {locked && <Lock className="h-3.5 w-3.5 text-muted-foreground/60" />}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">Klik untuk membuka pengaturan {m.toLowerCase()}</p>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}

        {/* -------------------- 2. PENGATURAN UMUM / DOMAIN -------------------- */}
        {tab === "Pengaturan Umum" && (
          <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl">
            <h2 className="font-display text-lg font-bold mb-4 text-foreground flex items-center gap-2">
              <Globe className="h-5 w-5 text-gold" /> Pengaturan Domain & Informasi Website
            </h2>
            <div className="space-y-4">
              <div>
                <Label className="text-xs">Subdomain Unik Undangan</Label>
                <div className="flex mt-1.5">
                  <Input
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="rounded-r-none text-xs"
                    placeholder="nama-subdomain"
                  />
                  <span className="grid place-items-center px-4 rounded-r-md bg-muted text-xs text-muted-foreground border border-l-0 border-input font-mono font-semibold">
                    .sakinahweb.id
                  </span>
                </div>
                <p className="text-[10px] text-gold mt-1.5 font-medium">
                  Pratinjau tautan Anda: https://{domainName || "di-ra"}.sakinahweb.id
                </p>
                <div className="mt-2 text-[10px] text-muted-foreground bg-cream/40 px-3 py-2 rounded-lg border border-gold/10">
                  ⚠️ <b>Info:</b> Anda sudah mengganti domain sebanyak <b>0 kali</b> dari maksimum 3 kali.
                </div>
              </div>

              <div className="border-t border-border/60 my-4 pt-4 space-y-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Pengaturan Optimasi SEO & Sosial Media
                </h3>
                <div className="space-y-1.5">
                  <Label className="text-xs">Judul Website (SEO Title)</Label>
                  <Input
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="text-xs mt-1.5"
                    placeholder="Website Pernikahan ..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Deskripsi Website (SEO Description)</Label>
                  <Textarea
                    value={siteDesc}
                    onChange={(e) => setSiteDesc(e.target.value)}
                    className="text-xs mt-1.5"
                    rows={3}
                    placeholder="Website ini merupakan..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Kata Kunci (SEO Keywords)</Label>
                  <Input
                    value={siteKeywords}
                    onChange={(e) => setSiteKeywords(e.target.value)}
                    className="text-xs mt-1.5"
                    placeholder="Pernikahan adbi dan rara, Nikah online, Nikah bibi rarw"
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveGeneralSettings}
                className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full w-full sm:w-auto text-xs mt-2"
              >
                Simpan Perubahan
              </Button>
            </div>
          </div>
        )}

        {/* -------------------- 3. MEMPELAI PRIA -------------------- */}
        {tab === "Mempelai Pria" && (
          <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl">
            <h2 className="font-display text-lg font-bold mb-4 text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-gold" /> Pengaturan Informasi Mempelai Pria
            </h2>
            <div className="space-y-4">
              {/* Foto Mempelai Pria */}
              <div>
                <Label className="text-xs block mb-2">Foto Mempelai Pria</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full border border-dashed border-border bg-muted flex flex-col items-center justify-center text-muted-foreground text-[10px]">
                    <span>Foto Kosong</span>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full text-xs">
                    Unggah Foto Pria
                  </Button>
                </div>
              </div>

              {/* Sembunyikan Foto Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30">
                <div>
                  <Label className="text-xs font-semibold">Sembunyikan Foto Mempelai</Label>
                  <p className="text-[10px] text-muted-foreground">Foto pria tidak akan ditampilkan di halaman depan</p>
                </div>
                <Switch checked={groomHidePhoto} onCheckedChange={setGroomHidePhoto} />
              </div>

              {/* Form Input */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Nama Lengkap Mempelai Pria</Label>
                  <Input value={groomFull} onChange={(e) => setGroomFull(e.target.value)} className="text-xs mt-1" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Nama Panggilan</Label>
                  <Input value={groomNick} onChange={(e) => setGroomNick(e.target.value)} className="text-xs mt-1" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Nama Lengkap Ayah Pria</Label>
                  <Input value={groomFather} onChange={(e) => setGroomFather(e.target.value)} className="text-xs mt-1" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Nama Lengkap Ibu Pria</Label>
                  <Input value={groomMother} onChange={(e) => setGroomMother(e.target.value)} className="text-xs mt-1" />
                </div>
              </div>

              <Button
                onClick={handleSaveGroom}
                className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full w-full sm:w-auto text-xs mt-2"
              >
                Ubah Informasi Mempelai
              </Button>
            </div>
          </div>
        )}

        {/* -------------------- 4. MEMPELAI WANITA -------------------- */}
        {tab === "Mempelai Wanita" && (
          <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl">
            <h2 className="font-display text-lg font-bold mb-4 text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-gold" /> Pengaturan Informasi Mempelai Wanita
            </h2>
            <div className="space-y-4">
              {/* Foto Mempelai Wanita */}
              <div>
                <Label className="text-xs block mb-2">Foto Mempelai Wanita</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full border border-dashed border-border bg-muted flex flex-col items-center justify-center text-muted-foreground text-[10px]">
                    <span>Foto Kosong</span>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full text-xs">
                    Unggah Foto Wanita
                  </Button>
                </div>
              </div>

              {/* Jadikan Didepan Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30">
                <div>
                  <Label className="text-xs font-semibold">Jadikan Didepan (Wanita Dahulu)</Label>
                  <p className="text-[10px] text-muted-foreground">Profil wanita akan dirender sebelum profil pria</p>
                </div>
                <Switch checked={brideFront} onCheckedChange={setBrideFront} />
              </div>

              {/* Form Input */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Nama Lengkap Mempelai Wanita</Label>
                  <Input value={brideFull} onChange={(e) => setBrideFull(e.target.value)} className="text-xs mt-1" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Nama Panggilan</Label>
                  <Input value={brideNick} onChange={(e) => setBrideNick(e.target.value)} className="text-xs mt-1" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Nama Lengkap Ayah Wanita</Label>
                  <Input value={brideFather} onChange={(e) => setBrideFather(e.target.value)} className="text-xs mt-1" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Nama Lengkap Ibu Wanita</Label>
                  <Input value={brideMother} onChange={(e) => setBrideMother(e.target.value)} className="text-xs mt-1" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Tentang Mempelai Wanita</Label>
                <Textarea
                  value={brideBio}
                  onChange={(e) => setBrideBio(e.target.value)}
                  className="text-xs mt-1"
                  rows={2}
                  placeholder="Keterangan singkat..."
                />
              </div>

              <Button
                onClick={handleSaveBride}
                className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full w-full sm:w-auto text-xs mt-2"
              >
                Ubah Informasi Mempelai
              </Button>
            </div>
          </div>
        )}

        {/* -------------------- 5. PILIH TEMA -------------------- */}
        {tab === "Pilih Tema" && (
          <div className="space-y-6 max-w-5xl">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <Palette className="h-5 w-5 text-gold" /> Pilihan Tema Undangan Pernikahan
              </h2>
              <p className="text-muted-foreground text-xs mt-1">
                Kalian bisa mengatur tema visual undangan kalian kapan saja tanpa batasan.
              </p>
            </div>

            <div className="border-b border-border mb-4 flex gap-4 text-xs font-semibold">
              <span className="border-b-2 border-gold pb-2 text-gold cursor-pointer">Semua Tema</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templatesList.map((tmpl) => {
                const isActive = selectedTemplate === tmpl.id;
                const isPremium = tmpl.type === "Premium";
                const isLocked = isPremium && activePkg === "Sakinah";
                return (
                  <div
                    key={tmpl.id}
                    className={`rounded-2xl border bg-card p-4 relative overflow-hidden transition hover:shadow-md flex flex-col justify-between h-48
                      ${isActive ? "border-gold ring-1 ring-gold" : "border-border"}`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="text-3xl">{tmpl.icon}</div>
                        <div className="flex gap-1.5">
                          {tmpl.popular && (
                            <Badge className="bg-rose-500 hover:bg-rose-500 text-white text-[9px]">Populer</Badge>
                          )}
                          <Badge variant={isPremium ? "default" : "outline"} className="text-[9px] uppercase tracking-wider">
                            {isPremium ? "Premium" : "Basic"}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="font-display font-bold text-sm text-foreground">{tmpl.name}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">Template {tmpl.type} SakinahWeb</div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-2 border-t border-border/40">
                      <Button
                        size="sm"
                        disabled={isLocked}
                        variant={isActive ? "default" : "outline"}
                        onClick={() => handleSelectTemplate(tmpl.id, isPremium)}
                        className={`text-xs rounded-full flex-1 h-8 ${isActive ? "bg-gold hover:bg-gold/90 text-primary-foreground border-none" : ""}`}
                      >
                        {isActive ? "✓ Tema Aktif" : isLocked ? "🔒 Terkunci" : "Coba Tema"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------- 6. INFORMASI ACARA -------------------- */}
        {tab === "Informasi Acara" && (
          <div className="rounded-2xl border border-border bg-card p-6 max-w-3xl space-y-6">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gold" /> Pengaturan Informasi Acara Pernikahan
            </h2>

            {/* Setingan Umum */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Setingan Umum</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Agama</Label>
                  <Input value={religion} onChange={(e) => setReligion(e.target.value)} className="text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Zona Waktu</Label>
                  <Input value={timezone} onChange={(e) => setTimezone(e.target.value)} className="text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Tipe Peta Lokasi</Label>
                  <select
                    value={mapType}
                    onChange={(e) => setMapType(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-md border border-input bg-background"
                  >
                    <option value="Static Map">Static Map</option>
                    <option value="Interactive Google Maps">Interactive Google Maps</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Akad Nikah */}
            <div className="border-t border-border/60 pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acara 1: Akad Nikah</h3>
                <div className="flex items-center gap-2">
                  <Label className="text-[10px]">Tampilkan Acara</Label>
                  <Switch checked={akadShow} onCheckedChange={setAkadShow} />
                </div>
              </div>

              {akadShow && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Tanggal Akad</Label>
                      <Input
                        value={akadDate}
                        onChange={(e) => setAkadDate(e.target.value)}
                        placeholder="Sabtu, 30 Mei 2026"
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Waktu Akad</Label>
                      <Input value={akadTime} onChange={(e) => setAkadTime(e.target.value)} className="text-xs" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Tanggal Utama (Countdown)</Label>
                      <select
                        value={String(akadMain)}
                        onChange={(e) => {
                          setAkadMain(e.target.value === "true");
                          if (e.target.value === "true") setResepsiMain(false);
                        }}
                        className="w-full text-xs px-3 py-2 rounded-md border border-input bg-background"
                      >
                        <option value="true">Ya</option>
                        <option value="false">Tidak</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Tempat Akad & Alamat</Label>
                    <Input value={akadVenue} onChange={(e) => setAkadVenue(e.target.value)} className="text-xs" />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Tautan Google Maps Akad (URL Link / Embed Iframe)</Label>
                    <Input 
                      value={akadMaps} 
                      onChange={(e) => setAkadMaps(e.target.value)} 
                      placeholder="Contoh: https://maps.app.goo.gl/... atau tag <iframe>" 
                      className="text-xs font-mono"
                    />
                  </div>
                  
                  <div className="text-[10px] text-muted-foreground bg-cream/40 px-3 py-2 rounded-lg border border-gold/10 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gold" />
                    <span>Google Maps: {akadMaps ? <b className="text-emerald-600">Teratur ({akadMaps.substring(0, 30)}...)</b> : <b>Peta belum diatur</b>}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Resepsi Pernikahan */}
            <div className="border-t border-border/60 pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acara 2: Resepsi Pernikahan</h3>
                <div className="flex items-center gap-2">
                  <Label className="text-[10px]">Tampilkan Acara</Label>
                  <Switch checked={resepsiShow} onCheckedChange={setResepsiShow} />
                </div>
              </div>

              {resepsiShow && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Tanggal Resepsi</Label>
                      <Input
                        value={resepsiDate}
                        onChange={(e) => setResepsiDate(e.target.value)}
                        placeholder="Minggu, 31 Mei 2026"
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Waktu Resepsi</Label>
                      <Input value={resepsiTime} onChange={(e) => setResepsiTime(e.target.value)} className="text-xs" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Tanggal Utama (Countdown)</Label>
                      <select
                        value={String(resepsiMain)}
                        onChange={(e) => {
                          setResepsiMain(e.target.value === "true");
                          if (e.target.value === "true") setAkadMain(false);
                        }}
                        className="w-full text-xs px-3 py-2 rounded-md border border-input bg-background"
                      >
                        <option value="true">Ya</option>
                        <option value="false">Tidak</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Tempat Resepsi & Alamat</Label>
                    <Input value={resepsiVenue} onChange={(e) => setResepsiVenue(e.target.value)} className="text-xs" />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Tautan Google Maps Resepsi (URL Link / Embed Iframe)</Label>
                    <Input 
                      value={resepsiMaps} 
                      onChange={(e) => setResepsiMaps(e.target.value)} 
                      placeholder="Contoh: https://maps.app.goo.gl/... atau tag <iframe>" 
                      className="text-xs font-mono"
                    />
                  </div>

                  <div className="text-[10px] text-muted-foreground bg-cream/40 px-3 py-2 rounded-lg border border-gold/10 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gold" />
                    <span>Google Maps: {resepsiMaps ? <b className="text-emerald-600">Teratur ({resepsiMaps.substring(0, 30)}...)</b> : <b>Peta belum diatur</b>}</span>
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={handleSaveEvents}
              className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full w-full sm:w-auto text-xs mt-2"
            >
              Ubah Informasi Acara
            </Button>
          </div>
        )}

        {/* -------------------- 7. INFORMASI UNDANGAN -------------------- */}
        {tab === "Informasi Undangan" && (
          <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-gold" /> Pengaturan Informasi Tambahan Undangan
            </h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Turut Mengundang</Label>
                <Textarea
                  value={turutMengundang}
                  onChange={(e) => setTurutMengundang(e.target.value)}
                  className="text-xs"
                  rows={4}
                  placeholder="Keluarga Besar, Teman Sejawat, dll."
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Catatan Undangan (Invitation Note)</Label>
                <Textarea
                  value={invitationNote}
                  onChange={(e) => setInvitationNote(e.target.value)}
                  className="text-xs"
                  rows={2}
                  placeholder="Tanpa mengurangi rasa hormat..."
                />
              </div>

              <Button
                onClick={handleSaveInvitation}
                className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full w-full sm:w-auto text-xs"
              >
                Ubah Informasi Undangan
              </Button>
            </div>
          </div>
        )}

        {/* -------------------- 8. CERITA CINTA (LOCKED MIN MAWADDAH) -------------------- */}
        {tab === "Cerita Cinta" && (
          <div className="space-y-4">
            {isFeatureLocked("Cerita Cinta") ? (
              renderLockedState("Cerita Cinta")
            ) : (
              <div className="rounded-2xl border border-border bg-card p-8 max-w-xl text-center mx-auto my-6 space-y-4">
                <div className="text-3xl text-gold">💖</div>
                <h3 className="font-display font-semibold text-lg">Kisah Cinta Mempelai</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Saat ini anda belum mempunyai cerita cinta yang akan anda bagikan di website nikah anda.
                </p>
                <Button className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold px-6">
                  Tulis Cerita
                </Button>
              </div>
            )}
          </div>
        )}

        {/* -------------------- 9. RSVP UNDANGAN -------------------- */}
        {tab === "RSVP Undangan" && (
          <div className="rounded-2xl border border-border bg-card p-6 max-w-4xl space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <Mail className="h-5 w-5 text-gold" /> Data RSVP Tamu Undangan
              </h2>
              <Button
                variant={rsvpActive ? "destructive" : "default"}
                size="sm"
                className="rounded-full text-xs"
                onClick={() => {
                  setRsvpActive(!rsvpActive);
                  localStorage.setItem("sakinah_rsvp_active", String(!rsvpActive));
                  toast.success(`RSVP berhasil ${!rsvpActive ? "Diaktifkan" : "Dinonaktifkan"}`);
                }}
              >
                {rsvpActive ? "Non Aktifkan RSVP" : "Aktifkan RSVP"}
              </Button>
            </div>

            <div className="p-3 bg-muted/40 rounded-xl border border-border text-xs text-muted-foreground font-semibold">
              Ada <b>42 Undangan</b> yang akan hadir dan ada <b>0</b> yang tidak akan hadir.
            </div>

            <div className="border border-border rounded-xl overflow-hidden bg-card text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/80 border-b border-border font-semibold">
                    <th className="p-3">Nama Tamu</th>
                    <th className="p-3">Hubungan / Instansi</th>
                    <th className="p-3">Kehadiran</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { n: "Budi Santoso", r: "Keluarga Pria", h: "Hadir (2 Orang)" },
                    { n: "Dewi Lestari", r: "Teman SMA Wanita", h: "Hadir (1 Orang)" },
                    { n: "Yusuf Kuncoro", r: "Rekan Kerja", h: "Hadir (2 Orang)" },
                  ].map((guest, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="p-3 font-medium">{guest.n}</td>
                      <td className="p-3 text-muted-foreground">{guest.r}</td>
                      <td className="p-3 text-emerald-600 font-semibold">{guest.h}</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 p-1 text-[10px]">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------- 10. ACARA TAMBAHAN (LOCKED MIN MAWADDAH) -------------------- */}
        {tab === "Acara Tambahan" && (
          <div className="space-y-4">
            {isFeatureLocked("Acara Tambahan") ? (
              renderLockedState("Acara Tambahan")
            ) : (
              <div className="rounded-2xl border border-border bg-card p-8 max-w-xl text-center mx-auto my-6 space-y-4">
                <div className="text-3xl text-gold">🎉</div>
                <h3 className="font-display font-semibold text-lg">Acara Tambahan (Keluarga)</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Belum ada acara tambahan seperti Unduh Mantu, Siraman, atau Pengajian yang dikonfigurasi.
                </p>
                <Button className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold px-6">
                  Tambah Acara Baru
                </Button>
              </div>
            )}
          </div>
        )}

        {/* -------------------- 11. BAHASA CUSTOM (LOCKED MIN MAWADDAH) -------------------- */}
        {tab === "Bahasa Custom" && (
          <div className="space-y-4">
            {isFeatureLocked("Bahasa Custom") ? (
              renderLockedState("Bahasa Custom")
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6 max-w-4xl space-y-6">
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-gold" /> Kustomisasi Bahasa & Istilah Undangan
                  </h2>
                  <p className="text-muted-foreground text-[10px] mt-1">
                    Ubah 35 istilah teks utama undangan Anda agar sesuai dengan selera kultural lokal Anda.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 h-[400px] overflow-y-auto pr-2 border border-border p-4 rounded-xl bg-muted/20">
                  {[
                    { key: "coverText", label: "Teks Pengumuman Cover", def: "Akan segera melangsungkan pernikahan" },
                    { key: "coverButton", label: "Tombol Buka Cover", def: "Buka Undangan" },
                    { key: "openingTitle", label: "Salam Pembuka", def: "Assalamu'alaikum" },
                    { key: "openingText", label: "Teks Pengantar Nikah", def: "Dengan Rahmat Allah yang Maha Kuasa..." },
                    { key: "akadLabel", label: "Label Akad Nikah", def: "Akad Nikah" },
                    { key: "resepsiLabel", label: "Label Resepsi Pernikahan", def: "Resepsi Pernikahan" },
                    { key: "turutLabel", label: "Label Turut Mengundang", def: "Turut Mengundang" },
                    { key: "noteLabel", label: "Label Catatan Undangan", def: "Catatan" },
                    { key: "mapLabel", label: "Label Peta Lokasi", def: "Peta Lokasi" },
                    { key: "storyLabel", label: "Label Cerita Cinta", def: "Cerita Cinta" },
                    { key: "galleryLabel", label: "Label Galeri Foto", def: "Galeri Foto" },
                  ].map((field) => (
                    <div key={field.key} className="space-y-1.5">
                      <Label className="text-xs font-semibold">{field.label}</Label>
                      <Input
                        value={customLanguage[field.key] || ""}
                        placeholder={field.def}
                        onChange={(e) => setCustomLanguage({ ...customLanguage, [field.key]: e.target.value })}
                        className="text-xs"
                      />
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleSaveLanguage}
                  className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full w-full sm:w-auto text-xs"
                >
                  Ubah Bahasa Undangan
                </Button>
              </div>
            )}
          </div>
        )}

        {/* -------------------- 12. KIRIM UNDANGAN (LOCKED MIN MAWADDAH) -------------------- */}
        {tab === "Kirim Undangan" && (
          <div className="space-y-4">
            {isFeatureLocked("Kirim Undangan") ? (
              renderLockedState("Kirim Undangan")
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl space-y-4">
                <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-gold" /> Kirim Undangan Digital (WhatsApp Share Link)
                </h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Tulis Nama Teman / Tamu</Label>
                      <Input
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="text-xs"
                        placeholder="Contoh: Budi Santoso"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Tulis Alamat / Tempat</Label>
                      <Input
                        value={guestAddress}
                        onChange={(e) => setGuestAddress(e.target.value)}
                        className="text-xs"
                        placeholder="Contoh: Jakarta"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/30 p-4">
                    <Label className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                      Tautan Khusus Tamu (Share URL Preview)
                    </Label>
                    <div className="font-mono text-xs text-gold font-bold mt-1 bg-background px-3 py-2 rounded border border-border select-all select-none truncate">
                      https://{weddingData.subdomain}.sakinahweb.id/kepada/
                      {guestName.replace(/\s+/g, "") || "NamaTamu"}-{guestAddress.replace(/\s+/g, "") || "Tempat"}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold"
                      onClick={() => {
                        const url = `https://${weddingData.subdomain}.sakinahweb.id/kepada/${guestName.replace(/\s+/g, "") || "NamaTamu"}-${guestAddress.replace(/\s+/g, "") || "Tempat"}`;
                        window.open(`https://api.whatsapp.com/send?text=Halo ${guestName}, kami mengundang Anda ke pernikahan kami. Silahkan buka tautan berikut: ${url}`, "_blank");
                      }}
                    >
                      Kirim via WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full text-xs font-semibold"
                      onClick={() => {
                        const url = `https://${weddingData.subdomain}.sakinahweb.id/kepada/${guestName.replace(/\s+/g, "") || "NamaTamu"}-${guestAddress.replace(/\s+/g, "") || "Tempat"}`;
                        navigator.clipboard.writeText(url);
                        toast.success("Tautan khusus tamu berhasil disalin!");
                      }}
                    >
                      <Copy className="h-4 w-4 mr-1.5" /> Salin Tautan
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------- 13. FOTO GALERI -------------------- */}
        {tab === "Foto Galeri" && (
          <div className="rounded-2xl border border-border bg-card p-8 max-w-xl text-center mx-auto my-6 space-y-4">
            <div className="text-3xl text-gold">📸</div>
            <h3 className="font-display font-semibold text-lg">Kelola Album Galeri Foto</h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Saat ini anda belum mempunyai photo yang akan anda bagikan di website nikah anda...
            </p>
            <Button className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold px-6">
              Unggah Photo
            </Button>
          </div>
        )}

        {/* -------------------- 14. BACKGROUND MUSIC (LOCKED MIN MAWADDAH) -------------------- */}
        {tab === "Background Music" && (
          <div className="space-y-4">
            {isFeatureLocked("Background Music") ? (
              renderLockedState("Background Music")
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl space-y-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                    <Music className="h-5 w-5 text-gold" /> Pilihan Musik Latar Belakang (Background Music)
                  </h2>
                  <p className="text-muted-foreground text-xs mt-1">
                    Musik romantis pilihan yang akan langsung berputar secara otomatis saat undangan dibuka.
                  </p>
                </div>

                <div className="space-y-2 border border-border p-3 rounded-xl bg-muted/10">
                  {[
                    "Tanpa Audio",
                    "Beautiful - Instrumental",
                    "Call Of The Wild",
                    "From This Moment On",
                    "Maherzain - Barakallah Instrumental",
                    "Our Wedding Day",
                    "Romantic Piano and Orchestra",
                  ].map((track) => {
                    const isSelected = selectedMusic === track;
                    return (
                      <div
                        key={track}
                        className={`flex items-center justify-between p-3 rounded-lg border text-xs transition
                          ${isSelected ? "border-gold bg-gold-soft/20 font-semibold" : "border-border bg-card hover:bg-muted/30"}`}
                      >
                        <span className="flex items-center gap-2">
                          <Volume2 className={`h-4 w-4 ${isSelected ? "text-gold animate-bounce" : "text-muted-foreground"}`} />
                          {track}
                        </span>
                        <Button
                          size="sm"
                          variant={isSelected ? "default" : "outline"}
                          className={`text-[10px] h-7 rounded-full px-4 ${isSelected ? "bg-gold hover:bg-gold/90 text-primary-foreground border-none" : ""}`}
                          onClick={() => handleSelectMusic(track)}
                        >
                          {isSelected ? "✓ Dipilih" : "Pilih"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------- 15. SLIDE IMAGE (LOCKED MIN MAWADDAH) -------------------- */}
        {tab === "Slide Image" && (
          <div className="space-y-4">
            {isFeatureLocked("Slide Image") ? (
              renderLockedState("Slide Image")
            ) : (
              <div className="rounded-2xl border border-border bg-card p-8 max-w-xl text-center mx-auto my-6 space-y-4">
                <div className="text-3xl text-gold">🖼️</div>
                <h3 className="font-display font-semibold text-lg">Unggah Slide Gambar Cover</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Slide gambar kustom untuk cover utama undangan yang akan bergerak bergantian secara otomatis.
                </p>
                <Button className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold px-6">
                  Unggah Slide Image
                </Button>
              </div>
            )}
          </div>
        )}

        {/* -------------------- 16. VIDEO GALERI (LOCKED MIN MAWADDAH/WARAHMAH) -------------------- */}
        {tab === "Video Galeri" && (
          <div className="space-y-4">
            {isFeatureLocked("Video Galeri") ? (
              renderLockedState("Video Galeri")
            ) : (
              <div className="rounded-2xl border border-border bg-card p-8 max-w-xl text-center mx-auto my-6 space-y-4">
                <div className="text-3xl text-gold">🎬</div>
                <h3 className="font-display font-semibold text-lg">Sematkan Galeri Video Undangan</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Tambahkan link video prewedding YouTube atau Vimeo agar tamu undangan bisa menyaksikannya secara interaktif.
                </p>
                <Button className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold px-6">
                  Tambah Video Galeri
                </Button>
              </div>
            )}
          </div>
        )}

        {/* -------------------- 17. KADO NIKAH (LOCKED MIN MAWADDAH) -------------------- */}
        {tab === "Kado Nikah" && (
          <div className="space-y-4">
            {isFeatureLocked("Kado Nikah") ? (
              renderLockedState("Kado Nikah")
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6 max-w-3xl space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                    <Gift className="h-5 w-5 text-gold" /> Pengaturan Dompet & Kado Digital (Cashless Gift)
                  </h2>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Aktifkan Kado</Label>
                    <Switch checked={kadoActive} onCheckedChange={setKadoActive} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs font-semibold">Daftar Rekening Bank / E-Wallet</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddRekening}
                        className="rounded-full text-[10px] h-7"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Tambah
                      </Button>
                    </div>

                    {kadoRekening.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground bg-muted/10">
                        Belum ada rekening yang didaftarkan.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {kadoRekening.map((rek, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 rounded-lg border border-border bg-muted/20 text-xs">
                            <div>
                              <div className="font-semibold">{rek.bank} - {rek.nomor}</div>
                              <div className="text-[10px] text-muted-foreground">a.n. {rek.pemilik}</div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveRekening(idx)}
                              className="text-red-500 hover:text-red-600 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Petunjuk Pengiriman Kado</Label>
                      <Textarea
                        value={kadoCara}
                        onChange={(e) => setKadoCara(e.target.value)}
                        className="text-xs font-normal"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label className="text-xs block mb-1.5">Gambar Pendukung QRIS</Label>
                      <div className="h-28 rounded-xl border border-dashed border-border bg-muted/40 flex items-center justify-center text-xs text-muted-foreground text-center">
                        Upload QRIS Kosong
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSaveKado}
                  className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full w-full sm:w-auto text-xs mt-2"
                >
                  Simpan Informasi Kado
                </Button>
              </div>
            )}
          </div>
        )}

        {/* -------------------- 18. DOA DAN HARAPAN (LOCKED MIN MAWADDAH) -------------------- */}
        {tab === "Doa dan Harapan" && (
          <div className="space-y-4">
            {isFeatureLocked("Doa dan Harapan") ? (
              renderLockedState("Doa dan Harapan")
            ) : (
              <div className="rounded-2xl border border-border bg-card p-8 max-w-xl text-center mx-auto my-6 space-y-4">
                <div className="text-3xl text-gold">💬</div>
                <h3 className="font-display font-semibold text-lg">Doa Restu Tamu</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Belum ada doa dan harapan dari tamu undangan yang masuk saat ini.
                </p>
              </div>
            )}
          </div>
        )}

        {/* -------------------- 19. WEDDING WALL (LOCKED PREMIUM) -------------------- */}
        {tab === "Wedding Wall" && (
          <div className="space-y-4">
            {isFeatureLocked("Wedding Wall") ? (
              renderLockedState("Wedding Wall")
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6 max-w-3xl space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
                  <div>
                    <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                      <Tv className="h-5 w-5 text-gold" /> Panel Wedding Wall (LED & Proyektor)
                    </h2>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      Tampilkan doa restu dan ucapan selamat secara live di layar resepsi pernikahan Anda.
                    </p>
                  </div>
                  <Button 
                    onClick={() => {
                      toast.success("Membuka Wedding Wall Mode Display Proyektor...");
                      window.open("/preview?tab=Ucapan", "_blank");
                    }}
                    className="bg-gold hover:bg-gold/90 text-primary-foreground text-xs rounded-full font-semibold px-4 h-8 shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> Buka Layar Penuh (Display Mode)
                  </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Konfigurasi */}
                  <div className="md:col-span-1 space-y-4 text-xs">
                    <h3 className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Desain Layar</h3>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-[10px]">Warna Tema Background</Label>
                        <select className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-input bg-background mt-1 text-foreground">
                          <option>Gold Luxury (Bawaan)</option>
                          <option>Romantic Blossom Pink</option>
                          <option>Elegant Emerald Green</option>
                          <option>Minimalist Dark Gold</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-[10px]">Gaya Huruf (Font Family)</Label>
                        <select className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-input bg-background mt-1 text-foreground">
                          <option>Playfair Display</option>
                          <option>Outfit (Sans-Serif)</option>
                          <option>Montserrat</option>
                          <option>Cinzel Decorative</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-[10px]">Kecepatan Gulir Doa</Label>
                        <select className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-input bg-background mt-1 text-foreground">
                          <option>Lambat (Membaca Santai)</option>
                          <option>Sedang (Bawaan)</option>
                          <option>Cepat (Banyak Ucapan)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Live Feed Simulator */}
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px] text-xs">Simulasi Live Feed</h3>
                    <div className="rounded-xl border border-gold/20 bg-gradient-to-b from-stone-950 via-amber-950/20 to-stone-950 p-4 min-h-[160px] flex flex-col justify-between text-xs relative overflow-hidden shadow-inner text-white">
                      <div className="absolute top-2 right-2 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-wider">LIVE FEED ACTIVE</span>
                      </div>
                      
                      <div className="space-y-2 mt-4 max-h-24 overflow-y-auto pr-1">
                        <div className="bg-stone-900/60 border border-gold/15 p-2 rounded-lg text-[10px]">
                          <div className="font-semibold text-gold">Ahmad & Fani - Meja 4</div>
                          <p className="text-stone-300">"Selamat menempuh hidup baru bibi & rarw! acaranya seru sekali."</p>
                        </div>
                        <div className="bg-stone-900/60 border border-gold/15 p-2 rounded-lg text-[10px]">
                          <div className="font-semibold text-gold">Dwi Lestari - VIP Utama</div>
                          <p className="text-stone-300">"Sakinah Mawaddah Warahmah selalu kawan lamaku!"</p>
                        </div>
                      </div>

                      <div className="text-[9px] text-muted-foreground text-center border-t border-white/5 pt-2 mt-2">
                        Doa tamu dari **Meja Ucapan** atau **RSVP Undangan** akan ter-render live di sini.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------- 20. UCAPAN MEJA (LOCKED PREMIUM) -------------------- */}
        {tab === "Ucapan Meja" && (
          <div className="space-y-4">
            {isFeatureLocked("Ucapan Meja") ? (
              renderLockedState("Ucapan Meja")
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6 max-w-3xl space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
                  <div>
                    <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-gold" /> Fitur Meja Ucapan Tamu (Table Greetings)
                    </h2>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      Buat QR Code unik untuk masing-masing meja agar tamu dapat mengirim ucapan berkategori meja.
                    </p>
                  </div>
                  <Button 
                    onClick={() => {
                      toast.success("Berhasil menambahkan meja baru! QR Code siap diunduh.");
                    }}
                    className="bg-gold hover:bg-gold/90 text-primary-foreground text-xs rounded-full font-semibold px-4 h-8 shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Tambah Meja Baru
                  </Button>
                </div>

                <div className="grid md:grid-cols-5 gap-6">
                  {/* Table List */}
                  <div className="md:col-span-3 space-y-3">
                    <h3 className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px] text-xs">Daftar QR Meja Tamu</h3>
                    <div className="border border-border rounded-xl overflow-hidden text-xs">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-muted border-b border-border font-semibold">
                            <th className="p-2.5">Nama Meja</th>
                            <th className="p-2.5">Doa Masuk</th>
                            <th className="p-2.5 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/40 hover:bg-muted/10">
                            <td className="p-2.5 font-semibold">Meja VIP Utama</td>
                            <td className="p-2.5">14 Doa</td>
                            <td className="p-2.5 text-right flex gap-1.5 justify-end">
                              <Button size="sm" variant="outline" className="h-7 text-[9px] rounded-full cursor-pointer" onClick={() => toast.success("QR Code Meja VIP Utama berhasil diunduh!")}>Download QR</Button>
                            </td>
                          </tr>
                          <tr className="border-b border-border/40 hover:bg-muted/10">
                            <td className="p-2.5 font-semibold">Meja Keluarga Pria</td>
                            <td className="p-2.5">8 Doa</td>
                            <td className="p-2.5 text-right flex gap-1.5 justify-end">
                              <Button size="sm" variant="outline" className="h-7 text-[9px] rounded-full cursor-pointer" onClick={() => toast.success("QR Code Meja Keluarga Pria berhasil diunduh!")}>Download QR</Button>
                            </td>
                          </tr>
                          <tr className="border-b border-border/40 hover:bg-muted/10">
                            <td className="p-2.5 font-semibold">Meja Sahabat Kuliah</td>
                            <td className="p-2.5">23 Doa</td>
                            <td className="p-2.5 text-right flex gap-1.5 justify-end">
                              <Button size="sm" variant="outline" className="h-7 text-[9px] rounded-full cursor-pointer" onClick={() => toast.success("QR Code Meja Sahabat Kuliah berhasil diunduh!")}>Download QR</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* QR Card Preview */}
                  <div className="md:col-span-2 space-y-3">
                    <h3 className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px] text-xs">Desain Kartu Meja (Preview)</h3>
                    <div className="rounded-xl border border-gold/30 bg-gradient-to-b from-cream/20 to-gold-soft/10 p-4 text-center text-xs space-y-3 shadow-sm relative overflow-hidden">
                      <div className="text-[9px] uppercase tracking-widest text-gold font-bold">MEJA TAMU ANDA</div>
                      <div className="font-display font-black text-sm text-foreground">MEJA SAHABAT KULIAH</div>
                      
                      {/* Simulated QR Code box */}
                      <div className="h-28 w-28 rounded-lg bg-white border border-border mx-auto flex flex-col items-center justify-center p-2 relative">
                        <div className="text-3xl text-stone-800">📱</div>
                        <div className="text-[7px] text-muted-foreground font-semibold mt-1">SCAN QR UNTUK DOA</div>
                      </div>

                      <p className="text-[9px] text-muted-foreground px-2">
                        Letakkan cetakan kartu ini di meja tamu. Tamu cukup scan dan ucapan langsung tampil di Wedding Wall proyektor!
                      </p>
                      <Button size="sm" className="w-full bg-gold hover:bg-gold/90 text-primary-foreground text-xs rounded-full h-8 font-semibold cursor-pointer" onClick={() => toast.success("Mencetak kartu meja Sahabat Kuliah...")}>
                        Cetak Kartu Meja (PDF)
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------- 21. VIDEO UNDANGAN (LOCKED WARAHMAH) -------------------- */}
        {tab === "Video Undangan" && (
          <div className="space-y-4">
            {isFeatureLocked("Video Undangan") ? (
              renderLockedState("Video Undangan")
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6 max-w-3xl space-y-6">
                <div className="border-b border-border pb-4">
                  <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                    <Video className="h-5 w-5 text-gold" /> Generator Video Undangan Singkat (WhatsApp Video Invitation)
                  </h2>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Ekspor video undangan digital animasi berdurasi 15-30 detik dengan nama mempelai dan musik latar.
                  </p>
                </div>

                <div className="grid md:grid-cols-5 gap-6">
                  {/* Video Customization */}
                  <div className="md:col-span-2 space-y-4 text-xs">
                    <h3 className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px] text-xs">Kustomisasi Animasi</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label className="text-[10px]">Ukuran / Dimensi Video</Label>
                        <select className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-input bg-background mt-1 text-foreground">
                          <option>Vertical Story 9:16 (WhatsApp & IG)</option>
                          <option>Square Feed 1:1 (Instagram)</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-[10px]">Template Animasi</Label>
                        <select className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-input bg-background mt-1 text-foreground">
                          <option>Romantic Gold Floral (Bawaan)</option>
                          <option>Rose Velvet Vintage</option>
                          <option>Minimalist modern line-art</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-[10px]">Musik Latar Belakang</Label>
                        <select className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-input bg-background mt-1 text-foreground">
                          <option>Beautiful - Instrumental (Bawaan)</option>
                          <option>A Thousand Years (Instrumental)</option>
                          <option>Wedding Vows Symphony</option>
                        </select>
                      </div>
                    </div>

                    <Button 
                      onClick={() => {
                        toast.promise(
                          new Promise((resolve) => setTimeout(resolve, 3000)),
                          {
                            loading: "Merender video animasi undangan (Frame 1/300)...",
                            success: "Video Undangan berhasil dirender dan diunduh!",
                            error: "Gagal merender video.",
                          }
                        );
                      }}
                      className="w-full bg-gold hover:bg-gold/90 text-primary-foreground text-xs rounded-full h-9 font-semibold flex items-center justify-center gap-1.5 mt-2 cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4" /> Render & Unduh Video
                    </Button>
                  </div>

                  {/* Video Mock Preview */}
                  <div className="md:col-span-3 space-y-3 flex flex-col">
                    <h3 className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px] text-xs">Pratinjau Animasi Video</h3>
                    <div className="flex-1 rounded-xl border border-border bg-stone-950 p-4 aspect-[9/16] max-w-[200px] mx-auto flex flex-col justify-between text-white relative shadow-lg overflow-hidden text-center select-none min-h-[300px]">
                      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-amber-950/20 to-stone-950 opacity-90" />
                      <div className="relative space-y-1 mt-4">
                        <div className="text-[6px] tracking-widest text-gold font-bold">WALIMATUL 'URS</div>
                        <div className="font-display font-black text-xs capitalize text-white">
                          {weddingData.groom.nickname} & {weddingData.bride.nickname}
                        </div>
                      </div>
                      
                      <div className="relative my-auto flex flex-col items-center justify-center">
                        <div className="text-2xl animate-bounce">💍</div>
                        <div className="text-[6px] text-gold font-bold uppercase tracking-widest mt-2">SAVE THE DATE</div>
                        <div className="text-[8px] font-semibold text-white/90 mt-1">SABTU, 30 MEI 2026</div>
                      </div>

                      <div className="relative text-[5px] text-white/60 mb-2">
                        sakinahweb.id/{weddingData.subdomain}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------- 22. TABS PELENGKAP LAINNYA -------------------- */}
        {tab === "Pemberitahuan" && (
          <div className="rounded-2xl border border-border bg-card p-8 max-w-xl text-center mx-auto my-6 space-y-4 text-xs">
            <Bell className="h-10 w-10 text-gold mx-auto animate-bounce" />
            <h3 className="font-display font-semibold text-base">Kotak Pemberitahuan</h3>
            <p className="text-muted-foreground">Saat ini Anda tidak memiliki pemberitahuan baru.</p>
          </div>
        )}

        {tab === "Pengaturan Akun" && (
          <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-gold" /> Informasi & Detail Akun Anda
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Nama Lengkap Anda</Label>
                <Input value={weddingData.groom.fullName} readOnly className="text-xs bg-muted/30" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Alamat Email Terdaftar</Label>
                <Input value={`${weddingData.groom.nickname}@mail.com`} readOnly className="text-xs bg-muted/30" />
              </div>
            </div>
            <Button className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold px-6">
              Ubah Email Akun
            </Button>
          </div>
        )}

        {tab === "Photo Profile" && (
          <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl text-center space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">Foto Profil Akun</h2>
            <div className="h-24 w-24 rounded-full bg-gold-soft mx-auto flex items-center justify-center font-display text-xl font-bold text-gold">
              {weddingData.groom.nickname.charAt(0).toUpperCase()}
            </div>
            <Button variant="outline" size="sm" className="rounded-full text-xs">
              Ubah Foto Akun
            </Button>
          </div>
        )}

        {tab === "Kata Sandi" && (
          <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <Key className="h-5 w-5 text-gold" /> Perbarui Kata Sandi Anda
            </h2>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Kata Sandi Lama</Label>
                <Input type="password" placeholder="••••••••" className="text-xs" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Kata Sandi Baru</Label>
                  <Input type="password" placeholder="••••••••" className="text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Konfirmasi Sandi Baru</Label>
                  <Input type="password" placeholder="••••••••" className="text-xs" />
                </div>
              </div>
            </div>
            <Button className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold px-6 mt-2">
              Perbarui Kata Sandi
            </Button>
          </div>
        )}

        {tab === "Histori Transaksi" && (
          <div className="rounded-2xl border border-border bg-card p-6 max-w-4xl space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gold" /> Riwayat Pembayaran & Transaksi
            </h2>
            <div className="border border-border rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border font-semibold">
                    <th className="p-3">ID Invoice</th>
                    <th className="p-3">Paket Keanggotaan</th>
                    <th className="p-3">Harga</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Tanggal Pembayaran</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-muted/20">
                    <td className="p-3 font-mono text-gold font-semibold">SKN-20260528-09</td>
                    <td className="p-3 font-semibold">Mawaddah (Premium)</td>
                    <td className="p-3">{formatRupiah(89000)}</td>
                    <td className="p-3">
                      <Badge className="bg-emerald-500 text-white text-[9px]">LUNAS</Badge>
                    </td>
                    <td className="p-3 text-muted-foreground">28 Mei 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* MODAL SIMULASI PAYMENT GATEWAY (MIDTRANS & QRIS) */}
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-background border border-border rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-in flex flex-col text-xs text-foreground">
              
              {/* Header Modal */}
              <div className="bg-gradient-to-r from-gold-soft via-cream to-gold-soft p-5 border-b border-gold/20 flex justify-between items-center text-foreground">
                <div>
                  <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-1.5">
                    <CreditCard className="h-4.5 w-4.5 text-gold" /> Gerbang Pembayaran SakinahWeb
                  </h3>
                  <p className="text-[9px] text-muted-foreground mt-0.5">Integrasi API Midtrans & QRIS Instan</p>
                </div>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="h-7 w-7 rounded-full bg-background/80 hover:bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Body Modal */}
              <div className="p-6 space-y-5 flex-1">
                
                {paymentSuccess ? (
                  /* Success screen */
                  <div className="text-center py-6 space-y-4 animate-scale-in">
                    <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                      ✓
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-base text-foreground">Pembayaran Berhasil!</h4>
                      <p className="text-[10px] text-muted-foreground max-w-xs mx-auto leading-relaxed">
                        Terima kasih, sistem kami telah memverifikasi pembayaran Anda secara otomatis. Paket <b>{pendingPkg}</b> Anda sekarang telah aktif!
                      </p>
                    </div>
                    <Button 
                      onClick={() => setShowPaymentModal(false)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 h-8 text-xs font-semibold cursor-pointer w-full mt-2"
                    >
                      Buka Fitur Premium
                    </Button>
                  </div>
                ) : (
                  /* Payment Form */
                  <div className="space-y-4">
                    {/* Invoice detail */}
                    <div className="bg-muted/40 border border-border p-4 rounded-2xl flex justify-between items-center">
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Pembelian Paket</div>
                        <div className="font-bold text-foreground text-xs mt-0.5">Paket {pendingPkg} Lifetime</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Total Tagihan</div>
                        <div className="font-display font-black text-gold text-sm mt-0.5">
                          {pendingPkg === "Mawaddah" ? formatRupiah(89000) : formatRupiah(199000)}
                        </div>
                      </div>
                    </div>

                    {/* Payment methods tab */}
                    <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-muted border border-border text-center">
                      <button 
                        onClick={() => setPaymentMethod("QRIS")}
                        className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer
                          ${paymentMethod === "QRIS" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        QRIS (Gopay/OVO/QR)
                      </button>
                      <button 
                        onClick={() => setPaymentMethod("BCA")}
                        className={`py-1.5 text-[10px] font-bold rounded-lg transition cursor-pointer
                          ${paymentMethod === "BCA" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        Transfer Bank (BCA)
                      </button>
                    </div>

                    {/* Method Content */}
                    {paymentMethod === "QRIS" ? (
                      /* QRIS screen */
                      <div className="space-y-3 text-center py-2 animate-fade-in">
                        <div className="text-[9px] text-muted-foreground font-semibold">Pindai kode QRIS di bawah ini dengan aplikasi e-wallet Anda:</div>
                        
                        {/* Simulated QR Code card */}
                        <div className="bg-white p-3 rounded-2xl border border-border w-40 h-40 mx-auto flex flex-col justify-between items-center relative shadow-sm">
                          <div className="text-[8px] font-extrabold text-blue-900 tracking-wider">QRIS NASIONAL</div>
                          
                          {/* Mock QR grid */}
                          <div className="h-28 w-28 border border-stone-200 rounded-md bg-stone-100 flex flex-col items-center justify-center p-2 relative">
                            <span className="text-3xl">📱</span>
                            <span className="text-[6px] text-stone-500 font-bold uppercase mt-1">SAKINAH DIGITAL</span>
                          </div>

                          <div className="text-[7px] font-bold text-stone-500">PASTI AMAN & INSTAN</div>
                        </div>

                        <div className="flex items-center justify-center gap-1.5 text-[10px] text-amber-600 font-bold">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                          <span>Menunggu Pembayaran (Settle)...</span>
                        </div>
                      </div>
                    ) : (
                      /* BCA screen */
                      <div className="space-y-3 p-4 bg-muted/20 border border-border/60 rounded-2xl animate-fade-in text-xs">
                        <p className="text-[10px] text-muted-foreground">Silahkan transfer manual ke rekening bank resmi kami:</p>
                        <div className="space-y-2 border-t border-border/40 pt-2.5">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bank Tujuan:</span>
                            <span className="font-bold text-foreground">BCA (Bank Central Asia)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Nomor Rekening:</span>
                            <span className="font-mono font-bold text-gold flex items-center gap-1">
                              0928340129 
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-5 px-1.5 text-[8px] text-muted-foreground hover:text-foreground cursor-pointer"
                                onClick={() => {
                                  navigator.clipboard.writeText("0928340129");
                                  toast.success("Nomor rekening BCA disalin!");
                                }}
                              >
                                Salin
                              </Button>
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Atas Nama:</span>
                            <span className="font-semibold text-foreground">PT Sakinah Digital Indonesia</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="space-y-2">
                      <Button
                        disabled={isVerifyingPayment}
                        onClick={handleConfirmSimulatedPayment}
                        className="bg-gold hover:bg-gold/90 text-primary-foreground text-xs rounded-full w-full h-9 font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                      >
                        {isVerifyingPayment ? (
                          <>
                            <span className="h-3.5 w-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            Memverifikasi Pembayaran...
                          </>
                        ) : (
                          <>✓ Konfirmasi Pembayaran Selesai</>
                        )}
                      </Button>
                      <p className="text-[8px] text-muted-foreground text-center">
                        *Klik tombol di atas untuk menyimulasikan pembayaran lunas dari phone/ATM customer.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
