<script>
import { ref } from 'vue';
import WorkSpace from '@/components/WorkSpace.vue';
import { useWebSocketStore } from '@/stores/WebSocketStore.js';
import { useApplicationStore } from '@/stores/ApplicationStore.js';
import { Constant } from '@/Objects/Constant.js';

export default {
    components: { WorkSpace },
    setup() {
        const webSocketStore = useWebSocketStore();
        const applicationStore = useApplicationStore();
        const userName = ref('');

        const login = () => {
            webSocketStore.connect(`${Constant.WebSocketUrl}?userName=${userName.value}`);
            applicationStore.messageProcessor.userName = userName.value;
        };

        return {
            login,
            userName,
            applicationStore
        };
    }
};
</script>

<template>
    <div>
        <div class="text-center container-fluid" v-if="!applicationStore.isLoggedIn">
            <div class="row">
                <div class="col-4"></div>
                <div class="col-1 text-end pe-1">
                    <label class="col-form-label fw-bold" for="userName">User name:</label>
                </div>
                <div class="col-2 text-end pe-1">
                    <input
                        v-model="userName"
                        id="userName"
                        type="text"
                        class="form-control border-primary"
                    />
                </div>
                <div class="col-1 text-start ps-1">
                    <input type="button" class="btn btn-primary" value="Login" @click="login" />
                </div>
                <div class="col-4"></div>
            </div>
        </div>
        <WorkSpace v-if="applicationStore.isLoggedIn" />
    </div>
</template>
