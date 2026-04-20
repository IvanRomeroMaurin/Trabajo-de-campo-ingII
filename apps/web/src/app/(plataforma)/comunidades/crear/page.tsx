import { CreateCommunityForm } from '@/features/comunidades/components/CreateCommunityForm';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { comunidadService } from '@/features/comunidades/services/comunidadService';

export default async function CrearComunidadPage() {
  const categorias = await comunidadService.getCategorias();

  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Navegación y Cabecera */}
        <header className="mb-12">
          <Link 
            href="/comunidades" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver al panel
          </Link>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center shadow-lg shadow-slate-900/10">
                <Sparkles size={24} className="text-sky-400 fill-sky-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
                Crear nueva comunidad
              </h1>
            </div>
            <p className="text-slate-600 text-lg font-medium max-w-xl">
              Configurá tu espacio, personalizá su estilo y empezá a compartir conocimiento con tu audiencia.
            </p>
          </div>
        </header>

        {/* Formulario */}
        <CreateCommunityForm categorias={categorias} />

      </div>
    </div>
  );
}
