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
  "Transaksi",
  "Paket Harga",
  "Website Undangan",
  "Pembayaran",
  "Pengaturan",
];

function Admin() {
  const { tab } = Route.useSearch();
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

  // Load central state from localStorage or fallback
  useEffect(() => {
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
  }, []);

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
          <Link
            to="/login"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 mt-2 font-medium"
          >
            <LogOut className="h-4 w-4" /> Keluar
          </Link>
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

        {/* -------------------- 3. TAB: TEMPLATE -------------------- */}
        {tab === "Template" && (
          <div className="grid gap-6 lg:grid-cols-3 max-w-6xl">
            {/* Form Tambah Template */}
            <div className="rounded-2xl border border-border bg-card p-5 h-fit space-y-4">
              <h3 className="font-display font-semibold text-sm flex items-center gap-1.5">
                <Plus className="h-4 w-4 text-gold" /> Tambah Template Baru
              </h3>
              <form onSubmit={handleAddTemplate} className="space-y-3 text-xs">
                <div className="space-y-1.5">
                  <Label>Nama Template</Label>
                  <Input
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    placeholder="Contoh: Gold Velvet"
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Kategori Paket</Label>
                  <select
                    value={newTemplateType}
                    onChange={(e) => setNewTemplateType(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-md border border-input bg-background"
                  >
                    <option value="gratis">Sakinah (Gratis)</option>
                    <option value="premium">Mawaddah / Warahmah (Premium)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Emoji / Ikon Representasi</Label>
                  <Input
                    value={newTemplateIcon}
                    onChange={(e) => setNewTemplateIcon(e.target.value)}
                    placeholder="Contoh: ✨"
                    className="text-xs text-center font-bold"
                  />
                </div>
                <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold mt-2">
                  Daftarkan Template
                </Button>
              </form>
            </div>

            {/* Grid List Template */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Daftar Template Sistem ({templatesList.length})
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {templatesList.map((t) => (
                  <div key={t.id} className="rounded-2xl border border-border bg-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2.5 rounded-xl bg-muted/60">{t.thumbnail}</span>
                      <div>
                        <div className="font-bold text-xs">{t.name}</div>
                        <Badge variant={t.type === "gratis" ? "outline" : "default"} className="text-[8px] uppercase tracking-wider mt-1">
                          {t.type === "gratis" ? "Sakinah" : "Premium"}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveTemplate(t.id)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
