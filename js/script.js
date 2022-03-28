var title,date,desc,count=0;
var pendingTask=document.getElementById('pendingTask')
var activeTask=document.getElementById('activeTask')
var completeTask=document.getElementById('completeTask')

function addTask(){
    title=document.getElementById('taskTitle');
    date=document.getElementById('taskDate');
    desc=document.getElementById('taskDesc');
    count++;
    if(title.value!="" && date.value!=""&& desc.value!=""){
        createDiv(count,"pending");
        title.value="";
        date.value="";
        desc.value="";

    }
    

}

function createDiv(id,type){
    // alert(type)
    var newDiv=document.createElement('div')
    newDiv.id="taskDiv"+id;
    newDiv.classList="newDiv"
    newDiv.innerHTML="<span>Title:</span><input type='text' id='title"+id+"' class='text'value='"+title.value+"'readOnly><br>";
    newDiv.innerHTML+="<span>Date:</span><input type='text' id='date"+id+"' class='text'value='"+date.value+"'readOnly><br>";
    newDiv.innerHTML+="<span>Desc:</span><input type='text' id='desc"+id+"' class='text'value='"+desc.value+"'readOnly><br>";
    // newDiv.innerHTML+=`<input type='button' onclick="removeDiv('${id}')" value='x'>`
    newDiv.innerHTML+=`<i class="fa-solid fa-trash-can" onclick="removeDiv('${id}')"></i>`
    newDiv.innerHTML+=`<i class="fa-solid fa-pen-to-square" onclick="editTask('${id}')"></i>`
    // newDiv.innerHTML+=`<input type='button' onclick="editTask('${id}')" value='Edit'>`
    //newDiv.innerHTML+=`<input type='button' onclick="moveTask('${id}','${type}')" value='Move'>`
    newDiv.innerHTML+=`<i class="fa-solid fa-angles-left" onclick="moveLeft('${id}','${type}')"></i>`
    newDiv.innerHTML+=`<i class="fa-solid fa-angles-right" onclick="moveRight('${id}','${type}')"></i>`
    
    if(type=="pending")
    pendingTask.appendChild(newDiv)
    else if(type=="active")
    activeTask.appendChild(newDiv)
    else 
    completeTask.appendChild(newDiv)
}
//edit task
function editTask(id){
    // alert(id)
    document.getElementById("title"+id).removeAttribute('readonly');
    document.getElementById("date"+id).removeAttribute('readonly');
    document.getElementById("desc"+id).removeAttribute('readonly');

}
//remove task div

function removeDiv(divId){
    document.getElementById("taskDiv"+divId).remove();

}
function getValues(id){
    title=document.getElementById('title'+id).value;
    desc=document.getElementById('desc'+id).value;
    date=document.getElementById("date"+id).value;    
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
    
}
