import JMessage from "jmessage-react-plugin";

export default {
    init() {
        JMessage.init({
            'appkey': 'c0c08d3d8babc318fe25bb0c',
            'isOpenMessageRoaming': true,
            'isProduction': false,
            'channel': ''
        })
    },

    register(username, password) {
        return new Promise((resolve, reject) => {
            JMessage.register({
                username,
                password
            }, resolve, reject)
        })
    },

    login(username, password) {
        return new Promise((resolve, reject) => {
            JMessage.login({
                username,
                password
            }, resolve, reject)
        })
    },


    /**
     * 发送文本消息
     * @param {String} username 收件人
     * @param {String} text 文本
     * @param {*} extras 要附带的参数
     * @returns 
     */
    sendTextMessage(username, text, extras = {}) {
        return new Promise((resolve, reject) => {
            const type = "single";
            JMessage.sendTextMessage({
                type, username, text, extras
            }, resolve, reject)
        })
    },

    /**
     * 获取历史消息
     * @param {String} username 要获取和谁的聊天记录
     * @param {Number} from     从第几条开始获取
     * @param {Number} limit    一共要获取几条
     * @returns 
     */
    getHistoryMessages(username,from,limit) {
        return new Promise((resolve, reject) => {
            const type = "single";
            JMessage.getHistoryMessages({
                type, username,
                from, limit
            },
                resolve, reject
            )
        })
    }


}
