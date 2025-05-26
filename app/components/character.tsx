import { motion } from "framer-motion";
import BattleStat from "../components/battleStats";

type CharacterProps = {
  name: string;
  sprite: string;
  health: number;
  stamina?: number;
  flipped?: boolean;
  animateExit?: boolean;
  isAttacking?: boolean;
  isHit?: boolean;
  isDefending?: boolean;
};

export default function Character({
  name,
  sprite,
  health,
  stamina,
  flipped,
  animateExit = false,
  isAttacking = false,
  isHit = false,
  isDefending = false,
}: CharacterProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, x: flipped ? 100 : -100 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: isAttacking ? 1.1 : 1,
        rotate: isHit ? [0, -10, 10, -10, 0] : 0,
        backgroundColor: isDefending
          ? "rgba(100, 100, 255, 0.2)"
          : "transparent",
      }}
      exit={{ opacity: 0, x: 200 }}
      transition={{
        duration: isAttacking || isHit ? 0.2 : 0.6,
        type: "spring",
      }}
    >
      <div className="flex gap-6 mb-4">
        <BattleStat icon="/icons/heart-solid.svg" value={health} />
        {stamina !== undefined && (
          <BattleStat icon="/icons/bolt-solid.svg" value={stamina} />
        )}
      </div>

      <img
        src={sprite}
        alt={name}
        className={`w-80 h-auto ${
          flipped ? "scale-x-[-1]" : ""
        } transition-all duration-150`}
      />
    </motion.div>
  );
}
