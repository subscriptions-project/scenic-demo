(function(){(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
exports.__esModule = true;
var CSS = "@media (min-width:480px){.swg-dialog,.swg-toast{width:480px!important;left:-240px!important;margin-left:50vw!important}}@media (max-width:480px){.swg-dialog,.swg-toast{width:100%!important;left:0!important;margin-left:0!important}}@-webkit-keyframes swg-notify{0%{-webkit-transform:translateY(100%);transform:translateY(100%);opacity:0}to{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}@-webkit-keyframes swg-notify-hide{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}to{-webkit-transform:translateY(100%);transform:translateY(100%);opacity:0}}\n/*# sourceURL=/./src/components/dialog.css*/";
exports.CSS = CSS;

},{}],2:[function(require,module,exports){
exports.__esModule = true;
var CSS = "body{padding:0;margin:0}swg-container,swg-loading,swg-loading-animate,swg-loading-image{display:block}swg-loading{position:fixed!important;top:40%!important;left:45%!important;-webkit-transform:translate(-40%,-40%)!important;transform:translate(-40%,-40%)!important;z-index:2147483647!important;width:36px;height:36px;overflow:hidden;-webkit-animation:mspin-rotate 1568.63ms infinite linear;animation:mspin-rotate 1568.63ms infinite linear}swg-loading-animate{-webkit-animation:mspin-revrot 5332ms infinite steps(4);animation:mspin-revrot 5332ms infinite steps(4)}swg-loading-image{background-image:url('data:image/svg+xml;charset=utf-8;base64,DQo8c3ZnIHZlcnNpb249IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTY2NCIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDExNjY0IDM2Ij48ZGVmcz48cGF0aCBpZD0iYSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWRhc2hhcnJheT0iNTguOSIgZD0iTTE4IDUuNUExMi41IDEyLjUgMCAxIDEgNS41IDE4IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiLz48ZyBpZD0iYiI+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjE3Ni42NiIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxNzYuNTgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM2KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxNzYuMzIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDcyKSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxNzUuODUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwOCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTc1LjE0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDQpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjE3NC4xMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTgwKSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxNzIuNzgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxNikiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTcxLjAxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTIpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjE2OC43OCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjg4KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxNjYuMDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMyNCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTYyLjczIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNjApIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjE1OS4wMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzk2KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxNTUuMDQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQzMikiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTUxLjA1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NjgpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjE0Ny4yMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTA0KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxNDMuNzEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDU0MCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTQwLjU0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1NzYpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjEzNy43MiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjEyKSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMzUuMjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY0OCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTMyLjk4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2ODQpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjEzMS4wMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzIwKSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMjkuMjYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc1NikiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTI3LjcxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3OTIpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjEyNi4zMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODI4KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMjUuMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODY0KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMjQuMDEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTIzLjA0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5MzYpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjEyMi4xOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTcyKSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMjEuNDMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMDgpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjEyMC43NyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA0NCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTIwLjE5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDgwKSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMTkuNjkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExMTYpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjExOS4yNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE1MikiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTE4Ljg5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTg4KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMTguNTgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMjQpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjExOC4zMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTI2MCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTE4LjEzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjk2KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMTcuOTgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzMzIpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjExNy44OCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM2OCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTE3LjgyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDA0KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMTcuOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ0MCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTE3LjcyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDc2KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMTcuNDYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1MTIpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjExNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTU0OCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTE2LjI5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTg0KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMTUuMjkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2MjApIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjExMy45NCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTY1NikiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTEyLjE5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNjkyKSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMDkuOTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3MjgpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjEwNy4yMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTc2NCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iMTAzLjk2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMDAuMjciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4MzYpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9Ijk2LjMyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODcyKSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSI5Mi4zNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkwOCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iODguNTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5NDQpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9Ijg1LjA3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOTgwKSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSI4MS45MiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAxNikiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNzkuMTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwNTIpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9Ijc2LjYxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMDg4KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSI3NC40IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTI0KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSI3Mi40NSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjE2MCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNzAuNzEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxOTYpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjY5LjE2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjMyKSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSI2Ny43OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjI2OCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNjYuNTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIzMDQpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjY1LjQ5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMzQwKSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSI2NC41MyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjM3NikiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNjMuNjgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0MTIpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjYyLjkzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDQ4KSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSI2Mi4yNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQ4NCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNjEuNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUyMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNjEuMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjU1NikiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNjAuNzciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1OTIpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjYwLjQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2MjgpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjYwLjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2NjQpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjU5Ljg1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNzAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSI1OS42NSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjczNikiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNTkuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjc3MikiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNTkuNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjgwOCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNTkuMzQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI4NDQpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjU5LjMyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyODgwKSIvPjwvZz48ZyBpZD0iYyI+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjcwLjcxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTk2KSIgb3BhY2l0eT0iLjA1Ii8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjY5LjE2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjMyKSIgb3BhY2l0eT0iLjEiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNjcuNzkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyNjgpIiBvcGFjaXR5PSIuMTUiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNjYuNTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIzMDQpIiBvcGFjaXR5PSIuMiIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSI2NS40OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjM0MCkiIG9wYWNpdHk9Ii4yNSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSI2NC41MyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjM3NikiIG9wYWNpdHk9Ii4zIi8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjYzLjY4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDEyKSIgb3BhY2l0eT0iLjM1Ii8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjYyLjkzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDQ4KSIgb3BhY2l0eT0iLjQiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNjIuMjciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0ODQpIiBvcGFjaXR5PSIuNDUiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNjEuNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUyMCkiIG9wYWNpdHk9Ii41Ii8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjYxLjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1NTYpIiBvcGFjaXR5PSIuNTUiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNjAuNzciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1OTIpIiBvcGFjaXR5PSIuNiIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSI2MC40IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNjI4KSIgb3BhY2l0eT0iLjY1Ii8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjYwLjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2NjQpIiBvcGFjaXR5PSIuNyIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSI1OS44NSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjcwMCkiIG9wYWNpdHk9Ii43NSIvPjx1c2UgeGxpbms6aHJlZj0iI2EiIHN0cm9rZS1kYXNob2Zmc2V0PSI1OS42NSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjczNikiIG9wYWNpdHk9Ii44Ii8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjU5LjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI3NzIpIiBvcGFjaXR5PSIuODUiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiBzdHJva2UtZGFzaG9mZnNldD0iNTkuNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjgwOCkiIG9wYWNpdHk9Ii45Ii8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjU5LjM0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyODQ0KSIgb3BhY2l0eT0iLjk1Ii8+PHVzZSB4bGluazpocmVmPSIjYSIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjU5LjMyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyODgwKSIvPjwvZz48L2RlZnM+PHVzZSB4bGluazpocmVmPSIjYiIgc3Ryb2tlPSIjNDI4NWY0Ii8+PHVzZSB4bGluazpocmVmPSIjYyIgc3Ryb2tlPSIjZGI0NDM3Ii8+PHVzZSB4bGluazpocmVmPSIjYiIgc3Ryb2tlPSIjZGI0NDM3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyOTE2KSIvPjx1c2UgeGxpbms6aHJlZj0iI2MiIHN0cm9rZT0iI2Y0YjQwMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjkxNikiLz48dXNlIHhsaW5rOmhyZWY9IiNiIiBzdHJva2U9IiNmNGI0MDAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDU4MzIpIi8+PHVzZSB4bGluazpocmVmPSIjYyIgc3Ryb2tlPSIjMGY5ZDU4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1ODMyKSIvPjx1c2UgeGxpbms6aHJlZj0iI2IiIHN0cm9rZT0iIzBmOWQ1OCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODc0OCkiLz48dXNlIHhsaW5rOmhyZWY9IiNjIiBzdHJva2U9IiM0Mjg1ZjQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDg3NDgpIi8+PC9zdmc+');background-size:100%;width:11664px;height:36px;-webkit-animation:swg-loading-film 5332ms infinite steps(324);animation:swg-loading-film 5332ms infinite steps(324)}@-webkit-keyframes swg-loading-film{0%{-webkit-transform:translateX(0);transform:translateX(0)}to{-webkit-transform:translateX(-11664px);transform:translateX(-11664px)}}@keyframes swg-loading-film{0%{-webkit-transform:translateX(0);transform:translateX(0)}to{-webkit-transform:translateX(-11664px);transform:translateX(-11664px)}}@-webkit-keyframes mspin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes mspin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes mspin-revrot{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@keyframes mspin-revrot{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}\n/*# sourceURL=/./src/ui/ui.css*/";
exports.CSS = CSS;

},{}],3:[function(require,module,exports){
'use strict';

/**
 * Constructs a ES6/Promises A+ Promise instance.
 *
 * @constructor
 * @param {function(function(*=), function (*=))} resolver
 */
function Promise(resolver) {
  if (!(this instanceof Promise)) {
    throw new TypeError('Constructor Promise requires `new`');
  }
  if (!isFunction(resolver)) {
    throw new TypeError('Must pass resolver function');
  }

  /**
   * @type {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise}
   * @private
   */
  this._state = PendingPromise;

  /**
   * @type {*}
   * @private
   */
  this._value = [];

  /**
   * @type {boolean}
   * @private
   */
  this._isChainEnd = true;

  doResolve(
    this,
    adopter(this, FulfilledPromise),
    adopter(this, RejectedPromise),
    { then: resolver }
  );
}

/****************************
  Public Instance Methods
 ****************************/

/**
 * Creates a new promise instance that will receive the result of this promise
 * as inputs to the onFulfilled or onRejected callbacks.
 *
 * @param {function(*)} onFulfilled
 * @param {function(*)} onRejected
 */
Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = isFunction(onFulfilled) ? onFulfilled : void 0;
  onRejected = isFunction(onRejected) ? onRejected : void 0;

  if (onFulfilled || onRejected) {
    this._isChainEnd = false;
  }

  return this._state(
    this._value,
    onFulfilled,
    onRejected
  );
};

/**
 * Creates a new promise that will handle the rejected state of this promise.
 *
 * @param {function(*)} onRejected
 * @returns {!Promise}
 */
Promise.prototype.catch = function(onRejected) {
  return this.then(void 0, onRejected);
};

/****************************
  Public Static Methods
 ****************************/

/**
 * Creates a fulfilled Promise of value. If value is itself a then-able,
 * resolves with the then-able's value.
 *
 * @this {!Promise}
 * @param {*=} value
 * @returns {!Promise}
 */
Promise.resolve = function(value) {
  var Constructor = this;
  var promise;

  if (isObject(value) && value instanceof this) {
    promise = value;
  } else {
    promise = new Constructor(function(resolve) {
      resolve(value);
    });
  }

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a rejected Promise of reason.
 *
 * @this {!Promise}
 * @param {*=} reason
 * @returns {!Promise}
 */
Promise.reject = function(reason) {
  var Constructor = this;
  var promise = new Constructor(function(_, reject) {
    reject(reason);
  });

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a Promise that will resolve with an array of the values of the
 * passed in promises. If any promise rejects, the returned promise will
 * reject.
 *
 * @this {!Promise}
 * @param {!Array<Promise|*>} promises
 * @returns {!Promise}
 */
Promise.all = function(promises) {
  var Constructor = this;
  var promise = new Constructor(function(resolve, reject) {
    var length = promises.length;
    var values = new Array(length);

    if (length === 0) {
      return resolve(values);
    }

    each(promises, function(promise, index) {
      Constructor.resolve(promise).then(function(value) {
        values[index] = value;
        if (--length === 0) {
          resolve(values);
        }
      }, reject);
    });
  });

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a Promise that will resolve or reject based on the first
 * resolved or rejected promise.
 *
 * @this {!Promise}
 * @param {!Array<Promise|*>} promises
 * @returns {!Promise}
 */
Promise.race = function(promises) {
  var Constructor = this;
  var promise = new Constructor(function(resolve, reject) {
    for (var i = 0; i < promises.length; i++) {
      Constructor.resolve(promises[i]).then(resolve, reject);
    }
  });

  return /** @type {!Promise} */(promise);
};

var onPossiblyUnhandledRejection = function(reason, promise) {
  throw reason;
};

/**
 * An internal use static function.
 */
Promise._overrideUnhandledExceptionHandler = function(handler) {
  onPossiblyUnhandledRejection = handler;
};

/****************************
  Private functions
 ****************************/

/**
 * The Fulfilled Promise state. Calls onFulfilled with the resolved value of
 * this promise, creating a new promise.
 *
 * If there is no onFulfilled, returns the current promise to avoid an promise
 * instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} value The current promise's resolved value.
 * @param {function(*=)=} onFulfilled
 * @param {function(*=)=} unused
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Fulfilled state from the
 *     Pending state.
 * @returns {!Promise}
 */
function FulfilledPromise(value, onFulfilled, unused, deferred) {
  if (!onFulfilled) {
    deferredAdopt(deferred, FulfilledPromise, value);
    return this;
  }
  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }
  defer(tryCatchDeferred(deferred, onFulfilled, value));
  return deferred.promise;
}

/**
 * The Rejected Promise state. Calls onRejected with the resolved value of
 * this promise, creating a new promise.
 *
 * If there is no onRejected, returns the current promise to avoid an promise
 * instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} reason The current promise's rejection reason.
 * @param {function(*=)=} unused
 * @param {function(*=)=} onRejected
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Rejected state from the
 *     Pending state.
 * @returns {!Promise}
 */
function RejectedPromise(reason, unused, onRejected, deferred) {
  if (!onRejected) {
    deferredAdopt(deferred, RejectedPromise, reason);
    return this;
  }
  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }
  defer(tryCatchDeferred(deferred, onRejected, reason));
  return deferred.promise;
}

/**
 * The Pending Promise state. Eventually calls onFulfilled once the promise has
 * resolved, or onRejected once the promise rejects.
 *
 * If there is no onFulfilled and no onRejected, returns the current promise to
 * avoid an promise instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} queue The current promise's pending promises queue.
 * @param {function(*=)=} onFulfilled
 * @param {function(*=)=} onRejected
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Pending state from the
 *     Pending state of another promise.
 * @returns {!Promise}
 */
function PendingPromise(queue, onFulfilled, onRejected, deferred) {
  if (!deferred) {
    if (!onFulfilled && !onRejected) { return this; }
    deferred = new Deferred(this.constructor);
  }
  queue.push({
    deferred: deferred,
    onFulfilled: onFulfilled || deferred.resolve,
    onRejected: onRejected || deferred.reject
  });
  return deferred.promise;
}

/**
 * Constructs a deferred instance that holds a promise and its resolve and
 * reject functions.
 *
 * @constructor
 */
function Deferred(Promise) {
  var deferred = this;
  /** @type {!Promise} */
  this.promise = new Promise(function(resolve, reject) {
    /** @type {function(*=)} */
    deferred.resolve = resolve;

    /** @type {function(*=)} */
    deferred.reject = reject;
  });
  return deferred;
}

/**
 * Transitions the state of promise to another state. This is only ever called
 * on with a promise that is currently in the Pending state.
 *
 * @param {!Promise} promise
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @param {*=} value
 */
function adopt(promise, state, value, adoptee) {
  var queue = promise._value;
  promise._state = state;
  promise._value = value;

  if (adoptee && state === PendingPromise) {
    adoptee._state(value, void 0, void 0, {
      promise: promise,
      resolve: void 0,
      reject: void 0
    });
  }

  for (var i = 0; i < queue.length; i++) {
    var next = queue[i];
    promise._state(
      value,
      next.onFulfilled,
      next.onRejected,
      next.deferred
    );
  }
  queue.length = 0;

  // Determine if this rejected promise will be "handled".
  if (state === RejectedPromise && promise._isChainEnd) {
    setTimeout(function() {
      if (promise._isChainEnd) {
        onPossiblyUnhandledRejection(value, promise);
      }
    }, 0);
  }
}

/**
 * A partial application of adopt.
 *
 * @param {!Promise} promise
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @returns {function(*=)}
 */
function adopter(promise, state) {
  return function(value) {
    adopt(promise, state, value);
  };
}

/**
 * Updates a deferred promises state. Necessary for updating an adopting
 * promise's state when the adoptee resolves.
 *
 * @param {?Deferred} deferred
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @param {*=} value
 */
function deferredAdopt(deferred, state, value) {
  if (deferred) {
    var promise = deferred.promise;
    promise._state = state;
    promise._value = value;
  }
}

/**
 * A no-op function to prevent double resolving.
 */
function noop() {}

/**
 * Tests if fn is a Function
 *
 * @param {*} fn
 * @returns {boolean}
 */
function isFunction(fn) {
  return typeof fn === 'function';
}

/**
 * Tests if fn is an Object
 *
 * @param {*} obj
 * @returns {boolean}
 */
function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Iterates over each element of an array, calling the iterator with the
 * element and its index.
 *
 * @param {!Array} collection
 * @param {function(*=,number)} iterator
 */
function each(collection, iterator) {
  for (var i = 0; i < collection.length; i++) {
    iterator(collection[i], i);
  }
}

/**
 * Creates a function that will attempt to resolve the deferred with the return
 * of fn. If any error is raised, rejects instead.
 *
 * @param {!Deferred} deferred
 * @param {function(*=)} fn
 * @param {*} arg
 * @returns {function()}
 */
function tryCatchDeferred(deferred, fn, arg) {
  var promise = deferred.promise;
  var resolve = deferred.resolve;
  var reject = deferred.reject;
  return function() {
    try {
      var result = fn(arg);
      doResolve(promise, resolve, reject, result, result);
    } catch (e) {
      reject(e);
    }
  };
}

/**
 * Queues and executes multiple deferred functions on another run loop.
 */
var defer = (function() {
  /**
   * Defers fn to another run loop.
   */
  var scheduleFlush;
  if (typeof window !== 'undefined' && window.postMessage) {
    window.addEventListener('message', flush);
    scheduleFlush = function() {
      window.postMessage('macro-task', '*');
    };
  } else {
    scheduleFlush = function() {
      setTimeout(flush, 0);
    };
  }

  var queue = new Array(16);
  var length = 0;

  function flush() {
    for (var i = 0; i < length; i++) {
      var fn = queue[i];
      queue[i] = null;
      fn();
    }
    length = 0;
  }

  /**
   * @param {function()} fn
   */
  function defer(fn) {
    if (length === 0) { scheduleFlush(); }
    queue[length++] = fn;
  }

  return defer;
})();

/**
 * The Promise resolution procedure.
 * https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
 *
 * @param {!Promise} promise
 * @param {function(*=)} resolve
 * @param {function(*=)} reject
 * @param {*} value
 * @param {*=} context
 */
function doResolve(promise, resolve, reject, value, context) {
  var _reject = reject;
  var then;
  var _resolve;
  try {
    if (value === promise) {
      throw new TypeError('Cannot fulfill promise with itself');
    }
    var isObj = isObject(value);
    if (isObj && value instanceof promise.constructor) {
      adopt(promise, value._state, value._value, value);
    } else if (isObj && (then = value.then) && isFunction(then)) {
      _resolve = function(value) {
        _resolve = _reject = noop;
        doResolve(promise, resolve, reject, value, value);
      };
      _reject = function(reason) {
        _resolve = _reject = noop;
        reject(reason);
      };
      then.call(
        context,
        function(value) { _resolve(value); },
        function(reason) { _reject(reason); }
      );
    } else {
      resolve(value);
    }
  } catch (e) {
    _reject(e);
  }
}

module.exports = Promise;

},{}],4:[function(require,module,exports){
/**
 * @license
 * Copyright 2017 The Web Activities Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 /** Version: 1.8 */
'use strict';

/*eslint no-unused-vars: 0*/


/**
 * @enum {string}
 */
const ActivityMode = {
  IFRAME: 'iframe',
  POPUP: 'popup',
  REDIRECT: 'redirect',
};


/**
 * The result code used for `ActivityResult`.
 * @enum {string}
 */
const ActivityResultCode = {
  OK: 'ok',
  CANCELED: 'canceled',
  FAILED: 'failed',
};


/**
 * The result of an activity. The activity implementation returns this object
 * for a successful result, a cancelation or a failure.
 * @struct
 */
class ActivityResult {
  /**
   * @param {!ActivityResultCode} code
   * @param {*} data
   * @param {!ActivityMode} mode
   * @param {string} origin
   * @param {boolean} originVerified
   * @param {boolean} secureChannel
   */
  constructor(code, data, mode, origin, originVerified, secureChannel) {
    /** @const {!ActivityResultCode} */
    this.code = code;
    /** @const {*} */
    this.data = code == ActivityResultCode.OK ? data : null;
    /** @const {!ActivityMode} */
    this.mode = mode;
    /** @const {string} */
    this.origin = origin;
    /** @const {boolean} */
    this.originVerified = originVerified;
    /** @const {boolean} */
    this.secureChannel = secureChannel;
    /** @const {boolean} */
    this.ok = code == ActivityResultCode.OK;
    /** @const {?Error} */
    this.error = code == ActivityResultCode.FAILED ?
        new Error(String(data) || '') :
        null;
  }
}


/**
 * The activity request that different types of hosts can be started with.
 * @typedef {{
 *   requestId: string,
 *   returnUrl: string,
 *   args: ?Object,
 *   origin: (string|undefined),
 *   originVerified: (boolean|undefined),
 * }}
 */



/**
 * The activity "open" options used for popups and redirects.
 *
 * - returnUrl: override the return URL. By default, the current URL will be
 *   used.
 * - skipRequestInUrl: removes the activity request from the URL, in case
 *   redirect is used. By default, the activity request is appended to the
 *   activity URL. This option can be used if the activity request is passed
 *   to the activity by some alternative means.
 *
 * @typedef {{
 *   returnUrl: (string|undefined),
 *   skipRequestInUrl: (boolean|undefined),
 *   width: (number|undefined),
 *   height: (number|undefined),
 * }}
 */
let ActivityOpenOptions;


/**
 * Activity client-side binding. The port provides limited ways to communicate
 * with the activity and receive signals and results from it. Not every type
 * of activity exposes a port.
 *
 * @interface
 */
class ActivityPort {

  /**
   * Returns the mode of the activity: iframe, popup or redirect.
   * @return {!ActivityMode}
   */
  getMode() {}

  /**
   * Accepts the result when ready. The client should verify the activity's
   * mode, origin, verification and secure channel flags before deciding
   * whether or not to trust the result.
   *
   * Returns the promise that yields when the activity has been completed and
   * either a result, a cancelation or a failure has been returned.
   *
   * @return {!Promise<!ActivityResult>}
   */
  acceptResult() {}
}


/**
 * Activity implementation. The host provides interfaces, callbacks and
 * signals for the activity's implementation to communicate with the client
 * and return the results.
 *
 * @interface
 */



const SENTINEL = '__ACTIVITIES__';

/**
 * The messenger helper for activity's port and host.
 */
class Messenger {

  /**
   * @param {!Window} win
   * @param {!Window|function():?Window} targetOrCallback
   * @param {?string} targetOrigin
   */
  constructor(win, targetOrCallback, targetOrigin) {
    /** @private @const {!Window} */
    this.win_ = win;
    /** @private @const {!Window|function():?Window} */
    this.targetOrCallback_ = targetOrCallback;

    /**
     * May start as unknown (`null`) until received in the first message.
     * @private {?string}
     */
    this.targetOrigin_ = targetOrigin;

    /** @private {?Window} */
    this.target_ = null;

    /** @private {boolean} */
    this.acceptsPort_ = false;

    /** @private {?MessagePort} */
    this.port_ = null;

    /** @private {?function(string, ?Object)} */
    this.onCommand_ = null;

    /** @private {?function(!Object)} */
    this.onCustomMessage_ = null;

    /**
     * @private {?Object<string, !ChannelHolder>}
     */
    this.channels_ = null;

    /** @private @const */
    this.boundHandleEvent_ = this.handleEvent_.bind(this);
  }

  /**
   * Connect the port to the host or vice versa.
   * @param {function(string, ?Object)} onCommand
   */
  connect(onCommand) {
    if (this.onCommand_) {
      throw new Error('already connected');
    }
    this.onCommand_ = onCommand;
    this.win_.addEventListener('message', this.boundHandleEvent_);
  }

  /**
   * Disconnect messenger.
   */
  disconnect() {
    if (this.onCommand_) {
      this.onCommand_ = null;
      if (this.port_) {
        closePort(this.port_);
        this.port_ = null;
      } else {
        this.win_.removeEventListener('message', this.boundHandleEvent_);
      }
      if (this.channels_) {
        for (const k in this.channels_) {
          const channelObj = this.channels_[k];
          if (channelObj.port1) {
            closePort(channelObj.port1);
          }
          if (channelObj.port2) {
            closePort(channelObj.port2);
          }
        }
        this.channels_ = null;
      }
    }
  }

  /**
   * Returns whether the messenger has been connected already.
   * @return {boolean}
   */
  isConnected() {
    return this.targetOrigin_ != null;
  }

  /**
   * Returns the messaging target. Only available when connection has been
   * establihsed.
   * @return {!Window}
   */
  getTarget() {
    const target = this.getOptionalTarget_();
    if (!target) {
      throw new Error('not connected');
    }
    return target;
  }

  /**
   * @return {?Window}
   * @private
   */
  getOptionalTarget_() {
    if (this.onCommand_ && !this.target_) {
      if (typeof this.targetOrCallback_ == 'function') {
        this.target_ = this.targetOrCallback_();
      } else {
        this.target_ = /** @type {!Window} */ (this.targetOrCallback_);
      }
    }
    return this.target_;
  }

  /**
   * Returns the messaging origin. Only available when connection has been
   * establihsed.
   * @return {string}
   */
  getTargetOrigin() {
    if (this.targetOrigin_ == null) {
      throw new Error('not connected');
    }
    return this.targetOrigin_;
  }

  /**
   * The host sends this message to the client to indicate that it's ready to
   * start communicating. The client is expected to respond back with the
   * "start" command. See `sendStartCommand` method.
   */
  sendConnectCommand() {
    this.sendCommand('connect', {'acceptsPort': true});
  }

  /**
   * The client sends this message to the host upon receiving the "connect"
   * message to start the main communication channel. As a payload, the message
   * will contain the provided start arguments.
   * @param {?Object} args
   */
  sendStartCommand(args) {
    let channel = null;
    if (this.acceptsPort_ && typeof this.win_.MessageChannel == 'function') {
      channel = new this.win_.MessageChannel();
    }
    if (channel) {
      this.sendCommand('start', args, [channel.port2]);
      // It's critical to switch to port messaging only after "start" has been
      // sent. Otherwise, it won't be delivered.
      this.switchToPort_(channel.port1);
    } else {
      this.sendCommand('start', args);
    }
  }

  /**
   * Sends the specified command from the port to the host or vice versa.
   * @param {string} cmd
   * @param {?Object=} opt_payload
   * @param {?Array=} opt_transfer
   */
  sendCommand(cmd, opt_payload, opt_transfer) {
    const data = {
      'sentinel': SENTINEL,
      'cmd': cmd,
      'payload': opt_payload || null,
    };
    if (this.port_) {
      this.port_.postMessage(data, opt_transfer || undefined);
    } else {
      const target = this.getTarget();
      // Only "connect" command is allowed to use `targetOrigin == '*'`
      const targetOrigin =
          cmd == 'connect' ?
          (this.targetOrigin_ != null ? this.targetOrigin_ : '*') :
          this.getTargetOrigin();
      target.postMessage(data, targetOrigin, opt_transfer || undefined);
    }
  }

  /**
   * Sends a message to the client.
   * @param {!Object} payload
   */
  customMessage(payload) {
    this.sendCommand('msg', payload);
  }

  /**
   * Registers a callback to receive messages from the client.
   * @param {function(!Object)} callback
   */
  onCustomMessage(callback) {
    this.onCustomMessage_ = callback;
  }

  /**
   * @param {string=} opt_name
   * @return {!Promise<!MessagePort>}
   */
  startChannel(opt_name) {
    const name = opt_name || '';
    const channelObj = this.getChannelObj_(name);
    if (!channelObj.port1) {
      const channel = new this.win_.MessageChannel();
      channelObj.port1 = channel.port1;
      channelObj.port2 = channel.port2;
      channelObj.resolver(channelObj.port1);
    }
    if (channelObj.port2) {
      // Not yet sent.
      this.sendCommand('cnset', {'name': name}, [channelObj.port2]);
      channelObj.port2 = null;
    }
    return channelObj.promise;
  }

  /**
   * @param {string=} opt_name
   * @return {!Promise<!MessagePort>}
   */
  askChannel(opt_name) {
    const name = opt_name || '';
    const channelObj = this.getChannelObj_(name);
    if (!channelObj.port1) {
      this.sendCommand('cnget', {'name': name});
    }
    return channelObj.promise;
  }

  /**
   * @param {string} name
   * @param {!MessagePort} port
   * @private
   */
  receiveChannel_(name, port) {
    const channelObj = this.getChannelObj_(name);
    channelObj.port1 = port;
    channelObj.resolver(port);
  }

  /**
   * @param {string} name
   * @return {!ChannelHolder}
   */
  getChannelObj_(name) {
    if (!this.channels_) {
      this.channels_ = {};
    }
    let channelObj = this.channels_[name];
    if (!channelObj) {
      let resolver;
      const promise = new Promise(resolve => {
        resolver = resolve;
      });
      channelObj = {
        port1: null,
        port2: null,
        resolver,
        promise,
      };
      this.channels_[name] = channelObj;
    }
    return channelObj;
  }

  /**
   * @param {!MessagePort} port
   * @private
   */
  switchToPort_(port) {
    this.port_ = port;
    this.port_.onmessage = event => {
      const data = event.data;
      const cmd = data && data['cmd'];
      const payload = data && data['payload'] || null;
      if (cmd) {
        this.handleCommand_(cmd, payload, event);
      }
    };
    // No longer needed with port available.
    this.win_.removeEventListener('message', this.boundHandleEvent_);
  }

  /**
   * @param {!MessageEvent} event
   * @private
   */
  handleEvent_(event) {
    if (this.port_) {
      // Messaging channel has already taken over.
      return;
    }
    const data = event.data;
    if (!data || data['sentinel'] != SENTINEL) {
      return;
    }
    const origin = /** @type {string} */ (event.origin);
    const cmd = data['cmd'];
    const payload = data['payload'] || null;
    if (this.targetOrigin_ == null && cmd == 'start') {
      this.targetOrigin_ = origin;
    }
    if (this.targetOrigin_ == null && event.source) {
      if (this.getOptionalTarget_() == event.source) {
        this.targetOrigin_ = origin;
      }
    }
    // Notice that event.source may differ from the target because of
    // friendly-iframe intermediaries.
    if (origin != this.targetOrigin_) {
      return;
    }
    this.handleCommand_(cmd, payload, event);
  }

  /**
   * @param {string} cmd
   * @param {?Object} payload
   * @param {!MessageEvent} event
   * @private
   */
  handleCommand_(cmd, payload, event) {
    if (cmd == 'connect') {
      this.acceptsPort_ = payload && payload['acceptsPort'] || false;
      this.onCommand_(cmd, payload);
    } else if (cmd == 'start') {
      const port = event.ports && event.ports[0];
      if (port) {
        this.switchToPort_(port);
      }
      this.onCommand_(cmd, payload);
    } else if (cmd == 'msg') {
      if (this.onCustomMessage_ != null && payload != null) {
        this.onCustomMessage_(payload);
      }
    } else if (cmd == 'cnget') {
      const name = payload['name'];
      this.startChannel(name);
    } else if (cmd == 'cnset') {
      const name = payload['name'];
      const port = event.ports[0];
      this.receiveChannel_(name, /** @type {!MessagePort} */ (port));
    } else {
      this.onCommand_(cmd, payload);
    }
  }
}


/**
 * @param {!MessagePort} port
 */
function closePort(port) {
  try {
    port.close();
  } catch (e) {
    // Ignore.
  }
}



/** DOMException.ABORT_ERR name */
const ABORT_ERR_NAME = 'AbortError';

/** DOMException.ABORT_ERR = 20 */
const ABORT_ERR_CODE = 20;

/** @type {?HTMLAnchorElement} */
let aResolver;


/**
 * @param {string} urlString
 * @return {!HTMLAnchorElement}
 */
function parseUrl(urlString) {
  if (!aResolver) {
    aResolver = /** @type {!HTMLAnchorElement} */ (document.createElement('a'));
  }
  aResolver.href = urlString;
  return /** @type {!HTMLAnchorElement} */ (aResolver);
}


/**
 * @param {!Location|!URL|!HTMLAnchorElement} loc
 * @return {string}
 */
function getOrigin(loc) {
  return loc.origin || loc.protocol + '//' + loc.host;
}


/**
 * @param {string} urlString
 * @return {string}
 */
function getOriginFromUrl(urlString) {
  return getOrigin(parseUrl(urlString));
}


/**
 * @param {!Window} win
 * @return {string}
 */



/**
 * @param {string} urlString
 * @return {string}
 */
function removeFragment(urlString) {
  const index = urlString.indexOf('#');
  if (index == -1) {
    return urlString;
  }
  return urlString.substring(0, index);
}


/**
 * Parses and builds Object of URL query string.
 * @param {string} query The URL query string.
 * @return {!Object<string, string>}
 */
function parseQueryString(query) {
  if (!query) {
    return {};
  }
  return (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
        const item = param.split('=');
        const key = decodeURIComponent(item[0] || '');
        const value = decodeURIComponent(item[1] || '');
        if (key) {
          params[key] = value;
        }
        return params;
      }, {});
}


/**
 * @param {string} queryString  A query string in the form of "a=b&c=d". Could
 *   be optionally prefixed with "?" or "#".
 * @param {string} param The param to get from the query string.
 * @return {?string}
 */
function getQueryParam(queryString, param) {
  return parseQueryString(queryString)[param];
}


/**
 * Add a query-like parameter to the fragment string.
 * @param {string} url
 * @param {string} param
 * @param {string} value
 * @return {string}
 */
function addFragmentParam(url, param, value) {
  return url +
      (url.indexOf('#') == -1 ? '#' : '&') +
      encodeURIComponent(param) + '=' + encodeURIComponent(value);
}


/**
 * @param {string} queryString  A query string in the form of "a=b&c=d". Could
 *   be optionally prefixed with "?" or "#".
 * @param {string} param The param to remove from the query string.
 * @return {?string}
 */
function removeQueryParam(queryString, param) {
  if (!queryString) {
    return queryString;
  }
  const search = encodeURIComponent(param) + '=';
  let index = -1;
  do {
    index = queryString.indexOf(search, index);
    if (index != -1) {
      const prev = index > 0 ? queryString.substring(index - 1, index) : '';
      if (prev == '' || prev == '?' || prev == '#' || prev == '&') {
        let end = queryString.indexOf('&', index + 1);
        if (end == -1) {
          end = queryString.length;
        }
        queryString =
            queryString.substring(0, index) +
            queryString.substring(end + 1);
      } else {
        index++;
      }
    }
  } while (index != -1 && index < queryString.length);
  return queryString;
}


/**
 * @param {?string} requestString
 * @param {boolean=} trusted
 * @return {?ActivityRequest}
 */



/**
 * @param {!ActivityRequest} request
 * @return {string}
 */
function serializeRequest(request) {
  const map = {
    'requestId': request.requestId,
    'returnUrl': request.returnUrl,
    'args': request.args,
  };
  if (request.origin !== undefined) {
    map['origin'] = request.origin;
  }
  if (request.originVerified !== undefined) {
    map['originVerified'] = request.originVerified;
  }
  return JSON.stringify(map);
}


/**
 * Creates or emulates a DOMException of AbortError type.
 * See https://heycam.github.io/webidl/#aborterror.
 * @param {!Window} win
 * @param {string=} opt_message
 * @return {!DOMException}
 */
function createAbortError(win, opt_message) {
  const message = 'AbortError' + (opt_message ? ': ' + opt_message : '');
  let error = null;
  if (typeof win['DOMException'] == 'function') {
    // TODO(dvoytenko): remove typecast once externs are fixed.
    const constr = /** @type {function(new:DOMException, string, string)} */ (
        win['DOMException']);
    try {
      error = new constr(message, ABORT_ERR_NAME);
    } catch (e) {
      // Ignore. In particular, `new DOMException()` fails in Edge.
    }
  }
  if (!error) {
    // TODO(dvoytenko): remove typecast once externs are fixed.
    const constr = /** @type {function(new:DOMException, string)} */ (
        Error);
    error = new constr(message);
    error.name = ABORT_ERR_NAME;
    error.code = ABORT_ERR_CODE;
  }
  return error;
}


/**
 * Resolves the activity result as a promise:
 *  - `OK` result is yielded as the promise's payload;
 *  - `CANCEL` result is rejected with the `AbortError`;
 *  - `FAILED` result is rejected with the embedded error.
 *
 * @param {!Window} win
 * @param {!ActivityResult} result
 * @param {function((!ActivityResult|!Promise))} resolver
 */
function resolveResult(win, result, resolver) {
  if (result.ok) {
    resolver(result);
  } else {
    const error = result.error || createAbortError(win);
    error.activityResult = result;
    resolver(Promise.reject(error));
  }
}



/**
 * The `ActivityPort` implementation for the iframe case. Unlike other types
 * of activities, iframe-based activities are always connected and can react
 * to size requests.
 *
 * @implements {ActivityPort}
 */
class ActivityIframePort {

  /**
   * @param {!HTMLIFrameElement} iframe
   * @param {string} url
   * @param {?Object=} opt_args
   */
  constructor(iframe, url, opt_args) {
    /** @private @const {!HTMLIFrameElement} */
    this.iframe_ = iframe;
    /** @private @const {string} */
    this.url_ = url;
    /** @private @const {?Object} */
    this.args_ = opt_args || null;

    /** @private @const {!Window} */
    this.win_ = /** @type {!Window} */ (this.iframe_.ownerDocument.defaultView);

    /** @private @const {string} */
    this.targetOrigin_ = getOriginFromUrl(url);

    /** @private {boolean} */
    this.connected_ = false;

    /** @private {?function()} */
    this.connectedResolver_ = null;

    /** @private @const {!Promise} */
    this.connectedPromise_ = new Promise(resolve => {
      this.connectedResolver_ = resolve;
    });

    /** @private {?function()} */
    this.readyResolver_ = null;

    /** @private @const {!Promise} */
    this.readyPromise_ = new Promise(resolve => {
      this.readyResolver_ = resolve;
    });

    /** @private {?function((!ActivityResult|!Promise))} */
    this.resultResolver_ = null;

    /** @private @const {!Promise<!ActivityResult>} */
    this.resultPromise_ = new Promise(resolve => {
      this.resultResolver_ = resolve;
    });

    /** @private {?function(number)} */
    this.onResizeRequest_ = null;

    /** @private {?number} */
    this.requestedHeight_ = null;

    /** @private @const {!Messenger} */
    this.messenger_ = new Messenger(
        this.win_,
        () => this.iframe_.contentWindow,
        this.targetOrigin_);
  }

  /** @override */
  getMode() {
    return ActivityMode.IFRAME;
  }

  /**
   * Waits until the activity port is connected to the host.
   * @return {!Promise}
   */
  connect() {
    if (!this.win_.document.documentElement.contains(this.iframe_)) {
      throw new Error('iframe must be in DOM');
    }
    this.messenger_.connect(this.handleCommand_.bind(this));
    this.iframe_.src = this.url_;
    return this.connectedPromise_;
  }

  /**
   * Disconnect the activity binding and cleanup listeners.
   */
  disconnect() {
    this.connected_ = false;
    this.messenger_.disconnect();
  }

  /** @override */
  acceptResult() {
    return this.resultPromise_;
  }

  /**
   * Sends a message to the host.
   * @param {!Object} payload
   */
  message(payload) {
    this.messenger_.customMessage(payload);
  }

  /**
   * Registers a callback to receive messages from the host.
   * @param {function(!Object)} callback
   */
  onMessage(callback) {
    this.messenger_.onCustomMessage(callback);
  }

  /**
   * Creates a new communication channel or returns an existing one.
   * @param {string=} opt_name
   * @return {!Promise<!MessagePort>}
   */
  messageChannel(opt_name) {
    return this.messenger_.askChannel(opt_name);
  }

  /**
   * Returns a promise that yields when the iframe is ready to be interacted
   * with.
   * @return {!Promise}
   */
  whenReady() {
    return this.readyPromise_;
  }

  /**
   * Register a callback to handle resize requests. Once successfully resized,
   * ensure to call `resized()` method.
   * @param {function(number)} callback
   */
  onResizeRequest(callback) {
    this.onResizeRequest_ = callback;
    Promise.resolve().then(() => {
      if (this.requestedHeight_ != null) {
        callback(this.requestedHeight_);
      }
    });
  }

  /**
   * Signals back to the activity implementation that the client has updated
   * the activity's size.
   */
  resized() {
    if (!this.connected_) {
      return;
    }
    const height = this.iframe_.offsetHeight;
    this.messenger_.sendCommand('resized', {'height': height});
  }

  /**
   * @param {string} cmd
   * @param {?Object} payload
   * @private
   */
  handleCommand_(cmd, payload) {
    if (cmd == 'connect') {
      // First ever message. Indicates that the receiver is listening.
      this.connected_ = true;
      this.messenger_.sendStartCommand(this.args_);
      this.connectedResolver_();
    } else if (cmd == 'result') {
      // The last message. Indicates that the result has been received.
      if (this.resultResolver_) {
        const code = /** @type {!ActivityResultCode} */ (payload['code']);
        const data =
            code == ActivityResultCode.FAILED ?
            new Error(payload['data'] || '') :
            payload['data'];
        const result = new ActivityResult(
            code,
            data,
            ActivityMode.IFRAME,
            this.messenger_.getTargetOrigin(),
            /* originVerified */ true,
            /* secureChannel */ true);
        resolveResult(this.win_, result, this.resultResolver_);
        this.resultResolver_ = null;
        this.messenger_.sendCommand('close');
        this.disconnect();
      }
    } else if (cmd == 'ready') {
      if (this.readyResolver_) {
        this.readyResolver_();
        this.readyResolver_ = null;
      }
    } else if (cmd == 'resize') {
      this.requestedHeight_ = /** @type {number} */ (payload['height']);
      if (this.onResizeRequest_) {
        this.onResizeRequest_(this.requestedHeight_);
      }
    }
  }
}



/**
 * The `ActivityPort` implementation for the standalone window activity
 * client executed as a popup.
 *
 * @implements {ActivityPort}
 */
class ActivityWindowPort {

  /**
   * @param {!Window} win
   * @param {string} requestId
   * @param {string} url
   * @param {string} target
   * @param {?Object=} opt_args
   * @param {?ActivityOpenOptions=} opt_options
   */
  constructor(win, requestId, url, target, opt_args, opt_options) {
    const isValidTarget =
        target &&
        (target == '_blank' || target == '_top' || target[0] != '_');
    if (!isValidTarget) {
      throw new Error('The only allowed targets are "_blank", "_top"' +
          ' and name targets');
    }

    /** @private @const {!Window} */
    this.win_ = win;
    /** @private @const {string} */
    this.requestId_ = requestId;
    /** @private @const {string} */
    this.url_ = url;
    /** @private @const {string} */
    this.openTarget_ = target;
    /** @private @const {?Object} */
    this.args_ = opt_args || null;
    /** @private @const {?ActivityOpenOptions} */
    this.options_ = opt_options || null;

    /** @private {?function((!ActivityResult|!Promise))} */
    this.resultResolver_ = null;

    /** @private @const {!Promise<!ActivityResult>} */
    this.resultPromise_ = new Promise(resolve => {
      this.resultResolver_ = resolve;
    });

    /** @private {?Window} */
    this.targetWin_ = null;

    /** @private {?number} */
    this.heartbeatInterval_ = null;

    /** @private {?Messenger} */
    this.messenger_ = null;
  }

  /** @override */
  getMode() {
    return this.openTarget_ == '_top' ?
        ActivityMode.REDIRECT :
        ActivityMode.POPUP;
  }

  /**
   * Opens the activity in a window, either as a popup or via redirect.
   *
   * Returns the promise that will yield when the window returns or closed.
   * Notice, that this promise may never complete if "redirect" mode was used.
   *
   * @return {!Promise}
   */
  open() {
    return this.openInternal_();
  }

  /**
   * @return {?Window}
   */
  getTargetWin() {
    return this.targetWin_;
  }

  /**
   * Disconnect the activity binding and cleanup listeners.
   */
  disconnect() {
    if (this.heartbeatInterval_) {
      this.win_.clearInterval(this.heartbeatInterval_);
      this.heartbeatInterval_ = null;
    }
    if (this.messenger_) {
      this.messenger_.disconnect();
      this.messenger_ = null;
    }
    if (this.targetWin_) {
      // Try to close the popup window. The host will also try to do the same.
      try {
        this.targetWin_.close();
      } catch (e) {
        // Ignore.
      }
      this.targetWin_ = null;
    }
    this.resultResolver_ = null;
  }

  /** @override */
  acceptResult() {
    return this.resultPromise_;
  }

  /**
   * This method wraps around window's open method. It first tries to execute
   * `open` call with the provided target and if it fails, it retries the call
   * with the `_top` target. This is necessary given that in some embedding
   * scenarios, such as iOS' WKWebView, navigation to `_blank` and other targets
   * is blocked by default.
   * @return {!Promise}
   * @private
   */
  openInternal_() {
    const featuresStr = this.buildFeatures_();

    // Protectively, the URL will contain the request payload, unless explicitly
    // directed not to via `skipRequestInUrl` option.
    let url = this.url_;
    if (!(this.options_ && this.options_.skipRequestInUrl)) {
      const returnUrl =
          this.options_ && this.options_.returnUrl ||
          removeFragment(this.win_.location.href);
      const requestString = serializeRequest({
        requestId: this.requestId_,
        returnUrl,
        args: this.args_,
      });
      url = addFragmentParam(url, '__WA__', requestString);
    }

    // Open the window.
    // Try first with the specified target. If we're inside the WKWebView or
    // a similar environments, this method is expected to fail by default for
    // all targets except `_top`.
    let targetWin;
    let openTarget = this.openTarget_;
    try {
      targetWin = this.win_.open(url, openTarget, featuresStr);
    } catch (e) {
      // Ignore.
    }
    // Then try with `_top` target.
    if (!targetWin && openTarget != '_top') {
      openTarget = '_top';
      try {
        targetWin = this.win_.open(url, openTarget);
      } catch (e) {
        // Ignore.
      }
    }

    // Setup the target window.
    if (targetWin) {
      this.targetWin_ = targetWin;
      if (openTarget != '_top') {
        this.setupPopup_();
      }
    } else {
      this.disconnectWithError_(new Error('failed to open window'));
    }

    // Return result promise, even though it may never complete.
    return this.resultPromise_.catch(() => {
      // Ignore. Call to the `acceptResult()` should fail if needed.
    });
  }

  /**
   * @return {string}
   * @private
   */
  buildFeatures_() {
    const screen = this.win_.screen;
    let w = Math.floor(Math.min(600, screen.width * 0.9));
    let h = Math.floor(Math.min(600, screen.height * 0.9));
    if (this.options_) {
      if (this.options_.width) {
        w = Math.min(this.options_.width, screen.width);
      }
      if (this.options_.height) {
        h = Math.min(this.options_.height, screen.height);
      }
    }
    const x = Math.floor((screen.width - w) / 2);
    const y = Math.floor((screen.height - h) / 2);
    const features = {
      'height': h,
      'width': w,
      'resizable': 'yes',
      'scrollbars': 'yes',
    };
    // Do not set left/top in Edge: it fails.
    const nav = this.win_.navigator;
    if (!/Edge/i.test(nav && nav.userAgent)) {
      features['left'] = x;
      features['top'] = y;
    }
    let featuresStr = '';
    for (const f in features) {
      if (featuresStr) {
        featuresStr += ',';
      }
      featuresStr += `${f}=${features[f]}`;
    }
    return featuresStr;
  }

  /** @private */
  setupPopup_() {
    // Keep alive to catch the window closing, which would indicate
    // "cancel" signal.
    this.heartbeatInterval_ = this.win_.setInterval(() => {
      this.check_(/* delayCancel */ true);
    }, 500);

    // Start up messaging. The messaging is explicitly allowed to proceed
    // without origin check b/c all arguments have already been passed in
    // the URL and special handling is enforced when result is delivered.
    this.messenger_ = new Messenger(
        this.win_,
        /** @type {!Window} */ (this.targetWin_),
        /* targetOrigin */ null);
    this.messenger_.connect(this.handleCommand_.bind(this));
  }

  /**
   * @param {boolean=} opt_delayCancel
   * @private
   */
  check_(opt_delayCancel) {
    if (!this.targetWin_ || this.targetWin_.closed) {
      this.win_.clearInterval(this.heartbeatInterval_);
      this.heartbeatInterval_ = null;
      // Give a chance for the result to arrive, but otherwise consider the
      // responce to be empty.
      this.win_.setTimeout(() => {
        try {
          this.result_(ActivityResultCode.CANCELED, /* data */ null);
        } catch (e) {
          this.disconnectWithError_(e);
        }
      }, opt_delayCancel ? 3000 : 0);
    }
  }

  /**
   * @param {!Error} reason
   * @private
   */
  disconnectWithError_(reason) {
    if (this.resultResolver_) {
      this.resultResolver_(Promise.reject(reason));
    }
    this.disconnect();
  }

  /**
   * @param {!ActivityResultCode} code
   * @param {*} data
   * @private
   */
  result_(code, data) {
    if (this.resultResolver_) {
      const isConnected = this.messenger_.isConnected();
      const result = new ActivityResult(
          code,
          data,
          ActivityMode.POPUP,
          isConnected ?
              this.messenger_.getTargetOrigin() :
              getOriginFromUrl(this.url_),
          /* originVerified */ isConnected,
          /* secureChannel */ isConnected);
      resolveResult(this.win_, result, this.resultResolver_);
      this.resultResolver_ = null;
    }
    if (this.messenger_) {
      this.messenger_.sendCommand('close');
    }
    this.disconnect();
  }

  /**
   * @param {string} cmd
   * @param {?Object} payload
   * @private
   */
  handleCommand_(cmd, payload) {
    if (cmd == 'connect') {
      // First ever message. Indicates that the receiver is listening.
      this.messenger_.sendStartCommand(this.args_);
    } else if (cmd == 'result') {
      // The last message. Indicates that the result has been received.
      const code = /** @type {!ActivityResultCode} */ (payload['code']);
      const data =
          code == ActivityResultCode.FAILED ?
          new Error(payload['data'] || '') :
          payload['data'];
      this.result_(code, data);
    } else if (cmd == 'check') {
      this.win_.setTimeout(() => this.check_(), 200);
    }
  }
}


/**
 * @param {!Window} win
 * @param {string} fragment
 * @param {string} requestId
 * @return {?ActivityPort}
 */
function discoverRedirectPort(win, fragment, requestId) {
  // Try to find the result in the fragment.
  const paramName = '__WA_RES__';
  const fragmentParam = getQueryParam(fragment, paramName);
  if (!fragmentParam) {
    return null;
  }
  const response = /** @type {?Object} */ (JSON.parse(
      decodeURIComponent(fragmentParam)));
  if (!response || response['requestId'] != requestId) {
    return null;
  }

  // Remove the found param from the fragment.
  const cleanFragment = removeQueryParam(win.location.hash, paramName) || '';
  if (cleanFragment != win.location.hash) {
    if (win.history && win.history.replaceState) {
      try {
        win.history.replaceState(win.history.state, '', cleanFragment);
      } catch (e) {
        // Ignore.
      }
    }
  }

  const code = response['code'];
  const data = response['data'];
  const origin = response['origin'];
  const referrerOrigin = win.document.referrer &&
      getOriginFromUrl(win.document.referrer);
  const originVerified = origin == referrerOrigin;
  return new ActivityWindowRedirectPort(
      win,
      code,
      data,
      origin,
      originVerified);
}


/**
 * The `ActivityPort` implementation for the standalone window activity
 * client executed as a popup.
 *
 * @implements {ActivityPort}
 */
class ActivityWindowRedirectPort {

  /**
   * @param {!Window} win
   * @param {!ActivityResultCode} code
   * @param {*} data
   * @param {string} targetOrigin
   * @param {boolean} targetOriginVerified
   */
  constructor(win, code, data, targetOrigin, targetOriginVerified) {
    /** @private @const {!Window} */
    this.win_ = win;
    /** @private @const {!ActivityResultCode} */
    this.code_ = code;
    /** @private @const {*} */
    this.data_ = data;
    /** @private {string} */
    this.targetOrigin_ = targetOrigin;
    /** @private {boolean} */
    this.targetOriginVerified_ = targetOriginVerified;
  }

  /** @override */
  getMode() {
    return ActivityMode.REDIRECT;
  }

  /** @override */
  acceptResult() {
    const result = new ActivityResult(
        this.code_,
        this.data_,
        ActivityMode.REDIRECT,
        this.targetOrigin_,
        this.targetOriginVerified_,
        /* secureChannel */ false);
    return new Promise(resolve => {
      resolveResult(this.win_, result, resolve);
    });
  }
}



/**
 * The page-level activities manager ports. This class is intended to be used
 * as a singleton. It can start activities of all modes: iframe, popup, and
 * redirect.
 */
class ActivityPorts {

  /**
   * @param {!Window} win
   */
  constructor(win) {
    /** @const {string} */
    this.version = '1.8';

    /** @private @const {!Window} */
    this.win_ = win;

    /** @private @const {string} */
    this.fragment_ = win.location.hash;

    /**
     * @private @const {!Object<string, !Array<function(!ActivityPort)>>}
     */
    this.requestHandlers_ = {};

    /**
     * The result buffer is indexed by `requestId`.
     * @private @const {!Object<string, !ActivityPort>}
     */
    this.resultBuffer_ = {};
  }

  /**
   * Start an activity within the specified iframe.
   * @param {!HTMLIFrameElement} iframe
   * @param {string} url
   * @param {?Object=} opt_args
   * @return {!Promise<!ActivityIframePort>}
   */
  openIframe(iframe, url, opt_args) {
    const port = new ActivityIframePort(iframe, url, opt_args);
    return port.connect().then(() => port);
  }

  /**
   * Start an activity in a separate window. The result will be delivered
   * to the `onResult` callback.
   *
   * The activity can be opened in two modes: "popup" and "redirect". This
   * depends on the `target` value, but also on the browser/environment.
   *
   * The allowed `target` values are `_blank`, `_top` and name targets. The
   * `_self`, `_parent` and similar targets are not allowed.
   *
   * The `_top` target indicates that the activity should be opened as a
   * "redirect", while other targets indicate that the activity should be
   * opened as a popup. The activity client will try to honor the requested
   * target. However, it's not always possible. Some environments do not
   * allow popups and they either force redirect or fail the window open
   * request. In this case, the activity will try to fallback to the "redirect"
   * mode.
   *
   * @param {string} requestId
   * @param {string} url
   * @param {string} target
   * @param {?Object=} opt_args
   * @param {?ActivityOpenOptions=} opt_options
   * @return {{targetWin: ?Window}}
   */
  open(requestId, url, target, opt_args, opt_options) {
    const port = new ActivityWindowPort(
        this.win_, requestId, url, target, opt_args, opt_options);
    port.open().then(() => {
      // Await result if possible. Notice that when falling back to "redirect",
      // the result will never arrive through this port.
      this.consumeResultAll_(requestId, port);
    });
    return {targetWin: port.getTargetWin()};
  }

  /**
   * Registers the callback for the result of the activity opened with the
   * specified `requestId` (see the `open()` method). The callback is a
   * function that takes a single `ActivityPort` argument. The client
   * can use this object to verify the port using it's origin, verified and
   * secure channel flags. Then the client can call
   * `ActivityPort.acceptResult()` method to accept the result.
   *
   * The activity result is handled via a separate callback because of a
   * possible redirect. So use of direct callbacks and/or promises is not
   * possible in that case.
   *
   * A typical implementation would look like:
   * ```
   * ports.onResult('request1', function(port) {
   *   port.acceptResult().then(function(result) {
   *     // Only verified origins are allowed.
   *     if (result.origin == expectedOrigin &&
   *         result.originVerified &&
   *         result.secureChannel) {
   *       handleResultForRequest1(result);
   *     }
   *   });
   * })
   *
   * ports.open('request1', request1Url, '_blank');
   * ```
   *
   * @param {string} requestId
   * @param {function(!ActivityPort)} callback
   */
  onResult(requestId, callback) {
    let handlers = this.requestHandlers_[requestId];
    if (!handlers) {
      handlers = [];
      this.requestHandlers_[requestId] = handlers;
    }
    handlers.push(callback);

    // Consume available result.
    const availableResult = this.discoverResult_(requestId);
    if (availableResult) {
      this.consumeResult_(availableResult, callback);
    }
  }

  /**
   * @param {string} requestId
   * @return {?ActivityPort}
   * @private
   */
  discoverResult_(requestId) {
    let port = this.resultBuffer_[requestId];
    if (!port && this.fragment_) {
      port = discoverRedirectPort(
          this.win_, this.fragment_, requestId);
      if (port) {
        this.resultBuffer_[requestId] = port;
      }
    }
    return port;
  }

  /**
   * @param {!ActivityPort} port
   * @param {function(!ActivityPort)} callback
   * @private
   */
  consumeResult_(port, callback) {
    Promise.resolve().then(() => {
      callback(port);
    });
  }

  /**
   * @param {string} requestId
   * @param {!ActivityPort} port
   * @private
   */
  consumeResultAll_(requestId, port) {
    // Find and execute handlers.
    const handlers = this.requestHandlers_[requestId];
    if (handlers) {
      handlers.forEach(handler => {
        this.consumeResult_(port, handler);
      });
    }
    // Buffer the result for callbacks that may arrive in the future.
    this.resultBuffer_[requestId] = port;
  }
}



module.exports = {
  ActivityPorts,
  ActivityIframePort,
  ActivityMode,
  ActivityOpenOptions,
  ActivityPort,
  ActivityResult,
  ActivityResultCode,
  ActivityWindowPort,
};

},{}],5:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The holder of the entitlements for a service.
 */

