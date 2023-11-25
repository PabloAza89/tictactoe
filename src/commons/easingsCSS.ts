import $ from 'jquery';

export const easings = () => {
  $.easing.jswing = $.easing.swing;
  $.extend($.easing,
  {
    def: 'easeOutQuad',
    swing: function(x: number, t: number, b: number, c: number, d: number) {
      return -c *(t/=d)*(t-2) + b;
    },
    easeInQuad: function(x: number, t: number, b: number, c: number, d: number) {
      return c*(t/=d)*t + b;
    },
    easeOutQuad: function(x: number, t: number, b: number, c: number, d: number) {
      return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function(x: number, t: number, b: number, c: number, d: number) {
      if ((t/=d/2) < 1) return c/2*t*t + b;
      return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function(x: number, t: number, b: number, c: number, d: number) {
      return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function(x: number, t: number, b: number, c: number, d: number) {
      return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function(x: number, t: number, b: number, c: number, d: number) {
      if ((t/=d/2) < 1) return c/2*t*t*t + b;
      return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function(x: number, t: number, b: number, c: number, d: number) {
      return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function(x: number, t: number, b: number, c: number, d: number) {
      return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function(x: number, t: number, b: number, c: number, d: number) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
      return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function(x: number, t: number, b: number, c: number, d: number) {
      return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function(x: number, t: number, b: number, c: number, d: number) {
      return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function(x: number, t: number, b: number, c: number, d: number) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
      return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function(x: number, t: number, b: number, c: number, d: number) {
      return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function(x: number, t: number, b: number, c: number, d: number) {
      return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function(x: number, t: number, b: number, c: number, d: number) {
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function(x: number, t: number, b: number, c: number, d: number) {
      return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function(x: number, t: number, b: number, c: number, d: number) {
      return (t===d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function(x: number, t: number, b: number, c: number, d: number) {
      if (t===0) return b;
      if (t===d) return b+c;
      if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x: number, t: number, b: number, c: number, d: number) {
      return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function(x: number, t: number, b: number, c: number, d: number) {
      return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function(x: number, t: number, b: number, c: number, d: number) {
      if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
      return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function(x: number, t: number, b: number, c: number, d: number) {
      var s=1.70158; var p=0; var a=c;
      if (t===0) return b;  if ((t/=d)===1) return b+c;  if (!p) p=d*.3;
      if (a < Math.abs(c)) { a=c; s=p/4; }
      else s = p/(2*Math.PI) * Math.asin (c/a);
      return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function(x: number, t: number, b: number, c: number, d: number) {
      var s=1.70158; var p=0; var a=c;
      if (t===0) return b;  if ((t/=d)===1) return b+c;  if (!p) p=d*.3;
      if (a < Math.abs(c)) { a=c; s=p/4; }
      else s = p/(2*Math.PI) * Math.asin (c/a);
      return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function(x: number, t: number, b: number, c: number, d: number) {
      var s=1.70158; var p=0; var a=c;
      if (t===0) return b;  if ((t/=d/2)===2) return b+c;  if (!p) p=d*(.3*1.5);
      if (a < Math.abs(c)) { a=c; s=p/4; }
      else s = p/(2*Math.PI) * Math.asin (c/a);
      if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function(x: number, t: number, b: number, c: number, d: number, s:number) {
      if (s === undefined) s = 1.70158;
      return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function(x: number, t: number, b: number, c: number, d: number, s:number) {
      if (s === undefined) s = 1.70158;
      return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function(x: number, t: number, b: number, c: number, d: number, s:number) {
      if (s === undefined) s = 1.70158;
      if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function(x: number, t: number, b: number, c: number, d: number) {
      let r = d-t
      if ((r/=d) < (1/2.75)) return c - (c*(7.5625*r*r)) + b;
      else if (r < (2/2.75)) return c - (c*(7.5625*(r-=(1.5/2.75))*r + .75)) + b;
      else if (r < (2.5/2.75)) return c - (c*(7.5625*(r-=(2.25/2.75))*r + .9375)) + b;
      else return c - (c*(7.5625*(r-=(2.625/2.75))*r + .984375)) + b;
    },
    easeOutBounce: function(x:number, t:number, b:number, c:number, d:number) {
      if ((t/=d) < (1/2.75)) return c*(7.5625*t*t) + b;
      else if (t < (2/2.75)) return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
      else if (t < (2.5/2.75)) return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
      else return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    },
    easeInOutBounce: function(x:number, t:number, b:number, c:number, d:number) {
      if (t < d/2) {
        let r = t*2
        if ((r/=d) < (1/2.75)) return (c*(7.5625*r*r)) * .5 + b;
        else if (r < (2/2.75)) return (c*(7.5625*(r-=(1.5/2.75))*r + .75)) * .5 + b;
        else if (r < (2.5/2.75)) return (c*(7.5625*(r-=(2.25/2.75))*r + .9375)) * .5 + b;
        else return (c*(7.5625*(r-=(2.625/2.75))*r + .984375)) * .5 + b;
      }
      let z = t*2-d
      if ((z/=d) < (1/2.75)) return (c*(7.5625*z*z)) * .5 + c*.5 + b;
      else if (z < (2/2.75)) return (c*(7.5625*(z-=(1.5/2.75))*z + .75)) * .5 + c*.5 + b;
      else if (z < (2.5/2.75)) return (c*(7.5625*(z-=(2.25/2.75))*z + .9375)) * .5 + c*.5 + b;
      else return (c*(7.5625*(z-=(2.625/2.75))*z + .984375)) * .5 + c*.5 + b;
    }
  });
}