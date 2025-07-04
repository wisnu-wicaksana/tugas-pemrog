"use client";

import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "@/components/LogoutButton";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Anime from "@/components/anime /Anime";
import Character from "@/components/character/Character";
import Manga from "@/components/manga/Manga";
import Creator from "@/components/creator/Creator";

export default function DashboardClient() {
  const { loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, error } = useProfile();
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("status");

  if (authLoading || profileLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!profile) return <div>Data profil tidak ditemukan.</div>;

  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case "success":
        return (
          <div className="p-2 mb-4 bg-green-100 text-green-800 rounded">
            ✅ Pembayaran berhasil!
          </div>
        );
      case "pending":
        return (
          <div className="p-2 mb-4 bg-yellow-100 text-yellow-800 rounded">
            ⏳ Pembayaran masih diproses.
          </div>
        );
      case "notfound":
        return (
          <div className="p-2 mb-4 bg-gray-100 text-gray-800 rounded">
            ❌ Pembayaran tidak ditemukan.
          </div>
        );
      case "error":
        return (
          <div className="p-2 mb-4 bg-red-100 text-red-800 rounded">
            ⚠️ Terjadi kesalahan saat memproses pembayaran.
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="p-4">
        {renderPaymentStatus()}

        <h1 className="text-xl font-bold mb-2">
          Selamat datang di Dashboard!
        </h1>
        <p>
          <strong>Nama:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Status Member:</strong>{" "}
          {profile.isMember ? "Member" : "Non-Member"}
        </p>
        <LogoutButton />
      </div>

      
      <Link href="/payment">
        <button className="bg-green-600 text-white px-4 py-2 rounded mt-2">
          Beli Membership
        </button>
      </Link>

      <div className="mb-4 text-right">
          <Link href="/favorite">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Lihat Favorit
            </button>
          </Link>
        </div>
      <div>TOP 10</div>
      <Anime />
      <Character />
      <Manga />
      
    </>
  );
}
