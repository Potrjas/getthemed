(function (factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    }
    else if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else {
        factory(jQuery);
    }
    }(function ($) {
    "use strict";
    var k = {},
        max = Math.max,
        min = Math.min;
    k.c = {};
    k.c.d = $(document);
    k.c.t = function (e) {
        return e.originalEvent.touches.length - 1;
    };
    k.o = function () {
        var s = this;
        this.o = null;
        this.$ = null;
        this.i = null;
        this.g = null;
        this.v = null;
        this.cv = null;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.$c = null;
        this.c = null;
        this.t = 0;
        this.isInit = false;
        this.fgColor = null;
        this.pColor = null;
        this.dH = null;
        this.cH = null;
        this.eH = null;
        this.rH = null;
        this.scale = 1;
        this.relative = false;
        this.relativeWidth = false;
        this.relativeHeight = false;
        this.$div = null;
        this.run = function () {
            var cf = function (e, conf) {
                var k;
                for (k in conf) {
                    s.o[k] = conf[k];
                }
                s._carve().init();
                s._configure()
                ._draw();
            };
            if (this.$.data('kontroled')) return;
            this.$.data('kontroled', true);
            this.extend();
            this.o = $.extend({
                min: 0,
                max: 100,
                readOnly: true,
                thickness: 0.04,
                width: 140,
                height: 140,
                displayInput: true,
                fgColor: '#FCB81E',
                step: 1,
                format: function(v) {
                    return v;
                },
                parse: function (v) {
                    return parseFloat(v);
                }
            }, this.o
            );
            if (this.$.is('fieldset')) {
                this.v = {};
                this.i = this.$.find('input');
                this.i.each(function(k) {
                    var $this = $(this);
                    s.i[k] = $this;
                    s.v[k] = s.o.parse($this.val());
                    $this.bind(
                        'change blur',
                        function () {
                            var val = {};
                            val[k] = $this.val();
                            s.val(s._validate(val));
                        }
                    );
                });
                this.$.find('legend').remove();
            }
            else {
                this.i = this.$;
                this.v = this.o.parse(this.$.val());
                this.v === '' && (this.v = this.o.min);
                this.$.bind(
                    'change blur',
                    function () {
                        s.val(s._validate(s.o.parse(s.$.val())));
                    }
                );
            }
            this.$c = $(document.createElement('canvas')).attr({
                width: this.o.width,
                height: this.o.height
            });
            this.$div = $('<div style="'
                + 'width:' + this.o.width + 'px;height:' + this.o.height + 'px;'
                + '"></div>');
            this.$div.css({
                'border': '10px solid #262626',
                'border-radius': '50%',
                'box-sizing': 'content-box',
                'background-color': '#262626'
            });
            this.$.wrap(this.$div).before(this.$c);
            this.$div = this.$.parent();
            this.c = this.$c[0].getContext ? this.$c[0].getContext('2d') : null;
            this._carve();
            this._listen()
                ._configure()
                ._xy()
                .init();
        };
        this._carve = function() {
                this.w = this.o.width;
                this.h = this.o.height;
        };
        this._draw = function () {
            var d = true;
            s.g = s.c;
            s.clear();
            s.dH && (d = s.dH());
            d !== false && s.draw();
        };
        this._xy = function () {
            var o = this.$c.offset();
            this.x = o.left;
            this.y = o.top;
            return this;
        };
        this._listen = function () {
            return this;
        };
        this._configure = function () {
            return this;
        };
        this._clear = function () {
            this.$c[0].width = this.$c[0].width;
        };
        this._validate = function (v) {
            var val = (~~ (((v < 0) ? -0.5 : 0.5) + (v/this.o.step))) * this.o.step;
            return Math.round(val * 100) / 100;
        };
        this.clear = function () { this._clear(); };
    };
    k.Dial = function () {
        k.o.call(this);
        this.startAngle = null;
        this.xy = null;
        this.radius = null;
        this.lineWidth = null;
        this.cursorExt = null;
        this.w2 = null;
        this.PI2 = 2*Math.PI;
        this.extend = function () {
            this.o = $.extend({
                bgColor: '#262626',
                angleOffset: 0,
                angleArc: 360,
                inline: true
            }, this.o);
        };
        this.val = function (v, triggerRelease) {
            if (null != v) {
                v = this.o.parse(v);
                if (triggerRelease !== false
                    && v != this.v
                    && this.rH
                    && this.rH(v) === false)
                    {
                        return;
                    }
                this.cv = this.o.stopper ? max(min(v, this.o.max), this.o.min) : v;
                this.v = this.cv;
                this.$.val(this.o.format(this.v));
                this._draw();
            }
            else {
                return this.v;
            }
        };
        this.init = function () {
            if (this.v < this.o.min|| this.v > this.o.max) {
                this.v = this.o.min;
            }
            this.$.val(this.v);
            this.w2 = this.w / 2;
            this.cursorExt = this.o.cursor / 100;
            this.xy = this.w2 * this.scale;
            this.lineWidth = this.xy * this.o.thickness;
            this.lineCap = this.o.lineCap;
            this.radius = this.xy - this.lineWidth / 2;
            this.o.angleOffset
            && (this.o.angleOffset = isNaN(this.o.angleOffset) ? 0 : this.o.angleOffset);
            this.o.angleArc
            && (this.o.angleArc = isNaN(this.o.angleArc) ? this.PI2 : this.o.angleArc);
            this.angleOffset = this.o.angleOffset * Math.PI / 180;
            this.angleArc = this.o.angleArc * Math.PI / 180;
            this.startAngle = 1.5 * Math.PI + this.angleOffset;
            this.endAngle = 1.5 * Math.PI + this.angleOffset + this.angleArc;
            this.o.displayInput
                && this.i.css({
                    'width' : '100%',
                    'height' : '48px',
                    'position' : 'absolute',
                    'top' : '36px',
                    'left' : 0,
                    'background-color' : 'transparent',
                    'font-family' : 'Open Sans',
                    'font-size' : '48px',
                    'font-weight': 600,
                    'text-align' : 'center',
                    'color' : '#fff',
                    'cursor' : 'default',
                    'z-index': 1
                });
        };
        this.angle = function (v) {
            return (v - this.o.min) * this.angleArc / (this.o.max - this.o.min);
        };
        this.arc = function (v) {
          var sa, ea;
          v = this.angle(v);
          if (this.o.flip) {
              sa = this.endAngle + 0.00001;
              ea = sa - v - 0.00001;
          } else {
              sa = this.startAngle - 0.00001;
              ea = sa + v + 0.00001;
          }
          this.o.cursor
              && (sa = ea - this.cursorExt)
              && (ea = ea + this.cursorExt);

          return {
              s: sa,
              e: ea,
              d: this.o.flip && !this.o.cursor
          };
        };
        this.draw = function () {
            var c = this.g,
                a = this.arc(this.cv),
                pa,
                r = 1;
            c.lineWidth = this.lineWidth;
            c.beginPath();
            c.strokeStyle = r ? this.o.fgColor : this.fgColor ;
            c.arc(this.xy, this.xy, this.radius, a.s, a.e, a.d);
            c.stroke();
        };
    };
    $.fn.dial = $.fn.knob = function (o) {
        return this.each(
            function () {
                var d = new k.Dial();
                d.o = o;
                d.$ = $(this);
                d.run();
            }
        ).parent();
    };
}));