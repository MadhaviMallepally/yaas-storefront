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
'use strict';

angular.module('ds.auth')
    /**
     * Authorization Dialog Controller. 
     * Proxies calls to AuthCtrl and handles the lifecycle of authorization modal (destroying it when needed ...).
     */
    .controller('AuthModalDialogCtrl', ['$scope', '$modalInstance', '$controller', '$q', 'AuthSvc', '$location', 'settings', 'AuthDialogManager',
        function($scope, $modalInstance, $controller, $q, AuthSvc, $location, settings, AuthDialogManager) {
        
        $.extend(this, $controller('AuthCtrl', {$scope: $scope, AuthSvc: AuthSvc, $q: $q}));
        
        var oldSignup = $scope.signup;
        var oldSignin = $scope.signin;

        $scope.signup = function(authModel, signUpForm) {
          var signupPromise = oldSignup(authModel, signUpForm);
          signupPromise.then(function(response) {
              settings.hybrisUser = $scope.user.signup.email;
              $modalInstance.close(response);
            });
          return signupPromise;
        };

        $scope.signin = function(authModel, signinForm) {
          var signinPromise = oldSignin(authModel, signinForm);
          signinPromise.then(function(response) {
              settings.hybrisUser = $scope.user.signin.email;
              $modalInstance.close(response);
            });
          return signinPromise;
        };

        $scope.continueAsGuest = function() {
          $modalInstance.close();
        };


        $scope.showResetPassword = function() {
           AuthDialogManager.showResetPassword();
        };

        $scope.requestPasswordReset = function(email){
            AuthSvc.requestPasswordReset(email).then(function() {
                $modalInstance.close();
            }, function(failure){
                window.alert('Password reset failed: '+failure);
                $modalInstance.close();
            });

        };

    }]);