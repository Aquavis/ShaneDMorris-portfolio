'use strict'; // #soStrict

(function(){

	// Global var declarations
	var memes,
		currentNick = '5.png',
		jsonPath = 'data/headlines.json',
		request = new XMLHttpRequest(),
		textEl = document.getElementById('tagline'),
		imageToSave = document.getElementById('save'),
		memeCache = [],
		landscapeCache = ['8.jpg'],
		nickCache = ['5'],
		counter = 0,
		bgLock = false,
		interval,
		nickLock = false;

	// Animatable elements
	var nick = document.getElementsByClassName('nick')[0],
		mint = document.getElementsByClassName('zonnic-mint')[0],
		fruit = document.getElementsByClassName('zonnic-fruit')[0],
		cinnamon = document.getElementsByClassName('zonnic-cinnamon')[0],
		stripe = document.getElementsByClassName('stripe')[0],
		bg = document.getElementsByClassName('bg')[0],
		victory = document.getElementsByClassName('victory')[0];

	// Accessing JSON & saving to variable
	request.open('GET', jsonPath);
	request.responseType = 'json';
	request.send();
	request.onload = function(){
		memes = request.response.headlines;
	}

	// Click handler for the "Randomize" button
	document.getElementById('memeGenerator').onclick = function(){
		memeMeUp();
	}

	//kill any animations and set text back to its pre-split state
	var kill = function(){
		splitTextTimeline.clear().time(0);
		mySplitText.revert();
	}

	var memeMeUp = function(){

		// Death to animations
		kill();

		if(counter<1){
			TweenMax.to(victory, 1, {opacity:1});
		}

		// So we don't try to run same animations more than once
		counter++;

		// If there's already a meme, remove it.
		if(textEl.hasChildNodes()){
			textEl.removeChild(textEl.childNodes[0]);
		}

		// Get a random item in the meme array
		var random = Math.floor(Math.random()*memes.length);

		// Consults the cache to see if it's a duplicate meme,
		// if it is, continue to loop until it's a ~PHRESH 1~
		while(contains.call(memeCache, random)){
			random = Math.floor(Math.random()*memes.length);
		}

		// Assign meme text to DOM element
		var meme = memes[random].text,
			content = document.createTextNode(meme);
		textEl.appendChild(content);

		// Animate the meme text
		TweenLite.set(textEl, {perspective:400});
		mySplitText.split({type:'words, chars'});

		// TweenMax.staggerFrom(mySplitText.chars, 0.8, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50%", ease:Back.easeOut}, 0.01, allDone);
		//
		// var allDone = function(){
		// 	mySplitText.revert();
		// }

		// Alternate animation #1
		mySplitText.words.forEach(function(el, index){
			splitTextTimeline.from(el, 0.6, {opacity:0, force3D:true}, index * 0.01);
			splitTextTimeline.from(el, 0.6, {scale:index % 2 == 0 ? 0 : 2, ease:Back.easeOut}, index * 0.01);
		});

		// Add meme to the cache
		updateCache(memeCache, random);
	}

	// Intro GSAP animations
	var tl = new TimelineLite(),
		mySplitText = new SplitText(textEl, {type:'words'}),
		splitTextTimeline = new TimelineLite();

	tl.to(bg, 1, {opacity:.75}).to(stripe, 1, {left:0, opacity:1, ease:Power4.easeInOut}, '-=.8').to(mint, 1, {x:0, opacity:1, ease:Power4.easeInOut},'-=.8').to(fruit, 1, {x:0, opacity:1, ease:Power4.easeInOut},'-=.8').to(cinnamon, 1, {x:0, opacity:1, ease:Power4.easeInOut},'-=.8').to(nick, 1, {left:0, opacity:1, ease:Power4.easeInOut}, '-=1').add(memeMeUp);

	var changeScenery = function(){

		// Prevents function from being run if it's already running.
		if(bgLock == true){
			return false;
		}
		bgLock = true;

		var images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg'];

		var bgTl = new TimelineLite();

		bgTl.to(bg, .5, {opacity:0}).add(function(){
			var newImage = images[Math.floor(Math.random() * images.length)];
			while(contains.call(landscapeCache, newImage)){
				newImage = images[Math.floor(Math.random() * images.length)];
			}
			bg.style.backgroundImage = 'url(\'images/landscapes/' + newImage + '\')';
			updateCache(landscapeCache, newImage);
		}).to(bg, .5, {opacity:.75}).add(function(){bgLock = false;});
	}

	document.getElementById('changeBg').onclick = function(){
		changeScenery();
	};

	var changeNick = function(){

		// Prevents function from being run if it's already running.
		if(nickLock == true){
			return false;
		}

		nickLock = true;

		var nicks = ['1', '2', '3', '5'];

		var nickTl = new TimelineLite();
		nickTl.to(nick, 1, {y: 500, ease:Power4.easeInOut}).add(function(){
			var newNick = nicks[Math.floor(Math.random() * nicks.length)];
			while(contains.call(nickCache, newNick)){
				newNick = nicks[Math.floor(Math.random() * nicks.length)];
			}

			nick.classList = 'nick';
			currentNick = newNick;
			nick.classList.add('_'+currentNick);
			nick.style.backgroundImage = 'url(\'images/nick/' + newNick + '.png\')';

			if (currentNick == '5'){
				nick.style.width = '320px';
			} else{
				nick.style.backgroundPosition = '0px 0px';
				nick.style.width = '44%';
			}

			updateCache(nickCache, newNick);
		}).to(nick, 1, {y:0, ease:Power4.easeInOut}).add(function(){nickLock = false;});
	}

	interval = setInterval(function(){
		console.log(currentNick);
		nick.classList.add('blink');
		setTimeout(function(){
			nick.classList.remove('blink');
		}, 200);
	}, 5000);

	document.getElementById('changeNick').onclick = function(){
		changeNick();
	};

	// Function for checking the cache to make sure we don't serve the same meme twice.
	var contains = function(needle) {
		// Per spec, the way to identify NaN is that it is not equal to itself
		var findNaN = needle !== needle;
		var indexOf;

		if(!findNaN && typeof Array.prototype.indexOf === 'function') {
			indexOf = Array.prototype.indexOf;
		} else {
			indexOf = function(needle) {
				var i = -1, index = -1;

				for(i = 0; i < this.length; i++) {
					var item = this[i];

					if((findNaN && item !== item) || item === needle) {
						index = i;
						break;
					}
				}
				return index;
			};
		}
		return indexOf.call(this, needle) > -1;
	};

	// The last 5 memes are always in the cache
	var updateCache = function(cache, x){

		if(cache==nickCache){
			// Remove first meme in array once we've reached max lvls.
			if(cache.length>2){
				cache.shift();
			}
		}
		else{
			// Remove first meme in array once we've reached max lvls.
			if(cache.length>4){
				cache.shift();
			}
		}
		// Push the phresh meme
		cache.push(x);
	}

	// Click handler to save the meme
	document.getElementById('saveMeme').onclick = function(){

		html2canvas(imageToSave, {
			onrendered: function(canvas){
				var theCanvas = canvas;
				canvas.webkitImageSmoothingEnabled = false;
				canvas.mozImageSmoothingEnabled = false;
				canvas.imageSmoothingEnabled = false;
				canvas.toBlob(function(blob){
					saveAs(blob, 'every-victory-counts.jpg');
				}, 'application/octet-stream', 1);
			}
		});
	}

})();
