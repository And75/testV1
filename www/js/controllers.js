angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', 'Gettoken', 'Blog', '$cordovaStatusBar', '$ionicModal', '$ionicPopup', '$ionicPlatform', '$cordovaDevice', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Gettoken, Blog, $cordovaStatusBar, $ionicModal, $ionicPopup, $ionicPlatform, $cordovaDevice) {

    $scope.params = $stateParams;
    var params = [];
    params['limit'] = '3';
    params['offset'] = '0';
    $scope.blogs = [];
    
    $scope.loadData = function(){
    Blog.all(params).then(function(res){
           $scope.blogs = res;
        })
    }
    $scope.loadData();
        
    $ionicPlatform.ready(function() {
        
        if( $cordovaDevice.platform=='Android'){
            $cordovaStatusBar.backgroundColorByHexString('#416579');
            $cordovaStatusBar.styleLightContent();
        }
        
        var isVirtual = 'false';
        if($cordovaDevice.isVirtual){
            isVirtual = 'true';
        } 
        
        var device = {
            model:$cordovaDevice.model,
            uuid: $cordovaDevice.uuid,
            platform: $cordovaDevice.platform,
            version: $cordovaDevice.version,
            manufacturer:$cordovaDevice.manufacturer,
            isVirtual: isVirtual,
        };
        
        $scope.deviceApiKey = '';
        var getDevicesApiKey = function(){
            Gettoken.getDeviceApiKey(device).then(function(res){
               if(res.status===0){
                  $scope.deviceApiKey = res.message; 
               } else {
                   $ionicPopup.alert({
                        title: 'Device Error!',
                        template: res.message
                    });
               }    
    
            })
        }
        
        getDevicesApiKey();
        
    });
    
}])
   
.controller('newsCtrl', ['$scope', '$stateParams', 'Blog', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Blog) {
    
    $scope.params = $stateParams;
    var params = [];
    params['limit'] = '10';
    params['offset'] = '0';
    
    $scope.blogs = [];
    
    $scope.loadData = function(){
    Blog.all(params).then(function(res){
        $scope.blogs = res;
        })
    }

    $scope.loadData();
}])
   
.controller('news2Ctrl', ['$scope', '$stateParams', 'Blog', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Blog) {
    
    $scope.params = $stateParams;
    var params = [];
    params['guid'] = $stateParams.blogID;
 
    
    $scope.blog = [];
    
    $scope.loadData = function(){
        Blog.read(params).then(function(res){
               $scope.blog = res;
            })
    }

    $scope.loadData();
}])
   
.controller('modulisticaCtrl', ['$scope', '$stateParams', 'Paperworks', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Paperworks) {
    
    $scope.params = $stateParams;
    var params = [];
    params['limit']  = '10';
    params['offset'] = '0';
    params['search'] = '';
    
    $scope.paperworks = [];
    $scope.data = [
        search = ''
    ];
    
    $scope.loadData = function(){
        Paperworks.all(params).then(function(res){
         
           $scope.paperworks = res;
        })
    }
    $scope.loadData();
    
    $scope.search = function(){
        var query = $scope.data.search.toLowerCase();
        if(query===''){
            $scope.loadData();
            return;
        }
        Paperworks.search(query).then(function(res){
           $scope.paperworks = res;
        })
    }
    
}])
   