var Entitlements = (function () {

  /**
   * @param {string} service
   * @param {string} raw
   * @param {!Array<!Entitlement>} entitlements
   * @param {?string} currentProduct
   * @param {function(!Entitlements)} ackHandler
   */

  function Entitlements(service, raw, entitlements, currentProduct, ackHandler) {
    babelHelpers.classCallCheck(this, Entitlements);

    /** @const {string} */
    this.service = service;
    /** @const {string} */
    this.raw = raw;
    /** @const {!Array<!Entitlement>} */
    this.entitlements = entitlements;

    /** @private @const {?string} */
    this.product_ = currentProduct;
    /** @private @const {function(!Entitlements)} */
    this.ackHandler_ = ackHandler;
  }

  /**
   * The single entitlement object.
   */

  /**
   * @return {!Entitlements}
   */

  Entitlements.prototype.clone = function clone() {
    return new Entitlements(this.service, this.raw, this.entitlements.map(function (ent) {
      return ent.clone();
    }), this.product_, this.ackHandler_);
  };

  /**
   * @return {!Object}
   */

  Entitlements.prototype.json = function json() {
    return {
      'service': this.service,
      'entitlements': this.entitlements.map(function (item) {
        return item.json();
      })
    };
  };

  /**
   * @return {boolean}
   */

  Entitlements.prototype.enablesThis = function enablesThis() {
    return this.enables(this.product_);
  };

  /**
   * @return {boolean}
   */

  Entitlements.prototype.enablesAny = function enablesAny() {
    for (var i = 0; i < this.entitlements.length; i++) {
      if (this.entitlements[i].products.length > 0) {
        return true;
      }
    }
    return false;
  };

  /**
   * @param {?string} product
   * @return {boolean}
   */

  Entitlements.prototype.enables = function enables(product) {
    if (!product) {
      return false;
    }
    return !!this.getEntitlementFor(product);
  };

  /**
   * @return {?Entitlement}
   */

  Entitlements.prototype.getEntitlementForThis = function getEntitlementForThis() {
    return this.getEntitlementFor(this.product_);
  };

  /**
   * @param {?string} product
   * @return {?Entitlement}
   */

  Entitlements.prototype.getEntitlementFor = function getEntitlementFor(product) {
    if (product && this.entitlements.length > 0) {
      for (var i = 0; i < this.entitlements.length; i++) {
        if (this.entitlements[i].enables(product)) {
          return this.entitlements[i];
        }
      }
    }
    return null;
  };

  /**
   * A 3p site should call this method to acknowledge that it "saw" and
   * "understood" entitlements.
   */

  Entitlements.prototype.ack = function ack() {
    this.ackHandler_(this);
  };

  return Entitlements;
})();

exports.Entitlements = Entitlements;

