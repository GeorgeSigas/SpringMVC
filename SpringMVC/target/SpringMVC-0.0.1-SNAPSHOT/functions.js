function signupActions() {
	
	var url = "http://127.0.0.1:8181/SpringMVC/signup";

	var s = "?fname="+document.getElementsByName("fname")[0].value
			+"&lname="+document.getElementsByName("lname")[0].value
			+"&uname="+document.getElementsByName("uname")[0].value
			+"&psw="+document.getElementsByName("psw")[0].value;
	
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            if(xhttp.response==="false")
            	{
            		document.getElementsByName("errorMsg")[0].innerHTML="This Account Already exists"
            		document.getElementsByName("fname")[0].value="";
            		document.getElementsByName("lname")[0].value="";
            		document.getElementsByName("uname")[0].value="";
            		document.getElementsByName("psw")[0].value="";
            	}
            else
            	{
            		location.replace("logged-in.html");
            	}
        }
    }
    xhttp.open('POST', url+s, true);
    xhttp.send();

}
function LoggedInFunc(){
	var url = "http://127.0.0.1:8181/SpringMVC/loggedIn";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            
            		document.getElementsByName("userName")[0].innerHTML="Welcome "+xhttp.response+"!"
           
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send(null);
}


function loginActions() {
	var url = "http://127.0.0.1:8181/SpringMVC/login";

	var s = "?uname="+document.getElementsByName("uname")[1].value
			+"&psw="+document.getElementsByName("psw")[1].value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            if(xhttp.response==="false")
            	{
            		document.getElementsByName("errorMsg")[1].innerHTML="Wrong Username Or Password!"
            		document.getElementsByName("uname")[1].value="";
            		document.getElementsByName("psw")[1].value="";
            	}
            else
            	{
            		location.replace("logged-in.html");
            	}
        }
    }
    xhttp.open('POST', url+s, true);
    xhttp.send();
}

function logoutActions() {
	var url = "http://127.0.0.1:8181/SpringMVC/logOut";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
           
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send(null);
    if (confirm("Are you sure?")) {
        alert("Logged out!")
        location.replace("movieSearch.html");
	} else {

    }
}


function saveFunc(e){
	var x=e.currentTarget
	if(x.innerHTML==="Save")
	{
		var url = "http://127.0.0.1:8181/SpringMVC/save";

		var s = "?id="+x.id;
		
	    var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	    	if (this.readyState === XMLHttpRequest.DONE && this.status === 200)
	    	{
	    		if(xhttp.response==="false")
	    		{
	    			alert("You Have to Login in order to Save Movies")
	    		}
	    		else{
	    			if(xhttp.response==="false1")alert("This Movie has Already been added to Bookmarks")
		        	x.style.backgroundColor="red";
					x.innerHTML="Saved!";
	    		}
	    	}
	    }
	    xhttp.open('GET', url+s, true);
	    xhttp.send();
			
	}
	else{
		var url = "http://127.0.0.1:8181/SpringMVC/delete";
		var s = "?id="+x.id;
		
	    var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	    	if (this.readyState === XMLHttpRequest.DONE && this.status === 200) 
	    	{
	    		
		    		x.style.backgroundColor="white";
		    		x.innerHTML="Save";
	    		
	     	}
	    }
	    xhttp.open('GET', url+s, true);
	    xhttp.send();
	}
			
}
var Bookmarkoutput;
function PrintBookMarks(){
	
	var url = "http://127.0.0.1:8181/SpringMVC/getbookmarks";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    	var results;
        Bookmarkoutput='';
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        	
        	results = JSON.parse(this.responseText)
            if (results.Response != "False") {
            	
                for (var item in results) {    
                	
                	
                		getMovie(results[item].MovieId);
                	
            	
                }
            }
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send();
	
	
	
}

