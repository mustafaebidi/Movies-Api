let fieldWriteMovieName=document.getElementById("movie")

let containerOfMovie=document.querySelector(".movie-container .container")

let slider=document.querySelector(".slider")

let openSlider=document.querySelector(".open")

let opations=document.querySelectorAll(".slider ul li")
let opationsLink=document.querySelectorAll(".slider ul li a")


let allData;

getMovieByOpation("now_playing")


fieldWriteMovieName.onkeyup=function(){

    getMovieByName(fieldWriteMovieName.value)

}

openSlider.onclick=function(){
    slider.classList.toggle("active")
    opations.forEach(element => {
        element.classList.toggle("active")
    });

}



function getMovieByName(name){
    let myRequest= new XMLHttpRequest();


    myRequest.onreadystatechange=function(){
        if(this.readyState === 4 && this.status === 200 ){
            allData=JSON.parse(this.responseText)
            allData=allData.results
            showDate()
        }
    }


    myRequest.open("GET",`https://api.themoviedb.org/3/search/movie?query="${name}"&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false`)

    myRequest.send()


}


function getMovieByOpation(opation){
    let myRequest= new XMLHttpRequest();


    myRequest.onreadystatechange=function(){
        if(this.readyState === 4 && this.status === 200 ){
            allData=JSON.parse(this.responseText)
            allData=allData.results
            showDate()
        }
    }


    if(opation === "trending"){
        myRequest.open("GET",`https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)

    }
    else if(opation === "upcoming"){
        myRequest.open("GET",`https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    }
    else{
        myRequest.open("GET",`https://api.themoviedb.org/3/movie/${opation}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    }

    myRequest.send()


}



function showDate(){
    containerOfMovie.innerHTML=""
    for(let i=0;i<allData.length;i++){
        containerOfMovie.innerHTML+=`
            <div class="movie">
                <img src="https://image.tmdb.org/t/p/w500${allData[i]["poster_path"]}">
                <div class="description">
                    <div class="info">
                        <h3>${allData[i]["original_title"]}</h3>
                        <p>${allData[i]["overview"]}</p>
                        <h5>${allData[i]["vote_average"]}</h5>
                        <h5>${allData[i]["release_date"]}</h5>

                    </div>
                </div>
            </div>
        `

    }

}



opationsLink.forEach(element => {
    element.addEventListener("click",function(e){
        console.log(e.target.innerHTML.replace(" ","_").toLowerCase())

        getMovieByOpation(e.target.innerHTML.replace(" ","_").toLowerCase())
        showDate()

    })

    
});