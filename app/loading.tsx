export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ffccb6]">
      <div className="text-center">
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-[#fff5f0] border-t-[#fa9b71] rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-[#616d48] font-semibold">Cargando...</p>
      </div>
    </div>
  );
}
