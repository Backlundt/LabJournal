foo = ""
var note = angular.module('LabJournal', [
'ngRoute',
'ngSanitize',
'ng-showdown'
//'katex'
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
note.config(['$showdownProvider', function($showdownProvider) {
  showdown.extension("renderKatex", function() {
    'use strict';
    return [
  {
    type: 'lang',
    filter: function(text, converter, options) {
      var mainRegex = new RegExp("(^[ \t]*:>[ \t]?.+\n(.+\n)*\n*)+", "gm");
      text = text.replace(mainRegex, function(match, content) {
        content = content.replace(/^([ \t]*):>([ \t])?/gm, "");
        console.log(content)
        foo = converter.makeHtml(content);
        console.log(foo)


        return "<p>"+katex.renderToString(foo.substr(3,foo.length-7))+"</p>";
      });
      return text;
    }
  }
  ]
  });
  $showdownProvider.setOption("tables",true);
 $showdownProvider.loadExtension("renderKatex");
  //$showdownProvider.Converter({extensions:"katex-latex"});
}]);

note.controller('noteController',function noteController($scope,$showdown,$http,$location) {
  //$window.katex = {};
  //$window.katex.config = {
        //displayMode: true,
      //throwOnError: false, //allows katex to fail silently
      //errorColor: '#00c2c9'
  //};


  $scope.notes = [];
  $scope.note = {};
  $scope.note.text = "";
  $scope.note.project = "";
  $scope.displayedProject = "";
  $scope.renderMarkdown = true;
  $scope.update = function(note) {
    console.log(note);
    $http({
      method: "post",
      url: "/saveNote",
      data: note
    })
    .success(function(err,res){

      $scope.newNote = {}
      $scope.newNote.text = note.text; 
      $scope.notes.push($scope.newNote);
      $scope.note.text = "";
    
      console.log(note.text);
    });
  };

  
  $scope.loadProject = function(p) {

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

  var url = $location.url();
  var project = url.substr(1,url.length);
  $scope.note.project = project;
  console.log(project)
  $scope.loadProject(project);
});
