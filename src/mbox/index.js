import { observable, action } from 'mobx'


class RootStore {
    @observable
    telephone = '';
    @observable
    uid = '';
    @observable
    lat = 0;
    @observable
    lon = 0;

    @action
    setUserInfo(telephone, uid) {
        this.telephone = telephone;
        this.uid = uid;
    }
}

export default new RootStore();