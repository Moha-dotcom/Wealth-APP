


const main = document.getElementById('main');
const adduser = document.querySelector('#add-user');
const double = document.querySelector('#double');
const showmillionaire = document.querySelector('#show-millionaires');
const sort = document.querySelector('#sort');
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
    main.innerHTML =' <h2><strong >Person</strong>Wealth</h2>'
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










double.addEventListener('click' , doubleMoney);
adduser.addEventListener('click', getRandomUser);





