import IPCHelper from "../library/IPC/IPCHelper";
import _Vue from "vue";

export function IPCPlugin<O>(Vue: typeof _Vue, options?: O): void {
    Vue.prototype.$ipc = IPCHelper;
}
