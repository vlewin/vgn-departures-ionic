angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("tab-departures.html","<ion-view view-title=\"VGN Departures\">\n\n  <ion-content>\n    <div class=\"item item-input-inset\">\n      <label class=\"item-input-wrapper\">\n        <i class=\"icon ion-ios-search placeholder-icon\"></i>\n        <input id=\"search\" type=\"search\" placeholder=\"Search\" ng-change=\"search()\" ng-focus=\"scrollTop()\" ng-value=\"station.id\" ng-model=\"station.name\">\n\n        <form name=\"search_form\" ng-submit=\"clearSearch()\">\n          <button class=\"button button-small button-clear\" ng-click=\"clearSearch()\">\n            <i class=\"icon ion-android-cancel\"></i>\n          </button>\n        </form>\n\n      </label>\n\n      <button class=\"button button-clear no-margin\" ng-class=\"{energized: favorite}\" ng-click=\"favorite ? removeFavorite(station) : addFavorite(station)\">\n        <i class=\"icon ion-star\" ng-class=\"{energized: favorite}\"></i>\n      </button>\n    </div>\n\n\n    <ul class=\"tags\" ng-if=\"tags.length > 0\">\n      <li>Filters:</li>\n    	<li ng-repeat=\"tag in tags track by $index\" ng-click=\"removeTag(tag)\">\n        <a href=\"#\">{{tag.name}}\n          <i class=\"icon ion-close-circled\"></i>\n        </a>\n      </li>\n    </ul>\n\n    <div class=\"list no-margin no-padding\" ng-if=\"suggestions\">\n      <li class=\"item\" ng-repeat=\"suggestion in suggestions\" ng-click=\"loadDepartures(suggestion)\">\n        {{suggestion.name}}\n      </li>\n    </div>\n\n    <div class=\"list no-margin no-padding\" ng-if=\"favorites\">\n      <li class=\"item\" ng-repeat=\"favorite in favorites\" ng-click=\"loadDepartures(favorite)\">\n        <i class= \"icon ion-star energized\"></i>\n        {{favorite.name}}\n      </li>\n    </div>\n\n    <div class=\"item item-divider\" ng-if=\"departures\">\n      {{ clock }} Departures\n    </div>\n\n    <div class=\"list\">\n      <li class=\"item item-avatar\" ng-repeat=\"departure in departures | limitTo:15\">\n        <span class=\"item-transport {{departure.transport}} {{departure.line}}\" ng-click=\"addTag({ type: \'line\', name: departure.line }); scrollTop()\">\n          {{departure.line}}\n        </span>\n        <h2>\n          <i class=\"icon ion-ios-navigate-outline dark\"></i>\n\n          <a href=\"#\" class=\"dark bold\" ng-click=\"addTag({ type: \'direction\', name: departure.direction}); scrollTop()\">\n            {{ departure.direction }}\n          </a>\n        </h2>\n        <p>\n          <i class=\"icon ion-clock \" ng-class=\"{ assertive: departure.delay != 0}\"></i>\n          {{ departure.time() }}\n          <span ng-if=\"departure.delay != 0\">({{ departure.delay }})</span>\n        </p>\n        <span class=\"badge badge-assertive no-bold\">{{ departure.time_left() }}</span>\n      </li>\n    </div>\n\n  </ion-content>\n</ion-view>\n");
$templateCache.put("tab-favorites.html","<ion-view view-title=\"Favorites\">\n  <ion-nav-buttons side=\"left\">\n    <button class=\"button button-clear\" ng-if=\"editMode\" ng-click=\"deleteAll()\">\n      Delete all\n    </button>\n  </ion-nav-buttons>\n\n  <ion-nav-buttons side=\"right\">\n    <button class=\"button button-clear\" ng-if=\"favorites.length !== 0\" ng-click=\"edit()\">\n      <i class=\"icon ion-ios-compose-outline\"></i>\n    </button>\n  </ion-nav-buttons>\n\n  <ion-content class=\"has-header\">\n    <ion-list show-delete=\"editMode\" can-swipe=\"true\">\n      <ion-item class=\"item-icon-left item-text-wrap\" ng-if=\"favorites.length == 0\">\n        <i class=\"icon ion-ios-information-outline\"></i>\n        No favorites found\n        <p>In order to add a Favorite, press \'star\' icon to the right of search field</p>\n      </ion-item>\n\n      <ion-item ng-repeat=\"favorite in favorites\" class=\"item-icon-left\" ng-click=\"go(favorite)\">\n        <i class= \"icon ion-star energized\"></i>\n        {{favorite.name}}\n        <ion-option-button class=\"button-assertive\" ng-click=\"delete(favorite)\">Delete</ion-option-button>\n        <ion-delete-button class=\"ion-minus-circled\" ng-click=\"delete(favorite)\"></ion-delete-button>\n      </ion-item>\n\n    </ion-list>\n  </ion-content>\n\n</ion-view>\n");
$templateCache.put("tab-info.html","<ion-view view-title=\"Info\">\n  <ion-content class=\"padding-horizontal\">\n\n    <ion-list class=\"list list-inset\">\n      <ion-item class = \"item-image padding stable-bg\">\n        <img src=\"img/qrcode.png\" style=\"width: 55%; height: 55%\">\n      </ion-item>\n\n      <ion-item class = \"item-icon-left item-text-wrap\">\n        <i class=\"icon ion-ionic positive\"></i>\n        <h2>Built with Awesome and Powerful Ionic Framework</h2>\n        <a class=\"dark\" href=\"http://ionicframework.com\" target=\"_blank\">http://ionicframework.com</a>\n      </ion-item>\n\n      <ion-item class=\"item-icon-left item-divider\">\n        <i class= \"icon ion-social-rss-outline\"></i>\n        Share with Friends\n      </ion-item>\n      <ion-item class=\"item-icon-left\" class=\"positive\" href=\"https://twitter.com/intent/tweet?status=VGN Departures web app (http://vgn.herokuapp.com) - built with Awesome and Powerful Ionic Framework!\" target=\"_blank\">\n        <i class=\"icon ion-social-twitter positive\"></i>\n        <a>Tweet</a>\n      </ion-item>\n\n      <ion-item class=\"item-icon-left item-divider\">\n        <i class= \"icon ion-ios-help-outline\"></i>\n        Need Help?\n      </ion-item>\n      <ion-item class=\"item-icon-left item-text-wrap\" ng-click=\"help()\">\n        <i class= \"icon ion-ios-upload-outline positive\"></i>\n        Show me how to pin a webapp to the home screen (supported OS: iOS >= 6, Android >= 4)\n      </ion-item>\n    </ion-list>\n\n  </ion-content>\n</ion-view>\n");
$templateCache.put("tab-settings.html","<ion-view view-title=\"Settings\">\n  <ion-content class=\"has-header\">\n\n    <div class=\"list list-inset\">\n      <div class=\"item item-divider\">\n        Application settings\n      </div>\n      <label class=\"item item-input\">\n        <span class=\"input-label\">\n          <i class= \"icon ion-link placeholder-icon\"></i>\n          API server\n        </span>\n\n        <input type=\"text\" placeholder=\"http://example.com\" ng-model=\"$parent.api_url\">\n      </label>\n    </div>\n\n    <div class=\"padding\">\n      <button class=\"button button-block button-balanced\" ng-click=\"save()\">Save</button>\n    </div>\n\n  </ion-content>\n</ion-view>\n");
$templateCache.put("tabs.html","<ion-tabs class=\"tabs-icon-top tabs-color-active-positive\">\n\n  <!-- Departures Tab -->\n  <ion-tab title=\"Departures\" icon-off=\"ion-ios-list-outline\" icon-on=\"ion-ios-list\" href=\"#/tab/departures\">\n    <ion-nav-view name=\"tab-departures\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Settings Tab -->\n  <ion-tab title=\"Favorites\" icon-off=\"ion-ios-star-outline\" icon-on=\"ion-ios-star\" href=\"#/tab/favorites\">\n    <ion-nav-view name=\"tab-favorites\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Info Tab -->\n  <ion-tab title=\"Info\" icon-off=\"ion-ios-information-outline\" icon-on=\"ion-ios-information\" href=\"#/tab/info\">\n    <ion-nav-view name=\"tab-info\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Settings Tab -->\n<!--   <ion-tab title=\"Settings\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" href=\"#/tab/settings\">\n    <ion-nav-view name=\"tab-settings\"></ion-nav-view>\n  </ion-tab>\n -->\n</ion-tabs>\n");}]);