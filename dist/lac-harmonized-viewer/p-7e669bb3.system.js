System.register([],(function(t){"use strict";return{execute:function(){t({_:n,c:d,e:r,f:a,g:l,m:c});
/*! *****************************************************************************
            Copyright (c) Microsoft Corporation. All rights reserved.
            Licensed under the Apache License, Version 2.0 (the "License"); you may not use
            this file except in compliance with the License. You may obtain a copy of the
            License at http://www.apache.org/licenses/LICENSE-2.0

            THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
            KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
            WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
            MERCHANTABLITY OR NON-INFRINGEMENT.

            See the Apache Version 2.0 License for specific language governing permissions
            and limitations under the License.
            ***************************************************************************** */var e=function(t,n){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)if(e.hasOwnProperty(n))t[n]=e[n]};return e(t,n)};function n(t,n){e(t,n);function i(){this.constructor=t}t.prototype=n===null?Object.create(n):(i.prototype=n.prototype,new i)}var i=t("a",(function(){i=t("a",Object.assign||function t(e){for(var n,i=1,r=arguments.length;i<r;i++){n=arguments[i];for(var a in n)if(Object.prototype.hasOwnProperty.call(n,a))e[a]=n[a]}return e});return i.apply(this,arguments)}));function r(t){var e=typeof Symbol==="function"&&t[Symbol.iterator],n=0;if(e)return e.call(t);return{next:function(){if(t&&n>=t.length)t=void 0;return{value:t&&t[n++],done:!t}}}}function a(t,e){var n=typeof Symbol==="function"&&t[Symbol.iterator];if(!n)return t;var i=n.call(t),r,a=[],o;try{while((e===void 0||e-- >0)&&!(r=i.next()).done)a.push(r.value)}catch(s){o={error:s}}finally{try{if(r&&!r.done&&(n=i["return"]))n.call(i)}finally{if(o)throw o.error}}return a}function o(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(a(arguments[e]));return t}
/**
             * @license
             * Copyright 2016 Google Inc.
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
             */var s=t("M",function(){function t(t){if(t===void 0){t={}}this.adapter_=t}Object.defineProperty(t,"cssClasses",{get:function(){return{}},enumerable:true,configurable:true});Object.defineProperty(t,"strings",{get:function(){return{}},enumerable:true,configurable:true});Object.defineProperty(t,"numbers",{get:function(){return{}},enumerable:true,configurable:true});Object.defineProperty(t,"defaultAdapter",{get:function(){return{}},enumerable:true,configurable:true});t.prototype.init=function(){};t.prototype.destroy=function(){};return t}());
/**
             * @license
             * Copyright 2016 Google Inc.
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
             */var u=t("b",function(){function t(t,e){var n=[];for(var i=2;i<arguments.length;i++){n[i-2]=arguments[i]}this.root_=t;this.initialize.apply(this,o(n));this.foundation_=e===undefined?this.getDefaultFoundation():e;this.foundation_.init();this.initialSyncWithDOM()}t.attachTo=function(e){return new t(e,new s({}))};t.prototype.initialize=function(){var t=[];for(var e=0;e<arguments.length;e++){t[e]=arguments[e]}};t.prototype.getDefaultFoundation=function(){throw new Error("Subclasses must override getDefaultFoundation to return a properly configured "+"foundation class")};t.prototype.initialSyncWithDOM=function(){};t.prototype.destroy=function(){this.foundation_.destroy()};t.prototype.listen=function(t,e,n){this.root_.addEventListener(t,e,n)};t.prototype.unlisten=function(t,e,n){this.root_.removeEventListener(t,e,n)};t.prototype.emit=function(t,e,n){if(n===void 0){n=false}var i;if(typeof CustomEvent==="function"){i=new CustomEvent(t,{bubbles:n,detail:e})}else{i=document.createEvent("CustomEvent");i.initCustomEvent(t,n,false,e)}this.root_.dispatchEvent(i)};return t}());
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
             */function d(t,e){if(t.closest){return t.closest(e)}var n=t;while(n){if(c(n,e)){return n}n=n.parentElement}return null}function c(t,e){var n=t.matches||t.webkitMatchesSelector||t.msMatchesSelector;return n.call(t,e)}
/**
             * @license
             * Copyright 2019 Google Inc.
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
             */var f;function l(t,e){if(t===void 0){t=window}if(e===void 0){e=false}if(f===undefined||e){var n=false;try{t.document.addEventListener("test",(function(){return undefined}),{get passive(){n=true;return n}})}catch(i){}f=n}return f?{passive:true}:false}
/**
             * @license
             * Copyright 2016 Google Inc.
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
             */var p={BG_FOCUSED:"mdc-ripple-upgraded--background-focused",FG_ACTIVATION:"mdc-ripple-upgraded--foreground-activation",FG_DEACTIVATION:"mdc-ripple-upgraded--foreground-deactivation",ROOT:"mdc-ripple-upgraded",UNBOUNDED:"mdc-ripple-upgraded--unbounded"};var v={VAR_FG_SCALE:"--mdc-ripple-fg-scale",VAR_FG_SIZE:"--mdc-ripple-fg-size",VAR_FG_TRANSLATE_END:"--mdc-ripple-fg-translate-end",VAR_FG_TRANSLATE_START:"--mdc-ripple-fg-translate-start",VAR_LEFT:"--mdc-ripple-left",VAR_TOP:"--mdc-ripple-top"};var _={DEACTIVATION_TIMEOUT_MS:225,FG_DEACTIVATION_MS:150,INITIAL_ORIGIN_SCALE:.6,PADDING:10,TAP_DELAY_MS:300};var h;function m(t){var e=t.document;var n=e.createElement("div");n.className="mdc-ripple-surface--test-edge-var-bug";e.head.appendChild(n);var i=t.getComputedStyle(n);var r=i!==null&&i.borderTopStyle==="solid";if(n.parentNode){n.parentNode.removeChild(n)}return r}function g(t,e){if(e===void 0){e=false}var n=t.CSS;var i=h;if(typeof h==="boolean"&&!e){return h}var r=n&&typeof n.supports==="function";if(!r){return false}var a=n.supports("--css-vars","yes");var o=n.supports("(--css-vars: yes)")&&n.supports("color","#00000000");if(a||o){i=!m(t)}else{i=false}if(!e){h=i}return i}function y(t,e,n){if(!t){return{x:0,y:0}}var i=e.x,r=e.y;var a=i+n.left;var o=r+n.top;var s;var u;if(t.type==="touchstart"){var d=t;s=d.changedTouches[0].pageX-a;u=d.changedTouches[0].pageY-o}else{var c=t;s=c.pageX-a;u=c.pageY-o}return{x:s,y:u}}
/**
             * @license
             * Copyright 2016 Google Inc.
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
             */var A=["touchstart","pointerdown","mousedown","keydown"];var b=["touchend","pointerup","mouseup","contextmenu"];var C=[];var E=t("h",function(t){n(e,t);function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;r.activationAnimationHasEnded_=false;r.activationTimer_=0;r.fgDeactivationRemovalTimer_=0;r.fgScale_="0";r.frame_={width:0,height:0};r.initialSize_=0;r.layoutFrame_=0;r.maxRadius_=0;r.unboundedCoords_={left:0,top:0};r.activationState_=r.defaultActivationState_();r.activationTimerCallback_=function(){r.activationAnimationHasEnded_=true;r.runDeactivationUXLogicIfReady_()};r.activateHandler_=function(t){return r.activate_(t)};r.deactivateHandler_=function(){return r.deactivate_()};r.focusHandler_=function(){return r.handleFocus()};r.blurHandler_=function(){return r.handleBlur()};r.resizeHandler_=function(){return r.layout()};return r}Object.defineProperty(e,"cssClasses",{get:function(){return p},enumerable:true,configurable:true});Object.defineProperty(e,"strings",{get:function(){return v},enumerable:true,configurable:true});Object.defineProperty(e,"numbers",{get:function(){return _},enumerable:true,configurable:true});Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){return undefined},browserSupportsCssVars:function(){return true},computeBoundingRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},containsEventTarget:function(){return true},deregisterDocumentInteractionHandler:function(){return undefined},deregisterInteractionHandler:function(){return undefined},deregisterResizeHandler:function(){return undefined},getWindowPageOffset:function(){return{x:0,y:0}},isSurfaceActive:function(){return true},isSurfaceDisabled:function(){return true},isUnbounded:function(){return true},registerDocumentInteractionHandler:function(){return undefined},registerInteractionHandler:function(){return undefined},registerResizeHandler:function(){return undefined},removeClass:function(){return undefined},updateCssVariable:function(){return undefined}}},enumerable:true,configurable:true});e.prototype.init=function(){var t=this;var n=this.supportsPressRipple_();this.registerRootHandlers_(n);if(n){var i=e.cssClasses,r=i.ROOT,a=i.UNBOUNDED;requestAnimationFrame((function(){t.adapter_.addClass(r);if(t.adapter_.isUnbounded()){t.adapter_.addClass(a);t.layoutInternal_()}}))}};e.prototype.destroy=function(){var t=this;if(this.supportsPressRipple_()){if(this.activationTimer_){clearTimeout(this.activationTimer_);this.activationTimer_=0;this.adapter_.removeClass(e.cssClasses.FG_ACTIVATION)}if(this.fgDeactivationRemovalTimer_){clearTimeout(this.fgDeactivationRemovalTimer_);this.fgDeactivationRemovalTimer_=0;this.adapter_.removeClass(e.cssClasses.FG_DEACTIVATION)}var n=e.cssClasses,i=n.ROOT,r=n.UNBOUNDED;requestAnimationFrame((function(){t.adapter_.removeClass(i);t.adapter_.removeClass(r);t.removeCssVars_()}))}this.deregisterRootHandlers_();this.deregisterDeactivationHandlers_()};e.prototype.activate=function(t){this.activate_(t)};e.prototype.deactivate=function(){this.deactivate_()};e.prototype.layout=function(){var t=this;if(this.layoutFrame_){cancelAnimationFrame(this.layoutFrame_)}this.layoutFrame_=requestAnimationFrame((function(){t.layoutInternal_();t.layoutFrame_=0}))};e.prototype.setUnbounded=function(t){var n=e.cssClasses.UNBOUNDED;if(t){this.adapter_.addClass(n)}else{this.adapter_.removeClass(n)}};e.prototype.handleFocus=function(){var t=this;requestAnimationFrame((function(){return t.adapter_.addClass(e.cssClasses.BG_FOCUSED)}))};e.prototype.handleBlur=function(){var t=this;requestAnimationFrame((function(){return t.adapter_.removeClass(e.cssClasses.BG_FOCUSED)}))};e.prototype.supportsPressRipple_=function(){return this.adapter_.browserSupportsCssVars()};e.prototype.defaultActivationState_=function(){return{activationEvent:undefined,hasDeactivationUXRun:false,isActivated:false,isProgrammatic:false,wasActivatedByPointer:false,wasElementMadeActive:false}};e.prototype.registerRootHandlers_=function(t){var e=this;if(t){A.forEach((function(t){e.adapter_.registerInteractionHandler(t,e.activateHandler_)}));if(this.adapter_.isUnbounded()){this.adapter_.registerResizeHandler(this.resizeHandler_)}}this.adapter_.registerInteractionHandler("focus",this.focusHandler_);this.adapter_.registerInteractionHandler("blur",this.blurHandler_)};e.prototype.registerDeactivationHandlers_=function(t){var e=this;if(t.type==="keydown"){this.adapter_.registerInteractionHandler("keyup",this.deactivateHandler_)}else{b.forEach((function(t){e.adapter_.registerDocumentInteractionHandler(t,e.deactivateHandler_)}))}};e.prototype.deregisterRootHandlers_=function(){var t=this;A.forEach((function(e){t.adapter_.deregisterInteractionHandler(e,t.activateHandler_)}));this.adapter_.deregisterInteractionHandler("focus",this.focusHandler_);this.adapter_.deregisterInteractionHandler("blur",this.blurHandler_);if(this.adapter_.isUnbounded()){this.adapter_.deregisterResizeHandler(this.resizeHandler_)}};e.prototype.deregisterDeactivationHandlers_=function(){var t=this;this.adapter_.deregisterInteractionHandler("keyup",this.deactivateHandler_);b.forEach((function(e){t.adapter_.deregisterDocumentInteractionHandler(e,t.deactivateHandler_)}))};e.prototype.removeCssVars_=function(){var t=this;var n=e.strings;var i=Object.keys(n);i.forEach((function(e){if(e.indexOf("VAR_")===0){t.adapter_.updateCssVariable(n[e],null)}}))};e.prototype.activate_=function(t){var e=this;if(this.adapter_.isSurfaceDisabled()){return}var n=this.activationState_;if(n.isActivated){return}var i=this.previousActivationEvent_;var r=i&&t!==undefined&&i.type!==t.type;if(r){return}n.isActivated=true;n.isProgrammatic=t===undefined;n.activationEvent=t;n.wasActivatedByPointer=n.isProgrammatic?false:t!==undefined&&(t.type==="mousedown"||t.type==="touchstart"||t.type==="pointerdown");var a=t!==undefined&&C.length>0&&C.some((function(t){return e.adapter_.containsEventTarget(t)}));if(a){this.resetActivationState_();return}if(t!==undefined){C.push(t.target);this.registerDeactivationHandlers_(t)}n.wasElementMadeActive=this.checkElementMadeActive_(t);if(n.wasElementMadeActive){this.animateActivation_()}requestAnimationFrame((function(){C=[];if(!n.wasElementMadeActive&&t!==undefined&&(t.key===" "||t.keyCode===32)){n.wasElementMadeActive=e.checkElementMadeActive_(t);if(n.wasElementMadeActive){e.animateActivation_()}}if(!n.wasElementMadeActive){e.activationState_=e.defaultActivationState_()}}))};e.prototype.checkElementMadeActive_=function(t){return t!==undefined&&t.type==="keydown"?this.adapter_.isSurfaceActive():true};e.prototype.animateActivation_=function(){var t=this;var n=e.strings,i=n.VAR_FG_TRANSLATE_START,r=n.VAR_FG_TRANSLATE_END;var a=e.cssClasses,o=a.FG_DEACTIVATION,s=a.FG_ACTIVATION;var u=e.numbers.DEACTIVATION_TIMEOUT_MS;this.layoutInternal_();var d="";var c="";if(!this.adapter_.isUnbounded()){var f=this.getFgTranslationCoordinates_(),l=f.startPoint,p=f.endPoint;d=l.x+"px, "+l.y+"px";c=p.x+"px, "+p.y+"px"}this.adapter_.updateCssVariable(i,d);this.adapter_.updateCssVariable(r,c);clearTimeout(this.activationTimer_);clearTimeout(this.fgDeactivationRemovalTimer_);this.rmBoundedActivationClasses_();this.adapter_.removeClass(o);this.adapter_.computeBoundingRect();this.adapter_.addClass(s);this.activationTimer_=setTimeout((function(){return t.activationTimerCallback_()}),u)};e.prototype.getFgTranslationCoordinates_=function(){var t=this.activationState_,e=t.activationEvent,n=t.wasActivatedByPointer;var i;if(n){i=y(e,this.adapter_.getWindowPageOffset(),this.adapter_.computeBoundingRect())}else{i={x:this.frame_.width/2,y:this.frame_.height/2}}i={x:i.x-this.initialSize_/2,y:i.y-this.initialSize_/2};var r={x:this.frame_.width/2-this.initialSize_/2,y:this.frame_.height/2-this.initialSize_/2};return{startPoint:i,endPoint:r}};e.prototype.runDeactivationUXLogicIfReady_=function(){var t=this;var n=e.cssClasses.FG_DEACTIVATION;var i=this.activationState_,r=i.hasDeactivationUXRun,a=i.isActivated;var o=r||!a;if(o&&this.activationAnimationHasEnded_){this.rmBoundedActivationClasses_();this.adapter_.addClass(n);this.fgDeactivationRemovalTimer_=setTimeout((function(){t.adapter_.removeClass(n)}),_.FG_DEACTIVATION_MS)}};e.prototype.rmBoundedActivationClasses_=function(){var t=e.cssClasses.FG_ACTIVATION;this.adapter_.removeClass(t);this.activationAnimationHasEnded_=false;this.adapter_.computeBoundingRect()};e.prototype.resetActivationState_=function(){var t=this;this.previousActivationEvent_=this.activationState_.activationEvent;this.activationState_=this.defaultActivationState_();setTimeout((function(){return t.previousActivationEvent_=undefined}),e.numbers.TAP_DELAY_MS)};e.prototype.deactivate_=function(){var t=this;var e=this.activationState_;if(!e.isActivated){return}var n=i({},e);if(e.isProgrammatic){requestAnimationFrame((function(){return t.animateDeactivation_(n)}));this.resetActivationState_()}else{this.deregisterDeactivationHandlers_();requestAnimationFrame((function(){t.activationState_.hasDeactivationUXRun=true;t.animateDeactivation_(n);t.resetActivationState_()}))}};e.prototype.animateDeactivation_=function(t){var e=t.wasActivatedByPointer,n=t.wasElementMadeActive;if(e||n){this.runDeactivationUXLogicIfReady_()}};e.prototype.layoutInternal_=function(){var t=this;this.frame_=this.adapter_.computeBoundingRect();var n=Math.max(this.frame_.height,this.frame_.width);var i=function(){var n=Math.sqrt(Math.pow(t.frame_.width,2)+Math.pow(t.frame_.height,2));return n+e.numbers.PADDING};this.maxRadius_=this.adapter_.isUnbounded()?n:i();var r=Math.floor(n*e.numbers.INITIAL_ORIGIN_SCALE);if(this.adapter_.isUnbounded()&&r%2!==0){this.initialSize_=r-1}else{this.initialSize_=r}this.fgScale_=""+this.maxRadius_/this.initialSize_;this.updateLayoutCssVars_()};e.prototype.updateLayoutCssVars_=function(){var t=e.strings,n=t.VAR_FG_SIZE,i=t.VAR_LEFT,r=t.VAR_TOP,a=t.VAR_FG_SCALE;this.adapter_.updateCssVariable(n,this.initialSize_+"px");this.adapter_.updateCssVariable(a,this.fgScale_);if(this.adapter_.isUnbounded()){this.unboundedCoords_={left:Math.round(this.frame_.width/2-this.initialSize_/2),top:Math.round(this.frame_.height/2-this.initialSize_/2)};this.adapter_.updateCssVariable(i,this.unboundedCoords_.left+"px");this.adapter_.updateCssVariable(r,this.unboundedCoords_.top+"px")}};return e}(s));
