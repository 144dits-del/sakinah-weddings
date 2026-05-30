export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="font-display text-xl mb-2">SakinahWeb</div>
          <p className="text-muted-foreground">Undangan pernikahan digital elegan dalam hitungan menit.</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Produk</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>Template</li><li>Harga</li><li>Fitur</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Perusahaan</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>Tentang</li><li>Blog</li><li>Kontak</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Bantuan</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>FAQ</li><li>Syarat</li><li>Privasi</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">© 2026 SakinahWeb. All rights reserved.</div>
    </footer>
  );
}
