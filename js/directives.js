angular.module('actorsApp')
.directive('movieList', ['$compile', 'dataService',function($compile,dataService){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                person: '='
            },
            template: '<div class="movieList"></div>',
            link: function(scope, element){
                var id = 'id_'+ scope.person.id;
                var html = angular.element('<table id="' + id +'"><thead><th>Name</th><th>Year</th></thead></table>');
                html.append('<tbody />');

                // API is called for the current movie in the scope.
                dataService.getMovies(scope.person.id).then(function(d){
                    var movies = d.cast;
                    // The array of movies is traversed and for each movie object a row in the table is created
                    // manually.
                    $.each(movies, function(k,v){

                        // Link with the name of the movie
                        var link = angular.element('<a href="#" ng-click="showMovieDetails($event,'+k+')"> '+ v.title + '</a>');
                        // In the click event the values are placed in the html of the dialog and the this
                        // modal dialog is showed.
                        link.bind('click', function(){
                            $('#dialogTitle').text(scope.person.name + ' in ' +v.title);
                            $('#movieTitle').text( v.original_title);
                            $('#movieYear').text(v.release_date);
                            $('#movieCharacter').text(v.character);
                            var imgPoster = '';
                            if(scope.person.profile_path){
                                imgPoster = 'http://image.tmdb.org/t/p/w500/'+ v.poster_path;
                            }else{
                                imgPoster = 'img/user.png';
                            }
                            $('#movieImage').attr('src',imgPoster);

                            $('#myModal').modal({
                            });
                        });

                        var column1 = angular.element('<td />');
                        var column2 = angular.element('<td />');

                        column1.append(link);
                        column2.append(v.release_date);

                        var rowHtml = angular.element('<tr />');
                        rowHtml.append(column1);
                        rowHtml.append(column2);

                        html.append(rowHtml)
                    })
                    $compile(html)(scope);
                    element.append(html);
                    scope.movies = movies;

                    // Once the html table is created, the datatable plugin is activated into that table.
                    // to give some functionalities like paging and sorting.
                    var ex = document.getElementById(id);
                    if ($.fn.DataTable.fnIsDataTable(ex)) {
                        var oTable = $(ex).dataTable();
                        oTable.fnDestroy();
                        console.log('Datatable destroyed')
                    }
                    $('#'+id).dataTable({
                        "sPaginationType": "bootstrap_full",
                        "aaSorting": [[ 1, "desc" ]]
                    });

                });

            }
        }
    }])