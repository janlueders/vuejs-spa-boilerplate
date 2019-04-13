<template>
    <div id="wrapper" v-bind:class="[istoggled ? 'toggled' : '']">
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li><h1 style="color:grey">NO NAME</h1></li>
                <router-link tag="li" v-for="item in items" :to="{path:item.path}" :key="item.name">
                    <a><span class="fas fa-angle-double-right topmenu"></span>{{ $t(item.name) }}
                        <span v-if="item.childs.length > 0"
                              class="pull-right fa fa-angle-down"
                              @click="toggleChildren" ></span>
                    </a>
                    <ul v-if="item.childs.length > 0" v-bind:class="[isCollapsed ? 'notShown' : 'shown']">
                        <router-link tag="li" v-for="child in item.childs" :to="{path:child.path}" :key="child.name">
                            <a><span class="fa fa-code-merge"></span> {{ $t(child.name) }}</a>
                        </router-link>
                    </ul>
                </router-link>
            </ul>
        </div>
        <b-navbar type="dark" variant="dark">
            <b-button @click="toggleNav" variant="outline-light"><span class="fas fa-align-justify "></span></b-button>
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown v-bind:text=" $t('buttons.language' )" right >
                    <b-dropdown-item id="de" @click="changeLocale">DE</b-dropdown-item>
                    <b-dropdown-item id="en" @click="changeLocale">EN</b-dropdown-item>
                    <b-dropdown-item id="tur" @click="changeLocale">TÜR</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item href="/logout" right>Logout</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <div id="page-content-wrapper">

            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import configsys from '../../_conf/'

    export default {
        data(){
            return {
                istoggled: false,
                isCollapsed: true,
                items: []
            }
        },
        created(){
            this.mapRoutes(this.$router.options.routes);
        },
        methods: {
            toggleChildren(e){
                e.preventDefault();
                this.isCollapsed = !this.isCollapsed;
            },
            toggleNav(){
                this.istoggled = !this.istoggled;
            },
            mapRoutes(routes){

                // this could maybe done better
                routes.forEach((value) => {
                    if(value.meta.menu){
                        if(value.name !== "Lobby"){
                            let newItem = {
                                name: ""+value.name+"",
                                meta: value.meta,
                                path: ""+value.path+"",
                                childs:[]
                            }
                            this.items.push(newItem);
                        }

                        if(value.children !== undefined){
                            value.children.forEach((val) => {
                                if(val.meta.menu){
                                    let newChild = {
                                        name: val.name,
                                        meta: val.meta,
                                        path: val.path,
                                        childs:[]
                                    }
                                    if(val.children !== undefined){
                                        val.children.forEach((v) => {
                                            let subChild = {
                                                name: v.name,
                                                meta: v.meta,
                                                path: v.path
                                            }

                                            newChild.childs.push(subChild);
                                        });
                                    }

                                    this.items.push(newChild);
                                }
                            });
                        }
                    }
                });
            },
            changeLocale(event){
                event.preventDefault();
                localStorage.setItem(configsys.localStorageKeys.language,event.target.id);
                this.$i18n.locale = event.target.id;
            }
        }
    }
</script>
<style>
    #wrapper {
        padding-left: 0;
        -webkit-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;
    }

    #wrapper.toggled {
        padding-left: 250px;
    }

    #page-content-wrapper {
        width: 100%;
        position: absolute;
        list-style: none;
    }

    #wrapper.toggled #page-content-wrapper {
        position: absolute;
        margin-right: -250px;
    }
    #sidebar-wrapper {
        z-index: 1000;
        position: fixed;
        left: 250px;
        width: 0;
        height: 100%;
        margin-left: -250px;
        overflow-y: auto;
        background: #343a40 !important;
        -webkit-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;
    }

    .navbar-default{
        background-color: initial;
        border: none;
    }

    .sidebar-nav {
        position: absolute;
        top: 0;
        width: 250px;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .sidebar-nav li {
        text-indent: 10px;
        line-height: 40px;
    }

    .sidebar-nav li a {
        display: block;
        text-decoration: none;
        color: #999999;
    }

    .sidebar-nav li a span:last-child.pull-right{
        width: 46%;
        color: white;
        height: 32px;
    }

    .sidebar-nav li ul{
        text-indent: 0px;
        list-style: none;
    }

    .sidebar-nav li ul.notShown{
        display: none;
    }

    .sidebar-nav li ul.shown{
        display: block;
    }

    .sidebar-nav li ul li{
        margin-left: -4.5vh;
        color: white;
    }

    .sidebar-nav li a:hover {
        text-decoration: none;
        color: #fff;
        background: rgba(255,255,255,0.2);
    }

    .sidebar-nav li a:active,
    .sidebar-nav li a:focus {
        text-decoration: none;
    }

    .topmenu{
        padding-right: 3px;
        display: initial;
    }

    @media(min-width:768px) {
        #wrapper {
            padding-left: 250px;
        }

        #wrapper.toggled {
            padding-left: 0;
        }

        #sidebar-wrapper {
            width: 250px;
        }

        #wrapper.toggled #sidebar-wrapper {
            width: 0;
        }

        #page-content-wrapper {
            position: relative;
        }

        #wrapper.toggled #page-content-wrapper {
            position: relative;
            margin-right: 0;
        }

        .sidebar-nav li ul.notShown{
            display: none;
        }

        .sidebar-nav li ul.shown{
            display: block;
        }
    }

    @media(max-width: 768px){
        #sidebar-wrapper {
            left: 0;
            overflow-y: inherit;
            position: static;

        }

        .sidebar-nav {
            background-color: #343a40 !important;
            height: 100%;
        }

        .newMargin{
            margin-right:250px;
            -webkit-transition: all 0.5s ease;
            -moz-transition: all 0.5s ease;
            -o-transition: all 0.5s ease;
            transition: all 0.5s ease;
        }

        .smooveBack{
            -webkit-transition: all 0.5s ease;
            -moz-transition: all 0.5s ease;
            -o-transition: all 0.5s ease;
            transition: all 0.5s ease;
        }
    }
</style>
