(this.webpackJsonptictactoe=this.webpackJsonptictactoe||[]).push([[0],{20:function(e,t,n){e.exports={background:"App_background__3CDGK"}},21:function(e,t,n){e.exports={noSelect:"commonsCSS_noSelect__3G6Ou",noDeco:"commonsCSS_noDeco__1atZN"}},31:function(e,t,n){},32:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(11),r=n.n(o),i=(n(31),n(20)),s=n.n(i),l=(n(32),n(2)),u=n(5),d=n.n(u),m=n(21),_=n.n(m),h=n(47),S=n(9),O=n.n(S),C=n(8),j=n.n(C),b=n(4);var T=()=>{const[e,t]=Object(a.useState)(Array.from({length:9},((e,t)=>({id:t,value:""}))));let n=Object(a.useRef)(!1);const[c,o]=Object(a.useState)({X:0,O:0});let r=Object(a.useRef)(!1);const[i,s]=Object(a.useState)(!1);let l=Object(a.useRef)("");const[u,m]=Object(a.useState)(""),[S,C]=Object(a.useState)(!0);let T=Object(a.useRef)(!1);const[f,v]=Object(a.useState)(!1),[E,N]=Object(a.useState)(!1);let M=Object(a.useRef)(!1),p=Object(a.useRef)(Math.floor(9*Math.random()));const x=async a=>{let{target:c}=a;const o=async()=>{let a=[...e];if(a.filter((e=>""===e.value)).length>=1){console.log("123 entro AI 1"),console.log("123 entro AI 2");let e=!1;do{p.current=Math.floor(9*Math.random()),""===a[p.current].value&&(a[p.current].value="O",t(a),n.current=!1,e=!0,T.current=!1,v(!1),C(!0))}while(!1===e);g()}};if(T.current){setTimeout((()=>{o()}),4300+[700,800,900,1e3,1100][Math.floor(5*Math.random())])}else n.current||(T.current=!1,(async()=>{let a=[...e];console.log("123",a),void 0===c||""!==a[c].value||n.current||r.current||!S||(console.log("123 USUARIO EJECUTO NORMALMENTE"),n.current=!0,e[c].value="X",t(a),C(!1))})().then((()=>{g()})).then((()=>{if(console.log("123 valor de clickBlocked",n),n.current&&!r.current){console.log("123 SE EJECUTO IA"),console.log("123 entro aca 3"),setTimeout((()=>o()),[700,800,900,1e3,1100][Math.floor(5*Math.random())])}})))},y=async e=>{let{array:t,letter:a}=e;A+=100,n.current=!0,r.current=!0,s(!0),setTimeout((()=>{j()("#".concat(t[0].id)).css("background","yellow")}),300),setTimeout((()=>{j()("#".concat(t[1].id)).css("background","yellow")}),600),setTimeout((()=>{j()("#".concat(t[2].id)).css("background","yellow")}),900),setTimeout((()=>{let e={...c};e[a]=e[a]+A,o(e),l.current="".concat(a),setTimeout((()=>{m("".concat(a))}),300)}),1200)};let A=0;const g=async()=>{let t=[...e];[0,3,6].forEach((e=>{t.slice(e,e+3).every((e=>"X"===e.value))&&y({array:t.slice(e,e+3),letter:"X"}),t.slice(e,e+3).every((e=>"O"===e.value))&&y({array:t.slice(e,e+3),letter:"O"})})),[0,1,2].forEach(((e,n)=>{[t[e],t[e+3],t[e+6]].every((e=>"X"===e.value))&&y({array:[t[e],t[e+3],t[e+6]],letter:"X"}),[t[e],t[e+3],t[e+6]].every((e=>"O"===e.value))&&y({array:[t[e],t[e+3],t[e+6]],letter:"O"})})),[t[0],t[4],t[8]].every((e=>"X"===e.value))&&y({array:[t[0],t[4],t[8]],letter:"X"}),[t[0],t[4],t[8]].every((e=>"O"===e.value))&&y({array:[t[0],t[4],t[8]],letter:"O"}),[t[2],t[4],t[6]].every((e=>"X"===e.value))&&y({array:[t[2],t[4],t[6]],letter:"X"}),[t[2],t[4],t[6]].every((e=>"O"===e.value))&&y({array:[t[2],t[4],t[6]],letter:"O"}),(0===t.filter((e=>""===e.value)).length||r.current)&&(s(!0),console.log("PAUSED VALUE",B.current),B.current||(B.current=!0,I.current+=Date.now(),X()),setTimeout((()=>{O.a.fire({title:""!==l.current&&"X"===l.current?"YOU WIN !":""!==l.current&&"O"===l.current?"IA WIN !":"TIED GAME",text:100===A?"+100 Points":200===A?"+200 Points !! Supperrrb !!!":"no winner, no points.",icon:"success",showConfirmButton:!1,showDenyButton:!1,showCancelButton:!1,timer:2e3}),setTimeout((()=>{""!==l.current&&"X"===l.current||""!==l.current&&"O"===l.current||m("TIED")}),1200)}),1200),setTimeout((()=>{j()("#timerBox").addClass("".concat(d.a.changeColor))}),3200))},w=()=>{B.current?(I.current=0,X()):I.current=-Date.now(),o({X:0,O:0}),j()("#buttonStart").removeClass("".concat(d.a.shakeAnimation)),j()("#timerBox").removeClass("".concat(d.a.changeColor)),N(!1),t(Array.from({length:9},((e,t)=>({id:t,value:""})))),r.current=!1,s(!1),C(!0),l.current="",m(""),A=0,p.current=Math.floor(9*Math.random()),e.forEach((e=>{j()("#".concat(e.id)).css("background","red")}))},k=()=>{j()("#buttonStart").removeClass("".concat(d.a.shakeAnimation)),O.a.fire({title:"WELCOME TO TIC-TAC-TOE !",text:"Please, select who start first..",showDenyButton:!0,confirmButtonText:"LET ME START !",denyButtonText:"\xa0\xa0\xa0\xa0IA STARTS !\xa0\xa0\xa0",confirmButtonColor:"#800080",denyButtonColor:"#008000"}).then((e=>{e.isConfirmed?(U(),console.log("CONFIRMED"),N(!0),T.current=!1,v(!1),n.current=!1,j()("#buttonStart").removeClass("".concat(d.a.shakeAnimation)),setTimeout((()=>{R()}),4300)):e.isDenied?(U(),console.log("REJECTED"),N(!0),T.current=!0,n.current=!0,v(!0),j()("#buttonStart").removeClass("".concat(d.a.shakeAnimation)),setTimeout((()=>{R()}),4300)):(console.log("OTHER"),j()("#buttonStart").addClass("".concat(d.a.shakeAnimation)))}))};Object(a.useEffect)((()=>{console.log("EXECUTED IA"),T.current&&E&&(console.log("123 EXECUTED INNER IA"),x({}))}),[E]),j()((function(){E||M.current?j()("#buttonStart").removeClass("".concat(d.a.shakeAnimation)):j()("#buttonStart").addClass("".concat(d.a.shakeAnimation))}));let I=Object(a.useRef)(0),B=Object(a.useRef)(!0);function R(){B.current&&(B.current=!1,I.current-=Date.now(),X())}function D(e,t,n,a){return(e=Math.floor(e/t)%n).toString().padStart(a,0)}function X(){var e=B.current?I.current:Date.now()+I.current;let t=document.getElementById("s_ms");null!==t&&(t.textContent=D(e,1,1e3,3));let n=document.getElementById("s_seconds");null!==n&&(n.textContent=D(e,1e3,60,2));let a=document.getElementById("s_minutes");null!==a&&(a.textContent=D(e,6e4,60,2)),B.current||requestAnimationFrame(X)}X();const U=()=>{setTimeout((()=>{O.a.fire({title:"STARTS IN\n3..",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1e3})}),0),setTimeout((()=>{O.a.fire({title:"STARTS IN\n2..",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1e3})}),1e3),setTimeout((()=>{O.a.fire({title:"STARTS IN\n1..",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1e3})}),2e3),setTimeout((()=>{O.a.fire({title:"GO !!!",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1300})}),3e3)};return Object(b.jsxs)("div",{className:"".concat(d.a.background," ").concat(_.a.noSelect),children:[Object(b.jsx)(h.a,{id:"buttonStart",className:d.a.button,variant:"outlined",sx:{color:"white",background:"blue","&:hover":{background:"green"}},onClick:()=>{E?O.a.fire({title:"DO YOU WANT TO START A\xa0NEW\xa0GAME\xa0?",text:"All points gonna be lost !..",icon:"info",showDenyButton:!0,confirmButtonText:"START NEW GAME !",denyButtonText:"CONTINUE PLAYING !",confirmButtonColor:"#800080",denyButtonColor:"#008000"}).then((e=>{e.isConfirmed&&(w(),k())})):k()},children:"NEW GAME"}),Object(b.jsxs)("div",{className:d.a.participants,children:[Object(b.jsx)("div",{className:d.a.participant,children:Object(b.jsx)("div",{className:d.a.pointsTitle,children:"Points:"})}),Object(b.jsxs)("div",{className:d.a.participant,children:[Object(b.jsx)("div",{className:d.a.turn,children:f?null:E&&S&&!i?"TURN\xa0":null}),Object(b.jsx)("div",{className:d.a.participantName,children:"You:"}),Object(b.jsx)("div",{className:d.a.points,children:Object(b.jsxs)("div",{className:d.a.innerPoints,children:["\xa0",c.X,"\xa0"]})})]}),Object(b.jsxs)("div",{className:d.a.participant,children:[Object(b.jsx)("div",{className:d.a.turn,children:f?"TURN\xa0":!E||S||i?null:"TURN\xa0"}),Object(b.jsx)("div",{className:d.a.participantName,children:"IA:"}),Object(b.jsx)("div",{className:d.a.points,children:Object(b.jsxs)("div",{className:d.a.innerPoints,children:["\xa0",c.O,"\xa0"]})})]}),Object(b.jsx)("div",{className:d.a.finalWinner,children:""!==l.current&&"X"===u?"WINNER: YOU !":""!==l.current&&"O"===u?"WINNER: IA !":""===l.current&&"TIED"===u?"TIED GAME !":null}),Object(b.jsxs)("div",{style:{display:E?"flex":"none"},id:"timerBox",className:d.a.timer,children:[Object(b.jsx)("div",{children:"TIME:\xa0\xa0"}),Object(b.jsx)("div",{id:"s_minutes",className:d.a.eachTime,children:"00"}),":",Object(b.jsx)("div",{id:"s_seconds",className:d.a.eachTime,children:"00"}),Object(b.jsx)("div",{className:d.a.smallerMili,children:":"}),Object(b.jsx)("div",{id:"s_ms",className:"".concat(d.a.smallerMili," ").concat(d.a.eachTimeMini),children:"000"})]})]}),Object(b.jsx)("div",{id:"rowsAndColumns",className:d.a.rowsAndColumns,children:e.map(((t,n)=>Object(b.jsx)("div",{id:"".concat(n),onClick:e=>{E&&x({target:n})},className:d.a.eachBox,children:e[n].value},n)))}),Object(b.jsx)(h.a,{id:"buttonStart",className:d.a.button,variant:"outlined",onClick:()=>{console.log("clicked")},children:"TEST"})]})};var f=function(){return Object(b.jsx)("div",{className:s.a.background,children:Object(b.jsx)(l.c,{children:Object(b.jsx)(l.a,{path:"/",element:Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(T,{})})})})})},v=n(24),E=n(14);const N={serverStatus:"asd"};var M=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;return"SET_INDEX_CHOOSEN"===t.type?{...e,indexChoosen:t.payload}:e},p=n(23);const x="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||E.b;var y=Object(E.c)(M,x(Object(E.a)(p.a))),A=n(18);r.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(v.a,{store:y,children:Object(b.jsx)(A.a,{basename:"/tictactoe",children:Object(b.jsx)(f,{})})})}),document.getElementById("root"))},5:function(e,t,n){e.exports={background:"MainCSS_background__1Q1tO",button:"MainCSS_button__2c_QR",noAnimation:"MainCSS_noAnimation__1uiwW",onone:"MainCSS_onone__3mZ_2",shakeAnimation:"MainCSS_shakeAnimation__fG_-C",shake:"MainCSS_shake__SfRao",changeColor:"MainCSS_changeColor__2-mW8",changeCol:"MainCSS_changeCol__24VVs",timer:"MainCSS_timer__3HWC8",eachTime:"MainCSS_eachTime__3bWTB",eachTimeMini:"MainCSS_eachTimeMini__2eU1d",smallerMili:"MainCSS_smallerMili__3jRfz",participants:"MainCSS_participants__2fMaH",participant:"MainCSS_participant__3Hqsa",turn:"MainCSS_turn__3rc7J",blink:"MainCSS_blink__3XQfa",participantName:"MainCSS_participantName__Nj8p0",pointsTitle:"MainCSS_pointsTitle__1Lx4I",points:"MainCSS_points__2hJpt",innerPoints:"MainCSS_innerPoints__21ZiP",finalWinner:"MainCSS_finalWinner__2pYW0",rowsAndColumns:"MainCSS_rowsAndColumns__2GrZo",crossCircle:"MainCSS_crossCircle__1T8V_",cross:"MainCSS_cross__3wO_9",circle:"MainCSS_circle__29slD",eachRow:"MainCSS_eachRow__3aF6L",eachBox:"MainCSS_eachBox__3qaSx"}}},[[37,1,2]]]);
//# sourceMappingURL=main.5a054548.chunk.js.map