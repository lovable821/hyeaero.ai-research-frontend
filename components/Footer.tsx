import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex-shrink-0 border-t border-slate-200 bg-white py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between text-sm text-slate-500">
        <Link href="https://www.hye.aero/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          hye.aero
        </Link>
        <span>© {new Date().getFullYear()} HyeAero.AI</span>
      </div>
    </footer>
  );
}
