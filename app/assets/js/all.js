let data = [];

// Axios
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(function (response) {
    data = response.data.data;

    init();
  })


//  選取下方卡片資料區
const cardArea = document.querySelector(".cardArea");
// 選取篩選資料筆數
const filterNum = document.querySelector('.filterNum');

// init
function init() {
  // 卡片資料區初始化
  let cards = "";
  // 篩選筆數初始化
  let amount = 0;

  // 遍歷當前所有資料 => 初始化
  data.forEach(function (item) {
    // 宣告、設定卡片樣板，遍歷後累積成卡片資料區的內容
    let content = `
      <div class="relative rounded-xl shadow-md">
      <h3 class="bg-primaryColor-light text-white px-5 py-2 w-24  text-lg text-center rounded-r-lg absolute -top-5">
        ${item.area}
      </h3>
      <img src="${item.imgUrl}" alt="${item.area}" class="w-full h-190 object-cover rounded-t-lg">
      <p class="bg-primaryColor-dark w-10 text-white text-center rounded px-2 absolute top-44">${item.rate}</p>
      <div class="rounded-b-lg">
        <div class="flex flex-col justify-between  h-336 pt-5 pb-4 px-7">
          <div>
            <h4 class="text-2xl text-priamryColor border-b-4 border-primaryColor leading-10 mb-4">${item.name}</h4>
            <p class="text-gray-500 leading-7 mb-8">
              ${item.description}
            </p>
          </div>
          <div class="flex justify-between items-center text-primaryColor font-medium">
            <p>
              <i class="fas fa-exclamation-circle mr-1"></i>
              剩下最後 ${item.group} 組
            </p>
            <div class="flex items-center text-primary-Color">
              <p class="mr-1">TWD</p>
              <h5 class="text-4xl">${item.price}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
    // 卡片資料區加入遍歷過的 content 內容
    cards += content;

    // 計算篩選筆數
    amount += 1;
  })

  // 修改卡片資料區 html 資料
  cardArea.innerHTML = cards;
  // 把 amount 累積計算後的筆數修改到html上
  filterNum.innerHTML = `本次篩選共 ${amount} 筆資料`;
}




// ---下方篩選器---
const filter = document.querySelector('#filter');

//  Filter 篩選器 - 第 1 層 監聽
filter.addEventListener('change', function (e) {
  // 卡片資料區初始化
  let cards = "";
  // 篩選筆數初始化
  let amount = 0;

  // 第 2 層 forEach 遍歷資料
  data.forEach(function (item) {

    // 宣告、設定卡片樣板，遍歷後累積成卡片資料區的內容
    let content = `
      <div class="relative rounded-xl shadow-md">
      <h3 class="bg-primaryColor-light text-white px-5 py-2 w-24  text-lg text-center rounded-r-lg absolute -top-5">
        ${item.area}
      </h3>
      <img src="${item.imgUrl}" alt="${item.area}" class="w-full h-190 object-cover rounded-t-lg">
      <p class="bg-primaryColor-dark w-10 text-white text-center rounded px-2 absolute top-44">${item.rate}</p>
      <div class="rounded-b-lg">
        <div class="flex flex-col justify-between  h-336 pt-5 pb-4 px-7">
          <div>
            <h4 class="text-2xl text-priamryColor border-b-4 border-primaryColor leading-10 mb-4">${item.name}</h4>
            <p class="text-gray-500 leading-7 mb-8">
              ${item.description}
            </p>
          </div>
          <div class="flex justify-between items-center text-primaryColor font-medium">
            <p>
              <i class="fas fa-exclamation-circle mr-1"></i>
              剩下最後 ${item.group} 組
            </p>
            <div class="flex items-center text-primary-Color">
              <p class="mr-1">TWD</p>
              <h5 class="text-4xl">${item.price}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

    // 第三層 if 條件判斷
    if (e.target.value === item.area) {
      cards += content;
      amount += 1;
    } else if (e.target.value === "all") {
      cards += content;
      amount += 1;
    }
  })
  cardArea.innerHTML = cards;
  filterNum.innerHTML = `本次篩選共 ${amount} 筆資料`;
});



// ---上方新增套票---

// 按鈕選取做監聽
const btn = document.querySelector('.btn')

// 宣告變數 => 取值用
const tikketName = document.querySelector('.tikketName');
const imgUrl = document.querySelector('.imgUrl');
const area = document.querySelector('.area');
const price = document.querySelector('.price');
const group = document.querySelector('.group');
const rate = document.querySelector('.rate');
const description = document.querySelector('.description');

//  監聽事件
btn.addEventListener('click', function (e) {

  // 先判斷星級是否正確
  if (rate.value >= 1 && rate.value <= 10) {
    // 星級正確

    // 宣告一個物件 => 之後要符合 data 資料結構
    let obj = {};

    // 將 obj 賦值，名稱結構比照 data
    obj.id = data.length;
    obj.name = tikketName.value;
    obj.imgUrl = imgUrl.value;
    obj.area = area.value;
    obj.price = parseInt(price.value);
    obj.group = parseInt(group.value);
    obj.rate = parseInt(rate.value);
    obj.description = description.value;

    // 把建立好的 obj 物件 push 到 data陣列資料裡面
    data.push(obj);

    // 再次執行初始化，重新跑過 data內的資料，然後渲染 HTML
    init();

    // 重置filter到全部地區
    filter.value = filter.options[1].value;

  } else {
    // 星級錯誤
    alert('星級填寫錯誤');
    event.preventDefault();
    return
  }


  // 重置輸入欄位的值
  tikketName.value = "";
  imgUrl.value = "";
  area.value = "";
  price.value = "";
  group.value = "";
  rate.value = "";
  description.value = "";

  // 取消input type=submit 原本預設的 post 行為
  event.preventDefault();
})
