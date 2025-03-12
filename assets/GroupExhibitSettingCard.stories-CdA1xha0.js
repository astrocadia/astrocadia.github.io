import{j as n}from"./jsx-runtime-4WDyTGeM.js";import{T as c}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{B as I}from"./Badge-B5h4WNES.js";import"./CountBadge-3ANCZLmo.js";import"./WarningIconBadge-D5uJWWbx.js";import{G as _}from"./GroupExhibitSettingCard-DxF21XjY.js";import"./index-Dl6G-zuu.js";import"./index-eOQoo3sK.js";import"./WarningIcon-YBpYPasA.js";import"./SvgIcon-C116lwZp.js";import"./SvgIcon-d6V0mnb4.js";import"./styled-DaAyEikA.js";import"./EditIcon-BPFrJ5Yh.js";import"./LinkIcon-BD5TNNoh.js";import"./decendentUtils-C8Fxy-xE.js";import"./LinkCard-CI8qBBEC.js";import"./CardContent-dRcBLWpc.js";import"./index-Bu4DXql-.js";import"./Dot-B-sjopOf.js";import"./CardButton-C0EAIDJe.js";import"./Card-BqSBDNBC.js";import"./Paper-B6pP1Hjl.js";import"./eventHelpers-DNy-jsQX.js";import"./exhibitManifest-ppDTbDFq.js";const q={title:"Design System/Composite Components/Exhibit Settings/GroupExhibitSettingCard",decorators:[u=>n.jsx(c,{children:n.jsx(u,{})})],tags:["autodocs"],component:_},e={args:{settingGroup:{id:1,ExhibitId:8,manifestId:"grouped_named_images",groupDisplay:"Grouped Named Images",listId:null,groupParent:null,schema:[{type:"TextInput",id:"image_group_title",display:"Image Group Title"},{type:"SettingsList",id:"images_list",display:"Images",schema:[{type:"FileSelection",id:"image_file",display:"Image"}]}],groupItemCount:0,order:null,settings:[{id:4,manifestId:"grouped_named_images/image_group_title",exhibitId:8,type:"TextInput",display:"Image Group Title",value:"dddsdfg",default:null,order:null,touchless:null,listId:null,groupId:1,items:[],read:!0,write:!0}],strapiContent:[],type:"SettingsGroup",settingGroups:[],settingLists:[{id:2,ExhibitId:8,manifestId:"grouped_named_images/images_list",listDisplay:"Images",listParent:null,schema:[{type:"FileSelection",id:"image_file",display:"Image"}],listItemCount:0,order:null,orderSelf:null,groupId:1,settinglistitems:[],type:"SettingsList"}]},onSelect:()=>{}}},t={args:{...e.args,action:n.jsx(I,{variant:"circle",label:"5"})}},i={args:{...e.args,disabled:!0}};var s,r,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    settingGroup: {
      id: 1,
      ExhibitId: 8,
      manifestId: 'grouped_named_images',
      groupDisplay: 'Grouped Named Images',
      listId: null,
      groupParent: null,
      schema: [{
        type: 'TextInput',
        id: 'image_group_title',
        display: 'Image Group Title'
      }, {
        type: 'SettingsList',
        id: 'images_list',
        display: 'Images',
        schema: [{
          type: 'FileSelection',
          id: 'image_file',
          display: 'Image'
        }]
      }],
      groupItemCount: 0,
      order: null,
      settings: [{
        id: 4,
        manifestId: 'grouped_named_images/image_group_title',
        exhibitId: 8,
        type: 'TextInput',
        display: 'Image Group Title',
        value: 'dddsdfg',
        default: null,
        order: null,
        touchless: null,
        listId: null,
        groupId: 1,
        items: [],
        read: true,
        write: true
      }],
      strapiContent: [],
      type: 'SettingsGroup',
      settingGroups: [],
      settingLists: [{
        id: 2,
        ExhibitId: 8,
        manifestId: 'grouped_named_images/images_list',
        listDisplay: 'Images',
        listParent: null,
        schema: [{
          type: 'FileSelection',
          id: 'image_file',
          display: 'Image'
        }],
        listItemCount: 0,
        order: null,
        orderSelf: null,
        groupId: 1,
        settinglistitems: [],
        type: 'SettingsList'
      }]
    },
    onSelect: () => {}
  }
}`,...(a=(r=e.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};var o,l,p;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    action: <Badge variant='circle' label='5' />
  }
}`,...(p=(l=t.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var m,d,g;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    disabled: true
  }
}`,...(g=(d=i.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};const z=["Default","WithAction","Disabled"];export{e as Default,i as Disabled,t as WithAction,z as __namedExportsOrder,q as default};
