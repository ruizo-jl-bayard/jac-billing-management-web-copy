import { redirect } from "next/navigation";

export default function RootPage() {
  // Server-side redirect to dashboard
  redirect("/dashboard");
}
