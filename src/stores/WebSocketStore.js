import { defineStore } from 'pinia';
import { useApplicationStore } from '@/stores/ApplicationStore.js';
import { Command } from '@/Objects/Command.js';
import { MessageType } from '@/Objects/MessageType.js';

export const useWebSocketStore = defineStore('WebSocketStore', {
    state: () => ({
        socket: null
    }),
    actions: {
        /**
         * Connect
         * @param url
         */
        connect(url) {
            this.socket = new WebSocket(url);

            this.socket.onopen = () => {
                const applicationStore = useApplicationStore();
                applicationStore.isLoggedIn = true;
                console.log('WebSocket connection opened');
            };

            this.socket.onmessage = (event) => {
                console.log('Received message:', event.data);
                // Handle incoming messages
                //
                const applicationStore = useApplicationStore();
                applicationStore.messageProcessor.processInboundMessage(event.data);
            };

            this.socket.onclose = () => {
                console.log('WebSocket connection closed');
                this.socket = null;
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        },
        /**
         * Send
         * @param message
         */
        send(message) {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(message);
            } else {
                console.error('WebSocket connection is not open');
            }
        },
        close() {
            if (this.socket) {
                this.socket.close();
                this.socket = null;
            }
        }
    }
});
