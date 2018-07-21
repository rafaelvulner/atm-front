(function () {
    angular
        .module('atm')
        .controller('AtmController', AtmController);

    function AtmController($scope, AtmService) {

        $('#deposit').hide();
        $('#withdraw').hide();

        $scope.listBank = [];
        $scope.balance = [];  
        $scope.deposits = [];  
        $scope.headerModal;    

        AtmService.getAllBank().then(function (data) {
            $scope.listBank = data.data;
            $scope.bankList = $scope.listBank[0];
            $scope.operation = "balance";
        })

        $scope.authenticate = function () {
            data = {
                id: 0,

            }

            switch ($scope.operation) {
                case 'deposit':
                    deposit();
                    break;
                case 'withdraw':
                    withdraw();
                    break;
                case 'balance':
                    balance();
                    break;
            }
        }

        $scope.createInput = function () {
            switch ($scope.operation) {
                case 'deposit':
                    $('#deposit').show();
                    $('#withdraw').hide();
                    break;
                case 'withdraw':
                    $('#deposit').hide();
                    $('#withdraw').show();
                    break;
                case 'balance':
                    $('#deposit').hide();
                    $('#withdraw').hide();
                    break;
            }
        }

        function deposit() {
            $scope.headerModal = "Deposit!"

            if($scope.bankList.name != undefined & $scope.number != undefined & $scope.password != undefined & $scope.deposit != undefined){
                dados = {
                    bankName: $scope.bankList.name,
                    accountNumber: $scope.number,
                    password: $scope.password,
                    balance: $scope.deposit
                }
    
                AtmService.deposit(dados).then(function (data) {                    
                  
                    $('#info').find('h3').html('Balance: '+ data.data.data.balance);
                    $('#myModal').modal('show');
                    
                }).catch(function (data) {

                    $('#info').find('h3').html(data.data.errors[0]);
                    $('#myModal').modal('show');
                    
                });
            }else{

                toastr.error('Please fill in all fields!', 'Error');

                return;
            }
        }

        function withdraw() {

            $scope.headerModal = "Withdraw!"

            if($scope.bankList.name != undefined & $scope.number != undefined & $scope.password != undefined & $scope.withdraw != undefined){
                dados = {
                    bankName: $scope.bankList.name,
                    accountNumber: $scope.number,
                    password: $scope.password,
                    balance: $scope.withdraw
                }
    
                AtmService.withdraw(dados).then(function (data) {
                    
                    $('#info').find('h3').html('Owner: '+ data.data.data.owner+ '<br>Withdraw: '+$scope.withdraw+'<br>Balance: '+ data.data.data.balance+'<br> Qtd Cedula: '+data.data.data.qtdCedula);
                    $('#myModal').modal('show');
                    
                }).catch(function (data) {    
                   
                    $('#info').find('h3').html(data.data.errors[0]);
                    $('#myModal').modal('show');
                    
                });
            }else{

                toastr.error('Please fill in all fields!', 'Error');

                return;
            }

        }

        function balance() {

            $scope.headerModal = "Balance!"

            if($scope.bankList.name != undefined & $scope.number != undefined & $scope.password != undefined){
                dados = {
                    bankName: $scope.bankList.name,
                    accountNumber: $scope.number,
                    password: $scope.password
                }
    
                AtmService.balance(dados).then(function (data) {
                    
                    $scope.balance = data.data.data.balance;
                    $('#info').find('h3').html('Your balance is: '+$scope.balance);
                    $('#myModal').modal('show');
                    
                }).catch(function (data) {
    
                    $scope.balance = data.data.errors[0];
                    $('#info').find('h3').html($scope.balance);
                    $('#myModal').modal('show');

                });
            }else{

                toastr.error('Please fill in all fields!', 'Error');

                return;
            }

           

            
        }



    }
})()