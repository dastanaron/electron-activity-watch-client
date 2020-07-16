<template>
    <div class="tracker">
        <el-form :model="formModel" :rules="rules" ref="trackerForm" label-position="top">
            <el-row :gutter="15">
                <el-col :span="16">
                    <el-form-item label="" prop="taskName">
                        <el-input v-model="formModel.taskName" placeholder="Task name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="">
                        <el-button type="primary" v-if="!formModel.startedTimer" @click="startTimer">Start</el-button>
                        <el-button type="danger" v-else @click="stopTimer">Stop ({{ timer }})</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="tasks-result">
            <el-row class="task" v-for="(task, taskIndex) in tasks" :key="taskIndex">
                <el-col :span="12">
                    {{ task.taskName }}
                </el-col>
                <el-col :span="12">
                    {{ $utils.time.secondsToTime(task.duration) }}
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Task } from '../../../common/Contracts/TimeTracker';

export default {
    data: () => ({
        formModel: {
            taskName: '',
            timer: 0,
            intervalTimer: 0,
            startedTimer: false,
        },
        tasks: [] as Task[],
    }),
    computed: {
        timer(): string {
            return this.$utils.time.secondsToTime(this.formModel.timer);
        },
        rules: () => ({
            taskName: [{ required: true, message: 'Please input task name', trigger: 'blur' }],
        }),
    },
    methods: {
        startTimer(): void {
            this.$refs.trackerForm.validate((valid: boolean) => {
                if (!valid) {
                    return;
                }
                this.formModel.startedTimer = true;
                this.formModel.intervalTimer = setInterval(() => {
                    this.formModel.timer++;
                }, 1000);
            });
        },
        stopTimer(): void {
            this.formModel.startedTimer = false;
            clearInterval(this.formModel.intervalTimer);
            this.tasks.push({
                taskName: this.formModel.taskName,
                duration: this.formModel.timer,
            });
            this.formModel.taskName = '';
            this.formModel.timer = 0;
        },
    },
    components: {},
};
</script>
