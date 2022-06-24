import { useCounterStoreSetup } from './countStore';
import { roleStore } from './roleStore/index';

export interface IAppStore {
  useCounterStoreSetup: ReturnType<typeof useCounterStoreSetup>;
  roleStore: ReturnType<typeof roleStore>;
}

const appStore: IAppStore = {} as IAppStore;

/**
 *
 *注册 app 状态库
 */

export const registerStore = () => {
  appStore.useCounterStoreSetup = useCounterStoreSetup();
  appStore.roleStore = roleStore();
};

export default appStore;
