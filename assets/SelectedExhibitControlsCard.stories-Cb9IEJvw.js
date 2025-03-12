import{j as e}from"./jsx-runtime-4WDyTGeM.js";import{T as S}from"./ThemeProviderWrapper-Be5RUURM.js";import{A as d}from"./ActionTriggerCardList-DY8VbWmE.js";import{P as E}from"./WarningIcon-6HpPPylF.js";import"./EditIcon-bNkpr5Ld.js";import"./LinkIcon-CKhuJxKk.js";import"./SvgIcon-76a5Fjoi.js";import{u as h}from"./useOrganizedControls-DyydSLie.js";import{S as f,a as b}from"./ScheduleSelectedPropertiesCard-JSEA0LhE.js";import{F as _}from"./FormLabel-CP4d05V2.js";import{M as j}from"./MainPanelCoplanarSubpageBlockRow-CRpxCcey.js";import"./index-Dl6G-zuu.js";import"./index-eOQoo3sK.js";import"./SvgIcon-DROc5w4B.js";import"./styled-Dt2_JBRt.js";import"./sorting-DnE3dIQc.js";import"./exhibitManifest-ppDTbDFq.js";import"./sort-BNrymFaU.js";import"./lang-BqISUGWn.js";import"./MainPanelCoplanarSubpageCard-bl9-rj31.js";import"./CardContent-DBkoNOmz.js";import"./MainPanelCoplanarSubpageCardHeader-BgOTwM10.js";import"./Badge-B5h4WNES.js";import"./CountBadge-3ANCZLmo.js";import"./WarningIconBadge-DGC6-Vfu.js";import"./Button-CxrygEYf.js";import"./Button-C5OdypjM.js";import"./ButtonBase-Cp5BTdG6.js";import"./useTimeout-B4b6mSVs.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useForkRef-BDoLG09A.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./FormLabel-B9PyWtWF.js";import"./formControlState-Dq1zat_P.js";import"./useFormControl-f2Zb6bR-.js";import"./Card-qdp0ebYD.js";import"./Paper-Dxqu9lYo.js";import"./eventHelpers-DNy-jsQX.js";const p=({display:t=""})=>e.jsx(j,{condensed:!0,className:"SelectedExhibitControlCard",children:e.jsx(_,{children:t})});try{p.displayName="SelectedExhibitControlCard",p.__docgenInfo={description:"",displayName:"SelectedExhibitControlCard",props:{display:{defaultValue:{value:""},description:"",name:"display",required:!1,type:{name:"string"}}}}}catch{}const a=({selectedControls:t,onButtonClick:g})=>{const[r,l]=h(t);return e.jsxs(f,{className:"SelectedExhibitControlsCard",label:"Controls",buttonProps:{onClick:g,...b},badgeProps:{Icon:E},children:[!!(r!=null&&r.length)&&e.jsx(d,{children:r.map(o=>e.jsx(p,{display:o.display},o.id))}),l==null?void 0:l.map(o=>e.jsx(d,{title:o.display,children:o.items.map(s=>e.jsx(p,{display:s.display},s.id))},o.id))]})};try{a.displayName="SelectedExhibitControlsCard",a.__docgenInfo={description:"",displayName:"SelectedExhibitControlsCard",props:{selectedControls:{defaultValue:null,description:"",name:"selectedControls",required:!0,type:{name:"Control[]"}},onButtonClick:{defaultValue:null,description:"",name:"onButtonClick",required:!0,type:{name:"() => void"}}}}}catch{}const se={title:"Design System/Composite Components/Exhibit Scheduling/SelectedExhibitControlsCard",decorators:[t=>e.jsx(S,{children:e.jsx(t,{})})],tags:["autodocs"],component:a,parameters:{design:{type:"figma",url:"https://www.figma.com/design/ObQmdiOj0v670OEemKDmhU/Exhibit-Settings?node-id=2196-34&m=dev"}},args:{selectedControls:[],onButtonClick:()=>{alert("Button clicked")}}},i={},n={args:{selectedControls:[{display:"Example Control 1",type:"Single",id:1},{display:"Example Control 2",type:"Single",id:2},{display:"Example Control 3",type:"Single",id:3},{display:"Example Control Group",type:"Group",id:4,items:[{display:"Example Group Control 1",type:"Single",id:"5"},{display:"Example Group Control 2",type:"Single",id:"6"},{display:"Example Group Control 3",type:"Single",id:"7"}]}]}};var m,c,C;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(C=(c=i.parameters)==null?void 0:c.docs)==null?void 0:C.source}}};var u,y,x;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    selectedControls: [{
      display: 'Example Control 1',
      type: 'Single',
      id: 1
    }, {
      display: 'Example Control 2',
      type: 'Single',
      id: 2
    }, {
      display: 'Example Control 3',
      type: 'Single',
      id: 3
    }, {
      display: 'Example Control Group',
      type: 'Group',
      id: 4,
      items: [{
        display: 'Example Group Control 1',
        type: 'Single',
        id: '5'
      }, {
        display: 'Example Group Control 2',
        type: 'Single',
        id: '6'
      }, {
        display: 'Example Group Control 3',
        type: 'Single',
        id: '7'
      }]
    }] as unknown as Array<Control>
  }
}`,...(x=(y=n.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};const de=["Default","WithSelectedControls"];export{i as Default,n as WithSelectedControls,de as __namedExportsOrder,se as default};
