'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";

import { register } from "@/actions/user";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   //TODO: validate with zod, POST to /api/auth/register
  //   setTimeout(() => setIsSubmitting(false), 1200);
  // };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#150e0a] px-4 py-16 flex items-center justify-center">
      {/* ember glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #e8622c 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #f4b860 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* ticket card */}
        <div className="relative rounded-3xl bg-[#f6efe2] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          {/* stub header */}
          <div className="flex items-center justify-between px-8 pt-7 pb-5">
            <div className="flex items-center gap-2.5">
              <BeanMark />
              <span
                className="text-[15px] tracking-wide text-[#241812]"
                style={{ fontFamily: "var(--font-fraunces, Georgia, serif)" }}
              >
                Ember &amp; Bean
              </span>
            </div>
            <div
              className="text-right text-[10px] uppercase tracking-[0.15em] text-[#6b584a]"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              <div>No. 0001</div>
              <div>Est. 2025</div>
            </div>
          </div>

          {/* perforation */}
          <div className="relative h-0">
            <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[#150e0a]" />
            <div className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-[#150e0a]" />
            <div className="mx-6 border-t border-dashed border-[#d8c9ae]" />
          </div>

          <div className="px-8 pt-7 pb-8">
            <h1
              className="text-[28px] leading-tight text-[#241812]"
              style={{ fontFamily: "var(--font-fraunces, Georgia, serif)" }}
            >
              Welcome in.
            </h1>
            <p className="mt-1.5 text-sm text-[#6b584a]">
              Create an account to start earning stamps on every order.
            </p>

            <form action={register} className="mt-7 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium uppercase tracking-wide text-[#6b584a]">
                    First name
                  </Label>
                  <Input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="John"
                    required
                    className="border-[#d8c9ae] bg-white/60 focus-visible:border-[#e8622c] focus-visible:ring-[#e8622c]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium uppercase tracking-wide text-[#6b584a]">
                    Last name
                  </Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Doe"
                    required
                    className="border-[#d8c9ae] bg-white/60 focus-visible:border-[#e8622c] focus-visible:ring-[#e8622c]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-[#6b584a]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="border-[#d8c9ae] bg-white/60 focus-visible:border-[#e8622c] focus-visible:ring-[#e8622c]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wide text-[#6b584a]">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                    className="border-[#d8c9ae] bg-white/60 pr-10 focus-visible:border-[#e8622c] focus-visible:ring-[#e8622c]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7864] transition-colors hover:text-[#241812]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                // disabled={isSubmitting}
                className="group mt-2 h-11 w-full rounded-xl bg-[#e8622c] text-white transition-colors hover:bg-[#d9531f]"
              >
                SignUp
                {/* {isSubmitting ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <>
                    Sign up
                    <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-0.5" />
                  </>
                )} */}
              </Button>

              <p className="pt-1 text-center text-xs text-[#8a7864]">
                By signing up you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-2 hover:text-[#241812]">
                  terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-[#241812]">
                  privacy policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-[#c9b8a3]">
          Already a member?{" "}
          <Link href="/login" className="font-medium text-[#f2a65a] underline underline-offset-4 hover:text-[#f4b860]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

const BeanMark = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <ellipse cx="12" cy="12" rx="9" ry="10" fill="#241812" />
    <path d="M12 3.5c-2 3-2 5.5 0 8.5s2 5.5 0 8.5" stroke="#f6efe2" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export default Register;