<template>
        <b-row class="mt-3">
            <b-col>
                Hello World
            </b-col>
        </b-row>
</template>

<script>
    import configsys from '../../_conf/';
    export default {
        name: 'Home',
        data(){
            return {
                isAdmin: false,
            }
        },
        created() {
            if(localStorage.getItem(configsys.localStorageKeys.role) === "admin"){
                this.isAdmin = true;
            }
        }
    }
</script>
