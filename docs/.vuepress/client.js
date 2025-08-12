import {defineClientConfig} from '@vuepress/client';
import VPCard from './components/VPCard.vue';

export default defineClientConfig({
    enhance: ({ app }) => {
        app.component('VPCard', VPCard);
    }
});
