(function() {
	angular.module('atm').factory('BankService', BankService);

	function BankService($http) {
		var service = {
            getAll : getAll,
            saveBank: saveBank
		}

		return service;

		function getAll() {
			return $http.get("http://localhost:8080/bank").then();
        }
        
        function saveBank(data){
            return $http.post("http://localhost:8080/bank", data).then();
        }

	}

})()