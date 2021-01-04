
const svg = d3.select('svg');

const width = +svg.attr('width') 
const height = +svg.attr('height') 

const margin = {right:15,left:15,top:85,bottom:250}
const innerHeight = height - margin.top - margin.bottom

const innerWidth = width - margin.left - margin.right

var unsortedArr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]

var yScale , xScale

let delaySeconds = 2000;

const render = (data)=>{
    yScale = d3.scaleLinear()
                .domain([0,d3.max(data,d => d)]).nice()
                .range([0,innerHeight])
                // .padding(0.21)
    console.log("range is",yScale.range());
    console.log("domain is",yScale.domain());
    
    xScale = d3.scaleBand()
            .domain(data.map((d)=>d))
            .range([0,innerWidth])
            .padding(0.3)
    
    
    
    const g = svg.append('g')
            .attr('transform',`translate(${margin.left},${margin.top})`)
    
    
    const rectg = g.selectAll('rect').data(data)
        .enter()
        .append('g')
        .attr('style',d=>{
            return `transform:translate(${xScale(d)}px, ${innerHeight-yScale(d)}px)`
        })
        .attr('type','rectangle')
        .attr('value',(d,i)=>{
            return d
        })
    
    rectg
    .append('rect')
    .attr('height',d=>yScale(d))
    .attr('width',xScale.bandwidth())
    .attr('value',d=>d);
    
        
    rectg
    .append('text')
    .text(d => d)
    .attr('x', d=>(xScale.bandwidth()/3))
    .attr('y', d=>(-8))
}

render(unsortedArr)

let jStorer 
let iStorer 
let swapped 
// d3.select('#play-button')
//     .on('click',toggleSort)

let smallest
let smallestPos
const element = document.getElementById('checkboxController')
function bubbleSortInit(){
    
    jStorer = unsortedArr.length
    iStorer = 0
    swapped = false
   
}
function selectionSortInit(){
    
    jStorer = 0    
    iStorer = 0
    swapped = false
    smallest = unsortedArr[jStorer]
    smallestPos = jStorer
}
function insertionSortInit(){
    
    jStorer = 1    
    iStorer = jStorer - 1
    swapped = false
    smallest = unsortedArr[jStorer]
    smallestPos = jStorer
}

function changeDelaySeconds(seconds){
    delaySeconds = seconds
}
  
function insertionSort(){
    let j = jStorer
    let i = iStorer 
    // const element = document.getElementById('bubbleSort')
    if(element.checked){
        function colorer (value){
            d3.selectAll('rect')
                        .each(function (){
                            let element = d3.select(this)
                            if(element.attr('value') == smallest){
                                element.attr('fill','pink')
                            }
                            else if(element.attr('value') == value){
                                element.attr('fill','green')
                            }
                            else if(element.attr('fill')!=='red'){
                                element.attr('fill','steelblue')
                            }
                            
            })
        }
        colorer(smallest)
        function insertionSortPass(i){
            if(!element.checked){
                return;
            }
            if(j == unsortedArr.length){
                       d3.selectAll('rect')
                       .attr('fill','red')  
                       return ;
            }  
            d3.select('#code-3')
                .text('') 
            d3.select('#code-1')
                .text(`J currently is ${j} key ${smallest}`)
            d3.select('#code-innerloop')
                .text(`Executing Inner Loop`)
            slideY(smallest)    
            // console.log("i is ",i,"j is ",j," unsortedArr[i] ", unsortedArr[i] , " smallest ",smallest );
            if( i >= 0 && unsortedArr[i] > smallest){
                unsortedArr[i+1] = unsortedArr[i]
                // console.log("unsorted arr is ",unsortedArr);
                d3.select('#code-2')
                    .text(` ${smallest} is less than ${unsortedArr[i]} `)
                d3.timeout(function(){
                    i-=1
                    iStorer = i
                    return insertionSortPass(i)
                },delaySeconds)
                colorer(unsortedArr[i])

            }else{
                d3.select('#code-3')
                    .text(` ${smallest} is greater than ${unsortedArr[i]}`)
                unsortedArr[i+1] = smallest
                xScale.domain(unsortedArr)
                slide()
                
                
                d3.timeout(function(){
                    j += 1
                    jStorer = j
                    iStorer = j-1
                    smallest = unsortedArr[j]
                    colorer(smallest)
                    return insertionSortPass(iStorer)
                },delaySeconds)
            }

        }
        insertionSortPass(i)
    }
}

