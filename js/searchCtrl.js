angular.module('actorsApp')
    .controller('searchCtrl', ['$scope', 'dataService', function($scope, dataService){
        $scope.query = '';
        $scope.results = [];

        // Called on the submit of the form.
        $scope.search = function() {
            dataService.getActors($scope.query).then(function(d){
                $scope.results = d.data.results;
                console.log(d.data.results);
            });
        }
        // Clear the search textbox content
        $scope.clear = function() {
            $scope.query = '';
            $scope.results = [];
        }

        // Returns the url with the image of the actor or a default image if is not found a profile image.
        $scope.getImageUrl = function(person) {
            if(person.profile_path){
                return 'http://image.tmdb.org/t/p/w500/'+ person.profile_path;
            }else{
                return 'img/user.png';
            }
        }





}]);