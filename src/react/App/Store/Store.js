//add localStorage
let offlineStorage = {
  setItem: (key, value) => {
    return new Promise((resolve, reject) => {
      localStorage.setItem(key, value);
      resolve({ key, value });
    });
  },
  getItem: key => {
    return new Promise((resolve, reject) => {
      resolve(localStorage.getItem(key));
    });
  }
};

export default class RootStore {
  constructor({
    authUiStore,
    authDomainStore,
    crudDomainStore,
    socketDomainStore,
    adminDomainStore
  }) {
    this.authUiStore = new authUiStore(this);
    this.authDomainStore = new authDomainStore(this, offlineStorage);
    this.crudDomainStore = new crudDomainStore(this);
    this.socketDomainStore = new socketDomainStore(this);
    this.adminDomainStore = new adminDomainStore(this);
    this.authDomainStore.storeToken();
    this.authDomainStore.isAuthenticated();
  }
}
