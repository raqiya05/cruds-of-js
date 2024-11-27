let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let submit=document.getElementById('submit')
let mood ='create'
let tmp;
// get total
function getTotal(){
    if(price.value != ''){
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML=result
        total.style.background='green'
    }
    else{
        total.innerHTML=''
        total.style.background='#a00d02'

    }
}
// create product
let dataPro;
if(localStorage.product !=null){
    dataPro=JSON.parse(localStorage.product)
}
else{
    dataPro=[]
}

submit.onclick=()=>{
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
// count
    if(title.value !='' && price.value !='' && category.value !='' && newpro.count < 100){
    if(mood=='create'){
        if(newpro.count >1){
            for(i=0; i<newpro.count; i++){
                dataPro.push(newpro)
            }
        }
        else{
            dataPro.push(newpro)
        }
    }
    else{
        dataPro[tmp]=newpro
        mood='create'
        submit.innerHTML='create'
        count.style.display='block'
    }
    clearData()
}

// save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro))
    showData()
}

// clear input
function clearData(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    count.value=''
    category.value=''
}
// read
function showData(){
    let table=''
    for(let i=0; i<dataPro.length; i++){
        table +=`
                            <tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick='updateData(${i})' id="update">update</button></td>
                            <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                        </tr>
                        
    `
    }
    document.getElementById('tbody').innerHTML=table
    let btnDelete=document.getElementById('deleteAll')
    if(dataPro.length >0){
        btnDelete.innerHTML=`
        <button onclick=' deleteAll()'>delete all ${dataPro.length}</button>
        
        `
    }
    else{
        btnDelete.innerHTML=''
    }
    getTotal()
}
showData()
// delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro)
    showData()
    showData()
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}
// update
function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal()
    count.style.display='none'
    category.value=dataPro[i].category;
    submit.innerHTML='update'
    mood='update'
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}
// search
let searchMood='title';
function getsearchMood(id){
    let search=document.getElementById('search')
    if(id== 'searchTitle'){
        searchMood='title' 
    }
    else{
        searchMood='category'
    }
    search.placeholder='search by ' + searchMood;
    search.focus()
    search.value='';
    showData()

}
function searchData(value){
    let table=''
    for(i=0;i<dataPro.length;i++){
    if(searchMood=='title'){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick='updateData(${i})' id="update">update</button></td>
                <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
            </tr>
            
`
            }
        
    }
    else{
        if(dataPro[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick='updateData(${i})' id="update">update</button></td>
                <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
            </tr>
            
`
            }
        }
    }
    document.getElementById('tbody').innerHTML=table

}

// clean data
