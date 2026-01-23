const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "september", "October", "November", "December"];


function createCalendar(month, year) {
    const currentDateDisplay = document.querySelector('#current_date');
    const tableMenu = document.querySelector('#days');
    const tableDates = document.querySelector('#dates');

    const currentDate = new Date(year, month-1);
    
    
    let currentYearMonth = `${monthNames[currentDate.getMonth()]} ${year}`;
    currentDateDisplay.innerHTML = currentYearMonth;

    for (let i = 0; i < days.length; i++) {
        let td = document.createElement('td');
        td.innerHTML = days[i];
        tableMenu.appendChild(td);
    }

    let firstDay = new Date(year, month-1, 1).getDay();
    let numOfDays = new Date(year, month, 0).getDate();
    console.log(numOfDays);
    console.log(firstDay);

    for (let i = 0; i < firstDay; i++) {
        let td = document.createElement('td');
        tableDates.appendChild(td);
    }

    for (let i = 1; i <= numOfDays; i++) {
        let td = document.createElement('td');
        td.innerHTML = i;
        tableDates.appendChild(td);
        
        if((i + firstDay) % 7 == 0) {
            let tr = document.createElement('tr');
            tableDates.appendChild(tr);
            
        };
        colorPick(td);
    };

};

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;
createCalendar(currentMonth, currentYear);

//date background color
function colorPick(element) {
    const r = 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;

    element.style.background = `rgb(${r}, ${g}, ${b})`;
}

export {createCalendar};