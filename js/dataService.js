angular.module('actorsApp')
    .factory('dataService', ['$http', '$q', function ($http, $q) {
        var dataSrv = {};
        var apiKey = '0e4d8e5a4c833e2daa79a095361dee59'
        // Query of actors to the API
        dataSrv.getActors = function (queryText) {
            var promise = $http({
                url: 'https://api.themoviedb.org/3/search/person',
                params: {
                    api_key: apiKey,
                    query: queryText
                }
            });
            return promise;
        }

        // Query of movies to the API
        dataSrv.getMovies = function (personId) {
            var deferred = $q.defer();
            $http.get('https://api.themoviedb.org/3/person/' + personId + '/movie_credits?api_key=' + apiKey, { } )
                .success(function (d) {
                    deferred.resolve(d);
                });

            return deferred.promise;
        }

        return dataSrv;
    }]);