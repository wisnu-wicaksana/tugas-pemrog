import dynamic from "next/dynamic";

const DashboardClient = dynamic(() => import("./dashboardCliant.js"), {
  ssr: false,
});

export default function DashboardPage() {
  return <DashboardClient />;
}
