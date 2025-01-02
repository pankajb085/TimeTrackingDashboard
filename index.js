let apiData = [];
const cardData = document.getElementsByClassName("card-info");
const timeElement = document.querySelector(".time-duration");

const getWord = (className) => {
    if(className === "weekly"){
        return "week"
    }else if(className === "monthly"){
        return "month"
    }
    return "day"
};

const updateDOM = (time, className) => {
    for(let card of cardData) {
        const cardTitleEL = card.firstElementChild;
        const timeInfoEL = card.lastElementChild;

        if(cardTitleEL?.firstElementChild?.textContent === time.title){
            timeInfoEL.firstElementChild.textContent = `${time.timeframes[className].current}hrs`;
            timeInfoEL.lastElementChild.textContent = `Last ${getWord(className)} - ${time.timeframes[className].previous}hrs`;
        }
    }
};

const populateDashboard = (timeData, className) => {
    timeData.forEach((time) => updateDOM(time, className));
};

timeElement?.addEventListener("click", (e) => {
    if(e.target.localName === 'a'){
        timeElement.querySelectorAll('a').forEach((link) => {
            link.classList.remove('active');
        });

        populateDashboard(apiData, e.target.className);
        e.target.classList.add('active');
    }
});

fetch('./data.json').then((response) => {
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}).then(data => {
    apiData = data;
    populateDashboard(data, "weekly");
}).catch((error) => console.error(error));