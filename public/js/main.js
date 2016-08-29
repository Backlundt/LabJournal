
var note = angular.module('LabJournal', [
'ngRoute',
'ngSanitize',
'ng-showdown'
]);
//note.directive('markdown', function($window) {
  //var converter = new $window.Showdown.converter();
  //return {
    //restrict: 'E',
    //link: function(scope, element, attrs) {
      //var htmlText = converter.makeHtml(element.text());
      //element.html(htmlText);
    //}
  //}
//});

note.controller('noteController',function noteController($scope,$showdown,$http) {

  $scope.notes = [];
  $scope.note = {};
  $scope.note.text = "";
  $scope.note.project = ""
  $scope.displayedProject = ""
  $scope.update = function(note) {
    console.log("wat");
    console.log(note);
    $http({
      method: "post",
      url: "/saveNote",
      data: note
    })
    .success(function(err,res){

      console.log("hurra ",err,res);
    
    });
  };

  $scope.loadProject = function(p) {

    console.log("wat");
    console.log(p);
    $http({
      method: "post",
      url: "/queryNote",
      data: {
        project: p
      }
    })
    .success(function(res,err){
      $scope.displayedProject = p;
      console.log("hurra ",err,res);
      $scope.notes = res;
      console.log($scope.notes);
    
    });
  };

});
