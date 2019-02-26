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
              $("#listcats").append("<div class='scoop " + color + "'><a href='/scoop/" + id + "/'><img src='./assets/img/social-category-icon.svg'><p>" + category + "</p><img src='./assets/img/arrow-right.svg'></a></div>");
          });
      });
  });
})

$$(document).on('page:afterin', '.page[data-name="today"]', function (page) {
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
              $("#listcheckins").append("<div class='individual-scoop'><a href='/checkin-scoop/" + id + "/'><img src='./assets/img/social-category-icon.svg'><p>" + category + "</p></a></div>");
          });
      });
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
    console.log("ran read.js");
    $("#listcats").empty();
});
});