/**
             * @license
             * Copyright 2016 Google Inc.
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
             */var T=t("d",function(t){n(e,t);function e(){var e=t!==null&&t.apply(this,arguments)||this;e.disabled=false;return e}e.attachTo=function(t,n){if(n===void 0){n={isUnbounded:undefined}}var i=new e(t);if(n.isUnbounded!==undefined){i.unbounded=n.isUnbounded}return i};e.createAdapter=function(t){return{addClass:function(e){return t.root_.classList.add(e)},browserSupportsCssVars:function(){return g(window)},computeBoundingRect:function(){return t.root_.getBoundingClientRect()},containsEventTarget:function(e){return t.root_.contains(e)},deregisterDocumentInteractionHandler:function(t,e){return document.documentElement.removeEventListener(t,e,l())},deregisterInteractionHandler:function(e,n){return t.root_.removeEventListener(e,n,l())},deregisterResizeHandler:function(t){return window.removeEventListener("resize",t)},getWindowPageOffset:function(){return{x:window.pageXOffset,y:window.pageYOffset}},isSurfaceActive:function(){return c(t.root_,":active")},isSurfaceDisabled:function(){return Boolean(t.disabled)},isUnbounded:function(){return Boolean(t.unbounded)},registerDocumentInteractionHandler:function(t,e){return document.documentElement.addEventListener(t,e,l())},registerInteractionHandler:function(e,n){return t.root_.addEventListener(e,n,l())},registerResizeHandler:function(t){return window.addEventListener("resize",t)},removeClass:function(e){return t.root_.classList.remove(e)},updateCssVariable:function(e,n){return t.root_.style.setProperty(e,n)}}};Object.defineProperty(e.prototype,"unbounded",{get:function(){return Boolean(this.unbounded_)},set:function(t){this.unbounded_=Boolean(t);this.setUnbounded_()},enumerable:true,configurable:true});e.prototype.activate=function(){this.foundation_.activate()};e.prototype.deactivate=function(){this.foundation_.deactivate()};e.prototype.layout=function(){this.foundation_.layout()};e.prototype.getDefaultFoundation=function(){return new E(e.createAdapter(this))};e.prototype.initialSyncWithDOM=function(){var t=this.root_;this.unbounded="mdcRippleIsUnbounded"in t.dataset};e.prototype.setUnbounded_=function(){this.foundation_.setUnbounded(Boolean(this.unbounded_))};return e}(u))}}}));