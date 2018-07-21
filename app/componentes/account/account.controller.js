(function () {
    angular
        .module('atm')
        .controller('AccountController', AccountController);

    function AccountController($scope, AccountService) {

       $scope.listBank = [];

       AccountService.getAllBank().then(function(data){
        $scope.listBank = data.data;
        $scope.bankList =  $scope.listBank[0];
     })

    $scope.saveAccount = function(){       

        if($scope.number != undefined & $scope.password != undefined & $scope.owner != undefined & $scope.balance != undefined){
            data = {
                "id":0,
                "number": $scope.number,
                "password": $scope.password,
                "owner": $scope.owner,
                "bank": $scope.bankList,
                "balance": $scope.balance
            }
        }else{
            toastr.error('Please fill in all fields!', 'Error');
            return;
        }
    

     AccountService.saveAccount(data).then(function(data){
        toastr.success("Account created successfully");
     }).catch(function(data){        
        toastr.error(data.data.errors[0], 'Error');
     });

    }  
      
    }
})()