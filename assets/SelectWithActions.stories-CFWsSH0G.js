import{j as t}from"./jsx-runtime-4WDyTGeM.js";import{r as I}from"./index-Dl6G-zuu.js";import{T as R}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{B}from"./Badge-B5h4WNES.js";import"./CountBadge-3ANCZLmo.js";import"./WarningIconBadge-DYC2RgsF.js";import{B as H}from"./Button-BoimfWT1.js";import{S as E,H as P}from"./WarningIcon-hyuTG_uV.js";import"./EditIcon-DQffeilE.js";import"./LinkIcon-CTu8-jnD.js";import"./SvgIcon-DKK2_66P.js";import{S as u}from"./SelectWithActions-CkMBzI96.js";import"./index-eOQoo3sK.js";import"./Button-BYmqNiby.js";import"./styled-DaAyEikA.js";import"./ButtonBase-gXIT4mbS.js";import"./useTimeout-B4b6mSVs.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useForkRef-BDoLG09A.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./SvgIcon-d6V0mnb4.js";import"./MenuItem-D9qYothb.js";import"./ListItemIcon-CTz5rc-7.js";import"./ListContext-BMbj8Y86.js";import"./MenuItem-2XNxwLO8.js";import"./dividerClasses-UQEstWVR.js";import"./listItemTextClasses-CyVyitQV.js";import"./Checkbox-SjERWzSA.js";import"./SwitchBase-bjyHYJtY.js";import"./useFormControl-f2Zb6bR-.js";import"./useControlled-1Y2rT-1r.js";import"./createSvgIcon-DWxpDd4T.js";import"./ControlledTextField-DVeGBoB-.js";import"./TextField-W3uF_ooE.js";import"./FormControl-CbyZrMCZ.js";import"./FormControl-BW8ARzgi.js";import"./utils-DoM3o7-Q.js";import"./isMuiElement-DAcuSkv2.js";import"./FormHelperText-BIk9X5ta.js";import"./FormHelperText-h5eDLKOl.js";import"./formControlState-Dq1zat_P.js";import"./Input-BHnaju5M.js";import"./createSvgIcon-3kI-rNei.js";import"./createChainedFunction-BO_9K8Jh.js";import"./ownerWindow-BN2rbQ_G.js";import"./ownerDocument-DW-IO8s5.js";import"./useId-BkqTTtmk.js";import"./InputAdornment-BINYG23M.js";import"./isHostComponent-DVu5iVWx.js";import"./Typography-n3eyoqZV.js";import"./InputLabel-B2X2Mqqg.js";import"./InputLabel-B0NhuLFQ.js";import"./FormLabel-Ca9udkQO.js";import"./Select-BchA4hd0.js";import"./react-is.production.min-DUDD-a5e.js";import"./Menu-CnssX2u1.js";import"./Popover-B7dHjqFW.js";import"./Modal-_7pSkSOU.js";import"./Fade-Baf6ytQl.js";import"./useTheme-CYpYpbD_.js";import"./utils-Dh94M0rq.js";import"./index-CmOK7BR8.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./mergeSlotProps-Dc5z_XIy.js";import"./useSlotProps-DeMrnH46.js";import"./Portal-3LY7w8wx.js";import"./Paper-B6pP1Hjl.js";import"./Grow-CF8DuDB2.js";import"./MenuList-CUm--JsH.js";import"./List-B5csL-18.js";import"./index-DXf7EplP.js";import"./ListItemText-CDFTHr1G.js";import"./MenuButton-BH2a1E_k.js";const et={title:"Design System/Composite Components/SelectWithActions",tags:["autodocs"],component:u},s=[{label:"Option 1",value:"option-1"},{label:"Option 2",value:"option-2"},{label:"Option 3",caption:"This is a caption.",value:"option-3"}],h=({onChange:o,...a})=>{const[m,r]=I.useState([]),c=l=>{r(l)};return t.jsx(R,{children:t.jsx(u,{value:m,onChange:c,...a})})},e={args:{options:s},render:h},n={args:{disabled:!0,options:s},render:h},T=({onChange:o,...a})=>{const[m,r]=I.useState([]),c=d=>{r(d)},l=()=>{r(s.map(d=>d.value))};return t.jsx(R,{children:t.jsx(u,{value:m,onChange:c,actions:t.jsx(H,{onClick:l,variant:"secondary",children:"Select All"}),...a})})},i={args:{options:s},render:T},y=t.jsx(B,{Icon:E}),F=t.jsx(B,{Icon:P}),D=[];for(let o=0;o<12;o++)D.push({icon:o%2===0?y:F,label:o%2===0?"Software Label":"Hardware Label",value:`option-${o}`});const p={args:{label:"Component",showFilterIcon:!1,options:D},render:h};var g,C,S;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    options: basicOptions
  },
  render: Render
}`,...(S=(C=e.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var b,f,x;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    disabled: true,
    options: basicOptions
  },
  render: Render
}`,...(x=(f=n.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var A,O,j;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    options: basicOptions
  },
  render: SelectWithCustomActionRender
}`,...(j=(O=i.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var v,W,w;p.parameters={...p.parameters,docs:{...(v=p.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    label: 'Component',
    showFilterIcon: false,
    options: componentOptions
  },
  render: Render
}`,...(w=(W=p.parameters)==null?void 0:W.docs)==null?void 0:w.source}}};const nt=["Default","Disabled","SelectWithCustomAction","ComponentSelectWithActions"];export{p as ComponentSelectWithActions,e as Default,n as Disabled,i as SelectWithCustomAction,nt as __namedExportsOrder,et as default};
