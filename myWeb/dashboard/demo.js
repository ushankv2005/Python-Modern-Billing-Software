var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["category"] = document.getElementById("category").value;
    formData["subcat"] = document.getElementById("subcat").value;
    formData["subsubcat"] = document.getElementById("subsubcat").value;
    formData["product"] = document.getElementById("product").value;
    formData["qty"] = document.getElementById("qty").value;
    formData["discount"] = document.getElementById("discount").value+'%';
    formData["price"] = document.getElementById("price_num").innerText;


    if (document.getElementById('discount').value != ''){
        var dis = parseInt(document.getElementById('discount').value);
        var pricing = parseInt(document.getElementById("price_num").innerText);
        var discPrice = ((pricing/100)*dis);
        var finalPrice = (pricing-discPrice);
        formData["price"] = finalPrice;
    }
    document.getElementById("price_num").innerText='';
    return formData;
}
var BID = Math.floor(Math.random()*10000);
function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    var one = (cell1.innerHTML = data.category);
    cell2 = newRow.insertCell(1);
    let two = cell2.innerHTML = data.subcat;
    cell3 = newRow.insertCell(2);
    let three = cell3.innerHTML = data.subsubcat;
    cell4 = newRow.insertCell(3);
    let four = cell4.innerHTML = data.product;
    cell5 = newRow.insertCell(4);
    let five = cell5.innerHTML = data.qty;
    cell6 = newRow.insertCell(5);
    let six = cell6.innerHTML = data.discount;
    cell7 = newRow.insertCell(6);
    let seven = cell7.innerHTML = data.price;
    cell8 = newRow.insertCell(7);
    let eight = cell8.innerHTML =('B'+ BID);
    cell9 = newRow.insertCell(8);
    cell9.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>
                       <a onclick="sendme(this);">Send</a>`;


    return one;
}
// selectedRow = td.parentElement.parentElement;


function resetForm() {
    document.getElementById("category").value = "";
    document.getElementById("subcat").value = "";
    document.getElementById("subsubcat").value = "";
    document.getElementById("product").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("discount").value = "";

    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("category").value = selectedRow.cells[0].innerHTML;
    document.getElementById("subcat").value = selectedRow.cells[1].innerHTML;
    document.getElementById("subsubcat").value = selectedRow.cells[2].innerHTML;
    document.getElementById("product").value = selectedRow.cells[3].innerHTML;
    document.getElementById("qty").value = selectedRow.cells[4].innerHTML;
    document.getElementById("discount").value = selectedRow.cells[5].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.category;
    selectedRow.cells[1].innerHTML = formData.subcat;
    selectedRow.cells[2].innerHTML = formData.subsubcat;
    selectedRow.cells[3].innerHTML = formData.product;
    selectedRow.cells[4].innerHTML = formData.qty;
    selectedRow.cells[5].innerHTML = formData.discount;
    selectedRow.cells[6].innerHTML = formData.price;

}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("category").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}
// program to display the date
// get local machine date time
const date = new Date();

// get the date as a string
const n = date.toDateString();

// get the time as a string
const time = date.toLocaleTimeString();

document.getElementById('dateZ').innerHTML= n;


//globals for app
var globalcat = document.getElementById('category');

async function cats(){
    await eel.process1()(function(ret){
        console.log(ret);
        var rowData = ret.length;
        var display = '';
        var d = '';
        for(let count = 0; count<rowData;count++){

            display += `<option>${ret[count]}</option>`;

        }

        globalcat.innerHTML = display;
    })
}
cats();


var globalsubcat = document.getElementById('subcat');
document.getElementById('category').addEventListener('click',async()=>{
    var sendcat = document.getElementById('category').value;
    await eel.sent(sendcat)(function(ret2){
        var dt = ret2.length;
        var display2 = '';
        for(let count2 = 0; count2<dt;count2++){
            display2 += `<option>${ret2[count2][1]}</option>`;

        }
        globalsubcat.innerHTML=(display2);


    })
})


var globalsubsubcat = document.getElementById('subsubcat');
document.getElementById('subcat').addEventListener('click',async()=>{
    var sendcat = document.getElementById('subcat').value;
    await eel.sent2(sendcat)(function(ret2){
        var dt = ret2.length;
        var logger = (ret2[0][0]);
        console.log(logger)
        var display2 = '';
        for(let count2 = 0; count2<dt;count2++){
            display2 += `<option>${ret2[count2][1]}</option>`;

        }
        globalsubsubcat.innerHTML=(display2);

    })
})

var globalproduct = document.getElementById('product');
document.getElementById('subsubcat').addEventListener('click',async()=>{
    var sendcat = document.getElementById('subsubcat').value;
    await eel.sent3(sendcat)(function(ret2){
        var dt = ret2.length;
        var display2 = '';
        for(let count2 = 0; count2<dt;count2++){
            display2 += `<option>${ret2[count2][1]}</option>`;
        }
        globalproduct.innerHTML=(display2);


    })
})

var globalprice = document.getElementById('price_num');
document.getElementById('product').addEventListener('click',async()=>{
    var sendcat = document.getElementById('product').value;
    await eel.pricetxt(sendcat)(function(ret2){
        var ptext = ret2;
        globalprice.innerText = ptext;

    })
})
async function sendme(td){
    selectedRow = td.parentElement.parentElement;
    let d1 = [selectedRow.cells[0].innerHTML];
    let d2 = [selectedRow.cells[1].innerHTML];
    let d3 = [selectedRow.cells[2].innerHTML];
    let d4 = [selectedRow.cells[3].innerHTML];
    let d5 = [selectedRow.cells[4].innerHTML];
    let d6 = [selectedRow.cells[5].innerHTML];
    let d7 = [selectedRow.cells[6].innerHTML];
    let d8 = [selectedRow.cells[7].innerHTML];

    let mi = d3;
    let sins = d4;
    let minus = d5;
    let billnum = d8;
    let priceEK = d7;
    let discount = d6;
    await eel.send_to_db(mi,sins,minus,billnum,priceEK,discount)(function(al){
        alert(al);
        if(al=='Unfortunately Your Stock Is Empty.'){
            selectedRow.cells[8].innerHTML = `<a onClick="onEdit(this)">Edit</a>
            <a onClick="onDelete(this)">Delete</a>
            <a>failed</a>`;
            selectedRow = null;
        }
        if(al=='Succesfully Added'){
            selectedRow.cells[8].innerHTML = `<a onClick="onEdit(this)">Edit</a>
            <a onClick="onDelete(this)">Delete</a>
            <a>Sent</a>`;

            selectedRow = null;

        }

    })
    console.log(d7);
    console.log(d5);
    let tt = document.querySelector('.totalAmount').value;
    await eel.getprice(tt,d7,d5)(function(c){
        document.querySelector('.totalAmount').value=c;
        document.querySelector('.tot').innerHTML =c;
    })

}
// function printer(){
//   window.print();
// }

function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
     (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
  function dash(){
    window.location.replace('./dashboard.html')
  }
