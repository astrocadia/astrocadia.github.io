import{j as n}from"./jsx-runtime-4WDyTGeM.js";import{T as b}from"./ThemeProviderWrapper-Be5RUURM.js";import{U as C}from"./UserRoleList-BKv37LRx.js";import"./index-Dl6G-zuu.js";import"./index-eOQoo3sK.js";import"./UserSelectWithRemove-BsUePPvl.js";import"./SelectWithRemove-BvBLhFDE.js";import"./ControlledTextField-BIRBLCqk.js";import"./TextField-H_O97xAh.js";import"./FormControl-BB9KS_Cj.js";import"./FormControl-CEdSnwwK.js";import"./styled-Dt2_JBRt.js";import"./utils-DoM3o7-Q.js";import"./useFormControl-f2Zb6bR-.js";import"./isMuiElement-DAcuSkv2.js";import"./FormHelperText-DeZFn-fQ.js";import"./FormHelperText-B-lqvv-N.js";import"./formControlState-Dq1zat_P.js";import"./Input-KeXyPRhr.js";import"./createSvgIcon-CBDqugwZ.js";import"./createSvgIcon-D7FplSTg.js";import"./SvgIcon-DROc5w4B.js";import"./useForkRef-BDoLG09A.js";import"./createChainedFunction-BO_9K8Jh.js";import"./ownerWindow-BN2rbQ_G.js";import"./ownerDocument-DW-IO8s5.js";import"./useTimeout-B4b6mSVs.js";import"./useId-BkqTTtmk.js";import"./useControlled-1Y2rT-1r.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./InputAdornment-B5oVS-sc.js";import"./isHostComponent-DVu5iVWx.js";import"./Typography-8CCtzQ9L.js";import"./InputLabel-DM-4l14M.js";import"./InputLabel-CoHzGKZp.js";import"./FormLabel-B9PyWtWF.js";import"./WarningIcon-6HpPPylF.js";import"./SvgIcon-76a5Fjoi.js";import"./EditIcon-bNkpr5Ld.js";import"./LinkIcon-CKhuJxKk.js";import"./Select-B-hvHM5Y.js";import"./react-is.production.min-DUDD-a5e.js";import"./Menu-BhnrG3vD.js";import"./Popover-Db_KuLdV.js";import"./Modal-PRNVlI3H.js";import"./Fade-u7WpI_Fx.js";import"./useTheme-DLZNzqMo.js";import"./utils-CzoQ7LGy.js";import"./TransitionGroupContext-xAci1nHd.js";import"./index-CmOK7BR8.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./mergeSlotProps-D2P12luN.js";import"./useSlotProps-CP3WIws3.js";import"./Portal-3LY7w8wx.js";import"./Paper-Dxqu9lYo.js";import"./Grow-BnLMXtPt.js";import"./MenuList-CRTvLIIN.js";import"./List-C41wlV70.js";import"./ListContext-BMbj8Y86.js";import"./MenuItem-DBCTIAlS.js";import"./ListItemIcon-Bzpm1BdP.js";import"./MenuItem-pwvj7SPr.js";import"./ButtonBase-Cp5BTdG6.js";import"./dividerClasses-Bm2W9hGA.js";import"./listItemTextClasses-Dmj8zJQC.js";import"./index-gJSNZJdW.js";import"./ListItemText-BozFVjry.js";import"./index-Bu4DXql-.js";import"./Dot-B-sjopOf.js";import"./IconButton-DYHDsDKu.js";import"./IconButton-Djqk-I0k.js";import"./Tooltip-B5Gmbdco.js";import"./ListItemSecondaryAction-CQsrZ-3O.js";import"./ListItemSecondaryAction-eJlCA5Er.js";import"./ListItem-DL2UJvRw.js";import"./ListItem-6Y_zk0LJ.js";import"./ListItemAvatar-BsJVMCC2.js";import"./UserAvatar-RxWuoPFs.js";import"./Avatar-CcRSBCiw.js";import"./index-l62EWUf6.js";import"./useSlot-BA5i3QaD.js";import"./lang-BqISUGWn.js";import"./sortUsers-DvOFMruA.js";import"./sort-BNrymFaU.js";const o=[{id:6779,userId:49,role:"manager",email:"kbroflovski@deeplocal.com",firstName:"Kyle",lastName:"Broflovski",profile_image:"https://upload.wikimedia.org/wikipedia/en/2/25/KyleBroflovski.png"},{id:10731,userId:266,role:"viewer",email:"ecartman@deeplocal.com",firstName:"Eric",lastName:"Cartman",profile_image:"https://upload.wikimedia.org/wikipedia/en/thumb/7/77/EricCartman.png/220px-EricCartman.png"},{id:10641,userId:235,role:"manager",email:"smarsh@deeplocal.com",firstName:"Stan",lastName:"Marsh",profile_image:"https://upload.wikimedia.org/wikipedia/en/a/a7/StanMarsh.png"},{id:10499,userId:90,role:"manager",email:"kmccormick@deeplocal.com",firstName:"Kenny",lastName:"McCormick",profile_image:"https://upload.wikimedia.org/wikipedia/en/6/6f/KennyMcCormick.png"},{id:6789,userId:209,role:"viewer",email:"ttowel@deeplocal.com",firstName:"Towelie",lastName:"Towel",profile_image:"https://static.wikia.nocookie.net/southpark/images/0/07/Towelie-0.png"}],y=o[0].userId,L=r=>o.find(e=>e.id===r),E=(r,e)=>{const p=L(r);alert(`${p==null?void 0:p.firstName}'s role changed to ${e}`)};var c;const K=(c=o.find(r=>r.firstName==="Kenny"))==null?void 0:c.id,S=r=>{const e=L(r);if((e==null?void 0:e.id)===K){alert("OMG! YOU KILLED KENNY! 😭");return}alert(`${e==null?void 0:e.firstName} removed`)},ce={title:"Design System/Composite Components/UserRoleList",tags:["autodocs"],component:C,args:{onRoleChange:E,onRemoveUser:S,currentUserId:y},decorators:[r=>n.jsx(b,{children:n.jsx("div",{style:{padding:"1rem",backgroundColor:"var(--background-workspace-color)",height:"calc(100vh - 2rem)"},children:n.jsx(r,{})})})]},i={args:{users:o}},t={args:{users:[o[0]]}},s={args:{users:o.map(r=>({...r,profile_image:void 0}))}},m={args:{users:o.map(r=>r.firstName==="Towelie"?{...r,firstName:void 0,lastName:void 0}:r)}},O=()=>{const r=o.map(e=>({...e,profile_image:void 0}));return o.concat(r,r,r,r)},a={args:{users:O()}};var d,l,u;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
