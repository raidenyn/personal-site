import Vue from 'vue';
import Meta from 'vue-meta';
import { Request } from 'express';

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        serverCacheKey?: (props: any) => string;
    }
}
