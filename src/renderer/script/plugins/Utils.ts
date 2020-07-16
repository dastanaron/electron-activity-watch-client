import _Vue from 'vue';
import Utils from '../../../common/Utils/Utils';

export function utilsPlugin<O>(Vue: typeof _Vue, options?: O): void {
    Vue.prototype.$utils = Utils;
}
