import { getModule } from "cs2/modding";
import { Icon, Button } from "cs2/ui"
export { Icon, Button }

type Component<Props = any> = (props: Props) => JSX.Element;
const getModuleComponent = <Props = any>(
  modulePath: string,
  exportName: string,
) => getModule(modulePath, exportName) as Component<Props>;

type Classes<T = any> = T;
const getModuleClasses = <T = any>(
  modulePath: string,
) => getModule(modulePath, "classes") as Classes<T>;

export const SaveItem =
  getModuleComponent("game-ui/menu/components/shared/save-item/save-item.tsx", "SaveItem")
export const saveItemClasses =
  getModuleClasses("game-ui/menu/components/shared/save-item/save-item.module.scss")
export const saveListClasses =
  getModuleClasses("game-ui/menu/components/load-game-screen/save-list/save-list.module.scss")
export const SaveListHeader =
  getModuleComponent("game-ui/menu/components/shared/save-list-header/save-list-header.tsx", "OrderingSaveListHeader")
export const useUniformSizeProvider =
  getModule("game-ui/common/scrolling/virtual-list/virtual-list-size-provider.ts", 'useUniformSizeProvider')
export const VirtualList =
    getModuleComponent("game-ui/common/scrolling/virtual-list/virtual-list.tsx", "VirtualList")
export const LocalizedTimestamp =
    getModuleComponent("game-ui/common/localization/localized-date.tsx", "LocalizedTimestamp");
export const FullWidthDigits =
    getModuleComponent("game-ui/common/text/full-width-digits/full-width-digits.tsx", "FullWidthDigits");
