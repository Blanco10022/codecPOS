'use client'

import { SalesboxLanding } from "@/components/salesbox-landing";
import { LandingPageComponent } from "@/components/landing-page";
import { useAuthLayout } from "@/components/Shared/Layout/AuthLayout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated } = useAuthLayout();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <LandingPageComponent />
  );
}
