import network from '../network'
import configsys from '../_conf';

export const auth = {

    async login(creds) {

        return new Promise((resolve) =>{
            network.post(configsys.apiRoutes.login,creds).then(response =>{

                let succeded = false;

                if(response.data.error === undefined && response.data.token !== undefined){

                    // used for simple auth
                    localStorage.setItem(configsys.localStorageKeys.accesstoken, response.data.token);
                    localStorage.setItem(configsys.localStorageKeys.role,response.data.role);
                    succeded = true;
                }

                resolve(succeded)
            });
        });
    },

    logout() {
        network.post(configsys.apiRoutes.logout,'').then(() => {
            localStorage.removeItem(configsys.localStorageKeys.accesstoken)
            localStorage.removeItem(configsys.localStorageKeys.role)
        });
    },

    verifyAuth(){
        return new Promise((resolve) => {

            network.post(configsys.apiRoutes.verify, '').then(response => {
                resolve(response.data);
            });
        });
    }
}
