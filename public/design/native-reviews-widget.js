var Jd=Object.defineProperty;var qd=(e,n,t)=>n in e?Jd(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var Wr=(e,n,t)=>qd(e,typeof n!="symbol"?n+"":n,t);var Tu={exports:{}},ll={},Ru={exports:{}},$={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var br=Symbol.for("react.element"),ef=Symbol.for("react.portal"),nf=Symbol.for("react.fragment"),tf=Symbol.for("react.strict_mode"),rf=Symbol.for("react.profiler"),lf=Symbol.for("react.provider"),sf=Symbol.for("react.context"),of=Symbol.for("react.forward_ref"),af=Symbol.for("react.suspense"),uf=Symbol.for("react.memo"),cf=Symbol.for("react.lazy"),ta=Symbol.iterator;function df(e){return e===null||typeof e!="object"?null:(e=ta&&e[ta]||e["@@iterator"],typeof e=="function"?e:null)}var Lu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Pu=Object.assign,Ou={};function Zt(e,n,t){this.props=e,this.context=n,this.refs=Ou,this.updater=t||Lu}Zt.prototype.isReactComponent={};Zt.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};Zt.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Mu(){}Mu.prototype=Zt.prototype;function no(e,n,t){this.props=e,this.context=n,this.refs=Ou,this.updater=t||Lu}var to=no.prototype=new Mu;to.constructor=no;Pu(to,Zt.prototype);to.isPureReactComponent=!0;var ra=Array.isArray,Iu=Object.prototype.hasOwnProperty,ro={current:null},Du={key:!0,ref:!0,__self:!0,__source:!0};function $u(e,n,t){var r,i={},l=null,s=null;if(n!=null)for(r in n.ref!==void 0&&(s=n.ref),n.key!==void 0&&(l=""+n.key),n)Iu.call(n,r)&&!Du.hasOwnProperty(r)&&(i[r]=n[r]);var o=arguments.length-2;if(o===1)i.children=t;else if(1<o){for(var a=Array(o),u=0;u<o;u++)a[u]=arguments[u+2];i.children=a}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return{$$typeof:br,type:e,key:l,ref:s,props:i,_owner:ro.current}}function ff(e,n){return{$$typeof:br,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function io(e){return typeof e=="object"&&e!==null&&e.$$typeof===br}function pf(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var ia=/\/+/g;function zl(e,n){return typeof e=="object"&&e!==null&&e.key!=null?pf(""+e.key):n.toString(36)}function ci(e,n,t,r,i){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(l){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case br:case ef:s=!0}}if(s)return s=e,i=i(s),e=r===""?"."+zl(s,0):r,ra(i)?(t="",e!=null&&(t=e.replace(ia,"$&/")+"/"),ci(i,n,t,"",function(u){return u})):i!=null&&(io(i)&&(i=ff(i,t+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(ia,"$&/")+"/")+e)),n.push(i)),1;if(s=0,r=r===""?".":r+":",ra(e))for(var o=0;o<e.length;o++){l=e[o];var a=r+zl(l,o);s+=ci(l,n,t,a,i)}else if(a=df(e),typeof a=="function")for(e=a.call(e),o=0;!(l=e.next()).done;)l=l.value,a=r+zl(l,o++),s+=ci(l,n,t,a,i);else if(l==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return s}function Hr(e,n,t){if(e==null)return e;var r=[],i=0;return ci(e,r,"","",function(l){return n.call(t,l,i++)}),r}function hf(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ke={current:null},di={transition:null},mf={ReactCurrentDispatcher:ke,ReactCurrentBatchConfig:di,ReactCurrentOwner:ro};function bu(){throw Error("act(...) is not supported in production builds of React.")}$.Children={map:Hr,forEach:function(e,n,t){Hr(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return Hr(e,function(){n++}),n},toArray:function(e){return Hr(e,function(n){return n})||[]},only:function(e){if(!io(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};$.Component=Zt;$.Fragment=nf;$.Profiler=rf;$.PureComponent=no;$.StrictMode=tf;$.Suspense=af;$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=mf;$.act=bu;$.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Pu({},e.props),i=e.key,l=e.ref,s=e._owner;if(n!=null){if(n.ref!==void 0&&(l=n.ref,s=ro.current),n.key!==void 0&&(i=""+n.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(a in n)Iu.call(n,a)&&!Du.hasOwnProperty(a)&&(r[a]=n[a]===void 0&&o!==void 0?o[a]:n[a])}var a=arguments.length-2;if(a===1)r.children=t;else if(1<a){o=Array(a);for(var u=0;u<a;u++)o[u]=arguments[u+2];r.children=o}return{$$typeof:br,type:e.type,key:i,ref:l,props:r,_owner:s}};$.createContext=function(e){return e={$$typeof:sf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:lf,_context:e},e.Consumer=e};$.createElement=$u;$.createFactory=function(e){var n=$u.bind(null,e);return n.type=e,n};$.createRef=function(){return{current:null}};$.forwardRef=function(e){return{$$typeof:of,render:e}};$.isValidElement=io;$.lazy=function(e){return{$$typeof:cf,_payload:{_status:-1,_result:e},_init:hf}};$.memo=function(e,n){return{$$typeof:uf,type:e,compare:n===void 0?null:n}};$.startTransition=function(e){var n=di.transition;di.transition={};try{e()}finally{di.transition=n}};$.unstable_act=bu;$.useCallback=function(e,n){return ke.current.useCallback(e,n)};$.useContext=function(e){return ke.current.useContext(e)};$.useDebugValue=function(){};$.useDeferredValue=function(e){return ke.current.useDeferredValue(e)};$.useEffect=function(e,n){return ke.current.useEffect(e,n)};$.useId=function(){return ke.current.useId()};$.useImperativeHandle=function(e,n,t){return ke.current.useImperativeHandle(e,n,t)};$.useInsertionEffect=function(e,n){return ke.current.useInsertionEffect(e,n)};$.useLayoutEffect=function(e,n){return ke.current.useLayoutEffect(e,n)};$.useMemo=function(e,n){return ke.current.useMemo(e,n)};$.useReducer=function(e,n,t){return ke.current.useReducer(e,n,t)};$.useRef=function(e){return ke.current.useRef(e)};$.useState=function(e){return ke.current.useState(e)};$.useSyncExternalStore=function(e,n,t){return ke.current.useSyncExternalStore(e,n,t)};$.useTransition=function(){return ke.current.useTransition()};$.version="18.3.1";Ru.exports=$;var X=Ru.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gf=X,vf=Symbol.for("react.element"),yf=Symbol.for("react.fragment"),xf=Object.prototype.hasOwnProperty,_f=gf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,wf={key:!0,ref:!0,__self:!0,__source:!0};function Au(e,n,t){var r,i={},l=null,s=null;t!==void 0&&(l=""+t),n.key!==void 0&&(l=""+n.key),n.ref!==void 0&&(s=n.ref);for(r in n)xf.call(n,r)&&!wf.hasOwnProperty(r)&&(i[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)i[r]===void 0&&(i[r]=n[r]);return{$$typeof:vf,type:e,key:l,ref:s,props:i,_owner:_f.current}}ll.Fragment=yf;ll.jsx=Au;ll.jsxs=Au;Tu.exports=ll;var c=Tu.exports,Fu={exports:{}},Me={},Uu={exports:{}},Vu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(C,M){var D=C.length;C.push(M);e:for(;0<D;){var le=D-1>>>1,ce=C[le];if(0<i(ce,M))C[le]=M,C[D]=ce,D=le;else break e}}function t(C){return C.length===0?null:C[0]}function r(C){if(C.length===0)return null;var M=C[0],D=C.pop();if(D!==M){C[0]=D;e:for(var le=0,ce=C.length,Br=ce>>>1;le<Br;){var Hn=2*(le+1)-1,El=C[Hn],Qn=Hn+1,Zr=C[Qn];if(0>i(El,D))Qn<ce&&0>i(Zr,El)?(C[le]=Zr,C[Qn]=D,le=Qn):(C[le]=El,C[Hn]=D,le=Hn);else if(Qn<ce&&0>i(Zr,D))C[le]=Zr,C[Qn]=D,le=Qn;else break e}}return M}function i(C,M){var D=C.sortIndex-M.sortIndex;return D!==0?D:C.id-M.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var s=Date,o=s.now();e.unstable_now=function(){return s.now()-o}}var a=[],u=[],f=1,h=null,g=3,_=!1,w=!1,S=!1,B=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(C){for(var M=t(u);M!==null;){if(M.callback===null)r(u);else if(M.startTime<=C)r(u),M.sortIndex=M.expirationTime,n(a,M);else break;M=t(u)}}function v(C){if(S=!1,m(C),!w)if(t(a)!==null)w=!0,jl(j);else{var M=t(u);M!==null&&Cl(v,M.startTime-C)}}function j(C,M){w=!1,S&&(S=!1,p(L),L=-1),_=!0;var D=g;try{for(m(M),h=t(a);h!==null&&(!(h.expirationTime>M)||C&&!Ze());){var le=h.callback;if(typeof le=="function"){h.callback=null,g=h.priorityLevel;var ce=le(h.expirationTime<=M);M=e.unstable_now(),typeof ce=="function"?h.callback=ce:h===t(a)&&r(a),m(M)}else r(a);h=t(a)}if(h!==null)var Br=!0;else{var Hn=t(u);Hn!==null&&Cl(v,Hn.startTime-M),Br=!1}return Br}finally{h=null,g=D,_=!1}}var T=!1,R=null,L=-1,ie=5,b=-1;function Ze(){return!(e.unstable_now()-b<ie)}function Yt(){if(R!==null){var C=e.unstable_now();b=C;var M=!0;try{M=R(!0,C)}finally{M?Kt():(T=!1,R=null)}}else T=!1}var Kt;if(typeof d=="function")Kt=function(){d(Yt)};else if(typeof MessageChannel<"u"){var na=new MessageChannel,Xd=na.port2;na.port1.onmessage=Yt,Kt=function(){Xd.postMessage(null)}}else Kt=function(){B(Yt,0)};function jl(C){R=C,T||(T=!0,Kt())}function Cl(C,M){L=B(function(){C(e.unstable_now())},M)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(C){C.callback=null},e.unstable_continueExecution=function(){w||_||(w=!0,jl(j))},e.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ie=0<C?Math.floor(1e3/C):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return t(a)},e.unstable_next=function(C){switch(g){case 1:case 2:case 3:var M=3;break;default:M=g}var D=g;g=M;try{return C()}finally{g=D}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(C,M){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var D=g;g=C;try{return M()}finally{g=D}},e.unstable_scheduleCallback=function(C,M,D){var le=e.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?le+D:le):D=le,C){case 1:var ce=-1;break;case 2:ce=250;break;case 5:ce=1073741823;break;case 4:ce=1e4;break;default:ce=5e3}return ce=D+ce,C={id:f++,callback:M,priorityLevel:C,startTime:D,expirationTime:ce,sortIndex:-1},D>le?(C.sortIndex=D,n(u,C),t(a)===null&&C===t(u)&&(S?(p(L),L=-1):S=!0,Cl(v,D-le))):(C.sortIndex=ce,n(a,C),w||_||(w=!0,jl(j))),C},e.unstable_shouldYield=Ze,e.unstable_wrapCallback=function(C){var M=g;return function(){var D=g;g=M;try{return C.apply(this,arguments)}finally{g=D}}}})(Vu);Uu.exports=Vu;var kf=Uu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sf=X,Pe=kf;function y(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Bu=new Set,yr={};function dt(e,n){Mt(e,n),Mt(e+"Capture",n)}function Mt(e,n){for(yr[e]=n,e=0;e<n.length;e++)Bu.add(n[e])}var mn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),is=Object.prototype.hasOwnProperty,Nf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la={},sa={};function jf(e){return is.call(sa,e)?!0:is.call(la,e)?!1:Nf.test(e)?sa[e]=!0:(la[e]=!0,!1)}function Cf(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Ef(e,n,t,r){if(n===null||typeof n>"u"||Cf(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function Se(e,n,t,r,i,l,s){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=l,this.removeEmptyString=s}var me={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){me[e]=new Se(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];me[n]=new Se(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){me[e]=new Se(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){me[e]=new Se(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){me[e]=new Se(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){me[e]=new Se(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){me[e]=new Se(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){me[e]=new Se(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){me[e]=new Se(e,5,!1,e.toLowerCase(),null,!1,!1)});var lo=/[\-:]([a-z])/g;function so(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(lo,so);me[n]=new Se(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(lo,so);me[n]=new Se(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(lo,so);me[n]=new Se(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){me[e]=new Se(e,1,!1,e.toLowerCase(),null,!1,!1)});me.xlinkHref=new Se("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){me[e]=new Se(e,1,!1,e.toLowerCase(),null,!0,!0)});function oo(e,n,t,r){var i=me.hasOwnProperty(n)?me[n]:null;(i!==null?i.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Ef(n,t,i,r)&&(t=null),r||i===null?jf(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):i.mustUseProperty?e[i.propertyName]=t===null?i.type===3?!1:"":t:(n=i.attributeName,r=i.attributeNamespace,t===null?e.removeAttribute(n):(i=i.type,t=i===3||i===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var wn=Sf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Qr=Symbol.for("react.element"),gt=Symbol.for("react.portal"),vt=Symbol.for("react.fragment"),ao=Symbol.for("react.strict_mode"),ls=Symbol.for("react.profiler"),Zu=Symbol.for("react.provider"),Wu=Symbol.for("react.context"),uo=Symbol.for("react.forward_ref"),ss=Symbol.for("react.suspense"),os=Symbol.for("react.suspense_list"),co=Symbol.for("react.memo"),Sn=Symbol.for("react.lazy"),Hu=Symbol.for("react.offscreen"),oa=Symbol.iterator;function Gt(e){return e===null||typeof e!="object"?null:(e=oa&&e[oa]||e["@@iterator"],typeof e=="function"?e:null)}var ne=Object.assign,Tl;function ir(e){if(Tl===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Tl=n&&n[1]||""}return`
`+Tl+e}var Rl=!1;function Ll(e,n){if(!e||Rl)return"";Rl=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(u){var r=u}Reflect.construct(e,[],n)}else{try{n.call()}catch(u){r=u}e.call(n.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),l=r.stack.split(`
`),s=i.length-1,o=l.length-1;1<=s&&0<=o&&i[s]!==l[o];)o--;for(;1<=s&&0<=o;s--,o--)if(i[s]!==l[o]){if(s!==1||o!==1)do if(s--,o--,0>o||i[s]!==l[o]){var a=`
`+i[s].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=s&&0<=o);break}}}finally{Rl=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?ir(e):""}function zf(e){switch(e.tag){case 5:return ir(e.type);case 16:return ir("Lazy");case 13:return ir("Suspense");case 19:return ir("SuspenseList");case 0:case 2:case 15:return e=Ll(e.type,!1),e;case 11:return e=Ll(e.type.render,!1),e;case 1:return e=Ll(e.type,!0),e;default:return""}}function as(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case vt:return"Fragment";case gt:return"Portal";case ls:return"Profiler";case ao:return"StrictMode";case ss:return"Suspense";case os:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Wu:return(e.displayName||"Context")+".Consumer";case Zu:return(e._context.displayName||"Context")+".Provider";case uo:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case co:return n=e.displayName||null,n!==null?n:as(e.type)||"Memo";case Sn:n=e._payload,e=e._init;try{return as(e(n))}catch{}}return null}function Tf(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return as(n);case 8:return n===ao?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function An(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Qu(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Rf(e){var n=Qu(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var i=t.get,l=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return i.call(this)},set:function(s){r=""+s,l.call(this,s)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Yr(e){e._valueTracker||(e._valueTracker=Rf(e))}function Yu(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=Qu(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function ki(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function us(e,n){var t=n.checked;return ne({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function aa(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=An(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Ku(e,n){n=n.checked,n!=null&&oo(e,"checked",n,!1)}function cs(e,n){Ku(e,n);var t=An(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?ds(e,n.type,t):n.hasOwnProperty("defaultValue")&&ds(e,n.type,An(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function ua(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function ds(e,n,t){(n!=="number"||ki(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var lr=Array.isArray;function zt(e,n,t,r){if(e=e.options,n){n={};for(var i=0;i<t.length;i++)n["$"+t[i]]=!0;for(t=0;t<e.length;t++)i=n.hasOwnProperty("$"+e[t].value),e[t].selected!==i&&(e[t].selected=i),i&&r&&(e[t].defaultSelected=!0)}else{for(t=""+An(t),n=null,i=0;i<e.length;i++){if(e[i].value===t){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}n!==null||e[i].disabled||(n=e[i])}n!==null&&(n.selected=!0)}}function fs(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(y(91));return ne({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ca(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(y(92));if(lr(t)){if(1<t.length)throw Error(y(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:An(t)}}function Gu(e,n){var t=An(n.value),r=An(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function da(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Xu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ps(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Xu(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Kr,Ju=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,i){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,i)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(Kr=Kr||document.createElement("div"),Kr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=Kr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function xr(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var ur={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Lf=["Webkit","ms","Moz","O"];Object.keys(ur).forEach(function(e){Lf.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),ur[n]=ur[e]})});function qu(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||ur.hasOwnProperty(e)&&ur[e]?(""+n).trim():n+"px"}function ec(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,i=qu(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,i):e[t]=i}}var Pf=ne({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function hs(e,n){if(n){if(Pf[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(y(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(y(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(y(61))}if(n.style!=null&&typeof n.style!="object")throw Error(y(62))}}function ms(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var gs=null;function fo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var vs=null,Tt=null,Rt=null;function fa(e){if(e=Ur(e)){if(typeof vs!="function")throw Error(y(280));var n=e.stateNode;n&&(n=cl(n),vs(e.stateNode,e.type,n))}}function nc(e){Tt?Rt?Rt.push(e):Rt=[e]:Tt=e}function tc(){if(Tt){var e=Tt,n=Rt;if(Rt=Tt=null,fa(e),n)for(e=0;e<n.length;e++)fa(n[e])}}function rc(e,n){return e(n)}function ic(){}var Pl=!1;function lc(e,n,t){if(Pl)return e(n,t);Pl=!0;try{return rc(e,n,t)}finally{Pl=!1,(Tt!==null||Rt!==null)&&(ic(),tc())}}function _r(e,n){var t=e.stateNode;if(t===null)return null;var r=cl(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(y(231,n,typeof t));return t}var ys=!1;if(mn)try{var Xt={};Object.defineProperty(Xt,"passive",{get:function(){ys=!0}}),window.addEventListener("test",Xt,Xt),window.removeEventListener("test",Xt,Xt)}catch{ys=!1}function Of(e,n,t,r,i,l,s,o,a){var u=Array.prototype.slice.call(arguments,3);try{n.apply(t,u)}catch(f){this.onError(f)}}var cr=!1,Si=null,Ni=!1,xs=null,Mf={onError:function(e){cr=!0,Si=e}};function If(e,n,t,r,i,l,s,o,a){cr=!1,Si=null,Of.apply(Mf,arguments)}function Df(e,n,t,r,i,l,s,o,a){if(If.apply(this,arguments),cr){if(cr){var u=Si;cr=!1,Si=null}else throw Error(y(198));Ni||(Ni=!0,xs=u)}}function ft(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function sc(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function pa(e){if(ft(e)!==e)throw Error(y(188))}function $f(e){var n=e.alternate;if(!n){if(n=ft(e),n===null)throw Error(y(188));return n!==e?null:e}for(var t=e,r=n;;){var i=t.return;if(i===null)break;var l=i.alternate;if(l===null){if(r=i.return,r!==null){t=r;continue}break}if(i.child===l.child){for(l=i.child;l;){if(l===t)return pa(i),e;if(l===r)return pa(i),n;l=l.sibling}throw Error(y(188))}if(t.return!==r.return)t=i,r=l;else{for(var s=!1,o=i.child;o;){if(o===t){s=!0,t=i,r=l;break}if(o===r){s=!0,r=i,t=l;break}o=o.sibling}if(!s){for(o=l.child;o;){if(o===t){s=!0,t=l,r=i;break}if(o===r){s=!0,r=l,t=i;break}o=o.sibling}if(!s)throw Error(y(189))}}if(t.alternate!==r)throw Error(y(190))}if(t.tag!==3)throw Error(y(188));return t.stateNode.current===t?e:n}function oc(e){return e=$f(e),e!==null?ac(e):null}function ac(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=ac(e);if(n!==null)return n;e=e.sibling}return null}var uc=Pe.unstable_scheduleCallback,ha=Pe.unstable_cancelCallback,bf=Pe.unstable_shouldYield,Af=Pe.unstable_requestPaint,se=Pe.unstable_now,Ff=Pe.unstable_getCurrentPriorityLevel,po=Pe.unstable_ImmediatePriority,cc=Pe.unstable_UserBlockingPriority,ji=Pe.unstable_NormalPriority,Uf=Pe.unstable_LowPriority,dc=Pe.unstable_IdlePriority,sl=null,tn=null;function Vf(e){if(tn&&typeof tn.onCommitFiberRoot=="function")try{tn.onCommitFiberRoot(sl,e,void 0,(e.current.flags&128)===128)}catch{}}var Ke=Math.clz32?Math.clz32:Wf,Bf=Math.log,Zf=Math.LN2;function Wf(e){return e>>>=0,e===0?32:31-(Bf(e)/Zf|0)|0}var Gr=64,Xr=4194304;function sr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ci(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,i=e.suspendedLanes,l=e.pingedLanes,s=t&268435455;if(s!==0){var o=s&~i;o!==0?r=sr(o):(l&=s,l!==0&&(r=sr(l)))}else s=t&~i,s!==0?r=sr(s):l!==0&&(r=sr(l));if(r===0)return 0;if(n!==0&&n!==r&&!(n&i)&&(i=r&-r,l=n&-n,i>=l||i===16&&(l&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-Ke(n),i=1<<t,r|=e[t],n&=~i;return r}function Hf(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Qf(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,l=e.pendingLanes;0<l;){var s=31-Ke(l),o=1<<s,a=i[s];a===-1?(!(o&t)||o&r)&&(i[s]=Hf(o,n)):a<=n&&(e.expiredLanes|=o),l&=~o}}function _s(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function fc(){var e=Gr;return Gr<<=1,!(Gr&4194240)&&(Gr=64),e}function Ol(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function Ar(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Ke(n),e[n]=t}function Yf(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var i=31-Ke(t),l=1<<i;n[i]=0,r[i]=-1,e[i]=-1,t&=~l}}function ho(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-Ke(t),i=1<<r;i&n|e[r]&n&&(e[r]|=n),t&=~i}}var W=0;function pc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var hc,mo,mc,gc,vc,ws=!1,Jr=[],Ln=null,Pn=null,On=null,wr=new Map,kr=new Map,Cn=[],Kf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ma(e,n){switch(e){case"focusin":case"focusout":Ln=null;break;case"dragenter":case"dragleave":Pn=null;break;case"mouseover":case"mouseout":On=null;break;case"pointerover":case"pointerout":wr.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":kr.delete(n.pointerId)}}function Jt(e,n,t,r,i,l){return e===null||e.nativeEvent!==l?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:l,targetContainers:[i]},n!==null&&(n=Ur(n),n!==null&&mo(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,i!==null&&n.indexOf(i)===-1&&n.push(i),e)}function Gf(e,n,t,r,i){switch(n){case"focusin":return Ln=Jt(Ln,e,n,t,r,i),!0;case"dragenter":return Pn=Jt(Pn,e,n,t,r,i),!0;case"mouseover":return On=Jt(On,e,n,t,r,i),!0;case"pointerover":var l=i.pointerId;return wr.set(l,Jt(wr.get(l)||null,e,n,t,r,i)),!0;case"gotpointercapture":return l=i.pointerId,kr.set(l,Jt(kr.get(l)||null,e,n,t,r,i)),!0}return!1}function yc(e){var n=Gn(e.target);if(n!==null){var t=ft(n);if(t!==null){if(n=t.tag,n===13){if(n=sc(t),n!==null){e.blockedOn=n,vc(e.priority,function(){mc(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function fi(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=ks(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);gs=r,t.target.dispatchEvent(r),gs=null}else return n=Ur(t),n!==null&&mo(n),e.blockedOn=t,!1;n.shift()}return!0}function ga(e,n,t){fi(e)&&t.delete(n)}function Xf(){ws=!1,Ln!==null&&fi(Ln)&&(Ln=null),Pn!==null&&fi(Pn)&&(Pn=null),On!==null&&fi(On)&&(On=null),wr.forEach(ga),kr.forEach(ga)}function qt(e,n){e.blockedOn===n&&(e.blockedOn=null,ws||(ws=!0,Pe.unstable_scheduleCallback(Pe.unstable_NormalPriority,Xf)))}function Sr(e){function n(i){return qt(i,e)}if(0<Jr.length){qt(Jr[0],e);for(var t=1;t<Jr.length;t++){var r=Jr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(Ln!==null&&qt(Ln,e),Pn!==null&&qt(Pn,e),On!==null&&qt(On,e),wr.forEach(n),kr.forEach(n),t=0;t<Cn.length;t++)r=Cn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<Cn.length&&(t=Cn[0],t.blockedOn===null);)yc(t),t.blockedOn===null&&Cn.shift()}var Lt=wn.ReactCurrentBatchConfig,Ei=!0;function Jf(e,n,t,r){var i=W,l=Lt.transition;Lt.transition=null;try{W=1,go(e,n,t,r)}finally{W=i,Lt.transition=l}}function qf(e,n,t,r){var i=W,l=Lt.transition;Lt.transition=null;try{W=4,go(e,n,t,r)}finally{W=i,Lt.transition=l}}function go(e,n,t,r){if(Ei){var i=ks(e,n,t,r);if(i===null)Bl(e,n,r,zi,t),ma(e,r);else if(Gf(i,e,n,t,r))r.stopPropagation();else if(ma(e,r),n&4&&-1<Kf.indexOf(e)){for(;i!==null;){var l=Ur(i);if(l!==null&&hc(l),l=ks(e,n,t,r),l===null&&Bl(e,n,r,zi,t),l===i)break;i=l}i!==null&&r.stopPropagation()}else Bl(e,n,r,null,t)}}var zi=null;function ks(e,n,t,r){if(zi=null,e=fo(r),e=Gn(e),e!==null)if(n=ft(e),n===null)e=null;else if(t=n.tag,t===13){if(e=sc(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return zi=e,null}function xc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ff()){case po:return 1;case cc:return 4;case ji:case Uf:return 16;case dc:return 536870912;default:return 16}default:return 16}}var zn=null,vo=null,pi=null;function _c(){if(pi)return pi;var e,n=vo,t=n.length,r,i="value"in zn?zn.value:zn.textContent,l=i.length;for(e=0;e<t&&n[e]===i[e];e++);var s=t-e;for(r=1;r<=s&&n[t-r]===i[l-r];r++);return pi=i.slice(e,1<r?1-r:void 0)}function hi(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function qr(){return!0}function va(){return!1}function Ie(e){function n(t,r,i,l,s){this._reactName=t,this._targetInst=i,this.type=r,this.nativeEvent=l,this.target=s,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(l):l[o]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?qr:va,this.isPropagationStopped=va,this}return ne(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=qr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=qr)},persist:function(){},isPersistent:qr}),n}var Wt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},yo=Ie(Wt),Fr=ne({},Wt,{view:0,detail:0}),ep=Ie(Fr),Ml,Il,er,ol=ne({},Fr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:xo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==er&&(er&&e.type==="mousemove"?(Ml=e.screenX-er.screenX,Il=e.screenY-er.screenY):Il=Ml=0,er=e),Ml)},movementY:function(e){return"movementY"in e?e.movementY:Il}}),ya=Ie(ol),np=ne({},ol,{dataTransfer:0}),tp=Ie(np),rp=ne({},Fr,{relatedTarget:0}),Dl=Ie(rp),ip=ne({},Wt,{animationName:0,elapsedTime:0,pseudoElement:0}),lp=Ie(ip),sp=ne({},Wt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),op=Ie(sp),ap=ne({},Wt,{data:0}),xa=Ie(ap),up={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},cp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},dp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fp(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=dp[e])?!!n[e]:!1}function xo(){return fp}var pp=ne({},Fr,{key:function(e){if(e.key){var n=up[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=hi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?cp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:xo,charCode:function(e){return e.type==="keypress"?hi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?hi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),hp=Ie(pp),mp=ne({},ol,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),_a=Ie(mp),gp=ne({},Fr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:xo}),vp=Ie(gp),yp=ne({},Wt,{propertyName:0,elapsedTime:0,pseudoElement:0}),xp=Ie(yp),_p=ne({},ol,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),wp=Ie(_p),kp=[9,13,27,32],_o=mn&&"CompositionEvent"in window,dr=null;mn&&"documentMode"in document&&(dr=document.documentMode);var Sp=mn&&"TextEvent"in window&&!dr,wc=mn&&(!_o||dr&&8<dr&&11>=dr),wa=" ",ka=!1;function kc(e,n){switch(e){case"keyup":return kp.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Sc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var yt=!1;function Np(e,n){switch(e){case"compositionend":return Sc(n);case"keypress":return n.which!==32?null:(ka=!0,wa);case"textInput":return e=n.data,e===wa&&ka?null:e;default:return null}}function jp(e,n){if(yt)return e==="compositionend"||!_o&&kc(e,n)?(e=_c(),pi=vo=zn=null,yt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return wc&&n.locale!=="ko"?null:n.data;default:return null}}var Cp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Sa(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Cp[e.type]:n==="textarea"}function Nc(e,n,t,r){nc(r),n=Ti(n,"onChange"),0<n.length&&(t=new yo("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var fr=null,Nr=null;function Ep(e){Ic(e,0)}function al(e){var n=wt(e);if(Yu(n))return e}function zp(e,n){if(e==="change")return n}var jc=!1;if(mn){var $l;if(mn){var bl="oninput"in document;if(!bl){var Na=document.createElement("div");Na.setAttribute("oninput","return;"),bl=typeof Na.oninput=="function"}$l=bl}else $l=!1;jc=$l&&(!document.documentMode||9<document.documentMode)}function ja(){fr&&(fr.detachEvent("onpropertychange",Cc),Nr=fr=null)}function Cc(e){if(e.propertyName==="value"&&al(Nr)){var n=[];Nc(n,Nr,e,fo(e)),lc(Ep,n)}}function Tp(e,n,t){e==="focusin"?(ja(),fr=n,Nr=t,fr.attachEvent("onpropertychange",Cc)):e==="focusout"&&ja()}function Rp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return al(Nr)}function Lp(e,n){if(e==="click")return al(n)}function Pp(e,n){if(e==="input"||e==="change")return al(n)}function Op(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Xe=typeof Object.is=="function"?Object.is:Op;function jr(e,n){if(Xe(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var i=t[r];if(!is.call(n,i)||!Xe(e[i],n[i]))return!1}return!0}function Ca(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ea(e,n){var t=Ca(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Ca(t)}}function Ec(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Ec(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function zc(){for(var e=window,n=ki();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=ki(e.document)}return n}function wo(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Mp(e){var n=zc(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&Ec(t.ownerDocument.documentElement,t)){if(r!==null&&wo(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var i=t.textContent.length,l=Math.min(r.start,i);r=r.end===void 0?l:Math.min(r.end,i),!e.extend&&l>r&&(i=r,r=l,l=i),i=Ea(t,l);var s=Ea(t,r);i&&s&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(n=n.createRange(),n.setStart(i.node,i.offset),e.removeAllRanges(),l>r?(e.addRange(n),e.extend(s.node,s.offset)):(n.setEnd(s.node,s.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Ip=mn&&"documentMode"in document&&11>=document.documentMode,xt=null,Ss=null,pr=null,Ns=!1;function za(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Ns||xt==null||xt!==ki(r)||(r=xt,"selectionStart"in r&&wo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),pr&&jr(pr,r)||(pr=r,r=Ti(Ss,"onSelect"),0<r.length&&(n=new yo("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=xt)))}function ei(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var _t={animationend:ei("Animation","AnimationEnd"),animationiteration:ei("Animation","AnimationIteration"),animationstart:ei("Animation","AnimationStart"),transitionend:ei("Transition","TransitionEnd")},Al={},Tc={};mn&&(Tc=document.createElement("div").style,"AnimationEvent"in window||(delete _t.animationend.animation,delete _t.animationiteration.animation,delete _t.animationstart.animation),"TransitionEvent"in window||delete _t.transitionend.transition);function ul(e){if(Al[e])return Al[e];if(!_t[e])return e;var n=_t[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in Tc)return Al[e]=n[t];return e}var Rc=ul("animationend"),Lc=ul("animationiteration"),Pc=ul("animationstart"),Oc=ul("transitionend"),Mc=new Map,Ta="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Bn(e,n){Mc.set(e,n),dt(n,[e])}for(var Fl=0;Fl<Ta.length;Fl++){var Ul=Ta[Fl],Dp=Ul.toLowerCase(),$p=Ul[0].toUpperCase()+Ul.slice(1);Bn(Dp,"on"+$p)}Bn(Rc,"onAnimationEnd");Bn(Lc,"onAnimationIteration");Bn(Pc,"onAnimationStart");Bn("dblclick","onDoubleClick");Bn("focusin","onFocus");Bn("focusout","onBlur");Bn(Oc,"onTransitionEnd");Mt("onMouseEnter",["mouseout","mouseover"]);Mt("onMouseLeave",["mouseout","mouseover"]);Mt("onPointerEnter",["pointerout","pointerover"]);Mt("onPointerLeave",["pointerout","pointerover"]);dt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));dt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));dt("onBeforeInput",["compositionend","keypress","textInput","paste"]);dt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));dt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));dt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var or="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bp=new Set("cancel close invalid load scroll toggle".split(" ").concat(or));function Ra(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,Df(r,n,void 0,e),e.currentTarget=null}function Ic(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],i=r.event;r=r.listeners;e:{var l=void 0;if(n)for(var s=r.length-1;0<=s;s--){var o=r[s],a=o.instance,u=o.currentTarget;if(o=o.listener,a!==l&&i.isPropagationStopped())break e;Ra(i,o,u),l=a}else for(s=0;s<r.length;s++){if(o=r[s],a=o.instance,u=o.currentTarget,o=o.listener,a!==l&&i.isPropagationStopped())break e;Ra(i,o,u),l=a}}}if(Ni)throw e=xs,Ni=!1,xs=null,e}function Y(e,n){var t=n[Ts];t===void 0&&(t=n[Ts]=new Set);var r=e+"__bubble";t.has(r)||(Dc(n,e,2,!1),t.add(r))}function Vl(e,n,t){var r=0;n&&(r|=4),Dc(t,e,r,n)}var ni="_reactListening"+Math.random().toString(36).slice(2);function Cr(e){if(!e[ni]){e[ni]=!0,Bu.forEach(function(t){t!=="selectionchange"&&(bp.has(t)||Vl(t,!1,e),Vl(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[ni]||(n[ni]=!0,Vl("selectionchange",!1,n))}}function Dc(e,n,t,r){switch(xc(n)){case 1:var i=Jf;break;case 4:i=qf;break;default:i=go}t=i.bind(null,n,t,e),i=void 0,!ys||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(n,t,{capture:!0,passive:i}):e.addEventListener(n,t,!0):i!==void 0?e.addEventListener(n,t,{passive:i}):e.addEventListener(n,t,!1)}function Bl(e,n,t,r,i){var l=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var o=r.stateNode.containerInfo;if(o===i||o.nodeType===8&&o.parentNode===i)break;if(s===4)for(s=r.return;s!==null;){var a=s.tag;if((a===3||a===4)&&(a=s.stateNode.containerInfo,a===i||a.nodeType===8&&a.parentNode===i))return;s=s.return}for(;o!==null;){if(s=Gn(o),s===null)return;if(a=s.tag,a===5||a===6){r=l=s;continue e}o=o.parentNode}}r=r.return}lc(function(){var u=l,f=fo(t),h=[];e:{var g=Mc.get(e);if(g!==void 0){var _=yo,w=e;switch(e){case"keypress":if(hi(t)===0)break e;case"keydown":case"keyup":_=hp;break;case"focusin":w="focus",_=Dl;break;case"focusout":w="blur",_=Dl;break;case"beforeblur":case"afterblur":_=Dl;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_=ya;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_=tp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_=vp;break;case Rc:case Lc:case Pc:_=lp;break;case Oc:_=xp;break;case"scroll":_=ep;break;case"wheel":_=wp;break;case"copy":case"cut":case"paste":_=op;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_=_a}var S=(n&4)!==0,B=!S&&e==="scroll",p=S?g!==null?g+"Capture":null:g;S=[];for(var d=u,m;d!==null;){m=d;var v=m.stateNode;if(m.tag===5&&v!==null&&(m=v,p!==null&&(v=_r(d,p),v!=null&&S.push(Er(d,v,m)))),B)break;d=d.return}0<S.length&&(g=new _(g,w,null,t,f),h.push({event:g,listeners:S}))}}if(!(n&7)){e:{if(g=e==="mouseover"||e==="pointerover",_=e==="mouseout"||e==="pointerout",g&&t!==gs&&(w=t.relatedTarget||t.fromElement)&&(Gn(w)||w[gn]))break e;if((_||g)&&(g=f.window===f?f:(g=f.ownerDocument)?g.defaultView||g.parentWindow:window,_?(w=t.relatedTarget||t.toElement,_=u,w=w?Gn(w):null,w!==null&&(B=ft(w),w!==B||w.tag!==5&&w.tag!==6)&&(w=null)):(_=null,w=u),_!==w)){if(S=ya,v="onMouseLeave",p="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(S=_a,v="onPointerLeave",p="onPointerEnter",d="pointer"),B=_==null?g:wt(_),m=w==null?g:wt(w),g=new S(v,d+"leave",_,t,f),g.target=B,g.relatedTarget=m,v=null,Gn(f)===u&&(S=new S(p,d+"enter",w,t,f),S.target=m,S.relatedTarget=B,v=S),B=v,_&&w)n:{for(S=_,p=w,d=0,m=S;m;m=ht(m))d++;for(m=0,v=p;v;v=ht(v))m++;for(;0<d-m;)S=ht(S),d--;for(;0<m-d;)p=ht(p),m--;for(;d--;){if(S===p||p!==null&&S===p.alternate)break n;S=ht(S),p=ht(p)}S=null}else S=null;_!==null&&La(h,g,_,S,!1),w!==null&&B!==null&&La(h,B,w,S,!0)}}e:{if(g=u?wt(u):window,_=g.nodeName&&g.nodeName.toLowerCase(),_==="select"||_==="input"&&g.type==="file")var j=zp;else if(Sa(g))if(jc)j=Pp;else{j=Rp;var T=Tp}else(_=g.nodeName)&&_.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(j=Lp);if(j&&(j=j(e,u))){Nc(h,j,t,f);break e}T&&T(e,g,u),e==="focusout"&&(T=g._wrapperState)&&T.controlled&&g.type==="number"&&ds(g,"number",g.value)}switch(T=u?wt(u):window,e){case"focusin":(Sa(T)||T.contentEditable==="true")&&(xt=T,Ss=u,pr=null);break;case"focusout":pr=Ss=xt=null;break;case"mousedown":Ns=!0;break;case"contextmenu":case"mouseup":case"dragend":Ns=!1,za(h,t,f);break;case"selectionchange":if(Ip)break;case"keydown":case"keyup":za(h,t,f)}var R;if(_o)e:{switch(e){case"compositionstart":var L="onCompositionStart";break e;case"compositionend":L="onCompositionEnd";break e;case"compositionupdate":L="onCompositionUpdate";break e}L=void 0}else yt?kc(e,t)&&(L="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(L="onCompositionStart");L&&(wc&&t.locale!=="ko"&&(yt||L!=="onCompositionStart"?L==="onCompositionEnd"&&yt&&(R=_c()):(zn=f,vo="value"in zn?zn.value:zn.textContent,yt=!0)),T=Ti(u,L),0<T.length&&(L=new xa(L,e,null,t,f),h.push({event:L,listeners:T}),R?L.data=R:(R=Sc(t),R!==null&&(L.data=R)))),(R=Sp?Np(e,t):jp(e,t))&&(u=Ti(u,"onBeforeInput"),0<u.length&&(f=new xa("onBeforeInput","beforeinput",null,t,f),h.push({event:f,listeners:u}),f.data=R))}Ic(h,n)})}function Er(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Ti(e,n){for(var t=n+"Capture",r=[];e!==null;){var i=e,l=i.stateNode;i.tag===5&&l!==null&&(i=l,l=_r(e,t),l!=null&&r.unshift(Er(e,l,i)),l=_r(e,n),l!=null&&r.push(Er(e,l,i))),e=e.return}return r}function ht(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function La(e,n,t,r,i){for(var l=n._reactName,s=[];t!==null&&t!==r;){var o=t,a=o.alternate,u=o.stateNode;if(a!==null&&a===r)break;o.tag===5&&u!==null&&(o=u,i?(a=_r(t,l),a!=null&&s.unshift(Er(t,a,o))):i||(a=_r(t,l),a!=null&&s.push(Er(t,a,o)))),t=t.return}s.length!==0&&e.push({event:n,listeners:s})}var Ap=/\r\n?/g,Fp=/\u0000|\uFFFD/g;function Pa(e){return(typeof e=="string"?e:""+e).replace(Ap,`
`).replace(Fp,"")}function ti(e,n,t){if(n=Pa(n),Pa(e)!==n&&t)throw Error(y(425))}function Ri(){}var js=null,Cs=null;function Es(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var zs=typeof setTimeout=="function"?setTimeout:void 0,Up=typeof clearTimeout=="function"?clearTimeout:void 0,Oa=typeof Promise=="function"?Promise:void 0,Vp=typeof queueMicrotask=="function"?queueMicrotask:typeof Oa<"u"?function(e){return Oa.resolve(null).then(e).catch(Bp)}:zs;function Bp(e){setTimeout(function(){throw e})}function Zl(e,n){var t=n,r=0;do{var i=t.nextSibling;if(e.removeChild(t),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(r===0){e.removeChild(i),Sr(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=i}while(t);Sr(n)}function Mn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function Ma(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var Ht=Math.random().toString(36).slice(2),nn="__reactFiber$"+Ht,zr="__reactProps$"+Ht,gn="__reactContainer$"+Ht,Ts="__reactEvents$"+Ht,Zp="__reactListeners$"+Ht,Wp="__reactHandles$"+Ht;function Gn(e){var n=e[nn];if(n)return n;for(var t=e.parentNode;t;){if(n=t[gn]||t[nn]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Ma(e);e!==null;){if(t=e[nn])return t;e=Ma(e)}return n}e=t,t=e.parentNode}return null}function Ur(e){return e=e[nn]||e[gn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function wt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(y(33))}function cl(e){return e[zr]||null}var Rs=[],kt=-1;function Zn(e){return{current:e}}function K(e){0>kt||(e.current=Rs[kt],Rs[kt]=null,kt--)}function Q(e,n){kt++,Rs[kt]=e.current,e.current=n}var Fn={},xe=Zn(Fn),Ce=Zn(!1),nt=Fn;function It(e,n){var t=e.type.contextTypes;if(!t)return Fn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var i={},l;for(l in t)i[l]=n[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=i),i}function Ee(e){return e=e.childContextTypes,e!=null}function Li(){K(Ce),K(xe)}function Ia(e,n,t){if(xe.current!==Fn)throw Error(y(168));Q(xe,n),Q(Ce,t)}function $c(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var i in r)if(!(i in n))throw Error(y(108,Tf(e)||"Unknown",i));return ne({},t,r)}function Pi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Fn,nt=xe.current,Q(xe,e),Q(Ce,Ce.current),!0}function Da(e,n,t){var r=e.stateNode;if(!r)throw Error(y(169));t?(e=$c(e,n,nt),r.__reactInternalMemoizedMergedChildContext=e,K(Ce),K(xe),Q(xe,e)):K(Ce),Q(Ce,t)}var un=null,dl=!1,Wl=!1;function bc(e){un===null?un=[e]:un.push(e)}function Hp(e){dl=!0,bc(e)}function Wn(){if(!Wl&&un!==null){Wl=!0;var e=0,n=W;try{var t=un;for(W=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}un=null,dl=!1}catch(i){throw un!==null&&(un=un.slice(e+1)),uc(po,Wn),i}finally{W=n,Wl=!1}}return null}var St=[],Nt=0,Oi=null,Mi=0,De=[],$e=0,tt=null,cn=1,dn="";function Yn(e,n){St[Nt++]=Mi,St[Nt++]=Oi,Oi=e,Mi=n}function Ac(e,n,t){De[$e++]=cn,De[$e++]=dn,De[$e++]=tt,tt=e;var r=cn;e=dn;var i=32-Ke(r)-1;r&=~(1<<i),t+=1;var l=32-Ke(n)+i;if(30<l){var s=i-i%5;l=(r&(1<<s)-1).toString(32),r>>=s,i-=s,cn=1<<32-Ke(n)+i|t<<i|r,dn=l+e}else cn=1<<l|t<<i|r,dn=e}function ko(e){e.return!==null&&(Yn(e,1),Ac(e,1,0))}function So(e){for(;e===Oi;)Oi=St[--Nt],St[Nt]=null,Mi=St[--Nt],St[Nt]=null;for(;e===tt;)tt=De[--$e],De[$e]=null,dn=De[--$e],De[$e]=null,cn=De[--$e],De[$e]=null}var Le=null,Re=null,G=!1,Ye=null;function Fc(e,n){var t=be(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function $a(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,Le=e,Re=Mn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,Le=e,Re=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=tt!==null?{id:cn,overflow:dn}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=be(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,Le=e,Re=null,!0):!1;default:return!1}}function Ls(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ps(e){if(G){var n=Re;if(n){var t=n;if(!$a(e,n)){if(Ls(e))throw Error(y(418));n=Mn(t.nextSibling);var r=Le;n&&$a(e,n)?Fc(r,t):(e.flags=e.flags&-4097|2,G=!1,Le=e)}}else{if(Ls(e))throw Error(y(418));e.flags=e.flags&-4097|2,G=!1,Le=e}}}function ba(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Le=e}function ri(e){if(e!==Le)return!1;if(!G)return ba(e),G=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!Es(e.type,e.memoizedProps)),n&&(n=Re)){if(Ls(e))throw Uc(),Error(y(418));for(;n;)Fc(e,n),n=Mn(n.nextSibling)}if(ba(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(y(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){Re=Mn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}Re=null}}else Re=Le?Mn(e.stateNode.nextSibling):null;return!0}function Uc(){for(var e=Re;e;)e=Mn(e.nextSibling)}function Dt(){Re=Le=null,G=!1}function No(e){Ye===null?Ye=[e]:Ye.push(e)}var Qp=wn.ReactCurrentBatchConfig;function nr(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(y(309));var r=t.stateNode}if(!r)throw Error(y(147,e));var i=r,l=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===l?n.ref:(n=function(s){var o=i.refs;s===null?delete o[l]:o[l]=s},n._stringRef=l,n)}if(typeof e!="string")throw Error(y(284));if(!t._owner)throw Error(y(290,e))}return e}function ii(e,n){throw e=Object.prototype.toString.call(n),Error(y(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Aa(e){var n=e._init;return n(e._payload)}function Vc(e){function n(p,d){if(e){var m=p.deletions;m===null?(p.deletions=[d],p.flags|=16):m.push(d)}}function t(p,d){if(!e)return null;for(;d!==null;)n(p,d),d=d.sibling;return null}function r(p,d){for(p=new Map;d!==null;)d.key!==null?p.set(d.key,d):p.set(d.index,d),d=d.sibling;return p}function i(p,d){return p=bn(p,d),p.index=0,p.sibling=null,p}function l(p,d,m){return p.index=m,e?(m=p.alternate,m!==null?(m=m.index,m<d?(p.flags|=2,d):m):(p.flags|=2,d)):(p.flags|=1048576,d)}function s(p){return e&&p.alternate===null&&(p.flags|=2),p}function o(p,d,m,v){return d===null||d.tag!==6?(d=Jl(m,p.mode,v),d.return=p,d):(d=i(d,m),d.return=p,d)}function a(p,d,m,v){var j=m.type;return j===vt?f(p,d,m.props.children,v,m.key):d!==null&&(d.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===Sn&&Aa(j)===d.type)?(v=i(d,m.props),v.ref=nr(p,d,m),v.return=p,v):(v=wi(m.type,m.key,m.props,null,p.mode,v),v.ref=nr(p,d,m),v.return=p,v)}function u(p,d,m,v){return d===null||d.tag!==4||d.stateNode.containerInfo!==m.containerInfo||d.stateNode.implementation!==m.implementation?(d=ql(m,p.mode,v),d.return=p,d):(d=i(d,m.children||[]),d.return=p,d)}function f(p,d,m,v,j){return d===null||d.tag!==7?(d=et(m,p.mode,v,j),d.return=p,d):(d=i(d,m),d.return=p,d)}function h(p,d,m){if(typeof d=="string"&&d!==""||typeof d=="number")return d=Jl(""+d,p.mode,m),d.return=p,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Qr:return m=wi(d.type,d.key,d.props,null,p.mode,m),m.ref=nr(p,null,d),m.return=p,m;case gt:return d=ql(d,p.mode,m),d.return=p,d;case Sn:var v=d._init;return h(p,v(d._payload),m)}if(lr(d)||Gt(d))return d=et(d,p.mode,m,null),d.return=p,d;ii(p,d)}return null}function g(p,d,m,v){var j=d!==null?d.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return j!==null?null:o(p,d,""+m,v);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Qr:return m.key===j?a(p,d,m,v):null;case gt:return m.key===j?u(p,d,m,v):null;case Sn:return j=m._init,g(p,d,j(m._payload),v)}if(lr(m)||Gt(m))return j!==null?null:f(p,d,m,v,null);ii(p,m)}return null}function _(p,d,m,v,j){if(typeof v=="string"&&v!==""||typeof v=="number")return p=p.get(m)||null,o(d,p,""+v,j);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Qr:return p=p.get(v.key===null?m:v.key)||null,a(d,p,v,j);case gt:return p=p.get(v.key===null?m:v.key)||null,u(d,p,v,j);case Sn:var T=v._init;return _(p,d,m,T(v._payload),j)}if(lr(v)||Gt(v))return p=p.get(m)||null,f(d,p,v,j,null);ii(d,v)}return null}function w(p,d,m,v){for(var j=null,T=null,R=d,L=d=0,ie=null;R!==null&&L<m.length;L++){R.index>L?(ie=R,R=null):ie=R.sibling;var b=g(p,R,m[L],v);if(b===null){R===null&&(R=ie);break}e&&R&&b.alternate===null&&n(p,R),d=l(b,d,L),T===null?j=b:T.sibling=b,T=b,R=ie}if(L===m.length)return t(p,R),G&&Yn(p,L),j;if(R===null){for(;L<m.length;L++)R=h(p,m[L],v),R!==null&&(d=l(R,d,L),T===null?j=R:T.sibling=R,T=R);return G&&Yn(p,L),j}for(R=r(p,R);L<m.length;L++)ie=_(R,p,L,m[L],v),ie!==null&&(e&&ie.alternate!==null&&R.delete(ie.key===null?L:ie.key),d=l(ie,d,L),T===null?j=ie:T.sibling=ie,T=ie);return e&&R.forEach(function(Ze){return n(p,Ze)}),G&&Yn(p,L),j}function S(p,d,m,v){var j=Gt(m);if(typeof j!="function")throw Error(y(150));if(m=j.call(m),m==null)throw Error(y(151));for(var T=j=null,R=d,L=d=0,ie=null,b=m.next();R!==null&&!b.done;L++,b=m.next()){R.index>L?(ie=R,R=null):ie=R.sibling;var Ze=g(p,R,b.value,v);if(Ze===null){R===null&&(R=ie);break}e&&R&&Ze.alternate===null&&n(p,R),d=l(Ze,d,L),T===null?j=Ze:T.sibling=Ze,T=Ze,R=ie}if(b.done)return t(p,R),G&&Yn(p,L),j;if(R===null){for(;!b.done;L++,b=m.next())b=h(p,b.value,v),b!==null&&(d=l(b,d,L),T===null?j=b:T.sibling=b,T=b);return G&&Yn(p,L),j}for(R=r(p,R);!b.done;L++,b=m.next())b=_(R,p,L,b.value,v),b!==null&&(e&&b.alternate!==null&&R.delete(b.key===null?L:b.key),d=l(b,d,L),T===null?j=b:T.sibling=b,T=b);return e&&R.forEach(function(Yt){return n(p,Yt)}),G&&Yn(p,L),j}function B(p,d,m,v){if(typeof m=="object"&&m!==null&&m.type===vt&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case Qr:e:{for(var j=m.key,T=d;T!==null;){if(T.key===j){if(j=m.type,j===vt){if(T.tag===7){t(p,T.sibling),d=i(T,m.props.children),d.return=p,p=d;break e}}else if(T.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===Sn&&Aa(j)===T.type){t(p,T.sibling),d=i(T,m.props),d.ref=nr(p,T,m),d.return=p,p=d;break e}t(p,T);break}else n(p,T);T=T.sibling}m.type===vt?(d=et(m.props.children,p.mode,v,m.key),d.return=p,p=d):(v=wi(m.type,m.key,m.props,null,p.mode,v),v.ref=nr(p,d,m),v.return=p,p=v)}return s(p);case gt:e:{for(T=m.key;d!==null;){if(d.key===T)if(d.tag===4&&d.stateNode.containerInfo===m.containerInfo&&d.stateNode.implementation===m.implementation){t(p,d.sibling),d=i(d,m.children||[]),d.return=p,p=d;break e}else{t(p,d);break}else n(p,d);d=d.sibling}d=ql(m,p.mode,v),d.return=p,p=d}return s(p);case Sn:return T=m._init,B(p,d,T(m._payload),v)}if(lr(m))return w(p,d,m,v);if(Gt(m))return S(p,d,m,v);ii(p,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,d!==null&&d.tag===6?(t(p,d.sibling),d=i(d,m),d.return=p,p=d):(t(p,d),d=Jl(m,p.mode,v),d.return=p,p=d),s(p)):t(p,d)}return B}var $t=Vc(!0),Bc=Vc(!1),Ii=Zn(null),Di=null,jt=null,jo=null;function Co(){jo=jt=Di=null}function Eo(e){var n=Ii.current;K(Ii),e._currentValue=n}function Os(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function Pt(e,n){Di=e,jo=jt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(je=!0),e.firstContext=null)}function Fe(e){var n=e._currentValue;if(jo!==e)if(e={context:e,memoizedValue:n,next:null},jt===null){if(Di===null)throw Error(y(308));jt=e,Di.dependencies={lanes:0,firstContext:e}}else jt=jt.next=e;return n}var Xn=null;function zo(e){Xn===null?Xn=[e]:Xn.push(e)}function Zc(e,n,t,r){var i=n.interleaved;return i===null?(t.next=t,zo(n)):(t.next=i.next,i.next=t),n.interleaved=t,vn(e,r)}function vn(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var Nn=!1;function To(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Wc(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function fn(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function In(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,U&2){var i=r.pending;return i===null?n.next=n:(n.next=i.next,i.next=n),r.pending=n,vn(e,t)}return i=r.interleaved,i===null?(n.next=n,zo(r)):(n.next=i.next,i.next=n),r.interleaved=n,vn(e,t)}function mi(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ho(e,t)}}function Fa(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var i=null,l=null;if(t=t.firstBaseUpdate,t!==null){do{var s={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};l===null?i=l=s:l=l.next=s,t=t.next}while(t!==null);l===null?i=l=n:l=l.next=n}else i=l=n;t={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function $i(e,n,t,r){var i=e.updateQueue;Nn=!1;var l=i.firstBaseUpdate,s=i.lastBaseUpdate,o=i.shared.pending;if(o!==null){i.shared.pending=null;var a=o,u=a.next;a.next=null,s===null?l=u:s.next=u,s=a;var f=e.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==s&&(o===null?f.firstBaseUpdate=u:o.next=u,f.lastBaseUpdate=a))}if(l!==null){var h=i.baseState;s=0,f=u=a=null,o=l;do{var g=o.lane,_=o.eventTime;if((r&g)===g){f!==null&&(f=f.next={eventTime:_,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var w=e,S=o;switch(g=n,_=t,S.tag){case 1:if(w=S.payload,typeof w=="function"){h=w.call(_,h,g);break e}h=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=S.payload,g=typeof w=="function"?w.call(_,h,g):w,g==null)break e;h=ne({},h,g);break e;case 2:Nn=!0}}o.callback!==null&&o.lane!==0&&(e.flags|=64,g=i.effects,g===null?i.effects=[o]:g.push(o))}else _={eventTime:_,lane:g,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(u=f=_,a=h):f=f.next=_,s|=g;if(o=o.next,o===null){if(o=i.shared.pending,o===null)break;g=o,o=g.next,g.next=null,i.lastBaseUpdate=g,i.shared.pending=null}}while(!0);if(f===null&&(a=h),i.baseState=a,i.firstBaseUpdate=u,i.lastBaseUpdate=f,n=i.shared.interleaved,n!==null){i=n;do s|=i.lane,i=i.next;while(i!==n)}else l===null&&(i.shared.lanes=0);it|=s,e.lanes=s,e.memoizedState=h}}function Ua(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],i=r.callback;if(i!==null){if(r.callback=null,r=t,typeof i!="function")throw Error(y(191,i));i.call(r)}}}var Vr={},rn=Zn(Vr),Tr=Zn(Vr),Rr=Zn(Vr);function Jn(e){if(e===Vr)throw Error(y(174));return e}function Ro(e,n){switch(Q(Rr,n),Q(Tr,e),Q(rn,Vr),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:ps(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=ps(n,e)}K(rn),Q(rn,n)}function bt(){K(rn),K(Tr),K(Rr)}function Hc(e){Jn(Rr.current);var n=Jn(rn.current),t=ps(n,e.type);n!==t&&(Q(Tr,e),Q(rn,t))}function Lo(e){Tr.current===e&&(K(rn),K(Tr))}var J=Zn(0);function bi(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Hl=[];function Po(){for(var e=0;e<Hl.length;e++)Hl[e]._workInProgressVersionPrimary=null;Hl.length=0}var gi=wn.ReactCurrentDispatcher,Ql=wn.ReactCurrentBatchConfig,rt=0,ee=null,ae=null,de=null,Ai=!1,hr=!1,Lr=0,Yp=0;function ge(){throw Error(y(321))}function Oo(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Xe(e[t],n[t]))return!1;return!0}function Mo(e,n,t,r,i,l){if(rt=l,ee=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,gi.current=e===null||e.memoizedState===null?Jp:qp,e=t(r,i),hr){l=0;do{if(hr=!1,Lr=0,25<=l)throw Error(y(301));l+=1,de=ae=null,n.updateQueue=null,gi.current=eh,e=t(r,i)}while(hr)}if(gi.current=Fi,n=ae!==null&&ae.next!==null,rt=0,de=ae=ee=null,Ai=!1,n)throw Error(y(300));return e}function Io(){var e=Lr!==0;return Lr=0,e}function en(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return de===null?ee.memoizedState=de=e:de=de.next=e,de}function Ue(){if(ae===null){var e=ee.alternate;e=e!==null?e.memoizedState:null}else e=ae.next;var n=de===null?ee.memoizedState:de.next;if(n!==null)de=n,ae=e;else{if(e===null)throw Error(y(310));ae=e,e={memoizedState:ae.memoizedState,baseState:ae.baseState,baseQueue:ae.baseQueue,queue:ae.queue,next:null},de===null?ee.memoizedState=de=e:de=de.next=e}return de}function Pr(e,n){return typeof n=="function"?n(e):n}function Yl(e){var n=Ue(),t=n.queue;if(t===null)throw Error(y(311));t.lastRenderedReducer=e;var r=ae,i=r.baseQueue,l=t.pending;if(l!==null){if(i!==null){var s=i.next;i.next=l.next,l.next=s}r.baseQueue=i=l,t.pending=null}if(i!==null){l=i.next,r=r.baseState;var o=s=null,a=null,u=l;do{var f=u.lane;if((rt&f)===f)a!==null&&(a=a.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var h={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};a===null?(o=a=h,s=r):a=a.next=h,ee.lanes|=f,it|=f}u=u.next}while(u!==null&&u!==l);a===null?s=r:a.next=o,Xe(r,n.memoizedState)||(je=!0),n.memoizedState=r,n.baseState=s,n.baseQueue=a,t.lastRenderedState=r}if(e=t.interleaved,e!==null){i=e;do l=i.lane,ee.lanes|=l,it|=l,i=i.next;while(i!==e)}else i===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function Kl(e){var n=Ue(),t=n.queue;if(t===null)throw Error(y(311));t.lastRenderedReducer=e;var r=t.dispatch,i=t.pending,l=n.memoizedState;if(i!==null){t.pending=null;var s=i=i.next;do l=e(l,s.action),s=s.next;while(s!==i);Xe(l,n.memoizedState)||(je=!0),n.memoizedState=l,n.baseQueue===null&&(n.baseState=l),t.lastRenderedState=l}return[l,r]}function Qc(){}function Yc(e,n){var t=ee,r=Ue(),i=n(),l=!Xe(r.memoizedState,i);if(l&&(r.memoizedState=i,je=!0),r=r.queue,Do(Xc.bind(null,t,r,e),[e]),r.getSnapshot!==n||l||de!==null&&de.memoizedState.tag&1){if(t.flags|=2048,Or(9,Gc.bind(null,t,r,i,n),void 0,null),fe===null)throw Error(y(349));rt&30||Kc(t,n,i)}return i}function Kc(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=ee.updateQueue,n===null?(n={lastEffect:null,stores:null},ee.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Gc(e,n,t,r){n.value=t,n.getSnapshot=r,Jc(n)&&qc(e)}function Xc(e,n,t){return t(function(){Jc(n)&&qc(e)})}function Jc(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Xe(e,t)}catch{return!0}}function qc(e){var n=vn(e,1);n!==null&&Ge(n,e,1,-1)}function Va(e){var n=en();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Pr,lastRenderedState:e},n.queue=e,e=e.dispatch=Xp.bind(null,ee,e),[n.memoizedState,e]}function Or(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=ee.updateQueue,n===null?(n={lastEffect:null,stores:null},ee.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function ed(){return Ue().memoizedState}function vi(e,n,t,r){var i=en();ee.flags|=e,i.memoizedState=Or(1|n,t,void 0,r===void 0?null:r)}function fl(e,n,t,r){var i=Ue();r=r===void 0?null:r;var l=void 0;if(ae!==null){var s=ae.memoizedState;if(l=s.destroy,r!==null&&Oo(r,s.deps)){i.memoizedState=Or(n,t,l,r);return}}ee.flags|=e,i.memoizedState=Or(1|n,t,l,r)}function Ba(e,n){return vi(8390656,8,e,n)}function Do(e,n){return fl(2048,8,e,n)}function nd(e,n){return fl(4,2,e,n)}function td(e,n){return fl(4,4,e,n)}function rd(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function id(e,n,t){return t=t!=null?t.concat([e]):null,fl(4,4,rd.bind(null,n,e),t)}function $o(){}function ld(e,n){var t=Ue();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Oo(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function sd(e,n){var t=Ue();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Oo(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function od(e,n,t){return rt&21?(Xe(t,n)||(t=fc(),ee.lanes|=t,it|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,je=!0),e.memoizedState=t)}function Kp(e,n){var t=W;W=t!==0&&4>t?t:4,e(!0);var r=Ql.transition;Ql.transition={};try{e(!1),n()}finally{W=t,Ql.transition=r}}function ad(){return Ue().memoizedState}function Gp(e,n,t){var r=$n(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},ud(e))cd(n,t);else if(t=Zc(e,n,t,r),t!==null){var i=we();Ge(t,e,r,i),dd(t,n,r)}}function Xp(e,n,t){var r=$n(e),i={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(ud(e))cd(n,i);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=n.lastRenderedReducer,l!==null))try{var s=n.lastRenderedState,o=l(s,t);if(i.hasEagerState=!0,i.eagerState=o,Xe(o,s)){var a=n.interleaved;a===null?(i.next=i,zo(n)):(i.next=a.next,a.next=i),n.interleaved=i;return}}catch{}finally{}t=Zc(e,n,i,r),t!==null&&(i=we(),Ge(t,e,r,i),dd(t,n,r))}}function ud(e){var n=e.alternate;return e===ee||n!==null&&n===ee}function cd(e,n){hr=Ai=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function dd(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ho(e,t)}}var Fi={readContext:Fe,useCallback:ge,useContext:ge,useEffect:ge,useImperativeHandle:ge,useInsertionEffect:ge,useLayoutEffect:ge,useMemo:ge,useReducer:ge,useRef:ge,useState:ge,useDebugValue:ge,useDeferredValue:ge,useTransition:ge,useMutableSource:ge,useSyncExternalStore:ge,useId:ge,unstable_isNewReconciler:!1},Jp={readContext:Fe,useCallback:function(e,n){return en().memoizedState=[e,n===void 0?null:n],e},useContext:Fe,useEffect:Ba,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,vi(4194308,4,rd.bind(null,n,e),t)},useLayoutEffect:function(e,n){return vi(4194308,4,e,n)},useInsertionEffect:function(e,n){return vi(4,2,e,n)},useMemo:function(e,n){var t=en();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=en();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=Gp.bind(null,ee,e),[r.memoizedState,e]},useRef:function(e){var n=en();return e={current:e},n.memoizedState=e},useState:Va,useDebugValue:$o,useDeferredValue:function(e){return en().memoizedState=e},useTransition:function(){var e=Va(!1),n=e[0];return e=Kp.bind(null,e[1]),en().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=ee,i=en();if(G){if(t===void 0)throw Error(y(407));t=t()}else{if(t=n(),fe===null)throw Error(y(349));rt&30||Kc(r,n,t)}i.memoizedState=t;var l={value:t,getSnapshot:n};return i.queue=l,Ba(Xc.bind(null,r,l,e),[e]),r.flags|=2048,Or(9,Gc.bind(null,r,l,t,n),void 0,null),t},useId:function(){var e=en(),n=fe.identifierPrefix;if(G){var t=dn,r=cn;t=(r&~(1<<32-Ke(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=Lr++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=Yp++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},qp={readContext:Fe,useCallback:ld,useContext:Fe,useEffect:Do,useImperativeHandle:id,useInsertionEffect:nd,useLayoutEffect:td,useMemo:sd,useReducer:Yl,useRef:ed,useState:function(){return Yl(Pr)},useDebugValue:$o,useDeferredValue:function(e){var n=Ue();return od(n,ae.memoizedState,e)},useTransition:function(){var e=Yl(Pr)[0],n=Ue().memoizedState;return[e,n]},useMutableSource:Qc,useSyncExternalStore:Yc,useId:ad,unstable_isNewReconciler:!1},eh={readContext:Fe,useCallback:ld,useContext:Fe,useEffect:Do,useImperativeHandle:id,useInsertionEffect:nd,useLayoutEffect:td,useMemo:sd,useReducer:Kl,useRef:ed,useState:function(){return Kl(Pr)},useDebugValue:$o,useDeferredValue:function(e){var n=Ue();return ae===null?n.memoizedState=e:od(n,ae.memoizedState,e)},useTransition:function(){var e=Kl(Pr)[0],n=Ue().memoizedState;return[e,n]},useMutableSource:Qc,useSyncExternalStore:Yc,useId:ad,unstable_isNewReconciler:!1};function He(e,n){if(e&&e.defaultProps){n=ne({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function Ms(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:ne({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var pl={isMounted:function(e){return(e=e._reactInternals)?ft(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=we(),i=$n(e),l=fn(r,i);l.payload=n,t!=null&&(l.callback=t),n=In(e,l,i),n!==null&&(Ge(n,e,i,r),mi(n,e,i))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=we(),i=$n(e),l=fn(r,i);l.tag=1,l.payload=n,t!=null&&(l.callback=t),n=In(e,l,i),n!==null&&(Ge(n,e,i,r),mi(n,e,i))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=we(),r=$n(e),i=fn(t,r);i.tag=2,n!=null&&(i.callback=n),n=In(e,i,r),n!==null&&(Ge(n,e,r,t),mi(n,e,r))}};function Za(e,n,t,r,i,l,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,s):n.prototype&&n.prototype.isPureReactComponent?!jr(t,r)||!jr(i,l):!0}function fd(e,n,t){var r=!1,i=Fn,l=n.contextType;return typeof l=="object"&&l!==null?l=Fe(l):(i=Ee(n)?nt:xe.current,r=n.contextTypes,l=(r=r!=null)?It(e,i):Fn),n=new n(t,l),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=pl,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=l),n}function Wa(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&pl.enqueueReplaceState(n,n.state,null)}function Is(e,n,t,r){var i=e.stateNode;i.props=t,i.state=e.memoizedState,i.refs={},To(e);var l=n.contextType;typeof l=="object"&&l!==null?i.context=Fe(l):(l=Ee(n)?nt:xe.current,i.context=It(e,l)),i.state=e.memoizedState,l=n.getDerivedStateFromProps,typeof l=="function"&&(Ms(e,n,l,t),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(n=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),n!==i.state&&pl.enqueueReplaceState(i,i.state,null),$i(e,t,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function At(e,n){try{var t="",r=n;do t+=zf(r),r=r.return;while(r);var i=t}catch(l){i=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:n,stack:i,digest:null}}function Gl(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Ds(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var nh=typeof WeakMap=="function"?WeakMap:Map;function pd(e,n,t){t=fn(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){Vi||(Vi=!0,Hs=r),Ds(e,n)},t}function hd(e,n,t){t=fn(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=n.value;t.payload=function(){return r(i)},t.callback=function(){Ds(e,n)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(t.callback=function(){Ds(e,n),typeof r!="function"&&(Dn===null?Dn=new Set([this]):Dn.add(this));var s=n.stack;this.componentDidCatch(n.value,{componentStack:s!==null?s:""})}),t}function Ha(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new nh;var i=new Set;r.set(n,i)}else i=r.get(n),i===void 0&&(i=new Set,r.set(n,i));i.has(t)||(i.add(t),e=mh.bind(null,e,n,t),n.then(e,e))}function Qa(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Ya(e,n,t,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=fn(-1,1),n.tag=2,In(t,n,1))),t.lanes|=1),e)}var th=wn.ReactCurrentOwner,je=!1;function _e(e,n,t,r){n.child=e===null?Bc(n,null,t,r):$t(n,e.child,t,r)}function Ka(e,n,t,r,i){t=t.render;var l=n.ref;return Pt(n,i),r=Mo(e,n,t,r,l,i),t=Io(),e!==null&&!je?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,yn(e,n,i)):(G&&t&&ko(n),n.flags|=1,_e(e,n,r,i),n.child)}function Ga(e,n,t,r,i){if(e===null){var l=t.type;return typeof l=="function"&&!Wo(l)&&l.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=l,md(e,n,l,r,i)):(e=wi(t.type,null,r,n,n.mode,i),e.ref=n.ref,e.return=n,n.child=e)}if(l=e.child,!(e.lanes&i)){var s=l.memoizedProps;if(t=t.compare,t=t!==null?t:jr,t(s,r)&&e.ref===n.ref)return yn(e,n,i)}return n.flags|=1,e=bn(l,r),e.ref=n.ref,e.return=n,n.child=e}function md(e,n,t,r,i){if(e!==null){var l=e.memoizedProps;if(jr(l,r)&&e.ref===n.ref)if(je=!1,n.pendingProps=r=l,(e.lanes&i)!==0)e.flags&131072&&(je=!0);else return n.lanes=e.lanes,yn(e,n,i)}return $s(e,n,t,r,i)}function gd(e,n,t){var r=n.pendingProps,i=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},Q(Et,Te),Te|=t;else{if(!(t&1073741824))return e=l!==null?l.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,Q(Et,Te),Te|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:t,Q(Et,Te),Te|=r}else l!==null?(r=l.baseLanes|t,n.memoizedState=null):r=t,Q(Et,Te),Te|=r;return _e(e,n,i,t),n.child}function vd(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function $s(e,n,t,r,i){var l=Ee(t)?nt:xe.current;return l=It(n,l),Pt(n,i),t=Mo(e,n,t,r,l,i),r=Io(),e!==null&&!je?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,yn(e,n,i)):(G&&r&&ko(n),n.flags|=1,_e(e,n,t,i),n.child)}function Xa(e,n,t,r,i){if(Ee(t)){var l=!0;Pi(n)}else l=!1;if(Pt(n,i),n.stateNode===null)yi(e,n),fd(n,t,r),Is(n,t,r,i),r=!0;else if(e===null){var s=n.stateNode,o=n.memoizedProps;s.props=o;var a=s.context,u=t.contextType;typeof u=="object"&&u!==null?u=Fe(u):(u=Ee(t)?nt:xe.current,u=It(n,u));var f=t.getDerivedStateFromProps,h=typeof f=="function"||typeof s.getSnapshotBeforeUpdate=="function";h||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o!==r||a!==u)&&Wa(n,s,r,u),Nn=!1;var g=n.memoizedState;s.state=g,$i(n,r,s,i),a=n.memoizedState,o!==r||g!==a||Ce.current||Nn?(typeof f=="function"&&(Ms(n,t,f,r),a=n.memoizedState),(o=Nn||Za(n,t,o,r,g,a,u))?(h||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(n.flags|=4194308)):(typeof s.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=a),s.props=r,s.state=a,s.context=u,r=o):(typeof s.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{s=n.stateNode,Wc(e,n),o=n.memoizedProps,u=n.type===n.elementType?o:He(n.type,o),s.props=u,h=n.pendingProps,g=s.context,a=t.contextType,typeof a=="object"&&a!==null?a=Fe(a):(a=Ee(t)?nt:xe.current,a=It(n,a));var _=t.getDerivedStateFromProps;(f=typeof _=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o!==h||g!==a)&&Wa(n,s,r,a),Nn=!1,g=n.memoizedState,s.state=g,$i(n,r,s,i);var w=n.memoizedState;o!==h||g!==w||Ce.current||Nn?(typeof _=="function"&&(Ms(n,t,_,r),w=n.memoizedState),(u=Nn||Za(n,t,u,r,g,w,a)||!1)?(f||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,w,a),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,w,a)),typeof s.componentDidUpdate=="function"&&(n.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof s.componentDidUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(n.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=w),s.props=r,s.state=w,s.context=a,r=u):(typeof s.componentDidUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(n.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(n.flags|=1024),r=!1)}return bs(e,n,t,r,l,i)}function bs(e,n,t,r,i,l){vd(e,n);var s=(n.flags&128)!==0;if(!r&&!s)return i&&Da(n,t,!1),yn(e,n,l);r=n.stateNode,th.current=n;var o=s&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&s?(n.child=$t(n,e.child,null,l),n.child=$t(n,null,o,l)):_e(e,n,o,l),n.memoizedState=r.state,i&&Da(n,t,!0),n.child}function yd(e){var n=e.stateNode;n.pendingContext?Ia(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Ia(e,n.context,!1),Ro(e,n.containerInfo)}function Ja(e,n,t,r,i){return Dt(),No(i),n.flags|=256,_e(e,n,t,r),n.child}var As={dehydrated:null,treeContext:null,retryLane:0};function Fs(e){return{baseLanes:e,cachePool:null,transitions:null}}function xd(e,n,t){var r=n.pendingProps,i=J.current,l=!1,s=(n.flags&128)!==0,o;if((o=s)||(o=e!==null&&e.memoizedState===null?!1:(i&2)!==0),o?(l=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),Q(J,i&1),e===null)return Ps(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(s=r.children,e=r.fallback,l?(r=n.mode,l=n.child,s={mode:"hidden",children:s},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=s):l=gl(s,r,0,null),e=et(e,r,t,null),l.return=n,e.return=n,l.sibling=e,n.child=l,n.child.memoizedState=Fs(t),n.memoizedState=As,e):bo(n,s));if(i=e.memoizedState,i!==null&&(o=i.dehydrated,o!==null))return rh(e,n,s,r,o,i,t);if(l){l=r.fallback,s=n.mode,i=e.child,o=i.sibling;var a={mode:"hidden",children:r.children};return!(s&1)&&n.child!==i?(r=n.child,r.childLanes=0,r.pendingProps=a,n.deletions=null):(r=bn(i,a),r.subtreeFlags=i.subtreeFlags&14680064),o!==null?l=bn(o,l):(l=et(l,s,t,null),l.flags|=2),l.return=n,r.return=n,r.sibling=l,n.child=r,r=l,l=n.child,s=e.child.memoizedState,s=s===null?Fs(t):{baseLanes:s.baseLanes|t,cachePool:null,transitions:s.transitions},l.memoizedState=s,l.childLanes=e.childLanes&~t,n.memoizedState=As,r}return l=e.child,e=l.sibling,r=bn(l,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function bo(e,n){return n=gl({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function li(e,n,t,r){return r!==null&&No(r),$t(n,e.child,null,t),e=bo(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function rh(e,n,t,r,i,l,s){if(t)return n.flags&256?(n.flags&=-257,r=Gl(Error(y(422))),li(e,n,s,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(l=r.fallback,i=n.mode,r=gl({mode:"visible",children:r.children},i,0,null),l=et(l,i,s,null),l.flags|=2,r.return=n,l.return=n,r.sibling=l,n.child=r,n.mode&1&&$t(n,e.child,null,s),n.child.memoizedState=Fs(s),n.memoizedState=As,l);if(!(n.mode&1))return li(e,n,s,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var o=r.dgst;return r=o,l=Error(y(419)),r=Gl(l,r,void 0),li(e,n,s,r)}if(o=(s&e.childLanes)!==0,je||o){if(r=fe,r!==null){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|s)?0:i,i!==0&&i!==l.retryLane&&(l.retryLane=i,vn(e,i),Ge(r,e,i,-1))}return Zo(),r=Gl(Error(y(421))),li(e,n,s,r)}return i.data==="$?"?(n.flags|=128,n.child=e.child,n=gh.bind(null,e),i._reactRetry=n,null):(e=l.treeContext,Re=Mn(i.nextSibling),Le=n,G=!0,Ye=null,e!==null&&(De[$e++]=cn,De[$e++]=dn,De[$e++]=tt,cn=e.id,dn=e.overflow,tt=n),n=bo(n,r.children),n.flags|=4096,n)}function qa(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Os(e.return,n,t)}function Xl(e,n,t,r,i){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:i}:(l.isBackwards=n,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=t,l.tailMode=i)}function _d(e,n,t){var r=n.pendingProps,i=r.revealOrder,l=r.tail;if(_e(e,n,r.children,t),r=J.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&qa(e,t,n);else if(e.tag===19)qa(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Q(J,r),!(n.mode&1))n.memoizedState=null;else switch(i){case"forwards":for(t=n.child,i=null;t!==null;)e=t.alternate,e!==null&&bi(e)===null&&(i=t),t=t.sibling;t=i,t===null?(i=n.child,n.child=null):(i=t.sibling,t.sibling=null),Xl(n,!1,i,t,l);break;case"backwards":for(t=null,i=n.child,n.child=null;i!==null;){if(e=i.alternate,e!==null&&bi(e)===null){n.child=i;break}e=i.sibling,i.sibling=t,t=i,i=e}Xl(n,!0,t,null,l);break;case"together":Xl(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function yi(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function yn(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),it|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(y(153));if(n.child!==null){for(e=n.child,t=bn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=bn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function ih(e,n,t){switch(n.tag){case 3:yd(n),Dt();break;case 5:Hc(n);break;case 1:Ee(n.type)&&Pi(n);break;case 4:Ro(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,i=n.memoizedProps.value;Q(Ii,r._currentValue),r._currentValue=i;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(Q(J,J.current&1),n.flags|=128,null):t&n.child.childLanes?xd(e,n,t):(Q(J,J.current&1),e=yn(e,n,t),e!==null?e.sibling:null);Q(J,J.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return _d(e,n,t);n.flags|=128}if(i=n.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Q(J,J.current),r)break;return null;case 22:case 23:return n.lanes=0,gd(e,n,t)}return yn(e,n,t)}var wd,Us,kd,Sd;wd=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Us=function(){};kd=function(e,n,t,r){var i=e.memoizedProps;if(i!==r){e=n.stateNode,Jn(rn.current);var l=null;switch(t){case"input":i=us(e,i),r=us(e,r),l=[];break;case"select":i=ne({},i,{value:void 0}),r=ne({},r,{value:void 0}),l=[];break;case"textarea":i=fs(e,i),r=fs(e,r),l=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Ri)}hs(t,r);var s;t=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var o=i[u];for(s in o)o.hasOwnProperty(s)&&(t||(t={}),t[s]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(yr.hasOwnProperty(u)?l||(l=[]):(l=l||[]).push(u,null));for(u in r){var a=r[u];if(o=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&a!==o&&(a!=null||o!=null))if(u==="style")if(o){for(s in o)!o.hasOwnProperty(s)||a&&a.hasOwnProperty(s)||(t||(t={}),t[s]="");for(s in a)a.hasOwnProperty(s)&&o[s]!==a[s]&&(t||(t={}),t[s]=a[s])}else t||(l||(l=[]),l.push(u,t)),t=a;else u==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,o=o?o.__html:void 0,a!=null&&o!==a&&(l=l||[]).push(u,a)):u==="children"?typeof a!="string"&&typeof a!="number"||(l=l||[]).push(u,""+a):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(yr.hasOwnProperty(u)?(a!=null&&u==="onScroll"&&Y("scroll",e),l||o===a||(l=[])):(l=l||[]).push(u,a))}t&&(l=l||[]).push("style",t);var u=l;(n.updateQueue=u)&&(n.flags|=4)}};Sd=function(e,n,t,r){t!==r&&(n.flags|=4)};function tr(e,n){if(!G)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ve(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var i=e.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function lh(e,n,t){var r=n.pendingProps;switch(So(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ve(n),null;case 1:return Ee(n.type)&&Li(),ve(n),null;case 3:return r=n.stateNode,bt(),K(Ce),K(xe),Po(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ri(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,Ye!==null&&(Ks(Ye),Ye=null))),Us(e,n),ve(n),null;case 5:Lo(n);var i=Jn(Rr.current);if(t=n.type,e!==null&&n.stateNode!=null)kd(e,n,t,r,i),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(y(166));return ve(n),null}if(e=Jn(rn.current),ri(n)){r=n.stateNode,t=n.type;var l=n.memoizedProps;switch(r[nn]=n,r[zr]=l,e=(n.mode&1)!==0,t){case"dialog":Y("cancel",r),Y("close",r);break;case"iframe":case"object":case"embed":Y("load",r);break;case"video":case"audio":for(i=0;i<or.length;i++)Y(or[i],r);break;case"source":Y("error",r);break;case"img":case"image":case"link":Y("error",r),Y("load",r);break;case"details":Y("toggle",r);break;case"input":aa(r,l),Y("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},Y("invalid",r);break;case"textarea":ca(r,l),Y("invalid",r)}hs(t,l),i=null;for(var s in l)if(l.hasOwnProperty(s)){var o=l[s];s==="children"?typeof o=="string"?r.textContent!==o&&(l.suppressHydrationWarning!==!0&&ti(r.textContent,o,e),i=["children",o]):typeof o=="number"&&r.textContent!==""+o&&(l.suppressHydrationWarning!==!0&&ti(r.textContent,o,e),i=["children",""+o]):yr.hasOwnProperty(s)&&o!=null&&s==="onScroll"&&Y("scroll",r)}switch(t){case"input":Yr(r),ua(r,l,!0);break;case"textarea":Yr(r),da(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=Ri)}r=i,n.updateQueue=r,r!==null&&(n.flags|=4)}else{s=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Xu(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(t,{is:r.is}):(e=s.createElement(t),t==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,t),e[nn]=n,e[zr]=r,wd(e,n,!1,!1),n.stateNode=e;e:{switch(s=ms(t,r),t){case"dialog":Y("cancel",e),Y("close",e),i=r;break;case"iframe":case"object":case"embed":Y("load",e),i=r;break;case"video":case"audio":for(i=0;i<or.length;i++)Y(or[i],e);i=r;break;case"source":Y("error",e),i=r;break;case"img":case"image":case"link":Y("error",e),Y("load",e),i=r;break;case"details":Y("toggle",e),i=r;break;case"input":aa(e,r),i=us(e,r),Y("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=ne({},r,{value:void 0}),Y("invalid",e);break;case"textarea":ca(e,r),i=fs(e,r),Y("invalid",e);break;default:i=r}hs(t,i),o=i;for(l in o)if(o.hasOwnProperty(l)){var a=o[l];l==="style"?ec(e,a):l==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&Ju(e,a)):l==="children"?typeof a=="string"?(t!=="textarea"||a!=="")&&xr(e,a):typeof a=="number"&&xr(e,""+a):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(yr.hasOwnProperty(l)?a!=null&&l==="onScroll"&&Y("scroll",e):a!=null&&oo(e,l,a,s))}switch(t){case"input":Yr(e),ua(e,r,!1);break;case"textarea":Yr(e),da(e);break;case"option":r.value!=null&&e.setAttribute("value",""+An(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?zt(e,!!r.multiple,l,!1):r.defaultValue!=null&&zt(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Ri)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return ve(n),null;case 6:if(e&&n.stateNode!=null)Sd(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(y(166));if(t=Jn(Rr.current),Jn(rn.current),ri(n)){if(r=n.stateNode,t=n.memoizedProps,r[nn]=n,(l=r.nodeValue!==t)&&(e=Le,e!==null))switch(e.tag){case 3:ti(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ti(r.nodeValue,t,(e.mode&1)!==0)}l&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[nn]=n,n.stateNode=r}return ve(n),null;case 13:if(K(J),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(G&&Re!==null&&n.mode&1&&!(n.flags&128))Uc(),Dt(),n.flags|=98560,l=!1;else if(l=ri(n),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(y(318));if(l=n.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(y(317));l[nn]=n}else Dt(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;ve(n),l=!1}else Ye!==null&&(Ks(Ye),Ye=null),l=!0;if(!l)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||J.current&1?ue===0&&(ue=3):Zo())),n.updateQueue!==null&&(n.flags|=4),ve(n),null);case 4:return bt(),Us(e,n),e===null&&Cr(n.stateNode.containerInfo),ve(n),null;case 10:return Eo(n.type._context),ve(n),null;case 17:return Ee(n.type)&&Li(),ve(n),null;case 19:if(K(J),l=n.memoizedState,l===null)return ve(n),null;if(r=(n.flags&128)!==0,s=l.rendering,s===null)if(r)tr(l,!1);else{if(ue!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(s=bi(e),s!==null){for(n.flags|=128,tr(l,!1),r=s.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)l=t,e=r,l.flags&=14680066,s=l.alternate,s===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=s.childLanes,l.lanes=s.lanes,l.child=s.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=s.memoizedProps,l.memoizedState=s.memoizedState,l.updateQueue=s.updateQueue,l.type=s.type,e=s.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return Q(J,J.current&1|2),n.child}e=e.sibling}l.tail!==null&&se()>Ft&&(n.flags|=128,r=!0,tr(l,!1),n.lanes=4194304)}else{if(!r)if(e=bi(s),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),tr(l,!0),l.tail===null&&l.tailMode==="hidden"&&!s.alternate&&!G)return ve(n),null}else 2*se()-l.renderingStartTime>Ft&&t!==1073741824&&(n.flags|=128,r=!0,tr(l,!1),n.lanes=4194304);l.isBackwards?(s.sibling=n.child,n.child=s):(t=l.last,t!==null?t.sibling=s:n.child=s,l.last=s)}return l.tail!==null?(n=l.tail,l.rendering=n,l.tail=n.sibling,l.renderingStartTime=se(),n.sibling=null,t=J.current,Q(J,r?t&1|2:t&1),n):(ve(n),null);case 22:case 23:return Bo(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?Te&1073741824&&(ve(n),n.subtreeFlags&6&&(n.flags|=8192)):ve(n),null;case 24:return null;case 25:return null}throw Error(y(156,n.tag))}function sh(e,n){switch(So(n),n.tag){case 1:return Ee(n.type)&&Li(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return bt(),K(Ce),K(xe),Po(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Lo(n),null;case 13:if(K(J),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(y(340));Dt()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return K(J),null;case 4:return bt(),null;case 10:return Eo(n.type._context),null;case 22:case 23:return Bo(),null;case 24:return null;default:return null}}var si=!1,ye=!1,oh=typeof WeakSet=="function"?WeakSet:Set,N=null;function Ct(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){re(e,n,r)}else t.current=null}function Vs(e,n,t){try{t()}catch(r){re(e,n,r)}}var eu=!1;function ah(e,n){if(js=Ei,e=zc(),wo(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var i=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{t.nodeType,l.nodeType}catch{t=null;break e}var s=0,o=-1,a=-1,u=0,f=0,h=e,g=null;n:for(;;){for(var _;h!==t||i!==0&&h.nodeType!==3||(o=s+i),h!==l||r!==0&&h.nodeType!==3||(a=s+r),h.nodeType===3&&(s+=h.nodeValue.length),(_=h.firstChild)!==null;)g=h,h=_;for(;;){if(h===e)break n;if(g===t&&++u===i&&(o=s),g===l&&++f===r&&(a=s),(_=h.nextSibling)!==null)break;h=g,g=h.parentNode}h=_}t=o===-1||a===-1?null:{start:o,end:a}}else t=null}t=t||{start:0,end:0}}else t=null;for(Cs={focusedElem:e,selectionRange:t},Ei=!1,N=n;N!==null;)if(n=N,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,N=e;else for(;N!==null;){n=N;try{var w=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var S=w.memoizedProps,B=w.memoizedState,p=n.stateNode,d=p.getSnapshotBeforeUpdate(n.elementType===n.type?S:He(n.type,S),B);p.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var m=n.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(y(163))}}catch(v){re(n,n.return,v)}if(e=n.sibling,e!==null){e.return=n.return,N=e;break}N=n.return}return w=eu,eu=!1,w}function mr(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var l=i.destroy;i.destroy=void 0,l!==void 0&&Vs(n,t,l)}i=i.next}while(i!==r)}}function hl(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function Bs(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function Nd(e){var n=e.alternate;n!==null&&(e.alternate=null,Nd(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[nn],delete n[zr],delete n[Ts],delete n[Zp],delete n[Wp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function jd(e){return e.tag===5||e.tag===3||e.tag===4}function nu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||jd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Zs(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Ri));else if(r!==4&&(e=e.child,e!==null))for(Zs(e,n,t),e=e.sibling;e!==null;)Zs(e,n,t),e=e.sibling}function Ws(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ws(e,n,t),e=e.sibling;e!==null;)Ws(e,n,t),e=e.sibling}var pe=null,Qe=!1;function kn(e,n,t){for(t=t.child;t!==null;)Cd(e,n,t),t=t.sibling}function Cd(e,n,t){if(tn&&typeof tn.onCommitFiberUnmount=="function")try{tn.onCommitFiberUnmount(sl,t)}catch{}switch(t.tag){case 5:ye||Ct(t,n);case 6:var r=pe,i=Qe;pe=null,kn(e,n,t),pe=r,Qe=i,pe!==null&&(Qe?(e=pe,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):pe.removeChild(t.stateNode));break;case 18:pe!==null&&(Qe?(e=pe,t=t.stateNode,e.nodeType===8?Zl(e.parentNode,t):e.nodeType===1&&Zl(e,t),Sr(e)):Zl(pe,t.stateNode));break;case 4:r=pe,i=Qe,pe=t.stateNode.containerInfo,Qe=!0,kn(e,n,t),pe=r,Qe=i;break;case 0:case 11:case 14:case 15:if(!ye&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var l=i,s=l.destroy;l=l.tag,s!==void 0&&(l&2||l&4)&&Vs(t,n,s),i=i.next}while(i!==r)}kn(e,n,t);break;case 1:if(!ye&&(Ct(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(o){re(t,n,o)}kn(e,n,t);break;case 21:kn(e,n,t);break;case 22:t.mode&1?(ye=(r=ye)||t.memoizedState!==null,kn(e,n,t),ye=r):kn(e,n,t);break;default:kn(e,n,t)}}function tu(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new oh),n.forEach(function(r){var i=vh.bind(null,e,r);t.has(r)||(t.add(r),r.then(i,i))})}}function We(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];try{var l=e,s=n,o=s;e:for(;o!==null;){switch(o.tag){case 5:pe=o.stateNode,Qe=!1;break e;case 3:pe=o.stateNode.containerInfo,Qe=!0;break e;case 4:pe=o.stateNode.containerInfo,Qe=!0;break e}o=o.return}if(pe===null)throw Error(y(160));Cd(l,s,i),pe=null,Qe=!1;var a=i.alternate;a!==null&&(a.return=null),i.return=null}catch(u){re(i,n,u)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)Ed(n,e),n=n.sibling}function Ed(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(We(n,e),qe(e),r&4){try{mr(3,e,e.return),hl(3,e)}catch(S){re(e,e.return,S)}try{mr(5,e,e.return)}catch(S){re(e,e.return,S)}}break;case 1:We(n,e),qe(e),r&512&&t!==null&&Ct(t,t.return);break;case 5:if(We(n,e),qe(e),r&512&&t!==null&&Ct(t,t.return),e.flags&32){var i=e.stateNode;try{xr(i,"")}catch(S){re(e,e.return,S)}}if(r&4&&(i=e.stateNode,i!=null)){var l=e.memoizedProps,s=t!==null?t.memoizedProps:l,o=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{o==="input"&&l.type==="radio"&&l.name!=null&&Ku(i,l),ms(o,s);var u=ms(o,l);for(s=0;s<a.length;s+=2){var f=a[s],h=a[s+1];f==="style"?ec(i,h):f==="dangerouslySetInnerHTML"?Ju(i,h):f==="children"?xr(i,h):oo(i,f,h,u)}switch(o){case"input":cs(i,l);break;case"textarea":Gu(i,l);break;case"select":var g=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!l.multiple;var _=l.value;_!=null?zt(i,!!l.multiple,_,!1):g!==!!l.multiple&&(l.defaultValue!=null?zt(i,!!l.multiple,l.defaultValue,!0):zt(i,!!l.multiple,l.multiple?[]:"",!1))}i[zr]=l}catch(S){re(e,e.return,S)}}break;case 6:if(We(n,e),qe(e),r&4){if(e.stateNode===null)throw Error(y(162));i=e.stateNode,l=e.memoizedProps;try{i.nodeValue=l}catch(S){re(e,e.return,S)}}break;case 3:if(We(n,e),qe(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Sr(n.containerInfo)}catch(S){re(e,e.return,S)}break;case 4:We(n,e),qe(e);break;case 13:We(n,e),qe(e),i=e.child,i.flags&8192&&(l=i.memoizedState!==null,i.stateNode.isHidden=l,!l||i.alternate!==null&&i.alternate.memoizedState!==null||(Uo=se())),r&4&&tu(e);break;case 22:if(f=t!==null&&t.memoizedState!==null,e.mode&1?(ye=(u=ye)||f,We(n,e),ye=u):We(n,e),qe(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!f&&e.mode&1)for(N=e,f=e.child;f!==null;){for(h=N=f;N!==null;){switch(g=N,_=g.child,g.tag){case 0:case 11:case 14:case 15:mr(4,g,g.return);break;case 1:Ct(g,g.return);var w=g.stateNode;if(typeof w.componentWillUnmount=="function"){r=g,t=g.return;try{n=r,w.props=n.memoizedProps,w.state=n.memoizedState,w.componentWillUnmount()}catch(S){re(r,t,S)}}break;case 5:Ct(g,g.return);break;case 22:if(g.memoizedState!==null){iu(h);continue}}_!==null?(_.return=g,N=_):iu(h)}f=f.sibling}e:for(f=null,h=e;;){if(h.tag===5){if(f===null){f=h;try{i=h.stateNode,u?(l=i.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(o=h.stateNode,a=h.memoizedProps.style,s=a!=null&&a.hasOwnProperty("display")?a.display:null,o.style.display=qu("display",s))}catch(S){re(e,e.return,S)}}}else if(h.tag===6){if(f===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(S){re(e,e.return,S)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;f===h&&(f=null),h=h.return}f===h&&(f=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:We(n,e),qe(e),r&4&&tu(e);break;case 21:break;default:We(n,e),qe(e)}}function qe(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(jd(t)){var r=t;break e}t=t.return}throw Error(y(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(xr(i,""),r.flags&=-33);var l=nu(e);Ws(e,l,i);break;case 3:case 4:var s=r.stateNode.containerInfo,o=nu(e);Zs(e,o,s);break;default:throw Error(y(161))}}catch(a){re(e,e.return,a)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function uh(e,n,t){N=e,zd(e)}function zd(e,n,t){for(var r=(e.mode&1)!==0;N!==null;){var i=N,l=i.child;if(i.tag===22&&r){var s=i.memoizedState!==null||si;if(!s){var o=i.alternate,a=o!==null&&o.memoizedState!==null||ye;o=si;var u=ye;if(si=s,(ye=a)&&!u)for(N=i;N!==null;)s=N,a=s.child,s.tag===22&&s.memoizedState!==null?lu(i):a!==null?(a.return=s,N=a):lu(i);for(;l!==null;)N=l,zd(l),l=l.sibling;N=i,si=o,ye=u}ru(e)}else i.subtreeFlags&8772&&l!==null?(l.return=i,N=l):ru(e)}}function ru(e){for(;N!==null;){var n=N;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:ye||hl(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!ye)if(t===null)r.componentDidMount();else{var i=n.elementType===n.type?t.memoizedProps:He(n.type,t.memoizedProps);r.componentDidUpdate(i,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=n.updateQueue;l!==null&&Ua(n,l,r);break;case 3:var s=n.updateQueue;if(s!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Ua(n,s,t)}break;case 5:var o=n.stateNode;if(t===null&&n.flags&4){t=o;var a=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&t.focus();break;case"img":a.src&&(t.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var u=n.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var h=f.dehydrated;h!==null&&Sr(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(y(163))}ye||n.flags&512&&Bs(n)}catch(g){re(n,n.return,g)}}if(n===e){N=null;break}if(t=n.sibling,t!==null){t.return=n.return,N=t;break}N=n.return}}function iu(e){for(;N!==null;){var n=N;if(n===e){N=null;break}var t=n.sibling;if(t!==null){t.return=n.return,N=t;break}N=n.return}}function lu(e){for(;N!==null;){var n=N;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{hl(4,n)}catch(a){re(n,t,a)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var i=n.return;try{r.componentDidMount()}catch(a){re(n,i,a)}}var l=n.return;try{Bs(n)}catch(a){re(n,l,a)}break;case 5:var s=n.return;try{Bs(n)}catch(a){re(n,s,a)}}}catch(a){re(n,n.return,a)}if(n===e){N=null;break}var o=n.sibling;if(o!==null){o.return=n.return,N=o;break}N=n.return}}var ch=Math.ceil,Ui=wn.ReactCurrentDispatcher,Ao=wn.ReactCurrentOwner,Ae=wn.ReactCurrentBatchConfig,U=0,fe=null,oe=null,he=0,Te=0,Et=Zn(0),ue=0,Mr=null,it=0,ml=0,Fo=0,gr=null,Ne=null,Uo=0,Ft=1/0,an=null,Vi=!1,Hs=null,Dn=null,oi=!1,Tn=null,Bi=0,vr=0,Qs=null,xi=-1,_i=0;function we(){return U&6?se():xi!==-1?xi:xi=se()}function $n(e){return e.mode&1?U&2&&he!==0?he&-he:Qp.transition!==null?(_i===0&&(_i=fc()),_i):(e=W,e!==0||(e=window.event,e=e===void 0?16:xc(e.type)),e):1}function Ge(e,n,t,r){if(50<vr)throw vr=0,Qs=null,Error(y(185));Ar(e,t,r),(!(U&2)||e!==fe)&&(e===fe&&(!(U&2)&&(ml|=t),ue===4&&En(e,he)),ze(e,r),t===1&&U===0&&!(n.mode&1)&&(Ft=se()+500,dl&&Wn()))}function ze(e,n){var t=e.callbackNode;Qf(e,n);var r=Ci(e,e===fe?he:0);if(r===0)t!==null&&ha(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&ha(t),n===1)e.tag===0?Hp(su.bind(null,e)):bc(su.bind(null,e)),Vp(function(){!(U&6)&&Wn()}),t=null;else{switch(pc(r)){case 1:t=po;break;case 4:t=cc;break;case 16:t=ji;break;case 536870912:t=dc;break;default:t=ji}t=Dd(t,Td.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function Td(e,n){if(xi=-1,_i=0,U&6)throw Error(y(327));var t=e.callbackNode;if(Ot()&&e.callbackNode!==t)return null;var r=Ci(e,e===fe?he:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=Zi(e,r);else{n=r;var i=U;U|=2;var l=Ld();(fe!==e||he!==n)&&(an=null,Ft=se()+500,qn(e,n));do try{ph();break}catch(o){Rd(e,o)}while(!0);Co(),Ui.current=l,U=i,oe!==null?n=0:(fe=null,he=0,n=ue)}if(n!==0){if(n===2&&(i=_s(e),i!==0&&(r=i,n=Ys(e,i))),n===1)throw t=Mr,qn(e,0),En(e,r),ze(e,se()),t;if(n===6)En(e,r);else{if(i=e.current.alternate,!(r&30)&&!dh(i)&&(n=Zi(e,r),n===2&&(l=_s(e),l!==0&&(r=l,n=Ys(e,l))),n===1))throw t=Mr,qn(e,0),En(e,r),ze(e,se()),t;switch(e.finishedWork=i,e.finishedLanes=r,n){case 0:case 1:throw Error(y(345));case 2:Kn(e,Ne,an);break;case 3:if(En(e,r),(r&130023424)===r&&(n=Uo+500-se(),10<n)){if(Ci(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){we(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=zs(Kn.bind(null,e,Ne,an),n);break}Kn(e,Ne,an);break;case 4:if(En(e,r),(r&4194240)===r)break;for(n=e.eventTimes,i=-1;0<r;){var s=31-Ke(r);l=1<<s,s=n[s],s>i&&(i=s),r&=~l}if(r=i,r=se()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ch(r/1960))-r,10<r){e.timeoutHandle=zs(Kn.bind(null,e,Ne,an),r);break}Kn(e,Ne,an);break;case 5:Kn(e,Ne,an);break;default:throw Error(y(329))}}}return ze(e,se()),e.callbackNode===t?Td.bind(null,e):null}function Ys(e,n){var t=gr;return e.current.memoizedState.isDehydrated&&(qn(e,n).flags|=256),e=Zi(e,n),e!==2&&(n=Ne,Ne=t,n!==null&&Ks(n)),e}function Ks(e){Ne===null?Ne=e:Ne.push.apply(Ne,e)}function dh(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var i=t[r],l=i.getSnapshot;i=i.value;try{if(!Xe(l(),i))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function En(e,n){for(n&=~Fo,n&=~ml,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Ke(n),r=1<<t;e[t]=-1,n&=~r}}function su(e){if(U&6)throw Error(y(327));Ot();var n=Ci(e,0);if(!(n&1))return ze(e,se()),null;var t=Zi(e,n);if(e.tag!==0&&t===2){var r=_s(e);r!==0&&(n=r,t=Ys(e,r))}if(t===1)throw t=Mr,qn(e,0),En(e,n),ze(e,se()),t;if(t===6)throw Error(y(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,Kn(e,Ne,an),ze(e,se()),null}function Vo(e,n){var t=U;U|=1;try{return e(n)}finally{U=t,U===0&&(Ft=se()+500,dl&&Wn())}}function lt(e){Tn!==null&&Tn.tag===0&&!(U&6)&&Ot();var n=U;U|=1;var t=Ae.transition,r=W;try{if(Ae.transition=null,W=1,e)return e()}finally{W=r,Ae.transition=t,U=n,!(U&6)&&Wn()}}function Bo(){Te=Et.current,K(Et)}function qn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,Up(t)),oe!==null)for(t=oe.return;t!==null;){var r=t;switch(So(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Li();break;case 3:bt(),K(Ce),K(xe),Po();break;case 5:Lo(r);break;case 4:bt();break;case 13:K(J);break;case 19:K(J);break;case 10:Eo(r.type._context);break;case 22:case 23:Bo()}t=t.return}if(fe=e,oe=e=bn(e.current,null),he=Te=n,ue=0,Mr=null,Fo=ml=it=0,Ne=gr=null,Xn!==null){for(n=0;n<Xn.length;n++)if(t=Xn[n],r=t.interleaved,r!==null){t.interleaved=null;var i=r.next,l=t.pending;if(l!==null){var s=l.next;l.next=i,r.next=s}t.pending=r}Xn=null}return e}function Rd(e,n){do{var t=oe;try{if(Co(),gi.current=Fi,Ai){for(var r=ee.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Ai=!1}if(rt=0,de=ae=ee=null,hr=!1,Lr=0,Ao.current=null,t===null||t.return===null){ue=1,Mr=n,oe=null;break}e:{var l=e,s=t.return,o=t,a=n;if(n=he,o.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var u=a,f=o,h=f.tag;if(!(f.mode&1)&&(h===0||h===11||h===15)){var g=f.alternate;g?(f.updateQueue=g.updateQueue,f.memoizedState=g.memoizedState,f.lanes=g.lanes):(f.updateQueue=null,f.memoizedState=null)}var _=Qa(s);if(_!==null){_.flags&=-257,Ya(_,s,o,l,n),_.mode&1&&Ha(l,u,n),n=_,a=u;var w=n.updateQueue;if(w===null){var S=new Set;S.add(a),n.updateQueue=S}else w.add(a);break e}else{if(!(n&1)){Ha(l,u,n),Zo();break e}a=Error(y(426))}}else if(G&&o.mode&1){var B=Qa(s);if(B!==null){!(B.flags&65536)&&(B.flags|=256),Ya(B,s,o,l,n),No(At(a,o));break e}}l=a=At(a,o),ue!==4&&(ue=2),gr===null?gr=[l]:gr.push(l),l=s;do{switch(l.tag){case 3:l.flags|=65536,n&=-n,l.lanes|=n;var p=pd(l,a,n);Fa(l,p);break e;case 1:o=a;var d=l.type,m=l.stateNode;if(!(l.flags&128)&&(typeof d.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(Dn===null||!Dn.has(m)))){l.flags|=65536,n&=-n,l.lanes|=n;var v=hd(l,o,n);Fa(l,v);break e}}l=l.return}while(l!==null)}Od(t)}catch(j){n=j,oe===t&&t!==null&&(oe=t=t.return);continue}break}while(!0)}function Ld(){var e=Ui.current;return Ui.current=Fi,e===null?Fi:e}function Zo(){(ue===0||ue===3||ue===2)&&(ue=4),fe===null||!(it&268435455)&&!(ml&268435455)||En(fe,he)}function Zi(e,n){var t=U;U|=2;var r=Ld();(fe!==e||he!==n)&&(an=null,qn(e,n));do try{fh();break}catch(i){Rd(e,i)}while(!0);if(Co(),U=t,Ui.current=r,oe!==null)throw Error(y(261));return fe=null,he=0,ue}function fh(){for(;oe!==null;)Pd(oe)}function ph(){for(;oe!==null&&!bf();)Pd(oe)}function Pd(e){var n=Id(e.alternate,e,Te);e.memoizedProps=e.pendingProps,n===null?Od(e):oe=n,Ao.current=null}function Od(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=sh(t,n),t!==null){t.flags&=32767,oe=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ue=6,oe=null;return}}else if(t=lh(t,n,Te),t!==null){oe=t;return}if(n=n.sibling,n!==null){oe=n;return}oe=n=e}while(n!==null);ue===0&&(ue=5)}function Kn(e,n,t){var r=W,i=Ae.transition;try{Ae.transition=null,W=1,hh(e,n,t,r)}finally{Ae.transition=i,W=r}return null}function hh(e,n,t,r){do Ot();while(Tn!==null);if(U&6)throw Error(y(327));t=e.finishedWork;var i=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(y(177));e.callbackNode=null,e.callbackPriority=0;var l=t.lanes|t.childLanes;if(Yf(e,l),e===fe&&(oe=fe=null,he=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||oi||(oi=!0,Dd(ji,function(){return Ot(),null})),l=(t.flags&15990)!==0,t.subtreeFlags&15990||l){l=Ae.transition,Ae.transition=null;var s=W;W=1;var o=U;U|=4,Ao.current=null,ah(e,t),Ed(t,e),Mp(Cs),Ei=!!js,Cs=js=null,e.current=t,uh(t),Af(),U=o,W=s,Ae.transition=l}else e.current=t;if(oi&&(oi=!1,Tn=e,Bi=i),l=e.pendingLanes,l===0&&(Dn=null),Vf(t.stateNode),ze(e,se()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)i=n[t],r(i.value,{componentStack:i.stack,digest:i.digest});if(Vi)throw Vi=!1,e=Hs,Hs=null,e;return Bi&1&&e.tag!==0&&Ot(),l=e.pendingLanes,l&1?e===Qs?vr++:(vr=0,Qs=e):vr=0,Wn(),null}function Ot(){if(Tn!==null){var e=pc(Bi),n=Ae.transition,t=W;try{if(Ae.transition=null,W=16>e?16:e,Tn===null)var r=!1;else{if(e=Tn,Tn=null,Bi=0,U&6)throw Error(y(331));var i=U;for(U|=4,N=e.current;N!==null;){var l=N,s=l.child;if(N.flags&16){var o=l.deletions;if(o!==null){for(var a=0;a<o.length;a++){var u=o[a];for(N=u;N!==null;){var f=N;switch(f.tag){case 0:case 11:case 15:mr(8,f,l)}var h=f.child;if(h!==null)h.return=f,N=h;else for(;N!==null;){f=N;var g=f.sibling,_=f.return;if(Nd(f),f===u){N=null;break}if(g!==null){g.return=_,N=g;break}N=_}}}var w=l.alternate;if(w!==null){var S=w.child;if(S!==null){w.child=null;do{var B=S.sibling;S.sibling=null,S=B}while(S!==null)}}N=l}}if(l.subtreeFlags&2064&&s!==null)s.return=l,N=s;else e:for(;N!==null;){if(l=N,l.flags&2048)switch(l.tag){case 0:case 11:case 15:mr(9,l,l.return)}var p=l.sibling;if(p!==null){p.return=l.return,N=p;break e}N=l.return}}var d=e.current;for(N=d;N!==null;){s=N;var m=s.child;if(s.subtreeFlags&2064&&m!==null)m.return=s,N=m;else e:for(s=d;N!==null;){if(o=N,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:hl(9,o)}}catch(j){re(o,o.return,j)}if(o===s){N=null;break e}var v=o.sibling;if(v!==null){v.return=o.return,N=v;break e}N=o.return}}if(U=i,Wn(),tn&&typeof tn.onPostCommitFiberRoot=="function")try{tn.onPostCommitFiberRoot(sl,e)}catch{}r=!0}return r}finally{W=t,Ae.transition=n}}return!1}function ou(e,n,t){n=At(t,n),n=pd(e,n,1),e=In(e,n,1),n=we(),e!==null&&(Ar(e,1,n),ze(e,n))}function re(e,n,t){if(e.tag===3)ou(e,e,t);else for(;n!==null;){if(n.tag===3){ou(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Dn===null||!Dn.has(r))){e=At(t,e),e=hd(n,e,1),n=In(n,e,1),e=we(),n!==null&&(Ar(n,1,e),ze(n,e));break}}n=n.return}}function mh(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=we(),e.pingedLanes|=e.suspendedLanes&t,fe===e&&(he&t)===t&&(ue===4||ue===3&&(he&130023424)===he&&500>se()-Uo?qn(e,0):Fo|=t),ze(e,n)}function Md(e,n){n===0&&(e.mode&1?(n=Xr,Xr<<=1,!(Xr&130023424)&&(Xr=4194304)):n=1);var t=we();e=vn(e,n),e!==null&&(Ar(e,n,t),ze(e,t))}function gh(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),Md(e,t)}function vh(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(t=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(y(314))}r!==null&&r.delete(n),Md(e,t)}var Id;Id=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||Ce.current)je=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return je=!1,ih(e,n,t);je=!!(e.flags&131072)}else je=!1,G&&n.flags&1048576&&Ac(n,Mi,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;yi(e,n),e=n.pendingProps;var i=It(n,xe.current);Pt(n,t),i=Mo(null,n,r,e,i,t);var l=Io();return n.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,Ee(r)?(l=!0,Pi(n)):l=!1,n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,To(n),i.updater=pl,n.stateNode=i,i._reactInternals=n,Is(n,r,e,t),n=bs(null,n,r,!0,l,t)):(n.tag=0,G&&l&&ko(n),_e(null,n,i,t),n=n.child),n;case 16:r=n.elementType;e:{switch(yi(e,n),e=n.pendingProps,i=r._init,r=i(r._payload),n.type=r,i=n.tag=xh(r),e=He(r,e),i){case 0:n=$s(null,n,r,e,t);break e;case 1:n=Xa(null,n,r,e,t);break e;case 11:n=Ka(null,n,r,e,t);break e;case 14:n=Ga(null,n,r,He(r.type,e),t);break e}throw Error(y(306,r,""))}return n;case 0:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:He(r,i),$s(e,n,r,i,t);case 1:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:He(r,i),Xa(e,n,r,i,t);case 3:e:{if(yd(n),e===null)throw Error(y(387));r=n.pendingProps,l=n.memoizedState,i=l.element,Wc(e,n),$i(n,r,null,t);var s=n.memoizedState;if(r=s.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},n.updateQueue.baseState=l,n.memoizedState=l,n.flags&256){i=At(Error(y(423)),n),n=Ja(e,n,r,t,i);break e}else if(r!==i){i=At(Error(y(424)),n),n=Ja(e,n,r,t,i);break e}else for(Re=Mn(n.stateNode.containerInfo.firstChild),Le=n,G=!0,Ye=null,t=Bc(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Dt(),r===i){n=yn(e,n,t);break e}_e(e,n,r,t)}n=n.child}return n;case 5:return Hc(n),e===null&&Ps(n),r=n.type,i=n.pendingProps,l=e!==null?e.memoizedProps:null,s=i.children,Es(r,i)?s=null:l!==null&&Es(r,l)&&(n.flags|=32),vd(e,n),_e(e,n,s,t),n.child;case 6:return e===null&&Ps(n),null;case 13:return xd(e,n,t);case 4:return Ro(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=$t(n,null,r,t):_e(e,n,r,t),n.child;case 11:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:He(r,i),Ka(e,n,r,i,t);case 7:return _e(e,n,n.pendingProps,t),n.child;case 8:return _e(e,n,n.pendingProps.children,t),n.child;case 12:return _e(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,i=n.pendingProps,l=n.memoizedProps,s=i.value,Q(Ii,r._currentValue),r._currentValue=s,l!==null)if(Xe(l.value,s)){if(l.children===i.children&&!Ce.current){n=yn(e,n,t);break e}}else for(l=n.child,l!==null&&(l.return=n);l!==null;){var o=l.dependencies;if(o!==null){s=l.child;for(var a=o.firstContext;a!==null;){if(a.context===r){if(l.tag===1){a=fn(-1,t&-t),a.tag=2;var u=l.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?a.next=a:(a.next=f.next,f.next=a),u.pending=a}}l.lanes|=t,a=l.alternate,a!==null&&(a.lanes|=t),Os(l.return,t,n),o.lanes|=t;break}a=a.next}}else if(l.tag===10)s=l.type===n.type?null:l.child;else if(l.tag===18){if(s=l.return,s===null)throw Error(y(341));s.lanes|=t,o=s.alternate,o!==null&&(o.lanes|=t),Os(s,t,n),s=l.sibling}else s=l.child;if(s!==null)s.return=l;else for(s=l;s!==null;){if(s===n){s=null;break}if(l=s.sibling,l!==null){l.return=s.return,s=l;break}s=s.return}l=s}_e(e,n,i.children,t),n=n.child}return n;case 9:return i=n.type,r=n.pendingProps.children,Pt(n,t),i=Fe(i),r=r(i),n.flags|=1,_e(e,n,r,t),n.child;case 14:return r=n.type,i=He(r,n.pendingProps),i=He(r.type,i),Ga(e,n,r,i,t);case 15:return md(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:He(r,i),yi(e,n),n.tag=1,Ee(r)?(e=!0,Pi(n)):e=!1,Pt(n,t),fd(n,r,i),Is(n,r,i,t),bs(null,n,r,!0,e,t);case 19:return _d(e,n,t);case 22:return gd(e,n,t)}throw Error(y(156,n.tag))};function Dd(e,n){return uc(e,n)}function yh(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function be(e,n,t,r){return new yh(e,n,t,r)}function Wo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function xh(e){if(typeof e=="function")return Wo(e)?1:0;if(e!=null){if(e=e.$$typeof,e===uo)return 11;if(e===co)return 14}return 2}function bn(e,n){var t=e.alternate;return t===null?(t=be(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function wi(e,n,t,r,i,l){var s=2;if(r=e,typeof e=="function")Wo(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case vt:return et(t.children,i,l,n);case ao:s=8,i|=8;break;case ls:return e=be(12,t,n,i|2),e.elementType=ls,e.lanes=l,e;case ss:return e=be(13,t,n,i),e.elementType=ss,e.lanes=l,e;case os:return e=be(19,t,n,i),e.elementType=os,e.lanes=l,e;case Hu:return gl(t,i,l,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Zu:s=10;break e;case Wu:s=9;break e;case uo:s=11;break e;case co:s=14;break e;case Sn:s=16,r=null;break e}throw Error(y(130,e==null?e:typeof e,""))}return n=be(s,t,n,i),n.elementType=e,n.type=r,n.lanes=l,n}function et(e,n,t,r){return e=be(7,e,r,n),e.lanes=t,e}function gl(e,n,t,r){return e=be(22,e,r,n),e.elementType=Hu,e.lanes=t,e.stateNode={isHidden:!1},e}function Jl(e,n,t){return e=be(6,e,null,n),e.lanes=t,e}function ql(e,n,t){return n=be(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function _h(e,n,t,r,i){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ol(0),this.expirationTimes=Ol(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ol(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Ho(e,n,t,r,i,l,s,o,a){return e=new _h(e,n,t,o,a),n===1?(n=1,l===!0&&(n|=8)):n=0,l=be(3,null,null,n),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},To(l),e}function wh(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:gt,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function $d(e){if(!e)return Fn;e=e._reactInternals;e:{if(ft(e)!==e||e.tag!==1)throw Error(y(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(Ee(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(y(171))}if(e.tag===1){var t=e.type;if(Ee(t))return $c(e,t,n)}return n}function bd(e,n,t,r,i,l,s,o,a){return e=Ho(t,r,!0,e,i,l,s,o,a),e.context=$d(null),t=e.current,r=we(),i=$n(t),l=fn(r,i),l.callback=n??null,In(t,l,i),e.current.lanes=i,Ar(e,i,r),ze(e,r),e}function vl(e,n,t,r){var i=n.current,l=we(),s=$n(i);return t=$d(t),n.context===null?n.context=t:n.pendingContext=t,n=fn(l,s),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=In(i,n,s),e!==null&&(Ge(e,i,s,l),mi(e,i,s)),s}function Wi(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function au(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function Qo(e,n){au(e,n),(e=e.alternate)&&au(e,n)}function kh(){return null}var Ad=typeof reportError=="function"?reportError:function(e){console.error(e)};function Yo(e){this._internalRoot=e}yl.prototype.render=Yo.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(y(409));vl(e,n,null,null)};yl.prototype.unmount=Yo.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;lt(function(){vl(null,e,null,null)}),n[gn]=null}};function yl(e){this._internalRoot=e}yl.prototype.unstable_scheduleHydration=function(e){if(e){var n=gc();e={blockedOn:null,target:e,priority:n};for(var t=0;t<Cn.length&&n!==0&&n<Cn[t].priority;t++);Cn.splice(t,0,e),t===0&&yc(e)}};function Ko(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function xl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function uu(){}function Sh(e,n,t,r,i){if(i){if(typeof r=="function"){var l=r;r=function(){var u=Wi(s);l.call(u)}}var s=bd(n,r,e,0,null,!1,!1,"",uu);return e._reactRootContainer=s,e[gn]=s.current,Cr(e.nodeType===8?e.parentNode:e),lt(),s}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var o=r;r=function(){var u=Wi(a);o.call(u)}}var a=Ho(e,0,!1,null,null,!1,!1,"",uu);return e._reactRootContainer=a,e[gn]=a.current,Cr(e.nodeType===8?e.parentNode:e),lt(function(){vl(n,a,t,r)}),a}function _l(e,n,t,r,i){var l=t._reactRootContainer;if(l){var s=l;if(typeof i=="function"){var o=i;i=function(){var a=Wi(s);o.call(a)}}vl(n,s,e,i)}else s=Sh(t,n,e,i,r);return Wi(s)}hc=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=sr(n.pendingLanes);t!==0&&(ho(n,t|1),ze(n,se()),!(U&6)&&(Ft=se()+500,Wn()))}break;case 13:lt(function(){var r=vn(e,1);if(r!==null){var i=we();Ge(r,e,1,i)}}),Qo(e,1)}};mo=function(e){if(e.tag===13){var n=vn(e,134217728);if(n!==null){var t=we();Ge(n,e,134217728,t)}Qo(e,134217728)}};mc=function(e){if(e.tag===13){var n=$n(e),t=vn(e,n);if(t!==null){var r=we();Ge(t,e,n,r)}Qo(e,n)}};gc=function(){return W};vc=function(e,n){var t=W;try{return W=e,n()}finally{W=t}};vs=function(e,n,t){switch(n){case"input":if(cs(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var i=cl(r);if(!i)throw Error(y(90));Yu(r),cs(r,i)}}}break;case"textarea":Gu(e,t);break;case"select":n=t.value,n!=null&&zt(e,!!t.multiple,n,!1)}};rc=Vo;ic=lt;var Nh={usingClientEntryPoint:!1,Events:[Ur,wt,cl,nc,tc,Vo]},rr={findFiberByHostInstance:Gn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},jh={bundleType:rr.bundleType,version:rr.version,rendererPackageName:rr.rendererPackageName,rendererConfig:rr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:wn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=oc(e),e===null?null:e.stateNode},findFiberByHostInstance:rr.findFiberByHostInstance||kh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ai=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ai.isDisabled&&ai.supportsFiber)try{sl=ai.inject(jh),tn=ai}catch{}}Me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Nh;Me.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ko(n))throw Error(y(200));return wh(e,n,null,t)};Me.createRoot=function(e,n){if(!Ko(e))throw Error(y(299));var t=!1,r="",i=Ad;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),n=Ho(e,1,!1,null,null,t,!1,r,i),e[gn]=n.current,Cr(e.nodeType===8?e.parentNode:e),new Yo(n)};Me.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(y(188)):(e=Object.keys(e).join(","),Error(y(268,e)));return e=oc(n),e=e===null?null:e.stateNode,e};Me.flushSync=function(e){return lt(e)};Me.hydrate=function(e,n,t){if(!xl(n))throw Error(y(200));return _l(null,e,n,!0,t)};Me.hydrateRoot=function(e,n,t){if(!Ko(e))throw Error(y(405));var r=t!=null&&t.hydratedSources||null,i=!1,l="",s=Ad;if(t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),n=bd(n,null,e,1,t??null,i,!1,l,s),e[gn]=n.current,Cr(e),r)for(e=0;e<r.length;e++)t=r[e],i=t._getVersion,i=i(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,i]:n.mutableSourceEagerHydrationData.push(t,i);return new yl(n)};Me.render=function(e,n,t){if(!xl(n))throw Error(y(200));return _l(null,e,n,!1,t)};Me.unmountComponentAtNode=function(e){if(!xl(e))throw Error(y(40));return e._reactRootContainer?(lt(function(){_l(null,null,e,!1,function(){e._reactRootContainer=null,e[gn]=null})}),!0):!1};Me.unstable_batchedUpdates=Vo;Me.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!xl(t))throw Error(y(200));if(e==null||e._reactInternals===void 0)throw Error(y(38));return _l(e,n,t,!1,r)};Me.version="18.3.1-next-f1338f8080-20240426";function Fd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Fd)}catch(e){console.error(e)}}Fd(),Fu.exports=Me;var Ch=Fu.exports,Ud,cu=Ch;Ud=cu.createRoot,cu.hydrateRoot;const Eh={yandex:"Яндекс","2gis":"2ГИС",google:"Google",prodoctorov:"ПроДокторов"};function zh({sources:e,value:n,onChange:t,idPrefix:r,panelId:i}){const l=(o,a)=>{requestAnimationFrame(()=>{var u;(u=o==null?void 0:o.querySelector(`#${r}-tab-${a}`))==null||u.focus()})},s=(o,a)=>{const u=o.currentTarget.parentElement;let f=a;if(o.key==="ArrowRight"||o.key==="ArrowDown")f=(a+1)%e.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")f=(a-1+e.length)%e.length;else if(o.key==="Home")f=0;else if(o.key==="End")f=e.length-1;else if(o.key==="Enter"||o.key===" "){o.preventDefault(),t(e[a]),l(u,e[a]);return}else return;o.preventDefault(),t(e[f]),l(u,e[f])};return c.jsx("div",{className:"rw-tabs",role:"tablist","aria-label":"Источник отзывов",children:e.map((o,a)=>{const u=n===o;return c.jsx("button",{className:"rw-tab",id:`${r}-tab-${o}`,role:"tab",type:"button","aria-selected":u,"aria-controls":i,tabIndex:u?0:-1,onKeyDown:f=>s(f,a),onClick:()=>t(o),children:Eh[o]},o)})})}function Go(e,n,t,r){const i=Math.abs(e)%100,l=i%10;return i>=11&&i<=14?r:l===1?n:l>=2&&l<=4?t:r}function wl(e){return Go(e,"отзыв","отзыва","отзывов")}function Vd(e){return Go(e,"оценка","оценки","оценок")}function Th(e){return Go(e,"фото","фото","фото")}function Xo(e,n=""){const t=e.trim().split(/\s+/).filter(Boolean);return t.length===0?n:t.slice(0,2).map(r=>r[0]).join("").toUpperCase()}const du="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";function pn({rating:e,size:n=16,filled:t="#ffcc00",empty:r="#e0e0e0",gap:i=2,className:l}){const s=Math.max(0,Math.min(5,e));return c.jsx("span",{"aria-label":`Оценка ${s.toLocaleString("ru-RU",{maximumFractionDigits:1})} из 5`,className:l,role:"img",style:{display:"inline-flex",alignItems:"center",gap:i,lineHeight:0,verticalAlign:"middle"},children:Array.from({length:5},(o,a)=>{const u=Math.min(1,Math.max(0,s-a)),f=Math.round(u*100);return c.jsxs("span",{style:{position:"relative",width:n,height:n,flex:"0 0 auto",display:"block",lineHeight:0},children:[c.jsx("svg",{viewBox:"0 0 24 24",width:n,height:n,"aria-hidden":"true",style:{display:"block"},children:c.jsx("path",{d:du,fill:r})}),f>0?c.jsx("svg",{viewBox:"0 0 24 24",width:n,height:n,"aria-hidden":"true",style:{position:"absolute",inset:0,display:"block",clipPath:`inset(0 ${100-f}% 0 0)`},children:c.jsx("path",{d:du,fill:t})}):null]},a)})})}function Ir({text:e,collapsedLength:n=220,collapsedLines:t,moreLabel:r="ещё",lessLabel:i="свернуть",className:l,moreClassName:s}){const[o,a]=X.useState(!1),[u,f]=X.useState(!1),h=X.useRef(null),g=t?u:e.length>n,_=t||!g||o?e:`${e.slice(0,n).trimEnd()}`,w=g&&(!o||!!i);X.useLayoutEffect(()=>{if(!t||o)return;const B=h.current;B&&f(B.scrollHeight>B.clientHeight+1)},[t,o,e]);const S=()=>{const B=window.scrollY;a(p=>!p),requestAnimationFrame(()=>{window.scrollTo(0,B)})};return c.jsxs(c.Fragment,{children:[c.jsxs("p",{className:l,ref:h,style:t&&!o?{display:"-webkit-box",overflow:"hidden",WebkitBoxOrient:"vertical",WebkitLineClamp:t}:void 0,children:[_,!t&&g&&!o?" ":null,!t&&w?c.jsx("button",{"aria-expanded":o,"aria-label":o?i||"Свернуть текст отзыва":r,className:s,onClick:S,type:"button",children:o?i:r}):null]}),t&&w?c.jsx("button",{"aria-expanded":o,"aria-label":o?i||"Свернуть текст отзыва":r,className:s,onClick:S,type:"button",children:o?i:r}):null]})}function st(e){if(e&&/^(https?:|data:|blob:|\/)/i.test(e))return e}function Rh(e,n="ЯБ"){const t=(e??"").replace(/[«»"]/g," ").trim().split(/\s+/).filter(Boolean);return t.length===0?n:t.length>=2?`${t[0][0]}${t[1][0]}`.toUpperCase():t[0].slice(0,2).toUpperCase()}const ui=new Intl.RelativeTimeFormat("ru",{numeric:"auto"}),Lh=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],es=["январе","феврале","марте","апреле","мае","июне","июле","августе","сентябре","октябре","ноябре","декабре"];function fu(e,n){return Jo(Ut(e)??Ut(n),n,!1,!1)}function pu(e,n){return Jo(Ut(e)??Ut(n),n,!0,!1)}function hu(e,n,t=!1){return n&&!Bd(n)?n:Jo(Ut(n)??Ut(e),n,t,!0)}function Ph(e,n){const t=(e||n||"").trim(),r=/^при[её]м\s+(?:был\s+)?в\s+(.+)$/i.exec(t),i=(r==null?void 0:r[1])??t,l=/^(\d{4})-(\d{2})(?:-\d{2})?$/.exec(i);if(l){const o=Number(l[2]);if(o>=1&&o<=12)return`Приём был в ${es[o-1]} ${l[1]}`}const s=/^(?:в\s+)?([а-яё]+)\s+(\d{4})$/i.exec(i);if(s){const o=["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],a=s[1].toLowerCase();let u=o.indexOf(a);if(u<0&&(u=es.indexOf(a)),u>=0)return`Приём был в ${es[u]} ${s[2]}`}return r?`Приём был в ${i}`:e||n||""}function mu(e,n,t=new Date){const r=e??(Bd(n)?n:null);if(!r)return n;const i=new Date(r.length===10?`${r}T00:00:00Z`:r);if(Number.isNaN(i.getTime()))return n;const l=Math.floor((t.getTime()-i.getTime())/864e5);return l<0?n:l<7?ui.format(-l,"day"):l<30?ui.format(-Math.max(1,Math.round(l/7)),"week"):l<365?ui.format(-Math.max(1,Math.round(l/30.4375)),"month"):ui.format(-Math.max(1,Math.round(l/365.25)),"year")}function Ut(e){if(!e)return null;const n=/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}))?/.exec(e.trim());if(!n)return null;const t={year:Number(n[1]),month:Number(n[2]),day:Number(n[3])},r=new Date(Date.UTC(t.year,t.month-1,t.day));return r.getUTCFullYear()!==t.year||r.getUTCMonth()!==t.month-1||r.getUTCDate()!==t.day?null:(n[4]&&n[5]&&(t.hours=Number(n[4]),t.minutes=Number(n[5])),t)}function Jo(e,n,t,r){if(!e)return n??"";let i=`${e.day} ${Lh[e.month-1]}`;return t&&(i+=` ${e.year}`),r&&e.hours!=null&&e.minutes!=null&&(i+=` в ${String(e.hours).padStart(2,"0")}:${String(e.minutes).padStart(2,"0")}`),i}function Bd(e){return/^\d{4}-\d{2}-\d{2}(?:[T\s]|$)/.test(e.trim())}function kl({className:e,name:n,url:t}){const r=st(t),[i,l]=X.useState(!1);return X.useEffect(()=>l(!1),[r]),c.jsx("div",{className:e,"aria-hidden":"true",children:r&&!i?c.jsx("img",{alt:"",onError:()=>l(!0),src:r}):Rh(n)})}function Sl({href:e,sourceLabel:n}){return c.jsxs("a",{"aria-label":`Открыть оригинал отзыва — ${n} (откроется в новой вкладке)`,className:"rw-review-origin",href:e,rel:"noopener noreferrer",target:"_blank",children:["Открыть оригинал",c.jsxs("svg",{"aria-hidden":"true",fill:"none",height:"14",viewBox:"0 0 24 24",width:"14",children:[c.jsx("path",{d:"M14 5h5v5M19 5l-8 8",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.8"}),c.jsx("path",{d:"M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.8"})]})]})}function Oh({review:e,organizationLogoUrl:n}){const[t,r]=X.useState(!1),i=st(e.author.avatar_url),l=e.author.local_expert_level,s=e.business_response,o=fu(e.published_at,e.published_display),a=fu(s.published_at,s.published_display),u=e.photos.map(f=>st(f.thumbnail_url||f.url)).filter(f=>!!f);return c.jsxs("article",{className:"ym-card",children:[c.jsxs("div",{className:"ym-card__head",children:[c.jsx("div",{className:"ym-avatar",children:i?c.jsx("img",{alt:"",src:i}):Xo(e.author.name)}),c.jsxs("div",{className:"ym-author",children:[e.author.profile_url?c.jsx("a",{className:"ym-author__name rw-author-link",href:e.author.profile_url,rel:"noopener noreferrer",target:"_blank",children:e.author.name}):c.jsx("span",{className:"ym-author__name",children:e.author.name}),l!=null?c.jsxs("span",{className:"ym-author__level",children:["Знаток города ",l," уровня"]}):null]})]}),c.jsxs("div",{className:"ym-meta",children:[c.jsx(pn,{empty:"#e0e0e0",filled:"#fac917",gap:1,rating:e.rating,size:12}),o?c.jsx("time",{className:"ym-meta__date",dateTime:e.published_at??void 0,children:o}):null]}),e.text?c.jsx(Ir,{className:"ym-text",collapsedLines:4,lessLabel:"",moreClassName:"ym-more",moreLabel:"ещё",text:e.text}):null,u.length>0?c.jsx("div",{className:"ym-photos",children:u.map((f,h)=>c.jsx("img",{alt:"",src:f},`${e.external_id??e.review_url}-${h}`))}):null,e.likes_count!=null&&e.likes_count>0?c.jsxs("p",{className:"ym-likes-count",children:[e.likes_count," полезно"]}):null,c.jsx(Sl,{href:e.review_url,sourceLabel:"Яндекс"}),s.exists&&s.text?c.jsxs(c.Fragment,{children:[c.jsx("button",{"aria-expanded":t,className:"ym-reply-toggle",onClick:()=>r(f=>!f),type:"button",children:t?"— Скрыть ответ организации":"— Посмотреть ответ организации"}),t?c.jsxs("div",{className:"ym-reply",children:[c.jsx(kl,{className:"ym-reply__avatar",name:s.organization_name,url:n}),c.jsxs("div",{className:"ym-reply__content",children:[c.jsxs("div",{className:"ym-reply__head",children:[c.jsx("span",{className:"ym-reply__org",children:"Официальный ответ"}),a?c.jsx("time",{className:"ym-reply__date",dateTime:s.published_at??void 0,children:a}):null]}),c.jsx("p",{className:"ym-reply__text",children:s.text})]})]}):null]}):null]})}const ns={default:"По умолчанию",newest:"Сначала новые",rating:"По оценке"};function Mh({data:e,organizationLogoUrl:n}){const[t,r]=X.useState("default"),[i,l]=X.useState(!1),s=X.useMemo(()=>Ih(e.reviews,t),[e.reviews,t]),o=e.place.rating.toLocaleString("ru-RU",{minimumFractionDigits:1,maximumFractionDigits:1});return c.jsxs("div",{className:"ym-reviews",children:[c.jsxs("div",{className:"ym-summary",children:[c.jsx("div",{className:"ym-summary__score",children:o}),c.jsxs("div",{className:"ym-summary__meta",children:[c.jsx(pn,{filled:"#fac917",gap:1,rating:e.place.rating,size:16}),c.jsxs("div",{className:"ym-summary__count",children:[e.place.ratings_count.toLocaleString("ru-RU")," ",Vd(e.place.ratings_count)]})]})]}),c.jsxs("div",{className:"ym-toolbar",children:[c.jsxs("div",{className:"ym-toolbar__count",children:[e.place.reviews_count.toLocaleString("ru-RU")," ",wl(e.place.reviews_count)]}),c.jsxs("div",{className:"ym-sort",children:[c.jsxs("button",{"aria-expanded":i,"aria-label":"Сортировка отзывов Яндекс",className:"ym-sort__button",onClick:()=>l(a=>!a),type:"button",children:[ns[t],c.jsx("span",{className:"ym-sort__chevron"})]}),i?c.jsx("ul",{className:"ym-sort__menu",children:Object.keys(ns).map(a=>c.jsx("li",{children:c.jsx("button",{className:a===t?"ym-sort__option is-active":"ym-sort__option",onClick:()=>{r(a),l(!1)},type:"button",children:ns[a]})},a))}):null]})]}),s.map(a=>c.jsx(Oh,{organizationLogoUrl:n,review:a},a.external_id??a.review_url))]})}function Ih(e,n){const t=[...e];return n==="newest"&&t.sort((r,i)=>String(i.published_at).localeCompare(String(r.published_at))),n==="rating"&&t.sort((r,i)=>i.rating-r.rating),t}function Dh({review:e,organizationLogoUrl:n}){const t=st(e.author.avatar_url),r=e.author.initials||Xo(e.author.name,"?"),i=e.business_response,l=pu(e.published_at,e.published_display),s=pu(i.published_at,i.published_display),o=e.photos.map(a=>st(a.thumbnail_url||a.url)).filter(a=>!!a);return c.jsxs("article",{className:"tg-card",children:[c.jsxs("div",{className:"tg-card__head",children:[c.jsx("div",{className:"tg-avatar",children:t?c.jsx("img",{alt:"",src:t}):r}),c.jsxs("div",{className:"tg-author",children:[e.author.profile_url?c.jsx("a",{className:"tg-author__name rw-author-link",href:e.author.profile_url,rel:"noopener noreferrer",target:"_blank",children:e.author.name}):c.jsx("span",{className:"tg-author__name",children:e.author.name}),e.author.reviews_count!=null?c.jsxs("span",{className:"tg-author__meta",children:[e.author.reviews_count," ",wl(e.author.reviews_count)]}):null]})]}),c.jsxs("div",{className:"tg-meta",children:[c.jsx(pn,{empty:"#e0e0e0",filled:"#ffb800",gap:1,rating:e.rating,size:14}),l?c.jsx("time",{className:"tg-meta__date",dateTime:e.published_at??void 0,children:l}):null]}),e.text?c.jsx(Ir,{className:"tg-text",collapsedLines:4,lessLabel:"",moreClassName:"tg-more",moreLabel:"Читать целиком",text:e.text}):null,o.length>0?c.jsx("div",{className:"tg-photos",children:o.map((a,u)=>c.jsx("img",{alt:"",src:a},`${e.external_id??e.review_url}-${u}`))}):null,e.verification.verified&&e.verification.label?c.jsxs("div",{className:"tg-confirm",children:[c.jsx("span",{className:"tg-check","aria-hidden":"true",children:c.jsx("svg",{fill:"none",height:"16",viewBox:"0 0 24 24",width:"16",children:c.jsx("path",{d:"M20 6.5 9.2 17.3 4 12.1",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.4"})})}),c.jsx("span",{className:"tg-confirm__label",children:e.verification.label})]}):null,e.helpful_count!=null&&e.helpful_count>0?c.jsxs("div",{className:"tg-helpful",children:[c.jsx($h,{}),"Полезно? ",e.helpful_count]}):null,c.jsx(Sl,{href:e.review_url,sourceLabel:"2ГИС"}),i.exists&&i.text?c.jsxs("div",{className:"tg-reply",children:[c.jsx(kl,{className:"tg-reply__logo",name:i.organization_name,url:n}),c.jsxs("div",{children:[c.jsx("div",{className:"tg-reply__name",children:i.organization_name}),c.jsxs("div",{className:"tg-reply__meta",children:[s,s?", ":"","официальный ответ"]}),c.jsx(Ir,{className:"tg-reply__text",collapsedLines:3,lessLabel:"",moreClassName:"tg-more",moreLabel:"ещё",text:i.text})]})]}):null]})}function $h(){return c.jsx("svg",{fill:"none",height:"16",viewBox:"0 0 24 24",width:"16","aria-hidden":"true",children:c.jsx("path",{d:"M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.6"})})}const ts={trust:"По доверию",newest:"Сначала новые",rating:"По оценке"};function bh({data:e,organizationLogoUrl:n}){const[t,r]=X.useState("trust"),[i,l]=X.useState(!1),[s,o]=X.useState(!1),a=X.useMemo(()=>Ah(e.reviews,t),[e.reviews,t]),u=e.place.people_say??"",f=u.length>180?`${u.slice(0,180).trimEnd()}…`:u;return c.jsxs("div",{className:"tg-reviews",children:[c.jsxs("div",{className:"tg-summary",children:[c.jsx("div",{className:"tg-summary__score",children:Number.isInteger(e.place.rating)?e.place.rating:e.place.rating.toLocaleString("ru-RU")}),c.jsx("div",{className:"tg-summary__meta",children:c.jsxs("div",{className:"tg-summary__ratings",children:[c.jsx(pn,{filled:"#ffb800",gap:1,rating:e.place.rating,size:14}),c.jsxs("span",{className:"tg-summary__count",children:["Всего ",e.place.ratings_count.toLocaleString("ru-RU")," ",Vd(e.place.ratings_count)]})]})})]}),e.place.ratings_count>0?c.jsxs("div",{className:"tg-verified-line",children:[c.jsx("span",{className:"tg-check","aria-hidden":"true",children:c.jsx(Uh,{})}),"На основе подтверждённых оценок"]}):null,u?c.jsxs("div",{className:"tg-people",children:[c.jsxs("div",{className:"tg-people__head",children:[c.jsx("span",{className:"tg-people__icon","aria-hidden":"true",children:c.jsx(Fh,{})}),"Люди говорят"]}),c.jsx("p",{className:"tg-people__text",children:s?u:f}),u.length>180?c.jsx("button",{className:"tg-people__more",onClick:()=>o(h=>!h),type:"button",children:s?"Свернуть":"Читать целиком"}):null]}):null,c.jsxs("div",{className:"tg-toolbar",children:[c.jsxs("div",{className:"tg-toolbar__count",children:[e.place.reviews_count.toLocaleString("ru-RU")," ",wl(e.place.reviews_count)]}),c.jsxs("div",{className:"tg-sort",children:[c.jsxs("button",{"aria-expanded":i,"aria-label":"Сортировка отзывов 2ГИС",className:"tg-sort__button",onClick:()=>l(h=>!h),type:"button",children:[ts[t],c.jsx("span",{className:"tg-sort__chevron"})]}),i?c.jsx("ul",{className:"tg-sort__menu",children:Object.keys(ts).map(h=>c.jsx("li",{children:c.jsx("button",{className:h===t?"tg-sort__option is-active":"tg-sort__option",onClick:()=>{r(h),l(!1)},type:"button",children:ts[h]})},h))}):null]})]}),a.map(h=>c.jsx(Dh,{organizationLogoUrl:n,review:h},h.external_id??h.review_url))]})}function Ah(e,n){const t=[...e];return n==="trust"&&t.sort((r,i)=>Number(i.verification.verified)-Number(r.verification.verified)||i.rating-r.rating),n==="newest"&&t.sort((r,i)=>String(i.published_at).localeCompare(String(r.published_at))),n==="rating"&&t.sort((r,i)=>i.rating-r.rating),t}function Fh(){return c.jsxs("svg",{fill:"none",height:"16",viewBox:"0 0 24 24",width:"16",children:[c.jsx("path",{d:"M5 6.2h14v9.2H9.2L5 19V6.2Z",stroke:"#fff",strokeLinejoin:"round",strokeWidth:"1.8"}),c.jsx("path",{d:"M12 8.4v4.4M9.8 10.6h4.4",stroke:"#fff",strokeLinecap:"round",strokeWidth:"1.8"})]})}function Uh(){return c.jsx("svg",{fill:"none",height:"16",viewBox:"0 0 24 24",width:"16",children:c.jsx("path",{d:"M20 6.5 9.2 17.3 4 12.1",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.4"})})}function Vh({review:e,organizationLogoUrl:n}){const t=st(e.author.avatar_url),r=e.photos.map(a=>st(a.thumbnail_url||a.url)).filter(a=>!!a),l=[e.author.reviews_count!=null&&e.author.reviews_count>0?`${e.author.reviews_count} ${wl(e.author.reviews_count)}`:null,e.author.photos_count!=null&&e.author.photos_count>0?`${e.author.photos_count} ${Th(e.author.photos_count)}`:null].filter(Boolean).join(" · "),s=mu(e.published_at,e.published_display),o=mu(e.business_response.published_at,e.business_response.published_display??"");return c.jsxs("article",{className:"gm-card",children:[c.jsxs("div",{className:"gm-card__head",children:[c.jsx("div",{className:"gm-avatar",children:t?c.jsx("img",{alt:"",src:t}):Xo(e.author.name,"G")}),c.jsxs("div",{className:"gm-author",children:[c.jsx("span",{className:"gm-author__name",children:e.author.name}),l?c.jsx("span",{className:"gm-author__meta",children:l}):null]})]}),c.jsxs("div",{className:"gm-meta",children:[c.jsx(pn,{empty:"#e8eaed",filled:"#fbbc04",gap:1,rating:e.rating,size:13}),s?c.jsx("time",{className:"gm-meta__date",dateTime:e.published_at??void 0,children:s}):null]}),e.text?c.jsx(Ir,{className:"gm-text",collapsedLines:4,lessLabel:"",moreClassName:"gm-more",moreLabel:"Ещё",text:e.text}):null,r.length>0?c.jsx("div",{className:"gm-photos",children:r.slice(0,4).map((a,u)=>c.jsx("img",{alt:"",src:a},`${e.external_id??e.review_url}-${u}`))}):null,c.jsx(Sl,{href:e.review_url,sourceLabel:"Google"}),e.business_response.exists&&e.business_response.text?c.jsxs("div",{className:"gm-owner",children:[c.jsx(kl,{className:"gm-owner__avatar",name:e.business_response.organization_name,url:n}),c.jsxs("div",{className:"gm-owner__content",children:[c.jsxs("div",{className:"gm-owner__head",children:[c.jsx("span",{className:"gm-owner__title",children:"Ответ владельца"}),o?c.jsx("span",{className:"gm-owner__date",children:o}):null]}),c.jsx(Ir,{className:"gm-owner__text",collapsedLines:3,lessLabel:"",moreClassName:"gm-more",moreLabel:"Ещё",text:e.business_response.text})]})]}):null]})}const gu={relevant:"Самые релевантные",newest:"Сначала новые",highest:"Высокий рейтинг",lowest:"Низкий рейтинг"};function Bh({data:e,organizationLogoUrl:n}){const[t,r]=X.useState(""),[i,l]=X.useState("relevant"),s=e.place.rating_distribution,o=Object.values(s).reduce((h,g)=>h+g,0),a=h=>o===0?0:Math.round(h/o*100),u=X.useMemo(()=>{const h=t.trim().toLowerCase(),g=h?e.reviews.filter(_=>_.text.toLowerCase().includes(h)||_.author.name.toLowerCase().includes(h)):e.reviews;return Zh(g,i)},[e.reviews,t,i]),f=e.place.rating.toLocaleString("ru-RU",{minimumFractionDigits:1,maximumFractionDigits:1});return c.jsxs("div",{className:"gm-reviews",children:[c.jsxs("div",{className:"gm-summary",children:[c.jsx("div",{className:"gm-bars",children:[5,4,3,2,1].map(h=>c.jsxs("div",{className:"gm-bar-row",children:[c.jsx("span",{children:h}),c.jsx("div",{className:"gm-bar-track",children:c.jsx("div",{className:"gm-bar-fill",style:{width:`${a(s[String(h)])}%`}})})]},h))}),c.jsxs("div",{className:"gm-average",children:[c.jsx("div",{className:"gm-average__score",children:f}),c.jsx(pn,{filled:"#fbbc04",gap:1,rating:e.place.rating,size:16}),c.jsxs("div",{className:"gm-average__count",children:["Отзывов: ",e.place.reviews_count]})]})]}),c.jsx("input",{"aria-label":"Поиск отзывов",className:"gm-search",onChange:h=>r(h.target.value),placeholder:"Поиск отзывов",type:"search",value:t}),c.jsx("div",{className:"gm-select-wrap",children:c.jsx("select",{"aria-label":"Сортировка",className:"gm-select",onChange:h=>l(h.target.value),value:i,children:Object.keys(gu).map(h=>c.jsx("option",{value:h,children:gu[h]},h))})}),u.map(h=>c.jsx(Vh,{organizationLogoUrl:n,review:h},h.external_id??h.review_url)),u.length===0?c.jsx("p",{className:"gm-author__meta",style:{padding:"16px 4px"},children:"Ничего не найдено."}):null]})}function Zh(e,n){const t=[...e];return n==="newest"&&t.sort((r,i)=>String(i.published_at).localeCompare(String(r.published_at))),n==="highest"&&t.sort((r,i)=>i.rating-r.rating),n==="lowest"&&t.sort((r,i)=>r.rating-i.rating),t}function Wh({review:e,organizationLogoUrl:n}){var u,f,h,g,_;const t=[e.author.type_display,e.author.masked_phone||e.author.name].filter(Boolean).join(" "),r=e.business_response,i=hu(e.published_at,e.published_display),l=hu(r.published_at,r.published_display,!0),s=Ph(((u=e.visit)==null?void 0:u.display)??null,((f=e.visit)==null?void 0:f.period)??null),o=[(h=e.branch)==null?void 0:h.name,(g=e.branch)==null?void 0:g.address].filter(Boolean).join(" · "),a=!!(s||o);return c.jsxs("article",{className:"pd-card",children:[c.jsxs("div",{children:[t?c.jsx("span",{className:"pd-side__who",children:t}):null,i?c.jsx("time",{className:"pd-side__date",dateTime:e.published_at??void 0,children:i}):null,c.jsxs("div",{className:"pd-badge pd-badge--rating",children:[c.jsx(Qh,{}),c.jsx("strong",{children:e.rating.value.toFixed(1)}),c.jsx("span",{children:e.rating.label})]}),e.verification.verified?c.jsxs("div",{className:"pd-badge pd-badge--ok",children:[c.jsx(Yh,{}),e.verification.label||"Отзыв проверен"]}):null]}),c.jsxs("div",{className:"pd-content",children:[c.jsxs("span",{className:"pd-logo","aria-label":"ПроДокторов",children:[c.jsx("span",{className:"pd-logo__pro",children:"про"}),c.jsx("span",{className:"pd-logo__rest",children:"докторов"})]}),(_=e.doctor)!=null&&_.name?c.jsxs("div",{className:"pd-doctor",children:[c.jsx("span",{className:"pd-doctor__label",children:"Врач"}),e.doctor.url?c.jsx("a",{className:"pd-doctor__name",href:e.doctor.url,rel:"noopener noreferrer",target:"_blank",children:e.doctor.name}):c.jsx("span",{className:"pd-doctor__name",children:e.doctor.name}),e.doctor.specialty?c.jsx("span",{className:"pd-doctor__specialty",children:e.doctor.specialty}):null]}):null,e.sections.history?c.jsxs("section",{className:"pd-section",children:[c.jsx("h4",{children:"История пациента"}),c.jsx("p",{children:e.sections.history})]}):null,e.sections.pros?c.jsxs("section",{className:"pd-section",children:[c.jsx("h4",{children:"Понравилось"}),c.jsx("p",{children:e.sections.pros})]}):null,e.sections.cons?c.jsxs("section",{className:"pd-section",children:[c.jsx("h4",{children:"Не понравилось"}),c.jsx("p",{children:e.sections.cons})]}):null,c.jsx(Sl,{href:e.review_url,sourceLabel:"ПроДокторов"}),r.exists&&r.text?c.jsxs("div",{className:"pd-reply",children:[c.jsx(kl,{className:"pd-reply__logo",name:r.organization_name,url:n}),c.jsxs("div",{children:[c.jsx("div",{className:"pd-reply__name",children:r.organization_name}),l?c.jsx("div",{className:"pd-reply__date",children:l}):null,c.jsx("p",{className:"pd-reply__text",children:r.text})]})]}):null,a?c.jsxs("div",{className:"pd-foot",children:[s?c.jsxs("span",{className:"pd-foot__visit",children:[c.jsx(Hh,{}),s]}):null,o?c.jsx("span",{children:o}):null]}):null]})]})}function Hh(){return c.jsxs("svg",{fill:"none",height:"14",viewBox:"0 0 24 24",width:"14","aria-hidden":"true",children:[c.jsx("rect",{height:"16",rx:"2",stroke:"currentColor",strokeWidth:"1.6",width:"16",x:"4",y:"5"}),c.jsx("path",{d:"M4 10h16M8 3v4M16 3v4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.6"})]})}function Qh(){return c.jsx("svg",{fill:"#f5a623",height:"14",viewBox:"0 0 24 24",width:"14","aria-hidden":"true",children:c.jsx("path",{d:"M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"})})}function Yh(){return c.jsxs("svg",{fill:"none",height:"14",viewBox:"0 0 24 24",width:"14","aria-hidden":"true",children:[c.jsx("path",{d:"M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z",stroke:"currentColor",strokeWidth:"1.6"}),c.jsx("path",{d:"m8.5 12 2.3 2.3 4.7-4.7",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.6"})]})}function Kh({data:e,organizationLogoUrl:n}){const t=e.place.rating.toFixed(1);return c.jsxs("div",{className:"pd-reviews",children:[c.jsxs("div",{className:"pd-rating",children:[c.jsx("div",{className:"pd-rating__title",children:"Рейтинг"}),c.jsxs("div",{className:"pd-rating__main",children:[c.jsx("span",{className:"pd-rating__score",children:t}),c.jsx(pn,{filled:"#f5a623",gap:2,rating:e.place.rating,size:22})]}),c.jsxs("div",{className:"pd-rating__split",children:[c.jsxs("div",{className:"pd-rating__item",children:[c.jsx("span",{className:"pd-rating__label",children:"Клиника"}),c.jsx("strong",{children:e.place.clinic_rating.toFixed(1)}),c.jsx(pn,{filled:"#f5a623",gap:1,rating:e.place.clinic_rating,size:14})]}),c.jsxs("div",{className:"pd-rating__item",children:[c.jsx("span",{className:"pd-rating__label",children:"Врачи"}),c.jsx("strong",{children:e.place.doctors_rating.toFixed(1)}),c.jsx(pn,{filled:"#f5a623",gap:1,rating:e.place.doctors_rating,size:14})]})]})]}),c.jsx("div",{className:"pd-head",children:c.jsx("h3",{className:"pd-head__title",children:"Отзывы"})}),e.reviews.map(r=>c.jsx(Wh,{organizationLogoUrl:n,review:r},r.external_id??r.review_url))]})}const Gh={yandex:"Все отзывы на Яндексе","2gis":"Все отзывы в 2ГИС",google:"Все отзывы в Google",prodoctorov:"Все отзывы на ПроДокторов"},Xh={yandex:"Оставить отзыв на Яндексе","2gis":"Оставить отзыв в 2ГИС",google:"Оставить отзыв в Google",prodoctorov:"Оставить отзыв на ПроДокторов"};function Jh({feed:e,organizationLogoUrl:n,visibleCount:t}){return e.source==="yandex"?c.jsx(Mh,{data:{...e,reviews:e.reviews.slice(0,t)},organizationLogoUrl:n}):e.source==="2gis"?c.jsx(bh,{data:{...e,reviews:e.reviews.slice(0,t)},organizationLogoUrl:n}):e.source==="google"?c.jsx(Bh,{data:{...e,reviews:e.reviews.slice(0,t)},organizationLogoUrl:n}):c.jsx(Kh,{data:{...e,reviews:e.reviews.slice(0,t)},organizationLogoUrl:n})}function qh({payload:e,organizationLogoUrl:n}){const t=`rw${X.useId().replace(/:/g,"")}`,r=`${t}-panel`,i=Math.max(1,e.settings.initial_visible_count),l=X.useMemo(()=>e.settings.source_order.filter(f=>{const h=e.sources.find(g=>g.source===f);return!!(h!=null&&h.enabled&&h.reviews.length>0)}),[e]),s=X.useMemo(()=>l.includes(e.settings.default_source)?e.settings.default_source:l[0]??null,[l,e.settings.default_source]),[o,a]=X.useState(s);if(X.useEffect(()=>{a(s)},[e,s]),!o)return c.jsx("section",{className:"rw-widget",children:c.jsx("div",{className:"rw-state",role:"status",children:"Сейчас нет опубликованных отзывов."})});const u=e.sources.find(f=>f.source===o);return u?c.jsx("section",{className:`rw-widget rw-source-${o}`,"aria-labelledby":`${t}-title`,children:c.jsxs("div",{className:"rw-container",children:[c.jsxs("div",{className:"rw-header",children:[c.jsx("p",{className:"rw-kicker",children:e.settings.section_label}),c.jsx("h2",{className:"rw-title",id:`${t}-title`,children:e.settings.titles[o]}),e.settings.subtitle?c.jsx("p",{className:"rw-subtitle",children:e.settings.subtitle}):null]}),c.jsx(zh,{sources:l,value:o,idPrefix:t,panelId:r,onChange:a}),c.jsxs("div",{className:"rw-panel",id:r,role:"tabpanel","aria-labelledby":`${t}-tab-${o}`,children:[c.jsx(Jh,{feed:u,organizationLogoUrl:n,visibleCount:i}),c.jsxs("div",{className:"rw-source-actions",children:[u.write_review_url?c.jsxs("a",{className:"rw-source-link",href:u.write_review_url,rel:"noopener noreferrer",target:"_blank",children:[Xh[o],c.jsx(vu,{})]}):null,c.jsxs("a",{className:"rw-source-link rw-source-link--secondary",href:u.source_url,rel:"noopener noreferrer",target:"_blank",children:[Gh[o],c.jsx(vu,{})]})]})]})]})}):c.jsx("section",{className:"rw-widget",children:c.jsx("div",{className:"rw-state",role:"status",children:"Сейчас нет опубликованных отзывов."})})}function vu(){return c.jsxs("svg",{"aria-hidden":"true",fill:"none",height:"16",viewBox:"0 0 24 24",width:"16",children:[c.jsx("path",{d:"M14 5h5v5M19 5l-8 8",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.8"}),c.jsx("path",{d:"M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.8"})]})}var F;(function(e){e.assertEqual=i=>{};function n(i){}e.assertIs=n;function t(i){throw new Error}e.assertNever=t,e.arrayToEnum=i=>{const l={};for(const s of i)l[s]=s;return l},e.getValidEnumValues=i=>{const l=e.objectKeys(i).filter(o=>typeof i[i[o]]!="number"),s={};for(const o of l)s[o]=i[o];return e.objectValues(s)},e.objectValues=i=>e.objectKeys(i).map(function(l){return i[l]}),e.objectKeys=typeof Object.keys=="function"?i=>Object.keys(i):i=>{const l=[];for(const s in i)Object.prototype.hasOwnProperty.call(i,s)&&l.push(s);return l},e.find=(i,l)=>{for(const s of i)if(l(s))return s},e.isInteger=typeof Number.isInteger=="function"?i=>Number.isInteger(i):i=>typeof i=="number"&&Number.isFinite(i)&&Math.floor(i)===i;function r(i,l=" | "){return i.map(s=>typeof s=="string"?`'${s}'`:s).join(l)}e.joinValues=r,e.jsonStringifyReplacer=(i,l)=>typeof l=="bigint"?l.toString():l})(F||(F={}));var yu;(function(e){e.mergeShapes=(n,t)=>({...n,...t})})(yu||(yu={}));const E=F.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),jn=e=>{switch(typeof e){case"undefined":return E.undefined;case"string":return E.string;case"number":return Number.isNaN(e)?E.nan:E.number;case"boolean":return E.boolean;case"function":return E.function;case"bigint":return E.bigint;case"symbol":return E.symbol;case"object":return Array.isArray(e)?E.array:e===null?E.null:e.then&&typeof e.then=="function"&&e.catch&&typeof e.catch=="function"?E.promise:typeof Map<"u"&&e instanceof Map?E.map:typeof Set<"u"&&e instanceof Set?E.set:typeof Date<"u"&&e instanceof Date?E.date:E.object;default:return E.unknown}},x=F.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]);class xn extends Error{get errors(){return this.issues}constructor(n){super(),this.issues=[],this.addIssue=r=>{this.issues=[...this.issues,r]},this.addIssues=(r=[])=>{this.issues=[...this.issues,...r]};const t=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,t):this.__proto__=t,this.name="ZodError",this.issues=n}format(n){const t=n||function(l){return l.message},r={_errors:[]},i=l=>{for(const s of l.issues)if(s.code==="invalid_union")s.unionErrors.map(i);else if(s.code==="invalid_return_type")i(s.returnTypeError);else if(s.code==="invalid_arguments")i(s.argumentsError);else if(s.path.length===0)r._errors.push(t(s));else{let o=r,a=0;for(;a<s.path.length;){const u=s.path[a];a===s.path.length-1?(o[u]=o[u]||{_errors:[]},o[u]._errors.push(t(s))):o[u]=o[u]||{_errors:[]},o=o[u],a++}}};return i(this),r}static assert(n){if(!(n instanceof xn))throw new Error(`Not a ZodError: ${n}`)}toString(){return this.message}get message(){return JSON.stringify(this.issues,F.jsonStringifyReplacer,2)}get isEmpty(){return this.issues.length===0}flatten(n=t=>t.message){const t={},r=[];for(const i of this.issues)if(i.path.length>0){const l=i.path[0];t[l]=t[l]||[],t[l].push(n(i))}else r.push(n(i));return{formErrors:r,fieldErrors:t}}get formErrors(){return this.flatten()}}xn.create=e=>new xn(e);const Gs=(e,n)=>{let t;switch(e.code){case x.invalid_type:e.received===E.undefined?t="Required":t=`Expected ${e.expected}, received ${e.received}`;break;case x.invalid_literal:t=`Invalid literal value, expected ${JSON.stringify(e.expected,F.jsonStringifyReplacer)}`;break;case x.unrecognized_keys:t=`Unrecognized key(s) in object: ${F.joinValues(e.keys,", ")}`;break;case x.invalid_union:t="Invalid input";break;case x.invalid_union_discriminator:t=`Invalid discriminator value. Expected ${F.joinValues(e.options)}`;break;case x.invalid_enum_value:t=`Invalid enum value. Expected ${F.joinValues(e.options)}, received '${e.received}'`;break;case x.invalid_arguments:t="Invalid function arguments";break;case x.invalid_return_type:t="Invalid function return type";break;case x.invalid_date:t="Invalid date";break;case x.invalid_string:typeof e.validation=="object"?"includes"in e.validation?(t=`Invalid input: must include "${e.validation.includes}"`,typeof e.validation.position=="number"&&(t=`${t} at one or more positions greater than or equal to ${e.validation.position}`)):"startsWith"in e.validation?t=`Invalid input: must start with "${e.validation.startsWith}"`:"endsWith"in e.validation?t=`Invalid input: must end with "${e.validation.endsWith}"`:F.assertNever(e.validation):e.validation!=="regex"?t=`Invalid ${e.validation}`:t="Invalid";break;case x.too_small:e.type==="array"?t=`Array must contain ${e.exact?"exactly":e.inclusive?"at least":"more than"} ${e.minimum} element(s)`:e.type==="string"?t=`String must contain ${e.exact?"exactly":e.inclusive?"at least":"over"} ${e.minimum} character(s)`:e.type==="number"?t=`Number must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${e.minimum}`:e.type==="bigint"?t=`Number must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${e.minimum}`:e.type==="date"?t=`Date must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(e.minimum))}`:t="Invalid input";break;case x.too_big:e.type==="array"?t=`Array must contain ${e.exact?"exactly":e.inclusive?"at most":"less than"} ${e.maximum} element(s)`:e.type==="string"?t=`String must contain ${e.exact?"exactly":e.inclusive?"at most":"under"} ${e.maximum} character(s)`:e.type==="number"?t=`Number must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}`:e.type==="bigint"?t=`BigInt must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}`:e.type==="date"?t=`Date must be ${e.exact?"exactly":e.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(e.maximum))}`:t="Invalid input";break;case x.custom:t="Invalid input";break;case x.invalid_intersection_types:t="Intersection results could not be merged";break;case x.not_multiple_of:t=`Number must be a multiple of ${e.multipleOf}`;break;case x.not_finite:t="Number must be finite";break;default:t=n.defaultError,F.assertNever(e)}return{message:t}};let em=Gs;function nm(){return em}const tm=e=>{const{data:n,path:t,errorMaps:r,issueData:i}=e,l=[...t,...i.path||[]],s={...i,path:l};if(i.message!==void 0)return{...i,path:l,message:i.message};let o="";const a=r.filter(u=>!!u).slice().reverse();for(const u of a)o=u(s,{data:n,defaultError:o}).message;return{...i,path:l,message:o}};function k(e,n){const t=nm(),r=tm({issueData:n,data:e.data,path:e.path,errorMaps:[e.common.contextualErrorMap,e.schemaErrorMap,t,t===Gs?void 0:Gs].filter(i=>!!i)});e.common.issues.push(r)}class Oe{constructor(){this.value="valid"}dirty(){this.value==="valid"&&(this.value="dirty")}abort(){this.value!=="aborted"&&(this.value="aborted")}static mergeArray(n,t){const r=[];for(const i of t){if(i.status==="aborted")return P;i.status==="dirty"&&n.dirty(),r.push(i.value)}return{status:n.value,value:r}}static async mergeObjectAsync(n,t){const r=[];for(const i of t){const l=await i.key,s=await i.value;r.push({key:l,value:s})}return Oe.mergeObjectSync(n,r)}static mergeObjectSync(n,t){const r={};for(const i of t){const{key:l,value:s}=i;if(l.status==="aborted"||s.status==="aborted")return P;l.status==="dirty"&&n.dirty(),s.status==="dirty"&&n.dirty(),l.value!=="__proto__"&&(typeof s.value<"u"||i.alwaysSet)&&(r[l.value]=s.value)}return{status:n.value,value:r}}}const P=Object.freeze({status:"aborted"}),ar=e=>({status:"dirty",value:e}),Be=e=>({status:"valid",value:e}),xu=e=>e.status==="aborted",_u=e=>e.status==="dirty",Vt=e=>e.status==="valid",Hi=e=>typeof Promise<"u"&&e instanceof Promise;var z;(function(e){e.errToObj=n=>typeof n=="string"?{message:n}:n||{},e.toString=n=>typeof n=="string"?n:n==null?void 0:n.message})(z||(z={}));class Un{constructor(n,t,r,i){this._cachedPath=[],this.parent=n,this.data=t,this._path=r,this._key=i}get path(){return this._cachedPath.length||(Array.isArray(this._key)?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}}const wu=(e,n)=>{if(Vt(n))return{success:!0,data:n.value};if(!e.common.issues.length)throw new Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;const t=new xn(e.common.issues);return this._error=t,this._error}}};function I(e){if(!e)return{};const{errorMap:n,invalid_type_error:t,required_error:r,description:i}=e;if(n&&(t||r))throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);return n?{errorMap:n,description:i}:{errorMap:(s,o)=>{const{message:a}=e;return s.code==="invalid_enum_value"?{message:a??o.defaultError}:typeof o.data>"u"?{message:a??r??o.defaultError}:s.code!=="invalid_type"?{message:o.defaultError}:{message:a??t??o.defaultError}},description:i}}class A{get description(){return this._def.description}_getType(n){return jn(n.data)}_getOrReturnCtx(n,t){return t||{common:n.parent.common,data:n.data,parsedType:jn(n.data),schemaErrorMap:this._def.errorMap,path:n.path,parent:n.parent}}_processInputParams(n){return{status:new Oe,ctx:{common:n.parent.common,data:n.data,parsedType:jn(n.data),schemaErrorMap:this._def.errorMap,path:n.path,parent:n.parent}}}_parseSync(n){const t=this._parse(n);if(Hi(t))throw new Error("Synchronous parse encountered promise.");return t}_parseAsync(n){const t=this._parse(n);return Promise.resolve(t)}parse(n,t){const r=this.safeParse(n,t);if(r.success)return r.data;throw r.error}safeParse(n,t){const r={common:{issues:[],async:(t==null?void 0:t.async)??!1,contextualErrorMap:t==null?void 0:t.errorMap},path:(t==null?void 0:t.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:n,parsedType:jn(n)},i=this._parseSync({data:n,path:r.path,parent:r});return wu(r,i)}"~validate"(n){var r,i;const t={common:{issues:[],async:!!this["~standard"].async},path:[],schemaErrorMap:this._def.errorMap,parent:null,data:n,parsedType:jn(n)};if(!this["~standard"].async)try{const l=this._parseSync({data:n,path:[],parent:t});return Vt(l)?{value:l.value}:{issues:t.common.issues}}catch(l){(i=(r=l==null?void 0:l.message)==null?void 0:r.toLowerCase())!=null&&i.includes("encountered")&&(this["~standard"].async=!0),t.common={issues:[],async:!0}}return this._parseAsync({data:n,path:[],parent:t}).then(l=>Vt(l)?{value:l.value}:{issues:t.common.issues})}async parseAsync(n,t){const r=await this.safeParseAsync(n,t);if(r.success)return r.data;throw r.error}async safeParseAsync(n,t){const r={common:{issues:[],contextualErrorMap:t==null?void 0:t.errorMap,async:!0},path:(t==null?void 0:t.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:n,parsedType:jn(n)},i=this._parse({data:n,path:r.path,parent:r}),l=await(Hi(i)?i:Promise.resolve(i));return wu(r,l)}refine(n,t){const r=i=>typeof t=="string"||typeof t>"u"?{message:t}:typeof t=="function"?t(i):t;return this._refinement((i,l)=>{const s=n(i),o=()=>l.addIssue({code:x.custom,...r(i)});return typeof Promise<"u"&&s instanceof Promise?s.then(a=>a?!0:(o(),!1)):s?!0:(o(),!1)})}refinement(n,t){return this._refinement((r,i)=>n(r)?!0:(i.addIssue(typeof t=="function"?t(r,i):t),!1))}_refinement(n){return new _n({schema:this,typeName:O.ZodEffects,effect:{type:"refinement",refinement:n}})}superRefine(n){return this._refinement(n)}constructor(n){this.spa=this.safeParseAsync,this._def=n,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this),this["~standard"]={version:1,vendor:"zod",validate:t=>this["~validate"](t)}}optional(){return hn.create(this,this._def)}nullable(){return ut.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return ln.create(this)}promise(){return nl.create(this,this._def)}or(n){return Gi.create([this,n],this._def)}and(n){return Xi.create(this,n,this._def)}transform(n){return new _n({...I(this._def),schema:this,typeName:O.ZodEffects,effect:{type:"transform",transform:n}})}default(n){const t=typeof n=="function"?n:()=>n;return new tl({...I(this._def),innerType:this,defaultValue:t,typeName:O.ZodDefault})}brand(){return new Qd({typeName:O.ZodBranded,type:this,...I(this._def)})}catch(n){const t=typeof n=="function"?n:()=>n;return new rl({...I(this._def),innerType:this,catchValue:t,typeName:O.ZodCatch})}describe(n){const t=this.constructor;return new t({...this._def,description:n})}pipe(n){return ea.create(this,n)}readonly(){return il.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}}const rm=/^c[^\s-]{8,}$/i,im=/^[0-9a-z]+$/,lm=/^[0-9A-HJKMNP-TV-Z]{26}$/i,sm=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,om=/^[a-z0-9_-]{21}$/i,am=/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,um=/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,cm=/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,dm="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";let rs;const fm=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,pm=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,hm=/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,mm=/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,gm=/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,vm=/^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,Zd="((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",ym=new RegExp(`^${Zd}$`);function Wd(e){let n="[0-5]\\d";e.precision?n=`${n}\\.\\d{${e.precision}}`:e.precision==null&&(n=`${n}(\\.\\d+)?`);const t=e.precision?"+":"?";return`([01]\\d|2[0-3]):[0-5]\\d(:${n})${t}`}function xm(e){return new RegExp(`^${Wd(e)}$`)}function _m(e){let n=`${Zd}T${Wd(e)}`;const t=[];return t.push(e.local?"Z?":"Z"),e.offset&&t.push("([+-]\\d{2}:?\\d{2})"),n=`${n}(${t.join("|")})`,new RegExp(`^${n}$`)}function wm(e,n){return!!((n==="v4"||!n)&&fm.test(e)||(n==="v6"||!n)&&hm.test(e))}function km(e,n){if(!am.test(e))return!1;try{const[t]=e.split(".");if(!t)return!1;const r=t.replace(/-/g,"+").replace(/_/g,"/").padEnd(t.length+(4-t.length%4)%4,"="),i=JSON.parse(atob(r));return!(typeof i!="object"||i===null||"typ"in i&&(i==null?void 0:i.typ)!=="JWT"||!i.alg||n&&i.alg!==n)}catch{return!1}}function Sm(e,n){return!!((n==="v4"||!n)&&pm.test(e)||(n==="v6"||!n)&&mm.test(e))}class Rn extends A{_parse(n){if(this._def.coerce&&(n.data=String(n.data)),this._getType(n)!==E.string){const l=this._getOrReturnCtx(n);return k(l,{code:x.invalid_type,expected:E.string,received:l.parsedType}),P}const r=new Oe;let i;for(const l of this._def.checks)if(l.kind==="min")n.data.length<l.value&&(i=this._getOrReturnCtx(n,i),k(i,{code:x.too_small,minimum:l.value,type:"string",inclusive:!0,exact:!1,message:l.message}),r.dirty());else if(l.kind==="max")n.data.length>l.value&&(i=this._getOrReturnCtx(n,i),k(i,{code:x.too_big,maximum:l.value,type:"string",inclusive:!0,exact:!1,message:l.message}),r.dirty());else if(l.kind==="length"){const s=n.data.length>l.value,o=n.data.length<l.value;(s||o)&&(i=this._getOrReturnCtx(n,i),s?k(i,{code:x.too_big,maximum:l.value,type:"string",inclusive:!0,exact:!0,message:l.message}):o&&k(i,{code:x.too_small,minimum:l.value,type:"string",inclusive:!0,exact:!0,message:l.message}),r.dirty())}else if(l.kind==="email")cm.test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"email",code:x.invalid_string,message:l.message}),r.dirty());else if(l.kind==="emoji")rs||(rs=new RegExp(dm,"u")),rs.test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"emoji",code:x.invalid_string,message:l.message}),r.dirty());else if(l.kind==="uuid")sm.test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"uuid",code:x.invalid_string,message:l.message}),r.dirty());else if(l.kind==="nanoid")om.test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"nanoid",code:x.invalid_string,message:l.message}),r.dirty());else if(l.kind==="cuid")rm.test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"cuid",code:x.invalid_string,message:l.message}),r.dirty());else if(l.kind==="cuid2")im.test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"cuid2",code:x.invalid_string,message:l.message}),r.dirty());else if(l.kind==="ulid")lm.test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"ulid",code:x.invalid_string,message:l.message}),r.dirty());else if(l.kind==="url")try{new URL(n.data)}catch{i=this._getOrReturnCtx(n,i),k(i,{validation:"url",code:x.invalid_string,message:l.message}),r.dirty()}else l.kind==="regex"?(l.regex.lastIndex=0,l.regex.test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"regex",code:x.invalid_string,message:l.message}),r.dirty())):l.kind==="trim"?n.data=n.data.trim():l.kind==="includes"?n.data.includes(l.value,l.position)||(i=this._getOrReturnCtx(n,i),k(i,{code:x.invalid_string,validation:{includes:l.value,position:l.position},message:l.message}),r.dirty()):l.kind==="toLowerCase"?n.data=n.data.toLowerCase():l.kind==="toUpperCase"?n.data=n.data.toUpperCase():l.kind==="startsWith"?n.data.startsWith(l.value)||(i=this._getOrReturnCtx(n,i),k(i,{code:x.invalid_string,validation:{startsWith:l.value},message:l.message}),r.dirty()):l.kind==="endsWith"?n.data.endsWith(l.value)||(i=this._getOrReturnCtx(n,i),k(i,{code:x.invalid_string,validation:{endsWith:l.value},message:l.message}),r.dirty()):l.kind==="datetime"?_m(l).test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{code:x.invalid_string,validation:"datetime",message:l.message}),r.dirty()):l.kind==="date"?ym.test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{code:x.invalid_string,validation:"date",message:l.message}),r.dirty()):l.kind==="time"?xm(l).test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{code:x.invalid_string,validation:"time",message:l.message}),r.dirty()):l.kind==="duration"?um.test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"duration",code:x.invalid_string,message:l.message}),r.dirty()):l.kind==="ip"?wm(n.data,l.version)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"ip",code:x.invalid_string,message:l.message}),r.dirty()):l.kind==="jwt"?km(n.data,l.alg)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"jwt",code:x.invalid_string,message:l.message}),r.dirty()):l.kind==="cidr"?Sm(n.data,l.version)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"cidr",code:x.invalid_string,message:l.message}),r.dirty()):l.kind==="base64"?gm.test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"base64",code:x.invalid_string,message:l.message}),r.dirty()):l.kind==="base64url"?vm.test(n.data)||(i=this._getOrReturnCtx(n,i),k(i,{validation:"base64url",code:x.invalid_string,message:l.message}),r.dirty()):F.assertNever(l);return{status:r.value,value:n.data}}_regex(n,t,r){return this.refinement(i=>n.test(i),{validation:t,code:x.invalid_string,...z.errToObj(r)})}_addCheck(n){return new Rn({...this._def,checks:[...this._def.checks,n]})}email(n){return this._addCheck({kind:"email",...z.errToObj(n)})}url(n){return this._addCheck({kind:"url",...z.errToObj(n)})}emoji(n){return this._addCheck({kind:"emoji",...z.errToObj(n)})}uuid(n){return this._addCheck({kind:"uuid",...z.errToObj(n)})}nanoid(n){return this._addCheck({kind:"nanoid",...z.errToObj(n)})}cuid(n){return this._addCheck({kind:"cuid",...z.errToObj(n)})}cuid2(n){return this._addCheck({kind:"cuid2",...z.errToObj(n)})}ulid(n){return this._addCheck({kind:"ulid",...z.errToObj(n)})}base64(n){return this._addCheck({kind:"base64",...z.errToObj(n)})}base64url(n){return this._addCheck({kind:"base64url",...z.errToObj(n)})}jwt(n){return this._addCheck({kind:"jwt",...z.errToObj(n)})}ip(n){return this._addCheck({kind:"ip",...z.errToObj(n)})}cidr(n){return this._addCheck({kind:"cidr",...z.errToObj(n)})}datetime(n){return typeof n=="string"?this._addCheck({kind:"datetime",precision:null,offset:!1,local:!1,message:n}):this._addCheck({kind:"datetime",precision:typeof(n==null?void 0:n.precision)>"u"?null:n==null?void 0:n.precision,offset:(n==null?void 0:n.offset)??!1,local:(n==null?void 0:n.local)??!1,...z.errToObj(n==null?void 0:n.message)})}date(n){return this._addCheck({kind:"date",message:n})}time(n){return typeof n=="string"?this._addCheck({kind:"time",precision:null,message:n}):this._addCheck({kind:"time",precision:typeof(n==null?void 0:n.precision)>"u"?null:n==null?void 0:n.precision,...z.errToObj(n==null?void 0:n.message)})}duration(n){return this._addCheck({kind:"duration",...z.errToObj(n)})}regex(n,t){return this._addCheck({kind:"regex",regex:n,...z.errToObj(t)})}includes(n,t){return this._addCheck({kind:"includes",value:n,position:t==null?void 0:t.position,...z.errToObj(t==null?void 0:t.message)})}startsWith(n,t){return this._addCheck({kind:"startsWith",value:n,...z.errToObj(t)})}endsWith(n,t){return this._addCheck({kind:"endsWith",value:n,...z.errToObj(t)})}min(n,t){return this._addCheck({kind:"min",value:n,...z.errToObj(t)})}max(n,t){return this._addCheck({kind:"max",value:n,...z.errToObj(t)})}length(n,t){return this._addCheck({kind:"length",value:n,...z.errToObj(t)})}nonempty(n){return this.min(1,z.errToObj(n))}trim(){return new Rn({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new Rn({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new Rn({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find(n=>n.kind==="datetime")}get isDate(){return!!this._def.checks.find(n=>n.kind==="date")}get isTime(){return!!this._def.checks.find(n=>n.kind==="time")}get isDuration(){return!!this._def.checks.find(n=>n.kind==="duration")}get isEmail(){return!!this._def.checks.find(n=>n.kind==="email")}get isURL(){return!!this._def.checks.find(n=>n.kind==="url")}get isEmoji(){return!!this._def.checks.find(n=>n.kind==="emoji")}get isUUID(){return!!this._def.checks.find(n=>n.kind==="uuid")}get isNANOID(){return!!this._def.checks.find(n=>n.kind==="nanoid")}get isCUID(){return!!this._def.checks.find(n=>n.kind==="cuid")}get isCUID2(){return!!this._def.checks.find(n=>n.kind==="cuid2")}get isULID(){return!!this._def.checks.find(n=>n.kind==="ulid")}get isIP(){return!!this._def.checks.find(n=>n.kind==="ip")}get isCIDR(){return!!this._def.checks.find(n=>n.kind==="cidr")}get isBase64(){return!!this._def.checks.find(n=>n.kind==="base64")}get isBase64url(){return!!this._def.checks.find(n=>n.kind==="base64url")}get minLength(){let n=null;for(const t of this._def.checks)t.kind==="min"&&(n===null||t.value>n)&&(n=t.value);return n}get maxLength(){let n=null;for(const t of this._def.checks)t.kind==="max"&&(n===null||t.value<n)&&(n=t.value);return n}}Rn.create=e=>new Rn({checks:[],typeName:O.ZodString,coerce:(e==null?void 0:e.coerce)??!1,...I(e)});function Nm(e,n){const t=(e.toString().split(".")[1]||"").length,r=(n.toString().split(".")[1]||"").length,i=t>r?t:r,l=Number.parseInt(e.toFixed(i).replace(".","")),s=Number.parseInt(n.toFixed(i).replace(".",""));return l%s/10**i}class Bt extends A{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(n){if(this._def.coerce&&(n.data=Number(n.data)),this._getType(n)!==E.number){const l=this._getOrReturnCtx(n);return k(l,{code:x.invalid_type,expected:E.number,received:l.parsedType}),P}let r;const i=new Oe;for(const l of this._def.checks)l.kind==="int"?F.isInteger(n.data)||(r=this._getOrReturnCtx(n,r),k(r,{code:x.invalid_type,expected:"integer",received:"float",message:l.message}),i.dirty()):l.kind==="min"?(l.inclusive?n.data<l.value:n.data<=l.value)&&(r=this._getOrReturnCtx(n,r),k(r,{code:x.too_small,minimum:l.value,type:"number",inclusive:l.inclusive,exact:!1,message:l.message}),i.dirty()):l.kind==="max"?(l.inclusive?n.data>l.value:n.data>=l.value)&&(r=this._getOrReturnCtx(n,r),k(r,{code:x.too_big,maximum:l.value,type:"number",inclusive:l.inclusive,exact:!1,message:l.message}),i.dirty()):l.kind==="multipleOf"?Nm(n.data,l.value)!==0&&(r=this._getOrReturnCtx(n,r),k(r,{code:x.not_multiple_of,multipleOf:l.value,message:l.message}),i.dirty()):l.kind==="finite"?Number.isFinite(n.data)||(r=this._getOrReturnCtx(n,r),k(r,{code:x.not_finite,message:l.message}),i.dirty()):F.assertNever(l);return{status:i.value,value:n.data}}gte(n,t){return this.setLimit("min",n,!0,z.toString(t))}gt(n,t){return this.setLimit("min",n,!1,z.toString(t))}lte(n,t){return this.setLimit("max",n,!0,z.toString(t))}lt(n,t){return this.setLimit("max",n,!1,z.toString(t))}setLimit(n,t,r,i){return new Bt({...this._def,checks:[...this._def.checks,{kind:n,value:t,inclusive:r,message:z.toString(i)}]})}_addCheck(n){return new Bt({...this._def,checks:[...this._def.checks,n]})}int(n){return this._addCheck({kind:"int",message:z.toString(n)})}positive(n){return this._addCheck({kind:"min",value:0,inclusive:!1,message:z.toString(n)})}negative(n){return this._addCheck({kind:"max",value:0,inclusive:!1,message:z.toString(n)})}nonpositive(n){return this._addCheck({kind:"max",value:0,inclusive:!0,message:z.toString(n)})}nonnegative(n){return this._addCheck({kind:"min",value:0,inclusive:!0,message:z.toString(n)})}multipleOf(n,t){return this._addCheck({kind:"multipleOf",value:n,message:z.toString(t)})}finite(n){return this._addCheck({kind:"finite",message:z.toString(n)})}safe(n){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:z.toString(n)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:z.toString(n)})}get minValue(){let n=null;for(const t of this._def.checks)t.kind==="min"&&(n===null||t.value>n)&&(n=t.value);return n}get maxValue(){let n=null;for(const t of this._def.checks)t.kind==="max"&&(n===null||t.value<n)&&(n=t.value);return n}get isInt(){return!!this._def.checks.find(n=>n.kind==="int"||n.kind==="multipleOf"&&F.isInteger(n.value))}get isFinite(){let n=null,t=null;for(const r of this._def.checks){if(r.kind==="finite"||r.kind==="int"||r.kind==="multipleOf")return!0;r.kind==="min"?(t===null||r.value>t)&&(t=r.value):r.kind==="max"&&(n===null||r.value<n)&&(n=r.value)}return Number.isFinite(t)&&Number.isFinite(n)}}Bt.create=e=>new Bt({checks:[],typeName:O.ZodNumber,coerce:(e==null?void 0:e.coerce)||!1,...I(e)});class Dr extends A{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(n){if(this._def.coerce)try{n.data=BigInt(n.data)}catch{return this._getInvalidInput(n)}if(this._getType(n)!==E.bigint)return this._getInvalidInput(n);let r;const i=new Oe;for(const l of this._def.checks)l.kind==="min"?(l.inclusive?n.data<l.value:n.data<=l.value)&&(r=this._getOrReturnCtx(n,r),k(r,{code:x.too_small,type:"bigint",minimum:l.value,inclusive:l.inclusive,message:l.message}),i.dirty()):l.kind==="max"?(l.inclusive?n.data>l.value:n.data>=l.value)&&(r=this._getOrReturnCtx(n,r),k(r,{code:x.too_big,type:"bigint",maximum:l.value,inclusive:l.inclusive,message:l.message}),i.dirty()):l.kind==="multipleOf"?n.data%l.value!==BigInt(0)&&(r=this._getOrReturnCtx(n,r),k(r,{code:x.not_multiple_of,multipleOf:l.value,message:l.message}),i.dirty()):F.assertNever(l);return{status:i.value,value:n.data}}_getInvalidInput(n){const t=this._getOrReturnCtx(n);return k(t,{code:x.invalid_type,expected:E.bigint,received:t.parsedType}),P}gte(n,t){return this.setLimit("min",n,!0,z.toString(t))}gt(n,t){return this.setLimit("min",n,!1,z.toString(t))}lte(n,t){return this.setLimit("max",n,!0,z.toString(t))}lt(n,t){return this.setLimit("max",n,!1,z.toString(t))}setLimit(n,t,r,i){return new Dr({...this._def,checks:[...this._def.checks,{kind:n,value:t,inclusive:r,message:z.toString(i)}]})}_addCheck(n){return new Dr({...this._def,checks:[...this._def.checks,n]})}positive(n){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:z.toString(n)})}negative(n){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:z.toString(n)})}nonpositive(n){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:z.toString(n)})}nonnegative(n){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:z.toString(n)})}multipleOf(n,t){return this._addCheck({kind:"multipleOf",value:n,message:z.toString(t)})}get minValue(){let n=null;for(const t of this._def.checks)t.kind==="min"&&(n===null||t.value>n)&&(n=t.value);return n}get maxValue(){let n=null;for(const t of this._def.checks)t.kind==="max"&&(n===null||t.value<n)&&(n=t.value);return n}}Dr.create=e=>new Dr({checks:[],typeName:O.ZodBigInt,coerce:(e==null?void 0:e.coerce)??!1,...I(e)});class Xs extends A{_parse(n){if(this._def.coerce&&(n.data=!!n.data),this._getType(n)!==E.boolean){const r=this._getOrReturnCtx(n);return k(r,{code:x.invalid_type,expected:E.boolean,received:r.parsedType}),P}return Be(n.data)}}Xs.create=e=>new Xs({typeName:O.ZodBoolean,coerce:(e==null?void 0:e.coerce)||!1,...I(e)});class Qi extends A{_parse(n){if(this._def.coerce&&(n.data=new Date(n.data)),this._getType(n)!==E.date){const l=this._getOrReturnCtx(n);return k(l,{code:x.invalid_type,expected:E.date,received:l.parsedType}),P}if(Number.isNaN(n.data.getTime())){const l=this._getOrReturnCtx(n);return k(l,{code:x.invalid_date}),P}const r=new Oe;let i;for(const l of this._def.checks)l.kind==="min"?n.data.getTime()<l.value&&(i=this._getOrReturnCtx(n,i),k(i,{code:x.too_small,message:l.message,inclusive:!0,exact:!1,minimum:l.value,type:"date"}),r.dirty()):l.kind==="max"?n.data.getTime()>l.value&&(i=this._getOrReturnCtx(n,i),k(i,{code:x.too_big,message:l.message,inclusive:!0,exact:!1,maximum:l.value,type:"date"}),r.dirty()):F.assertNever(l);return{status:r.value,value:new Date(n.data.getTime())}}_addCheck(n){return new Qi({...this._def,checks:[...this._def.checks,n]})}min(n,t){return this._addCheck({kind:"min",value:n.getTime(),message:z.toString(t)})}max(n,t){return this._addCheck({kind:"max",value:n.getTime(),message:z.toString(t)})}get minDate(){let n=null;for(const t of this._def.checks)t.kind==="min"&&(n===null||t.value>n)&&(n=t.value);return n!=null?new Date(n):null}get maxDate(){let n=null;for(const t of this._def.checks)t.kind==="max"&&(n===null||t.value<n)&&(n=t.value);return n!=null?new Date(n):null}}Qi.create=e=>new Qi({checks:[],coerce:(e==null?void 0:e.coerce)||!1,typeName:O.ZodDate,...I(e)});class ku extends A{_parse(n){if(this._getType(n)!==E.symbol){const r=this._getOrReturnCtx(n);return k(r,{code:x.invalid_type,expected:E.symbol,received:r.parsedType}),P}return Be(n.data)}}ku.create=e=>new ku({typeName:O.ZodSymbol,...I(e)});class Yi extends A{_parse(n){if(this._getType(n)!==E.undefined){const r=this._getOrReturnCtx(n);return k(r,{code:x.invalid_type,expected:E.undefined,received:r.parsedType}),P}return Be(n.data)}}Yi.create=e=>new Yi({typeName:O.ZodUndefined,...I(e)});class Ki extends A{_parse(n){if(this._getType(n)!==E.null){const r=this._getOrReturnCtx(n);return k(r,{code:x.invalid_type,expected:E.null,received:r.parsedType}),P}return Be(n.data)}}Ki.create=e=>new Ki({typeName:O.ZodNull,...I(e)});class Su extends A{constructor(){super(...arguments),this._any=!0}_parse(n){return Be(n.data)}}Su.create=e=>new Su({typeName:O.ZodAny,...I(e)});class Nu extends A{constructor(){super(...arguments),this._unknown=!0}_parse(n){return Be(n.data)}}Nu.create=e=>new Nu({typeName:O.ZodUnknown,...I(e)});class Vn extends A{_parse(n){const t=this._getOrReturnCtx(n);return k(t,{code:x.invalid_type,expected:E.never,received:t.parsedType}),P}}Vn.create=e=>new Vn({typeName:O.ZodNever,...I(e)});class ju extends A{_parse(n){if(this._getType(n)!==E.undefined){const r=this._getOrReturnCtx(n);return k(r,{code:x.invalid_type,expected:E.void,received:r.parsedType}),P}return Be(n.data)}}ju.create=e=>new ju({typeName:O.ZodVoid,...I(e)});class ln extends A{_parse(n){const{ctx:t,status:r}=this._processInputParams(n),i=this._def;if(t.parsedType!==E.array)return k(t,{code:x.invalid_type,expected:E.array,received:t.parsedType}),P;if(i.exactLength!==null){const s=t.data.length>i.exactLength.value,o=t.data.length<i.exactLength.value;(s||o)&&(k(t,{code:s?x.too_big:x.too_small,minimum:o?i.exactLength.value:void 0,maximum:s?i.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:i.exactLength.message}),r.dirty())}if(i.minLength!==null&&t.data.length<i.minLength.value&&(k(t,{code:x.too_small,minimum:i.minLength.value,type:"array",inclusive:!0,exact:!1,message:i.minLength.message}),r.dirty()),i.maxLength!==null&&t.data.length>i.maxLength.value&&(k(t,{code:x.too_big,maximum:i.maxLength.value,type:"array",inclusive:!0,exact:!1,message:i.maxLength.message}),r.dirty()),t.common.async)return Promise.all([...t.data].map((s,o)=>i.type._parseAsync(new Un(t,s,t.path,o)))).then(s=>Oe.mergeArray(r,s));const l=[...t.data].map((s,o)=>i.type._parseSync(new Un(t,s,t.path,o)));return Oe.mergeArray(r,l)}get element(){return this._def.type}min(n,t){return new ln({...this._def,minLength:{value:n,message:z.toString(t)}})}max(n,t){return new ln({...this._def,maxLength:{value:n,message:z.toString(t)}})}length(n,t){return new ln({...this._def,exactLength:{value:n,message:z.toString(t)}})}nonempty(n){return this.min(1,n)}}ln.create=(e,n)=>new ln({type:e,minLength:null,maxLength:null,exactLength:null,typeName:O.ZodArray,...I(n)});function mt(e){if(e instanceof te){const n={};for(const t in e.shape){const r=e.shape[t];n[t]=hn.create(mt(r))}return new te({...e._def,shape:()=>n})}else return e instanceof ln?new ln({...e._def,type:mt(e.element)}):e instanceof hn?hn.create(mt(e.unwrap())):e instanceof ut?ut.create(mt(e.unwrap())):e instanceof ot?ot.create(e.items.map(n=>mt(n))):e}class te extends A{constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(this._cached!==null)return this._cached;const n=this._def.shape(),t=F.objectKeys(n);return this._cached={shape:n,keys:t},this._cached}_parse(n){if(this._getType(n)!==E.object){const u=this._getOrReturnCtx(n);return k(u,{code:x.invalid_type,expected:E.object,received:u.parsedType}),P}const{status:r,ctx:i}=this._processInputParams(n),{shape:l,keys:s}=this._getCached(),o=[];if(!(this._def.catchall instanceof Vn&&this._def.unknownKeys==="strip"))for(const u in i.data)s.includes(u)||o.push(u);const a=[];for(const u of s){const f=l[u],h=i.data[u];a.push({key:{status:"valid",value:u},value:f._parse(new Un(i,h,i.path,u)),alwaysSet:u in i.data})}if(this._def.catchall instanceof Vn){const u=this._def.unknownKeys;if(u==="passthrough")for(const f of o)a.push({key:{status:"valid",value:f},value:{status:"valid",value:i.data[f]}});else if(u==="strict")o.length>0&&(k(i,{code:x.unrecognized_keys,keys:o}),r.dirty());else if(u!=="strip")throw new Error("Internal ZodObject error: invalid unknownKeys value.")}else{const u=this._def.catchall;for(const f of o){const h=i.data[f];a.push({key:{status:"valid",value:f},value:u._parse(new Un(i,h,i.path,f)),alwaysSet:f in i.data})}}return i.common.async?Promise.resolve().then(async()=>{const u=[];for(const f of a){const h=await f.key,g=await f.value;u.push({key:h,value:g,alwaysSet:f.alwaysSet})}return u}).then(u=>Oe.mergeObjectSync(r,u)):Oe.mergeObjectSync(r,a)}get shape(){return this._def.shape()}strict(n){return z.errToObj,new te({...this._def,unknownKeys:"strict",...n!==void 0?{errorMap:(t,r)=>{var l,s;const i=((s=(l=this._def).errorMap)==null?void 0:s.call(l,t,r).message)??r.defaultError;return t.code==="unrecognized_keys"?{message:z.errToObj(n).message??i}:{message:i}}}:{}})}strip(){return new te({...this._def,unknownKeys:"strip"})}passthrough(){return new te({...this._def,unknownKeys:"passthrough"})}extend(n){return new te({...this._def,shape:()=>({...this._def.shape(),...n})})}merge(n){return new te({unknownKeys:n._def.unknownKeys,catchall:n._def.catchall,shape:()=>({...this._def.shape(),...n._def.shape()}),typeName:O.ZodObject})}setKey(n,t){return this.augment({[n]:t})}catchall(n){return new te({...this._def,catchall:n})}pick(n){const t={};for(const r of F.objectKeys(n))n[r]&&this.shape[r]&&(t[r]=this.shape[r]);return new te({...this._def,shape:()=>t})}omit(n){const t={};for(const r of F.objectKeys(this.shape))n[r]||(t[r]=this.shape[r]);return new te({...this._def,shape:()=>t})}deepPartial(){return mt(this)}partial(n){const t={};for(const r of F.objectKeys(this.shape)){const i=this.shape[r];n&&!n[r]?t[r]=i:t[r]=i.optional()}return new te({...this._def,shape:()=>t})}required(n){const t={};for(const r of F.objectKeys(this.shape))if(n&&!n[r])t[r]=this.shape[r];else{let l=this.shape[r];for(;l instanceof hn;)l=l._def.innerType;t[r]=l}return new te({...this._def,shape:()=>t})}keyof(){return Hd(F.objectKeys(this.shape))}}te.create=(e,n)=>new te({shape:()=>e,unknownKeys:"strip",catchall:Vn.create(),typeName:O.ZodObject,...I(n)});te.strictCreate=(e,n)=>new te({shape:()=>e,unknownKeys:"strict",catchall:Vn.create(),typeName:O.ZodObject,...I(n)});te.lazycreate=(e,n)=>new te({shape:e,unknownKeys:"strip",catchall:Vn.create(),typeName:O.ZodObject,...I(n)});class Gi extends A{_parse(n){const{ctx:t}=this._processInputParams(n),r=this._def.options;function i(l){for(const o of l)if(o.result.status==="valid")return o.result;for(const o of l)if(o.result.status==="dirty")return t.common.issues.push(...o.ctx.common.issues),o.result;const s=l.map(o=>new xn(o.ctx.common.issues));return k(t,{code:x.invalid_union,unionErrors:s}),P}if(t.common.async)return Promise.all(r.map(async l=>{const s={...t,common:{...t.common,issues:[]},parent:null};return{result:await l._parseAsync({data:t.data,path:t.path,parent:s}),ctx:s}})).then(i);{let l;const s=[];for(const a of r){const u={...t,common:{...t.common,issues:[]},parent:null},f=a._parseSync({data:t.data,path:t.path,parent:u});if(f.status==="valid")return f;f.status==="dirty"&&!l&&(l={result:f,ctx:u}),u.common.issues.length&&s.push(u.common.issues)}if(l)return t.common.issues.push(...l.ctx.common.issues),l.result;const o=s.map(a=>new xn(a));return k(t,{code:x.invalid_union,unionErrors:o}),P}}get options(){return this._def.options}}Gi.create=(e,n)=>new Gi({options:e,typeName:O.ZodUnion,...I(n)});const on=e=>e instanceof Ji?on(e.schema):e instanceof _n?on(e.innerType()):e instanceof qi?[e.value]:e instanceof at?e.options:e instanceof el?F.objectValues(e.enum):e instanceof tl?on(e._def.innerType):e instanceof Yi?[void 0]:e instanceof Ki?[null]:e instanceof hn?[void 0,...on(e.unwrap())]:e instanceof ut?[null,...on(e.unwrap())]:e instanceof Qd||e instanceof il?on(e.unwrap()):e instanceof rl?on(e._def.innerType):[];class qo extends A{_parse(n){const{ctx:t}=this._processInputParams(n);if(t.parsedType!==E.object)return k(t,{code:x.invalid_type,expected:E.object,received:t.parsedType}),P;const r=this.discriminator,i=t.data[r],l=this.optionsMap.get(i);return l?t.common.async?l._parseAsync({data:t.data,path:t.path,parent:t}):l._parseSync({data:t.data,path:t.path,parent:t}):(k(t,{code:x.invalid_union_discriminator,options:Array.from(this.optionsMap.keys()),path:[r]}),P)}get discriminator(){return this._def.discriminator}get options(){return this._def.options}get optionsMap(){return this._def.optionsMap}static create(n,t,r){const i=new Map;for(const l of t){const s=on(l.shape[n]);if(!s.length)throw new Error(`A discriminator value for key \`${n}\` could not be extracted from all schema options`);for(const o of s){if(i.has(o))throw new Error(`Discriminator property ${String(n)} has duplicate value ${String(o)}`);i.set(o,l)}}return new qo({typeName:O.ZodDiscriminatedUnion,discriminator:n,options:t,optionsMap:i,...I(r)})}}function Js(e,n){const t=jn(e),r=jn(n);if(e===n)return{valid:!0,data:e};if(t===E.object&&r===E.object){const i=F.objectKeys(n),l=F.objectKeys(e).filter(o=>i.indexOf(o)!==-1),s={...e,...n};for(const o of l){const a=Js(e[o],n[o]);if(!a.valid)return{valid:!1};s[o]=a.data}return{valid:!0,data:s}}else if(t===E.array&&r===E.array){if(e.length!==n.length)return{valid:!1};const i=[];for(let l=0;l<e.length;l++){const s=e[l],o=n[l],a=Js(s,o);if(!a.valid)return{valid:!1};i.push(a.data)}return{valid:!0,data:i}}else return t===E.date&&r===E.date&&+e==+n?{valid:!0,data:e}:{valid:!1}}class Xi extends A{_parse(n){const{status:t,ctx:r}=this._processInputParams(n),i=(l,s)=>{if(xu(l)||xu(s))return P;const o=Js(l.value,s.value);return o.valid?((_u(l)||_u(s))&&t.dirty(),{status:t.value,value:o.data}):(k(r,{code:x.invalid_intersection_types}),P)};return r.common.async?Promise.all([this._def.left._parseAsync({data:r.data,path:r.path,parent:r}),this._def.right._parseAsync({data:r.data,path:r.path,parent:r})]).then(([l,s])=>i(l,s)):i(this._def.left._parseSync({data:r.data,path:r.path,parent:r}),this._def.right._parseSync({data:r.data,path:r.path,parent:r}))}}Xi.create=(e,n,t)=>new Xi({left:e,right:n,typeName:O.ZodIntersection,...I(t)});class ot extends A{_parse(n){const{status:t,ctx:r}=this._processInputParams(n);if(r.parsedType!==E.array)return k(r,{code:x.invalid_type,expected:E.array,received:r.parsedType}),P;if(r.data.length<this._def.items.length)return k(r,{code:x.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),P;!this._def.rest&&r.data.length>this._def.items.length&&(k(r,{code:x.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),t.dirty());const l=[...r.data].map((s,o)=>{const a=this._def.items[o]||this._def.rest;return a?a._parse(new Un(r,s,r.path,o)):null}).filter(s=>!!s);return r.common.async?Promise.all(l).then(s=>Oe.mergeArray(t,s)):Oe.mergeArray(t,l)}get items(){return this._def.items}rest(n){return new ot({...this._def,rest:n})}}ot.create=(e,n)=>{if(!Array.isArray(e))throw new Error("You must pass an array of schemas to z.tuple([ ... ])");return new ot({items:e,typeName:O.ZodTuple,rest:null,...I(n)})};class Cu extends A{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(n){const{status:t,ctx:r}=this._processInputParams(n);if(r.parsedType!==E.map)return k(r,{code:x.invalid_type,expected:E.map,received:r.parsedType}),P;const i=this._def.keyType,l=this._def.valueType,s=[...r.data.entries()].map(([o,a],u)=>({key:i._parse(new Un(r,o,r.path,[u,"key"])),value:l._parse(new Un(r,a,r.path,[u,"value"]))}));if(r.common.async){const o=new Map;return Promise.resolve().then(async()=>{for(const a of s){const u=await a.key,f=await a.value;if(u.status==="aborted"||f.status==="aborted")return P;(u.status==="dirty"||f.status==="dirty")&&t.dirty(),o.set(u.value,f.value)}return{status:t.value,value:o}})}else{const o=new Map;for(const a of s){const u=a.key,f=a.value;if(u.status==="aborted"||f.status==="aborted")return P;(u.status==="dirty"||f.status==="dirty")&&t.dirty(),o.set(u.value,f.value)}return{status:t.value,value:o}}}}Cu.create=(e,n,t)=>new Cu({valueType:n,keyType:e,typeName:O.ZodMap,...I(t)});class $r extends A{_parse(n){const{status:t,ctx:r}=this._processInputParams(n);if(r.parsedType!==E.set)return k(r,{code:x.invalid_type,expected:E.set,received:r.parsedType}),P;const i=this._def;i.minSize!==null&&r.data.size<i.minSize.value&&(k(r,{code:x.too_small,minimum:i.minSize.value,type:"set",inclusive:!0,exact:!1,message:i.minSize.message}),t.dirty()),i.maxSize!==null&&r.data.size>i.maxSize.value&&(k(r,{code:x.too_big,maximum:i.maxSize.value,type:"set",inclusive:!0,exact:!1,message:i.maxSize.message}),t.dirty());const l=this._def.valueType;function s(a){const u=new Set;for(const f of a){if(f.status==="aborted")return P;f.status==="dirty"&&t.dirty(),u.add(f.value)}return{status:t.value,value:u}}const o=[...r.data.values()].map((a,u)=>l._parse(new Un(r,a,r.path,u)));return r.common.async?Promise.all(o).then(a=>s(a)):s(o)}min(n,t){return new $r({...this._def,minSize:{value:n,message:z.toString(t)}})}max(n,t){return new $r({...this._def,maxSize:{value:n,message:z.toString(t)}})}size(n,t){return this.min(n,t).max(n,t)}nonempty(n){return this.min(1,n)}}$r.create=(e,n)=>new $r({valueType:e,minSize:null,maxSize:null,typeName:O.ZodSet,...I(n)});class Ji extends A{get schema(){return this._def.getter()}_parse(n){const{ctx:t}=this._processInputParams(n);return this._def.getter()._parse({data:t.data,path:t.path,parent:t})}}Ji.create=(e,n)=>new Ji({getter:e,typeName:O.ZodLazy,...I(n)});class qi extends A{_parse(n){if(n.data!==this._def.value){const t=this._getOrReturnCtx(n);return k(t,{received:t.data,code:x.invalid_literal,expected:this._def.value}),P}return{status:"valid",value:n.data}}get value(){return this._def.value}}qi.create=(e,n)=>new qi({value:e,typeName:O.ZodLiteral,...I(n)});function Hd(e,n){return new at({values:e,typeName:O.ZodEnum,...I(n)})}class at extends A{_parse(n){if(typeof n.data!="string"){const t=this._getOrReturnCtx(n),r=this._def.values;return k(t,{expected:F.joinValues(r),received:t.parsedType,code:x.invalid_type}),P}if(this._cache||(this._cache=new Set(this._def.values)),!this._cache.has(n.data)){const t=this._getOrReturnCtx(n),r=this._def.values;return k(t,{received:t.data,code:x.invalid_enum_value,options:r}),P}return Be(n.data)}get options(){return this._def.values}get enum(){const n={};for(const t of this._def.values)n[t]=t;return n}get Values(){const n={};for(const t of this._def.values)n[t]=t;return n}get Enum(){const n={};for(const t of this._def.values)n[t]=t;return n}extract(n,t=this._def){return at.create(n,{...this._def,...t})}exclude(n,t=this._def){return at.create(this.options.filter(r=>!n.includes(r)),{...this._def,...t})}}at.create=Hd;class el extends A{_parse(n){const t=F.getValidEnumValues(this._def.values),r=this._getOrReturnCtx(n);if(r.parsedType!==E.string&&r.parsedType!==E.number){const i=F.objectValues(t);return k(r,{expected:F.joinValues(i),received:r.parsedType,code:x.invalid_type}),P}if(this._cache||(this._cache=new Set(F.getValidEnumValues(this._def.values))),!this._cache.has(n.data)){const i=F.objectValues(t);return k(r,{received:r.data,code:x.invalid_enum_value,options:i}),P}return Be(n.data)}get enum(){return this._def.values}}el.create=(e,n)=>new el({values:e,typeName:O.ZodNativeEnum,...I(n)});class nl extends A{unwrap(){return this._def.type}_parse(n){const{ctx:t}=this._processInputParams(n);if(t.parsedType!==E.promise&&t.common.async===!1)return k(t,{code:x.invalid_type,expected:E.promise,received:t.parsedType}),P;const r=t.parsedType===E.promise?t.data:Promise.resolve(t.data);return Be(r.then(i=>this._def.type.parseAsync(i,{path:t.path,errorMap:t.common.contextualErrorMap})))}}nl.create=(e,n)=>new nl({type:e,typeName:O.ZodPromise,...I(n)});class _n extends A{innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===O.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(n){const{status:t,ctx:r}=this._processInputParams(n),i=this._def.effect||null,l={addIssue:s=>{k(r,s),s.fatal?t.abort():t.dirty()},get path(){return r.path}};if(l.addIssue=l.addIssue.bind(l),i.type==="preprocess"){const s=i.transform(r.data,l);if(r.common.async)return Promise.resolve(s).then(async o=>{if(t.value==="aborted")return P;const a=await this._def.schema._parseAsync({data:o,path:r.path,parent:r});return a.status==="aborted"?P:a.status==="dirty"||t.value==="dirty"?ar(a.value):a});{if(t.value==="aborted")return P;const o=this._def.schema._parseSync({data:s,path:r.path,parent:r});return o.status==="aborted"?P:o.status==="dirty"||t.value==="dirty"?ar(o.value):o}}if(i.type==="refinement"){const s=o=>{const a=i.refinement(o,l);if(r.common.async)return Promise.resolve(a);if(a instanceof Promise)throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return o};if(r.common.async===!1){const o=this._def.schema._parseSync({data:r.data,path:r.path,parent:r});return o.status==="aborted"?P:(o.status==="dirty"&&t.dirty(),s(o.value),{status:t.value,value:o.value})}else return this._def.schema._parseAsync({data:r.data,path:r.path,parent:r}).then(o=>o.status==="aborted"?P:(o.status==="dirty"&&t.dirty(),s(o.value).then(()=>({status:t.value,value:o.value}))))}if(i.type==="transform")if(r.common.async===!1){const s=this._def.schema._parseSync({data:r.data,path:r.path,parent:r});if(!Vt(s))return P;const o=i.transform(s.value,l);if(o instanceof Promise)throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:t.value,value:o}}else return this._def.schema._parseAsync({data:r.data,path:r.path,parent:r}).then(s=>Vt(s)?Promise.resolve(i.transform(s.value,l)).then(o=>({status:t.value,value:o})):P);F.assertNever(i)}}_n.create=(e,n,t)=>new _n({schema:e,typeName:O.ZodEffects,effect:n,...I(t)});_n.createWithPreprocess=(e,n,t)=>new _n({schema:n,effect:{type:"preprocess",transform:e},typeName:O.ZodEffects,...I(t)});class hn extends A{_parse(n){return this._getType(n)===E.undefined?Be(void 0):this._def.innerType._parse(n)}unwrap(){return this._def.innerType}}hn.create=(e,n)=>new hn({innerType:e,typeName:O.ZodOptional,...I(n)});class ut extends A{_parse(n){return this._getType(n)===E.null?Be(null):this._def.innerType._parse(n)}unwrap(){return this._def.innerType}}ut.create=(e,n)=>new ut({innerType:e,typeName:O.ZodNullable,...I(n)});class tl extends A{_parse(n){const{ctx:t}=this._processInputParams(n);let r=t.data;return t.parsedType===E.undefined&&(r=this._def.defaultValue()),this._def.innerType._parse({data:r,path:t.path,parent:t})}removeDefault(){return this._def.innerType}}tl.create=(e,n)=>new tl({innerType:e,typeName:O.ZodDefault,defaultValue:typeof n.default=="function"?n.default:()=>n.default,...I(n)});class rl extends A{_parse(n){const{ctx:t}=this._processInputParams(n),r={...t,common:{...t.common,issues:[]}},i=this._def.innerType._parse({data:r.data,path:r.path,parent:{...r}});return Hi(i)?i.then(l=>({status:"valid",value:l.status==="valid"?l.value:this._def.catchValue({get error(){return new xn(r.common.issues)},input:r.data})})):{status:"valid",value:i.status==="valid"?i.value:this._def.catchValue({get error(){return new xn(r.common.issues)},input:r.data})}}removeCatch(){return this._def.innerType}}rl.create=(e,n)=>new rl({innerType:e,typeName:O.ZodCatch,catchValue:typeof n.catch=="function"?n.catch:()=>n.catch,...I(n)});class Eu extends A{_parse(n){if(this._getType(n)!==E.nan){const r=this._getOrReturnCtx(n);return k(r,{code:x.invalid_type,expected:E.nan,received:r.parsedType}),P}return{status:"valid",value:n.data}}}Eu.create=e=>new Eu({typeName:O.ZodNaN,...I(e)});class Qd extends A{_parse(n){const{ctx:t}=this._processInputParams(n),r=t.data;return this._def.type._parse({data:r,path:t.path,parent:t})}unwrap(){return this._def.type}}class ea extends A{_parse(n){const{status:t,ctx:r}=this._processInputParams(n);if(r.common.async)return(async()=>{const l=await this._def.in._parseAsync({data:r.data,path:r.path,parent:r});return l.status==="aborted"?P:l.status==="dirty"?(t.dirty(),ar(l.value)):this._def.out._parseAsync({data:l.value,path:r.path,parent:r})})();{const i=this._def.in._parseSync({data:r.data,path:r.path,parent:r});return i.status==="aborted"?P:i.status==="dirty"?(t.dirty(),{status:"dirty",value:i.value}):this._def.out._parseSync({data:i.value,path:r.path,parent:r})}}static create(n,t){return new ea({in:n,out:t,typeName:O.ZodPipeline})}}class il extends A{_parse(n){const t=this._def.innerType._parse(n),r=i=>(Vt(i)&&(i.value=Object.freeze(i.value)),i);return Hi(t)?t.then(i=>r(i)):r(t)}unwrap(){return this._def.innerType}}il.create=(e,n)=>new il({innerType:e,typeName:O.ZodReadonly,...I(n)});te.lazycreate;var O;(function(e){e.ZodString="ZodString",e.ZodNumber="ZodNumber",e.ZodNaN="ZodNaN",e.ZodBigInt="ZodBigInt",e.ZodBoolean="ZodBoolean",e.ZodDate="ZodDate",e.ZodSymbol="ZodSymbol",e.ZodUndefined="ZodUndefined",e.ZodNull="ZodNull",e.ZodAny="ZodAny",e.ZodUnknown="ZodUnknown",e.ZodNever="ZodNever",e.ZodVoid="ZodVoid",e.ZodArray="ZodArray",e.ZodObject="ZodObject",e.ZodUnion="ZodUnion",e.ZodDiscriminatedUnion="ZodDiscriminatedUnion",e.ZodIntersection="ZodIntersection",e.ZodTuple="ZodTuple",e.ZodRecord="ZodRecord",e.ZodMap="ZodMap",e.ZodSet="ZodSet",e.ZodFunction="ZodFunction",e.ZodLazy="ZodLazy",e.ZodLiteral="ZodLiteral",e.ZodEnum="ZodEnum",e.ZodEffects="ZodEffects",e.ZodNativeEnum="ZodNativeEnum",e.ZodOptional="ZodOptional",e.ZodNullable="ZodNullable",e.ZodDefault="ZodDefault",e.ZodCatch="ZodCatch",e.ZodPromise="ZodPromise",e.ZodBranded="ZodBranded",e.ZodPipeline="ZodPipeline",e.ZodReadonly="ZodReadonly"})(O||(O={}));const Z=Rn.create,q=Bt.create,Qt=Xs.create;Yi.create;Ki.create;Vn.create;const Je=ln.create,V=te.create;te.strictCreate;Gi.create;const Yd=qo.create;Xi.create;ot.create;Ji.create;const ct=qi.create,qs=at.create;el.create;nl.create;_n.create;hn.create;ut.create;_n.createWithPreprocess;const zu=["yandex","2gis","google","prodoctorov"],pt=Z().url().refine(e=>/^https?:\/\//i.test(e),"Expected an http(s) URL"),Ve=pt.nullable(),H=Z().trim().min(1,"Required string must not be blank"),jm=Z().datetime({offset:!0}).refine(e=>Kd(e.slice(0,10)),"Expected a valid RFC3339 datetime"),Kd=e=>{const n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!n)return!1;const[,t,r,i]=n,l=new Date(Date.UTC(Number(t),Number(r)-1,Number(i)));return l.getUTCFullYear()===Number(t)&&l.getUTCMonth()===Number(r)-1&&l.getUTCDate()===Number(i)},eo=Z().refine(e=>Kd(e)||Z().datetime({offset:!0}).safeParse(e).success,"Expected a valid YYYY-MM-DD date or RFC3339 datetime"),sn=q().min(1).max(5),Cm=V({url:Ve,thumbnail_url:Ve}).strict(),Em=Yd("exists",[V({exists:ct(!0),organization_name:H,published_at:eo.nullable(),published_display:Z().nullable(),text:H}).strict(),V({exists:ct(!1),organization_name:Z().nullable(),published_at:eo.nullable(),published_display:Z().nullable(),text:Z().nullable()}).strict()]),Nl={external_id:Z().nullable(),review_url:pt,published_at:eo.nullable(),published_display:Z(),text:Z(),photos:Je(Cm),business_response:Em},zm=V({...Nl,rating:sn,author:V({name:H,profile_url:Ve,avatar_url:Ve,local_expert_level:q().int().min(0).nullable()}).strict(),likes_count:q().int().min(0).nullable()}).strict(),Tm=V({...Nl,rating:sn,author:V({name:H,profile_url:Ve,avatar_url:Ve,initials:Z().nullable(),reviews_count:q().int().min(0).nullable()}).strict(),topics:Je(H),verification:V({verified:Qt(),visits_count:q().int().min(0).nullable(),label:Z().nullable()}).strict(),helpful_count:q().int().min(0).nullable()}).strict(),Rm=V({...Nl,rating:sn,author:V({name:H,avatar_url:Ve,reviews_count:q().int().min(0),photos_count:q().int().min(0)}).strict()}).strict(),Lm=V({...Nl,rating:V({value:sn,label:H}).strict(),author:V({type:qs(["patient","parent","relative","unknown"]),type_display:H,name:Z().nullable(),masked_phone:Z().nullable()}).strict(),verification:V({verified:Qt(),label:Z().nullable()}).strict(),sections:V({history:Z().nullable(),pros:Z().nullable(),cons:Z().nullable()}).strict(),topics:Je(H),doctor:V({name:Z().nullable(),specialty:Z().nullable(),url:Ve}).strict().nullable(),visit:V({period:Z().nullable(),display:Z().nullable()}).strict().nullable(),branch:V({name:Z().nullable(),address:Z().nullable()}).strict().nullable()}).strict(),Pm=V({source:ct("yandex"),enabled:Qt(),source_place_id:H,source_url:pt,write_review_url:Ve,place:V({name:H,rating:sn,ratings_count:q().int().min(0),reviews_count:q().int().min(0)}).strict(),reviews:Je(zm)}).strict(),Om=V({source:ct("2gis"),enabled:Qt(),source_place_id:H,source_url:pt,write_review_url:Ve,place:V({name:H,category:Z().nullable(),rating:sn,ratings_count:q().int().min(0),reviews_count:q().int().min(0),people_say:Z().nullable(),chips:Je(V({id:H,label:H}).strict())}).strict(),reviews:Je(Tm)}).strict(),Mm=V({source:ct("google"),enabled:Qt(),source_place_id:H,source_url:pt,write_review_url:Ve,place:V({name:H,rating:sn,reviews_count:q().int().min(0),rating_distribution:V({1:q().int().min(0),2:q().int().min(0),3:q().int().min(0),4:q().int().min(0),5:q().int().min(0)}).strict()}).strict(),reviews:Je(Rm)}).strict(),Im=V({source:ct("prodoctorov"),enabled:Qt(),source_place_id:H,source_url:pt,write_review_url:Ve,place:V({name:H,rating:sn,clinic_rating:sn,doctors_rating:sn,reviews_count:q().int().min(0),mentions:Je(V({id:H,label:H,positive:q().int().min(0),negative:q().int().min(0)}).strict())}).strict(),reviews:Je(Lm)}).strict(),Gd=V({schema_version:ct("1.0"),generated_at:jm,settings:V({section_label:H,titles:V({yandex:H,"2gis":H,google:H,prodoctorov:H}).strict(),subtitle:Z(),default_source:qs(zu),source_order:Je(qs(zu)).min(1).superRefine((e,n)=>{new Set(e).size!==e.length&&n.addIssue({code:x.custom,message:"source_order must not contain duplicates"})}),initial_visible_count:q().int().min(1),page_size:q().int().min(1),organization_name:H,organization_url:pt}).strict(),sources:Je(Yd("source",[Pm,Om,Mm,Im])).superRefine((e,n)=>{new Set(e.map(t=>t.source)).size!==e.length&&n.addIssue({code:x.custom,message:"sources must not contain duplicate source values"})})}).strict();async function Dm(e,n){if(!e)throw new Error("Не удалось загрузить отзывы.");const t=await fetch(e,{credentials:"same-origin",signal:n});if(!t.ok)throw new Error("Не удалось загрузить отзывы.");return Gd.parse(await t.json())}function $m(e){return Gd.parse(e)}const bm=`@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap");

:host {
  color-scheme: light;
  display: block;
  font-family: Inter, system-ui, sans-serif;
  color: #333333;
  line-height: 1.5;
  background: #faf8f3;
}

.rw-widget,
.rw-widget * {
  box-sizing: border-box;
}

.rw-widget {
  container-type: inline-size;
  container-name: rw-widget;
  padding: 64px 16px;
}

.rw-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.rw-header {
  max-width: 768px;
  margin-bottom: 32px;
}

.rw-widget h1,
.rw-widget h2,
.rw-widget h3,
.rw-widget h4,
.rw-widget p {
  margin: 0;
}

.rw-widget button,
.rw-widget input,
.rw-widget select {
  font: inherit;
}

.rw-widget :where(a) {
  color: #4a8f2c;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.rw-widget img {
  max-width: 100%;
}

.rw-widget svg {
  display: block;
  flex: 0 0 auto;
}

.rw-kicker {
  margin-bottom: 12px;
  color: #5fa030;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.rw-title {
  font-family: Montserrat, system-ui, sans-serif;
  font-size: clamp(30px, 4.5cqw, 36px);
  font-weight: 700;
  line-height: 1.15;
  color: #333333;
}

.rw-subtitle {
  margin-top: 16px;
  color: #737373;
  font-size: 16px;
  line-height: 1.6;
}

.rw-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.rw-tab {
  appearance: none;
  border: 1px solid hsl(40, 15%, 88%);
  border-radius: 999px;
  background: #ffffff;
  color: #333333;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.rw-tab:hover {
  border-color: rgba(95, 160, 48, 0.4);
  color: #5fa030;
}

.rw-tab[aria-selected="true"] {
  background: #5fa030;
  border-color: #5fa030;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  color: #ffffff;
  font-weight: 600;
}

.rw-tab:focus-visible,
.rw-button:focus-visible,
.rw-widget a:focus-visible,
.rw-widget button:focus-visible,
.rw-widget input:focus-visible,
.rw-widget select:focus-visible {
  outline: 2px solid #5fa030;
  outline-offset: 2px;
}

.rw-panel {
  width: 100%;
  min-width: 0;
  margin-top: 32px;
  overflow: hidden;
  border: 1px solid rgba(225, 220, 210, 0.8);
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 16px;
}

.rw-panel > * {
  min-width: 0;
}

.rw-actions {
  margin-top: 18px;
}

.rw-button {
  appearance: none;
  border: 1px solid hsl(40, 15%, 88%);
  border-radius: 999px;
  background: #ffffff;
  color: #333333;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
}

.rw-button:hover {
  border-color: rgba(95, 160, 48, 0.4);
  color: #5fa030;
}

.rw-source-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(225, 220, 210, 0.8);
}

.rw-source-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 9px 18px;
  border: 1px solid #5fa030;
  border-radius: 999px;
  background: #5fa030;
  color: #ffffff !important;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-decoration: none !important;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.rw-source-link:hover {
  border-color: #4a8f2c;
  background: #4a8f2c;
}

.rw-source-link--secondary {
  background: #ffffff;
  color: #4a8f2c !important;
}

.rw-source-link--secondary:hover {
  background: #f2f8ee;
}

.rw-author-link {
  color: inherit !important;
  text-decoration: none !important;
}

.rw-author-link:hover {
  text-decoration: underline !important;
}

.rw-review-origin {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 12px;
  color: #4a8f2c !important;
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  text-decoration: none !important;
}

.rw-review-origin:hover {
  text-decoration: underline !important;
}

.rw-state {
  padding: 30px 0;
  text-align: center;
  color: #737373;
}

.rw-state__message {
  margin-top: 12px;
}

.rw-skeleton {
  height: 90px;
  margin: 12px 0;
  border-radius: 12px;
  background: linear-gradient(90deg, #ede9e0, #f7f4ec, #ede9e0);
  animation: rw-pulse 1.2s infinite;
}

@keyframes rw-pulse {
  50% {
    opacity: 0.45;
  }
}

@container rw-widget (max-width: 420px) {
  .rw-widget {
    padding: 48px 12px;
  }

  .rw-panel {
    padding: 14px;
  }
}

@media (min-width: 768px) {
  .rw-widget {
    padding-top: 96px;
    padding-bottom: 96px;
  }

  .rw-header {
    margin-bottom: 40px;
  }

  .rw-panel {
    padding: 24px;
  }
}

@media (max-width: 420px) {
  .rw-widget {
    padding: 48px 12px;
  }

  .rw-panel {
    padding: 14px;
  }
}

@font-face {
  font-family: "YS Text";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("https://yastatic.net/s3/home/fonts/ys/4/text-regular.woff2") format("woff2");
}

@font-face {
  font-family: "YS Text";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("https://yastatic.net/s3/home/fonts/ys/4/text-medium.woff2") format("woff2");
}

@font-face {
  font-family: "YS Text";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("https://yastatic.net/s3/home/fonts/ys/4/text-bold.woff2") format("woff2");
}

.ym-reviews {
  --ym-text: #000;
  --ym-muted: rgba(0, 0, 0, 0.45);
  --ym-blue: #06c;
  --ym-blue-hover: #0055bb;
  --ym-star: #fac917;
  --ym-star-empty: #e0e0e0;
  --ym-line: rgba(0, 0, 0, 0.08);
  --ym-icon: #b3b3b3;
  --ym-bg: #fff;
  width: 100%;
  min-width: 0;
  background: var(--ym-bg);
  color: var(--ym-text);
  font-family: "YS Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
}

.ym-reviews button {
  font-family: inherit;
}

.ym-summary {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 0 0 16px;
}

.ym-summary__score {
  font-size: 56px;
  font-weight: 700;
  line-height: 52px;
  letter-spacing: -0.03em;
}

.ym-summary__meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-top: 4px;
}

.ym-summary__count {
  color: var(--ym-muted);
  font-size: 13px;
  line-height: 16px;
}

.ym-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0 12px;
  border-top: 1px solid var(--ym-line);
}

.ym-toolbar__count {
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
}

.ym-sort {
  position: relative;
}

.ym-sort__button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--ym-blue);
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
}

.ym-sort__button:hover,
.ym-sort__button:focus-visible {
  color: var(--ym-blue-hover);
}

.ym-sort__chevron {
  width: 8px;
  height: 8px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: translateY(-2px) rotate(45deg);
}

.ym-sort__menu {
  position: absolute;
  right: 0;
  z-index: 5;
  min-width: 180px;
  margin: 6px 0 0;
  padding: 6px 0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  list-style: none;
}

.ym-sort__option {
  display: block;
  width: 100%;
  padding: 8px 14px;
  border: 0;
  background: none;
  color: #000;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
}

.ym-sort__option:hover,
.ym-sort__option.is-active {
  background: #f5f5f5;
}

.ym-card {
  padding: 16px 0 4px;
  border-top: 1px solid var(--ym-line);
}

.ym-card__head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.ym-avatar {
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 50%;
  background: #f0f1f2;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  line-height: 48px;
  text-align: center;
}

.ym-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ym-author {
  min-width: 0;
  flex: 1;
  padding-top: 2px;
}

.ym-author__name {
  display: block;
  overflow: hidden;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ym-author__level {
  display: block;
  margin-top: 2px;
  color: var(--ym-muted);
  font-size: 13px;
  line-height: 16px;
}

.ym-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
}

.ym-meta__date {
  color: var(--ym-muted);
  font-size: 13px;
  line-height: 16px;
}

.ym-text {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 20px;
  white-space: pre-line;
}

.ym-more {
  display: inline;
  margin-top: 0;
  padding: 0;
  border: 0;
  background: none;
  color: var(--ym-blue);
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
}

.ym-more:hover,
.ym-more:focus-visible {
  color: var(--ym-blue-hover);
}

.ym-photos {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.ym-photos img {
  width: 72px;
  height: 72px;
  border-radius: 8px;
  object-fit: cover;
}

.ym-likes-count {
  margin-top: 12px;
  color: var(--ym-icon);
  font-size: 14px;
}

.ym-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 12px;
  color: var(--ym-icon);
}

.ym-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
}

.ym-action svg {
  width: 24px;
  height: 24px;
}

.ym-action:hover,
.ym-action:focus-visible,
.ym-action.is-on {
  color: var(--ym-blue);
}

.ym-action__count {
  font-size: 13px;
  line-height: 16px;
}

.ym-reply-toggle {
  display: inline-flex;
  margin: 10px 0 8px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--ym-muted);
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
}

.ym-reply-toggle:hover,
.ym-reply-toggle:focus-visible {
  color: var(--ym-blue);
}

.ym-reply {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
  margin: 0 0 8px;
  padding: 0;
  background: none;
}

.ym-reply__avatar {
  width: 36px;
  height: 36px;
  overflow: hidden;
  border-radius: 50%;
  background: #e6e6e6;
  color: #777;
  font-size: 11px;
  font-weight: 700;
  line-height: 36px;
  text-align: center;
}

.ym-reply__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ym-reply__content {
  min-width: 0;
  overflow: hidden;
  border-radius: 12px;
  background: #f1f1f1;
}

.ym-reply__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.ym-reply__org {
  font-weight: 500;
}

.ym-reply__date {
  color: var(--ym-muted);
  font-size: 13px;
}

.ym-reply__text {
  margin: 0;
  padding: 10px 12px 12px;
  color: rgba(0, 0, 0, 0.75);
  white-space: pre-line;
}

@media (max-width: 768px) {
  .ym-summary__score {
    font-size: 44px;
    line-height: 42px;
  }

  .ym-avatar {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }

  .ym-author__name {
    font-size: 15px;
  }
}

@container (max-width: 560px) {
  .ym-summary__score {
    font-size: 44px;
    line-height: 42px;
  }

  .ym-avatar {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }

  .ym-author__name {
    font-size: 15px;
  }
}

.tg-reviews {
  --tg-text: #141414;
  --tg-muted: #8c8c8c;
  --tg-blue: #057ddf;
  --tg-green: #00a046;
  --tg-star: #ffb800;
  --tg-card: #f2f3f5;
  --tg-line: #ececec;
  width: 100%;
  min-width: 0;
  background: #fff;
  color: var(--tg-text);
  font-family: Manrope, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 22px;
}

.tg-reviews button {
  font-family: inherit;
}

.tg-summary {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 0 0 8px;
}

.tg-summary__score {
  font-size: 56px;
  font-weight: 700;
  line-height: 52px;
  letter-spacing: -0.04em;
}

.tg-summary__meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 8px;
}

.tg-summary__ratings {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  color: var(--tg-muted);
  font-size: 14px;
  line-height: 18px;
}

.tg-summary__count {
  display: block;
}

.tg-verified-line {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 0 16px;
  color: var(--tg-green);
  font-size: 14px;
  line-height: 18px;
}

.tg-check {
  display: inline-flex;
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  color: var(--tg-green);
}

.tg-people {
  margin: 0 0 20px;
  padding: 14px 16px 16px;
  border-radius: 16px;
  background: var(--tg-card);
}

.tg-people__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
}

.tg-people__icon {
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--tg-green);
  color: #fff;
}

.tg-people__text {
  margin: 0;
  color: #333;
  font-size: 14px;
  line-height: 20px;
}

.tg-people__more {
  margin-top: 8px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--tg-blue);
  cursor: pointer;
  font-size: 14px;
  line-height: 18px;
}

.tg-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
}

.tg-toolbar__count {
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
}

.tg-sort {
  position: relative;
}

.tg-sort__button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--tg-text);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.tg-sort__chevron {
  width: 7px;
  height: 7px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: translateY(-2px) rotate(45deg);
}

.tg-sort__menu {
  position: absolute;
  right: 0;
  z-index: 5;
  min-width: 180px;
  margin: 8px 0 0;
  padding: 6px 0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  list-style: none;
}

.tg-sort__option {
  display: block;
  width: 100%;
  padding: 8px 14px;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  text-decoration: none;
}

.tg-sort__option:hover,
.tg-sort__option.is-active {
  background: #f5f5f5;
}

.tg-card {
  padding: 16px 0 8px;
  border-top: 1px solid var(--tg-line);
}

.tg-card__head {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.tg-avatar {
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 50%;
  background: #e8e8e8;
  color: #555;
  font-size: 13px;
  font-weight: 600;
  line-height: 40px;
  text-align: center;
}

.tg-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tg-author {
  min-width: 0;
  flex: 1;
  padding-top: 1px;
}

.tg-author__name {
  display: block;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
}

.tg-author__meta {
  display: block;
  margin-top: 1px;
  color: var(--tg-muted);
  font-size: 13px;
  line-height: 16px;
}

.tg-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.tg-meta__date {
  color: var(--tg-muted);
  font-size: 13px;
  line-height: 16px;
}

.tg-text {
  margin: 8px 0 0;
  font-size: 15px;
  line-height: 22px;
}

.tg-more {
  display: inline;
  padding: 0;
  border: 0;
  background: none;
  color: var(--tg-blue);
  cursor: pointer;
  font-size: 15px;
}

.tg-photos {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.tg-photos img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
}

.tg-confirm {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 13px;
  line-height: 16px;
}

.tg-confirm__label {
  color: var(--tg-green);
  font-weight: 500;
}

.tg-helpful-count {
  margin-top: 14px;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
}

.tg-helpful {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 8px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: #fff;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
}

.tg-reply {
  display: flex;
  gap: 10px;
  margin: 14px 0 4px;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--tg-card);
}

.tg-reply__logo {
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 50%;
  background: #f28c28;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.02em;
  text-align: center;
}

.tg-reply__logo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tg-reply__name {
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
}

.tg-reply__meta {
  color: var(--tg-muted);
  font-size: 12px;
  line-height: 16px;
}

.tg-reply__text {
  margin: 6px 0 0;
  font-size: 14px;
  line-height: 20px;
}

@media (max-width: 768px) {
  .tg-summary__score {
    font-size: 48px;
    line-height: 46px;
  }

  .tg-toolbar__count {
    font-size: 17px;
  }
}

@container (max-width: 560px) {
  .tg-summary__score {
    font-size: 48px;
    line-height: 46px;
  }

  .tg-toolbar__count {
    font-size: 17px;
  }
}

.gm-reviews {
  --gm-text: #202124;
  --gm-muted: #70757a;
  --gm-blue: #1a73e8;
  --gm-star: #fbbc04;
  --gm-bar: #e8eaed;
  --gm-line: #e8eaed;
  --gm-border: #dadce0;
  width: 100%;
  min-width: 0;
  background: #fff;
  color: var(--gm-text);
  font-family: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
}

.gm-reviews button,
.gm-reviews input,
.gm-reviews select {
  font-family: inherit;
}

.gm-summary {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 20px;
  align-items: center;
  padding: 4px 0 18px;
}

.gm-bars {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.gm-bar-row {
  display: grid;
  grid-template-columns: 10px 1fr;
  gap: 8px;
  align-items: center;
  color: var(--gm-muted);
  font-size: 12px;
  line-height: 14px;
}

.gm-bar-track {
  height: 6px;
  overflow: hidden;
  border-radius: 3px;
  background: var(--gm-bar);
}

.gm-bar-fill {
  height: 100%;
  border-radius: 3px;
  background: var(--gm-star);
}

.gm-average {
  position: relative;
  display: flex;
  min-width: 92px;
  flex-direction: column;
  align-items: flex-end;
  padding: 24px 0 0;
}

.gm-average__score {
  font-size: 56px;
  font-weight: 400;
  line-height: 52px;
  letter-spacing: -0.03em;
}

.gm-average__count {
  margin-top: 2px;
  color: var(--gm-muted);
  font-size: 13px;
  line-height: 16px;
}

.gm-search,
.gm-select {
  display: block;
  width: 100%;
  height: 48px;
  margin-bottom: 12px;
  padding: 0 16px;
  border: 1px solid var(--gm-border);
  border-radius: 8px;
  background: #fff;
  color: var(--gm-text);
  font-size: 14px;
}

.gm-search::placeholder {
  color: #80868b;
}

.gm-select-wrap {
  position: relative;
  margin-bottom: 4px;
}

.gm-select {
  appearance: none;
  padding-right: 36px;
}

.gm-select-wrap::after {
  position: absolute;
  top: 50%;
  right: 16px;
  width: 7px;
  height: 7px;
  border-right: 2px solid #5f6368;
  border-bottom: 2px solid #5f6368;
  transform: translateY(-70%) rotate(45deg);
  content: "";
  pointer-events: none;
}

.gm-card {
  padding: 16px 0;
  border-top: 1px solid var(--gm-line);
}

.gm-card__head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.gm-avatar {
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 50%;
  background: #e8eaed;
  color: #5f6368;
  font-size: 14px;
  font-weight: 500;
  line-height: 40px;
  text-align: center;
}

.gm-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gm-author {
  min-width: 0;
  flex: 1;
}

.gm-author__name {
  display: block;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}

.gm-author__meta {
  color: var(--gm-muted);
  font-size: 13px;
  line-height: 16px;
}

.gm-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.gm-meta__date {
  color: var(--gm-muted);
  font-size: 13px;
  line-height: 16px;
}

.gm-text {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 20px;
}

.gm-more {
  display: inline;
  padding: 0;
  border: 0;
  background: none;
  color: var(--gm-blue);
  cursor: pointer;
  font-weight: 500;
}

.gm-photos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  margin-top: 12px;
}

.gm-photos img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.gm-actions {
  display: flex;
  gap: 24px;
  margin-top: 14px;
}

.gm-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: 0;
  background: none;
  color: #3c4043;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.gm-action.is-on {
  color: var(--gm-blue);
}

.gm-owner {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
  margin-top: 16px;
  padding-left: 12px;
  border-left: 2px solid var(--gm-border);
}

.gm-owner__avatar {
  width: 36px;
  height: 36px;
  overflow: hidden;
  border-radius: 50%;
  background: #e8eaed;
  color: #5f6368;
  font-size: 11px;
  font-weight: 500;
  line-height: 36px;
  text-align: center;
}

.gm-owner__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gm-owner__content {
  min-width: 0;
}

.gm-owner__head {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: baseline;
}

.gm-owner__title {
  font-weight: 500;
}

.gm-owner__date {
  color: var(--gm-muted);
  font-size: 13px;
}

.gm-owner__text {
  margin: 6px 0 0;
}

@media (max-width: 768px) {
  .gm-summary {
    gap: 12px;
  }

  .gm-average__score {
    font-size: 48px;
    line-height: 46px;
  }
}

@container (max-width: 560px) {
  .gm-summary {
    gap: 12px;
  }

  .gm-average__score {
    font-size: 48px;
    line-height: 46px;
  }
}

.pd-reviews {
  --pd-text: #222;
  --pd-muted: #8a8a8a;
  --pd-blue: #2e67d2;
  --pd-star: #f5a623;
  --pd-line: #e6e6e6;
  --pd-green-bg: #e8f5e9;
  --pd-green: #2e7d32;
  --pd-blue-bg: #e8f0fb;
  background: #fff;
  color: var(--pd-text);
  font-family: "PT Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 22px;
}

.pd-reviews a {
  font-family: inherit;
}

.pd-reviews .pd-side__who {
  color: var(--pd-blue);
}

.pd-rating {
  padding: 0 0 20px;
}

.pd-rating__title {
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
}

.pd-rating__main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.pd-rating__score {
  font-size: 40px;
  font-weight: 700;
  line-height: 1;
}

.pd-rating__split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 24px;
  padding-top: 12px;
  border-top: 1px solid var(--pd-line);
}

.pd-rating__item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.pd-rating__label {
  min-width: 64px;
  font-size: 15px;
}

.pd-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px 16px;
  margin: 4px 0 8px;
}

.pd-head__title {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  line-height: 32px;
}

.pd-card {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 28px;
  padding: 22px 0;
  border-top: 1px solid var(--pd-line);
}

.pd-side__who {
  display: block;
  color: var(--pd-blue);
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  text-decoration: none;
  overflow-wrap: anywhere;
}

.pd-side__date {
  display: block;
  margin: 4px 0 12px;
  color: var(--pd-muted);
  font-size: 13px;
  line-height: 16px;
}

.pd-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 8px;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 16px;
}

.pd-badge svg,
.pd-foot__visit svg {
  display: block;
  flex: 0 0 auto;
}

.pd-badge strong,
.pd-badge span {
  line-height: 16px;
}

.pd-badge--rating {
  background: var(--pd-green-bg);
}

.pd-badge--rating strong {
  color: var(--pd-text);
}

.pd-badge--rating span {
  color: var(--pd-green);
}

.pd-badge--ok {
  background: var(--pd-blue-bg);
  color: var(--pd-blue);
}

.pd-content {
  position: relative;
  min-width: 0;
}

.pd-logo {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
}

.pd-logo__pro {
  color: #e35d6a;
}

.pd-logo__rest {
  color: #3d7bd9;
}

.pd-section {
  margin: 0 0 14px;
  padding-right: 120px;
}

.pd-doctor {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 8px;
  margin: 0 0 14px;
  padding-right: 120px;
  font-size: 14px;
}

.pd-doctor__label,
.pd-doctor__specialty {
  color: var(--pd-muted);
}

.pd-doctor__name {
  color: var(--pd-blue) !important;
  font-weight: 600;
  text-decoration: none !important;
}

a.pd-doctor__name:hover {
  text-decoration: underline !important;
}

.pd-section h4 {
  margin: 0 0 4px;
  font-size: 16px;
  line-height: 22px;
}

.pd-section p {
  margin: 0;
  overflow-wrap: anywhere;
}

.pd-reply {
  display: flex;
  gap: 10px;
  margin-top: 6px;
}

.pd-reply__logo {
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 50%;
  background: #f28c28;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.02em;
  text-align: center;
}

.pd-reply__logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pd-reply > div:last-child {
  min-width: 0;
}

.pd-reply__text {
  overflow-wrap: anywhere;
}

.pd-reply__name {
  font-weight: 700;
  line-height: 18px;
}

.pd-reply__date {
  color: var(--pd-muted);
  font-size: 13px;
  line-height: 16px;
}

.pd-reply__text {
  margin: 6px 0 0;
}

.pd-foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  margin-top: 16px;
  color: var(--pd-muted);
  font-size: 13px;
  line-height: 16px;
}

.pd-foot__visit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

@media (max-width: 768px) {
  .pd-card {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .pd-section {
    padding-right: 0;
  }

  .pd-doctor {
    padding-right: 0;
  }

  .pd-logo {
    position: static;
    display: block;
    margin-bottom: 10px;
  }

  .pd-rating__split {
    grid-template-columns: 1fr;
  }

  .pd-head__title {
    font-size: 22px;
  }
}

@container (max-width: 560px) {
  .pd-card {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .pd-section {
    padding-right: 0;
  }

  .pd-doctor {
    padding-right: 0;
  }

  .pd-logo {
    position: static;
    display: block;
    margin-bottom: 10px;
  }

  .pd-rating__split {
    grid-template-columns: 1fr;
  }

  .pd-head__title {
    font-size: 22px;
  }
}`;class Am extends HTMLElement{constructor(){super(...arguments);Wr(this,"root");Wr(this,"abort");Wr(this,"value")}set payload(t){this.value=t,this.isConnected&&this.renderWidget()}get payload(){return this.value}connectedCallback(){this.hideLightDomFallback(),this.renderWidget()}hideLightDomFallback(){this.classList.add("rw-enhanced"),this.querySelectorAll(":scope > .rw-fallback").forEach(t=>{t instanceof HTMLElement&&t.setAttribute("hidden","")})}disconnectedCallback(){var t,r;(t=this.abort)==null||t.abort(),(r=this.root)==null||r.unmount(),this.root=void 0}ensureMountSurface(){const t=this.shadowRoot??this.attachShadow({mode:"open"});let r=t.querySelector("style");r||(r=document.createElement("style"),r.textContent=bm,t.prepend(r));let i=t.querySelector(".rw-root");return i||(i=document.createElement("div"),i.className="rw-root",t.append(i)),this.root||(this.root=Ud(i)),this.root}mount(t){this.ensureMountSurface().render(t)}async renderWidget(){var r;(r=this.abort)==null||r.abort();const t=new AbortController;this.abort=t,this.mount(c.jsx("section",{className:"rw-widget",children:c.jsxs("div",{className:"rw-state",role:"status","aria-live":"polite",children:[c.jsx("div",{className:"rw-skeleton"}),c.jsx("div",{className:"rw-skeleton"}),c.jsx("p",{className:"rw-state__message",children:"Загрузка отзывов…"})]})}));try{const i=this.value!==void 0?$m(this.value):await Dm(this.getAttribute("data-endpoint")??"",t.signal);t.signal.aborted||this.mount(c.jsx(qh,{organizationLogoUrl:this.getAttribute("data-organization-logo"),payload:i}))}catch(i){if(t.signal.aborted)return;const l=i instanceof Error&&i.message==="Не удалось загрузить отзывы."?i.message:"Не удалось обработать отзывы.";this.mount(c.jsx("section",{className:"rw-widget",children:c.jsxs("div",{className:"rw-state",role:"alert","aria-live":"assertive",children:[l,c.jsx("p",{className:"rw-actions",children:c.jsx("button",{className:"rw-button",type:"button",onClick:()=>void this.renderWidget(),children:"Повторить загрузку"})})]})}))}}}customElements.get("reviews-widget")||customElements.define("reviews-widget",Am);
