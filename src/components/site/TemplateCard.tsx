import { Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Template } from "@/lib/dummy-data";

export function TemplateCard({ t }: { t: Template }) {
  const premium = t.type === "premium";
  return (
    <div className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all">
      <div className="relative aspect-[3/4] bg-gradient-to-br from-cream to-gold-soft/40 grid place-items-center text-7xl">
        {t.thumbnail}
        <div className="absolute top-3 left-3 flex gap-2">
          {premium ? (
            <Badge className="bg-foreground text-background gap-1"><Lock className="h-3 w-3" />Premium</Badge>
          ) : (
            <Badge variant="secondary">Gratis</Badge>
          )}
          {t.popular && <Badge className="bg-gold text-primary-foreground">Populer</Badge>}
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="font-display text-lg">{t.name}</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1"><Eye className="h-4 w-4 mr-1" />Preview</Button>
          <Button size="sm" className="flex-1 bg-gold hover:bg-gold/90 text-primary-foreground">Gunakan</Button>
        </div>
      </div>
    </div>
  );
}
