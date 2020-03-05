var rstBodyCSS = {};

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

//-->--------------------------------

function constructCSSMSG(bodyCSS) {
    var customInfo = {
        from: 'popup',
        to: 'currentTab',
        subject: 'onlyCSSMSG',
        infoCSS: bodyCSS
    };
    logAllProps('constructCSSMSG@popup.js -- sending -- ', customInfo);
    return customInfo;
}


function constructVtlMSG(settings) {
    var customInfo = {
        from: 'popup',
        to: 'currentTab',
        subject: 'VTLWholePageMSG',
        infoSettings: settings,
    };
    logAllProps('constructVtlMSG@popup.js -- sending -- ', customInfo);
    return customInfo;
}

function constructHorizMSG(settings) {
    var customInfo = {
        from: 'popup',
        to: 'currentTab',
        subject: 'restoreHoriz',
        infoSettings: settings
    };
    logAllProps('popup.js -- sending -- ', customInfo);
    return customInfo;
}


function dealResponse(message) {
    if (message) {
        logAllProps('popup.js -- received --: ', message);
        return message.rstBodyCSS;
    }
}
//-->--------------------------------

function modifyCSS(bodyCSS) {
    settings = {};
    console.log('want to change css');
    chrome.tabs.query({
            "active": true,
            "lastFocusedWindow": true
        },
        function(tabs) {
            var tabId = tabs[0].id;
            chrome.tabs.sendMessage(tabId, constructCSSMSG(bodyCSS),
                function(response) {
                    rstBodyCSS = dealResponse(response);
                    console.log('rstBodyCSS');
                    console.log(rstBodyCSS);
                });
        });
}


function VTLWholePageMSG(settings) {
    console.log('verticalizeWholePageBtn clicked;');
    chrome.tabs.query({
            "active": true,
            "lastFocusedWindow": true
        },
        function(tabs) {
            var tabId = tabs[0].id;
            chrome.tabs.sendMessage(tabId, constructVtlMSG(settings),
                function(response) {
                    rstBodyCSS = dealResponse(response);
                    console.log('rstBodyCSS');
                    console.log(rstBodyCSS);
                });
        });
}

function horizWholePageMSG(settings) {
    //alert('restore');
    chrome.tabs.query({
            "active": true,
            "lastFocusedWindow": true
        },
        function(tabs) {
            var tabId = tabs[0].id;
            chrome.tabs.sendMessage(tabId, constructHorizMSG(settings),
                function(response) {
                    dealResponse(response);
                });
        });
}

function initializeUITexts(){
  document.getElementById("verticalizeWholePageBtn").innerHTML =
chrome.i18n.getMessage("verticalizeWholePageBtn");

  document.getElementById("horizWholePageBtn").innerHTML =
chrome.i18n.getMessage("horizWholePageBtn");

  document.getElementById("customizeFormat").innerHTML =
chrome.i18n.getMessage("customizeFormat");

  document.getElementById("labelverticalHeight").innerHTML =
chrome.i18n.getMessage("labelverticalHeight");

document.getElementById("emLabel4verticalHeight").innerHTML =
chrome.i18n.getMessage("emLabel4verticalHeight");

  document.getElementById("labelcolSpace").innerHTML =
chrome.i18n.getMessage("labelcolSpace");

  document.getElementById("labelfontSize").innerHTML =
chrome.i18n.getMessage("labelfontSize");


}

//-->--------------------------------
window.onload = function() {
    //界面文字 英文 中文
    initializeUITexts();

    var settings = {
        lang: "zh-tw",
        gap: '4em',
        height: '24em',
        fontFamily: 'serif',
        togglable: true,
        multiColumnEnabled: false
    };

    var bodyCSS = {
        "line-height": "200%",
        "font-size": "100%"
    };
    //-->--------------------------------
    var checkVtl = document.getElementById('verticalizeWholePageBtn');
    checkVtl.addEventListener('click', function() {
        VTLWholePageMSG(settings);
    }, false);

    var checkHoriz = document.getElementById('horizWholePageBtn');
    checkHoriz.addEventListener('click', function() {
        horizWholePageMSG(settings);
    }, false);

    //-->--------------------------------
    //http://stackoverflow.com/questions/14471889/jquery-keyup-delay
    var inputDelay = 400; // in ms
    function verticalHeightPostData() {
        $("#verticalHeight").css("background-color", "#D6D6FF"); //输入框颜色
        settings.height = $("#verticalHeight").val() + 'em';
        VTLWholePageMSG(settings); //这里只刷新了settings
    }
    var timerVerticalHeight;
    $("#verticalHeight").on('keyup', function() {
        timerVerticalHeight && clearTimeout(timerVerticalHeight);
        timerVerticalHeight = setTimeout(verticalHeightPostData, inputDelay);
    });
    //-->----------下面只设置CSS，跟taketori无关--------------
    //-->--------间距设置------------------------
    function colSpacePostData() { //console.log('keyup');
        $("#colSpace").css("background-color", "#D6D6FF");
        bodyCSS["line-height"] = $("#colSpace").val() + '%';
        modifyCSS(bodyCSS);
    }
    var timercolSpace;
    $("#colSpace").on('keyup', function() {
        timercolSpace && clearTimeout(timercolSpace);
        timercolSpace = setTimeout(colSpacePostData, inputDelay);
    });

    //-->--------字体设置------------------------
    function fontSizePostData() {
        $("#fontSize").css("background-color", "#D6D6FF");
        bodyCSS["font-size"] = $("#fontSize").val() + '%';
        modifyCSS(bodyCSS);
    }
    var timerfontSize;
    $("#fontSize").on('keyup', function() {
        timerfontSize && clearTimeout(timerfontSize);
        timerfontSize = setTimeout(fontSizePostData, inputDelay);
    });
    var licenseFile = chrome.extension.getURL('htmlLicense.html');
    //-->--------------------------------
    $('#license').attr('href', licenseFile);
}
