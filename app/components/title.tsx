import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllStages } from "../service/service";
import Button from "../components/button";

function Title() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const {
    data: stages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stages"],
    queryFn: fetchAllStages,
  });

  const firstStageId = stages?.[0];

  return (
    <div className="text-white text-center space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: isHovered ? [0, -6, 0] : 0,
        }}
        transition={{
          duration: isHovered ? 0.4 : 0.8,
          repeat: isHovered ? Infinity : 0,
          repeatType: "loop",
        }}
        className="text-4xl md:text-6xl font-bold tracking-wider"
      >
        THIS IS <br />
        THE <span className="text-5xl md:text-7xl">ONE</span>
      </motion.h1>

      <motion.img
        src="/logos/logoA.png"
        alt="logogame"
        className="w-80 h-auto mx-auto mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="mt-10 flex justify-center"
      >
        <Button
          onClick={() => firstStageId && navigate(`/stage/${firstStageId}`)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variant="secondary"
          className="text-4xl px-20 py-5"
          disabled={isLoading || !firstStageId}
        >
          {isLoading ? "Cargando..." : "START DEMO"}
        </Button>
      </motion.div>

      {isError && (
        <p className="text-red-500 text-sm mt-2">Error al cargar los stages</p>
      )}
    </div>
  );
}

export default Title;
