import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { transactions, users, adminStats, formatRupiah } from "@/lib/dummy-data";
import { Users, Globe, Clock, DollarSign, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

const menu = ["Dashboard","User","Template","Transaksi","Paket Harga","Website Undangan","Pembayaran","Pengaturan"];

function Admin() {
  const stats = [
    { i: Users, l: "Total User", v: adminStats.totalUsers.toLocaleString("id-ID") },
    { i: Globe, l: "Website Aktif", v: adminStats.activeWebsites.toLocaleString("id-ID") },
    { i: Clock, l: "Transaksi Pending", v: adminStats.pendingTransactions },
    { i: DollarSign, l: "Total Pendapatan", v: formatRupiah(adminStats.totalRevenue) },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden md:flex w-60 shrink-0 border-r border-border bg-sidebar flex-col h-screen sticky top-0">
        <Link to="/" className="flex items-center gap-2 p-5 border-b border-border">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-background font-display text-sm">A</span>
          <div><div className="font-display text-base">Admin</div><div className="text-[10px] text-muted-foreground">SakinahWeb</div></div>
        </Link>
        <nav className="flex-1 p-3 space-y-0.5 text-sm">
          {menu.map((m,i) => (
            <button key={m} className={`w-full text-left px-3 py-2 rounded-lg ${i===0 ? "bg-sidebar-accent font-medium" : "text-muted-foreground hover:bg-sidebar-accent"}`}>{m}</button>
          ))}
          <Link to="/login" className="flex items-center gap-2 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 mt-2">
            <LogOut className="h-4 w-4" /> Keluar
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-5 md:p-8 max-w-full overflow-x-hidden">
        <div className="mb-6">
          <h1 className="font-display text-3xl">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Ringkasan operasional SakinahWeb.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map(s => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft mb-3"><s.i className="h-5 w-5" /></div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
              <div className="font-display text-2xl mt-1">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-lg mb-4">Transaksi Terbaru</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="pb-2">ID</th><th>User</th><th>Paket</th><th>Status</th><th className="text-right">Jumlah</th>
                </tr></thead>
                <tbody>
                  {transactions.map(t => (
                    <tr key={t.id} className="border-b border-border/50 last:border-0">
                      <td className="py-2.5 font-mono text-xs">{t.id}</td>
                      <td>{t.user}</td><td>{t.package}</td>
                      <td><Badge variant={t.status==="success"?"default":t.status==="pending"?"secondary":"destructive"} className={t.status==="success"?"bg-gold text-primary-foreground":""}>{t.status}</Badge></td>
                      <td className="text-right">{formatRupiah(t.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-lg mb-4">User Terbaru</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="pb-2">Nama</th><th>Email</th><th>Paket</th><th>Bergabung</th>
                </tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-border/50 last:border-0">
                      <td className="py-2.5">{u.name}</td>
                      <td className="text-muted-foreground text-xs">{u.email}</td>
                      <td><Badge variant="secondary">{u.package}</Badge></td>
                      <td className="text-xs text-muted-foreground">{u.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
