function Time(){
    const now =new Date().toLocaleDateString('en-us',{
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    const date = now.split(',')[0].split(' ');
    const time = now.split(',')[1];
    return `${date[1]} ${date[0]},${time}`
    
}

document.querySelector('#ewallet-form')
.addEventListener('submit', function(e){
    e.preventDefault();
    console.log("submited");
    const type = document.querySelector('.add__type').value;
    const desc = document.querySelector('.add__description').value;
    const value = document.querySelector('.add__value').value;
    if(desc && value){
        additems(type, desc, value);
        resetForm();
    }
});
function additems(type, desc, value){
    const time=Time();
    const newhtml =`
    <div class="item">
        <div class="item-description-time">
            <div class="item-description">
              <p>${desc}</p>
            </div>
            <div class="item-time">
              <p>${time}</p>
            </div>
        </div>
           <div class="item-amount ${type==='+'? "income-amount":'expense-amount'}">
            <p>${type}$${sep(value)}</p>
           </div>
    </div>
    `;
    const collection = document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin',newhtml);
    
    additemsToLS(desc, time, type, value);
    showTotalExp();
    showTotalIncome();
    showTotalBalance();

}

function resetForm() {
    document.querySelector('.add__type').value='+';
    document.querySelector('.add__description').value='';
    document.querySelector('.add__value').value='';

}

function getItemsFromLS(){
    let items = localStorage.getItem('items');
    return items =(items)? JSON.parse(items): [];
    
}
showitems();
function showitems(){
    let items = getItemsFromLS();
    for(let item of items){
        const newhtml =`
    <div class="item">
        <div class="item-description-time">
            <div class="item-description">
              <p>${item.desc}</p>
            </div>
            <div class="item-time">
              <p>${item.time}</p>
            </div>
        </div>
           <div class="item-amount ${item.type==='+'? "income-amount":'expense-amount'}">
            <p>${item.type}$${sep(item.value)}</p>
           </div>
    </div>
    `;
    const collection = document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin',newhtml);
    }
}
function additemsToLS(desc, time, type, value){
 let items = getItemsFromLS();
 items.push({desc,time,type,value});
 localStorage.setItem('items', JSON.stringify(items));

}

/****************************************** */
/*             Calculaton                   */
/**************************************** ***/
showTotalIncome();

function showTotalIncome(){
    let items = getItemsFromLS();
    let totalIncome = 0;
    for(let item of items){
        if(item.type==='+'){
            totalIncome += parseInt(item.value);
        }
    }
    document.querySelector('.income__amount p').innerHTML = `$${sep(totalIncome)}`;
}
showTotalExp();

function showTotalExp(){
    let items = getItemsFromLS();
    let totalExp = 0;
    for(let item of items){
        if(item.type==='-'){
            totalExp += parseInt(item.value);
        }
    }
    document.querySelector('.expense__amount').innerHTML = `$${sep(totalExp)}`;
}

showTotalBalance();

function showTotalBalance(){
    const items = getItemsFromLS();
    let Balance = 0;
    for(let item of items){
        if(item.type==='+'){
            Balance += parseInt(item.value);
        }else if(item.type==='-'){
            Balance -= parseInt(item.value);
        }
    }
    document.querySelector('.balance__amount').innerHTML = sep(Balance);
    
        document.querySelector('header').className = Balance >=0? 'green':'red';
   

}

function sep(amount){
    amount = parseInt(amount);
    return amount.toLocaleString();
}