/* first varable */
const Form = document.querySelector("#myForm");
const List_task = document.querySelector(".collection");
const Clear_btn = document.querySelector(".btn-Clear");
const Filter = document.querySelector("#Filter");
const Input_task = document.querySelector("#Task");

/* function run event */
RunEventFun();
function RunEventFun() {
  // dom event loade
  document.addEventListener("DOMContentLoaded", getTaskItem);
  // Create elment add to list
  document.addEventListener("submit",AddTaskFun);
  // remove element
  List_task.addEventListener("click",RemTaskFun);
  // clear all task element
  Clear_btn.addEventListener("click", ClearAllFun);
  // filter element in task
  Filter.addEventListener("keyup", ElmFilterFun);
}
// add Task fun
function AddTaskFun(e) {
  if (Input_task.value === ""){
      alert("Please enter a task")
  }
  else {
    // build li
    const Li = document.createElement("li");
    Li.className = "list-group-item";
    Li.appendChild(document.createTextNode(Input_task.value));
    // build link
    const Link = document.createElement("a");
    Link.className = "link-danger Del-Task";
    Link.style.float = "left";
    Link.innerHTML = "<i class='fa fa-remove'><i/>";
    Li.appendChild(Link);
    // append li to ul 
    List_task.appendChild(Li);
    // element save in storage
    ElementSaveToStarge(Input_task.value);
    // clear input 
    Input_task.value = "";
  }
  e.preventDefault();
} 
/* remove task fun */
function RemTaskFun(e) {
  if (e.target.parentElement.classList.contains("Del-Task")) {
      if (confirm("Do you want to delete this element ? ")) {
         e.target.parentElement.parentElement.remove(); 
         RemoveTaskElement(e.target.parentElement.parentElement);
      }
  }
}
// clear all task element
function ClearAllFun() {
   while (List_task.firstChild) {
     List_task.removeChild(List_task.firstChild);
   }
   ClearAllTask();
}
// elment filter task
function ElmFilterFun(e) {
  const txt = e.target.value.toLowerCase();
  document.querySelectorAll(".list-group-item").forEach((task) => {
     const item = task.firstChild.textContent;
     if (item.toLowerCase().indexOf(txt) != -1) {
       task.style.display = "block";
     }
     else {
       task.style.display = "none";
     }
  });
}

// element save in storage
function ElementSaveToStarge(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks")); 
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// get Task item
function getTaskItem() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }

  tasks.forEach((task)=> {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(task));
    const link = document.createElement("a");
    link.className = "link-danger Del-Task";
    link.style.float = "left";
    link.innerHTML = "<i class='fa fa-remove'><i/>";
    li.appendChild(link);
    List_task.appendChild(li);
  })
}
// remove task in storage
function RemoveTaskElement(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    }
    else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task, index)=> {
       if (taskItem.textContent === task) {
         tasks.splice(index, 1);
       }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// clear all tasks
function ClearAllTask() {
  localStorage.clear();
}