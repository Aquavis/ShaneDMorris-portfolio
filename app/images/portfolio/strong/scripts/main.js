"use strict";function getCookie(e){var t=document.cookie,a=e+"=",o=t.indexOf("; "+a);if(-1==o){if(0!=(o=t.indexOf(a)))return null}else{o+=2;var n=document.cookie.indexOf(";",o);-1==n&&(n=t.length)}return decodeURI(t.substring(o+a.length,n))}function rand(e){return Math.floor(Math.random()*e)}function getRandomInt(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}function shuffle(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),o=[e[a],e[t]];e[t]=o[0],e[a]=o[1]}return e}function containsObject(e,t){var a;for(a=0;a<t.length;a++)if(JSON.stringify(t[a])===JSON.stringify(e)){piecesCollected++;var o=t.indexOf(t[a]);return t.splice(o,1),cellsToBeCleared.push(e),!0}return!1}function changeBrightness(e,t){var a=document.createElement("canvas");a.width=200,a.height=200;var o=a.getContext("2d");o.drawImage(t,0,0,200,200);for(var n=o.getImageData(0,0,200,200),i=0;i<n.data.length;i+=4)n.data[i]=n.data[i]*e,n.data[i+1]=n.data[i+1]*e,n.data[i+2]=n.data[i+2]*e;o.putImageData(n,0,0);var r=new Image;return r.src=a.toDataURL(),$(a).remove(),r}function trackCustomEvent(e){window.gtag&&gtag("event",e.action,{event_category:e.category,event_label:e.label})}function displayVictoryMess(e){var t=getCookie("alreadyPlayed");!1===e&&(victorious=!1),trackCustomEvent(e?{category:"Warp Speed Game",action:"Won Maze Game - "+gameDifficulty,label:endTime}:{category:"Warp Speed Game",action:"Lost Maze Game",label:gameDifficulty}),trackCustomEvent({category:"Warp Speed Game",action:"Finished Maze Game",label:t}),clearInterval(timerInterval),clearInterval(redrawObjects),$(".slider").slick("slickGoTo",7),$(".victorious, .loser, .loser-no-toys").removeClass("show"),e?($(".maze-time-taken").html(endTime),$("#difficulty-beaten").html(gameDifficulty),$(".victorious").addClass("show")):piecesCollected>=1&&piecesCollected<6?($(".loser h3").html("You found "+piecesCollected+" of the&nbsp;toys!"),$(".loser h4").html("Try again to find them all."),$(".loser").addClass("show")):6===piecesCollected?($(".loser h3").html("Oh no!"),$(".loser h4").html("You found the toys but ran out of time!"),$(".loser").addClass("show")):$(".loser-no-toys").addClass("show"),$("#maze-time-left").removeClass("show"),getCookie("sharedGame")&&($("#share-to-unlock").html("Keep on sharing!"),$(".end-card p").html("Thanks for playing! Share again to keep supporting The Strong's expansion.")),setTimeout(function(){$("#maze-time-left").removeClass()},500)}function toggleVisablity(e){"visible"==document.getElementById(e).style.visibility?document.getElementById(e).style.visibility="hidden":document.getElementById(e).style.visibility="visible"}function Maze(e,t){var a,o,n,i=e,r=t,s=["n","s","e","w"],c={n:{y:-1,x:0,o:"s"},s:{y:1,x:0,o:"n"},e:{y:0,x:1,o:"w"},w:{y:0,x:-1,o:"e"}};this.map=function(){return a},this.startCoord=function(){return o},this.endCoord=function(){return n},function(){a=new Array(r);for(var e=0;e<r;e++){a[e]=new Array(i);for(var t=0;t<i;++t)a[e][t]={n:!1,s:!1,e:!1,w:!1,visited:!1,priorPos:null}}}(),function(){var e=document.getElementById("mazeContainer");switch(rand(4)){case 0:$(e).addClass("top-left"),o={x:0,y:0},n={x:r-1,y:i-1};break;case 1:$(e).addClass("bottom-left"),o={x:0,y:i-1},n={x:r-1,y:0};break;case 2:$(e).addClass("top-right"),o={x:r-1,y:0},n={x:0,y:i-1};break;case 3:$(e).addClass("bottom-right"),o={x:r-1,y:i-1},n={x:0,y:0}}}(),function(){for(var e=!1,t=!1,o=1,n=0,d=0,l={x:0,y:0},h=i*r;!e;){t=!1,a[l.x][l.y].visited=!0,n>=d&&(shuffle(s),d=Math.round(rand(r/8)),n=0),n++;for(var u=0;u<s.length;u++){var m=s[u],p=l.x+c[m].x,y=l.y+c[m].y;if(p>=0&&p<i&&y>=0&&y<r&&!a[p][y].visited){a[l.x][l.y][m]=!0,a[p][y][c[m].o]=!0,a[p][y].priorPos=l,l={x:p,y:y},o++,t=!0;break}}t||(l=a[l.x][l.y].priorPos),h==o&&(e=!0)}}()}function startTimer(e){function t(){a=e-((Date.now()-n)/1e3|0),o=a%60|0,document.querySelector("#maze-time-left").textContent=o,a<=0&&(n=Date.now()+1e3),o<=0&&(displayVictoryMess(!1),clearInterval(timerInterval),clearInterval(timeElapsedInterval),player.unbindKeyDown())}clearInterval(timerInterval),clearInterval(timeElapsedInterval);var a,o,n=Date.now();t(),timerInterval=setInterval(t,1e3),timeElapsedInterval=setInterval(function(){endTime=e-(o+5)},1e3)}function DrawMaze(e,t,a){function o(e,a,o){var n=e*m,i=a*m;0==o.n&&(t.beginPath(),t.moveTo(n,i),t.lineTo(n+m,i),t.strokeStyle="#1AA2DC",t.stroke()),!1===o.s&&(t.beginPath(),t.moveTo(n,i+m),t.lineTo(n+m,i+m),t.strokeStyle="#1AA2DC",t.stroke()),!1===o.e&&(t.beginPath(),t.moveTo(n+m,i),t.lineTo(n+m,i+m),t.strokeStyle="#1AA2DC",t.stroke()),!1===o.w&&(t.beginPath(),t.moveTo(n,i),t.lineTo(n,i+m),t.strokeStyle="#1AA2DC",t.stroke())}function n(){for(var e=0;e<u.length;e++)for(var t=0;t<u[e].length;t++)o(e,t,u[e][t])}function i(){for(var a=e.endCoord(),o=m/4-2,n=!0,i=0;i<4;i++){n=!n;for(var r=0;r<4;r++)t.beginPath(),t.rect(a.x*m+r*o+4.5,a.y*m+i*o+4.5,o,o),t.fillStyle=n?"rgba(0, 0, 0, 0.8)":"rgba(255, 255, 255, 0.8)",t.fill(),n=!n}}function r(){var a=m/50,o=m/25,n=e.endCoord();t.drawImage(h,2,2,h.width,h.height,n.x*m+a,n.y*m+a,m-o,m-o)}function s(){for(var e=0;e<randomObjects.length;e++){var t=randomCoordinates[e].x*a,o=randomCoordinates[e].y*a,n=t/a,i=o/a;randomObjects[e].setAttribute("data-coord-x",t),randomObjects[e].setAttribute("data-coord-y",o),randomObjects[e].setAttribute("data-relative-coord-x",n),randomObjects[e].setAttribute("data-relative-coord-y",i),randomObjects[e].setAttribute("crossOrigin","")}}function c(){if(randomObjCoordLocation.length<6)for(var e=0;e<randomObjects.length;e++){var t={x:Math.round(Number(randomObjects[e].getAttribute("data-relative-coord-x"))),y:Math.round(Number(randomObjects[e].getAttribute("data-relative-coord-y")))};randomObjCoordLocation.push(t)}}function d(){for(var e=0;e<randomObjects.length;e++)t.drawImage(randomObjects[e],2,2,randomObjects[e].width,randomObjects[e].height,randomObjects[e].getAttribute("data-coord-x"),randomObjects[e].getAttribute("data-coord-y"),m,m)}var l,h=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,u=e.map(),m=a;t.lineWidth=m/25,this.redrawMaze=function(e){m=e,t.lineWidth=m/25,n(),l()},this.redrawMap=function(){n()},function(){randomObjects=[pieceOne,pieceTwo,pieceThree,pieceFour,pieceFive,pieceSix];do{!function(){var e=getRandomInt(1,8),t=getRandomInt(1,8);!function(a,o){for(var n=0;n<a.length;n++)if(JSON.stringify(a[n])===JSON.stringify(o)){var i=a.indexOf(a[n]);return a.splice(i,1),!1}randomCoordinates.unshift({x:e,y:t})}(randomCoordinates,{x:e,y:t})}(),randomCoordinates.length===randomObjects.length&&(s(),c())}while(randomCoordinates.length<randomObjects.length)}(),l=null!=h?r:i,function(){var e=m*u.length;t.clearRect(0,0,e,e)}(),n(),l(),d(),redrawObjects=setInterval(function(){var e=m/50,a=m/25;if(null!=player){d();for(var o=0;o<this.cellsToBeCleared.length;o++)t.clearRect(this.cellsToBeCleared[o].x*m+e,this.cellsToBeCleared[o].y*m+e,m-a,m-a),this.draw.redrawMap(),player.redrawPlayer(m)}},1e3);var p=m/50,y=m/25;window.onresize=function(){if(null!=player){d();for(var e=0;e<this.cellsToBeCleared.length;e++)t.clearRect(this.cellsToBeCleared[e].x*m+p,this.cellsToBeCleared[e].y*m+p,m-y,m-y),this.draw.redrawMap()}}}function Player(e,t,a,o){function n(t){l.beginPath(),l.fillStyle="yellow",l.arc((t.x+1)*p-y,(t.y+1)*p-y,y-2,0,2*Math.PI),l.fill(),piecesCollected<6&&t.x===e.endCoord().x&&t.y===e.endCoord().y&&(redrawEndOnNextMove=!0),piecesCollected>=6&&t.x===e.endCoord().x&&t.y===e.endCoord().y&&(o(moves),h.unbindKeyDown())}function i(t){var a=p/50,n=p/25;l.drawImage(d,0,0,d.width,d.height,t.x*p+a,t.y*p+a,p-n,p-n),piecesCollected<6&&t.x===e.endCoord().x&&t.y===e.endCoord().y&&(redrawEndOnNextMove=!0),piecesCollected>=6&&t.x===e.endCoord().x&&t.y===e.endCoord().y&&(o(moves),h.unbindKeyDown())}function r(e){var t=p/50,a=p/25;l.clearRect(e.x*p+t,e.y*p+t,p-a,p-a)}function s(e){function t(e,t){if(containsObject(e,t),redrawEndOnNextMove){var a=piecesCollected;p=mazeCanvas.width/cellCount,draw.redrawMaze(p),redrawEndOnNextMove=!1,piecesCollected=a}}var a=u[m.x][m.y];switch(moves++,e.keyCode){case 65:case 37:1==a.w&&(r(m),m={x:m.x-1,y:m.y},t(m,randomObjCoordLocation),c(m)),draw.redrawMap();break;case 87:case 38:1==a.n&&(r(m),m={x:m.x,y:m.y-1},t(m,randomObjCoordLocation),c(m)),draw.redrawMap();break;case 68:case 39:1==a.e&&(r(m),m={x:m.x+1,y:m.y},t(m,randomObjCoordLocation),c(m)),draw.redrawMap();break;case 83:case 40:1==a.s&&(r(m),m={x:m.x,y:m.y+1},t(m,randomObjCoordLocation),c(m)),draw.redrawMap()}}var c,d=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,l=t.getContext("2d");c=n,null!=d&&(c=i);var h=this,u=e.map(),m={x:e.startCoord().x,y:e.startCoord().y},p=a,y=p/2;this.redrawPlayer=function(e){p=e,i(m)},this.bindKeyDown=function(){window.addEventListener("keydown",s,!1),$("#view").swipe({swipe:function(e,t,a,o,n,i){switch(t){case"up":s({keyCode:38});break;case"down":s({keyCode:40});break;case"left":s({keyCode:37});break;case"right":s({keyCode:39})}},threshold:0})},this.unbindKeyDown=function(){window.removeEventListener("keydown",s,!1),$("#view").swipe("destroy")},c(e.startCoord()),this.bindKeyDown()}function resetVariables(){randomObjects=void 0,randomObjCoordLocation=[],objsRandomized=!1,piecesCollected=0,moves=0,redrawEndOnNextMove=!1,victorious=!0,randomCoordinates=[],cellsToBeCleared=[]}function makeMaze(){var e=document.getElementById("mazeContainer");$(e).removeClass(),void 0!=player&&(player.unbindKeyDown(),player=null);document.getElementById("diffSelect");cellCount=10,cellSize=mazeCanvas.width/cellCount,maze=new Maze(cellCount,cellCount),draw=new DrawMaze(maze,ctx,cellSize,finishSprite),player=new Player(maze,mazeCanvas,cellSize,displayVictoryMess,sprite),e.style.opacity<"100"&&(e.style.opacity="100")}function ufoVidEnded(){$(".slider").slick("slickNext")}var shareFacebook=function(e,t){var a;a=piecesCollected<6||!victorious?"https://poweredbyplaycampaign.org/&amp;src=sdkpreparse&quote=I%20couldn't%20beat%20the%20"+e+"%20level!%20Can%20you%20get%20through%20the%20maze%20and%20collect%20the%20toys%20in%20time?%20Help%20me%20out%20and%20support%20the%20Powered%20by%20Play%20campaign%20for%20The%20Strong.%20%23poweredbyplay%20%23philanthroplay":"https://poweredbyplaycampaign.org/&amp;src=sdkpreparse&quote=I%20completed%20the%20game%20in%20"+t+"%20seconds!%20If%20 you%20think%20you%20can%20beat%20me,%20get%20in%20the%20game!%20Show%20your%20support%20for%20The%20Strong's%20Powered%20by%20Play%20campaign%20today.%20%23poweredbyplay%20%23philanthroplay";var o="https://facebook.com/sharer.php?display=popup&u="+a;window.open(o,"sharer","toolbar=0,status=0,resizable=1,width=626,height=436")},shareTwitter=function(e,t){if(piecesCollected<6||!victorious)var a="https://twitter.com/intent/tweet?text=I%20couldn't%20beat%20the%20"+e+"%20level!%20Can%20you%20get%20through%20the%20maze%20and%20collect%20the%20toys%20in%20time?%20Help%20me%20out%20and%20support%20the%20Powered%20by%20Play%20campaign%20for%20%40museumofplay.%20%23poweredbyplay%20%23philanthroplay&url=https%3A//poweredbyplaycampaign.org/";else var a="https://twitter.com/intent/tweet?text=I%20completed%20the%20game%20in%20"+t+"%20seconds!%20If you%20think%20you%20can%20beat%20me,%20get%20in%20the%20game!%20Show%20your%20support%20for%20The%20Strong's%20Powered%20by%20Play%20campaign%20today.%20%23poweredbyplay%20%23philanthroplay%20%40museumofplay&url=https%3A//poweredbyplaycampaign.org/";window.open(a,"","toolbar=0,status=0,resizable=1,width=626,height=436")},shareLinkedIn=function(){window.open("https://www.linkedin.com/shareArticle?mini=true&url=https%3A//poweredbyplaycampaign.org/","","toolbar=0,status=0,resizable=1,width=626,height=436")};window.addEventListener("keydown",function(e){[32,37,38,39,40].indexOf(e.keyCode)>-1&&e.preventDefault()},!1);var cellsToBeCleared=[],gameDifficulty;$(".difficulty:not(disabled)").on("click touch",function(e){function t(e,t){window[e]=new Image,window[e].src="images/random-pieces/"+t+"?"+(new Date).getTime(),window[e].setAttribute("crossOrigin",""),window[e].onload=function(){window[e]=changeBrightness(1,window[e])}}function a(){s=!0,c();var e=getCookie("alreadyPlayed"),t=new Date,a=t.setMonth(t.getMonth()+6);if(null===e)document.cookie="alreadyPlayed=1; expires="+a;else{var o=parseInt(e);o++;var n=o;document.cookie="alreadyPlayed="+n+"; expires="+a}}gameDifficulty=$(e.target).closest("button")[0].getAttribute("data-difficulty");var o=$("#view").width(),n=$("#view").height();n<o?(ctx.canvas.width=n-n/50,ctx.canvas.height=n-n/50):(ctx.canvas.width=o-o/50,ctx.canvas.height=o-o/50);var i=!1,r=!1,s=!1,c=function(){!0===i&&!0===r&&!0===s&&setTimeout(function(){makeMaze()},500)};return sprite=new Image,sprite.src="images/avatar.png?"+(new Date).getTime(),sprite.setAttribute("crossOrigin"," "),sprite.onload=function(){sprite=changeBrightness(1,sprite),i=!0,c()},finishSprite=new Image,finishSprite.src="images/ending.png?"+(new Date).getTime(),finishSprite.setAttribute("crossOrigin"," "),finishSprite.onload=function(){finishSprite=changeBrightness(1,finishSprite),r=!0,c()},"easy"===gameDifficulty?(function(){t("pieceOne","/toys/icon-controller.png"),t("pieceTwo","/toys/icon-football.png"),t("pieceThree","/toys/icon-lego.png"),t("pieceFour","/toys/icon-rollerskate.png"),t("pieceFive","/toys/icon-rubiks-cube.png"),t("pieceSix","/toys/icon-lego.png")}(),startTimer(50),void a()):"medium"===gameDifficulty?(function(){t("pieceOne","/chess/icon-knight.png"),t("pieceTwo","/chess/icon-pawn.png"),t("pieceThree","/chess/icon-pinewood-derby.png"),t("pieceFour","/chess/icon-pupper.png"),t("pieceFive","/chess/icon-rook.png"),t("pieceSix","/chess/icon-shoe.png")}(),startTimer(35),void a()):(function(){t("pieceOne","/pixels/icon-bomb.png"),t("pieceTwo","/pixels/icon-fish.png"),t("pieceThree","/pixels/icon-heart.png"),t("pieceFour","/pixels/icon-potion.png"),t("pieceFive","/pixels/icon-skull.png"),t("pieceSix","/pixels/icon-sword.png")}(),startTimer(20),void a())});var endTime,timerInterval,timeElapsedInterval,redrawObjects,mazeCanvas=document.getElementById("mazeCanvas"),ctx=mazeCanvas.getContext("2d"),sprite,finishSprite,maze,draw,player,cellSize,cellCount,randomObjects,randomObjCoordLocation=[],objsRandomized=!1,piecesCollected=0,moves=0,redrawEndOnNextMove=!1,victorious=!0,randomCoordinates=[];window.onresize=function(){var e=$("#view").width(),t=$("#view").height();t<e?(ctx.canvas.width=t-t/100,ctx.canvas.height=t-t/100):(ctx.canvas.width=e-e/100,ctx.canvas.height=e-e/100),cellSize=mazeCanvas.width/cellCount,null!=player&&(draw.redrawMaze(cellSize),player.redrawPlayer(cellSize))},$(".slider").slick({swipe:!1,nextArrow:$(".maze-next-btn, .difficulty"),adaptiveHeight:!0});var indicators=$(".indicators li");$(".slider").on("beforeChange",function(e,t,a,o){if($(indicators).each(function(){$(this).removeClass("active")}),0===o&&($(indicators[0]).addClass("active"),$(".slick-prev").removeClass("show")),1===o)$(indicators[1]).addClass("active"),$(".slick-prev").addClass("show");else if(2===o)$(indicators[2]).addClass("active");else if(3===o)$(indicators[3]).addClass("active");else if(4===o){$(indicators[4]).addClass("active");var n=getCookie("sharedGame");n&&($(".unlock-instructions").addClass("hide"),$(".difficulty-medium, .difficulty-hard").prop("disabled",!1))}else 6===o?setTimeout(function(){$("#maze-time-left").addClass("show")},250):o>=5&&($(".slick-prev").removeClass("show"),$(".indicators, .warp-speed-header").addClass("hide"))}),$(".slider").on("afterChange",function(e,t,a,o){5===a&&($("#ufo-animation").get(0).play(),setTimeout(function(){$(".slider").slick("slickNext")},4500)),6===a&&($("#ufo-animation").get(0).currentTime=0,setTimeout(function(){$("#maze-time-left").addClass("corner")},500))}),$(document).ready(function(){$("#maze-share-to-facebook").on("click touch",function(){shareFacebook(gameDifficulty,endTime)}),$("#maze-share-to-twitter").on("click touch",function(){shareTwitter(gameDifficulty,endTime)}),$("#maze-play-again, #maze-play-again *").on("click touch",function(){resetVariables(),$(".slider").slick("slickGoTo",4),$(".slick-prev").addClass("show"),$(".indicators, .warp-speed-header").removeClass("hide"),$(indicators[4]).addClass("active")});var e=new Date,t=e.setMonth(e.getMonth()+6);$("#maze-share-to-facebook, #maze-share-to-twitter, #maze-share-to-linked-in").on("click",function(){document.cookie="sharedGame=true; expires="+t})});