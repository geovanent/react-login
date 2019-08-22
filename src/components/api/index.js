import Rest from './Rest';

export default class Api {
    constructor({ baseUrl }) {
        //Init Paths
        //'https://randomuser.me'
        this.api = new Rest({ url: baseUrl })
        this.api.createEntity({name: 'user', path: '/users?delay=5'});
    }

    getProfile() {
        return this.api.endpoints.user.getAll({});
    }
}