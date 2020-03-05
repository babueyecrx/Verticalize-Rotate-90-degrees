//console.log = function() {}
//    "key": "hellokey",
var StorageArea = chrome.storage.sync;
StorageArea.get('progMode', function(result) {
    //result.progMode
    //console.log('refreshed progMode = ', result.progMode);
    if (result.progMode == 'product') {
        //'取消日志'
        console.log = function() {}
    }

});


//'取消日志'調試用
console.log = function() {}




//----------------------------------------------
//豎版的滾頁支持
function scrollOnePageLeft() {
    var lineHeight = $('div.taketori-col').css("line-height");
    var colSpace = Math.floor(parseInt(lineHeight.replace('px', '')) * 1.5);
    //向左移動一頁
    var ele = $('div.taketori-col');
    var oldLeft = ele.scrollLeft();
    var newLeft = oldLeft - ele[0].clientWidth + colSpace;
    $('div.taketori-col').scrollLeft(newLeft);
}

function scrollOnePageRight() {
    var lineHeight = $('div.taketori-col').css("line-height");
    var colSpace = Math.floor(parseInt(lineHeight.replace('px', '')) * 1.5);
    //向右邊移動一頁

    var ele = $('div.taketori-col');
    var oldLeft = ele.scrollLeft();
    var newLeft = oldLeft + ele[0].clientWidth - colSpace;
    $('div.taketori-col').scrollLeft(newLeft);
}

//其它函数
jQuery.fn.getPath = function() {
    if (this.length != 1) throw 'Requires one element.';

    var path, node = this;
    while (node.length) {
        var realNode = node[0],
            name = realNode.localName;
        if (!name) break;
        name = name.toLowerCase();

        var parent = node.parent();

        var siblings = parent.children(name);
        if (siblings.length > 1) {
            name += ':eq(' + siblings.index(realNode) + ')';
        }

        path = name + (path ? '>' + path : '');
        node = parent;
    }

    return path;
};
//这个放在其它地方
function horizScroll(Path) {

    console.log('传入horizScroll的路径是 ' + Path);
    $(Path).scrollIntoView();
}

//-------------------------------------


toDoCodeHorizDelay = 300;
scroll2EleHmodeDelay = toDoCodeHorizDelay + 100;

//-->--------------------------------
var windowBody = window.document.body;
rstLineHeight = document.defaultView.getComputedStyle(windowBody, "").getPropertyValue("line-height");
rstFontSize = document.defaultView.getComputedStyle(windowBody, "").getPropertyValue("font-size");
var rstBodyCSS = {
    "line-height": rstLineHeight,
    "font-size": rstFontSize
};

//-->--------------------------------
//CSS路径在竖版下已经改变了...
//"html>body>span:eq(397)"
//html>body>div>span:eq(301)
//但这个规律不是普适的，还是应该用加attr的方式，让它在翻转后保持
//暂时的解决办法，插入一个div
function H2VPath(HPath) {
    var part1 = HPath.slice(0, 10); //"html>body> span
    var part2 = HPath.slice(10); // span:eq(397)...
    part1 = part1 + 'div>';
    concatVPath = part1 + part2;
    return concatVPath;
}
//CSS路径回到横版也改变了...
// html>body>div>span:eq(301)  V
//"html>body>span:eq(397)"  H
//暂时的解决办法，灭去一个div
/*测试
var VPath = "html>body>div>span:eq(397)";
concatHPath=V2HPath(VPath);
var HPath = "html>body>span:eq(397)";
concatHPath === HPath
*/
function V2HPath(VPath) {
    var part1 = VPath.slice(0, 10); //"html>body>
    var part2 = VPath.slice(14); // span:eq(397)...
    concatHPath = part1 + part2;
    return concatHPath;
}



function scroll00(HPath) {

    var Path = H2VPath(HPath);

    console.log('scroll00 传入参数列表: ');
    console.log(arguments);
    var PosLeft = $(Path).offset().left;
    //console.log('scroll 1 距离左端: ' + PosLeft); //debug check this value negative

    $('html,body,div.taketori-col').scrollTop(0);
    $('html,body,div.taketori-col').scrollLeft(0);
    console.log('第一次划动 -- 先划到 0,0以得到 positive offset().left');
    //console.log('请比对传入元素是否正确');
    //console.log($(Path)[0]);
    //console.log('请比对传入元素路径是否正确');
    //console.log(Path);
}

function scroll2elem(HPath) {

    var Path = H2VPath(HPath);
    //var PosTop = $(Path).offset().top;
    var PosLeft = $(Path).offset().left;
    //console.log('scroll2 距离左端: ' + PosLeft);
    //$('html,body,div.taketori-col').scrollTop(PosTop); //will scroll to bottom later
    $('html,body,div.taketori-col').scrollLeft(PosLeft);
    console.log('第二次划动 -- 划动到那个元素');
    console.log('请比对传入元素路径是否正确');
    console.log(Path);
}


