import{j as t}from"./jsx-runtime-4WDyTGeM.js";import{r as i}from"./index-Dl6G-zuu.js";import{c as y}from"./index-eOQoo3sK.js";import{z as U}from"./index-dIKOytT1.js";import"./ControlledTextField-VSi4Itg2.js";import{T as h}from"./TextField-DksRe_tn.js";import{I as E}from"./InputAdornment-BcfgeZVH.js";import{I as g}from"./InputAdornmentButtonText-BRX1648f.js";import{I as j}from"./InputAdornmentButton-Cc0xLUze.js";import{i as C,e as F}from"./WarningIcon-DZ-0i3Yx.js";import"./EditIcon-C_DteFoa.js";import"./LinkIcon-8pN4OFct.js";import"./SvgIcon-eIfT25mh.js";const S=U.string().email("Invalid email format"),a="User already exists.",f=({currentUserEmails:d,activeEmail:o,setActiveEmail:r,isInviteActive:c,onInvite:l})=>{const[u,m]=i.useState(o),[e,n]=i.useState(null);i.useEffect(()=>{e||m(o)},[o,e]);const v=p=>{const s=p.target.value;m(s);const I=S.safeParse(s);if(!I.success){r(""),n(I.error.issues[0].message);return}if(d.includes(s.toLowerCase())){r(""),n(a);return}n(null),r(s)},_=i.useCallback(p=>{p.key==="Enter"&&!e&&l()},[e,l]),x=()=>{m(""),r(""),n(null)};return t.jsx(h,{value:u,className:y("UserInviteInputField",{UserInviteInputField__inviteActive:c}),placeholder:"ex. oscar@company.com",onChange:v,error:e===a,fullWidth:!0,helperText:e===a&&a,InputProps:{onKeyUp:_,endAdornment:t.jsx(E,{position:"end",children:c?!!u&&t.jsx(j,{className:"UserInviteInputField__button",onClick:x,children:t.jsx(F,{})}):t.jsx(g,{className:"UserInviteInputField__button",title:"Invite",endIcon:t.jsx(C,{}),disabled:!u||!!e,onClick:l,variant:"ghost"})})}})};try{f.displayName="UserInviteInputField",f.__docgenInfo={description:"",displayName:"UserInviteInputField",props:{currentUserEmails:{defaultValue:null,description:"",name:"currentUserEmails",required:!0,type:{name:"string[]"}},activeEmail:{defaultValue:null,description:"",name:"activeEmail",required:!0,type:{name:"string"}},setActiveEmail:{defaultValue:null,description:"",name:"setActiveEmail",required:!0,type:{name:"(email: string) => void"}},isInviteActive:{defaultValue:null,description:"",name:"isInviteActive",required:!0,type:{name:"boolean"}},onInvite:{defaultValue:null,description:"",name:"onInvite",required:!0,type:{name:"() => void"}}}}}catch{}export{f as U};
