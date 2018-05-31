angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('betaApp.home', {
    url: '/page12',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('betaApp.news', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/news.html',
        controller: 'newsCtrl'
      }
    }
  })

  .state('betaApp.news2', {
    url: '/page13',
	params: {
		blogID: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/news2.html',
        controller: 'news2Ctrl'
      }
    }
  })

  .state('betaApp.modulistica', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/modulistica.html',
        controller: 'modulisticaCtrl'
      }
    }
  })

  .state('betaApp.modulistica2', {
    url: '/page15',
	params: {
		paperworkID: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/modulistica2.html',
        controller: 'modulistica2Ctrl'
      }
    }
  })

  .state('betaApp.dizionarioDeiRifiuti', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/dizionarioDeiRifiuti.html',
        controller: 'dizionarioDeiRifiutiCtrl'
      }
    }
  })

  .state('betaApp.lEspertoRisponde', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/lEspertoRisponde.html',
        controller: 'lEspertoRispondeCtrl'
      }
    }
  })

  .state('betaApp.richiestaDiPreventivo', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/richiestaDiPreventivo.html',
        controller: 'richiestaDiPreventivoCtrl'
      }
    }
  })

  .state('betaApp.ilGruppoBeta', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ilGruppoBeta.html',
        controller: 'ilGruppoBetaCtrl'
      }
    }
  })

  .state('betaApp', {
    url: '/side-menu21',
    templateUrl: 'templates/betaApp.html',
    controller: 'betaAppCtrl'
  })

  .state('betaApp.myCalendar', {
    url: '/page22',
	params: {
		codiceCer: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/myCalendar.html',
        controller: 'myCalendarCtrl'
      }
    }
  })

  .state('betaApp.dettaglioDelRitiro', {
    url: '/page10',
	params: {
		pickupID: "{{pickup-guid}}"		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/dettaglioDelRitiro.html',
        controller: 'dettaglioDelRitiroCtrl'
      }
    }
  })

  .state('betaApp.dizionarioDeiRifiuti2', {
    url: '/page16',
	params: {
		voiceID: "",
		fromRequest: "none"		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/dizionarioDeiRifiuti2.html',
        controller: 'dizionarioDeiRifiuti2Ctrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page12')


});