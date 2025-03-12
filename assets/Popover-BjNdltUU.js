import{j as t}from"./jsx-runtime-4WDyTGeM.js";import{c as a}from"./index-eOQoo3sK.js";import{P as r}from"./Popover-Db_KuLdV.js";const n=({className:e,...o})=>t.jsx(r,{className:a("Popover",e),...o});try{n.displayName="Popover",n.__docgenInfo={description:"",displayName:"Popover",props:{children:{defaultValue:null,description:"The content of the component.",name:"children",required:!1,type:{name:"ReactNode"}},components:{defaultValue:{value:"{}"},description:"The components used for each slot inside.\n\nThis prop is an alias for the `slots` prop.\nIt's recommended to use the `slots` prop instead.",name:"components",required:!1,type:{name:"{ Root?: ElementType<any, keyof IntrinsicElements>; Backdrop?: ElementType<any, keyof IntrinsicElements>; } | undefined"}},className:{defaultValue:null,description:"@ignore",name:"className",required:!1,type:{name:"string"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"Partial<PopoverClasses>"}},action:{defaultValue:null,description:`A ref for imperative actions.
It currently only supports updatePosition() action.`,name:"action",required:!1,type:{name:"Ref<PopoverActions>"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},elevation:{defaultValue:{value:"8"},description:"The elevation of the popover.",name:"elevation",required:!1,type:{name:"number"}},open:{defaultValue:null,description:"If `true`, the component is shown.",name:"open",required:!0,type:{name:"boolean"}},slots:{defaultValue:{value:"{}"},description:"The components used for each slot inside.",name:"slots",required:!1,type:{name:"{ root?: ElementType<any, keyof IntrinsicElements>; paper?: ElementType<any, keyof IntrinsicElements>; } | undefined"}},slotProps:{defaultValue:{value:"{}"},description:`The extra props for the slot components.
You can override the existing props or add new ones.`,name:"slotProps",required:!1,type:{name:'{ root?: SlotComponentProps<OverridableComponent<ModalTypeMap<"div", {}>>, {}, ModalOwnerState>; paper?: SlotComponentProps<...>; } | undefined'}},transformOrigin:{defaultValue:{value:`{
vertical: 'top',
horizontal: 'left',
}`},description:`This is the point on the popover which
will attach to the anchor's origin.

Options:
vertical: [top, center, bottom, x(px)];
horizontal: [left, center, right, x(px)].`,name:"transformOrigin",required:!1,type:{name:"PopoverOrigin"}},transitionDuration:{defaultValue:{value:"'auto'"},description:"Set to 'auto' to automatically calculate transition time based on height.",name:"transitionDuration",required:!1,type:{name:'number | "auto" | { appear?: number; enter?: number; exit?: number | undefined; } | { appear?: number | undefined; enter?: number | undefined; exit?: number | undefined; } | undefined'}},container:{defaultValue:null,description:"An HTML element, component instance, or function that returns either.\nThe `container` will passed to the Modal component.\n\nBy default, it uses the body of the anchorEl's top-level document object,\nso it's simply `document.body` most of the time.",name:"container",required:!1,type:{name:"Element | (() => Element | null) | null"}},componentsProps:{defaultValue:{value:"{}"},description:"The extra props for the slot components.\nYou can override the existing props or add new ones.\n\nThis prop is an alias for the `slotProps` prop.\nIt's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.",name:"componentsProps",required:!1,type:{name:'{ root?: SlotComponentProps<"div", ModalComponentsPropsOverrides, ModalOwnerState>; backdrop?: SlotComponentProps<...>; } | undefined'}},onClose:{defaultValue:null,description:"Callback fired when the component requests to be closed.\nThe `reason` parameter can optionally be used to control the response to `onClose`.",name:"onClose",required:!1,type:{name:'((event: {}, reason: "escapeKeyDown" | "backdropClick") => void)'}},anchorOrigin:{defaultValue:{value:`{
vertical: 'top',
horizontal: 'left',
}`},description:`This is the point on the anchor where the popover's
\`anchorEl\` will attach to. This is not used when the
anchorReference is 'anchorPosition'.

Options:
vertical: [top, center, bottom];
horizontal: [left, center, right].`,name:"anchorOrigin",required:!1,type:{name:"PopoverOrigin"}},TransitionComponent:{defaultValue:{value:"Grow"},description:`The component used for the transition.
[Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.`,name:"TransitionComponent",required:!1,type:{name:"JSXElementConstructor<TransitionProps & { children: ReactElement<any, any>; }>"}},TransitionProps:{defaultValue:{value:"{}"},description:"Props applied to the transition element.\nBy default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.",name:"TransitionProps",required:!1,type:{name:"TransitionProps"}},BackdropComponent:{defaultValue:{value:`styled(Backdrop, {
name: 'MuiModal',
slot: 'Backdrop',
overridesResolver: (props, styles) => {
return styles.backdrop;
},
})({
zIndex: -1,
})`},description:"A backdrop component. This prop enables custom backdrop rendering.\n@deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.\nUse the `slots.backdrop` prop to make your application ready for the next version of Material UI.",name:"BackdropComponent",required:!1,type:{name:"ElementType<BackdropProps, keyof IntrinsicElements>"}},BackdropProps:{defaultValue:null,description:"Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.\n@deprecated Use `slotProps.backdrop` instead.",name:"BackdropProps",required:!1,type:{name:"Partial<BackdropProps>"}},closeAfterTransition:{defaultValue:{value:"false"},description:"When set to true the Modal waits until a nested Transition is completed before closing.",name:"closeAfterTransition",required:!1,type:{name:"boolean"}},disableAutoFocus:{defaultValue:{value:"false"},description:"If `true`, the modal will not automatically shift focus to itself when it opens, and\nreplace it to the last focused element when it closes.\nThis also works correctly with any modal children that have the `disableAutoFocus` prop.\n\nGenerally this should never be set to `true` as it makes the modal less\naccessible to assistive technologies, like screen readers.",name:"disableAutoFocus",required:!1,type:{name:"boolean"}},disableEnforceFocus:{defaultValue:{value:"false"},description:"If `true`, the modal will not prevent focus from leaving the modal while open.\n\nGenerally this should never be set to `true` as it makes the modal less\naccessible to assistive technologies, like screen readers.",name:"disableEnforceFocus",required:!1,type:{name:"boolean"}},disableEscapeKeyDown:{defaultValue:{value:"false"},description:"If `true`, hitting escape will not fire the `onClose` callback.",name:"disableEscapeKeyDown",required:!1,type:{name:"boolean"}},disablePortal:{defaultValue:{value:"false"},description:"The `children` will be under the DOM hierarchy of the parent component.",name:"disablePortal",required:!1,type:{name:"boolean"}},disableRestoreFocus:{defaultValue:{value:"false"},description:"If `true`, the modal will not restore focus to previously focused element once\nmodal is hidden or unmounted.",name:"disableRestoreFocus",required:!1,type:{name:"boolean"}},disableScrollLock:{defaultValue:{value:"false"},description:"Disable the scroll lock behavior.",name:"disableScrollLock",required:!1,type:{name:"boolean"}},hideBackdrop:{defaultValue:{value:"false"},description:"If `true`, the backdrop is not rendered.",name:"hideBackdrop",required:!1,type:{name:"boolean"}},keepMounted:{defaultValue:{value:"false"},description:`Always keep the children in the DOM.
This prop can be useful in SEO situation or
when you want to maximize the responsiveness of the Modal.`,name:"keepMounted",required:!1,type:{name:"boolean"}},onBackdropClick:{defaultValue:null,description:"Callback fired when the backdrop is clicked.\n@deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.",name:"onBackdropClick",required:!1,type:{name:"ReactEventHandler<{}>"}},onTransitionEnter:{defaultValue:null,description:"A function called when a transition enters.",name:"onTransitionEnter",required:!1,type:{name:"(() => void)"}},onTransitionExited:{defaultValue:null,description:"A function called when a transition has exited.",name:"onTransitionExited",required:!1,type:{name:"(() => void)"}},PaperProps:{defaultValue:{value:"{}"},description:"Props applied to the [`Paper`](/material-ui/api/paper/) element.\n\nThis prop is an alias for `slotProps.paper` and will be overriden by it if both are used.\n@deprecated Use `slotProps.paper` instead.",name:"PaperProps",required:!1,type:{name:"Partial<PaperProps<ElementType<any, keyof IntrinsicElements>>>"}},anchorEl:{defaultValue:null,description:`An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
or a function that returns either.
It's used to set the position of the popover.`,name:"anchorEl",required:!1,type:{name:"Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement) | null"}},anchorPosition:{defaultValue:null,description:`This is the position that may be used to set the position of the popover.
The coordinates are relative to the application's client area.`,name:"anchorPosition",required:!1,type:{name:"PopoverPosition"}},anchorReference:{defaultValue:{value:"'anchorEl'"},description:`This determines which anchor prop to refer to when setting
the position of the popover.`,name:"anchorReference",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"anchorEl"'},{value:'"anchorPosition"'}]}},marginThreshold:{defaultValue:{value:"16"},description:`Specifies how close to the edge of the window the popover can appear.
If null, the popover will not be constrained by the window.`,name:"marginThreshold",required:!1,type:{name:"number | null"}}}}}catch{}export{n as P};
