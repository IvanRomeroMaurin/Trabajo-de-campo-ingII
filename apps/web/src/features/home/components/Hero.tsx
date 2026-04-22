import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-4.5rem)] flex items-center overflow-hidden bg-white py-12 md:py-0">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 blur-3xl rounded-full translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Main Content Area */}
          <div className="lg:col-span-7 pr-0 lg:pr-10">

            <h1 className="font-display text-6x md:text-8xl font-black text-slate-950 leading-[1.1] tracking-tighter mb-10">
              Domina la <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">tecnología</span> <br />
              <span className="text-slate-400/80">en comunidad.</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-lg mb-14 leading-relaxed font-medium">
              Komu es el ecosistema donde expertos y aprendices convergen.
              Suscripciones directas a comunidades de conocimiento de alto impacto.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/explorar" className="btn-primary w-full sm:w-auto py-5 px-12 text-lg bg-slate-950 hover:bg-sky-600 transition-colors">
                Unirme Comunidad
                <ArrowRight size={20} />
              </Link>

              <Link
                href="/comunidades/crear"
                className="btn-outline w-full sm:w-auto py-5 px-12 text-lg border-2 border-slate-200 block text-center"
              >
                Crear Comunidad
              </Link>
            </div>
          </div>

          {/* Personality Elements / Composition Area */}
          <div className="lg:col-span-5 relative mt-16 lg:mt-0">
            {/* The Main "Tech Hub" Card */}
            <div className="relative z-10 rounded-[2.5rem] border border-white/20 bg-white/5 p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] backdrop-blur-3xl overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-700">
              <Image
                src="/assets/hero_komu_main.png"
                alt="Komu Hub Experience"
                width={800}
                height={600}
                className="w-full h-auto rounded-[2rem] shadow-2xl shadow-slate-900/10"
                priority
              />
            </div>

            {/* Floating Decorative Cards */}
            <div className="absolute -top-12 -right-6 z-20 bg-white/80 backdrop-blur-xl border border-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-float" style={{ animationDelay: '0s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/30">
                  <Zap size={20} className="fill-current" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Status</div>
                  <div className="text-sm font-bold text-slate-900">100% Online</div>
                </div>
              </div>
            </div>

            <div className="absolute -left-12 -bottom-6 z-20 bg-white/80 backdrop-blur-xl border border-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold overflow-hidden shadow-sm">
                      <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="user" width={40} height={40} />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Comunidades Activas</div>
                  <div className="text-sm font-bold text-slate-900">+1.2k Usuarios</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
