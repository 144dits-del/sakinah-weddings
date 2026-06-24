import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast, Toaster } from "sonner";
import { useState, useEffect } from "react";
import {
  transactions as defaultTransactions,
  users as defaultUsers,
  adminStats,
  formatRupiah,
  templates as defaultTemplates,
  setStoredPackage,
} from "@/lib/dummy-data";
import {
  Users,
  Globe,
  Clock,
  DollarSign,
  LogOut,
  Plus,
  Trash2,
  Check,
  X,
  CreditCard,
  Settings,
  Image as ImageIcon,
  ExternalLink,
  ShieldAlert,
  Sliders,
  Database,
  Search,
  Folder,
  File,
  FileCode,
  ChevronRight,
  ChevronDown,
  Edit,
  Copy,
  Eye,
  Code,
  Smartphone,
  Terminal,
  Heart,
  MapPin,
  Calendar,
  Gift,
  MessageCircle,
  Volume2,
} from "lucide-react";

// Register Route with TanStack Router query params
export const Route = createFileRoute("/admin")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tab: (search.tab as string) || "Dashboard",
    };
  },
  component: Admin,
});

const menu = [
  "Dashboard",
  "User",
  "Template",
  "Template Builder",
  "File Template",
  "Komponen Template",
  "Preview Template",
  "Transaksi",
  "Paket Harga",
  "Website Undangan",
  "Pembayaran",
  "Pengaturan",
];

const initialFileContents: Record<string, string> = {
  "templates/sakinah/index.json": `{
  "name": "sakinah",
  "version": "1.0.0",
  "description": "Template Sakinah Classic dengan ornamen floral elegan",
  "author": "SakinahWeb Team"
}`,
  "templates/sakinah/config.json": `{
  "templateName": "Sakinah",
  "category": "Basic",
  "isPremium": false,
  "layout": "mobile-wedding",
  "sections": ["cover", "couple", "event", "map", "story", "gallery", "wishes"]
}`,
  "templates/sakinah/preview.png": "[Binary Image Asset Preview]",
  "templates/sakinah/sections/CoverSection.tsx": `import React from 'react';
import { Heart } from 'lucide-react';

export default function CoverSection({ groom, bride, event }) {
  return (
    <div className="min-h-[400px] flex flex-col justify-center items-center bg-cream/30 text-stone-800 p-6 relative text-center">
      <div className="absolute top-12 text-[#8c7853] text-2xl animate-pulse">🕊️</div>
      <div className="text-[10px] tracking-[0.4em] uppercase text-[#8c7853] mb-4">THE WEDDING OF</div>
      <h1 className="font-display text-4xl font-black">{{groom.nickName}} & {{bride.nickName}}</h1>
      <p className="mt-8 text-xs text-muted-foreground">Akan melangsungkan pernikahan pada:</p>
      <div className="mt-2 text-sm font-bold">{{event.akad.date}}</div>
    </div>
  );
}`,
  "templates/sakinah/sections/CoupleSection.tsx": `import React from 'react';

export default function CoupleSection({ groom, bride }) {
  return (
    <div className="p-6 text-center space-y-6 bg-white">
      <h2 className="font-display text-2xl text-[#8c7853]">Kedua Mempelai</h2>
      <div className="p-4 border rounded-2xl bg-[#f8f5f0]/40 shadow-sm">
        <h3 className="font-bold text-lg">{{groom.fullName}}</h3>
        <p className="text-xs text-muted-foreground">Putra dari {{groom.fatherName}} & {{groom.motherName}}</p>
      </div>
      <div className="text-xl text-[#8c7853] italic">&</div>
      <div className="p-4 border rounded-2xl bg-[#f8f5f0]/40 shadow-sm">
        <h3 className="font-bold text-lg">{{bride.fullName}}</h3>
        <p className="text-xs text-muted-foreground">Putri dari {{bride.fatherName}} & {{bride.motherName}}</p>
      </div>
    </div>
  );
}`,
  "templates/sakinah/sections/EventSection.tsx": `import React from 'react';

export default function EventSection({ event }) {
  return (
    <div className="p-6 text-center space-y-6 bg-[#fdfbf7]">
      <h2 className="font-display text-2xl text-[#8c7853]">Informasi Acara</h2>
      <div className="p-4 border rounded-2xl bg-white shadow-sm">
        <h3 className="font-bold">Akad Nikah</h3>
        <p className="text-xs">{{event.akad.date}}</p>
        <p className="text-xs">{{event.akad.time}}</p>
        <p className="text-xs text-muted-foreground">{{event.akad.location}}</p>
      </div>
      <div className="p-4 border rounded-2xl bg-white shadow-sm">
        <h3 className="font-bold">Resepsi</h3>
        <p className="text-xs">{{event.resepsi.date}}</p>
        <p className="text-xs">{{event.resepsi.time}}</p>
        <p className="text-xs text-muted-foreground">{{event.resepsi.location}}</p>
      </div>
    </div>
  );
}`,
  "templates/sakinah/sections/MapSection.tsx": `import React from 'react';
import { MapPin } from 'lucide-react';

export default function MapSection({ event }) {
  return (
    <div className="p-6 text-center space-y-4 bg-white">
      <h2 className="font-display text-2xl text-[#8c7853]">Lokasi Acara</h2>
      <div className="h-40 rounded-xl bg-muted flex flex-col items-center justify-center p-4">
        <MapPin className="h-8 w-8 text-[#8c7853]" />
        <span className="text-xs font-semibold mt-2">{{event.akad.location}}</span>
      </div>
    </div>
  );
}`,
  "templates/sakinah/sections/StorySection.tsx": `import React from 'react';

export default function StorySection({ story }) {
  return (
    <div className="p-6 space-y-4 bg-[#fdfbf7]">
      <h2 className="font-display text-2xl text-[#8c7853] text-center">Cerita Cinta</h2>
      <div className="space-y-4 text-left">
        <div className="border-l-2 border-[#8c7853] pl-4 py-1">
          <h4 className="font-semibold text-sm">Pertama Kali Berjumpa</h4>
          <p className="text-[10px] text-muted-foreground">16 Oktober 2014</p>
          <p className="text-xs mt-1 text-stone-600">Pertama kali berjumpa di kampus.</p>
        </div>
      </div>
    </div>
  );
}`,
  "templates/sakinah/sections/GallerySection.tsx": `import React from 'react';

export default function GallerySection({ gallery }) {
  return (
    <div className="p-6 space-y-4 bg-white">
      <h2 className="font-display text-2xl text-[#8c7853] text-center">Galeri Kebahagiaan</h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center text-xs">
          Foto 1
        </div>
        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center text-xs">
          Foto 2
        </div>
      </div>
    </div>
  );
}`,
  "templates/sakinah/sections/WishesSection.tsx": `import React from 'react';

export default function WishesSection({ wishes }) {
  return (
    <div className="p-6 space-y-4 bg-[#fdfbf7]">
      <h2 className="font-display text-2xl text-[#8c7853] text-center">Doa & Ucapan</h2>
      <div className="space-y-2 text-left">
        <div className="p-3 bg-white rounded-xl border border-border/60 text-xs">
          <div className="font-bold">Budi & Ani</div>
          <p className="text-muted-foreground mt-1">"Selamat menempuh hidup baru!"</p>
        </div>
      </div>
    </div>
  );
}`,
  "templates/sakinah/sections/GiftSection.tsx": `import React from 'react';

export default function GiftSection({ gift }) {
  return (
    <div className="p-6 text-center space-y-4 bg-white">
      <h2 className="font-display text-2xl text-[#8c7853]">Kirim Kado</h2>
      <div className="p-4 border rounded-xl bg-[#f8f5f0]/40 text-xs">
        <div className="font-bold text-[#8c7853]">Bank Syariah Indonesia</div>
        <div>No. Rekening: 12345678910</div>
        <div>a.n. Adi & Rara</div>
      </div>
    </div>
  );
}`,
  "templates/sakinah/styles/theme.css": `/* Sakinah Classic Theme CSS Rules */
:root {
  --primary-color: #8c7853;
  --primary-hover: #726241;
  --accent-color: #eedfc2;
  --background-color: #f8f5f0;
  --text-color: #292524;
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: var(--font-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  color: var(--primary-color);
}`,
  "templates/sakinah/assets/background.jpg": "[Binary Image Background Asset]",
  "templates/sakinah/assets/flower.png": "[Binary Image Flower PNG Asset]",
  "templates/sakinah/assets/music.mp3": "[Audio Background Music MP3]"
};

