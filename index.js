function handleFormSubmit(event){
    event.preventDefault();
    const name=event.target.name.value
    const email=event.target.email.value
    const phone=event.target.phone.value

    const obj={
        name,
        email ,
        phone
    }
    axios.post("https://crudcrud.com/api/9014652d3f004f51b4eb16318c758874/appoinmentdata", obj)
    .then((response)=>{
        showUserOnScreen(response.data)
        console.log(response)
    })
    .catch((err)=>{
        document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong</h4>"
        console.log(err)
    })
}

window.addEventListener("DOMContentLoaded",()=>{
 axios.get("https://crudcrud.com/api/9014652d3f004f51b4eb16318c758874/appoinmentdata")
    .then((response)=>{
        console.log(response)

        for(var i=0 ; i<response.data.length ; i++){
            showUserOnScreen(response.data[i])
        }
    })
    .catch((error)=>{
        console.log(error)
    })
})

function showUserOnScreen(obj){
    document.getElementById('name').value='';
    document.getElementById('email').value='';
    document.getElementById('phone').value='';

    const parentNode=document.getElementById('listofitems');

    const childnode=`<li id=${obj._id}> ${obj.name} -${obj.email}-${obj.phone} 
                    <button onclick=DeleteUser('${obj._id}') >Delete User</button>
                    <button onclick="editUserDetails('${obj._id}','${obj.name}','${obj.email}','${obj.phone}')">Edit User</button>
         
                    </li> `;
    parentNode.innerHTML=parentNode.innerHTML+childnode;
}

function editUserDetails(id,name,email,phone){

  document.getElementById('name').value=name;
  document.getElementById('email').value=email;
  document.getElementById('phone').value=phone;
  DeleteUser(id)
}

function DeleteUser(id){
    axios.delete(`https://crudcrud.com/api/9014652d3f004f51b4eb16318c758874/appoinmentdata/${id}`)
    .then((res)=>{
        removeUserFromScreen(id)
    })
    .catch((err)=>{
        console.log(err)
    })
}

function removeUserFromScreen(id){
    const parentNode=document.getElementById('listofitems')
    const ChildNodeToBeRemoved=document.getElementById(id)
    if(ChildNodeToBeRemoved){

        parentNode.removeChild(ChildNodeToBeRemoved)
    }
}