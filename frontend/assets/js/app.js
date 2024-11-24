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

    document.querySelector(".intro_form").style.animation = "hideIntroMenu 1s ease forwards";
}

let mockQueryData = {
    query: "Ответь мне на вопрос"
}

function getGPTContent() {
    fetch("http://128.69.179.162:5001/api/send_query", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': 'https://axiyai.ru'
        },
        // mode: 'no-cors',
        body: JSON.stringify(mockQueryData)
    });
}

document.querySelector(".filters__form-submit").onclick = getGPTContent;