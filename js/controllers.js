var uploadres = [];
var selectedData = [];
var abc = {};
var phonecatControllers = angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ngDialog', 'angularFileUpload', 'ui.select', 'ngSanitize']);
// window.uploadUrl = 'http://104.197.23.70/user/uploadfile';
//window.uploadUrl = 'http://192.168.2.22:1337/user/uploadfile';
window.uploadUrl = 'http://localhost:1337/user/uploadfile';
phonecatControllers.controller('home', function($scope, TemplateService, NavigationService, $routeParams, $location) {
  $scope.template = TemplateService;
  $scope.menutitle = NavigationService.makeactive("Dashboard");
  TemplateService.title = $scope.menutitle;
  TemplateService.submenu = "";
  TemplateService.content = "views/dashboard.html";
  TemplateService.list = 2;
  $scope.navigation = NavigationService.getnav();
  //  NavigationService.countUser(function(data, status) {
  //    $scope.user = data;
  //  });
});
phonecatControllers.controller('login', function($scope, TemplateService, NavigationService, $routeParams, $location) {
  $scope.template = TemplateService;
  TemplateService.content = "views/login.html";
  TemplateService.list = 3;

  $scope.navigation = NavigationService.getnav();
  $.jStorage.flush();
  $scope.isValidLogin = 1;
  $scope.login = {};
  $scope.verifylogin = function() {
    console.log($scope.login);
    if ($scope.login.email && $scope.login.password) {
      NavigationService.adminLogin($scope.login, function(data, status) {
        if (data.value == "false") {
          $scope.isValidLogin = 0;
        } else {
          $scope.isValidLogin = 1;
          $.jStorage.set("adminuser", data);
          $location.url("/home");
        }
      })
    } else {
      console.log("blank login");
      $scope.isValidLogin = 0;
    }

  }
});
phonecatControllers.controller('headerctrl', function($scope, TemplateService, $location, $routeParams, NavigationService) {
  $scope.template = TemplateService;
  //  if (!$.jStorage.get("adminuser")) {
  //    $location.url("/login");
  //
  //  }
});

phonecatControllers.controller('createorder', function($scope, TemplateService, NavigationService, ngDialog, $routeParams, $location) {
  $scope.template = TemplateService;
  $scope.menutitle = NavigationService.makeactive("Orders");
  TemplateService.title = $scope.menutitle;
  TemplateService.list = 2;
  TemplateService.content = "views/createorder.html";
  $scope.navigation = NavigationService.getnav();
  console.log($routeParams.id);

  $scope.order = {};

  $scope.submitForm = function() {
    console.log($scope.order);
    NavigationService.saveOrder($scope.order, function(data, status) {
      console.log(data);
      $location.url("/order");
    });
  };


  $scope.order.tag = [];
  $scope.ismatch = function(data, select) {
    abc.select = select;
    _.each(data, function(n, key) {
      if (typeof n == 'string') {
        var item = {
          _id: _.now(),
          name: _.capitalize(n),
          category: $scope.artwork.type
        };
        NavigationService.saveTag(item, function(data, status) {
          if (data.value == true) {
            item._id = data.id;
          }
        });
        select.selected = _.without(select.selected, n);
        select.selected.push(item);
        $scope.order.tag = select.selected;
      }
    });
    console.log($scope.artwork.tag);
  }


  $scope.refreshOrder = function(search) {
    $scope.tag = [];
    if (search) {
      NavigationService.findArtMedium(search, $scope.order.tag, function(data, status) {
        $scope.tag = data;
      });
    }
  };

  $scope.GalleryStructure = [{
    "name": "name",
    "type": "text",
    "validation": [
      "required",
      "minlength",
      "min=5"
    ]
  }, {
    "name": "image",
    "type": "image"
  }, {
    "name": "name",
    "type": "text",
    "validation": [
      "required",
      "minlength",
      "min=5"
    ]
  }];

  $scope.persons = [{
    "id": 1,
    "name": "first option"
  }, {
    "id": 2,
    "name": "first option"
  }, {
    "id": 3,
    "name": "first option"
  }, {
    "id": 4,
    "name": "first option"
  }, {
    "id": 5,
    "name": "first option"
  }];

  NavigationService.getUser(function(data, status) {
    $scope.persons = data;
  });

});




 //User Controller
