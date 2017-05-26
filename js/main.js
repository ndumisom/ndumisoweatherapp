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
                    "<td style='color: #fff;padding-right: 0%;padding-left: 18%;width: 50%;'>Description</td>"+
	    	 		"</tr>");

	    	 	   var tbobdy = [];
	    	 	   	tbobdy.push();
	    	 	   	for (var i = 0; i < response.list.length; i++) {
                    tbobdy.push("<tr>"+
	    	 		"<td style='color: #fff;padding-right: 0%;width: 39%;'>"+ response.list[i].dt_txt +"</td>"+
	    	 		"<td style='color: #fff;padding-right: 0%;width: 20%;'>"+ response.list[i].main.temp_max +"</td>"+
	    	 		"<td style='color: #fff;padding-right: 0%;width: 20%;'>"+ response.list[i].main.temp_min +"</td>"+
                    
                    "<td style='color: #fff;padding-right: %;width: 39%;'>"+ response.list[i].weather[0].description +"</td>"+
	    	 		"</tr>");
	    	 		
	    	 	}

	    	 	
	    	 		tableBody = tbobdy[0];
                   for (var i = 1; i < tbobdy.length; i++) {
                      tableBody = tableBody+tbobdy[i];
                   }
	    	 		

	    	 		$(".table-body").html(tableBody);

	    	 		console.log(document.getElementsByClassName("tbody")[0]);
                   

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
                    temperaturesNotOnHighLowdataset(response);
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


function temperaturesNotOnHighLowdataset(response) {
        var findSmallestTemperature = [];
        for (var k = 0; k < response.list.length; k++) {
        	findSmallestTemperature.push(response.list[k].main.temp_min.toFixed(0));
        }
         var j = findSmallestTemperature[0];
		for (var i = 0; i < findSmallestTemperature.length; i++) {
			if (j == findSmallestTemperature[i]) {
				j++;
				continue;
			}
			else {
				arr.push(j);
				i--;
				j++;
			}
		}
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
