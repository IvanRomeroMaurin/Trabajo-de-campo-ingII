import Link from "next/link";
import { Sparkles } from "lucide-react";
import { KomuLogo } from "./KomuLogo";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <KomuLogo size={36} light={true} />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
              El ecosistema de suscripciones educativas donde el conocimiento técnico se comparte, valida y escala.
            </p>
            <div className="flex gap-3 mt-8">
              <div className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer text-slate-400 hover:text-white">
                𝕏
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer text-slate-400 hover:text-white">
                in
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer text-slate-400 hover:text-white text-xs">
                gh
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Producto</h4>
            <ul className="space-y-4">
              {['Explorar', 'Comunidades', 'Crear Nodo', 'Para Equipos'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 text-sm font-medium hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Legal</h4>
            <ul className="space-y-4">
              {['Privacidad', 'Términos de Uso', 'Cookies', 'Accesibilidad'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 text-sm font-medium hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-600 text-xs font-medium">
            © {new Date().getFullYear()} Komu. Todos los derechos reservados.
          </span>
          <span className="text-slate-700 text-xs font-medium">
            Ingeniería de Software II · Universidad Privada
          </span>
        </div>
      </div>
    </footer>
  );
}