//-->--------------------------------
function mySetTaketoriColCSS() {
    //step css.1. set those not want to change 
    //&  step css.2.  set other items one by one
    $('.taketori-col').attr('style', "position:relative;overflow:scroll;overflow-x:scroll;overflow-y:scroll;");

    var taketoriColCSS = {
        width: '97%',
        height: '97%',
        paddingBottom: '2%'
    }
    $('.taketori-col').css('width', taketoriColCSS.width);
    $('.taketori-col').css('height', taketoriColCSS.height);
    $('.taketori-col').css('padding-bottom', taketoriColCSS.paddingBottom);

    myscroll2bottom(); //拉到底部因为很多人会找不到水平滚动条
}

function myscroll2bottom() {
    $('body').scrollTop(document.body.clientHeight); //body here, not .taketori-col
}

var NearestElem = $('body'); //initial elem

//->---------------我是||||竖版的分隔符----------------------------------
VModeVisibleZoneCenter = {
    x: 0,
    y: 0
};
var isRootBodyVtlzd = $("body").hasClass('wispwt080701vtlzd');
/*
if (isRootBodyVtlzd) {
    console.log('在content.js载入时候 发现文档已经竖版了');
    getVModeVisibleZoneCenter('已经竖版的content.js载入'); //initial pos
	addVModeListen(); //一开始如果是竖版的就竖版侦听
}
*/


//||||||||竖版VMode 视窗中心坐标
function getVModeVisibleZoneCenter() { //get center of visible zone in vertical mode
    console.log(' ' + arguments.callee.name + ' 被-- ' + arguments[0] + ' --调用');

    var ele = $('div.taketori-col');
    if (ele === undefined || ele === null) {
        console.log('调用时候已经不在竖版模式了!');
    } else {
        var ctX = document.body.scrollLeft + ele[0].clientWidth / 2;
        var ctY = document.body.scrollTop + ele[0].clientHeight / 2;
        VModeVisibleZoneCenter = { //global variable
            x: ctX,
            y: ctY
        };
        //console.log('竖版VMode 视窗中心坐标:');
        //console.log(VModeVisibleZoneCenter);
        var NearestElemPath = findNearestElem(VModeVisibleZoneCenter, 'V', arguments.callee.name);
        console.log('竖版视窗中心元素路径  = ' + NearestElemPath);
    }
}
var scrollListenInterval = 1000;
//为||||竖版添加滚动侦听
var VtimerLog;

function addVModeListen() {
    console.log('停止在水平模式下的事件侦听...');
    $(window).unbind('scroll');

    console.log('启动在竖立模式下的事件侦听......');
    $(document).ready(function() {
        //滾動條偵聽
        $('div.taketori-col').scroll(function() {
            VtimerLog && clearTimeout(VtimerLog);
            VtimerLog = setTimeout(function() {
                getVModeVisibleZoneCenter('竖版滚动侦听');
            }, scrollListenInterval);
        });
        //光標滾頁偵聽
        window.onkeydown = function(e) {
            var key = e.keyCode ? e.keyCode : e.which;

            if (key == 37) { //左移一頁
                e.preventDefault(); // Prevent the default action
                scrollOnePageLeft();
            } else if (key == 39) { //右邊移一頁
                e.preventDefault(); // Prevent the default action
                scrollOnePageRight();
            }
        }
    });
}




//->---------------我是====横版的分隔符----------------------------------
HModeVisibleZoneCenter = { //global variable
    x: $('body').width() / 2,
    y: $('body').height() / 2
}; //initial pos

var isRootBodyVtlzd = $("body").hasClass('wispwt080701vtlzd');
if (!isRootBodyVtlzd) {
    console.log('在content.js载入时候 发现文档是横版的');
    addHModeListen(); //一开始横版侦听
    getHModeVisibleZoneCenter('非函数 [content.js载入]'); //刷新可视区域中心坐标和最近元素
}


//========横版HMode 视窗中心坐标
function getHModeVisibleZoneCenter() { //no need scroll to get it
    console.log(' ' + arguments.callee.name + ' 被-- ' + arguments[0] + ' --调用');

    var ele = document.body;
    var origX = ele.scrollLeft + ele.clientWidth / 2; //orig.x
    var origY = ele.scrollTop + ele.clientHeight / 2; //orig.x 
    HModeVisibleZoneCenter = {
        x: origX,
        y: origY
    };
    //console.log('水平HMode 视窗中心坐标:');
    //console.log(HModeVisibleZoneCenter);
    var NearestElemPath = findNearestElem(HModeVisibleZoneCenter, 'H', arguments.callee.name);
    console.log('横版可见区中心元素路径 = ' + NearestElemPath);
}


