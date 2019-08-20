var data = [];
var choice = document.querySelector('.select');
var choicetitle = document.querySelector('.title');
var list = document.querySelector('.list');
var str = '';
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send();
xhr.onload = function() {
    data = JSON.parse(xhr.responseText);
    data = data.result.records;
    console.log(data);
    const set = new Set();
    const result = data.filter(item => !set.has(item.Zone) ? set.add(item.Zone) : false);
    console.log(result);
    result.forEach(item => {
        console.log(item.Zone);
        str += `<option>${item.Zone}</option>`
        choice.innerHTML = `<option value="">--請選擇行政區--</option>${str}`;
    });
    choice.addEventListener('change', function(e) {
        var searchValue = e.target.value;
        getdata(searchValue);

        // console.log(idList);
    })
}

function getdata(searchValue) {
    const idList = data.map(item => Object.values(item)[1]);
    // console.log(searchValue);
    // console.log(result);
    var content = '';
    idList.forEach((item, index) => {
        if (searchValue == item) {
            choicetitle.textContent = data[index].Zone;
            content += `<div class="info">
                <div class="list-img" style="background-image: url(${data[index].Picture1})">
                <h2>${ data[index].Name}</h2>
                <label>${ data[index].Zone}</label>
                </div>
                <div class="outer">
                <div class="info-detail">
                <p><img src="../image/icons_pin.png" alt="">${ data[index].Opentime}</p>
                <p><img src="../image/icons_clock.png" alt="">${ data[index].Add}</p>
                <p><img src="../image/icons_phone.png" alt="">${ data[index].Tel}<label class="tag"><img src="../image/icons_tag.png" alt="">${data[index].Ticketinfo}</label></p>
                </div>
                </div>
                </div>`
            list.innerHTML = content;
            console.log(data[index]);
            //     console.log(typeof(item));
            //     console.log(index);
            //     console.log(item.Zone);
            //     // console.log(index)
        }
    })

}