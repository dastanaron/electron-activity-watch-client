<template>
    <div id="app">
        <main-menu></main-menu>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import MainMenu from './components/MainMenu.vue';
import {IPCCommand, IPCMainAnswer, IPCErrorAnswer} from "../../common/Contracts/IPC";
import {IpcRendererEvent} from "electron";
import {BUCKET_HOSTNAME, BUCKET_CLIENT_NAME, BUCKET_ID, ACCEPTABLE_DOWNTIME} from "./store/modules/applicationSettings";

export default {
    components: { MainMenu },
    mounted() {
        this.$ipc.send({
            type: 'settings.control',
            target: 'getSettings',
            data: {
                answerChannel: 'loadSettings',
            }
        } as IPCCommand);

        this.$ipc.listen((event: IpcRendererEvent, command: IPCMainAnswer | IPCErrorAnswer) => {
            if (command.status === 'ok') {
                this.$store.commit(BUCKET_HOSTNAME, command.data[BUCKET_HOSTNAME]);
                this.$store.commit(BUCKET_CLIENT_NAME, command.data[BUCKET_CLIENT_NAME]);
                this.$store.commit(BUCKET_ID, command.data[BUCKET_ID]);
                this.$store.commit(ACCEPTABLE_DOWNTIME, command.data[ACCEPTABLE_DOWNTIME]);
                this.$store.commit('completeSettings');
            } else {
                this.$message.error(command.message)
            }
        }, 'loadSettings')
    },
};
</script>

<style lang="scss">
@import '../style/styles.scss';
</style>
