# NMS-MFD CSS Theme 

No Man's Sky starcraft cockpit Multi-Function Displays via simple CSS theme and HTML5 template.

No Man's Sky is more than a game. Others have waxed philosphic on that matter better than I could. But it is also a really excellent game!
For the ubernerds and superfans out there that might want to turn up their play-time immersion to level 11:
get yourself a tablet, mobilephone, laptop (or two or three or four) and set it up like an extension of the on-screen cockpit. Then load up one of these pages in the device(s) and hopefully you will feel it a reasonably convincing match to the cockpit displays in the game.

Recommendation: also check out these great websites for more awesome and actually useful "MFDs":
 - Assistant for No Man's Sky  (web app and mobile app)
 - https://portalrepository.com/
 - and of course the official [Galactic Atlas](https://galacticatlas.nomanssky.com/).


# Setup and Usage
You will probably need to serve this up somehow so that your device webbrowser can navigate to it. You could do it with GitHub pages, or something like https://gist.github.com/willurd/5720255
- quick and dirty oneliner serving  and/or a hyperlink thereto
	'- an optional dockerfile , of course.
full screen note?


# Credits
"Inter" typeface by rsms.me
Hello Games visual style, layout, concept, terms
The community-minded coders and web designers all throughout the world wide web (thanks for the vignette code, animation techniques, etc.)


# License
[MIT](https://rem.mit-license.org/license.htm)


# TODO:
 - proper linting of css, html, js

 - replicate "canonical" displays: 
	- ship id/status
	x ships weapons
	- ship speed ( + pulse engine "throttle", pulse engine fuel )
	- locality (planetary approach/summary)
		- get the little status bar to be glued/pinned to the bottom without messing up the rest of flow
		- figure out the little status bar text. "AZIMUTH 00J"? "ABM TH MJ"?  or maybe just replace with reasonably interesting sciency thing like planetary mass and/or derived gravitational factor.
		- svg needs refinement: fainter, but the lat/long lines on the back (just a fainter ellipse) + better grav shadow centering 
		- larger empty pill, possible location line diagonal

 - custom display: basic To-Do/notetaking app
	- feature: simple/efficient coordinate entry. supercool-next-level: webcame take photo of screen, submit to tesseract OCR service, receive extracted surface coordinates, add as point-of-interest locus list item

 - custom display: motd: default set is a bittersweet kierkegaardian quotes and NMS-esque poems.

 - custom dipslay: portal catalog (possibly fed by portalrepository.com)

 - custom display: simple 10-key calculator (semi-scientific, + universal constants like c, h (planck), G, e (electron charge), Z (impedance of freespace), m{p,e,n} (mass of proton, electron, neutron),  boltzmann (energy in a gass with observed temp) )
	- pi, phi (golden ratio), i (imaginary unit),e (euler), omega 

 - custom display: simple PoI list, system > planet > surface coord. shareable . Some kind of foreward-and-backward portal code cross-referencing

 - custom display: simple To-Do/task list. shareable. Obivously the game has lots of great streamlined, guided features in this category, but when you have some big building or RP project, nice to have an option.

 - custom display: irc/matrix/xmpp/discord channel "feed" . A "comms" screen. in shared mode: a red-alert/panic button which alerts all other tuned in players.

 - custom display: rules and/or coordinated implementation of Rock, Paper, Scissors, Lizard, Spock. But: Gek, Vy'Keen, Korvax, Sentinel, Anomaly

 - branch out a little and find some other displays, such as those on freighters and stations that might fit in as well.


 - the bar on the top is a multi-function: 
	- datagram showing with positive affirmation that data is flowing, 
	- which function-views have new-data/alert 
	x also a kind of simple Nav

 - visual effects overlay toggle, fullscreen toggle, sounds toggle
 - on closer examination of the overlay projection and glitching effects, probably need a little overhaul, if matching and authenticity are (a/)the goal. Particularly the flicker and larger display projection scan line things

 - wipe-in could use a little more attention. Just a tiny delay before it starts and it needs a vertical leading edge/thin bar, maybe add in page load sound effect

 - limited special sauce data feed retrieval
	- https://portalrepository.com/
	- locally extract and translate save data (player name, ship name, etc)

 - create an _optional_ sharing backend. Then for things like to-do lists, and Points of Interest, you can share with your friends. simple "channel-name" as key

 - howler sfx
	- optional technique to maybe even map-in/acquire sfx from the game assets
		- select/engage/double-click-in
		- typing out text
		- threat alarm
		- incoming transmission
		- autopilot

 - some gentle animations, maybe even slight touch-oriented interactivity.
 	+ svg circle for instance can definitely do a nice     transform: rotate(45deg);
	- span of &blocks; can be counted and randomized or modulus incremented.
	- hover and press classes that do things like increase brightness or make it white and maybe glow more

 - clean up, extract styling on the primary table in weapons.html, turn it into proper rules and classes in nms-mfd.css

 - "wipe effect" for page transitions (and sound effect from game)


 - improve the screensize "responsiveness" . when a screen is too much of a wide screen, i.e., aspect ratio, screen ends up "too tall" and overflows

 - PWA stuff (Progressive Web App standards and conventions and quality) 
	x basic manifest.json
	? service workers? 
	- _better_ favicon (also probably a more complete set of them for all the different platforms and spec lines in manifest, accordingly)
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
		<link rel="manifest" href="/site.webmanifest">

 - "native" apk packaging/appification and/or is there an option for apple? Probably not.

More externalish and far-out-there stuff
 - script/tool/sheets-overrides to merge/enhance Assistant for NMS to look more like this.
 - winamp/foobar theme
 - links/integration with SNiS web console + mission script for SNiS that is "set in the Euclid Galaxy" and throw in lots of references and maybe a few easter eggs
