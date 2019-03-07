// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo scoops for Catalog section
      scoops: [
        {
          id: '1',
          title: 'Social Life',
          flavor: 'Chocolate'
        },
        {
          id: '2',
          title: 'Family Time',
          flavor: 'Vanilla'
        },
        {
          id: '3',
          title: 'Education',
          flavor: 'Strawberry'
        },
      ],
      checkins: [
        {
          id: '1',
          title: 'Morning',
          time: '12:00PM',
          storedScoops: []
        },
        {
          id: '2',
          title: 'Afternoon',
          time: '12:00PM',
          storedScoops: []
        },
        {
          id: '3',
          title: 'Night',
          time: '12:00PM',
          storedScoops: []
        },
      ],
      cones: [
        {
          id: '1',
          date: 'today',
          build: [
            {
              id: '1',
              level: 'scoop',
              color: '#FEFEFE'
            },
            {
              id: '2',
              level: 'scoop',
              color: '#000000'
            },
            {
              id: '3',
              level: 'scoop',
              color: '#333333'
            },
            {
              id: '4',
              level: 'sprinkles',
              color: '#FEFEFE'
            },
          ]
        }
      ]
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
var todayView = app.views.create('#view-today', {
  url: '/today/'
});
var scoopsView = app.views.create('#view-scoops', {
  url: '/scoops/'
});
var settingsView = app.views.create('#view-settings', {
  url: '/settings/'
});
var loginView = app.views.create('#view-login', {
  url: '/login/'
});
var signUpView = app.views.create('#view-sign-up', {
  url: '/sign-up/'
});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});

console.log(app);

function getMethods(obj)
{
    var res = [];
    for(var m in obj) {
        if(typeof obj[m] == "function") {
            res.push(m)
        }
    }
    console.log(res);
    return res;
}

getMethods(app)
// localStorage.setItem('username','temp');
localStorage.setItem('username','');
$$(document).on('page:init', function (page){
console.log('ran after in of home');
  if (!localStorage.getItem('username')){
    console.log('running localStorage if ' + localStorage.getItem('username'))
    console.log(app.router);
    app.views.main.router.navigate('/login/');
  }
  if (localStorage.getItem('username') == "temp"){
    console.log('running localStorage if ' + localStorage.getItem('username'))
    console.log(app);
    app.views.main.router.navigate('/sign-up/');

  }
})


$$(document).on('page:afterin', '.page[data-name="settings"]', function (page) {
  //console.log('settings page query: ' + page.detial.route);
  console.log('ran settings');
    $(document).ready(function() {
        $("#createUser").click(function() {
            var username = $("#username").val();
            var password = $("#password").val();
            var fname = $("#fname").val();
            var lname = $("#lname").val();
            var dataString = "username=" + username + "&password=" + password + "&fname=" + fname + "&lname=" + lname + "&insert=";
            if ($.trim(username).length > 0 & $.trim(password).length > 0 & $.trim(fname).length > 0 & $.trim(lname).length > 0) {
                $.ajax({
                    type: "POST",
                    url: "http://iontheory.net/scoop/users/insert.php",
                    data: dataString,
                    crossDomain: true,
                    cache: false,
                    beforeSend: function() {
                        $("#insert").val('Connecting...');
                    },
                    success: function(data) {
                        if (data == "success") {
                            alert("inserted");
                            $("#insert").val('submit');
                        } else if (data == "error") {
                            alert("error");
                        }
                    }
                });
            }
            return false;
        });
        var url = "http://iontheory.net/scoop/users/getUser.php?username=" + localStorage.getItem('username');
        var user = "";
        var password = "";
        var fname = "";
        var lname = "";
        console.log("settings url: " + url);
        $("#username").val(localStorage.getItem('username'));
        $.getJSON(url, function(result) {
            console.log(result);
            $.each(result, function(i, field) {
                user = field.username;
                password = field.password;
                fname = field.fname;
                lname = field.lname;
                console.log('settings ' + user);
                console.log('settings ' + password);
                console.log('settings ' + fname);
                console.log('settings ' + lname);
            });
            $("#username").val(user);
            $("#password").val(password);
            $("#fname").val(fname);
            $("#lname").val(lname);
        });
        $("#updateUser").click(function() {
            var username = $("#username").val();
            var password = $("#password").val();
            var fname = $("#fname").val();
            var lname = $("#lname").val();
            var dataString = "id=" + id + "&username=" + username + "&password=" + password + "&fname=" + fname + "&lname=" + lname + "&update=";
            $.ajax({
                type: "POST",
                url: "http://iontheory.net/scoop/users/update.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function() {
                    $("#update").val('Connecting...');
                },
                success: function(data) {
                    if (data == "success") {
                        alert("Updated");
                        $("#update").val("Update");
                    } else if (data == "error") {
                        alert("error");
                    }
                }
            });
        });
        $("#deleteUser").click(function() {
            var username = $("#username").val();
            var dataString = "username=" + username + "&delete=";
            $.ajax({
                type: "GET",
                url: "http://iontheory.net/scoop/users/delete.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function() {
                    $("#delete").val('Connecting...');
                },
                success: function(data) {
                    if (data == "success") {
                        alert("Deleted");
                        $("#deleteUser").val("Delete");
                    } else if (data == "error") {
                        alert("error");
                    }
                }
            });
        });
      });
})

