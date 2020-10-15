const container=document.querySelector(".container");
const seats=document.querySelectorAll(".row .seat:not(.occupied)");
const count=document.getElementById("count");
const total=document.getElementById("total");
const movieSelect=document.getElementById("movie");
let ticketPrice=+movieSelect.value;
console.log(+movieSelect.value);
console.log(seats);
// populate the last data in UI on refreshing
populateUI();
function populateUI(){
    let seatIndexs=JSON.parse(localStorage.getItem('seatIndexs'));
    console.log(seatIndexs);
    if(seatIndexs!=null && seatIndexs.length>0){
    seats.forEach((element,index) => {

        console.log(element);
        if(seatIndexs.indexOf(index)>-1)
        element.classList.add('selected');
    });
    }
    movieSelectIndex= localStorage.getItem('selectedIndex');
    if(movieSelectIndex!=null){
        movieSelect.selectedIndex=movieSelectIndex;
    }
}


// setting the data on LocalSrorage
function setMovieData(selectedIndex,value){
localStorage.setItem('selectedIndex',selectedIndex);
localStorage.setItem('priceValue',value);
}
movieSelect.addEventListener('change',e=>{
ticketPrice=+e.target.value;
setMovieData(e.target.selectedIndex,e.target.value)
updateSelectedCount();
})

// Logic to update selected count in Template
function updateSelectedCount(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected');
    seatIndexs=[...selectedSeats].map(seat=>[...seats].indexOf(seat));
    localStorage.setItem('seatIndexs',JSON.stringify(seatIndexs));
    console.log(seatIndexs);
    localStorage.getItem('seatIndexs')
    console.log(selectedSeats.length);
    console.log(ticketPrice);
    count.textContent=selectedSeats.length;
    total.innerText=selectedSeats.length* ticketPrice;
}
// This Event listener on selecting the Seat

container.addEventListener('click',(e)=>{console.log(e.target);
if(e.target.className.includes('seat') && !e.target.className.includes('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount()
}
})
// call it at the end to update the content stored last in local storage
updateSelectedCount();
