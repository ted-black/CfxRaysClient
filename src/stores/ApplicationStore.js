import { defineStore } from 'pinia';
import { MessageProcessor } from '@/Objects/MessageProcessor.js';

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