var Entitlement = (function () {

  /**
   * @param {string} source
   * @param {!Array<string>} products
   * @param {string} subscriptionToken
   */

  function Entitlement(source, products, subscriptionToken) {
    babelHelpers.classCallCheck(this, Entitlement);

    /** @const {string} */
    this.source = source;
    /** @const {!Array<string>} */
    this.products = products;
    /** @const {string} */
    this.subscriptionToken = subscriptionToken;
  }

  /**
   * @return {!Entitlement}
   */

  Entitlement.prototype.clone = function clone() {
    return new Entitlement(this.source, this.products.slice(0), this.subscriptionToken);
  };

  /**
   * @return {!Object}
   */

  Entitlement.prototype.json = function json() {
    return {
      'source': this.source,
      'products': this.products,
      'subscriptionToken': this.subscriptionToken
    };
  };

  /**
   * @param {?string} product
   * @return {boolean}
   */

  Entitlement.prototype.enables = function enables(product) {
    if (!product) {
      return false;
    }
    return this.products.includes(product);
  };

  /**
   * @param {?Object} json
   * @return {!Entitlement}
   */

  Entitlement.parseFromJson = function parseFromJson(json) {
    if (!json) {
      json = {};
    }
    var source = json['source'] || '';
    var products = json['products'] || [];
    var subscriptionToken = json['subscriptionToken'];
    return new Entitlement(source, products, subscriptionToken);
  };

  /**
   * The JSON is expected in one of the forms:
   * - Single entitlement: `{products: [], ...}`.
   * - A list of entitlements: `[{products: [], ...}, {...}]`.
   * @param {!Object|!Array<!Object>} json
   * @return {!Array<!Entitlement>}
   */

  Entitlement.parseListFromJson = function parseListFromJson(json) {
    var jsonList = Array.isArray(json) ?
    /** @type {!Array<Object>} */json : [json];
    return jsonList.map(function (json) {
      return Entitlement.parseFromJson(json);
    });
  };

  return Entitlement;
})();

exports.Entitlement = Entitlement;

},{}],6:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 */

var Offer =

/**
 * @param {string} skuId
 * @param {string} title
 * @param {string} description
 * @param {string} price
 */
function Offer(skuId, title, description, price) {
  babelHelpers.classCallCheck(this, Offer);

  /** @const {string} */
  this.skuId = skuId;
  /** @const {string} */
  this.title = title;
  /** @const {string} */
  this.description = description;
  /** @const {string} */
  this.price = price;
};

exports.Offer = Offer;

},{}],7:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _userData = require('./user-data');

/**
 */

var SubscribeResponse = (function () {

  /**
   * @param {string} raw
   * @param {!PurchaseData} purchaseData
   * @param {?UserData} userData
   * @param {function():!Promise} completeHandler
   */

  function SubscribeResponse(raw, purchaseData, userData, completeHandler) {
    babelHelpers.classCallCheck(this, SubscribeResponse);

    /** @const {string} */
    this.raw = raw;
    /** @const {!PurchaseData} */
    this.purchaseData = purchaseData;
    /** @const {?UserData} */
    this.userData = userData;
    /** @private @const {function():!Promise} */
    this.completeHandler_ = completeHandler;
  }

  /**
   */

  /**
   * @return {!SubscribeResponse}
   */

  SubscribeResponse.prototype.clone = function clone() {
    return new SubscribeResponse(this.raw, this.purchaseData, this.userData, this.completeHandler_);
  };

  /**
   * @return {!Object}
   */

  SubscribeResponse.prototype.json = function json() {
    return {
      'purchaseData': this.purchaseData.json(),
      'userData': this.userData ? this.userData.json() : null
    };
  };

  /**
   * Allows the receiving site to complete/acknowledge that it registered
   * the subscription purchase. The typical action would be to create an
   * account (or match an existing one) and associated the purchase with
   * that account.
   *
   * SwG will display progress indicator until this method is called and
   * upon receiving this call will show the confirmation to the user.
   * The promise returned by this method will yield once the user closes
   * the confirmation.
   *
   * @return {!Promise}
   */

  SubscribeResponse.prototype.complete = function complete() {
    return this.completeHandler_();
  };

  return SubscribeResponse;
})();

exports.SubscribeResponse = SubscribeResponse;

var PurchaseData = (function () {

  /**
   * @param {string} raw
   * @param {string} signature
   */

  function PurchaseData(raw, signature) {
    babelHelpers.classCallCheck(this, PurchaseData);

    /** @const {string} */
    this.raw = raw;
    /** @const {string} */
    this.signature = signature;
  }

  /**
   * @return {!PurchaseData}
   */

  PurchaseData.prototype.clone = function clone() {
    return new PurchaseData(this.raw, this.signature);
  };

  /**
   * @return {!Object}
   */

  PurchaseData.prototype.json = function json() {
    return {};
  };

  return PurchaseData;
})();

exports.PurchaseData = PurchaseData;

},{"./user-data":9}],8:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _entitlements = require('./entitlements');

var _offer = require('./offer');

var _subscribeResponse = require('./subscribe-response');

/**
 * @interface
 */

var Subscriptions = (function () {
  function Subscriptions() {
    babelHelpers.classCallCheck(this, Subscriptions);
  }

  /** @enum {string} */

  /**
   * Optionally initializes the subscriptions runtime with publication or
   * product ID. If not called, the runtime will look for the initialization
   * parameters in the page's markup.
   * @param {string} productOrPublicationId
   */

  Subscriptions.prototype.init = function init(productOrPublicationId) {};

  /**
   * Starts the entitlement flow.
   */

  Subscriptions.prototype.start = function start() {};

  /**
   * Resets the entitlements that can be fetched again.
   */

  Subscriptions.prototype.reset = function reset() {};

  /**
   * @return {!Promise<!Entitlements>}
   */

  Subscriptions.prototype.getEntitlements = function getEntitlements() {};

  /**
   * Set the subscribe callback.
   * @param {function(!Promise<!Entitlements>)} callback
   */

  Subscriptions.prototype.setOnEntitlementsResponse = function setOnEntitlementsResponse(callback) {};

  /**
   * Returns a set of offers.
   * @param {{
   *   productId: (string|undefined),
   * }=} opt_options
   * @return {!Promise<!Array<!Offer>>}
   */

  Subscriptions.prototype.getOffers = function getOffers(opt_options) {};

  /**
   * Starts the Offers flow.
   * @param {!OptionsRequest=} opt_options
   */

  Subscriptions.prototype.showOffers = function showOffers(opt_options) {};

  /**
   * Show subscription option.
   * @param {!OptionsRequest=} opt_options
   */

  Subscriptions.prototype.showSubscribeOption = function showSubscribeOption(opt_options) {};

  /**
   * Show abbreviated offers.
   * @param {!OptionsRequest=} opt_options
   */

  Subscriptions.prototype.showAbbrvOffer = function showAbbrvOffer(opt_options) {};

  /**
   * Set the callback for the native subscribe request. Setting this callback
   * triggers the "native" option in the offers flow.
   * @param {function()} callback
   */

  Subscriptions.prototype.setOnNativeSubscribeRequest = function setOnNativeSubscribeRequest(callback) {};

  /**
   * Set the subscribe complete callback.
   * @param {function(!Promise<!SubscribeResponse>)} callback
   */

  Subscriptions.prototype.setOnSubscribeResponse = function setOnSubscribeResponse(callback) {};

  /**
   * Starts subscription purchase flow.
   * @param {string} sku
   */

  Subscriptions.prototype.subscribe = function subscribe(sku) {};

  /**
   * @param {function(!LoginRequest)} callback
   */

  Subscriptions.prototype.setOnLoginRequest = function setOnLoginRequest(callback) {};

  /**
   * @param {function()} callback
   */

  Subscriptions.prototype.setOnLinkComplete = function setOnLinkComplete(callback) {};

  /**
   * Starts the Account linking flow.
   * TODO(dparikh): decide if it's only exposed for testing or PROD purposes.
   */

  Subscriptions.prototype.linkAccount = function linkAccount() {};

  /**
   * Notifies the client that a flow has been started. The name of the flow
   * is passed as the callback argument. The flow name corresponds to the
   * method name in this interface, such as "showOffers", or "subscribe".
   * See `SubscriptionFlows` for the full list.
   *
   * Also see `setOnFlowCanceled` method.
   *
   * @param {function({flow: string})} callback
   */

  Subscriptions.prototype.setOnFlowStarted = function setOnFlowStarted(callback) {};

  /**
   * Notifies the client that a flow has been canceled. The name of the flow
   * is passed as the callback argument. The flow name corresponds to the
   * method name in this interface, such as "showOffers", or "subscribe".
   * See `SubscriptionFlows` for the full list.
   *
   * Notice that some of the flows, such as "subscribe", could additionally
   * have their own "cancel" events.
   *
   * Also see `setOnFlowStarted` method.
   *
   * @param {function({flow: string})} callback
   */

  Subscriptions.prototype.setOnFlowCanceled = function setOnFlowCanceled(callback) {};

  return Subscriptions;
})();

exports.Subscriptions = Subscriptions;
var SubscriptionFlows = {
  SHOW_OFFERS: 'showOffers',
  SHOW_SUBSCRIBE_OPTION: 'showSubscribeOption',
  SHOW_ABBRV_OFFER: 'showAbbrvOffer',
  SUBSCRIBE: 'subscribe',
  LINK_ACCOUNT: 'linkAccount'
};

exports.SubscriptionFlows = SubscriptionFlows;
/**
 * Properties:
 * - skus - a list of SKUs to return from the defined or default list. The
 *   order is preserved.
 * - list - a predefined list of SKUs. Use of this property is uncommon.
 *   Possible values are "default" and "amp". Default is "default".
 *
 * @typedef {{
 *   skus: (!Array<string>|undefined),
 *   list: (string|undefined),
 * }}
 */
var OptionsRequest = undefined;

exports.OptionsRequest = OptionsRequest;
/**
 * @typedef {{
 *   linkRequested: boolean,
 * }}
 */
var LoginRequest = undefined;
exports.LoginRequest = LoginRequest;

},{"./entitlements":5,"./offer":6,"./subscribe-response":7}],9:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 */

var UserData = (function () {

  /**
   * @param {string} idToken
   * @param {!Object} data
   */

  function UserData(idToken, data) {
    babelHelpers.classCallCheck(this, UserData);

    /** @const {string} */
    this.idToken = idToken;
    /** @private @const {!Object} */
    this.data = data;

    /** @const {string} */
    this.id = data['sub'];
    /** @const {string} */
    this.email = data['email'];
    /** @const {boolean} */
    this.emailVerified = data['email_verified'];
    /** @const {string} */
    this.name = data['name'];
    /** @const {string} */
    this.givenName = data['given_name'];
    /** @const {string} */
    this.familyName = data['family_name'];
    /** @const {string} */
    this.pictureUrl = data['picture'];
  }

  /**
   * @return {!UserData}
   */

  UserData.prototype.clone = function clone() {
    return new UserData(this.idToken, this.data);
  };

  /**
   * @return {!Object}
   */

  UserData.prototype.json = function json() {
    return {
      'id': this.id,
      'email': this.email,
      'emailVerified': this.emailVerified,
      'name': this.name,
      'givenName': this.givenName,
      'familyName': this.familyName,
      'pictureUrl': this.pictureUrl
    };
  };

  return UserData;
})();

exports.UserData = UserData;

},{}],10:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _dialog = require('./dialog');

var _graypane = require('./graypane');

var _utilsErrors = require('../utils/errors');

var POPUP_Z_INDEX = 2147483647;

/**
 * The class for the top level dialog.
 * @final
 */

var DialogManager = (function () {

  /**
   * @param {!../model/doc.Doc} doc
   */

  function DialogManager(doc) {
    var _this = this;

    babelHelpers.classCallCheck(this, DialogManager);

    /** @private @const {!../model/doc.Doc} */
    this.doc_ = doc;

    /** @private {?Dialog} */
    this.dialog_ = null;

    /** @private {?Promise<!Dialog>} */
    this.openPromise_ = null;

    /** @private @const {!Graypane} */
    this.popupGraypane_ = new _graypane.Graypane(doc, POPUP_Z_INDEX);

    /** @private {?Window} */
    this.popupWin_ = null;

    this.popupGraypane_.getElement().addEventListener('click', function () {
      if (_this.popupWin_) {
        try {
          _this.popupWin_.focus();
        } catch (e) {
          // Ignore error.
        }
      }
    });
  }

  /**
   * @return {!Promise<!Dialog>}
   */

  DialogManager.prototype.openDialog = function openDialog() {
    if (!this.openPromise_) {
      this.dialog_ = new _dialog.Dialog(this.doc_);
      this.openPromise_ = this.dialog_.open();
    }
    return this.openPromise_;
  };

  /**
   * @param {!./view.View} view
   * @return {!Promise}
   */

  DialogManager.prototype.openView = function openView(view) {
    var _this2 = this;

    view.whenComplete()['catch'](function (reason) {
      if (_utilsErrors.isCancelError(reason)) {
        _this2.completeView(view);
      }
      throw reason;
    });
    return this.openDialog().then(function (dialog) {
      return dialog.openView(view);
    });
  };

  /**
   * @param {?./view.View} view
   */

  DialogManager.prototype.completeView = function completeView(view) {
    var _this3 = this;

    // Give a small amount of time for another view to take over the dialog.
    setTimeout(function () {
      if (_this3.dialog_ && _this3.dialog_.getCurrentView() == view) {
        _this3.close_();
      }
    }, 100);
  };

  /**
   */

  DialogManager.prototype.completeAll = function completeAll() {
    if (this.dialog_) {
      this.close_();
    }
    if (this.popupGraypane_.isAttached()) {
      this.popupGraypane_.destroy();
    }
  };

  /** @private */

  DialogManager.prototype.close_ = function close_() {
    this.dialog_.close();
    this.dialog_ = null;
    this.openPromise_ = null;
  };

  /**
   * @param {?Window|undefined} targetWin
   */

  DialogManager.prototype.popupOpened = function popupOpened(targetWin) {
    this.popupWin_ = targetWin || null;
    if (!this.popupGraypane_.isAttached()) {
      this.popupGraypane_.attach();
    }
    this.popupGraypane_.show();
  };

  /**
   */

  DialogManager.prototype.popupClosed = function popupClosed() {
    this.popupWin_ = null;
    try {
      this.popupGraypane_.hide();
    } catch (e) {
      // Ignore.
    }
  };

  return DialogManager;
})();

exports.DialogManager = DialogManager;

},{"../utils/errors":46,"./dialog":11,"./graypane":13}],11:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _buildCssUiUiCss = require('../../build/css/ui/ui.css');

var _graypane = require('./graypane');

var _uiLoadingView = require('../ui/loading-view');

var _utilsDom = require('../utils/dom');

var _utilsStyle = require('../utils/style');

var _utilsAnimation = require('../utils/animation');

var _friendlyIframe = require('./friendly-iframe');

var Z_INDEX = 2147483647;

/**
 * Default iframe important styles.
 * Note: The iframe responsiveness media query style is injected in the
 * publisher's page since style attribute can not include media query.
 * @const {!Object<string, string|number>}
 */
var rootElementImportantStyles = {
  'min-height': '50px',
  'opacity': 1,
  'border': 'none',
  'display': 'block',
  'background-color': 'rgb(255, 255, 255)',
  'position': 'fixed',
  'z-index': Z_INDEX,
  'box-shadow': 'rgba(60, 64, 67, .3) 0 1px 1px, rgba(60, 64, 67, .15) 0 1px 4px 1px',
  'box-sizing': 'border-box'
};

/**
 * Reset view styles.
 * @const {!Object<string, string|number>}
 */
var resetViewStyles = {
  'position': 'absolute',
  'top': '0',
  'left': '0',
  'right': '0',
  'bottom': '0',
  'opacity': 0,
  /* These lines are a work around to this issue in iOS:     */
  /* https://bugs.webkit.org/show_bug.cgi?id=155198          */
  'height': 0,
  'max-height': '100%',
  'max-width': '100%',
  'min-height': '100%',
  'min-width': '100%',
  'width': 0
};

/**
 * Position of the dialog.
 * @const @enum {string}
 */
var PositionAt = {
  BOTTOM: 'BOTTOM',
  TOP: 'TOP',
  FLOAT: 'FLOAT',
  FULL: 'FULL'
};

/**
 * The class for the top level dialog.
 * @final
 */

var Dialog = (function () {

  /**
   * Create a dialog for the provided doc.
   * @param {!../model/doc.Doc} doc
   * @param {!Object<string, string|number>=} importantStyles
   * @param {!Object<string, string|number>=} styles
   */

  function Dialog(doc) {
    var importantStyles = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var styles = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    babelHelpers.classCallCheck(this, Dialog);

    /** @private @const {!../model/doc.Doc} */
    this.doc_ = doc;

    /** @private @const {!FriendlyIframe} */
    this.iframe_ = new _friendlyIframe.FriendlyIframe(doc.getWin().document, { 'class': 'swg-dialog' });

    /** @private @const {!Graypane} */
    this.graypane_ = new _graypane.Graypane(doc, Z_INDEX - 1);

    var modifiedImportantStyles = Object.assign({}, rootElementImportantStyles, importantStyles);
    _utilsStyle.setImportantStyles(this.iframe_.getElement(), modifiedImportantStyles);

    _utilsStyle.setStyles(this.iframe_.getElement(), styles);

    /** @private {LoadingView} */
    this.loadingView_ = null;

    /** @private {?Element} */
    this.container_ = null; // Depends on constructed document inside iframe.

    /** @private {?./view.View} */
    this.view_ = null;

    /** @private {?Promise} */
    this.animating_ = null;
  }

  /**
   * Opens the dialog and builds the iframe container.
   * @param {boolean=} animated
   * @return {!Promise<!Dialog>}
   */

  Dialog.prototype.open = function open() {
    var _this = this;

    var animated = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    var iframe = this.iframe_;
    if (iframe.isConnected()) {
      throw new Error('already opened');
    }

    // Attach.
    this.doc_.getBody().appendChild(iframe.getElement()); // Fires onload.
    this.graypane_.attach();

    if (animated) {
      this.animate_(function () {
        _utilsStyle.setImportantStyles(iframe.getElement(), {
          'transform': 'translateY(100%)'
        });
        return _utilsAnimation.transition(iframe.getElement(), {
          'transform': 'translateY(0)'
        }, 300, 'ease-out');
      });
    }

    return iframe.whenReady().then(function () {
      _this.buildIframe_();
      return _this;
    });
  };

  /**
   * Build the iframe with the styling after iframe is loaded.
   * @private
   */

  Dialog.prototype.buildIframe_ = function buildIframe_() {
    var iframe = this.iframe_;
    var iframeBody = iframe.getBody();
    var iframeDoc = /** @type {!HTMLDocument} */this.iframe_.getDocument();

    // Inject Google fonts in <HEAD> section of the iframe.
    _utilsDom.injectStyleSheet(iframeDoc, _buildCssUiUiCss.CSS);

    // Add Loading indicator.
    this.loadingView_ = new _uiLoadingView.LoadingView(iframeDoc);
    iframeBody.appendChild(this.loadingView_.getElement());

    // Container for all dynamic content, including 3P iframe.
    this.container_ = _utilsDom.createElement(iframeDoc, 'swg-container', {});
    iframeBody.appendChild(this.container_);
    this.setPosition_();
  };

  /**
   * Closes the dialog.
   * @param {boolean=} animated
   * @return {!Promise}
   */

  Dialog.prototype.close = function close() {
    var _this2 = this;

    var animated = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    var animating = undefined;
    if (animated) {
      animating = this.animate_(function () {
        _this2.graypane_.hide( /* animate */true);
        return _utilsAnimation.transition(_this2.getElement(), {
          'transform': 'translateY(100%)'
        }, 300, 'ease-out');
      });
    } else {
      animating = Promise.resolve();
    }
    return animating.then(function () {
      _this2.doc_.getBody().removeChild(_this2.iframe_.getElement());
      _this2.removePaddingToHtml_();
      _this2.graypane_.destroy();
    });
  };

  /**
   * Gets the container within the dialog.
   * @return {!Element}
   */

  Dialog.prototype.getContainer = function getContainer() {
    if (!this.container_) {
      throw new Error('not opened yet');
    }
    return this.container_;
  };

  /**
   * Gets the attached iframe instance.
   * @return {!FriendlyIframe}
   */

  Dialog.prototype.getIframe = function getIframe() {
    return this.iframe_;
  };

  /**
   * Gets the Iframe element.
   * @return {!HTMLIFrameElement}
   */

  Dialog.prototype.getElement = function getElement() {
    return this.iframe_.getElement();
  };

  /**
   * Whether to display loading indicator.
   * @param {boolean} isLoading
   */

  Dialog.prototype.setLoading = function setLoading(isLoading) {
    if (isLoading) {
      this.loadingView_.show();
    } else {
      this.loadingView_.hide();
    }
  };

  /** @return {?./view.View} */

  Dialog.prototype.getCurrentView = function getCurrentView() {
    return this.view_;
  };

  /**
   * Opens the given view and removes existing view from the DOM if any.
   * @param {!./view.View} view
   * @return {!Promise}
   */

  Dialog.prototype.openView = function openView(view) {
    var _this3 = this;

    if (this.view_) {
      // TODO(dparikh): Maybe I need to keep it until the new one is ready.
      _utilsDom.removeChildren(this.getContainer());
    }
    this.view_ = view;

    _utilsStyle.setImportantStyles(view.getElement(), resetViewStyles);
    this.setLoading(true);
    this.getContainer().appendChild(view.getElement());

    // If the current view should fade the parent document.
    if (view.shouldFadeBody()) {
      this.graypane_.show( /* animate */true);
    }
    return view.init(this).then(function () {
      _utilsStyle.setImportantStyles(view.getElement(), {
        'opacity': 1
      });
      _this3.setLoading(false);
    });
  };

  /**
   * Resizes the dialog container.
   * @param {!./view.View} view
   * @param {number} height
   * @param {boolean=} animated
   * @return {?Promise}
   */

  Dialog.prototype.resizeView = function resizeView(view, height) {
    var _this4 = this;

    var animated = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

    if (this.view_ != view) {
      return null;
    }
    var newHeight = this.getMaxAllowedHeight_(height);

    var animating = undefined;
    if (animated) {
      (function () {
        var oldHeight = _this4.getElement().offsetHeight;
        if (newHeight >= oldHeight) {
          // Expand.
          animating = _this4.animate_(function () {
            _utilsStyle.setImportantStyles(_this4.getElement(), {
              'height': newHeight + 'px',
              'transform': 'translateY(' + (newHeight - oldHeight) + 'px)'
            });
            return _utilsAnimation.transition(_this4.getElement(), {
              'transform': 'translateY(0)'
            }, 300, 'ease-out');
          });
        } else {
          // Collapse.
          animating = _this4.animate_(function () {
            return _utilsAnimation.transition(_this4.getElement(), {
              'transform': 'translateY(' + (oldHeight - newHeight) + 'px)'
            }, 300, 'ease-out').then(function () {
              _utilsStyle.setImportantStyles(_this4.getElement(), {
                'height': newHeight + 'px',
                'transform': 'translateY(0)'
              });
            });
          });
        }
      })();
    } else {
      _utilsStyle.setImportantStyles(this.getElement(), {
        'height': newHeight + 'px'
      });
      animating = Promise.resolve();
    }
    return animating.then(function () {
      _this4.updatePaddingToHtml_(height);
      view.resized();
    });
  };

  /**
   * @param {function():!Promise} callback
   * @return {!Promise}
   * @private
   */

  Dialog.prototype.animate_ = function animate_(callback) {
    var _this5 = this;

    var wait = this.animating_ || Promise.resolve();
    return this.animating_ = wait.then(function () {
      return callback();
    }, function () {
      // Ignore errors to make sure animations don't get stuck.
    }).then(function () {
      _this5.animating_ = null;
    });
  };

  /**
   * Returns maximum allowed height for current viewport.
   * @param {number} height
   * @return {number}
   * @private
   */

  Dialog.prototype.getMaxAllowedHeight_ = function getMaxAllowedHeight_(height) {
    return Math.min(height, this.doc_.getWin(). /*OK*/innerHeight * 0.9);
  };

  /**
   * Gets the element's height.
   * @return {number}
   * @private
   */

  Dialog.prototype.getHeight_ = function getHeight_() {
    return this.getElement().offsetHeight;
  };

  /**
   * Sets the position of the dialog. Currently 'BOTTOM' is set by default.
   */

  Dialog.prototype.setPosition_ = function setPosition_() {
    _utilsStyle.setImportantStyles(this.getElement(), this.getPositionStyle_());
  };

  /**
   * Add the padding to the containing page so as to not hide the content
   * behind the popup, if rendered at the bottom.
   * @param {number} newHeight
   * @private
   */

  Dialog.prototype.updatePaddingToHtml_ = function updatePaddingToHtml_(newHeight) {
    if (this.inferPosition_() == PositionAt.BOTTOM) {
      var bottomPadding = newHeight + 20; // Add some extra padding.
      var htmlElement = this.doc_.getRootElement();
      _utilsStyle.setImportantStyles(htmlElement, {
        'padding-bottom': bottomPadding + 'px'
      });
    }
  };

  /**
   * Removes previouly added bottom padding from the document.
   * @private`
   */

  Dialog.prototype.removePaddingToHtml_ = function removePaddingToHtml_() {
    this.doc_.getRootElement().style.removeProperty('padding-bottom');
  };

  /**
   * Calculates the position of the dialog. Currently dialog is positioned at
   * the bottom only. This could change in future to adjust the dialog position
   * based on the screen size.
   * @return {string}
   * @private
   */

  Dialog.prototype.inferPosition_ = function inferPosition_() {
    return PositionAt.BOTTOM;
  };

  /**
   * Returns the styles required to postion the dialog.
   * @return {!Object<string, string|number>}
   * @private
   */

  Dialog.prototype.getPositionStyle_ = function getPositionStyle_() {
    var dialogPosition = this.inferPosition_();
    switch (dialogPosition) {
      case PositionAt.BOTTOM:
        return { 'bottom': 0 };
      case PositionAt.TOP:
        return { 'top': 0 };
      case PositionAt.FLOAT:
        return {
          'position': 'fixed',
          'top': '50%',
          'left': '50%',
          'transform': 'translate(-50%, -50%)'
        };
      case PositionAt.FULL:
        return {
          'position': 'fixed',
          'height': '100%',
          'top': 0,
          'bottom': 0
        };
      default:
        return { 'bottom': 0 };
    }
  };

  return Dialog;
})();

exports.Dialog = Dialog;

},{"../../build/css/ui/ui.css":2,"../ui/loading-view":39,"../utils/animation":42,"../utils/dom":45,"../utils/style":53,"./friendly-iframe":12,"./graypane":13}],12:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _utilsDom = require('../utils/dom');

var _utilsStyle = require('../utils/style');

/** @const {!Object<string|number>} */
var friendlyIframeAttributes = {
  'frameborder': 0,
  'scrolling': 'no',
  'src': 'about:blank'
};

/**
 * The class for building friendly iframe.
 */

var FriendlyIframe = (function () {

  /**
   * @param {!Document} doc
   * @param {!Object<string, string|number>=} attrs
   */

  function FriendlyIframe(doc) {
    var _this = this;

    var attrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    babelHelpers.classCallCheck(this, FriendlyIframe);

    var mergedAttrs = Object.assign({}, friendlyIframeAttributes, attrs);

    /** @private @const {!HTMLIFrameElement} */
    this.iframe_ =
    /** @type {!HTMLIFrameElement} */_utilsDom.createElement(doc, 'iframe', mergedAttrs);

    // Ensure that the new iframe does not inherit any CSS styles.
    _utilsStyle.resetAllStyles(this.iframe_);

    // Overrides the the top-left and top-right border radius to '8px'.
    _utilsStyle.setStyles(this.iframe_, {
      'border-top-left-radius': '8px',
      'border-top-right-radius': '8px'
    });

    /** @private @const {!Promise} */
    this.ready_ = new Promise(function (resolve) {
      _this.iframe_.onload = resolve;
    });
  }

  /**
   * When promise is resolved.
   * @return {!Promise}
   */

  FriendlyIframe.prototype.whenReady = function whenReady() {
    return this.ready_;
  };

  /**
   * Gets the iframe element.
   * @return {!HTMLIFrameElement}
   */

  FriendlyIframe.prototype.getElement = function getElement() {
    return this.iframe_;
  };

  /**
   * Gets the document object of the iframe element.
   * @return {!Document}
   */

  FriendlyIframe.prototype.getDocument = function getDocument() {
    var doc = this.getElement().contentDocument || this.getElement().contentWindow && this.getElement().contentWindow.document;

    if (!doc) {
      throw new Error('not loaded');
    }
    return doc;
  };

  /**
   * Gets the body of the iframe.
   * @return {!Element}
   */

  FriendlyIframe.prototype.getBody = function getBody() {
    return (/** @type {!Element} */this.getDocument().body
    );
  };

  /**
   * Whether the iframe is connected.
   * @return {boolean}
   */

  FriendlyIframe.prototype.isConnected = function isConnected() {
    if (!this.getElement().ownerDocument) {
      return false;
    }
    return this.getElement().ownerDocument.contains(this.iframe_);
  };

  return FriendlyIframe;
})();

exports.FriendlyIframe = FriendlyIframe;

},{"../utils/dom":45,"../utils/style":53}],13:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _utilsStyle = require('../utils/style');

var _utilsAnimation = require('../utils/animation');

var Graypane = (function () {

  /**
   * @param {!../model/doc.Doc} doc
   * @param {number} zIndex
   */

  function Graypane(doc, zIndex) {
    babelHelpers.classCallCheck(this, Graypane);

    /** @private @const {!../model/doc.Doc} */
    this.doc_ = doc;

    /** @private @const {!Element} */
    this.fadeBackground_ = this.doc_.getWin().document.createElement('swg-popup-background');
    _utilsStyle.setImportantStyles(this.fadeBackground_, {
      'z-index': zIndex,
      'display': 'none',
      'position': 'fixed',
      'top': 0,
      'right': 0,
      'bottom': 0,
      'left': 0,
      'background-color': 'rgba(32, 33, 36, .6)'
    });
  }

  /**
   * @return {!Element}
   */

  Graypane.prototype.getElement = function getElement() {
    return this.fadeBackground_;
  };

  /**
   * @return {boolean}
   */

  Graypane.prototype.isAttached = function isAttached() {
    return !!this.fadeBackground_.parentNode;
  };

  /**
   * Attaches the graypane to the document.
   */

  Graypane.prototype.attach = function attach() {
    this.doc_.getBody().appendChild(this.fadeBackground_);
  };

  /**
   * Detaches the graypane to the document.
   */

  Graypane.prototype.destroy = function destroy() {
    this.doc_.getBody().removeChild(this.fadeBackground_);
  };

  /**
   * Shows the graypane.
   * @param {boolean=} animated
   * @return {!Promise|undefined}
   */

  Graypane.prototype.show = function show() {
    var animated = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    _utilsStyle.setImportantStyles(this.fadeBackground_, {
      'display': 'block',
      'opacity': animated ? 0 : 1
    });
    if (animated) {
      return _utilsAnimation.transition(this.fadeBackground_, {
        'opacity': 1
      }, 300, 'ease-out');
    }
  };

  /**
   * Hides the graypane.
   * @param {boolean=} animated
   * @return {!Promise|undefined}
   */

  Graypane.prototype.hide = function hide() {
    var _this = this;

    var animated = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    if (animated) {
      return _utilsAnimation.transition(this.fadeBackground_, {
        'opacity': 0
      }, 300, 'ease-out').then(function () {
        _utilsStyle.setImportantStyles(_this.fadeBackground_, { 'display': 'none' });
      });
    }
    _utilsStyle.setImportantStyles(this.fadeBackground_, { 'display': 'none' });
  };

  return Graypane;
})();

