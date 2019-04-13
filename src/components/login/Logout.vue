<template>
    <div></div>
</template>
<script>
    import { auth } from '../../auth';
    export default {
        name: 'Logout',
        created () {
            auth.logout();
            this.$router.push("/")
        }
    }
</script>
