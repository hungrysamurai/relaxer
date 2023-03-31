"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
!function s(o, n, r) {
  function a(i, t) {
    if (!n[i]) {
      if (!o[i]) {
        var e = "function" == typeof require && require;
        if (!t && e) return e(i, !0);
        if (c) return c(i, !0);
        t = new Error("Cannot find module '" + i + "'");
        throw t.code = "MODULE_NOT_FOUND", t;
      }
      e = n[i] = {
        exports: {}
      };
      o[i][0].call(e.exports, function (t) {
        var e = o[i][1][t];
        return a(e || t);
      }, e, e.exports, s, o, n, r);
    }
    return n[i].exports;
  }
  for (var c = "function" == typeof require && require, t = 0; t < r.length; t++) a(r[t]);
  return a;
}({
  1: [function (t, e, i) {
    "use strict";

    function s(t) {
      this.getElement(t.element), this.x1 = 0, this.y1 = 0, this.name = t.name || !1, this.elToSetClassOn = t.elToSetClassOn || "body", this.direction = t.direction || "diagonal", this.customDirection = t.customDirection || {}, this.validateInput("direction"), this.isPausedWhenNotInView = t.isPausedWhenNotInView || !1, this.states = t.states, this.stateTransitionSpeed = t.stateTransitionSpeed || 1e3, this.previousTimeStamp = null, this.progress = 0, this.isPaused = !1, this.isCleared = !1, this.isPausedBecauseNotInView = !1, this.context = this.canvas.getContext("2d"), this.channels = {}, this.channelsIndex = 0, this.activeState = t.defaultStateName || "default-state", this.isChangingState = !1, this.currentColors = [], this.currentColorsPos = [], this.activetransitionSpeed = null, this.eventPolyfill(), this.scrollDebounceThreshold = t.scrollDebounceThreshold || 300, this.scrollDebounceTimeout = null, this.isImgLoaded = !1, this.isCanvasInWindowView = !1, this.firstScrollInit = !0, this.animating = !1, this.gradientLength = this.states[this.activeState].gradients[0].length, t.image && t.image.source && (this.image = {
        source: t.image.source,
        position: t.image.position || ["center", "center"],
        stretchMode: t.image.stretchMode || !1,
        blendingMode: t.image.blendingMode || !1
      }), this.events = {
        start: new CustomEvent("granim:start"),
        end: new CustomEvent("granim:end"),
        gradientChange: function gradientChange(t) {
          return new CustomEvent("granim:gradientChange", {
            detail: {
              isLooping: t.isLooping,
              colorsFrom: t.colorsFrom,
              colorsTo: t.colorsTo,
              activeState: t.activeState
            },
            bubbles: !1,
            cancelable: !1
          });
        }
      }, this.callbacks = {
        onStart: "function" == typeof t.onStart && t.onStart,
        onGradientChange: "function" == typeof t.onGradientChange && t.onGradientChange,
        onEnd: "function" == typeof t.onEnd && t.onEnd
      }, this.getDimensions(), this.canvas.setAttribute("width", this.x1), this.canvas.setAttribute("height", this.y1), this.setColors(), this.image && (this.validateInput("image"), this.prepareImage()), this.pauseWhenNotInViewNameSpace = this.pauseWhenNotInView.bind(this), this.setSizeAttributesNameSpace = this.setSizeAttributes.bind(this), this.onResize(), this.isPausedWhenNotInView ? this.onScroll() : this.image || (this.refreshColorsAndPos(), this.animation = requestAnimationFrame(this.animateColors.bind(this)), this.animating = !0), this.callbacks.onStart && this.callbacks.onStart(), this.canvas.dispatchEvent(this.events.start);
    }
    s.prototype.animateColors = t("./animateColors.js"), s.prototype.changeBlendingMode = t("./changeBlendingMode.js"), s.prototype.changeDirection = t("./changeDirection.js"), s.prototype.changeState = t("./changeState.js"), s.prototype.clear = t("./clear.js"), s.prototype.convertColorToRgba = t("./convertColorToRgba.js"), s.prototype.destroy = t("./destroy.js"), s.prototype.eventPolyfill = t("./eventPolyfill.js"), s.prototype.getColor = t("./getColor.js"), s.prototype.getColorDiff = t("./getColorDiff.js"), s.prototype.getColorPos = t("./getColorPos.js"), s.prototype.getColorPosDiff = t("./getColorPosDiff.js"), s.prototype.getCurrentColors = t("./getCurrentColors.js"), s.prototype.getCurrentColorsPos = t("./getCurrentColorsPos.js"), s.prototype.getDimensions = t("./getDimensions.js"), s.prototype.getElement = t("./getElement.js"), s.prototype.getLightness = t("./getLightness.js"), s.prototype.makeGradient = t("./makeGradient.js"), s.prototype.onResize = t("./onResize.js"), s.prototype.onScroll = t("./onScroll.js"), s.prototype.pause = t("./pause.js"), s.prototype.pauseWhenNotInView = t("./pauseWhenNotInView.js"), s.prototype.play = t("./play.js"), s.prototype.prepareImage = t("./prepareImage.js"), s.prototype.refreshColorsAndPos = t("./refreshColorsAndPos.js"), s.prototype.setColors = t("./setColors.js"), s.prototype.setDirection = t("./setDirection.js"), s.prototype.setSizeAttributes = t("./setSizeAttributes.js"), s.prototype.triggerError = t("./triggerError.js"), s.prototype.validateInput = t("./validateInput.js"), e.exports = s;
  }, {
    "./animateColors.js": 2,
    "./changeBlendingMode.js": 3,
    "./changeDirection.js": 4,
    "./changeState.js": 5,
    "./clear.js": 6,
    "./convertColorToRgba.js": 7,
    "./destroy.js": 8,
    "./eventPolyfill.js": 9,
    "./getColor.js": 10,
    "./getColorDiff.js": 11,
    "./getColorPos.js": 12,
    "./getColorPosDiff.js": 13,
    "./getCurrentColors.js": 14,
    "./getCurrentColorsPos.js": 15,
    "./getDimensions.js": 16,
    "./getElement.js": 17,
    "./getLightness.js": 18,
    "./makeGradient.js": 19,
    "./onResize.js": 20,
    "./onScroll.js": 21,
    "./pause.js": 22,
    "./pauseWhenNotInView.js": 23,
    "./play.js": 24,
    "./prepareImage.js": 25,
    "./refreshColorsAndPos.js": 26,
    "./setColors.js": 27,
    "./setDirection.js": 28,
    "./setSizeAttributes.js": 29,
    "./triggerError.js": 30,
    "./validateInput.js": 31
  }],
  2: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = 100 < t - this.previousTimeStamp,
        i = void 0 === this.states[this.activeState].loop || this.states[this.activeState].loop;
      null !== this.previousTimeStamp && !e || (this.previousTimeStamp = t), this.progress = this.progress + (t - this.previousTimeStamp), e = (this.progress / this.activetransitionSpeed * 100).toFixed(2), this.previousTimeStamp = t, this.refreshColorsAndPos(e), e < 100 ? this.animation = requestAnimationFrame(this.animateColors.bind(this)) : this.channelsIndex < this.states[this.activeState].gradients.length - 2 || i ? (this.isChangingState && (this.activetransitionSpeed = this.states[this.activeState].transitionSpeed || 5e3, this.isChangingState = !1), this.previousTimeStamp = null, this.progress = 0, this.channelsIndex++, t = !1, this.channelsIndex === this.states[this.activeState].gradients.length - 1 ? t = !0 : this.channelsIndex === this.states[this.activeState].gradients.length && (this.channelsIndex = 0), e = void 0 === this.states[this.activeState].gradients[this.channelsIndex + 1] ? this.states[this.activeState].gradients[0] : this.states[this.activeState].gradients[this.channelsIndex + 1], this.setColors(), this.animation = requestAnimationFrame(this.animateColors.bind(this)), this.callbacks.onGradientChange && this.callbacks.onGradientChange({
        isLooping: t,
        colorsFrom: this.states[this.activeState].gradients[this.channelsIndex],
        colorsTo: e,
        activeState: this.activeState
      }), this.canvas.dispatchEvent(this.events.gradientChange({
        isLooping: t,
        colorsFrom: this.states[this.activeState].gradients[this.channelsIndex],
        colorsTo: e,
        activeState: this.activeState
      }))) : (cancelAnimationFrame(this.animation), this.callbacks.onEnd && this.callbacks.onEnd(), this.canvas.dispatchEvent(new CustomEvent("granim:end")));
    };
  }, {}],
  3: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      this.context.clearRect(0, 0, this.x1, this.y1), this.context.globalCompositeOperation = this.image.blendingMode = t, this.validateInput("blendingMode"), this.isPaused && this.refreshColorsAndPos();
    };
  }, {}],
  4: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      this.context.clearRect(0, 0, this.x1, this.y1), this.direction = t, this.validateInput("direction"), this.isPaused && this.refreshColorsAndPos();
    };
  }, {}],
  5: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var o = this;
      this.activeState !== t && (this.isPaused || (this.isPaused = !0, this.pause()), this.channelsIndex = -1, this.activetransitionSpeed = this.stateTransitionSpeed, this.activeColorsDiff = [], this.activeColorsPosDiff = [], this.activeColors = this.getCurrentColors(), this.activeColorsPos = this.getCurrentColorsPos(), this.progress = 0, this.previousTimeStamp = null, this.isChangingState = !0, this.states[t].gradients[0].forEach(function (t, e, i) {
        var s = o.convertColorToRgba(o.getColor(t)),
          t = o.getColorPos(t, e),
          s = o.getColorDiff(o.activeColors[e], s),
          e = o.getColorPosDiff(o.activeColorsPos[e], t);
        o.activeColorsDiff.push(s), o.activeColorsPosDiff.push(e);
      }), this.activeState = t, this.play());
    };
  }, {}],
  6: [function (t, e, i) {
    "use strict";

    e.exports = function () {
      this.isPaused ? this.isPaused = !1 : cancelAnimationFrame(this.animation), this.isCleared = !0, this.context.clearRect(0, 0, this.x1, this.y1);
    };
  }, {}],
  7: [function (t, e, i) {
    "use strict";

    var s,
      o = {
        hexa: /^#(?:[0-9a-fA-F]{3}){1,2}$/,
        rgba: /^rgba\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3}), ?(.?\d{1,3})\)$/,
        rgb: /^rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)$/,
        hsla: /^hsla\((\d{1,3}), ?(\d{1,3})%, ?(\d{1,3})%, ?(.?\d{1,3})\)$/,
        hsl: /^hsl\((\d{1,3}), ?(\d{1,3})%, ?(\d{1,3})%\)$/
      };
    function a(t, e, i) {
      return i < 0 && (i += 1), 1 < i && --i, i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t;
    }
    function n(t, e, i, s) {
      var o, n, r;
      return 0 === e ? o = n = r = i : (o = a(e = 2 * i - (i = i < .5 ? i * (1 + e) : i + e - i * e), i, t + 1 / 3), n = a(e, i, t), r = a(e, i, t - 1 / 3)), [Math.round(255 * o), Math.round(255 * n), Math.round(255 * r), s];
    }
    e.exports = function (t) {
      switch (function (t) {
        var e = Object.keys(o),
          i = 0;
        for (; i < e.length; i++) if (s = o[e[i]].exec(t)) return e[i];
        return !1;
      }(t)) {
        default:
          this.triggerError("colorType");
        case "hexa":
          var e = t;
          return e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (t, e, i, s) {
            return e + e + i + i + s + s;
          }), (e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)) ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16), 1] : null;
        case "rgba":
          return [parseInt(s[1], 10), parseInt(s[2], 10), parseInt(s[3], 10), parseFloat(s[4])];
        case "rgb":
          return [parseInt(s[1], 10), parseInt(s[2], 10), parseInt(s[3], 10), 1];
        case "hsla":
          return n(parseInt(s[1], 10) / 360, parseInt(s[2], 10) / 100, parseInt(s[3], 10) / 100, parseFloat(s[4]));
        case "hsl":
          return n(parseInt(s[1], 10) / 360, parseInt(s[2], 10) / 100, parseInt(s[3], 10) / 100, 1);
      }
    };
  }, {}],
  8: [function (t, e, i) {
    "use strict";

    e.exports = function () {
      this.onResize("removeListeners"), this.onScroll("removeListeners"), this.clear();
    };
  }, {}],
  9: [function (t, e, i) {
    "use strict";

    e.exports = function () {
      function t(t, e) {
        e = e || {
          bubbles: !1,
          cancelable: !1,
          detail: void 0
        };
        var i = document.createEvent("CustomEvent");
        return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i;
      }
      "function" != typeof window.CustomEvent && (t.prototype = window.Event.prototype, window.CustomEvent = t);
    };
  }, {}],
  10: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      return "string" == typeof t ? t : "object" == _typeof(t) && t.color ? t.color : void this.triggerError("gradient.color");
    };
  }, {}],
  11: [function (t, e, i) {
    "use strict";

    e.exports = function (t, e) {
      for (var i = 0, s = []; i < 4; i++) s.push(e[i] - t[i]);
      return s;
    };
  }, {}],
  12: [function (t, e, i) {
    "use strict";

    e.exports = function (t, e) {
      return "object" == _typeof(t) && t.pos ? t.pos : parseFloat(e ? (1 / (this.gradientLength - 1) * e).toFixed(2) : 0);
    };
  }, {}],
  13: [function (t, e, i) {
    "use strict";

    e.exports = function (t, e) {
      return e - t;
    };
  }, {}],
  14: [function (t, e, i) {
    "use strict";

    e.exports = function () {
      for (var t, e = [], i = 0; i < this.currentColors.length; i++) for (e.push([]), t = 0; t < 4; t++) e[i].push(this.currentColors[i][t]);
      return e;
    };
  }, {}],
  15: [function (t, e, i) {
    "use strict";

    e.exports = function () {
      for (var t = [], e = 0; e < this.currentColorsPos.length; e++) t.push(this.currentColorsPos[e]);
      return t;
    };
  }, {}],
  16: [function (t, e, i) {
    "use strict";

    e.exports = function () {
      this.x1 = this.canvas.offsetWidth, this.y1 = this.canvas.offsetHeight;
    };
  }, {}],
  17: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      if (t instanceof HTMLCanvasElement) this.canvas = t;else {
        if ("string" != typeof t) throw new Error("The element you used is neither a String, nor a HTMLCanvasElement");
        this.canvas = document.querySelector(t);
      }
      if (!this.canvas) throw new Error("`" + t + "` could not be found in the DOM");
    };
  }, {}],
  18: [function (t, e, i) {
    "use strict";

    e.exports = function () {
      for (var t, e = null, i = this.getCurrentColors().map(function (t) {
          return Math.max(t[0], t[1], t[2]);
        }), s = 0; s < i.length; s++) e = null === e ? i[s] : e + i[s], s === i.length - 1 && (t = Math.round(e / (s + 1)));
      return 128 <= t ? "light" : "dark";
    };
  }, {}],
  19: [function (t, e, i) {
    "use strict";

    e.exports = function () {
      var t = this.setDirection(),
        e = document.querySelector(this.elToSetClassOn).classList,
        i = 0;
      for (this.context.clearRect(0, 0, this.x1, this.y1), this.image && this.context.drawImage(this.imageNode, this.imagePosition.x, this.imagePosition.y, this.imagePosition.width, this.imagePosition.height); i < this.currentColors.length; i++) t.addColorStop(this.currentColorsPos[i], "rgba(" + this.currentColors[i][0] + ", " + this.currentColors[i][1] + ", " + this.currentColors[i][2] + ", " + this.currentColors[i][3] + ")");
      this.name && ("light" === this.getLightness() ? (e.remove(this.name + "-dark"), e.add(this.name + "-light")) : (e.remove(this.name + "-light"), e.add(this.name + "-dark"))), this.context.fillStyle = t, this.context.fillRect(0, 0, this.x1, this.y1);
    };
  }, {}],
  20: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      "removeListeners" === t ? window.removeEventListener("resize", this.setSizeAttributesNameSpace) : window.addEventListener("resize", this.setSizeAttributesNameSpace);
    };
  }, {}],
  21: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      "removeListeners" === t ? window.removeEventListener("scroll", this.pauseWhenNotInViewNameSpace) : (window.addEventListener("scroll", this.pauseWhenNotInViewNameSpace), this.pauseWhenNotInViewNameSpace());
    };
  }, {}],
  22: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      this.isCleared || ("isPausedBecauseNotInView" !== t && (this.isPaused = !0), cancelAnimationFrame(this.animation), this.animating = !1);
    };
  }, {}],
  23: [function (t, e, i) {
    "use strict";

    e.exports = function () {
      var e = this;
      this.scrollDebounceTimeout && clearTimeout(this.scrollDebounceTimeout), this.scrollDebounceTimeout = setTimeout(function () {
        var t = e.canvas.getBoundingClientRect();
        e.isCanvasInWindowView = !(t.bottom < 0 || t.right < 0 || t.left > window.innerWidth || t.top > window.innerHeight), e.isCanvasInWindowView ? e.isPaused && !e.firstScrollInit || e.image && !e.isImgLoaded || (e.isPausedBecauseNotInView = !1, e.play("isPlayedBecauseInView"), e.firstScrollInit = !1) : (!e.image && e.firstScrollInit && (e.refreshColorsAndPos(), e.firstScrollInit = !1), e.isPaused || e.isPausedBecauseNotInView || (e.isPausedBecauseNotInView = !0, e.pause("isPausedBecauseNotInView")));
      }, this.scrollDebounceThreshold);
    };
  }, {}],
  24: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      "isPlayedBecauseInView" !== t && (this.isPaused = !1), this.isCleared = !1, this.animating || (this.animation = requestAnimationFrame(this.animateColors.bind(this)), this.animating = !0);
    };
  }, {}],
  25: [function (t, e, i) {
    "use strict";

    e.exports = function () {
      var n = this;
      function t() {
        for (var t = 0; t < 2; t++) {
          e = o = s = i = void 0;
          var e,
            i = t ? "y" : "x",
            s = n[i + "1"],
            o = n["x" === i ? "imgOriginalWidth" : "imgOriginalHeight"];
          switch ("x" === i ? n.image.position[0] : n.image.position[1]) {
            case "center":
              e = s < o ? -(o - s) / 2 : (s - o) / 2, n.imagePosition[i] = e, n.imagePosition["x" === i ? "width" : "height"] = o;
              break;
            case "top":
              n.imagePosition.y = 0, n.imagePosition.height = o;
              break;
            case "bottom":
              n.imagePosition.y = s - o, n.imagePosition.height = o;
              break;
            case "right":
              n.imagePosition.x = s - o, n.imagePosition.width = o;
              break;
            case "left":
              n.imagePosition.x = 0, n.imagePosition.width = o;
          }
          if (n.image.stretchMode) switch ("x" === i ? n.image.stretchMode[0] : n.image.stretchMode[1]) {
            case "none":
              break;
            case "stretch":
              n.imagePosition[i] = 0, n.imagePosition["x" === i ? "width" : "height"] = s;
              break;
            case "stretch-if-bigger":
              o < s || (n.imagePosition[i] = 0, n.imagePosition["x" === i ? "width" : "height"] = s);
              break;
            case "stretch-if-smaller":
              s < o || (n.imagePosition[i] = 0, n.imagePosition["x" === i ? "width" : "height"] = s);
          }
        }
      }
      this.imagePosition || (this.imagePosition = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }), this.image.blendingMode && (this.context.globalCompositeOperation = this.image.blendingMode), this.imageNode ? t() : (this.imageNode = new Image(), this.imageNode.onerror = function () {
        throw new Error("Granim: The image source is invalid.");
      }, this.imageNode.onload = function () {
        n.imgOriginalWidth = n.imageNode.width, n.imgOriginalHeight = n.imageNode.height, t(), n.refreshColorsAndPos(), n.isPausedWhenNotInView && !n.isCanvasInWindowView || (n.animation = requestAnimationFrame(n.animateColors.bind(n))), n.isImgLoaded = !0;
      }, this.imageNode.src = this.image.source);
    };
  }, {}],
  26: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      for (var e, i, s, o = this, n = 0; n < this.activeColors.length; n++) {
        for (s = 0; s < 4; s++) (e = o.activeColors[n][s] + (3 !== s ? Math.ceil(o.activeColorsDiff[n][s] / 100 * t) : Math.round(o.activeColorsDiff[n][s] / 100 * t * 100) / 100)) <= 255 && 0 <= e && (o.currentColors[n][s] = e);
        (i = parseFloat((o.activeColorsPos[n] + o.activeColorsPosDiff[n] / 100 * t).toFixed(4))) <= 1 && 0 <= i && (o.currentColorsPos[n] = i);
      }
      this.makeGradient();
    };
  }, {}],
  27: [function (t, e, i) {
    "use strict";

    e.exports = function () {
      var n,
        r,
        a,
        c = this;
      this.channels[this.activeState] || (this.channels[this.activeState] = []), void 0 !== this.channels[this.activeState][this.channelsIndex] ? (this.activeColors = this.channels[this.activeState][this.channelsIndex].colors, this.activeColorsDiff = this.channels[this.activeState][this.channelsIndex].colorsDiff, this.activeColorsPos = this.channels[this.activeState][this.channelsIndex].colorsPos, this.activeColorsPosDiff = this.channels[this.activeState][this.channelsIndex].colorsPosDiff) : (this.channels[this.activeState].push([{}]), this.channels[this.activeState][this.channelsIndex].colors = [], this.channels[this.activeState][this.channelsIndex].colorsDiff = [], this.channels[this.activeState][this.channelsIndex].colorsPos = [], this.channels[this.activeState][this.channelsIndex].colorsPosDiff = [], this.activeColors = [], this.activeColorsDiff = [], this.activeColorsPos = [], this.activeColorsPosDiff = [], this.states[this.activeState].gradients[this.channelsIndex].forEach(function (t, e) {
        var i = c.getColorPos(t, e),
          t = c.getColor(t),
          s = c.convertColorToRgba(t),
          o = c.channels[c.activeState];
        o[c.channelsIndex].colors.push(s), c.activeColors.push(s), o[c.channelsIndex].colorsPos.push(i), c.activeColorsPos.push(i), c.isCurrentColorsSet || (c.currentColors.push(c.convertColorToRgba(t)), c.currentColorsPos.push(i)), r = c.channelsIndex === c.states[c.activeState].gradients.length - 1 ? (n = c.getColorDiff(o[c.channelsIndex].colors[e], o[0].colors[e]), c.getColorPosDiff(o[c.channelsIndex].colorsPos[e], o[0].colorsPos[e])) : (r = c.convertColorToRgba(c.getColor(c.states[c.activeState].gradients[c.channelsIndex + 1][e])), a = c.getColorPos(c.states[c.activeState].gradients[c.channelsIndex + 1][e], e), n = c.getColorDiff(o[c.channelsIndex].colors[e], r), c.getColorPosDiff(o[c.channelsIndex].colorsPos[e], a)), o[c.channelsIndex].colorsDiff.push(n), c.activeColorsDiff.push(n), o[c.channelsIndex].colorsPosDiff.push(r), c.activeColorsPosDiff.push(r);
      }), this.activetransitionSpeed = this.states[this.activeState].transitionSpeed || 5e3, this.isCurrentColorsSet = !0);
    };
  }, {}],
  28: [function (t, e, i) {
    "use strict";

    function s(t, e) {
      return -1 < t.indexOf("%") ? e / 100 * parseInt(t.split("%")[0], 10) : parseInt(t.split("px")[0], 10);
    }
    e.exports = function () {
      var t = this.context;
      switch (this.direction) {
        case "diagonal":
          return t.createLinearGradient(0, 0, this.x1, this.y1);
        case "left-right":
          return t.createLinearGradient(0, 0, this.x1, 0);
        case "top-bottom":
          return t.createLinearGradient(this.x1 / 2, 0, this.x1 / 2, this.y1);
        case "radial":
          return t.createRadialGradient(this.x1 / 2, this.y1 / 2, this.x1 / 2, this.x1 / 2, this.y1 / 2, 0);
        case "custom":
          return t.createLinearGradient(s(this.customDirection.x0, this.x1), s(this.customDirection.y0, this.y1), s(this.customDirection.x1, this.x1), s(this.customDirection.y1, this.y1));
      }
    };
  }, {}],
  29: [function (t, e, i) {
    "use strict";

    e.exports = function () {
      this.getDimensions(), this.canvas.setAttribute("width", this.x1), this.canvas.setAttribute("height", this.y1), this.image && this.prepareImage(), this.refreshColorsAndPos();
    };
  }, {}],
  30: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      throw new Error('Granim: Input error on "' + t + '" option.\nCheck the API https://sarcadass.github.io/granim.js/api.html.');
    };
  }, {}],
  31: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = ["none", "stretch", "stretch-if-smaller", "stretch-if-bigger"];
      switch (t) {
        case "image":
          Array.isArray(this.image.position) && 2 === this.image.position.length && -1 !== ["left", "center", "right"].indexOf(this.image.position[0]) && -1 !== ["top", "center", "bottom"].indexOf(this.image.position[1]) || this.triggerError("image.position"), !this.image.stretchMode || Array.isArray(this.image.stretchMode) && 2 === this.image.stretchMode.length && -1 !== e.indexOf(this.image.stretchMode[0]) && -1 !== e.indexOf(this.image.stretchMode[1]) || this.triggerError("image.stretchMode");
          break;
        case "blendingMode":
          -1 === ["multiply", "screen", "normal", "overlay", "darken", "lighten", "lighter", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"].indexOf(this.image.blendingMode) && (this.clear(), this.triggerError("blendingMode"));
          break;
        case "direction":
          -1 === ["diagonal", "left-right", "top-bottom", "radial", "custom"].indexOf(this.direction) ? this.triggerError("direction") : "custom" !== this.direction || function (t) {
            var e,
              i = !0,
              s = 0;
            for (; i && s < t.length;) {
              var o, n;
              "string" == typeof (e = t[s]) && (n = o = null, -1 !== e.indexOf("px") && (n = "px"), -1 !== e.indexOf("%") && (n = "%"), o = e.split(n).filter(function (t) {
                return 0 < t.length;
              }), n) && !(2 < o.length) && o[0] && !o[1] && /^-?\d+\.?\d*$/.test(o[0]) || (i = !1), s++;
            }
            return i;
          }([this.customDirection.x0, this.customDirection.x1, this.customDirection.y0, this.customDirection.y1]) || this.triggerError("customDirection");
      }
    };
  }, {}],
  32: [function (t, e, i) {
    window.Granim = t("./lib/Granim.js");
  }, {
    "./lib/Granim.js": 1
  }]
}, {}, [32]);
var container = document.getElementById("container"),
  text = document.getElementById("text");
