import { comunidadService } from '@/features/comunidades/services/comunidadService';
import { CommunityCard } from '@/features/comunidades/components/CommunityCard';
import { Sparkles, Plus } from 'lucide-react';
import Link from 'next/link';
import { IComunidad } from '@repo/types';

export default async function MisComunidadesPage() {
  let comunidades: IComunidad[] = [];
  try {
    comunidades = await comunidadService.getMisComunidades();
  } catch {
    console.error('Error fetching mis comunidades');
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera del Dashboard */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
              Mis <span className="text-sky-600">Comunidades</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-xl">
              Gestioná tus espacios, monitoreá tus suscriptores y creá nuevas experiencias de aprendizaje.
            </p>
          </div>

          <Link
            href="/comunidades/crear"
            className="flex items-center gap-3 px-8 py-4 bg-slate-950 text-white font-black rounded-2xl shadow-xl shadow-slate-900/10 hover:-translate-y-1 transition-all group w-full md:w-auto justify-center"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            Nueva Comunidad
          </Link>
        </header>

        {/* Contenido principal */}
        {comunidades.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {comunidades.map((comunidad) => (
              <CommunityCard key={comunidad.id_comunidad} community={comunidad} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300">
              <Sparkles size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">Aún no tenés comunidades</h3>
              <p className="text-slate-500 font-medium">
                Empezá hoy mismo a construir tu propia audiencia y compartir tu conocimiento.
              </p>
            </div>
            <Link
              href="/comunidades/crear"
              className="mt-4 text-sky-600 font-black flex items-center gap-2 hover:gap-3 transition-all"
            >
              Crear mi primera comunidad <Plus size={18} />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
