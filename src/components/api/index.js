import Rest from './Rest';
const api = new Rest({ url:'https://randomuser.me' })

export default class Api {
    constructor() {
        //Init Paths
        api.createEntity({name: 'user', path: '/api'});
    }

    getCharacters() {
        return api.endpoints.characters.getAll();
    }
}