$$(document).on('page:afterin', '.page[data-name="scoops"]', function (page) {
  // Do something here for "about" page
  $(document).ready(function() {
    //localStorage.setItem('someSetting', 'off');
    console.log("ran read.js");
      var url = "http://iontheory.net/scoop/categories/json.php";
      var addButton = "<div class=\"scoop add-new\">" + "<a href=\"/add-scoop/\">" + "<img src=\"./assets/img/add-icon.svg\">" + "<p>Add New</p>" + "<img src=\"./assets/img/arrow-right.svg\">" + "</a>" + "</div>";
      console.log(addButton);
      $.getJSON(url, function(result) {
          $("#listcats").append(addButton);
          console.log(result);
          $.each(result, function(i, field) {
              var id = field.ID;
              var user = field.user;
              var category = field.category;
              var color = field.color;
              Parsedcolor = color.replace("#","%23")
              $("#listcats").append("<div class='scoop " + color + " ' style='background-color:" + color + ";''><a href='/scoop/" + id + "/?id=" + id + "&user=" + user + "&category=" + category + "&color=" + Parsedcolor + "'><img src='./assets/img/social-category-icon.svg'><p>" + category + "</p><img src='./assets/img/arrow-right.svg'></a></div>");
          });
      });
      console.log(page.detail.route)
      var id = page.detail.route.query.id;
      var user = page.detail.route.query.user;
      var category = page.detail.route.query.category;
      var color = page.detail.route.query.color;
      var someSetting = localStorage.getItem('someSetting');
      console.log('some setting = ' + someSetting);
      console.log(id);
      console.log(user);
      console.log(category);
      console.log(color);
      $("#id").val(id);
      $("#username").val(user);
      $("#category").val(category);
      $("#color").val(color);
      $("#update").click(function() {
          var id = $("#id").val();
          var username = $("#username").val();
          var category = $("#category").val();
          var color = $("#color").val();
          var dataString = "id=" + id + "&user=" + username + "&category=" + category + "&color=" + color + "&update=";
          $.ajax({
              type: "POST",
              url: "http://iontheory.net/scoop/categories/update.php",
              data: dataString,
              crossDomain: true,
              cache: false,
              beforeSend: function() {
                  $("#update").val('Connecting...');
              },
              success: function(data) {
                  if (data == "success") {
                      alert("Updated");
                      $("#update").val("Update");
                  } else if (data == "error") {
                      alert("error");
                  }
              }
          });
      });
      $("#delete").click(function() {
          var id = $("#id").val();
          var dataString = "id=" + id + "&delete=";
          $.ajax({
              type: "GET",
              url: "http://iontheory.net/scoop/categories/delete.php",
              data: dataString,
              crossDomain: true,
              cache: false,
              beforeSend: function() {
                  $("#delete").val('Connecting...');
              },
              success: function(data) {
                  if (data == "success") {
                      alert("Deleted");
                      $("#delete").val("Delete");
                  } else if (data == "error") {
                      alert("error");
                  }
              }
          });
      });
      $("#insert").click(function() {
            var username = $("#username").val();
            var category = $("#category").val();
            var color = $("#color").val();
            var dataString = "user=" + username + "&category=" + category + "&color=" + color +"&insert=";
            console.log('running insert');
            console.log(username);
            console.log(category);
            console.log(color);
            console.log(dataString);
            if ($.trim(username).length > 0 & $.trim(category).length > 0 & $.trim(color).length > 0) {
                $.ajax({
                    type: "POST",
                    url: "http://iontheory.net/scoop/categories/insert.php",
                    data: dataString,
                    crossDomain: true,
                    cache: false,
                    beforeSend: function() {
                        $("#insert").val('Connecting...');
                    },
                    success: function(data) {
                        if (data == "success") {
                            alert("inserted");
                            $("#insert").val('submit');
                        } else if (data == "error") {
                            alert("error");
                        }
                    }
                });
            }
            return false;
        });
  });
})



$$(document).on('page:afterin', '.page[data-name="today"]', function (page) {
  $(document).ready(function() {
    console.log("running today");
      var url = "http://iontheory.net/scoop/categories/json.php";
      $.getJSON(url, function(result) {
          console.log(result);
          $.each(result, function(i, field) {
              var id = field.ID;
              var user = field.user;
              var category = field.category;
              var color = field.color;
              var Parsedcolor = color.replace("#","%23")
              var getVars = '?id=' + id + '&user=' + user + '&category=' + category + '&color=' + Parsedcolor;
              var checkinsText = '<div class=\'individual-scoop\'><a href=\'/checkin-scoop/' + id + '/' + getVars + '\'><img src="./assets/img/social-category-icon.svg"><p>' + category + '</p></a></div>';
              console.log(checkinsText)
              $("#listcheckins").append(checkinsText);
          });
      });
  });
})

$$(document).on('page:afterin', '.page[data-name="home"]', function (page) {
  $(document).ready(function() {
    
  });
})

$$(document).on('page:afterout', '.page[data-name="today"]', function (page) {
  // Do something here for "about" page
  $(document).ready(function() {
          $("#listcheckins").empty();

      });
});

$$(document).on('page:afterout', '.page[data-name="scoops"]', function (page) {
  // Do something here for "about" page
  $(document).ready(function() {
    //localStorage.setItem('someSetting', 'off');
    $("#listcats").empty();
  });
});



$(document).ready(function(){
  $('.cone-slider').slick({
    arrows: true,
    infinite: false,
    rtl: true
  });

    if (!localStorage.getItem('username')){
    $('.toolbar').hide();
  } else {
    $('.toolbar').show();
  }

  // localStorage.setItem('username', 'JDoe');

});
