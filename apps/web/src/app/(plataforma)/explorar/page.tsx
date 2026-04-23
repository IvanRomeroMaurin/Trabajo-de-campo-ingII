import { ExplorarContent } from '@/features/comunidades/components/ExplorarContent';
import { comunidadService } from '@/features/comunidades/services/comunidadService';
import { IComunidad, ICategoriaComunidad } from '@repo/types';

export const metadata = {
  title: 'Explorar – Komu',
  description: 'Descubrí comunidades de expertos y aprendé junto a otros profesionales.',
};

export default async function ExplorarPage() {
  // Fetching de datos en el servidor
  let comunidades: IComunidad[] = [];
  let categorias: ICategoriaComunidad[] = [];

  try {
    const results = await Promise.all([
      comunidadService.getComunidades(),
      comunidadService.getCategorias(),
    ]);
    comunidades = results[0];
    categorias = results[1];
  } catch {
    console.error('Error al cargar datos de exploración');
    // En caso de error, mostramos listas vacías para no romper la UI
  }

  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Cabecera de la página */}
        <header className="mb-20 text-left">
          <h1 className="font-display text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-950 leading-tight">
            Descubrí tu próxima <br />
            <span className="text-sky-600">comunidad de expertos</span>
          </h1>
          <p className="text-slate-600 max-w-2xl text-lg leading-relaxed font-medium">
            Unite a grupos liderados por mentores activos, compartí recursos y aprendé junto a miles de profesionales.
          </p>
        </header>

        {/* Contenido interactivo (Búsqueda, Filtros y Grilla) */}
        <ExplorarContent
          comunidadesIniciales={comunidades}
          categorias={categorias}
        />

      </div>
    </div>
  );
}
