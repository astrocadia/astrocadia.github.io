import{b as e,_ as u,e as x}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{r as h}from"./index-Dl6G-zuu.js";import{b,a as k,s as C,r as v,c as z,e as I,f as L}from"./styled-DaAyEikA.js";import{f as g}from"./formControlState-Dq1zat_P.js";import{u as W}from"./useFormControl-f2Zb6bR-.js";import{j as E}from"./jsx-runtime-4WDyTGeM.js";import{F,f as q}from"./FormLabel-Ca9udkQO.js";function A(a){return b("MuiInputLabel",a)}k("MuiInputLabel",["root","focused","disabled","error","required","asterisk","formControl","sizeSmall","shrink","animated","standard","filled","outlined"]);const P=["disableAnimation","margin","shrink","variant","className"],R=a=>{const{classes:s,formControl:r,size:t,shrink:l,disableAnimation:m,variant:c,required:p}=a,o={root:["root",r&&"formControl",!m&&"animated",l&&"shrink",t&&t!=="normal"&&`size${x(t)}`,c],asterisk:[p&&"asterisk"]},n=L(o,A,s);return e({},s,n)},j=C(F,{shouldForwardProp:a=>v(a)||a==="classes",name:"MuiInputLabel",slot:"Root",overridesResolver:(a,s)=>{const{ownerState:r}=a;return[{[`& .${q.asterisk}`]:s.asterisk},s.root,r.formControl&&s.formControl,r.size==="small"&&s.sizeSmall,r.shrink&&s.shrink,!r.disableAnimation&&s.animated,r.focused&&s.focused,s[r.variant]]}})(({theme:a,ownerState:s})=>e({display:"block",transformOrigin:"top left",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"},s.formControl&&{position:"absolute",left:0,top:0,transform:"translate(0, 20px) scale(1)"},s.size==="small"&&{transform:"translate(0, 17px) scale(1)"},s.shrink&&{transform:"translate(0, -1.5px) scale(0.75)",transformOrigin:"top left",maxWidth:"133%"},!s.disableAnimation&&{transition:a.transitions.create(["color","transform","max-width"],{duration:a.transitions.duration.shorter,easing:a.transitions.easing.easeOut})},s.variant==="filled"&&e({zIndex:1,pointerEvents:"none",transform:"translate(12px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"},s.size==="small"&&{transform:"translate(12px, 13px) scale(1)"},s.shrink&&e({userSelect:"none",pointerEvents:"auto",transform:"translate(12px, 7px) scale(0.75)",maxWidth:"calc(133% - 24px)"},s.size==="small"&&{transform:"translate(12px, 4px) scale(0.75)"})),s.variant==="outlined"&&e({zIndex:1,pointerEvents:"none",transform:"translate(14px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"},s.size==="small"&&{transform:"translate(14px, 9px) scale(1)"},s.shrink&&{userSelect:"none",pointerEvents:"auto",maxWidth:"calc(133% - 32px)",transform:"translate(14px, -9px) scale(0.75)"}))),w=h.forwardRef(function(s,r){const t=z({name:"MuiInputLabel",props:s}),{disableAnimation:l=!1,shrink:m,className:c}=t,p=u(t,P),o=W();let n=m;typeof n>"u"&&o&&(n=o.filled||o.focused||o.adornedStart);const i=g({props:t,muiFormControl:o,states:["size","variant","required","focused"]}),d=e({},t,{disableAnimation:l,formControl:o,shrink:n,size:i.size,variant:i.variant,required:i.required,focused:i.focused}),f=R(d);return E.jsx(j,e({"data-shrink":n,ownerState:d,ref:r,className:I(f.root,c)},p,{classes:f}))});export{w as I};
