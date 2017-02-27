<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head;
         any other head content must come *after* these tags -->
    <title>Facebook</title>

    <!-- Bootstrap's CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/facebook.css" rel="stylesheet">
  </head>
  <body>
    <!-- Our Facebook layout will go here. -->
    <nav class="navbar navbar-fixed-top navbar-default">
      <!-- ".container-fluid" expands to fill the entire browser view's width.
           ".container" will use the same width as the ".container" in the body,
           which contains the three columns of content.

           We want ".container" here so the navbar is the same width as the content.

           Confused? Try switching between the two container classes once you have a
           complete navbar to see the difference. -->
      <div class="container">
        <!-- This code is only active when viewing the site on mobile. We will not
             cover responsive design, but we'll leave this in, as it's part of the
             example code.-->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!-- Use a "home" glyphicon as a logo. -->
          <a class="navbar-brand" href="#">
            <!-- This is how you display a glyphicon. -->
            <span class="glyphicon glyphicon-home"></span>
          </a>
        </div>

        <!-- On mobile, this div is hidden by default. The user hits the button
             in the `navbar-header` to see the content of the div.
             On desktop, this div is visible all of the time. -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <form class="navbar-form navbar-left" role="search">
            <!-- Left-aligned items. -->
            <div class="input-group">
              <input type="text" class="form-control fb-search" placeholder="Search Facebook">
              <span class="input-group-btn">
                <button type="submit" class="btn btn-default">
                  <span class="glyphicon glyphicon-search"></span>
                </button>
              </span>
            </div>
          </form>
          <div class="nav navbar-nav navbar-right">
            <!-- Right-aligned items -->
            <div class="btn-toolbar pull-right" role="toolbar">
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-default navbar-btn">
                  John
                </button>
              </div>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-default navbar-btn">
                  Home
                </button>
              </div>
              <div class="btn-group" role="group">
                  <button type="button" class="btn btn-default navbar-btn">
                    <span class="glyphicon glyphicon-user"></span>
                    <span class="badge">5</span>
                  </button>
                  <button type="button" class="btn btn-default navbar-btn">
                    <span class="glyphicon glyphicon-comment"></span>
                    <span class="badge">5</span>
                  </button>
                  <button type="button" class="btn btn-default navbar-btn">
                    <span class="glyphicon glyphicon-globe"></span>
                    <span class="badge">5</span>
                  </button>
              </div>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-default navbar-btn">
                  <span class="glyphicon glyphicon-lock"></span>
                </button>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-default dropdown-toggle navbar-btn"
                          data-toggle="dropdown">
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">Log out...</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container -->
    </nav>
    <!-- The container for our grid. The outermost grid must be placed within
         a `container` or `container-fluid` class. (Meaning: If you nest a grid
         within a grid, you should not define another `container`)
         What's the difference between these two types of container? There's a
         good answer here: http://stackoverflow.com/a/22263969 -->
    <div class="container">
      <!-- The row that contains the three main columns of the website. -->
      <div class="row">
        <!-- Left sidebar: A cell that spans 2 columns -->
        <div class="col-md-2">
          <ul class="nav nav-pills nav-stacked">
            <li role="presentation"><a href="#">John Vilk</a></li>
            <li role="presentation">
              <a href="#"><span class="glyphicon glyphicon-pencil"></span>
              Edit Profile</a>
            </li>
            <!-- List items that are just text are not indented, and look like the
                 Facebook section labels. -->
            <li role="presentation">FAVORITES</li>
            <!-- The class "active" highlights this item in the list -->
            <li role="presentation" class="active">
              <a href="#"><span class="glyphicon glyphicon-list-alt"></span>
              News Feed</a>
            </li>
            <!-- We can use badges in pills to add numbers beside them. -->
            <li role="presentation">
              <a href="#">
                <span class="glyphicon glyphicon-comment"></span> Messages
                <span class="badge">7</span>
              </a>
            </li>
            <li role="presentation">
              <a href="#"><span class="glyphicon glyphicon-calendar"></span>
              Events</a>
            </li>
            <li role="presentation">
              <a href="#"><span class="glyphicon glyphicon-picture"></span>
              Photos</a>
            </li>
            <li role="presentation">
              <a href="#"><span class="glyphicon glyphicon-gift"></span>
              Gifts</a>
            </li>
            <!-- "Saved" also has a number beside it. -->
            <li role="presentation">
              <a href="#">
                <span class="glyphicon glyphicon-bookmark"></span>
                Saved
                <span class="badge">2</span>
              </a>
            </li>
            <li role="presentation">
              <a href="#"><span class="glyphicon glyphicon-tags"></span>
              Sale Groups</a>
            </li>
            <li role="presentation">PAGES</li>
            <li role="presentation">
              <a href="#"><span class="glyphicon glyphicon-plus"></span>
              Create Page</a>
            </li>
            <li role="presentation">
              <a href="#"><span class="glyphicon glyphicon-signal"></span>
              Create Ad</a>
            </li>
            <li role="presentation">GROUPS</li>
            <li role="presentation">
              <a href="#"><span class="glyphicon glyphicon-plus"></span>
              Create Group</a>
            </li>
            <li role="presentation">
              <a href="#"><span class="glyphicon glyphicon-user"></span>
              New Groups</a>
            </li>
            <li role="presentation">FRIENDS</li>
            <li role="presentation">
              <a href="#"><span class="glyphicon glyphicon-pushpin"></span>
              Amherst, MA</a>
            </li>
          </ul>
        </div>
        <!-- Main feed: A cell that spans 7 columns -->
        <div class="col-md-7">
          Main Feed
          <div style="height: 99999px;">

          </div>
        </div>
        <!-- Right sidebar: A cell that spans 3 columns -->
        <div class="col-md-3">
          <!-- Nested grid! Like the outer grid, it's just a sequence of rows. -->
          <!-- Ticker. -->
          <div class="row">
            <div class="col-md-12">
              <a href="#" class="pull-right">
                <span class="glyphicon glyphicon-download-alt"></span>
              </a>
            </div>
          </div>
          <!-- Birthday -->
          <div class="row">
            <div class="col-md-12">
              <span class="glyphicon glyphicon-gift"></span>
              <a href="#">Zak</a> and <a href="#">1 other</a>
            </div>
          </div>
          <!-- Trending -->
          <div class="row">
            <div class="col-md-12 fb-trending">
              <div class="row">
                <div class="col-md-4 fb-trending-title">
                  TRENDING
                </div>
                <div class="col-md-8">
                  <ul class="nav nav-pills">
                    <li role="presentation" class="active">
                      <a href="#"><span class="glyphicon glyphicon-flash"></span></a>
                    </li>
                    <li role="presentation"><a href="#">
                        <span class="glyphicon glyphicon-tower"></span>
                        </a></li>
                    <li role="presentation"><a href="#">
                        <span class="glyphicon glyphicon-sunglasses"></span>
                        </a></li>
                    <li role="presentation"><a href="#">
                        <span class="glyphicon glyphicon-record"></span>
                        </a></li>
                    <li role="presentation"><a href="#">
                        <span class="glyphicon glyphicon-facetime-video"></span>
                        </a></li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <ul class="media-list">
                    <li class="media">
                      <div class="media-left media-top">
                        <span class="glyphicon glyphicon-flash"></span>
                      </div>
                      <div class="media-body">
                        <a href="#">George Lucas</a>: Filmmaker Criticizes New
                        "Star Wars" Film and Direction of Franchise Under
                        Disney
                      </div>
                    </li>
                    <li class="media">
                      <div class="media-left media-top">
                        <span class="glyphicon glyphicon-flash"></span>
                      </div>
                      <div class="media-body">
                        <a href="#">Super Smash Bros.</a>: Game Glitch Allows
                        Players to Control 8 Characters With 1 Controller
                      </div>
                    </li>
                    <li class="media">
                      <div class="media-left media-top">
                        <span class="glyphicon glyphicon-flash"></span>
                      </div>
                      <div class="media-body">
                        <a href="#">Tuukka Rask</a>: Boston Bruins Player
                        Debuts Goalie Mask for Winter Classic
                      </div>
                    </li>
                    <li class="media">
                      <div class="media-left media-top">
                        <span class="caret"></span>
                      </div>
                      <div class="media-body">
                        <a href="#">See More</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- Suggested Pages -->
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-8">
                  SUGGESTED PAGES
                </div>
                <div class="col-md-4">
                  <a href="#" class="pull-right">See All</a>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <img src="img/falafel.jpg" width="100%" />
                  <br><a href="#">Pita Pocket's</a>
                  <br> Mediterranean Restaurant · 301 likes
                  <br><button type="button" class="btn btn-default">
                  <span class="glyphicon glyphicon-thumbs-up">
                  </span> Like Page</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-popup">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8">
            <span class="green">●</span> Chat (32)
          </div>
          <div class="col-md-4">
            <div class="btn-group pull-right" role="group">
              <button type="button" class="btn btn-xs">
                <span class="glyphicon glyphicon-pencil"></span>
              </button>
              <button type="button" class="btn btn-xs">
                <span class="glyphicon glyphicon-asterisk"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below),
         or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
