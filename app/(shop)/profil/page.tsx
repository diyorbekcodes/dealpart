"use client";
import avatar2 from "../../../assets/img/avatar2.png";
import { useEffect, useState } from "react";
import { useMe } from "@/app/auth/useMe";
import {
  UserRound,
  Mail,
  Phone,
  Camera,
  LockKeyhole,
  ShieldCheck,
  Save,
  Eye,
  EyeOff,
  LoaderCircle,
  CheckCircle2,
  CircleUserRound,
  ChevronRight,
} from "lucide-react";
import { MeUser } from "@/app/auth/types/AuthType";
import { useChangePassword } from "./hook/useChangePassword";
import { useProfilUpdate } from "./hook/useProfilUpdate";
import { useAvatarUpload } from "./hook/useAvatarUpload";
import Image from "next/image";

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export default function ProfilePage() {
  const { data, isLoading } = useMe();
  const changePasswordMutation = useChangePassword();
  // API javobi data.data ko'rinishida bo'lsa ham ishlaydi
  const user: MeUser | undefined = data?.data;
  const profilUpdate = useProfilUpdate();
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  const [form, setForm] = useState<ProfileForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await profilUpdate.mutateAsync({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
      });

      setMessage("Profil muvaffaqiyatli yangilandi!");
    } catch (err: unknown) {
      const apiError = err as {
        response?: { data?: { message?: string | string[] } };
      };

      const apiMessage = apiError.response?.data?.message;

      setError(
        Array.isArray(apiMessage)
          ? apiMessage.join(", ")
          : apiMessage || "Profilni yangilashda xatolik yuz berdi.",
      );
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password.newPassword.length < 8) {
      setError("Yangi parol kamida 8 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      setError("Yangi parollar bir-biriga mos kelmayapti.");
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      });

      setMessage("Parol muvaffaqiyatli almashtirildi!");

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Parolni almashtirishda xatolik yuz berdi.",
      );
    }
  };

  const users = data?.data;

  const avatarUrl = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `https://oline-shop-backend.onrender.com${user.avatar}`
    : null;

  // Avatar upload
  const avatarUpload = useAvatarUpload();
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    avatarUpload.mutate(file, {
      onSuccess: (result) => {
        const url = result.data.url;

        const fullUrl = url.startsWith("http")
          ? url
          : `https://oline-shop-backend.onrender.com${url}`;

        setUploadedAvatar(fullUrl);
      },
      onError: (error) => {
        console.error("Avatar yuklashda xatolik:", error);
      },
    });

    e.target.value = "";
  };

  const initials =
    `${form.firstName.charAt(0)}${form.lastName.charAt(0)}`.toUpperCase();

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#4EA674] focus:ring-4 focus:ring-[#4EA674]/10";

  const labelClass = "text-sm font-semibold text-gray-700";

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="animate-spin text-[#4EA674]" size={32} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F9F8] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-7 flex items-center gap-2 text-sm text-gray-500">
          <span>Home</span>
          <ChevronRight size={15} />
          <span className="font-semibold text-gray-900">My Profile</span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Shaxsiy ma'lumotlaringizni boshqaring va hisobingizni himoya qiling.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-[#023337] to-[#17664F] px-6 pb-7 pt-8 text-center">
              <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/25 bg-white text-2xl font-bold text-[#17664F] shadow-lg">
                {uploadedAvatar || avatarUrl ? (
                  <Image
                    src={uploadedAvatar || avatarUrl || avatar2}
                    alt="User avatar"
                    width={96}
                    height={96}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src={avatar2}
                    alt="User avatar"
                    width={96}
                    height={96}
                    className="h-full w-full rounded-full object-cover"
                  />
                )}

                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#4EA674] text-white hover:bg-[#3d925f]"
                >
                  {avatarUpload.isPending ? (
                    <LoaderCircle size={15} className="animate-spin" />
                  ) : (
                    <Camera size={15} />
                  )}
                </label>

                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={avatarUpload.isPending}
                />
              </div>

              <h2 className="text-lg font-bold text-white">
                {form.firstName} {form.lastName}
              </h2>

              <p className="mt-1 break-all text-sm text-white/70">
                {form.email}
              </p>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
                <CheckCircle2 size={14} />
                {user?.isActive ? "Active account" : "Account"}
              </div>
            </div>

            <nav className="space-y-2 p-4">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("profile");
                  setMessage("");
                  setError("");
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition ${
                  activeTab === "profile"
                    ? "bg-[#EAF5EE] text-[#267448]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <UserRound size={19} />
                Personal Information
                {activeTab === "profile" && (
                  <ChevronRight className="ml-auto" size={17} />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("password");
                  setMessage("");
                  setError("");
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition ${
                  activeTab === "password"
                    ? "bg-[#EAF5EE] text-[#267448]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <LockKeyhole size={19} />
                Change Password
                {activeTab === "password" && (
                  <ChevronRight className="ml-auto" size={17} />
                )}
              </button>
            </nav>

            <div className="mx-4 mb-4 flex gap-3 rounded-xl bg-[#F5FAF6] p-4">
              <ShieldCheck size={22} className="shrink-0 text-[#4EA674]" />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Your account is secure
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Shaxsiy ma'lumotlaringizni doimo yangilab turing.
                </p>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <section className="min-w-0 rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-5 sm:px-8 sm:py-6">
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                {activeTab === "profile"
                  ? "Personal Information"
                  : "Change Password"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === "profile"
                  ? "Shaxsiy ma'lumotlaringizni tahrirlang."
                  : "Hisobingiz xavfsizligi uchun parolingizni yangilang."}
              </p>
            </div>

            <div className="p-5 sm:p-8">
              {message && (
                <div className="mb-5 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm text-green-700">
                  <CheckCircle2 size={18} />
                  {message}
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              {activeTab === "profile" ? (
                <form onSubmit={handleUpdateProfile}>
                  <div className="mb-7 flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF5EE] text-[#4EA674]">
                      <UserRound size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Basic Information
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Ism, familiya va aloqa ma'lumotlari
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="firstName">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Ismingiz"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="lastName">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Familiyangiz"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="email">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-4 top-[22px] text-gray-400"
                        />
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="example@email.com"
                          className={`${inputClass} pl-11`}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="phone">
                        Phone Number
                      </label>
                      <div className="relative ">
                        <Phone
                          size={18}
                          className="absolute left-4 top-[22px] text-gray-400"
                        />
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+998 90 123 45 67"
                          className={`${inputClass} pl-11`}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-6 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setForm({
                          firstName: user?.firstName ?? "",
                          lastName: user?.lastName ?? "",
                          email: user?.email ?? "",
                          phone: user?.phone ?? "",
                        });
                        setMessage("");
                        setError("");
                      }}
                      className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={profilUpdate.isPending}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4EA674] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3d925f] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {profilUpdate.isPending ? (
                        <LoaderCircle className="animate-spin" size={18} />
                      ) : (
                        <Save size={18} />
                      )}

                      {profilUpdate.isPending ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleChangePassword}>
                  <div className="mb-7 flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF5EE] text-[#4EA674]">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Account Security
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Yangi va kuchli parol tanlang.
                      </p>
                    </div>
                  </div>

                  {(
                    [
                      {
                        name: "currentPassword",
                        label: "Current Password",
                        key: "current" as const,
                      },
                      {
                        name: "newPassword",
                        label: "New Password",
                        key: "new" as const,
                      },
                      {
                        name: "confirmPassword",
                        label: "Confirm New Password",
                        key: "confirm" as const,
                      },
                    ] as const
                  ).map((item) => (
                    <div className="mb-5" key={item.name}>
                      <label className={labelClass} htmlFor={item.name}>
                        {item.label}
                      </label>
                      <div className="relative">
                        <LockKeyhole
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          id={item.name}
                          name={item.name}
                          type={showPassword[item.key] ? "text" : "password"}
                          value={password[item.name]}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                          autoComplete={
                            item.name === "currentPassword"
                              ? "current-password"
                              : "new-password"
                          }
                          className={`${inputClass} mt-2 pr-12 pl-11`}
                          required
                        />
                        <button
                          type="button"
                          aria-label="Toggle password visibility"
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              [item.key]: !prev[item.key],
                            }))
                          }
                          className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                        >
                          {showPassword[item.key] ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                  <p className="mb-7 text-xs leading-5 text-gray-500">
                    Tavsiya: kamida 8 ta belgi, harflar va raqamlardan
                    foydalaning.
                  </p>

                  <div className="flex justify-end border-t border-gray-100 pt-6">
                    <button
                      type="submit"
                      disabled={changePasswordMutation.isPending}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4EA674] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3d925f] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {changePasswordMutation.isPending ? (
                        <LoaderCircle className="animate-spin" size={18} />
                      ) : (
                        <LockKeyhole size={18} />
                      )}

                      {changePasswordMutation.isPending
                        ? "Updating..."
                        : "Update Password"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
