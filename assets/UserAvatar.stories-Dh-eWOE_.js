import{j as o}from"./jsx-runtime-4WDyTGeM.js";import{U as h}from"./UserAvatar-RxWuoPFs.js";import{T as j}from"./ThemeProviderWrapper-Be5RUURM.js";import"./index-Dl6G-zuu.js";import"./index-eOQoo3sK.js";import"./Avatar-CcRSBCiw.js";import"./styled-Dt2_JBRt.js";import"./index-l62EWUf6.js";import"./createSvgIcon-D7FplSTg.js";import"./SvgIcon-DROc5w4B.js";import"./useSlot-BA5i3QaD.js";import"./mergeSlotProps-D2P12luN.js";import"./isHostComponent-DVu5iVWx.js";import"./useForkRef-BDoLG09A.js";import"./lang-BqISUGWn.js";const W={title:"Design System/Composite Components/UserAvatar",tags:["autodocs"],component:h,decorators:[e=>o.jsx(j,{children:o.jsx(e,{})})]},v={email:"ttowel@deeplocal.com",firstName:"Towelie",lastName:"Towel",profile_image:"https://static.wikia.nocookie.net/southpark/images/0/07/Towelie-0.png"},r={args:{user:v}},a={args:{user:{...v,profile_image:void 0}}},t="abcdefghijklmnopqrstuvwxyz",n=()=>{const e=Math.floor(Math.random()*1e3);return`${t[e%t.length]}random`};let m=0;const k=()=>(m+=1,{email:"oscar@deeplocal.com",firstName:n(),lastName:n(),profile_image:void 0,dladmin:!1,id:m}),s={render:({user:e,...y})=>{const N=Array.from({length:100},k);return o.jsx("div",{children:N.map((U,_)=>o.jsx(h,{user:U,...y},_))})}};var i,p,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    user
  }
}`,...(d=(p=r.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var c,l,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    user: {
      ...user,
      profile_image: undefined
    }
  }
}`,...(u=(l=a.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var g,f,x;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: ({
    user: _user,
    ...args
  }) => {
    const users: Array<User> = Array.from({
      length: 100
    }, getRandomUser);
    return <div>
        {users.map((iteratedUser, index) =>
      // eslint-disable-next-line react/no-array-index-key
      <UserAvatar key={index} user={iteratedUser} {...args} />)}
      </div>;
  }
}`,...(x=(f=s.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};const $=["Default","NoImage","ManyRandomNoImages"];export{r as Default,s as ManyRandomNoImages,a as NoImage,$ as __namedExportsOrder,W as default};
