<template>
  <div>
    settings
  </div>
</template>

<script lang="ts">
  import {IPCCommand, IPCMainAnswer} from "../../../common/Contracts/IPC";
  import {IpcRendererEvent} from "electron";

export default {
  name: 'settings',
  data: () => ({

  }),
  methods: {

  },
  mounted()
  {
    //Example send and listen IPC data exchange
    let testCreateBucket: IPCCommand = {
      type: 'bucket.control',
      target: 'createBucket',
      data: {
        bucketId: 'testBucketDeleteAfterTest',
      },
    };
    let testDeleteBucket: IPCCommand = {
      type: 'bucket.control',
      target: 'deleteBucket',
      data: {
        bucketId: 'testBucketDeleteAfterTest',
      },
    };
    this.$ipc.send(testCreateBucket);
    this.$ipc.send(testDeleteBucket);
    this.$ipc.listen((event: IpcRendererEvent, command: IPCMainAnswer) => {
      console.log(event, command);
    })
  }
};
</script>
