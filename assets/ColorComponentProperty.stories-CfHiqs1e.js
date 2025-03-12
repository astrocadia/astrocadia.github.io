import{j as l}from"./jsx-runtime-4WDyTGeM.js";import{P as fe}from"./api-CCwLZuzR.js";import{r as t}from"./index-Dl6G-zuu.js";import{T as D,s as Se,u as be,b as Ae}from"./store-y-FlLsSz.js";import{T as Ve}from"./Toaster-CXfBWZU4.js";import{T as Le}from"./ThemeProviderWrapper-Be5RUURM.js";import{m as k,C as W}from"./ColorInput-CoGddkUP.js";import{A as Pe,a as G,S as ve}from"./constants-BI7OnjTI.js";import{C as Re}from"./CustomHardwareFieldPropertyWrapper-BJ5vBabZ.js";import{C as xe}from"./CustomHardwarePropertyArrayWrapper-BfU2zls3.js";import"./ControlledTextField-VSi4Itg2.js";import{T as Te}from"./TextField-DksRe_tn.js";import{i as T,b as X}from"./exhibitComponents-DoXjdIMq.js";import"./lang-BqISUGWn.js";import"./index-B8_SLiQy.js";import"./index-eOQoo3sK.js";import"./Toast-DIVeJ4oH.js";import"./Snackbar-yxcL1JMF.js";import"./styled-Dt2_JBRt.js";import"./useTheme-DLZNzqMo.js";import"./mergeSlotProps-D2P12luN.js";import"./isHostComponent-DVu5iVWx.js";import"./useTimeout-B4b6mSVs.js";import"./useSlotProps-CP3WIws3.js";import"./useForkRef-BDoLG09A.js";import"./Paper-Dxqu9lYo.js";import"./Grow-BnLMXtPt.js";import"./utils-CzoQ7LGy.js";import"./TransitionGroupContext-xAci1nHd.js";import"./index-CmOK7BR8.js";import"./ownerDocument-DW-IO8s5.js";import"./WarningIcon-DZ-0i3Yx.js";import"./SvgIcon-eIfT25mh.js";import"./SvgIcon-DROc5w4B.js";import"./EditIcon-C_DteFoa.js";import"./LinkIcon-8pN4OFct.js";import"./Slide-DZCuTsi7.js";import"./ownerWindow-BN2rbQ_G.js";import"./Button-C5OdypjM.js";import"./ButtonBase-Cp5BTdG6.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./index-l62EWUf6.js";import"./useControlled-1Y2rT-1r.js";import"./TextField-DVhuxQao.js";import"./FormControl-CEdSnwwK.js";import"./utils-DoM3o7-Q.js";import"./useFormControl-f2Zb6bR-.js";import"./isMuiElement-DAcuSkv2.js";import"./useId-BkqTTtmk.js";import"./InputLabel-CoHzGKZp.js";import"./formControlState-Dq1zat_P.js";import"./FormLabel-B9PyWtWF.js";import"./Select-tm-Q-jdf.js";import"./react-is.production.min-DUDD-a5e.js";import"./Menu-BhnrG3vD.js";import"./Popover-Db_KuLdV.js";import"./Modal-PRNVlI3H.js";import"./Fade-u7WpI_Fx.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./createChainedFunction-BO_9K8Jh.js";import"./Portal-3LY7w8wx.js";import"./MenuList-CRTvLIIN.js";import"./List-C41wlV70.js";import"./ListContext-BMbj8Y86.js";import"./createSvgIcon-D7FplSTg.js";import"./InputAdornment-BcfgeZVH.js";import"./Typography-8CCtzQ9L.js";import"./FormHelperText-B-lqvv-N.js";import"./Box-CS_OvsIe.js";import"./index-Bu4DXql-.js";import"./Dot-B-sjopOf.js";import"./ActionTriggerButton-BJutZWFV.js";import"./IconButton-vPDIoB2n.js";import"./IconButton-Djqk-I0k.js";import"./Tooltip-B5Gmbdco.js";import"./useToggle-B4o7u8Ia.js";import"./CircularProgress-BgQ2h3g8.js";import"./SettingLabelWrapper-D-OOXB8v.js";import"./MainPanelCoplanarSubpageBlockRow-B4TwGjcb.js";import"./Card-sUXJUunV.js";import"./eventHelpers-DNy-jsQX.js";import"./index-BfyspvgH.js";import"./datetime-B8oWyIaC.js";import"./useIntersectionObserver-ttbOnwKW.js";import"./date-BlWqZk5L.js";import"./Button-CqlPB7zF.js";import"./Skeleton-CFd2Vw-J.js";import"./colorManipulator-CE5bNU3Z.js";import"./FormControl-DcAW02lu.js";import"./FormHelperText-DtGLVIpz.js";import"./Input-BCsX3R8r.js";import"./createSvgIcon-CBDqugwZ.js";import"./InputLabel-D8KLsBjt.js";const Y=({white:e,red:p,green:n,blue:u})=>`#${[p,n,u,e].map(d=>d.toString(16).padStart(2,"0")).join("")}`,_e=e=>{if(!e)return{red:0,green:0,blue:0,white:0};const n=e.replace("#",""),u=parseInt(n.substring(0,2),16),d=parseInt(n.substring(2,4),16),i=parseInt(n.substring(4,6),16),y=parseInt(n.substring(6,8),16);return{white:T(y)?y:0,red:T(u)?u:0,green:T(d)?d:0,blue:T(i)?i:0}},Ee="Select or enter color value",j=({property:e,propertyName:p,disabled:n,onSendValue:u,mutationStateAndActions:d,onAddToast:i,arraySubpage:y,onSetArraySubpage:S,onArraySubpageBack:B})=>{const[a,c]=t.useState(Array(e.arrayLength).fill(null)),[s,b]=t.useState(Array(e.arrayLength).fill(null)),[P,A]=t.useState(!1),[g,ce]=t.useState(Math.min(e.arrayLength,Pe)),v=t.useRef(!1),{isSuccess:h,isLoading:V,resetUpdatePropertyMutation:O}=d,U=t.useCallback((r,o)=>{const m=o;c(C=>C.map((he,Ce)=>Ce===r?m:he)),v.current=!0},[]),L=t.useMemo(()=>Math.max(a.findLastIndex(r=>r&&r!==""),s.findLastIndex(r=>r&&r!=="")),[a,s]),z=t.useMemo(()=>a.some((r,o)=>r&&r!==s[o]),[a,s]),R=t.useMemo(()=>L<0||!a.slice(0,L+1).every((r,o)=>r!==null?k(r):s[o]&&k(s[o])),[a,s,L]),x=t.useCallback(()=>{R||n||V||h||u(a.slice(0,L+1).map((r,o)=>_e(r&&r!==""?r:s[o])))},[u,s,a,L,R,n,V,h]),F=t.useMemo(()=>g>G?g-G:0,[g]),ye=r=>o=>{if(o.key==="Enter"){if(o.target.classList.contains("MuiButtonBase-root"))return;r()}},q=t.useMemo(()=>{const r=[];for(let o=F;o<g;o++)r.push(l.jsxs("div",{className:"ColorComponentProperty__row",children:[e.arrayLength>1&&l.jsx(Te,{className:"ColorComponentProperty__rowIndex",placeholder:o.toString(),disabled:!0}),l.jsx(W,{format:"hex8",onChange:m=>U(o,m),placeholder:e.settable?Ee:"—",disabled:n||!e.settable,value:a[o]??s[o]??"",changed:e.arrayLength>1&&!!a[o]&&a[o]!==s[o],onKeyDown:ye(x)})]},o));return l.jsx("div",{className:"ColorComponentProperty__propertyValues",children:r})},[n,U,x,F,g,a,s,e.arrayLength,e.settable]);t.useEffect(()=>{v.current?A(!0):b(e.value?e.value.map(r=>X(r)?Y(r):null):Array(e.arrayLength).fill(null))},[e.value,e.arrayLength]),t.useEffect(()=>{h&&(v.current=!1,e.arrayLength>1&&i(`${p} values sent`,D.SUCCESS),setTimeout(()=>{b(r=>r.map((o,m)=>a[m]&&a[m]!==""?a[m]:o??"")),c(Array(e.arrayLength).fill(null)),A(!1),O()},ve))},[h,V,a,i,p,O,e.arrayLength]);const H=t.useCallback(()=>{v.current=!1,c(Array(e.arrayLength).fill(null)),b(e.value??Array(e.arrayLength).fill(null)),A(!1)},[e.value,e.arrayLength]),ge=t.useCallback(r=>{if(r.some(o=>!k(o)&&o!=="")){i("File failed to upload",D.ERROR);return}c(o=>o.map((m,C)=>r[C]&&r[C]!==""?r[C]:m)),i("File Uploaded",D.SUCCESS)},[c,i]);return e.arrayLength>1?l.jsx(xe,{className:"ColorComponentProperty",propertyName:p,propertyLength:e.arrayLength,propertyChanged:z,settable:e.settable,downloadData:s.map((r,o)=>a[o]??r).join(","),disabled:n,sendDisabled:R,loading:V,success:h,showRefreshButton:P,onRefresh:H,onSendValue:x,onUpdate:ge,arraySubpage:!!y,onSetArraySubpage:S,onArraySubpageBack:B,renderedFieldsEndIndex:g,setRenderedFieldsEndIndex:ce,children:q}):l.jsx(Re,{className:"ColorComponentProperty",settable:e.settable,propertyName:p,propertyChanged:z,disabled:n||R||a[0]==="",loading:V,success:h,showRefreshButton:P,onRefresh:H,onSendValue:x,children:e.settable?q:l.jsx(W,{format:"hex8",value:e.value&&X(e.value[0])?Y(e.value[0]):"",placeholder:"—",disabled:!0})})};try{j.displayName="ColorComponentProperty",j.__docgenInfo={description:"",displayName:"ColorComponentProperty",props:{property:{defaultValue:null,description:"",name:"property",required:!0,type:{name:"ColorProperty"}},propertyName:{defaultValue:null,description:"",name:"propertyName",required:!0,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},onSendValue:{defaultValue:null,description:"",name:"onSendValue",required:!0,type:{name:"(values: (ColorPropertyValue | ColorPropertyValue[])[] | undefined) => void"}},mutationStateAndActions:{defaultValue:null,description:"",name:"mutationStateAndActions",required:!0,type:{name:"{ isLoading: boolean; isSuccess: boolean; resetUpdatePropertyMutation: () => void; }"}},onAddToast:{defaultValue:null,description:"",name:"onAddToast",required:!0,type:{name:"(message: string, type: ToastType) => void"}},arraySubpage:{defaultValue:null,description:"",name:"arraySubpage",required:!0,type:{name:"boolean"}},onSetArraySubpage:{defaultValue:null,description:"",name:"onSetArraySubpage",required:!0,type:{name:"() => void"}},onArraySubpageBack:{defaultValue:null,description:"",name:"onArraySubpageBack",required:!0,type:{name:"() => void"}}}}}catch{}const f={path:"",arrayLength:1,type:"gmbnd_color",desc:"",index:0,format:"!4B",gettable:!0,settable:!0,componentId:"1",uiHidden:!1,source:"app"},Co={title:"Design System/Composite Components/Hardware Properties/ColorComponentProperty",tags:["autodocs"],component:j,args:{property:{...f},propertyName:"Single Color Property"},argTypes:{property:{control:{type:"object"}}},decorators:[e=>l.jsx(Le,{children:l.jsx(fe,{store:Se,children:l.jsxs("div",{style:{height:"100vh",backgroundColor:"var(--background-workspace-color)"},children:[l.jsx("div",{style:{width:"30rem",padding:"var(--content-padding-vertical) var(--content-padding-horizontal)",height:"100vh"},children:l.jsx(e,{})}),l.jsx(Ve,{})]})})})],render:e=>{const p=be(),[n,u]=t.useState(!1),[d,i]=t.useState(!1),[y,S]=t.useState(!1),B=t.useCallback(()=>S(!0),[]),a=t.useCallback(()=>S(!1),[S]),c=t.useCallback((P,A)=>{p(Ae({message:P,type:A}))},[p]),s=()=>{i(!1)},b=()=>{u(!0),setTimeout(()=>{u(!1),i(!0)},500)};return l.jsx(j,{...e,onSendValue:b,mutationStateAndActions:{isLoading:n,isSuccess:d,resetUpdatePropertyMutation:s},onAddToast:c,arraySubpage:y,onSetArraySubpage:B,onArraySubpageBack:a})}},_={},E={args:{property:{...f,settable:!1,value:[{white:255,red:0,green:255,blue:255}]},propertyName:"Single Color Value ReadOnly"}},w={args:{property:{...f,arrayLength:2},propertyName:"Two Color Array"}},M={args:{property:{...f,arrayLength:3},propertyName:"Three Color Array"}},I={args:{property:{...f,arrayLength:150,value:Array(150).fill({white:255,red:255,green:0,blue:255})},propertyName:"Many Color Array"}},N={args:{property:{...f,arrayLength:150,settable:!1,value:Array(150).fill({white:255,red:255,green:255,blue:0})},propertyName:"Many Color Array ReadOnly"}};var $,K,J;_.parameters={..._.parameters,docs:{...($=_.parameters)==null?void 0:$.docs,source:{originalSource:"{}",...(J=(K=_.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var Q,Z,ee;E.parameters={...E.parameters,docs:{...(Q=E.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      settable: false,
      value: [{
        white: 255,
        red: 0,
        green: 255,
        blue: 255
      } as ColorPropertyValue]
    },
    propertyName: 'Single Color Value ReadOnly'
  }
}`,...(ee=(Z=E.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var re,oe,te;w.parameters={...w.parameters,docs:{...(re=w.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      arrayLength: 2
    },
    propertyName: 'Two Color Array'
  }
}`,...(te=(oe=w.parameters)==null?void 0:oe.docs)==null?void 0:te.source}}};var ae,ne,se;M.parameters={...M.parameters,docs:{...(ae=M.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      arrayLength: 3
    },
    propertyName: 'Three Color Array'
  }
}`,...(se=(ne=M.parameters)==null?void 0:ne.docs)==null?void 0:se.source}}};var le,ie,pe;I.parameters={...I.parameters,docs:{...(le=I.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      arrayLength: 150,
      value: Array(150).fill({
        white: 255,
        red: 255,
        green: 0,
        blue: 255
      } as ColorPropertyValue)
    },
    propertyName: 'Many Color Array'
  }
}`,...(pe=(ie=I.parameters)==null?void 0:ie.docs)==null?void 0:pe.source}}};var ue,me,de;N.parameters={...N.parameters,docs:{...(ue=N.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      arrayLength: 150,
      settable: false,
      value: Array(150).fill({
        white: 255,
        red: 255,
        green: 255,
        blue: 0
      } as ColorPropertyValue)
    },
    propertyName: 'Many Color Array ReadOnly'
  }
}`,...(de=(me=N.parameters)==null?void 0:me.docs)==null?void 0:de.source}}};const fo=["Default","SingleColorValueReadOnly","TwoColorArray","ThreeColorArray","ManyColorArray","ManyColorArrayReadOnly"];export{_ as Default,I as ManyColorArray,N as ManyColorArrayReadOnly,E as SingleColorValueReadOnly,M as ThreeColorArray,w as TwoColorArray,fo as __namedExportsOrder,Co as default};
