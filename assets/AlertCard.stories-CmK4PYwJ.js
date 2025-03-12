import{j as e}from"./jsx-runtime-4WDyTGeM.js";import{T as Q}from"./ThemeProviderWrapper-Be5RUURM.js";import{r as W}from"./index-Dl6G-zuu.js";import{c as w}from"./index-eOQoo3sK.js";import{R as J}from"./RecipientIndicator-BrPU-5dN.js";import{C as O}from"./CardContent-DBkoNOmz.js";import{C as K}from"./Card-sUXJUunV.js";import{S as t}from"./Skeleton-CFd2Vw-J.js";import{C as X}from"./CardButton-BnWbekV9.js";import{b as Y}from"./WarningIcon-DZ-0i3Yx.js";import"./EditIcon-C_DteFoa.js";import"./LinkIcon-8pN4OFct.js";import"./SvgIcon-eIfT25mh.js";import"./UserAvatar-BldJwi0D.js";import"./Avatar-CcRSBCiw.js";import"./styled-Dt2_JBRt.js";import"./index-l62EWUf6.js";import"./createSvgIcon-D7FplSTg.js";import"./SvgIcon-DROc5w4B.js";import"./useSlot-BA5i3QaD.js";import"./mergeSlotProps-D2P12luN.js";import"./isHostComponent-DVu5iVWx.js";import"./useForkRef-BDoLG09A.js";import"./lang-BqISUGWn.js";import"./eventHelpers-DNy-jsQX.js";import"./Paper-Dxqu9lYo.js";import"./colorManipulator-CE5bNU3Z.js";const c=({className:r})=>e.jsx(K,{className:w("AlertCardSkeleton",r),children:e.jsxs(O,{children:[e.jsx("div",{className:"AlertCard__iconContainer",children:e.jsx(t,{variant:"circular",className:"AlertCard__iconSkeleton"})}),e.jsxs("div",{className:"AlertCard__titleContainer",children:[e.jsx(t,{className:"AlertCard__titleSkeleton"}),e.jsx(t,{className:"AlertCard__subtitleSkeleton"})]}),e.jsx(t,{variant:"circular",className:"AlertCard__recipientIndicatorSkeleton"})]})});try{c.displayName="AlertCardSkeleton",c.__docgenInfo={description:"",displayName:"AlertCardSkeleton",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"The content of the component.",name:"children",required:!1,type:{name:"ReactNode"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"(Partial<CardClasses> & Partial<ClassNameMap<never>>)"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}}}}}catch{}const u=({className:r,currentUser:B,userCount:R,title:D,subtitle:L,isCurrentUserIncluded:H,icon:M,loading:z=!1,...m})=>{const[F,G]=W.useState(!1);return z?e.jsx(c,{className:r,...m}):e.jsx(X,{className:w("AlertCard",r),...m,children:e.jsxs(O,{children:[e.jsx("div",{className:"AlertCard__iconContainer",children:e.jsx(M,{})}),e.jsxs("div",{className:"AlertCard__titleContainer",children:[e.jsx("div",{className:"AlertCard__title",children:D}),e.jsx("div",{className:"AlertCard__subtitle",children:L})]}),e.jsx(J,{open:F,userCount:R,currentUser:B,isCurrentUserIncluded:H,onOpenChange:G})]})})};try{u.displayName="AlertCard",u.__docgenInfo={description:"",displayName:"AlertCard",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},subtitle:{defaultValue:null,description:"",name:"subtitle",required:!0,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:'OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }'}},selected:{defaultValue:null,description:"",name:"selected",required:!1,type:{name:"boolean"}},onSelectedChange:{defaultValue:null,description:"",name:"onSelectedChange",required:!1,type:{name:"((selected: boolean) => void)"}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean"}},currentUser:{defaultValue:null,description:"",name:"currentUser",required:!1,type:{name:'Pick<User, "firstName" | "lastName" | "email" | "profile_image">'}},userCount:{defaultValue:null,description:"",name:"userCount",required:!0,type:{name:"number"}},isCurrentUserIncluded:{defaultValue:null,description:"",name:"isCurrentUserIncluded",required:!0,type:{name:"boolean"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},children:{defaultValue:null,description:"The content of the component.",name:"children",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"(Partial<CardClasses> & Partial<ClassNameMap<never>>)"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}}}}}catch{}const P=()=>{alert("I have no idea what's going on...  😳")},ke={title:"Design System/Composite Components/AlertCard",component:u,args:{userCount:10,icon:Y,title:"Exhibit Health",subtitle:"Updates to Exhibit health status",isCurrentUserIncluded:!0,onClick:void 0,currentUser:{email:"ttowel@deeplocal.com",firstName:"Towelie",lastName:"Towel",profile_image:"https://static.wikia.nocookie.net/southpark/images/0/07/Towelie-0.png"}},decorators:[r=>e.jsx(Q,{children:e.jsx("div",{style:{backgroundColor:"var(--background-workspace-color)",padding:"2rem"},children:e.jsx(r,{})})})],parameters:{design:{type:"figma",url:"https://www.figma.com/design/TIkbnQjAOnz1BqhDFohAS5/Exhibit-Alerts?node-id=2275-16977&m=dev"}}},a={},s={args:{isCurrentUserIncluded:!1}},n={args:{onClick:P}},l={args:{selected:!0}},o={args:{selected:!0,onClick:P}},i={args:{loading:!0}},d={args:{title:"Exhibit Health: Updates to Exhibit health status",subtitle:"This is a long subtitle to test how the card handles long strings of text."}};var p,f,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(g=(f=a.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var h,C,y;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    isCurrentUserIncluded: false
  }
}`,...(y=(C=s.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};var _,x,N;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    onClick
  }
}`,...(N=(x=n.parameters)==null?void 0:x.docs)==null?void 0:N.source}}};var S,b,j;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    selected: true
  }
}`,...(j=(b=l.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};var k,v,A;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    selected: true,
    onClick
  }
}`,...(A=(v=o.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};var q,V,I;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...(I=(V=i.parameters)==null?void 0:V.docs)==null?void 0:I.source}}};var T,E,U;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    title: 'Exhibit Health: Updates to Exhibit health status',
    subtitle: 'This is a long subtitle to test how the card handles long strings of text.'
  }
}`,...(U=(E=d.parameters)==null?void 0:E.docs)==null?void 0:U.source}}};const ve=["Default","CurrentUserNotIncluded","Button","Selected","ButtonSelected","Loading","LongTitles"];export{n as Button,o as ButtonSelected,s as CurrentUserNotIncluded,a as Default,i as Loading,d as LongTitles,l as Selected,ve as __namedExportsOrder,ke as default};