function SearchFunc() {
    //http request - the global one
    var url = "http://www.omdbapi.com/?apikey=1981e78e&s=";

    var s = document.getElementsByName("search")[0].value;
    var xhttp = new XMLHttpRequest();

    //creating the JSON
    xhttp.onreadystatechange = function() {
        var results;
        let output = '';
        if (this.readyState == 4 && this.status == 200) {

            results = JSON.parse(this.responseText)
            if (results.Response != "False") {
                var Arr = results.Search;


                for (var item in Arr) {

                    // container for the results - taking the short plot from another 'i' http request
                    output += `
						<style type="text/css">
							.movie-container{
								display: grid;
								grid-template-areas:
								'title title title'
								'image info info'
								'image buttons buttons';
								grid-gap: 0.5%;
								background-color: #ffffff;
							}
							.movie-container > div {
								text-align: center;
								font-size: 80%;
							} 
							.movie-container--fit{
								grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
							}
							.item1{
								background-color: #ffffff;
							   	grid-area: image;
							}
							.item2{
								background-color: #ffffff;
							   	grid-area: title;
							}
							.item3{
								background-color: #ffffff;
								grid-area: info;	
							}
							.item4{
								background-color: #ffffff;
								grid-area: buttons;
							}
							  
							h5{
								text-shadow:2px 2px 0 grey;
								font-size: 90%;
							}
							p {
								font-family: Arial, Helvetica, sans-serif;
								font-size: 80%;
							}
							.button2 {
								width: 58px;
								height: 40px;
								font-size: 60%;
								background-color: white;
								color: black;
								border: 2px solid #555555;
							}
							.button2:hover {
								background-color: #555555;
								color: black;
							}
							

							@media screen and (max-width: 450px) {
								.movie-container {
									display: block;
									'title title title'
									'image image image'
									'info info info'
									'buttons buttons buttons;							
									grid-gap: 0.5%;
									padding: auto;
									margin: auto;
								}
								.movie-container > div {
									text-align: center;
									font-size: 60%;
								} 
								#movies img{
									width: 100%;
									height: 100%;
								}
								.p{
									width: 100%;
									float: left;
								}
								.button2{
									width: 40%;	
								}
							}

						</style>

						<div class="movie-container">
							<div class="item2"><h5> ${Arr[item].Title}</h5></div>
							<div class="item1"><img src='${Arr[item].Poster}'  width='300' height='300'></div>
							<div class="item3">
								<p> <b>Year:</b> ${Arr[item].Year} <br><br> 
								<b>Type:</b> ${Arr[item].Type} <br><br> 
								<b>Short Plot:</b></p>  
								<p id="${Arr[item].imdbID}"></p>								
							</div>

							<script>
								 function getSPlot(idp){
									var results2;
									var url2 = "http://www.omdbapi.com/?apikey=1981e78e&i=" + idp;
									var xhttp3 = new XMLHttpRequest();
									let output = '';
    								xhttp3.onreadystatechange = function() {
										
       								 	if (this.readyState == 4 && this.status == 200) {
											
											results2 = JSON.parse(this.responseText);
											
           									if (results2.Response != "False") {
												output += results2.Plot;
            								}
										}
										$('#'+idp).html(output);	
									};
									xhttp3.open("GET", url2, true);
									xhttp3.send();	
								}
							document.getElementById("${Arr[item].imdbID}").innerHTML = window.getSPlot('${Arr[item].imdbID}');
							</script>

							<div class="item4"><button class="button2" type="button" onclick="getMovie('${Arr[item].imdbID}')">More...</button>
								<button class="button2" type="button" id="${Arr[item].imdbID}" onclick="saveFunc(event)">Save</button>
							<br><br></div>
						</div>
					`;
                }
            }
        }
    
        // displaying the results
        $('#movies').html(output);
        
    };
    xhttp.open("GET", url + s, true);
    xhttp.send();
}

function getMovie(id) {
    // 'i&plot = full' http request for 'more' button
    var url = "http://www.omdbapi.com/?apikey=1981e78e&i=" + id;
    var plus = "&plot=full";
    var xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function() {
        var results;
        let output = '';

        if (this.readyState == 4 && this.status == 200) {
            results = JSON.parse(this.responseText);
           

            if (results.Response != "False") {

                output += `
					<style type="text/css">
						.movie-container{
							display: grid;
							grid-template-areas:
							'title title title'
							'image image image'
							'info info info'
							'info info info'
							'buttons buttons buttons';
							grid-gap: 0.5%;
							background-color: #ffffff;
							
						}
						.movie-container > div {
							text-align: center;
							font-size: 80%;
						} 
						.movie-container--fit{
							grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
						}
						.item1{
							background-color: #ffffff;
							grid-area: image;
						}
						.item2{
							background-color: #ffffff;
							grid-area: title;
						}
						.item3{
							background-color: #ffffff;
							grid-area: info;
							text-align: center;
						}
						.item4{
							background-color: #ffffff;
							grid-area: buttons;
						}
					  
						h5{
							text-shadow:2px 2px 0 grey;
							font-size: 90%;
						}
						p {
							font-family: Arial, Helvetica, sans-serif;
							font-size: 80%;
							text-align:center;	
						}
						.button2 {
							width: 150px;
							height: 40px;
							font-size: 60%;
							background-color: white;
							color: black;
							border: 2px solid #555555;
							float: center;
						}
						.button2:hover {
							background-color: #555555;
							color: white;
						}

						@media screen and (max-width: 450px) {
							.movie-container {
								display: block;
								'title title title'
								'image image image'
								'info info info'
								'buttons buttons buttons'
								;							
								grid-gap: 0.5%;
								padding: auto;
								margin: auto;
								
							}
							#movies img{
								width: 100%;
							}
							.p{
								width: 100%;
							}
						}
					</style>

					<div class="movie-container">
						<div class="item2"><h5> ${results.Title}</h5></div>
						<div class="item1"><img src='${results.Poster}'  width='300' height='300'></div>
						<div class="item3">
							<p> 
								<b>Year:</b> ${results.Year} <br><br> <b>Type:</b> ${results.Type} <br><br> <b>IMDB:</b> ${results.imdbRating} <br><br> <b>Release Date:</b> ${results.Released}
								<br><br> <b>Cast:</b> ${results.Actors} <br><br> <b>Awards:</b> ${results.Awards} <br><br> <b>Genre:</b> ${results.Genre} <br><br> <b>Language:</b> ${results.Language}
								<br><br> <b>Duration:</b> ${results.Runtime}<br><br> <b>Full Plot:</b> ${results.Plot}
								
								
							</p>
						</div>
						<div class="item4">
								<button class="button2" type="button" id="${results.imdbID}" onclick="saveFunc(event)">Delete</button>
							<br><br>
						</div>
						
					</div>
				`;
            }
        }
        // display
        Bookmarkoutput+=output;
        $('#movies').html(output);
        $('#bookmarkedMovies').html(Bookmarkoutput);
        
    };
    xhttp2.open("GET", url + plus, true);
    xhttp2.send();
}