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
    const newhtml =`
    <div class="item">
        <div class="item-description-time">
            <div class="item-description">
              <p>${desc}</p>
            </div>
            <div class="item-time">
              <p>25 Feb, 06:45 PM</p>
            </div>
        </div>
           <div class="item-amount ${type==='+'? "income-amount":'expense-amount'}">
            <p>${type}$${value}</p>
           </div>
    </div>
    `;
    const collection = document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin',newhtml);
}

function resetForm() {
    document.querySelector('.add__type').value='+';
    document.querySelector('.add__description').value='';
    document.querySelector('.add__value').value='';

}

