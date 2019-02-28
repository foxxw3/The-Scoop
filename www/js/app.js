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

$$(document).on('page:afterin', '.page[data-name="scoops"]', function (page) {
  // Do something here for "about" page
  $(document).ready(function() {
    //localStorage.setItem('someSetting', 'off');
    console.log("ran read.js");
      var url = "http://iontheory.net/scoop/categories/json.php";
      $.getJSON(url, function(result) {
          console.log(result);
          $.each(result, function(i, field) {
              var id = field.ID;
              var user = field.user;
              var category = field.category;
              var color = field.color;
              $("#listcats").append("<a class='item' href='/scoop/" + id + "/?ID=" + id + "&user=" + user + "&category=" + category + "&color=" + color + "'><span class='item-note'>" + category + "</span><h2>" + user + " </h2><p>" + color + "</p></a>");
          });
      });
  });
})

$$(document).on('page:afterout', '.page[data-name="scoops"]', function (page) {
  // Do something here for "about" page
  $(document).ready(function() {
    //localStorage.setItem('someSetting', 'off');
    console.log("ran read.js");
    $("#listcats").empty();
  });
});

$$(document).on('page:afterin', '.page[data-name="scoops"]', function (page) {
  console.log('page query: ' + page.query);
    $(document).ready(function() {
        var id = page.query.ID;
        var user = page.query.user;
        var category = page.query.category;
        var color = page.query.color;
        var someSetting = localStorage.getItem('someSetting');
        console.log('some setting = ' + someSetting);
        console.log(id);
        console.log(user);
        console.log(category);
        console.log(color);
        $("#id").val(id);
        $("#username").val(username);
        $("#password").val(password);
        $("#fname").val(fname);
        $("#lname").val(lname);
        $("#update").click(function() {
            var id = $("#id").val();
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
        $("#delete").click(function() {
            var id = $("#id").val();
            var dataString = "id=" + id + "&delete=";
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
                        $("#delete").val("Delete");
                    } else if (data == "error") {
                        alert("error");
                    }
                }
            });
        });
      });
});
