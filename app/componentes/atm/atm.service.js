(function() {
	angular.module('atm').factory('AtmService', AtmService);

	function AtmService($http) {
		var service = {
            getAllBank : getAllBank,
            balance: balance,
            deposit: deposit,
            withdraw: withdraw
           
		}

		return service;

		function getAllBank() {
			return $http.get("http://localhost:8080/bank").then();
        }

        function balance(data){
            return $http.post("http://localhost:8080/atm-api/balance", data);
        }

        function deposit(data){
            return $http.put("http://localhost:8080/atm-api/deposit", data);
        }

        function withdraw(data){
            return $http.put("http://localhost:8080/atm-api/withdraw", data);
        }

	}

})()