const initialComponents = [
  { id: "c1", name: "Cover Section", tag: "cover", file: "CoverSection.tsx", status: "Aktif" },
  { id: "c2", name: "Mempelai Section", tag: "couple", file: "CoupleSection.tsx", status: "Aktif" },
  { id: "c3", name: "Acara Section", tag: "event", file: "EventSection.tsx", status: "Aktif" },
  { id: "c4", name: "Map Section", tag: "map", file: "MapSection.tsx", status: "Aktif" },
  { id: "c5", name: "Cerita Cinta Section", tag: "story", file: "StorySection.tsx", status: "Aktif" },
  { id: "c6", name: "Galeri Section", tag: "gallery", file: "GallerySection.tsx", status: "Aktif" },
  { id: "c7", name: "Doa Ucapan Section", tag: "wishes", file: "WishesSection.tsx", status: "Aktif" },
  { id: "c8", name: "Kado Nikah Section", tag: "gift", file: "GiftSection.tsx", status: "Aktif" },
];

function Admin() {
  const { tab } = Route.useSearch();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  
  // Admin Login Portal States
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isSubmittingAdmin, setIsSubmittingAdmin] = useState(false);

  const [usersList, setUsersList] = useState<any[]>([]);
  const [transactionsList, setTransactionsList] = useState<any[]>([]);
  const [templatesList, setTemplatesList] = useState<any[]>([]);
  const [websitesList, setWebsitesList] = useState<any[]>([]);

  // Search filter states
  const [userQuery, setUserQuery] = useState("");
  const [txQuery, setTxQuery] = useState("");
  const [webQuery, setWebQuery] = useState("");

  // Add Template Form State
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateType, setNewTemplateType] = useState("premium");
  const [newTemplateIcon, setNewTemplateIcon] = useState("✨");

  // ================= ADMIN TEMPLATE BUILDER STATES =================
  const [selectedFile, setSelectedFile] = useState("templates/sakinah/config.json");
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [editorContent, setEditorContent] = useState("");
  
  // Folder tree expansion states
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "templates": true,
    "templates/sakinah": true,
    "templates/sakinah/sections": true,
    "templates/sakinah/styles": true,
    "templates/sakinah/assets": false
  });

  // Settings Panel States (Form Kanan)
  const [tmplName, setTmplName] = useState("Sakinah");
  const [tmplCategory, setTmplCategory] = useState("Basic");
  const [tmplStatus, setTmplStatus] = useState("Aktif");
  const [tmplMinPackage, setTmplMinPackage] = useState("Sakinah");
  const [tmplPrimaryColor, setTmplPrimaryColor] = useState("#8c7853");
  const [tmplAccentColor, setTmplAccentColor] = useState("#eedfc2");
  const [tmplFontHeading, setTmplFontHeading] = useState("Outfit");
  const [tmplFontBody, setTmplFontBody] = useState("Inter");
  const [tmplThumbnail, setTmplThumbnail] = useState("🦢");

  // Komponen list states
  const [componentsList, setComponentsList] = useState<any[]>([]);

  // Selected Template for Previewing
  const [previewTemplateId, setPreviewTemplateId] = useState("t1");
  const [mobilePreviewTab, setMobilePreviewTab] = useState("Home");
  const [previewModePhone, setPreviewModePhone] = useState(true);

  // Load central state from localStorage or fallback
  useEffect(() => {
    // Keamanan: Cek apakah user adalah admin
    const role = localStorage.getItem("sakinah_user_role");
    if (role !== "admin") {
      setIsAuthorized(false);
      return;
    }
    setIsAuthorized(true);

    const storedUsers = localStorage.getItem("sakinah_admin_users");
    const storedTxs = localStorage.getItem("sakinah_admin_txs");
    const storedTmpls = localStorage.getItem("sakinah_admin_tmpls");
    const storedWebs = localStorage.getItem("sakinah_admin_webs");

    // Load templates builder states
    const storedFiles = localStorage.getItem("sakinah_admin_files");
    const storedComps = localStorage.getItem("sakinah_admin_comps");
    const storedSettings = localStorage.getItem("sakinah_admin_builder_settings");

    setUsersList(storedUsers ? JSON.parse(storedUsers) : defaultUsers);
    setTransactionsList(storedTxs ? JSON.parse(storedTxs) : defaultTransactions);
    setTemplatesList(storedTmpls ? JSON.parse(storedTmpls) : defaultTemplates);
    setWebsitesList(storedWebs ? JSON.parse(storedWebs) : [
      { sub: "di-ra", groom: "bibi", bride: "rarw", pkg: "Mawaddah", status: "Aktif", date: "30 Mei 2026" },
      { sub: "andisari", groom: "Andi", bride: "Sari", pkg: "Warahmah", status: "Aktif", date: "28 Mei 2026" },
      { sub: "budidewi", groom: "Budi", bride: "Dewi", pkg: "Sakinah", status: "Expired", date: "20 Mei 2026" },
    ]);

    const loadedFiles = storedFiles ? JSON.parse(storedFiles) : initialFileContents;
    setFileContents(loadedFiles);
    setEditorContent(loadedFiles["templates/sakinah/config.json"] || "");
    setComponentsList(storedComps ? JSON.parse(storedComps) : initialComponents);

    if (storedSettings) {
      try {
        const s = JSON.parse(storedSettings);
        setTmplName(s.name || "Sakinah");
        setTmplCategory(s.category || "Basic");
        setTmplStatus(s.status || "Aktif");
        setTmplMinPackage(s.minPackage || "Sakinah");
        setTmplPrimaryColor(s.primaryColor || "#8c7853");
        setTmplAccentColor(s.accentColor || "#eedfc2");
        setTmplFontHeading(s.fontHeading || "Outfit");
        setTmplFontBody(s.fontBody || "Inter");
        setTmplThumbnail(s.thumbnail || "🦢");
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sakinah_user_email");
    localStorage.removeItem("sakinah_user_role");
    toast.success("Berhasil keluar.");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  // ================= ADMIN TEMPLATE BUILDER METHODS =================
  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }));
  };

  const handleFileClick = (path: string) => {
    setSelectedFile(path);
    setEditorContent(fileContents[path] || "");
    toast.info(`Membuka file: ${path.split("/").pop()}`);
  };

  const handleSaveFileContent = () => {
    const nextContents = { ...fileContents, [selectedFile]: editorContent };
    setFileContents(nextContents);
    localStorage.setItem("sakinah_admin_files", JSON.stringify(nextContents));
    toast.success("File source code berhasil disimpan ke local storage!");
  };

  const handleSaveBuilderSettings = () => {
    const settings = {
      name: tmplName,
      category: tmplCategory,
      status: tmplStatus,
      minPackage: tmplMinPackage,
      primaryColor: tmplPrimaryColor,
      accentColor: tmplAccentColor,
      fontHeading: tmplFontHeading,
      fontBody: tmplFontBody,
      thumbnail: tmplThumbnail
    };
    localStorage.setItem("sakinah_admin_builder_settings", JSON.stringify(settings));

    // Also update in templatesList if it matches tmplName
    const updatedTemplatesList = templatesList.map(t => {
      if (t.name.toLowerCase() === tmplName.toLowerCase() || t.id === "t1") {
        return {
          ...t,
          name: tmplName,
          type: (tmplMinPackage === "Sakinah" ? "gratis" : "premium") as "gratis" | "premium",
          thumbnail: tmplThumbnail
        };
      }
      return t;
    });
    handleSaveTemplates(updatedTemplatesList);
    toast.success("Template settings berhasil disimpan dan disinkronkan!");
  };

  const handlePublishBuilderTemplate = () => {
    handleSaveBuilderSettings();
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: "Mempublikasikan template ke marketplace...",
      success: "Template berhasil dipublikasikan & aktif di website user! 🚀",
      error: "Gagal mempublikasikan template."
    });
  };

  // Component Actions
  const handleEditComponent = (tag: string) => {
    const matchedFile = `templates/sakinah/sections/${tag.charAt(0).toUpperCase() + tag.slice(1)}Section.tsx`;
    if (fileContents[matchedFile]) {
      setSelectedFile(matchedFile);
      setEditorContent(fileContents[matchedFile]);
      // Switch tab to Template Builder using route navigation
      window.location.search = "?tab=Template+Builder";
      toast.success(`Mengedit komponen: ${tag}Section.tsx`);
    } else {
      // Fallback
      const firstSectionFile = Object.keys(fileContents).find(k => k.includes(`sections/${tag.charAt(0).toUpperCase()}`));
      if (firstSectionFile) {
        setSelectedFile(firstSectionFile);
        setEditorContent(fileContents[firstSectionFile]);
        window.location.search = "?tab=Template+Builder";
      } else {
        toast.error(`File komponen ${tag}Section tidak ditemukan.`);
      }
    }
  };

  const handlePreviewComponent = (tag: string) => {
    setMobilePreviewTab(tag === "cover" ? "Home" : tag === "couple" ? "Mempelai" : tag === "event" ? "Undangan" : tag === "map" ? "Map" : tag === "story" ? "Cerita" : tag === "gallery" ? "Photo" : tag === "wishes" ? "Ucapan" : "Home");
    window.location.search = "?tab=Preview+Template";
    toast.info(`Membuka preview untuk section: ${tag}`);
  };

  const handleDuplicateComponent = (id: string) => {
    const comp = componentsList.find(c => c.id === id);
    if (!comp) return;
    const newComp = {
      ...comp,
      id: "c" + (componentsList.length + 1),
      name: `${comp.name} (Copy)`,
      tag: `${comp.tag}_copy`,
      file: `${comp.file.replace(".tsx", "")}Copy.tsx`
    };
    const nextComps = [...componentsList, newComp];
    setComponentsList(nextComps);
    localStorage.setItem("sakinah_admin_comps", JSON.stringify(nextComps));
    
    // Also duplicate in fileContents
    const originPath = `templates/sakinah/sections/${comp.file}`;
    const targetPath = `templates/sakinah/sections/${newComp.file}`;
    const nextContents = {
      ...fileContents,
      [targetPath]: fileContents[originPath] ? fileContents[originPath].replace(comp.file.replace(".tsx", ""), newComp.file.replace(".tsx", "")) : `// Duplicated component code`
    };
    setFileContents(nextContents);
    localStorage.setItem("sakinah_admin_files", JSON.stringify(nextContents));

    toast.success(`Berhasil menduplikasi komponen: ${comp.name}`);
  };

  // Template List Admin Actions
  const handleDuplicateTemplate = (id: string) => {
    const tmpl = templatesList.find(t => t.id === id);
    if (!tmpl) return;
    const newTmpl = {
      ...tmpl,
      id: "t" + (templatesList.length + 1),
      name: `${tmpl.name} (Copy)`,
      popular: false
    };
    const nextTmpls = [...templatesList, newTmpl];
    handleSaveTemplates(nextTmpls);
    toast.success(`Berhasil menduplikasi template: ${tmpl.name}`);
  };
  // =================================================================

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAdmin(true);
    
    setTimeout(() => {
      if (adminEmail.trim() === "dits144@gmail.com") {
        localStorage.setItem("sakinah_user_email", adminEmail.trim());
        localStorage.setItem("sakinah_user_role", "admin");
        setIsAuthorized(true);
        toast.success("Autentikasi Admin Berhasil! Selamat datang kembali.");
        
        // Trigger loading stored states in-place
        const storedUsers = localStorage.getItem("sakinah_admin_users");
        const storedTxs = localStorage.getItem("sakinah_admin_txs");
        const storedTmpls = localStorage.getItem("sakinah_admin_tmpls");
        const storedWebs = localStorage.getItem("sakinah_admin_webs");

        setUsersList(storedUsers ? JSON.parse(storedUsers) : defaultUsers);
        setTransactionsList(storedTxs ? JSON.parse(storedTxs) : defaultTransactions);
        setTemplatesList(storedTmpls ? JSON.parse(storedTmpls) : defaultTemplates);
        setWebsitesList(storedWebs ? JSON.parse(storedWebs) : [
          { sub: "di-ra", groom: "bibi", bride: "rarw", pkg: "Mawaddah", status: "Aktif", date: "30 Mei 2026" },
          { sub: "andisari", groom: "Andi", bride: "Sari", pkg: "Warahmah", status: "Aktif", date: "28 Mei 2026" },
          { sub: "budidewi", groom: "Budi", bride: "Dewi", pkg: "Sakinah", status: "Expired", date: "20 Mei 2026" },
        ]);
      } else {
        toast.error("Akses Ditolak! Kredensial administrator tidak valid.");
      }
      setIsSubmittingAdmin(false);
    }, 800);
  };

  const handleSaveUsers = (next: any[]) => {
    setUsersList(next);
    localStorage.setItem("sakinah_admin_users", JSON.stringify(next));
  };

  const handleSaveTransactions = (next: any[]) => {
    setTransactionsList(next);
    localStorage.setItem("sakinah_admin_txs", JSON.stringify(next));
  };

  const handleSaveTemplates = (next: any[]) => {
    setTemplatesList(next);
    localStorage.setItem("sakinah_admin_tmpls", JSON.stringify(next));
  };

  const handleSaveWebsites = (next: any[]) => {
    setWebsitesList(next);
    localStorage.setItem("sakinah_admin_webs", JSON.stringify(next));
  };

  const handleToggleWebsiteStatus = (sub: string) => {
    const next = websitesList.map((w) => {
      if (w.sub === sub) {
        const nextStatus = w.status === "Aktif" ? "Expired" : "Aktif";
        return { ...w, status: nextStatus };
      }
      return w;
    });
    handleSaveWebsites(next);
    const updatedStatus = next.find(w => w.sub === sub)?.status;
    if (updatedStatus === "Aktif") {
      toast.success(`Website ${sub}.sakinahweb.id berhasil diaktifkan kembali! 🚀`);
    } else {
      toast.error(`Website ${sub}.sakinahweb.id dinonaktifkan (Expired).`);
    }
  };

  // Actions
  const handleApproveTransaction = (id: string) => {
    const tx = transactionsList.find((t) => t.id === id);
    if (!tx) return;

    // 1. Perbarui status transaksi menjadi sukses
    const nextTxs = transactionsList.map((t) =>
      t.id === id ? { ...t, status: "success" as const } : t
    );
    handleSaveTransactions(nextTxs);

    // 2. Cari user terkait di usersList dan upgrade paketnya otomatis
    const nextUsers = usersList.map((u) => {
      if (u.name.toLowerCase() === tx.user.toLowerCase()) {
        return { ...u, package: tx.package };
      }
      return u;
    });
    handleSaveUsers(nextUsers);

    // 3. Jika transaksi tersebut adalah untuk user aktif saat ini (adbi/bibi), kita upgrade paket aktif sistem secara otomatis!
    if (tx.user.toLowerCase() === "adbi" || tx.user.toLowerCase() === "bibi") {
      setStoredPackage(tx.package);
      // Dispatch event agar sidebar/dashboard ter-update seketika
      window.dispatchEvent(new Event("sakinah_package_changed"));
    }

    toast.success(`Pembayaran terverifikasi! Transaksi ${id} disetujui, akun ${tx.user} otomatis di-upgrade ke paket ${tx.package}! 🚀`);
  };

  const handleCancelTransaction = (id: string) => {
    const next = transactionsList.map((t) =>
      t.id === id ? { ...t, status: "failed" as const } : t
    );
    handleSaveTransactions(next);
    toast.error(`Transaksi ${id} dibatalkan.`);
  };

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplateName.trim()) {
      toast.error("Nama template wajib diisi!");
      return;
    }
    const newTmpl = {
      id: "t" + (templatesList.length + 1),
      name: newTemplateName,
      thumbnail: newTemplateIcon,
      type: newTemplateType as "gratis" | "premium",
      popular: false,
    };
    const next = [...templatesList, newTmpl];
    handleSaveTemplates(next);
    setNewTemplateName("");
    toast.success(`Berhasil menambahkan template: ${newTemplateName}!`);
  };

  const handleRemoveTemplate = (id: string) => {
    const next = templatesList.filter((t) => t.id !== id);
    handleSaveTemplates(next);
    toast.success("Template berhasil dihapus.");
  };

  const handleRemoveUser = (id: string, name: string) => {
    const next = usersList.filter((u) => u.id !== id);
    handleSaveUsers(next);
    toast.success(`User ${name} berhasil dihapus.`);
  };

  const handleUpgradeUser = (id: string) => {
    const next = usersList.map((u) =>
      u.id === id ? { ...u, package: u.package === "Sakinah" ? "Mawaddah" : "Warahmah" } : u
    );
    handleSaveUsers(next);
    toast.success("User keanggotaan berhasil ditingkatkan!");
  };

  const handleBackupDatabase = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: "Sedang mencadangkan database SakinahWeb...",
      success: "Database cadangan berhasil disimpan ke server aman! (Backup_Sakinah_2026.sql)",
      error: "Gagal mencadangkan database.",
    });
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
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Toaster position="top-right" richColors />
        <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold via-yellow-500 to-amber-600" />
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-2">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">SakinahWeb Admin Portal</h1>
            <p className="text-xs text-muted-foreground">Silakan masuk menggunakan akun Administrator Anda</p>
          </div>
          
          <form onSubmit={handleAdminLoginSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Email Administrator</Label>
              <Input
                type="email"
                placeholder="admin@sakinahweb.id"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="text-xs rounded-xl h-10 border-border bg-muted/20"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Kata Sandi / PIN</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
                className="text-xs rounded-xl h-10 border-border bg-muted/20"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubmittingAdmin}
              className="w-full bg-gold hover:bg-gold/90 text-primary-foreground font-semibold rounded-full h-10 mt-2 transition cursor-pointer"
            >
              {isSubmittingAdmin ? "Memverifikasi..." : "Autentikasi & Masuk"}
            </Button>
          </form>
          
          <div className="text-center pt-2">
            <button
              onClick={() => window.location.href = "/"}
              className="text-[10px] text-muted-foreground hover:text-foreground hover:underline transition bg-transparent border-0 cursor-pointer"
            >
              ← Kembali ke Landing Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { i: Users, l: "Total User", v: adminStats.totalUsers.toLocaleString("id-ID") },
    { i: Globe, l: "Website Aktif", v: adminStats.activeWebsites.toLocaleString("id-ID") },
    { i: Clock, l: "Transaksi Pending", v: adminStats.pendingTransactions },
    { i: DollarSign, l: "Total Pendapatan", v: formatRupiah(adminStats.totalRevenue) },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Toaster position="top-right" richColors />

      {/* ADMIN SIDEBAR */}
      <aside className="hidden md:flex w-60 shrink-0 border-r border-border bg-sidebar flex-col h-screen sticky top-0">
        <Link to="/" className="flex items-center gap-2 p-5 border-b border-border">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-background font-display text-sm font-semibold">
            A
          </span>
          <div>
            <div className="font-display text-base font-bold">Admin</div>
            <div className="text-[10px] text-muted-foreground">SakinahWeb Control</div>
          </div>
        </Link>
        <nav className="flex-1 p-3 space-y-0.5 text-xs">
          {menu.map((m) => (
            <Link
              to="/admin"
              search={{ tab: m }}
              key={m}
              className={`w-full text-left block px-3 py-2 rounded-lg transition
                ${m === tab ? "bg-sidebar-accent font-semibold text-foreground" : "text-muted-foreground hover:bg-sidebar-accent"}`}
            >
              {m}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 mt-2 font-medium text-left cursor-pointer border-0 bg-transparent"
          >
            <LogOut className="h-4 w-4" /> Keluar
          </button>
        </nav>
      </aside>

      {/* ADMIN MAIN CONTENT */}
      <main className="flex-1 p-5 md:p-8 max-w-full overflow-x-hidden">
        
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold flex items-center gap-2">
            Admin Panel — {tab}
          </h1>
          <p className="text-muted-foreground text-xs mt-1">
            {tab === "Dashboard"
              ? "Ringkasan operasional dan statistik SakinahWeb."
              : `Kelola menu ${tab.toLowerCase()} sistem dari sini.`}
          </p>
        </div>

        {/* -------------------- 1. TAB: DASHBOARD -------------------- */}
        {tab === "Dashboard" && (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.l} className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft mb-3 text-gold">
                    <s.i className="h-5 w-5" />
                  </div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                  <div className="font-display text-2xl font-bold mt-1 text-foreground">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Transaksi Terbaru */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="font-display text-base font-bold mb-4 flex items-center justify-between">
                  <span>Transaksi Terbaru</span>
                  <Link to="/admin" search={{ tab: "Transaksi" }} className="text-[10px] text-gold hover:underline">
                    Selengkapnya →
                  </Link>
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="text-muted-foreground border-b border-border font-semibold pb-2">
                        <th className="pb-2">ID</th>
                        <th>User</th>
                        <th>Paket</th>
                        <th>Status</th>
                        <th className="text-right">Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionsList.slice(0, 4).map((t) => (
                        <tr key={t.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                          <td className="py-2.5 font-mono text-[10px] text-gold font-bold">{t.id}</td>
                          <td>{t.user}</td>
                          <td>{t.package}</td>
                          <td>
                            <Badge
                              variant={
                                t.status === "success"
                                  ? "default"
                                  : t.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={t.status === "success" ? "bg-gold text-primary-foreground text-[8px]" : "text-[8px]"}
                            >
                              {t.status}
                            </Badge>
                          </td>
                          <td className="text-right font-semibold">{formatRupiah(t.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* User Terbaru */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="font-display text-base font-bold mb-4 flex items-center justify-between">
                  <span>User Terbaru</span>
                  <Link to="/admin" search={{ tab: "User" }} className="text-[10px] text-gold hover:underline">
                    Selengkapnya →
                  </Link>
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="text-muted-foreground border-b border-border font-semibold pb-2">
                        <th className="pb-2">Nama</th>
                        <th>Email</th>
                        <th>Paket</th>
                        <th>Bergabung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.slice(0, 4).map((u) => (
                        <tr key={u.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                          <td className="py-2.5 font-medium">{u.name}</td>
                          <td className="text-muted-foreground text-[10px]">{u.email}</td>
                          <td>
                            <Badge variant="outline" className="text-[9px]">
                              {u.package}
                            </Badge>
                          </td>
                          <td className="text-muted-foreground">{u.joined}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- 2. TAB: USER -------------------- */}
        {tab === "User" && (
          <div className="space-y-6">
            {/* Filter Search */}
            <div className="flex items-center gap-2 max-w-sm rounded-xl border border-border bg-card px-3 py-2 text-xs">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari pengguna berdasarkan nama/email..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="border-none bg-transparent h-6 focus-visible:ring-0 p-0 text-xs"
              />
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-muted/80 border-b border-border font-semibold text-muted-foreground">
                    <th className="p-3">ID</th>
                    <th className="p-3">Nama</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Paket</th>
                    <th className="p-3">Bergabung</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList
                    .filter(
                      (u) =>
                        u.name.toLowerCase().includes(userQuery.toLowerCase()) ||
                        u.email.toLowerCase().includes(userQuery.toLowerCase())
                    )
                    .map((u) => (
                      <tr key={u.id} className="border-b border-border/40 last:border-0 hover:bg-muted/25">
                        <td className="p-3 font-mono text-muted-foreground">{u.id}</td>
                        <td className="p-3 font-medium text-foreground">{u.name}</td>
                        <td className="p-3 font-mono text-[10px] text-muted-foreground">{u.email}</td>
                        <td className="p-3">
                          <Badge variant="secondary" className="text-[9px]">
                            {u.package}
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground">{u.joined}</td>
                        <td className="p-3 text-right flex justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpgradeUser(u.id)}
                            className="text-[9px] h-7 rounded-full px-3"
                          >
                            Naikkan Paket
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveUser(u.id, u.name)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1 rounded-full h-7 w-7 flex items-center justify-center"
                          >
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

        {/* -------------------- 3B. TAB: TEMPLATE BUILDER -------------------- */}
        {tab === "Template Builder" && (
          <div className="grid gap-6 lg:grid-cols-12 max-w-7xl">
            
            {/* 1. SIDEBAR FILE EXPLORER (Col Span: 3) */}
            <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-4 space-y-4">
              <h3 className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Folder className="h-4 w-4 text-gold" /> File Explorer
              </h3>
              
              <div className="space-y-1.5 text-xs select-none">
                
                {/* Folder templates */}
                <div>
                  <button onClick={() => toggleFolder("templates")} className="flex items-center gap-1.5 hover:text-gold transition font-medium w-full text-left">
                    {expandedFolders["templates"] ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                    <Folder className="h-3.5 w-3.5 text-gold fill-gold/20" />
                    <span>templates/</span>
                  </button>
                  
                  {expandedFolders["templates"] && (
                    <div className="pl-4 mt-1 space-y-1.5 border-l border-border/60 ml-1.5 pt-0.5">
                      
                      {/* Folder sakinah */}
                      <div>
                        <button onClick={() => toggleFolder("templates/sakinah")} className="flex items-center gap-1.5 hover:text-gold transition font-medium w-full text-left">
                          {expandedFolders["templates/sakinah"] ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                          <Folder className="h-3.5 w-3.5 text-gold fill-gold/20" />
                          <span>sakinah/</span>
                        </button>
                        
                        {expandedFolders["templates/sakinah"] && (
                          <div className="pl-4 mt-1 space-y-1.5 border-l border-border/60 ml-1.5 pt-0.5">
                            
                            {/* Folder sections */}
                            <div>
                              <button onClick={() => toggleFolder("templates/sakinah/sections")} className="flex items-center gap-1.5 hover:text-gold transition font-medium w-full text-left">
                                {expandedFolders["templates/sakinah/sections"] ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                                <Folder className="h-3.5 w-3.5 text-amber-500 fill-amber-500/10" />
                                <span>sections/</span>
                              </button>
                              
                              {expandedFolders["templates/sakinah/sections"] && (
                                <div className="pl-4 mt-1 space-y-1 border-l border-border/60 ml-1.5">
                                  {Object.keys(fileContents)
                                    .filter(p => p.startsWith("templates/sakinah/sections/"))
                                    .map(p => {
                                      const isSelected = selectedFile === p;
                                      const filename = p.split("/").pop();
                                      return (
                                        <button
                                          key={p}
                                          onClick={() => handleFileClick(p)}
                                          className={`flex items-center gap-1.5 w-full text-left hover:text-gold py-1 transition font-mono text-[10px]
                                            ${isSelected ? "text-gold font-bold bg-gold/5 px-1.5 rounded" : "text-muted-foreground"}`}
                                        >
                                          <FileCode className="h-3 w-3 text-cyan-600 shrink-0" />
                                          <span className="truncate">{filename}</span>
                                        </button>
                                      );
                                    })}
                                </div>
                              )}
                            </div>

                            {/* Folder styles */}
                            <div>
                              <button onClick={() => toggleFolder("templates/sakinah/styles")} className="flex items-center gap-1.5 hover:text-gold transition font-medium w-full text-left">
                                {expandedFolders["templates/sakinah/styles"] ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                                <Folder className="h-3.5 w-3.5 text-amber-500 fill-amber-500/10" />
                                <span>styles/</span>
                              </button>
                              
                              {expandedFolders["templates/sakinah/styles"] && (
                                <div className="pl-4 mt-1 space-y-1 border-l border-border/60 ml-1.5">
                                  <button
                                    onClick={() => handleFileClick("templates/sakinah/styles/theme.css")}
                                    className={`flex items-center gap-1.5 w-full text-left hover:text-gold py-1 transition font-mono text-[10px]
                                      ${selectedFile === "templates/sakinah/styles/theme.css" ? "text-gold font-bold bg-gold/5 px-1.5 rounded" : "text-muted-foreground"}`}
                                  >
                                    <File className="h-3 w-3 text-indigo-500 shrink-0" />
                                    <span>theme.css</span>
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Folder assets */}
                            <div>
                              <button onClick={() => toggleFolder("templates/sakinah/assets")} className="flex items-center gap-1.5 hover:text-gold transition font-medium w-full text-left">
                                {expandedFolders["templates/sakinah/assets"] ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                                <Folder className="h-3.5 w-3.5 text-amber-500 fill-amber-500/10" />
                                <span>assets/</span>
                              </button>
                              
                              {expandedFolders["templates/sakinah/assets"] && (
                                <div className="pl-4 mt-1 space-y-1 border-l border-border/60 ml-1.5">
                                  <div className="flex items-center gap-1.5 py-1 text-muted-foreground/60 font-mono text-[10px]">
                                    <ImageIcon className="h-3 w-3 text-teal-600 shrink-0" />
                                    <span>background.jpg</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 py-1 text-muted-foreground/60 font-mono text-[10px]">
                                    <ImageIcon className="h-3 w-3 text-teal-600 shrink-0" />
                                    <span>flower.png</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 py-1 text-muted-foreground/60 font-mono text-[10px]">
                                    <Volume2 className="h-3 w-3 text-purple-600 shrink-0" />
                                    <span>music.mp3</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Files index.json, config.json, preview.png */}
                            <button
                              onClick={() => handleFileClick("templates/sakinah/index.json")}
                              className={`flex items-center gap-1.5 w-full text-left hover:text-gold py-1 transition font-mono text-[10px]
                                ${selectedFile === "templates/sakinah/index.json" ? "text-gold font-bold bg-gold/5 px-1.5 rounded" : "text-muted-foreground"}`}
                            >
                              <FileCode className="h-3 w-3 text-yellow-600 shrink-0" />
                              <span>index.json</span>
                            </button>
                            
                            <button
                              onClick={() => handleFileClick("templates/sakinah/config.json")}
                              className={`flex items-center gap-1.5 w-full text-left hover:text-gold py-1 transition font-mono text-[10px]
                                ${selectedFile === "templates/sakinah/config.json" ? "text-gold font-bold bg-gold/5 px-1.5 rounded" : "text-muted-foreground"}`}
                            >
                              <FileCode className="h-3 w-3 text-yellow-600 shrink-0" />
                              <span>config.json</span>
                            </button>

                            <div className="flex items-center gap-1.5 py-1 text-muted-foreground/60 font-mono text-[10px]">
                              <ImageIcon className="h-3 w-3 text-teal-600 shrink-0" />
                              <span>preview.png</span>
                            </div>

                          </div>
                        )}
                      </div>

                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* 2. AREA EDITOR TENGAH (Col Span: 6) */}
            <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-5 space-y-4 flex flex-col justify-between min-h-[500px]">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div>
                    <h3 className="font-display font-semibold text-xs flex items-center gap-1.5">
                      <Code className="h-4 w-4 text-gold" /> Source Code Editor
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{selectedFile}</p>
                  </div>
                  <Button onClick={handleSaveFileContent} size="sm" className="bg-gold hover:bg-gold/90 text-primary-foreground text-[10px] h-7 rounded-full">
                    Simpan File
                  </Button>
                </div>

                {/* Editor Container */}
                <div className="flex font-mono text-[10px] overflow-auto border border-border/80 rounded-xl bg-zinc-950 text-zinc-100 h-[420px]">
                  
                  {/* Line numbers dummy */}
                  <div className="select-none text-zinc-600 text-right p-3 bg-zinc-900 border-r border-zinc-800 pr-2 min-w-10">
                    {editorContent.split("\n").map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>

                  {/* Textarea code */}
                  <textarea
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    className="flex-1 p-3 bg-transparent text-zinc-100 font-mono text-[10px] focus:outline-none resize-none h-full outline-none leading-relaxed"
                    spellCheck={false}
                  />

                </div>
              </div>

              <div className="p-3 bg-muted/30 border border-border/60 rounded-xl flex items-start gap-2.5">
                <Terminal className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <p className="text-[9px] text-muted-foreground leading-relaxed">
                  <strong>Penyuntingan Kode</strong>: Anda dapat mengubah properti JSON atau kode section React secara modular. Kode yang disunting akan disinkronkan langsung ke visual render pratinjau mobile.
                </p>
              </div>

            </div>

            {/* 3. PANEL KANAN TEMPLATE SETTINGS (Col Span: 3) */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Form Settings */}
              <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                <h3 className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="h-4 w-4 text-gold" /> Template Settings
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <Label className="text-[10px]">Nama Template</Label>
                    <Input value={tmplName} onChange={(e) => setTmplName(e.target.value)} className="text-xs h-8" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[10px]">Kategori</Label>
                      <select value={tmplCategory} onChange={(e) => setTmplCategory(e.target.value)} className="w-full text-[10px] px-2 py-1.5 rounded-md border border-input bg-background">
                        <option value="Basic">Basic</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px]">Status</Label>
                      <select value={tmplStatus} onChange={(e) => setTmplStatus(e.target.value)} className="w-full text-[10px] px-2 py-1.5 rounded-md border border-input bg-background">
                        <option value="Aktif">Aktif</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[10px]">Paket Minimal</Label>
                    <select value={tmplMinPackage} onChange={(e) => setTmplMinPackage(e.target.value)} className="w-full text-[10px] px-2 py-1.5 rounded-md border border-input bg-background">
                      <option value="Sakinah">Sakinah (Gratis)</option>
                      <option value="Mawaddah">Mawaddah (Premium)</option>
                      <option value="Warahmah">Warahmah (Eksklusif)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[10px]">Warna Utama</Label>
                      <div className="flex gap-1">
                        <input type="color" value={tmplPrimaryColor} onChange={(e) => setTmplPrimaryColor(e.target.value)} className="h-8 w-8 rounded border p-0 cursor-pointer shrink-0" />
                        <Input value={tmplPrimaryColor} onChange={(e) => setTmplPrimaryColor(e.target.value)} className="text-[9px] h-8 px-1" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px]">Warna Aksen</Label>
                      <div className="flex gap-1">
                        <input type="color" value={tmplAccentColor} onChange={(e) => setTmplAccentColor(e.target.value)} className="h-8 w-8 rounded border p-0 cursor-pointer shrink-0" />
                        <Input value={tmplAccentColor} onChange={(e) => setTmplAccentColor(e.target.value)} className="text-[9px] h-8 px-1" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[10px]">Font Heading</Label>
                      <select value={tmplFontHeading} onChange={(e) => setTmplFontHeading(e.target.value)} className="w-full text-[10px] px-2 py-1.5 rounded-md border border-input bg-background">
                        <option value="Outfit">Outfit</option>
                        <option value="Playfair Display">Playfair</option>
                        <option value="Cinzel">Cinzel</option>
                        <option value="Great Vibes">Great Vibes</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px]">Font Body</Label>
                      <select value={tmplFontBody} onChange={(e) => setTmplFontBody(e.target.value)} className="w-full text-[10px] px-2 py-1.5 rounded-md border border-input bg-background">
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Lora">Lora</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[10px]">Ikon / Thumbnail Preview</Label>
                    <Input value={tmplThumbnail} onChange={(e) => setTmplThumbnail(e.target.value)} className="text-xs h-8 text-center" />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleSaveBuilderSettings} size="sm" variant="outline" className="flex-1 text-[10px] rounded-full">
                      Simpan
                    </Button>
                    <Button onClick={handlePublishBuilderTemplate} size="sm" className="flex-1 bg-gold hover:bg-gold/90 text-primary-foreground text-[10px] rounded-full font-semibold">
                      Publish
                    </Button>
                  </div>

                </div>
              </div>

              {/* Data Binding variables */}
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <h3 className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="h-4 w-4 text-gold" /> Dynamic Data Binding
                </h3>
                <p className="text-[9px] text-muted-foreground leading-relaxed">
                  Gunakan tag variabel di bawah ini pada komponen/file HTML Anda agar terikat otomatis dengan data asli dashboard pengguna:
                </p>

                <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1.5 scrollbar-thin">
                  {[
                    { v: "{{groom.fullName}}", d: "Nama Lengkap Pria" },
                    { v: "{{groom.nickName}}", d: "Nama Panggilan Pria" },
                    { v: "{{groom.fatherName}}", d: "Nama Ayah Pria" },
                    { v: "{{groom.motherName}}", d: "Nama Ibu Pria" },
                    { v: "{{bride.fullName}}", d: "Nama Lengkap Wanita" },
                    { v: "{{bride.nickName}}", d: "Nama Panggilan Wanita" },
                    { v: "{{bride.fatherName}}", d: "Nama Ayah Wanita" },
                    { v: "{{bride.motherName}}", d: "Nama Ibu Wanita" },
                    { v: "{{event.akad.date}}", d: "Tanggal Akad" },
                    { v: "{{event.akad.time}}", d: "Jam Akad" },
                    { v: "{{event.akad.location}}", d: "Tempat Akad" },
                    { v: "{{event.resepsi.date}}", d: "Tanggal Resepsi" },
                    { v: "{{event.resepsi.time}}", d: "Jam Resepsi" },
                    { v: "{{event.resepsi.location}}", d: "Tempat Resepsi" },
                    { v: "{{gallery.photos}}", d: "Array File Gambar" },
                    { v: "{{story.items}}", d: "List Kisah Cinta" },
                    { v: "{{wishes.items}}", d: "List Doa RSVP" },
                    { v: "{{gift.accounts}}", d: "Daftar No. Rekening" },
                  ].map((x) => (
                    <div key={x.v} className="flex justify-between items-center text-[9px] border-b border-border/40 pb-1">
                      <code className="font-mono text-gold font-bold">{x.v}</code>
                      <span className="text-muted-foreground">{x.d}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-border text-[9px] text-amber-600 font-semibold leading-relaxed">
                  ⚠️ Reminder: Bila user menggunakan domain/tautan asli, subdomain unik otomatis dialokasikan (contoh: di-ra.sakinahweb.lovable.app) dan sistem akan memetakan data user ini secara dinamis.
                </div>

              </div>

            </div>

          </div>
        )}

        {/* -------------------- 3C. TAB: FILE TEMPLATE (LIST TEMPLATES) -------------------- */}
        {tab === "File Template" && (
          <div className="space-y-6">
            
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Daftar Template Undangan Pernikahan Sistem ({templatesList.length})
              </h3>
              <Button onClick={() => window.location.search = "?tab=Template"} className="bg-gold hover:bg-gold/90 text-primary-foreground text-xs rounded-full h-8 px-4 font-semibold">
                + Tambah Template
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-muted/80 border-b border-border font-semibold text-muted-foreground">
                    <th className="p-3">Ikon</th>
                    <th className="p-3">Nama Template</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Paket Minimal</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Tanggal Dibuat</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {templatesList.map((tmpl) => {
                    const isPremium = tmpl.type === "premium";
                    const minPkg = tmpl.id === "t1" || tmpl.id === "t3" || tmpl.id === "t6" || tmpl.id === "t8" ? "Sakinah" : tmpl.id === "t10" ? "Mawaddah" : "Warahmah";
                    return (
                      <tr key={tmpl.id} className="border-b border-border/40 last:border-0 hover:bg-muted/25">
                        <td className="p-3 text-xl">{tmpl.thumbnail}</td>
                        <td className="p-3 font-semibold text-foreground">{tmpl.name}</td>
                        <td className="p-3">
                          <Badge variant={isPremium ? "default" : "outline"} className="text-[9px]">
                            {isPremium ? "Premium" : "Basic"}
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground font-semibold">{minPkg}</td>
                        <td className="p-3">
                          <Badge className="bg-emerald-600 text-white text-[8px] uppercase tracking-wider">Aktif</Badge>
                        </td>
                        <td className="p-3 text-muted-foreground">24 Juni 2026</td>
                        <td className="p-3 text-right flex justify-end gap-1.5 items-center">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              setSelectedFile("templates/sakinah/config.json");
                              setTmplName(tmpl.name);
                              setTmplThumbnail(tmpl.thumbnail);
                              setTmplMinPackage(minPkg);
                              window.location.search = "?tab=Template+Builder";
                            }}
                            className="text-[9px] h-7 rounded-full px-3"
                          >
                            <Edit className="h-3 w-3 mr-1" /> Edit Builder
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setPreviewTemplateId(tmpl.id);
                              window.location.search = "?tab=Preview+Template";
                            }}
                            className="text-[9px] h-7 rounded-full px-3"
                          >
                            <Eye className="h-3 w-3 mr-1" /> Preview
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDuplicateTemplate(tmpl.id)}
                            className="text-muted-foreground hover:text-foreground h-7 w-7 p-0 flex items-center justify-center rounded-full"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveTemplate(tmpl.id)}
                            className="text-red-500 hover:text-red-600 h-7 w-7 p-0 flex items-center justify-center rounded-full"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* -------------------- 3D. TAB: KOMPONEN TEMPLATE -------------------- */}
        {tab === "Komponen Template" && (
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Daftar Komponen UI Modular Undangan Pernikahan
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl">
              {componentsList.map((c) => (
                <div key={c.id} className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden flex flex-col justify-between min-h-[160px] shadow-sm hover:shadow-md transition">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-gold/15 text-gold border-0 text-[8px] font-bold">{c.tag.toUpperCase()}</Badge>
                      <Badge variant="secondary" className="text-[8px] bg-emerald-600/10 text-emerald-600">{c.status}</Badge>
                    </div>
                    <h4 className="font-display font-bold text-sm text-foreground">{c.name}</h4>
                    <p className="text-[9px] text-muted-foreground font-mono flex items-center gap-1">
                      <FileCode className="h-3.5 w-3.5 text-cyan-600 shrink-0" /> {c.file}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex gap-1.5 justify-end pt-3 border-t border-border/40">
                    <Button size="sm" variant="outline" onClick={() => handleEditComponent(c.tag)} className="text-[9px] h-6 rounded-full px-2.5">
                      <Edit className="h-2.5 w-2.5 mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handlePreviewComponent(c.tag)} className="text-[9px] h-6 rounded-full px-2.5">
                      <Eye className="h-2.5 w-2.5 mr-1" /> Preview
                    </Button>
                    <button onClick={() => handleDuplicateComponent(c.id)} className="text-muted-foreground hover:text-foreground h-6 w-6 flex items-center justify-center rounded-full hover:bg-muted transition cursor-pointer border-0 bg-transparent">
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* -------------------- 3E. TAB: PREVIEW TEMPLATE -------------------- */}
        {tab === "Preview Template" && (
          <div className="grid gap-6 lg:grid-cols-12 max-w-6xl">
            
            {/* Control Sidebar (Col Span: 4) */}
            <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-5 space-y-4 h-fit">
              <h3 className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider">
                Preview Controls
              </h3>
              
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <Label className="text-[10px]">Pilih Template Undangan</Label>
                  <select
                    value={previewTemplateId}
                    onChange={(e) => setPreviewTemplateId(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-md border border-input bg-background"
                  >
                    {templatesList.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.thumbnail})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 pt-2">
                  <Label className="text-[10px] block">Detil Warna & Font Aktif</Label>
                  <div className="flex gap-1.5 items-center">
                    <span className="h-5 w-5 rounded-full border shrink-0" style={{ backgroundColor: tmplPrimaryColor }} />
                    <span className="h-5 w-5 rounded-full border shrink-0" style={{ backgroundColor: tmplAccentColor }} />
                    <span className="font-mono text-[9px] text-muted-foreground font-semibold px-2 py-0.5 rounded bg-muted">
                      {tmplFontHeading} / {tmplFontBody}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60 text-[9px] text-muted-foreground leading-relaxed space-y-2">
                  <p>
                    💡 **Wedding Theme Simulator**: Di samping kanan adalah visualisasi render pratinjau dari template yang dipilih. Tema ini didesain floral putih elegan.
                  </p>
                  <p className="text-amber-600 font-semibold">
                    🌐 Info Subdomain: Saat user mengakses link asli (contoh subdomain: `adi-rara.sakinahweb.lovable.app`), parser engine otomatis me-replace variabel data binding `{{variable}}` dengan data asli secara instan.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Simulator Frame (Col Span: 8) */}
            <div className="lg:col-span-8 flex justify-center items-center py-2 bg-muted/20 border border-border/80 rounded-3xl p-6">
              
              <div className="w-full max-w-sm aspect-[9/19] rounded-[2.5rem] overflow-hidden border-8 border-zinc-950 bg-background shadow-2xl relative flex flex-col justify-between h-[680px]">
                
                {/* Simulated Content Area (Floral Elegant White theme as requested) */}
                <div className="flex-1 overflow-y-auto scrollbar-none bg-[#fdfbf7] p-5 pb-16 text-center select-none text-stone-800 space-y-4">
                  
                  {/* Visual Header / Floral Graphic representation */}
                  <div className="w-full text-center text-xs text-[#8c7853] py-2 border-b border-[#8c7853]/15 font-serif italic">
                    🌸 Floral Elegance Theme 🌸
                  </div>

                  {mobilePreviewTab === "Home" && (
                    <div className="py-12 space-y-4 animate-fade-in">
                      <span className="text-3xl animate-bounce inline-block">🕊️</span>
                      <div className="text-[9px] tracking-[0.3em] uppercase text-[#8c7853] font-bold">THE WEDDING OF</div>
                      <h1 className="font-display text-4xl font-extrabold text-[#8c7853] font-serif">Adi & Rara</h1>
                      <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                        Dengan memohon rahmat & ridho Allah SWT, kami mengundang Anda untuk merayakan pernikahan kami.
                      </p>
                      <div className="pt-6 text-xs font-bold text-[#8c7853]">Senin, 31 Agustus 2026</div>
                    </div>
                  )}

                  {mobilePreviewTab === "Mempelai" && (
                    <div className="py-4 space-y-5 text-center animate-fade-in">
                      <h2 className="font-display text-xl text-[#8c7853] font-semibold">Kedua Mempelai</h2>
                      
                      <div className="p-4 border border-[#8c7853]/20 rounded-2xl bg-white/80 shadow-sm space-y-1">
                        <div className="mx-auto h-12 w-12 rounded-full bg-[#8c7853] text-white flex items-center justify-center font-bold text-sm">A</div>
                        <h3 className="font-bold text-sm mt-2 text-[#8c7853]">Adi Sumaryadi</h3>
                        <p className="text-[9px] text-muted-foreground">Putra dari Sumarmo & Kantun</p>
                      </div>

                      <div className="text-lg text-[#8c7853] italic">&</div>

                      <div className="p-4 border border-[#8c7853]/20 rounded-2xl bg-white/80 shadow-sm space-y-1">
                        <div className="mx-auto h-12 w-12 rounded-full bg-[#8c7853] text-white flex items-center justify-center font-bold text-sm">R</div>
                        <h3 className="font-bold text-sm mt-2 text-[#8c7853]">Siti Salamah Azzahra</h3>
                        <p className="text-[9px] text-muted-foreground">Putri dari Maman & Imas</p>
                      </div>
                    </div>
                  )}

                  {mobilePreviewTab === "Undangan" && (
                    <div className="py-4 space-y-4 animate-fade-in text-center">
                      <h2 className="font-display text-xl text-[#8c7853] font-semibold">Waktu & Tempat</h2>
                      
                      <div className="p-4 border border-[#8c7853]/20 rounded-2xl bg-white shadow-sm space-y-2">
                        <h3 className="font-bold text-xs text-[#8c7853] border-b pb-1">Akad Nikah</h3>
                        <p className="text-[10px] text-muted-foreground">Senin, 31 Agustus 2026</p>
                        <p className="text-[10px] text-muted-foreground">Pukul 12:00 WIB - Selesai</p>
                        <p className="text-[9px] font-medium text-stone-600 mt-1">Aula Masjid ABRI Cimahi</p>
                      </div>

                      <div className="p-4 border border-[#8c7853]/20 rounded-2xl bg-white shadow-sm space-y-2">
                        <h3 className="font-bold text-xs text-[#8c7853] border-b pb-1">Resepsi Pernikahan</h3>
                        <p className="text-[10px] text-muted-foreground">Senin, 31 Agustus 2026</p>
                        <p className="text-[10px] text-muted-foreground">Pukul 12:00 WIB - Selesai</p>
                        <p className="text-[9px] font-medium text-stone-600 mt-1">Aula Masjid ABRI Cimahi</p>
                      </div>
                    </div>
                  )}

                  {mobilePreviewTab === "Map" && (
                    <div className="py-6 space-y-4 animate-fade-in text-center">
                      <h2 className="font-display text-xl text-[#8c7853] font-semibold">Peta Lokasi</h2>
                      <div className="h-32 rounded-xl bg-muted border border-border/80 flex flex-col items-center justify-center p-3">
                        <MapPin className="h-6 w-6 text-[#8c7853] mb-1" />
                        <span className="text-[10px] font-bold">Aula Masjid ABRI Cimahi</span>
                        <span className="text-[8px] text-muted-foreground mt-0.5">Jalan Gatot Subroto Kota Cimahi</span>
                      </div>
                      <Button size="sm" className="bg-[#8c7853] hover:bg-[#726241] text-white text-[9px] h-7 rounded-full">
                        Buka Google Maps
                      </Button>
                    </div>
                  )}

                  {mobilePreviewTab === "Cerita" && (
                    <div className="py-4 space-y-4 animate-fade-in text-left px-2">
                      <h2 className="font-display text-xl text-[#8c7853] font-semibold text-center mb-2">Kisah Cinta</h2>
                      <div className="border-l border-[#8c7853]/40 pl-4 space-y-4 py-1">
                        <div>
                          <h4 className="font-bold text-xs text-[#8c7853]">Pertama Kali Berjumpa</h4>
                          <p className="text-[8px] text-muted-foreground">16 Oktober 2014</p>
                          <p className="text-[10px] text-stone-600 mt-0.5">Pertama kali berjumpa di kampus.</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#8c7853]">Prosesi Lamaran</h4>
                          <p className="text-[8px] text-muted-foreground">15 Maret 2015</p>
                          <p className="text-[10px] text-stone-600 mt-0.5">Pertemuan formal kedua keluarga besar.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {mobilePreviewTab === "Photo" && (
                    <div className="py-4 space-y-3 animate-fade-in text-center">
                      <h2 className="font-display text-xl text-[#8c7853] font-semibold">Galeri Foto</h2>
                      <div className="grid grid-cols-3 gap-1.5">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="aspect-square bg-stone-200 rounded-lg flex items-center justify-center text-[8px] text-muted-foreground font-semibold">
                            Photo {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {mobilePreviewTab === "Ucapan" && (
                    <div className="py-4 space-y-4 animate-fade-in text-center">
                      <h2 className="font-display text-xl text-[#8c7853] font-semibold">Kirim Doa Restu</h2>
                      <div className="p-3 bg-white border rounded-xl space-y-2 text-left">
                        <div className="text-[8px] font-bold text-[#8c7853]">Tamu: Budi & Ani</div>
                        <p className="text-[10px] text-stone-600 leading-relaxed italic">"Selamat menempuh hidup baru ya Rara & Adi! Semoga sakinah mawaddah warahmah."</p>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Bar Navigation */}
                <nav className="absolute bottom-0 inset-x-0 h-12 bg-white border-t border-border flex items-center justify-around text-[8px] font-bold text-muted-foreground shadow-md z-10 select-none">
                  {[
                    { tab: "Home", icon: HomeIcon },
                    { tab: "Mempelai", icon: Users },
                    { tab: "Undangan", icon: Calendar },
                    { tab: "Map", icon: Compass },
                    { tab: "Cerita", icon: Heart },
                    { tab: "Photo", icon: ImageIcon },
                    { tab: "Ucapan", icon: MessageCircle },
                  ].map((item) => {
                    const isActive = mobilePreviewTab === item.tab;
                    return (
                      <button
                        key={item.tab}
                        onClick={() => setMobilePreviewTab(item.tab)}
                        className={`flex flex-col items-center justify-center gap-0.5 w-12 h-full transition relative border-0 bg-transparent cursor-pointer
                          ${isActive ? "text-[#8c7853]" : "hover:text-[#8c7853]"}`}
                      >
                        <item.icon className="h-3 w-3 shrink-0" />
                        <span>{item.tab}</span>
                        {isActive && <span className="absolute bottom-1 w-3 h-0.5 bg-[#8c7853] rounded-full" />}
                      </button>
                    );
                  })}
                </nav>

              </div>

            </div>

          </div>
        )}

        {/* -------------------- 4. TAB: TRANSAKSI -------------------- */}

        {/* -------------------- 4. TAB: TRANSAKSI -------------------- */}
        {tab === "Transaksi" && (
          <div className="space-y-6">
            {/* Filter Search */}
            <div className="flex items-center gap-2 max-w-sm rounded-xl border border-border bg-card px-3 py-2 text-xs">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari transaksi berdasarkan ID/User..."
                value={txQuery}
                onChange={(e) => setTxQuery(e.target.value)}
                className="border-none bg-transparent h-6 focus-visible:ring-0 p-0 text-xs"
              />
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-muted/80 border-b border-border font-semibold text-muted-foreground">
                    <th className="p-3">ID Invoice</th>
                    <th className="p-3">Nama Tamu</th>
                    <th className="p-3">Paket Keanggotaan</th>
                    <th className="p-3">Harga</th>
                    <th className="p-3">Tanggal</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsList
                    .filter(
                      (t) =>
                        t.id.toLowerCase().includes(txQuery.toLowerCase()) ||
                        t.user.toLowerCase().includes(txQuery.toLowerCase())
                    )
                    .map((t) => (
                      <tr key={t.id} className="border-b border-border/40 last:border-0 hover:bg-muted/25">
                        <td className="p-3 font-mono text-[10px] text-gold font-bold">{t.id}</td>
                        <td className="p-3 font-medium text-foreground">{t.user}</td>
                        <td className="p-3 font-semibold text-muted-foreground">{t.package}</td>
                        <td className="p-3 font-semibold">{formatRupiah(t.amount)}</td>
                        <td className="p-3 text-muted-foreground">{t.date}</td>
                        <td className="p-3">
                          <Badge
                            variant={
                              t.status === "success"
                                ? "default"
                                : t.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={t.status === "success" ? "bg-gold text-primary-foreground text-[8px]" : "text-[8px]"}
                          >
                            {t.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-right flex justify-end gap-1">
                          {t.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApproveTransaction(t.id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-[9px] h-6 px-2.5"
                              >
                                <Check className="h-3 w-3 mr-0.5" /> Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCancelTransaction(t.id)}
                                className="text-red-500 border-red-500 hover:bg-red-50 rounded-full text-[9px] h-6 px-2.5"
                              >
                                <X className="h-3 w-3 mr-0.5" /> Cancel
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------- 5. TAB: PAKET HARGA -------------------- */}
        {tab === "Paket Harga" && (
          <div className="space-y-6 max-w-4xl">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { name: "Sakinah", price: "Gratis", orig: "Selamanya", color: "border-border" },
                { name: "Mawaddah", price: "Rp89.000", orig: "Rp100.000", color: "border-gold shadow-md" },
                { name: "Warahmah", price: "Rp199.000", orig: "Sekali Bayar", color: "border-border" },
              ].map((p) => (
                <div key={p.name} className={`rounded-2xl border bg-card p-5 space-y-4 ${p.color}`}>
                  <h3 className="font-display font-semibold text-base">{p.name}</h3>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Label className="text-[10px]">Harga Baru</Label>
                      <Input value={p.price} className="text-xs h-8" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px]">Harga Coret / Label</Label>
                      <Input value={p.orig} className="text-xs h-8" />
                    </div>
                  </div>
                  <Button className="w-full rounded-full text-[10px] h-8 bg-muted hover:bg-muted/80 text-foreground">
                    Perbarui Fitur
                  </Button>
                </div>
              ))}
            </div>

            <Button
              onClick={() => toast.success("Konfigurasi harga paket berhasil diperbarui!")}
              className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold px-6"
            >
              Simpan Konfigurasi Paket
            </Button>
          </div>
        )}

        {/* -------------------- 6. TAB: WEBSITE UNDANGAN -------------------- */}
        {tab === "Website Undangan" && (
          <div className="space-y-6">
            {/* Filter Search */}
            <div className="flex items-center gap-2 max-w-sm rounded-xl border border-border bg-card px-3 py-2 text-xs">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari subdomain website..."
                value={webQuery}
                onChange={(e) => setWebQuery(e.target.value)}
                className="border-none bg-transparent h-6 focus-visible:ring-0 p-0 text-xs"
              />
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-muted/80 border-b border-border font-semibold text-muted-foreground">
                    <th className="p-3">Subdomain</th>
                    <th className="p-3">Mempelai</th>
                    <th className="p-3">Paket Aktif</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Tanggal Dibuat</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {websitesList
                    .filter((w) => w.sub.toLowerCase().includes(webQuery.toLowerCase()))
                    .map((w, idx) => (
                      <tr key={idx} className="border-b border-border/40 last:border-0 hover:bg-muted/25">
                        <td className="p-3 font-mono font-bold text-gold">{w.sub}.sakinahweb.id</td>
                        <td className="p-3 font-medium capitalize">
                          {w.groom} & {w.bride}
                        </td>
                        <td className="p-3 font-semibold text-muted-foreground">{w.pkg}</td>
                        <td className="p-3">
                          <Badge variant={w.status === "Aktif" ? "default" : "destructive"} className="text-[8px] uppercase font-semibold">
                            {w.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground">{w.date}</td>
                        <td className="p-3 text-right flex justify-end gap-1.5 items-center">
                          <Button
                            size="sm"
                            variant={w.status === "Aktif" ? "secondary" : "default"}
                            className="text-[9px] h-7 rounded-full px-3"
                            onClick={() => handleToggleWebsiteStatus(w.sub)}
                          >
                            {w.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-[9px] h-7 rounded-full"
                            onClick={() => window.open(`https://${w.sub}.sakinahweb.id`, "_blank")}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" /> Kunjungi
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------- 7. TAB: PEMBAYARAN -------------------- */}
        {tab === "Pembayaran" && (
          <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl space-y-6">
            <h2 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gold" /> Konfigurasi Gerbang Pembayaran (Payment Gateway)
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
                <div>
                  <Label className="font-semibold block">Midtrans Otomatis (QRIS, E-Wallet, VA)</Label>
                  <p className="text-[10px] text-muted-foreground">Aktifkan integrasi API instan pembayaran online</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <Label>Merchant ID Midtrans</Label>
                  <Input type="text" value="M10283401" className="text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label>Client Key</Label>
                  <Input type="password" value="SB-Mid-client-88e9d3d..." className="text-xs" />
                </div>
              </div>

              <div className="border-t border-border/60 my-4 pt-4 space-y-4">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Pengaturan Transfer Bank Manual
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label>Nama Bank</Label>
                    <Input type="text" value="BCA" className="text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Nomor Rekening</Label>
                    <Input type="text" value="0928340129" className="text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Pemilik Rekening</Label>
                    <Input type="text" value="PT Sakinah Digital Indonesia" className="text-xs" />
                  </div>
                </div>
              </div>

              <Button
                onClick={() => toast.success("Metode pembayaran sistem berhasil diperbarui!")}
                className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold px-6"
              >
                Simpan Konfigurasi Pembayaran
              </Button>
            </div>
          </div>
        )}

        {/* -------------------- 8. TAB: PENGATURAN -------------------- */}
        {tab === "Pengaturan" && (
          <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl space-y-6">
            <h2 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <Settings className="h-5 w-5 text-gold" /> Pengaturan Sistem Umum
            </h2>

            <div className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Nama Aplikasi</Label>
                  <Input type="text" value="SakinahWeb Admin" className="text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label>Email Support</Label>
                  <Input type="text" value="support@sakinahweb.id" className="text-xs" />
                </div>
              </div>

              {/* Maintenance Mode */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-red-50/10 border-red-200/20">
                <div className="flex gap-3 items-center">
                  <ShieldAlert className="h-8 w-8 text-red-500" />
                  <div>
                    <Label className="font-semibold text-red-500 block">Mode Perawatan (Maintenance Mode)</Label>
                    <p className="text-[10px] text-muted-foreground">Kunci website dari pengguna luar sementara waktu</p>
                  </div>
                </div>
                <Switch />
              </div>

              {/* Database Management */}
              <div className="border-t border-border/60 my-4 pt-4 space-y-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="h-4 w-4 text-gold" /> Cadangkan & Pulihkan Database
                </h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleBackupDatabase}
                    className="rounded-full text-xs"
                  >
                    Cadangkan Sekarang
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => toast.success("Pengaturan umum sistem berhasil disimpan!")}
                className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold px-6 mt-2"
              >
                Simpan Pengaturan
              </Button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
