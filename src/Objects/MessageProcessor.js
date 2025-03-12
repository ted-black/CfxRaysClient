import { MessageType } from '@/Objects/MessageType.js';
import { Command } from '@/Objects/Command.js';

/**
 * @typedef {object} MessageProcessor
 * @property {(data : object) => void} processMessage
 * @property {() => []} messageHistory
 * @property {() => []} subscribers
 * @property {() => []} channels
 * @property {() => string} userName
 * @property {() => object} loggedInSubscriber
 * @property {(value) => void} userName
 */

/**
 * Message processor
 */
class MessageProcessor {
    constructor() {
        this._messageHistory = [];
        this._subscribers = [];
        this._channels = [];
        this._userName = null;
        this._loggedInSubscriber = null;
        this._channels = [];
    }

    /**
     * Process message
     * @param data
     */
    processMessage(data) {
        const message = JSON.parse(data);
        switch (message.type) {
            case MessageType.MetaData:
                switch (message.command) {
                    case Command.ListSubscribers:
                        this._subscribers = message.subscribers;
                        this._loggedInSubscriber = message.subscribers.find(
                            (item) => item.name === this._userName
                        );
                        break;
                    case Command.ListChannels:
                        this._channels = message.channels;
                        break;
                }
                break;
            case MessageType.ChannelData:
                break;
            case MessageType.Command:
                switch (message.command) {
                    case Command.CreateChannel:
                        break;
                    case Command.AddToChannel:
                        break;
                    case Command.RemoveFromChannel:
                        break;
                    case Command.NoCommand:
                        break;
                }
                break;
            case MessageType.Message:
                this._messageHistory.push(message);
                break;
        }
    }

    /**
     * Get message history
     * @returns {[]}
     */
    get messageHistory() {
        return this._messageHistory;
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
