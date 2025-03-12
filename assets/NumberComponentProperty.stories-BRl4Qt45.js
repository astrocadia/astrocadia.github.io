import{j as r}from"./jsx-runtime-4WDyTGeM.js";import{P as W}from"./api-CCwLZuzR.js";import{r as e}from"./index-Dl6G-zuu.js";import{s as q,u as F,b as G}from"./store-DcPsTEhE.js";import{T as J}from"./Toaster-D7pxOepI.js";import{T as K}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{N as d}from"./NumberComponentProperty-nLcjjGSw.js";import"./lang-BqISUGWn.js";import"./index-B8_SLiQy.js";import"./index-eOQoo3sK.js";import"./Toast-Dwp58Ofo.js";import"./Snackbar-Bpd51y8m.js";import"./styled-DaAyEikA.js";import"./useTheme-CYpYpbD_.js";import"./mergeSlotProps-Dc5z_XIy.js";import"./isHostComponent-DVu5iVWx.js";import"./useTimeout-B4b6mSVs.js";import"./useSlotProps-DeMrnH46.js";import"./useForkRef-BDoLG09A.js";import"./Paper-B6pP1Hjl.js";import"./Grow-CF8DuDB2.js";import"./utils-Dh94M0rq.js";import"./TransitionGroupContext-xAci1nHd.js";import"./index-CmOK7BR8.js";import"./ownerDocument-DW-IO8s5.js";import"./WarningIcon-hyuTG_uV.js";import"./SvgIcon-DKK2_66P.js";import"./SvgIcon-d6V0mnb4.js";import"./EditIcon-DQffeilE.js";import"./LinkIcon-CTu8-jnD.js";import"./Slide-Bt4uZsHn.js";import"./ownerWindow-BN2rbQ_G.js";import"./index-dIKOytT1.js";import"./exhibitComponents-B3YvCMnA.js";import"./ControlledTextField-DVeGBoB-.js";import"./TextField-W3uF_ooE.js";import"./FormControl-CbyZrMCZ.js";import"./FormControl-BW8ARzgi.js";import"./utils-DoM3o7-Q.js";import"./useFormControl-f2Zb6bR-.js";import"./isMuiElement-DAcuSkv2.js";import"./FormHelperText-BIk9X5ta.js";import"./FormHelperText-h5eDLKOl.js";import"./formControlState-Dq1zat_P.js";import"./Input-BHnaju5M.js";import"./createSvgIcon-3kI-rNei.js";import"./createSvgIcon-DWxpDd4T.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useId-BkqTTtmk.js";import"./useControlled-1Y2rT-1r.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./InputAdornment-BINYG23M.js";import"./Typography-n3eyoqZV.js";import"./InputLabel-B2X2Mqqg.js";import"./InputLabel-B0NhuLFQ.js";import"./FormLabel-Ca9udkQO.js";import"./Select-BchA4hd0.js";import"./react-is.production.min-DUDD-a5e.js";import"./Menu-CnssX2u1.js";import"./Popover-B7dHjqFW.js";import"./Modal-_7pSkSOU.js";import"./Fade-Baf6ytQl.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./Portal-3LY7w8wx.js";import"./MenuList-CUm--JsH.js";import"./List-B5csL-18.js";import"./ListContext-BMbj8Y86.js";import"./index-Bu4DXql-.js";import"./Dot-B-sjopOf.js";import"./CustomHardwarePropertyArrayWrapper-BVXXOkWr.js";import"./index-BfyspvgH.js";import"./datetime-B8oWyIaC.js";import"./useIntersectionObserver-ttbOnwKW.js";import"./date-BlWqZk5L.js";import"./Button-BoimfWT1.js";import"./Button-BYmqNiby.js";import"./ButtonBase-gXIT4mbS.js";import"./ActionTriggerButton-DTDzzIf-.js";import"./IconButton-CI5pklQo.js";import"./IconButton-BRjw76_K.js";import"./Tooltip-CSQNJ7MT.js";import"./useToggle-B4o7u8Ia.js";import"./CircularProgress-FYYVMTPs.js";import"./MainPanelCoplanarSubpageBlockRow-4r_Uzvw0.js";import"./Card-D3c9tIK2.js";import"./eventHelpers-DNy-jsQX.js";import"./Skeleton-dRlu6SwO.js";import"./colorManipulator-CH2yvhWM.js";import"./SettingLabelWrapper-D-OOXB8v.js";import"./constants-nrIgCRYB.js";import"./CustomHardwareFieldPropertyWrapper-Cw72Oe9H.js";const t={path:"",arrayLength:1,type:"gmbnd_primitive",subtype:"NumberProperty",desc:"",index:0,format:"!i",gettable:!0,settable:!0,componentId:"1",min:0,max:100,uiHidden:!1,source:"app"},ke={title:"Michael Pflueger Portfolio/Inputs/NumberComponentProperty",tags:["autodocs"],parameters:{docs:{description:{component:"An input for updating a Hardware Number property with accomodation for arrays of values and csv upload/download."}}},component:d,args:{property:{...t},propertyName:"Single Number Property"},argTypes:{property:{control:{type:"object"}}},decorators:[n=>r.jsx(K,{children:r.jsx(W,{store:q,children:r.jsxs("div",{style:{height:"100vh",backgroundColor:"var(--background-workspace-color)"},children:[r.jsx("div",{style:{width:"30rem",height:"100vh",padding:"var(--content-padding-vertical) var(--content-padding-horizontal)"},children:r.jsx(n,{})}),r.jsx(J,{})]})})})],render:n=>{const c=F(),[C,y]=e.useState(!1),[V,l]=e.useState(!1),[I,u]=e.useState(!1),_=e.useCallback(()=>u(!0),[]),D=e.useCallback(()=>u(!1),[u]),E=e.useCallback((z,U)=>{c(G({message:z,type:U}))},[c]),B=()=>{l(!1)},H=()=>{y(!0),setTimeout(()=>{y(!1),l(!0)},500)};return r.jsx(d,{...n,onSendValue:H,mutationStateAndActions:{isLoading:C,isSuccess:V,resetUpdatePropertyMutation:B},onAddToast:E,arraySubpage:I,onSetArraySubpage:_,onArraySubpageBack:D})}},o={},a={args:{property:{...t,settable:!1,value:[42]},propertyName:"Single Number Value ReadOnly"}},p={args:{property:{...t,arrayLength:2},propertyName:"Two Number Array"}},m={args:{property:{...t,arrayLength:3},propertyName:"Three Number Array"}},s={args:{property:{...t,arrayLength:150,value:Array(150).fill(42)},propertyName:"Many Number Array"}},i={args:{property:{...t,arrayLength:150,settable:!1,value:Array(150).fill(42)},propertyName:"Many Number Array ReadOnly"}};var g,b,N;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(N=(b=o.parameters)==null?void 0:b.docs)==null?void 0:N.source}}};var h,f,A;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      settable: false,
      value: [42]
    },
    propertyName: 'Single Number Value ReadOnly'
  }
}`,...(A=(f=a.parameters)==null?void 0:f.docs)==null?void 0:A.source}}};var S,v,T;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      arrayLength: 2
    },
    propertyName: 'Two Number Array'
  }
}`,...(T=(v=p.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var x,L,j;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      arrayLength: 3
    },
    propertyName: 'Three Number Array'
  }
}`,...(j=(L=m.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};var M,P,w;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      arrayLength: 150,
      value: Array(150).fill(42)
    },
    propertyName: 'Many Number Array'
  }
}`,...(w=(P=s.parameters)==null?void 0:P.docs)==null?void 0:w.source}}};var O,R,k;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      arrayLength: 150,
      settable: false,
      value: Array(150).fill(42)
    },
    propertyName: 'Many Number Array ReadOnly'
  }
}`,...(k=(R=i.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};const Ce=["Default","SingleNumberValueReadOnly","TwoNumberArray","ThreeNumberArray","ManyNumberArray","ManyNumberArrayReadOnly"];export{o as Default,s as ManyNumberArray,i as ManyNumberArrayReadOnly,a as SingleNumberValueReadOnly,m as ThreeNumberArray,p as TwoNumberArray,Ce as __namedExportsOrder,ke as default};
