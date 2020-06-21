var buttonBooking = document.querySelector(".button-booking");//нахожу кнопку открытия модалки
var bookingForm = document.querySelector(".modal-inner");//нахожу модальное окно
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
   evt.preventDefault();//отключаю действие по умолчанию - переход по ссылке
   bookingForm.classList.add("modal-show");//добавляю класс modal-show, чтобы показать модалку

   if (storage) {//если в локальном хранилище есть значения checkin-date и checkout-date, то при открытии модалки сразу запишем их
       checkinDate.value = storage;
       checkoutDate.value = storage;
       adults.focus(); //и смещаю фокус в поле количество взрослых
   } else {
       checkinDate.focus();//а если в локальном хранилище значений нет, помещаю фокус в поле ввода даты прибытия
   }

   checkinDate.focus();//устанавливаю фокус в поле checkin-date при открытии модалки
});

/* formClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    bookingForm.classList.remove("modal-show");
    bookingForm.classList.remove("modal-error");
}); */

searchForm.addEventListener("submit", function (evt) {
    if (!checkinDate.value || !checkoutDate.value) {
    evt.preventDefault();//если одно из двух полей формы не заполнено, отменяю отправку формы по умолчанию
    //bookingForm.classList.remove("modal-error");//
    //bookingForm.offsetWidth = loginPopup.offsetWidth;//
    //bookingForm.classList.add("modal-error");//
    } else {
       if(isStorageSupport)  {
        localStorage.setItem("checkin-date", checkinDate.value);
        localStorage.setItem("checkout-date", checkoutDate.value);//если поля заполнены, сохраняю введенные данные в локальное хранилище
    }
  } 
});

window.addEventListener("keydown", function(evt) {//если пользователь нажимает клавишу esc и если модалка открыта, закрываю ее
     if (evt.keyCode === 27) {
        if (bookingForm.classList.contains(".modal-show")) {
           evt.preventDefault();
           bookingForm.classList.remove(".modal-show");
           //bookingForm.classList.remove("modal-error");//
        }  
     }

});

