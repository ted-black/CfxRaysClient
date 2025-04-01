import { MessageType } from '@/Objects/MessageType.js';
import { Command } from '@/Objects/Command.js';

/**
 * Message processor
 */
class MessageProcessor {
    constructor() {
        this._subscribers = [];
        this._channels = [];
        this._userName = null;
        this._loggedInSubscriber = null;
        this._channels = [];
    }

    /**
     * Process inbound message
     * @param data
     */
    processInboundMessage(data) {
        const message = JSON.parse(data);
        switch (message.type) {
            case MessageType.Command:
                switch (message.command) {
                    case Command.ListSessions:
                        this._subscribers = JSON.parse(message.content);
                        this._loggedInSubscriber = this._subscribers.find(
                            (item) => item.name === this._userName
                        );
                        break;
                    case Command.ListChannels:
                        const channels = JSON.parse(message.content);
                        for (const channel of channels) {
                            if (!this._channels.find((c) => c.name === channel.name)) {
                                let channelContent = [];
                                for (let i = 0; i < channel.content.length; i++) {
                                    const content = JSON.parse(channel.content[i]);
                                    content.content = JSON.parse(content.content);
                                    channelContent.push(content);
                                }
                                channel.content = channelContent;
                                this._channels.push(channel);
                            }
                        }
                        break;
                }
                break;
            case MessageType.Content:
                message.content = JSON.parse(message.content);

                this._channels.forEach((channel) => {
                    if (channel.id === message.channelId) {
                        if (channel.content === null) {
                            channel.content = [];
                        }
                        channel.content.push(message);
                    }
                });
                break;
        }
    }

    /**
     * Create channel
     * @param store
     * @param subscribers
     * @param loggedInSubscriber
     */
    createChannel(store, subscribers, loggedInSubscriber) {
        const message = {
            sessionId: loggedInSubscriber.id,
            type: MessageType.Command,
            command: Command.CreateChannel,
            content: JSON.stringify(subscribers)
        };
        store.send(JSON.stringify(message));
    }

    /**
     * Send content
     * @param store
     * @param content
     * @param channelId
     */
    sendContent(store, content, channelId) {
        if (content.trim().length === 0) return;

        const message = {
            channelId: channelId,
            type: MessageType.Content,
            content: content
        };
        store.send(JSON.stringify(message));
    }

    /**
     * Get subscribers
     * @returns {[]}
     */
    get subscribers() {
        return this._subscribers;
    }

    /**
     * Get channels
     * @returns {[]}
     */
    get channels() {
        return this._channels;
    }

    /**
     * Get username
     * @returns {null}
     */
    get userName() {
        return this._userName;
    }

    /**
     * Set username
     * @param value
     */
    set userName(value) {
        this._userName = value;
    }

    /**
     * Get the logged in subscriber
     * @returns {object}
     */
    get loggedInSubscriber() {
        return this._loggedInSubscriber;
    }
}

export { MessageProcessor };
