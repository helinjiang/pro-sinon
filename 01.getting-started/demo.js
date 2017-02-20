var sinon = require('sinon');

// 目标
var user = {
    setName: function (name) {
        this.name = name;
    }
};

/**
 * 测试 sinon.spy
 */
function runSpyDemo() {
    // 1.为setName方法创建一个spy
    var setNameSpy = sinon.spy(user, 'setName');

    // 2. 现在开始，每次调用这个方法时，相关信息都会被记录下来

    // 2.1 第一次调用，调用之后可以通过spy对象可以查看这些记录的信息
    user.setName('Darth Vader');

    // The number of recorded calls.
    console.log(setNameSpy.callCount); //output: 1

    // true if the spy was called at least once
    console.log(setNameSpy.called); //output: true

    // true if spy was called exactly once
    console.log(setNameSpy.calledOnce); //output: true

    // true if the spy was called exactly twice
    console.log(setNameSpy.calledTwice); //output: false
    // 现在开始，每次调用这个方法时，相关信息都会被记录下来
    user.setName('Darth Vader');

    // 2.2 第二次调用，调用之后可以通过spy对象可以查看这些记录的信息

    // The number of recorded calls.
    console.log(setNameSpy.callCount); //output: 2

    // true if the spy was called at least once
    console.log(setNameSpy.called); //output: true

    // true if spy was called exactly once
    console.log(setNameSpy.calledOnce); //output: false

    // true if the spy was called exactly twice
    console.log(setNameSpy.calledTwice); //output: true

    // 3. 重要的最后一步，移除spy
    setNameSpy.restore();
}

runSpyDemo();