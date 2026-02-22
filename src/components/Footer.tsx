// src/components/Footer.tsx
import { Leaf, FileText } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-16 text-center text-slate-500 text-sm font-medium">
      <div className="mb-6">
        <span className="text-xl font-extrabold text-emerald-700 block mb-3 flex items-center justify-center">
          <Leaf className="mr-2 text-emerald-500" size={20} /> 桑都塾 / Souto Juku
        </span>
        <p className="text-slate-500">代表：河内 悠眞 (個人事業主) / 八王子発</p>
      </div>
      <div className="flex justify-center gap-6 mb-8">
        <a href="https://www.soutojuku.com/_files/ugd/9606e3_81d373de02ec4a4bacceb7a159507197.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 font-bold flex items-center transition-colors">
          <FileText size={16} className="mr-1.5"/> 入塾約款
        </a>
      </div>
      <div className="text-xs text-slate-400">
        © {new Date().getFullYear()} Soutojuku. Powered by Next.js & AI.
      </div>
    </footer>
  );
};