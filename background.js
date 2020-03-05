//background.js 需要先卸载extension, 不然只是ctrl+r不会更新它滴
var StorageArea = chrome.storage.sync;
//StorageArea.clear(function(){console.log('clear all old storage area')});
StorageArea.get('progMode', function(result) {
    console.log('progMode before installation = ', result);
});


var manifest = chrome.runtime.getManifest()
console.log(manifest.name);
console.log(manifest.version);
if (manifest.key === undefined) //debug versoin
{
    console.log('no key found ');
    chrome.storage.sync.set({
        'progMode': 'debug'
    }, function() {});

} else { //product version
    console.log(manifest.key);
    chrome.storage.sync.set({
        'progMode': 'product'
    }, function() {});
}

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



function constructBGMSG() {
    var customInfo = {
        from: 'background',
        subject: 'verticalizeSelected'
    };

    return customInfo;
}

/*
chrome.i18n.detectLanguage("你好，dog", function(result){
  console.log(result.languages[0].language);
  console.log(result.languages[0].percentage);


});
*/

var extname = chrome.i18n.getMessage("extName");
console.log(extname);


// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");


    var newURL2 = "tips.html";
    chrome.tabs.create({ url: newURL2 });
    
    var newURL = "https://www.icrc.org";
    chrome.tabs.create({ url: newURL });

    alert('Please Restart Chrome to work on all tabs');

    }else if(details.reason == "update"){
        // var thisVersion = chrome.runtime.getManifest().version;
        // console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});
