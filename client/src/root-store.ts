
import { createContext, useContext } from "react";
import HomeStore from "./stores/HomeStore";
import ServiceStore from "./stores/ServiceStore";
import AuthStore from "./stores/AuthStore";
import UserStore from "./stores/UserStore";

export class RootStore {
    home: HomeStore;
    service: ServiceStore;
    auth: AuthStore;
    user: UserStore
  
    constructor() {
      this.home = new HomeStore()
      this.service = new ServiceStore()
      this.auth = new AuthStore()
      this.user = new UserStore()
    }
}
  
export const rootStore = new RootStore();
export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);