function switchTab(tabID) {
    document.querySelectorAll(".nav-list__link").forEach(link => {
        link.classList.remove("--active");
    });
    document.querySelector(`.nav-list__link[data-tab_id='${tabID}']`).classList.add("--active");
    document.querySelector(`.dialogue__content[data-tab_id='${tabID}']`).scrollIntoView({
        behavior: 'smooth'
    });
}

function allCheckboxes(clearMode) {
    document.querySelectorAll(".filters__form-checkbox").forEach(checkbox => {
        document.querySelector(`.filters__form-checkbox #checkbox${checkbox.dataset.checkbox_id}`).checked = !clearMode;
    });
}

function openFilters() {
    document.querySelector(".sidebar__content").classList.add("--active");
}

function closeFilters() {
    document.querySelector(".sidebar__content").classList.remove("--active");
}

dict = {
    business: "Детская спортивная школа",
    region: "Краснодар",
    scale: 1,
    taxSystem: 1,
    filters: [
        1, 2, 3
    ],
    query: null
}
fetch ("http://127.0.0.1:5000/api/send_data",{method:"POST",
    headers: {
        'Content-type': "application/json"
    },
    body: JSON.stringify(dict)
}) 
.then(response => {
    // console.log("response = ", response.json())
    console.log(response.status)
    return response.json()})