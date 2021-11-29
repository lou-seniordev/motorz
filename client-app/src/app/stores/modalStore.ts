import { action, observable } from 'mobx';
import { RootStore } from './rootStore';

export default class ModalStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  //shallow 13-11, 11:00
  @observable.shallow modal = {
    open: false,
    body: null,
    // size: '',
  };

  @action openModal = (content: any) => {//, size: string
      this.modal.open = true;
      this.modal.body = content;
      // this.modal.size = size;
  }

  @action closeModal = () => {
      this.modal.open = false;
      this.modal.body = null;
  }
}
