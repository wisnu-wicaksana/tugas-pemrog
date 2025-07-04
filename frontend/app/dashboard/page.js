// app/dashboard/page.js

import { Suspense } from "react";
import DashboardClient from "./dashboardClient"; // Pastikan path import ini benar

export default function DashboardPage() {
  return (
    // Bungkus komponen yang menggunakan useSearchParams dengan Suspense
    <Suspense fallback={<div>Loading page...</div>}>
      <DashboardClient />
    </Suspense>
  );
}