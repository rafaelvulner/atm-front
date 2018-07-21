(function() {
	angular.module('atm').factory('AccountService', AccountService);

	function AccountService($http) {
		var service = {
            getAllBank : getAllBank,
            saveAccount: saveAccount
		}

		return service;

		function getAllBank() {
			return $http.get("http://localhost:8080/bank").then();
        }
        
        function saveAccount(data){
            return $http.post("http://localhost:8080/account", data);
        }

	}

})()