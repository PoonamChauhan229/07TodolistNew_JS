var title,date,desc,count=0;
var pendingTask=document.getElementById('pendingTask')
var activeTask=document.getElementById('activeTask')
var completeTask=document.getElementById('completeTask')
var choice=document.getElementsByClassName('choice')
var dragItem=null;
function addTask(){
    title=document.getElementById('taskTitle');
    date=document.getElementById('taskDate');
    desc=document.getElementById('taskDesc');
    count++;
    if(title.value!="" && date.value!=""&& desc.value!=""){
        createDiv(count,"pending");
        addSuccess();
        title.value="";
        date.value="";
        desc.value="";
        
    }
    else{
        enterDetails();
    }
    

}
function createDiv(id,type){
    // alert(type)
    var newDiv=document.createElement('div')
    newDiv.id="taskDiv"+id;
    newDiv.draggable=true;
    newDiv.classList="newDiv"
    newDiv.innerHTML="<span>Title:</span><input type='text' id='title"+id+"' class='text'value='"+title.value+"'readOnly><br>";
    newDiv.innerHTML+="<span>Date:</span><input type='text' id='date"+id+"' class='text'value='"+date.value+"'readOnly><br>";
    newDiv.innerHTML+="<span>Desc:</span><input type='text' id='desc"+id+"' class='text'value='"+desc.value+"'readOnly><br>";
    // newDiv.innerHTML+=`<input type='button' onclick="removeDiv('${id}')" value='x'>`
    newDiv.innerHTML+=`<i id="deleteToast" class="fa-solid fa-trash-can" onclick="removeDiv('${id}')"></i>`
    newDiv.innerHTML+=`<i id="editToast"class="fa-solid fa-pen-to-square" onclick="editTask('${id}')"></i>`
    newDiv.innerHTML+=`<i id="editToast"class="fa-solid fa-floppy-disk" onclick="saveTask('${id}')"></i>`

    // newDiv.innerHTML+=`<input type='button' onclick="editTask('${id}')" value='Edit'>`
    //newDiv.innerHTML+=`<input type='button' onclick="moveTask('${id}','${type}')" value='Move'>`
    newDiv.innerHTML+=`<i id="moveLeftToast"class="fa-solid fa-angles-left" onclick="moveLeft('${id}','${type}')"></i>`
    newDiv.innerHTML+=`<i id="moveRightToast"class="fa-solid fa-angles-right" onclick="moveRight('${id}','${type}')"></i>`
  
    

    if(type=="pending")
    pendingTask.appendChild(newDiv)
    else if(type=="active")
    activeTask.appendChild(newDiv)
    else 
    completeTask.appendChild(newDiv)

    //drag
    var dragDiv=document.getElementsByClassName('newDiv')
    console.log(dragDiv);

    for(var i of dragDiv){
        i.addEventListener('dragstart',dragStart)
        console.log(i)
        i.addEventListener('dragend',dragEnd)
    }
    function dragStart(){
        dragItem=this;
        console.log(dragItem);
        setTimeout(()=>this.style.display="block",0)
    }
    function dragEnd(){        
        setTimeout(()=>this.style.display="block",0)
        dragItem=null;
    }
    for(j of choice){
        j.addEventListener('dragover',dragOver);
        j.addEventListener('dragenter',dragEnter);
        j.addEventListener('dragleave',dragLeave);
        j.addEventListener('drop',dragDrop);
    }
    function dragDrop(e){
        this.append(dragItem);
        dragDropToast();
    }
    function dragOver(e){
        e.preventDefault();
        this.style.border="2px dotted cyan"
    }
    function dragEnter(e){
        e.preventDefault();
    }
    function dragLeave(){
         this.style.border="none"
    }

}
//edit task
function editTask(id){    
    // alert(id)
    document.getElementById("title"+id).removeAttribute('readonly');
    document.getElementById("date"+id).removeAttribute('readonly');
    document.getElementById("desc"+id).removeAttribute('readonly');
    document.getElementById("title"+id).style.background="lightgrey";

    document.getElementById("date"+id).style.background="lightgrey";
    document.getElementById("desc"+id).style.background="lightgrey";
    
    editToast();
}
//save Task
function saveTask(id){
    console.log("cannot edit")
    document.getElementById("title"+id).setAttribute('readonly',true)
    document.getElementById("title"+id).style.background="white";
    
    document.getElementById("date"+id).setAttribute('readonly',true)
    document.getElementById("date"+id).style.background="white";

    
    document.getElementById("desc"+id).setAttribute('readonly',true)
    document.getElementById("desc"+id).style.background="white";

    saveToast();
    
}


//remove task div

function removeDiv(divId){
    let deleteRequest="Are you sure to delete this task?";
    if(confirm(deleteRequest)==true){
        document.getElementById("taskDiv"+divId).remove();
    }       
    deleteToast();
}
function getValues(id){
    title=document.getElementById('title'+id);
    desc=document.getElementById('desc'+id);
    date=document.getElementById("date"+id); 
    console.log(title)
}
//move task
function moveRight(id,type){
    // alert(type)
    getValues(id)
    if(type=="pending"){
        createDiv("active"+id,"active")
    }
    else{
        createDiv("complete"+id,"complete")
    }
    document.getElementById("taskDiv"+id).remove();
    moveRightToast()
  
}

function moveLeft(id,type){
    console.log(id)
    // alert(type)
    getValues(id)
    if(type=="complete"){
        createDiv("active"+id,"active")
    }
    else{
        createDiv("pending"+id,"pending")
    }
    document.getElementById("taskDiv"+id).remove();
   
    moveLeftToast();
    
}


//Toastify for edit
  function editToast(){
    Toastify({
        text: "Happy Editing!!!",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #8360c3, #2ebf91)",
        },        
      }).showToast();    
  
  }

  
//Toastify for MoveLeft
 function moveLeftToast() {
  Toastify({
      text: "Sent Behind Successfully",
      duration: 1000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "lightgreen",
      },        
    }).showToast(); 
}

//Toastify for MoveRight

function moveRightToast() {
  Toastify({
      text: "Sent to Next Level!!!",
      duration: 1000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "lightgreen",
      },        
    }).showToast();    

}

//Toastify for delete
function deleteToast() {
Toastify({
    text: "Deleted Successfully",
    duration: 1000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        background: "red",
    },        
  }).showToast();    

}

//Toastify Notification to Update Details
function enterDetails() {
    Toastify({
        text: "Please Enter All The Details",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "red",
        },        
      }).showToast();    
    
    }

//Toastify Notification after Successfull Adding Task
function addSuccess() {
    Toastify({
        text: "New Task Added !!!",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "green",
        },        
      }).showToast();    
    
    }

//Toastify Notification after Successfull Adding Task
function saveToast() {
    Toastify({
        text: "Saved Successfully!!!",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "green"
        },        
      }).showToast();    
    
    }

