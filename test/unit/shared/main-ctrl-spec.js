/**
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2014 hybris AG
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of hybris
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with hybris.
 */

describe('MainCtrl Test', function () {

    var $scope, $rootScope, $controller, $injector;

    //***********************************************************************
    // Common Setup
    // - shared setup between constructor validation and method validation
    //***********************************************************************

    // configure the target controller's module for testing - see angular.mock
    beforeEach(angular.mock.module('ds.shared'));

    beforeEach(inject(function(_$rootScope_, _$controller_, _$injector_) {

        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
        $rootScope =  _$rootScope_;
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        $injector = _$injector_;
    }));

    describe('MainCtrl', function () {
        var navCtrl;

        beforeEach(function () {

            navCtrl = $controller('MainCtrl', {$scope: $scope});
        });

        it('should update scope showCart on cart.toggle event', function(){
            $scope.$emit('cart.toggle', true);
            expect($scope.showCart).toEqualData(true);
            $scope.$emit('cart.toggle', false);
            expect($scope.showCart).toEqualData(false);
        });
    });



});

