var data = [];
var choice = document.querySelector('.select');
var pushbtn = document.querySelector('.pushbtn');
var choicetitle = document.querySelector('.title');
var datalist = document.querySelector('.list');
var pagelist = document.querySelector('.pagelist');
var pagination = document.querySelector(".pagination");
var prevBtn = document.querySelector(".prevBtn");
var nextBtn = document.querySelector(".nextBtn");

pagelist.addEventListener('click', pagelistclick);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

var datalimit = 10; //每頁資料上限
var curentPage = 0; //現在所在頁數
var curentarea = []; //目前區域資料
var start = curentPage * datalimit;
var url;
var xhr = new XMLHttpRequest();
alert(xhr.readyState)
if (xhr.readyState == 0) {
    url = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';
    alert('ddd');
} else {
    url = 'https://hotman0901.github.io/travel/json/datastore_search.json';
}
xhr.open('get', url, true);
xhr.send(null);
xhr.onload = function() {
    console.log(xhr.responseText);
    data = JSON.parse(xhr.responseText);
    console.log(data); //取回來的資料
    list = data.result.records; //存入list變數


    attractionLen = list.length; //取回來的資料總長度
    // console.log(attractionLen);
    var allArea = []; //存放區域名字
    var filterArea;
    for (var i = 0; i < attractionLen; i++) { //存放所有區域名字(含重複的資料)
        allArea.push(list[i].Zone);
    }

    filterArea = allArea.filter(function(item, i, array) { //過濾重複的區域名字
        // console.log(item, i, array);
        return array.indexOf(item) === i;
    });
    // console.log(filterArea)

    var selectval = '';
    for (var i = 0; i < filterArea.length; i++) { // //將排除所有地區的重複資料後放入selectArea中
        selectval += '<option>' + filterArea[i] + '</option>';
        choice.innerHTML = '<option>--請選擇行政區--</option>' + selectval;
    }

    contentupdate();

}

choice.addEventListener("change", selectArea, false); //選擇行政區
pushbtn.addEventListener("click", hotArea, false); //熱門行政區

// --------------------------------------- //
//選擇行政區
function selectArea(e) {
    curentPage = 0;
    var selectStr = e.target.value; //取得選擇的資料
    insertData(selectStr);
}

// --------------------------------------- //
//熱門行政區
function hotArea(e) {
    // console.log(e)
    // console.log(e.target.type);
    if (e.target.type !== "button") { return; } //判斷觸發事件tpye
    var ckeckStr = e.target.value;
    alert(ckeckStr);
    insertData(ckeckStr);


}

// --------------------------------------- //



function insertData(text) {
    datalist.innerHTML = "";
    let norepeatdata = []; //存放已排除重複資料
    for (let i = 0; i < list.length; i++) {
        if (text == list[i].Zone) { // 找出同一區的資料，text是選擇的區域名字
            norepeatdata.push(list[i]);
            choicetitle.textContent = text + norepeatdata.length + "筆";
        } else if (text == "") {
            choicetitle.textContent = "目前尚無該區資料";
        }
    }
    console.log(norepeatdata);
    if (norepeatdata == '') {

    }
    curentarea = norepeatdata;
    let start = curentPage * datalimit;
    showviewInfo(start, datalimit);
    showpagelist();
}

// 顯示景點內容
function showviewInfo(start = 0, end = Infinity) {
    let Contyrarea;
    Contyrarea = curentarea;
    var str = "";
    for (var i = start; i < Contyrarea.length && i < end; i++) {
        str += `<div class="info">
                    <div class="list-img" style="background-image: url(${Contyrarea[i].Picture1})">
                    <h2>${Contyrarea[i].Name}</h2>
                    <label>${Contyrarea[i].Zone}</label>
                    </div>
                    <div class="outer">
                    <div class="info-detail">
                    <p><img src="../image/icons_pin.png" alt="">${Contyrarea[i].Opentime}</p>
                    <p><img src="../image/icons_clock.png" alt="">${Contyrarea[i].Add}</p>
                    <p><img src="../image/icons_phone.png" alt="">${Contyrarea[i].Tel}<label class="tag"><img src="../image/icons_tag.png" alt="">${Contyrarea[i].Ticketinfo}</label></p>
                    </div>
                    </div>
                    </div>`;
    }
    datalist.innerHTML = str;

}

function showpagelist() {
    // var list = document.querySelector('.pagelist');
    pagelist.innerHTML = '';
    var length = Math.ceil(curentarea.length / datalimit);
    for (let i = 0; i < length; i++) {
        let active = i === curentPage ? 'active' : '';
        pagelist.innerHTML += `<a class="${active}" data-index="${i}" href="">${i+1}</a>`;
    }
    if (curentPage <= 0) {
        prevBtn.classList.add('disabled');
        prevBtn.href;
    } else {
        prevBtn.classList.remove('disabled');
    }
    if (curentPage >= length - 1) {
        nextBtn.classList.add('disabled');
    } else {
        nextBtn.classList.remove('disabled');

    }

}

function pagelistclick(e) {
    e.preventDefault();
    console.log(e.target.nodeName);
    if (e.target.nodeName !== 'A') { retrun; }

    curentPage = parseInt(e.target.dataset.index);
    console.log(curentPage);
    let start = curentPage * datalimit;
    showviewInfo(start, start + datalimit);
    showpagelist();
}

function prev(e) {
    e.preventDefault();
    curentPage -= 1;
    console.log(curentPage);
    let start = curentPage * datalimit;
    showviewInfo(start, start + datalimit);
    showpagelist();
}

function next(e) {
    e.preventDefault();
    curentPage += 1;
    let start = curentPage * datalimit;
    showviewInfo(start, start + datalimit);
    showpagelist();
}

function contentupdate() {
    let start = curentPage * datalimit;
    showviewInfo(start, datalimit);
    showpagelist();
}