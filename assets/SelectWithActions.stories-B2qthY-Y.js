import{j as t}from"./jsx-runtime-4WDyTGeM.js";import{r as I}from"./index-Dl6G-zuu.js";import{T as R}from"./ThemeProviderWrapper-Be5RUURM.js";import{B}from"./Badge-B5h4WNES.js";import"./CountBadge-3ANCZLmo.js";import"./WarningIconBadge-DGC6-Vfu.js";import{B as H}from"./Button-CxrygEYf.js";import{S as E,H as P}from"./WarningIcon-6HpPPylF.js";import"./EditIcon-bNkpr5Ld.js";import"./LinkIcon-CKhuJxKk.js";import"./SvgIcon-76a5Fjoi.js";import{S as u}from"./SelectWithActions-jQgD96U8.js";import"./index-eOQoo3sK.js";import"./Button-C5OdypjM.js";import"./styled-Dt2_JBRt.js";import"./ButtonBase-Cp5BTdG6.js";import"./useTimeout-B4b6mSVs.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useForkRef-BDoLG09A.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./SvgIcon-DROc5w4B.js";import"./MenuItem-DBCTIAlS.js";import"./ListItemIcon-Bzpm1BdP.js";import"./ListContext-BMbj8Y86.js";import"./MenuItem-pwvj7SPr.js";import"./dividerClasses-Bm2W9hGA.js";import"./listItemTextClasses-Dmj8zJQC.js";import"./Checkbox-D29VLTO4.js";import"./SwitchBase-BNegPo3E.js";import"./useFormControl-f2Zb6bR-.js";import"./useControlled-1Y2rT-1r.js";import"./createSvgIcon-D7FplSTg.js";import"./ControlledTextField-BIRBLCqk.js";import"./TextField-H_O97xAh.js";import"./FormControl-BB9KS_Cj.js";import"./FormControl-CEdSnwwK.js";import"./utils-DoM3o7-Q.js";import"./isMuiElement-DAcuSkv2.js";import"./FormHelperText-DeZFn-fQ.js";import"./FormHelperText-B-lqvv-N.js";import"./formControlState-Dq1zat_P.js";import"./Input-KeXyPRhr.js";import"./createSvgIcon-CBDqugwZ.js";import"./createChainedFunction-BO_9K8Jh.js";import"./ownerWindow-BN2rbQ_G.js";import"./ownerDocument-DW-IO8s5.js";import"./useId-BkqTTtmk.js";import"./InputAdornment-B5oVS-sc.js";import"./isHostComponent-DVu5iVWx.js";import"./Typography-8CCtzQ9L.js";import"./InputLabel-DM-4l14M.js";import"./InputLabel-CoHzGKZp.js";import"./FormLabel-B9PyWtWF.js";import"./Select-B-hvHM5Y.js";import"./react-is.production.min-DUDD-a5e.js";import"./Menu-BhnrG3vD.js";import"./Popover-Db_KuLdV.js";import"./Modal-PRNVlI3H.js";import"./Fade-u7WpI_Fx.js";import"./useTheme-DLZNzqMo.js";import"./utils-CzoQ7LGy.js";import"./index-CmOK7BR8.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./mergeSlotProps-D2P12luN.js";import"./useSlotProps-CP3WIws3.js";import"./Portal-3LY7w8wx.js";import"./Paper-Dxqu9lYo.js";import"./Grow-BnLMXtPt.js";import"./MenuList-CRTvLIIN.js";import"./List-C41wlV70.js";import"./index-gJSNZJdW.js";import"./ListItemText-BozFVjry.js";import"./MenuButton-FEZ4Evq8.js";const et={title:"Design System/Composite Components/SelectWithActions",tags:["autodocs"],component:u},s=[{label:"Option 1",value:"option-1"},{label:"Option 2",value:"option-2"},{label:"Option 3",caption:"This is a caption.",value:"option-3"}],h=({onChange:o,...a})=>{const[m,r]=I.useState([]),c=l=>{r(l)};return t.jsx(R,{children:t.jsx(u,{value:m,onChange:c,...a})})},e={args:{options:s},render:h},n={args:{disabled:!0,options:s},render:h},T=({onChange:o,...a})=>{const[m,r]=I.useState([]),c=d=>{r(d)},l=()=>{r(s.map(d=>d.value))};return t.jsx(R,{children:t.jsx(u,{value:m,onChange:c,actions:t.jsx(H,{onClick:l,variant:"secondary",children:"Select All"}),...a})})},i={args:{options:s},render:T},y=t.jsx(B,{Icon:E}),F=t.jsx(B,{Icon:P}),D=[];for(let o=0;o<12;o++)D.push({icon:o%2===0?y:F,label:o%2===0?"Software Label":"Hardware Label",value:`option-${o}`});const p={args:{label:"Component",showFilterIcon:!1,options:D},render:h};var g,C,S;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