exports.Graypane = Graypane;

},{"../utils/animation":42,"../utils/style":53}],14:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * abstract View Class. Used to render the content within the Dialog. The
 * extended class has actual content.
 * @abstract
 */

var View = (function () {

  /**
   * Empty constructor.
   */

  function View() {
    babelHelpers.classCallCheck(this, View);
  }

  /**
   * Gets the iframe element.
   * @return {!Element}
   * @abstract
   */

  View.prototype.getElement = function getElement() {};

  /**
   * @param {!./dialog.Dialog} unusedDialog
   * @return {!Promise}
   * @abstract
   */

  View.prototype.init = function init(unusedDialog) {};

  /**
   * Resizes the content.
   */

  View.prototype.resized = function resized() {}
  // Do nothing by default. Override if needed.

  /*
   * Accept the result.
   * @return {!Promise}
   */
  ;

  View.prototype.whenComplete = function whenComplete() {};

  /**
   * @return {boolean}
   * @abstract
   */

  View.prototype.shouldFadeBody = function shouldFadeBody() {};

  return View;
})();

exports.View = View;

},{}],15:[function(require,module,exports){
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Entry point into library for compilation with babel. Just loads main.js
// and Babel's helpers.

require('../third_party/babel/custom-babel-helpers');

require('./main');

},{"../third_party/babel/custom-babel-helpers":57,"./main":16}],16:[function(require,module,exports){
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * The entry point for runtime (swg.js).
 */

require('./polyfills');

var _runtimeRuntime = require('./runtime/runtime');

_runtimeRuntime.installRuntime(self);

console.info('Subscriptions Runtime: 0.1.22-1523207997232');

},{"./polyfills":20,"./runtime/runtime":35}],17:[function(require,module,exports){
exports.__esModule = true;
exports.resolveDoc = resolveDoc;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _utilsDocumentReady = require('../utils/document-ready');

/**
 * @interface
 */

var Doc = (function () {
  function Doc() {
    babelHelpers.classCallCheck(this, Doc);
  }

  /** @implements {Doc} */

  /**
   * @return {!Window}
   */

  Doc.prototype.getWin = function getWin() {};

  /**
   * The `Document` node or analog.
   * @return {!Node}
   */

  Doc.prototype.getRootNode = function getRootNode() {};

  /**
   * The `Document.documentElement` element or analog.
   * @return {!Element}
   */

  Doc.prototype.getRootElement = function getRootElement() {};

  /**
   * The `Document.head` element or analog. Returns `null` if not available
   * yet.
   * @return {!Element}
   */

  Doc.prototype.getHead = function getHead() {};

  /**
   * The `Document.body` element or analog. Returns `null` if not available
   * yet.
   * @return {?Element}
   */

  Doc.prototype.getBody = function getBody() {};

  /**
   * Whether the document has been fully constructed.
   * @return {boolean}
   */

  Doc.prototype.isReady = function isReady() {};

  /**
   * Resolved when document has been fully constructed.
   * @return {!Promise}
   */

  Doc.prototype.whenReady = function whenReady() {};

  return Doc;
})();

exports.Doc = Doc;

var GlobalDoc = (function () {

  /**
   * @param {!Window|!Document} winOrDoc
   */

  function GlobalDoc(winOrDoc) {
    babelHelpers.classCallCheck(this, GlobalDoc);

    var isWin = !!winOrDoc.document;
    /** @private @const {!Window} */
    this.win_ = isWin ?
    /** @type {!Window} */winOrDoc :
    /** @type {!Window} */ /** @type {!Document} */winOrDoc.defaultView;
    /** @private @const {!Document} */
    this.doc_ = isWin ?
    /** @type {!Window} */winOrDoc.document :
    /** @type {!Document} */winOrDoc;
  }

  /**
   * @param {!Document|!Window|!Doc} input
   * @return {!Doc}
   */

  /** @override */

  GlobalDoc.prototype.getWin = function getWin() {
    return this.win_;
  };

  /** @override */

  GlobalDoc.prototype.getRootNode = function getRootNode() {
    return this.doc_;
  };

  /** @override */

  GlobalDoc.prototype.getRootElement = function getRootElement() {
    return this.doc_.documentElement;
  };

  /** @override */

  GlobalDoc.prototype.getHead = function getHead() {
    // `document.head` always has a chance to be parsed, at least partially.
    return (/** @type {!Element} */this.doc_.head
    );
  };

  /** @override */

  GlobalDoc.prototype.getBody = function getBody() {
    return this.doc_.body;
  };

  /** @override */

  GlobalDoc.prototype.isReady = function isReady() {
    return _utilsDocumentReady.isDocumentReady(this.doc_);
  };

  /** @override */

  GlobalDoc.prototype.whenReady = function whenReady() {
    return _utilsDocumentReady.whenDocumentReady(this.doc_);
  };

  return GlobalDoc;
})();

exports.GlobalDoc = GlobalDoc;

function resolveDoc(input) {
  // Is it a `Document`
  if ( /** @type {!Document} */input.nodeType === /* DOCUMENT */9) {
    return new GlobalDoc( /** @type {!Document} */input);
  }
  // Is it a `Window`?
  if ( /** @type {!Window} */input.document) {
    return new GlobalDoc( /** @type {!Window} */input);
  }
  return (/** @type {!Doc} */input
  );
}

},{"../utils/document-ready":44}],18:[function(require,module,exports){
exports.__esModule = true;
exports.getControlFlag = getControlFlag;
exports.getDocClassForTesting = getDocClassForTesting;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _doc = require('./doc');

var _pageConfig = require('./page-config');

var _utilsDom = require('../utils/dom');

var _utilsTypes = require('../utils/types');

var _utilsJson = require('../utils/json');

var ALREADY_SEEN = '__SWG-SEEN__';
var CONTROL_FLAG = 'subscriptions-control';

/**
 */

var PageConfigResolver = (function () {

  /**
   * @param {!Window|!Document|!Doc} winOrDoc
   */

  function PageConfigResolver(winOrDoc) {
    var _this = this;

    babelHelpers.classCallCheck(this, PageConfigResolver);

    /** @private @const {!Doc} */
    this.doc_ = _doc.resolveDoc(winOrDoc);

    /** @private {?function((!PageConfig|!Promise))} */
    this.configResolver_ = null;

    /** @private @const {!Promise<!PageConfig>} */
    this.configPromise_ = new Promise(function (resolve) {
      _this.configResolver_ = resolve;
    });

    /** @private @const {!MetaParser} */
    this.metaParser_ = new MetaParser(this.doc_);
    /** @private @const {!JsonLdParser} */
    this.ldParser_ = new JsonLdParser(this.doc_);
    /** @private @const {!MicrodataParser} */
    this.microdataParser_ = new MicrodataParser(this.doc_);
  }

  /**
   * @return {!Promise<!PageConfig>}
   */

  PageConfigResolver.prototype.resolveConfig = function resolveConfig() {
    // Try resolve the config at different times.
    Promise.resolve().then(this.check.bind(this));
    this.doc_.whenReady().then(this.check.bind(this));
    return this.configPromise_;
  };

  /**
   * @return {?PageConfig}
   */

  PageConfigResolver.prototype.check = function check() {
    // Already resolved.
    if (!this.configResolver_) {
      return null;
    }
    var config = this.metaParser_.check();
    if (!config) {
      config = this.ldParser_.check();
    }
    if (!config) {
      config = this.microdataParser_.check();
    }
    if (config) {
      // Product ID has been found: initialize the rest of the config.
      this.configResolver_(config);
      this.configResolver_ = null;
    } else if (this.doc_.isReady()) {
      this.configResolver_(Promise.reject(new Error('No config could be discovered in the page')));
      this.configResolver_ = null;
    }
    return config;
  };

  return PageConfigResolver;
})();

exports.PageConfigResolver = PageConfigResolver;

var MetaParser = (function () {
  /**
   * @param {!Doc} doc
   */

  function MetaParser(doc) {
    babelHelpers.classCallCheck(this, MetaParser);

    /** @private @const {!Doc} */
    this.doc_ = doc;
  }

  /**
   * @return {?PageConfig}
   */

  MetaParser.prototype.check = function check() {
    if (!this.doc_.getBody()) {
      // Wait until the whole `<head>` is parsed.
      return null;
    }

    // Try to find product id.
    var productId = getMetaTag(this.doc_.getRootNode(), 'subscriptions-product-id');
    if (!productId) {
      return null;
    }

    // Is locked?
    var accessibleForFree = getMetaTag(this.doc_.getRootNode(), 'subscriptions-accessible-for-free');
    var locked = accessibleForFree && accessibleForFree.toLowerCase() == 'false' || false;

    return new _pageConfig.PageConfig(productId, locked);
  };

  return MetaParser;
})();

var JsonLdParser = (function () {
  /**
   * @param {!Doc} doc
   */

  function JsonLdParser(doc) {
    babelHelpers.classCallCheck(this, JsonLdParser);

    /** @private @const {!Doc} */
    this.doc_ = doc;
  }

  /**
   * @return {?PageConfig}
   */

  JsonLdParser.prototype.check = function check() {
    if (!this.doc_.getBody()) {
      // Wait until the whole `<head>` is parsed.
      return null;
    }

    var domReady = this.doc_.isReady();

    // type: 'application/ld+json'
    var elements = this.doc_.getRootNode().querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element[ALREADY_SEEN] || !element.textContent || !domReady && !_utilsDom.hasNextNodeInDocumentOrder(element)) {
        continue;
      }
      element[ALREADY_SEEN] = true;
      if (element.textContent.indexOf('NewsArticle') == -1) {
        continue;
      }
      var possibleConfig = this.tryExtractConfig_(element);
      if (possibleConfig) {
        return possibleConfig;
      }
    }
    return null;
  };

  /**
   * @param {!Element} element
   * @return {?PageConfig}
   */

  JsonLdParser.prototype.tryExtractConfig_ = function tryExtractConfig_(element) {
    var json = _utilsJson.tryParseJson(element.textContent);
    if (!json) {
      return null;
    }

    // Must be a NewsArticle.
    if (!this.checkType_(json, 'NewsArticle')) {
      return null;
    }

    // Must have a isPartOf[@type=Product].
    var productId = null;
    var partOfArray = this.valueArray_(json, 'isPartOf');
    if (partOfArray) {
      for (var i = 0; i < partOfArray.length; i++) {
        productId = this.discoverProductId_(partOfArray[i]);
        if (productId) {
          break;
        }
      }
    }
    if (!productId) {
      return null;
    }

    // Found product id, just check for the access flag.
    var isAccessibleForFree = this.bool_(this.singleValue_(json, 'isAccessibleForFree'),
    /* default */true);

    return new _pageConfig.PageConfig(productId, !isAccessibleForFree);
  };

  /**
   * @param {*} value
   * @param {boolean} def
   * @return {boolean}
   */

  JsonLdParser.prototype.bool_ = function bool_(value, def) {
    if (value == null || value === '') {
      return def;
    }
    if (typeof value == 'boolean') {
      return value;
    }
    if (typeof value == 'string') {
      var lowercase = value.toLowerCase();
      if (lowercase == 'false') {
        return false;
      }
      if (lowercase == 'true') {
        return true;
      }
    }
    return def;
  };

  /**
   * @param {!Object} json
   * @return {?string}
   */

  JsonLdParser.prototype.discoverProductId_ = function discoverProductId_(json) {
    // Must have type `Product`.
    if (!this.checkType_(json, 'Product')) {
      return null;
    }
    return (/** @type {?string} */this.singleValue_(json, 'productID')
    );
  };

  /**
   * @param {!Object} json
   * @param {string} name
   * @return {?Array}
   */

  JsonLdParser.prototype.valueArray_ = function valueArray_(json, name) {
    var value = json[name];
    if (value == null || value === '') {
      return null;
    }
    return _utilsTypes.isArray(value) ? value : [value];
  };

  /**
   * @param {!Object} json
   * @param {string} name
   * @return {*}
   */

  JsonLdParser.prototype.singleValue_ = function singleValue_(json, name) {
    var valueArray = this.valueArray_(json, name);
    var value = valueArray && valueArray[0];
    return value == null || value === '' ? null : value;
  };

  /**
   * @param {!Object} json
   * @param {string} expectedType
   * @return {boolean}
   */

  JsonLdParser.prototype.checkType_ = function checkType_(json, expectedType) {
    var typeArray = this.valueArray_(json, '@type');
    if (!typeArray) {
      return false;
    }
    return typeArray.includes(expectedType) || typeArray.includes('http://schema.org/' + expectedType);
  };

  return JsonLdParser;
})();

var MicrodataParser = (function () {
  /**
   * @param {!Doc} doc
   */

  function MicrodataParser(doc) {
    babelHelpers.classCallCheck(this, MicrodataParser);

    /** @private @const {!Doc} */
    this.doc_ = doc;
    /** @private {?boolean} */
    this.access_ = null;
    /** @private {?string} */
    this.productId_ = null;
  }

  /**
   * @param {!Node} rootNode
   * @return {?string}
   */

  /**
   * Returns false if access is restricted, otherwise true
   * @param {!Element} root An element that is an item of type 'NewsArticle'
   * @return {?boolean} locked access
   * @private
   */

  MicrodataParser.prototype.discoverAccess_ = function discoverAccess_(root) {
    var ALREADY_SEEN = 'alreadySeenForAccessInfo';
    var nodeList = root.querySelectorAll("[itemprop='isAccessibleForFree']");
    for (var i = 0; nodeList[i]; i++) {
      var element = nodeList[i];
      var content = element.getAttribute('content') || element.textContent;
      if (!content) {
        continue;
      }
      if (this.isValidElement_(element, root, ALREADY_SEEN)) {
        var accessForFree = null;
        if (content.toLowerCase() == 'true') {
          accessForFree = true;
        } else if (content.toLowerCase() == 'false') {
          accessForFree = false;
        }
        return accessForFree;
      }
    }
    return null;
  };

  /**
   * Verifies if an element is valid based on the following
   * - child of an item of type 'NewsArticle'
   * - not a child of an item of any other type
   * - not seen before, marked using the alreadySeen tag
   * @param {?Element} current the element to be verified
   * @param {!Element} root the parent to track up to
   * @param {!string} alreadySeen used to tag already visited nodes
   * @return {!boolean} valid node
   * @private
   */

  MicrodataParser.prototype.isValidElement_ = function isValidElement_(current, root, alreadySeen) {
    for (var node = current; node && !node[alreadySeen]; node = node.parentNode) {
      node[alreadySeen] = true;
      if (node.hasAttribute('itemscope')) {
        /**{?string} */
        var type = node.getAttribute('itemtype');
        if (type.indexOf('http://schema.org/NewsArticle') >= 0) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  };

  /**
   * Obtains the product ID that meets the requirements
   * - child of an item of type 'NewsArticle'
   * - Not a child of an item of type 'Section'
   * - child of an item of type 'productID'
   * @param {!Element} root An element that is an item of type 'NewsArticle'
   * @return {?string} product ID, if found
   * @private
   */

  MicrodataParser.prototype.discoverProductId_ = function discoverProductId_(root) {
    var ALREADY_SEEN = 'alreadySeenForProductInfo';
    var nodeList = root.querySelectorAll('[itemprop="productID"]');
    for (var i = 0; nodeList[i]; i++) {
      var element = nodeList[i];
      var content = element.getAttribute('content') || element.textContent;
      var item = element.closest('[itemtype][itemscope]');
      var type = item.getAttribute('itemtype');
      if (type.indexOf('http://schema.org/Product') <= -1) {
        continue;
      }
      if (this.isValidElement_(item.parentElement, root, ALREADY_SEEN)) {
        return content;
      }
    }
    return null;
  };

  /**
   * Returns PageConfig if available
   * @return {?PageConfig} PageConfig found so far
   */

  MicrodataParser.prototype.getPageConfig_ = function getPageConfig_() {
    var locked = null;
    if (this.access_ != null) {
      locked = !this.access_;
    } else if (this.doc_.isReady()) {
      // Default to unlocked
      locked = false;
    }
    if (this.productId_ != null && locked != null) {
      return new _pageConfig.PageConfig(this.productId_, locked);
    }
    return null;
  };

  /**
   * Extracts page config from Microdata in the DOM
   * @return {?PageConfig} PageConfig found
   */

  MicrodataParser.prototype.tryExtractConfig_ = function tryExtractConfig_() {
    var config = this.getPageConfig_();
    if (config) {
      return config;
    }
    var nodeList = this.doc_.getRootNode().querySelectorAll('[itemscope][itemtype*="http://schema.org/NewsArticle"]');
    for (var i = 0; nodeList[i] && config == null; i++) {
      var element = nodeList[i];
      if (this.access_ == null) {
        this.access_ = this.discoverAccess_(element);
      }
      if (!this.productId_) {
        this.productId_ = this.discoverProductId_(element);
      }
      config = this.getPageConfig_();
    }
    return config;
  };

  /**
   * @return {?PageConfig}
   */

  MicrodataParser.prototype.check = function check() {
    if (!this.doc_.getBody()) {
      // Wait until the whole `<head>` is parsed.
      return null;
    }
    return this.tryExtractConfig_();
  };

  return MicrodataParser;
})();

function getControlFlag(rootNode) {
  // Look for the flag in `meta`.
  var flag = getMetaTag(rootNode, CONTROL_FLAG);
  if (flag) {
    return flag;
  }
  // Look for the flag in `script`.
  var el = rootNode.querySelector('script[' + CONTROL_FLAG + ']');
  if (el) {
    return el.getAttribute(CONTROL_FLAG);
  }
  return null;
}

/**
 * Returns the value from content attribute of a meta tag with given name.
 *
 * If multiple tags are found, the first value is returned.
 *
 * @param {!Node} rootNode
 * @param {string} name The tag name to look for.
 * @return {?string} attribute value or empty string.
 * @private
 */
function getMetaTag(rootNode, name) {
  var el = rootNode.querySelector('meta[name="' + name + '"]');
  if (el) {
    return el.getAttribute('content');
  }
  return null;
}

/** @package Visible for testing only. */

function getDocClassForTesting() {
  return _doc.Doc;
}

},{"../utils/dom":45,"../utils/json":47,"../utils/types":54,"./doc":17,"./page-config":19}],19:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 */

var PageConfig = (function () {

  /**
   * @param {string} productOrPublicationId
   * @param {boolean} locked
   */

  function PageConfig(productOrPublicationId, locked) {
    babelHelpers.classCallCheck(this, PageConfig);

    var publicationId = undefined,
        productId = undefined,
        label = undefined;
    var div = productOrPublicationId.indexOf(':');
    if (div != -1) {
      // The argument is a product id.
      productId = productOrPublicationId;
      publicationId = productId.substring(0, div);
      label = productId.substring(div + 1);
    } else {
      // The argument is a publication id.
      publicationId = productOrPublicationId;
      productId = null;
      label = null;
    }

    /** @private @const {string} */
    this.publicationId_ = publicationId;
    /** @private @const {?string} */
    this.productId_ = productId;
    /** @private @const {?string} */
    this.label_ = label;
    /** @private @const {boolean} */
    this.locked_ = locked;
  }

  /**
   * @return {string}
   */

  PageConfig.prototype.getPublicationId = function getPublicationId() {
    return this.publicationId_;
  };

  /**
   * @return {?string}
   */

  PageConfig.prototype.getProductId = function getProductId() {
    return this.productId_;
  };

  /**
   * @return {?string}
   */

  PageConfig.prototype.getLabel = function getLabel() {
    return this.label_;
  };

  /**
   * @return {boolean}
   */

  PageConfig.prototype.isLocked = function isLocked() {
    return this.locked_;
  };

  return PageConfig;
})();

exports.PageConfig = PageConfig;

},{}],20:[function(require,module,exports){
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Loads all polyfills needed by the project.
 * This list should not get longer without a very good reason.
 */

var _polyfillsDomtokenlistToggle = require('./polyfills/domtokenlist-toggle');

var _polyfillsDocumentContains = require('./polyfills/document-contains');

var _polyfillsMathSign = require('./polyfills/math-sign');

var _polyfillsObjectAssign = require('./polyfills/object-assign');

var _polyfillsPromise = require('./polyfills/promise');

var _polyfillsArrayIncludes = require('./polyfills/array-includes');

_polyfillsDomtokenlistToggle.install(self);
_polyfillsMathSign.install(self);
_polyfillsObjectAssign.install(self);
_polyfillsPromise.install(self);
_polyfillsDocumentContains.install(self);
_polyfillsArrayIncludes.install(self);

},{"./polyfills/array-includes":21,"./polyfills/document-contains":22,"./polyfills/domtokenlist-toggle":23,"./polyfills/math-sign":24,"./polyfills/object-assign":25,"./polyfills/promise":26}],21:[function(require,module,exports){
exports.__esModule = true;
exports.install = install;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns true if the element is in the array and false otherwise.
 *
 * @param {*} value
 * @param {number=} opt_fromIndex
 * @return {boolean}
 * @this {Array}
 */
function includes(value, opt_fromIndex) {
  var fromIndex = opt_fromIndex || 0;
  var len = this.length;
  var i = fromIndex >= 0 ? fromIndex : Math.max(len + fromIndex, 0);
  for (; i < len; i++) {
    var other = this[i];
    // If value has been found OR (value is NaN AND other is NaN)
    /*eslint "no-self-compare": 0*/
    if (other === value || value !== value && other !== other) {
      return true;
    }
  }
  return false;
}

/**
* Sets the Array.contains polyfill if it does not exist.
* @param {!Window} win
*/

function install(win) {
  if (!win.Array.prototype.includes) {
    win.Object.defineProperty(Array.prototype, 'includes', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: includes
    });
  }
}

},{}],22:[function(require,module,exports){
exports.__esModule = true;
exports.install = install;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Polyfill for `document.contains()` method. Notice that according to spec
 * `document.contains` is inclusionary.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
 * @param {?Node} node
 * @return {boolean}
 * @this {Node}
 */
function documentContainsPolyfill(node) {
  // Per spec, "contains" method is inclusionary
  // i.e. `node.contains(node) == true`. However, we still need to test
  // equality to the document itself.
  return node == this || this.documentElement.contains(node);
}

/**
 * Polyfills `HTMLDocument.contains` API.
 * @param {!Window} win
 */

function install(win) {
  if (!win.HTMLDocument.prototype.contains) {
    win.Object.defineProperty(win.HTMLDocument.prototype, 'contains', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: documentContainsPolyfill
    });
  }
}

},{}],23:[function(require,module,exports){
exports.__esModule = true;
exports.install = install;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Polyfill for `DOMTokenList.prototype.toggle(token, opt_force)` method.
 * This is specially important because IE does not support `opt_force` attribute.
 * See https://goo.gl/hgKNYY for details.
 * @param {string} token
 * @param {boolean=} opt_force
 * @this {DOMTokenList}
 * @return {boolean}
 */
function domTokenListTogglePolyfill(token, opt_force) {
  var remove = opt_force === undefined ? this.contains(token) : !opt_force;
  if (remove) {
    this.remove(token);
    return false;
  } else {
    this.add(token);
    return true;
  }
}

/**
 * Polyfills `DOMTokenList.prototype.toggle` API in IE.
 * @param {!Window} win
 */

function install(win) {
  if (isIe(win) && win.DOMTokenList) {
    win.Object.defineProperty(win.DOMTokenList.prototype, 'toggle', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: domTokenListTogglePolyfill
    });
  }
}

/**
 * Whether the current browser is a IE browser.
 * @param {!Window} win
 * @return {boolean}
 */
function isIe(win) {
  return (/Trident|MSIE|IEMobile/i.test(win.navigator.userAgent)
  );
}

},{}],24:[function(require,module,exports){
exports.__esModule = true;
exports.sign = sign;
exports.install = install;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Parses the number x and returns its sign. For positive x returns 1, for
 * negative, -1. For 0 and -0, returns 0 and -0 respectively. For any number
 * that parses to NaN, returns NaN.
 *
 * @param {number} x
 * @returns {number}
 */

function sign(x) {
  x = Number(x);

  // If x is 0, -0, or NaN, return it.
  if (!x) {
    return x;
  }

  return x > 0 ? 1 : -1;
}

;

/**
 * Sets the Math.sign polyfill if it does not exist.
 * @param {!Window} win
 */

function install(win) {
  if (!win.Math.sign) {
    win.Object.defineProperty(win.Math, 'sign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: sign
    });
  }
}

},{}],25:[function(require,module,exports){
exports.__esModule = true;
exports.assign = assign;
exports.install = install;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Copies values of all enumerable own properties from one or more source
 * objects (provided as extended arguments to the function) to a target object.
 *
 * @param {!Object} target
 * @param {...Object} var_args
 * @returns {!Object}
 */

function assign(target, var_args) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    if (source != null) {
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          output[key] = source[key];
        }
      }
    }
  }
  return output;
}

/**
 * Sets the Object.assign polyfill if it does not exist.
 * @param {!Window} win
 */

function install(win) {
  if (!win.Object.assign) {
    win.Object.defineProperty(win.Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

},{}],26:[function(require,module,exports){
exports.__esModule = true;
exports.install = install;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _promisePjsPromise = require('promise-pjs/promise');

var Promise = babelHelpers.interopRequireWildcard(_promisePjsPromise);

/**
 * Sets the Promise polyfill if it does not exist.
 * @param {!Window} win
 */

function install(win) {
  if (!win.Promise) {
    win.Promise = /** @type {?} */Promise;
    // In babel the * export is an Object with a default property.
    // In closure compiler it is the Promise function itself.
    if (Promise['default']) {
      win.Promise = Promise['default'];
    }
    // We copy the individual static methods, because closure
    // compiler flattens the polyfill namespace.
    win.Promise.resolve = Promise.resolve;
    win.Promise.reject = Promise.reject;
    win.Promise.all = Promise.all;
    win.Promise.race = Promise.race;
  }
}

},{"promise-pjs/promise":3}],27:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {number} */
var CallbackId = {
  ENTITLEMENTS: 1,
  SUBSCRIBE_REQUEST: 2,
  SUBSCRIBE_RESPONSE: 3,
  LOGIN_REQUEST: 4,
  LINK_PROGRESS: 5,
  LINK_COMPLETE: 6,
  FLOW_STARTED: 7,
  FLOW_CANCELED: 8
};

/**
 */

var Callbacks = (function () {

  /**
   */

  function Callbacks() {
    babelHelpers.classCallCheck(this, Callbacks);

    /** @private @const {!Object<CallbackId, function(*)>} */
    this.callbacks_ = {};
    /** @private @const {!Object<CallbackId, *>} */
    this.resultBuffer_ = {};
  }

  /**
   * @param {function(!Promise<!../api/entitlements.Entitlements>)} callback
   */

  Callbacks.prototype.setOnEntitlementsResponse = function setOnEntitlementsResponse(callback) {
    this.setCallback_(CallbackId.ENTITLEMENTS, callback);
  };

  /**
   * @param {!Promise<!../api/entitlements.Entitlements>} promise
   */

  Callbacks.prototype.triggerEntitlementsResponse = function triggerEntitlementsResponse(promise) {
    return this.trigger_(CallbackId.ENTITLEMENTS, promise.then(function (res) {
      return res.clone();
    }));
  };

  /**
   * @return {boolean}
   */

  Callbacks.prototype.hasEntitlementsResponsePending = function hasEntitlementsResponsePending() {
    return !!this.resultBuffer_[CallbackId.ENTITLEMENTS];
  };

  /**
   * @param {function(!../api/subscriptions.LoginRequest)} callback
   */

  Callbacks.prototype.setOnLoginRequest = function setOnLoginRequest(callback) {
    this.setCallback_(CallbackId.LOGIN_REQUEST, callback);
  };

  /**
   * @param {!../api/subscriptions.LoginRequest} request
   * @return {boolean} Whether the callback has been found.
   */

  Callbacks.prototype.triggerLoginRequest = function triggerLoginRequest(request) {
    return this.trigger_(CallbackId.LOGIN_REQUEST, request);
  };

  /**
   * @param {function()} callback
   */

  Callbacks.prototype.setOnLinkProgress = function setOnLinkProgress(callback) {
    this.setCallback_(CallbackId.LINK_PROGRESS, callback);
  };

  /**
   * @return {boolean} Whether the callback has been found.
   */

  Callbacks.prototype.triggerLinkProgress = function triggerLinkProgress() {
    return this.trigger_(CallbackId.LINK_PROGRESS, true);
  };

  /**
   */

  Callbacks.prototype.resetLinkProgress = function resetLinkProgress() {
    this.resetCallback_(CallbackId.LINK_PROGRESS);
  };

  /**
   * @param {function()} callback
   */

  Callbacks.prototype.setOnLinkComplete = function setOnLinkComplete(callback) {
    this.setCallback_(CallbackId.LINK_COMPLETE, callback);
  };

  /**
   * @return {boolean} Whether the callback has been found.
   */

  Callbacks.prototype.triggerLinkComplete = function triggerLinkComplete() {
    return this.trigger_(CallbackId.LINK_COMPLETE, true);
  };

  /**
   * @return {boolean}
   */

  Callbacks.prototype.hasLinkCompletePending = function hasLinkCompletePending() {
    return !!this.resultBuffer_[CallbackId.LINK_COMPLETE];
  };

  /**
   * @param {function()} callback
   */

  Callbacks.prototype.setOnSubscribeRequest = function setOnSubscribeRequest(callback) {
    this.setCallback_(CallbackId.SUBSCRIBE_REQUEST, callback);
  };

  /**
   * @return {boolean} Whether the callback has been found.
   */

  Callbacks.prototype.triggerSubscribeRequest = function triggerSubscribeRequest() {
    return this.trigger_(CallbackId.SUBSCRIBE_REQUEST, true);
  };

  /**
   * @return {boolean}
   */

  Callbacks.prototype.hasSubscribeRequestCallback = function hasSubscribeRequestCallback() {
    return !!this.callbacks_[CallbackId.SUBSCRIBE_REQUEST];
  };

  /**
   * @param {function(!Promise<!../api/subscribe-response.SubscribeResponse>)} callback
   */

  Callbacks.prototype.setOnSubscribeResponse = function setOnSubscribeResponse(callback) {
    this.setCallback_(CallbackId.SUBSCRIBE_RESPONSE, callback);
  };

  /**
   * @param {!Promise<!../api/subscribe-response.SubscribeResponse>} responsePromise
   * @return {boolean} Whether the callback has been found.
   */

  Callbacks.prototype.triggerSubscribeResponse = function triggerSubscribeResponse(responsePromise) {
    return this.trigger_(CallbackId.SUBSCRIBE_RESPONSE, responsePromise.then(function (res) {
      return res.clone();
    }));
  };

  /**
   * @return {boolean}
   */

  Callbacks.prototype.hasSubscribeResponsePending = function hasSubscribeResponsePending() {
    return !!this.resultBuffer_[CallbackId.SUBSCRIBE_RESPONSE];
  };

  /**
   * @param {function({flow: string})} callback
   */

  Callbacks.prototype.setOnFlowStarted = function setOnFlowStarted(callback) {
    this.setCallback_(CallbackId.FLOW_STARTED, callback);
  };

  /**
   * @param {string} flow
   * @return {boolean} Whether the callback has been found.
   */

  Callbacks.prototype.triggerFlowStarted = function triggerFlowStarted(flow) {
    return this.trigger_(CallbackId.FLOW_STARTED, { flow: flow });
  };

  /**
   * @param {function({flow: string})} callback
   */

  Callbacks.prototype.setOnFlowCanceled = function setOnFlowCanceled(callback) {
    this.setCallback_(CallbackId.FLOW_CANCELED, callback);
  };

  /**
   * @param {string} flow
   * @return {boolean} Whether the callback has been found.
   */

  Callbacks.prototype.triggerFlowCanceled = function triggerFlowCanceled(flow) {
    return this.trigger_(CallbackId.FLOW_CANCELED, { flow: flow });
  };

  /**
   * @param {!CallbackId} id
   * @param {function(?)} callback
   * @private
   */

  Callbacks.prototype.setCallback_ = function setCallback_(id, callback) {
    this.callbacks_[id] = callback;
    // If result already exist, execute the callback right away.
    if (id in this.resultBuffer_) {
      this.executeCallback_(id, callback, this.resultBuffer_[id]);
    }
  };

  /**
   * @param {!CallbackId} id
   * @param {*} data
   * @return {boolean}
   * @private
   */

  Callbacks.prototype.trigger_ = function trigger_(id, data) {
    this.resultBuffer_[id] = data;
    var callback = this.callbacks_[id];
    if (callback) {
      this.executeCallback_(id, callback, data);
    }
    return !!callback;
  };

  /**
   * @param {!CallbackId} id
   * @private
   */

  Callbacks.prototype.resetCallback_ = function resetCallback_(id) {
    if (id in this.resultBuffer_) {
      delete this.resultBuffer_[id];
    }
  };

  /**
   * @param {!CallbackId} id
   * @param {function(*)} callback
   * @param {*} data
   * @private
   */

  Callbacks.prototype.executeCallback_ = function executeCallback_(id, callback, data) {
    var _this = this;

    // Always execute callbacks in a microtask.
    Promise.resolve().then(function () {
      callback(data);
      _this.resetCallback_(id);
    });
  };

  return Callbacks;
})();

exports.Callbacks = Callbacks;

},{}],28:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @interface */

