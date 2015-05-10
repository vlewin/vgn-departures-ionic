/* Add to Homescreen v3.1.1 ~ (c) 2014 Matteo Spinelli ~ @license: http://cubiq.org/license */
(function(window,document){var _eventListener="addEventListener"in window;var _DOMReady=false;if(document.readyState==="complete"){_DOMReady=true}else if(_eventListener){window.addEventListener("load",loaded,false)}function loaded(){window.removeEventListener("load",loaded,false);_DOMReady=true}var _reSmartURL=/\/ath(\/)?$/;var _reQueryString=/([\?&]ath=[^&]*$|&ath=[^&]*(&))/;var _instance;function ath(options){_instance=_instance||new ath.Class(options);return _instance}ath.intl={de_de:{ios:"Um diese Web-App zum Home-Bildschirm hinzuzufügen, tippen Sie auf %icon und dann <strong>Zum Home-Bildschirm</strong>.",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'},en_us:{ios:"To add this web app to the home screen: tap %icon and then <strong>Add to Home Screen</strong>.",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'},es_es:{ios:"Para añadir esta aplicación web a la pantalla de inicio: pulsa %icon y selecciona <strong>Añadir a pantalla de inicio</strong>.",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'},fr_fr:{ios:"Pour ajouter cette application web sur l'écran d'accueil : Appuyez %icon et sélectionnez <strong>Ajouter sur l'écran d'accueil</strong>.",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'},he_il:{ios:'<span dir="rtl">להוספת האפליקציה למסך הבית: ללחוץ על %icon ואז <strong>הוסף למסך הבית</strong>.</span>',android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'},it_it:{ios:"Per aggiungere questa web app alla schermata iniziale: premi %icon e poi <strong>Aggiungi a Home</strong>.",android:'Per aggiungere questa web app alla schermata iniziale, apri il menu opzioni del browser e premi su <strong>Aggiungi alla homescreen</strong>. <small>Puoi accedere al menu premendo il pulsante hardware delle opzioni se la tua device ne ha uno, oppure premendo l\'icona <span class="ath-action-icon">icon</span> in alto a destra.</small>'},nb_no:{ios:"For å installere denne appen på hjem-skjermen: trykk på %icon og deretter <strong>Legg til på Hjem-skjerm</strong>.",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'},pt_br:{ios:"Para adicionar este app à tela de início: clique %icon e então <strong>Tela de início</strong>.",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'},pt_pt:{ios:"Para adicionar esta app ao ecrã principal: clique %icon e depois <strong>Ecrã principal</strong>.",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'},nl_nl:{ios:"Om deze webapp op je telefoon te installeren, klik op %icon en dan <strong>Zet in beginscherm</strong>.",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'},sv_se:{ios:"För att lägga till denna webbapplikation på hemskärmen: tryck på %icon och därefter <strong>Lägg till på hemskärmen</strong>.",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'},zh_cn:{ios:"如要把应用程式加至主屏幕,请点击%icon, 然后<strong>加至主屏幕</strong>",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'},zh_tw:{ios:"如要把應用程式加至主屏幕, 請點擊%icon, 然後<strong>加至主屏幕</strong>.",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'}};for(var lang in ath.intl){ath.intl[lang.substr(0,2)]=ath.intl[lang]}ath.defaults={appID:"org.cubiq.addtohome",fontSize:15,debug:false,modal:false,mandatory:false,autostart:true,skipFirstVisit:false,startDelay:1,lifespan:15,displayPace:1440,maxDisplayCount:0,icon:true,message:"",validLocation:[],onInit:null,onShow:null,onRemove:null,onAdd:null,onPrivate:null,privateModeOverride:false,detectHomescreen:false};var _ua=window.navigator.userAgent;var _nav=window.navigator;_extend(ath,{hasToken:document.location.hash=="#ath"||_reSmartURL.test(document.location.href)||_reQueryString.test(document.location.search),isRetina:window.devicePixelRatio&&window.devicePixelRatio>1,isIDevice:/iphone|ipod|ipad/i.test(_ua),isMobileChrome:_ua.indexOf("Android")>-1&&/Chrome\/[.0-9]*/.test(_ua),isMobileIE:_ua.indexOf("Windows Phone")>-1,language:_nav.language&&_nav.language.toLowerCase().replace("-","_")||""});ath.language=ath.language&&ath.language in ath.intl?ath.language:"en_us";ath.isMobileSafari=ath.isIDevice&&_ua.indexOf("Safari")>-1&&_ua.indexOf("CriOS")<0;ath.OS=ath.isIDevice?"ios":ath.isMobileChrome?"android":ath.isMobileIE?"windows":"unsupported";ath.OSVersion=_ua.match(/(OS|Android) (\d+[_\.]\d+)/);ath.OSVersion=ath.OSVersion&&ath.OSVersion[2]?+ath.OSVersion[2].replace("_","."):0;ath.isStandalone=window.navigator.standalone||ath.isMobileChrome&&screen.height-document.documentElement.clientHeight<40;ath.isTablet=ath.isMobileSafari&&_ua.indexOf("iPad")>-1||ath.isMobileChrome&&_ua.indexOf("Mobile")<0;ath.isCompatible=ath.isMobileSafari&&ath.OSVersion>=6||ath.isMobileChrome;var _defaultSession={lastDisplayTime:0,returningVisitor:false,displayCount:0,optedout:false,added:false};ath.removeSession=function(appID){try{localStorage.removeItem(appID||ath.defaults.appID)}catch(e){}};ath.Class=function(options){this.options=_extend({},ath.defaults);_extend(this.options,options);if(!_eventListener){return}this.options.mandatory=this.options.mandatory&&("standalone"in window.navigator||this.options.debug);this.options.modal=this.options.modal||this.options.mandatory;if(this.options.mandatory){this.options.startDelay=-.5}this.options.detectHomescreen=this.options.detectHomescreen===true?"hash":this.options.detectHomescreen;if(this.options.debug){ath.isCompatible=true;ath.OS=typeof this.options.debug=="string"?this.options.debug:ath.OS=="unsupported"?"android":ath.OS;ath.OSVersion=ath.OS=="ios"?"8":"4"}this.container=document.documentElement;this.session=localStorage.getItem(this.options.appID);this.session=this.session?JSON.parse(this.session):undefined;if(ath.hasToken&&(!ath.isCompatible||!this.session)){ath.hasToken=false;_removeToken()}if(!ath.isCompatible){return}this.session=this.session||_defaultSession;try{localStorage.setItem(this.options.appID,JSON.stringify(this.session));ath.hasLocalStorage=true}catch(e){ath.hasLocalStorage=false;if(this.options.onPrivate){this.options.onPrivate.call(this)}}var isValidLocation=!this.options.validLocation.length;for(var i=this.options.validLocation.length;i--;){if(this.options.validLocation[i].test(document.location.href)){isValidLocation=true;break}}if(localStorage.getItem("addToHome")){this.optOut()}if(this.session.optedout||this.session.added||!isValidLocation){return}if(ath.isStandalone){if(!this.session.added){this.session.added=true;this.updateSession();if(this.options.onAdd&&ath.hasLocalStorage){this.options.onAdd.call(this)}}return}if(this.options.detectHomescreen){if(ath.hasToken){_removeToken();if(!this.session.added){this.session.added=true;this.updateSession();if(this.options.onAdd&&ath.hasLocalStorage){this.options.onAdd.call(this)}}return}if(this.options.detectHomescreen=="hash"){history.replaceState("",window.document.title,document.location.href+"#ath")}else if(this.options.detectHomescreen=="smartURL"){history.replaceState("",window.document.title,document.location.href.replace(/(\/)?$/,"/ath$1"))}else{history.replaceState("",window.document.title,document.location.href+(document.location.search?"&":"?")+"ath=")}}if(!this.session.returningVisitor){this.session.returningVisitor=true;this.updateSession();if(this.options.skipFirstVisit){return}}if(!this.options.privateModeOverride&&!ath.hasLocalStorage){return}this.ready=true;if(this.options.onInit){this.options.onInit.call(this)}if(this.options.autostart){this.show()}};ath.Class.prototype={events:{load:"_delayedShow",error:"_delayedShow",orientationchange:"resize",resize:"resize",scroll:"resize",click:"remove",touchmove:"_preventDefault",transitionend:"_removeElements",webkitTransitionEnd:"_removeElements",MSTransitionEnd:"_removeElements"},handleEvent:function(e){var type=this.events[e.type];if(type){this[type](e)}},show:function(force){if(this.options.autostart&&!_DOMReady){setTimeout(this.show.bind(this),50);return}if(this.shown){return}var now=Date.now();var lastDisplayTime=this.session.lastDisplayTime;if(force!==true){if(!this.ready){return}if(now-lastDisplayTime<this.options.displayPace*6e4){return}if(this.options.maxDisplayCount&&this.session.displayCount>=this.options.maxDisplayCount){return}}this.shown=true;this.session.lastDisplayTime=now;this.session.displayCount++;this.updateSession();if(!this.applicationIcon){if(ath.OS=="ios"){this.applicationIcon=document.querySelector('head link[rel^=apple-touch-icon][sizes="152x152"],head link[rel^=apple-touch-icon][sizes="144x144"],head link[rel^=apple-touch-icon][sizes="120x120"],head link[rel^=apple-touch-icon][sizes="114x114"],head link[rel^=apple-touch-icon]')}else{this.applicationIcon=document.querySelector('head link[rel^="shortcut icon"][sizes="196x196"],head link[rel^=apple-touch-icon]')}}var message="";if(this.options.message in ath.intl){message=ath.intl[this.options.message][ath.OS]}else if(this.options.message!==""){message=this.options.message}else{message=ath.intl[ath.language][ath.OS]}message="<p>"+message.replace("%icon",'<span class="ath-action-icon">icon</span>')+"</p>";this.viewport=document.createElement("div");this.viewport.className="ath-viewport";if(this.options.modal){this.viewport.className+=" ath-modal"}if(this.options.mandatory){this.viewport.className+=" ath-mandatory"}this.viewport.style.position="absolute";this.element=document.createElement("div");this.element.className="ath-container ath-"+ath.OS+" ath-"+ath.OS+(ath.OSVersion+"").substr(0,1)+" ath-"+(ath.isTablet?"tablet":"phone");this.element.style.cssText="-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0s;-webkit-transition-timing-function:ease-out;transition-property:transform,opacity;transition-duration:0s;transition-timing-function:ease-out;";this.element.style.webkitTransform="translate3d(0,-"+window.innerHeight+"px,0)";this.element.style.transform="translate3d(0,-"+window.innerHeight+"px,0)";if(this.options.icon&&this.applicationIcon){this.element.className+=" ath-icon";this.img=document.createElement("img");this.img.className="ath-application-icon";this.img.addEventListener("load",this,false);this.img.addEventListener("error",this,false);this.img.src=this.applicationIcon.href;this.element.appendChild(this.img)}this.element.innerHTML+=message;this.viewport.style.left="-99999em";this.viewport.appendChild(this.element);this.container.appendChild(this.viewport);if(!this.img){this._delayedShow()}},_delayedShow:function(e){setTimeout(this._show.bind(this),this.options.startDelay*1e3+500)},_show:function(){var that=this;this.updateViewport();window.addEventListener("resize",this,false);window.addEventListener("scroll",this,false);window.addEventListener("orientationchange",this,false);if(this.options.modal){document.addEventListener("touchmove",this,true)}if(!this.options.mandatory){setTimeout(function(){that.element.addEventListener("click",that,true)},1e3)}setTimeout(function(){that.element.style.webkitTransitionDuration="1.2s";that.element.style.transitionDuration="1.2s";that.element.style.webkitTransform="translate3d(0,0,0)";that.element.style.transform="translate3d(0,0,0)"},0);if(this.options.lifespan){this.removeTimer=setTimeout(this.remove.bind(this),this.options.lifespan*1e3)}if(this.options.onShow){this.options.onShow.call(this)}},remove:function(){clearTimeout(this.removeTimer);if(this.img){this.img.removeEventListener("load",this,false);this.img.removeEventListener("error",this,false)}window.removeEventListener("resize",this,false);window.removeEventListener("scroll",this,false);window.removeEventListener("orientationchange",this,false);document.removeEventListener("touchmove",this,true);this.element.removeEventListener("click",this,true);this.element.addEventListener("transitionend",this,false);this.element.addEventListener("webkitTransitionEnd",this,false);this.element.addEventListener("MSTransitionEnd",this,false);this.element.style.webkitTransitionDuration="0.3s";this.element.style.opacity="0"},_removeElements:function(){this.element.removeEventListener("transitionend",this,false);this.element.removeEventListener("webkitTransitionEnd",this,false);this.element.removeEventListener("MSTransitionEnd",this,false);this.container.removeChild(this.viewport);this.shown=false;if(this.options.onRemove){this.options.onRemove.call(this)}},updateViewport:function(){if(!this.shown){return}this.viewport.style.width=window.innerWidth+"px";this.viewport.style.height=window.innerHeight+"px";this.viewport.style.left=window.scrollX+"px";this.viewport.style.top=window.scrollY+"px";var clientWidth=document.documentElement.clientWidth;this.orientation=clientWidth>document.documentElement.clientHeight?"landscape":"portrait";var screenWidth=ath.OS=="ios"?this.orientation=="portrait"?screen.width:screen.height:screen.width;this.scale=screen.width>clientWidth?1:screenWidth/window.innerWidth;this.element.style.fontSize=this.options.fontSize/this.scale+"px"},resize:function(){clearTimeout(this.resizeTimer);this.resizeTimer=setTimeout(this.updateViewport.bind(this),100)},updateSession:function(){if(ath.hasLocalStorage===false){return}localStorage.setItem(this.options.appID,JSON.stringify(this.session))},clearSession:function(){this.session=_defaultSession;this.updateSession()},optOut:function(){this.session.optedout=true;this.updateSession()},optIn:function(){this.session.optedout=false;this.updateSession()},clearDisplayCount:function(){this.session.displayCount=0;this.updateSession()},_preventDefault:function(e){e.preventDefault();e.stopPropagation()}};function _extend(target,obj){for(var i in obj){target[i]=obj[i]}return target}function _removeToken(){if(document.location.hash=="#ath"){history.replaceState("",window.document.title,document.location.href.split("#")[0])}if(_reSmartURL.test(document.location.href)){history.replaceState("",window.document.title,document.location.href.replace(_reSmartURL,"$1"))}if(_reQueryString.test(document.location.search)){history.replaceState("",window.document.title,document.location.href.replace(_reQueryString,"$2"))}}window.addToHomescreen=ath})(window,document);
angular.module('vgn', ['ionic', 'ngResource', 'templates', 'vgn.controllers', 'vgn.services', 'vgn.filters'])

.run(function($ionicPlatform, $rootScope, $localStorage, $ionicScrollDelegate) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  })

  $rootScope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true)
  };
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "tabs.html"
  })

  .state('tab.departures', {
    url: '/departures?id&name',
    views: {
      'tab-departures': {
        templateUrl: 'tab-departures.html',
        controller: 'DeparturesCtrl'
      }
    }
  })

  .state('tab.favorites', {
    cache: false,
    url: '/favorites',
    views: {
      'tab-favorites': {
        templateUrl: 'tab-favorites.html',
        controller: 'FavoritesCtrl'
      }
    }
  })

  .state('tab.info', {
    cache: false,
    url: '/info',
    views: {
      'tab-info': {
        templateUrl: 'tab-info.html',
        controller: 'InfoCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/departures');

});

angular.module('vgn.controllers', [])

.controller('DeparturesCtrl', function($scope, $resource, $filter, $state, $ionicLoading, Station, Departure, Favorite) {
  $scope.tags = [];
  $scope.departures_cache = null;
  $scope.favorites = Favorite.all();
  $scope.station = $state.params;

  $scope.updateClock = function() {
    $scope.time = $filter('date')(new Date(),'HH:mm');
  };
  
  $scope.initClock = function() {
    $scope.date = $filter('date')(new Date(),'dd.MM.yy');

    var timer = setInterval(function() {
      $scope.$apply($scope.updateClock);
    }, 1000);
  }

  $scope.search = function() {
    $scope.favorites = $scope.departures = null;

    if($scope.timeout) {
      clearTimeout($scope.timeout);
    }

    $scope.timeout = setTimeout(function() {
      Station.query({ station: $scope.station.name}, function(suggestions) {
        $scope.suggestions =  suggestions
      });
    }, 500);
  }

  $scope.clearSearch = function() {
    $scope.departures = $scope.favorite = null;
    $scope.station = {};
    $scope.tags = [];

    $scope.favorites = Favorite.all();
  }

  $scope.isFavorite = function(station) {
    $scope.favorite = Favorite.exist(station)
  }

  $scope.addFavorite = function(station) {
    Favorite.push(station);
    $scope.favorite = Favorite.exist(station)
  }

  $scope.removeFavorite = function(station) {
    $scope.favorite = null;
    Favorite.remove(station);
  }


  $scope.addTag = function(tag) {
    if(!_.findWhere($scope.tags, tag)) {
      $scope.tags.push(tag);
    }

    $scope.filter()
  }

  $scope.removeTag = function(tag) {
    $scope.tags = _.without($scope.tags, tag);

    $scope.filter()
  }

  $scope.filter = function() {
    $scope.departures = $scope.departures_cache;

    for(i in $scope.tags) {
      var tag = $scope.tags[i];
      var expression = {};

      expression[tag.type] = tag.name
      $scope.departures = $filter('filter')($scope.departures, expression);
    }
  }

  $scope.loadDepartures = function(station) {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner spinner-positive" icon="ripple"></ion-spinner>',
      hideOnStageChange: false
    });

    $scope.isFavorite(station);
    $scope.station = station;
    $scope.suggestions = $scope.favorites = null;

    // // TEST
    // var a = (new Date().getTime() + 2000);
    // var b = (new Date().getTime() + 5000);
    // var c = (new Date().getTime() + 305000);
    //
    // $scope.departures = [
    //   {
    //     "scheduled_time": a,
    //     "actial_time": a,
    //     "transport": "U-Bahn",
    //     "transport_long": "U-Bahn U1",
    //     "line": "U1",
    //     "direction": "Fürth",
    //     "delay": 0
    //   },
    //   {
    //     "scheduled_time": b,
    //     "actial_time": b,
    //     "transport": "S-Bahn",
    //     "transport_long": "S-Bahn S2",
    //     "line": "S2",
    //     "direction": "Röthenbach",
    //     "delay": 0
    //   },
    //   {
    //     "scheduled_time": c,
    //     "actial_time": c,
    //     "transport": "U-Bahn",
    //     "transport_long": "U-Bahn U2",
    //     "line": "U2",
    //     "direction": "Röthenbach",
    //     "delay": 0
    //   }
    // ]
    //
    // var d = []
    // for(i in $scope.departures) {
    //   d.push(new Departure($scope.departures[i]))
    // }
    //
    // $scope.departures_cache = $scope.departures = d;
    // $ionicLoading.hide();
    //
    //
    //   $scope.$watch('departures', function (newValue, oldValue, scope) {
    //    var valid = [];
    //    var now = new Date().getTime();
    //    console.log(newValue)
    //
    //    for(var i in newValue) {
    //      console.log(newValue[i].actial_time > now)
    //
    //
    //      if(newValue[i].actial_time > now) {
    //        valid.push(newValue[i]);
    //      }
    //
    //     $scope.departures = valid;
    //    }
    //   }, true);
    //
    // // END TEST

    Departure.query({ station: station.id, limit: 30 }, function(departures) {
      $scope.departures_cache = $scope.departures = departures;
      $ionicLoading.hide();
    });

    $scope.$watch('departures', function (newValue, oldValue, scope) {
     var valid = [];
     var now = new Date().getTime();

     for(var i in newValue) {
       if(newValue[i].actial_time > now) {
         valid.push(newValue[i]);
       }

      $scope.departures = valid;
     }
    }, true);
  };

  // for(var i in $scope.departures) {
  //   $scope.$watch($scope.departures[i].time_left(), function(t) {
  //     console.log(t.time_left())
  //   });
  // }

  // $scope.$watch('myVar', function() {
  //   alert('hey, myVar has changed!');
  // });

  $scope.initClock();

  if($scope.station.id) {
    $scope.loadDepartures($scope.station)
  }
  // $scope.loadDepartures({ id: 's:3000503'})
})

