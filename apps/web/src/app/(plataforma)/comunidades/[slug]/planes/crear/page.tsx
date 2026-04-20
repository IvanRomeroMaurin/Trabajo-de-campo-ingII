import { CreatePlanForm } from '@/features/planes/components/CreatePlanForm';
import { CreditCard, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { comunidadService } from '@/features/comunidades/services/comunidadService';
import { planService } from '@/features/planes/services/planService';
import { notFound } from 'next/navigation';
import { IComunidad, ICicloPago } from '@repo/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CrearPlanPage({ params }: Props) {
  const { slug } = await params;

  let comunidad: IComunidad;
  let ciclos: ICicloPago[] = [];
  
  try {
    const [comunidadRes, ciclosRes] = await Promise.all([
      comunidadService.getComunidadBySlug(slug),
      planService.getCiclosPago()
    ]);
    comunidad = comunidadRes;
    ciclos = ciclosRes;
  } catch (error) {
    console.error('Error cargando datos para el plan:', error);
    return notFound();
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
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/10">
                <CreditCard size={24} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
                Nuevo Plan de Suscripción
              </h1>
            </div>
            <p className="text-slate-600 text-lg font-medium max-w-xl">
              Configurá los detalles de pago, la recurrencia y activá tu comunidad en el mercado.
            </p>
          </div>
        </header>

        {/* Formulario */}
        <div className="relative">
          {/* Decoración de fondo */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-60" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-50 rounded-full blur-3xl -z-10 opacity-60" />
          
          <CreatePlanForm 
            idComunidad={comunidad.id_comunidad} 
            slug={slug} 
            ciclos={ciclos} 
          />
        </div>

        {/* Nota informativa */}
        <footer className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
            <Sparkles size={20} />
          </div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Al crear este plan, se generará automáticamente un <span className="font-bold text-slate-700">Preapproval Plan</span> en Mercado Pago usando tus credenciales de vendedor vinculadas.
          </p>
        </footer>

      </div>
    </div>
  );
}
