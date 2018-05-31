angular.module('app.services', ['ionic','ionic.native'])

.service('Blog', ['$http', function($http){
    
        
    var api_key = 'fd98a213482190a38cdae4a1c2a8faaab1fc792b';
    var currentID = 1;

    
    var ret = {
        all: function(params){
            
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=blog.get_latest_posts';
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '&'+actual_params.join('&')+'&api_key='+api_key;
          
            return $http.get(api_url+actual_params).then(function(resp){
            if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data.result;
            });
            
        },
       read: function(params){
            
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=blog.blog_read_post';
            actual_params = '&guid='+params.guid+'&api_key='+api_key;
            return $http.get(api_url+actual_params).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data.result;
            });
            
        }
    }
    
    ret.all();
    
    return ret;

}])
.service('Paperworks', ['$http', function($http){
    
        
    var api_key = 'fd98a213482190a38cdae4a1c2a8faaab1fc792b';
    var currentID = 1;
    
    var ret = {
        all: function(params){
            
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=paperwork.get_latest_posts';
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '&'+actual_params.join('&')+'&api_key='+api_key;
          
            return $http.get(api_url+actual_params).then(function(resp){
            if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data.result;
            });
            
        },
       read: function(params){
            
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=paperwork.read_post';
            actual_params = '&guid='+params.guid+'&api_key='+api_key;
            
            return $http.get(api_url+actual_params).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data.result;
            });
            
        },
        search : function(query){
        
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=paperwork.search_post';
            actual_params = '&query='+query+'&api_key='+api_key;
        
            return $http.get(api_url+actual_params).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data.result;
            });
        
            
        }

    }
    
    ret.all();
    
    return ret;

}])
.service('Thesaurus', ['$http', function($http){
    
        
    var api_key = 'fd98a213482190a38cdae4a1c2a8faaab1fc792b';
    var currentID = 1;
    var ret = {
        all: function(params){
            
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=thesaurus.get_latest_posts';
            var actual_params = [];
        
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
        
            actual_params = '&'+actual_params.join('&')+'&api_key='+api_key;
        
            return $http.get(api_url+actual_params).then(function(resp){
        
            if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data.result;
            });
            
        },
       read: function(params){
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=thesaurus.read_post';
            actual_params = '&guid='+params.guid+'&api_key='+api_key;
            return $http.get(api_url+actual_params).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data.result;
            });
        },
        search : function(query){
        
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=thesaurus.search_post';
            actual_params = '&query='+query+'&api_key='+api_key;
        
            return $http.get(api_url+actual_params).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data.result;
            });
        }

    }
    
    ret.all();
    
    return ret;

}])
.service('Questions', ['$http', function($http){
    
        
    var api_key = 'fd98a213482190a38cdae4a1c2a8faaab1fc792b';
    var currentID = 1;
    var ret = {
        add: function(params){
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=questions.add_post';
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '&'+actual_params.join('&')+'&api_key='+api_key;
            return $http.post(api_url, actual_params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(resp){
            if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
        },
        getUri: function(params){
            
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=questions.add_post';
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '&'+actual_params.join('&')+'&api_key='+api_key;
            return api_url+actual_params;
        } 
    }
    return ret;
}])
.service('Estimates', ['$http', function($http){
    
        
    var api_key = 'fd98a213482190a38cdae4a1c2a8faaab1fc792b';
    var currentID = 1;
    var ret = {
        add: function(params){
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=estimates_request.add_post';
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '&'+actual_params.join('&')+'&api_key='+api_key;
            return $http.post(api_url, actual_params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(resp){
            if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
        },
        getUri: function(params){
            
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=estimates_request.add_post';
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '&'+actual_params.join('&')+'&api_key='+api_key;
            return api_url+actual_params;
            
        } 
    }
    return ret;
}])
.service('Gettoken', ['$http', function($http){
        
    var api_key = 'fd98a213482190a38cdae4a1c2a8faaab1fc792b';
    var currentID = 1;
    var ret = {
         getDeviceApiKey: function(params){
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=devices.getApyKey';
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '&'+actual_params.join('&')+'&api_key='+api_key;
            return $http.post(api_url, actual_params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(resp){
            if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
        },
        auth_gettoken: function(params){
            
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=auth.gettoken';
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '&'+actual_params.join('&')+'&api_key='+api_key;
            
            return $http.post(api_url, actual_params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(resp){
            if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
            
        },
        validate_token: function(token){
            
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=user.validatetoken&auth_token='+token+'&api_key='+api_key;
            return $http.get(api_url).then(function(resp){
            if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                if(resp.data.status===0){
                    return true;
                }
                else{
                    return false;
                    
                }
            });
            
        },
        auth_logout : function(params){
            
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=user.logout';
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '&'+actual_params.join('&')+'&api_key='+api_key;
            return $http.get(api_url+actual_params).then(function(resp){
            if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
            
        }
    }
    return ret;
}])
.service('Pickups', ['$http', function($http){
    
    var api_key = 'fd98a213482190a38cdae4a1c2a8faaab1fc792b';
    var currentID = 1;

    var ret = {
        all: function(params){
            
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=pickups.get_latest_posts';
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '&'+actual_params.join('&')+'&api_key='+api_key;
            
            return $http.get(api_url+actual_params).then(function(resp){
            if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data.result;
            });
            
        },

        read: function(params){
            
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=pickups.read_post';
            actual_params = '&guid='+params.guid+'&api_key='+api_key;
            return $http.get(api_url+actual_params).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data.result;
            });
            
        },
        add: function(params){
            var api_url = 'https://app.itsoeasy.it/services/api/rest/json/?method=pickups.add_post';
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '&'+actual_params.join('&')+'&api_key='+api_key;
            return $http.post(api_url, actual_params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(resp){
            if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
        },
        formatDate: function(date){
            return date.getMonth()+1 + "-" + date.getDate() + "-" + date.getFullYear();
        },
        formatTime: function(date){
            return date.getHours() + ":" + date.getMinutes();
        }
    }
    return ret;

}])
.service('BetaAppUtility', ['$http', function($http){
        
    var api_key = 'fd98a213482190a38cdae4a1c2a8faaab1fc792b';
    var currentID = 1;
    var ret = {
        dataURItoBlob      : function(string){},
        encodeURI : function (str) {
          return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
          });
        },
        base64Encode : function (dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0];
            var newByteStr = this.encodeURI(btoa(byteString));
            return mimeString+','+newByteStr;
        }
    }
    return ret;
    
}])

;
