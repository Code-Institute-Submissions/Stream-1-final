angular.module('stream1Controllers',[])
  //create controller module called formsControllers, we don't have any dependencies to inject so [] indicates a blank array
  //each route has a controller as defined in the app.js  
  .controller('HomeController', function($scope) {
    $scope.title = "Home";
  })

  .controller('AboutController', function($scope) {
    $scope.title = "About Apartment Brisas";
    $scope.maps = [{
        
      address: 'Brisas Del Mar, Av. Reina Sofia, Formentera del Segura, spain',
      zoom: 16,
      width: 1000      
      },
      {
      address: 'Guardamar del Segura beach, Guardamar del Segura, Spain',
      zoom: 16,
      width: 1000      
      },
      {
      address: 'La Marina, Guardamar del Segura, Spain',
      zoom: 16,
      width: 1000      
    }];
    $scope.map = $scope.maps[0];
  })

  .controller('RegisterController', function($scope) {
    $scope.title = "Register";
  })

  .controller('activitiesController', function($scope) {
    $scope.title = "Activities";
  })

  .controller('pricesController', function($scope, MyService) {
    $scope.title = "Prices";
    var URL = "js/price.json";

    $scope.prices = {}; 
    MyService.getPrice(URL).then(function(results) {
      $scope.prices = results.data;
    }).catch(function(err) {
      console.log(err);
    });
  })

  .controller('availabilityController', function($scope, $http, UserAPIService, MyService) {
    $scope.title = "Availability";
    var apiURL = 'https://www.googleapis.com/calendar/v3/calendars/catkin.order@gmail.com/events?maxResults=15&key=AIzaSyDy4L8f1AMz49DEbNYrsJkn5Jr18lJRDhg';
    $scope.titles = ['Mr','Mrs','Miss','Ms', 'Dr', 'Sir'];
    var myArray = [];
    var myArray2 = [];
    var myArray3 = [];
    $scope.enq_link_show = false;

    function parseDate(str) {
    	var mdy = str.split('-');
    	return (mdy[0] + "/" + mdy[1] + "/" + mdy[2]);
    }

    function parseDate2(str) {
    	var mdy = str.split('/');
    	return (mdy[2] + "-" + mdy[1] + "-" + mdy[0]);
    }

    function daydiff(first, second) {
    	return Math.round((second-first)/(1000*60*60*24));
    }

    function addDays(date, days) {
    	var result = new Date(date);
    	result.setDate(result.getDate() + days);
    	return result;
	}

	function shortenDate(date) {
    	var commaPos = date.indexOf(",");
    	var dateToReturn = date.substring(0, commaPos);
    	return dateToReturn;
	}

    getmydata = function() {
    return $http.get(apiURL)
        .success(function(data) 
        {
            var googleBooked = data.items;
            var googleBooedArrLen = googleBooked.length;
            $scope.mydata = data.items;
            $scope.mydatalen = googleBooedArrLen;
            for (var i = 0; i < googleBooedArrLen; i++) {
            	var summary = (googleBooked[i].summary);
            	summary = summary.toLowerCase();

            	if (summary == 'booked'){
            		var endDate = (googleBooked[i].end.date);
              		var startDate = (googleBooked[i].start.date);

              		if (endDate == null) {
              		endDate = (googleBooked[i].end.dateTime); 
              		}

              		if (startDate == null) {
              		startDate = (googleBooked[i].start.dateTime); 
              		}
            	}
            	var newStartDate = new Date(startDate);
            	var newEndDate = new Date(endDate);
              	var numDaysBooked = daydiff(newStartDate, newEndDate);

              	for (var j = 0; j <=numDaysBooked; j++) {
              		var dateBooked = addDays(newStartDate, j).toLocaleString("en-GB");
              		var todaysDate = new Date().toLocaleString("en-GB");
              		if (dateBooked >= todaysDate){
              			myArray2.push(shortenDate(dateBooked));
              		}             		
              	}
            }
            
        });
    }
    // do the ajax call
	getmydata().then(function(data) {
	}); 

	function shortenDate(date) {
    var commaPos = date.indexOf(",");
    var dateToReturn = date.substring(0, commaPos);
    return dateToReturn;
	}
	
    for(i=0; i < 366; i++){
		var d = new Date();//.toLocaleString("en-GB");
		var d2 = addDays(d, i).toLocaleString("en-GB");
		var d3 = d2.toString();
		var commaPos = d3.indexOf(",");
		var d4 = d3.substring(0, commaPos);
    	myArray.push(d4);
    }
    $scope.datesfrom = myArray;
    $scope.adults = [1,2,3,4,5,6];
    $scope.children = [0,1,2,3,4,5,6];
    var URL = "http://arnoldj-rest.herokuapp.com/enqs/";
    $scope.Enq = {};
    $scope.registerForm = function() {
      var dateFrom = $scope.register.dateFrom;
      var dateTo = $scope.register.dateTo;
      var newDateFrom = new Date(parseDate2(dateFrom));
      var newDateTo = new Date(parseDate2(dateTo));
      var numdays = (daydiff(newDateFrom, newDateTo));
      datesToBook = [];
      myArray3 = [];
      for (var ii = 0; ii <= numdays; ii++) {
      	var dateToAdd = addDays(newDateFrom, ii).toLocaleString("en-GB");
      	datesToBook.push(shortenDate(dateToAdd));
      }

      for (var ij=0; ij<datesToBook.length; ij++){
      	var dateToBook =  datesToBook[ij];
      	
      	for (var jj = 0; jj<myArray2.length;jj++) {
      		var dateAlreadyBooked = myArray2[jj];
      		if (dateToBook == dateAlreadyBooked) {
      			console.log("Already Booked!!!" + dateToBook);
      			myArray3.push(dateToBook);
      		}
      	}
      }

      if (myArray3.length > 0) {
              $scope.alreadyBooked = myArray3 + " are not available, please select alternative dates.  Please refer to calender above for available dates";
              $scope.labAlreadyBooked = true;
              $scope.register_form.$valid = false;
              $scope.register_form.$invalid = true;  
            }

       if ($scope.register_form.$valid) {
       		  var title = $scope.register.selectedTitle;

              $scope.Enq.title = $scope.register.selectedTitle;
              console.log($scope.Enq.title);
              $scope.Enq.fullname = $scope.register.fullname;
              $scope.Enq.emailaddress = $scope.register.email;
              $scope.Enq.telephone = $scope.register.telNumber;
              $scope.Enq.datefrom = dateFrom;//$scope.register.dateFrom;
              $scope.Enq.dateto = dateTo; //$scope.register.dateTo;
              $scope.Enq.numberofadults = $scope.register.selectedAdults;
              $scope.Enq.numberofchildren = $scope.register.selectedChildren;
              $scope.labShow = false;
              UserAPIService.registerEnquiry(URL, $scope.Enq).then(function(results) {
                $scope.data = results.data;
                console.log("ENQ Complete");
                $scope.isDisabled = true;
                $scope.labShow = true;
                //$scope.enq_link_show = true;
              }).catch(function(err) {
                console.log("something went wrong");
                console.log(err);
                });
            }     
  	};



  })

  .controller('weatherController', function($scope, MyService) {
    $scope.title = "Weather";
     
  });