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
          time: '12:00PM'
        },
        {
          id: '2',
          title: 'Afternoon',
          time: '12:00PM'
        },
        {
          id: '3',
          title: 'Night',
          time: '12:00PM'
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
