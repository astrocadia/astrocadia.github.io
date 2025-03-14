import{j as n}from"./jsx-runtime-4WDyTGeM.js";import{T as b}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{U as C}from"./UserRoleList-DVo9szmI.js";import"./index-Dl6G-zuu.js";import"./index-eOQoo3sK.js";import"./UserSelectWithRemove-fgn1P9Gv.js";import"./SelectWithRemove-B5qstWpQ.js";import"./ControlledTextField-Dxj0VxPy.js";import"./TextField-ifwCBnOs.js";import"./FormControl-CtU1ru_y.js";import"./FormControl-BW8ARzgi.js";import"./styled-DaAyEikA.js";import"./utils-DoM3o7-Q.js";import"./useFormControl-f2Zb6bR-.js";import"./isMuiElement-DAcuSkv2.js";import"./FormHelperText-0C2Da3IP.js";import"./FormHelperText-h5eDLKOl.js";import"./formControlState-Dq1zat_P.js";import"./Input-CEgvW9FL.js";import"./createSvgIcon-3kI-rNei.js";import"./createSvgIcon-DWxpDd4T.js";import"./SvgIcon-d6V0mnb4.js";import"./useForkRef-BDoLG09A.js";import"./createChainedFunction-BO_9K8Jh.js";import"./ownerWindow-BN2rbQ_G.js";import"./ownerDocument-DW-IO8s5.js";import"./useTimeout-B4b6mSVs.js";import"./useId-BkqTTtmk.js";import"./useControlled-1Y2rT-1r.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./InputAdornment-mWN1sDOu.js";import"./isHostComponent-DVu5iVWx.js";import"./Typography-n3eyoqZV.js";import"./InputLabel-G3r7xtE-.js";import"./InputLabel-B0NhuLFQ.js";import"./FormLabel-Ca9udkQO.js";import"./WarningIcon-DSaUQRF0.js";import"./SvgIcon-DgPANJTo.js";import"./EditIcon-BarJNwgW.js";import"./LinkIcon-DxnDj71h.js";import"./Select-D6nlqWyC.js";import"./react-is.production.min-DUDD-a5e.js";import"./Menu-CnssX2u1.js";import"./Popover-B7dHjqFW.js";import"./Modal-_7pSkSOU.js";import"./Fade-Baf6ytQl.js";import"./useTheme-CYpYpbD_.js";import"./utils-Dh94M0rq.js";import"./TransitionGroupContext-xAci1nHd.js";import"./index-CmOK7BR8.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./mergeSlotProps-Dc5z_XIy.js";import"./useSlotProps-DeMrnH46.js";import"./Portal-3LY7w8wx.js";import"./Paper-B6pP1Hjl.js";import"./Grow-CF8DuDB2.js";import"./MenuList-CUm--JsH.js";import"./List-B5csL-18.js";import"./ListContext-BMbj8Y86.js";import"./MenuItem-BHqNz1ty.js";import"./ListItemIcon-CTz5rc-7.js";import"./MenuItem-2XNxwLO8.js";import"./ButtonBase-gXIT4mbS.js";import"./dividerClasses-UQEstWVR.js";import"./listItemTextClasses-CyVyitQV.js";import"./index-DXf7EplP.js";import"./ListItemText-CDFTHr1G.js";import"./index-Bu4DXql-.js";import"./Dot-B-sjopOf.js";import"./IconButton-BSilU2Vk.js";import"./IconButton-BRjw76_K.js";import"./Tooltip-CSQNJ7MT.js";import"./ListItemSecondaryAction-Be4W29yQ.js";import"./ListItemSecondaryAction-jR0jlMNJ.js";import"./ListItem-CazW7o9q.js";import"./ListItem-CgztQErV.js";import"./ListItemAvatar-CrQs31zG.js";import"./UserAvatar-DIbnBq_s.js";import"./Avatar-JI2_6BV5.js";import"./index-CmspVeCA.js";import"./useSlot-19y32CJk.js";import"./lang-BqISUGWn.js";import"./sortUsers-DvOFMruA.js";import"./sort-BNrymFaU.js";const o=[{id:6779,userId:49,role:"manager",email:"kbroflovski@deeplocal.com",firstName:"Kyle",lastName:"Broflovski",profile_image:"https://upload.wikimedia.org/wikipedia/en/2/25/KyleBroflovski.png"},{id:10731,userId:266,role:"viewer",email:"ecartman@deeplocal.com",firstName:"Eric",lastName:"Cartman",profile_image:"https://upload.wikimedia.org/wikipedia/en/thumb/7/77/EricCartman.png/220px-EricCartman.png"},{id:10641,userId:235,role:"manager",email:"smarsh@deeplocal.com",firstName:"Stan",lastName:"Marsh",profile_image:"https://upload.wikimedia.org/wikipedia/en/a/a7/StanMarsh.png"},{id:10499,userId:90,role:"manager",email:"kmccormick@deeplocal.com",firstName:"Kenny",lastName:"McCormick",profile_image:"https://upload.wikimedia.org/wikipedia/en/6/6f/KennyMcCormick.png"},{id:6789,userId:209,role:"viewer",email:"ttowel@deeplocal.com",firstName:"Towelie",lastName:"Towel",profile_image:"https://static.wikia.nocookie.net/southpark/images/0/07/Towelie-0.png"}],y=o[0].userId,L=r=>o.find(e=>e.id===r),E=(r,e)=>{const p=L(r);alert(`${p==null?void 0:p.firstName}'s role changed to ${e}`)};var c;const K=(c=o.find(r=>r.firstName==="Kenny"))==null?void 0:c.id,S=r=>{const e=L(r);if((e==null?void 0:e.id)===K){alert("OMG! YOU KILLED KENNY! 😭");return}alert(`${e==null?void 0:e.firstName} removed`)},ce={title:"Design System/Composite Components/UserRoleList",tags:["autodocs"],component:C,args:{onRoleChange:E,onRemoveUser:S,currentUserId:y},decorators:[r=>n.jsx(b,{children:n.jsx("div",{style:{padding:"1rem",backgroundColor:"var(--background-workspace-color)",height:"calc(100vh - 2rem)"},children:n.jsx(r,{})})})]},i={args:{users:o}},t={args:{users:[o[0]]}},s={args:{users:o.map(r=>({...r,profile_image:void 0}))}},m={args:{users:o.map(r=>r.firstName==="Towelie"?{...r,firstName:void 0,lastName:void 0}:r)}},O=()=>{const r=o.map(e=>({...e,profile_image:void 0}));return o.concat(r,r,r,r)},a={args:{users:O()}};var d,l,u;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    users: exhibitUsers
  }
}`,...(u=(l=i.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var g,f,N;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    users: [exhibitUsers[0]]
  }
}`,...(N=(f=t.parameters)==null?void 0:f.docs)==null?void 0:N.source}}};var h,k,w;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    users: exhibitUsers.map(user => ({
      ...user,
      profile_image: undefined
    }))
  }
}`,...(w=(k=s.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var v,U,x;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    users: exhibitUsers.map(user => {
      if (user.firstName === 'Towelie') {
        return {
          ...user,
          firstName: undefined,
          lastName: undefined
        };
      }
      return user;
    })
  }
}`,...(x=(U=m.parameters)==null?void 0:U.docs)==null?void 0:x.source}}};var T,_,I;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    users: getLotsOfUsers()
  }
}`,...(I=(_=a.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};const de=["Default","NoUsersOtherThanYou","NoAvatars","ATowelHasNoName","LongList"];export{m as ATowelHasNoName,i as Default,a as LongList,s as NoAvatars,t as NoUsersOtherThanYou,de as __namedExportsOrder,ce as default};
