<?php

require_once(__DIR__."/lib/app.php");

class App extends AppOrigin {

	public function __construct() 
    { 

        // Assets Cached build files
        if(file_exists(__DIR__.'/../public/assets/build/js/')) {
            $this->assetsBuildJs = array_slice(scandir(__DIR__.'/../public/assets/build/js/'), 2)[0];
        }
        if(file_exists(__DIR__.'/../public/assets/build/css/')) {
            $this->assetsBuildCss = array_slice(scandir(__DIR__.'/../public/assets/build/css/'), 2)[0];
        }
        
    }
  
  
  // EXAMPLE
  //
  //  <link href="{{ conf.assets }}build/css/{{ conf.assetsBuildCss }}" rel="stylesheet">
  //
  //

}
