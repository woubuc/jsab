###
jsAB by woubuc | github.com/woubuc/jsAB
Inspired by easyAB by _srom | srom.github.io/easyAB
###

(($) ->

	_cookieName = 'jsab_version'
	_version = null

	# Sets jsAB cookie to value
	_setCookie = (value) ->

		# Set cookie to expire in 30 days
		date = new Date()
		date.setTime(date.getTime()+(30*24*60*60*1000))
		expires = '; expires=' + date.toGMTString()

		# Create cookie 🍪
		document.cookie = _cookieName + '=' + value + expires + '; path=/'


	# Get value from jsAB cookie
	_readCookie = ->

		# Cookie name
		name = _cookieName + '='

		# Get cookiestring
		cookies = document.cookie.split(';')

		# Go through each cookie
		for i in cookies

			# Remove leading spaces
			i = i.substring(1, i.length) while i.charAt(0) is ' '

			# Check if this is The One™
			if i.indexOf(name) is 0

				# Get its value
				return i.substring(name.length, i.length)

		# No cookies found
		# Cookie Monster sad :(
		return null


	_render = (nodes) ->
		nodes.each ->

			# Add class if set
			if _version.className
				$(this).addClass(_version.className)

			# Change text or html if set
			if _version.text
				$(this).text(_version.text)
			else if _version.html
				$(this).html(_version.html)

			# Execute funtion if set
			if _version.version or _version.fn or _version.function
				fn = _version.version or _version.fn or _version.function
				fn(this)


	$.fn.jsab = (options) ->
		return if not options or typeof options isnt 'object' or not navigator.cookieEnabled

		# Check if we're in dev mode
		devMode = window.location.hash.indexOf('!dev') isnt -1

		# Get dimension index
		index = options.index or options.dimension or options.dimensionIndex
		return if not index

		# Get default version
		defaultVersion = options.defaultVersion or options.default
		return if not defaultVersion

		# Get alternative versions
		versions = options.versions or options.alternatives
		return if not versions

		# Add test ID to cookiename
		if options.id?
			_cookieName += '_' + options.id

		# Add default value to list
		versions.unshift(name: defaultVersion)

		# Get version from cookie if we're not in dev mode
		version = _readCookie() unless devMode

		if not version
			# Select a random version if no version is set
			version = Math.floor(Math.random() * versions.length)

			# Save generated version in cookie if we're not in dev mode
			_setCookie(version) unless devMode

		# Store version data
		_version = versions[version]

		# Set dimension in Google Analytics
		window.ga('set', 'dimension' + index, _version.name)

		# Render the variations
		_render(this)

		# Whether or not to send pageview
		send = switch
			when options.send? then options.send
			when options.sendPageview? then options.sendPageview
			when options.pageview? then options.pageview
			else yes

		# Send pageview
		if send
			window.ga('send', 'pageview')


)(window['jQuery'])
