var date = new Date();
            //Change screen backgrounds depaneding on time
			 var hour = date.getHours();
             var min = date.getMinutes();
             if(hour<5){
                   $(function() {
    			   var BV = new $.BigVideo();
    			   BV.init();
    			   BV.show(['night.mp4'],{ambient:true});
                   });
               }else if(hour<16){
               		$(function() {
    			   var BV = new $.BigVideo();
    			   BV.init();
    			   BV.show(['daylight.mp4'],{ambient:true});
                   });
               }else if(hour<19){
               		$(function() {
    			   var BV = new $.BigVideo();
    			   BV.init();
    			   BV.show(['evening.mp4'],{ambient:true});
                   });
               }else{
                   	$(function() {
    			   var BV = new $.BigVideo();
    			   BV.init();
    			   BV.show(['night.mp4'],{ambient:true});
                   });
 }
 $('.submit').click(function(){
	//Define the text field that will take city name to the weather api
	var city = $('.city_names').val();
	$.ajax({
	    url: "http://api.openweathermap.org/data/2.5/forecast",
	 
	    // name of the callback parameter
	    jsonp: "callback",
	 
	    // tell jQuery we're expecting JSONP
	    dataType: "jsonp",
	 
	    //what we want
	    data: {
	        q: city,
	        units:"metric",
	        mode: "json",
			appid:"d622d7effd21f8b18cf4533cc76e6bf3"
	    },
	    success: function( response ) { 
	    	
             var temp = response.list[5].main.temp;
             
             if(temp<25 ){
            	 $('.message').html("it's feels cold, get a jacket");
             }else if(temp<35){
            	 $('.message').html("it's feels normal"); 
             }else if(temp<50){
            	 $('.message').html("it's feels hot, switch on your AC");
             }
                $('.city').html(response.city.name);
	    	 	$('.country').html('( </span><span>'+response.city.country+'</span><span> )' + " "+"5 days weather forecast");
	    	 	$('.table-header').html("<tr>"+
                     "<td style='color: #fff;padding-right: 20%;width: 50%;'>Date & time</td>"+
	    	 		"<td style='color: #fff;padding-right: 0%;width: 20%;'>Max</td>"+
	    	 		"<td style='color: #fff;padding-right: 0%;width: 20%;'>Min</td>"+
                    "<td style='color: #fff;padding-right: %;width: 22%;'>Description</td>"+
	    	 		"</tr>");

	    	 	   var tbobdy = [];
	    	 	   	tbobdy.push();
	    	 	   	for (var i = 0; i < response.list.length; i++) {
                    tbobdy.push("<tr>"+
	    	 		"<td style='color: #fff;padding-right: 0%;width: 40%;'>"+ response.list[i].dt_txt +"</td>"+
	    	 		"<td style='color: #fff;padding-right: 0%;width: 15%;'>"+ response.list[i].main.temp_max +"</td>"+
	    	 		"<td style='color: #fff;padding-right: 0%;width: 15%;'>"+ response.list[i].main.temp_min +"</td>"+
                    
                    "<td style='color: #fff;padding-right: %;width: 35%;'>"+ response.list[i].weather[0].description +"</td>"+
	    	 		"</tr>");
                }
	    	 	tableBody = tbobdy[0];
                   for (var i = 1; i < tbobdy.length; i++) {
                      tableBody = tableBody+tbobdy[i];
                   }
                   $("tbody").html(tableBody);
                    var calculateAverageHighTem = 0;
                   for (var i = 0; i < response.list.length; i++) {
                   	calculateAverageHighTem = calculateAverageHighTem+response.list[i].main.temp_max;
                   }
                   var calculateAverageLowTem = 0;
                   for (var i = 0; i < response.list.length; i++) {

                      calculateAverageLowTem = calculateAverageLowTem+response.list[i].main.temp_min;
                   }
                   AverageHighTemperature = calculateAverageHighTem/response.list.length;
                   calculateAverageLowTem = calculateAverageLowTem/response.list.length;
	   	    	    $('.average-high-temperature').html("<tr>"+
                     "<td style='color: #fff;padding-right: 0%;width: 50%;'>Average High&Low Temperature</td>"+
	    	 		"<td style='color: #fff;padding-right: 0%;width: 20%;'>"+AverageHighTemperature.toFixed(2)+"</td>"+
	    	 		"<td style='color: #fff;padding-left: 10%;width: 20%;'>"+calculateAverageLowTem.toFixed(2)+"</td>"+
                    "<td style='color: #fff;padding-right: 0%;padding-left: 0%;width: 0%;'></td>"+
	    	 		"</tr>");
	    	 
                    var temNotOnLonHigh = temperaturesNotOnHighLowdataset(response);

                     sumOf = "<p>Temp not in the data set</p>";

                     for (var i = 0; i < temNotOnLonHigh.length; i++) {
                     	sumOf = sumOf+ "<p>"+temNotOnLonHigh[i]+"</p>";
                     }

			          if(temNotOnLonHigh.length>0){
			           $('.missing-data-set').html(sumOf);
			          }
			          else {
			          	$('.missing-data-set').html(sumOf+"<p>None</p>");
			          }

                   var createDictionalHighLow = createDictionalHighLowTemperatures(response);

                   dictionarySum = "<p>Dictinary</p>";

                   for (var key in createDictionalHighLow) {
                   if (createDictionalHighLow.hasOwnProperty(key)) {
                       dictionarySum=dictionarySum+"<p>"+(key + " -> " + createDictionalHighLow[key])+"</p>";
						  }
						}

			         
			           $('.dictinary').html(dictionarySum);
			       
			  

                    displayOveral = displayOverallMinMax(response);

                    displayOveralSum = "<p>display Overall Min Max</p>";

                     for (var i = 0; i < displayOveral.length; i++) {
                     	displayOveralSum = displayOveralSum + "<p>"+displayOveral[i]+"</p>";
                     }

			          if(displayOveral.length>0){
			           $('.overall-min-max').html(displayOveralSum);
			          }
			          else {
			          	$('.overall-min-max').html(displayOveralSum+"<p>None</p>");
			          }
             
	}
});
});

