(this.webpackJsonptictactoe=this.webpackJsonptictactoe||[]).push([[0],{20:function(e,t,n){e.exports={background:"App_background__3CDGK"}},21:function(e,t,n){e.exports={noSelect:"commonsCSS_noSelect__3G6Ou",noDeco:"commonsCSS_noDeco__1atZN"}},31:function(e,t,n){},32:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(11),i=n.n(a),o=(n(31),n(20)),s=n.n(o),l=(n(32),n(2)),u=n(5),m=n.n(u),d=n(21),_=n.n(d),h=n(47),S=n(9),j=n.n(S),O=n(8),b=n.n(O),C=n(4);var x=()=>{let e=Object(r.useRef)(Array.from({length:9},((e,t)=>({id:t,value:""})))),t=Object(r.useRef)(!0),n=Object(r.useRef)(!1),c=Object(r.useRef)(!0);const[a,i]=Object(r.useState)({X:0,O:0});let o=Object(r.useRef)(!1),s=Object(r.useRef)("");const[l,u]=Object(r.useState)(""),[d,S]=Object(r.useState)(!0);let O=Object(r.useRef)(!0);const[x,f]=Object(r.useState)(3);let T=Object(r.useRef)(!1);const[v,N]=Object(r.useState)(!1),[p,M]=Object(r.useState)(!1),[y,E]=Object(r.useState)(!1);let w=Object(r.useRef)(Math.floor(9*Math.random()));const g=async()=>{setTimeout((()=>{if(e.current.filter((e=>""===e.value)).length>=1){let t=!1;do{w.current=Math.floor(9*Math.random()),""===e.current[w.current].value&&(e.current[w.current].value="O",t=!0,M(!1),S(!0))}while(!1===t)}k().then((()=>{o.current||(t.current=!1)}))}),[700,800,900,1e3,1100][Math.floor(5*Math.random())])},I=async r=>{let{target:c}=r;(async r=>{void 0!==r&&""===e.current[r].value?(console.log("while se ejecuto func de user, valid click"),e.current[r].value="X",S(!1),n.current=!0,t.current=!0):n.current=!1})(c).then((()=>{n.current&&k()})).then((()=>{!o.current&&n.current&&g()}))},A=async e=>{let{array:n,letter:r}=e;B+=100,t.current=!0,o.current=!0,setTimeout((()=>{b()("#".concat(n[0].id)).css("background","yellow")}),300),setTimeout((()=>{b()("#".concat(n[1].id)).css("background","yellow")}),600),setTimeout((()=>{b()("#".concat(n[2].id)).css("background","yellow")}),900),setTimeout((()=>{let e={...a};e[r]=e[r]+B,i(e),s.current="".concat(r),setTimeout((()=>{u("".concat(r))}),300)}),1200)};let B=0;const k=async()=>{let n=[0,3,6,9],r=[0,1,2,3];n.slice(0,-1).forEach(((t,r)=>{let c=e.current.slice(t,n[r+1]);c.every((e=>"X"===e.value))&&A({array:c,letter:"X"}),c.every((e=>"O"===e.value))&&A({array:c,letter:"O"})})),r.slice(0,-1).forEach((t=>{let n=[];r.slice(0,-1).forEach(((c,a)=>{n.push(e.current[t+a*r.slice(-1)[0]])})),n.every((e=>"X"===e.value))&&A({array:n,letter:"X"}),n.every((e=>"O"===e.value))&&A({array:n,letter:"O"})}));let a=[[],[]];[0,2,4].forEach((t=>{a[0].push(e.current[2*t]),a[1].push(e.current[t+2])})),a.forEach((e=>{e.every((e=>"X"===e.value))&&A({array:e,letter:"X"}),e.every((e=>"O"===e.value))&&A({array:e,letter:"O"})})),0===e.current.filter((e=>""===e.value)).length&&(o.current=!0),o.current&&(H(),setTimeout((()=>{c.current&&(j.a.fire({title:"X"===s.current?"YOU WIN !":"O"===s.current?"AI WIN !":"TIED GAME",text:100===B?"+100 Points":200===B?"+200 Points !! Supperrrb !!!":"no winner, no points.",icon:""===s.current?"info":"success",showConfirmButton:!1,showDenyButton:!1,showCancelButton:!1,timer:2e3}),setTimeout((()=>{""===s.current&&(u("TIED"),t.current=!0)}),1200))}),1200),T.current=!0,setTimeout((()=>{T.current&&(N(!0),f(3))}),3e3),setTimeout((()=>{T.current&&f(2)}),4e3),setTimeout((()=>{T.current&&f(1)}),5e3),setTimeout((()=>{T.current&&f(0)}),6e3),setTimeout((()=>{T.current&&(N(!1),f(3),O.current=!O.current),O.current&&T.current?(U(),O.current=!0,M(!1),V(),t.current=!1,T.current=!1):T.current&&(U(),O.current=!1,t.current=!0,M(!0),V(),g(),T.current=!1)}),7e3),setTimeout((()=>{o.current&&G()}),3200))},R=()=>b()("#buttonStart").addClass("".concat(m.a.shakeAnimation)),D=()=>b()("#buttonStart").removeClass("".concat(m.a.shakeAnimation)),G=()=>b()("#timerBox").addClass("".concat(m.a.changeColor)),X=()=>b()("#timerBox").removeClass("".concat(m.a.changeColor)),W=()=>c.current=!0;Object(r.useEffect)((()=>{R()}),[]);const P=()=>{Q(),E(!0)},U=()=>{W(),H(),Z(),e.current=Array.from({length:9},((e,t)=>({id:t,value:""}))),t.current=!0,B=0,o.current=!1,s.current="",u(""),S(!0),D(),X(),B=0,w.current=Math.floor(9*Math.random()),e.current.forEach((e=>{b()("#".concat(e.id)).css("background","red")}))},L=()=>{T.current=!1,N(!1),W(),H(),Z(),e.current=Array.from({length:9},((e,t)=>({id:t,value:""}))),t.current=!0,i({X:0,O:0}),B=0,o.current=!1,s.current="",u(""),S(!0),D(),X(),B=0,w.current=Math.floor(9*Math.random()),e.current.forEach((e=>{b()("#".concat(e.id)).css("background","red")})),D(),E(!1),j.a.fire({title:"WELCOME TO TIC-TAC-TOE !",text:"Please, select who start first..",showDenyButton:!0,confirmButtonText:"LET ME START !",denyButtonText:"\xa0\xa0\xa0\xa0AI STARTS !\xa0\xa0\xa0",confirmButtonColor:"#800080",denyButtonColor:"#008000"}).then((e=>{e.isConfirmed?(P(),O.current=!0,M(!1),setTimeout((()=>{V(),t.current=!1}),4300)):e.isDenied?(P(),O.current=!1,t.current=!0,M(!0),setTimeout((()=>{V(),g()}),4300)):R()}))},K=()=>{c.current=!1,D(),y?j.a.fire({title:"DO YOU WANT TO START A\xa0NEW\xa0GAME\xa0?",text:"All points gonna be lost !..",icon:"info",showDenyButton:!0,confirmButtonText:"START NEW GAME !",denyButtonText:"CONTINUE PLAYING !",confirmButtonColor:"#800080",denyButtonColor:"#008000"}).then((e=>{e.isConfirmed?L():W()})):L()};let Y=Object(r.useRef)(0),J=Object(r.useRef)(!0);function V(){J.current&&(J.current=!1,Y.current-=Date.now(),F())}function H(){J.current||(J.current=!0,Y.current+=Date.now(),F())}function Z(){J.current?(Y.current=0,F()):Y.current=-Date.now()}function q(e,t,n,r){return(e=Math.floor(e/t)%n).toString().padStart(r,0)}function F(){var e=J.current?Y.current:Date.now()+Y.current;let t=document.getElementById("timer_ms");null!==t&&(t.textContent=q(e,1,1e3,3));let n=document.getElementById("timer_seconds");null!==n&&(n.textContent=q(e,1e3,60,2));let r=document.getElementById("timer_minutes");null!==r&&(r.textContent=q(e,6e4,60,2)),J.current||requestAnimationFrame(F)}F();const Q=()=>{setTimeout((()=>{j.a.fire({title:"STARTS IN\n3..",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1e3})}),0),setTimeout((()=>{j.a.fire({title:"STARTS IN\n2..",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1e3})}),1e3),setTimeout((()=>{j.a.fire({title:"STARTS IN\n1..",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1e3})}),2e3),setTimeout((()=>{j.a.fire({title:"GO !!!",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1300})}),3e3)};return console.log("rC",e.current),Object(C.jsxs)("div",{className:"".concat(m.a.background," ").concat(_.a.noSelect),children:[Object(C.jsx)(h.a,{id:"buttonStart",className:m.a.button,variant:"outlined",sx:{color:"white",background:"blue","&:hover":{background:"green"}},onClick:()=>{K()},children:"NEW GAME"}),Object(C.jsxs)("div",{className:m.a.participants,children:[Object(C.jsx)("div",{className:m.a.participant,children:Object(C.jsx)("div",{className:m.a.pointsTitle,children:"Points:"})}),Object(C.jsxs)("div",{className:m.a.participant,children:[Object(C.jsx)("div",{className:m.a.turn,children:p?null:y&&d&&!o.current?"TURN\xa0":null}),Object(C.jsx)("div",{className:m.a.participantName,children:"You:"}),Object(C.jsx)("div",{className:m.a.points,children:Object(C.jsxs)("div",{className:m.a.innerPoints,children:["\xa0",a.X,"\xa0"]})})]}),Object(C.jsxs)("div",{className:m.a.participant,children:[Object(C.jsx)("div",{className:m.a.turn,children:p?"TURN\xa0":!y||d||o.current?null:"TURN\xa0"}),Object(C.jsx)("div",{className:m.a.participantName,children:"AI:"}),Object(C.jsx)("div",{className:m.a.points,children:Object(C.jsxs)("div",{className:m.a.innerPoints,children:["\xa0",a.O,"\xa0"]})})]}),Object(C.jsx)("div",{className:m.a.finalWinner,children:o.current&&"X"===l?"WINNER: YOU !":o.current&&"O"===l?"WINNER: AI !":o.current&&"TIED"===l?"TIED GAME !":null}),Object(C.jsxs)("div",{style:{display:y?"flex":"none"},id:"timerBox",className:m.a.timer,children:[Object(C.jsx)("div",{children:"TIME:\xa0\xa0"}),Object(C.jsx)("div",{id:"timer_minutes",className:m.a.eachTime,children:"00"}),":",Object(C.jsx)("div",{id:"timer_seconds",className:m.a.eachTime,children:"00"}),Object(C.jsx)("div",{className:m.a.smallerMili,children:":"}),Object(C.jsx)("div",{id:"timer_ms",className:"".concat(m.a.smallerMili," ").concat(m.a.eachTimeMini),children:"000"})]})]}),Object(C.jsxs)("div",{className:m.a.rowsAndColumns,children:[e.current.map(((n,r)=>Object(C.jsx)("div",{id:"".concat(r),onClick:e=>{t.current||I({target:r})},className:m.a.eachBox,children:e.current[r].value},r))),Object(C.jsx)("div",{style:{display:v&&T.current?"flex":"none"},className:m.a.nextGameIn,children:0===x?Object(C.jsx)("div",{className:m.a.nextGameInInner,children:"Go !!!"}):Object(C.jsxs)("div",{className:m.a.nextGameInInner,children:[Object(C.jsx)("div",{className:m.a.nextGameText,children:"\xa0Next round in"}),Object(C.jsxs)("div",{className:m.a.nextGameNumber,children:[x,"\xa0"]})]})})]})]})};var f=function(){return Object(C.jsx)("div",{className:s.a.background,children:Object(C.jsx)(l.c,{children:Object(C.jsx)(l.a,{path:"/",element:Object(C.jsx)(C.Fragment,{children:Object(C.jsx)(x,{})})})})})},T=n(24),v=n(14);const N={serverStatus:"asd"};var p=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;return"SET_INDEX_CHOOSEN"===t.type?{...e,indexChoosen:t.payload}:e},M=n(23);const y="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||v.b;var E=Object(v.c)(p,y(Object(v.a)(M.a))),w=n(18);i.a.render(Object(C.jsx)(c.a.StrictMode,{children:Object(C.jsx)(T.a,{store:E,children:Object(C.jsx)(w.a,{basename:"/tictactoe",children:Object(C.jsx)(f,{})})})}),document.getElementById("root"))},5:function(e,t,n){e.exports={background:"MainCSS_background__1Q1tO",nextGameIn:"MainCSS_nextGameIn__3XPK8",nextGameInInner:"MainCSS_nextGameInInner__3Te5s",nextGameText:"MainCSS_nextGameText__2P-X_",nextGameNumber:"MainCSS_nextGameNumber__24lJN",button:"MainCSS_button__2c_QR",noAnimation:"MainCSS_noAnimation__1uiwW",onone:"MainCSS_onone__3mZ_2",shakeAnimation:"MainCSS_shakeAnimation__fG_-C",shake:"MainCSS_shake__SfRao",changeColor:"MainCSS_changeColor__2-mW8",changeCol:"MainCSS_changeCol__24VVs",timer:"MainCSS_timer__3HWC8",eachTime:"MainCSS_eachTime__3bWTB",eachTimeMini:"MainCSS_eachTimeMini__2eU1d",smallerMili:"MainCSS_smallerMili__3jRfz",participants:"MainCSS_participants__2fMaH",participant:"MainCSS_participant__3Hqsa",turn:"MainCSS_turn__3rc7J",blink:"MainCSS_blink__3XQfa",participantName:"MainCSS_participantName__Nj8p0",pointsTitle:"MainCSS_pointsTitle__1Lx4I",points:"MainCSS_points__2hJpt",innerPoints:"MainCSS_innerPoints__21ZiP",finalWinner:"MainCSS_finalWinner__2pYW0",rowsAndColumns:"MainCSS_rowsAndColumns__2GrZo",crossCircle:"MainCSS_crossCircle__1T8V_",cross:"MainCSS_cross__3wO_9",circle:"MainCSS_circle__29slD",eachRow:"MainCSS_eachRow__3aF6L",eachBox:"MainCSS_eachBox__3qaSx"}}},[[37,1,2]]]);
//# sourceMappingURL=main.672ab03d.chunk.js.map