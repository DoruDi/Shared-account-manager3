const people = [
    {
        name: "Maria",
        totalAmount: 10000,
        interestDeposit: 0,
        safekeepingDeposit: 0,
        counter: 0
    },
    {
        name: "Doru",
        totalAmount: 10000,
        interestDeposit: 0,
        safekeepingDeposit: 0,
        counter: 0
    },
    {
        name: "Cosmin",
        totalAmount: 10000,
        interestDeposit: 0,
        safekeepingDeposit: 0,
        counter: 0
    },
    {
        name: "Cristina",
        totalAmount: 10000,
        interestDeposit: 0,
        safekeepingDeposit: 0,
        counter: 0
    },
    {
        name: "Ionel",
        totalAmount: 10000,
        interestDeposit: 0,
        safekeepingDeposit: 0,
        counter: 0
    },
    {
        name: "Catalin",
        totalAmount: 10000,
        interestDeposit: 0,
        safekeepingDeposit: 0,
        counter: 0
    },
    // {
    //     name: "Andrei",
    //     totalAmount: 10000,
    //     interestDeposit: 0,
    //     safekeepingDeposit: 0,
    //     counter: 0
    // },
];
localStorage.setItem("myList", JSON.stringify({ "totalDeposit": 0 }))
localStorage.setItem("allPeopleHistory", JSON.stringify([]))


const maxDeposit = 100000;
const sectionOne = document.querySelector('.section-one');
const currentSharedAmount = document.querySelector('.currentSharedAmount');
const allHistory = []
let historyObj = [];
const historySection = document.querySelector('.section-history');
const historyTitle = document.createElement('h3');
historyTitle.innerHTML = "History";
const filterHistory = document.createElement('div');
filterHistory.classList.add('filterHistory')

const selectPerson = document.createElement('select');
selectPerson.setAttribute('id', "selectPerson");
const allPers = document.createElement('option');
allPers.setAttribute('value', "allPers");
allPers.innerText = "all Persons";
selectPerson.append(allPers)
filterHistory.append(selectPerson)

people.forEach(el => {
    const person = document.createElement('option');
    person.setAttribute('value', `${el.name}`);
    person.classList.add('selectedName');
    person.innerText = `${el.name}`;
    selectPerson.append(person);
    person.addEventListener('click', () => {
        console.log(el.totalAmount)
    })
})

const selectType = document.createElement('select');
selectType.setAttribute('id', "selectType");

const allType = document.createElement('option');
allType.setAttribute('value', "allTypes");
allType.innerText = "all Types";

const interestDepositType = document.createElement('option');
interestDepositType.setAttribute('value', "interest_Deposit");
interestDepositType.innerText = "Interest Deposit";

const safekeepingDepositType = document.createElement('option');
safekeepingDepositType.setAttribute('value', "safekeeping_Deposit");
safekeepingDepositType.innerText = "Safekeeping Deposit";

const interestWidrawType = document.createElement('option');
interestWidrawType.setAttribute('value', "widraw_from_interest");
interestWidrawType.innerText = "Interest Widraw";

const safekeepingWidrawType = document.createElement('option');
safekeepingWidrawType.setAttribute('value', "widraw_from_safekeeping");
safekeepingWidrawType.innerText = "Safekeeping Widraw";

const loseMoneyType = document.createElement('option');
loseMoneyType.setAttribute('value', "money_lose");
loseMoneyType.innerText = "Money_lose";

const dateInput = document.createElement('input');
dateInput.setAttribute('type', "date")

selectType.append(allType, interestDepositType,safekeepingDepositType,
     interestWidrawType, safekeepingWidrawType, loseMoneyType);
filterHistory.append(selectType,dateInput);



historySection.append(historyTitle, filterHistory);
const historyDiv = document.createElement('div');
historyDiv.classList.add('historyDiv');
historySection.append(historyDiv);




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