var DepsDef = (function () {
  function DepsDef() {
    babelHelpers.classCallCheck(this, DepsDef);
  }

  /**
   * @return {!../model/doc.Doc}
   */

  DepsDef.prototype.doc = function doc() {};

  /**
   * @return {!Window}
   */

  DepsDef.prototype.win = function win() {};

  /**
   * @return {!../model/page-config.PageConfig}
   */

  DepsDef.prototype.pageConfig = function pageConfig() {};

  /**
   * @return {!web-activities/activity-ports.ActivityPorts}
   */

  DepsDef.prototype.activities = function activities() {};

  /**
   * @return {!../components/dialog-manager.DialogManager}
   */

  DepsDef.prototype.dialogManager = function dialogManager() {};

  /**
   * @return {!./entitlements-manager.EntitlementsManager}
   */

  DepsDef.prototype.entitlementsManager = function entitlementsManager() {};

  /**
   * @return {!./callbacks.Callbacks}
   */

  DepsDef.prototype.callbacks = function callbacks() {};

  /**
   * @return {!../runtime/storage.Storage}
   */

  DepsDef.prototype.storage = function storage() {};

  return DepsDef;
})();

exports.DepsDef = DepsDef;

},{}],29:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _apiEntitlements = require('../api/entitlements');

var _utilsJwt = require('../utils/jwt');

var _uiToast = require('../ui/toast');

var _services = require('./services');

var _runtimeServices = require('../runtime/services');

var SERVICE_ID = 'subscribe.google.com';
var TOAST_STORAGE_KEY = 'toast';

/**
 */

var EntitlementsManager = (function () {

  /**
   * @param {!Window} win
   * @param {!../model/page-config.PageConfig} config
   * @param {!./fetcher.Fetcher} fetcher
   * @param {!./deps.DepsDef} deps
   */

  function EntitlementsManager(win, config, fetcher, deps) {
    babelHelpers.classCallCheck(this, EntitlementsManager);

    /** @private @const {!Window} */
    this.win_ = win;

    /** @private @const {!../model/page-config.PageConfig} */
    this.config_ = config;

    /** @private @const {string} */
    this.publicationId_ = this.config_.getPublicationId();

    /** @private @const {!./fetcher.Fetcher} */
    this.fetcher_ = fetcher;

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!JwtHelper} */
    this.jwtHelper_ = new _utilsJwt.JwtHelper();

    /** @private {?Promise<!Entitlements>} */
    this.responsePromise_ = null;

    /** @private {number} */
    this.positiveRetries_ = 0;

    /** @private {boolean} */
    this.blockNextNotification_ = false;

    /** @private @const {!./storage.Storage} */
    this.storage_ = deps.storage();
  }

  /**
   * @param {boolean=} opt_expectPositive
   */

  EntitlementsManager.prototype.reset = function reset(opt_expectPositive) {
    this.responsePromise_ = null;
    this.positiveRetries_ = Math.max(this.positiveRetries_, opt_expectPositive ? 3 : 0);
  };

  /**
   * @return {!Promise<!Entitlements>}
   */

  EntitlementsManager.prototype.getEntitlements = function getEntitlements() {
    if (!this.responsePromise_) {
      this.responsePromise_ = this.getEntitlementsFlow_();
    }
    return this.responsePromise_;
  };

  /**
   * @return {!Promise<!Entitlements>}
   */

  EntitlementsManager.prototype.fetchEntitlements = function fetchEntitlements() {
    var _this = this;

    // TODO(dvoytenko): Replace retries with consistent fetch.
    var positiveRetries = this.positiveRetries_;
    this.positiveRetries_ = 0;
    var attempt = function () {
      positiveRetries--;
      return _this.fetch_().then(function (entitlements) {
        if (entitlements.enablesThis() || positiveRetries <= 0) {
          return entitlements;
        }
        return new Promise(function (resolve) {
          _this.win_.setTimeout(function () {
            resolve(attempt());
          }, 550);
        });
      });
    };
    return attempt();
  };

  /**
   * @param {boolean} value
   */

  EntitlementsManager.prototype.setToastShown = function setToastShown(value) {
    this.storage_.set(TOAST_STORAGE_KEY, value ? '1' : '0');
  };

  /**
   */

  EntitlementsManager.prototype.blockNextNotification = function blockNextNotification() {
    this.blockNextNotification_ = true;
  };

  /**
   */

  EntitlementsManager.prototype.unblockNextNotification = function unblockNextNotification() {
    this.blockNextNotification_ = false;
  };

  /**
   * @return {!Promise<!Entitlements>}
   */

  EntitlementsManager.prototype.getEntitlementsFlow_ = function getEntitlementsFlow_() {
    var _this2 = this;

    return this.fetchEntitlements().then(function (entitlements) {
      _this2.onEntitlementsFetched_(entitlements);
      return entitlements;
    });
  };

  /**
   * @param {!Entitlements} entitlements
   * @private
   */

  EntitlementsManager.prototype.onEntitlementsFetched_ = function onEntitlementsFetched_(entitlements) {
    // Skip any notifications and toast if other flows are ongoing.
    // TODO(dvoytenko): what's the right action when pay flow was canceled?
    var blockNotification = this.blockNextNotification_;
    this.blockNextNotification_ = false;
    if (blockNotification) {
      return;
    }

    // Notify on the received entitlements.
    this.deps_.callbacks().triggerEntitlementsResponse(Promise.resolve(entitlements));

    // Show a toast if needed.
    this.maybeShowToast_(entitlements);
  };

  /**
   * @param {!Entitlements} entitlements
   * @return {!Promise}
   * @private
   */

  EntitlementsManager.prototype.maybeShowToast_ = function maybeShowToast_(entitlements) {
    var _this3 = this;

    var entitlement = entitlements.getEntitlementForThis();
    if (!entitlement) {
      return Promise.resolve();
    }
    // Check if storage bit is set. It's only set by the `Entitlements.ack`
    // method.
    return this.storage_.get(TOAST_STORAGE_KEY).then(function (value) {
      if (value == '1') {
        // Already shown;
        return;
      }
      if (entitlement) {
        _this3.showToast_(entitlement);
      }
    });
  };

  /**
   * @param {!Entitlement} entitlement
   * @private
   */

  EntitlementsManager.prototype.showToast_ = function showToast_(entitlement) {
    var source = entitlement.source || 'google';
    return new _uiToast.Toast(this.deps_, _runtimeServices.feUrl('/toastiframe'), _runtimeServices.feArgs({
      'publicationId': this.publicationId_,
      'source': source
    })).open();
  };

  /**
   * @param {!Entitlements} entitlements
   * @private
   */

  EntitlementsManager.prototype.ack_ = function ack_(entitlements) {
    if (entitlements.getEntitlementForThis()) {
      this.setToastShown(true);
    }
  };

  /**
   * @return {!Promise<!Entitlements>}
   * @private
   */

  EntitlementsManager.prototype.fetch_ = function fetch_() {
    var _this4 = this;

    var url = _services.serviceUrl('/publication/' + encodeURIComponent(this.publicationId_) + '/entitlements');
    return this.fetcher_.fetchCredentialedJson(url).then(function (json) {
      var ackHandler = _this4.ack_.bind(_this4);
      var signedData = json['signedEntitlements'];
      if (signedData) {
        var jwt = _this4.jwtHelper_.decode(signedData);
        var entitlementsClaim = jwt['entitlements'];
        if (entitlementsClaim) {
          return new _apiEntitlements.Entitlements(SERVICE_ID, signedData, _apiEntitlements.Entitlement.parseListFromJson(entitlementsClaim), _this4.config_.getProductId(), ackHandler);
        }
      } else {
        var plainEntitlements = json['entitlements'];
        if (plainEntitlements) {
          return new _apiEntitlements.Entitlements(SERVICE_ID, '', _apiEntitlements.Entitlement.parseListFromJson(plainEntitlements), _this4.config_.getProductId(), ackHandler);
        }
      }
      // Empty response.
      return new _apiEntitlements.Entitlements(SERVICE_ID, '', [], _this4.config_.getProductId(), ackHandler);
    });
  };

  return EntitlementsManager;
})();

exports.EntitlementsManager = EntitlementsManager;

},{"../api/entitlements":5,"../runtime/services":36,"../ui/toast":40,"../utils/jwt":48,"./services":36}],30:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _utilsXhr = require('../utils/xhr');

/**
 * @interface
 */

var Fetcher = (function () {
  function Fetcher() {
    babelHelpers.classCallCheck(this, Fetcher);
  }

  /**
   * @implements {Fetcher}
   */

  /**
   * @param {string} unusedUrl
   * @return {!Promise<!Object>}
   */

  Fetcher.prototype.fetchCredentialedJson = function fetchCredentialedJson(unusedUrl) {};

  return Fetcher;
})();

exports.Fetcher = Fetcher;

var XhrFetcher = (function () {

  /**
   * @param {!Window} win
   */

  function XhrFetcher(win) {
    babelHelpers.classCallCheck(this, XhrFetcher);

    /** @const {!Xhr} */
    this.xhr_ = new _utilsXhr.Xhr(win);
  }

  /** @override */

  XhrFetcher.prototype.fetchCredentialedJson = function fetchCredentialedJson(url) {
    var init = /** @type {!../utils/xhr.FetchInitDef} */{
      method: 'GET',
      headers: { 'Accept': 'text/plain, application/json' },
      credentials: 'include'
    };
    return this.xhr_.fetch(url, init).then(function (response) {
      return response.json();
    });
  };

  return XhrFetcher;
})();

exports.XhrFetcher = XhrFetcher;

},{"../utils/xhr":56}],31:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _uiActivityIframeView = require('../ui/activity-iframe-view');

var _apiSubscriptions = require('../api/subscriptions');

var _utilsActivityUtils = require('../utils/activity-utils');

var _services = require('./services');

var _utilsErrors = require('../utils/errors');

var LINK_REQUEST_ID = 'swg-link';

/**
 * The flow to initiate linkback flow.
 */

var LinkbackFlow = (function () {

  /**
   * @param {!./deps.DepsDef} deps
   */

  function LinkbackFlow(deps) {
    babelHelpers.classCallCheck(this, LinkbackFlow);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!web-activities/activity-ports.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {!../model/page-config.PageConfig} */
    this.pageConfig_ = deps.pageConfig();

    /** @private @const {!../components/dialog-manager.DialogManager} */
    this.dialogManager_ = deps.dialogManager();
  }

  /**
   * The class for Link accounts flow.
   */

  /**
   * Starts the Link account flow.
   * @return {!Promise}
   */

  LinkbackFlow.prototype.start = function start() {
    this.deps_.callbacks().triggerFlowStarted(_apiSubscriptions.SubscriptionFlows.LINK_ACCOUNT);
    var opener = this.activityPorts_.open(LINK_REQUEST_ID, _services.feUrl('/linkbackstart'), '_blank', _services.feArgs({
      'publicationId': this.pageConfig_.getPublicationId()
    }), {});
    this.dialogManager_.popupOpened(opener && opener.targetWin);
    return Promise.resolve();
  };

  return LinkbackFlow;
})();

exports.LinkbackFlow = LinkbackFlow;

var LinkCompleteFlow = (function () {

  /**
   * @param {!./deps.DepsDef} deps
   */

  LinkCompleteFlow.configurePending = function configurePending(deps) {
    function handler(port) {
      deps.entitlementsManager().blockNextNotification();
      deps.callbacks().triggerLinkProgress();
      deps.dialogManager().popupClosed();
      var promise = _utilsActivityUtils.acceptPortResult(port, _services.feOrigin(),
      /* requireOriginVerified */false,
      /* requireSecureChannel */false);
      return promise.then(function (response) {
        var flow = new LinkCompleteFlow(deps, response);
        flow.start();
      }, function (reason) {
        if (_utilsErrors.isCancelError(reason)) {
          deps.callbacks().triggerFlowCanceled(_apiSubscriptions.SubscriptionFlows.LINK_ACCOUNT);
        }
      });
    };
    deps.activities().onResult(LINK_REQUEST_ID, handler);
  };

  /**
   * @param {!./deps.DepsDef} deps
   * @param {?Object} response
   */

  function LinkCompleteFlow(deps, response) {
    var _this = this;

    babelHelpers.classCallCheck(this, LinkCompleteFlow);

    /** @private @const {!Window} */
    this.win_ = deps.win();

    /** @private @const {!web-activities/activity-ports.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {!../components/dialog-manager.DialogManager} */
    this.dialogManager_ = deps.dialogManager();

    /** @private @const {!./entitlements-manager.EntitlementsManager} */
    this.entitlementsManager_ = deps.entitlementsManager();

    /** @private @const {!./callbacks.Callbacks} */
    this.callbacks_ = deps.callbacks();

    var index = response && response['index'] || '0';
    /** @private @const {!ActivityIframeView} */
    this.activityIframeView_ = new _uiActivityIframeView.ActivityIframeView(this.win_, this.activityPorts_, _services.feUrl('/linkconfirmiframe', '/u/' + index), _services.feArgs({
      'productId': deps.pageConfig().getProductId(),
      'publicationId': deps.pageConfig().getPublicationId()
    }),
    /* shouldFadeBody */true);

    /** @private {?function()} */
    this.completeResolver_ = null;

    /** @private @const {!Promise} */
    this.completePromise_ = new Promise(function (resolve) {
      _this.completeResolver_ = resolve;
    });
  }

  /**
   * Starts the Link account flow.
   * @return {!Promise}
   */

  LinkCompleteFlow.prototype.start = function start() {
    var _this2 = this;

    var promise = this.activityIframeView_.port().then(function (port) {
      return _utilsActivityUtils.acceptPortResult(port, _services.feOrigin(),
      /* requireOriginVerified */true,
      /* requireSecureChannel */true);
    });
    promise.then(function (response) {
      _this2.complete_(response);
    })['catch'](function (reason) {
      // Rethrow async.
      setTimeout(function () {
        throw reason;
      });
    }).then(function () {
      // The flow is complete.
      _this2.dialogManager_.completeView(_this2.activityIframeView_);
    });
    return this.dialogManager_.openView(this.activityIframeView_);
  };

  /**
   * @param {?Object} response
   * @private
   */

  LinkCompleteFlow.prototype.complete_ = function complete_(response) {
    this.callbacks_.triggerLinkComplete();
    this.callbacks_.resetLinkProgress();
    this.entitlementsManager_.setToastShown(true);
    this.entitlementsManager_.unblockNextNotification();
    this.entitlementsManager_.reset(response && response['success'] || false);
    this.completeResolver_();
  };

  /** @return {!Promise} */

  LinkCompleteFlow.prototype.whenComplete = function whenComplete() {
    return this.completePromise_;
  };

  return LinkCompleteFlow;
})();

exports.LinkCompleteFlow = LinkCompleteFlow;

},{"../api/subscriptions":8,"../ui/activity-iframe-view":38,"../utils/activity-utils":41,"../utils/errors":46,"./services":36}],32:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _services = require('./services');

var OffersApi = (function () {

  /**
   * @param {!../model/page-config.PageConfig} config
   * @param {!./fetcher.Fetcher} fetcher
   */

  function OffersApi(config, fetcher) {
    babelHelpers.classCallCheck(this, OffersApi);

    /** @private @const {!../model/page-config.PageConfig} */
    this.config_ = config;

    /** @private @const {!./fetcher.Fetcher} */
    this.fetcher_ = fetcher;
  }

  /**
   * @param {string=} opt_productId
   * @return {!Promise<!Array<!../api/offer.Offer>>}
   */

  OffersApi.prototype.getOffers = function getOffers(opt_productId) {
    var productId = opt_productId || this.config_.getProductId();
    if (!productId) {
      throw new Error('getOffers requires productId in config or arguments');
    }
    return this.fetch_(productId);
  };

  /**
   * @param {string} productId
   * @return {!Promise<!Array<!../api/offer.Offer>>}
   * @private
   */

  OffersApi.prototype.fetch_ = function fetch_(productId) {
    var url = _services.serviceUrl('/publication/' + encodeURIComponent(this.config_.getPublicationId()) + '/offers' + '?label=' + encodeURIComponent(productId));
    // TODO(dvoytenko): switch to a non-credentialed request after launch.
    return this.fetcher_.fetchCredentialedJson(url).then(function (json) {
      return json['offers'] || [];
    });
  };

  return OffersApi;
})();

exports.OffersApi = OffersApi;

},{"./services":36}],33:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _uiActivityIframeView = require('../ui/activity-iframe-view');

var _payFlow = require('./pay-flow');

var _apiSubscriptions = require('../api/subscriptions');

var _services = require('./services');

/**
 * The class for Offers flow.
 */

var OffersFlow = (function () {

  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.OptionsRequest|undefined} options
   */

  function OffersFlow(deps, options) {
    babelHelpers.classCallCheck(this, OffersFlow);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!Window} */
    this.win_ = deps.win();

    /** @private @const {!web-activities/activity-ports.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {!../components/dialog-manager.DialogManager} */
    this.dialogManager_ = deps.dialogManager();

    /** @private @const {!ActivityIframeView} */
    this.activityIframeView_ = new _uiActivityIframeView.ActivityIframeView(this.win_, this.activityPorts_, _services.feUrl('/offersiframe'), _services.feArgs({
      'productId': deps.pageConfig().getProductId(),
      'publicationId': deps.pageConfig().getPublicationId(),
      'showNative': deps.callbacks().hasSubscribeRequestCallback(),
      'list': options && options.list || 'default',
      'skus': options && options.skus || null
    }),
    /* shouldFadeBody */true);
  }

  /**
   * The class for subscribe option flow.
   */

  /**
   * Starts the offers flow or alreadySubscribed flow.
   * @return {!Promise}
   */

  OffersFlow.prototype.start = function start() {
    var _this = this;

    // Start/cancel events.
    this.deps_.callbacks().triggerFlowStarted(_apiSubscriptions.SubscriptionFlows.SHOW_OFFERS);
    this.activityIframeView_.onCancel(function () {
      _this.deps_.callbacks().triggerFlowCanceled(_apiSubscriptions.SubscriptionFlows.SHOW_OFFERS);
    });

    // If result is due to OfferSelection, redirect to payments.
    this.activityIframeView_.onMessage(function (result) {
      if (result['alreadySubscribed']) {
        _this.deps_.callbacks().triggerLoginRequest({
          linkRequested: !!result['linkRequested']
        });
        return;
      }
      if (result['sku']) {
        new _payFlow.PayStartFlow(_this.deps_,
        /** @type {string} */result['sku']).start();
        return;
      }
      if (result['native']) {
        _this.deps_.callbacks().triggerSubscribeRequest();
        return;
      }
    });

    return this.dialogManager_.openView(this.activityIframeView_);
  };

  return OffersFlow;
})();

exports.OffersFlow = OffersFlow;

var SubscribeOptionFlow = (function () {

  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.OptionsRequest|undefined} options
   */

  function SubscribeOptionFlow(deps, options) {
    babelHelpers.classCallCheck(this, SubscribeOptionFlow);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!../api/subscriptions.OptionsRequest|undefined} */
    this.options_ = options;

    /** @private @const {!web-activities/activity-ports.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {!../components/dialog-manager.DialogManager} */
    this.dialogManager_ = deps.dialogManager();

    /** @private @const {!ActivityIframeView} */
    this.activityIframeView_ = new _uiActivityIframeView.ActivityIframeView(deps.win(), this.activityPorts_, _services.feUrl('/optionsiframe'), _services.feArgs({
      'publicationId': deps.pageConfig().getPublicationId(),
      'productId': deps.pageConfig().getProductId(),
      'list': options && options.list || 'default',
      'skus': options && options.skus || null
    }),
    /* shouldFadeBody */false);
  }

  /**
   * The class for Abbreviated Offer flow.
   *
   */

  /**
   * Starts the offers flow or alreadySubscribed flow.
   * @return {!Promise}
   */

  SubscribeOptionFlow.prototype.start = function start() {
    var _this2 = this;

    // Start/cancel events.
    this.deps_.callbacks().triggerFlowStarted(_apiSubscriptions.SubscriptionFlows.SHOW_SUBSCRIBE_OPTION);
    this.activityIframeView_.onCancel(function () {
      _this2.deps_.callbacks().triggerFlowCanceled(_apiSubscriptions.SubscriptionFlows.SHOW_SUBSCRIBE_OPTION);
    });

    this.activityIframeView_.onMessage(function (data) {
      _this2.maybeOpenOffersFlow_(data);
    });
    this.activityIframeView_.acceptResult().then(function (result) {
      _this2.maybeOpenOffersFlow_(result.data);
    }, function (reason) {
      _this2.dialogManager_.completeView(_this2.activityIframeView_);
      throw reason;
    });
    return this.dialogManager_.openView(this.activityIframeView_);
  };

  /**
   * @param {*} data
   * @private
   */

  SubscribeOptionFlow.prototype.maybeOpenOffersFlow_ = function maybeOpenOffersFlow_(data) {
    if (data && data['subscribe']) {
      new OffersFlow(this.deps_, this.options_).start();
    }
  };

  return SubscribeOptionFlow;
})();

exports.SubscribeOptionFlow = SubscribeOptionFlow;

var AbbrvOfferFlow = (function () {

  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.OptionsRequest|undefined} options
   */

  function AbbrvOfferFlow(deps, options) {
    babelHelpers.classCallCheck(this, AbbrvOfferFlow);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!../api/subscriptions.OptionsRequest|undefined} */
    this.options_ = options;

    /** @private @const {!Window} */
    this.win_ = deps.win();

    /** @private @const {!web-activities/activity-ports.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {!../components/dialog-manager.DialogManager} */
    this.dialogManager_ = deps.dialogManager();

    /** @private @const {!ActivityIframeView} */
    this.activityIframeView_ = new _uiActivityIframeView.ActivityIframeView(this.win_, this.activityPorts_, _services.feUrl('/abbrvofferiframe'), _services.feArgs({
      'publicationId': deps.pageConfig().getPublicationId(),
      'productId': deps.pageConfig().getProductId(),
      'showNative': deps.callbacks().hasSubscribeRequestCallback(),
      'list': options && options.list || 'default',
      'skus': options && options.skus || null
    }),
    /* shouldFadeBody */false);
  }

  /**
   * Starts the offers flow
   * @return {!Promise}
   */

  AbbrvOfferFlow.prototype.start = function start() {
    var _this3 = this;

    // Start/cancel events.
    this.deps_.callbacks().triggerFlowStarted(_apiSubscriptions.SubscriptionFlows.SHOW_ABBRV_OFFER);
    this.activityIframeView_.onCancel(function () {
      _this3.deps_.callbacks().triggerFlowCanceled(_apiSubscriptions.SubscriptionFlows.SHOW_ABBRV_OFFER);
    });

    // If the user is already subscribed, trigger login flow
    this.activityIframeView_.onMessage(function (data) {
      if (data['alreadySubscribed']) {
        _this3.deps_.callbacks().triggerLoginRequest({
          linkRequested: !!data['linkRequested']
        });
        return;
      }
    });
    // If result is due to requesting offers, redirect to offers flow
    this.activityIframeView_.acceptResult().then(function (result) {
      if (result.data['viewOffers']) {
        new OffersFlow(_this3.deps_, _this3.options_).start();
        return;
      }
      if (result.data['native']) {
        _this3.deps_.callbacks().triggerSubscribeRequest();
        // The flow is complete.
        _this3.dialogManager_.completeView(_this3.activityIframeView_);
        return;
      }
    });

    return this.dialogManager_.openView(this.activityIframeView_);
  };

  return AbbrvOfferFlow;
})();

