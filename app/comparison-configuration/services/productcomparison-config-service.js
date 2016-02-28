'use strict';

angular.module('epam.prodcomparison.builder')
    .factory('ProductComparisonConfigSvc', ['ProductComparisonRest', function (ProductComparisonRest) {
        return {
            getCurrentConfigValue: function (configId) {
                return ProductComparisonRest.comparison
                    .one('configs', configId)
                    .get();
            },

            postNewConfigValue: function (configId, newConfigValue) {
                return ProductComparisonRest.comparison
                    .all("configs/" + configId)
                    .post({
                        "config_id": configId,
                        "config_value": newConfigValue
                    });
            }
        };
    }]);