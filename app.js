let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  //prevent null form
  e.preventDefault();
  //get value
  //console.log(e.target.parentElement);
  let form = e.target.parentElement;
  let todotext = form.children[0].value;
  //console.log(todotext);
  let todomonth = form.children[1].value;
  let tododate = form.children[2].value;

  if (todotext === "") {
    alert("Please input the task text");
    return; //不往下跑
  }

  //console.log(todotext, todomonth, tododate);
  //creat a list
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todotext;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todomonth + " / " + tododate;
  todo.appendChild(text);
  todo.appendChild(time);
  let section = document.querySelector("section");

  //create green check red trash can
  let completebutton = document.createElement("button");
  completebutton.classList.add("complete");
  completebutton.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
  completebutton.addEventListener("click", (e) => {
    let todoitem = e.target.parentElement;
    todoitem.classList.toggle("done"); //toggle 有就刪 沒有就加
  });
  let trashbutton = document.createElement("button");
  trashbutton.classList.add("trash");
  trashbutton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';

  trashbutton.addEventListener("click", (e) => {
    let todoitem = e.target.parentElement;
    //todoitem.remove();
    todoitem.addEventListener("animationend", () => {
      //remone form localstorage
      let text = todoitem.children[0].innerText;
      let mylistarray = JSON.parse(localStorage.getItem("list"));
      mylistarray.forEach((item, index) => {
        if (item.todotext == text) {
          mylistarray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(mylistarray));
        }
      });
      todoitem.remove();
    });

    todoitem.style.animation = "scaledown 0.3s forwards";
  });
  todo.appendChild(completebutton);
  todo.appendChild(trashbutton);

  todo.style.animation = "scaleup 0.3s forwards";

  //create object
  let mytodo = {
    todotext: todotext,
    todomonth: todomonth,
    tododate: tododate,
  };
  //store data
  let mylist = localStorage.getItem("list");
  if (mylist == null) {
    localStorage.setItem("list", JSON.stringify([mytodo]));
  } else {
    let mylistarray = JSON.parse(mylist);
    mylistarray.push(mytodo);
    localStorage.setItem("list", JSON.stringify(mylistarray));
  }

  form.children[0].value = ""; //clear text input
  section.appendChild(todo);
});

let mylist = localStorage.getItem("list");
//console.log(mylist);
if (mylist !== null) {
  let mylistarray = JSON.parse(mylist);
  mylistarray.forEach((item) => {
    console.log(item.tododate);
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = item.todotext;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = item.todomonth + " / " + item.tododate;
    todo.appendChild(text);
    todo.appendChild(time);

    //create green check red trash can
    let completebutton = document.createElement("button");
    completebutton.classList.add("complete");
    completebutton.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
    completebutton.addEventListener("click", (e) => {
      let todoitem = e.target.parentElement;
      todoitem.classList.toggle("done"); //toggle 有就刪 沒有就加
    });
    let trashbutton = document.createElement("button");
    trashbutton.classList.add("trash");
    trashbutton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';

    trashbutton.addEventListener("click", (e) => {
      let todoitem = e.target.parentElement;
      //todoitem.remove();
      todoitem.addEventListener("animationend", () => {
        //remone form localstorage
        let text = todoitem.children[0].innerText;
        let mylistarray = JSON.parse(localStorage.getItem("list"));
        mylistarray.forEach((item, index) => {
          if (item.todotext == text) {
            mylistarray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(mylistarray));
          }
        });

        todoitem.remove();
      });

      todoitem.style.animation = "scaledown 0.3s forwards";
    });
    todo.appendChild(completebutton);
    todo.appendChild(trashbutton);
    let section = document.querySelector("section");
    section.appendChild(todo);
  });
}

function loadData() {
  let myList = localStorage.getItem("list");
  if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach((item) => {
      // create a todo
      let todo = document.createElement("div");
      todo.classList.add("todo");
      let text = document.createElement("p");
      text.classList.add("todo-text");
      text.innerText = item.todotext;
      let time = document.createElement("p");
      time.classList.add("todo-time");
      time.innerText = item.todomonth + " / " + item.tododate;
      todo.appendChild(text);
      todo.appendChild(time);

      // create green check and red trash can
      let completebutton = document.createElement("button");
      completebutton.classList.add("complete");
      completebutton.innerHTML = '<i class="fas fa-check"></i>';

      completebutton.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
      });

      let trashbutton = document.createElement("button");
      trashbutton.classList.add("trash");
      trashbutton.innerHTML = '<i class="fas fa-trash"></i>';

      trashbutton.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;

        todoItem.addEventListener("animationend", () => {
          // remove from local storage
          let text = todoItem.children[0].innerText;
          let myListArray = JSON.parse(localStorage.getItem("list"));
          myListArray.forEach((item, index) => {
            if (item.todoText == text) {
              myListArray.splice(index, 1);
              localStorage.setItem("list", JSON.stringify(myListArray));
            }
          });

          todoItem.remove();
        });

        todoItem.style.animation = "scaleDown 0.3s forwards";
      });

      todo.appendChild(completebutton);
      todo.appendChild(trashbutton);
      let section = document.querySelector("section");
      section.appendChild(todo);
    });
  }
}

function mergeTime(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (Number(arr1[i].todomonth) > Number(arr2[j].todomonth)) {
      result.push(arr2[j]);
      j++;
    } else if (Number(arr1[i].todomonth) < Number(arr2[j].todomonth)) {
      result.push(arr1[i]);
      i++;
    } else if (Number(arr1[i].todomonth) == Number(arr2[j].todomonth)) {
      if (Number(arr1[i].tododate) > Number(arr2[j].tododate)) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let right = arr.slice(0, middle);
    let left = arr.slice(middle, arr.length);
    return mergeTime(mergeSort(right), mergeSort(left));
  }
}

let sortbutton = document.querySelector("div.sort button");
sortbutton.addEventListener("click", () => {
  //sort data
  let sortedarray = mergeSort(JSON.parse(localStorage.getItem("list")));
  localStorage.setItem("list", JSON.stringify(sortedarray));
  let section = document.querySelector("section");
  //remove data
  let len = section.children.length;
  for (let i = 0; i < len; i++) {
    section.children[0].remove();
  }

  loadData();
});
