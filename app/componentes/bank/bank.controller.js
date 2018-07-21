(function () {
    angular
        .module('atm')
        .controller('bankController', bankController);

    function bankController($scope, BankService) {

        $scope.bank = [];
       
        BankService.getAll().then(function(data){
         $scope.bank = data.data;
      })

       $scope.change = function (){
          
      }

      $scope.saveBank = function () {
          var objBank = {name: $scope.bankName};
        
          if(objBank.name != undefined){

            BankService.saveBank(objBank).then(function(data){

                toastr.success('bank created successfully');

            }).catch(function(data){
                
                toastr.error(data.data.errors[0], 'Error');
            });
            
          }else{
            toastr.error('Name can not be empty!', 'Error');
          }
          
          
      }
      
    }
})()