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

### Sample code
Because a code example is the best way to see how to use it.

```javascript
$('selector').jsab({

	// GA dimension index
	// Aliases: index, dimensionIndex
	dimension: 1,

	// Default value (if no changes are applied)
	// Aliases: default
	defaultVersion: 'red'

	// Alternative versions
	// Aliases: alternatives
	versions: [
		{
			name: 'blue',
			className: 'blue'
		}
	]
});
```

```html
<style type="text/css">
button { background: red; }
button.blue { background: blue; }
</style>
<div id="box">
	<button>Hello world</button>
</div>
```

### All configuration options
_will be added soon_