(this.webpackJsonptictactoe=this.webpackJsonptictactoe||[]).push([[0],{20:function(e,t,n){e.exports={background:"App_background__3CDGK"}},21:function(e,t,n){e.exports={noSelect:"commonsCSS_noSelect__3G6Ou",noDeco:"commonsCSS_noDeco__1atZN"}},31:function(e,t,n){},32:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(11),i=n.n(a),s=(n(31),n(20)),o=n.n(s),l=(n(32),n(2)),u=n(5),m=n.n(u),d=n(21),_=n.n(d),b=n(47),h=n(9),S=n.n(h),j=n(8),O=n.n(j),T=n(3);var x=()=>{let e=Object(r.useRef)(Array.from({length:9},((e,t)=>({id:t,value:""})))),t=Object(r.useRef)([]),n=Object(r.useRef)(!0),c=Object(r.useRef)(!1),a=Object(r.useRef)(!0);const[i,s]=Object(r.useState)({X:0,O:0});let o=Object(r.useRef)(!1),l=Object(r.useRef)("");const[u,d]=Object(r.useState)(""),[h,j]=Object(r.useState)(!0);let x=Object(r.useRef)(!0);const[C,N]=Object(r.useState)(3);let v=Object(r.useRef)(!1);const[f,M]=Object(r.useState)(!1),[p,E]=Object(r.useState)(!1),[y,w]=Object(r.useState)(!1);let I=Object(r.useRef)(Math.floor(9*Math.random()));const g=async()=>{setTimeout((()=>{if(e.current.filter((e=>""===e.value)).length>=1){let t=!1;do{I.current=Math.floor(9*Math.random()),""===e.current[I.current].value&&(e.current[I.current].value="O",t=!0,E(!1),j(!0))}while(!1===t)}k().then((()=>{o.current||(n.current=!1)}))}),[700,800,900,1e3,1100][Math.floor(5*Math.random())])},A=async t=>{let{target:r}=t;(async t=>{void 0!==t&&""===e.current[t].value?(console.log("while se ejecuto func de user, valid click"),e.current[t].value="X",j(!1),c.current=!0,n.current=!0):c.current=!1})(r).then((()=>{c.current&&k()})).then((()=>{!o.current&&c.current&&g()}))},B=async e=>{let{array:r,letter:c}=e;R+=100,n.current=!0,o.current=!0,setTimeout((()=>{O()("#".concat(r[0].id)).css("background","yellow")}),300),setTimeout((()=>{O()("#".concat(r[1].id)).css("background","yellow")}),600),setTimeout((()=>{O()("#".concat(r[2].id)).css("background","yellow")}),900),setTimeout((()=>{let e,n,r,a={...i};a[c]=a[c]+R,s(a),l.current="".concat(c),setTimeout((()=>{d("".concat(c))}),300);let o=document.getElementById("timer_minutes");null!==o&&(e=o.innerHTML);let u=document.getElementById("timer_seconds");null!==u&&(n=u.innerHTML);let m=document.getElementById("timer_ms");null!==m&&(r=m.innerHTML),t.current.push({id:t.current.length,scoreX:"X"===c?R:0,X:"X"===c?"\u2714\ufe0f":"\u274c",O:"O"===c?"\u2714\ufe0f":"\u274c",scoreO:"O"===c?R:0,time:"".concat(e,":").concat(n,":").concat(r)})}),1200)};let R=0;const k=async()=>{let t=[0,3,6,9],r=[0,1,2,3];t.slice(0,-1).forEach(((n,r)=>{let c=e.current.slice(n,t[r+1]);c.every((e=>"X"===e.value))&&B({array:c,letter:"X"}),c.every((e=>"O"===e.value))&&B({array:c,letter:"O"})})),r.slice(0,-1).forEach((t=>{let n=[];r.slice(0,-1).forEach(((c,a)=>{n.push(e.current[t+a*r.slice(-1)[0]])})),n.every((e=>"X"===e.value))&&B({array:n,letter:"X"}),n.every((e=>"O"===e.value))&&B({array:n,letter:"O"})}));let c=[[],[]];[0,2,4].forEach((t=>{c[0].push(e.current[2*t]),c[1].push(e.current[t+2])})),c.forEach((e=>{e.every((e=>"X"===e.value))&&B({array:e,letter:"X"}),e.every((e=>"O"===e.value))&&B({array:e,letter:"O"})})),0===e.current.filter((e=>""===e.value)).length&&(o.current=!0),o.current&&(F(),setTimeout((()=>{a.current&&(S.a.fire({title:"X"===l.current?"YOU WIN !":"O"===l.current?"AI WIN !":"TIED GAME",text:100===R?"+100 Points":200===R?"+200 Points !! Supperrrb !!!":"no winner, no points.",icon:""===l.current?"info":"success",showConfirmButton:!1,showDenyButton:!1,showCancelButton:!1,timer:2e3}),setTimeout((()=>{""===l.current&&(d("TIED"),n.current=!0)}),1200))}),1200),v.current=!0,setTimeout((()=>{v.current&&(M(!0),N(3))}),3e3),setTimeout((()=>{v.current&&N(2)}),4e3),setTimeout((()=>{v.current&&N(1)}),5e3),setTimeout((()=>{v.current&&N(0)}),6e3),setTimeout((()=>{v.current&&(M(!1),N(3),x.current=!x.current),x.current&&v.current?(U(),x.current=!0,E(!1),V(),n.current=!1,v.current=!1):v.current&&(U(),x.current=!1,n.current=!0,E(!0),V(),g(),v.current=!1)}),7e3),setTimeout((()=>{o.current&&G()}),3200))},D=()=>O()("#buttonStart").addClass("".concat(m.a.shakeAnimation)),X=()=>O()("#buttonStart").removeClass("".concat(m.a.shakeAnimation)),G=()=>O()("#timerBox").addClass("".concat(m.a.changeColor)),W=()=>O()("#timerBox").removeClass("".concat(m.a.changeColor)),P=()=>a.current=!0;Object(r.useEffect)((()=>{D()}),[]);const Y=()=>{z(),w(!0)},U=()=>{P(),F(),Q(),e.current=Array.from({length:9},((e,t)=>({id:t,value:""}))),n.current=!0,R=0,o.current=!1,l.current="",d(""),j(!0),X(),W(),R=0,I.current=Math.floor(9*Math.random()),e.current.forEach((e=>{O()("#".concat(e.id)).css("background","red")}))},L=()=>{v.current=!1,M(!1),P(),F(),Q(),e.current=Array.from({length:9},((e,t)=>({id:t,value:""}))),n.current=!0,s({X:0,O:0}),R=0,o.current=!1,l.current="",d(""),j(!0),X(),W(),R=0,I.current=Math.floor(9*Math.random()),e.current.forEach((e=>{O()("#".concat(e.id)).css("background","red")})),X(),w(!1),S.a.fire({title:"WELCOME TO TIC-TAC-TOE !",text:"Please, select who start first..",showDenyButton:!0,confirmButtonText:"LET ME START !",denyButtonText:"\xa0\xa0\xa0\xa0AI STARTS !\xa0\xa0\xa0",confirmButtonColor:"#800080",denyButtonColor:"#008000"}).then((e=>{e.isConfirmed?(Y(),x.current=!0,E(!1),setTimeout((()=>{V(),n.current=!1}),4300)):e.isDenied?(Y(),x.current=!1,n.current=!0,E(!0),setTimeout((()=>{V(),g()}),4300)):D()}))},H=()=>{a.current=!1,X(),y?S.a.fire({title:"DO YOU WANT TO START A\xa0NEW\xa0GAME\xa0?",text:"All points gonna be lost !..",icon:"info",showDenyButton:!0,confirmButtonText:"START NEW GAME !",denyButtonText:"CONTINUE PLAYING !",confirmButtonColor:"#800080",denyButtonColor:"#008000"}).then((e=>{e.isConfirmed?L():P()})):L()};let K=Object(r.useRef)(0),J=Object(r.useRef)(!0);function V(){J.current&&(J.current=!1,K.current-=Date.now(),q())}function F(){J.current||(J.current=!0,K.current+=Date.now(),q())}function Q(){J.current?(K.current=0,q()):K.current=-Date.now()}function Z(e,t,n,r){return(e=Math.floor(e/t)%n).toString().padStart(r,0)}function q(){var e=J.current?K.current:Date.now()+K.current;let t=document.getElementById("timer_ms");null!==t&&(t.textContent=Z(e,1,1e3,3));let n=document.getElementById("timer_seconds");null!==n&&(n.textContent=Z(e,1e3,60,2));let r=document.getElementById("timer_minutes");null!==r&&(r.textContent=Z(e,6e4,60,2)),J.current||requestAnimationFrame(q)}q();const z=()=>{setTimeout((()=>{S.a.fire({title:"STARTS IN\n3..",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1e3})}),0),setTimeout((()=>{S.a.fire({title:"STARTS IN\n2..",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1e3})}),1e3),setTimeout((()=>{S.a.fire({title:"STARTS IN\n1..",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1e3})}),2e3),setTimeout((()=>{S.a.fire({title:"GO !!!",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1300})}),3e3)};return Object(T.jsxs)("div",{className:"".concat(m.a.background," ").concat(_.a.noSelect),children:[Object(T.jsx)(b.a,{id:"buttonStart",className:m.a.button,variant:"outlined",sx:{color:"white",background:"blue","&:hover":{background:"green"}},onClick:()=>{H()},children:"NEW GAME"}),Object(T.jsxs)("div",{className:m.a.participants,children:[Object(T.jsx)("div",{className:m.a.participant,children:Object(T.jsx)("div",{className:m.a.pointsTitle,children:"Points:"})}),Object(T.jsxs)("div",{className:m.a.participant,children:[Object(T.jsx)("div",{className:m.a.turn,children:p?null:y&&h&&!o.current?"TURN\xa0":null}),Object(T.jsx)("div",{className:m.a.participantName,children:"You:"}),Object(T.jsx)("div",{className:m.a.points,children:Object(T.jsxs)("div",{className:m.a.innerPoints,children:["\xa0",i.X,"\xa0"]})})]}),Object(T.jsxs)("div",{className:m.a.participant,children:[Object(T.jsx)("div",{className:m.a.turn,children:p?"TURN\xa0":!y||h||o.current?null:"TURN\xa0"}),Object(T.jsx)("div",{className:m.a.participantName,children:"AI:"}),Object(T.jsx)("div",{className:m.a.points,children:Object(T.jsxs)("div",{className:m.a.innerPoints,children:["\xa0",i.O,"\xa0"]})})]}),Object(T.jsx)("div",{className:m.a.finalWinner,children:o.current&&"X"===u?"WINNER: YOU !":o.current&&"O"===u?"WINNER: AI !":o.current&&"TIED"===u?"TIED GAME !":null}),Object(T.jsxs)("div",{style:{display:y?"flex":"none"},id:"timerBox",className:m.a.timer,children:[Object(T.jsx)("div",{children:"TIME:\xa0\xa0"}),Object(T.jsx)("div",{id:"timer_minutes",className:m.a.eachTime,children:"00"}),":",Object(T.jsx)("div",{id:"timer_seconds",className:m.a.eachTime,children:"00"}),Object(T.jsx)("div",{className:m.a.smallerMili,children:":"}),Object(T.jsx)("div",{id:"timer_ms",className:"".concat(m.a.smallerMili," ").concat(m.a.eachTimeMini),children:"000"})]})]}),Object(T.jsxs)("div",{className:m.a.rowsAndColumns,children:[e.current.map(((t,r)=>Object(T.jsx)("div",{id:"".concat(r),onClick:e=>{n.current||A({target:r})},className:m.a.eachBox,children:e.current[r].value},r))),Object(T.jsx)("div",{style:{display:f&&v.current?"flex":"none"},className:m.a.nextGameIn,children:0===C?Object(T.jsx)("div",{className:m.a.nextGameInInner,children:"Go !!!"}):Object(T.jsxs)("div",{className:m.a.nextGameInInner,children:[Object(T.jsx)("div",{className:m.a.nextGameText,children:"\xa0Next round in"}),Object(T.jsxs)("div",{className:m.a.nextGameNumber,children:[C,"\xa0"]})]})})]}),Object(T.jsxs)("div",{className:m.a.scoreTable,children:[Object(T.jsxs)("div",{className:m.a.scoreTableTitlesContainer,children:[Object(T.jsx)("div",{className:m.a.scoreTableNumeral,children:"#"}),Object(T.jsx)("div",{className:m.a.scoreTableScore,children:"SCORE"}),Object(T.jsx)("div",{className:m.a.scoreTableYou,children:"YOU"}),Object(T.jsx)("div",{className:m.a.scoreTableAI,children:"AI"}),Object(T.jsx)("div",{className:m.a.scoreTableScore,children:"SCORE"}),Object(T.jsx)("div",{className:m.a.scoreTableTime,children:"TIME"})]}),t.current.map(((e,t)=>Object(T.jsxs)("div",{className:m.a.scoreTableEachScore,children:[Object(T.jsx)("div",{className:m.a.scoreTableNumeral,children:e.id}),Object(T.jsx)("div",{className:m.a.scoreTableScore,children:0===e.scoreX?"\u2796":e.scoreX}),Object(T.jsx)("div",{className:m.a.scoreTableYou,children:e.X}),Object(T.jsx)("div",{className:m.a.scoreTableAI,children:e.O}),Object(T.jsx)("div",{className:m.a.scoreTableScore,children:0===e.scoreO?"\u2796":e.scoreO}),Object(T.jsx)("div",{className:m.a.scoreTableTime,children:e.time})]},t)))]})]})};var C=function(){return Object(T.jsx)("div",{className:o.a.background,children:Object(T.jsx)(l.c,{children:Object(T.jsx)(l.a,{path:"/",element:Object(T.jsx)(T.Fragment,{children:Object(T.jsx)(x,{})})})})})},N=n(24),v=n(14);const f={serverStatus:"asd"};var M=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1?arguments[1]:void 0;return"SET_INDEX_CHOOSEN"===t.type?{...e,indexChoosen:t.payload}:e},p=n(23);const E="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||v.b;var y=Object(v.c)(M,E(Object(v.a)(p.a))),w=n(18);i.a.render(Object(T.jsx)(c.a.StrictMode,{children:Object(T.jsx)(N.a,{store:y,children:Object(T.jsx)(w.a,{basename:"/tictactoe",children:Object(T.jsx)(C,{})})})}),document.getElementById("root"))},5:function(e,t,n){e.exports={background:"MainCSS_background__1Q1tO",nextGameIn:"MainCSS_nextGameIn__3XPK8",nextGameInInner:"MainCSS_nextGameInInner__3Te5s",nextGameText:"MainCSS_nextGameText__2P-X_",nextGameNumber:"MainCSS_nextGameNumber__24lJN",button:"MainCSS_button__2c_QR",noAnimation:"MainCSS_noAnimation__1uiwW",onone:"MainCSS_onone__3mZ_2",shakeAnimation:"MainCSS_shakeAnimation__fG_-C",shake:"MainCSS_shake__SfRao",changeColor:"MainCSS_changeColor__2-mW8",changeCol:"MainCSS_changeCol__24VVs",timer:"MainCSS_timer__3HWC8",eachTime:"MainCSS_eachTime__3bWTB",eachTimeMini:"MainCSS_eachTimeMini__2eU1d",smallerMili:"MainCSS_smallerMili__3jRfz",participants:"MainCSS_participants__2fMaH",participant:"MainCSS_participant__3Hqsa",turn:"MainCSS_turn__3rc7J",blink:"MainCSS_blink__3XQfa",participantName:"MainCSS_participantName__Nj8p0",pointsTitle:"MainCSS_pointsTitle__1Lx4I",points:"MainCSS_points__2hJpt",innerPoints:"MainCSS_innerPoints__21ZiP",finalWinner:"MainCSS_finalWinner__2pYW0",rowsAndColumns:"MainCSS_rowsAndColumns__2GrZo",crossCircle:"MainCSS_crossCircle__1T8V_",cross:"MainCSS_cross__3wO_9",circle:"MainCSS_circle__29slD",eachRow:"MainCSS_eachRow__3aF6L",eachBox:"MainCSS_eachBox__3qaSx",scoreTable:"MainCSS_scoreTable__Nnt7l",scoreTableNumeral:"MainCSS_scoreTableNumeral__2GDSz",scoreTableYou:"MainCSS_scoreTableYou__WDIYu",scoreTableAI:"MainCSS_scoreTableAI__2OXOv",scoreTableScore:"MainCSS_scoreTableScore__HosE9",scoreTableTime:"MainCSS_scoreTableTime__2Q-aB",scoreTableTitlesContainer:"MainCSS_scoreTableTitlesContainer__F80md",scoreTableEachScore:"MainCSS_scoreTableEachScore__3GDxX"}}},[[37,1,2]]]);
//# sourceMappingURL=main.e68bd8d1.chunk.js.map