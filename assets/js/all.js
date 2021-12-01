"use strict";

var data = []; // Axios

axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json').then(function (response) {
  data = response.data.data;
  init();
  c3Chart();
}); //  選取下方卡片資料區

var cardArea = document.querySelector(".cardArea"); // 選取篩選資料筆數

var filterNum = document.querySelector('.filterNum'); // init

function init() {
  // 卡片資料區初始化
  var cards = ""; // 篩選筆數初始化

  var amount = 0; // 遍歷當前所有資料 => 初始化

  data.forEach(function (item) {
    // 宣告、設定卡片樣板，遍歷後累積成卡片資料區的內容
    var content = "\n      <div class=\"relative rounded-xl shadow-md\">\n      <h3 class=\"bg-primaryColor-light text-white px-5 py-2 w-24  text-lg text-center rounded-r-lg absolute -top-5\">\n        ".concat(item.area, "\n      </h3>\n      <img src=\"").concat(item.imgUrl, "\" alt=\"").concat(item.area, "\" class=\"w-full h-190 object-cover rounded-t-lg\">\n      <p class=\"bg-primaryColor-dark w-10 text-white text-center rounded px-2 absolute top-44\">").concat(item.rate, "</p>\n      <div class=\"rounded-b-lg\">\n        <div class=\"flex flex-col justify-between  h-336 pt-5 pb-4 px-7\">\n          <div>\n            <h4 class=\"text-2xl text-priamryColor border-b-4 border-primaryColor leading-10 mb-4\">").concat(item.name, "</h4>\n            <p class=\"text-gray-500 leading-7 mb-8\">\n              ").concat(item.description, "\n            </p>\n          </div>\n          <div class=\"flex justify-between items-center text-primaryColor font-medium\">\n            <p>\n              <i class=\"fas fa-exclamation-circle mr-1\"></i>\n              \u5269\u4E0B\u6700\u5F8C ").concat(item.group, " \u7D44\n            </p>\n            <div class=\"flex items-center text-primary-Color\">\n              <p class=\"mr-1\">TWD</p>\n              <h5 class=\"text-4xl\">").concat(item.price, "</h5>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    "); // 卡片資料區加入遍歷過的 content 內容

    cards += content; // 計算篩選筆數

    amount += 1;
  }); // 修改卡片資料區 html 資料

  cardArea.innerHTML = cards; // 把 amount 累積計算後的筆數修改到html上

  filterNum.innerHTML = "\u672C\u6B21\u7BE9\u9078\u5171 ".concat(amount, " \u7B46\u8CC7\u6599");
} // ---下方篩選器---


var filter = document.querySelector('#filter'); // 卡片內容樣板，拉出來到全域環境

function cardContent(item) {} //  Filter 篩選器 - 第 1 層 監聽


filter.addEventListener('change', function (e) {
  // 卡片資料區初始化
  var cards = ""; // 篩選筆數初始化

  var amount = 0; // 第 2 層 forEach 遍歷資料

  data.forEach(function (item) {
    // 宣告、設定卡片樣板，遍歷後累積成卡片資料區的內容
    var content = "\n      <div class=\"relative rounded-xl shadow-md\">\n      <h3 class=\"bg-primaryColor-light text-white px-5 py-2 w-24  text-lg text-center rounded-r-lg absolute -top-5\">\n        ".concat(item.area, "\n      </h3>\n      <img src=\"").concat(item.imgUrl, "\" alt=\"").concat(item.area, "\" class=\"w-full h-190 object-cover rounded-t-lg\">\n      <p class=\"bg-primaryColor-dark w-10 text-white text-center rounded px-2 absolute top-44\">").concat(item.rate, "</p>\n      <div class=\"rounded-b-lg\">\n        <div class=\"flex flex-col justify-between  h-336 pt-5 pb-4 px-7\">\n          <div>\n            <h4 class=\"text-2xl text-priamryColor border-b-4 border-primaryColor leading-10 mb-4\">").concat(item.name, "</h4>\n            <p class=\"text-gray-500 leading-7 mb-8\">\n              ").concat(item.description, "\n            </p>\n          </div>\n          <div class=\"flex justify-between items-center text-primaryColor font-medium\">\n            <p>\n              <i class=\"fas fa-exclamation-circle mr-1\"></i>\n              \u5269\u4E0B\u6700\u5F8C ").concat(item.group, " \u7D44\n            </p>\n            <div class=\"flex items-center text-primary-Color\">\n              <p class=\"mr-1\">TWD</p>\n              <h5 class=\"text-4xl\">").concat(item.price, "</h5>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    "); // 第三層 if 條件判斷

    if (e.target.value === item.area) {
      cards += content;
      amount += 1;
    } else if (e.target.value === "all") {
      cards += content;
      amount += 1;
    }
  });
  cardArea.innerHTML = cards;
  filterNum.innerHTML = "\u672C\u6B21\u7BE9\u9078\u5171 ".concat(amount, " \u7B46\u8CC7\u6599");
}); // ---上方新增套票---
// 按鈕選取做監聽

var btn = document.querySelector('.btn'); // 宣告變數 => 取值用

var tikketName = document.querySelector('.tikketName');
var imgUrl = document.querySelector('.imgUrl');
var area = document.querySelector('.area');
var price = document.querySelector('.price');
var group = document.querySelector('.group');
var rate = document.querySelector('.rate');
var description = document.querySelector('.description'); //  監聽事件

btn.addEventListener('click', function (e) {
  // 先判斷星級是否正確
  if (rate.value >= 1 && rate.value <= 10) {
    // 星級正確
    // 宣告一個物件 => 之後要符合 data 資料結構
    var obj = {}; // 將 obj 賦值，名稱結構比照 data

    obj.id = data.length;
    obj.name = tikketName.value;
    obj.imgUrl = imgUrl.value;
    obj.area = area.value;
    obj.price = parseInt(price.value);
    obj.group = parseInt(group.value);
    obj.rate = parseInt(rate.value);
    obj.description = description.value; // 把建立好的 obj 物件 push 到 data陣列資料裡面

    data.push(obj); // 再次執行初始化，重新跑過 data內的資料，然後渲染 HTML

    init(); // 重新跑過C3.js圖表

    c3Chart(); // 重置filter到全部地區

    filter.value = filter.options[1].value;
  } else {
    // 星級錯誤
    alert('星級填寫錯誤');
    event.preventDefault();
    return;
  } // 重置輸入欄位的值


  tikketName.value = "";
  imgUrl.value = "";
  area.value = "";
  price.value = "";
  group.value = "";
  rate.value = "";
  description.value = ""; // 取消input type=submit 原本預設的 post 行為

  event.preventDefault();
});

function c3Chart() {
  // 篩選資料
  var newObj = {};
  data.forEach(function (item) {
    if (newObj[item.area] == undefined) {
      newObj[item.area] = 1;
    } else {
      newObj[item.area] += 1;
    }
  }); // 處理資料

  var newData = [];
  var area = Object.keys(newObj);
  area.forEach(function (item) {
    var arr = [];
    arr.push(item);
    arr.push(newObj[item]);
    newData.push(arr);
  }); // 套入C3.js

  var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: newData,
      type: "donut",
      colors: {
        "台北": "#00807E",
        "台中": "#64C3BF",
        "高雄": "#007572"
      }
    },
    donut: {
      title: "套票地區比重",
      label: {
        show: false
      },
      padAngle: .03,
      width: 20
    }
  });
}

;
//# sourceMappingURL=all.js.map