.controller('FavoritesCtrl', function($rootScope, $scope, $localStorage, $state, Favorite) {
  // $scope.favorites = [{name: "AAAA", id: 1}, {name: "BBBB", id: 2}]
  $scope.favorites = Favorite.all();
  $scope.editMode = false;

  $scope.go = function(station){
    $state.go('tab.departures', { id: station.id, name: station.name }, {reload: true});
  }

  $scope.edit = function() {
    if($scope.editMode) {
      $scope.editMode = false;
    } else {
      $scope.editMode = true;
    }
  }

  $scope.delete = function(favorite){
    $scope.favorites = Favorite.remove(favorite)
  }

  $scope.deleteAll = function(favorite){
    var favorites = Favorite.all();

    for(var i in favorites) {
      Favorite.remove(favorites[i])
    }

    $scope.editMode = false;
    $scope.favorites = Favorite.all()
  }
})

.controller('InfoCtrl', function($rootScope, $scope) {
  $scope.help = function(){
    console.log("Help")

    help_popup.show(true)
  }
})

.controller('SettingsCtrl', function($rootScope, $scope, $localStorage) {
  $scope.save = function() {
    $rootScope.api_url = $scope.api_url;
    $localStorage.set('api_url', $scope.api_url);
  }
});

var module = angular.module('vgn.services', [])

