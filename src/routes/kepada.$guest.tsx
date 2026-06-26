import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import FullScreenInvitation from "@/components/site/FullScreenInvitation";

export const Route = createFileRoute("/kepada/$guest")({
  validateSearch: (search) => z.object({
    subdomain: z.string().optional()
  }).parse(search),
  component: KepadaGuest,
});

function KepadaGuest() {
  const { guest } = Route.useParams();
  const { subdomain: querySubdomain } = Route.useSearch();
  let guestName = "Tamu Kehormatan";
  let guestAddress = "";

  if (guest) {
    // Memisahkan nama tamu dan alamat dengan pemisah "-"
    // Contoh: Budi-Jakarta -> nama: "Budi", alamat: "Jakarta"
    // Contoh: Budi-Santoso-Bandung -> nama: "Budi Santoso", alamat: "Bandung"
    const decoded = decodeURIComponent(guest);
    const parts = decoded.split("-");
    if (parts.length > 1) {
      guestAddress = parts[parts.length - 1].replace(/_/g, " ");
      guestName = parts.slice(0, parts.length - 1).join(" ").replace(/_/g, " ");
    } else {
      guestName = decoded.replace(/_/g, " ");
    }
  }

  // Detect subdomain dynamically from hostname or query parameters
  let detectedSubdomain = "di-ra"; // Fallback to "di-ra"
  if (querySubdomain) {
    detectedSubdomain = querySubdomain;
  } else if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const host = hostname.toLowerCase();
    let sub = "";

    if (host.includes(".sakinahweb.lovable.app") && host !== "sakinahweb.lovable.app") {
      sub = host.split(".sakinahweb.lovable.app")[0];
    } else if (host.includes(".sakinahweb.id") && host !== "sakinahweb.id") {
      sub = host.split(".sakinahweb.id")[0];
    } else if (host.includes(".sakinah.studio") && host !== "sakinah.studio") {
      sub = host.split(".sakinah.studio")[0];
    } else if (
      !host.startsWith("www.") &&
      host !== "sakinahweb.id" &&
      host !== "sakinahweb.lovable.app" &&
      host !== "sakinah.studio" &&
      host.split(".").length > 2
    ) {
      sub = host.split(".")[0];
    }

    if (sub && sub !== "www") {
      detectedSubdomain = sub;
    }
  }

  return (
    <FullScreenInvitation
      subdomain={detectedSubdomain}
      guestName={guestName}
      guestAddress={guestAddress}
    />
  );
}
