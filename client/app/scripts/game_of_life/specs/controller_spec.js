'use strict';
      
describe('Controller: game_of_life', function () {

  beforeEach(module('Game_of_life'));

  var controller;
  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('game_of_life', { $scope: scope });
  }));

  describe('On instance', function(){
    it('should set "controller_loaded" variable in scope', function() {
      expect(scope.controller_loaded).toContain('loaded');
    });

    it('should initialize the primary state', function(){

      var gridSize = { row: 4, col: 8 };
      var gridInitialized = [ {row: 1, col: 4}, {row: 2, col: 3}, {row: 2, col: 4} ];
      
      expect(scope.initBiDimensionalGrid(gridSize))
      .toEqual(
        [ ['.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.'] ]);
      
      expect(scope.initStateOnGrid(scope.initBiDimensionalGrid(gridSize),gridInitialized))
      .toEqual(
        [ ['.','.','.','.','.','.','.','.'],
          ['.','.','.','.','*','.','.','.'],
          ['.','.','.','*','*','.','.','.'],
          ['.','.','.','.','.','.','.','.'] ]);

    });

  });

  describe('On compute', function(){

    it('should compute the next state for the bi-dimensional grid', function(){

      var matrix = 
        [ ['.','.','.','.','.','.','.','.'],
          ['.','.','.','.','*','.','.','.'],
          ['.','.','.','*','*','.','.','.'],
          ['.','.','.','.','.','.','.','.'] ];

      expect(scope.computeNextState(matrix))
      .toEqual(
        [ ['.','.','.','.','.','.','.','.'],
          ['.','.','.','*','*','.','.','.'],
          ['.','.','.','*','*','.','.','.'],
          ['.','.','.','.','.','.','.','.'] ]);

      expect(scope.matrix).toBeDefined();
      expect(scope.validateNeighbors(matrix, { row : 0, col : 0 })).toBe(false);
      expect(scope.validateNeighbors(matrix, { row : 1, col : 1 })).toBe(false);
      expect(scope.validateNeighbors(matrix, { row : 1, col : 3 })).toBe(true);

    });

  });

  describe('when going to /game_of_life', function() {

    var route, location, rootScope, httpBackend;

    beforeEach(inject(function($route, $location, $rootScope, $httpBackend){
      route = $route;
      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/game_of_life/views/game_of_life.html').respond('<div></div>');
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should use game_of_life.html and controller', function() {
      expect(route.current).toBeUndefined();

      location.path('/game_of_life');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/game_of_life/views/game_of_life.html');
      expect(route.current.controller).toBe('game_of_life');
    });
  });

});
