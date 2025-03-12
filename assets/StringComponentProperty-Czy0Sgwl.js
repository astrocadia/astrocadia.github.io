import{j as V}from"./jsx-runtime-4WDyTGeM.js";import{r as e}from"./index-Dl6G-zuu.js";import{z as b}from"./index-dIKOytT1.js";import{i as M}from"./lang-BqISUGWn.js";import"./ControlledTextField-DVeGBoB-.js";import{T as N}from"./TextField-W3uF_ooE.js";import{C as I}from"./CustomHardwareFieldPropertyWrapper-Cw72Oe9H.js";import{c as w,S as U}from"./constants-nrIgCRYB.js";import{b as q}from"./eventHelpers-DNy-jsQX.js";const _=({property:r,propertyName:E,disabled:s,onSendValue:y,mutationStateAndActions:x})=>{const[t,i]=e.useState(null),[A,c]=e.useState(!1),[n,d]=e.useState(null),[p,m]=e.useState(null),o=e.useRef(!1),h=b.string().max(r.arrayLength??1/0,`${w} ${r.arrayLength??1/0}`).nullish(),{isSuccess:a,isLoading:l,resetUpdatePropertyMutation:g}=x,u=e.useMemo(()=>r.value&&!Array.isArray(r.value[0])?r.value[0]:null,[r.value]);e.useEffect(()=>{o.current||d(u),c(o.current)},[u]);const f=e.useMemo(()=>t!==null&&t!==n,[t,n]),C=e.useCallback(()=>{s||l||a||y([f?t??"":n])},[y,f,n,t,s,l,a]);e.useEffect(()=>{a&&(o.current=!1,setTimeout(()=>{d(t!==null?t??"":n??""),i(null),c(!1),g()},U))},[a,l,t,n,g]);const P=e.useCallback(()=>{o.current=!1,i(null),d(u??null),c(!1),m(null)},[u]),R=e.useCallback(T=>{const S=T.target.value||"";i(S),o.current=!0;const v=h.safeParse(S);if(!M(S)&&!v.success){m(v.error.issues[0].message);return}m(null)},[h]);return V.jsx(I,{className:"StringComponentProperty",propertyName:E,propertyChanged:f,settable:r.settable,disabled:s||!!p,loading:l,success:a,showRefreshButton:A,onRefresh:P,onSendValue:C,children:r.settable?V.jsx(N,{error:!!p,helperText:p,fullWidth:!0,orientation:"horizontal",placeholder:"Enter a new text value",disabled:s,value:t!==null?t:n||"",onChange:R,onKeyDown:!s&&!l&&!a?q(C):void 0}):u??"—"})};try{_.displayName="StringComponentProperty",_.__docgenInfo={description:"",displayName:"StringComponentProperty",props:{property:{defaultValue:null,description:"",name:"property",required:!0,type:{name:"StringProperty"}},propertyName:{defaultValue:null,description:"",name:"propertyName",required:!0,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},onSendValue:{defaultValue:null,description:"",name:"onSendValue",required:!0,type:{name:"(values: (string | string[])[] | undefined) => void"}},mutationStateAndActions:{defaultValue:null,description:"",name:"mutationStateAndActions",required:!0,type:{name:"{ isLoading: boolean; isSuccess: boolean; resetUpdatePropertyMutation: () => void; }"}}}}}catch{}export{_ as S};
