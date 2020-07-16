<template>
    <div id="app">
        <main-menu></main-menu>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import MainMenu from './components/MainMenu.vue';

export default {
    components: { MainMenu },
};
</script>

<style lang="scss">
@import '../style/styles.scss';
</style>
