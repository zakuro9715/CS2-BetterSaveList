import { ModRegistrar } from "cs2/modding";
import { BetterSaveList } from "better-save-list/better-save-list";

const register: ModRegistrar = (moduleRegistry) => {

    moduleRegistry.extend("game-ui/menu/components/load-game-screen/save-list/save-list.tsx", 'SaveList', BetterSaveList);
}

export default register;