$(document).ready(function(){
	$( ".city_names" ).autocomplete({
		source: function( request, response ) {
			$.ajax({
				url: "http://api.openweathermap.org/data/2.5/find",
				dataType: "jsonp",
				data: {
					q: request.term,
					mode: "json" ,
					appid:"d622d7effd21f8b18cf4533cc76e6bf3"
				},
				success: function( data ) {
					if (typeof Array.prototype.forEach != 'function') {
					    Array.prototype.forEach = function(callback){
					      for (var i = 0; i < this.length; i++){
					        callback.apply(this, [this[i], i, this]);
					      }
					    };
					}

					var parsed = data.list;
					var newArray = new Array(parsed.length);
					var i = 0;
					  parsed.forEach(function (entry) {
	                    var newObject = {
	                        label: entry.name+" "+entry.sys.country
	                    };
	                    newArray[i] = newObject;
	                    i++;
	                });

					  response(newArray);
				},
				error: function (message) {
	                response([]);
	            }
			});
		},
		minLength: 2,
		open: function() {
			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
		},
		close: function() {
			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		}
	});
	
});

function temperaturesNotOnHighLowdataset(response){
	    var findSmallestTemperature = [];
	    var findLargetTemperature = [];
        for (var k = 0; k < response.list.length; k++) {
        	findSmallestTemperature.push(response.list[k].main.temp_min.toFixed(0));
        }
        for (var k = 0; k < response.list.length; k++) {
        	findLargetTemperature.push(response.list[k].main.temp_max.toFixed(0));
        }
         //join 2 arrays so you find the missing value on both high and low temperature
        var children = findSmallestTemperature.concat(findLargetTemperature);

        responseArray = sort_unique(children);

        console.log("High and Low Temperatures without duplicates : "+responseArray) ;

		var arr = [];
		var a = responseArray;
		var j = a[0];
		for (var i = 0; i < a.length; i++) {
			if (j == a[i]) {
				j++;
				continue;
			}
			else {
				arr.push(j);
				i--;
				j++;
			}
		}
		console.log("Temperatures not in the data set  : "+arr);
		return arr;
	}	
	function createDictionalHighLowTemperatures(response) {
		var input=[];
	    var result = {};
	    var a = [], b = [], prev;
	    var findSmallestTemperature = [];
        for (var k = 0; k < response.list.length; k++) {
        	findSmallestTemperature.push(response.list[k].main.temp_min.toFixed(0));
        }
        var findLargetTemperature = [];
        for (var k = 0; k < response.list.length; k++) {
        	findLargetTemperature.push(response.list[k].main.temp_max.toFixed(0));
        }
        //join 2 arrays so you find the missing value on both high and low temperature
        var children = findSmallestTemperature.concat(findLargetTemperature);
        var arr=children;
        arr.sort();
	    for ( var i = 0; i < arr.length; i++ ) {
	        if ( arr[i] !== prev ) {
	            a.push(arr[i]);
	            b.push(1);
	        } else {
	            b[b.length-1]++;
	        }
	        prev = arr[i];
	      }
		 for (var i = 0; i < a.length; i++) {
	         input.push({key:a[i], value:b[i]});
	        }

		 for(var i = 0; i < input.length; i++)
			{
			    result[input[i].key] = input[i].value;
			}

           console.log("dictionary based on the combined dataset :",result); // Just for testing
           return result;
       }

       function displayOverallMinMax(response){
       	var findSmallestTemperature = [];
       	var findLargetTemperature = [];
        for (var k = 0; k < response.list.length; k++) {
        	findSmallestTemperature.push(response.list[k].main.temp_min.toFixed(0));
        }
        for (var k = 0; k < response.list.length; k++) {
        	findLargetTemperature.push(response.list[k].main.temp_max.toFixed(0));
        }
         //join 2 arrays so you find the missing value on both high and low temperature
        var maxAndMinArray = findSmallestTemperature.concat(findLargetTemperature); 
        console.log("Overall Max and Min value in the dataset  : "+maxAndMinArray);
        return maxAndMinArray;
    }
    function sort_unique(sortTemperaturesRemoveDupl) {
    if (sortTemperaturesRemoveDupl.length === 0) return sortTemperaturesRemoveDupl;
    sortTemperaturesRemoveDupl = sortTemperaturesRemoveDupl.sort(function (a, b) { return a*1 - b*1; });
    var ret = [sortTemperaturesRemoveDupl[0]];
    for (var i = 1; i < sortTemperaturesRemoveDupl.length; i++) { // start loop at 1 as element 0 can never be a duplicate
        if (sortTemperaturesRemoveDupl[i-1] !== sortTemperaturesRemoveDupl[i]) {
            ret.push(sortTemperaturesRemoveDupl[i]);
        }
    }
    return ret;
}
