export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4EA674]">
          <span className="text-2xl font-bold text-white">S</span>
        </div>

        <span className="text-2xl font-bold text-[#023337]">Shop</span>
      </div>

      {/* Loading spinner */}
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#E5F1EA]" />

        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#4EA674]" />
      </div>

      <p className="mt-5 text-sm font-medium text-[#023337]">
        Sayt yuklanmoqda...
      </p>

      <p className="mt-2 text-xs text-gray-400">Iltimos, kuting</p>
    </div>
  );
}