.controller('modulistica2Ctrl', ['$scope', '$stateParams', 'Paperworks', '$cordovaFile', '$ionicPopup', '$ionicModal', '$cordovaDevice', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Paperworks, $cordovaFile, $ionicPopup,$ionicModal,$cordovaDevice) {
    
    $scope.params = $stateParams;
    var params = [];
    var errorWrite = '';
    $scope.file_name='';
    $scope.file_path='';
    
    params['guid'] = $stateParams.paperworkID;
    
    $scope.paperworks = [];
    
    $scope.loadData = function(){
        Paperworks.read(params).then(function(res){
            $scope.paperwork = res;
        })
    }
    $scope.loadData();
    
    
    $scope.downloadFile = function(fileguid) {
        
        var platform = $cordovaDevice.platform;
        var googleUrlPrefix = 'https://docs.google.com/viewer?url=';
        var url = "https://beta.belleville-system.com"+$scope.paperwork.file;
        //var options =  "toolbar=no,location=no,menubar=no";
        if(platform==='Android'){
           url = "https://beta.belleville-system.com"+ encodeURIComponent($scope.paperwork.file);
           window.open(googleUrlPrefix+url, '_system');
        } else{
          window.open(url, '_system'); 
        }

       /*var xhr = new XMLHttpRequest();
        xhr.responseType = "arraybuffer";  
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
          var downloadDir = cordova.file.externalRootDirectory + '/Download/';      
          $scope.file_name = $scope.paperwork.file_name+".pdf";
          $scope.file_path = downloadDiry+$scope.file_name
          $cordovaFile.writeFile(downloadDir, $scope.paperwork.file_name+".pdf", this.response, true)
                 .then(function(success) {
                      $ionicPopup.alert({
                            title: 'File Path',
                            template:  $scope.file_path
                        });
                     
                         $scope.fileOpener($scope.file_path);
                 }, function(error) {
                    if(error.code===12){
                         $scope.fileOpener($scope.file_path);
                    } else {
                        $ionicPopup.alert({
                            title: 'Errore Download File!!!',
                            template:  error.code
                        });
                    }    
                 });
          } 
          
        });
        
        xhr.open("POST", url);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("accept", "application/pdf");
        xhr.send();*/
        
    }

    
}])
   
.controller('dizionarioDeiRifiutiCtrl', ['$scope', '$stateParams', 'Thesaurus', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Thesaurus) {
    
    $scope.params = $stateParams;
    var params = [];
    params['limit'] = '50';
    params['offset'] = '0';
    $scope.loadedFeeds = [];
    $scope.thesaurus = [];
    $scope.data = [
        search = ''
    ];
    
    $scope.loadData = function(){
        Thesaurus.all(params).then(function(res){
               $scope.thesaurus = res;
        })
    }
    $scope.loadData();
    
    $scope.pagination = function(){
        $scope.loadedFeeds=[];
        params.offset = parseInt(params.offset)+parseInt(params.limit);
        Thesaurus.all(params).then(function(res){
               
                for (var key in res) {
                    // skip loop if the property is from prototype
                    if (!res.hasOwnProperty(key)) continue;
                
                    var obj = res[key];
                    for (var prop in obj) {
                        // skip loop if the property is from prototype
                        if(!obj.hasOwnProperty(prop)) continue;
                
                        // your code
                        if(prop=='guid'){
                            $scope.thesaurus[obj[prop]]=obj;
                        }
                    }
                }
        })
   
        
    }
    
    $scope.search = function(){
        var query = $scope.data.search.toLowerCase();
        if(query===''){
            $scope.loadData();
            return;
        }
        Thesaurus.search(query).then(function(res){
           $scope.thesaurus = res;
        })
    }

}])
   
