'use client';

import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "@/components/LogoutButton";
import { useProfile } from "@/hooks/useProfile";

export default function DashboardPage() {
  const { loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, error } = useProfile();

  if (authLoading || profileLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!profile) return <div>Data profil tidak ditemukan.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Selamat datang di Dashboard!</h1>
      <p><strong>Nama:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Status Member:</strong> {profile.isMember ? "Member" : "Non-Member"}</p>
      <LogoutButton />
    </div>
  );
}
