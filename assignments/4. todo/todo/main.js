var inputdata = document.querySelector('input');
var ul = document.querySelector('ul');
var state = JSON.parse(localStorage.getItem('localStoragestate')) || [];
var itemleft = document.querySelector('.itemleft');
var all = document.querySelector('.all');
var active = document.querySelector('.active');
var complete = document.querySelector('.complete');
var display = document.querySelector('.display');
var clearall = document.querySelector('.clearall');
var allli = ul.childNodes;


inputdata.addEventListener('keyup', addInputData);



function addInputData (event) {
    // console.log(inputdata);
    if (event.keyCode == 13 && event.target.value != ''){
        var obj = {};
        obj.name = event.target.value;
        obj.finished = false;
        obj.liid = Date.now();
        state.push(obj)
        event.target.value = '';
        
        createView(state);
        localStorage.setItem('localStoragestate', JSON.stringify(state));
    }
}

// display list on screen

function createView(state) {
    ul.innerHTML = '';
    state.map((value) => {
        // console.log(value);
    var li = document.createElement('li');
    li.className='flex';
    li.setAttribute('data-id',value.liid);
    // console.log(li);

    // checkbox
    var checkBox = document.createElement('input');
    checkBox.classList.add('checkbox');
    checkBox.type = 'checkbox';

    // para
    var p = document.createElement('p');
    p.classList.add('para');
    p.textContent = value.name;
    p.addEventListener('dblclick', editPara);

    // cross
    var cross = document.createElement('span');
    cross.innerHTML = '&#10005;';
    cross.classList.add("cross");


    ul.appendChild(li);
    li.append(checkBox, p, cross);
    itemleft.innerHTML = `${(state.filter(v => v.finished != true)).length} item left`;
    display.style.display = "block";
    clearall.style.display = "none";

    }
    )
    if ((state.filter(v=> v.finished == true).length != 0)) {
        clearall.style.display = "block";
    } else {
        clearall.style.display = "none";
    }
}

// all the event listner on ul
ul.addEventListener('click',allEventOnUl);

function allEventOnUl (event) {
    // console.dir(event.target);
    // cross on click event
    if(event.target.tagName == 'SPAN') {
        var removeid = event.target.parentElement.dataset.id;
        state = state.filter(value => value.liid != removeid);
        createView(state);
        itemleft.innerHTML = `${(state.filter(v => v.finished != true)).length} item left`;
        if (state.length < 1){
            display.style.display = "none";
        }
        localStorage.clear();
        localStorage.setItem('localStoragestate', JSON.stringify(state));        
    }


    
    // checkbox  on click event
    else if (event.target.tagName == 'INPUT') {
        if(event.target.checked === false){

            event.target.nextElementSibling.classList.remove('lineThrough');
            var finishedTask = event.target.parentElement.dataset.id;
            state = state.filter(v1 => {
                // console.log(v1);
                if (v1.liid == finishedTask ){
                    // console.log(v.finished)
                    v1.finished = false;
                    // console.log(state);
                }
                return state;
            }); 
            itemleft.innerHTML = `${(state.filter(v => v.finished != true)).length} item left`;

        } else {
            event.target.nextElementSibling.classList.add('lineThrough');
            var finishedTask = event.target.parentElement.dataset.id;
            // console.log(finishedTask);
         state = state.filter(v => {
            if (v.liid == finishedTask) {
                // console.log(v);
                v.finished = true;
                // console.log(state);
            }
            return state;
            });
            itemleft.innerHTML = `${(state.filter(v => v.finished != true)).length} item left`;
            if ((state.filter(v=> v.finished !=true).length == 0)) {
                clearall.style.display = "block";
            }

            // if (ul.childElementCount === document.querySelectorAll('.completedtask').length) {
            //     clearall.style.display = 'inline-block';
            // }
        }
        // console.log(state1);

    }
    
    localStorage.clear();
    localStorage.setItem('localStoragestate', JSON.stringify(state));  
   
}
// edit para 
function editPara (eventp) {
     
     if ( eventp.target.tagName = 'p'){
        // cross.style.display = 'none';
        var currentPvalue = eventp.target;
        var inputP = document.createElement('input');
        inputP.classList.add('editinputP');
        inputP.value = currentPvalue.innerText;
        inputP.style.border = "1px solid black";
        inputP.style.boxShadow = "inset 2px 2px 10px 0px rgba(0,0,0,0.75)";
        console.log(inputP.value);
        currentPvalue.parentElement.replaceChild(inputP, currentPvalue);
        inputP.addEventListener ('keyup', backToPara);
        function backToPara(e) {
            // console.lo
            if(e.keyCode === 13 && e.target.value != ''){
                currentPvalue.innerHTML = e.target.value;
                e.target.parentElement.replaceChild(currentPvalue, inputP);

            }
        }

    }
}



// footer function

itemleft.innerHTML = `${(state.filter(v => v.finished != true)).length} item left`;


all.addEventListener('click', allList);
function allList(event) {
    // console.log(state);
    createView(state);
    addLineState(state);
}


        //active
active.addEventListener('click', activeList);
function activeList(event) {
    // console.log(state)
    var stateactive = state.filter(v => v.finished!= true);
    createView(stateactive);
} 
        // completed
complete.addEventListener('click', completeList);
function completeList(event) {
    // console.log(state)
    var statecomplete = state.filter(v => v.finished == true);
    createView(statecomplete);
    addLineState(statecomplete);
    itemleft.innerHTML = `${(state.filter(v => v.finished != true)).length} item left`;
}

//CLEAR ALL
clearall.addEventListener('click', clearalllist);
function clearalllist () {
    // state = [];
    localStorage.clear();
    localStorage.setItem('localStoragestate', JSON.stringify(state));  
    createView(state);
    display.style.display = 'none';
}


function addLineState(arr) {
    // console.log(arr);
    arr.forEach(value => {
        if (value.finished == true){
            allli.forEach(v => { 
                if (v.dataset.id == value.liid){
                    v.firstElementChild.checked = true;
                    v.firstElementChild.nextElementSibling.classList.add('lineThrough');
                    
                }

            })
        }
        else if (value.finished == false){
            allli.forEach(v => { 
                if (v.dataset.id == value.liid){
                    v.firstElementChild.checked = false;
                    v.firstElementChild.nextElementSibling.classList.remove('lineThrough');
                }

            })
        }

    });

}

createView(state);
addLineState(state);

































