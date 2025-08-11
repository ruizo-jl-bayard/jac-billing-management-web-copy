import { redirect } from "next/navigation";

export default function RootPage() {
  // Server-side redirect to payment-status
  redirect("/payment-status");
}
