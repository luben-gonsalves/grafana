define([
  'angular',
  'jquery',
  'services/all'
],
function(angular, $) {
  "use strict";

  var module = angular.module('grafana.services');

  module.service('dashboardKeybindings', function($rootScope, keyboardManager) {

    this.shortcuts = function(scope) {

      scope.$on('$destroy', function() {
        keyboardManager.unbind('ctrl+f');
        keyboardManager.unbind('ctrl+h');
        keyboardManager.unbind('ctrl+s');
        keyboardManager.unbind('ctrl+r');
        keyboardManager.unbind('ctrl+z');
        keyboardManager.unbind('ctrl+o');
        keyboardManager.unbind('esc');
      });

      keyboardManager.bind('ctrl+f', function() {
        scope.appEvent('show-dash-editor', { src: 'app/partials/search.html' });
      }, { inputDisabled: true });

      keyboardManager.bind('ctrl+o', function() {
        var current = scope.dashboard.sharedCrosshair;
        scope.dashboard.sharedCrosshair = !current;
      }, { inputDisabled: true });

      keyboardManager.bind('ctrl+h', function() {
        var current = scope.dashboard.hideControls;
        scope.dashboard.hideControls = !current;
      }, { inputDisabled: true });

      keyboardManager.bind('ctrl+s', function(evt) {
        scope.appEvent('save-dashboard', evt);
      }, { inputDisabled: true });

      keyboardManager.bind('ctrl+r', function() {
        scope.dashboard.emit_refresh();
      }, { inputDisabled: true });

      keyboardManager.bind('ctrl+z', function(evt) {
        scope.appEvent('zoom-out', evt);
      }, { inputDisabled: true });

      keyboardManager.bind('esc', function() {
        var popups = $('.popover.in');
        if (popups.length > 0) {
          return;
        }
        // close modals
        var modalData = $(".modal").data();
        if (modalData && modalData.$scope && modalData.$scope.dismiss) {
          modalData.$scope.dismiss();
        }

        scope.appEvent('hide-dash-editor');

        scope.exitFullscreen();
      }, { inputDisabled: true });
    };
  });
});