.controller('lEspertoRispondeCtrl', ['$scope', '$stateParams', 'Questions', '$ionicPopup', '$cordovaCamera', 'BetaAppUtility', '$ionicPlatform', '$cordovaDevice', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Questions, $ionicPopup, $cordovaCamera, BetaAppUtility, $ionicPlatform, $cordovaDevice) {
    
    $scope.params    = $stateParams;
    $scope.imgAvatar ='https://s3.amazonaws.com/ionic-io-static/iwHMB7AzT7yoMaS4OSM4_avatarImg.JPG';
    $scope.imgUri    = $scope.imgAvatar;
    $scope.data      = {
        name: '',
        description: '',
        email: '',
        picture : 'No-picture',
    }
    
    $scope.submitting = false;

    $scope.registerData = function(){

        $scope.submitting = true;

        var ctrlImage = document.getElementById('beta-questions-uploaded-image');
        var ctrlImageSrc = ctrlImage.src;
        
        if(ctrlImageSrc && ctrlImageSrc!==$scope.imgAvatar){
            ctrlImageReplace = BetaAppUtility.base64Encode(ctrlImageSrc);
            $scope.data.picture = ctrlImageReplace; 
        }
        
        Questions.add($scope.data).then(function(res){
              if(res.status===0){
                    $scope.data = {
                        name: null,
                        description: null,
                        email: null,
                        picture: null
                    }
                    $scope.imgUri = $scope.imgAvatar;
                    $scope.submitting = false;
                    $ionicPopup.alert({
                        title: 'Grazie!',
                        template: 'Risponderemo alla tua domanda nel minor tempo possibile'
                    });
              } else {
                   $ionicPopup.alert({
                        title: 'Errore!',
                        template: res.message
                    });
              }
        });
    }
    
    $scope.takePicture = function(){
        
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType : Camera.EncodingType.JPEG,
            targetWidth : 300,
            targetHeight : 300,
            popoverOptions :Camera.PopoverOption,
            saveToPhotoAlbum : false
        };
        
        $cordovaCamera.getPicture(options).then(function(imageData){
                $scope.imgUri = 'data:image/jpeg;base64,'+imageData;
                
            }, 
            function(err){
                $ionicPopup.alert({
                        title: 'Errore caricamento immagine!',
                        template: err
                });
            }
        );
        
    }    


}])
   
.controller('richiestaDiPreventivoCtrl', ['$scope', '$stateParams', 'Estimates', '$ionicPopup', '$cordovaCamera', 'BetaAppUtility', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Estimates, $ionicPopup, $cordovaCamera, BetaAppUtility) {
    
    $scope.params = $stateParams;
    $scope.imgAvatar ='https://s3.amazonaws.com/ionic-io-static/iwHMB7AzT7yoMaS4OSM4_avatarImg.JPG';
    $scope.imgUri=$scope.imgAvatar;
    $scope.data = {
        name: '',
        description: '',
        email: '',
        picture: 'No picture'
    }
    
    $scope.submitting = false;
    $scope.registerData = function(){
       
        $scope.submitting = true;
        
        var ctrlImage = document.getElementById('beta-estimate-uploaded-image');
        var ctrlImageSrc = ctrlImage.src;
        
        if(ctrlImageSrc && ctrlImageSrc!==$scope.imgAvatar){
            ctrlImageReplace = BetaAppUtility.base64Encode(ctrlImageSrc);
            $scope.data.picture = ctrlImageReplace; 
        }
        
        Estimates.add($scope.data).then(function(res){
               
              if(res.status===0){
                    $scope.data = {
                        name: null,
                        description: null,
                        email: null,
                        picture: null
                    }
                    $scope.imgUri=$scope.imgAvatar;
                    $scope.submitting = false;
                    $ionicPopup.alert({
                        title: 'Grazie!',
                        template: 'Risponderemo alla tua domanda nel minor tempo possibile'
                    });
              } else{
                   $ionicPopup.alert({
                        title: 'Errore!',
                        template: res.message
                    });
              }
        });
    }
    
    $scope.takePicture = function(){
        
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType : Camera.EncodingType.JPEG,
            targetWidth : 300,
            targetHeight : 300,
            popoverOptions :Camera.PopoverOption,
            saveToPhotoAlbum : false
        };
        
        $cordovaCamera.getPicture(options).then(function(imageData){
                $scope.imgUri = 'data:image/jpeg;base64,'+imageData;
                
            }, 
            function(err){
                $ionicPopup.alert({
                        title: 'Errore caricamento immagine!',
                        template: err
                });
            }
        );
    }
    
}])
   
