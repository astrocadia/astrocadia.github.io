import{j as n}from"./jsx-runtime-4WDyTGeM.js";import{r as e}from"./index-Dl6G-zuu.js";import{U as S}from"./UserRoleListDialog-CYRYRia8.js";import{U as C}from"./UserInviteConfirmedDialog-CueTV4vx.js";const t={CONFIRM:"confirm",USERS:"users"},p=500,c=({onInviteUser:r,open:U,onClose:l,...f})=>{const[g,i]=e.useState(),[a,s]=e.useState(t.USERS),[o,u]=e.useState(!1),d=e.useCallback(()=>{u(!0),setTimeout(()=>{l(),u(!1),s(t.USERS),i(void 0)},p)},[l]),y=e.useCallback(()=>{s(t.USERS),setTimeout(()=>{i(void 0)},p)},[]),v=e.useCallback(async(m,R)=>{try{await r(m,R),s(t.CONFIRM),i(m)}catch{}},[r]);return U?n.jsxs(n.Fragment,{children:[n.jsx(C,{email:g??"",onDone:d,onBackToUsers:y,open:a===t.CONFIRM&&!o}),n.jsx(S,{onClose:d,onInviteUser:v,open:a===t.USERS&&!o,...f})]}):null};try{c.displayName="UserManagementDialogs",c.__docgenInfo={description:"",displayName:"UserManagementDialogs",props:{onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},users:{defaultValue:null,description:"",name:"users",required:!0,type:{name:"EntityUser[]"}},currentUserId:{defaultValue:null,description:"",name:"currentUserId",required:!0,type:{name:"number"}},onRoleChange:{defaultValue:null,description:"",name:"onRoleChange",required:!0,type:{name:"(userId: number, role: UserRole) => void"}},onRemoveUser:{defaultValue:null,description:"",name:"onRemoveUser",required:!0,type:{name:"(userId: number) => void"}},onInviteUser:{defaultValue:null,description:"",name:"onInviteUser",required:!0,type:{name:"(email: string, role: UserRole) => Promise<unknown>"}},roles:{defaultValue:null,description:"",name:"roles",required:!1,type:{name:"UserRoleWithTitles[]"}},inviteTitle:{defaultValue:null,description:"",name:"inviteTitle",required:!0,type:{name:"string"}},inviteSubtitle:{defaultValue:null,description:"",name:"inviteSubtitle",required:!0,type:{name:"string"}},listTitle:{defaultValue:null,description:"",name:"listTitle",required:!0,type:{name:"string"}},listSubtitle:{defaultValue:null,description:"",name:"listSubtitle",required:!0,type:{name:"string"}}}}}catch{}export{c as U};
