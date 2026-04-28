import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-oswald font-bold mb-4">404</h1>
      <p className="text-xl text-neutral-600 mb-8">Page not found.</p>
      <Link href="/" className="px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors uppercase tracking-widest font-medium">
        Return Home
      </Link>
    </div>
  );
}
