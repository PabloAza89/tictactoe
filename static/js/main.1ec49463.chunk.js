(this.webpackJsonptictactoe=this.webpackJsonptictactoe||[]).push([[0],{20:function(e,t,n){e.exports={background:"App_background__3CDGK"}},21:function(e,t,n){e.exports={noSelect:"commonsCSS_noSelect__3G6Ou",noDeco:"commonsCSS_noDeco__1atZN"}},31:function(e,t,n){},32:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(11),i=n.n(a),o=(n(31),n(20)),s=n.n(o),l=(n(32),n(3)),u=n(5),d=n.n(u),m=n(21),S=n.n(m),b=n(47),T=n(8),O=n.n(T),h=n(9),_=n.n(h),j=n(2);var v=()=>{let e=Object(r.useRef)(Array.from({length:9},((e,t)=>({id:t,value:""})))),t=Object(r.useRef)([]),n=Object(r.useRef)(!0),c=Object(r.useRef)(!1),a=Object(r.useRef)(!0);const[i,o]=Object(r.useState)({X:0,O:0});let s=Object(r.useRef)(!1),l=Object(r.useRef)(0),u=Object(r.useRef)(!1),m=Object(r.useRef)("");const[T,h]=Object(r.useState)(""),[v,p]=Object(r.useState)(!0);let N=Object(r.useRef)(!0);const[f,C]=Object(r.useState)(3);let x=Object(r.useRef)(!1);const[g,I]=Object(r.useState)(!1),[E,M]=Object(r.useState)(!1),[y,w]=Object(r.useState)(!1);let A=Object(r.useRef)(Math.floor(9*Math.random()));const B=async()=>{setTimeout((()=>{if(e.current.filter((e=>""===e.value)).length>=1){let t=!1;do{A.current=Math.floor(9*Math.random()),""===e.current[A.current].value&&(e.current[A.current].value="O",t=!0,M(!1),p(!0))}while(!1===t)}G().then((()=>{s.current||(n.current=!1)}))}),[700,800,900,1e3,1100][Math.floor(5*Math.random())])},R=async t=>{let{target:r}=t;(async t=>{void 0!==t&&""===e.current[t].value?(console.log("while se ejecuto func de user, valid click"),e.current[t].value="X",p(!1),c.current=!0,n.current=!0):c.current=!1})(r).then((()=>{c.current&&G()})).then((()=>{!s.current&&c.current&&B()}))},D=async e=>{let{array:t,letter:r}=e;X+=100,n.current=!0,s.current=!0,setTimeout((()=>{_()("#".concat(t[0].id)).css("background","yellow")}),300),setTimeout((()=>{_()("#".concat(t[1].id)).css("background","yellow")}),600),setTimeout((()=>{_()("#".concat(t[2].id)).css("background","yellow")}),900),setTimeout((()=>{let e={...i};e[r]=e[r]+X,o(e),m.current="".concat(r),setTimeout((()=>{h("".concat(r))}),300)}),1200)};let X=0;const G=async()=>{let r=[0,3,6,9],c=[0,1,2,3];r.slice(0,-1).forEach(((t,n)=>{let c=e.current.slice(t,r[n+1]);c.every((e=>"X"===e.value))&&D({array:c,letter:"X"}),c.every((e=>"O"===e.value))&&D({array:c,letter:"O"})})),c.slice(0,-1).forEach((t=>{let n=[];c.slice(0,-1).forEach(((r,a)=>{n.push(e.current[t+a*c.slice(-1)[0]])})),n.every((e=>"X"===e.value))&&D({array:n,letter:"X"}),n.every((e=>"O"===e.value))&&D({array:n,letter:"O"})}));let i=[[],[]];[0,2,4].forEach((t=>{i[0].push(e.current[2*t]),i[1].push(e.current[t+2])})),i.forEach((e=>{e.every((e=>"X"===e.value))&&D({array:e,letter:"X"}),e.every((e=>"O"===e.value))&&D({array:e,letter:"O"})})),0!==e.current.filter((e=>""===e.value)).length||s.current||(s.current=!0,setTimeout((()=>{o({X:0,O:0}),m.current="TIED",setTimeout((()=>{h("TIED")}),300)}),1200)),0===e.current.filter((e=>""===e.value)).length&&(s.current=!0),s.current&&(Q(),setTimeout((()=>{let e,n,r,c=document.getElementById("timer_minutes");null!==c&&(e=c.innerHTML);let a=document.getElementById("timer_seconds");null!==a&&(n=a.innerHTML);let i=document.getElementById("timer_ms");null!==i&&(r=i.innerHTML),t.current.push({id:t.current.length,timeX:"X"===m.current||"TIED"===m.current?"".concat(e,":").concat(n,":").concat(r):"00:00:000",scoreX:"X"===m.current?X:0,X:"TIED"===m.current?"\u2796":"X"===m.current?"\u2714\ufe0f":"\u274c",O:"TIED"===m.current?"\u2796":"O"===m.current?"\u2714\ufe0f":"\u274c",scoreO:"O"===m.current?X:0,timeO:"O"===m.current||"TIED"===m.current?"".concat(e,":").concat(n,":").concat(r):"00:00:000"})}),1200),oe(),setTimeout((()=>{a.current&&!u.current&&(O.a.fire({title:"X"===m.current?"YOU WIN !":"O"===m.current?"AI WIN !":"TIED GAME",text:100===X?"+100 Points":200===X?"+200 Points !! Supperrrb !!!":"no winner, no points.",icon:""===m.current?"info":"success",showConfirmButton:!1,showDenyButton:!1,showCancelButton:!1,timer:2e3}),setTimeout((()=>{}),1200))}),1200),u.current||(x.current=!0),setTimeout((()=>{x.current&&(I(!0),C(3))}),3e3),setTimeout((()=>{x.current&&C(2)}),4e3),setTimeout((()=>{x.current&&C(1)}),5e3),setTimeout((()=>{x.current&&C(0)}),6e3),setTimeout((()=>{x.current&&(I(!1),C(3),N.current=!N.current),N.current&&x.current?(V(),N.current=!0,M(!1),F(),n.current=!1,x.current=!1):x.current&&(V(),N.current=!1,n.current=!0,M(!0),F(),B(),x.current=!1)}),7e3),setTimeout((()=>{s.current&&P()}),3200))},k=()=>_()("#buttonStart").addClass("".concat(d.a.shakeAnimation)),W=()=>_()("#buttonStart").removeClass("".concat(d.a.shakeAnimation)),P=()=>_()("#timerBox").addClass("".concat(d.a.changeColor)),U=()=>_()("#timerBox").removeClass("".concat(d.a.changeColor)),Y=()=>a.current=!0;Object(r.useEffect)((()=>{setTimeout((function(){k()}),300)}),[]);const L=()=>{ee(),w(!0)},V=()=>{Y(),Q(),q(),e.current=Array.from({length:9},((e,t)=>({id:t,value:""}))),n.current=!0,X=0,s.current=!1,m.current="",h(""),p(!0),W(),U(),X=0,A.current=Math.floor(9*Math.random()),e.current.forEach((e=>{_()("#".concat(e.id)).css("background","red")}))},H=()=>{x.current=!1,I(!1),t.current=[],Y(),Q(),q(),e.current=Array.from({length:9},((e,t)=>({id:t,value:""}))),n.current=!0,o({X:0,O:0}),X=0,s.current=!1,m.current="",h(""),p(!0),W(),U(),X=0,A.current=Math.floor(9*Math.random()),e.current.forEach((e=>{_()("#".concat(e.id)).css("background","red")})),W(),w(!1),O.a.fire({title:"WELCOME TO TIC-TAC-TOE !",text:"Please, select who start first..",showDenyButton:!0,confirmButtonText:"LET ME START !",denyButtonText:"\xa0\xa0\xa0\xa0AI STARTS !\xa0\xa0\xa0",confirmButtonColor:"#800080",denyButtonColor:"#008000"}).then((e=>{console.log("123123 result",e),e.isConfirmed?O.a.fire({title:"Select number of rounds:",input:"select",inputValue:null!==se?parseInt(se,10)+1:"3",inputOptions:{1:"1",2:"2",3:"3",4:"4",5:"5",10:"10",15:"15",20:"20"},confirmButtonText:"GO !",confirmButtonColor:"#2e8b57",showCancelButton:!1,inputValidator:e=>{console.log("123123 value",e),l.current=parseInt(e,10)-1,localStorage.setItem("roundsValue",JSON.stringify(parseInt(e,10)-1))}}).then((e=>{e.isConfirmed?(L(),N.current=!0,M(!1),setTimeout((()=>{F(),n.current=!1,x.current=!0}),4300)):(console.log("123123 rejected"),setTimeout((function(){k()}),300))})):e.isDenied?O.a.fire({title:"Select number of rounds:",input:"select",inputValue:null!==se?parseInt(se,10)+1:"3",inputOptions:{1:"1",2:"2",3:"3",4:"4",5:"5",10:"10",15:"15",20:"20"},confirmButtonText:"GO !",confirmButtonColor:"#2e8b57",showCancelButton:!1,inputValidator:e=>{l.current=parseInt(e,10)-1,localStorage.setItem("roundsValue",JSON.stringify(parseInt(e,10)-1))}}).then((e=>{e.isConfirmed?(L(),N.current=!1,n.current=!0,M(!0),setTimeout((()=>{F(),B(),x.current=!0}),4300)):(console.log("123123 rejected"),setTimeout((function(){k()}),300))})):setTimeout((function(){k()}),300)}))},J=()=>{a.current=!1,W(),y?O.a.fire({title:"DO YOU WANT TO START A\xa0NEW\xa0GAME\xa0?",text:"All points gonna be lost !..",icon:"info",showDenyButton:!0,confirmButtonText:"START NEW GAME !",denyButtonText:"CONTINUE PLAYING !",confirmButtonColor:"#800080",denyButtonColor:"#008000"}).then((e=>{e.isConfirmed?H():Y()})):H()};let K=Object(r.useRef)(0),Z=Object(r.useRef)(!0);function F(){Z.current&&(Z.current=!1,K.current-=Date.now(),$())}function Q(){Z.current||(Z.current=!0,K.current+=Date.now(),$())}function q(){Z.current?(K.current=0,$()):K.current=-Date.now()}function z(e,t,n,r){return(e=Math.floor(e/t)%n).toString().padStart(r,0)}function $(){var e=Z.current?K.current:Date.now()+K.current;let t=document.getElementById("timer_ms");null!==t&&(t.textContent=z(e,1,1e3,3));let n=document.getElementById("timer_seconds");null!==n&&(n.textContent=z(e,1e3,60,2));let r=document.getElementById("timer_minutes");null!==r&&(r.textContent=z(e,6e4,60,2)),Z.current||requestAnimationFrame($)}$();const ee=()=>{setTimeout((()=>{O.a.fire({title:"STARTS IN\n3..",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1e3})}),0),setTimeout((()=>{O.a.fire({title:"STARTS IN\n2..",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1e3})}),1e3),setTimeout((()=>{O.a.fire({title:"STARTS IN\n1..",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1e3})}),2e3),setTimeout((()=>{O.a.fire({title:"GO !!!",showConfirmButton:!1,showDenyButton:!1,allowOutsideClick:!1,allowEscapeKey:!1,timer:1300})}),3e3)};let te=Object(r.useRef)(0),ne=Object(r.useRef)(0),re=Object(r.useRef)(0),ce=Object(r.useRef)(0),ae=Object(r.useRef)(0),ie=Object(r.useRef)(0);(()=>{let e=t.current.reduce(((e,t)=>e+parseInt(t.timeX.split(":")[0],10)),0),n=t.current.reduce(((e,t)=>e+parseInt(t.timeX.split(":")[1],10)),0),r=t.current.reduce(((e,t)=>e+parseInt(t.timeX.split(":")[2],10)),0),c=t.current.reduce(((e,t)=>e+parseInt(t.timeO.split(":")[0],10)),0),a=t.current.reduce(((e,t)=>e+parseInt(t.timeO.split(":")[1],10)),0),i=t.current.reduce(((e,t)=>e+parseInt(t.timeO.split(":")[2],10)),0),o=0,s=0;if(r.toString().length>3?(re.current=r.toString().slice(-3),o=parseInt(r.toString().slice(0,-3),10)):re.current=parseInt(r.toString(),10),n>59){s=Math.floor(n/60);let e=n-60*s;ne.current=e+o}else ne.current=n+o;let l=0,u=0;if(i.toString().length>3?(ie.current=i.toString().slice(-3),l=parseInt(i.toString().slice(0,-3),10)):ie.current=parseInt(i.toString(),10),a>59){u=Math.floor(a/60);let e=a-60*u;ae.current=e+l}else ae.current=a+l;te.current=s+e,ce.current=u+c})();const oe=()=>{console.log("score.current.length",t.current),l.current===t.current.length&&(u.current=!0,x.current=!1,setTimeout((()=>{}),1300),setTimeout((()=>{console.log("123123",te.current.toString().concat(ne.current.toString(),re.current.toString()));let e=t.current.reduce(((e,t)=>e+t.scoreX),0),n=t.current.reduce(((e,t)=>e+t.scoreO),0),r=parseInt(te.current.toString().concat(ne.current.toString(),re.current.toString()),10),c=parseInt(ce.current.toString().concat(ae.current.toString(),ie.current.toString()),10),a=e===n&&r===c?"TIED":e===n&&r>c?"OByTime":e===n&&r<c?"XByTime":e>n?"X":"O";O.a.fire({title:"XByTime"===a||"X"===a?"GAME END !\nYOU WIN !":"OByTime"===a||"O"===a?"GAME END !\nAI WIN !":t.current.some((e=>"\u2714\ufe0f"===e.X||"\u2714\ufe0f"===e.O))?"GAME END !\nTIED, INCREDIBLE !!":"GAME END !\nTIED !",html:"XByTime"===a?"<div>\n                <div>You have tied in points, but you won by time !</div>\n                <div>Points: ".concat(e,"</div>\n                <div>Time: ").concat(te.current.toString().padStart(2,"0"),":").concat(ne.current.toString().padStart(2,"0"),":").concat(re.current.toString().padStart(3,"0"),"</div>\n              </div>"):"OByTime"===a?"<div>\n                <div>You have tied in points, but AI won by time !</div>\n                <div>Points: ".concat(n,"</div>\n                <div>Time: ").concat(ce.current.toString().padStart(2,"0"),":").concat(ae.current.toString().padStart(2,"0"),":").concat(ie.current.toString().padStart(3,"0"),"</div>\n              </div>"):"X"===a?"<div>\n                <div>You have won by points !</div>\n                <div>Points: ".concat(e,"</div>\n                <div>Time: ").concat(te.current.toString().padStart(2,"0"),":").concat(ne.current.toString().padStart(2,"0"),":").concat(re.current.toString().padStart(3,"0"),"</div>\n              </div>"):"O"===a?"<div>\n                <div>AI have won by points !</div>\n                <div>Points: ".concat(n,"</div>\n                <div>Time: ").concat(ce.current.toString().padStart(2,"0"),":").concat(ae.current.toString().padStart(2,"0"),":").concat(ie.current.toString().padStart(3,"0"),"</div>\n              </div>"):t.current.some((e=>"\u2714\ufe0f"===e.X||"\u2714\ufe0f"===e.O))?"<div>\n                <div>The game is tied, this is really incredible !!</div>\n                <div>Tied by points & time !!!</div>\n                <div>Points: ".concat(e,"</div>\n                <div>Time: ").concat(te.current.toString().padStart(2,"0"),":").concat(ne.current.toString().padStart(2,"0"),":").concat(re.current.toString().padStart(3,"0"),"</div>\n              </div>"):"<div>\n                <div>The game is tied !</div>\n                <div>Tied by points & time !</div>\n                <div>Points: ".concat(e,"</div>\n                <div>Time: ").concat(te.current.toString().padStart(2,"0"),":").concat(ne.current.toString().padStart(2,"0"),":").concat(re.current.toString().padStart(3,"0"),"</div>\n              </div>"),icon:"success",showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1})}),1700))};console.log("123 score.current",t.current),console.log("123 rC",e),console.log("123 winnerRound.current",m.current);let se=localStorage.getItem("roundsValue");return null!==se&&(l.current=parseInt(se,10)),Object(j.jsxs)("div",{className:"".concat(d.a.background," ").concat(S.a.noSelect),children:[Object(j.jsx)(b.a,{focusRipple:!1,id:"buttonStart",className:d.a.button,variant:"outlined",sx:{color:"white",background:"blue","&:hover":{background:"green"}},onClick:()=>{J()},children:"NEW GAME"}),Object(j.jsxs)("div",{className:d.a.participants,children:[Object(j.jsx)("div",{className:d.a.participant,children:Object(j.jsx)("div",{className:d.a.pointsTitle,children:"Points:"})}),Object(j.jsxs)("div",{className:d.a.participant,children:[Object(j.jsx)("div",{className:d.a.turn,children:E?null:y&&v&&!s.current?"TURN\xa0":null}),Object(j.jsx)("div",{className:d.a.participantName,children:"You:"}),Object(j.jsx)("div",{className:d.a.points,children:Object(j.jsxs)("div",{className:d.a.innerPoints,children:["\xa0",i.X,"\xa0"]})})]}),Object(j.jsxs)("div",{className:d.a.participant,children:[Object(j.jsx)("div",{className:d.a.turn,children:E?"TURN\xa0":!y||v||s.current?null:"TURN\xa0"}),Object(j.jsx)("div",{className:d.a.participantName,children:"AI:"}),Object(j.jsx)("div",{className:d.a.points,children:Object(j.jsxs)("div",{className:d.a.innerPoints,children:["\xa0",i.O,"\xa0"]})})]}),Object(j.jsx)("div",{className:d.a.finalWinner,children:u.current&&s.current&&"X"===T?"GAME WINNER: YOU !":u.current&&s.current&&"O"===T?"GAME WINNER: AI !":u.current&&s.current&&"TIED"===T?"GAME WINNER: TIED !":s.current&&"X"===T?"ROUND WINNER: YOU !":s.current&&"O"===T?"ROUND WINNER: AI !":s.current&&"TIED"===T?"ROUND WINNER: TIED !":null}),Object(j.jsxs)("div",{className:d.a.rounds,children:["Rounds:\xa0",l.current+1]}),Object(j.jsxs)("div",{style:{display:y?"flex":"none"},id:"timerBox",className:d.a.timer,children:[Object(j.jsx)("div",{children:"TIME:\xa0\xa0"}),Object(j.jsx)("div",{id:"timer_minutes",className:d.a.eachTime,children:"00"}),":",Object(j.jsx)("div",{id:"timer_seconds",className:d.a.eachTime,children:"00"}),Object(j.jsx)("div",{className:d.a.smallerMili,children:":"}),Object(j.jsx)("div",{id:"timer_ms",className:"".concat(d.a.smallerMili," ").concat(d.a.eachTimeMini),children:"000"})]})]}),Object(j.jsxs)("div",{className:d.a.rowsAndColumns,children:[e.current.map(((t,r)=>Object(j.jsx)("div",{id:"".concat(r),onClick:e=>{n.current||R({target:r})},className:d.a.eachBox,children:e.current[r].value},r))),Object(j.jsx)("div",{style:{display:g&&x.current?"flex":"none"},className:d.a.nextGameIn,children:0===f?Object(j.jsx)("div",{className:d.a.nextGameInInner,children:"Go !!!"}):Object(j.jsxs)("div",{className:d.a.nextGameInInner,children:[Object(j.jsx)("div",{className:d.a.nextGameText,children:"\xa0Next round in"}),Object(j.jsxs)("div",{className:d.a.nextGameNumber,children:[f,"\xa0"]})]})})]}),Object(j.jsxs)("div",{className:d.a.scoreTable,children:[Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{className:d.a.scoreTableTitlesContainer,children:[Object(j.jsx)("div",{className:d.a.scoreTableNumeral,children:"#"}),Object(j.jsx)("div",{className:d.a.scoreTableTime,children:"TIME"}),Object(j.jsx)("div",{className:d.a.scoreTableScore,children:"SCORE"}),Object(j.jsx)("div",{className:d.a.scoreTableYou,children:"YOU"}),Object(j.jsx)("div",{className:d.a.scoreTableAI,children:"AI"}),Object(j.jsx)("div",{className:d.a.scoreTableScore,children:"SCORE"}),Object(j.jsx)("div",{className:d.a.scoreTableTime,children:"TIME"})]}),t.current.map(((e,t)=>Object(j.jsxs)("div",{className:d.a.scoreTableEachScore,children:[Object(j.jsx)("div",{className:d.a.scoreTableNumeral,children:e.id+1}),Object(j.jsx)("div",{className:d.a.scoreTableTime,children:"00:00:000"===e.timeX?"\u2796":e.timeX}),Object(j.jsx)("div",{className:d.a.scoreTableScore,children:0===e.scoreX?"\u2796":e.scoreX}),Object(j.jsx)("div",{className:d.a.scoreTableYou,children:e.X}),Object(j.jsx)("div",{className:d.a.scoreTableAI,children:e.O}),Object(j.jsx)("div",{className:d.a.scoreTableScore,children:0===e.scoreO?"\u2796":e.scoreO}),Object(j.jsx)("div",{className:d.a.scoreTableTime,children:"00:00:000"===e.timeO?"\u2796":e.timeO})]},t)))]}),Object(j.jsxs)("div",{className:d.a.scoreTableTitlesContainerLower,children:[Object(j.jsx)("div",{className:d.a.scoreTableNumeral,children:"#"}),Object(j.jsx)("div",{className:d.a.scoreTableTime,children:"".concat(te.current.toString().padStart(2,"0"),":").concat(ne.current.toString().padStart(2,"0"),":").concat(re.current.toString().padStart(3,"0"))}),Object(j.jsx)("div",{className:d.a.scoreTableScore,children:t.current.reduce(((e,t)=>e+t.scoreX),0)}),Object(j.jsx)("div",{className:d.a.scoreTableTotal,children:"TOTAL"}),Object(j.jsx)("div",{className:d.a.scoreTableScore,children:t.current.reduce(((e,t)=>e+t.scoreO),0)}),Object(j.jsx)("div",{className:d.a.scoreTableTime,children:"".concat(ce.current.toString().padStart(2,"0"),":").concat(ae.current.toString().padStart(2,"0"),":").concat(ie.current.toString().padStart(3,"0"))})]})]})]})};var p=function(){return Object(j.jsx)("div",{className:s.a.background,children:Object(j.jsx)(l.c,{children:Object(j.jsx)(l.a,{path:"/",element:Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(v,{})})})})})},N=n(24),f=n(14);const C={serverStatus:"asd"};var x=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;return"SET_INDEX_CHOOSEN"===t.type?{...e,indexChoosen:t.payload}:e},g=n(23);const I="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||f.b;var E=Object(f.c)(x,I(Object(f.a)(g.a))),M=n(18);i.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(N.a,{store:E,children:Object(j.jsx)(M.a,{basename:"/tictactoe",children:Object(j.jsx)(p,{})})})}),document.getElementById("root"))},5:function(e,t,n){e.exports={background:"MainCSS_background__1Q1tO",nextGameIn:"MainCSS_nextGameIn__3XPK8",nextGameInInner:"MainCSS_nextGameInInner__3Te5s",nextGameText:"MainCSS_nextGameText__2P-X_",nextGameNumber:"MainCSS_nextGameNumber__24lJN",button:"MainCSS_button__2c_QR",noAnimation:"MainCSS_noAnimation__1uiwW",onone:"MainCSS_onone__3mZ_2",shakeAnimation:"MainCSS_shakeAnimation__fG_-C",shake:"MainCSS_shake__SfRao",changeColor:"MainCSS_changeColor__2-mW8",changeCol:"MainCSS_changeCol__24VVs",rounds:"MainCSS_rounds__zsEAb",timer:"MainCSS_timer__3HWC8",eachTime:"MainCSS_eachTime__3bWTB",eachTimeMini:"MainCSS_eachTimeMini__2eU1d",smallerMili:"MainCSS_smallerMili__3jRfz",participants:"MainCSS_participants__2fMaH",participant:"MainCSS_participant__3Hqsa",turn:"MainCSS_turn__3rc7J",blink:"MainCSS_blink__3XQfa",participantName:"MainCSS_participantName__Nj8p0",pointsTitle:"MainCSS_pointsTitle__1Lx4I",points:"MainCSS_points__2hJpt",innerPoints:"MainCSS_innerPoints__21ZiP",finalWinner:"MainCSS_finalWinner__2pYW0",rowsAndColumns:"MainCSS_rowsAndColumns__2GrZo",crossCircle:"MainCSS_crossCircle__1T8V_",cross:"MainCSS_cross__3wO_9",circle:"MainCSS_circle__29slD",eachRow:"MainCSS_eachRow__3aF6L",eachBox:"MainCSS_eachBox__3qaSx",scoreTable:"MainCSS_scoreTable__Nnt7l",scoreTableNumeral:"MainCSS_scoreTableNumeral__2GDSz",scoreTableTotal:"MainCSS_scoreTableTotal__3uZCL",scoreTableYou:"MainCSS_scoreTableYou__WDIYu",scoreTableAI:"MainCSS_scoreTableAI__2OXOv",scoreTableScore:"MainCSS_scoreTableScore__HosE9",scoreTableTime:"MainCSS_scoreTableTime__2Q-aB",scoreTableTitlesContainer:"MainCSS_scoreTableTitlesContainer__F80md",scoreTableTitlesContainerLower:"MainCSS_scoreTableTitlesContainerLower__1gMUs",scoreTableEachScore:"MainCSS_scoreTableEachScore__3GDxX"}}},[[37,1,2]]]);
//# sourceMappingURL=main.1ec49463.chunk.js.map