var soundButton = document.querySelector(".soundbutton"),
  audio = document.querySelector(".audio");
var colorControlsContainer = document.querySelector(".color-controls-container"),
  innerCircle = document.querySelector(".circle"),
  outerCircle = document.querySelector(".gradient-circle"),
  pointer = document.querySelector(".pointer");
localStorage.getItem("relaxer-colorSchema") || localStorage.setItem("relaxer-colorSchema", 0);
var currentColorSchema = +localStorage.getItem("relaxer-colorSchema");
var totalTime = 9500,
  breathTime = totalTime / 5 * 2,
  holdTime = totalTime / 5,
  gradients = [[["#231942", "#E0B1CB"], ["#E0B1CB", "#231942"]], [["#023E8A", "#ADE8F4"], ["#ADE8F4", "#023E8A"]], [["#233B3F", "#E2BF83"], ["#E2BF83", "#233B3F"]], [["#28102B", "#4E313D"], ["#4E313D", "#28102B"]], [["#6D6875", "#FFCDB2"], ["#FFCDB2", "#6D6875"]]];
function breathAnimation() {
  text.innerText = "Вдох", container.className = "container grow", setTimeout(function () {
    text.innerText = "Держим", setTimeout(function () {
      text.innerText = "Выдох", container.className = "container shrink";
    }, holdTime);
  }, breathTime);
}
function setColorSchema(t) {
  colorControlsContainer.innerHTML = "", updateColorSwitcher(t), innerCircle.style.animationName = "change-bg-" + t, outerCircle.style.background = "var(--gradient".concat(t, ")"), pointer.style.animationName = "change-bg-" + t;
  new Granim({
    element: "#granim-canvas",
    direction: "radial",
    opacity: [1, 1],
    states: {
      "default-state": {
        gradients: [gradients[t][0], gradients[t][1]],
        transitionSpeed: totalTime / 2
      }
    }
  });
}
function updateColorSwitcher(s) {
  gradients.forEach(function (t, e) {
    var i = document.createElement("div");
    i.classList.add("color-scheme"), e === s ? i.classList.add("active") : i.addEventListener("click", function (t) {
      t = +t.target.dataset.color;
      localStorage.setItem("relaxer-colorSchema", t), setColorSchema(t);
    }), i.setAttribute("data-color", e), i.style.background = "var(--gradient".concat(e, ")"), colorControlsContainer.appendChild(i);
  });
}
colorControlsContainer.addEventListener("click", function (t) {
  colorControlsContainer.classList.toggle("folded");
}), soundButton.addEventListener("click", function (t) {
  soundButton.classList.toggle("paused"), audio.paused ? audio.play() : audio.pause();
}), window.onfocus = function () {
  soundButton.classList.contains("paused") ? audio.pause() : audio.play();
}, window.onblur = function () {
  audio.pause();
}, setColorSchema(currentColorSchema), breathAnimation(), setInterval(breathAnimation, totalTime);