const myInterval = setInterval(increaseTotalDeposit, 5000)
function increaseTotalDeposit() {
    totalDeposit = JSON.parse(localStorage.getItem('myList')).totalDeposit;
    if (totalDeposit > 100000) {
        totalDeposit = 100000;
        localStorage.setItem("myList", JSON.stringify({ "totalDeposit": 100000}))
    }
    localStorage.setItem("myList", JSON.stringify({ "totalDeposit": totalDeposit + (totalDeposit * 3 / 100)}))
    procent = (totalDeposit * 100) / 100000;
    document.querySelector('.totalDeposit').style.height = `${procent}%`;     
    currentSharedAmount.innerHTML = `${totalDeposit.toFixed(2)} lei`;
    currentSharedAmount.style.bottom = procent > 92 ? "92%"
        : procent < 4 ? "4%"
        : `${procent}%`;
}

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
    <div class="current_deposit">
      <span class="current_interest_deposit">0 lei</span>
      <span class="current_safekeeping_deposit">0 lei</span>
    </div>
    <div class="widrawContainer">
      <button class="widrawFromInterest">widraw from interest</button>
      <button class="widrawFromSafe">widraw from safekeeping</button>
    </div> 
    <span class="personCounter">${person.counter}</span>
    `
    sectionOne.append(personDiv);

})


const depositBtns = document.getElementsByClassName("deposit");
for (let i = 0; i < depositBtns.length; i++) {
    depositBtns[i].addEventListener('click', () => handleInterestDeposit(i));
    depositBtns[i].addEventListener('click', () => addToHistory(i));
    depositBtns[i].addEventListener('click', () => updataTotalAmount(i));

}
const safekeepingBtns = document.getElementsByClassName("safekeeping");
for (let i = 0; i < safekeepingBtns.length; i++) {
    safekeepingBtns[i].addEventListener('click', () => handleSafekeepingDeposit(i));
    safekeepingBtns[i].addEventListener('click', () => addToHistory(i));
    safekeepingBtns[i].addEventListener('click', () => updataTotalAmount(i));

}
const widrawInterestBtns = document.getElementsByClassName("widrawFromInterest");
for (let i = 0; i < widrawInterestBtns.length; i++) {
    widrawInterestBtns[i].addEventListener('click', () => handleInterestWidraw(i));
    widrawInterestBtns[i].addEventListener('click', () => addToHistory(i));
    // widrawInterestBtns[i].addEventListener('click', () => updataTotalAmount(i));
}
const widrawSafekeepingBtns = document.getElementsByClassName("widrawFromSafe");
for (let i = 0; i < widrawSafekeepingBtns.length; i++) {
    widrawSafekeepingBtns[i].addEventListener('click', () => handleSafekeepingWidraw(i));
    widrawSafekeepingBtns[i].addEventListener('click', () => addToHistory(i));
    // widrawSafekeepingBtns[i].addEventListener('click', () => updataTotalAmount(i));
}
// const historyBtns = document.getElementsByClassName("history");
// for (let i = 0; i < historyBtns.length; i++) {
//     historyBtns[i].addEventListener('click', () => handleHistory(i));
// }

function handleInterestDeposit(i) {
    let depositAmount = document.getElementsByTagName('input')[i].value;
    if(depositAmount == "") {
        return;
    }
    if(depositAmount > people[i].totalAmount) {
        alert(`Your total amount is ${people[i].totalAmount}`);
        document.getElementsByTagName('input')[i].value = "";
        return;
    }
    people[i].totalAmount -= depositAmount;
    document.getElementsByClassName('personSold')[i].innerHTML = `${people[i].totalAmount} Lei`;

    
    people[i].interestDeposit += Number(depositAmount)
    document.getElementsByClassName('current_interest_deposit')[i].innerHTML = `${people[i].interestDeposit.toFixed(2)} lei`
    
    const intervalForIncreaseInterestDeposit = setInterval(increaseInterestDeposit,5000)
    function increaseInterestDeposit() {
        people[i].interestDeposit += (people[i].interestDeposit * 2.5/100);
        people[i].interestDeposit.toFixed(2)
        document.getElementsByClassName('current_interest_deposit')[i].innerHTML = `${people[i].interestDeposit.toFixed(2)} lei`
    }
    
    totalDeposit += Number(depositAmount);
    if (totalDeposit > 100000) totalDeposit = 100000;
    let procent = (totalDeposit * 100) / 100000;
    document.querySelector('.totalDeposit').style.height = `${procent}%`;
    currentSharedAmount.innerHTML = `${totalDeposit.toFixed(2)} lei`;
    currentSharedAmount.style.bottom = procent > 95 ? "92%"
        : procent < 4 ? "4%"
            : `${procent}%`;
    localStorage.setItem("myList", JSON.stringify({ "totalDeposit": totalDeposit }))
    document.getElementsByTagName('input')[i].value = "";
    // console.log(totalDeposit)
    const personHistoryObj = {
        name: people[i].name,
        date: new Date().toString().substring(0, 25),
        interest_Deposit: depositAmount
    };
    historyObj.unshift(personHistoryObj);
    localStorage.setItem("allPeopleHistory", JSON.stringify(historyObj));
    if (totalDeposit > 100000) totalDeposit = 100000;
    allPeopleHistory = JSON.parse(localStorage.getItem('allPeopleHistory'));
    console.log(allPeopleHistory, people[i].interestDeposit)
}

function handleSafekeepingDeposit(i) {
    let depositAmount = document.getElementsByTagName('input')[i].value;
    if(depositAmount == "") {
        return;
    }
    if(depositAmount > people[i].totalAmount) {
        alert(`Your total amount is ${people[i].totalAmount}`);
        document.getElementsByTagName('input')[i].value = "";
        return;
    }
    people[i].totalAmount -= depositAmount;
    document.getElementsByClassName('personSold')[i].innerHTML = `${people[i].totalAmount} Lei`;

    people[i].safekeepingDeposit += Number(depositAmount);
    document.getElementsByClassName('current_safekeeping_deposit')[i].innerHTML = `${people[i].safekeepingDeposit} lei`

    totalDeposit += Number(depositAmount);
    if (totalDeposit > 100000) totalDeposit = 100000;
    let procent = (totalDeposit * 100) / 100000;
    document.querySelector('.totalDeposit').style.height = `${procent}%`;
    currentSharedAmount.innerHTML = `${totalDeposit.toFixed(2)} lei`;
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
    historyObj.unshift(personHistoryObj);
    localStorage.setItem("allPeopleHistory", JSON.stringify(historyObj));
    console.log(people[i].safekeepingDeposit)
}

function handleInterestWidraw(i) {
    let widrawAmount = document.getElementsByTagName('input')[i].value;
    if(widrawAmount == "") {
        return;
    }
    if(widrawAmount > people[i].interestDeposit) {
        alert("maxim widraw is" +" "+ people[i].interestDeposit.toFixed(2) +" "+ "lei");
        document.getElementsByTagName('input')[i].value = "";
        return;
    } else {
        people[i].interestDeposit -= widrawAmount
    }
    people[i].totalAmount += Number(widrawAmount);
    document.getElementsByClassName('personSold')[i].innerHTML = `${people[i].totalAmount} Lei`;
    totalDeposit -= Number(widrawAmount);
    document.getElementsByClassName('current_interest_deposit')[i].innerHTML = `${people[i].interestDeposit.toFixed(2)} lei`
    
    let procent = (totalDeposit * 100) / 100000;
    document.querySelector('.totalDeposit').style.height = `${procent}%`;
    currentSharedAmount.innerHTML = `${totalDeposit.toFixed(2)} lei`;
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
    historyObj.unshift(personHistoryObj);
    localStorage.setItem("allPeopleHistory", JSON.stringify(historyObj))
}
function handleSafekeepingWidraw(i) {
    let widrawAmount = document.getElementsByTagName('input')[i].value;
    if(widrawAmount == "") {
        return;
    }
    if(widrawAmount > people[i].safekeepingDeposit) {
        alert("maxim widraw is" +" "+ people[i].safekeepingDeposit +" "+ "lei");
        document.getElementsByTagName('input')[i].value = "";
        return;
    } else {
        people[i].safekeepingDeposit -= widrawAmount
    }
    people[i].totalAmount += Number(widrawAmount);
    document.getElementsByClassName('personSold')[i].innerHTML = `${people[i].totalAmount} Lei`;
    totalDeposit -= Number(widrawAmount);
    document.getElementsByClassName('current_safekeeping_deposit')[i].innerHTML = `${people[i].safekeepingDeposit} lei`

    let procent = (totalDeposit * 100) / 100000;
    document.querySelector('.totalDeposit').style.height = `${procent}%`;
    currentSharedAmount.innerHTML = `${totalDeposit.toFixed(2)} lei`;
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
    historyObj.unshift(personHistoryObj);
    localStorage.setItem("allPeopleHistory", JSON.stringify(historyObj));
}

function addToHistory(i) {
    historyDiv.innerHTML = '';
    allPeopleHistory = JSON.parse(localStorage.getItem('allPeopleHistory'));
    allPeopleHistory.forEach(el => {
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
    // console.log(totalDeposit.toFixed(2))
}, 5000)

document.getElementById('selectPerson').addEventListener('change', function() {
    historyDiv.innerHTML = '';
    selectType.value = "allTypes"
    if(this.value == "allPers") {
        allPeopleHistory = JSON.parse(localStorage.getItem('allPeopleHistory'));
        allPeopleHistory.forEach(el => {
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
    allPeopleHistory = JSON.parse(localStorage.getItem('allPeopleHistory'));
    let filtredArr = allPeopleHistory.filter(item => item.name == this.value);
    localStorage.setItem("filtredArr", JSON.stringify(filtredArr))
    console.log(filtredArr)
    filtredArr.forEach(el => {
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
});

document.getElementById('selectType').addEventListener('change', function() {
    // console.log(this.value)
    historyDiv.innerHTML = '';
    if(this.value == "allTypes") {
        allPeopleHistory = JSON.parse(localStorage.getItem('allPeopleHistory'));
        allPeopleHistory.forEach(el => {
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
    if(selectPerson.value == "allPers") {
        allPeopleHistory = JSON.parse(localStorage.getItem('allPeopleHistory'));
        const filtredArray = allPeopleHistory.filter(item => Object.keys(item).includes(`${this.value}`));
        filtredArray.forEach(el => {
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
    filtredArr = JSON.parse(localStorage.getItem('filtredArr'));
    const filtredArray = filtredArr.filter(item => Object.keys(item).includes(`${this.value}`));
    console.log(filtredArray)
    filtredArray.forEach(el => {
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
})
const counters = document.getElementsByClassName('personCounter');
for(let i = 0; i < people.length; i++) {
    setInterval(() => {       
        people[i].counter++;
        const personHistoryObj = {
            name: people[i].name,
            date: new Date().toString().substring(0, 25),
            money_lose: (people[i].totalAmount * 5/100)
        };
        if(people[i].counter == 10)  {
            people[i].totalAmount -= (people[i].totalAmount * 5/100);
            people[i].totalAmount.toFixed(2)
            people[i].counter = 0;
            totalDeposit += (people[i].totalAmount * 5/100);
            localStorage.setItem("myList", JSON.stringify({ "totalDeposit": totalDeposit }))
            currentSharedAmount.innerHTML = `${totalDeposit.toFixed(2)} lei`;
            document.getElementsByClassName('personSold')[i].innerHTML = `${people[i].totalAmount.toFixed(2)} Lei`;
           
            console.log(people[i].totalAmount)
            historyObj.unshift(personHistoryObj);
            localStorage.setItem("allPeopleHistory", JSON.stringify(historyObj));
            allPeopleHistory = JSON.parse(localStorage.getItem('allPeopleHistory'));
            addToHistory()
        }
            
        counters[i].innerHTML = people[i].counter;       
    }, 10000) 
}
function updataTotalAmount(i) {
    people[i].counter = 0;
    document.getElementsByClassName('personCounter')[i].innerHTML = "0"
}


