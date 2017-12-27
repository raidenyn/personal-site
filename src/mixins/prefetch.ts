import { Vue } from 'vue/types/vue';
import { Route } from 'vue-router';
import '../types/prefetch';

export default {
    data: () => ({
        // let component know when prefetching is done
        prefetching: false,
    }),
    created() {
        // add prefetched data only after hydration (just after SSR)
        if (!this.constructor.prefetchedData) {
            return;
        }
        Object.assign(this, this.constructor.prefetchedData);
        this.constructor.prefetchedData = undefined;
    },
};
