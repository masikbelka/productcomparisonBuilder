'use strict';

angular.module('epam.prodcomparison.builder').controller(
    'ComparisonConfigurationController',
    [
        '$scope',
        'ProductComparisonRest',
        function ($scope, ProductComparisonRest) {

            $scope.maxInComparisonConfig = {
                "config_id": "max_products_number",
                "config_value": "1"
            };

            $scope.defaultSortingStrategy = {
                "config_id": "default_sorting_strategy",
                "config_value": "a-z"
            };

            $scope.sortingOptions = [
                {title: "Common to the top", code: "commonTop"},
                {title: "Common to the dow", code: "commonDown"},
                {title: "Alphabetical(A-Z)", code: "a-z"},
                {title: "Alphabetical(Z-A)", code: "z-a"}];


            ProductComparisonRest.comparison
                .one('configs', "max_products_number")
                .get()
                .then(function (configFromServer) {
                    $scope.maxInComparisonConfig.config_value = configFromServer.config_value;
                }, function (response) {
                    console.log("Error with status code", response.status);
                    $scope.maxInComparisonConfig.config_value = 1;
                });

            ProductComparisonRest.comparison
                .one('configs', "default_sorting_strategy")
                .get()
                .then(function (configFromServer) {
                    $scope.defaultSortingStrategy.config_value = configFromServer.config_value;
                }, function (response) {
                    console.log("Error with status code", response.status);
                    $scope.defaultSortingStrategy.config_value = "a-z";
                });

            $scope.updateMaxProduct = function () {
                ProductComparisonRest.comparison
                    .all("configs/max_products_number")
                    .post($scope.maxInComparisonConfig)
                    .then(function (data) {
                        alert("Max in comparison config was successfully updated");
                    });
                }

            $scope.updateDefaultSortingStrategy = function(){
                ProductComparisonRest.comparison
                    .all("configs/default_sorting_strategy")
                    .post($scope.defaultSortingStrategy)
                    .then(function (data) {
                        alert("Default sorting strategy config was successfully updated");
                    });
            }

        }]);
