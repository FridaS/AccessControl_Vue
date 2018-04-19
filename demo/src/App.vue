<template>
    <div>
        <!-- <a v-link="{ path: '/test' }">test11</a> -->
        <router-link to="/test">go to test</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'App'
}
</script>
