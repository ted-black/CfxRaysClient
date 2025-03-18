<template>
    <div class="container-fluid bg-dark">
        <div class="row vh-100">
            <div
                class="col-3 rounded-1"
                style="border-right: #431a2d 1px solid; background-color: #431a2d"
            >
                <div class="container-fluid p-0">
                    <div class="row">
                        <div class="col-12 p-0">
                            <p class="text-white ms-4 mb-2">Users</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <ul class="list-group mt-2">
                                <li
                                    v-for="subscriber in messageProcessor.subscribers"
                                    :key="subscriber.id"
                                    class="list-group-item pt-0 pb-0"
                                    style="border: 0 none; background-color: #431a2d"
                                >
                                    <a
                                        @click="createDirectSubscriberChannel(subscriber)"
                                        type="button"
                                        class="pe-auto text-warning link-underline link-underline-opacity-0 rounded-5 pt-1 ps-2 pe-2"
                                        style="background-color: #431a2d"
                                        >{{ subscriber.name }}</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 p-0">
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
                                    class="list-group-item pt-0 pb-0"
                                    style="border: 0 none; background-color: #431a2d"
                                >
                                    <a
                                        @click="showChannelContents(channel.id)"
                                        type="button"
                                        class="pe-auto text-warning link-underline link-underline-opacity-0 rounded-5 pt-1 ps-2 pe-2"
                                        style="background-color: #431a2d"
                                        >{{ channel.name }}</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-9 text-white rounded-1" style="border: #431a2d 8px solid">
                <div class="d-flex flex-column bd-highlight h-100">
                    <div class="p-2">Flex item 1</div>
                    <div class="p-2 h-100 position-relative">
                        <ul class="position-absolute bottom-0">
                            <li v-for="message in getChannelContent(selectedChannelId)">
                                {{ message }}
                            </li>
                        </ul>
                    </div>
                    <div
                        class="border border-light position-relative border-opacity-25 rounded-2 mb-lg-3"
                    >
                        <div
                            ref="editorContent"
                            contenteditable="true"
                            class="mt-auto p-2 overflow-y-auto text-white"
                            style="height: 100px"
                        ></div>
                        <div class="position-relative" style="height: 30px">
                            <button
                                class="btn btn-secondary position-absolute bottom-0 end-0"
                                @click="sendContent(selectedChannelId)"
                                :disabled="!selectedChannelId"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useApplicationStore } from '@/stores/ApplicationStore.js';
import { useWebSocketStore } from '@/stores/WebSocketStore.js';
import { ref } from 'vue';

export default {
    setup() {
        const applicationStore = useApplicationStore();
        const webSocketStore = useWebSocketStore();
        const messageProcessor = applicationStore.messageProcessor;
        const selectedChannelId = ref('');
        const editorContent = ref(null);

        const createDirectSubscriberChannel = (subscriber) => {
            if (subscriber.id !== messageProcessor.loggedInSubscriber.id) {
                messageProcessor.createChannel(
                    webSocketStore,
                    [subscriber, messageProcessor.loggedInSubscriber],
                    messageProcessor.loggedInSubscriber
                );
            }
        };

        const showChannelContents = (channelId) => {
            selectedChannelId.value = channelId;
        };

        const sendContent = (id) => {
            messageProcessor.sendContent(webSocketStore, editorContent.value.innerText, id);
        };

        const getChannelContent = (id) => {
            const channel = messageProcessor.channels.find((ch) => ch.id === id);
            return channel?.content ?? [];
        };

        return {
            messageProcessor,
            createDirectSubscriberChannel,
            showChannelContents,
            selectedChannelId,
            getChannelContent,
            sendContent,
            editorContent
        };
    }
};
</script>

<style scoped>
[contenteditable]:focus {
    outline: 0px solid transparent;
}
</style>