module.factory('$localStorage', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
});

var API = 'http://vgn.herokuapp.com'
module.factory('Station', function($rootScope, $resource) {
  return $resource(API + '/suggestions/:id');
})

module.factory('Departure', function($rootScope, $resource, $filter) {
  var Departure = $resource(API + '/departures/:id');
  function Departure(data) {
      for (attr in data) {
          if (data.hasOwnProperty(attr)) {
              this[attr] = data[attr];
          }
      }
      this.time = $filter('date')(new Date(this.scheduled_time),'HH:mm');
      this.expired = false;
      this.about_to_expire = false;
  }

  Departure.prototype.time = function() {
    return $filter('date')(new Date(this.scheduled_time),'HH:mm');
  };

  Departure.prototype.time_left = function () {
    var now = new Date().getTime()
    var soon = now + 300000;
    this.expired = this.actial_time < now
    this.about_to_expire = this.actial_time <= soon;
    return $filter('time')(this.actial_time)
  }

  return Departure;
})

module.factory('Favorite', function($rootScope, $resource, $localStorage) {
  function Favorite(data) {
      for (attr in data) {
          if (data.hasOwnProperty(attr)) {
              this[attr] = data[attr];
          }
      }
  }

  Favorite.exist = function(favorite) {
    if(favorite) {
      var f = _.find(this.all(), function(f){ return f.id == favorite.id})
      return f ? true : false
    } else {
      return false;
    }
  };

  Favorite.remove = function(favorite) {
    var favorites = this.all();

    favorites = _.reject(favorites, function(f){ return f.id == favorite.id });
    $localStorage.setObject('favorites', favorites)

    return favorites;
  };

  Favorite.push = function(favorite) {
    var favorites = this.all();

    if (_.isEmpty(favorite)) {
      return;
    } else {
      if(!_.find(favorites, function(f){ return f.id == favorite.id})) {
        favorites.push(favorite);
        $localStorage.setObject('favorites', favorites)
      }
    }

    return favorites;
  };

  Favorite.all = function() {
    var favorites = $localStorage.getObject('favorites')
    if(favorites.length) {
      return favorites;
    } else {
      return [];
    }
  };

  return Favorite;
})

