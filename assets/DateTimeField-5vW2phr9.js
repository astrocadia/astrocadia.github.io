import{a as u,_ as D}from"./ThemeProviderWrapper-Be5RUURM.js";import{r as j}from"./index-Dl6G-zuu.js";import{b as S,e as k,a as _,s as E,g as K}from"./valueManagers-DfxpBv93.js";import{v as L}from"./validateDate-YOAbBWzt.js";import{v as O}from"./validateTime-DRbu2EZP.js";import{s as z,u as A,a as B}from"./useClearableField-fwONxECJ.js";import{j as H}from"./jsx-runtime-4WDyTGeM.js";import{u as U}from"./styled-Dt2_JBRt.js";import{T as W}from"./TextField-DVhuxQao.js";import{u as q}from"./useSlotProps-CP3WIws3.js";const G=({props:e,value:a,adapter:o})=>{const t=L({adapter:o,value:a,props:e});return t!==null?t:O({adapter:o,value:a,props:e})},J=e=>{var a,o,t,n,p,r,l,i;const s=S(),m=k(),P=((a=e.ampm)!=null?a:s.is12HourCycleInCurrentLocale())?s.formats.keyboardDateTime12h:s.formats.keyboardDateTime24h;return u({},e,{disablePast:(o=e.disablePast)!=null?o:!1,disableFuture:(t=e.disableFuture)!=null?t:!1,format:(n=e.format)!=null?n:P,disableIgnoringDatePartForTimeValidation:!!(e.minDateTime||e.maxDateTime),minDate:_(s,(p=e.minDateTime)!=null?p:e.minDate,m.minDate),maxDate:_(s,(r=e.maxDateTime)!=null?r:e.maxDate,m.maxDate),minTime:(l=e.minDateTime)!=null?l:e.minTime,maxTime:(i=e.maxDateTime)!=null?i:e.maxTime})},N=({props:e,inputRef:a})=>{const o=J(e),{forwardedProps:t,internalProps:n}=z(o,"date-time");return A({inputRef:a,forwardedProps:t,internalProps:n,valueManager:E,fieldValueManager:K,validator:G,valueType:"date-time"})},Q=["components","componentsProps","slots","slotProps","InputProps","inputProps"],X=["inputRef"],Y=["ref","onPaste","onKeyDown","inputMode","readOnly","clearable","onClear"],me=j.forwardRef(function(a,o){var t,n,p;const r=U({props:a,name:"MuiDateTimeField"}),{components:l,componentsProps:i,slots:s,slotProps:m,InputProps:c,inputProps:P}=r,I=D(r,Q),b=r,T=(t=(n=s==null?void 0:s.textField)!=null?n:l==null?void 0:l.TextField)!=null?t:W,x=q({elementType:T,externalSlotProps:(p=m==null?void 0:m.textField)!=null?p:i==null?void 0:i.textField,externalForwardedProps:I,ownerState:b}),{inputRef:v}=x,d=D(x,X);d.inputProps=u({},P,d.inputProps),d.InputProps=u({},c,d.InputProps);const F=N({props:d,inputRef:v}),{ref:$,onPaste:y,onKeyDown:g,inputMode:R,readOnly:w,clearable:M,onClear:h}=F,f=D(F,Y),{InputProps:C,fieldProps:V}=B({onClear:h,clearable:M,fieldProps:f,InputProps:f.InputProps,slots:s,slotProps:m,components:l,componentsProps:i});return H.jsx(T,u({ref:o},V,{InputProps:u({},C,{readOnly:w}),inputProps:u({},f.inputProps,{inputMode:R,onPaste:y,onKeyDown:g,ref:$})}))});export{me as D,G as v};
