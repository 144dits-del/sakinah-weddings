import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { TemplateCard } from "@/components/site/TemplateCard";
import { templates } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/marketplace")({
  component: Marketplace,
});

type Filter = "all" | "gratis" | "premium" | "popular";

function Marketplace() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = templates.filter(t =>
    filter === "all" ? true :
    filter === "popular" ? t.popular :
    t.type === filter
  );

  const filters: { v: Filter; l: string }[] = [
    { v: "all", l: "Semua" }, { v: "gratis", l: "Gratis" }, { v: "premium", l: "Premium" }, { v: "popular", l: "Populer" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl">Marketplace Template</h1>
          <p className="mt-3 text-muted-foreground">Pilih dari koleksi template undangan elegan kami</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {filters.map(f => (
            <Button key={f.v} variant={filter === f.v ? "default" : "outline"} size="sm"
              className={filter === f.v ? "bg-gold hover:bg-gold/90 text-primary-foreground" : ""}
              onClick={() => setFilter(f.v)}>{f.l}</Button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map(t => <TemplateCard key={t.id} t={t} />)}
        </div>
      </section>
      <Footer />
    </div>
  );
}