function selectionSort(){
    let j = jStorer
    let i = iStorer 
    // const element = document.getElementById('bubbleSort')
    
    if(element.checked){
        
        function colorer (value){
            d3.selectAll('rect')
                        .each(function (){
                            let element = d3.select(this)
                            if(element.attr('value') == smallest){
                                element.attr('fill','pink')
                            }
                            else if(element.attr('value') == value){
                                element.attr('fill','green')
                            }
                            else if(element.attr('fill')!=='red'){
                                element.attr('fill','steelblue')
                            }
                            
            })

        }
        colorer(smallest)
        function sortSelectionPass(i){
            //   console.log('j is ',j,'i is',i);

            if(!element.checked){
                return;
            }
            if(j == unsortedArr.length-1){
                       d3.selectAll('rect')
                       .attr('fill','pink')  
                       return ;
                   }
            d3.select('#code-3')
                   .text('')
            d3.select('#code-1')
                   .text(`J currently is ${j} smallest value ${smallest}`)
            d3.select('#code-innerloop')
                   .text(`Executing Inner Loop`)
            if(i<unsortedArr.length){
                       colorer(unsortedArr[i],'green')
                    d3.select('#code-2')
                       .text(`i currently is ${i} smallest Value ${smallest}`)
                    if(unsortedArr[i]<smallest){
                    d3.select('#code-2')
                       .text(`i currently is ${i} smallest Value ${smallest}`)
                       d3.timeout(function(){
                        smallest = unsortedArr[i]
                        smallestPos = i
                        return colorer(unsortedArr[i],'pink')
                       },delaySeconds)
                      
                    }  
                   d3.timeout(function() {
                       i+=1
                       iStorer = i
                       return sortSelectionPass(i)
                   }, delaySeconds + 50);
            }else{
                let smallestNumber = unsortedArr[smallestPos];
                d3.select('#code-3')
                       .text(`swapping ${smallestNumber} with ${unsortedArr[j]}`)
                unsortedArr[smallestPos] = unsortedArr[j]
                unsortedArr[j] = smallestNumber

                d3.selectAll('rect')
                    .each(function (){
                        let element = d3.select(this)
                        if(element.attr('value') == unsortedArr[j]){
                            element.attr('fill','red')
                        }
                        
                })    
                xScale.domain(unsortedArr)
                slide()
                d3.timeout(function(){
                    j+=1
                    jStorer = j
                    iStorer = j
                    smallest = unsortedArr[j]
                    smallestPos = j
                    sortSelectionPass(iStorer)
                },delaySeconds)

            }
            
        }
        sortSelectionPass(i)
    }
}




function bubbleSort(){
    
    let j = jStorer
    let i = iStorer 
    
   
    if(element.checked){
    function sortPass( i){
        // console.log('j is ',j,'i is',i);
        if(!element.checked){
            return;
        }
        if(!j){
            

            d3.selectAll('rect')
            .attr('fill','red')  
            return ;
        }
        d3.select('#code-1')
            .text(`J currently is ${unsortedArr.length - j} swapped is ${swapped}`)
        d3.select('#code-innerloop')
            .text(`Executing Inner Loop`)    
        if(i<j-1){
            d3.selectAll('rect')
                    .each(function (){
                        let element = d3.select(this)
                        if(element.attr('value') == unsortedArr[i] || element.attr('value') == unsortedArr[i+1]){
                            element.attr('fill','green')
                        }
                        else if(element.attr('fill')!=='yellow'){
                            element.attr('fill','steelblue')
                        }
                        
                })
            d3.select('#code-2')
                .text(`i currently is ${i}`)
            if(unsortedArr[i] > unsortedArr[i+1]){
             
                swapped = true
                d3.select('#code-3')
                .text(`Swapping ${unsortedArr[i]} and ${unsortedArr[i+1]} swapped becomes ${swapped}`)
                d3.timeout(function(){ 
                    var temp = unsortedArr[i];
                    unsortedArr[i] = unsortedArr[i+1];
                    unsortedArr[i+1] = temp;
                    xScale.domain(unsortedArr)
                    slide()    
                    
                },delaySeconds)
                    
                    d3.timeout(function() {
                        i+=1
                        iStorer = i
                        return sortPass(i)
                    }, delaySeconds + 60);
                 
                 
            }else{
                
                d3.timeout(function() {
                    i+=1
                    iStorer = i
                    return sortPass(i)}, delaySeconds);
            }
                // d3.timeout(function() {
                //     i+=1
                //     iStorer = i
                //     return sortPass(i)}, 1000);
        }else{
            if(!swapped){
                d3.selectAll('rect')
                    .attr('fill','red')
                return
            }
            d3.selectAll('rect')
                    .each(function (){
                        let element = d3.select(this)
                        if(element.attr('value') == unsortedArr[j-1]){
                            element.attr('fill','yellow')
                        }
                        
                })
           
            d3.timeout(function() {
                j-=1
                jStorer = j
                swapped = false
                iStorer = 0
                return sortPass(iStorer)}, delaySeconds);
        }
    }
    sortPass(i)

    }
    
}

function slide(){
    // console.log('sclae is ',unsortedArr);
    // console.log(svg.selectAll('[type="rectangle"]'));
    d3.selectAll('[type="rectangle"]')
        .transition()
        .attr("style",(d)=>{
            return `transform:translate(${xScale(d)}px, ${innerHeight-yScale(d)}px)`
        });
        
}
function slideY(value){
    // console.log('sclae is in slide Y ',unsortedArr);
    // console.log(svg.selectAll('[type="rectangle"]'));
    d3.selectAll('[type="rectangle"]')
        .transition()
        .each(function(){
            let element = d3.select(this)
            console.log(+element.attr('value') === +value);
            if(+element.attr('value') === +value){
                element.attr('style',(d)=>{
                    return `transform:translate(${xScale(d)}px, ${ innerHeight-yScale(d) +200 }px)`
                });
               
            }
        })
        
        
}
// const circle = svg.append('circle')
//             .attr('r',200)
//             .attr('cx',svg.attr('width')/2)
//             .attr('cy',svg.attr('height')/2)
//             .attr('fill','red')
//             .attr('stroke','black')

// const leftEye = svg.append('circle')
//             .attr('r',20)
//             .attr('cx',svg.attr('width')/2-100)
//             .attr('cy',svg.attr('height')/2-100)
//             .attr('fill','black')
            
// const rightEye = svg.append('circle')
//             .attr('r',20)
//             .attr('cx',svg.attr('width')/2+100)
//             .attr('cy',svg.attr('height')/2-100)
//             .attr('fill','black')
            


// const g = svg.append('g')
//             .attr('transform',`translate(${svg.attr('width')/2},${svg.attr('height')/2})`)
// const mouth = g.append('path')
//                 .attr('d',d3.arc()({
//                     innerRadius:80,
//                     outerRadius:100,
//                     startAngle:Math.PI/2,
//                     endAngle: 3/2*Math.PI
//                 }))

                