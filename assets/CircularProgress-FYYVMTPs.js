import{j as l}from"./jsx-runtime-4WDyTGeM.js";import{c as R}from"./index-eOQoo3sK.js";import{e as c,b as i,_ as T}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{r as z}from"./index-Dl6G-zuu.js";import{b as I,a as M,k as $,s as g,l as V,c as j,e as U,f as E}from"./styled-DaAyEikA.js";function F(e){return I("MuiCircularProgress",e)}M("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const K=["className","color","disableShrink","size","style","thickness","value","variant"];let u=e=>e,b,P,S,_;const s=44,L=$(b||(b=u`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),W=$(P||(P=u`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),B=e=>{const{classes:r,variant:a,color:t,disableShrink:d}=e,m={root:["root",a,`color${c(t)}`],svg:["svg"],circle:["circle",`circle${c(a)}`,d&&"circleDisableShrink"]};return E(m,F,r)},G=g("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:a}=e;return[r.root,r[a.variant],r[`color${c(a.color)}`]]}})(({ownerState:e,theme:r})=>i({display:"inline-block"},e.variant==="determinate"&&{transition:r.transitions.create("transform")},e.color!=="inherit"&&{color:(r.vars||r).palette[e.color].main}),({ownerState:e})=>e.variant==="indeterminate"&&V(S||(S=u`
      animation: ${0} 1.4s linear infinite;
    `),L)),O=g("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),Z=g("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:a}=e;return[r.circle,r[`circle${c(a.variant)}`],a.disableShrink&&r.circleDisableShrink]}})(({ownerState:e,theme:r})=>i({stroke:"currentColor"},e.variant==="determinate"&&{transition:r.transitions.create("stroke-dashoffset")},e.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink&&V(_||(_=u`
      animation: ${0} 1.4s ease-in-out infinite;
    `),W)),A=z.forwardRef(function(r,a){const t=j({props:r,name:"MuiCircularProgress"}),{className:d,color:m="primary",disableShrink:q=!1,size:p=40,style:D,thickness:o=3.6,value:f=0,variant:y="indeterminate"}=t,N=T(t,K),n=i({},t,{color:m,disableShrink:q,size:p,thickness:o,value:f,variant:y}),h=B(n),v={},k={},x={};if(y==="determinate"){const C=2*Math.PI*((s-o)/2);v.strokeDasharray=C.toFixed(3),x["aria-valuenow"]=Math.round(f),v.strokeDashoffset=`${((100-f)/100*C).toFixed(3)}px`,k.transform="rotate(-90deg)"}return l.jsx(G,i({className:U(h.root,d),style:i({width:p,height:p},k,D),ownerState:n,ref:a,role:"progressbar"},x,N,{children:l.jsx(O,{className:h.svg,ownerState:n,viewBox:`${s/2} ${s/2} ${s} ${s}`,children:l.jsx(Z,{className:h.circle,style:v,ownerState:n,cx:s,cy:s,r:(s-o)/2,fill:"none",strokeWidth:o})})}))}),w=({"aria-label":e="Loading",className:r,...a})=>l.jsx(A,{"aria-label":e,className:R("CircularProgress",r),...a});try{w.displayName="CircularProgress",w.__docgenInfo={description:"",displayName:"CircularProgress",props:{classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"Partial<CircularProgressClasses>"}},color:{defaultValue:{value:"'primary'"},description:`The color of the component.
It supports both default and custom theme colors, which can be added as shown in the
[palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).`,name:"color",required:!1,type:{name:"enum",value:[{value:'"inherit"'},{value:'"primary"'},{value:'"secondary"'},{value:'"error"'},{value:'"info"'},{value:'"success"'},{value:'"warning"'}]}},disableShrink:{defaultValue:{value:"false"},description:"If `true`, the shrink animation is disabled.\nThis only works if variant is `indeterminate`.",name:"disableShrink",required:!1,type:{name:"boolean"}},size:{defaultValue:{value:"40"},description:`The size of the component.
If using a number, the pixel unit is assumed.
If using a string, you need to provide the CSS unit, for example '3rem'.`,name:"size",required:!1,type:{name:"string | number"}},sx:{defaultValue:null,description:"The system prop that allows defining system overrides as well as additional CSS styles.",name:"sx",required:!1,type:{name:"SxProps<Theme>"}},thickness:{defaultValue:{value:"3.6"},description:"The thickness of the circle.",name:"thickness",required:!1,type:{name:"number"}},value:{defaultValue:{value:"0"},description:`The value of the progress indicator for the determinate variant.
Value between 0 and 100.`,name:"value",required:!1,type:{name:"number"}},variant:{defaultValue:{value:"'indeterminate'"},description:`The variant to use.
Use indeterminate when there is no progress value.`,name:"variant",required:!1,type:{name:"enum",value:[{value:'"indeterminate"'},{value:'"determinate"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"Ref<unknown>"}}}}}catch{}export{w as C};
