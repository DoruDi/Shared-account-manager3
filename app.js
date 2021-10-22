const people = [
    {
        name: "Maria",
        totalAmount: 10000,
        history: []
    },
    {
        name: "Doru",
        totalAmount: 10000,
        history: []
    },
    {
        name: "Cosmin",
        totalAmount: 10000,
        history: []
    },
    {
        name: "Cristina",
        totalAmount: 10000,
        history: []
    },
    {
        name: "Ionel",
        totalAmount: 10000,
        history: []
    }];
localStorage.setItem("myList", JSON.stringify({ "totalDeposit": 0 }))
localStorage.setItem("allPeopleHistory", JSON.stringify([]))


const maxDeposit = 100000;
const sectionOne = document.querySelector('.section-one');
const currentSharedAmount = document.querySelector('.currentSharedAmount');
const allHistory = []
let historyObj = [];

let totalDeposit = 0;
if (totalDeposit > maxDeposit) { totalDeposit = maxDeposit };
if (localStorage.getItem('myList')) {
    totalDeposit = JSON.parse(localStorage.getItem('myList')).totalDeposit;
} else {
    localStorage.setItem("myList", JSON.stringify({ "totalDeposit": 0 }))
}
totalDeposit.toFixed(2)

if (localStorage.getItem('allPeopleHistory')) {
    allPeopleHistory = JSON.parse(localStorage.getItem('allPeopleHistory'));
} else {
    localStorage.setItem("allPeopleHistory", JSON.stringify([]))
}

if (localStorage.getItem('historyObj')) {
    historyObj = JSON.parse(localStorage.getItem('historyObj'));
} else {
    localStorage.setItem("historyObj", JSON.stringify([]))
}


if (totalDeposit > 100000) totalDeposit = 100000;
let procent = (totalDeposit * 100) / 100000;
document.querySelector('.totalDeposit').style.height = `${procent}%`;
currentSharedAmount.innerHTML = `${totalDeposit}`;
currentSharedAmount.style.bottom = procent > 95 ? "92%"
    : procent < 4 ? "4%"
        : `${procent}%`;


// const myInterval = setInterval(increaseTotalDeposit, 5000)
// function increaseTotalDeposit() {
//     totalDeposit = JSON.parse(localStorage.getItem('myList')).totalDeposit;
//     if (totalDeposit > 100000) {
//         totalDeposit = 100000;
//         localStorage.setItem("myList", JSON.stringify({ "totalDeposit": 100000}))
//     }
//     localStorage.setItem("myList", JSON.stringify({ "totalDeposit": totalDeposit + (totalDeposit * 3 / 100)}))
//     procent = (totalDeposit * 100) / 100000;
//     document.querySelector('.totalDeposit').style.height = `${procent}%`;     
//     currentSharedAmount.innerHTML = `${totalDeposit.toFixed(2)} lei`;
//     currentSharedAmount.style.bottom = procent > 92 ? "92%"
//         : procent < 4 ? "4%"
//         : `${procent}%`;
// }

people.forEach((person, index) => {
    const personDiv = document.createElement('div');
    personDiv.classList.add("personDiv");
    personDiv.innerHTML = `
    
    <span class="personName">${person.name}</span>
    <span class="personSold">${person.totalAmount} Lei</span>
    <input type="number" placeholder="amount">
    <div class="depositContainer">
      <button class="deposit">interest deposit</button>
      <button class="safekeeping">safekeep deposit</button>
    </div>
    <div class="widrawContainer">
      <button class="widrawFromInterest">widraw from interest</button>
      <button class="widrawFromSafe">widraw from safekeeping</button>
    </div> 
    <div class="history_acounts">
       <button class="history">history</button>
       <button class="acounts">acounts</button>
    </div>
    `
    sectionOne.append(personDiv);

})


const depositBtns = document.getElementsByClassName("safekeeping");
for (let i = 0; i < depositBtns.length; i++) {
    depositBtns[i].addEventListener('click', () => handleInterestDeposit(i));
}
const safekeepingBtns = document.getElementsByClassName("deposit");
for (let i = 0; i < safekeepingBtns.length; i++) {
    safekeepingBtns[i].addEventListener('click', () => handleSafekeepingDeposit(i));
}
const widrawInterestBtns = document.getElementsByClassName("widrawFromInterest");
for (let i = 0; i < widrawInterestBtns.length; i++) {
    widrawInterestBtns[i].addEventListener('click', () => handleInterestWidraw(i));
}
const widrawSafekeepingBtns = document.getElementsByClassName("widrawFromSafe");
for (let i = 0; i < widrawSafekeepingBtns.length; i++) {
    widrawSafekeepingBtns[i].addEventListener('click', () => handleSafekeepingWidraw(i));
}
const historyBtns = document.getElementsByClassName("history");
for (let i = 0; i < historyBtns.length; i++) {
    historyBtns[i].addEventListener('click', () => handleHistory(i));
}

