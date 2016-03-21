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
            $scope.groupByGeneral = true;
            $scope.groupBySave = true;
            $scope.groupByDisplay = true;

            $scope.sortingOptions = [
                {title: "Common to top", code: "commonTop"},
                {title: "Common to bottom", code: "commonDown"},
                {title: "Alphabetical(A-Z)", code: "a-z"},
                {title: "Alphabetical(Z-A)", code: "z-a"}];

            $scope.expirationTimeOptions = [
                {title: "15 min", code: "15"},
                {title: "30 min", code: "30"},
                {title: "1 hour", code: "60"},
                {title: "1 day",  code: "1440"}
            ];

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
            configSvc.getCurrentConfigValue("hide_empty_attributes").then(function (config) {
                $scope.hideEmpty = config.config_value;
                $scope.old_hideEmpty = config.config_value;
            }, function () {
                $scope.hideEmpty = true;
                $scope.old_hideEmpty = true;
            });
            configSvc.getCurrentConfigValue("hide_equal_attributes").then(function (config) {
                $scope.hideEqual = config.config_value;
                $scope.old_hideEqual = config.config_value;
            }, function () {
                $scope.hideEqual = false;
                $scope.old_hideEqual = false;
            });
            configSvc.getCurrentConfigValue("ttl_anonymous_comparisons").then(function (config) {
                $scope.ttlAnonymous = config.config_value;
                $scope.old_ttlAnonymous = config.config_value;
            }, function () {
                $scope.ttlAnonymous = "15";
                $scope.old_ttlAnonymous = "15";
            });
            configSvc.getCurrentConfigValue("ttl_logged_comparisons").then(function (config) {
                $scope.ttlLogged = config.config_value;
                $scope.old_ttlLogged = config.config_value;
            }, function () {
                $scope.ttlLogged = "15";
                $scope.old_ttlLogged = "15";
            });
            configSvc.getCurrentConfigValue("persist_logged_users_comparisons").then(function (config) {
                $scope.persistLogged = config.config_value;
                $scope.old_persistLogged = config.config_value;
            }, function () {
                $scope.persistLogged = false;
                $scope.old_persistLogged = false;
            });

            $scope.change = function (configId) {
                var newValue = $scope[configId];
                var oldValue = $scope['old_' + configId];
                if (oldValue !== newValue) {
                    $scope.saveButtonEnabled = true;
                }
            }

            $scope.goBack = function(){
                history.back();
            }

            $scope.cancel = function () {
                $scope.maxInComparison = $scope.old_maxInComparison;
                $scope.defaultSorting = $scope.old_defaultSorting;
                $scope.hideEmpty = $scope.old_hideEmpty;
                $scope.hideEqual = $scope.old_hideEqual;
                $scope.ttlAnonymous = $scope.old_ttlAnonymous;
                $scope.ttlLogged = $scope.old_ttlLogged;
                $scope.persistLogged = $scope.old_persistLogged;
                $scope.saveButtonEnabled = false;
            }

            $scope.save = function () {
                $scope.spinerEnabled = true;
                var future1 = configSvc.postNewConfigValue('max_products_number', $scope.maxInComparison);
                var future2 = configSvc.postNewConfigValue('default_sorting', $scope.defaultSorting);
                var future3 = configSvc.postNewConfigValue('hide_empty_attributes', $scope.hideEmpty);
                var future4 = configSvc.postNewConfigValue('hide_equal_attributes', $scope.hideEqual);
                var future5 = configSvc.postNewConfigValue('ttl_anonymous_comparisons', $scope.ttlAnonymous);
                var future6 = configSvc.postNewConfigValue('ttl_logged_comparisons', $scope.ttlLogged);
                var future7 = configSvc.postNewConfigValue('persist_logged_users_comparisons', $scope.persistLogged);
                $q.all([future1, future2, future3, future4, future5, future6, future7]).then(function () {
                    $scope.saveButtonEnabled = false;
                    $scope.spinerEnabled = false;
                });
            }

        }]);