//------------正在修改------------
//横版滚动侦听
var HtimerLog;

function addHModeListen() {
    //删除V版滚动侦听
    console.log('停止在竖立模式下的事件侦听(滾動和光標滾頁面)...');
    window.onkeydown = null;
    $('div.taketori-col').unbind('scroll');

    //增加H版滚动侦听
    console.log('启动在水平模式下的滚动事件侦听......');
    $(document).ready(function() {
        $(window).scroll(function() {
            HtimerLog && clearTimeout(HtimerLog);
            HtimerLog = setTimeout(function() {
                getHModeVisibleZoneCenter('横版滚动侦听');
            }, scrollListenInterval);
        });
    });
}
//-------------------


//->---------------我是美丽的分隔符----------------------------------


function logAllProps(pre, obj) {
    var props = pre;
    for (var p in obj) {
        if (typeof(obj[p]) == "string") {
            //console.log('typeof(obj[p]) == "string"');
            props += String(p) + "=" + obj[p] + ";  ";
        } else if (typeof(obj[p]) == "object") {
            //console.log('typeof(obj[p]) == "object"');
            console.log('---object ' + String(p) + '= ');
            console.log(obj[p]);
        } else {}
    }
    console.log(props);
}

function verticalizeRootBody(settings) {

    var url = chrome.extension.getURL('TAKETORI-JS-master/taketori.css');
    $('head').append($("<link/>", {
        rel: "stylesheet",
        href: url,
        type: "text/css"
    }));
    //++-------new Taketori
    var taketori = (new Taketori()).set(settings);
    var windowBody = window.document.body;
    taketori.make(windowBody, false);
    console.log('竖排过程可能已经完成');
    $("body").addClass('wispwt080701vtlzd'); //标志这已经是||||竖版模式
    return rstBodyCSS;

}
var windowBody = window.document.body;
var windowBodyStyle = window.getComputedStyle(windowBody);

function horizRootBody(settings) {
    var isRootBodyVtlzd = $("body").hasClass('wispwt080701vtlzd');
    if (isRootBodyVtlzd) {
        setTimeout(function() {

            var taketori = (new Taketori()).set({});
            taketori.toggle(window.document.body);
            $("body").removeClass('wispwt080701vtlzd');
        }, toDoCodeHorizDelay);
    }
}

function getErrorObject() {
    try {
        throw Error('')
    } catch (err) {
        return err;
    }
}



//寻找离坐标最近的元素
function findNearestElem(coord, mode, caller) {
    console.log('findNearestElem 被-- ' + arguments[2] + ' --调用');

    var elemSet = $('body').find("*").filter("*:not(:has(*))"); //those has no child
    elemSet = elemSet.filter(":not('script')");
    elemSet = elemSet.filter(":not('style')");
    elemSet = elemSet.filter(":not('head')"); //some bad programmed websites...
    elemSet = elemSet.filter(":not('br')");
    //elemSet = elemSet.filter(":not('.nocjk')");//有时候taketori会制造这些
    //elemSet = elemSet.filter(":not('span')"); //有时候taketori会制造这些
    var NearestElem = $(elemSet).nearest(coord).first();
    //得到css路径
    //selector =  "[x='X83n1577_p0380a11']";
    //var elePath = $(selector).getPath();
    var elePath = NearestElem.getPath();
    //$(elePath)     //get the non-proto jquery ele
    //$(elePath)[0]  //get the prototype dom ele

    if (mode === 'V') {
        //取消之前在竖版模式找到的最后一个元素的高亮显示，现在在竖版模式找到了新的
        console.log('竖版下，找到离中心最近的元素路径是:');
        console.log(elePath);
    } else if (mode === 'H') {
        //取消之前在横版模式找到的最后一个元素的高亮显示，现在在横版模式找到了新的
        console.log('横版下，找到离中心最近的元素路径是:');
        console.log(elePath);
    }

    return elePath;
}

