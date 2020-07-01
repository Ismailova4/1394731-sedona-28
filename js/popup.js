var buttonBooking = document.querySelector(".search-button-booking");
var bookingForm = document.querySelector(".modal");
var checkinDate = document.querySelector(".checkin-date");
var checkoutDate = document.querySelector(".checkout-date");
var searchForm = document.querySelector(".search-form");//нахожу саму форму
var adults = document.querySelector(".adults");


var isStorageSupport = true;//создаю переменную-флаг, чтобы проверить есть ли локальное хранилище
var storage = "";

try {
   storage = localStorage.getItem("checkin-date");//пробую получить значения checkin-date, checkout-date из локального хранилища
   storage = localStorage.getItem("checkout-date");
} catch(err)  {//если нет поддержки localStorage, записываем значение false
   isStorageSupport = false;
}

buttonBooking.addEventListener("click", function (evt) {
   evt.preventDefault(); 
   bookingForm.classList.toggle("modal-hide");
   bookingForm.classList.remove("modal-error");

   
   if (storage) {//если в локальном хранилище есть значения checkin-date и checkout-date, то при открытии модалки сразу запишем их
       checkinDate.value = storage;
       checkoutDate.value = storage;
       adults.focus(); //и смещаю фокус в поле количество взрослых
   } else {
       checkinDate.focus();//а если в локальном хранилище значений нет, помещаю фокус в поле ввода даты прибытия
   }

   checkinDate.focus();//устанавливаю фокус в поле checkin-date при открытии модалки
});


searchForm.addEventListener("submit", function (evt) {
    if (!checkinDate.value || !checkoutDate.value) {
    evt.preventDefault();
    bookingForm.classList.add("modal-error");//если данные в форме не проходят валидацию, добавляю modal-error
        
    } else {
       if(isStorageSupport)  {
        localStorage.setItem("checkin-date", checkinDate.value);
        localStorage.setItem("checkout-date", checkoutDate.value);//если поля заполнены, сохраняю введенные данные в локальное хранилище
    }
  } 
});

window.addEventListener("keydown", function(evt) {//если пользователь нажимает клавишу esc и если модалка открыта, закрываю ее
     if (evt.keyCode === 27) {
        if (bookingForm.classList.contains(".modal-hide")) {
           evt.preventDefault();
           bookingForm.classList.remove(".modal-hide");
           bookingForm.classList.remove("modal-error");
        }  
     }

});

