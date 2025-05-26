import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
        index("routes/home.tsx"),
        route("reward", "routes/reward.tsx"),
        route("stage/:id", "routes/stage.tsx"),
] satisfies RouteConfig;
