angular.module('QBook', ['ngRoute'])

.config(function ($routeProvider) {
  // $routeProvider
  //   .when('/', {
  //     templateUrl: 'templates/auth.html',
  //     controller: 'loginCtrl',
  //   })
  //   .when('/login', {
  //     templateUrl: 'templates/auth.html',
  //     controller: 'loginCtrl',
  //   });
})

.service('dataService', function() {
    this.getBooks = function () {
        var qBook = {
          "name" : "Выбор Нео",
          "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas quisquam unde animi, architecto totam enim! Illo harum vel aut amet, officia reiciendis corrupti expedita beatae distinctio delectus, quia, porro? Ad.",
          "Глава первая" : {
            "text block 1" : {
              "text" : "Выбирай, Нео",
              "buttons" : {
                "0" : {
                  "value" : "Красная",
                  "link" : "text block 2"
                },
                "1" : {
                  "value" : "Синяя",
                  "link" : "text block 3"
                }
              }
            },
            "text block 2" : {
              "text" : "Ты выбрал красную. Это путь избранного.",
              "buttons" : {
                "0" : {
                  "value" : "Глава вторая",
                  "link" : "Глава вторая"
                },
              }
            },
            "text block 3" : {
              "text" : "Ты выбрал синюю. Не очень благородный выбор.",
              "buttons" : {
                "0" : {
                  "value" : "Подумать еще раз",
                  "link" : "text block 1"
                },
              }
            }
          },
          "Глава вторая" : {
            "text block" : {
              "text" : "Продолжение следует..."
            }
          }
        }
      return [qBook, {"name" : "Hello", "description" : "sdafsdf", "a" : {}}];
    }
})

.controller('QBookCtrl', function ($scope, dataService) {
	$scope.books = dataService.getBooks();
  $scope.currentBook = {};
  $scope.currentChapters = [];
  $scope.currentChapter = {};
  $scope.currentTextBlocks = [];
  $scope.currentTextBlock = {};

  $scope.setCurrentBook = function(book) {
    $scope.currentBook = book;
    $scope.currentBookName = book.name;
    $scope.currentDescription = book.description;
    $scope.currentChapters = [];

    for(key in $scope.currentBook) {
      if(key !== 'name' && key !== 'description') {
        $scope.currentChapters.push(key);
      }
    }

    $scope.currentChapterName = $scope.currentChapters[0];
    $scope.currentChapter = $scope.currentBook[$scope.currentChapterName];

    for(key in $scope.currentChapter) {
      $scope.currentTextBlocks.push(key);
    }

    $scope.currentTextBlock = $scope.currentChapter[$scope.currentTextBlocks[0]];
    $scope.currentText = $scope.currentTextBlock.text;
    $scope.currentButtons = $scope.currentTextBlock.buttons;
    popup.hide();
  }

  $scope.setCurrentChapter = function(chapter, chapterName) {
    $scope.currentChapter = chapter;
    $scope.currentChapterName = chapterName;

    $scope.currentTextBlocks = [];
    for(key in $scope.currentChapter) {
      $scope.currentTextBlocks.push(key);
    }

    $scope.currentTextBlock = $scope.currentChapter[$scope.currentTextBlocks[0]];
    $scope.currentText = $scope.currentTextBlock.text;
    $scope.currentButtons = $scope.currentTextBlock.buttons;
  }

  $scope.goToNextTextBlock = function(link) {
    if(!$scope.currentChapter[link]) {
      $scope.setCurrentChapter($scope.currentBook[link], link);
    } else {
      $scope.currentTextBlock = $scope.currentChapter[link];
      $scope.currentText = $scope.currentTextBlock.text;
      $scope.currentButtons = $scope.currentTextBlock.buttons;
    }
  }

  //$scope.setCurrentBook($scope.books[0]);
})
