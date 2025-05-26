import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCombatsFromStage } from "../service/service";
import type { enemy } from "../types/enemy";

export default function Stage() {
  const { id } = useParams();

  const {
    data: combats,
    isLoading,
    isError,
    error,
  } = useQuery<{ [key: string]: enemy[] }>({
    queryKey: ["combats", id],
    queryFn: () => fetchCombatsFromStage(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <p className="text-white p-8">Cargando stage...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500 p-8">
        Error al cargar combates: {(error as Error).message}
      </p>
    );
  }

  const combatKeys = Object.keys(combats!).sort(
    (a, b) => Number(a.replace("combat", "")) - Number(b.replace("combat", ""))
  );

  return (
    <main className="text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Stage: {id}</h1>
      <p className="mb-6 text-lg">Total de combates: {combatKeys.length}</p>

      {combatKeys.map((combatId) => (
        <section key={combatId} className="mb-8 border-b border-white/20 pb-4">
          <h2 className="text-2xl font-semibold mb-2">
            {combatId.toUpperCase()}
          </h2>
          <ul className="list-disc pl-6">
            {combats![combatId].map((enemy, i) => (
              <li key={i} className="mb-1">
                <span className="font-bold">{enemy.nombre}</span> — ❤️{" "}
                {enemy.vida} | ⚔️ {enemy.ataque} | 🛡️ {enemy.defensa} | 🏃{" "}
                {enemy.velocidad}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
