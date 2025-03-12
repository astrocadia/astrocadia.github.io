import{j as r}from"./jsx-runtime-4WDyTGeM.js";import{r as t}from"./index-Dl6G-zuu.js";import{c as be}from"./index-eOQoo3sK.js";import{D as A}from"./datetime-B8oWyIaC.js";import{B as Y}from"./Button-CqlPB7zF.js";import{G as ke}from"./gumbandDateProvider-CvoOMVcz.js";import{D as Z}from"./DateTimeAccordionPicker-B90cdldZ.js";import{u as ve}from"./useMenu-BRyYbDm7.js";import{K as Re}from"./WarningIcon-DZ-0i3Yx.js";import"./EditIcon-C_DteFoa.js";import"./LinkIcon-8pN4OFct.js";import"./SvgIcon-eIfT25mh.js";import{M as De}from"./MenuToggleButton-BiJkqx1c.js";import{P as Ce}from"./PickersShortcuts-BAk9hKTh.js";import{P as Se}from"./Popover-BjNdltUU.js";import{T as Te}from"./ThemeProviderWrapper-Be5RUURM.js";import"./Button-C5OdypjM.js";import"./styled-Dt2_JBRt.js";import"./ButtonBase-Cp5BTdG6.js";import"./useTimeout-B4b6mSVs.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useForkRef-BDoLG09A.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./valueManagers-DfxpBv93.js";import"./useControlled-1Y2rT-1r.js";import"./DateTimeField-CWPomY9s.js";import"./ControlledTextField-VSi4Itg2.js";import"./TextField-DksRe_tn.js";import"./FormControl-DcAW02lu.js";import"./FormControl-CEdSnwwK.js";import"./utils-DoM3o7-Q.js";import"./useFormControl-f2Zb6bR-.js";import"./isMuiElement-DAcuSkv2.js";import"./FormHelperText-DtGLVIpz.js";import"./FormHelperText-B-lqvv-N.js";import"./formControlState-Dq1zat_P.js";import"./Input-BCsX3R8r.js";import"./createSvgIcon-CBDqugwZ.js";import"./createSvgIcon-D7FplSTg.js";import"./SvgIcon-DROc5w4B.js";import"./createChainedFunction-BO_9K8Jh.js";import"./ownerWindow-BN2rbQ_G.js";import"./ownerDocument-DW-IO8s5.js";import"./useId-BkqTTtmk.js";import"./InputAdornment-BcfgeZVH.js";import"./isHostComponent-DVu5iVWx.js";import"./Typography-8CCtzQ9L.js";import"./InputLabel-D8KLsBjt.js";import"./InputLabel-CoHzGKZp.js";import"./FormLabel-B9PyWtWF.js";import"./Select-tm-Q-jdf.js";import"./react-is.production.min-DUDD-a5e.js";import"./Menu-BhnrG3vD.js";import"./Popover-Db_KuLdV.js";import"./Modal-PRNVlI3H.js";import"./Fade-u7WpI_Fx.js";import"./useTheme-DLZNzqMo.js";import"./utils-CzoQ7LGy.js";import"./index-CmOK7BR8.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./mergeSlotProps-D2P12luN.js";import"./useSlotProps-CP3WIws3.js";import"./Portal-3LY7w8wx.js";import"./Paper-Dxqu9lYo.js";import"./Grow-BnLMXtPt.js";import"./MenuList-CRTvLIIN.js";import"./List-C41wlV70.js";import"./ListContext-BMbj8Y86.js";import"./DateTimeField-5vW2phr9.js";import"./validateDate-YOAbBWzt.js";import"./validateTime-DRbu2EZP.js";import"./useClearableField-fwONxECJ.js";import"./utils-C_cNsDj2.js";import"./index-B9Uzdy41.js";import"./IconButton-Djqk-I0k.js";import"./TextField-DVhuxQao.js";import"./DatePickerCalendar-BsfoRtKK.js";import"./IconButton-vPDIoB2n.js";import"./Tooltip-B5Gmbdco.js";import"./DatePickerCalendarHeader-CMFz_tXu.js";import"./PickerViewRoot-UUSpvxtv.js";import"./colorManipulator-CE5bNU3Z.js";import"./DatePickerActionBar-Ca7rIhaH.js";import"./useMediaQuery-BI_VLzxJ.js";import"./index-BfyspvgH.js";import"./DialogActions-b_8TWE7c.js";import"./ListItem-6Y_zk0LJ.js";import"./ListItemSecondaryAction-eJlCA5Er.js";import"./Chip-gErBvg2S.js";import"./index-DT9bQTP5.js";import"./index-B8_SLiQy.js";import"./FlowButton-BP4DMYyE.js";import"./date-BlWqZk5L.js";import"./shared-JYSZy3UM.js";import"./MultiSectionDigitalClock-BUZO3yUP.js";import"./DigitalClockSectionItem-BZ0EIkfP.js";import"./MenuItem-pwvj7SPr.js";import"./dividerClasses-Bm2W9hGA.js";import"./listItemTextClasses-Dmj8zJQC.js";import"./ListItemIcon-Bzpm1BdP.js";import"./MenuItem-BQL84gbW.js";/* empty css                                 */import"./InputAdornmentButton-Cc0xLUze.js";import"./Chip-Dz4tqHkS.js";import"./ListItem-DL2UJvRw.js";const T=n=>[A.now().minus(n),void 0],w=[{getValue:()=>T({hours:1}),label:"Last 1 hour"},{getValue:()=>T({days:1}),label:"Last 1 day",default:!0},{getValue:()=>T({days:3}),label:"Last 3 days"},{getValue:()=>T({days:7}),label:"Last 7 days"}],Ve=(n=w)=>n.find(i=>i.default)??null;Ve();const ie=[void 0,void 0],M=({className:n,buttonDateTimeFormat:i="MMM dd, yyyy T",disabled:x,defaultErrorMessage:y="Invalid Date and Time",minDateTime:m=A.fromMillis(0),maxDateTime:o=A.now(),onChange:s,shortcuts:le=w,onApplyShortcut:E=()=>{},appliedShortcut:f=null,value:P=[...ie],...me})=>{const pe=t.useId(),{anchorEl:ue,open:q,handleOpenMenu:F,handleCloseMenu:L}=ve(),[l,b]=t.useState(null),[I,B]=t.useState(!1),[j,U]=t.useState(!1),[G,O]=t.useState(!1),k=t.useMemo(()=>{const[e,a]=P;return a?P:[e,o]},[P,o]),[g,h]=k,[v,R]=t.useState(k),[p,u]=v,d=t.useMemo(()=>!p||!u?j:!(p<=u)||j,[j,u,p]),N=t.useMemo(()=>!d&&(I||G),[G,I,d]),W=t.useMemo(()=>{if(d)return y},[y,d]),H=t.useMemo(()=>{const e=(g==null?void 0:g.toFormat(i))||"",a=(h==null?void 0:h.toFormat(i))||"";return!e||!a?"Select Date Range":`${e} - ${a}`},[h,g,i]),de=t.useMemo(()=>f?f.label:H,[f,H]),[c,D]=t.useState(""),[C,ce]=t.useState("date"),K=t.useCallback(e=>{b(f),R(k),D(""),(e.type==="click"||e instanceof KeyboardEvent&&(e.key==="Enter"||e.key===" "))&&F(e)},[f,F,k]),fe=t.useCallback((e,a,X)=>{b(X?{label:X.label,getValue:()=>e}:null),B(!0);const[he,ye]=e;R([he??m,ye??o])},[o,m]),$=t.useCallback((e,a)=>{O(!0),R(a==="start"?[e,u]:[p,e]),b(null)},[u,p]),z=t.useCallback(e=>{U(!!e)},[]),S=t.useCallback(()=>{L(),U(!1),B(!1),O(!1)},[L]),ge=t.useCallback(()=>{N&&(v?(s==null||s(v),E(l)):l&&E(l),b(null),S())},[N,s,E,v,l,S]),Q=t.useCallback((e,a)=>{(c!==a||C!==e)&&D("")},[c,C]),J=t.useCallback((e,a)=>{D(C===e&&c===a?"":a),ce(e)},[c,C]);return r.jsxs(r.Fragment,{children:[r.jsx(De,{className:be("RangePicker",n),disabled:x,onClick:K,onKeyUp:K,open:q,startIcon:r.jsx(Re,{}),...me,children:de}),r.jsxs(Se,{anchorEl:ue,anchorOrigin:{vertical:"bottom",horizontal:"left"},className:"RangePicker__popover",classes:{paper:"RangePicker__popoverPaper"},id:pe,open:q,onClose:S,children:[r.jsx(Ce,{label:"Quick Select",items:le.map(e=>({...e,selected:(l==null?void 0:l.label)===e.label})),onChange:fe,isValid:()=>!0}),r.jsxs("div",{className:"RangePicker__dateTimePickers",children:[r.jsxs(ke,{children:[r.jsxs("div",{children:[r.jsx("div",{className:"RangePicker__heading",children:"Start Time"}),r.jsx(Z,{error:d,helperText:W,minDateTime:m,maxDateTime:o,onAdornmentClick:e=>J(e,"start"),onChange:e=>$(e??void 0,"start"),onError:z,onFocusWithin:e=>Q(e,"start"),open:c==="start",value:p||g})]}),r.jsxs("div",{children:[r.jsx("div",{className:"RangePicker__heading",children:"End Time"}),r.jsx(Z,{error:d,helperText:W,maxDateTime:o,minDateTime:m,onAdornmentClick:e=>J(e,"end"),onChange:e=>$(e??void 0,"end"),onError:z,onFocusWithin:e=>Q(e,"end"),open:c==="end",value:u??h})]})]}),r.jsxs("div",{className:"RangePicker__actionButtonsContainer",children:[r.jsx(Y,{onClick:S,children:"Cancel"}),r.jsx(Y,{disabled:!N,onClick:ge,variant:"secondary",children:"Apply"})]})]})]})]})};try{M.displayName="RangePicker",M.__docgenInfo={description:"",displayName:"RangePicker",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},appliedShortcut:{defaultValue:{value:"null"},description:`The format of the date and time labels. See the Luxon documentation for the full list of tokens.
@see https://moment.github.io/luxon/#/formatting?id=table-of-tokens`,name:"appliedShortcut",required:!1,type:{name:"Shortcut"}},buttonDateTimeFormat:{defaultValue:{value:"MMM dd, yyyy T"},description:"",name:"buttonDateTimeFormat",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},defaultErrorMessage:{defaultValue:{value:"Invalid Date and Time"},description:"",name:"defaultErrorMessage",required:!1,type:{name:"string"}},minDateTime:{defaultValue:{value:"DateTime.fromMillis(0)"},description:"",name:"minDateTime",required:!1,type:{name:"DateTime<boolean>"}},maxDateTime:{defaultValue:{value:"DateTime.now()"},description:"",name:"maxDateTime",required:!1,type:{name:"DateTime<boolean>"}},onApplyShortcut:{defaultValue:{value:"() => {}"},description:"",name:"onApplyShortcut",required:!1,type:{name:"((shortcut: Shortcut) => void)"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((value: DateTimeRangeValue) => void)"}},shortcuts:{defaultValue:{value:`[
  {
    getValue: () => getFromToNowRange({ hours: 1 }),
    label: 'Last 1 hour',
  },
  {
    getValue: () => getFromToNowRange({ days: 1 }),
    label: 'Last 1 day',
    default: true,
  },
  {
    getValue: () => getFromToNowRange({ days: 3 }),
    label: 'Last 3 days',
  },
  {
    getValue: () => getFromToNowRange({ days: 7 }),
    label: 'Last 7 days',
  },
]`},description:"",name:"shortcuts",required:!1,type:{name:"DateRangeShortcutItem[]"}},value:{defaultValue:{value:"[...DEFAULT_DATE_RANGE]"},description:"",name:"value",required:!1,type:{name:"DateTimeRangeValue"}}}}}catch{}const Vr={title:"Design System/Composite Components/RangePicker",tags:["autodocs"],component:M},se=({...n})=>{var o;const i=((o=w.find(s=>s.default))==null?void 0:o.getValue({isValid:()=>!0}))??ie,[x,y]=t.useState(i),m=s=>{y(s)};return r.jsx(Te,{children:r.jsx(M,{...n,onChange:m,value:x})})},V={render:se},_={args:{disabled:!0},render:se};var ee,te,re;V.parameters={...V.parameters,docs:{...(ee=V.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: Render
}`,...(re=(te=V.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};var ae,oe,ne;_.parameters={..._.parameters,docs:{...(ae=_.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: Render
}`,...(ne=(oe=_.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};const _r=["Default","Disabled"];export{V as Default,_ as Disabled,_r as __namedExportsOrder,Vr as default};
