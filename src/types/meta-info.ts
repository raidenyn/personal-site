import Vue from 'vue';
import Meta from 'vue-meta';
import { Request } from 'express';

declare module 'vue/types/vue' {
    interface Vue {
        $meta(): IMetaProvider;
    }
}

declare module 'express' {
    interface Request {
        meta?: IMetaProvider;
    }
}

declare interface IMetaInfo {
    title?: string;
    titleTemplate?: string;
    htmlAttrs?: { [name: string]: string | undefined };
    bodyAttrs?: { [name: string]: string | undefined };
    base?: { [name: string]: string | undefined };
    meta?: { [name: string]: string | undefined }[];
    link?: { [name: string]: string | undefined }[];
    style?: { [name: string]: string | undefined }[];
    script?: { [name: string]: string | undefined }[];
    noscript?: { [name: string]: string | undefined }[];
    __dangerouslyDisableSanitizers?: string[];
    changed?: (newInfo: object, addedTags: HTMLElement[], removedTags: HTMLElement[]) => { };
}

declare interface IMetaOptions {
    /**
     * the component option name that vue-meta looks for meta info on.
     * @default metaInfo
     */
    keyName?: string;

    /**
     * the attribute name vue-meta adds to the tags it observes
     * @default data-vue-meta
     */
    attribute?: string;

    /**
     * the attribute name that lets vue-meta know that meta info has already been server-rendered
     * @default data-vue-meta-server-rendered
     */
    ssrAttribute?: 'data-vue-meta-server-rendered';

    /**
     * the property name that vue-meta uses to determine whether to overwrite or append a tag
     * @default vmid
     */
    tagIDKeyName?: 'vmid';
}

declare interface IMetaProvider {
    inject(): IMetaInfo;
}
