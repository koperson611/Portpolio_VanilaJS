const toDoForm = document.querySelector(".js-toDoForm"),
 toDoInput = toDoForm.querySelector("input"),
 toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
    const delBtn = event.target; //지울 것의 타겟
    const li = delBtn.parentNode; //실질적으로 지울 것 > li
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){ //forEach에서 함수를 실행하는 것 같이 각각의 item이 실행될 것
        return toDo.id !== parseInt(li.id); //모든 toDos가 li의 id와 같지 않을 때
    });//즉, 위에서 li를 html에서 삭제할 때 그 li가 가지는 id와 toDos라는 배열에 저장된 id가 같은지 비교하고 같지 않을 경우는 cleanToDos에 넣고 아니면 넣지않는다(filter함수의 기능) 
    toDos = cleanToDos    
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");
    const newId = toDos.length + 1;
    btn.innerText = "X";
    btn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(btn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !== null){ //할일이 있으면... 없으면 암것도 안해도 됨
        const parsedToDos = JSON.parse(loadToDos); //object로 loadToDos를 불러옴. 안하면 string으로 불러옴
        parsedToDos.forEach(function(toDo){ //오브젝트 각각에 대해 paintToDo함수가 실행됨. / forEach는 array에 있는 함수
            paintToDo(toDo.text);
        });
    }
}
 function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)
 }

 init();