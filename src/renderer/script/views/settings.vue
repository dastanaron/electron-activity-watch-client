<template>
    <el-main>
        <h1>Application settings</h1>
        <el-row>
            <el-form ref="settingsForm" :model="settingsForm">
                <el-form-item label="Bucket Id" prop="bucketId">
                    <el-input v-model="settingsForm.bucketId"></el-input>
                </el-form-item>
                <el-form-item label="Hostname" prop="bucketHostname">
                    <el-input v-model="settingsForm.bucketHostname"></el-input>
                </el-form-item>
                <el-form-item label="Client Name" prop="bucketClientName">
                    <el-input v-model="settingsForm.bucketClientName"></el-input>
                </el-form-item>
                <el-form-item label="Acceptable downtime (sec.)" prop="acceptableDowntime">
                    <el-input v-model.number="settingsForm.acceptableDowntime"></el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="saveSettings">Save</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </el-main>
</template>

<script lang="ts">
import { ApplicationSettings } from '../../../common/Contracts/ApplicationSettings';
import { IPCCommand, IPCMainAnswer } from '../../../common/Contracts/IPC';
import { IpcRendererEvent } from 'electron';

export default {
    name: 'settings',
    data: () => ({
        settingsForm: {} as ApplicationSettings,
    }),
    methods: {
        fillForm(): void {
            this.$set(this.settingsForm, 'bucketId', this.$store.getters.bucketId);
            this.$set(this.settingsForm, 'bucketHostname', this.$store.getters.bucketHostname);
            this.$set(this.settingsForm, 'bucketClientName', this.$store.getters.bucketClientName);
            this.$set(this.settingsForm, 'acceptableDowntime', this.$store.getters.acceptableDowntime);
        },
        saveSettings(): void {
            console.log('saved');
            //todo: implement here sending to IPC for saving configuration file

            this.createBucket();
        },
        createBucket(): void {
            this.$ipc.send({
                type: 'bucket.control',
                target: 'createBucket',
                data: {
                    bucketId: this.settingsForm.bucketId,
                },
            } as IPCCommand);
        },
        deleteBucket(bucketId: string): void {
            this.$ipc.send({
                type: 'bucket.control',
                target: 'deleteBucket',
                data: {
                    bucketId: bucketId,
                },
            } as IPCCommand);
        },
    },
    mounted() {
        this.fillForm();

        this.$ipc.listen((event: IpcRendererEvent, command: IPCMainAnswer) => {
            if (command.status === 'ok') {
                this.$message.success('Action completed successfully');
            } else {
                this.$message.error(command.message);
            }
        });
    },
};
</script>
