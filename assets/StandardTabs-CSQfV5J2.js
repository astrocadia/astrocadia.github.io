import{j as o}from"./jsx-runtime-4WDyTGeM.js";import{c as r}from"./index-eOQoo3sK.js";import{T as s}from"./Tabs-CFZZivRF.js";const a=({children:e,className:t,value:n,...l})=>o.jsx(s,{className:r(t,"StandardTabs"),value:n,...l,children:e});try{a.displayName="StandardTabs",a.__docgenInfo={description:"",displayName:"StandardTabs",props:{value:{defaultValue:null,description:"The value of the currently selected `Tab`.\nIf you don't want any selected `Tab`, you can set this prop to `false`.",name:"value",required:!1,type:{name:"any"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},sx:{defaultValue:null,description:"The system prop that allows defining system overrides as well as additional CSS styles.",name:"sx",required:!1,type:{name:"SxProps<Theme>"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"(Partial<TabsClasses> & Partial<ClassNameMap<never>>)"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},children:{defaultValue:null,description:"The content of the component.",name:"children",required:!1,type:{name:"ReactNode"}},"aria-label":{defaultValue:null,description:"The label for the Tabs as a string.",name:"aria-label",required:!1,type:{name:"string"}},"aria-labelledby":{defaultValue:null,description:"An id or list of ids separated by a space that label the Tabs.",name:"aria-labelledby",required:!1,type:{name:"string"}},onChange:{defaultValue:null,description:`Callback fired when the value changes.
@param event The event source of the callback. **Warning**: This is a generic event not a change event.
@param value We default to the index of the child (number)`,name:"onChange",required:!1,type:{name:"((event: SyntheticEvent<Element, Event>, value: any) => void)"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},orientation:{defaultValue:{value:"'horizontal'"},description:"The component orientation (layout flow direction).",name:"orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},slotProps:{defaultValue:{value:"{}"},description:`The extra props for the slot components.
You can override the existing props or add new ones.`,name:"slotProps",required:!1,type:{name:'{ startScrollButtonIcon?: SlotComponentProps<OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }, TabsStartScrollButtonIconSlotPropsOverrides, TabsOwnerState>; endScrollButtonIcon?: SlotComponentProps<...>; } | undefined'}},slots:{defaultValue:{value:"{}"},description:"The components used for each slot inside.",name:"slots",required:!1,type:{name:"{ StartScrollButtonIcon?: ElementType<any, keyof IntrinsicElements>; EndScrollButtonIcon?: ElementType<any, keyof IntrinsicElements>; } | undefined"}},action:{defaultValue:null,description:"Callback fired when the component mounts.\nThis is useful when you want to trigger an action programmatically.\nIt supports two actions: `updateIndicator()` and `updateScrollButtons()`\n@param actions This object contains all possible actions\nthat can be triggered programmatically.",name:"action",required:!1,type:{name:"Ref<TabsActions>"}},allowScrollButtonsMobile:{defaultValue:{value:"false"},description:"If `true`, the scroll buttons aren't forced hidden on mobile.\nBy default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.",name:"allowScrollButtonsMobile",required:!1,type:{name:"boolean"}},centered:{defaultValue:{value:"false"},description:"If `true`, the tabs are centered.\nThis prop is intended for large views.",name:"centered",required:!1,type:{name:"boolean"}},ScrollButtonComponent:{defaultValue:{value:"TabScrollButton"},description:"The component used to render the scroll buttons.",name:"ScrollButtonComponent",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},scrollButtons:{defaultValue:{value:"'auto'"},description:"Determine behavior of scroll buttons when tabs are set to scroll:\n\n- `auto` will only present them when not all the items are visible.\n- `true` will always present them.\n- `false` will never present them.\n\nBy default the scroll buttons are hidden on mobile.\nThis behavior can be disabled with `allowScrollButtonsMobile`.",name:"scrollButtons",required:!1,type:{name:'boolean | "auto"'}},selectionFollowsFocus:{defaultValue:null,description:"If `true` the selected tab changes on focus. Otherwise it only\nchanges on activation.",name:"selectionFollowsFocus",required:!1,type:{name:"boolean"}},TabScrollButtonProps:{defaultValue:{value:"{}"},description:"Props applied to the [`TabScrollButton`](/material-ui/api/tab-scroll-button/) element.",name:"TabScrollButtonProps",required:!1,type:{name:"Partial<TabScrollButtonProps>"}},textColor:{defaultValue:{value:"'primary'"},description:"Determines the color of the `Tab`.",name:"textColor",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"inherit"'}]}},visibleScrollbar:{defaultValue:{value:"false"},description:"If `true`, the scrollbar is visible. It can be useful when displaying\na long vertical list of tabs.",name:"visibleScrollbar",required:!1,type:{name:"boolean"}}}}}catch{}export{a as S};
