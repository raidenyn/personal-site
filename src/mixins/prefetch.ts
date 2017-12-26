import { Vue } from 'vue/types/vue';
import { Route } from 'vue-router';
import '../types/prefetch';

async function update(vm: Vue, next: Function, route: Route) {
    vm.prefetching = true;
    
    try {
        if (vm.prefetch) {
            const data = await vm.prefetch({
                store: vm.$store,
                route,
            });
            if (!data) return next ? next() : undefined;
            
            Object.assign(vm, data);
        }

        if (next) next();
    } catch (error) {
        if (next) next(error);
    } finally {
        vm.prefetching = false;
    }
}

export default {
    data: () => ({
        // let component know when prefetching is done
        prefetching: false,
    }),
    created() {
        // add prefetched data only after hydration (just after SSR)
        if (!this.constructor.prefetchedData
        ) {
            return;
        }
        Object.assign(this, this.constructor.prefetchedData);
        console.log(this);
        this.constructor.prefetchedData = undefined;
    },
    // on route parameter change
    beforeRouteUpdate(to: Route, from: Route, next: Function) {
        if (this.$options.prefetch 
            && to.path !== from.path
        ) {
            update(this, next, to);
        } else {
            next();
        }
    },
};
