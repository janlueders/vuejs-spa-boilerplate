<template>
    <div class="page-wrap">
        <h1>403</h1>
        <h2>forbidden</h2>
        <p>Area 403! Guns in use, take care or die</p>
        <p><a v-bind:href="userRef">home</a></p>
    </div>
</template>

<script>
    import configsys from '../_conf/'
    export default {
        name: "Unauthorized",
        data(){
            return {
                userRef: ''
            }
        },
        created() {
            if(localStorage.getItem(configsys.localStorageKeys.accesstoken)){
                this.userRef = '/home';
            }else{
                this.userRef = '/';
            }
        }
    }
</script>

<style scoped>
    .page-wrap {
        margin: 0 auto;
        width: 100%;
        text-align: center;
    }

    p, a {
        font-size: 1em;
    }
    h1,h2{
        color: #F44336;
    }
    h2, a {
        text-transform: uppercase;
    }

    a {
        background: #E57373;
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        width: 88px;
        height: 44px;
        line-height: 44px;
        border-radius: 5px;
        border: 2px solid #fff;
        transition: all .5s ease;
    }

    a:hover {
        background: #E57373;
        border: 2px solid #E57373;
        width: 132px;
    }

    @media (min-width:320px) {
        h1 {font-size: 2em; }
        h2 {font-size: 1.5em; }
    }
    @media (min-width:480px) {
        h1 {font-size: 3em; }
        h2 {font-size: 1.75em; }
    }
    @media (min-width:600px) {
        h1 {font-size: 4em; }
        h2 {font-size: 2em; }
    }
    @media (min-width:801px) {
        h1 {font-size: 5em; }
        h2 {font-size: 3em; }
    }
    @media (min-width:1025px) {
        h1 {font-size: 6em; }
        h2 {font-size: 4em; }
    }
    @media (min-width:1281px) {
        h1 {font-size: 7em; }
        h2 {font-size: 5em; }
    }
</style>
