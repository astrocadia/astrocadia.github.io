import{j as i}from"./jsx-runtime-4WDyTGeM.js";import{r as s}from"./index-Dl6G-zuu.js";import{i as u}from"./lang-BqISUGWn.js";import"./ControlledTextField-VSi4Itg2.js";import{T as p}from"./TextField-DksRe_tn.js";import{M as m}from"./MainPanelCoplanarSubpageBlockRow-B4TwGjcb.js";import{S as c}from"./SettingLabelWrapper-D-OOXB8v.js";const t=({setting:e,updatedValue:a,onChange:l,disabled:n})=>{const o=s.useCallback(d=>{const r=d.target.value||null;l(e.id,e.manifestId,r,r===e.value)},[l,e.id,e.manifestId,e.value]);return i.jsx(m,{className:"TextExhibitSetting",children:i.jsx(p,{label:i.jsx(c,{changed:!u(a)&&a!==e.value,children:e.display}),fullWidth:!0,orientation:"horizontal",placeholder:"",disabled:n||!e.write,value:a!==void 0?a:e.value??"",onChange:o})})};try{t.displayName="TextExhibitSetting",t.__docgenInfo={description:"",displayName:"TextExhibitSetting",props:{setting:{defaultValue:null,description:"",name:"setting",required:!0,type:{name:"TextSetting"}},updatedValue:{defaultValue:null,description:"",name:"updatedValue",required:!1,type:{name:"string | null"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(id: number, manifestId: string, value: string | null, reset: boolean) => void"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}export{t as T};
