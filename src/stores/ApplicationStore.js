import { defineStore } from 'pinia';
import { MessageProcessor } from '@/objects/MessageProcessor.js';

export const useApplicationStore = defineStore('ApplicationStore', {
    /**
     * `
     * @returns {{isLoggedIn: boolean, messageProcessor: MessageProcessor}}
     */
    state: () => ({
        isLoggedIn: false,
        messageProcessor: new MessageProcessor()
    })
});
