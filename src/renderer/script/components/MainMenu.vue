<template>
    <div class="main-menu">
        <el-menu mode="horizontal" :default-active="activeMenu">
            <router-link v-if="isCompletedSettings" :to="{ name: 'Home' }" class="link-menu-item">
                <el-menu-item index="Home">
                    <i class="el-icon-timer"></i>
                    <span slot="title">Tracker</span>
                </el-menu-item>
            </router-link>
            <el-menu-item :disabled="true" v-else index="Home">
                <i class="el-icon-timer"></i>
                <span slot="title">Tracker</span>
            </el-menu-item>
            <router-link v-if="isCompletedSettings" :to="{ name: 'Dashboard' }" class="link-menu-item">
                <el-menu-item index="Dashboard">
                    <i class="el-icon-menu"></i>
                    <span slot="title">Dashboard</span>
                </el-menu-item>
            </router-link>
            <el-menu-item :disabled="true" v-else index="Dashboard">
                <i class="el-icon-menu"></i>
                <span slot="title">Dashboard</span>
            </el-menu-item>
            <router-link :to="{ name: 'Settings' }" class="link-menu-item">
                <el-menu-item index="Settings">
                    <i class="el-icon-setting"></i>
                    <span slot="title">Settings</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </div>
</template>

<script lang="ts">
export default {
    name: 'main-menu',
    data: () => ({
        activeMenu: 'Home',
    }),
    computed: {
        isCompletedSettings(): boolean {
            return this.$store.getters.isCompletedSettings;
        }
    },
    methods: {},
    mounted() {
        this.activeMenu = this.$route.name;
        if (!this.isCompletedSettings) {
            this.$router.push({name: 'Settings'});
        }
    },
};
</script>
