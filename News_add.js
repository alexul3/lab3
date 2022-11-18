'use strict'

function addItemToTable(picture, price, count) {
    console.info('Try to add item');

    var card = document.querySelector("#tbl-items");
    if (card == null) {
        throw 'Table is not found';
    }
    const id = 'item-' + Date.now();
    const elem=document.createElement('div')
    const card_item ='<div class="card border-dark mb-3 text-black" id="'+id+'"> <div class="row g-0"><div class="col-md-4"> <img class="img-fluid1 rounded-start" src="'+document.getElementById("tempImg").src+'"></div> <div class="col-md-8"><div class="card-body"><h5 class="card-title">'+price+'</h5><p class="card-text text-wrap">'+count+'</p><p class="card-text text-wrap"><small class="text-muted">Опубликовано:'+Date()+'</small></p><a href="#" class="btn btn-outline-primary text-center d-flex justify-content-md-center mx-5" onclick="removeItemFromDiv(\''+ id +'\')">Удалить</a></div></div></div></div>';
    elem.innerHTML=card_item;
    card.prepend(elem);
    console.info('Added');
}


document.addEventListener('DOMContentLoaded', function () { 
    console.info('Loaded');

    const form = document.querySelector("#frm-items");
    if (form !== null) {
        form.addEventListener('submit', function(event) {
            console.info('Form onsubmit');
            event.preventDefault();

            const picture = document.querySelector("#picture");
            if (picture == null) {
                throw 'Item control is not found';
            }

            const price = document.querySelector("#price");
            if (price == null) {
                throw 'Price control is not found';
            }

            const count = document.querySelector("#count");
            if (count == null) {
                throw 'Count control is not found';
            }

            addItemToTable(picture.value, price.value, count.value);

            picture.value = null;
            price.value = '';
            count.value = '';
        });
    }
});
function removeItemFromDiv(id) {
    console.info('Try to remove item');

    if (!confirm('Do you really want to remove this item?')) {
        console.info('Canceled');
        return;
    }

    const item = document.querySelector('#' + id);
    if (item == null) {
        throw 'Item with id [' + id + '] is not found';
    }
    item.remove();

    const numbers = document.querySelectorAll("#tbl-items card");
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].innerHTML = i + 1;
    }

    console.info('Removed');
}
document.querySelector("#picture").addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const uploaded_image = reader.result;
      document.querySelector("#tempImg").src = uploaded_image;
    });
    reader.readAsDataURL(this.files[0]);
});