.controller('ilGruppoBetaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('betaAppCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('myCalendarCtrl', ['$scope', '$state', '$stateParams', 'BetaAppUtility', 'Gettoken', 'Pickups', '$ionicPopup', '$cordovaCamera', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, BetaAppUtility, Gettoken, Pickups, $ionicPopup, $cordovaCamera) {

    $scope.authToken = window.localStorage.getItem('usertoken');
    if($scope.authToken!==null){
        Gettoken.validate_token($scope.authToken).then(function(res){
             if(res!==true){
                 $scope.sendLogout();
             }
        });
        $scope.activeSection = 2;
    }else{
        $scope.activeSection = 1;
        $scope.activeLoginSection = 1;
    }
    
    if($stateParams.codiceCer && $scope.authToken!==null){
        $scope.activeSection = 4;
    }
    
    $scope.oldPickups = [];
    $scope.oldPickupsLength = 0;
    $scope.pickups = [];
    $scope.pickupsLength = 0;
    
    $scope.imageData = null;
    
    $scope.changeSection = function(s){
        if($scope.authToken===null){
            $scope.activeSection = 1;
        }
        else{
            if(s===1){
                 if($scope.authToken!==null){
                     $scope.LoginSection(2);
                 }
            }
            $scope.activeSection = s;
        }
    }
    
    $scope.activeLoginSection = 1;
    $scope.LoginSection = function(s){
        if($scope.authToken===null){
            $scope.activeLoginSection = 1;
        }
        else{
            $scope.activeLoginSection = s;
        }
    }

    $scope.params = $stateParams;
    $scope.data = {
        username: '',
        password: '',
    }
    
    $scope.submitting = false;
    
    $scope.sendRequest = function(){
       
        $scope.submitting = true;
        window.localStorage.removeItem('usertoken');
        $scope.authToken = null;
        
        Gettoken.auth_gettoken($scope.data).then(function(res){
              
              if(res.status===0){
                    $scope.data = {
                        username: null,
                        password: null,
                    }
                    $scope.submitting = false;
                    $scope.authToken = res.result;
                    window.localStorage.setItem('usertoken', res.result);
                    $scope.getNextPickups();
                    $scope.getOldPickups();
                    $scope.changeSection(2);
                    $scope.LoginSection(2);
                    $ionicPopup.alert({
                        title: 'Login effettuato con successo!',
                    });

                    
              } else{
                   $ionicPopup.alert({
                        title: 'Errore!',
                        template: res.message
                    });
              }
        });
    }
    $scope.sendLogout = function(){
       
        $scope.submitting = true;
        var params = [];
        params['auth_token'] = window.localStorage.getItem('usertoken');
        
        Gettoken.auth_logout(params).then(function(res){
              
              if(res.status===0){
                    $scope.submitting = false;
                    window.localStorage.removeItem('usertoken');
                    $scope.changeSection(1);
                    $scope.LoginSection(1);
                    $scope.authToken = null;
                    $scope.nextPickups = [];
                    $ionicPopup.alert({
                        title: 'Logout effettuato con successo!',
                    });
                    
              } else{
                   $ionicPopup.alert({
                        title: 'Errore!',
                        template: res.message
                    });
              }
        });
    }
    
    /*GET PICKUPS*/
    $scope.getNextPickups = function(){
        if($scope.authToken!==null){
            var params = [];
            params['limit'] = '10';
            params['offset'] = '0';
            params['status'] = 'nextPickups';
            params['auth_token'] = window.localStorage.getItem('usertoken');
            Pickups.all(params).then(function(res){
                if(!res.error){
                    $scope.pickups = res;
                    $scope.pickupsLength = Object.keys(res).length;
                }                
            });
        }
    }
    
    /*GET PICKUPS*/
    $scope.getOldPickups = function(){
        if($scope.authToken!==null){
            var params = [];
            params['limit'] = '10';
            params['offset'] = '0';
            params['status'] = 'executed';
            params['auth_token'] = window.localStorage.getItem('usertoken');
            Pickups.all(params).then(function(res){
                if(!res.error){
                    $scope.oldPickups= res;
                    $scope.oldPickupsLength = Object.keys(res).length;
                }
            });
        }
    }
    
    
    
    //PICKUPS REQUEST
    $scope.imgAvatar ='https://s3.amazonaws.com/ionic-io-static/iwHMB7AzT7yoMaS4OSM4_avatarImg.JPG';
    $scope.imgUri=$scope.imgAvatar;
    $scope.dtForm = {
        codice_cer: $stateParams.codiceCer,
        description: null,
        date_pickups: null,
        weight: null,
        time_pickups: null,
        picture :'No-picture',
        auth_token :  window.localStorage.getItem('usertoken')
    }

    
    $scope.submitting = false;
    $scope.sendPickupRequest = function(){
       
        $scope.submitting = true;

        var imgSave = 'No-picture';
        var ctrlImage = document.getElementById('beta-uploaded-image');
        var ctrlImageSrc = ctrlImage.src;
        
        if(ctrlImageSrc && ctrlImageSrc!==$scope.imgAvatar){
            ctrlImageReplace = BetaAppUtility.base64Encode(ctrlImageSrc);
            imgSave = ctrlImageReplace; 
        }

        if($scope.dtForm.date_pickup){
              var date_pickup = Pickups.formatDate($scope.dtForm.date_pickup);
        }
        if($scope.dtForm.time_pickup){
            var time_pickup = Pickups.formatTime($scope.dtForm.time_pickup);
        }
        
        var insertValues = {
            codice_cer: $stateParams.codiceCer,
            description: $scope.dtForm.description,
            date_pickup: date_pickup,
            weight: $scope.dtForm.weight,
            time_pickup: time_pickup,
            picture : imgSave,
            auth_token :  window.localStorage.getItem('usertoken')
        };
        
        Pickups.add(insertValues).then(function(res){
               
              if(res.status===0){
                    $scope.dtForm = {
                        codice_cer: null,
                        description: null,
                        date_pickup: null,
                        weight: null,
                        time_pickups: null,
                    }
                    $scope.imgUri=$scope.imgAvatar;
                    $scope.submitting = false;
                    $scope.changeSection(2);
                    $scope.getNextPickups();
                    $ionicPopup.alert({
                        title: 'Grazie!',
                        template: 'La tua domanda di ritiro é stata registrata'
                    });
              } else{
                   $ionicPopup.alert({
                        title: 'Errore!',
                        template: res.message
                    });
              }
        });
    }
    
    $scope.takePicture = function(){
        
        var options = {
            quality : 100,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType : Camera.EncodingType.JPEG,
            targetWidth : 300,
            targetHeight : 300,
            popoverOptions :Camera.PopoverOption,
            saveToPhotoAlbum : false
        };
        
        $cordovaCamera.getPicture(options).then(function(imageData){
                 $scope.imgUri  = 'data:image/jpeg;base64,'+imageData;
                 $scope.imageData = imageData;
            }, 
            function(err){
                $ionicPopup.alert({
                        title: 'Errore!',
                        template: err
                });
            }
        );
        
        
        
    }

    /*Launch default actions*/
    $scope.getNextPickups();
    $scope.getOldPickups();

}])
   
.controller('dettaglioDelRitiroCtrl', ['$scope', '$stateParams', 'Pickups', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Pickups) {
    
    $scope.params = $stateParams;
    var params = [];
    params['guid'] = $stateParams.pickupID;
    params['auth_token'] = window.localStorage.getItem('usertoken');
    
    $scope.blog = [];
    $scope.loadData = function(){
        Pickups.read(params).then(function(res){
           $scope.pickup = res;
       })
    }

    $scope.loadData();
    
}])
   
.controller('dizionarioDeiRifiuti2Ctrl', ['$scope', '$stateParams', 'Thesaurus', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Thesaurus) {
    
    $scope.islogedin = false;
    $scope.authToken = window.localStorage.getItem('usertoken');
    
    $scope.params = $stateParams;
    var params = [];
    params['guid'] = $stateParams.voiceID;
    $scope.voice = [];
    
    $scope.loadData = function(){
        Thesaurus.read(params).then(function(res){
               $scope.voice = res;
               if($scope.authToken!==null){
                    $scope.islogedin = true;
                }
            })
    }
    $scope.loadData();
        $scope.downloadFile = function(fileguid) {
    }
}])
 