function handleInterestDeposit(i) {
    let depositAmount = document.getElementsByTagName('input')[i].value;
    people[i].totalAmount -= depositAmount;
    document.getElementsByClassName('personSold')[i].innerHTML = `${people[i].totalAmount} Lei`;

    totalDeposit += Number(depositAmount);
    if (totalDeposit > 100000) totalDeposit = 100000;
    let procent = (totalDeposit * 100) / 100000;
    document.querySelector('.totalDeposit').style.height = `${procent}%`;
    currentSharedAmount.innerHTML = `${totalDeposit} lei`;
    currentSharedAmount.style.bottom = procent > 95 ? "92%"
        : procent < 4 ? "4%"
            : `${procent}%`;
    localStorage.setItem("myList", JSON.stringify({ "totalDeposit": totalDeposit }))
    document.getElementsByTagName('input')[i].value = "";
    console.log(totalDeposit)
    const personHistoryObj = {
        name: people[i].name,
        date: new Date().toString().substring(0, 25),
        interest_Deposit: depositAmount
    };
    historyObj.push(personHistoryObj);
    localStorage.setItem("allPeopleHistory", JSON.stringify(historyObj));
    if (totalDeposit > 100000) totalDeposit = 100000;
}

function handleSafekeepingDeposit(i) {
    let depositAmount = document.getElementsByTagName('input')[i].value;
    people[i].totalAmount -= depositAmount;
    document.getElementsByClassName('personSold')[i].innerHTML = `${people[i].totalAmount} Lei`;

    totalDeposit += Number(depositAmount);
    if (totalDeposit > 100000) totalDeposit = 100000;
    let procent = (totalDeposit * 100) / 100000;
    document.querySelector('.totalDeposit').style.height = `${procent}%`;
    currentSharedAmount.innerHTML = `${totalDeposit} lei`;
    currentSharedAmount.style.bottom = procent > 95 ? "92%"
        : procent < 4 ? "4%"
            : `${procent}%`;
    localStorage.setItem("myList", JSON.stringify({ "totalDeposit": totalDeposit }))
    document.getElementsByTagName('input')[i].value = "";
    console.log(totalDeposit)
    const personHistoryObj = {
        name: people[i].name,
        date: new Date().toString().substring(0, 25),
        safekeeping_Deposit: depositAmount
    };
    historyObj.push(personHistoryObj);
    localStorage.setItem("allPeopleHistory", JSON.stringify(historyObj));
}

function handleInterestWidraw(i) {
    let widrawAmount = document.getElementsByTagName('input')[i].value;
    people[i].totalAmount += Number(widrawAmount);
    document.getElementsByClassName('personSold')[i].innerHTML = `${people[i].totalAmount} Lei`;
    totalDeposit -= Number(widrawAmount);
    let procent = (totalDeposit * 100) / 100000;
    document.querySelector('.totalDeposit').style.height = `${procent}%`;
    currentSharedAmount.innerHTML = `${totalDeposit} lei`;
    currentSharedAmount.style.bottom = procent > 80 ? "80%"
        : procent < 8 ? "4%"
            : `${procent}%`;
    document.getElementsByTagName('input')[i].value = "";
    localStorage.setItem("myList", JSON.stringify({ "totalDeposit": totalDeposit }))
    const personHistoryObj = {
        name: people[i].name,
        date: new Date().toString().substring(0, 25),
        widraw_from_interest: widrawAmount
    };
    historyObj.push(personHistoryObj);
    localStorage.setItem("allPeopleHistory", JSON.stringify(historyObj))
}
function handleSafekeepingWidraw(i) {
    let widrawAmount = document.getElementsByTagName('input')[i].value;
    people[i].totalAmount += Number(widrawAmount);
    document.getElementsByClassName('personSold')[i].innerHTML = `${people[i].totalAmount} Lei`;
    totalDeposit -= Number(widrawAmount);
    let procent = (totalDeposit * 100) / 100000;
    document.querySelector('.totalDeposit').style.height = `${procent}%`;
    currentSharedAmount.innerHTML = `${totalDeposit} lei`;
    currentSharedAmount.style.bottom = procent > 80 ? "80%"
        : procent < 8 ? "4%"
            : `${procent}%`;
    document.getElementsByTagName('input')[i].value = "";
    localStorage.setItem("myList", JSON.stringify({ "totalDeposit": totalDeposit }))
    const personHistoryObj = {
        name: people[i].name,
        date: new Date().toString().substring(0, 25),
        widraw_from_safekeeping: widrawAmount
    };
    historyObj.push(personHistoryObj);
    localStorage.setItem("allPeopleHistory", JSON.stringify(historyObj));
}
const historySection = document.querySelector('.section-history');

const historyDiv = document.createElement('div');
historyDiv.classList.add('historyDiv');
historySection.append(historyDiv)

function handleHistory(i) {
    historyDiv.innerHTML = '';
    const historyTitle = document.createElement('h3')
    historyDiv.append(historyTitle)
    historyTitle.innerHTML = `${people[i].name}'s history`
    allPeopleHistory = JSON.parse(localStorage.getItem('allPeopleHistory'));
    const filtredPeople = allPeopleHistory.filter(item => item.name == people[i].name)
    filtredPeople.forEach(el => {
        const elArray = Object.entries(el)
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('eventDiv');
        eventDiv.innerHTML = `
        <span>${elArray[0][0]}: ${elArray[0][1]}</span>
        <span>${elArray[1][0]}: ${elArray[1][1]}</span>
        <span>${elArray[2][0]}: ${elArray[2][1]} lei</span>
        `
        historyDiv.append(eventDiv)
    })

}
setInterval(() => {
    totalDeposit = JSON.parse(localStorage.getItem('myList')).totalDeposit;
    console.log(totalDeposit.toFixed(2))
}, 5000)