phonecatControllers.controller('UserCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('User');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/user.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.User = [];$scope.pagedata = {};$scope.pagedata.page = 1;$scope.pagedata.limit = '20';$scope.pagedata.search = '';$scope.number = 100;$scope.reload = function (pagedata) {$scope.pagedata = pagedata;NavigationService.findLimitedUser($scope.pagedata, function (data, status) {$scope.user = data;$scope.pages = [];var newclass = '';for (var i = 1; i <= data.totalpages; i++) {if (pagedata.page == i) {newclass = 'active';} else {newclass = '';}$scope.pages.push({pageno: i,class: newclass});}});}$scope.reload($scope.pagedata);$scope.confDelete = function() {NavigationService.deleteUser(function(data, status) {ngDialog.close();window.location.reload();});}$scope.deletefun = function(id) {$.jStorage.set('deleteuser', id);ngDialog.open({template: 'views/delete.html',closeByEscape: false,controller: 'UserCtrl',closeByDocument: false});}
//End User
});
//user Controller
//createUser Controller
phonecatControllers.controller('createUserCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('User');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/createuser.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.user = {};$scope.submitForm = function () {NavigationService.saveUser($scope.user, function (data, status) {$location.url('/user');});};$scope.user.portfolio=[];$scope.PortfolioStructure=[{"name":"title","type":"text"},{"name":"time","type":"date"},{"name":"type","type":"text"},{"name":"creationTime","type":"date"},{"name":"duration","type":"date"},{"name":"targetAmountPresent","type":"number"},{"name":"executionTime","type":"date"},{"name":"isExecuted","type":"text"},{"name":"inflated","type":"text"},{"name":"inflationRate","type":"number"},{"name":"totalAmount","type":"number"},{"name":"shortTermLoss","type":"number"},{"name":"longTermLoss","type":"number"},{"name":"noofMonthlyContribution","type":"number"}];
//createUser
});
//createUser Controller
//editUser Controller
phonecatControllers.controller('editUserCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('User');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/edituser.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.user = {};NavigationService.getOneUser($routeParams.id, function (data, status) {$scope.user = data;if(!$scope.user.portfolio){$scope.user.portfolio = [];}//Add More Array
});$scope.submitForm = function () {$scope.user._id = $routeParams.id;NavigationService.saveUser($scope.user, function (data, status) {$location.url('/user');});};$scope.PortfolioStructure=[{"name":"title","type":"text"},{"name":"time","type":"date"},{"name":"type","type":"text"},{"name":"creationTime","type":"date"},{"name":"duration","type":"date"},{"name":"targetAmountPresent","type":"number"},{"name":"executionTime","type":"date"},{"name":"isExecuted","type":"text"},{"name":"inflated","type":"text"},{"name":"inflationRate","type":"number"},{"name":"totalAmount","type":"number"},{"name":"shortTermLoss","type":"number"},{"name":"longTermLoss","type":"number"},{"name":"noofMonthlyContribution","type":"number"}];
//editUser
});
//editUser Controller
//Slider Controller
phonecatControllers.controller('SliderCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('Slider');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/slider.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.Slider = [];$scope.pagedata = {};$scope.pagedata.page = 1;$scope.pagedata.limit = '20';$scope.pagedata.search = '';$scope.number = 100;$scope.reload = function (pagedata) {$scope.pagedata = pagedata;NavigationService.findLimitedSlider($scope.pagedata, function (data, status) {$scope.slider = data;$scope.pages = [];var newclass = '';for (var i = 1; i <= data.totalpages; i++) {if (pagedata.page == i) {newclass = 'active';} else {newclass = '';}$scope.pages.push({pageno: i,class: newclass});}});}$scope.reload($scope.pagedata);$scope.confDelete = function() {NavigationService.deleteSlider(function(data, status) {ngDialog.close();window.location.reload();});}$scope.deletefun = function(id) {$.jStorage.set('deleteslider', id);ngDialog.open({template: 'views/delete.html',closeByEscape: false,controller: 'SliderCtrl',closeByDocument: false});}
//End Slider
});
//slider Controller
//createSlider Controller
phonecatControllers.controller('createSliderCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('Slider');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/createslider.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.slider = {};$scope.submitForm = function () {NavigationService.saveSlider($scope.slider, function (data, status) {$location.url('/slider');});};
//createSlider
});
//createSlider Controller
//editSlider Controller
phonecatControllers.controller('editSliderCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('Slider');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/editslider.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.slider = {};NavigationService.getOneSlider($routeParams.id, function (data, status) {$scope.slider = data;//Add More Array
});$scope.submitForm = function () {$scope.slider._id = $routeParams.id;NavigationService.saveSlider($scope.slider, function (data, status) {$location.url('/slider');});};
//editSlider
});
//editSlider Controller
//Config Controller
phonecatControllers.controller('ConfigCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('Config');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/config.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.Config = [];$scope.pagedata = {};$scope.pagedata.page = 1;$scope.pagedata.limit = '20';$scope.pagedata.search = '';$scope.number = 100;$scope.reload = function (pagedata) {$scope.pagedata = pagedata;NavigationService.findLimitedConfig($scope.pagedata, function (data, status) {$scope.config = data;$scope.pages = [];var newclass = '';for (var i = 1; i <= data.totalpages; i++) {if (pagedata.page == i) {newclass = 'active';} else {newclass = '';}$scope.pages.push({pageno: i,class: newclass});}});}$scope.reload($scope.pagedata);$scope.confDelete = function() {NavigationService.deleteConfig(function(data, status) {ngDialog.close();window.location.reload();});}$scope.deletefun = function(id) {$.jStorage.set('deleteconfig', id);ngDialog.open({template: 'views/delete.html',closeByEscape: false,controller: 'ConfigCtrl',closeByDocument: false});}
//End Config
});
//config Controller
//createConfig Controller
phonecatControllers.controller('createConfigCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('Config');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/createconfig.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.config = {};$scope.submitForm = function () {NavigationService.saveConfig($scope.config, function (data, status) {$location.url('/config');});};
//createConfig
});
//createConfig Controller
//editConfig Controller
phonecatControllers.controller('editConfigCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('Config');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/editconfig.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.config = {};NavigationService.getOneConfig($routeParams.id, function (data, status) {$scope.config = data;//Add More Array
});$scope.submitForm = function () {$scope.config._id = $routeParams.id;NavigationService.saveConfig($scope.config, function (data, status) {$location.url('/config');});};
//editConfig
});
//editConfig Controller
//HistoricData Controller
phonecatControllers.controller('HistoricDataCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('HistoricData');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/historicdata.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.HistoricData = [];$scope.pagedata = {};$scope.pagedata.page = 1;$scope.pagedata.limit = '20';$scope.pagedata.search = '';$scope.number = 100;$scope.reload = function (pagedata) {$scope.pagedata = pagedata;NavigationService.findLimitedHistoricData($scope.pagedata, function (data, status) {$scope.historicdata = data;$scope.pages = [];var newclass = '';for (var i = 1; i <= data.totalpages; i++) {if (pagedata.page == i) {newclass = 'active';} else {newclass = '';}$scope.pages.push({pageno: i,class: newclass});}});}$scope.reload($scope.pagedata);$scope.confDelete = function() {NavigationService.deleteHistoricData(function(data, status) {ngDialog.close();window.location.reload();});}$scope.deletefun = function(id) {$.jStorage.set('deletehistoricdata', id);ngDialog.open({template: 'views/delete.html',closeByEscape: false,controller: 'HistoricDataCtrl',closeByDocument: false});}
//End HistoricData
});
//historicdata Controller
//createHistoricData Controller
phonecatControllers.controller('createHistoricDataCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('HistoricData');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/createhistoricdata.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.historicdata = {};$scope.submitForm = function () {NavigationService.saveHistoricData($scope.historicdata, function (data, status) {$location.url('/historicdata');});};
//createHistoricData
});
//createHistoricData Controller
//editHistoricData Controller
phonecatControllers.controller('editHistoricDataCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('HistoricData');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/edithistoricdata.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.historicdata = {};NavigationService.getOneHistoricData($routeParams.id, function (data, status) {$scope.historicdata = data;//Add More Array
});$scope.submitForm = function () {$scope.historicdata._id = $routeParams.id;NavigationService.saveHistoricData($scope.historicdata, function (data, status) {$location.url('/historicdata');});};
//editHistoricData
});
//editHistoricData Controller
//Article Controller
phonecatControllers.controller('ArticleCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('Article');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/article.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.Article = [];$scope.pagedata = {};$scope.pagedata.page = 1;$scope.pagedata.limit = '20';$scope.pagedata.search = '';$scope.number = 100;$scope.reload = function (pagedata) {$scope.pagedata = pagedata;NavigationService.findLimitedArticle($scope.pagedata, function (data, status) {$scope.article = data;$scope.pages = [];var newclass = '';for (var i = 1; i <= data.totalpages; i++) {if (pagedata.page == i) {newclass = 'active';} else {newclass = '';}$scope.pages.push({pageno: i,class: newclass});}});}$scope.reload($scope.pagedata);$scope.confDelete = function() {NavigationService.deleteArticle(function(data, status) {ngDialog.close();window.location.reload();});}$scope.deletefun = function(id) {$.jStorage.set('deletearticle', id);ngDialog.open({template: 'views/delete.html',closeByEscape: false,controller: 'ArticleCtrl',closeByDocument: false});}
//End Article
});
//article Controller
//createArticle Controller
phonecatControllers.controller('createArticleCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('Article');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/createarticle.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.article = {};$scope.submitForm = function () {NavigationService.saveArticle($scope.article, function (data, status) {$location.url('/article');});};
//createArticle
});
//createArticle Controller
//editArticle Controller
phonecatControllers.controller('editArticleCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {$scope.template = TemplateService;$scope.menutitle =NavigationService.makeactive('Article');TemplateService.title = $scope.menutitle;TemplateService.submenu = '';TemplateService.content = 'views/editarticle.html';TemplateService.list = 2;$scope.navigation = NavigationService.getnav();$scope.article = {};NavigationService.getOneArticle($routeParams.id, function (data, status) {$scope.article = data;//Add More Array
});$scope.submitForm = function () {$scope.article._id = $routeParams.id;NavigationService.saveArticle($scope.article, function (data, status) {$location.url('/article');});};
//editArticle
});
//editArticle Controller
//Add New Controller
