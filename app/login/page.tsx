'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import {login, loginWithGithub } from "@/actions/user";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [oauthLoading, setOauthLoading] = useState<"google" | "github" | null>(null);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   // TODO: validate with zod, POST to /api/auth/login
  //   setTimeout(() => setIsSubmitting(false), 1200);
  // };

  // const handleOAuth = async (provider: "google" | "github") => {
  //   setOauthLoading(provider);
  //   // TODO: signIn(provider, { callbackUrl: "/" }) — next-auth
  // };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-sidebar px-4 py-16 flex items-center justify-center">
      {/* glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* ticket card */}
        <div className="relative rounded-3xl bg-card shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          {/* stub header */}
          <div className="flex items-center justify-between px-8 pt-7 pb-5">
            <div className="flex items-center gap-2.5">
              <BeanMark />
              <span className="font-heading text-[15px] tracking-wide text-card-foreground">
                Ember &amp; Bean
              </span>
            </div>
            <div className="text-right font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <div>No. 0002</div>
              <div>Est. 2025</div>
            </div>
          </div>

          {/* perforation */}
          <div className="relative h-0">
            <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-sidebar" />
            <div className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-sidebar" />
            <div className="mx-6 border-t border-dashed border-border" />
          </div>

          <div className="px-8 pt-7 pb-8">
            <h1 className="font-heading text-[28px] leading-tight text-card-foreground">
              Welcome back.
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to keep your stamps and past orders in one place.
            </p>

            {/* OAuth */}
            <form 
              // action={loginWithGithub} 
              className="mt-6 space-y-2.5">
              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <GoogleMark />
                Continue with Google
              </button>
            </form>
            <form action={loginWithGithub}>
              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <GithubMark className="text-foreground" />
                Continue with GitHub
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                or with email
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form action={login} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline underline-offset-2">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-card-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  name="remember"
                  className="h-4 w-4 rounded border-border"
                  style={{ accentColor: "var(--primary)" }}
                />
                Stay signed in on this device
              </label>

              <Button
                type="submit"
                // disabled={isSubmitting}
                className="group mt-2 h-11 w-full rounded-xl"
              >
                Sign In
                {/* {isSubmitting ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-0.5" />
                  </>
                )} */}
              </Button>
            </form>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-sidebar-foreground/70">
          New here?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

const BeanMark = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-card-foreground">
    <ellipse cx="12" cy="12" rx="9" ry="10" fill="currentColor" />
    <path d="M12 3.5c-2 3-2 5.5 0 8.5s2 5.5 0 8.5" stroke="var(--card)" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const GoogleMark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82Z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.26v3.1A11.998 11.998 0 0 0 12 24Z" />
    <path fill="#FBBC05" d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29v-3.1H1.26A11.998 11.998 0 0 0 0 12c0 1.94.46 3.77 1.26 5.39l4.01-3.1Z" />
    <path fill="#EA4335" d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.26 6.61l4.01 3.1C6.22 6.88 8.87 4.77 12 4.77Z" />
  </svg>
);

const GithubMark = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.6-4.04-1.6-.55-1.38-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3Z" />
  </svg>
);

export default Login;