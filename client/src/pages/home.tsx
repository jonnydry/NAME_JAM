import { NameGenerator } from "@/components/name-generator";
import { SetListGenerator } from "@/components/setlist-generator";
import { LyricJam } from "@/components/lyric-jam";
import { FermataLogo } from "@/components/fermata-logo";
import { Stash } from "@/components/stash";
import { UserMenu } from "@/components/user-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function Home() {
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  // No longer redirect automatically - mixed approach allows guest usage

  const handleCopy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FermataLogo size="xl" />
          <p className="text-muted-foreground mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Floating User Menu */}
      <div className="fixed top-4 right-4 z-50">
        <UserMenu />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Logo and Title Section - Restored Original Design */}
          <div className="text-center mb-6 md:mb-8">
            <div className="flex flex-col items-center">
              {/* Logo */}
              <div className="mb-3 md:mb-4">
                <FermataLogo size="xl" />
              </div>
              {/* Title with special alignment */}
              <div className="relative">
                <h1 className="text-responsive-3xl md:text-responsive-4xl font-bold mb-2 uppercase tracking-wide font-mono flex items-center justify-center relative">
                  <span className="title-text title-align">&gt;Name_Jam</span>
                </h1>
              </div>
            </div>
            <p className="text-responsive-base md:text-responsive-lg text-muted-foreground font-medium subtitle-fade px-2">Generate unique band names, song titles, set lists, and lyrics</p>
          </div>

          {/* Two Column Layout with Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Generator Section - Takes 2/3 on large screens */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="names" className="w-full">
                <TabsList className="grid w-full grid-cols-3 tabs-list-enhanced mb-4 md:mb-6">
                  <TabsTrigger value="names" className="tabs-trigger-enhanced">
                    <span className="hidden sm:inline">NAME_JAM</span>
                    <span className="sm:hidden">NAMES</span>
                  </TabsTrigger>
                  <TabsTrigger value="setlist" className="tabs-trigger-enhanced">
                    <span className="hidden sm:inline">SET_JAM</span>
                    <span className="sm:hidden">SET LISTS</span>
                  </TabsTrigger>
                  <TabsTrigger value="lyric" className="tabs-trigger-enhanced">
                    <span className="hidden sm:inline">LYRIC_JAM</span>
                    <span className="sm:hidden">LYRICS</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="names">
                  <NameGenerator />
                </TabsContent>
                <TabsContent value="setlist">
                  <SetListGenerator onCopy={handleCopy} />
                </TabsContent>
                <TabsContent value="lyric">
                  <LyricJam />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Stash - Takes 1/3 on large screens */}
            <div className="lg:col-span-1">
              <Stash />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-responsive-sm text-muted-foreground">© 2025 NameJam. Powered by web-sourced creativity.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <Link href="/about" className="text-responsive-xs text-muted-foreground hover:text-primary transition-colors">About</Link>
              <a href="#" className="text-responsive-xs text-muted-foreground hover:text-primary transition-colors">Contact</a>
              <a href="#" className="text-responsive-xs text-muted-foreground hover:text-primary transition-colors">API Documentation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
