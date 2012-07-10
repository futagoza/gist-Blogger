/*!
 * gistBlogger.js
 * © 2012 The Daily Go-za
 */
// Will only load whan the page is ready
jQuery(document).ready(function($){
	
	// Enable or disable logging
	var LOGGING = false,
		
		// a list of scripts to load
		scripts = [];
	
	// Shortcut for `console.log` that checks if logging is enabled.
	function log ( ) {
		if ( LOGGING ) {
			console.log.apply(console, arguments);
		}
	}
	
	// Loads the next script
	function next ( ) {
		var script;
		if ( scripts.length >= 0 ) {
			script = scripts.shift();
			if ( script ) {
				loadScript(script);
			}
		} else {
			delete scripts.loading;
		}
	}
	
	// Load a gist file using the given jQuery object
	function loadScript ( jQueryObj ) {
		
		// Current jquery/div element
		var _ = jQueryObj,
			
			// Current gist id
			id = _.data("id"),
			
			// `cache` contains the data coming from the replaced `document.write`
			cache = [],
			
			// Backup original `document.write` & `document.writeln`
			writes = [document.write, document.writeln],
		
			// Reservend for later use
			file, url, el;
		
		// Only contnue if theres a valid id
		if ( typeof id !== 'number' ) {
			return;
		} else {
			// Current gist file (Optional) & url of current gist file
			file = _.data("file");
			url = "https://gist.github.com/" + id + ".js" + (typeof file === 'string' ? "?file=" + file : "");
		}
		
		// Replace `document.write` & `document.writeln`'
		document.write = function ( data ) {
			log('writing: `' + data.replace(/\n\r\t/,'') + '`');
			cache.push(data);
		};
		document.writeln = function ( data ) {
			document.write(data + '\n');
		};
		
		log("Loading `" + url + "`");
		el = document.createElement('script');
		el.setAttribute('src', url);
		
		// Set the onload function to deal with the rest
		el.onload = function ( ) {
			log("finished loading the script");
			
			// Write the cached data to the current jquery/div element
			_.html(cache.join(''));
			
			// Restore original `document.write` & `document.writeln`
			document.write = writes[0];
			document.writeln = writes[1];
			
			// Load the next script
			next();
		};
		
		// append the child and force the onload event.
		document.body.appendChild(el);
	}
	
	log('Finding all dom objects with class `.gistLoad`');
	$('.gistLoad').each(function(){
		
		// Add the current dom object to the scripts array as a jquery object
		scripts.push($(this));
		
		// Only continue if theres nothing loading
		if ( !scripts.loading ) {
			scripts.loading	 = true;
			
			// Load the next script
			next();
		}
		
	});
	
});