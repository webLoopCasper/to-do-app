
// nuId id er det nummer opgave vi er nået til
let nuId = 0;
// allTask er det array hvor alle task objects vil blive gemt
let allTask = [];

let newTaskOrOld;
// Task er skabelonen til task objecter
const Task = {
    id:0,
    headline:"",
    desc:"",
    done:false,
}

// newTak er knappen til at lave en ny task
const newTask = document.querySelector(".new-task");
// headlineTask er input feltet til overskriften
let headlineTask = document.querySelector(".headline-task")
// descTask er textarea til beskrivelsen
let descTask = document.querySelector(".desc-task");



// dette er hard reset button som sletter alt der står i localStorage
document.querySelector("#reset").addEventListener("click",()=>{
    localStorage.setItem("allTask","");
    localStorage.setItem("nuid","");
})

// når siden load'et kører denne 
window.addEventListener("load", () => {
    // her får hele allTask array som getString men den er en string
    let getString = localStorage.getItem("allTask");
    let getStringId = localStorage.getItem("nuid");
    
   // tjekker om der er noget i get getString
    if(getString){
     // JSON.parse laver det om til array og objects igen og gemmer den som allTask
    allTask = JSON.parse(getString);
    nuId = JSON.parse(getStringId);
    // kører sendAndBuild functionen
    sendAndBuild();
    }
    
    // dette er når man trykker på opgave knappen 
    document.querySelector(".new-task-show").addEventListener("click",()=>{
        
        sendAndBuild();
       })
   document.querySelector(".old-task").addEventListener("click",()=>{
    
        sendAndBuild("old");
       })
    
  
});

// hver gang vi klikker på newTask knappen kører denne function
newTask.addEventListener("click",function() {

    // tjekker om der er værdier i felterne
   if (headlineTask.value && descTask.value) {
    const task = Object.create(Task);

    // sætter id til nuId
    task.id = nuId;
    // plusser nuId med en til det næste object
    nuId++
    
    //sætter overskriften 
    task.headline = headlineTask.value;
    // resetter det der står i input feltet 
    headlineTask.value="";

    //sætter beskrivelsen 
    task.desc = descTask.value;
    //resetter textarea
    descTask.value="";

    // sætter done til false
    task.done = false;
    
    //putter den ind i allTask array 
    allTask.unshift(task);
   

    // bygger og sender det til localstorage
    
    sendAndBuild();
   } else{
    alert("Du skal udfyld både overskrift og beskrivelse")
    // document.querySelector("#error").textContent ="Du skal udfyld både overskrift og beskrivelse";
   }

});

function sendAndBuild(newOrOld){
    // starter med at reset hele containeren 
    document.querySelector(".task-container").innerHTML = " ";

    if(newOrOld == "old"){
        newTaskOrOld = false;
        document.querySelector("#task-wrapper").classList="";
        document.querySelector(".neworold-task-headline").innerHTML="Færdige Opgaver";
    let DoneAllTask = allTask.filter((single)=>{
        if (single.done == true) {
            return true;
        }else{
            return false;
        }
    });
        DoneAllTask.forEach(buildList);
    }else{
        newTaskOrOld = true;
        document.querySelector("#task-wrapper").classList.add("task-wrapper");
        document.querySelector(".neworold-task-headline").innerHTML="Opgaver";
        notDoneAllTask = allTask.filter((single)=>{
            if (single.done == false) {
                return true;
            }else{
                return false;
            }
        });
    
        // sender allTask array til functionen buildList
        notDoneAllTask.forEach(buildList);

    }
   
    //  allTask.forEach(buildList);

    //Gør allTask array til en string
    let stringAllTask = JSON.stringify(allTask);
    let stringnuId = JSON.stringify(nuId);
    // sender array som er blevet til en string til localStorage
    localStorage.setItem("allTask",stringAllTask);
    localStorage.setItem("nuid",stringnuId);
   
    

    let doneTaskButton = document.querySelectorAll(".checkboxDisplay");
    doneTaskButton.forEach(checkboxTjek);
    
    function checkboxTjek(singleCheckbox){
        singleCheckbox.addEventListener("click", function(){
        
        let idOnDiv = this.parentElement.parentElement.dataset.id;
        let doneOnDiv = this.parentElement.parentElement;

        let justCheked = allTask.filter(tjektjek)
       function tjektjek(object){
        if (object.id == idOnDiv) {
            return true;
        }else {
            return false;
        }
       }
        justCheked[0].done == false? justCheked[0].done = true: justCheked[0].done = false;
        
    
        if(JSON.parse(doneOnDiv.dataset.done)==true){
            doneOnDiv.dataset.done = false;
        }else{
            doneOnDiv.dataset.done = true;
        }

        let allSingletask = document.querySelectorAll(".single-task")
        allSingletask.forEach(function (event) {
            if (JSON.parse(doneOnDiv.dataset.done) == false) {
                sendAndBuild(newOrOld)
            }else{
                event.addEventListener("animationend",()=>{
                    sendAndBuild(newOrOld)
                    
                })
            }
          
            
           
        });
    })
    
    }

    let deleteTask = document.querySelectorAll(".deleteTask");
    deleteTask.forEach(deleteTaskFun);

    function deleteTaskFun(singleDelete) {
        singleDelete.addEventListener("click", function(){

            let idOnDiv = this.parentElement.parentElement.dataset.id;
            
            allTask = allTask.filter((single)=>{
                if (single.id == idOnDiv) {
                    return false;
                }else{
                    return true;
                }
            });
           
                sendAndBuild(newOrOld);
           
        })
    }
}


function buildList(task) {
    
    const clone = document.querySelector("#template-container").content.cloneNode(true);
    clone.querySelector(".single-task").dataset.id = task.id;
    clone.querySelector(".single-task").dataset.done = task.done;
    clone.querySelector(".headlineDisplay").textContent = task.headline; 
    clone.querySelector(".descDisplay").textContent = task.desc;
    clone.querySelector(".checkboxDisplay").checked = task.done;
     clone.querySelector(".material-symbols-outlined").textContent = newTaskOrOld?"done":"undo";

    document.querySelector(".task-container").appendChild( clone ); 
   
}










  