exports.AbbrvOfferFlow = AbbrvOfferFlow;

},{"../api/subscriptions":8,"../ui/activity-iframe-view":38,"./pay-flow":34,"./services":36}],34:[function(require,module,exports){
exports.__esModule = true;
exports.validatePayResponse = validatePayResponse;
exports.parseSubscriptionResponse = parseSubscriptionResponse;
exports.parseUserData = parseUserData;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _uiActivityIframeView = require('../ui/activity-iframe-view');

var _utilsJwt = require('../utils/jwt');

var _apiSubscribeResponse = require('../api/subscribe-response');

var _apiSubscriptions = require('../api/subscriptions');

var _apiUserData = require('../api/user-data');

var _utilsXhr = require('../utils/xhr');

var _utilsActivityUtils = require('../utils/activity-utils');

var _services = require('./services');

var _utilsErrors = require('../utils/errors');

var _utilsJson = require('../utils/json');

var PAY_REQUEST_ID = 'swg-pay';

/**
 * @const {!Object<string, string>}
 * @package Visible for testing only.
 */
var PAY_ORIGIN = {
  'PRODUCTION': 'https://pay.google.com',
  'SANDBOX': 'https://pay.sandbox.google.com'
};

exports.PAY_ORIGIN = PAY_ORIGIN;
/** @return {string} */
function payOrigin() {
  return PAY_ORIGIN['SANDBOX'];
}

/** @return {string} */
function payUrl() {
  return _services.feCached(PAY_ORIGIN['SANDBOX'] + '/gp/p/ui/pay');
}

/** @return {string} */
function payDecryptUrl() {
  return PAY_ORIGIN['SANDBOX'] + '/gp/p/apis/buyflow/process';
}

/**
 * The flow to initiate payment process.
 */

var PayStartFlow = (function () {

  /**
   * @param {!../utils/preconnect.Preconnect} pre
   */

  PayStartFlow.preconnect = function preconnect(pre) {
    pre.prefetch(payUrl());
  };

  /**
   * @param {!./deps.DepsDef} deps
   * @param {string} sku
   */

  function PayStartFlow(deps, sku) {
    babelHelpers.classCallCheck(this, PayStartFlow);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!Window} */
    this.win_ = deps.win();

    /** @private @const {!web-activities/activity-ports.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {!../model/page-config.PageConfig} */
    this.pageConfig_ = deps.pageConfig();

    /** @private @const {!../components/dialog-manager.DialogManager} */
    this.dialogManager_ = deps.dialogManager();

    /** @private @const {string} */
    this.sku_ = sku;
  }

  /**
   * The flow for successful payments completion.
   */

  /**
   * Starts the payments flow.
   * @return {!Promise}
   */

  PayStartFlow.prototype.start = function start() {
    // Start/cancel events.
    this.deps_.callbacks().triggerFlowStarted(_apiSubscriptions.SubscriptionFlows.SUBSCRIBE);

    // TODO(dvoytenko): switch to gpay async client.
    var opener = this.activityPorts_.open(PAY_REQUEST_ID, payUrl(), '_blank', _services.feArgs({
      'apiVersion': 1,
      'allowedPaymentMethods': ['CARD'],
      'environment': 'SANDBOX',
      'playEnvironment': 'STAGING',
      'swg': {
        'publicationId': this.pageConfig_.getPublicationId(),
        'skuId': this.sku_
      }
    }), {});
    this.dialogManager_.popupOpened(opener && opener.targetWin);
    return Promise.resolve();
  };

  return PayStartFlow;
})();

exports.PayStartFlow = PayStartFlow;

var PayCompleteFlow = (function () {

  /**
   * @param {!./deps.DepsDef} deps
   */

  PayCompleteFlow.configurePending = function configurePending(deps) {
    deps.activities().onResult(PAY_REQUEST_ID, function (port) {
      deps.dialogManager().popupClosed();
      deps.entitlementsManager().blockNextNotification();
      var flow = new PayCompleteFlow(deps);
      var promise = validatePayResponse(deps.win(), port, flow.complete.bind(flow));
      deps.callbacks().triggerSubscribeResponse(promise);
      return promise.then(function (response) {
        flow.start(response);
      }, function (reason) {
        if (_utilsErrors.isCancelError(reason)) {
          deps.callbacks().triggerFlowCanceled(_apiSubscriptions.SubscriptionFlows.SUBSCRIBE);
        }
        throw reason;
      });
    });
  };

  /**
   * @param {!./deps.DepsDef} deps
   */

  function PayCompleteFlow(deps) {
    babelHelpers.classCallCheck(this, PayCompleteFlow);

    /** @private @const {!Window} */
    this.win_ = deps.win();

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!web-activities/activity-ports.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {!../components/dialog-manager.DialogManager} */
    this.dialogManager_ = deps.dialogManager();

    /** @private @const {!../runtime/callbacks.Callbacks} */
    this.callbacks_ = deps.callbacks();

    /** @private {?ActivityIframeView} */
    this.activityIframeView_ = null;

    /** @private {?SubscribeResponse} */
    this.response_ = null;

    /** @private {?Promise} */
    this.readyPromise_ = null;
  }

  /**
    *@param {!Window} win
   * @param {!web-activities/activity-ports.ActivityPort} port
   * @param {function():!Promise} completeHandler
   * @return {!Promise<!SubscribeResponse>}
   * @package Visible for testing only.
   */

  /**
   * Starts the payments completion flow.
   * @param {!SubscribeResponse} response
   * @return {!Promise}
   */

  PayCompleteFlow.prototype.start = function start(response) {
    var _this = this;

    this.deps_.entitlementsManager().reset(true);
    this.response_ = response;
    this.activityIframeView_ = new _uiActivityIframeView.ActivityIframeView(this.win_, this.activityPorts_, _services.feUrl('/payconfirmiframe'), _services.feArgs({
      'publicationId': this.deps_.pageConfig().getPublicationId(),
      'loginHint': response.userData && response.userData.email
    }),
    /* shouldFadeBody */true);
    this.activityIframeView_.acceptResult().then(function () {
      // The flow is complete.
      _this.dialogManager_.completeView(_this.activityIframeView_);
    });
    this.readyPromise_ = this.dialogManager_.openView(this.activityIframeView_);
    return this.readyPromise_;
  };

  /**
   * @return {!Promise}
   */

  PayCompleteFlow.prototype.complete = function complete() {
    var _this2 = this;

    this.deps_.entitlementsManager().unblockNextNotification();
    this.readyPromise_.then(function () {
      _this2.activityIframeView_.message({ 'complete': true });
    });
    return this.activityIframeView_.acceptResult()['catch'](function () {
      // Ignore errors.
    }).then(function () {
      _this2.deps_.entitlementsManager().setToastShown(true);
    });
  };

  return PayCompleteFlow;
})();

exports.PayCompleteFlow = PayCompleteFlow;

function validatePayResponse(win, port, completeHandler) {
  return _utilsActivityUtils.acceptPortResult(port, payOrigin(),
  // TODO(dvoytenko): support payload decryption.
  /* requireOriginVerified */false,
  /* requireSecureChannel */false).then(function (data) {
    if (data['redirectEncryptedCallbackData']) {
      var xhr = new _utilsXhr.Xhr(win);
      var url = payDecryptUrl();
      var init = /** @type {!../utils/xhr.FetchInitDef} */{
        method: 'post',
        headers: { 'Accept': 'text/plain, application/json' },
        credentials: 'include',
        body: data['redirectEncryptedCallbackData'],
        mode: 'cors'
      };
      return xhr.fetch(url, init).then(function (response) {
        return response.json();
      });
    }
    // TODO(dvoytenko): prohibit this branch in case of redirect.
    return data;
  }).then(function (data) {
    return parseSubscriptionResponse(data, completeHandler);
  });
}

/**
 * @param {*} data
 * @param {function():!Promise} completeHandler
 * @return {!SubscribeResponse}
 */

function parseSubscriptionResponse(data, completeHandler) {
  var swgData = null;
  var raw = null;
  if (data) {
    if (typeof data == 'string') {
      raw = /** @type {string} */data;
    } else {
      // Assume it's a json object in the format:
      // `{integratorClientCallbackData: "..."}` or `{swgCallbackData: "..."}`.
      var json = /** @type {!Object} */data;
      if ('swgCallbackData' in json) {
        swgData = /** @type {!Object} */json['swgCallbackData'];
      } else if ('integratorClientCallbackData' in json) {
        raw = json['integratorClientCallbackData'];
      }
    }
  }
  if (raw && !swgData) {
    raw = atob(raw);
    if (raw) {
      var parsed = _utilsJson.parseJson(raw);
      swgData = parsed['swgCallbackData'];
    }
  }
  if (!swgData) {
    throw new Error('unexpected payment response');
  }
  raw = JSON.stringify( /** @type {!JsonObject} */swgData);
  return new _apiSubscribeResponse.SubscribeResponse(raw, parsePurchaseData(swgData), parseUserData(swgData), completeHandler);
}

/**
 * @param {!Object} swgData
 * @return {!PurchaseData}
 */
function parsePurchaseData(swgData) {
  var raw = swgData['purchaseData'];
  var signature = swgData['purchaseDataSignature'];
  return new _apiSubscribeResponse.PurchaseData(raw, signature);
}

/**
 * @param {!Object} swgData
 * @return {?UserData}
 * @package Visible for testing.
 */

function parseUserData(swgData) {
  var idToken = swgData['idToken'];
  if (!idToken) {
    return null;
  }
  var jwt = /** @type {!Object} */new _utilsJwt.JwtHelper().decode(idToken);
  return new _apiUserData.UserData(idToken, jwt);
}

},{"../api/subscribe-response":7,"../api/subscriptions":8,"../api/user-data":9,"../ui/activity-iframe-view":38,"../utils/activity-utils":41,"../utils/errors":46,"../utils/json":47,"../utils/jwt":48,"../utils/xhr":56,"./services":36}],35:[function(require,module,exports){
exports.__esModule = true;
exports.getRuntime = getRuntime;
exports.installRuntime = installRuntime;
exports.getSubscriptionsClassForTesting = getSubscriptionsClassForTesting;
exports.getFetcherClassForTesting = getFetcherClassForTesting;
exports.getDocClassForTesting = getDocClassForTesting;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _webActivitiesActivityPorts = require('web-activities/activity-ports');

var _buildCssComponentsDialogCss = require('../../build/css/components/dialog.css');

var _callbacks = require('./callbacks');

var _deps = require('./deps');

var _componentsDialogManager = require('../components/dialog-manager');

var _modelDoc = require('../model/doc');

var _entitlementsManager = require('./entitlements-manager');

var _fetcher = require('./fetcher');

var _linkAccountsFlow = require('./link-accounts-flow');

var _offersApi = require('./offers-api');

var _offersFlow = require('./offers-flow');

var _modelPageConfig = require('../model/page-config');

var _modelPageConfigResolver = require('../model/page-config-resolver');

var _payFlow = require('./pay-flow');

var _utilsPreconnect = require('../utils/preconnect');

var _storage = require('./storage');

var _apiSubscriptions = require('../api/subscriptions');

var _utilsDom = require('../utils/dom');

var _utilsTypes = require('../utils/types');

var RUNTIME_PROP = 'SWG';
var RUNTIME_LEGACY_PROP = 'SUBSCRIPTIONS'; // MIGRATE

/** @private {Runtime} */
var runtimeInstance_ = undefined;

/**
 * Returns runtime for testing if available. Throws if the runtime is not
 * initialized yet.
 * @visibleForTesting
 * @return {!Runtime}
 */

function getRuntime() {
  if (!runtimeInstance_) {
    throw new Error('not initialized yet');
  }
  return runtimeInstance_;
}

/**
 * @param {!Window} win
 */

function installRuntime(win) {
  if (win[RUNTIME_PROP] && !_utilsTypes.isArray(win[RUNTIME_PROP])) {
    return;
  }

  var runtime = new Runtime(win);

  var waitingArray = [].concat(win[RUNTIME_PROP], win[RUNTIME_LEGACY_PROP]);

  // Public runtime.
  var publicRuntime = createPublicRuntime(runtime);

  var dependencyInstaller = {};

  /**
   * @param {function(!Subscriptions)} callback
   */
  function pushDependency(callback) {
    if (!callback) {
      return;
    }
    runtime.whenReady().then(function () {
      callback(publicRuntime);
    });
  }
  Object.defineProperty(dependencyInstaller, 'push', {
    get: function () {
      return pushDependency;
    },
    configurable: false
  });
  win[RUNTIME_PROP] = dependencyInstaller;
  win[RUNTIME_LEGACY_PROP] = dependencyInstaller;
  if (waitingArray) {
    waitingArray.forEach(pushDependency);
  }
  runtimeInstance_ = runtime;
  runtime.startSubscriptionsFlowIfNeeded();
}

/**
 * @implements {Subscriptions}
 */

var Runtime = (function () {
  /**
   * @param {!Window} win
   */

  function Runtime(win) {
    var _this = this;

    babelHelpers.classCallCheck(this, Runtime);

    /** @private @const {!Window} */
    this.win_ = win;

    /** @private @const {!Doc} */
    this.doc_ = _modelDoc.resolveDoc(win);

    /** @private @const {!Promise} */
    this.ready_ = Promise.resolve();

    /** @private {?string} */
    this.productOrPublicationId_ = null;

    /** @private {boolean} */
    this.committed_ = false;

    /** @private {?function((!ConfiguredRuntime|!Promise))} */
    this.configuredResolver_ = null;

    /** @private @const {!Promise<!ConfiguredRuntime>} */
    this.configuredPromise_ = new Promise(function (resolve) {
      _this.configuredResolver_ = resolve;
    });

    /** @private {?PageConfigResolver} */
    this.pageConfigResolver_ = null;
  }

  /**
   * @implements {DepsDef}
   * @implements {Subscriptions}
   */

  /**
   * @return {!Promise}
   */

  Runtime.prototype.whenReady = function whenReady() {
    return this.ready_;
  };

  /**
   * @param {boolean} commit
   * @return {!Promise<!ConfiguredRuntime>}
   * @private
   */

  Runtime.prototype.configured_ = function configured_(commit) {
    var _this2 = this;

    if (!this.committed_ && commit) {
      this.committed_ = true;
      /** @type {!Promise<!PageConfig>} */
      var configPromise = undefined;
      if (this.productOrPublicationId_) {
        configPromise = Promise.resolve(new _modelPageConfig.PageConfig(this.productOrPublicationId_,
        /* locked */false));
      } else {
        this.pageConfigResolver_ = new _modelPageConfigResolver.PageConfigResolver(this.doc_);
        configPromise = this.pageConfigResolver_.resolveConfig().then(function (config) {
          _this2.pageConfigResolver_ = null;
          return config;
        });
      }
      configPromise.then(function (config) {
        _this2.configuredResolver_(new ConfiguredRuntime(_this2.doc_, config));
        _this2.configuredResolver_ = null;
      }, function (reason) {
        _this2.configuredResolver_(Promise.reject(reason));
        _this2.configuredResolver_ = null;
      });
    } else if (commit && this.pageConfigResolver_) {
      this.pageConfigResolver_.check();
    }
    return this.configuredPromise_;
  };

  /**
   * Starts the subscription flow if it hasn't been started and the page is
   * configured to start it automatically.
   *
   * @return {?Promise}
   * @package
   */

  Runtime.prototype.startSubscriptionsFlowIfNeeded = function startSubscriptionsFlowIfNeeded() {
    var control = _modelPageConfigResolver.getControlFlag(this.win_.document);
    if (control == 'manual') {
      // "Skipping automatic start because control flag is set to "manual".
      return null;
    }
    return this.start();
  };

  /** @override */

  Runtime.prototype.init = function init(productOrPublicationId) {
    if (this.committed_) {
      throw new Error('already configured');
    }
    this.productOrPublicationId_ = productOrPublicationId;
  };

  /** @override */

  Runtime.prototype.start = function start() {
    return this.configured_(true).then(function (runtime) {
      return runtime.start();
    });
  };

  /** @override */

  Runtime.prototype.reset = function reset() {
    return this.configured_(true).then(function (runtime) {
      return runtime.reset();
    });
  };

  /** @override */

  Runtime.prototype.getEntitlements = function getEntitlements() {
    return this.configured_(true).then(function (runtime) {
      return runtime.getEntitlements();
    });
  };

  /** @override */

  Runtime.prototype.setOnEntitlementsResponse = function setOnEntitlementsResponse(callback) {
    return this.configured_(false).then(function (runtime) {
      return runtime.setOnEntitlementsResponse(callback);
    });
  };

  /** @override */

  Runtime.prototype.getOffers = function getOffers(opt_options) {
    return this.configured_(true).then(function (runtime) {
      return runtime.getOffers(opt_options);
    });
  };

  /** @override */

  Runtime.prototype.showOffers = function showOffers(opt_options) {
    return this.configured_(true).then(function (runtime) {
      return runtime.showOffers(opt_options);
    });
  };

  /** @override */

  Runtime.prototype.showSubscribeOption = function showSubscribeOption(opt_options) {
    return this.configured_(true).then(function (runtime) {
      return runtime.showSubscribeOption(opt_options);
    });
  };

  /** @override */

  Runtime.prototype.showAbbrvOffer = function showAbbrvOffer(opt_options) {
    return this.configured_(true).then(function (runtime) {
      return runtime.showAbbrvOffer(opt_options);
    });
  };

  /** @override */

  Runtime.prototype.setOnNativeSubscribeRequest = function setOnNativeSubscribeRequest(callback) {
    return this.configured_(false).then(function (runtime) {
      return runtime.setOnNativeSubscribeRequest(callback);
    });
  };

  /** @override */

  Runtime.prototype.setOnSubscribeResponse = function setOnSubscribeResponse(callback) {
    return this.configured_(false).then(function (runtime) {
      return runtime.setOnSubscribeResponse(callback);
    });
  };

  /** @override */

  Runtime.prototype.subscribe = function subscribe(sku) {
    return this.configured_(true).then(function (runtime) {
      return runtime.subscribe(sku);
    });
  };

  /** @override */

  Runtime.prototype.setOnLoginRequest = function setOnLoginRequest(callback) {
    return this.configured_(false).then(function (runtime) {
      return runtime.setOnLoginRequest(callback);
    });
  };

  /** @override */

  Runtime.prototype.setOnLinkComplete = function setOnLinkComplete(callback) {
    return this.configured_(false).then(function (runtime) {
      return runtime.setOnLinkComplete(callback);
    });
  };

  /** @override */

  Runtime.prototype.linkAccount = function linkAccount() {
    return this.configured_(true).then(function (runtime) {
      return runtime.linkAccount();
    });
  };

  /** @override */

  Runtime.prototype.setOnFlowStarted = function setOnFlowStarted(callback) {
    return this.configured_(false).then(function (runtime) {
      return runtime.setOnFlowStarted(callback);
    });
  };

  /** @override */

  Runtime.prototype.setOnFlowCanceled = function setOnFlowCanceled(callback) {
    return this.configured_(false).then(function (runtime) {
      return runtime.setOnFlowCanceled(callback);
    });
  };

  return Runtime;
})();

exports.Runtime = Runtime;

var ConfiguredRuntime = (function () {

  /**
   * @param {!Window|!Document|!Doc} winOrDoc
   * @param {!../model/page-config.PageConfig} config
   * @param {{
   *     fetcher: (!Fetcher|undefined),
   *   }=} opt_integr
   */

  function ConfiguredRuntime(winOrDoc, config, opt_integr) {
    babelHelpers.classCallCheck(this, ConfiguredRuntime);

    /** @private @const {!Doc} */
    this.doc_ = _modelDoc.resolveDoc(winOrDoc);

    /** @private @const {!Window} */
    this.win_ = this.doc_.getWin();

    /** @private @const {!../model/page-config.PageConfig} */
    this.config_ = config;

    /** @private @const {!Promise} */
    this.documentParsed_ = this.doc_.whenReady();

    /** @private @const {!Fetcher} */
    this.fetcher_ = opt_integr && opt_integr.fetcher || new _fetcher.XhrFetcher(this.win_);

    /** @private @const {!Storage} */
    this.storage_ = new _storage.Storage(this.win_);

    /** @private @const {!DialogManager} */
    this.dialogManager_ = new _componentsDialogManager.DialogManager(this.doc_);

    /** @private @const {!web-activities/activity-ports.ActivityPorts} */
    this.activityPorts_ = new _webActivitiesActivityPorts.ActivityPorts(this.win_);

    /** @private @const {!Callbacks} */
    this.callbacks_ = new _callbacks.Callbacks();

    /** @private @const {!EntitlementsManager} */
    this.entitlementsManager_ = new _entitlementsManager.EntitlementsManager(this.win_, this.config_, this.fetcher_, this);

    /** @private @const {!OffersApi} */
    this.offersApi_ = new _offersApi.OffersApi(this.config_, this.fetcher_);

    var preconnect = new _utilsPreconnect.Preconnect(this.win_.document);

    _linkAccountsFlow.LinkCompleteFlow.configurePending(this);
    _payFlow.PayCompleteFlow.configurePending(this);
    _payFlow.PayStartFlow.preconnect(preconnect);

    _utilsDom.injectStyleSheet(this.win_.document, _buildCssComponentsDialogCss.CSS);
  }

  /**
   * @param {!Runtime} runtime
   * @return {!Subscriptions}
   */

  /** @override */

  ConfiguredRuntime.prototype.doc = function doc() {
    return this.doc_;
  };

  /** @override */

  ConfiguredRuntime.prototype.win = function win() {
    return this.win_;
  };

  /** @override */

  ConfiguredRuntime.prototype.pageConfig = function pageConfig() {
    return this.config_;
  };

  /** @override */

  ConfiguredRuntime.prototype.activities = function activities() {
    return this.activityPorts_;
  };

  /** @override */

  ConfiguredRuntime.prototype.dialogManager = function dialogManager() {
    return this.dialogManager_;
  };

  /** @override */

  ConfiguredRuntime.prototype.entitlementsManager = function entitlementsManager() {
    return this.entitlementsManager_;
  };

  /** @override */

  ConfiguredRuntime.prototype.callbacks = function callbacks() {
    return this.callbacks_;
  };

  /** @override */

  ConfiguredRuntime.prototype.storage = function storage() {
    return this.storage_;
  };

  /** @override */

  ConfiguredRuntime.prototype.init = function init() {}
  // Implemented by the `Runtime` class.

  /** @override */
  ;

  ConfiguredRuntime.prototype.reset = function reset() {
    this.entitlementsManager_.reset();
    this.dialogManager_.completeAll();
  };

  /** @override */

  ConfiguredRuntime.prototype.start = function start() {
    // No need to run entitlements without a product or for an unlocked page.
    if (!this.config_.getProductId() || !this.config_.isLocked()) {
      return Promise.resolve();
    }
    this.getEntitlements();
  };

  /** @override */

  ConfiguredRuntime.prototype.getEntitlements = function getEntitlements() {
    return this.entitlementsManager_.getEntitlements().then(function (entitlements) {
      return entitlements.clone();
    });
  };

  /** @override */

  ConfiguredRuntime.prototype.setOnEntitlementsResponse = function setOnEntitlementsResponse(callback) {
    this.callbacks_.setOnEntitlementsResponse(callback);
  };

  /** @override */

  ConfiguredRuntime.prototype.getOffers = function getOffers(opt_options) {
    return this.offersApi_.getOffers(opt_options && opt_options.productId);
  };

  /** @override */

  ConfiguredRuntime.prototype.showOffers = function showOffers(opt_options) {
    var _this3 = this;

    return this.documentParsed_.then(function () {
      var flow = new _offersFlow.OffersFlow(_this3, opt_options);
      return flow.start();
    });
  };

  /** @override */

  ConfiguredRuntime.prototype.showSubscribeOption = function showSubscribeOption(opt_options) {
    var _this4 = this;

    return this.documentParsed_.then(function () {
      var flow = new _offersFlow.SubscribeOptionFlow(_this4, opt_options);
      return flow.start();
    });
  };

  /** @override */

  ConfiguredRuntime.prototype.showAbbrvOffer = function showAbbrvOffer(opt_options) {
    var _this5 = this;

    return this.documentParsed_.then(function () {
      var flow = new _offersFlow.AbbrvOfferFlow(_this5, opt_options);
      return flow.start();
    });
  };

  /** @override */

  ConfiguredRuntime.prototype.setOnLoginRequest = function setOnLoginRequest(callback) {
    this.callbacks_.setOnLoginRequest(callback);
  };

  /** @override */

  ConfiguredRuntime.prototype.setOnLinkComplete = function setOnLinkComplete(callback) {
    this.callbacks_.setOnLinkComplete(callback);
  };

  /** @override */

  ConfiguredRuntime.prototype.linkAccount = function linkAccount() {
    var _this6 = this;

    return this.documentParsed_.then(function () {
      return new _linkAccountsFlow.LinkbackFlow(_this6).start();
    });
  };

  /** @override */

  ConfiguredRuntime.prototype.setOnNativeSubscribeRequest = function setOnNativeSubscribeRequest(callback) {
    this.callbacks_.setOnSubscribeRequest(callback);
  };

  /** @override */

  ConfiguredRuntime.prototype.setOnSubscribeResponse = function setOnSubscribeResponse(callback) {
    this.callbacks_.setOnSubscribeResponse(callback);
  };

  /** @override */

  ConfiguredRuntime.prototype.subscribe = function subscribe(sku) {
    var _this7 = this;

    return this.documentParsed_.then(function () {
      return new _payFlow.PayStartFlow(_this7, sku).start();
    });
  };

  /** @override */

  ConfiguredRuntime.prototype.setOnFlowStarted = function setOnFlowStarted(callback) {
    this.callbacks_.setOnFlowStarted(callback);
  };

  /** @override */

  ConfiguredRuntime.prototype.setOnFlowCanceled = function setOnFlowCanceled(callback) {
    this.callbacks_.setOnFlowCanceled(callback);
  };

  return ConfiguredRuntime;
})();

exports.ConfiguredRuntime = ConfiguredRuntime;
function createPublicRuntime(runtime) {
  return (/** @type {!Subscriptions} */{
      init: runtime.init.bind(runtime),
      start: runtime.start.bind(runtime),
      reset: runtime.reset.bind(runtime),
      getEntitlements: runtime.getEntitlements.bind(runtime),
      linkAccount: runtime.linkAccount.bind(runtime),
      getOffers: runtime.getOffers.bind(runtime),
      showOffers: runtime.showOffers.bind(runtime),
      showAbbrvOffer: runtime.showAbbrvOffer.bind(runtime),
      showSubscribeOption: runtime.showSubscribeOption.bind(runtime),
      subscribe: runtime.subscribe.bind(runtime),
      setOnEntitlementsResponse: runtime.setOnEntitlementsResponse.bind(runtime),
      setOnLoginRequest: runtime.setOnLoginRequest.bind(runtime),
      setOnLinkComplete: runtime.setOnLinkComplete.bind(runtime),
      setOnNativeSubscribeRequest: runtime.setOnNativeSubscribeRequest.bind(runtime),
      setOnSubscribeResponse: runtime.setOnSubscribeResponse.bind(runtime),
      setOnFlowStarted: runtime.setOnFlowStarted.bind(runtime),
      setOnFlowCanceled: runtime.setOnFlowCanceled.bind(runtime)
    }
  );
}

/**
 * @return {!Function}
 * @protected
 */

function getSubscriptionsClassForTesting() {
  return _apiSubscriptions.Subscriptions;
}

/**
 * @return {!Function}
 * @protected
 */

function getFetcherClassForTesting() {
  return _fetcher.Fetcher;
}

/** @package Visible for testing only. */

function getDocClassForTesting() {
  return _modelDoc.Doc;
}

},{"../../build/css/components/dialog.css":1,"../api/subscriptions":8,"../components/dialog-manager":10,"../model/doc":17,"../model/page-config":19,"../model/page-config-resolver":18,"../utils/dom":45,"../utils/preconnect":51,"../utils/types":54,"./callbacks":27,"./deps":28,"./entitlements-manager":29,"./fetcher":30,"./link-accounts-flow":31,"./offers-api":32,"./offers-flow":33,"./pay-flow":34,"./storage":37,"web-activities/activity-ports":4}],36:[function(require,module,exports){
exports.__esModule = true;
exports.feOrigin = feOrigin;
exports.serviceUrl = serviceUrl;
exports.feUrl = feUrl;
exports.feCached = feCached;
exports.feArgs = feArgs;
exports.cacheParam = cacheParam;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _utilsUrl = require('../utils/url');

/**
 * Have to put these in the map to avoid compiler optimization. Due to
 * optimization issues, this map only allows property-style keys. E.g. "hr1",
 * as opposed to "1hr".
 * @type {!Object<string, number>}
 * @package Visible for testing only.
 */
var CACHE_KEYS = {
  'nocache': 1,
  'hr1': 3600000, // 1hr = 1000 * 60 * 60
  'hr12': 43200000 };

exports.CACHE_KEYS = CACHE_KEYS;
/**
 * @return {string}
 */
// 12hr = 1000 * 60 * 60 * 12

function feOrigin() {
  return _utilsUrl.parseUrl('https://subscribe-autopush.sandbox.google.com').origin;
}

/**
 * @param {string} url Relative URL, e.g. "/service1".
 * @return {string} The complete URL.
 */

function serviceUrl(url) {
  return 'https://subscribe-autopush.sandbox.google.com/swg/_/api/v1' + url;
}

/**
 * @param {string} url Relative URL, e.g. "/offersiframe".
 * @param {string=} prefix
 * @return {string} The complete URL.
 */

function feUrl(url) {
  var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  return feCached('https://subscribe-autopush.sandbox.google.com' + prefix + '/swg/_/ui/v1' + url);
}

/**
 * @param {string} url FE URL.
 * @return {string} The complete URL including cache params.
 */

function feCached(url) {
  return _utilsUrl.addQueryParam(url, '_', cacheParam('nocache'));
}

/**
 * @param {!Object<string, ?>} args
 * @return {!Object<string, ?>}
 */

function feArgs(args) {
  return Object.assign(args, {
    '_client': 'SwG 0.1.22-1523207997232'
  });
}

/**
 * @param {string} cacheKey
 * @return {string}
 * @package Visible for testing only.
 */

function cacheParam(cacheKey) {
  var period = CACHE_KEYS[cacheKey];
  if (period == null) {
    period = 1;
  }
  if (period === 0) {
    return '_';
  }
  var now = Date.now();
  return String(period <= 1 ? now : Math.floor(now / period));
}

},{"../utils/url":55}],37:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var PREFIX = 'subscribe.google.com';

var Storage = (function () {

  /**
   * @param {!Window} win
   */

  function Storage(win) {
    babelHelpers.classCallCheck(this, Storage);

    /** @private @const {!Window} */
    this.win_ = win;

    /** @private @const {!Object<string, !Promise<?string>>} */
    this.values_ = {};
  }

  /**
   * @param {string} key
   * @return {string}
   */

  /**
   * @param {string} key
   * @return {!Promise<?string>}
   */

  Storage.prototype.get = function get(key) {
    var _this = this;

    if (!this.values_[key]) {
      this.values_[key] = new Promise(function (resolve) {
        if (_this.win_.sessionStorage) {
          try {
            resolve(_this.win_.sessionStorage.getItem(storageKey(key)));
          } catch (e) {
            // Ignore error.
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    }
    return this.values_[key];
  };

  /**
   * @param {string} key
   * @param {string} value
   * @return {!Promise}
   */

  Storage.prototype.set = function set(key, value) {
    var _this2 = this;

    this.values_[key] = Promise.resolve(value);
    return new Promise(function (resolve) {
      if (_this2.win_.sessionStorage) {
        try {
          _this2.win_.sessionStorage.setItem(storageKey(key), value);
        } catch (e) {
          // Ignore error.
        }
      }
      resolve();
    });
  };

  return Storage;
})();

exports.Storage = Storage;
function storageKey(key) {
  return PREFIX + ':' + key;
}

},{}],38:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _componentsView = require('../components/view');

var _utilsDom = require('../utils/dom');

var _utilsErrors = require('../utils/errors');

/** @const {!Object<string, string>} */
var iframeAttributes = {
  'frameborder': '0',
  'scrolling': 'no'
};

/**
 * Class to build and render Activity iframe view.
 */

var ActivityIframeView = (function (_View) {
  babelHelpers.inherits(ActivityIframeView, _View);

  /**
   * @param {!Window} win
   * @param {!web-activities/activity-ports.ActivityPorts} activityPorts
   * @param {string} src
   * @param {!Object<string, ?>=} args
   * @param {boolean=} shouldFadeBody
   */

  function ActivityIframeView(win, activityPorts, src, args) {
    var _this = this;

    var shouldFadeBody = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
    babelHelpers.classCallCheck(this, ActivityIframeView);

    _View.call(this);

    /** @private @const {!Window} */
    this.win_ = win;

    /** @private @const {!Document} */
    this.doc_ = this.win_.document;

    /** @private @const {!HTMLIFrameElement} */
    this.iframe_ =
    /** @type {!HTMLIFrameElement} */_utilsDom.createElement(this.doc_, 'iframe', iframeAttributes);

    /** @private @const {!web-activities/activity-ports.ActivityPorts} */
    this.activityPorts_ = activityPorts;

    /** @private @const {string} */
    this.src_ = src;

    /** @private @const {!Object<string, ?>} */
    this.args_ = args || {};

    /** @private @const {boolean} */
    this.shouldFadeBody_ = shouldFadeBody;

    /** @private {?web-activities/activity-ports.ActivityIframePort} */
    this.port_ = null;

    /**
     * @private
     * {?function<!web-activities/activity-ports.ActivityIframePort|!Promise>}
     */
    this.portResolver_ = null;

    /**
     * @private @const
     * {!Promise<!web-activities/activity-ports.ActivityIframePort>}
     */
    this.portPromise_ = new Promise(function (resolve) {
      _this.portResolver_ = resolve;
    });
  }

  /** @override */

  ActivityIframeView.prototype.getElement = function getElement() {
    return this.iframe_;
  };

  /** @override */

  ActivityIframeView.prototype.init = function init(dialog) {
    var _this2 = this;

    return this.activityPorts_.openIframe(this.iframe_, this.src_, this.args_).then(function (port) {
      return _this2.onOpenIframeResponse_(port, dialog);
    });
  };

  /**
   * Returns if document should fade for this view.
   * @return {boolean}
   */

  ActivityIframeView.prototype.shouldFadeBody = function shouldFadeBody() {
    return this.shouldFadeBody_;
  };

  /**
   * @param {!web-activities/activity-ports.ActivityIframePort} port
   * @param {!../components/dialog.Dialog} dialog
   * @return {!Promise}
   */

  ActivityIframeView.prototype.onOpenIframeResponse_ = function onOpenIframeResponse_(port, dialog) {
    var _this3 = this;

    this.port_ = port;
    this.portResolver_(port);

    this.port_.onResizeRequest(function (height) {
      dialog.resizeView(_this3, height);
    });

    return this.port_.whenReady();
  };

  /**
   * @return {!Promise<!web-activities/activity-ports.ActivityIframePort>}
   */

  ActivityIframeView.prototype.port = function port() {
    return this.portPromise_;
  };

  /**
   * @param {!Object} data
   */

  ActivityIframeView.prototype.message = function message(data) {
    this.port().then(function (port) {
      port.message(data);
    });
  };

  /**
   * Handles the message received by the port.
   * @param {function(!Object<string, string|boolean>)} callback
   */

  ActivityIframeView.prototype.onMessage = function onMessage(callback) {
    this.port().then(function (port) {
      port.onMessage(callback);
    });
  };

  /**
   * Accepts results from the caller.
   * @return {!Promise<!web-activities/activity-ports.ActivityResult>}
   */

  ActivityIframeView.prototype.acceptResult = function acceptResult() {
    return this.port().then(function (port) {
      return port.acceptResult();
    });
  };

  /**
   * Completes the flow.
   * @return {!Promise}
   */

  ActivityIframeView.prototype.whenComplete = function whenComplete() {
    return this.acceptResult();
  };

  /**
   * @param {function()} callback
   */

  ActivityIframeView.prototype.onCancel = function onCancel(callback) {
    this.acceptResult()['catch'](function (reason) {
      if (_utilsErrors.isCancelError(reason)) {
        callback();
      }
      throw reason;
    });
  };

  /** @override */

  ActivityIframeView.prototype.resized = function resized() {
    if (this.port_) {
      this.port_.resized();
    }
  };

  return ActivityIframeView;
})(_componentsView.View);

exports.ActivityIframeView = ActivityIframeView;

},{"../components/view":14,"../utils/dom":45,"../utils/errors":46}],39:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _utilsDom = require('../utils/dom');

