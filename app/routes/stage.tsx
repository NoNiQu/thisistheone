import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCombatsFromStage, fetchHero } from "../service/service";
import { calculateDamage } from "../utiles/combat";

import type { enemy } from "../types/enemy";
import type { Hero } from "../types/hero";

import Character from "../components/character";
import BattleControls from "../components/battleControls";
import BattleHeader from "../components/battleHeader";
import ResponseBox from "../components/responseBox";
import VictoryModal from "../components/victoryModal";
import VictoryStageModal from "../components/victoryStageModal";
import DefeatModal from "../components/defeatModal";

export default function Stage() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [currentCombatIndex, setCurrentCombatIndex] = useState(0);
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean | null>(null);
  const [turnCount, setTurnCount] = useState(1);
  const [logMessage, setLogMessage] = useState("The battle begins!");
  const [currentEnemyHealth, setCurrentEnemyHealth] = useState<number | null>(
    null
  );
  const [currentHeroHealth, setCurrentHeroHealth] = useState<number | null>(
    null
  );
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [stageCompleted, setStageCompleted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [playerAttacking, setPlayerAttacking] = useState(false);
  const [playerHit, setPlayerHit] = useState(false);
  const [playerDefending, setPlayerDefending] = useState(false);
  const [enemyHit, setEnemyHit] = useState(false);

  const combatKeys = Object.keys(combats ?? {}).sort(
    (a, b) => Number(a.replace("combat", "")) - Number(b.replace("combat", ""))
  );
  const enemies = combats?.[combatKeys[currentCombatIndex]] ?? [];
  const enemy = enemies[currentEnemyIndex] ?? null;

  useEffect(() => {
    if (enemy && hero) {
      if (currentEnemyHealth === null) setCurrentEnemyHealth(enemy.vida);
      if (currentHeroHealth === null) setCurrentHeroHealth(hero.vida);
      if (isPlayerTurn === null) {
        const playerFirst = hero.velocidad >= enemy.velocidad;
        setIsPlayerTurn(playerFirst);
        setLogMessage(playerFirst ? "You go first!" : `Enemy goes first!`);
        if (!playerFirst) setTimeout(enemyTurn, 1000);
      }
    }
  }, [hero, enemy, isPlayerTurn, currentEnemyHealth, currentHeroHealth]);

  function enemyTurn() {
    const dmg = calculateDamage(enemy.ataque, hero.defensa);
    setPlayerHit(true);
    const newHeroHealth = Math.max((currentHeroHealth ?? 0) - dmg, 0);
    setCurrentHeroHealth(newHeroHealth);
    setLogMessage(`You take ${dmg} damage.`);
    setTimeout(() => setPlayerHit(false), 300);
    if (newHeroHealth <= 0) {
      setTimeout(() => setIsGameOver(true), 800);
      return;
    }
    setTimeout(() => {
      setTurnCount((prev) => prev + 1);
      setIsPlayerTurn(true);
    }, 1000);
  }

  function handleAttack() {
    if (!isPlayerTurn || !enemy) return;
    const dmg = calculateDamage(hero.ataque, enemy.defensa);
    const newHealth = Math.max((currentEnemyHealth ?? 0) - dmg, 0);
    setPlayerAttacking(true);
    setEnemyHit(true);
    setCurrentEnemyHealth(newHealth);
    setLogMessage(`You attack deals ${dmg} damage!`);
    setIsPlayerTurn(false);
    setTimeout(() => {
      setPlayerAttacking(false);
      setEnemyHit(false);
    }, 300);

    if (newHealth <= 0) {
      if (currentEnemyIndex + 1 < enemies.length) {
        setTimeout(() => {
          setCurrentEnemyIndex((prev) => prev + 1);
          setCurrentEnemyHealth(null);
          setIsPlayerTurn(null);
          setLogMessage("A new enemy appears!");
        }, 800);
      } else {
        setTimeout(() => {
          setLogMessage(`You defeated the enemy!`);
          setShowVictoryModal(true);
        }, 800);
      }
      return;
    }

    setTimeout(() => {
      setTurnCount((prev) => prev + 1);
      enemyTurn();
    }, 1000);
  }

  function handleDefend() {
    if (!isPlayerTurn || !enemy) return;
    setPlayerDefending(true);
    setLogMessage("You brace for the next attack!");
    const boostedDef = hero.defensa * 2;
    setIsPlayerTurn(false);

    setTimeout(() => {
      const dmg = calculateDamage(enemy.ataque, boostedDef);
      setPlayerHit(true);
      const newHeroHealth = Math.max((currentHeroHealth ?? 0) - dmg, 0);
      setCurrentHeroHealth(newHeroHealth);
      setLogMessage(`You take ${dmg} damage.`);
      setTimeout(() => {
        setPlayerHit(false);
        setPlayerDefending(false);
      }, 300);

      if (newHeroHealth <= 0) {
        setTimeout(() => {
          setIsGameOver(true);
        }, 800);
        return;
      }

      setTimeout(() => {
        setTurnCount((prev) => prev + 1);
        setIsPlayerTurn(true);
      }, 1000);
    }, 1000);
  }

  function handleNextBattle() {
    const nextIndex = currentCombatIndex + 1;
    if (nextIndex >= combatKeys.length) {
      setStageCompleted(true);
      return;
    }
    setCurrentCombatIndex(nextIndex);
    setCurrentEnemyIndex(0);
    setCurrentEnemyHealth(null);
    setCurrentHeroHealth(hero.vida);
    setTurnCount(1);
    setIsPlayerTurn(null);
    setLogMessage("Prepare for the next battle!");
    setShowVictoryModal(false);
  }

  // ✅ Aquí empieza el render — ya todos los hooks se ejecutaron

  if (!id) {
    return <p className="text-white p-8">Esperando ID del stage...</p>;
  }

  if (loadingCombats || loadingHero) {
    return <p className="text-white p-8">Cargando...</p>;
  }

  if (errorCombats || errorHero || !hero || !combats) {
    console.error("Error cargando datos", combatError || heroError);
    return (
      <p className="text-red-500 p-8">
        Error: {combatError?.message || heroError?.message || "Error de carga"}
      </p>
    );
  }

  if (!enemy) {
    return <p className="text-white p-8">No hay enemigos en este combate.</p>;
  }

  return (
    <main className="relative min-h-screen flex flex-col justify-between items-center bg-black overflow-hidden">
      <img
        src="/fondo.png"
        alt="Background"
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="w-full z-10 mt-12 px-6">
        <BattleHeader
          turn={turnCount}
          stage={Number(id?.replace("stage", "")) || 1}
          combat={currentCombatIndex + 1}
        />
      </div>
      <div className="z-10 flex justify-around items-center w-full px-8 py-12">
        <Character
          name={hero.nombre}
          sprite={hero.sprite}
          health={currentHeroHealth ?? hero.vida}
          stamina={hero.aguante}
          isAttacking={playerAttacking}
          isHit={playerHit}
          isDefending={playerDefending}
        />
        <Character
          name={enemy.nombre}
          sprite={enemy.sprite}
          health={currentEnemyHealth ?? enemy.vida}
          isHit={enemyHit}
        />
      </div>
      <div className="z-10 w-full px-8 py-8 flex flex-col items-center gap-6 bg-gradient-to-b from-black/80 to-black rounded-xl">
        <BattleControls
          onAttack={handleAttack}
          onDefend={handleDefend}
          disabled={
            !isPlayerTurn || showVictoryModal || stageCompleted || isGameOver
          }
        />
        <ResponseBox text={logMessage} />
      </div>
      {showVictoryModal && (
        <VictoryModal enemyName={enemy.nombre} onNext={handleNextBattle} />
      )}
      {stageCompleted && <VictoryStageModal onContinue={() => navigate("/")} />}
      {isGameOver && <DefeatModal onRestart={() => navigate("/")} />}
    </main>
  );
}
