"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginAuth } from "./hook/LoginAuth";

export default function LoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!login.trim() || !password.trim()) {
      setError("Email va parolni kiriting.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginAuth({
        login: login.trim(),
        email: login.trim(),
        password,
      });

      if (!response.success) {
        setError("Login yoki parol noto‘g‘ri.");
        return;
      }

      const { user, accessToken, refreshToken } = response.data;

      localStorage.setItem("crmAccessToken", accessToken);
      localStorage.setItem("crmRefreshToken", refreshToken);
      localStorage.setItem("customer", JSON.stringify(user));

      router.push("/");
      router.refresh();
    } catch (err: any) {
      console.error("Login error:", err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login qilishda xatolik yuz berdi.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8faf9] px-4 py-10">
      <div className="w-full max-w-[450px]">
        <div className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:p-10">
          {/* Logo / Title */}
          <div className="mb-8 text-center">
            <h1 className="text-[32px] font-bold tracking-[-0.5px] text-[#023337]">
              Welcome Back
            </h1>

            <p className="mt-2 text-[15px] text-gray-500">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="login"
                className="mb-2 block text-[14px] font-semibold text-[#023337]"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  strokeWidth={1.8}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="login"
                  type="email"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                  className="
                    h-[52px]
                    w-full
                    rounded-[12px]
                    border
                    border-gray-200
                    bg-white
                    pl-[48px]
                    pr-4
                    text-[15px]
                    text-[#023337]
                    outline-none
                    transition-all
                    placeholder:text-gray-400
                    focus:border-[#4EA674]
                    focus:ring-4
                    focus:ring-[#4EA674]/10
                    disabled:cursor-not-allowed
                    disabled:bg-gray-50
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-[14px] font-semibold text-[#023337]"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-[13px] font-medium text-[#4EA674] transition-colors hover:text-[#023337]"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  strokeWidth={1.8}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="
                    h-[52px]
                    w-full
                    rounded-[12px]
                    border
                    border-gray-200
                    bg-white
                    pl-[48px]
                    pr-[50px]
                    text-[15px]
                    text-[#023337]
                    outline-none
                    transition-all
                    placeholder:text-gray-400
                    focus:border-[#4EA674]
                    focus:ring-4
                    focus:ring-[#4EA674]/10
                    disabled:cursor-not-allowed
                    disabled:bg-gray-50
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    transition-colors
                    hover:text-[#023337]
                    disabled:cursor-not-allowed
                  "
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-600">
                {error}
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-2
                flex
                h-[52px]
                w-full
                items-center
                justify-center
                rounded-[12px]
                bg-[#023337]
                text-[15px]
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-[#03484d]
                hover:shadow-lg
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span
                    className="
                      h-5
                      w-5
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />

                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Register */}
          <div className="mt-7 text-center">
            <p className="text-[14px] text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#4EA674] transition-colors hover:text-[#023337]"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
