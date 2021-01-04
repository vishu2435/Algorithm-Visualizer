
const Algorithms = {
    bubbleSort : {
        algorithm:bubbleSort,
        init : bubbleSortInit
    },
    insertionSort : {
        algorithm : insertionSort,
        init : insertionSortInit
    },
    selectionSort : {
        algorithm : selectionSort,
        init : selectionSortInit
    }

}

let algorithmPage = (new URL(window.location.href)).searchParams.get('sort') 
let heading = (new URL(window.location.href)).searchParams.get('heading')

let currentAlgorithm = Algorithms[algorithmPage]




function onClickPlay(){
    let element = document.getElementById('play-button')
    let inputElement = document.getElementById('checkboxController') 
    if(!inputElement.checked){
    
        element.innerHTML = '<i class="glyphicon glyphicon-pause"></i>'
        // inputElement.setAttribute('checked',true)
        inputElement.checked = true
        currentAlgorithm.algorithm()
    }else{
        
        inputElement.checked =  false
        element.innerHTML = '<i class="glyphicon glyphicon-play"></i>'
        // inputElement.setAttribute('checked',false)
    }
    
}

function handleSlideControl(){
    const element = document.getElementById('speed-controller')
    // console.log(Math.abs(+element.value));
    changeDelaySeconds(Math.abs(+element.value))
}

function changeCurrentAlgorithm(algorithm,heading){
    currentAlgorithm = algorithm
    init(heading)
}

function init(heading){
    // console.log("Init ////",heading);
    let listElements = document.getElementsByClassName('nav-list-item')
    for(let i = 0; i < listElements.length; i++){
        if(listElements[i].getAttribute('id') === algorithmPage){
            listElements[i].classList.add('active')
        }
    }
    // listElements.forEach(element => {
        
    // });
    currentAlgorithm.init()
    // document.getElementById('play-button').innerHTML = '<i class="glyphicon glyphicon-play"></i>'
    document.getElementById("sortHeading").innerText = heading
}
init(heading)

// function clickRegister(id){
//     document.getElementById(id).addEventListener('click',()=>{
//         changeCurrentAlgorithm(Algorithms[id],id)
//     })
// }

// clickRegister('bubbleSort')
// clickRegister('insertionSort')
// clickRegister('selectionSort')
