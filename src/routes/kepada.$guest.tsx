import { createFileRoute } from "@tanstack/react-router";
import FullScreenInvitation from "@/components/site/FullScreenInvitation";

export const Route = createFileRoute("/kepada/$guest")({
  component: KepadaGuest,
});

function KepadaGuest() {
  const { guest } = Route.useParams();
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

  return (
    <FullScreenInvitation
      subdomain="di-ra"
      guestName={guestName}
      guestAddress={guestAddress}
    />
  );
}
