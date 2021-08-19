var dowelApp = angular.module('dowelApp', []);

dowelApp
	.controller('dowelAppController', ['$scope', function dowelAppController($scope){

		// define arrays of data provided
		$scope.colors = [
										    "Red",
										    "Green",
										    "Blue"
										];

		rawCustomers = [
										    [
										        "Jan",
										        "Kowalski",
										        null,
										        "jk@t.co",
										        15558675309,
										        null,
										        "Blue",
										        "img/jan.jpg"
										    ],
										    [
										        "Joe",
										        "PUblic",
										        95,
										        null,
										        5551235555,
										        "1919-01-01",
										        "Blue",
										        "img/joe.jpg"
										    ],
										    [
										        "John",
										        "doe",
										        50,
										        "j.doe@example.com",
										        "555-123-2222",
										        "1969-01-01",
										        "Red",
										        null
										    ],
										    [
										        "jAne",
										        "Doe",
										        33,
										        "jane@example.net",
										        1239966,
										        "1986-04-01",
										        "Green",
										        "img/jane.jpg"
										    ]
										];
		// create object to hold form data
		$scope.formData = {};

		// declare variable to hold number of Customers...
		$scope.totalCustomerAge = 0;
		// ...and the number of customers that provided their ageProvided
		var ageProvided = 0;

		// create submit function
		$scope.submitForm = function(){
			// file input is non functional, so put a placeholder for now
			$scope.formData.photo = 'img/no-photo.jpg';
			// add form data to array of customers
			$scope.customers.push($scope.formData);
			// add age to totalCustomerAge value if it is availble
			if($scope.formData.age && typeof $scope.formData.age == 'number'){
				$scope.totalCustomerAge = $scope.totalCustomerAge + $scope.formData.age;
			}
			// re-run average age calculation
			calcAvgAge();
			// clear formData
			$scope.formData = {};
		}

		// add keys to the values and map to a new array
		$scope.customers = rawCustomers.map(function(customer){
			// if provided, add age to total customer age sum
			if(customer[2] && typeof customer[2] == 'number'){
				$scope.totalCustomerAge = $scope.totalCustomerAge + customer[2];
				// increment number of customer who provided an age
				ageProvided++;
			}
			return {
				'firstName' : customer[0],
				'lastName'  : customer[1],
				'age'				: customer[2],
				'email'			: customer[3],
				'phone'			: customer[4],
				'birthday' 	: customer[5],
				'favColor'	: customer[6],
				'photo'			: customer[7] ? customer[7] : 'img/no-photo.jpg'
			}
		});

		// create sorting functionality
		$scope.sortBy = function(property){
			$scope.reverse = ($scope.property === property) ? !$scope.reverse : false;
			$scope.property = property;
		};

		$scope.getIcon = function(property){
			$scope.reverse ? 'rotate-180' : ''
		};

		// sort by first name initially
		$scope.property = 'firstName';
		$scope.reverse = false;

		// create function to calculate average customer age
		var calcAvgAge = function(){
			$scope.averageAge = $scope.totalCustomerAge / ageProvided;
		};
		calcAvgAge();

		// create function to delete customer records
		$scope.deleteCustomer = function(index){
			// if age was provided
			if($scope.customers[index].age){
				// subtract age from totalCustomerAge sum
				$scope.totalCustomerAge = $scope.totalCustomerAge - $scope.customers[index].age;
				// decrement ageProvided variable
				ageProvided--;
			}
			// delete record
			$scope.customers.splice(index, 1);
			// re-run average age calculation
			calcAvgAge();
		};

		// get year for copyright notice
		$scope.currentYear = new Date().getFullYear();

}])
.filter('titleCase', function(){
	return function(name){
			 if(name){
				return name.replace(/\w\S*/g, function(txt){
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				});
			}
	}
})
.filter('phoneNumber', function(){
		return function(number){
			var phoneNumber;
			if(typeof number === 'number'){
				// convert number to a string
				phoneNumber = number.toString();
				// remove 1 if it is the leading character
				if(phoneNumber.charAt(0) == 1){
					phoneNumber = phoneNumber.substr(1);
				};
				// add appropriate dashes
				if(phoneNumber.length == 10){
					phoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
				} else {
					phoneNumber = '-'
				}
			} else {
				phoneNumber = number;
			};
			return phoneNumber;
		}
});

// jQuery for datepicker
$(function() {
	$('.datepicker').datepicker({
		autoclose: true,
		startView: 2
	})
});
