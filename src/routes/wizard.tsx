import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

export const Route = createFileRoute("/wizard")({
  component: Wizard,
});

const steps = ["Subdomain", "Nama Mempelai", "Informasi Acara", "Selesai"];

function Wizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    subdomain: "raditya-aisyah",
    groom: { fullName: "", nickname: "", father: "", mother: "" },
    bride: { fullName: "", nickname: "", father: "", mother: "" },
    religion: "Islam", timezone: "WIB",
    akad: { date: "", start: "", end: "", venue: "" },
    resepsi: { date: "", start: "", end: "", venue: "" },
  });

  const upd = (path: string, v: string) => {
    const keys = path.split(".");
    setData(d => {
      const next: any = structuredClone(d);
      let o = next; for (let i = 0; i < keys.length - 1; i++) o = o[keys[i]];
      o[keys[keys.length - 1]] = v;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-xl">SakinahWeb</Link>
          <Link to="/dashboard"><Button variant="ghost" size="sm">Batal</Button></Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* Stepper */}
        <ol className="flex items-center justify-between mb-10">
          {steps.map((s, i) => (
            <li key={s} className="flex-1 flex items-center">
              <div className={`grid h-10 w-10 place-items-center rounded-full font-semibold text-sm shrink-0
                ${i < step ? "bg-gold text-primary-foreground" : i === step ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <div className="hidden sm:block ml-2 text-sm">{s}</div>
              {i < steps.length - 1 && <div className={`flex-1 h-px mx-3 ${i < step ? "bg-gold" : "bg-border"}`} />}
            </li>
          ))}
        </ol>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          {step === 0 && (
            <div className="space-y-5">
              <div><h2 className="font-display text-2xl">Pilih Subdomain</h2><p className="text-sm text-muted-foreground mt-1">URL unik untuk undangan kalian</p></div>
              <div className="space-y-2">
                <Label>Subdomain</Label>
                <div className="flex">
                  <Input value={data.subdomain} onChange={e => upd("subdomain", e.target.value)} className="rounded-r-none" />
                  <span className="grid place-items-center px-4 rounded-r-md bg-muted text-sm text-muted-foreground border border-l-0 border-input">.sakinahweb.id</span>
                </div>
                <p className="text-sm text-gold">Preview: {data.subdomain || "namapasangan"}.sakinahweb.id</p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl">Nama Mempelai</h2>
              {[
                { side: "groom" as const, label: "Mempelai Pria" },
                { side: "bride" as const, label: "Mempelai Wanita" },
              ].map(({ side, label }) => (
                <div key={side} className="space-y-3 rounded-xl border border-border p-4">
                  <div className="font-semibold">{label}</div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {(["fullName", "nickname", "father", "mother"] as const).map(k => (
                      <div key={k} className="space-y-1.5">
                        <Label className="text-xs">{({fullName:"Nama Lengkap",nickname:"Nama Panggilan",father:"Nama Ayah",mother:"Nama Ibu"} as any)[k]}</Label>
                        <Input value={(data as any)[side][k]} onChange={e => upd(`${side}.${k}`, e.target.value)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl">Informasi Acara</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Agama</Label><Input value={data.religion} onChange={e => upd("religion", e.target.value)} /></div>
                <div className="space-y-1.5"><Label>Zona Waktu</Label><Input value={data.timezone} onChange={e => upd("timezone", e.target.value)} /></div>
              </div>
              {(["akad", "resepsi"] as const).map(ev => (
                <div key={ev} className="space-y-3 rounded-xl border border-border p-4">
                  <div className="font-semibold capitalize">{ev === "akad" ? "Akad Nikah" : "Resepsi"}</div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="space-y-1.5"><Label className="text-xs">Tanggal</Label><Input type="date" value={(data as any)[ev].date} onChange={e => upd(`${ev}.date`, e.target.value)} /></div>
                    <div className="space-y-1.5"><Label className="text-xs">Jam Mulai</Label><Input type="time" value={(data as any)[ev].start} onChange={e => upd(`${ev}.start`, e.target.value)} /></div>
                    <div className="space-y-1.5"><Label className="text-xs">Jam Selesai</Label><Input type="time" value={(data as any)[ev].end} onChange={e => upd(`${ev}.end`, e.target.value)} /></div>
                  </div>
                  <div className="space-y-1.5"><Label className="text-xs">Tempat dan Alamat</Label><Input value={(data as any)[ev].venue} onChange={e => upd(`${ev}.venue`, e.target.value)} /></div>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-soft"><Check className="h-8 w-8 text-gold" /></div>
              <h2 className="font-display text-3xl">Selesai!</h2>
              <p className="text-muted-foreground">Undangan kalian siap dibagikan.</p>
              <div className="text-left rounded-xl bg-muted/40 p-4 text-sm space-y-1.5">
                <div><span className="text-muted-foreground">URL:</span> <b>{data.subdomain || "raditya-aisyah"}.sakinahweb.id</b></div>
                <div><span className="text-muted-foreground">Mempelai:</span> <b>{data.groom.nickname || "Raditya"} & {data.bride.nickname || "Aisyah"}</b></div>
                <div><span className="text-muted-foreground">Akad:</span> <b>{data.akad.date || "—"} {data.akad.start && `(${data.akad.start})`}</b></div>
                <div><span className="text-muted-foreground">Resepsi:</span> <b>{data.resepsi.date || "—"} {data.resepsi.start && `(${data.resepsi.start})`}</b></div>
              </div>
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                <Link to="/dashboard"><Button variant="outline">Masuk Dashboard</Button></Link>
                <Link to="/preview"><Button className="bg-gold hover:bg-gold/90 text-primary-foreground">Lihat Website</Button></Link>
              </div>
            </div>
          )}

          {step < 3 && (
            <div className="flex justify-between mt-8">
              <Button variant="outline" disabled={step === 0} onClick={() => setStep(s => s - 1)}>Kembali</Button>
              <Button className="bg-gold hover:bg-gold/90 text-primary-foreground" onClick={() => setStep(s => s + 1)}>Lanjut</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
