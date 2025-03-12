import{j as r}from"./jsx-runtime-4WDyTGeM.js";import{P as W}from"./api-CCwLZuzR.js";import{r as e}from"./index-Dl6G-zuu.js";import{s as q,u as F,b as G}from"./store-DcPsTEhE.js";import{T as J}from"./Toaster-D7pxOepI.js";import{T as K}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{B as d}from"./BooleanComponentProperty-DaCzI0j-.js";import"./lang-BqISUGWn.js";import"./index-B8_SLiQy.js";import"./index-eOQoo3sK.js";import"./Toast-Dwp58Ofo.js";import"./Snackbar-Bpd51y8m.js";import"./styled-DaAyEikA.js";import"./useTheme-CYpYpbD_.js";import"./mergeSlotProps-Dc5z_XIy.js";import"./isHostComponent-DVu5iVWx.js";import"./useTimeout-B4b6mSVs.js";import"./useSlotProps-DeMrnH46.js";import"./useForkRef-BDoLG09A.js";import"./Paper-B6pP1Hjl.js";import"./Grow-CF8DuDB2.js";import"./utils-Dh94M0rq.js";import"./TransitionGroupContext-xAci1nHd.js";import"./index-CmOK7BR8.js";import"./ownerDocument-DW-IO8s5.js";import"./WarningIcon-hyuTG_uV.js";import"./SvgIcon-DKK2_66P.js";import"./SvgIcon-d6V0mnb4.js";import"./EditIcon-DQffeilE.js";import"./LinkIcon-CTu8-jnD.js";import"./Slide-Bt4uZsHn.js";import"./ownerWindow-BN2rbQ_G.js";import"./CustomHardwarePropertyArrayWrapper-BVXXOkWr.js";import"./index-BfyspvgH.js";import"./datetime-B8oWyIaC.js";import"./useIntersectionObserver-ttbOnwKW.js";import"./date-BlWqZk5L.js";import"./Button-BoimfWT1.js";import"./Button-BYmqNiby.js";import"./ButtonBase-gXIT4mbS.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./ActionTriggerButton-DTDzzIf-.js";import"./IconButton-CI5pklQo.js";import"./IconButton-BRjw76_K.js";import"./Tooltip-CSQNJ7MT.js";import"./Portal-3LY7w8wx.js";import"./useControlled-1Y2rT-1r.js";import"./useId-BkqTTtmk.js";import"./useToggle-B4o7u8Ia.js";import"./CircularProgress-FYYVMTPs.js";import"./MainPanelCoplanarSubpageBlockRow-4r_Uzvw0.js";import"./Card-D3c9tIK2.js";import"./eventHelpers-DNy-jsQX.js";import"./Skeleton-dRlu6SwO.js";import"./colorManipulator-CH2yvhWM.js";import"./SettingLabelWrapper-D-OOXB8v.js";import"./index-Bu4DXql-.js";import"./Dot-B-sjopOf.js";import"./constants-nrIgCRYB.js";import"./ControlledTextField-DVeGBoB-.js";import"./TextField-W3uF_ooE.js";import"./FormControl-CbyZrMCZ.js";import"./FormControl-BW8ARzgi.js";import"./utils-DoM3o7-Q.js";import"./useFormControl-f2Zb6bR-.js";import"./isMuiElement-DAcuSkv2.js";import"./FormHelperText-BIk9X5ta.js";import"./FormHelperText-h5eDLKOl.js";import"./formControlState-Dq1zat_P.js";import"./Input-BHnaju5M.js";import"./createSvgIcon-3kI-rNei.js";import"./createSvgIcon-DWxpDd4T.js";import"./createChainedFunction-BO_9K8Jh.js";import"./InputAdornment-BINYG23M.js";import"./Typography-n3eyoqZV.js";import"./InputLabel-B2X2Mqqg.js";import"./InputLabel-B0NhuLFQ.js";import"./FormLabel-Ca9udkQO.js";import"./Select-BchA4hd0.js";import"./react-is.production.min-DUDD-a5e.js";import"./Menu-CnssX2u1.js";import"./Popover-B7dHjqFW.js";import"./Modal-_7pSkSOU.js";import"./Fade-Baf6ytQl.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./MenuList-CUm--JsH.js";import"./List-B5csL-18.js";import"./ListContext-BMbj8Y86.js";import"./ToggleSwitch-D9BUKkoI.js";import"./SwitchBase-bjyHYJtY.js";import"./index-CmspVeCA.js";const o={path:"",arrayLength:1,type:"gmbnd_primitive",subtype:"BooleanProperty",desc:"",index:0,format:"!?",gettable:!0,settable:!0,componentId:"1",min:0,max:100,uiHidden:!1,source:"app",value:[!1]},Re={title:"Michael Pflueger Portfolio/Inputs/BooleanComponentProperty",tags:["autodocs"],parameters:{docs:{description:{component:"An input for updating a Hardware Boolean property with accomodation for arrays of values and csv upload/download."}}},component:d,args:{property:{...o},propertyName:"Single Boolean Property"},argTypes:{property:{control:{type:"object"}}},decorators:[m=>r.jsx(K,{children:r.jsx(W,{store:q,children:r.jsxs("div",{style:{height:"100vh",backgroundColor:"var(--background-workspace-color)"},children:[r.jsx("div",{style:{width:"30rem",height:"100vh",padding:"var(--content-padding-vertical) var(--content-padding-horizontal)"},children:r.jsx(m,{})}),r.jsx(J,{})]})})})],render:m=>{const c=F(),[k,y]=e.useState(!1),[C,u]=e.useState(!1),[V,l]=e.useState(!1),I=e.useCallback(()=>l(!0),[]),_=e.useCallback(()=>l(!1),[l]),D=e.useCallback((z,U)=>{c(G({message:z,type:U}))},[c]),E=()=>{u(!1)},H=()=>{y(!0),setTimeout(()=>{y(!1),u(!0)},500)};return r.jsx(d,{...m,onSendValue:H,mutationStateAndActions:{isLoading:k,isSuccess:C,resetUpdatePropertyMutation:E},onAddToast:D,arraySubpage:V,onSetArraySubpage:I,onArraySubpageBack:_})}},a={},t={args:{property:{...o,settable:!1,value:[!0]},propertyName:"Single Boolean Value ReadOnly"}},p={args:{property:{...o,arrayLength:2,value:[!1,!0]},propertyName:"Two Boolean Array"}},n={args:{property:{...o,arrayLength:3,value:[!0,!1,!0]},propertyName:"Three Boolean Array"}},s={args:{property:{...o,arrayLength:150,value:Array(150).fill(!1)},propertyName:"Many Boolean Array"}},i={args:{property:{...o,arrayLength:150,settable:!1,value:Array(150).fill(!1)},propertyName:"Many Boolean Array ReadOnly"}};var g,f,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(h=(f=a.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var A,B,S;t.parameters={...t.parameters,docs:{...(A=t.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      settable: false,
      value: [true]
    },
    propertyName: 'Single Boolean Value ReadOnly'
  }
}`,...(S=(B=t.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};var v,b,T;p.parameters={...p.parameters,docs:{...(v=p.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      arrayLength: 2,
      value: [false, true]
    },
    propertyName: 'Two Boolean Array'
  }
}`,...(T=(b=p.parameters)==null?void 0:b.docs)==null?void 0:T.source}}};var x,L,N;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      arrayLength: 3,
      value: [true, false, true]
    },
    propertyName: 'Three Boolean Array'
  }
}`,...(N=(L=n.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};var j,M,P;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      arrayLength: 150,
      value: Array(150).fill(false)
    },
    propertyName: 'Many Boolean Array'
  }
}`,...(P=(M=s.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var w,O,R;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    property: {
      ...property,
      arrayLength: 150,
      settable: false,
      value: Array(150).fill(false)
    },
    propertyName: 'Many Boolean Array ReadOnly'
  }
}`,...(R=(O=i.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};const ke=["Default","SingleBooleanValueReadOnly","TwoBooleanArray","ThreeBooleanArray","ManyBooleanArray","ManyBooleanArrayReadOnly"];export{a as Default,s as ManyBooleanArray,i as ManyBooleanArrayReadOnly,t as SingleBooleanValueReadOnly,n as ThreeBooleanArray,p as TwoBooleanArray,ke as __namedExportsOrder,Re as default};
