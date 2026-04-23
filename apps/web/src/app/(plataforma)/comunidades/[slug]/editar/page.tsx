import { EditCommunityForm } from '@/features/comunidades/components/EditCommunityForm';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { comunidadService } from '@/features/comunidades/services/comunidadService';
import { notFound } from 'next/navigation';
import { IComunidad, ICategoriaComunidad } from '@repo/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditarComunidadPage({ params }: Props) {
  const { slug } = await params;

  let comunidad: IComunidad;
  let categorias: ICategoriaComunidad[];

  try {
    comunidad = await comunidadService.getComunidadBySlug(slug);
    categorias = await comunidadService.getCategorias();
  } catch {
    return notFound();
  }

  // Comprobar que sea el creador visualizando si la comunidad está en sus comunidades.
  let misComunidades: IComunidad[] = [];
  try {
    misComunidades = await comunidadService.getMisComunidades();
  } catch {}

  const isCreator = misComunidades.some((c) => c.id_comunidad === comunidad.id_comunidad);

  if (!isCreator) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 text-slate-900 font-medium">
        No tienes permisos para editar esta comunidad.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Navegación y Cabecera */}
        <header className="mb-12">
          <Link 
            href={`/comunidades/${slug}`} 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver a la comunidad
          </Link>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center shadow-lg shadow-neutral-900/10">
                <Sparkles size={24} className="text-white fill-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
                Editar comunidad
              </h1>
            </div>
            <p className="text-slate-600 text-lg font-medium max-w-xl">
              Modifica la información básica, categoría o imagen de portada de tu comunidad.
            </p>
          </div>
        </header>

        {/* Formulario */}
        <EditCommunityForm categorias={categorias} comunidad={comunidad} />

      </div>
    </div>
  );
}
