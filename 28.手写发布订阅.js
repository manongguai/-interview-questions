// 任务发布大厅（中间件）
var HunterUnion = {
    type: 'hunt',
    topics:Object.create(null),
    subscribe: function (topic, fn) {
        if (!this.topics[topic]) {
            this.topics[topic] = [fn]
        }
        this.topics[topic].push(fn);
    },
    publish: function (topic, money) {
        if (!this.topics[topic]) {
            return
        }
        for (var  fn of this.topics[topic]) {
            fn(money)
        }
    }
}

// 定义一个猎人类
function Hunter(name, level) {
    this.name = name
    this.level = level
}
// 订阅任务
Hunter.prototype.subscribe = function (topic, fn) {
    console.log(this.level + '猎人' + this.name + '订阅了狩猎' + topic + '的任务');
    HunterUnion.subscribe(topic, fn);
}
// 发布任务
Hunter.prototype.publish = function (topic, money) {
    console.log(this.level + '猎人' + this.name + '发布了狩猎' + topic + '的任务');
    HunterUnion.publish(topic, money);
}

// 创建猎人
var hunterMing = new Hunter('小明', '黄金')
var hunterJin = new Hunter('小金', '白银')
var hunterZhang = new Hunter('小张', '黄金')
var hunterPeter = new Hunter('Peter', '青铜')

// 实例对象分别有他们的任务
hunterMing.subscribe('tiger', function (money) {
    console.log('小明表示：' + (money > 200 ? '' : '不') + '接取任务')
})
hunterJin.subscribe('tiger', function (money) {
    console.log('小金表示：接取任务')
})
hunterZhang.subscribe('tiger', function (money) {
    console.log('小张表示：接取任务')
})
//Peter订阅了狩猎sheep的任务
hunterPeter.subscribe('sheep', function (money) {
    console.log('Peter表示：接取任务')
})
// peter发布任务
hunterPeter.publish('tiger',500);
