<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 bg-black vh-100 border-end">
                <div class="container-fluid p-0">
                    <div class="row">
                        <div class="col-12 p-0 border-bottom border-warning border-opacity-25">
                            <p class="text-white ms-4 mb-2">Users</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <ul class="list-group mt-2">
                                <li
                                    v-for="subscriber in messageProcessor.subscribers"
                                    :key="subscriber.id"
                                    class="list-group-item bg-black pt-0 pb-0"
                                    style="border: 0 none"
                                >
                                    <a
                                        @click="createSingleSubscriberChannel(subscriber)"
                                        type="button"
                                        class="pe-auto text-warning link-underline link-underline-opacity-0 rounded-5 bg-black pt-1 ps-2 pe-2"
                                        >{{ subscriber.name }}</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 p-0 border-bottom border-warning border-opacity-25">
                            <br />
                            <p class="text-white ms-4 mb-2">Channels</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <ul class="list-group mt-2">
                                <li
                                    v-for="channel in messageProcessor.channels"
                                    :key="channel.id"
                                    class="list-group-item bg-black pt-0 pb-0"
                                    style="border: 0 none"
                                >
                                    <a
                                        type="button"
                                        class="pe-auto text-warning link-underline link-underline-opacity-0 rounded-5 bg-black pt-1 ps-2 pe-2"
                                        >{{ channel.name }}</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-9 bg-black vh-100 border-start text-light-emphasis">Main content</div>
        </div>
    </div>
</template>

<script>
import { useApplicationStore } from '@/stores/ApplicationStore.js';
import { useWebSocketStore } from '@/stores/WebSocketStore.js';

export default {
    setup() {
        const applicationStore = useApplicationStore();
        const webSocketStore = useWebSocketStore();
        const messageProcessor = applicationStore.messageProcessor;

        const createSingleSubscriberChannel = (subscriber) => {
            if (subscriber.id !== messageProcessor.loggedInSubscriber.id) {
                webSocketStore.createChannel([subscriber, messageProcessor.loggedInSubscriber]);
            }
        };

        return {
            messageProcessor,
            createSingleSubscriberChannel
        };
    }
};
</script>

<style scoped></style>
