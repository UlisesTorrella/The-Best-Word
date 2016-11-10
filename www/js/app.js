
angular.module('BestWord', ['ngMaterial'])
.controller('MainController', function($scope, $window) {
  /*
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    $scope.user = result.user;
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
  */
  $scope.user = $window.localStorage.bestworduser;
  var word = firebase.database().ref('/');
  word.on('child_changed', function(data) {
    updateWord();
  });
  updateWord();
  function updateWord(){
    firebase.database().ref('/').once('value').then(function(response) {
      $scope.$apply(function () {
          $scope.bestword = response.val();
      });

    });
  }
  $scope.submit = function (){
    $window.localStorage.bestworduser = $scope.user;
    var updates = {};
    updates['/word'] = $scope.suggestion;
    updates['/author'] = $scope.user;
    return firebase.database().ref().update(updates).then(function(err) {
      console.log("volvi");
    });
  };

  $scope.upvote = function (){
    $window.localStorage.bestworduser = $scope.user;
    var updates = {};
    updates['/score'] = $scope.bestword.score + 1;
    return firebase.database().ref('/').update(updates);

  };
  $scope.downvote = function (){
    var updates = {};
    updates['/score'] = $scope.bestword.score - 1;
    return firebase.database().ref('/').update(updates);
  };
});
