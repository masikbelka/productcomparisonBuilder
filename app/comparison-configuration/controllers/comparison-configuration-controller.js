'use strict';

angular.module('epam.prodcomparison.builder').controller(
    'ComparisonConfigurationController',
    [
        '$scope',
        'ProductComparisonConfigSvc',
        '$q',
        function ($scope, configSvc,$q) {

            $scope.saveButtonEnabled = false;
            $scope.spinerEnabled = false;

            $scope.sortingOptions = [
                {title: "Common to the top", code: "commonTop"},
                {title: "Common to the dow", code: "commonDown"},
                {title: "Alphabetical(A-Z)", code: "a-z"},
                {title: "Alphabetical(Z-A)", code: "z-a"}];


            configSvc.getCurrentConfigValue("max_products_number").then(function (maxComparisonConfig) {
                $scope.maxInComparison = maxComparisonConfig.config_value;
                $scope.old_maxInComparison = maxComparisonConfig.config_value;
            }, function () {
                $scope.maxInComparison = "1";
                $scope.old_maxInComparison = "1";
            });
            configSvc.getCurrentConfigValue("default_sorting").then(function (defaultSorting) {
                $scope.defaultSorting = defaultSorting.config_value;
                $scope.old_defaultSorting = defaultSorting.config_value;
            }, function () {
                $scope.defaultSorting = "a-z";
                $scope.old_defaultSorting = "a-z";
            });

            $scope.change = function (configId) {
                var newValue = $scope[configId];
                var oldValue = $scope['old_' + configId];
                if (oldValue !== newValue) {
                    $scope.saveButtonEnabled = 'true';
                }
            }

            $scope.goBack = function(){
                history.back();
            }

            $scope.cancel = function () {
                $scope.maxInComparison = $scope.old_maxInComparison;
                $scope.defaultSorting = $scope.old_defaultSorting;
                $scope.saveButtonEnabled = false;
            }

            $scope.save = function () {
                $scope.spinerEnabled = true;
                var future1 = configSvc.postNewConfigValue('max_products_number', $scope.maxInComparison);
                var future2 = configSvc.postNewConfigValue('default_sorting', $scope.defaultSorting);

                $q.all([future1, future2]).then(function () {
                    $scope.saveButtonEnabled = false;
                    $scope.spinerEnabled = false;
                });
            }

        }]);