/**
 * Loading indicator class. Builds the loading indicator view to be injected in
 * parent element <iframe class="swg-dialog"> element. Provides methods to
 * show/hide loading indicator.
 */

var LoadingView = (function () {

  /**
   * @param {!Document} doc
   */

  function LoadingView(doc) {
    babelHelpers.classCallCheck(this, LoadingView);

    /** @private @const {!Document} */
    this.doc_ = doc;

    /** @private @const {!Element} */
    this.loadingContainer_ = _utilsDom.createElement(this.doc_, 'swg-loading', {});

    this.loadingContainer_.style.setProperty('display', 'none', 'important');

    // Build the animated loading indicator.
    this.buildLoadingIndicator_();
  }

  /**
   * Gets the populated loading container.
   * @return {!Element}
   */

  LoadingView.prototype.getElement = function getElement() {
    return this.loadingContainer_;
  };

  /*
   * Shows the loading indicator within the container element.
   */

  LoadingView.prototype.show = function show() {
    this.loadingContainer_.style.removeProperty('display');
  };

  /*
   * Hides the loading indicator within the container element.
   */

  LoadingView.prototype.hide = function hide() {
    this.loadingContainer_.style.setProperty('display', 'none', 'important');
  };

  /*
   * Populates the loading indivicator. The populated element
   * can be added in any view, when required.
   * @private
   */

  LoadingView.prototype.buildLoadingIndicator_ = function buildLoadingIndicator_() {
    var loadingContainer = this.loadingContainer_;

    var loadingIndicatorTopContainer = _utilsDom.createElement(this.doc_, 'swg-loading-animate', {});
    loadingContainer.appendChild(loadingIndicatorTopContainer);

    var loadingIndicatorChildContainer = _utilsDom.createElement(this.doc_, 'swg-loading-image', {});
    loadingIndicatorTopContainer.appendChild(loadingIndicatorChildContainer);
  };

  return LoadingView;
})();

exports.LoadingView = LoadingView;

},{"../utils/dom":45}],40:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _utilsDom = require('../utils/dom');

var _utilsStyle = require('../utils/style');

/** @const {!Object<string, string|number>} */
var toastImportantStyles = {
  'position': 'fixed',
  'bottom': 0,
  'height': 0,
  'max-height': '46px',
  'z-index': '2147483647',
  'border': 'none'
};

exports.toastImportantStyles = toastImportantStyles;
/** @typedef {{
 *    text: string,
 *    action: ({label: string, handler: function()}|undefined)
 *  }}
 */
var ToastSpecDef = undefined;

exports.ToastSpecDef = ToastSpecDef;
/** @const {!Object<string, string>} */
var iframeAttributes = {
  'frameborder': '0',
  'scrolling': 'no',
  'class': 'swg-toast'
};

/**
 * The class Notification toast.
 */

var Toast = (function () {

  /**
   * @param {!../runtime/deps.DepsDef} deps
   * @param {string} src
   * @param {!Object<string, ?>} args
   */

  function Toast(deps, src, args) {
    var _this = this;

    babelHelpers.classCallCheck(this, Toast);

    /** @private @const {!../model/doc.Doc} */
    this.doc_ = deps.doc();

    /** @private @const {!web-activities/activity-ports.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {string} */
    this.src_ = src;

    /** @private @const {!Object<string, ?>} */
    this.args_ = args;

    /** @private @const {!HTMLIFrameElement} */
    this.iframe_ =
    /** @type {!HTMLIFrameElement} */_utilsDom.createElement(this.doc_.getWin().document, 'iframe', iframeAttributes);

    _utilsStyle.setImportantStyles(this.iframe_, toastImportantStyles);

    /** @private @const {!Promise} */
    this.ready_ = new Promise(function (resolve) {
      _this.iframe_.onload = resolve;
    });
  }

  /**
   * Returns the iframe element.
   * @return {!HTMLIFrameElement}
   */

  Toast.prototype.getElement = function getElement() {
    return this.iframe_;
  };

  /**
   * Opens the notification toast.
   * @return {!Promise}
   */

  Toast.prototype.open = function open() {
    this.doc_.getBody().appendChild(this.iframe_); // Fires onload.
    return this.buildToast_();
  };

  /**
   * Builds the content of the iframe. On load, animates the toast.
   */

  Toast.prototype.buildToast_ = function buildToast_() {
    var _this2 = this;

    var toastDurationSeconds = 7;
    return this.activityPorts_.openIframe(this.iframe_, this.src_, this.args_).then(function (port) {
      return port.whenReady();
    }).then(function () {
      _utilsStyle.resetStyles(_this2.iframe_, ['height']);
      _utilsStyle.setImportantStyles(_this2.iframe_, {
        'animation': 'swg-notify .3s ease-out normal backwards, ' + 'swg-notify-hide .3s ease-out ' + toastDurationSeconds + 's normal forwards'
      });
      _this2.doc_.getWin().setTimeout(function () {
        _this2.close();
      }, (toastDurationSeconds + 1) * 1000);
    });
  };

  /**
   * Closes the toast.
   */

  Toast.prototype.close = function close() {
    this.doc_.getBody().removeChild(this.iframe_);
  };

  return Toast;
})();

exports.Toast = Toast;

},{"../utils/dom":45,"../utils/style":53}],41:[function(require,module,exports){
exports.__esModule = true;
exports.acceptPortResult = acceptPortResult;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param {!web-activities/activity-ports.ActivityPort} port
 * @param {string} requireOrigin
 * @param {boolean} requireOriginVerified
 * @param {boolean} requireSecureChannel
 * @return {!Promise<!Object>}
 */

function acceptPortResult(port, requireOrigin, requireOriginVerified, requireSecureChannel) {
  return port.acceptResult().then(function (result) {
    if (result.origin != requireOrigin || requireOriginVerified && !result.originVerified || requireSecureChannel && !result.secureChannel) {
      throw new Error('channel mismatch');
    }
    return result.data;
  });
}

},{}],42:[function(require,module,exports){
exports.__esModule = true;
exports.transition = transition;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _style = require('./style');

/**
 * Returns a promise which is resolved after the given duration of animation
 * @param {!Element} el - Element to be observed.
 * @param {!Object<string, string|number>} props - properties to be animated.
 * @param {number} durationMillis - duration of animation.
 * @param {string} curve - transition function for the animation.
 * @return {!Promise} Promise which resolves once the animation is done playing.
 */

function transition(el, props, durationMillis, curve) {
  var win = el.ownerDocument.defaultView;
  var previousTransitionValue = el.style.transition || '';
  return new Promise(function (resolve) {
    win.setTimeout(function () {
      win.setTimeout(resolve, durationMillis);
      var tr = durationMillis + 'ms ' + curve;
      _style.setImportantStyles(el, Object.assign({
        'transition': 'transform ' + tr + ', opacity ' + tr
      }, props));
    });
  }).then(function () {
    _style.setImportantStyles(el, {
      'transition': previousTransitionValue
    });
  });
}

},{"./style":53}],43:[function(require,module,exports){
exports.__esModule = true;
exports.stringToBytes = stringToBytes;
exports.bytesToString = bytesToString;
exports.utf8DecodeSync = utf8DecodeSync;
exports.utf8EncodeSync = utf8EncodeSync;
exports.base64UrlDecodeToBytes = base64UrlDecodeToBytes;
exports.base64UrlEncodeFromBytes = base64UrlEncodeFromBytes;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _log = require('./log');

/**
 * Character mapping from base64url to base64.
 * @const {!Object<string, string>}
 */
var base64UrlDecodeSubs = { '-': '+', '_': '/', '.': '=' };

/**
 * Character mapping from base64 to base64url.
 * @const {!Object<string, string>}
 */
var base64UrlEncodeSubs = { '+': '-', '/': '_', '=': '.' };

/**
 * Converts a string which holds 8-bit code points, such as the result of atob,
 * into a Uint8Array with the corresponding bytes.
 * If you have a string of characters, you probably want to be using utf8Encode.
 * @param {string} str
 * @return {!Uint8Array}
 */

function stringToBytes(str) {
  var bytes = new Uint8Array(str.length);
  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);
    _log.assert(charCode <= 255, 'Characters must be in range [0,255]');
    bytes[i] = charCode;
  }
  return bytes;
}

/**
 * Converts a 8-bit bytes array into a string
 * @param {!Uint8Array} bytes
 * @return {string}
 */

function bytesToString(bytes) {
  // Intentionally avoids String.fromCharCode.apply so we don't suffer a
  // stack overflow. #10495, https://jsperf.com/bytesToString-2
  var array = new Array(bytes.length);
  for (var i = 0; i < bytes.length; i++) {
    array[i] = String.fromCharCode(bytes[i]);
  }
  return array.join('');
}

/**
 * Interpret a byte array as a UTF-8 string.
 * @param {!BufferSource} bytes
 * @return {string}
 */

function utf8DecodeSync(bytes) {
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder('utf-8').decode(bytes);
  }
  var asciiString = bytesToString(new Uint8Array(bytes.buffer || bytes));
  return decodeURIComponent(escape(asciiString));
}

/**
 * Turn a string into UTF-8 bytes.
 * @param {string} string
 * @return {!Uint8Array}
 */

function utf8EncodeSync(string) {
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder('utf-8').encode(string);
  }
  return stringToBytes(unescape(encodeURIComponent(string)));
}

/**
 * Converts a string which is in base64url encoding into a Uint8Array
 * containing the decoded value.
 * @param {string} str
 * @return {!Uint8Array}
 */

function base64UrlDecodeToBytes(str) {
  var encoded = atob(str.replace(/[-_.]/g, function (ch) {
    return base64UrlDecodeSubs[ch];
  }));
  return stringToBytes(encoded);
}

/**
 * Converts a bytes array into base64url encoded string.
 * base64url is defined in RFC 4648. It is sometimes referred to as "web safe".
 * @param {!Uint8Array} bytes
 * @return {string}
 */

