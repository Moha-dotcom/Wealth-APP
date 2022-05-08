


const main = document.getElementById('main');
const adduser = document.querySelector('#add-user');
const double = document.querySelector('#double');
const showmillionaire = document.querySelector('#show-millionaires');
const sorting= document.querySelector('#sorting');
const calculateWealth = document.querySelector('#calculate-wealth');



let data = [];


//fetch random user and add money

async function getRandomUser(){
   const res = await fetch('https://randomuser.me/api');
   const data = await res.json();
    const user = data.results[0];
    console.log(user)

    const newUser = {
        name : `${user["name"].first} ${user["name"].last}`,
        money:  Math.floor(Math.random() * 1000000)
    }

    addData(newUser);


}

// for (let i = 0; i<5; i++ ){
//     getRandomUser();
// }


function addData(personData){

    data.push(personData);

    UpdateDOM();



}




function UpdateDOM(providedData = data) {
    // clear main div
    main.innerHTML =' <h3><strong >Person</strong>Wealth</h3>'
    //Loop through Person data
    providedData.forEach((item) => {



        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;

        main.append(element);
    })


}


function formatMoney (number){
    return ` $ ${(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}



function  doubleMoney(){
    // var person = document.querySelectorAll('.person');
     data = data.map( x => {
        return {...x , money: x.money * 2};
    })
    UpdateDOM()
   // for(let i = 0; i<person.length; i++){
   //     person[i].innerHTML = `<strong>${data[i].name}</strong> ${formatMoney(data[i].money * 2)}`;
   // }
}



function sortedList (){

    data = data.sort(function (a, b) {
        return b.money - a.money;
    })

    UpdateDOM();
}



function showmillionareFilter(){
    data = data.filter(function (x){
        return x.money > 1000000;
    })

    UpdateDOM()
}


function CalculateAllWealth() {

    const wealth = data.reduce((accum, user) =>
        (accum += user.money), 0 );



    const wealthEle = document.createElement('div');
    wealthEle.innerHTML = `<h3>Total Wealth :  <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEle);


}






calculateWealth.addEventListener('click', CalculateAllWealth)

showmillionaire.addEventListener('click', showmillionareFilter)
sorting.addEventListener('click', sortedList)
double.addEventListener('click' , doubleMoney);
adduser.addEventListener('click', getRandomUser);