/* 处理消息 */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    //logAllProps('show.js -- received -- ', msg);

    if ((msg.from === 'popup') && (msg.subject === 'VTLWholePageMSG')) {
        //------------------------------||||  to 竖版------------------------------------
        //---------step 1----寻找在====横版刚刚看到哪了----------
        console.debug('接到竖立翻转的消息, 即将进入翻转');
        $(window).unbind('scroll');
        $('div.taketori-col').unbind('scroll');
        console.log('暂停所有的滚动侦听...');
        console.log('定格横版浏览到的元素');
        //console.log(HModeVisibleZoneCenter);
        var HFixedNearestElemPath = findNearestElem(HModeVisibleZoneCenter, 'H', arguments.callee.name);
        console.debug('横版定格元素路径 = ' + HFixedNearestElemPath);
        $(HFixedNearestElemPath).attr("hfixedattr", "yes"); //set attr
        //---------step 2----竖排过程-----------
        var settings = msg.infoSettings;
        var rstBodyCSS = verticalizeRootBody(settings);

        var defaultBodyCSS = {
            "line-height": "200%",
            "font-size": "100%"
        };
        $('body').css(defaultBodyCSS);

        //---------step 3---重新设置以覆盖 taketori-col 库的默认样式-------
        setTimeout(function() {
            mySetTaketoriColCSS();
        }, 650);
        //---------step 4----划动到刚才的元素-----------
        //must add delay,otherwise scroll not work!
        //toDoCode1 since scrollTop does not accept negative value!(converted to zero)
        //time delay mainly because taketori has not finished verticalizing
        //after checking taketori.js , its max setTimeout used 600ms
        //$(HFixedNearestElemPath)     //get the non-proto jquery ele
        //$(HFixedNearestElemPath)[0]  //get the prototype dom ele
        //var hello = "Hello World";
        //setTimeout不能在第一个参数的里传入参数，第一个是匿名函数，没有参数滴
        setTimeout(scroll00, 600, HFixedNearestElemPath);


        //50ms more delay than scroll00
        setTimeout(scroll2elem, 700, HFixedNearestElemPath);

        //---------step 5---add scroll listener in vertical mode-------
        //50ms more delay than scroll00
        setTimeout(function() {
            addVModeListen();
        }, 800);

        setTimeout(function() {
            //getVModeVisibleZoneCenter('转到竖版模式后的刷新中心点'); //
        }, 900);


        //---------step 6---给popup发送回馈-------
        var feedback = {
            type: "reply",
            text: "success in verticalizing",
            rstBodyCSS: rstBodyCSS
        };
        sendResponse(feedback);
        //logAllProps('show.js -- sending --  ', feedback);
    }
    //--------------------------------只是修改css------------------------------------
    if ((msg.from === 'popup') && (msg.subject === 'onlyCSSMSG')) {
        var bodyCSS = msg.infoCSS;
        $('body').css(bodyCSS); //根据收到的指示修改
        var feedback = {
            type: "reply",
            text: "success for onlyCSSMSG"
        };
        sendResponse(feedback);
        //logAllProps('show.js -- sending --  ', feedback);
    }

    //--------------------------------===to=横版------------------------------------
    if ((msg.from === 'popup') && (msg.subject === 'restoreHoriz')) {
        //---------step 1----寻找在||||竖版刚刚看到哪了----------
        console.log('从popup接到恢复横版的指令:');
        console.log('停止所有的滚动侦听...');
        $(window).unbind('scroll'); //停止所有的滚动侦听
        $('div.taketori-col').unbind('scroll');
        console.log('寻找在||||竖版刚刚看到哪了: 是这个坐标:');
        console.log(VModeVisibleZoneCenter);
        var VFixedNearestElemPath = findNearestElem(VModeVisibleZoneCenter, 'V', arguments.callee.name);
        //$('[vfixedattr=yes]') null在转回横版时候会消失。
        $(VFixedNearestElemPath).attr("vfixedattr", "yes"); //set attr
        //---------step 2----横排过程-----------
        console.log('200ms后水平转换');
        var settings = msg.infoSettings;
        horizRootBody(settings);
        //---------step 3---restore css----------
        var rstbodyCSS = {
            "line-height": rstLineHeight,
            "font-size": rstFontSize
        };
        $('body').css(rstbodyCSS); //根据原网页的格式改
        //匿名函数是没法使用外面的参数滴
        //---------step 4----划动到刚才的元素-----------
        //这个延时必须大于 horiz delay，否则在横排还未完成就划动了，无效

        //$(VFixedNearestElemPath)     //get the non-proto jquery ele
        //$(VFixedNearestElemPath)[0]  //get the prototype dom ele
        console.log(scroll2EleHmodeDelay + 'ms 后横版 将移动到这个路径，是否正确?');
        console.log(VFixedNearestElemPath);
        var convertedHPath = V2HPath(VFixedNearestElemPath);
        setTimeout(horizScroll, scroll2EleHmodeDelay, convertedHPath);

        //getHModeVisibleZoneCenter(arguments.callee.name); //防止scroll事件没有发生
        //console.log('刚刚恢复成横版，刷新中心点防止scroll事件没有发生');
        //匿名函数是没法使用外面的参数滴




        //---------step 5---add scroll listener in horizontal mode-------
        //50ms more delay than scroll00
        setTimeout(function() {
            addHModeListen();
        }, 800);


        //---------step 6---给popup发送回馈-------
        var feedback = {
            type: "reply",
            text: "success in horizontalizing"
        };
        sendResponse(feedback);
        //logAllProps('show.js -- sending --  ', feedback);
    }
    return true;
});