import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCombatsFromStage, fetchHero } from "../service/service";
import type { enemy } from "../types/enemy";
import type { Hero } from "../types/hero";

import Character from "../components/character";
import BattleControls from "../components/battleControls";
import BattleHeader from "../components/battleHeader";
import ResponseBox from "../components/responseBox";

export default function Stage() {
  const { id } = useParams(); // Ej: "stage1"

  const {
    data: combats,
    isLoading: loadingCombats,
    isError: errorCombats,
    error: combatError,
  } = useQuery<{ [key: string]: enemy[] }>({
    queryKey: ["combats", id],
    queryFn: () => fetchCombatsFromStage(id!),
    enabled: !!id,
  });

  const {
    data: hero,
    isLoading: loadingHero,
    isError: errorHero,
    error: heroError,
  } = useQuery<Hero>({
    queryKey: ["hero"],
    queryFn: fetchHero,
  });

  const currentCombatIndex = 0;
  const currentTurn = 1;

  if (loadingCombats || loadingHero) {
    return <p className="text-white p-8">Cargando...</p>;
  }

  if (errorCombats || errorHero || !hero || !combats) {
    return (
      <p className="text-red-500 p-8">
        Error:{" "}
        {(combatError as Error)?.message ||
          (heroError as Error)?.message ||
          "Datos no disponibles"}
      </p>
    );
  }

  const combatKeys = Object.keys(combats!).sort(
    (a, b) => Number(a.replace("combat", "")) - Number(b.replace("combat", ""))
  );

  const stageNumber = Number(id?.replace("stage", "")) || 1;
  const combatNumber = currentCombatIndex + 1;
  const enemies = combats![combatKeys[currentCombatIndex]];

  return (
    <main className="relative min-h-screen flex flex-col justify-between items-center bg-black overflow-hidden">
      <img
        src="/fondo.png"
        alt="Background"
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="w-full z-10 mt-12 px-6">
        <BattleHeader
          turn={currentTurn}
          stage={stageNumber}
          combat={combatNumber}
        />
      </div>

      <div className="z-10 flex justify-around items-center w-full px-8 py-12">
        <Character
          name={hero.nombre}
          sprite={hero.sprite}
          health={hero.vida}
          stamina={hero.aguante}
        />
        {enemies.length > 0 && (
          <Character
            name={enemies[0].nombre}
            sprite={enemies[0].sprite}
            health={enemies[0].vida}
          />
        )}
      </div>

      <div className="z-10 w-full px-8 py-8 flex flex-col items-center gap-6 bg-gradient-to-b from-black/80 to-black rounded-xl">
        <div className="flex gap-6 justify-center flex-wrap">
          <BattleControls />
        </div>
        <ResponseBox text="What do you do?" />
      </div>
    </main>
  );
}
