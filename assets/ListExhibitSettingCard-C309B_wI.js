import{j as n}from"./jsx-runtime-4WDyTGeM.js";import{r as i}from"./index-Dl6G-zuu.js";import{h as p,M as u}from"./decendentUtils-CC_KlwFq.js";import{c as m}from"./WarningIcon-DZ-0i3Yx.js";import"./EditIcon-C_DteFoa.js";import"./LinkIcon-8pN4OFct.js";import"./SvgIcon-eIfT25mh.js";const l=({manifestIdsWithPendingChanges:a,disabled:r,settingList:e,onSelect:t,...s})=>{const d=i.useCallback(()=>{t(e)},[t,e]),o=i.useMemo(()=>p(e.manifestId,a),[a,e.manifestId]);return n.jsx(u,{label:e.listDisplay,icon:n.jsx(m,{}),marked:o,onClick:r?void 0:d,...s})};try{l.displayName="ListExhibitSettingCard",l.__docgenInfo={description:"",displayName:"ListExhibitSettingCard",props:{manifestIdsWithPendingChanges:{defaultValue:null,description:"",name:"manifestIdsWithPendingChanges",required:!1,type:{name:"Set<string>"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},settingList:{defaultValue:null,description:"",name:"settingList",required:!0,type:{name:"SettingList"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!0,type:{name:"(settingList: SettingList) => void"}},children:{defaultValue:null,description:"The content of the component.",name:"children",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"(Partial<CardClasses> & Partial<ClassNameMap<never>>)"}},action:{defaultValue:null,description:"",name:"action",required:!1,type:{name:"ReactNode"}},caption:{defaultValue:null,description:"",name:"caption",required:!1,type:{name:"string"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}}}}}catch{}export{l as L};
