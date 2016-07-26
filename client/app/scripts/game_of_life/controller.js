'use strict';

angular.module('Game_of_life')
.controller('game_of_life', function ($scope) {

  $scope.controller_loaded = 'Game of life loaded!';

  $scope.matrix = null;

  var automaticComputeProcess;

  $scope.initBiDimensionalGrid = function(gridSize) {
    var dimensionalGrid = [];
  	for(var row = 0 ; row < gridSize.row ; row++) {
  	  var colGrid = []; 
  	  for(var col = 0 ; col < gridSize.col ; col++) {
  	    colGrid.push('.');
  	  }
  	  dimensionalGrid.push(colGrid);
  	}
  	return dimensionalGrid;
  };

  $scope.initStateOnGrid = function(dimensionalGrid, gridInitialized) {
  	gridInitialized.forEach(function(item) {
  	  dimensionalGrid[item.row][item.col] = '*';
  	});
  	$scope.matrix = dimensionalGrid;
  	return dimensionalGrid;
  };

  $scope.computeNextState = function(dimensionalGrid) {
  	var previousState = dimensionalGrid.map(function(grid) {
  		return grid.slice();
  	});
  	previousState.forEach(function(grid, indexRow){
  	  grid.forEach(function(column, indexCol){
        var validation = $scope.validateNeighbors(previousState, { row : indexRow, col : indexCol } );
  		  if(validation === true) {
  		    dimensionalGrid[indexRow][indexCol] = '*';
  		  } else if(validation === false) {
          dimensionalGrid[indexRow][indexCol] = '.';
        }
  	  });
  	});
  	return dimensionalGrid;
  };

  $scope.validateNeighbors = function(dimensionalGrid, gridPosition){
  	var count = 0;
    var sizeRow = dimensionalGrid.length ;
    var sizeCol = 0;
    if(sizeRow > 0){
      sizeCol = dimensionalGrid[0].length;
    }
  	for(var row = (gridPosition.row - 1) ; row < (gridPosition.row + 2) ; row++) {
  	  for(var col = (gridPosition.col - 1) ; col < (gridPosition.col + 2) ; col++) {
        if((row >= 0 && row < sizeRow) && (col >= 0 && col < sizeCol)){
  		    if(row !== gridPosition.row || col !== gridPosition.col) {
            if(dimensionalGrid[row][col] === '*') {
  		        count++;	
    		  	}
    		  }
        }
  	  }
  	}
    if(count < 2) { return false; }
    if(count > 3) { return false; }
    if(count === 3) { return true; }
  	if(count === 2) { return 2; }
  };

  $scope.initPatterns = function(option) {
    var matrix;
    var initState;
    switch(option) {
      case 0:
        matrix = $scope.initBiDimensionalGrid({ row: 4, col: 8 });
        initState = [
          {row: 1, col: 4},
          {row: 2, col: 3},
          {row: 2, col: 4} ];
        break;
      case 1:
        matrix = $scope.initBiDimensionalGrid({ row: 5, col: 5 });
        initState = [
          {row: 1, col: 2},
          {row: 2, col: 2},
          {row: 3, col: 2} ];
        break;
      case 2:
        matrix = $scope.initBiDimensionalGrid({ row: 6, col: 6 });
        initState = [
          {row: 2, col: 2},
          {row: 2, col: 3},
          {row: 2, col: 4},
          {row: 3, col: 1},
          {row: 3, col: 2},
          {row: 3, col: 3} ];
        break;
      case 3:
        matrix = $scope.initBiDimensionalGrid({ row: 6, col: 6 });
        initState = [
          {row: 1, col: 1},
          {row: 1, col: 2},
          {row: 2, col: 1},
          {row: 2, col: 2},
          {row: 3, col: 3},
          {row: 3, col: 4},
          {row: 4, col: 3},
          {row: 4, col: 4} ];
        break;
      case 4:
        matrix = $scope.initBiDimensionalGrid({ row: 17, col: 17 });
        initState = [
          {row: 2, col: 4},
          {row: 2, col: 5},
          {row: 2, col: 6},
          {row: 2, col: 10},
          {row: 2, col: 11},
          {row: 2, col: 12},

          {row: 4, col: 2},
          {row: 4, col: 7},
          {row: 4, col: 9},
          {row: 4, col: 14},

          {row: 5, col: 2},
          {row: 5, col: 7},
          {row: 5, col: 9},
          {row: 5, col: 14},

          {row: 6, col: 2},
          {row: 6, col: 7},
          {row: 6, col: 9},
          {row: 6, col: 14},

          {row: 7, col: 4},
          {row: 7, col: 5},
          {row: 7, col: 6},
          {row: 7, col: 10},
          {row: 7, col: 11},
          {row: 7, col: 12},

          {row: 9, col: 4},
          {row: 9, col: 5},
          {row: 9, col: 6},
          {row: 9, col: 10},
          {row: 9, col: 11},
          {row: 9, col: 12},

          {row: 10, col: 2},
          {row: 10, col: 7},
          {row: 10, col: 9},
          {row: 10, col: 14},

          {row: 11, col: 2},
          {row: 11, col: 7},
          {row: 11, col: 9},
          {row: 11, col: 14},

          {row: 12, col: 2},
          {row: 12, col: 7},
          {row: 12, col: 9},
          {row: 12, col: 14},

          {row: 14, col: 4},
          {row: 14, col: 5},
          {row: 14, col: 6},
          {row: 14, col: 10},
          {row: 14, col: 11},
          {row: 14, col: 12} ];
        break;
      case 5:
        matrix = $scope.initBiDimensionalGrid({ row: 18, col: 11 });
        initState = [
          {row: 1, col: 5},
          {row: 2, col: 5},
          {row: 4, col: 5},
          {row: 5, col: 4},
          {row: 5, col: 6},
          {row: 7, col: 4},
          {row: 7, col: 5},
          {row: 7, col: 6},
          {row: 10, col: 4},
          {row: 10, col: 5},
          {row: 10, col: 6},
          {row: 12, col: 4},
          {row: 12, col: 6},
          {row: 13, col: 5},
          {row: 15, col: 5},
          {row: 16, col: 5} ];
        break;
      case 6:
        matrix = $scope.initBiDimensionalGrid({ row: 20, col: 20 });
        initState = [
          {row: 0, col: 0},
          {row: 1, col: 1},
          {row: 1, col: 2},
          {row: 2, col: 0},
          {row: 2, col: 1} ];
        break;
      case 7:
        matrix = $scope.initBiDimensionalGrid({ row: 20, col: 20 });
        initState = [ ];
        break;
      case 8:
        matrix = $scope.initBiDimensionalGrid({ row: 80, col: 75 });
        initState = [
          {row: 0, col: 24},

          {row: 1, col: 22},
          {row: 1, col: 24},

          {row: 2, col: 12},
          {row: 2, col: 13},
          {row: 2, col: 20},
          {row: 2, col: 21},
          {row: 2, col: 34},
          {row: 2, col: 35},

          {row: 3, col: 11},
          {row: 3, col: 15},
          {row: 3, col: 20},
          {row: 3, col: 21},
          {row: 3, col: 34},
          {row: 3, col: 35},

          {row: 4, col: 0},
          {row: 4, col: 1},
          {row: 4, col: 10},
          {row: 4, col: 16},
          {row: 4, col: 20},
          {row: 4, col: 21},

          {row: 5, col: 0},
          {row: 5, col: 1},
          {row: 5, col: 10},
          {row: 5, col: 14},
          {row: 5, col: 16},
          {row: 5, col: 17},
          {row: 5, col: 22},
          {row: 5, col: 24},

          {row: 6, col: 10},
          {row: 6, col: 16},
          {row: 6, col: 24},

          {row: 7, col: 11},
          {row: 7, col: 15},

          {row: 8, col: 12},
          {row: 8, col: 13} ];
        break;
    }
    $scope.initStateOnGrid(matrix, initState);
  };

  $scope.nextGeneration = function() {
    $scope.matrix = $scope.computeNextState($scope.matrix);
  };

  
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/game_of_life', {
    templateUrl: 'scripts/game_of_life/views/game_of_life.html',
    controller: 'game_of_life'
  });
});
