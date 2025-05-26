export interface Reward {
    id: string; 
    name: string; 
    description: string;
    effect: Map<string, any>; 
    sprite: string;
    type: string; 
    ataque?: number;
    defensa?: number;
    velocidad?: number;
}
export const fuerzaMuscular: Reward = {
    id: "fuerza_muscular",
    name: "Fuerza Muscular",
    description: "Aumenta el ataque en 5 puntos.",
    effect: new Map<string, any>([
        ["ataque", 5]
    ]),
    sprite: "/reward_fuerza.png",
    type: "buff",
    ataque: 5
};
export const refuerzoDefensivo: Reward = {
    id: "refuerzo_defensivo",
    name: "Refuerzo Defensivo",
    description: "Aumenta la defensa en 5 puntos.",
    effect: new Map<string, any>([
        ["defensa", 5]
    ]),
    sprite: "/reward_defensa.png",
    type: "buff",
    defensa: 5
};
export const velocidadSuprema: Reward = {
    id: "impulso_veloz",
    name: "impulso_veloz",
    description: "Aumenta la velocidad en 2 puntos.",
    effect: new Map<string, any>([
        ["velocidad", 2]
    ]),
    sprite: "/reward_velocidad.png",
    type: "buff",
    velocidad: 2
}