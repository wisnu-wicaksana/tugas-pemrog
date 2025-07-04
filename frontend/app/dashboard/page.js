import dynamic from "next/dynamic";

const DashboardClient = dynamic(() => import("@/components/DashboardClient"), {
  ssr: false,
});

export default function DashboardPage() {
  return <DashboardClient />;
}
