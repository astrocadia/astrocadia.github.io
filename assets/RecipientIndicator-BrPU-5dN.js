import{j as e}from"./jsx-runtime-4WDyTGeM.js";import{c as o}from"./index-eOQoo3sK.js";import{r as m}from"./index-Dl6G-zuu.js";import{U as _}from"./UserAvatar-BldJwi0D.js";import{R as p}from"./WarningIcon-DZ-0i3Yx.js";import"./EditIcon-C_DteFoa.js";import"./LinkIcon-8pN4OFct.js";import"./SvgIcon-eIfT25mh.js";import{a as f}from"./eventHelpers-DNy-jsQX.js";const n="You",I="Close avatar group",R="Open avatar group",a=({className:i,currentUser:s,userCount:c,isCurrentUserIncluded:u,open:t,onOpenChange:r})=>{const l=m.useMemo(()=>{if(!r)return{};const d=f(()=>r==null?void 0:r(!t));return{role:"button",tabIndex:0,"aria-label":t?I:R,"aria-expanded":t,onKeyUp:d,onMouseEnter:()=>r==null?void 0:r(!0),onMouseLeave:()=>r==null?void 0:r(!1),onFocus:()=>r==null?void 0:r(!0),onBlur:()=>r==null?void 0:r(!1)}},[t,r]);return e.jsxs("div",{className:o("RecipientIndicator",i,{RecipientIndicator__open:t,RecipientIndicator__button:r}),children:[s&&u&&e.jsxs("div",{className:"RecipientIndicator__currentUser",...l,children:[e.jsx(_,{user:s}),e.jsx("div",{className:"RecipientIndicator__youLabel",children:n})]}),e.jsxs("div",{className:"RecipientIndicator__userCount",children:[e.jsx(p,{}),e.jsx("div",{className:"RecipientIndicator__userCountLabel",children:c})]})]})};try{a.displayName="RecipientIndicator",a.__docgenInfo={description:"",displayName:"RecipientIndicator",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},currentUser:{defaultValue:null,description:"",name:"currentUser",required:!1,type:{name:'Pick<User, "firstName" | "lastName" | "email" | "profile_image">'}},userCount:{defaultValue:null,description:"",name:"userCount",required:!0,type:{name:"number"}},isCurrentUserIncluded:{defaultValue:null,description:"",name:"isCurrentUserIncluded",required:!0,type:{name:"boolean"}},open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},onOpenChange:{defaultValue:null,description:"",name:"onOpenChange",required:!1,type:{name:"((open: boolean) => void)"}}}}}catch{}export{a as R};