var module = angular.module('vgn.filters', [])

module.filter('time', function() {
  return function(timestamp) {
    var departure_time = new Date(timestamp).getTime();
    var now = new Date().getTime();
    var secs = Math.round((departure_time-now)/1000);

    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    if(hours >= 0 && minutes >= 0 && seconds >= 0) {
      // hours = (hours < 10) ? '0' + hours : hours;
      minutes = (minutes < 10) ? '0' + minutes : minutes;
      seconds = (seconds < 10) ? '0' + seconds : seconds;
    } else {
      // hours = '00';
      minutes = '00';
      seconds = '00';
    }

    // return [hours, minutes, seconds].join(':');
    return [minutes, seconds].join(':');
  }
})

module.filter('expired', function () {
  return function(items, now) {
    var filtered = [];
    console.log(items[0].time())
    console.log(now)

    for (var i = 0; i < items.length; i++) {
      if(items[i].time() > now) {
        filtered.push(items[i])
      }
    }

    // for(var i in items) {
    //
    // }
    return filtered
  }
});

module.filter('minutes', function() {
  return function(timestamp) {
    var now = new Date().getTime() - 30000;
    var departure_time = new Date(timestamp).getTime();
    return Math.round((departure_time-now)/60000) + ' minute(s) left'
  }
});

angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("tab-departures.html","<ion-view view-title=\"VGN Departures\">\n\n  <ion-content>\n    <div class=\"item item-input-inset\">\n      <label class=\"item-input-wrapper\">\n        <i class=\"icon ion-ios-search placeholder-icon\"></i>\n        <input id=\"search\" type=\"search\" placeholder=\"Search\" ng-change=\"search()\" ng-focus=\"scrollTop()\" ng-value=\"station.id\" ng-model=\"station.name\">\n\n        <form name=\"search_form\" ng-submit=\"clearSearch()\">\n          <button class=\"button button-small button-clear\" ng-click=\"clearSearch()\">\n            <i class=\"icon ion-android-cancel\"></i>\n          </button>\n        </form>\n\n      </label>\n\n      <button class=\"button button-clear no-margin\" ng-class=\"{energized: favorite}\" ng-click=\"favorite ? removeFavorite(station) : addFavorite(station)\">\n        <i class=\"icon ion-star\" ng-class=\"{energized: favorite}\"></i>\n      </button>\n    </div>\n\n\n    <ul class=\"tags\" ng-if=\"tags.length > 0\">\n      <li>Filters:</li>\n    	<li ng-repeat=\"tag in tags track by $index\" ng-click=\"removeTag(tag)\">\n        <a href=\"#\">{{tag.name}}\n          <i class=\"icon ion-close-circled\"></i>\n        </a>\n      </li>\n    </ul>\n\n    <div class=\"list no-margin no-padding\" ng-if=\"suggestions\">\n      <li class=\"item\" ng-repeat=\"suggestion in suggestions\" ng-click=\"loadDepartures(suggestion)\">\n        {{suggestion.name}}\n      </li>\n    </div>\n\n    <div class=\"list no-margin no-padding\" ng-if=\"favorites\">\n      <li class=\"item\" ng-repeat=\"favorite in favorites\" ng-click=\"loadDepartures(favorite)\">\n        <i class= \"icon ion-star energized\"></i>\n        {{favorite.name}}\n      </li>\n    </div>\n\n    <div class=\"item item-divider no-padding\" ng-if=\"departures\">\n      <div class=\"row\">\n        <div class=\"col col-100\">\n          <ion-item class=\"item-icon-left\">\n            <i class=\"icon ion-ios-calendar\"></i>\n            {{ date }}\n            {{ time }}\n          </ion-item>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"list\">\n      <li class=\"item item-avatar\" ng-repeat=\"departure in departures | limitTo:15\">\n        <span class=\"item-transport {{departure.transport}} {{departure.line}}\" ng-click=\"addTag({ type: \'line\', name: departure.line }); scrollTop()\">\n          {{departure.line}}\n        </span>\n        <h2>\n          <i class=\"icon ion-ios-navigate-outline dark\"></i>\n\n          <a href=\"#\" class=\"dark bold\" ng-click=\"addTag({ type: \'direction\', name: departure.direction}); scrollTop()\">\n            {{ departure.direction }}\n          </a>\n        </h2>\n        <p>\n          <i class=\"icon ion-clock \" ng-class=\"{ assertive: departure.delay != 0}\"></i>\n          {{ departure.time() }}\n          <span ng-if=\"departure.delay != 0\">({{ departure.delay }})</span>\n        </p>\n        <span class=\"badge {{ departure.about_to_expire ? \'badge-assertive\' : \'badge-grey\' }}\">\n          {{ departure.time_left() }}\n        </span>\n      </li>\n    </div>\n\n  </ion-content>\n</ion-view>\n");
$templateCache.put("tab-favorites.html","<ion-view view-title=\"Favorites\">\n  <ion-nav-buttons side=\"left\">\n    <button class=\"button button-clear\" ng-if=\"editMode\" ng-click=\"deleteAll()\">\n      Delete all\n    </button>\n  </ion-nav-buttons>\n\n  <ion-nav-buttons side=\"right\">\n    <button class=\"button button-clear\" ng-if=\"favorites.length !== 0\" ng-click=\"edit()\">\n      <i class=\"icon ion-ios-compose-outline\"></i>\n    </button>\n  </ion-nav-buttons>\n\n  <ion-content class=\"has-header\">\n    <ion-list show-delete=\"editMode\" can-swipe=\"true\">\n      <ion-item class=\"item-icon-left item-text-wrap\" ng-if=\"favorites.length == 0\">\n        <i class=\"icon ion-ios-information-outline\"></i>\n        No favorites found\n        <p>In order to add a Favorite, press \'star\' icon to the right of search field</p>\n      </ion-item>\n\n      <ion-item ng-repeat=\"favorite in favorites\" class=\"item-icon-left\" ng-click=\"go(favorite)\">\n        <i class= \"icon ion-star energized\"></i>\n        {{favorite.name}}\n        <ion-option-button class=\"button-assertive\" ng-click=\"delete(favorite)\">Delete</ion-option-button>\n        <ion-delete-button class=\"ion-minus-circled\" ng-click=\"delete(favorite)\"></ion-delete-button>\n      </ion-item>\n\n    </ion-list>\n  </ion-content>\n\n</ion-view>\n");
$templateCache.put("tab-info.html","<ion-view view-title=\"Info\">\n  <ion-content class=\"padding-horizontal\">\n\n    <ion-list class=\"list list-inset\">\n      <ion-item class = \"item-image padding stable-bg\">\n        <img src=\"img/qrcode_256.png\" style=\"width: 55%; height: 55%\">\n      </ion-item>\n\n      <ion-item class = \"item-icon-left item-text-wrap\">\n        <i class=\"icon ion-ionic positive\"></i>\n        <h2>Built with Awesome and Powerful Ionic Framework</h2>\n        <a class=\"dark\" href=\"http://ionicframework.com\" target=\"_blank\">http://ionicframework.com</a>\n      </ion-item>\n\n      <ion-item class=\"item-icon-left item-divider\">\n        <i class= \"icon ion-social-rss-outline\"></i>\n        Share with Friends\n      </ion-item>\n      <ion-item class=\"item-icon-left\" class=\"positive\" href=\"https://twitter.com/intent/tweet?status=VGN Departures web app (http://vgn.herokuapp.com) - built with Awesome and Powerful Ionic Framework!\" target=\"_blank\">\n        <i class=\"icon ion-social-twitter positive\"></i>\n        <a>Tweet</a>\n      </ion-item>\n\n      <ion-item class=\"item-icon-left item-divider\">\n        <i class= \"icon ion-ios-help-outline\"></i>\n        Need Help?\n      </ion-item>\n      <ion-item class=\"item-icon-left item-text-wrap\" ng-click=\"help()\">\n        <i class= \"icon ion-ios-upload-outline positive\"></i>\n        Show me how to pin a webapp to the home screen (supported OS: iOS >= 6, Android >= 4)\n      </ion-item>\n    </ion-list>\n\n  </ion-content>\n</ion-view>\n");
$templateCache.put("tab-settings.html","<ion-view view-title=\"Settings\">\n  <ion-content class=\"has-header\">\n\n    <div class=\"list list-inset\">\n      <div class=\"item item-divider\">\n        Application settings\n      </div>\n      <label class=\"item item-input\">\n        <span class=\"input-label\">\n          <i class= \"icon ion-link placeholder-icon\"></i>\n          API server\n        </span>\n\n        <input type=\"text\" placeholder=\"http://example.com\" ng-model=\"$parent.api_url\">\n      </label>\n    </div>\n\n    <div class=\"padding\">\n      <button class=\"button button-block button-balanced\" ng-click=\"save()\">Save</button>\n    </div>\n\n  </ion-content>\n</ion-view>\n");
$templateCache.put("tabs.html","<ion-tabs class=\"tabs-icon-top tabs-color-active-positive\">\n\n  <!-- Departures Tab -->\n  <ion-tab title=\"Departures\" icon-off=\"ion-ios-list-outline\" icon-on=\"ion-ios-list\" href=\"#/tab/departures\">\n    <ion-nav-view name=\"tab-departures\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Settings Tab -->\n  <ion-tab title=\"Favorites\" icon-off=\"ion-ios-star-outline\" icon-on=\"ion-ios-star\" href=\"#/tab/favorites\">\n    <ion-nav-view name=\"tab-favorites\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Info Tab -->\n  <ion-tab title=\"Info\" icon-off=\"ion-ios-information-outline\" icon-on=\"ion-ios-information\" href=\"#/tab/info\">\n    <ion-nav-view name=\"tab-info\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Settings Tab -->\n<!--   <ion-tab title=\"Settings\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" href=\"#/tab/settings\">\n    <ion-nav-view name=\"tab-settings\"></ion-nav-view>\n  </ion-tab>\n -->\n</ion-tabs>\n");}]);
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map