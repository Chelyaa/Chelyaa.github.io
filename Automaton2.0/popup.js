;(function() {
	function popup(opt) {
		var typesOfWindow = [];
		var defaultAnimationShow = null;
		var defaultAnimationHide = null;
		var windowEl = opt.window;
		var bcgEl = opt.background == 'none' ? document.getElementsByClassName('empty-bcg')[0] : opt.background;
		var contentEl = opt.content;
		var styles = {
			bcg : bcgEl.style,
			content : contentEl.style
		}
		if(windowEl in typesOfWindow) {
			// TODO
		}

		var self = this;
		if(opt.interactiveBcg) {
			bcgEl.classList.add('window-bcg');
			setListenersForBcg({bcg : bcgEl, content : contentEl, self : self});
		}

		windowEl.classList.add('windowHidden');

		this.setAnimationForShow = function(opt) {
			defaultAnimationShow = opt;
		}

		this.setAnimationForHide = function(opt) {
			defaultAnimationHide = opt;
		}

		this.show = function(opt = null) {
			document.body.classList.add('withoutOverflow');
			windowEl.classList.remove('windowHidden');
			windowEl.classList.add('windowActive');

			if(opt != null){
				opt.contentEl = contentEl;
				opt.bcgEl = bcgEl;
				opt.typeAnimate = 'show'
				animateShowHide(opt);
			}else if(defaultAnimationShow != null){
				var opt = defaultAnimationShow;
				opt.contentEl = contentEl;
				opt.bcgEl = bcgEl;
				opt.typeAnimate = 'show'
				animateShowHide(opt);
			}

			bcgEl.style = styles.bcg;
			contentEl.style = styles.content;
		}

		this.hide = function(opt = null) {
			windowEl.classList.remove('windowActive');
			if(opt != null){
				opt.contentEl = contentEl;
				opt.bcgEl = bcgEl;
				opt.typeAnimate = 'hide';
				animateShowHide(opt);
			}else if(defaultAnimationHide != null){
				var opt = defaultAnimationHide;
				opt.contentEl = contentEl;
				opt.bcgEl = bcgEl;
				opt.typeAnimate = 'hide';
				animateShowHide(opt);
			}

			if('animation' in opt && !('animationBgc' in opt) && !('animationContent' in opt)) {
				setTimeout(function() {
					windowEl.classList.add('windowHidden');
					document.body.classList.remove('withoutOverflow');
					bcgEl.style = styles.bcg;
					contentEl.style = styles.content;
				}, opt.duration-1);
			} else if(!('animation' in opt) && ('animationBcg' in opt) && ('animationContent' in opt)) {
				if(opt.animationBcg.duration > opt.animationContent.duration){
					setTimeout(function() {
						windowEl.classList.add('windowHidden');
						document.body.classList.remove('withoutOverflow');
						bcgEl.style = styles.bcg;
						contentEl.style = styles.content;
					}, opt.animationBcg.duration-1);
				}else{
					setTimeout(function() {
						windowEl.classList.add('windowHidden');
						document.body.classList.remove('withoutOverflow');
						bcgEl.style = styles.bcg;
						contentEl.style = styles.content;
					}, opt.animationContent.duration-1);
				}
			} else {
				windowEl.classList.add('windowHidden');
				document.body.classList.remove('withoutOverflow');
				bcgEl.style = styles.bcg;
				contentEl.style = styles.content;
			}
		}
	}

	function animateShowHide(opt) {
		var animate = new Animate();
		var drawFunctions = animate.drawFunctions;
		var typeAnimate = opt.typeAnimate;

		if('animation' in opt && !('animationBgc' in opt) && !('animationContent' in opt)) {
			var animation = opt.animation;
			var duration = opt.duration;
			var styleContent = getStyle(opt.contentEl);
			var styleBcg = getStyle(opt.bcgEl);

			if(typeof animation == 'string'){
				animation = [animation];
			}

			for(var i = 0; i < animation.length; i++){
				var drawFunctionName = getNameOfDrawFunction({typeAnim : typeAnimate, drawName : animation[i]});
				var drawFunction = drawFunctions[drawFunctionName];

				animate.animate({
					duration : duration,
					element : opt.contentEl,
					draw : drawFunction,
					startStyle : styleContent
				});
				animate.animate({
					duration : duration,
					element : opt.bcgEl,
					draw : drawFunction,
					startStyle : styleBcg
				});
			}
		} else if(!('animation' in opt) && ('animationBcg' in opt) && ('animationContent' in opt)) {
			var animCnt = opt.animationContent;
			var animBcg = opt.animationBcg;
			var styleContent = getStyle(opt.contentEl);
			var styleBcg = getStyle(opt.bcgEl);

			if(typeof animCnt.animation == 'string') {
				animCnt.animation = [animCnt.animation];
			}
			if(typeof animBcg.animation == 'string'){ 
				animBcg.animation = [animBcg.animation];
			}
			
			for(var i = 0; i < animCnt.animation.length; i++) {
				var drawFunctionNameContent = getNameOfDrawFunction({typeAnim : typeAnimate, drawName : animCnt.animation[i]});
				var drawFunctionContent = drawFunctions[drawFunctionNameContent];

				animate.animate({
					duration : animCnt.duration,
					element : opt.contentEl,
					draw : drawFunctionContent,
					startStyle : styleContent
				});
			}

			for(var i = 0; i < animBcg.animation.length; i++) {
				var drawFunctionNameBcg = getNameOfDrawFunction({typeAnim : typeAnimate, drawName : animBcg.animation[i]});
				var drawFunctionBcg = drawFunctions[drawFunctionNameBcg];

				animate.animate({
					duration : animBcg.duration,
					element : opt.bcgEl,
					draw : drawFunctionBcg,
					startStyle : styleBcg
				});
			}
		}
	}

	function Animate() {
		var tmp = {}
		var animationsNumber = 0;

	  this.timingFunctions = {
	    linear : function(timeFraction) {
	      return timeFraction;
	    },
	  }

	  this.animate = function(options) {
	    var timing = this.timingFunctions.linear;
	    var start = performance.now();
	    var id = animationsNumber;
	    animationsNumber++;

	    tmp[id] = {};
	    tmp[id].firstStep = 1;

	    requestAnimationFrame(function animate(time) {

	      var timeFraction = (time - start) / options.duration;
	      if(timeFraction > 1) timeFraction = 1;
	      if(timeFraction < 0) timeFraction = 0;

	      var progress = timing(timeFraction);

	      options.draw({
	      	progress : progress, 
	      	element : options.element, 
	      	startStyle : options.startStyle,
	      	idAnimation : id
	      });

	      if(timeFraction < 1) {
	        requestAnimationFrame(animate);
	      }
	    });
	  }

	  this.drawFunctions = {
			fadeIn : function(opt) {
				var progress = opt.progress;
				var el = opt.element;
				var id = opt.idAnimation;

				if(tmp[id].firstStep) {
					tmp[id].startOpacity = opt.startStyle.opacity;
					el.style.opacity = 0;
					tmp[id].firstStep = 0;
				}
				
				el.style.opacity = progress * tmp[id].startOpacity;

				if(progress == 1) {
					delete tmp[id];
				}
			},
			fadeOut : function(opt) {
				var progress = opt.progress;
				var el = opt.element;
				var id = opt.idAnimation;

				if(tmp[id].firstStep) {
					tmp[id].startOpacity = opt.startStyle.opacity;
					tmp[id].firstStep = 0;
				}
				
				el.style.opacity = (1 - progress) * tmp[id].startOpacity;

				if(progress == 1) {
					delete tmp[id];
				}
			},
			dropUp : function(opt) {
				var progress = opt.progress;
				var el = opt.element;
				var id = opt.idAnimation;

				if(tmp[id].firstStep) {
					tmp[id].startPosition = getOffset(el).top;
					el.style.top = window.innerHeight + 'px';
					tmp[id].firstStep = 0;
				}

				el.style.top = (1 - progress) * window.innerHeight + tmp[id].startPosition + 'px';

				if(progress == 1) {
					delete tmp[id];
				}
			},
			dropDown : function(opt) {
				var progress = opt.progress;
				var el = opt.element;
				var id = opt.idAnimation;

				if(tmp[id].firstStep) {
					tmp[id].position = getOffset(el).top;
					tmp[id].startPosition = 0 - el.offsetHeight;
					tmp[id].deltaPosition = tmp[id].startPosition*(-1) + tmp[id].position;
					el.style.top = 0 - el.offsetHeight + 'px';
					tmp[id].firstStep = 0;
				}

				el.style.top = tmp[id].startPosition + tmp[id].deltaPosition * progress + 'px';

				if(progress == 1) {
					delete tmp[id];
				}
			},
			dropRight : function(opt) {
				var progress = opt.progress;
				var el = opt.element;
				var id = opt.idAnimation;

				if(tmp[id].firstStep) {;
					tmp[id].position = getOffset(el).left;
					tmp[id].startPosition = 0 - el.offsetWidth;
					tmp[id].deltaPosition = tmp[id].startPosition*(-1) + tmp[id].position;
					el.style.left = 0 - el.offsetWidth + 'px';
					el.style.position = 'absolute';
					tmp[id].firstStep = 0;
				}

				el.style.left = tmp[id].startPosition + tmp[id].deltaPosition * progress + 'px';

				if(progress == 1) {
					delete tmp[id];
				}
			},
			dropLeft : function(opt) {
				var progress = opt.progress;
				var el = opt.element;
				var id = opt.idAnimation;

				if(tmp[id].firstStep) {;
					tmp[id].startPosition = getOffset(el).left;
					el.style.left = window.innerWidth + 'px';
					el.style.position = 'absolute';
					tmp[id].firstStep = 0;
				}

				el.style.left = (1 - progress) * window.innerWidth + tmp[id].startPosition + 'px';

				if(progress == 1) {
					delete tmp[id];
				}
			},
			scaleOut : function(opt) {
				var progress = opt.progress;
				var el = opt.element;
				var id = opt.idAnimation;

				el.style.transform = 'scale(' + progress + ')';

				if(progress == 1) {
					delete tmp[id];
				}
			},
			scaleIn : function(opt) {
				var progress = opt.progress;
				var el = opt.element;
				var id = opt.idAnimation;

				el.style.transform = 'scale(' + (1 - progress) + ')';

				if(progress == 1) {
					delete tmp[id];
				}
			},
			reverseDropUp : function(opt) {
				var progress = opt.progress;
				var el = opt.element;
				var id = opt.idAnimation;

				if(tmp[id].firstStep) {
					tmp[id].startPosition = getOffset(el).top;
					tmp[id].deltaPosition = window.innerHeight - tmp[id].startPosition;
					tmp[id].firstStep = 0;
				}

				el.style.top = tmp[id].startPosition + tmp[id].deltaPosition * progress + 'px';

				if(progress == 1) {
					delete tmp[id];
				}
			},
			reverseDropDown : function(opt) {
				var progress = opt.progress;
				var el = opt.element;
				var id = opt.idAnimation;

				if(tmp[id].firstStep) {
					tmp[id].startPosition = getOffset(el).top;
					tmp[id].deltaPosition = el.offsetHeight + tmp[id].startPosition;
					tmp[id].firstStep = 0;
				}

				el.style.top = 0 - el.offsetHeight + tmp[id].deltaPosition * (1 - progress) + 'px';

				if(progress == 1) {
					delete tmp[id];
				}
			},
			reverseDropRight : function(opt) {
				var progress = opt.progress;
				var el = opt.element;
				var id = opt.idAnimation;

				if(tmp[id].firstStep) {
					tmp[id].startPosition = getOffset(el).left;
					tmp[id].deltaPosition = el.offsetWidth + tmp[id].startPosition;
					tmp[id].firstStep = 0;
				}

				el.style.left = 0 - el.offsetWidth + tmp[id].deltaPosition * (1 - progress) + 'px';

				if(progress == 1) {
					delete tmp[id];
				}
			},
			reverseDropLeft : function(opt) {
				var progress = opt.progress;
				var el = opt.element;
				var id = opt.idAnimation;

				if(tmp[id].firstStep) {
					tmp[id].startPosition = getOffset(el).left;
					tmp[id].deltaPosition = window.innerWidth - tmp[id].startPosition;
					tmp[id].firstStep = 0;
					el.style.left = tmp[id].startPosition + 'px';
				}
				
				el.style.left = tmp[id].startPosition + tmp[id].deltaPosition * progress + 'px';

				if(progress == 1) {
					delete tmp[id];
				}
			},
		}
	}

	function setListenersForBcg(opt) {
		var animate = new Animate();
		var bcg = opt.bcg;
		var content = opt.content;
		var self = opt.self;

		bcg.addEventListener('click', function() {
			self.hide();
		});
	}

	function getOffset(elem) {
    if (elem.getBoundingClientRect) {
      return getOffsetRect(elem);
    } else {
      return getOffsetSum(elem);
    }
	}

	function getOffsetSum(elem) {
	  var top=0, left=0;
	  while(elem) {
	  	top = top + parseInt(elem.offsetTop);
	  	left = left + parseInt(elem.offsetLeft);
	  	elem = elem.offsetParent;
	  }

	  return {top : top, left : left};
	}

	function getOffsetRect(elem) {
	  var box = elem.getBoundingClientRect();

	  var body = document.body;
	  var docElem = document.documentElement;

	  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
	  var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

	  var clientTop = docElem.clientTop || body.clientTop || 0;
	  var clientLeft = docElem.clientLeft || body.clientLeft || 0;

	  var top  = box.top +  scrollTop - clientTop;
	  var left = box.left + scrollLeft - clientLeft;

	  return { top : Math.round(top), left : Math.round(left) };
	}

	function getNameOfDrawFunction(opt) {
		var typeAnim = opt.typeAnim;
		var baseDrawName = opt.drawName;

		if(typeAnim == 'show') {
			switch(baseDrawName) {
				case 'fade' : 
					return 'fadeIn';
				break;
				case 'scale' : 
					return 'scaleOut';
				break;
				default :
					return baseDrawName;
				break;
			}
		} else {
			switch(baseDrawName) {
				case 'fade' : 
					return 'fadeOut';
				break;
				case 'dropUp' : 
					return 'reverseDropDown';
				break;
				case 'dropDown' : 
					return 'reverseDropUp';
				break;
				case 'dropRight' : 
					return 'reverseDropLeft';
				break;
				case 'dropLeft' : 
					return 'reverseDropRight';
				break;
				case 'scale' : 
					return 'scaleIn';
				break;
			}
		}
	}

	function getStyle(elem) {
	  return window.getComputedStyle ? getComputedStyle(elem) : elem.currentStyle;
	}

	var emptyBcg = document.createElement('div');
	document.body.appendChild(emptyBcg);
	emptyBcg.className = 'empty-bcg';

	window.Popup = popup;
}());