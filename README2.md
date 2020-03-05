#網頁文字豎排 chrome擴展
網頁文字重新排版: 豎着寫，從右到左。適合亞洲文字的閱讀方式

##--×----------安裝鏈接
https://chrome.google.com/webstore/detail/%E7%B6%B2%E9%A0%81%E6%96%87%E5%AD%97%E8%B1%8E%E6%8E%92/dhdfpijlmfebebnjcmpoeigbjekfmjmf

##--×----------滾動頁面
問: 豎排，或放大頁面後，找不到"水平滾動條"?
答: 請先下拉垂直滾動條到底，留意屏幕最下方。

*筆記本觸摸板 兩指頭同時移動，可以"快速滾動頁面。"
*光標左右鍵可慢慢移動頁面。

但是pageUp pageDown就失效了，沒法水平的滾頁。(后续我会添加支持)

##--×----------目前的缺陷
1. 延遲
大多數頁面豎排後會讓人找不着北，尤其很長的網頁。
爲了方便閱讀，我在程式裏加了一個jquery-nearest的算法 
源自gilmoreorless的大作[jquery-nearest](http://gilmoreorless.github.io/jquery-nearest/demo/)
每次豎排，頁面會先記錄你在橫排模式下，剛剛已經瀏覽到哪個元素
豎排完成後，程式會去豎排頁面裏查找那個元素，跳到它的附近。
這個跳轉過程大概有半秒的延時(有時候跳轉會失敗，需要手工再找啦)
所以每次豎排請耐心等待一點時間。

2. 關於格式
目前對有些網站支持不好，
比如 有些网站
翻轉以後每列字數被限制住了,程式界面設置不起作用。

但對 有些文本较多的网站 的支持還可以

##--×----------附錄: 關於算法
程式中豎排文檔的算法並非源自本人，而是拷貝自cmonos的大作:
	[竹取 Web](http://taketori.org/)
[TAKETORI-JS@github](https://github.com/cmonos/TAKETORI-JS)

###
Ubuntu 命令行改變chrome語言
echo $LANGUAGE  //en_US
LANGUAGE="zh_TW";
google-chrome&


