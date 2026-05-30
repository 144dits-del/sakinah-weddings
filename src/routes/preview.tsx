import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { dummyWedding } from "@/lib/dummy-data";
import { Heart, MapPin, Calendar, Gift, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/preview")({
  component: Preview,
});

function Preview() {
  const w = dummyWedding;
  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-md mx-auto mb-4 flex justify-between items-center">
        <Link to="/dashboard"><Button size="sm" variant="outline">← Dashboard</Button></Link>
        <span className="text-xs text-muted-foreground">Mobile Preview</span>
      </div>

      <div className="max-w-md mx-auto rounded-[2rem] overflow-hidden border-8 border-foreground/90 bg-background shadow-2xl">
        {/* Cover */}
        <section className="relative h-[520px] bg-gradient-to-b from-gold-soft via-cream to-background flex flex-col items-center justify-center text-center p-6">
          <div className="text-xs tracking-[0.3em] text-gold mb-4">THE WEDDING OF</div>
          <h1 className="font-display text-5xl leading-tight">{w.groom.nickname}</h1>
          <div className="font-display text-3xl text-gold my-2">&</div>
          <h1 className="font-display text-5xl leading-tight">{w.bride.nickname}</h1>
          <div className="mt-6 text-sm text-muted-foreground">15 Agustus 2026</div>
          <Heart className="absolute bottom-6 text-gold animate-pulse" />
        </section>

        {/* Countdown */}
        <section className="p-6 text-center bg-card">
          <div className="text-xs text-muted-foreground mb-3">Menuju Hari Bahagia</div>
          <div className="flex justify-center gap-2">
            {[{n:75,l:"Hari"},{n:12,l:"Jam"},{n:30,l:"Menit"},{n:45,l:"Detik"}].map(c=>(
              <div key={c.l} className="bg-gold-soft/60 rounded-lg p-3 w-16">
                <div className="font-display text-2xl">{c.n}</div>
                <div className="text-[10px] text-muted-foreground">{c.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Doa pembuka */}
        <section className="p-8 text-center">
          <p className="font-display text-2xl text-gold mb-2">بِسْمِ ٱللَّٰهِ</p>
          <p className="text-sm italic text-muted-foreground">"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup..."</p>
          <p className="text-xs text-muted-foreground mt-2">— QS. Ar-Rum: 21</p>
        </section>

        {/* Profil */}
        <section className="p-6 bg-cream/50 space-y-6">
          <h2 className="font-display text-2xl text-center">Mempelai</h2>
          {[w.groom, w.bride].map((m, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-gold to-gold-soft mb-3" />
              <div className="font-display text-xl">{m.fullName}</div>
              <p className="text-xs text-muted-foreground mt-1">Putra/Putri dari<br />{m.father} & {m.mother}</p>
            </div>
          ))}
        </section>

        {/* Akad & Resepsi */}
        <section className="p-6 space-y-4">
          {[{t:"Akad Nikah",d:w.akad},{t:"Resepsi",d:w.resepsi}].map(ev=>(
            <div key={ev.t} className="rounded-xl border border-border p-5 text-center bg-card">
              <h3 className="font-display text-xl">{ev.t}</h3>
              <div className="my-3 flex items-center justify-center gap-2 text-sm"><Calendar className="h-4 w-4 text-gold" />{ev.d.date} • {ev.d.start}–{ev.d.end}</div>
              <div className="flex items-start justify-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />{ev.d.venue}</div>
            </div>
          ))}
        </section>

        {/* Love story */}
        <section className="p-6 bg-cream/50">
          <h2 className="font-display text-2xl text-center mb-4">Love Story</h2>
          <div className="space-y-4 text-sm">
            {[{y:"2020",t:"Pertama Bertemu"},{y:"2023",t:"Tunangan"},{y:"2026",t:"Menikah"}].map(s=>(
              <div key={s.y} className="flex gap-3"><div className="font-display text-gold">{s.y}</div><div>{s.t}</div></div>
            ))}
          </div>
        </section>

        {/* Galeri */}
        <section className="p-6">
          <h2 className="font-display text-2xl text-center mb-4">Galeri</h2>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({length:6}).map((_,i)=>(
              <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-gold-soft to-cream" />
            ))}
          </div>
        </section>

        {/* RSVP */}
        <section className="p-6 bg-cream/50">
          <h2 className="font-display text-2xl text-center mb-4">RSVP</h2>
          <div className="space-y-2">
            <input className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Nama" />
            <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>Hadir</option><option>Tidak Hadir</option></select>
            <Button className="w-full bg-gold hover:bg-gold/90 text-primary-foreground">Kirim</Button>
          </div>
        </section>

        {/* Kado */}
        <section className="p-6 text-center">
          <Gift className="mx-auto h-8 w-8 text-gold mb-2" />
          <h2 className="font-display text-2xl">Kado Digital</h2>
          <p className="text-xs text-muted-foreground mt-1">BCA 1234567890 a.n. Raditya Anwar</p>
        </section>

        {/* Doa & harapan */}
        <section className="p-6 bg-cream/50">
          <MessageCircle className="mx-auto h-6 w-6 text-gold mb-2" />
          <h2 className="font-display text-2xl text-center">Doa & Harapan</h2>
          <textarea className="w-full mt-3 rounded-lg border border-border bg-background p-3 text-sm" rows={3} placeholder="Tulis doa terbaik..." />
          <Button className="w-full mt-2 bg-gold hover:bg-gold/90 text-primary-foreground">Kirim Doa</Button>
        </section>

        {/* Footer */}
        <section className="p-8 text-center bg-foreground text-background">
          <p className="font-display text-xl">Terima Kasih</p>
          <p className="text-xs text-background/70 mt-2">Atas doa & restu kalian</p>
          <p className="font-display text-lg mt-4 text-gold">{w.groom.nickname} & {w.bride.nickname}</p>
        </section>
      </div>
    </div>
  );
}
