var sinon = require('sinon');

/**
 * 测试 sinon.spy
 */
function runSpyDemo() {
    // 目标
    var Persion = {
        setName: function (name) {
            this.name = name;
        }
    };

    // 1.为setName方法创建一个spy
    var setNameSpy = sinon.spy(Persion, 'setName');

    // 2. 现在开始，每次调用这个方法时，相关信息都会被记录下来

    // 2.1 第一次调用，调用之后可以通过spy对象可以查看这些记录的信息
    Persion.setName('Name 1');

    // The number of recorded calls.
    console.log(setNameSpy.callCount); //output: 1

    // true if the spy was called at least once
    console.log(setNameSpy.called); //output: true

    // true if spy was called exactly once
    console.log(setNameSpy.calledOnce); //output: true

    // true if the spy was called exactly twice
    console.log(setNameSpy.calledTwice); //output: false

    // 2.2 第二次调用，调用之后可以通过spy对象可以查看这些记录的信息
    Persion.setName('Name2');

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

/**
 * 测试 sinon.stub
 */
function runStubDemo() {
    // 模拟 jQuery.post
    var jQuery = {
        post: function (url, params, callback) {
            console.log('--jQuery.post in! --', url, params);

            setTimeout(function () {
                console.log('--jQuery.post callback! --');
                callback();
            }, 1000)
        }
    };

    // 创建变量保存我们期望看到的结果
    var expectedUrl = '/users';
    var expectedParams = {
        first: 'Expected first name',
        last: 'Expected last name'
    };

    // 创建将要作为参数的数据
    var user = {
        firstname: expectedParams.first,
        lastname: expectedParams.last
    };

    // 我们的业务方法，新增用户
    function saveUser(user, callback) {
        jQuery.post('/users', {
            first: user.firstname,
            last: user.lastname
        }, callback);
    }

    // 普通的测试
    saveUser(user, function () {
        console.log('Normal Test: saveUser success!');
    });

    // 我们会stub jQuery.post，这样就不用真正的发送请求
    var post = sinon.stub(jQuery, 'post');
    post.yields();

    // 针对回调函数使用一个spy
    var callback = sinon.spy();

    // 使用 sinon 之后的调用测试
    saveUser(user, callback);

    // 恢复
    post.restore();

    // 判断：回调是否被调用了一次
    console.log(callback.calledOnce); // true

    // 判断：请求参数是否正确
    console.log(post.calledWith(expectedUrl, expectedParams)); // true
    console.log(post.calledWith('no' + expectedUrl, expectedParams)); // false
}

/**
 * 测试 sinon.stub，替换已经存在的方法
 */
function runStubDemoReplace() {
    var Person = {
        sayHi: function (saying) {
            return "hello, " + saying;
        }
    };

    console.log(Person.sayHi('Call')); // hello, Call

    var newHi = function (say) {
        return say + ' from new method';
    };

    sinon.stub(Person, 'sayHi', newHi);

    console.log(Person.sayHi('Call')); // Call from new method
}

/**
 * 测试 sinon.stub，替换返回值
 */
function runStubDemoReturn() {
    var Person = {
        sayHi: function (saying) {
            return "hello, " + saying;
        }
    };

    console.log(Person.sayHi('Sinon')); // hello, Sinon

    sinon.stub(Person, 'sayHi').returns('hola');

    console.log(Person.sayHi('Sinon')); //  hola
}

runSpyDemo();
console.log('\n');

runStubDemoReplace();
console.log('\n');

runStubDemoReturn();