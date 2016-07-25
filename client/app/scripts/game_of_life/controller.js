'use strict';

angular.module('Game_of_life')
.controller('game_of_life', function ($scope) {

  $scope.controller_loaded = 'Game of life loaded!';

  $scope.matrix = null;

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
  	    //if(column === '*'){
  		  if($scope.validateNeighbors(previousState, { row : indexRow, col : indexCol } )){
  		    dimensionalGrid[indexRow][indexCol] = '*';
  		  }
   		//}
   		/*if(column === '.'){
  		  if($scope.validateNeighbors(previousState, { row : indexRow, col : indexCol } )){
  			dimensionalGrid[indexRow][indexCol] = '*';
  		  }
   		}*/
  	  });
  	});
  	console.log('Inicial:');
  	previousState.forEach(function(item){
  	  console.log(item);
  	});
  	console.log('Proceso:');
  	dimensionalGrid.forEach(function(item){
  	  console.log(item);
  	});
  	//return dimensionalGrid;
  	return [ ['.','.','.','.','.','.','.','.'], ['.','.','.','*','*','.','.','.'], ['.','.','.','*','*','.','.','.'], ['.','.','.','.','.','.','.','.'] ];
  };

  $scope.validateNeighbors = function(dimensionalGrid, gridPosition){
  	var count = 0;
  	for(var row = (gridPosition.row - 1) ; row < (gridPosition.row + 2) ; row++) {
  	  for(var col = (gridPosition.col - 1) ; col < (gridPosition.col + 2) ; col++) {
  	  	if((row >= 0 && row <= 3) && (col >= 0 && col <= 7) ){
  		  if(row !== gridPosition.row && col !== gridPosition.col) {
  		  	if(dimensionalGrid[row][col] === '*') {
  		      count++;	
  		  	}
  		  }
  		}
  	  }
  	}
  	//console.log('POS ['+gridPosition.row+',' +gridPosition.col+']: ' + count + '('+countAux+')');
	if(count < 2 || count > 3) {
	  return false;
	}
  	return true;
  };

  $scope.initStateOnGrid($scope.initBiDimensionalGrid({ row: 4, col: 8 }), [ {row: 1, col: 4}, {row: 2, col: 3}, {row: 2, col: 4} ]);


  $scope.nextGeneration = function(){
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
