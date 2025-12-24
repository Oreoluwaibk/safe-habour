export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="w-10 h-10 border-4 border-white/40 border-t-white rounded-full animate-spin" />
    </div>
  );
}
