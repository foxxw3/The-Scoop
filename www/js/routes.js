routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/today/',
    componentUrl: './pages/today.html',
  },
/*  {
    path: '/checkins/',
    componentUrl: './pages/checkins.html',
  },*/
  {
    path: '/checkin-scoop/',
    componentUrl: './pages/checkin-scoop.html',
  },
  {
    path: '/scoops/',
    componentUrl: './pages/scoops.html',
  },
  {
    path: '/scoop/:id/',
    componentUrl: './pages/scoop.html',
  },
  {
    path: '/add-scoop/',
    componentUrl: './pages/add-scoop.html',
  },
  {
    path: '/settings/',
    url: './pages/settings.html',
  },
  {
    path: '/checkingroup/',
    url: './pages/checkingroup.html',
  },
  {
    path: '/login/',
    url: './pages/login.html',
  },
  {
    path: '/sign-up/',
    url: './pages/sign-up.html',
  },
  {
    path: '/scoop-set-up/',
    url: './pages/scoop-set-up.html',
  },
  // Page Loaders & Router
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/request-and-load.html',
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