function base64UrlEncodeFromBytes(bytes) {
  var str = bytesToString(bytes);
  return btoa(str).replace(/[+/=]/g, function (ch) {
    return base64UrlEncodeSubs[ch];
  });
}

},{"./log":49}],44:[function(require,module,exports){
exports.__esModule = true;
exports.isDocumentReady = isDocumentReady;
exports.onDocumentReady = onDocumentReady;
exports.whenDocumentReady = whenDocumentReady;
exports.whenDocumentComplete = whenDocumentComplete;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param {!Document} doc
 * @return {string}
 */
function getReadyState(doc) {
  return (/** @type {string} */doc['readyState']
  );
}

/**
 * Whether the document is ready.
 * @param {!Document} doc
 * @return {boolean}
 */

function isDocumentReady(doc) {
  var readyState = getReadyState(doc);
  return readyState != 'loading' && readyState != 'uninitialized';
}

/**
 * Whether the document has loaded all the css and sub-resources.
 * @param {!Document} doc
 * @return {boolean}
 */
function isDocumentComplete(doc) {
  return getReadyState(doc) == 'complete';
}

/**
 * Calls the callback when document is ready.
 * @param {!Document} doc
 * @param {function(!Document)} callback
 */

function onDocumentReady(doc, callback) {
  onDocumentState(doc, isDocumentReady, callback);
}

/**
 * Calls the callback when document's state satisfies the stateFn.
 * @param {!Document} doc
 * @param {function(!Document):boolean} stateFn
 * @param {function(!Document)} callback
 */
function onDocumentState(doc, stateFn, callback) {
  var ready = stateFn(doc);
  if (ready) {
    callback(doc);
  } else {
    (function () {
      var readyListener = function () {
        if (stateFn(doc)) {
          if (!ready) {
            ready = true;
            callback(doc);
          }
          doc.removeEventListener('readystatechange', readyListener);
        }
      };
      doc.addEventListener('readystatechange', readyListener);
    })();
  }
}

/**
 * Returns a promise that is resolved when document is ready.
 * @param {!Document} doc
 * @return {!Promise<!Document>}
 */

function whenDocumentReady(doc) {
  return new Promise(function (resolve) {
    onDocumentReady(doc, resolve);
  });
}

/**
 * Returns a promise that is resolved when document is complete.
 * @param {!Document} doc
 * @return {!Promise<!Document>}
 */

function whenDocumentComplete(doc) {
  return new Promise(function (resolve) {
    onDocumentState(doc, isDocumentComplete, resolve);
  });
}

},{}],45:[function(require,module,exports){
exports.__esModule = true;
exports.addAttributesToElement = addAttributesToElement;
exports.createElement = createElement;
exports.removeElement = removeElement;
exports.removeChildren = removeChildren;
exports.injectStyleSheet = injectStyleSheet;
exports.hasNextNodeInDocumentOrder = hasNextNodeInDocumentOrder;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _log = require('./log');

var _style = require('./style');

/** @const @enum{string} */
var styleLinkAttrs = {
  'rel': 'stylesheet',
  'type': 'text/css'
};

exports.styleLinkAttrs = styleLinkAttrs;
/** @const {string} */
var styleType = 'text/css';

exports.styleType = styleType;
/** @const {string} */
var styleExistsQuerySelector = 'link[rel=stylesheet][href]';

exports.styleExistsQuerySelector = styleExistsQuerySelector;
/**
 * Add attributes to an element.
 * @param {!Element} element
 * @param {!Object<string, string|number|boolean|!Object<string, string|number|boolean>>} attributes
 * @return {!Element} updated element.
 */

function addAttributesToElement(element, attributes) {
  for (var attr in attributes) {
    if (attr == 'style') {
      _style.setStyles(element,
      /** @type !Object<string, string|boolean|number> */attributes[attr]);
    } else {
      element.setAttribute(attr,
      /** @type {string|boolean|number} */attributes[attr]);
    }
  }
  return element;
}

/**
 * Create a new element on document with specified tagName and attributes.
 * @param {!Document} doc
 * @param {string} tagName
 * @param {!Object<string, string>} attributes
 * @param {?(string|!Node|!ArrayLike<!Node>|!Array<!Node>)=} opt_content
 * @return {!Element} created element.
 */

function createElement(doc, tagName, attributes, opt_content) {
  var element = doc.createElement(tagName);
  addAttributesToElement(element, attributes);
  if (opt_content != null) {
    if (typeof opt_content == 'string') {
      element.textContent = opt_content;
    } else if (opt_content.nodeType) {
      element.appendChild(opt_content);
    } else if ('length' in opt_content) {
      for (var i = 0; i < opt_content.length; i++) {
        element.appendChild(opt_content[i]);
      }
    } else {
      _log.assert(false, 'Unsupported content: %s', opt_content);
    }
  }
  return element;
}

/**
 * Removes the element.
 * @param {!Element} element
 */

function removeElement(element) {
  if (element.parentElement) {
    element.parentElement.removeChild(element);
  }
}

/**
 * Removes all children from the parent element.
 * @param {!Element} parent
 */

function removeChildren(parent) {
  parent.textContent = '';
}

/**
 * Injects the provided styles in the HEAD section of the document.
 * @param {!Document} doc The document object.
 * @param {string} styleText The style string.
 * @return {!Element}
 */

function injectStyleSheet(doc, styleText) {
  var styleElement = createElement(doc, 'style', {
    'type': styleType
  });
  styleElement.textContent = styleText;
  doc.head.appendChild(styleElement);
  return styleElement;
}

/**
 * Whether the element have a next node in the document order.
 * This means either:
 *  a. The element itself has a nextSibling.
 *  b. Any of the element ancestors has a nextSibling.
 * @param {!Element} element
 * @param {?Node=} opt_stopNode
 * @return {boolean}
 */

function hasNextNodeInDocumentOrder(element, opt_stopNode) {
  var currentElement = element;
  do {
    if (currentElement.nextSibling) {
      return true;
    }
  } while ((currentElement = currentElement.parentNode) && currentElement != opt_stopNode);
  return false;
}

},{"./log":49,"./style":53}],46:[function(require,module,exports){
exports.__esModule = true;
exports.isCancelError = isCancelError;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param {*} error
 * @return {boolean}
 */

function isCancelError(error) {
  if (!error || typeof error != 'object') {
    return false;
  }
  return error['name'] === 'AbortError';
}

},{}],47:[function(require,module,exports){
exports.__esModule = true;
exports.recreateNonProtoObject = recreateNonProtoObject;
exports.getValueForExpr = getValueForExpr;
exports.parseJson = parseJson;
exports.tryParseJson = tryParseJson;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview This module declares JSON types as defined in the
 * {@link http://json.org/}.
 */

var _types = require('./types');

/**
 * Recreates objects with prototype-less copies.
 * @param {!JsonObject} obj
 * @return {!JsonObject}
 */

function recreateNonProtoObject(obj) {
  var copy = Object.create(null);
  for (var k in obj) {
    if (!hasOwnProperty(obj, k)) {
      continue;
    }
    var v = obj[k];
    copy[k] = _types.isObject(v) ? recreateNonProtoObject(v) : v;
  }
  return (/** @type {!JsonObject} */copy
  );
}

/**
 * Returns a value from an object for a field-based expression. The expression
 * is a simple nested dot-notation of fields, such as `field1.field2`. If any
 * field in a chain does not exist or is not an object, the returned value will
 * be `undefined`.
 *
 * @param {!JsonObject} obj
 * @param {string} expr
 * @return {*}
 */

function getValueForExpr(obj, expr) {
  // The `.` indicates "the object itself".
  if (expr == '.') {
    return obj;
  }
  // Otherwise, navigate via properties.
  var parts = expr.split('.');
  var value = obj;
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    if (!part) {
      value = undefined;
      break;
    }
    if (!_types.isObject(value) || value[part] === undefined || !hasOwnProperty(value, part)) {
      value = undefined;
      break;
    }
    value = value[part];
  }
  return value;
}

/**
 * Simple wrapper around JSON.parse that casts the return value
 * to JsonObject.
 * Create a new wrapper if an array return value is desired.
 * @param {*} json JSON string to parse
 * @return {?JsonObject|undefined} May be extend to parse arrays.
 */

function parseJson(json) {
  return (/** @type {?JsonObject} */JSON.parse( /** @type {string} */json)
  );
}

/**
 * Parses the given `json` string without throwing an exception if not valid.
 * Returns `undefined` if parsing fails.
 * Returns the `Object` corresponding to the JSON string when parsing succeeds.
 * @param {*} json JSON string to parse
 * @param {function(!Error)=} opt_onFailed Optional function that will be called
 *     with the error if parsing fails.
 * @return {?JsonObject|undefined} May be extend to parse arrays.
 */

function tryParseJson(json, opt_onFailed) {
  try {
    return parseJson(json);
  } catch (e) {
    if (opt_onFailed) {
      opt_onFailed(e);
    }
    return undefined;
  }
}

/**
 * @param {*} obj
 * @param {string} key
 * @return {boolean}
 */
function hasOwnProperty(obj, key) {
  if (obj == null || typeof obj != 'object') {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(
  /** @type {!Object} */obj, key);
}

},{"./types":54}],48:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _bytes = require('./bytes');

var _json = require('./json');

/**
 * @typedef {{
 *   header: (?JsonObject|undefined),
 *   payload: (?JsonObject|undefined),
 *   verifiable: string,
 *   sig: string,
 * }}
 */
var JwtTokenInternalDef = undefined;

/**
 * Provides helper methods to decode and verify JWT tokens.
 */

var JwtHelper = (function () {
  function JwtHelper() {
    babelHelpers.classCallCheck(this, JwtHelper);
  }

  /**
   * Decodes JWT token and returns its payload.
   * @param {string} encodedToken
   * @return {?JsonObject|undefined}
   */

  JwtHelper.prototype.decode = function decode(encodedToken) {
    return this.decodeInternal_(encodedToken).payload;
  };

  /**
   * @param {string} encodedToken
   * @return {!JwtTokenInternalDef}
   * @private
   */

  JwtHelper.prototype.decodeInternal_ = function decodeInternal_(encodedToken) {
    // See https://jwt.io/introduction/
    function invalidToken() {
      throw new Error('Invalid token: "' + encodedToken + '"');
    }

    // Encoded token has three parts: header.payload.sig
    // Note! The padding is not allowed by JWT spec:
    // http://self-issued.info/docs/draft-goland-json-web-token-00.html#rfc.section.5
    var parts = encodedToken.split('.');
    if (parts.length != 3) {
      invalidToken();
    }
    var headerUtf8Bytes = _bytes.base64UrlDecodeToBytes(parts[0]);
    var payloadUtf8Bytes = _bytes.base64UrlDecodeToBytes(parts[1]);
    return {
      header: _json.tryParseJson(_bytes.utf8DecodeSync(headerUtf8Bytes), invalidToken),
      payload: _json.tryParseJson(_bytes.utf8DecodeSync(payloadUtf8Bytes), invalidToken),
      verifiable: parts[0] + '.' + parts[1],
      sig: parts[2]
    };
  };

  return JwtHelper;
})();

exports.JwtHelper = JwtHelper;

},{"./bytes":43,"./json":47}],49:[function(require,module,exports){
exports.__esModule = true;
exports.log = log;
exports.assert = assert;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param  {...*} var_args [description]
 */

function log(var_args) {
  console.log.apply(console, arguments);
}

/**
 * Throws an error if the first argument isn't trueish.
 *
 * Supports argument substitution into the message via %s placeholders.
 *
 * Throws an error object that has two extra properties:
 * - associatedElement: This is the first element provided in the var args.
 *   It can be used for improved display of error messages.
 * - messageArray: The elements of the substituted message as non-stringified
 *   elements in an array. When e.g. passed to console.error this yields
 *   native displays of things like HTML elements.
 *
 * @param {T} shouldBeTrueish The value to assert. The assert fails if it does
 *     not evaluate to true.
 * @param {string=} opt_message The assertion message
 * @param {...*} var_args Arguments substituted into %s in the message.
 * @return {T} The value of shouldBeTrueish.
 * @template T
 */

function assert(shouldBeTrueish, opt_message, var_args) {
  var firstElement = undefined;
  if (!shouldBeTrueish) {
    var message = opt_message || 'Assertion failed';
    var splitMessage = message.split('%s');
    var first = splitMessage.shift();
    var formatted = first;
    var messageArray = [];
    pushIfNonEmpty(messageArray, first);
    for (var i = 2; i < arguments.length; i++) {
      var val = arguments[i];
      if (val && val.tagName) {
        firstElement = val;
      }
      var nextConstant = splitMessage.shift();
      messageArray.push(val);
      pushIfNonEmpty(messageArray, nextConstant.trim());
      formatted += toString(val) + nextConstant;
    }
    var e = new Error(formatted);
    e.fromAssert = true;
    e.associatedElement = firstElement;
    e.messageArray = messageArray;
    throw e;
  }
  return shouldBeTrueish;
}

/**
 * @param {!Array} array
 * @param {*} val
 */
function pushIfNonEmpty(array, val) {
  if (val != '') {
    array.push(val);
  }
}

function toString(val) {
  // Do check equivalent to `val instanceof Element` without cross-window bug
  if (val && val.nodeType == 1) {
    return val.tagName.toLowerCase() + (val.id ? '#' + val.id : '');
  }
  return (/** @type {string} */val
  );
}

},{}],50:[function(require,module,exports){
exports.__esModule = true;
exports.map = map;
exports.findInArray = findInArray;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a map-like object.
 * If opt_initial is provided, copies its own properties into the
 * newly created object.
 * @param {Object=} opt_initial This should typically be an object literal.
 * @return {!Object}
 * @template T
 */

function map(opt_initial) {
  var obj = Object.create(null);
  if (opt_initial) {
    Object.assign(obj, opt_initial);
  }
  return obj;
}

/**
 * Implements `Array.find()` method that's not yet available in all browsers.
 *
 * @param {?Array<T>} array
 * @param {function(T, number, !Array<T>):boolean} predicate
 * @return {?T}
 * @template T
 */

function findInArray(array, predicate) {
  if (!array) {
    return null;
  }
  var len = array.length || 0;
  if (len > 0) {
    for (var i = 0; i < len; i++) {
      var other = array[i];
      if (predicate(other, i, array)) {
        return other;
      }
    }
  }
  return null;
}

},{}],51:[function(require,module,exports){
exports.__esModule = true;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _dom = require('./dom');

var Preconnect = (function () {

  /**
   * @param {!Document} doc
   */

  function Preconnect(doc) {
    babelHelpers.classCallCheck(this, Preconnect);

    /** @private @const {!Document} */
    this.doc_ = doc;
  }

  /**
   * @param {string} url
   */

  Preconnect.prototype.preconnect = function preconnect(url) {
    this.pre_(url, 'preconnect');
  };

  /**
   * @param {string} url
   */

  Preconnect.prototype.dnsPrefetch = function dnsPrefetch(url) {
    this.pre_(url, 'dns-prefetch');
  };

  /**
   * @param {string} url
   */

  Preconnect.prototype.prefetch = function prefetch(url) {
    this.pre_(url, 'preconnect prefetch');
  };

  /**
   * @param {string} url
   * @param {string} as
   */

  Preconnect.prototype.preload = function preload(url, as) {
    this.pre_(url, 'preconnect preload', as);
  };

  /**
   * @param {string} url
   * @param {string} rel
   * @param {?string=} opt_as
   * @private
   */

  Preconnect.prototype.pre_ = function pre_(url, rel, opt_as) {
    // <link rel="prefetch" href="..." as="">
    var linkEl = _dom.createElement(this.doc_, 'link', {
      'rel': rel,
      'href': url
    });
    if (opt_as) {
      linkEl.setAttribute('as', opt_as);
    }
    this.doc_.head.appendChild(linkEl);
  };

  return Preconnect;
})();

exports.Preconnect = Preconnect;

},{"./dom":45}],52:[function(require,module,exports){
exports.__esModule = true;
exports.dashToCamelCase = dashToCamelCase;
exports.dashToUnderline = dashToUnderline;
exports.endsWith = endsWith;
exports.startsWith = startsWith;
exports.expandTemplate = expandTemplate;
exports.stringHash32 = stringHash32;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param {string} _match
 * @param {string} character
 * @return {string}
 */
function toUpperCase(_match, character) {
  return character.toUpperCase();
}

/**
 * @param {string} name Attribute name with dashes
 * @return {string} Dashes removed and character after to upper case.
 * visibleForTesting
 */

function dashToCamelCase(name) {
  return name.replace(/-([a-z])/g, toUpperCase);
}

/**
 * @param {string} name Attribute name with dashes
 * @return {string} Dashes replaced by underlines.
 */

function dashToUnderline(name) {
  return name.replace('-', '_');
}

/**
 * Polyfill for String.prototype.endsWith.
 * @param {string} string
 * @param {string} suffix
 * @return {boolean}
 */

function endsWith(string, suffix) {
  var index = string.length - suffix.length;
  return index >= 0 && string.indexOf(suffix, index) == index;
}

/**
 * Polyfill for String.prototype.startsWith.
 * @param {string} string
 * @param {string} prefix
 * @return {boolean}
 */

function startsWith(string, prefix) {
  if (prefix.length > string.length) {
    return false;
  }
  return string.lastIndexOf(prefix, 0) == 0;
}

/**
 * Expands placeholders in a given template string with values.
 *
 * Placeholders use ${key-name} syntax and are replaced with the value
 * returned from the given getter function.
 *
 * @param {string} template The template string to expand.
 * @param {!function(string):*} getter Function used to retrieve a value for a
 *   placeholder. Returns values will be coerced into strings.
 * @param {number=} opt_maxIterations Number of times to expand the template.
 *   Defaults to 1, but should be set to a larger value your placeholder tokens
 *   can be expanded to other placeholder tokens. Take caution with large values
 *   as recursively expanding a string can be exponentially expensive.
 */

function expandTemplate(template, getter, opt_maxIterations) {
  var maxIterations = opt_maxIterations || 1;

  var _loop = function (i) {
    var matches = 0;
    template = template.replace(/\${([^}]*)}/g, function (_a, b) {
      matches++;
      return getter(b);
    });
    if (!matches) {
      return 'break';
    }
  };

  for (var i = 0; i < maxIterations; i++) {
    var _ret = _loop(i);

    if (_ret === 'break') break;
  }
  return template;
}

/**
 * Hash function djb2a
 * This is intended to be a simple, fast hashing function using minimal code.
 * It does *not* have good cryptographic properties.
 * @param {string} str
 * @return {string} 32-bit unsigned hash of the string
 */

function stringHash32(str) {
  var length = str.length;
  var hash = 5381;
  for (var i = 0; i < length; i++) {
    hash = hash * 33 ^ str.charCodeAt(i);
  }
  // Convert from 32-bit signed to unsigned.
  return String(hash >>> 0);
}

;

},{}],53:[function(require,module,exports){
exports.__esModule = true;
exports.camelCaseToTitleCase = camelCaseToTitleCase;
exports.getVendorJsPropertyName = getVendorJsPropertyName;
exports.setImportantStyles = setImportantStyles;
exports.setStyle = setStyle;
exports.getStyle = getStyle;
exports.setStyles = setStyles;
exports.toggle = toggle;
exports.px = px;
exports.translateX = translateX;
exports.translate = translate;
exports.scale = scale;
exports.removeAlphaFromColor = removeAlphaFromColor;
exports.computedStyle = computedStyle;
exports.resetStyles = resetStyles;
exports.resetAllStyles = resetAllStyles;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Note: loaded by 3p system. Cannot rely on babel polyfills.

var _objectJs = require('./object.js');

var _string = require('./string');

/** @type {Object<string, string>} */
var propertyNameCache = undefined;

/** @const {!Array<string>} */
var vendorPrefixes = ['Webkit', 'webkit', 'Moz', 'moz', 'ms', 'O', 'o'];

/**
 * Default styles to be set for top level friendly iframe.
 * Some attributes are not included such as height, left, margin-left; since
 * these attributes are updated by @media queries and having these values
 * defined here as !important does not work on IE/edge browsers.
 * @const {!Object<string, string|number>}
 */
var defaultStyles = {
  'align-content': 'normal',
  'animation': 'none',
  'align-items': 'normal',
  'align-self': 'auto',
  'alignment-baseline': 'auto',
  'backface-visibility': 'hidden',
  'background-clip': 'border-box',
  'background-color': 'rgb(0, 0, 0, 0)',
  'background-image': 'none',
  'baseline-shift': '0',
  'block-size': 'auto',
  'border': 'none',
  'border-radius': '0',
  'border-collapse': 'separate',
  'bottom': '0',
  'box-shadow': '0 0 0 0 #000',
  'box-sizing': 'border-box',
  'break-after': 'auto',
  'break-before': 'auto',
  'break-inside': 'auto',
  'buffered-rendering': 'auto',
  'caption-side': 'top',
  'caret-color': 'rgb(51, 51, 51)',
  'clear': 'none',
  'color': 'rgb(51, 51, 51)',
  'color-rendering': 'auto',
  'column-count': 'auto',
  'column-fill': 'balance',
  'column-gap': 'normal',
  'column-rule-color': 'rgb(51, 51, 51)',
  'column-rule-style': 'none',
  'column-rule-width': '0',
  'column-span': 'none',
  'column-width': 'auto',
  'contain': 'none',
  'counter-increment': 'none',
  'counter-reset': 'none',
  'cursor': 'auto',
  'direction': 'inherit',
  'display': 'block',
  'empty-cells': 'show',
  'filter': 'none',
  'flex': 'none', // flex-grow, flex-shrink, and flex-basis.
  'flex-flow': 'row nowrap', // flex-direction, flex-wrap.
  'float': 'none',
  'flood-color': 'rgb(0, 0, 0)',
  'flood-opacity': '1',
  'font': 'none',
  'font-size': 'medium',
  'font-family': '',
  'height': 'auto',
  'hyphens': 'manual',
  'image-rendering': 'auto',
  'inline-size': '', // Setting to 'auto' will not allow override.
  'isolation': 'auto',
  'justify-content': 'normal',
  'justify-items': 'normal',
  'justify-self': 'auto',
  'letter-spacing': 'normal',
  'lighting-color': 'rgb(255, 255, 255)',
  'line-break': 'auto',
  'line-height': 'normal',
  'mask': 'none',
  'max-block-size': 'none',
  'max-height': 'none',
  'max-inline-size': 'none',
  'max-width': 'none',
  'min-block-size': 'none',
  'min-height': '0',
  'min-inline-size': '0',
  'min-width': '0',
  'mix-blend-mode': 'normal',
  'object-fit': 'fill', // Important for Safari browser.
  'offset-distance': 'none', // Chrome only (Experimental).
  'offset-path': 'none', // Chrome only (Experimental).
  'offset-rotate': 'auto 0deg', // Chrome only (Experimental).
  'opacity': '1',
  'order': '0',
  'orphans': '2',
  'outline': 'none',
  'overflow-anchor': 'auto',
  'overflow-wrap': 'normal',
  'overflow': 'visible',
  'padding': '0',
  'page': '',
  'perspective': 'none',
  'pointer-events': 'auto',
  'position': 'static',
  'quotes': '',
  'resize': 'none',
  'right': '0',
  'scroll-behavior': 'auto',
  'tab-size': '8', // Only Chrome, Safari (Experimental).
  'table-layout': 'auto',
  'text-align': 'start',
  'text-align-last': 'auto',
  'text-anchor': 'start',
  'text-combine-upright': 'none',
  'text-decoration': 'none',
  'text-indent': '0',
  'text-orientation': 'mixed',
  'text-overflow': 'clip',
  'text-rendering': 'auto',
  'text-shadow': 'none',
  'text-size-adjust': 'auto',
  'text-transform': 'none',
  'text-underline-position': 'auto',
  'top': 'auto',
  'touch-action': 'auto',
  'transform': 'none',
  'transition': 'none 0s ease 0s',
  'unicode-bidi': 'normal',
  'user-select': 'auto',
  'vector-effect': 'none',
  'vertical-align': 'baseline',
  'visibility': 'visible',
  'white-space': 'normal',
  'widows': '2',
  'word-break': 'normal',
  'word-spacing': '0',
  'word-wrap': 'normal',
  'writing-mode': 'horizontal-tb',
  'zoom': '1',
  'z-index': 'auto'
};

exports.defaultStyles = defaultStyles;
/** @const {string} */
var googleFontsUrl = 'https://fonts.googleapis.com/css?family=Google+Sans';

exports.googleFontsUrl = googleFontsUrl;
/**
 * @export
 * @param {string} camelCase camel cased string
 * @return {string} title cased string
 */

function camelCaseToTitleCase(camelCase) {
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

/**
 * Checks the style if a prefixed version of a property exists and returns
 * it or returns an empty string.
 * @private
 * @param {!Object} style
 * @param {string} titleCase the title case version of a css property name
 * @return {string} the prefixed property name or null.
 */
function getVendorJsPropertyName_(style, titleCase) {
  for (var i = 0; i < vendorPrefixes.length; i++) {
    var propertyName = vendorPrefixes[i] + titleCase;
    if (style[propertyName] !== undefined) {
      return propertyName;
    }
  }
  return '';
}

/**
 * Returns the possibly prefixed JavaScript property name of a style property
 * (ex. WebkitTransitionDuration) given a camelCase'd version of the property
 * (ex. transitionDuration).
 * @export
 * @param {!Object} style
 * @param {string} camelCase the camel cased version of a css property name
 * @param {boolean=} opt_bypassCache bypass the memoized cache of property
 *   mapping
 * @return {string}
 */

function getVendorJsPropertyName(style, camelCase, opt_bypassCache) {
  if (_string.startsWith(camelCase, '--')) {
    // CSS vars are returned as is.
    return camelCase;
  }
  if (!propertyNameCache) {
    propertyNameCache = _objectJs.map();
  }
  var propertyName = propertyNameCache[camelCase];
  if (!propertyName || opt_bypassCache) {
    propertyName = camelCase;
    if (style[camelCase] === undefined) {
      var titleCase = camelCaseToTitleCase(camelCase);
      var prefixedPropertyName = getVendorJsPropertyName_(style, titleCase);

      if (style[prefixedPropertyName] !== undefined) {
        propertyName = prefixedPropertyName;
      }
    }
    if (!opt_bypassCache) {
      propertyNameCache[camelCase] = propertyName;
    }
  }
  return propertyName;
}

/**
 * Sets the CSS styles of the specified element with !important. The styles
 * are specified as a map from CSS property names to their values.
 * @param {!Element} element
 * @param {!Object<string, string|number>} styles
 */

function setImportantStyles(element, styles) {
  for (var k in styles) {
    element.style.setProperty(getVendorJsPropertyName(styles, k), styles[k].toString(), 'important');
  }
}

/**
 * Sets the CSS style of the specified element with optional units, e.g. "px".
 * @param {Element} element
 * @param {string} property
 * @param {?string|number|boolean} value
 * @param {string=} opt_units
 * @param {boolean=} opt_bypassCache
 */

function setStyle(element, property, value, opt_units, opt_bypassCache) {
  var propertyName = getVendorJsPropertyName(element.style, property, opt_bypassCache);
  if (propertyName) {
    element.style[propertyName] =
    /** @type {string} */opt_units ? value + opt_units : value;
  }
}

/**
 * Returns the value of the CSS style of the specified element.
 * @param {!Element} element
 * @param {string} property
 * @param {boolean=} opt_bypassCache
 * @return {*}
 */

function getStyle(element, property, opt_bypassCache) {
  var propertyName = getVendorJsPropertyName(element.style, property, opt_bypassCache);
  if (!propertyName) {
    return undefined;
  }
  return element.style[propertyName];
}

/**
 * Sets the CSS styles of the specified element. The styles
 * a specified as a map from CSS property names to their values.
 * @param {!Element} element
 * @param {!Object<string, ?string|number|boolean>} styles
 */

function setStyles(element, styles) {
  for (var k in styles) {
    setStyle(element, k, styles[k]);
  }
}

/**
 * Shows or hides the specified element.
 * @param {!Element} element
 * @param {boolean=} opt_display
 */

function toggle(element, opt_display) {
  if (opt_display === undefined) {
    opt_display = getStyle(element, 'display') == 'none';
  }
  setStyle(element, 'display', opt_display ? '' : 'none');
}

/**
 * Returns a pixel value.
 * @param {number} value
 * @return {string}
 */

function px(value) {
  return value + 'px';
}

/**
 * Returns a "translateX" for CSS "transform" property.
 * @param {number|string} value
 * @return {string}
 */

function translateX(value) {
  if (typeof value == 'string') {
    return 'translateX(' + value + ')';
  }
  return 'translateX(' + px(value) + ')';
}

/**
 * Returns a "translateX" for CSS "transform" property.
 * @param {number|string} x
 * @param {(number|string)=} opt_y
 * @return {string}
 */

function translate(x, opt_y) {
  if (typeof x == 'number') {
    x = px(x);
  }
  if (opt_y === undefined) {
    return 'translate(' + x + ')';
  }
  if (typeof opt_y == 'number') {
    opt_y = px(opt_y);
  }
  return 'translate(' + x + ', ' + opt_y + ')';
}

/**
 * Returns a "scale" for CSS "transform" property.
 * @param {number|string} value
 * @return {string}
 */

function scale(value) {
  return 'scale(' + value + ')';
}

/**
 * Remove alpha value from a rgba color value.
 * Return the new color property with alpha equals if has the alpha value.
 * Caller needs to make sure the input color value is a valid rgba/rgb value
 * @param {string} rgbaColor
 * @return {string}
 */

function removeAlphaFromColor(rgbaColor) {
  return rgbaColor.replace(/\(([^,]+),([^,]+),([^,)]+),[^)]+\)/g, '($1,$2,$3, 1)');
}

/**
 * Gets the computed style of the element. The helper is necessary to enforce
 * the possible `null` value returned by a buggy Firefox.
 *
 * @param {!Window} win
 * @param {!Element} el
 * @return {!Object<string, string>}
 */

function computedStyle(win, el) {
  var style = /** @type {?CSSStyleDeclaration} */win.getComputedStyle(el);
  return (/** @type {!Object<string, string>} */style || _objectJs.map()
  );
}

/**
 * Resets styles that were set dynamically (i.e. inline)
 * @param {!Element} element
 * @param {!Array<string>} properties
 */

function resetStyles(element, properties) {
  var styleObj = {};
  properties.forEach(function (prop) {
    styleObj[prop] = null;
  });
  setStyles(element, styleObj);
}

/**
 * Resets all the styles of an element to a given value. Defaults to null.
 * The valid values are 'inherit', 'initial', 'unset' or null.
 */

function resetAllStyles(element) {
  setImportantStyles(element, defaultStyles);
}

},{"./object.js":50,"./string":52}],54:[function(require,module,exports){
exports.__esModule = true;
exports.isArray = isArray;
exports.toArray = toArray;
exports.isObject = isObject;
exports.isFiniteNumber = isFiniteNumber;
exports.isFormData = isFormData;
exports.isEnumValue = isEnumValue;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @const */
var toString_ = Object.prototype.toString;

/**
 * Returns the ECMA [[Class]] of a value
 * @param {*} value
 * @return {string}
 */
function toString(value) {
  return toString_.call(value);
}

/**
 * Determines if value is actually an Array.
 * @param {*} value
 * @return {boolean}
 */

function isArray(value) {
  return Array.isArray(value);
}

/**
 * Converts an array-like object to an array.
 * @param {?IArrayLike<T>|string} arrayLike
 * @return {!Array<T>}
 * @template T
 */

function toArray(arrayLike) {
  if (!arrayLike) {
    return [];
  }
  var array = new Array(arrayLike.length);
  for (var i = 0; i < arrayLike.length; i++) {
    array[i] = arrayLike[i];
  }
  return array;
}

/**
 * Determines if value is actually an Object.
 * @param {*} value
 * @return {boolean}
 */

function isObject(value) {
  return toString(value) === '[object Object]';
}

/**
 * Determines if value is of number type and finite.
 * NaN and Infinity are not considered a finite number.
 * String numbers are not considered numbers.
 * @param {*} value
 * @return {boolean}
 */

function isFiniteNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

/**
 * Determines if value is of FormData type.
 * @param {*} value
 * @return {boolean}
 */

function isFormData(value) {
  return toString(value) === '[object FormData]';
}

/**
 * Checks whether `s` is a valid value of `enumObj`.
 *
 * @param {!Object<T>} enumObj
 * @param {T} s
 * @return {boolean}
 * @template T
 */

function isEnumValue(enumObj, s) {
  for (var k in enumObj) {
    if (enumObj[k] === s) {
      return true;
    }
  }
  return false;
}

},{}],55:[function(require,module,exports){
exports.__esModule = true;
exports.serializeQueryString = serializeQueryString;
exports.parseUrl = parseUrl;
exports.parseQueryString = parseQueryString;
exports.addQueryParam = addQueryParam;
exports.getHostUrl = getHostUrl;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _types = require('./types');

/**
  @typedef {{
    href: string,
    protocol: string,
    host: string,
    hostname: string,
    port: string,
    pathname: string,
    search: string,
    hash: string,
    origin: string,
  }}
  */
var LocationDef = undefined;

/**
 * Cached a-tag to avoid memory allocation during URL parsing.
 * @type {HTMLAnchorElement}
 */
var a = undefined;

/**
 * We cached all parsed URLs. As of now there are no use cases
 * of AMP docs that would ever parse an actual large number of URLs,
 * but we often parse the same one over and over again.
 * @type {Object<string, !LocationDef>}
 */
var cache = undefined;

/**
 * Serializes the passed parameter map into a query string with both keys
 * and values encoded.
 * @param {!JsonObject} params
 * @return {string}
 */

function serializeQueryString(params) {
  var s = [];
  for (var k in params) {
    var v = params[k];
    if (v == null) {
      continue;
    } else if (_types.isArray(v)) {
      for (var i = 0; i < v.length; i++) {
        var sv = /** @type {string} */v[i];
        s.push(encodeURIComponent(k) + '=' + encodeURIComponent(sv));
      }
    } else {
      var sv = /** @type {string} */v;
      s.push(encodeURIComponent(k) + '=' + encodeURIComponent(sv));
    }
  }
  return s.join('&');
}

/**
 * Returns a Location-like object for the given URL. If it is relative,
 * the URL gets resolved.
 * Consider the returned object immutable. This is enforced during
 * testing by freezing the object.
 * @param {string} url
 * @param {boolean=} opt_nocache
 * @return {!LocationDef}
 */

function parseUrl(url, opt_nocache) {
  if (!a) {
    a = /** @type {!HTMLAnchorElement} */self.document.createElement('a');
    cache = self.UrlCache || (self.UrlCache = Object.create(null));
  }

  var fromCache = cache[url];
  if (fromCache) {
    return fromCache;
  }

  var info = parseUrlWithA(a, url);

  return cache[url] = info;
}

/**
 * Returns a Location-like object for the given URL. If it is relative,
 * the URL gets resolved.
 * @param {!HTMLAnchorElement} a
 * @param {string} url
 * @return {!LocationDef}
 */
function parseUrlWithA(a, url) {
  a.href = url;

  // IE11 doesn't provide full URL components when parsing relative URLs.
  // Assigning to itself again does the trick.
  if (!a.protocol) {
    a.href = a.href;
  }

  /** @type {!LocationDef} */
  var info = {
    href: a.href,
    protocol: a.protocol,
    host: a.host,
    hostname: a.hostname,
    port: a.port == '0' ? '' : a.port,
    pathname: a.pathname,
    search: a.search,
    hash: a.hash,
    origin: '' };

  // Some IE11 specific polyfills.
  // 1) IE11 strips out the leading '/' in the pathname.
  // Set below.
  if (info.pathname[0] !== '/') {
    info.pathname = '/' + info.pathname;
  }

  // 2) For URLs with implicit ports, IE11 parses to default ports while
  // other browsers leave the port field empty.
  if (info.protocol == 'http:' && info.port == 80 || info.protocol == 'https:' && info.port == 443) {
    info.port = '';
    info.host = info.hostname;
  }

  // For data URI a.origin is equal to the string 'null' which is not useful.
  // We instead return the actual origin which is the full URL.
  if (a.origin && a.origin != 'null') {
    info.origin = a.origin;
  } else if (info.protocol == 'data:' || !info.host) {
    info.origin = info.href;
  } else {
    info.origin = info.protocol + '//' + info.host;
  }
  return info;
}

/**
 * Parses and builds Object of URL query string.
 * @param {string} query The URL query string.
 * @return {!Object<string, string>}
 */

function parseQueryString(query) {
  if (!query) {
    return {};
  }
  return (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce(function (params, param) {
    var item = param.split('=');
    var key = decodeURIComponent(item[0] || '');
    var value = decodeURIComponent(item[1] || '');
    if (key) {
      params[key] = value;
    }
    return params;
  }, {});
}

/**
 * Adds a parameter to a query string.
 * @param {string} url
 * @param {string} param
 * @param {string} value
 * @return {string}
 */

function addQueryParam(url, param, value) {
  var queryIndex = url.indexOf('?');
  var fragmentIndex = url.indexOf('#');
  var fragment = '';
  if (fragmentIndex != -1) {
    fragment = url.substring(fragmentIndex);
    url = url.substring(0, fragmentIndex);
  }
  if (queryIndex == -1) {
    url += '?';
  } else if (queryIndex < url.length - 1) {
    url += '&';
  }
  url += encodeURIComponent(param) + '=' + encodeURIComponent(value);
  return url + fragment;
}

/**
 * Returns the Url including the path and search, without fregment.
 * @param {string} url
 * @return {string}
 */

function getHostUrl(url) {
  var locationHref = parseUrl(url);
  return locationHref.origin + locationHref.pathname + locationHref.search;
}

},{"./types":54}],56:[function(require,module,exports){
exports.__esModule = true;
exports.fetchPolyfill = fetchPolyfill;
exports.assertSuccess = assertSuccess;
/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _log = require('./log');

var _json = require('./json');

var _url = require('./url');

var _bytes = require('./bytes');

/**
 * The "init" argument of the Fetch API. Currently, only "credentials: include"
 * is implemented.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 *
 * @typedef {{
 *   body: (!FormData|string|undefined),
 *   credentials: (string|undefined),
 *   headers: (!Object|undefined),
 *   method: (string|undefined),
 *   responseType: (string)
 * }}
 */
var FetchInitDef = undefined;

exports.FetchInitDef = FetchInitDef;
/** @private @const {!Array<string>} */
var allowedMethods_ = ['GET', 'POST'];

/** @private @enum {number} Allowed fetch responses. */
var allowedFetchTypes_ = {
  document: 1,
  text: 2
};

/**
 * A class that polyfills Fetch API.
 */

var Xhr = (function () {

  /**
   * @param {!Window} win
   */

  function Xhr(win) {
    babelHelpers.classCallCheck(this, Xhr);

    /** @const {!Window} */
    this.win = win;
  }

  /**
   * Normalized method name by uppercasing.
   * @param {string|undefined} method
   * @return {string}
   * @private
   */

  /**
   * We want to call `fetch_` unbound from any context since it could
   * be either the native fetch or our polyfill.
   *
   * @param {string} input
   * @param {!FetchInitDef} init
   * @return {!Promise<!FetchResponse>|!Promise<!Response>}
   * @private
   */

  Xhr.prototype.fetch_ = function fetch_(input, init) {
    // TODO(avimehta): Should the requests go through when page is not visible?
    _log.assert(typeof input == 'string', 'Only URL supported: %s', input);
    // In particular, Firefox does not tolerate `null` values for
    // `credentials`.
    var creds = init.credentials;
    _log.assert(creds === undefined || creds == 'include' || creds == 'omit', 'Only credentials=include|omit support: %s', creds);
    // Fallback to xhr polyfill since `fetch` api does not support
    // responseType = 'document'. We do this so we don't have to do any parsing
    // and document construction on the UI thread which would be expensive.
    if (init.responseType == 'document') {
      return fetchPolyfill(input, init);
    }
    return (this.win.fetch || fetchPolyfill).apply(null, arguments);
  };

  /**
   * @param {string} input URL
   * @param {?FetchInitDef} opt_init Fetch options object.
   * @return {!Promise<!FetchResponse>}
   */

  Xhr.prototype.fetch = function fetch(input, opt_init) {
    // TODO (avimehta): Figure out if CORS needs be handled the way AMP does it.
    var init = setupInit(opt_init);
    return this.fetch_(input, init).then(function (response) {
      return response;
    }, function (reason) {
      var targetOrigin = _url.parseUrl(input).origin;
      throw new Error('XHR Failed fetching' + (' (' + targetOrigin + '/...):'), reason && reason.message);
    }).then(function (response) {
      return assertSuccess(response);
    });
  };

  return Xhr;
})();

exports.Xhr = Xhr;
function normalizeMethod_(method) {
  if (method === undefined) {
    return 'GET';
  }
  method = method.toUpperCase();

  _log.assert(allowedMethods_.includes(method), 'Only one of %s is currently allowed. Got %s', allowedMethods_.join(', '), method);

  return method;
}

/**
 * Sets up and normalizes the FetchInitDef
 *
 * @param {?FetchInitDef=} opt_init Fetch options object.
 * @param {string=} opt_accept The HTTP Accept header value.
 * @return {!FetchInitDef}
 */
function setupInit(opt_init, opt_accept) {
  var init = opt_init || /** @type {FetchInitDef} */{};
  init.method = normalizeMethod_(init.method);
  init.headers = init.headers || {};
  if (opt_accept) {
    init.headers['Accept'] = opt_accept;
  }
  return init;
}

/**
 * A minimal polyfill of Fetch API. It only polyfills what we currently use.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 *
 * Notice that the "fetch" method itself is not exported as that would require
 * us to immediately support a much wide API.
 *
 * @param {string} input
 * @param {!FetchInitDef} init
 * @return {!Promise<!FetchResponse>}
 * @private Visible for testing
 */

function fetchPolyfill(input, init) {
  return new Promise(function (resolve, reject) {
    var xhr = createXhrRequest(init.method || 'GET', input);

    if (init.credentials == 'include') {
      xhr.withCredentials = true;
    }

    if (init.responseType in allowedFetchTypes_) {
      xhr.responseType = init.responseType;
    }

    if (init.headers) {
      Object.keys(init.headers).forEach(function (header) {
        xhr.setRequestHeader(header, init.headers[header]);
      });
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState < /* STATUS_RECEIVED */2) {
        return;
      }
      if (xhr.status < 100 || xhr.status > 599) {
        xhr.onreadystatechange = null;
        reject(new Error('Unknown HTTP status ' + xhr.status));
        return;
      }

      // TODO(dvoytenko): This is currently simplified: we will wait for the
      // whole document loading to complete. This is fine for the use cases
      // we have now, but may need to be reimplemented later.
      if (xhr.readyState == /* COMPLETE */4) {
        resolve(new FetchResponse(xhr));
      }
    };
    xhr.onerror = function () {
      reject(new Error('Network failure'));
    };
    xhr.onabort = function () {
      reject(new Error('Request aborted'));
    };

    if (init.method == 'POST') {
      xhr.send(init.body);
    } else {
      xhr.send();
    }
  });
}

/**
 * @param {string} method
 * @param {string} url
 * @return {!XMLHttpRequest}
 * @private
 */
function createXhrRequest(method, url) {
  var xhr = new XMLHttpRequest();
  // TODO(avimehta): IE 8/9 don't support XHR (with CORS). Use XDR instead
  // if we plan to support those browsers.
  if ('withCredentials' in xhr) {
    xhr.open(method, url, true);
  } else {
    throw new Error('CORS is not supported');
  }
  return xhr;
}

/**
 * If 415 or in the 5xx range.
 * @param {number} status
 */
function isRetriable(status) {
  return status == 415 || status >= 500 && status < 600;
}

/**
 * Returns the response if successful or otherwise throws an error.
 * @param {!FetchResponse} response
 * @return {!Promise<!FetchResponse>}
 * @private Visible for testing
 */

function assertSuccess(response) {
  return new Promise(function (resolve) {
    if (response.ok) {
      return resolve(response);
    }

    var status = response.status;

    var err = new Error('HTTP error ' + status);
    err.retriable = isRetriable(status);
    // TODO(@jridgewell, #9448): Callers who need the response should
    // skip processing.
    err.response = response;
    throw err;
  });
}

/**
 * Response object in the Fetch API.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 */

var FetchResponse = (function () {
  /**
   * @param {!XMLHttpRequest} xhr
   */

  function FetchResponse(xhr) {
    babelHelpers.classCallCheck(this, FetchResponse);

    /** @private @const {!XMLHttpRequest} */
    this.xhr_ = xhr;

    /** @const {number} */
    this.status = this.xhr_.status;

    /** @const {boolean} */
    this.ok = this.status >= 200 && this.status < 300;

    /** @const {!FetchResponseHeaders} */
    this.headers = new FetchResponseHeaders(xhr);

    /** @type {boolean} */
    this.bodyUsed = false;

    /** @type {?ReadableStream} */
    this.body = null;
  }

  /**
   * Provides access to the response headers as defined in the Fetch API.
   * @private Visible for testing.
   */

  /**
   * Create a copy of the response and return it.
   * @return {!FetchResponse}
   */

  FetchResponse.prototype.clone = function clone() {
    _log.assert(!this.bodyUsed, 'Body already used');
    return new FetchResponse(this.xhr_);
  };

  /**
   * Drains the response and returns the text.
   * @return {!Promise<string>}
   * @private
   */

  FetchResponse.prototype.drainText_ = function drainText_() {
    _log.assert(!this.bodyUsed, 'Body already used');
    this.bodyUsed = true;
    return Promise.resolve(this.xhr_.responseText);
  };

  /**
   * Drains the response and returns a promise that resolves with the response
   * text.
   * @return {!Promise<string>}
   */

  FetchResponse.prototype.text = function text() {
    return this.drainText_();
  };

  /**
   * Drains the response and returns the JSON object.
   * @return {!Promise<!JsonObject>}
   */

  FetchResponse.prototype.json = function json() {
    return (/** @type {!Promise<!JsonObject>} */this.drainText_().then(_json.parseJson)
    );
  };

  /**
   * Reads the xhr responseXML.
   * @return {!Promise<!Document>}
   * @private
   */

  FetchResponse.prototype.document_ = function document_() {
    _log.assert(!this.bodyUsed, 'Body already used');
    this.bodyUsed = true;
    _log.assert(this.xhr_.responseXML, 'responseXML should exist. Make sure to return ' + 'Content-Type: text/html header.');
    return (/** @type {!Promise<!Document>} */Promise.resolve(_log.assert(this.xhr_.responseXML))
    );
  };

  /**
   * Drains the response and returns a promise that resolves with the response
   * ArrayBuffer.
   * @return {!Promise<!ArrayBuffer>}
   */

  FetchResponse.prototype.arrayBuffer = function arrayBuffer() {
    return (/** @type {!Promise<!ArrayBuffer>} */this.drainText_().then(_bytes.utf8EncodeSync)
    );
  };

  return FetchResponse;
})();

exports.FetchResponse = FetchResponse;

var FetchResponseHeaders = (function () {
  /**
   * @param {!XMLHttpRequest} xhr
   */

  function FetchResponseHeaders(xhr) {
    babelHelpers.classCallCheck(this, FetchResponseHeaders);

    /** @private @const {!XMLHttpRequest} */
    this.xhr_ = xhr;
  }

  /**
   * @param {string} name
   * @return {string}
   */

  FetchResponseHeaders.prototype.get = function get(name) {
    return this.xhr_.getResponseHeader(name);
  };

  /**
   * @param {string} name
   * @return {boolean}
   */

  FetchResponseHeaders.prototype.has = function has(name) {
    return this.xhr_.getResponseHeader(name) != null;
  };

  return FetchResponseHeaders;
})();

exports.FetchResponseHeaders = FetchResponseHeaders;

},{"./bytes":43,"./json":47,"./log":49,"./url":55}],57:[function(require,module,exports){
(function (global){
(function (global) {
  var babelHelpers = global.babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.slice = Array.prototype.slice;
  babelHelpers.bind = Function.prototype.bind;

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj["default"] = obj;
      return newObj;
    }
  };

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  };

  babelHelpers.get = function get(_x, _x2, _x3) {
    var _again = true;

    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      _again = false;

      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);

        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          desc = parent = undefined;
          continue _function;
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;

        if (getter === undefined) {
          return undefined;
        }

        return getter.call(receiver);
      }
    }
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.defineProperty = function (obj, key, value) {
    obj[key] = value;
    return obj;
  };
})(typeof global === "undefined" ? self : global);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[15])

})();
//# sourceMappingURL=subscriptions.max.js.map