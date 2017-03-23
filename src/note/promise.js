//不适用promise
var NanShen = {
    "身高": 180,
    "体重": 80,
    "年薪": "200K",
    request: function(obj) {
        // 攻略长辈成功与否随机决定
        // 成功概率为80%
        if (Math.random() > 0.2) {
            obj.success();
        } else {
            obj.error();
        }
    }
};

var Request = function(names, success) {
    var index = 0, first = 0;
    var request = function() {
        if (names[index]) {
            NanShen.request({
                name: names[index],
                success: function() {
                    first = 0;
                    console.log("成功拿下" + names[index]);
                    index++;
                    request();
                },
                error: function() {
                    if (first == 1) {
                        console.log("依旧没能拿下" + names[index] + "，求婚失败");    
                        return;
                    } else {
                        console.log("没能拿下" + names[index] + "，再试一次");    
                    }
                    first = 1;
                    request();    
                }
            });    
        } else {
            success();
        }
    };    
    
    request();
};

Request(["岳父", "大伯", "大姑"], function() {
    NanShen.request({
        name: "女神",
        success: function() {
            console.log("女神同意，求婚成功！");
        },
        error: function() {
            console.log("女神不同意，求婚失败！");
        }
    });
});
//上面代码通过异步回调，有效重复利用了JS代码，实现了男神的求婚历程。

//然后，上面方法，依次执行的触发依然在回调中，其实并不符合我们现实的思考。我们可能希望得到的代码具有如下与现实世界统一的思维：
//“搞定岳父→搞定大伯→搞定大姑///搞定女神”，但是，上面的实现却看不出这样的思维。而Promise这种形式可以让代码呈现更符合真实世界的直觉。

// 使用promise
var NanShen = {
    "身高": 180,
    "体重": 80,
    "年薪": "200K",
    request: function(obj) {
        // 成功与否随机决定
        // 执行成功的概率为80%
        if (Math.random() > 0.2) {
            obj.success();
        } else {
            obj.error();
        }
    }
};

var Request = function(name) {
    return new Promise(function(resolve, reject) {
        var failed = 0, request = function() {            
            NanShen.request({
                name: name,
                success: function() {
                    console.log(name + "攻略成功！");
                    failed = 0;
                    resolve();
                },
                error: function() {
                    if (failed == 0) {
                        console.log("第一次攻略" + name + "失败，重试一次！");
                        failed = 1;
                        // 重新攻略一次
                        request();                       
                    } else {
                        console.log("依然没有拿下" + name + "，求婚失败！");
                        reject();
                    }
                }
            });
        };
        
        request();
    });
};

Request("岳父")                                // 搞定岳父，然后...
.then(function() { return Request("大伯"); })  // 搞定大伯，然后...
.then(function() { return Request("大姑"); })  // 搞定大姑，然后...
.then(function() {                            // 长辈们全部KO后，攻略女神
    NanShen.request({
        name: "女神",
        success: function() {
            console.log("女神同意，求婚成功！");
        },
        error: function() {
            console.log("女神不同意，求婚失败！");
        }
    });
});