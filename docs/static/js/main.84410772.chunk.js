(this["webpackJsonpquixx-score-card"]=this["webpackJsonpquixx-score-card"]||[]).push([[0],{80:function(e,t,n){e.exports=n(95)},85:function(e,t,n){},95:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(9),i=n.n(o),l=n(137),c=n(136),s=(n(85),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function g(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var d=n(71),u=n(14),m=n(30),h=n(60),p=n(61),b=n(72),f=n(70),k=n(47),w=n.n(k),v=n(121),S=n(138),y=n(123),C=n(124),E=n(125),x=n(126),O=n(139),N=n(127),R=n(122),j=n(128),D=n(129),A=n(130),I=n(131),W=n(132),B=n(133),L=n(134),G=n(97),T=n(4),z=n(68),H=n.n(z),J=n(67),U=n.n(J),Q=n(99);function F(e){var t=e.score,n=e.onClick,a=e.revealScore,o=e.color,i=e.reverse,l=void 0!==i&&i,c=e.row,s=e.showScore,g=Object(m.a)(c,2),d=g[0],h=g[1],p=function(e){return Object(Q.a)((function(t){var n=t.palette,a=n.blue,r=n.green,o=n.red,i=n.yellow;return{marks:{backgroundColor:t.palette[e].main,padding:t.spacing(),paddingLeft:"env(safe-area-inset-left)"},number:{cursor:"pointer",borderRadius:t.spacing(),marginLeft:t.spacing(),padding:t.spacing()},numberContent:{textAlign:"center",width:"100%"},liveNumber:{backgroundColor:t.palette[e].light,color:t.palette[e].main},disabledNumber:{backgroundColor:"transparent",color:"black"},disabledNumberContent:{textDecoration:"line-through"},x:{fontWeight:"bold",color:"black"},square:{borderRadius:t.spacing()},circle:Object(u.a)({borderRadius:t.spacing(20)},t.breakpoints.down("sm"),{padding:t.spacing()}),openLock:{fontSize:t.typography.fontSize,marginBottom:-4,transform:"rotate(45deg)"},lock:{fontSize:t.typography.fontSize,marginBottom:-4},scoreContent:{paddingRight:t.spacing(2)},block:{backgroundColor:"white",cursor:"pointer",padding:t.spacing(2),textAlign:"center"},blockRed:{borderColor:o.main,backgroundColor:o.light,color:o.light,paddingRight:"env(safe-area-inset-right)"},blockYellow:{borderColor:i.main,backgroundColor:i.light,color:i.light,paddingRight:"env(safe-area-inset-right)"},blockGreen:{borderColor:r.main,backgroundColor:r.light,color:r.light,paddingRight:"env(safe-area-inset-right)"},blockBlue:{borderColor:a.main,backgroundColor:a.light,color:a.light,paddingRight:"env(safe-area-inset-right)"},blackText:{color:"black"}}}))}(o)(),b=d.filter((function(e){return e})).length<5,f=o.charAt(0).toUpperCase()+o.slice(1);return r.a.createElement(v.a,{container:!0,direction:"row",justifyContent:"center",alignItems:"center"},r.a.createElement(v.a,{item:!0,xs:!0,key:"0",className:p.marks},r.a.createElement(v.a,{container:!0,direction:"row",justifyContent:"center",alignItems:"center"},d.map((function(e,t){var a=t+1===d.length;return t<10?r.a.createElement(v.a,{item:!0,xs:!0,key:o+t,className:Object(T.a)(p.number,p.square,h[t]&&!e?p.disabledNumber:p.liveNumber),onClick:function(){return n(o,t)}},r.a.createElement("div",{className:Object(T.a)(p.numberContent,h[t]&&!e&&p.disabledNumberContent)},e?r.a.createElement("span",{className:p.x},"X"):l?d.length-t:t+2)):r.a.createElement(v.a,{item:!0,xs:!0,key:o+t,className:Object(T.a)(p.number,p.square,h[t]&&!e?p.disabledNumber:p.liveNumber),onClick:function(){return n(o,t,a)}},r.a.createElement("div",{className:Object(T.a)(p.numberContent,!b&&h[t]&&!e&&p.disabledNumberContent)},e?a?r.a.createElement(U.a,{className:p.lock}):r.a.createElement("span",{className:p.x},"X"):a?r.a.createElement(H.a,{className:p.openLock}):l?d.length-t:t+2))})))),r.a.createElement(v.a,{item:!0,xs:1,key:"1",className:Object(T.a)(p.block,p["block".concat(f)],s&&p.blackText),onClick:function(){return a("show".concat(f))}},r.a.createElement("div",{className:p.scoreContent},t)))}var X=n(31),q=n(33),Y=Object(Q.a)((function(e){var t=e.palette,n=t.grey,a=t.blue,r=t.green,o=t.red,i=t.yellow;return{scoreContainer:{marginRight:e.spacing(2)},score:{backgroundColor:"white",border:"2px solid ".concat(e.palette.grey.main),borderRadius:e.spacing(),paddingLeft:e.spacing()/2,paddingRight:e.spacing()/2,fontSize:18},scoreTop:{borderBottom:"1px solid ".concat(e.palette.grey.main),textAlign:"center",padding:e.spacing(.75)},scoreBottom:{padding:e.spacing()/2,textAlign:"center"},stop:{color:"white",marginRight:e.spacing(2)},reset:{color:"white",marginRight:e.spacing(2)},history:{color:"white",marginRight:e.spacing(2)},minusIcon:{color:"white",marginLeft:e.spacing(30)},moves:{backgroundColor:"white",border:"1px solid ".concat(e.palette.grey.main),borderRadius:e.spacing()/2,cursor:"pointer",fontWeight:"bold",padding:"5px ".concat(e.spacing(1.9),"px")},movesEmpty:{visibility:"hidden"},movesRed:{backgroundColor:o.light},movesYellow:{backgroundColor:i.light},movesGreen:{backgroundColor:r.light},movesBlue:{backgroundColor:a.light},strike:{backgroundColor:"white",border:"1px solid ".concat(e.palette.grey.main),borderRadius:e.spacing()/2,cursor:"pointer",fontWeight:"bold",padding:"5px ".concat(e.spacing(1.9),"px")},strikeEmpty:{color:"White"},strikesContainer:{width:"100%"},strikesLabel:{fontSize:18,textAlign:"center"},strikesLabelX:{fontWeight:"bold",color:"red"},block:{backgroundColor:"white",border:"2px solid ".concat(n.dark),borderRadius:e.spacing(2),marginLeft:e.spacing(2),cursor:"pointer",flexGrow:1,flexShrink:0,padding:e.spacing(1),textAlign:"center",width:64},blockWhite:{color:"white"},blackText:{color:"black"},strikesScore:{marginRight:e.spacing(3)},totalScore:{marginRight:e.spacing(1.5)}}}));var M=function(e){var t=e.onClick,n=e.onClickUndo,a=e.onReset,o=e.onEndGame,i=e.onHistory,l=e.moves,c=e.strikes,s=e.showStrikes,g=e.showFinal,d=e.revealScore,u=e.strikesScore,m=e.totalScore,h=Y(),p=[2,3,4,5,6,7,8,9,10,11,12];return r.a.createElement(v.a,{container:!0,justify:"space-between",alignItems:"center",wrap:"nowrap",className:h.row},r.a.createElement(v.a,{item:!0,className:h.strikesContainer},r.a.createElement(v.a,{container:!0,spacing:1,justify:"space-around",alignItems:"center",wrap:"nowrap"},r.a.createElement(X.a,{icon:q.a,className:h.stop,onClick:o}),r.a.createElement(X.a,{icon:q.c,className:h.reset,onClick:a}),r.a.createElement(X.a,{icon:q.d,className:h.history,onClick:i}),r.a.createElement("div",{onClick:n,className:Object(T.a)(h.moves,0===l.length?h.movesEmpty:h["moves".concat(l[0][0][0].toUpperCase()+l[0][0].slice(1))])},l.length>0?(["red","yellow"].includes(l[0][0])?p:p.toReversed())[l[0][1]]:null),r.a.createElement(X.a,{icon:q.b,className:h.minusIcon}),c.map((function(e,n){return r.a.createElement(v.a,{item:!0,key:n,onClick:function(){return t(n)}},r.a.createElement("div",{className:Object(T.a)(h.strike,e?null:h.strikeEmpty)},"X"))})),r.a.createElement(v.a,{item:!0,className:Object(T.a)(h.block,h.blockWhite,h.strikesScore,s&&h.blackText),onClick:function(){return d("showStrikes")}},u),r.a.createElement(v.a,{item:!0,className:Object(T.a)(h.block,h.blockWhite,h.totalScore,g&&h.blackText),onClick:function(){return d("showFinal")}},m))))},V=[0,1,3,6,10,15,21,28,36,45,55,66,78],P={red:2,yellow:3,green:4,blue:5},$={moves:[],blue:[new Array(12).fill(!1),[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!0,!1]],blueScore:0,disabledDice:new Array(6).fill(!1),endGameDialogOpen:!1,historyDialogOpen:!1,green:[new Array(12).fill(!1),[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!0,!1]],greenScore:0,red:[new Array(12).fill(!1),[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!0,!1]],redScore:0,showBlue:!0,showFinal:!0,showGreen:!0,showRed:!0,showStrikes:!0,showYellow:!0,strikes:new Array(4).fill(!1),strikesScore:0,yellow:[new Array(12).fill(!1),[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!0,!1]],yellowScore:0},K=function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(h.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state=w()($),e.handleClick=function(t,n,a){var r,o=e.state,i=o.disabledDice,l=o.moves,c=Object(m.a)(e.state[t],2),s=c[0],g=c[1];if(!g[n]){a||(l.length>0&&l[0][0]===t&&l[0][1]===n?l.shift():l.unshift([t,n])),a&&(!s[n]&&!i[P[t]]||s[n]&&i[P[t]])&&e.toggleDisabled(t),s[n]=!s[n];var d=s.filter((function(e){return e})).length-(s[11]&&!s[10]?1:0),h=V[d];g=g.map((function(e,t){return t===s.length-2&&d<5||t<s.lastIndexOf(!0)})),e.setState((r={moves:l},Object(u.a)(r,t,[s,g]),Object(u.a)(r,"".concat(t,"Score"),h),r))}},e.handleClickUndo=function(){var t=e.state.moves;e.handleClick(t[0][0],t[0][1],!1)},e.handleClickStrikes=function(t){var n=e.state.strikes;n[t]=!n[t];var a=5*n.filter((function(e){return e})).length;e.setState({strikes:n,strikesScore:a})},e.handleReset=function(t,n){(n||window.confirm("Are you sure you want to reset the card?"))&&e.setState(w()($))},e.handleDelete=function(t,n){if(window.confirm("Are you sure you want to delete the record?")){var a=JSON.parse(localStorage.getItem("QuixxHistory"));a.splice(n,1),localStorage.setItem("QuixxHistory",JSON.stringify(a)),e.setState({historyDialogOpen:!0})}},e.handleView=function(e,t){window.alert("Stay tuned for this feature!")},e.toggleDisabled=function(t){var n=e.state.disabledDice,a=Object(m.a)(e.state[t],2),r=a[0],o=a[1],i=P[t];if(n[i]=!n[i],n[i])o=o.map((function(){return!0})),r[r.length-1]&&(o[o.length-1]=!1);else{var l=r.filter((function(e){return e})).length;o=o.map((function(e,t){return t>=r.length-2&&l<5||t<r.lastIndexOf(!0)}))}e.setState(Object(u.a)({disabledDice:n},t,[r,o]))},e}return Object(p.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=localStorage.getItem("QwixxState");t&&(t=JSON.parse(t),localStorage.removeItem("QwixxState"),this.setState(t)),window.addEventListener("pagehide",(function(){console.log("saving state"),localStorage.setItem("QwixxState",JSON.stringify(e.state))}))}},{key:"render",value:function(){var e=this,t=this.props.classes,n=this.state,a=n.red,o=n.yellow,i=n.green,l=n.blue,c=n.blueScore,s=void 0===c?0:c,g=n.greenScore,m=void 0===g?0:g,h=n.redScore,p=void 0===h?0:h,b=n.showBlue,f=n.showGreen,k=n.showRed,G=n.showYellow,T=n.showFinal,z=n.showStrikes,H=n.moves,J=n.strikes,U=n.strikesScore,Q=void 0===U?0:U,X=n.yellowScore,q=void 0===X?0:X,Y=n.endGameDialogOpen,V=n.historyDialogOpen,P=JSON.parse(localStorage.getItem("QuixxHistory")||"[]"),$=P.map((function(e){return e.score})),K=Math.round($.reduce((function(e,t){return e+t}),0)/$.length),Z=Math.max.apply(Math,Object(d.a)($)),_=100*P.map((function(e){return e.won})).reduce((function(e,t){return e+t}),0)/P.length,ee=function(){return p+q+m+s-Q},te=function(t,n){e.setState({endGameDialogOpen:!1});var a=JSON.parse(localStorage.getItem("QuixxHistory")||"[]");a.push({date:(new Date).toISOString(),score:ee(),won:n,state:w()(e.state)}),localStorage.setItem("QuixxHistory",JSON.stringify(a)),e.handleReset(t,!0)};return r.a.createElement(v.a,{className:t.game,container:!0,direction:"column",justifyContent:"center",alignItems:"center"},r.a.createElement(F,{onClick:this.handleClick,showScore:k,score:p,color:"red",row:a,revealScore:function(t){return e.setState(Object(u.a)({},t,!e.state[t]))}}),r.a.createElement(F,{onClick:this.handleClick,showScore:G,score:q,color:"yellow",row:o,revealScore:function(t){return e.setState(Object(u.a)({},t,!e.state[t]))}}),r.a.createElement(F,{onClick:this.handleClick,showScore:f,score:m,color:"green",reverse:!0,row:i,revealScore:function(t){return e.setState(Object(u.a)({},t,!e.state[t]))}}),r.a.createElement(F,{onClick:this.handleClick,showScore:b,score:s,color:"blue",reverse:!0,row:l,revealScore:function(t){return e.setState(Object(u.a)({},t,!e.state[t]))}}),r.a.createElement(M,{moves:H,strikes:J,onClickUndo:this.handleClickUndo,onEndGame:function(){e.setState({endGameDialogOpen:!0})},onReset:this.handleReset,onHistory:function(){return e.setState({historyDialogOpen:!0})},onClick:function(t){return e.handleClickStrikes(t)},showFinal:T,showStrikes:z,totalScore:ee(),strikesScore:-Q,revealScore:function(t){return e.setState(Object(u.a)({},t,!e.state[t]))}}),r.a.createElement(S.a,{fullScreen:!0,open:Y,onClose:function(){return e.setState({endGameDialogOpen:!1})},"aria-labelledby":"responsive-dialog-title"},r.a.createElement(y.a,{id:"responsive-dialog-title"},"Game Over"),r.a.createElement(C.a,null,r.a.createElement(E.a,null,"Did you win?")),r.a.createElement(x.a,null,r.a.createElement(O.a,{onClick:function(){return e.setState({endGameDialogOpen:!1})},color:"primary"},"Close"),r.a.createElement(O.a,{onClick:function(e){return te(e,!1)},color:"primary"},"No"),r.a.createElement(O.a,{onClick:function(e){return te(e,!0)},color:"primary",autoFocus:!0},"Yes!"))),r.a.createElement(S.a,{fullScreen:!0,open:V,onClose:function(){return e.setState({historyDialogOpen:!1})},"aria-labelledby":"responsive-dialog-title"},r.a.createElement(y.a,{id:"responsive-dialog-title"},"History (Avg: ",K," | High: ",Z," | %Win: ",_,")"),r.a.createElement(C.a,null,r.a.createElement(E.a,null,r.a.createElement(N.a,{component:R.a},r.a.createElement(j.a,{className:t.table,"aria-label":"simple table"},r.a.createElement(D.a,null,r.a.createElement(A.a,null,r.a.createElement(I.a,null,"Date"),r.a.createElement(I.a,{align:"right"},"Score"),r.a.createElement(I.a,{align:"right"},"Win?"),r.a.createElement(I.a,{align:"right"},"View"),r.a.createElement(I.a,{align:"right"},"Delete"))),r.a.createElement(W.a,null,P.map((function(t,n){return r.a.createElement(A.a,{key:n},r.a.createElement(I.a,{component:"th",scope:"row"},new Date(t.date).toLocaleDateString()," ",new Date(t.date).toLocaleTimeString()),r.a.createElement(I.a,{align:"right"},t.score),r.a.createElement(I.a,{align:"right"},t.won?"X":""),r.a.createElement(I.a,{align:"right"},r.a.createElement(B.a,{onClick:function(t){return e.handleView(t,n)}})),r.a.createElement(I.a,{align:"right"},r.a.createElement(L.a,{onClick:function(t){return e.handleDelete(t,n)}})))}))))))),r.a.createElement(x.a,null,r.a.createElement(O.a,{autoFocus:!0,onClick:function(){return e.setState({historyDialogOpen:!1})},color:"primary"},"Close"))))}}]),n}(a.Component),Z=Object(G.a)((function(e){return{cardSubTitle:{color:e.palette.grey.main,display:"inline-block",fontWeight:"bold",flexGrow:1},disclaimer:{textAlign:"center",margin:"".concat(e.spacing(2)," auto"),fontSize:14},fiveXTop:{border:"1px solid",borderBottom:0,borderTopLeftRadius:e.spacing(2),borderTopRightRadius:e.spacing(2),display:"inline-block",float:"right",fontSize:14,marginRight:e.spacing(.75),textAlign:"center",width:130},fiveXBottom:{border:"1px solid",borderBottomLeftRadius:e.spacing(4),borderBottomRightRadius:e.spacing(4),borderTop:0,display:"inline-block",float:"right",height:e.spacing(),marginBottom:e.spacing(),marginRight:e.spacing(.75),marginTop:-e.spacing(2),width:130},game:{backgroundColor:"#282c34",height:"100%",paddingBottom:"env(safe-area-inset-bottom)"}}}))(r.a.memo(K)),_=n(69),ee=n(48),te=n(50),ne=n(51),ae=n(49),re=n(135),oe=Object(_.a)({typography:{fontSize:28},palette:{grey:{light:ee.a[200],main:ee.a[500],dark:ee.a[700],darker:ee.a[900]},blue:{light:te.a[100],main:te.a[700]},green:{light:ne.a[100],main:ne.a[700]},red:{light:ae.a[100],main:ae.a[700]},yellow:{light:re.a[100],main:re.a[700]}}});i.a.render(r.a.createElement(c.a,{theme:oe},r.a.createElement(l.a,null),r.a.createElement(Z,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat(".","/service-worker.js");s?(!function(e,t){fetch(e).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):g(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):g(t,e)}))}}()}},[[80,1,2]]]);
//# sourceMappingURL=main.84410772.chunk.js.map