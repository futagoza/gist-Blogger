gist-Blogger
============
<center><small>A simple way to embed gist into Blogger's dynamic view. Orignally by [Moski Doski](http://moski.me), optimised and edited by [Futago-za Ryuu](http://gplus.to/futagoza).</small></center>

## Usage

At the end of each of your blog posts, include the following code using the HTML editor:

    <script src="https://raw.github.com/thedailygoza/gist-Blogger/master/gistBlogger.min.js" type="text/javascript"></script>

Now to include any gist template just add the following anywhere in your blog post:

	<div class="gistLoad" data-id="GistID">Loading ....</div>

To get individual files from a gist, use:

	<div class="gistLoad" data-id="GistID" data-file="FileName">Loading ....</div>

In both, replace "GistID" with your gist id and "FileName" with your filename


## Development

If you want to work with this script locally, you can clone the repo using:

	git clone git@github.com:thedailygoza/gist-Blogger.git

You can also just copy the source code of the non-minified file:

	https://raw.github.com/thedailygoza/gist-Blogger/master/gistBlogger.js


## Thanks

* [Moski Doski](http://moski.me) for the orignal version.