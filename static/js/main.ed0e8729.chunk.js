(this.webpackJsonptictactoe=this.webpackJsonptictactoe||[]).push([[0],{10:function(e,c,a){e.exports={background:"App_background__3CDGK"}},18:function(e,c,a){},19:function(e,c,a){},24:function(e,c,a){"use strict";a.r(c);var t=a(0),n=a.n(t),l=a(5),r=a.n(l),s=(a(18),a(10)),o=a.n(s),i=(a(19),a(2)),d=a(4),u=a.n(d),h=a(3);var _=()=>{const[e,c]=Object(t.useState)([{checked:!1,value:""},{checked:!1,value:""},{checked:!1,value:""},{checked:!1,value:""},{checked:!1,value:""},{checked:!1,value:""},{checked:!1,value:""},{checked:!1,value:""},{checked:!1,value:""}]);let a=Object(t.useRef)(Math.floor(9*Math.random()));return console.log("123 actual",e),Object(h.jsxs)("div",{className:u.a.background,children:[Object(h.jsxs)("div",{className:u.a.crossCircle,children:[Object(h.jsx)("div",{className:u.a.cross,children:"X"}),Object(h.jsx)("div",{className:u.a.circle,children:"O"})]}),Object(h.jsx)("div",{className:u.a.rowsAndColumns,children:e.map(((t,n)=>Object(h.jsx)("div",{id:"".concat(n),onClick:t=>{(t=>{let{target:n}=t,l=[...e];if(""===l[n].value&&(e[n].value="X",c(l),l.filter((e=>""===e.value)).length>1))if(""===l[a.current].value)l[a.current].value="O",c(l);else{let e=!1;do{a.current=Math.floor(9*Math.random()),""===l[a.current].value&&(l[a.current].value="O",c(l),e=!0)}while(""!==l[a.current].value&&!1===e)}console.log("123 filter(e => e.value === '').length",l.filter((e=>""===e.value)).length),0===l.filter((e=>""===e.value)).length&&console.log("123 GAME END")})({target:n})},className:u.a.eachBox,children:e[n].value},n)))})]})};var v=function(){return Object(h.jsx)("div",{className:o.a.background,children:Object(h.jsx)(i.c,{children:Object(h.jsx)(i.a,{path:"/",element:Object(h.jsx)(h.Fragment,{children:Object(h.jsx)(_,{})})})})})},O=a(13),j=a(6);const b={serverStatus:"asd"};var S=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,c=arguments.length>1?arguments[1]:void 0;return"SET_INDEX_CHOOSEN"===c.type?{...e,indexChoosen:c.payload}:e},x=a(12);const g="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||j.b;var C=Object(j.c)(S,g(Object(j.a)(x.a))),f=a(8);r.a.render(Object(h.jsx)(n.a.StrictMode,{children:Object(h.jsx)(O.a,{store:C,children:Object(h.jsx)(f.a,{basename:"/tictactoe",children:Object(h.jsx)(v,{})})})}),document.getElementById("root"))},4:function(e,c,a){e.exports={background:"MainCSS_background__1Q1tO",rowsAndColumns:"MainCSS_rowsAndColumns__2GrZo",crossCircle:"MainCSS_crossCircle__1T8V_",cross:"MainCSS_cross__3wO_9",circle:"MainCSS_circle__29slD",eachRow:"MainCSS_eachRow__3aF6L",eachBox:"MainCSS_eachBox__3qaSx"}}},[[24,1,2]]]);
//# sourceMappingURL=main.ed0e8729.chunk.js.map