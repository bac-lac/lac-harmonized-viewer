System.register(["./p-fd29f5b8.system.js","./p-7e669bb3.system.js"],(function(t){"use strict";var e,r,n,i,o,a,c,s,l,u,f,d,h,p;return{setters:[function(t){e=t.r;r=t.g;n=t.h;i=t.H;o=t.c},function(t){a=t._;c=t.a;s=t.f;l=t.M;u=t.g;f=t.b;d=t.m;h=t.d;p=t.h}],execute:function(){
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */
var _={ANIMATING:"mdc-tab-scroller--animating",SCROLL_AREA_SCROLL:"mdc-tab-scroller__scroll-area--scroll",SCROLL_TEST:"mdc-tab-scroller__test"};var v={AREA_SELECTOR:".mdc-tab-scroller__scroll-area",CONTENT_SELECTOR:".mdc-tab-scroller__scroll-content"};
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var S=function(){function t(t){this.adapter_=t}return t}();
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var T=function(t){a(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}e.prototype.getScrollPositionRTL=function(){var t=this.adapter_.getScrollAreaScrollLeft();var e=this.calculateScrollEdges_().right;return Math.round(e-t)};e.prototype.scrollToRTL=function(t){var e=this.calculateScrollEdges_();var r=this.adapter_.getScrollAreaScrollLeft();var n=this.clampScrollValue_(e.right-t);return{finalScrollPosition:n,scrollDelta:n-r}};e.prototype.incrementScrollRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft();var r=this.clampScrollValue_(e-t);return{finalScrollPosition:r,scrollDelta:r-e}};e.prototype.getAnimatingScrollPosition=function(t){return t};e.prototype.calculateScrollEdges_=function(){var t=this.adapter_.getScrollContentOffsetWidth();var e=this.adapter_.getScrollAreaOffsetWidth();return{left:0,right:t-e}};e.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.min(Math.max(e.left,t),e.right)};return e}(S);
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var g=function(t){a(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}e.prototype.getScrollPositionRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft();return Math.round(t-e)};e.prototype.scrollToRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft();var r=this.clampScrollValue_(-t);return{finalScrollPosition:r,scrollDelta:r-e}};e.prototype.incrementScrollRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft();var r=this.clampScrollValue_(e-t);return{finalScrollPosition:r,scrollDelta:r-e}};e.prototype.getAnimatingScrollPosition=function(t,e){return t-e};e.prototype.calculateScrollEdges_=function(){var t=this.adapter_.getScrollContentOffsetWidth();var e=this.adapter_.getScrollAreaOffsetWidth();return{left:e-t,right:0}};e.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.max(Math.min(e.right,t),e.left)};return e}(S);
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var y=function(t){a(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}e.prototype.getScrollPositionRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft();return Math.round(e-t)};e.prototype.scrollToRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft();var r=this.clampScrollValue_(t);return{finalScrollPosition:r,scrollDelta:e-r}};e.prototype.incrementScrollRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft();var r=this.clampScrollValue_(e+t);return{finalScrollPosition:r,scrollDelta:e-r}};e.prototype.getAnimatingScrollPosition=function(t,e){return t+e};e.prototype.calculateScrollEdges_=function(){var t=this.adapter_.getScrollContentOffsetWidth();var e=this.adapter_.getScrollAreaOffsetWidth();return{left:t-e,right:0}};e.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.min(Math.max(e.right,t),e.left)};return e}(S);
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var m=function(t){a(e,t);function e(r){var n=t.call(this,c({},e.defaultAdapter,r))||this;n.isAnimating_=false;return n}Object.defineProperty(e,"cssClasses",{get:function(){return _},enumerable:true,configurable:true});Object.defineProperty(e,"strings",{get:function(){return v},enumerable:true,configurable:true});Object.defineProperty(e,"defaultAdapter",{get:function(){return{eventTargetMatchesSelector:function(){return false},addClass:function(){return undefined},removeClass:function(){return undefined},addScrollAreaClass:function(){return undefined},setScrollAreaStyleProperty:function(){return undefined},setScrollContentStyleProperty:function(){return undefined},getScrollContentStyleValue:function(){return""},setScrollAreaScrollLeft:function(){return undefined},getScrollAreaScrollLeft:function(){return 0},getScrollContentOffsetWidth:function(){return 0},getScrollAreaOffsetWidth:function(){return 0},computeScrollAreaClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeScrollContentClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeHorizontalScrollbarHeight:function(){return 0}}},enumerable:true,configurable:true});e.prototype.init=function(){var t=this.adapter_.computeHorizontalScrollbarHeight();this.adapter_.setScrollAreaStyleProperty("margin-bottom",-t+"px");this.adapter_.addScrollAreaClass(e.cssClasses.SCROLL_AREA_SCROLL)};e.prototype.getScrollPosition=function(){if(this.isRTL_()){return this.computeCurrentScrollPositionRTL_()}var t=this.calculateCurrentTranslateX_();var e=this.adapter_.getScrollAreaScrollLeft();return e-t};e.prototype.handleInteraction=function(){if(!this.isAnimating_){return}this.stopScrollAnimation_()};e.prototype.handleTransitionEnd=function(t){var r=t.target;if(!this.isAnimating_||!this.adapter_.eventTargetMatchesSelector(r,e.strings.CONTENT_SELECTOR)){return}this.isAnimating_=false;this.adapter_.removeClass(e.cssClasses.ANIMATING)};e.prototype.incrementScroll=function(t){if(t===0){return}this.animate_(this.getIncrementScrollOperation_(t))};e.prototype.incrementScrollImmediate=function(t){if(t===0){return}var e=this.getIncrementScrollOperation_(t);if(e.scrollDelta===0){return}this.stopScrollAnimation_();this.adapter_.setScrollAreaScrollLeft(e.finalScrollPosition)};e.prototype.scrollTo=function(t){if(this.isRTL_()){return this.scrollToRTL_(t)}this.scrollTo_(t)};e.prototype.getRTLScroller=function(){if(!this.rtlScrollerInstance_){this.rtlScrollerInstance_=this.rtlScrollerFactory_()}return this.rtlScrollerInstance_};e.prototype.calculateCurrentTranslateX_=function(){var t=this.adapter_.getScrollContentStyleValue("transform");if(t==="none"){return 0}var e=/\((.+?)\)/.exec(t);if(!e){return 0}var r=e[1];var n=s(r.split(","),6),i=n[4];return parseFloat(i)};e.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.min(Math.max(e.left,t),e.right)};e.prototype.computeCurrentScrollPositionRTL_=function(){var t=this.calculateCurrentTranslateX_();return this.getRTLScroller().getScrollPositionRTL(t)};e.prototype.calculateScrollEdges_=function(){var t=this.adapter_.getScrollContentOffsetWidth();var e=this.adapter_.getScrollAreaOffsetWidth();return{left:0,right:t-e}};e.prototype.scrollTo_=function(t){var e=this.getScrollPosition();var r=this.clampScrollValue_(t);var n=r-e;this.animate_({finalScrollPosition:r,scrollDelta:n})};e.prototype.scrollToRTL_=function(t){var e=this.getRTLScroller().scrollToRTL(t);this.animate_(e)};e.prototype.getIncrementScrollOperation_=function(t){if(this.isRTL_()){return this.getRTLScroller().incrementScrollRTL(t)}var e=this.getScrollPosition();var r=t+e;var n=this.clampScrollValue_(r);var i=n-e;return{finalScrollPosition:n,scrollDelta:i}};e.prototype.animate_=function(t){var r=this;if(t.scrollDelta===0){return}this.stopScrollAnimation_();this.adapter_.setScrollAreaScrollLeft(t.finalScrollPosition);this.adapter_.setScrollContentStyleProperty("transform","translateX("+t.scrollDelta+"px)");this.adapter_.computeScrollAreaClientRect();requestAnimationFrame((function(){r.adapter_.addClass(e.cssClasses.ANIMATING);r.adapter_.setScrollContentStyleProperty("transform","none")}));this.isAnimating_=true};e.prototype.stopScrollAnimation_=function(){this.isAnimating_=false;var t=this.getAnimatingScrollPosition_();this.adapter_.removeClass(e.cssClasses.ANIMATING);this.adapter_.setScrollContentStyleProperty("transform","translateX(0px)");this.adapter_.setScrollAreaScrollLeft(t)};e.prototype.getAnimatingScrollPosition_=function(){var t=this.calculateCurrentTranslateX_();var e=this.adapter_.getScrollAreaScrollLeft();if(this.isRTL_()){return this.getRTLScroller().getAnimatingScrollPosition(e,t)}return e-t};e.prototype.rtlScrollerFactory_=function(){var t=this.adapter_.getScrollAreaScrollLeft();this.adapter_.setScrollAreaScrollLeft(t-1);var e=this.adapter_.getScrollAreaScrollLeft();if(e<0){this.adapter_.setScrollAreaScrollLeft(t);return new g(this.adapter_)}var r=this.adapter_.computeScrollAreaClientRect();var n=this.adapter_.computeScrollContentClientRect();var i=Math.round(n.right-r.right);this.adapter_.setScrollAreaScrollLeft(t);if(i===e){return new y(this.adapter_)}return new T(this.adapter_)};e.prototype.isRTL_=function(){return this.adapter_.getScrollContentStyleValue("direction")==="rtl"};return e}(l);
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var E;function A(t,e){if(e===void 0){e=true}if(e&&typeof E!=="undefined"){return E}var r=t.createElement("div");r.classList.add(_.SCROLL_TEST);t.body.appendChild(r);var n=r.offsetHeight-r.clientHeight;t.body.removeChild(r);if(e){E=n}return n}
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var b=function(t){a(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}e.attachTo=function(t){return new e(t)};e.prototype.initialize=function(){this.area_=this.root_.querySelector(m.strings.AREA_SELECTOR);this.content_=this.root_.querySelector(m.strings.CONTENT_SELECTOR)};e.prototype.initialSyncWithDOM=function(){var t=this;this.handleInteraction_=function(){return t.foundation_.handleInteraction()};this.handleTransitionEnd_=function(e){return t.foundation_.handleTransitionEnd(e)};this.area_.addEventListener("wheel",this.handleInteraction_,u());this.area_.addEventListener("touchstart",this.handleInteraction_,u());this.area_.addEventListener("pointerdown",this.handleInteraction_,u());this.area_.addEventListener("mousedown",this.handleInteraction_,u());this.area_.addEventListener("keydown",this.handleInteraction_,u());this.content_.addEventListener("transitionend",this.handleTransitionEnd_)};e.prototype.destroy=function(){t.prototype.destroy.call(this);this.area_.removeEventListener("wheel",this.handleInteraction_,u());this.area_.removeEventListener("touchstart",this.handleInteraction_,u());this.area_.removeEventListener("pointerdown",this.handleInteraction_,u());this.area_.removeEventListener("mousedown",this.handleInteraction_,u());this.area_.removeEventListener("keydown",this.handleInteraction_,u());this.content_.removeEventListener("transitionend",this.handleTransitionEnd_)};e.prototype.getDefaultFoundation=function(){var t=this;var e={eventTargetMatchesSelector:function(t,e){return d(t,e)},addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},addScrollAreaClass:function(e){return t.area_.classList.add(e)},setScrollAreaStyleProperty:function(e,r){return t.area_.style.setProperty(e,r)},setScrollContentStyleProperty:function(e,r){return t.content_.style.setProperty(e,r)},getScrollContentStyleValue:function(e){return window.getComputedStyle(t.content_).getPropertyValue(e)},setScrollAreaScrollLeft:function(e){return t.area_.scrollLeft=e},getScrollAreaScrollLeft:function(){return t.area_.scrollLeft},getScrollContentOffsetWidth:function(){return t.content_.offsetWidth},getScrollAreaOffsetWidth:function(){return t.area_.offsetWidth},computeScrollAreaClientRect:function(){return t.area_.getBoundingClientRect()},computeScrollContentClientRect:function(){return t.content_.getBoundingClientRect()},computeHorizontalScrollbarHeight:function(){return A(document)}};return new m(e)};e.prototype.getScrollPosition=function(){return this.foundation_.getScrollPosition()};e.prototype.getScrollContentWidth=function(){return this.content_.offsetWidth};e.prototype.incrementScroll=function(t){this.foundation_.incrementScroll(t)};e.prototype.scrollTo=function(t){this.foundation_.scrollTo(t)};return e}(f);
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var C={ACTIVE:"mdc-tab-indicator--active",FADE:"mdc-tab-indicator--fade",NO_TRANSITION:"mdc-tab-indicator--no-transition"};var L={CONTENT_SELECTOR:".mdc-tab-indicator__content"};
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var R=function(t){a(e,t);function e(r){return t.call(this,c({},e.defaultAdapter,r))||this}Object.defineProperty(e,"cssClasses",{get:function(){return C},enumerable:true,configurable:true});Object.defineProperty(e,"strings",{get:function(){return L},enumerable:true,configurable:true});Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){return undefined},removeClass:function(){return undefined},computeContentClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},setContentStyleProperty:function(){return undefined}}},enumerable:true,configurable:true});e.prototype.computeContentClientRect=function(){return this.adapter_.computeContentClientRect()};return e}(l);
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var I=function(t){a(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}e.prototype.activate=function(){this.adapter_.addClass(R.cssClasses.ACTIVE)};e.prototype.deactivate=function(){this.adapter_.removeClass(R.cssClasses.ACTIVE)};return e}(R);
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var O=function(t){a(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}e.prototype.activate=function(t){if(!t){this.adapter_.addClass(R.cssClasses.ACTIVE);return}var e=this.computeContentClientRect();var r=t.width/e.width;var n=t.left-e.left;this.adapter_.addClass(R.cssClasses.NO_TRANSITION);this.adapter_.setContentStyleProperty("transform","translateX("+n+"px) scaleX("+r+")");this.computeContentClientRect();this.adapter_.removeClass(R.cssClasses.NO_TRANSITION);this.adapter_.addClass(R.cssClasses.ACTIVE);this.adapter_.setContentStyleProperty("transform","")};e.prototype.deactivate=function(){this.adapter_.removeClass(R.cssClasses.ACTIVE)};return e}(R);
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var P=function(t){a(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}e.attachTo=function(t){return new e(t)};e.prototype.initialize=function(){this.content_=this.root_.querySelector(R.strings.CONTENT_SELECTOR)};e.prototype.computeContentClientRect=function(){return this.foundation_.computeContentClientRect()};e.prototype.getDefaultFoundation=function(){var t=this;var e={addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},computeContentClientRect:function(){return t.content_.getBoundingClientRect()},setContentStyleProperty:function(e,r){return t.content_.style.setProperty(e,r)}};if(this.root_.classList.contains(R.cssClasses.FADE)){return new I(e)}return new O(e)};e.prototype.activate=function(t){this.foundation_.activate(t)};e.prototype.deactivate=function(){this.foundation_.deactivate()};return e}(f);
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var D={ACTIVE:"mdc-tab--active"};var N={ARIA_SELECTED:"aria-selected",CONTENT_SELECTOR:".mdc-tab__content",INTERACTED_EVENT:"MDCTab:interacted",RIPPLE_SELECTOR:".mdc-tab__ripple",TABINDEX:"tabIndex",TAB_INDICATOR_SELECTOR:".mdc-tab-indicator"};
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var w=function(t){a(e,t);function e(r){var n=t.call(this,c({},e.defaultAdapter,r))||this;n.focusOnActivate_=true;return n}Object.defineProperty(e,"cssClasses",{get:function(){return D},enumerable:true,configurable:true});Object.defineProperty(e,"strings",{get:function(){return N},enumerable:true,configurable:true});Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){return undefined},removeClass:function(){return undefined},hasClass:function(){return false},setAttr:function(){return undefined},activateIndicator:function(){return undefined},deactivateIndicator:function(){return undefined},notifyInteracted:function(){return undefined},getOffsetLeft:function(){return 0},getOffsetWidth:function(){return 0},getContentOffsetLeft:function(){return 0},getContentOffsetWidth:function(){return 0},focus:function(){return undefined}}},enumerable:true,configurable:true});e.prototype.handleClick=function(){this.adapter_.notifyInteracted()};e.prototype.isActive=function(){return this.adapter_.hasClass(D.ACTIVE)};e.prototype.setFocusOnActivate=function(t){this.focusOnActivate_=t};e.prototype.activate=function(t){this.adapter_.addClass(D.ACTIVE);this.adapter_.setAttr(N.ARIA_SELECTED,"true");this.adapter_.setAttr(N.TABINDEX,"0");this.adapter_.activateIndicator(t);if(this.focusOnActivate_){this.adapter_.focus()}};e.prototype.deactivate=function(){if(!this.isActive()){return}this.adapter_.removeClass(D.ACTIVE);this.adapter_.setAttr(N.ARIA_SELECTED,"false");this.adapter_.setAttr(N.TABINDEX,"-1");this.adapter_.deactivateIndicator()};e.prototype.computeDimensions=function(){var t=this.adapter_.getOffsetWidth();var e=this.adapter_.getOffsetLeft();var r=this.adapter_.getContentOffsetWidth();var n=this.adapter_.getContentOffsetLeft();return{contentLeft:e+n,contentRight:e+n+r,rootLeft:e,rootRight:e+t}};return e}(l);
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var x=function(t){a(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}e.attachTo=function(t){return new e(t)};e.prototype.initialize=function(t,e){if(t===void 0){t=function(t,e){return new h(t,e)}}if(e===void 0){e=function(t){return new P(t)}}this.id=this.root_.id;var r=this.root_.querySelector(w.strings.RIPPLE_SELECTOR);var n=c({},h.createAdapter(this),{addClass:function(t){return r.classList.add(t)},removeClass:function(t){return r.classList.remove(t)},updateCssVariable:function(t,e){return r.style.setProperty(t,e)}});var i=new p(n);this.ripple_=t(this.root_,i);var o=this.root_.querySelector(w.strings.TAB_INDICATOR_SELECTOR);this.tabIndicator_=e(o);this.content_=this.root_.querySelector(w.strings.CONTENT_SELECTOR)};e.prototype.initialSyncWithDOM=function(){var t=this;this.handleClick_=function(){return t.foundation_.handleClick()};this.listen("click",this.handleClick_)};e.prototype.destroy=function(){this.unlisten("click",this.handleClick_);this.ripple_.destroy();t.prototype.destroy.call(this)};e.prototype.getDefaultFoundation=function(){var t=this;var e={setAttr:function(e,r){return t.root_.setAttribute(e,r)},addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},hasClass:function(e){return t.root_.classList.contains(e)},activateIndicator:function(e){return t.tabIndicator_.activate(e)},deactivateIndicator:function(){return t.tabIndicator_.deactivate()},notifyInteracted:function(){return t.emit(w.strings.INTERACTED_EVENT,{tabId:t.id},true)},getOffsetLeft:function(){return t.root_.offsetLeft},getOffsetWidth:function(){return t.root_.offsetWidth},getContentOffsetLeft:function(){return t.content_.offsetLeft},getContentOffsetWidth:function(){return t.content_.offsetWidth},focus:function(){return t.root_.focus()}};return new w(e)};Object.defineProperty(e.prototype,"active",{get:function(){return this.foundation_.isActive()},enumerable:true,configurable:true});Object.defineProperty(e.prototype,"focusOnActivate",{set:function(t){this.foundation_.setFocusOnActivate(t)},enumerable:true,configurable:true});e.prototype.activate=function(t){this.foundation_.activate(t)};e.prototype.deactivate=function(){this.foundation_.deactivate()};e.prototype.computeIndicatorClientRect=function(){return this.tabIndicator_.computeContentClientRect()};e.prototype.computeDimensions=function(){return this.foundation_.computeDimensions()};e.prototype.focus=function(){this.root_.focus()};return e}(f);
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var W={ARROW_LEFT_KEY:"ArrowLeft",ARROW_RIGHT_KEY:"ArrowRight",END_KEY:"End",ENTER_KEY:"Enter",HOME_KEY:"Home",SPACE_KEY:"Space",TAB_ACTIVATED_EVENT:"MDCTabBar:activated",TAB_SCROLLER_SELECTOR:".mdc-tab-scroller",TAB_SELECTOR:".mdc-tab"};var K={ARROW_LEFT_KEYCODE:37,ARROW_RIGHT_KEYCODE:39,END_KEYCODE:35,ENTER_KEYCODE:13,EXTRA_SCROLL_AMOUNT:20,HOME_KEYCODE:36,SPACE_KEYCODE:32};
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var V=new Set;V.add(W.ARROW_LEFT_KEY);V.add(W.ARROW_RIGHT_KEY);V.add(W.END_KEY);V.add(W.HOME_KEY);V.add(W.ENTER_KEY);V.add(W.SPACE_KEY);var M=new Map;M.set(K.ARROW_LEFT_KEYCODE,W.ARROW_LEFT_KEY);M.set(K.ARROW_RIGHT_KEYCODE,W.ARROW_RIGHT_KEY);M.set(K.END_KEYCODE,W.END_KEY);M.set(K.HOME_KEYCODE,W.HOME_KEY);M.set(K.ENTER_KEYCODE,W.ENTER_KEY);M.set(K.SPACE_KEYCODE,W.SPACE_KEY);var Y=function(t){a(e,t);function e(r){var n=t.call(this,c({},e.defaultAdapter,r))||this;n.useAutomaticActivation_=false;return n}Object.defineProperty(e,"strings",{get:function(){return W},enumerable:true,configurable:true});Object.defineProperty(e,"numbers",{get:function(){return K},enumerable:true,configurable:true});Object.defineProperty(e,"defaultAdapter",{get:function(){return{scrollTo:function(){return undefined},incrementScroll:function(){return undefined},getScrollPosition:function(){return 0},getScrollContentWidth:function(){return 0},getOffsetWidth:function(){return 0},isRTL:function(){return false},setActiveTab:function(){return undefined},activateTabAtIndex:function(){return undefined},deactivateTabAtIndex:function(){return undefined},focusTabAtIndex:function(){return undefined},getTabIndicatorClientRectAtIndex:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},getTabDimensionsAtIndex:function(){return{rootLeft:0,rootRight:0,contentLeft:0,contentRight:0}},getPreviousActiveTabIndex:function(){return-1},getFocusedTabIndex:function(){return-1},getIndexOfTabById:function(){return-1},getTabListLength:function(){return 0},notifyTabActivated:function(){return undefined}}},enumerable:true,configurable:true});e.prototype.setUseAutomaticActivation=function(t){this.useAutomaticActivation_=t};e.prototype.activateTab=function(t){var e=this.adapter_.getPreviousActiveTabIndex();if(!this.indexIsInRange_(t)||t===e){return}var r;if(e!==-1){this.adapter_.deactivateTabAtIndex(e);r=this.adapter_.getTabIndicatorClientRectAtIndex(e)}this.adapter_.activateTabAtIndex(t,r);this.scrollIntoView(t);this.adapter_.notifyTabActivated(t)};e.prototype.handleKeyDown=function(t){var e=this.getKeyFromEvent_(t);if(e===undefined){return}if(!this.isActivationKey_(e)){t.preventDefault()}if(this.useAutomaticActivation_){if(this.isActivationKey_(e)){return}var r=this.determineTargetFromKey_(this.adapter_.getPreviousActiveTabIndex(),e);this.adapter_.setActiveTab(r);this.scrollIntoView(r)}else{var n=this.adapter_.getFocusedTabIndex();if(this.isActivationKey_(e)){this.adapter_.setActiveTab(n)}else{var r=this.determineTargetFromKey_(n,e);this.adapter_.focusTabAtIndex(r);this.scrollIntoView(r)}}};e.prototype.handleTabInteraction=function(t){this.adapter_.setActiveTab(this.adapter_.getIndexOfTabById(t.detail.tabId))};e.prototype.scrollIntoView=function(t){if(!this.indexIsInRange_(t)){return}if(t===0){return this.adapter_.scrollTo(0)}if(t===this.adapter_.getTabListLength()-1){return this.adapter_.scrollTo(this.adapter_.getScrollContentWidth())}if(this.isRTL_()){return this.scrollIntoViewRTL_(t)}this.scrollIntoView_(t)};e.prototype.determineTargetFromKey_=function(t,e){var r=this.isRTL_();var n=this.adapter_.getTabListLength()-1;var i=e===W.END_KEY;var o=e===W.ARROW_LEFT_KEY&&!r||e===W.ARROW_RIGHT_KEY&&r;var a=e===W.ARROW_RIGHT_KEY&&!r||e===W.ARROW_LEFT_KEY&&r;var c=t;if(i){c=n}else if(o){c-=1}else if(a){c+=1}else{c=0}if(c<0){c=n}else if(c>n){c=0}return c};e.prototype.calculateScrollIncrement_=function(t,e,r,n){var i=this.adapter_.getTabDimensionsAtIndex(e);var o=i.contentLeft-r-n;var a=i.contentRight-r;var c=a-K.EXTRA_SCROLL_AMOUNT;var s=o+K.EXTRA_SCROLL_AMOUNT;if(e<t){return Math.min(c,0)}return Math.max(s,0)};e.prototype.calculateScrollIncrementRTL_=function(t,e,r,n,i){var o=this.adapter_.getTabDimensionsAtIndex(e);var a=i-o.contentLeft-r;var c=i-o.contentRight-r-n;var s=c+K.EXTRA_SCROLL_AMOUNT;var l=a-K.EXTRA_SCROLL_AMOUNT;if(e>t){return Math.max(s,0)}return Math.min(l,0)};e.prototype.findAdjacentTabIndexClosestToEdge_=function(t,e,r,n){var i=e.rootLeft-r;var o=e.rootRight-r-n;var a=i+o;var c=i<0||a<0;var s=o>0||a>0;if(c){return t-1}if(s){return t+1}return-1};e.prototype.findAdjacentTabIndexClosestToEdgeRTL_=function(t,e,r,n,i){var o=i-e.rootLeft-n-r;var a=i-e.rootRight-r;var c=o+a;var s=o>0||c>0;var l=a<0||c<0;if(s){return t+1}if(l){return t-1}return-1};e.prototype.getKeyFromEvent_=function(t){if(V.has(t.key)){return t.key}return M.get(t.keyCode)};e.prototype.isActivationKey_=function(t){return t===W.SPACE_KEY||t===W.ENTER_KEY};e.prototype.indexIsInRange_=function(t){return t>=0&&t<this.adapter_.getTabListLength()};e.prototype.isRTL_=function(){return this.adapter_.isRTL()};e.prototype.scrollIntoView_=function(t){var e=this.adapter_.getScrollPosition();var r=this.adapter_.getOffsetWidth();var n=this.adapter_.getTabDimensionsAtIndex(t);var i=this.findAdjacentTabIndexClosestToEdge_(t,n,e,r);if(!this.indexIsInRange_(i)){return}var o=this.calculateScrollIncrement_(t,i,e,r);this.adapter_.incrementScroll(o)};e.prototype.scrollIntoViewRTL_=function(t){var e=this.adapter_.getScrollPosition();var r=this.adapter_.getOffsetWidth();var n=this.adapter_.getTabDimensionsAtIndex(t);var i=this.adapter_.getScrollContentWidth();var o=this.findAdjacentTabIndexClosestToEdgeRTL_(t,n,e,r,i);if(!this.indexIsInRange_(o)){return}var a=this.calculateScrollIncrementRTL_(t,o,e,r,i);this.adapter_.incrementScroll(a)};return e}(l);
/**
             * @license
             * Copyright 2018 Google Inc.
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             */var F=Y.strings;var j=0;var B=function(t){a(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}e.attachTo=function(t){return new e(t)};Object.defineProperty(e.prototype,"focusOnActivate",{set:function(t){this.tabList_.forEach((function(e){return e.focusOnActivate=t}))},enumerable:true,configurable:true});Object.defineProperty(e.prototype,"useAutomaticActivation",{set:function(t){this.foundation_.setUseAutomaticActivation(t)},enumerable:true,configurable:true});e.prototype.initialize=function(t,e){if(t===void 0){t=function(t){return new x(t)}}if(e===void 0){e=function(t){return new b(t)}}this.tabList_=this.instantiateTabs_(t);this.tabScroller_=this.instantiateTabScroller_(e)};e.prototype.initialSyncWithDOM=function(){var t=this;this.handleTabInteraction_=function(e){return t.foundation_.handleTabInteraction(e)};this.handleKeyDown_=function(e){return t.foundation_.handleKeyDown(e)};this.listen(w.strings.INTERACTED_EVENT,this.handleTabInteraction_);this.listen("keydown",this.handleKeyDown_);for(var e=0;e<this.tabList_.length;e++){if(this.tabList_[e].active){this.scrollIntoView(e);break}}};e.prototype.destroy=function(){t.prototype.destroy.call(this);this.unlisten(w.strings.INTERACTED_EVENT,this.handleTabInteraction_);this.unlisten("keydown",this.handleKeyDown_);this.tabList_.forEach((function(t){return t.destroy()}));if(this.tabScroller_){this.tabScroller_.destroy()}};e.prototype.getDefaultFoundation=function(){var t=this;var e={scrollTo:function(e){return t.tabScroller_.scrollTo(e)},incrementScroll:function(e){return t.tabScroller_.incrementScroll(e)},getScrollPosition:function(){return t.tabScroller_.getScrollPosition()},getScrollContentWidth:function(){return t.tabScroller_.getScrollContentWidth()},getOffsetWidth:function(){return t.root_.offsetWidth},isRTL:function(){return window.getComputedStyle(t.root_).getPropertyValue("direction")==="rtl"},setActiveTab:function(e){return t.foundation_.activateTab(e)},activateTabAtIndex:function(e,r){return t.tabList_[e].activate(r)},deactivateTabAtIndex:function(e){return t.tabList_[e].deactivate()},focusTabAtIndex:function(e){return t.tabList_[e].focus()},getTabIndicatorClientRectAtIndex:function(e){return t.tabList_[e].computeIndicatorClientRect()},getTabDimensionsAtIndex:function(e){return t.tabList_[e].computeDimensions()},getPreviousActiveTabIndex:function(){for(var e=0;e<t.tabList_.length;e++){if(t.tabList_[e].active){return e}}return-1},getFocusedTabIndex:function(){var e=t.getTabElements_();var r=document.activeElement;return e.indexOf(r)},getIndexOfTabById:function(e){for(var r=0;r<t.tabList_.length;r++){if(t.tabList_[r].id===e){return r}}return-1},getTabListLength:function(){return t.tabList_.length},notifyTabActivated:function(e){return t.emit(F.TAB_ACTIVATED_EVENT,{index:e},true)}};return new Y(e)};e.prototype.activateTab=function(t){this.foundation_.activateTab(t)};e.prototype.scrollIntoView=function(t){this.foundation_.scrollIntoView(t)};e.prototype.getTabElements_=function(){return[].slice.call(this.root_.querySelectorAll(F.TAB_SELECTOR))};e.prototype.instantiateTabs_=function(t){return this.getTabElements_().map((function(e){e.id=e.id||"mdc-tab-"+ ++j;return t(e)}))};e.prototype.instantiateTabScroller_=function(t){var e=this.root_.querySelector(F.TAB_SCROLLER_SELECTOR);if(e){return t(e)}return null};return e}(f);var H=t("harmonized_tabs",function(){function t(t){e(this,t);this.store=r(this,"store")}t.prototype.componentWillLoad=function(){this.storeUnsubscribe=this.store.mapStateToProps(this,(function(t){var e=t.document.language;return{language:e}}))};t.prototype.componentDidLoad=function(){var t=this;var e=this.el.querySelector(".mdc-tab-bar");if(e){this.tabBar=new B(e);this.tabBar.listen("MDCTabBar:activated",(function(e){var r=t.findTabs();r.forEach((function(t){t.active=false}));var n=e.detail.index;if(r.length>n){r[n].active=true}}));this.tabBar.activateTab(0)}};t.prototype.componentDidUnload=function(){if(this.tabBar)this.tabBar.destroy()};t.prototype.findTabs=function(){return Array.from(this.el.querySelectorAll("harmonized-tab"))};t.prototype.render=function(){var t=this.findTabs();return n(i,null,n("div",{class:"mdc-tab-bar",role:"tablist"},n("div",{class:"mdc-tab-scroller"},n("div",{class:"mdc-tab-scroller__scroll-area"},n("div",{class:"mdc-tab-scroller__scroll-content"},t&&t.map((function(t){return n("button",{class:t.active?"mdc-tab mdc-tab--active":"mdc-tab",role:"tab",tabindex:"0","aria-selected":t.active},n("span",{class:"mdc-tab__content"},t.icon&&n("span",{class:"mdc-tab__icon","aria-hidden":"true",innerHTML:t.icon}),t.label&&n("span",{class:"mdc-tab__text-label"},t.label)),n("span",{class:t.active?"mdc-tab-indicator mdc-tab-indicator--active":"mdc-tab-indicator"},n("span",{class:"mdc-tab-indicator__content mdc-tab-indicator__content--underline"})),n("span",{class:"mdc-tab__ripple"}))})))))),n("div",{class:"tabs__panels",role:"tabpanels"},n("slot",null)))};Object.defineProperty(t.prototype,"el",{get:function(){return o(this)},enumerable:true,configurable:true});Object.defineProperty(t,"style",{get:function(){return"harmonized-tabs{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;height:100%}harmonized-tabs .mdc-tab-bar{-ms-flex:0;flex:0}harmonized-tabs .mdc-tab-bar .mdc-tab-scroller__scroll-area--scroll{overflow-x:auto}harmonized-tabs .mdc-tab-bar .mdc-tab{line-height:1.25rem;height:40px}harmonized-tabs .mdc-tab-bar .mdc-tab .mdc-tab__icon,harmonized-tabs .mdc-tab-bar .mdc-tab .mdc-tab__text-label{color:#686868}harmonized-tabs .mdc-tab-bar .mdc-tab .mdc-tab__icon{color:#ddd;fill:currentColor}harmonized-tabs .mdc-tab-bar .mdc-tab .mdc-tab__ripple:after,harmonized-tabs .mdc-tab-bar .mdc-tab .mdc-tab__ripple:before{background-color:#686868}harmonized-tabs .mdc-tab-bar .mdc-tab .mdc-tab__ripple:hover:before{opacity:.04}harmonized-tabs .mdc-tab-bar .mdc-tab .mdc-tab__ripple.mdc-ripple-upgraded--background-focused:before,harmonized-tabs .mdc-tab-bar .mdc-tab .mdc-tab__ripple:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}harmonized-tabs .mdc-tab-bar .mdc-tab .mdc-tab__ripple:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}harmonized-tabs .mdc-tab-bar .mdc-tab .mdc-tab__ripple:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}harmonized-tabs .mdc-tab-bar .mdc-tab .mdc-tab__ripple.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}harmonized-tabs .mdc-tab-bar .mdc-tab.mdc-tab--active .mdc-tab__icon{color:#fff;fill:currentColor}harmonized-tabs .mdc-tab-bar .mdc-tab.mdc-tab--active .mdc-tab__text-label{color:#fff}harmonized-tabs .mdc-tab-bar .mdc-tab .mdc-tab-indicator__content--underline{border-color:#8cb7b8}harmonized-tabs .mdc-tab-bar .mdc-tab__text-label{font-size:12px}harmonized-tabs .tabs__panels{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;overflow-y:auto}"},enumerable:true,configurable:true});return t}())}}}));