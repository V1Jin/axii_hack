const thisUserData = {
    business: "",
    region: "",
    scale: "",
    taxSystem: "",
    filters: [

    ],
    query: null
};

const responseData = {

};

let filtersArr = [

];

function switchTab(tabID) {
    document.querySelectorAll(".nav-list__link").forEach(link => {
        link.classList.remove("--active");
    });
    document.querySelector(`.nav-list__link[data-tab_id='${tabID}']`).classList.add("--active");
    document.querySelector(`.dialogue__content[data-tab_id='${tabID}']`).scrollIntoView({
        behavior: 'smooth'
    });
}

function selectExperienceOption(optionID) {
    document.querySelectorAll(".intro_form__content-select .select__radio").forEach(label => {
        label.classList.remove("--active");
    });
    thisUserData.taxSystem = optionID;
    document.querySelector(`.select__radio[data-option='${optionID}']`).classList.add("--active");
}

function selectBusinessOption(optionID) {
    document.querySelectorAll(".intro_form__content-select.--business_select .select__radio").forEach(label => {
        label.classList.remove("--active");
    });
    thisUserData.scale = optionID;
    document.querySelector(`.--business_select .select__radio[data-option='${optionID}']`).classList.add("--active");
}

function allCheckboxes(clearMode) {
    document.querySelectorAll(".filters__form-checkbox").forEach((checkbox) => {
        if (clearMode) {
            thisUserData.filters = [];
        } else {
            thisUserData.filters = [1, 2, 3, 4, 5, 6, 7, 8];
        }
        document.querySelector(`.filters__form-checkbox #checkbox${checkbox.dataset.checkbox_id}`).checked = !clearMode;
    });
}

document.querySelector("#next-1").onclick = () => {
    thisUserData.business = document.querySelector("#input1").value;
};

function openFilters() {
    document.querySelector(".sidebar__content").classList.add("--active");
}

function closeFilters() {
    document.querySelector(".sidebar__content").classList.remove("--active");
}

document.querySelectorAll(".filters__form-checkbox_container input").forEach(checkbox => {
    checkbox.onchange = () => {
        if (checkbox.checked) {
            filtersArr.push(+checkbox.dataset.checkbox_id);
        } else {
            filtersArr.splice(filtersArr.indexOf(checkbox.dataset.checkbox_id), 1);
        }
    };
})

function openMainWindow() {

    thisUserData.region = document.querySelector("#input4").value;
    thisUserData.filters = filtersArr;
    console.log(thisUserData);

    document.querySelector(".intro_form").classList.remove("--active");
    document.querySelector(".main_window").classList.add("--active");

    document.querySelector(".dialogue__header-title").innerHTML = "Развитие бизнеса " + thisUserData.business;
    
    document.querySelector(".dialogue__tape").innerHTML = `
    <div class="dialogue__tape-empty_message">
        <div class="sidebar__header-title">
            Axiy <span>AI</span>
        </div>
        <h1>Напишите сообщение чат-боту Axiy AI</h1>
        <p>Вы можете задать вопрос в переписке. Если у Вас нет конкретных вопросов, выберите интересующие темы в разделе Фильтры и нажмите \"Применить\"</p>
    </div>
    `;


    document.querySelector(".intro_form").style.animation = "hideIntroMenu 1s ease forwards";
}

let mockQueryData = {
    query: "Ответь мне на вопрос"
}

function getGPTContent() {


    document.querySelector(".message_loading").classList.add("--active");


    let mockData = [];

    fetch("http://axiyai.ru:5000/api/send_data", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': 'https://axiyai.ru'
        },
        // mode: 'no-cors',
        body: JSON.stringify(thisUserData)
    }).then(res => {
        return res.json();
    }).then(res => {


        document.querySelector(".message_loading").classList.remove("--active");


        mockData = res;
        
        document.querySelector(".dialogue").classList.add("--notempty");

        document.querySelector(".header__nav-list").innerHTML = "";
        document.querySelector(".dialogue__tape").innerHTML = "";

        document.querySelector(".header__nav-title").innerHTML = "Содержание";

        mockData.forEach((rec, recIndex) => {
            console.log(rec);
            document.querySelector(".header__nav-list").innerHTML += 
            `
            <div class="nav-list__link ${recIndex == 0 ? "--active" : ""}" data-tab_id="${recIndex+1}" onclick="switchTab(${recIndex+1})">
                ${rec.title}
            </div>
            `;

            document.querySelector(".dialogue__tape").innerHTML += 
            `
            <div class="dialogue__content" data-tab_id="${recIndex+1}">
                <h1 class="dialogue__content-title">
                ${rec.title}
                </h1>f
                
                <p class="dialogue__content-paragraph">
                    ${rec.content}
                </p>
            </div>
            `;
        });
    });
}

function sendGPTQuery() {

    let questionInput = document.querySelector(".dialogue__prompt-input")
    let question = questionInput.value;
    
    document.querySelector(".message_loading").classList.add("--active");

    document.querySelector(".dialogue").classList.add("--notempty");

    document.querySelector(".dialogue__tape").innerHTML += 
    `
    <div class="dialogue__userquestion">
        <div class="dialogue__userquestion-inner">
            ${question}
        </div>
    </div>
    `;

    questionInput.value = '';

    fetch("http://axiyai.ru:5000/api/send_query", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': 'https://axiyai.ru'
        },
        // mode: 'no-cors',
        body: JSON.stringify({
            query: question
        })
    }).then(res => {
        return res.json();
        
    }).then(res => {
        console.log(res);

        if (!res.query) {
            document.querySelector(".message_error").classList.add("--active");
            setTimeout(() => {
                document.querySelector(".message_error").classList.remove("--active");
            }, 3000);
        } else {

            document.querySelector(".dialogue__tape").innerHTML +=
            `
            <div class="dialogue__content dialogue__content_message">
                <h1 class="dialogue__content-title">
                Ответ на вопрос: ${question}
                </h1>
                
                <p class="dialogue__content-paragraph">
                    ${res.query}
                </p>
            </div>
            `;
        }

        document.querySelector(".message_loading").classList.remove("--active");
    });

}

document.querySelector(".dialogue__prompt").onsubmit = (e) => {
    e.preventDefault();

    sendGPTQuery();
}

document.querySelector(".filters__form-submit").onclick = getGPTContent;