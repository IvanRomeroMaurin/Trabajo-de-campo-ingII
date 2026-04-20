'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-20 pb-20 md:pt-32 md:pb-40">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 blur-3xl rounded-full translate-y-1/3 -translate-x-1/4" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Content Area */}
          <div className="lg:col-span-7 pr-0 lg:pr-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-black tracking-widest mb-12 uppercase shadow-2xl shadow-slate-900/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Nodos en tiempo real
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-black text-slate-950 leading-tight tracking-tighter mb-10 transition-all">
              Domina la <br />
              <span className="text-sky-600">tecnología</span> en <br />
              <span className="text-slate-400">comunidad.</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-lg mb-14 leading-relaxed font-medium">
              Komu es el ecosistema donde expertos y aprendices convergen. 
              Suscripciones directas a nodos de conocimiento de alto impacto.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/comunidades" className="btn-primary py-5 px-12 text-lg bg-slate-950 hover:bg-sky-600 transition-colors">
                Unirme a un Nodo
                <ArrowRight size={20} />
              </Link>
              <Link href="/register" className="btn-outline py-5 px-12 text-lg border-2 border-slate-200">
                Ver Ecosistema
              </Link>
            </div>
          </div>

          {/* Personality Elements / Composition Area */}
          <div className="lg:col-span-5 relative mt-16 lg:mt-0">
            {/* The Main "Tech Hub" Card */}
            <div className="relative z-10 rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200/60 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700">
              <Image 
                src="/assets/hero_tech.png" 
                alt="Product Preview"
                width={600}
                height={400}
                className="w-full h-auto rounded-3xl"
              />
            </div>

            {/* Floating Decorative Cards */}
            <div className="absolute -top-10 -right-10 z-20 glass-card p-5 shadow-2xl animate-float" style={{ animationDelay: '0s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <Zap size={20} className="fill-current" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-slate-400 tracking-wider">Server Status</div>
                  <div className="text-sm font-bold text-slate-900">100% Active</div>
                </div>
              </div>
            </div>

            <div className="absolute -left-12 bottom-20 z-20 glass-card p-5 shadow-2xl animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold overflow-hidden">
                       <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="user" width={36} height={36} />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-slate-400 tracking-wider">Top Mentors</div>
                  <div className="text-sm font-bold text-slate-900">+45 Expertos</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
