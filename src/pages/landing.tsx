import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { CtaSection } from '@/components/landing/cta-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { FlowSection } from '@/components/landing/flow-section';
import { HeroSection } from '@/components/landing/hero-section';
import { LandingNav } from '@/components/landing/landing-nav';
import { McpSection } from '@/components/landing/mcp-section';
import { ProblemSection } from '@/components/landing/problem-section';
import { useAuthStore } from '@/stores/auth-store';

const DARK_BG = 'oklch(0.129 0.042 264.695)';

export default function LandingPage() {
  const { authStatus } = useAuthStore();

  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = DARK_BG;
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  if (authStatus === 'authenticated') {
    return <Navigate to="/templates" replace />;
  }

  return (
    <div
      className="dark overflow-x-hidden"
      style={{ backgroundColor: DARK_BG }}
    >
      <div className="flex min-h-screen flex-col bg-background text-foreground break-keep">
        <LandingNav />
        <main className="flex-1">
          <HeroSection />
          <ProblemSection />
          <FeaturesSection />
          <FlowSection />
          <McpSection />
          <CtaSection />
        </main>
        <footer className="py-6 text-center text-sm text-muted-foreground">
          © 2025 Propt
        </footer>
      </div>
    </div>
  );
}
