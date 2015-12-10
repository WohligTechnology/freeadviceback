var adminurl = "http://localhost:1337/";
var adminlogin = {
  "username": "admin@admin.com",
  "password": "admin123"
};
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
  var navigation = [{
      name: "Dashboard",
      classis: "active",
      link: "#/home",
      subnav: []
    }, 
				{name: 'User',active: '',link: '#/user',subnav: []},{name: 'Slider',active: '',link: '#/slider',subnav: []},{name: 'Config',active: '',link: '#/config',subnav: []},{name: 'HistoricData',active: '',link: '#/historicdata',subnav: []},{name: 'Article',active: '',link: '#/article',subnav: []},//Add New Left

  ];

  return {
    makeactive: function(menuname) {
      for (var i = 0; i < navigation.length; i++) {
        if (navigation[i].name == menuname) {
          navigation[i].classis = "active";
        } else {
          navigation[i].classis = "";
        }
      }
      return menuname;
    },
    getnav: function() {
      return navigation;
    },
    adminLogin: function(data, callback) {
      $http({
        url: adminurl + "user/adminlogin",
        method: "POST",
        data: {
          "email": data.email,
          "password": data.password
        }
      }).success(callback);
    },
    //    countUser: function(callback) {
    //      $http.get(adminurl + "user/countusers").success(callback);
    //    },
    setUser: function(data) {
      $.jStorage.set("user", data);
    },
    getUser: function() {
      $.jStorage.get("user");
    }, getOneUser: function (id, callback) {$http({url: adminurl + 'user/findone',method: 'POST',data: {'_id':id}}).success(callback);},findLimitedUser: function(user, callback) {$http({url: adminurl + 'user/findlimited',method: 'POST',data: {'search': user.search,'pagesize': parseInt(user.limit),'pagenumber': parseInt(user.page)}}).success(callback);},deleteUser: function (callback) {$http({url: adminurl + 'user/delete',method: 'POST',data: {'_id': $.jStorage.get('deleteuser')}}).success(callback);},saveUser: function (data, callback) {$http({url: adminurl + 'user/save',method: 'POST',data: data}).success(callback);},getOneSlider: function (id, callback) {$http({url: adminurl + 'slider/findone',method: 'POST',data: {'_id':id}}).success(callback);},findLimitedSlider: function(slider, callback) {$http({url: adminurl + 'slider/findlimited',method: 'POST',data: {'search': slider.search,'pagesize': parseInt(slider.limit),'pagenumber': parseInt(slider.page)}}).success(callback);},deleteSlider: function (callback) {$http({url: adminurl + 'slider/delete',method: 'POST',data: {'_id': $.jStorage.get('deleteslider')}}).success(callback);},saveSlider: function (data, callback) {$http({url: adminurl + 'slider/save',method: 'POST',data: data}).success(callback);},getOneConfig: function (id, callback) {$http({url: adminurl + 'config/findone',method: 'POST',data: {'_id':id}}).success(callback);},findLimitedConfig: function(config, callback) {$http({url: adminurl + 'config/findlimited',method: 'POST',data: {'search': config.search,'pagesize': parseInt(config.limit),'pagenumber': parseInt(config.page)}}).success(callback);},deleteConfig: function (callback) {$http({url: adminurl + 'config/delete',method: 'POST',data: {'_id': $.jStorage.get('deleteconfig')}}).success(callback);},saveConfig: function (data, callback) {$http({url: adminurl + 'config/save',method: 'POST',data: data}).success(callback);},getOneHistoricData: function (id, callback) {$http({url: adminurl + 'historicdata/findone',method: 'POST',data: {'_id':id}}).success(callback);},findLimitedHistoricData: function(historicdata, callback) {$http({url: adminurl + 'historicdata/findlimited',method: 'POST',data: {'search': historicdata.search,'pagesize': parseInt(historicdata.limit),'pagenumber': parseInt(historicdata.page)}}).success(callback);},deleteHistoricData: function (callback) {$http({url: adminurl + 'historicdata/delete',method: 'POST',data: {'_id': $.jStorage.get('deletehistoricdata')}}).success(callback);},saveHistoricData: function (data, callback) {$http({url: adminurl + 'historicdata/save',method: 'POST',data: data}).success(callback);},getOneArticle: function (id, callback) {$http({url: adminurl + 'article/findone',method: 'POST',data: {'_id':id}}).success(callback);},findLimitedArticle: function(article, callback) {$http({url: adminurl + 'article/findlimited',method: 'POST',data: {'search': article.search,'pagesize': parseInt(article.limit),'pagenumber': parseInt(article.page)}}).success(callback);},deleteArticle: function (callback) {$http({url: adminurl + 'article/delete',method: 'POST',data: {'_id': $.jStorage.get('deletearticle')}}).success(callback);},saveArticle: function (data, callback) {$http({url: adminurl + 'article/save',method: 'POST',data: data}).success(callback);},//Add New Service

  }
})
