"use client";

import { useState } from "react";
import Link from "next/link";
import { useActionState } from 'react';
import { AuthState, LoginAuthAction } from "@/app/lib/actions";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const initialState: AuthState = { message: null };
  const [state, formAction] = useActionState(LoginAuthAction, initialState)


  return (
    <form action={formAction} className="w-full flex flex-col gap-4" noValidate>
      {state?.message&&<div className="flex justify-center">
      <p className="text-red-500 text-sm font-bold">{state.message}</p>  
      </div>}

      <div className="flex flex-col text-left">
        <label
          htmlFor="login-username"
          className="text-sm font-bold text-white mb-2 select-none"
        >
          Email or username
        </label>
        <input
          id="login-username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email or username"
          autoComplete="username"
          autoCapitalize="off"
          spellCheck={false}
          className="w-full px-3.5 py-3 rounded-md bg-[#121212] text-white text-sm border border-[#727272] placeholder:text-[#a7a7a7] hover:border-neutral-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors duration-150"
        />
      </div>
      <div className="flex flex-col text-left">
        <label
          htmlFor="login-password"
          className="text-sm font-bold text-white mb-2 select-none"
        >
          Password
        </label>
        <div className="relative w-full">
          <input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            spellCheck={false}
            className="w-full pl-3.5 pr-11 py-3 rounded-md bg-[#121212] text-white text-sm border border-[#727272] placeholder:text-[#a7a7a7] hover:border-neutral-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors duration-150"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#a7a7a7] hover:text-white transition-colors cursor-pointer"
          >
            {showPassword ? (
              /* Eye Slashed (Hide) */
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
              </svg>
            ) : (
              /* Eye Open (Show) */
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Remember me switch */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          role="switch"
          aria-checked={rememberMe}
          onClick={() => setRememberMe(!rememberMe)}
          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${
            rememberMe ? "bg-[#1ed760]" : "bg-[#727272]"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
              rememberMe ? "translate-x-4.5 bg-black" : "translate-x-1 bg-white"
            }`}
          />
        </button>
        <span
          onClick={() => setRememberMe(!rememberMe)}
          className="text-sm text-white select-none cursor-pointer"
        >
          Remember me
        </span>
      </div>

      {/* Primary Log In Button */}
      <button
        type="submit"
        className="w-full mt-5 py-3.5 px-8 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] active:scale-[0.98] text-black font-bold text-base tracking-tight transition-all duration-200 hover:scale-[1.02] cursor-pointer shadow-md"
      >
        Log In
      </button>

      {/* Forgot Password Link */}
      <div className="text-center mt-4">
        <Link
          href="/forgot-password"
          className="text-sm font-semibold text-white hover:text-[#1ed760] underline underline-offset-2 transition-colors inline-block"
        >
          Forgot your password?
        </Link>
      </div>
    </form>
  );
}
