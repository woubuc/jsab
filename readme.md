# jsAB
Simple A/B testing with jQuery and Google Analytics

## What it does
jsAB is a simple client-side piece of Javascript that let you do A/B tests on websites without needing a back-end. All data is sent to Google Analytics as custom dimensions, for you to analyse as you like.

When a visitor first loads your site, one of the configured versions is selected randomly and displayed. A cookie is set so that each visitor will keep seeing the same version.

## Getting started
To use jsAB on your site, all you need to do is add the script in your page, and configure the versions you want to test.

### What you need
- A website (duh)
- jQuery
- jsab.js
- Google Analytics _(only analytics.js is supported, not the old ga.js)_

Find the latest version in [build/jsab.js](https://raw.githubusercontent.com/woubuc/jsab/master/build/jsab.js)

### Sample code
Because a code example is the best way to see how to use it.

Create a jsAB instance on one or more elements:
```javascript
$('selector').jsab({

	// GA dimension index
	dimension: 1,

	// Default value (if no changes are applied)
	default: 'red'

	// Alternative versions
	versions: [
		{
			name: 'blue',
			className: 'blue'
		}
	]
});
```

In your HTML page, remove the `ga('send', 'pageview')` from your Google Analytics code. Because jsAB adds additional data to the pageview, it will take care of sending the pageview after it has added the custom dimensions to the request. See the configuration option `send` below if you want to disable this.
```html
<!doctype html>
<html>
	<head>
		<style type="text/css">
			button { background: red; }
			button.blue { background: blue; }
		</style>
		<script>
			// Google analytics code
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-ID-HERE', 'auto');
			// Don't put the ga('send', 'pageview') on your page.
		</script>
	</head>
	<body>
		<div id="box">
			<button>Hello world</button>
		</div>
	</body>
</html>
```

### All configuration options

| Property  | Required | Description |
| --------- | -------- | ----------- |
| dimension | **yes**  | Google Analytics dimension index |
| default   | **yes**  | Default value |
| versions  | **yes**  | Array containing different versions of the element |
| id        | no       | A unique ID (number or string) to identify this A/B test |
| send      | no       | Default: `true`. Set this to false to prevent jsAB from sending the pageview |


### Development mode
While you're working on your site, you may want to view the different versions. Add `#!dev` to your page to disable the jsAB cookie.

## Contributing
I welcome PR's, bug reports, suggestions and all that.
