!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);class s{static create(t,e){return"value"===t?new h(e):"list"===t?new r(e):"color"===t?new a(e):void 0}}class n{constructor({name:t,container:e,inputElement:i}){this._name=t,this._container=e,this._element=i,this.value=this._element.value,this._isValid=!0,this._isFocused=!1,this._caretAnimationDelay=0,this._eventListeners={},this.updateTextStyle(),this.createAndAppendCanvas(),this.subscribe(),this.updateCaretPosition(this._value.length),this.draw()}createAndAppendCanvas(){this._canvas=document.createElement("canvas"),this._ctx=this._canvas.getContext("2d"),this.updateCanvasSizeAndPosition(),this._canvas.classList.add("input-canvas"),this._container.appendChild(this._canvas)}updateCanvasSizeAndPosition(){const t=this._container.getBoundingClientRect(),e=this._element.getBoundingClientRect();this._canvas.width=Math.round(e.width),this._canvas.height=e.height,this._canvas.style.top=`${e.top-t.top}px`,this._canvas.style.left=`${e.left-t.left}px`}updateTextStyle(){const t=t=>parseInt(t.match(/\d+/)[0],10),e=window.getComputedStyle(this._element);this._textStyle={paddingLeft:t(e.paddingLeft),fontSize:t(e.fontSize),fontFamily:e.fontFamily}}updateCaretPosition(t){this._ctx.font=`${this._textStyle.fontSize}px ${this._textStyle.fontFamily}`;const e=this._value.slice(0,t),i=this._ctx.measureText(e).width,s=(t=>parseInt(t.match(/\d+/)[0],10))(this._canvas.style.left)+i+this._textStyle.paddingLeft;this._container.style.setProperty("--caret-left",`${s}px`),this.removeCaretAnimation()}update(t){this._isFocused&&(this._caretAnimationDelay-=t,this._caretAnimationDelay<0&&this.addCaretAnimation())}subscribe(){this._element.addEventListener("input",this.onUserInput.bind(this)),this._element.addEventListener("keydown",this.onUserKeyPress.bind(this)),this._element.addEventListener("focus",this.onFocus.bind(this)),this._element.addEventListener("mouseup",this.onUserMouseUp.bind(this)),this._element.addEventListener("mousedown",this.onUserMouseDown.bind(this)),this._element.addEventListener("blur",this.onBlur.bind(this))}onResize(){this.updateTextStyle(),this.updateCaretPosition(),this.updateCanvasSizeAndPosition()}onUserInput(t){this.value=t.currentTarget.value,this.updateCaretPosition(t.currentTarget.selectionStart),this.draw()}onFocus(t){const e=t.currentTarget;this._isFocused=!0,this._container.classList.add("focused"),setTimeout(()=>this.updateCaretPosition(e.selectionStart),0)}onBlur(t){const e=t.currentTarget;this._isFocused=!1,this._container.classList.remove("focused"),setTimeout(()=>this.updateCaretPosition(e.selectionStart),0)}onUserKeyPress(t){const e=t.currentTarget;setTimeout(()=>this.updateCaretPosition(e.selectionStart),0)}onUserMouseDown(t){const e=t.currentTarget;setTimeout(()=>this.updateCaretPosition(e.selectionStart),0)}onUserMouseUp(t){const e=t.currentTarget;setTimeout(()=>this.updateCaretPosition(e.selectionStart),0)}addCaretAnimation(){this._container.classList.add("animate-caret")}removeCaretAnimation(){this._caretAnimationDelay=n.caretAnimationDelay,this._container.classList.remove("animate-caret")}addErrorUnderline(){this._container.classList.add("invalid")}removeErrorUnderline(){this._container.classList.remove("invalid")}draw(){const t=(t,e)=>e&&e.text?this._ctx.measureText(e.text).width+t:t,e=({text:e,type:i},s,a)=>{const r=s>0?a.slice(0,s).reduce(t,0):0,h=this._textStyle.paddingLeft+r,o=n.inputValueTypes.find(t=>t.type===i)||n.inputValueTypes.find(t=>"default"===t.type);this._ctx.fillStyle=o.color,this._ctx.fillText(e,h,this._textStyle.fontSize)},i=t=>{this._ctx.fillStyle=n.inputValueTypes.find(t=>"default"===t.type).color,this._ctx.fillText(t,this._textStyle.paddingLeft,this._textStyle.fontSize)};this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height),this._ctx.font=`${this._textStyle.fontSize}px ${this._textStyle.fontFamily}`,this._formatedValue.forEach(({text:t="",type:s},n,a)=>{s?e({text:t,type:s},n,a):i(this._value)})}validate(t){const e=n.reservedWords.filter(t=>"unit"===t.type).map(t=>t.value).join("|"),i=n.reservedWords.filter(t=>"list"===t.type).map(t=>t.value).join("|"),s=new RegExp(`(^(\\d*\\.*\\d+)(${e})\\s*$)|^(${i})\\s*$|^\\s*$|(^#(?:[A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$)`),a=s.exec(t);if(this._isValid=s.test(t),this._isValid){const t=[{text:a[2],type:"number"},{text:a[3],type:"unit"},{text:a[4],type:"list"},{text:a[5],type:"color"}];return this.removeErrorUnderline(),t.filter(t=>!!t.text)}return[{}]}get name(){return this._name}get value(){return this._value}get exactValue(){return n.toExactValue(this._value)}get isValid(){return(!this._isValid||!this._value.length>0)&&this.addErrorUnderline(),this._isValid&&this._value.length>0}set value(t){this._value=t,this._element.value=t,this._formatedValue=this.validate(t)}static get caretAnimationDelay(){return 200}static get reservedWords(){return[{value:"px",type:"unit"},{value:"pt",type:"unit"},{value:"pc",type:"unit"},{value:"in",type:"unit"},{value:"cm",type:"unit"},{value:"mm",type:"unit"},{value:"em",type:"unit"},{value:"rem",type:"unit"},{value:"min",type:"unit"},{value:"s",type:"unit"},{value:"ms",type:"unit"},{value:"no",type:"list"},{value:"none",type:"list"},{value:"off",type:"list"},{value:"yes",type:"list"},{value:"on",type:"list"},{value:"latin",type:"list"},{value:"cyrillic",type:"list"},{value:"ukrainian",type:"list"},{value:"static",type:"list"},{value:"random",type:"list"}]}static get inputValueTypes(){return[{type:"number",color:"#AE81FF"},{type:"color",color:"#AE81FF"},{type:"unit",color:"#F92672"},{type:"list",color:"#45CBEF"},{type:"default",color:"white"}]}static toExactValue(t){const e=/^(\d+\.*\d*)(px|pt|pc|in|cm|mm|em|rem|min|s|ms)$/,i=/^(?:yes|on)$/.test(t),s=/^(?:no|none|off)$/.test(t),n=e.test(t),a=n?parseFloat(e.exec(t)[1]):0,r=n?e.exec(t)[2]:"default";if(i)return!0;if(s)return!1;if(n){return a*{default:1,px:1,pt:1.33,pc:16,in:96,cm:37.79,mm:377.95,em:16,rem:16,min:6e4,s:1e3,ms:1}[r]}return t}}class a extends n{constructor({name:t,container:e,inputElement:i}){super({name:t,container:e,inputElement:i}),this.updateCanvasSizeAndPosition()}onUserInput(t){this.value=t.currentTarget.value,this.updateCaretPosition(t.currentTarget.selectionStart),this.draw()}updateCanvasSizeAndPosition(){const t=this._container.getBoundingClientRect(),e=this._element.getBoundingClientRect(),i=this._colorInputShift?e.height+this._textStyle.fontSize/2:0;this._element.style.setProperty("--shift",`${i}px`),this._canvas.width=Math.round(e.width),this._canvas.height=e.height,this._canvas.style.top=`${e.top-t.top}px`,this._canvas.style.left=`${e.left-t.left-i}px`}updateCaretPosition(t){this._ctx.font=`${this._textStyle.fontSize}px ${this._textStyle.fontFamily}`;const e=this._value.slice(0,t),i=this._ctx.measureText(e).width,s=this._colorInputShift?this._canvas.height+this._textStyle.fontSize/2:0,n=(a=this._canvas.style.left,parseInt(a.match(/\d+/)[0],10)+i+this._textStyle.paddingLeft+s);var a;this._container.style.setProperty("--caret-left",`${n}px`),this._element.style.setProperty("--shift",`${s}px`),this._element.classList.add("color-shift"),this.removeCaretAnimation()}draw(){const t=(t,e)=>e&&e.text?this._ctx.measureText(e.text).width+t:t,e=({text:e},i,s)=>{const n=i>0?s.slice(0,i).reduce(t,0):0,r=this._canvas.height,h=this._textStyle.fontSize,o=this._textStyle.paddingLeft+n+r+h/2;this._ctx.fillStyle=e,this._ctx.strokeStyle="white",this._ctx.fillRect(h/2,0,r,r),this._ctx.strokeRect(h/2,0,r,r),this._ctx.fillStyle=a.inputValueType.color,this._ctx.fillText(e,o,this._textStyle.fontSize)},i=({text:e},i,s)=>{const n=i>0?s.slice(0,i).reduce(t,0):0,r=this._textStyle.paddingLeft+n;this._ctx.fillStyle=a.inputValueType.color,this._ctx.fillText(e,r,this._textStyle.fontSize)};this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height),this._ctx.font=`${this._textStyle.fontSize}px ${this._textStyle.fontFamily}`,this._isValid?this._formatedValue.forEach(e):this._formatedValue.forEach(i)}validate(t){const e=new RegExp("^#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"),i=e.exec(t);return this._isValid=e.test(t),this._isValid?(this._colorInputShift=!0,[{text:i[0],type:"color"}]):(this._colorInputShift=!1,[{text:t,type:"color"}])}get type(){return"color"}static get inputValueType(){return{type:"color",color:"#AE81FF"}}}class r extends n{constructor({name:t,container:e,inputElement:i}){super({name:t,container:e,inputElement:i})}get type(){return"list"}}class h extends n{constructor({name:t,container:e,inputElement:i}){super({name:t,container:e,inputElement:i})}get type(){return"value"}}const o=new class{constructor(){this._events={}}addEventListener(t,e){this._events[t]=this._events[t]||[],this._events[t].push(e)}emit(t,e={}){(this._events[t]||[]).forEach(t=>t(e))}};class c{constructor(t){this._container=t,this._startButton=this._container.querySelector("#start-button"),this._inputsArr=this.initInputs(),this._inputsIndxedObj=this.indexInputs(),this.subscribe()}subscribe(){this._startButton.addEventListener("click",this.onStartButtonClick.bind(this)),window.addEventListener("resize",this.onResize.bind(this))}onStartButtonClick(){o.emit("startGame")}onResize(){this._isShown?this._inputsArr.forEach(t=>t.onResize()):this._needToResize=!0}initInputs(){return[{name:"time",query:"#input-time",type:"value"},{name:"frequency",query:"#input-frequency",type:"value"},{name:"footLetter",query:"#input-foot-letter",type:"list"},{name:"fontSize",query:"#input-font-size",type:"value"},{name:"fontColor",query:"#input-font-color",type:"color"},{name:"backgroundColor",query:"#input-background-color",type:"color"},{name:"position",query:"#input-position",type:"list"},{name:"alphabet",query:"#input-alphabet",type:"list"}].map(({name:t,query:e,type:i})=>{const n=document.querySelector(e),a=n.closest(".input-wrapper");return s.create(i,{name:t,container:a,inputElement:n})})}indexInputs(){const t={};return this._inputsArr.forEach(e=>t[e.name]=e),t}update(t=0){this._inputsArr.forEach(e=>e.update(t))}draw(){this._inputsArr.forEach(t=>t.draw())}show(){this._isShown=!0,this._container.classList.remove("hidden"),this._needToResize&&(this._needToResize=!1,this.onResize())}hide(){this._isShown=!1,this._container.classList.add("hidden")}get exactValues(){return this._inputsArr.reduce((t,e)=>(t[e.name]=e.exactValue,t),{})}get values(){return this._inputsArr.reduce((t,e)=>(t[e.name]=e.value,t),{})}get json(){return JSON.stringify(this.values)}get allInputsValid(){return!this._inputsArr.map(t=>t.isValid).includes(!1)}set values(t){for(let e in t){const i=this._inputsIndxedObj[e];if(!i)return;i.value=t[e]}}}class l{constructor(t,{time:e=3e5}){this._element=t,this._timeLeft=e,this._formattedTime=""}update(t){this._timeLeft=Math.max(0,this._timeLeft-t);const e=this.formattedTime;this._element.innerHTML!==e&&(this._element.innerHTML=e),0===this._timeLeft&&o.emit("timeOver")}get formattedTime(){const t=864e5,e=36e5,i=6e4,s=1e3,n=Math.floor(this._timeLeft/t),a=Math.floor((this._timeLeft-n*t)/e),r=Math.floor((this._timeLeft-n*t-a*e)/i),h=Math.floor((this._timeLeft-n*t-a*e-r*i)/s),o={required:n>0,value:`${n}`};let c="";return o.required&&(c+=`${o.value}:`),(a>0||o.required)&&(c+=`${a<10?`0${a}`:`${a}`}:`),c+=`${r<10?`0${r}`:`${r}`}:${h<10?`0${h}`:`${h}`}`}get timeLeft(){return this._timeLeft}set time(t){this._timeLeft=t}}class u{constructor({alphabet:t="latin",fontSize:e,position:i,footLetter:s=!1}){this._alphabet=u.getAlphabet(t),this._hasFootLetter=s,this._fontSize=e,this._width=this.width,this._height=this.height,this._x=this.centerX,this._y=this.centerY,this._position=i,this._vocalLetter=this.randomLetter,this._handLetter=this.randomSideLetter,this._footLetter=this.randomSideLetter,this.subscribe(),this.update()}subscribe(){window.addEventListener("resize",this.onResize.bind(this))}onResize(){this._width=this.width,this._height=this.height}update(){const[t,e]="static"===this._position?this.centralCoords:this.randomCoords;this._timeToNextUpdate=this._frequency,this._vocalLetter=this.randomLetter,this._handLetter=this.randomSideLetter,this._footLetter=this._hasFootLetter?this.randomSideLetter:null,this._x=t,this._y=e}get randomLetter(){const t=Math.floor(Math.random()*this._alphabet.letters.length);return this._alphabet.letters[t]}get randomSideLetter(){const t=Math.random();return t<1/3?this._alphabet.left:t<2/3?this._alphabet.right:this._alphabet.both}get randomCoords(){if(!this._safeAreas||!this._safeAreas.length)return this.centralCoords;const t=this._safeAreas.map(t=>t.width*t.height),e=((t,e)=>{const i=e.reduce((t,e)=>t+e),s=Math.random()*i;let n=0;for(let i=0;i<t.length;i++)if(s<=(n+=e[i]))return t[i];return t[t.length]})(this._safeAreas,t);return[Math.floor(Math.random()*e.width+e.x),Math.floor(Math.random()*e.height+e.y)]}get centralCoords(){return[this.centerX,this.centerY]}get centerX(){return window.innerWidth/2-this._width/2}get centerY(){return window.innerHeight/2-this._height/2}get letters(){return{vocal:this._vocalLetter,hand:this._handLetter,foot:this._footLetter}}get box(){return{x:this._x,y:this._y,padding:this.padding,lineHeight:this.lineHeight,width:this._width,height:this._height}}get padding(){return Math.round(this._fontSize/2)}get lineHeight(){return Math.round(1.2*this._fontSize)}get width(){const t=document.createElement("canvas").getContext("2d");return t.font=`${this._fontSize}px Fira Code`,2*this.padding+t.measureText("M").width}get height(){return(this._hasFootLetter?3:2)*this.lineHeight}set safeAreas(t){this._safeAreas=t}static getAlphabet(t){const e={letters:"abcdefghiklmnopqrstvx",left:"l",right:"r",both:"b"};return"latin"===t?e:"ukrainian"===t?{letters:"абгґдеєжзиіїйклмнопрстуфхцчшщюя",left:"л",right:"п",both:"р"}:e}}class d{constructor(t=document){this._container=t,this._canvas=t.querySelector("#game-page-canvas"),this._buttonStop=t.querySelector("#stop-button"),this._buttonPause=t.querySelector("#pause-button"),this._timerGroup=t.querySelector(".timer-group-wrapper"),this._ctx=this._canvas.getContext("2d"),this._timeToHideInterface=d.showInterfaceTime,this._isShowingInterface=!0,this._hasFocusOnInterface=!1,this._isOnPause=!1,this.updateSize(),this.subscribe()}subscribe(){o.addEventListener("timeOver",this.onTimeOver.bind(this)),window.addEventListener("resize",this.onResize.bind(this)),this._container.addEventListener("pointermove",this.showInterface.bind(this)),this._buttonPause.addEventListener("click",this.togglePause.bind(this)),this._buttonPause.addEventListener("focus",this.focusOnInterface.bind(this)),this._buttonPause.addEventListener("blur",this.blurOffInterface.bind(this)),this._buttonPause.addEventListener("pointerenter",this.focusOnInterface.bind(this)),this._buttonPause.addEventListener("pointerout",this.blurOffInterface.bind(this)),this._buttonStop.addEventListener("click",this.stop.bind(this)),this._buttonStop.addEventListener("focus",this.focusOnInterface.bind(this)),this._buttonStop.addEventListener("blur",this.blurOffInterface.bind(this)),this._buttonStop.addEventListener("pointerenter",this.focusOnInterface.bind(this)),this._buttonStop.addEventListener("pointerout",this.blurOffInterface.bind(this))}updateObstacles(){this._safeAreas=[{x:0,y:0,width:window.innerWidth-this._card.box.width,height:window.innerHeight-this._card.box.height}],this.addObstacle(this._timerGroup.getBoundingClientRect())}updateSize(){this._canvas.width=window.innerWidth,this._canvas.height=window.innerHeight}update(t){this._isOnPause||(this._timeToNextCardUpdate-=t,this._timer.update(t),this._timeToNextCardUpdate<=0&&(this._timeToNextCardUpdate+=this._cardFrequency,this._card.safeAreas=this.safeAreas,this._card.update()),this._isShowingInterface&&!this._hasFocusOnInterface&&(this._timeToHideInterface-=t,this._timeToHideInterface<=0&&this.hideInterface()))}draw(){this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height),this.drawCard(this._card.letters,this._card.box)}drawCard({vocal:t,hand:e,foot:i},{x:s,y:n,width:a,padding:r,lineHeight:h,height:o}){this._ctx.font=`${this._prefs.fontSize}px Fira Code`,this._ctx.textBaseline="bottom",this._ctx.fillStyle=this._fontColor,this._ctx.fillText(t.toUpperCase(),s+r,n+h),this._ctx.fillText(e.toUpperCase(),s+r,n+2*h),i&&this._ctx.fillText(i.toUpperCase(),s+r,n+3*h)}togglePause(){this._isOnPause=!this._isOnPause,this._buttonPause.classList.toggle("passive"),this._buttonPause.classList.toggle("active")}pause(){this._isOnPause=!0,this._buttonPause.classList.remove("passive"),this._buttonPause.classList.add("active")}stop(){o.emit("stopGame")}show(){this._container.classList.remove("hidden"),this.updateObstacles()}showInterface(){this._isShowingInterface||(this._timeToHideInterface=d.showInterfaceTime,this._buttonStop.classList.remove("hidden"),this._buttonPause.classList.remove("hidden"),this._container.classList.remove("hide-cursor"),this._isShowingInterface=!0)}focusOnInterface(){this.showInterface(),this._hasFocusOnInterface=!0}blurOffInterface(){this._hasFocusOnInterface=!1}hide(){this._container.classList.add("hidden")}hideInterface(){this._buttonStop.classList.add("hidden"),this._buttonPause.classList.add("hidden"),this._container.classList.add("hide-cursor"),this._isShowingInterface=!1}onResize(){this.updateSize(),this._timer&&this.updateObstacles()}onTimeOver(){this.pause(),this.showInterface()}addObstacle({x:t,y:e,width:i,height:s}){const n={x:Math.round(10*(t-this._card.box.width))/10,y:Math.round(10*(e-this._card.box.height))/10,width:Math.round(10*(i+this._card.box.width))/10,height:Math.round(10*(s+this._card.box.height))/10},a=[{x:0,y:0,width:n.x,height:window.innerHeight},{x:n.x,y:0,width:n.width,height:n.y},{x:n.x+n.width,y:0,width:window.innerWidth-n.x-n.width,height:window.innerHeight},{x:n.x,y:n.y+n.height,width:n.width,height:window.innerHeight-n.y-n.height}],r=[];this._safeAreas.forEach(t=>{a.forEach(e=>{const i=((t,e)=>{const i=(t,e,i,s)=>{const n=(t,e,i)=>t>=e&&t<=i,a=n(t,i,s)?t:n(i,t,e)?i:null,r=n(e,i,s)?e:n(s,t,e)?s:null;return null===a||null===r?null:{min:a,max:r}},s=i(t.x,t.x+t.width,e.x,e.x+e.width),n=i(t.y,t.y+t.height,e.y,e.y+e.height);return s&&n?{x:s.min,y:n.min,width:s.max-s.min,height:n.max-n.min}:null})(t,e);i&&r.push(i)})}),this._safeAreas=r}get isOnPause(){return this._isOnPause}get safeAreas(){return this._safeAreas}set preferences(t){this._prefs=t,this._card=new u(t),this._cardFrequency=t.frequency,this._timeToNextCardUpdate=t.frequency,this.colors=t,this._timer=new l(this._container.querySelector("#timer"),t)}set colors({backgroundColor:t,fontColor:e}){const i=(t=>{const e=/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/.exec(t)[1],i=6===e.length?e:e[0]+e[0]+e[1]+e[1]+e[2]+e[2];return.299*parseInt(i.slice(0,2),16)+.587*parseInt(i.slice(2,4),16)+.114*parseInt(i.slice(4,6),16)>186?"#000":"#fff"})(t);this._fontColor=e,this._container.style.setProperty("--color-game-page-primary",i),this._container.style.setProperty("--color-game-page-secondary",t),"#000"===i?(this._buttonPause.classList.add("dark"),this._buttonStop.classList.add("dark"),this._buttonPause.classList.remove("light"),this._buttonStop.classList.remove("light")):(this._buttonPause.classList.add("light"),this._buttonStop.classList.add("light"),this._buttonPause.classList.remove("dark"),this._buttonStop.classList.remove("dark"))}static get showInterfaceTime(){return 2400}}class _{constructor(){this._prefs=new c(document.querySelector("#prefs-page")),this._game=new d(document.querySelector("#game-page")),this._currentPage="prefs",this._lastUpdate=0,this.onMount(),this.subscribe(),requestAnimationFrame(this.update())}onMount(){const t=this.getPrefsFromLocalMemory();t&&(this._prefs.values=t)}subscribe(){o.addEventListener("startGame",this.startGame.bind(this)),o.addEventListener("stopGame",this.endGame.bind(this))}startGame(){this.applyPreferences()&&(this._game.isOnPause&&this._game.togglePause(),this.setPrefsToLocalMemory(),this._currentPage="game",this._prefs.hide(),this._game.show())}endGame(){this._currentPage="prefs",this._prefs.show(),this._game.hide()}applyPreferences(){if(!this._prefs.allInputsValid)return!1;const t=this._prefs.exactValues;return this._game.preferences=t,!0}update(){return t=>{const e=Math.min(167,t-this._lastUpdate);this._lastUpdate=t,"prefs"===this._currentPage?(this._prefs.update(e),this._prefs.draw()):"game"===this._currentPage&&(this._game.update(e),this._game.draw()),requestAnimationFrame(this.update())}}setPrefsToLocalMemory(){localStorage.setItem("preferences",this._prefs.json)}getPrefsFromLocalMemory(){const t=localStorage.getItem("preferences");return t?JSON.parse(t):null}}window.addEventListener("load",function(){new _;"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js")})}]);