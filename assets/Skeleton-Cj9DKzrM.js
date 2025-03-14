import{j as v}from"./jsx-runtime-4WDyTGeM.js";import{c as _}from"./index-eOQoo3sK.js";import{b as r,_ as S}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{r as R}from"./index-Dl6G-zuu.js";import{a as N,b as V,k as b,s as q,l as h,c as U,e as M,f as $}from"./styled-DaAyEikA.js";import{a as T}from"./colorManipulator-CH2yvhWM.js";function j(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function E(e){return parseFloat(e)}function P(e){return V("MuiSkeleton",e)}N("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const A=["animation","className","component","height","style","variant","width"];let o=e=>e,p,m,f,g;const O=e=>{const{classes:t,variant:a,animation:n,hasChildren:i,width:l,height:s}=e;return $({root:["root",a,n,i&&"withChildren",i&&!l&&"fitContent",i&&!s&&"heightAuto"]},P,t)},X=b(p||(p=o`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),H=b(m||(m=o`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),I=q("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],a.animation!==!1&&t[a.animation],a.hasChildren&&t.withChildren,a.hasChildren&&!a.width&&t.fitContent,a.hasChildren&&!a.height&&t.heightAuto]}})(({theme:e,ownerState:t})=>{const a=j(e.shape.borderRadius)||"px",n=E(e.shape.borderRadius);return r({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:T(e.palette.text.primary,e.palette.mode==="light"?.11:.13),height:"1.2em"},t.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${n}${a}/${Math.round(n/.6*10)/10}${a}`,"&:empty:before":{content:'"\\00a0"'}},t.variant==="circular"&&{borderRadius:"50%"},t.variant==="rounded"&&{borderRadius:(e.vars||e).shape.borderRadius},t.hasChildren&&{"& > *":{visibility:"hidden"}},t.hasChildren&&!t.width&&{maxWidth:"fit-content"},t.hasChildren&&!t.height&&{height:"auto"})},({ownerState:e})=>e.animation==="pulse"&&h(f||(f=o`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),X),({ownerState:e,theme:t})=>e.animation==="wave"&&h(g||(g=o`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),H,(t.vars||t).palette.action.hover)),L=R.forwardRef(function(t,a){const n=U({props:t,name:"MuiSkeleton"}),{animation:i="pulse",className:l,component:s="span",height:d,style:k,variant:w="text",width:C}=n,u=S(n,A),c=r({},n,{animation:i,component:s,variant:w,hasChildren:!!u.children}),x=O(c);return v.jsx(I,r({as:s,ref:a,className:M(x.root,l),ownerState:c},u,{style:r({width:C,height:d},k)}))}),y=({className:e,...t})=>v.jsx(L,{className:_("Skeleton",e),...t});try{y.displayName="Skeleton",y.__docgenInfo={description:"",displayName:"Skeleton",props:{children:{defaultValue:null,description:"Optional children to infer width and height from.",name:"children",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"(Partial<SkeletonClasses> & Partial<ClassNameMap<never>>)"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},variant:{defaultValue:{value:"'text'"},description:"The type of content that will be rendered.",name:"variant",required:!1,type:{name:"enum",value:[{value:'"text"'},{value:'"circular"'},{value:'"rounded"'},{value:'"rectangular"'}]}},height:{defaultValue:null,description:`Height of the skeleton.
Useful when you don't want to adapt the skeleton to a text element but for instance a card.`,name:"height",required:!1,type:{name:"string | number"}},width:{defaultValue:null,description:`Width of the skeleton.
Useful when the skeleton is inside an inline element with no width of its own.`,name:"width",required:!1,type:{name:"string | number"}},animation:{defaultValue:{value:"'pulse'"},description:"The animation.\nIf `false` the animation effect is disabled.",name:"animation",required:!1,type:{name:'false | "pulse" | "wave"'}}}}}catch{}export{y as S};
