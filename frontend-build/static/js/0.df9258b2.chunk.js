"use strict";(self.webpackChunkcsedu_connect=self.webpackChunkcsedu_connect||[]).push([[0],{5e3:function(e,t,n){n.r(t),n.d(t,{default:function(){return B}});var r=n(2791),a=n(4554),o=n(1889),l=n(7621),i=n(890),s=n(6314),c=n(1087),u=n(237),d=(n(4275),n(4165)),m=n(1413),p=n(5861),f=n(9439),b=n(7689),h=n(6151),v=n(4942),x=n(3366),g=n(7462),Z=n(8182),y=n(4419),j=n(2930),P=n(4036),w=n(6934),k=n(1402),C=n(5878),S=n(1217);function I(e){return(0,S.Z)("MuiFormControlLabel",e)}var E=(0,C.Z)("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error"]),N=n(6147),R=n(184),_=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","slotProps","value"],A=(0,w.ZP)("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[(0,v.Z)({},"& .".concat(E.label),t.label),t.root,t["labelPlacement".concat((0,P.Z)(n.labelPlacement))]]}})((function(e){var t=e.theme,n=e.ownerState;return(0,g.Z)((0,v.Z)({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16},"&.".concat(E.disabled),{cursor:"default"}),"start"===n.labelPlacement&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},"top"===n.labelPlacement&&{flexDirection:"column-reverse",marginLeft:16},"bottom"===n.labelPlacement&&{flexDirection:"column",marginLeft:16},(0,v.Z)({},"& .".concat(E.label),(0,v.Z)({},"&.".concat(E.disabled),{color:(t.vars||t).palette.text.disabled})))})),F=r.forwardRef((function(e,t){var n,a=(0,k.Z)({props:e,name:"MuiFormControlLabel"}),o=a.className,l=a.componentsProps,s=void 0===l?{}:l,c=a.control,u=a.disabled,d=a.disableTypography,m=a.label,p=a.labelPlacement,f=void 0===p?"end":p,b=a.slotProps,h=void 0===b?{}:b,v=(0,x.Z)(a,_),w=(0,j.Z)(),C=u;"undefined"===typeof C&&"undefined"!==typeof c.props.disabled&&(C=c.props.disabled),"undefined"===typeof C&&w&&(C=w.disabled);var S={disabled:C};["checked","name","onChange","value","inputRef"].forEach((function(e){"undefined"===typeof c.props[e]&&"undefined"!==typeof a[e]&&(S[e]=a[e])}));var E=(0,N.Z)({props:a,muiFormControl:w,states:["error"]}),F=(0,g.Z)({},a,{disabled:C,labelPlacement:f,error:E.error}),L=function(e){var t=e.classes,n=e.disabled,r=e.labelPlacement,a=e.error,o={root:["root",n&&"disabled","labelPlacement".concat((0,P.Z)(r)),a&&"error"],label:["label",n&&"disabled"]};return(0,y.Z)(o,I,t)}(F),T=null!=(n=h.typography)?n:s.typography,D=m;return null==D||D.type===i.Z||d||(D=(0,R.jsx)(i.Z,(0,g.Z)({component:"span"},T,{className:(0,Z.Z)(L.label,null==T?void 0:T.className),children:D}))),(0,R.jsxs)(A,(0,g.Z)({className:(0,Z.Z)(L.root,o),ownerState:F,ref:t},v,{children:[r.cloneElement(c,S),D]}))})),L=n(9174),T=n(7259),D=n(5415),M=n(5985),q=n(2172),U=n(3608),z=function(e){var t=e.title,n=e.subtitle,o=e.subtext,l=r.useState(!1),s=(0,f.Z)(l,2),c=s[0],u=s[1],v=(0,b.s0)(),x=(0,r.useContext)(U.V).loginToAccount,g=function(e){var t=e.split("@")[1];return!!["gmail.com","yahoo.com","hotmail.com","outlook.com"].includes(t)||"Invalid Email"},Z=function(e){return/.{12,}/.test(e)?/[a-z]/.test(e)?/[A-Z]/.test(e)?/[0-9]/.test(e)?!!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e)||"Password must contain at least one special character":"Password must contain at least one number":"Password must contain at least one uppercase letter":"Password must contain at least one lowercase letter":"Password must be at least 12 characters long"},y=function(e){return/^[a-zA-Z ]+$/.test(e)?/(SELECT|DELETE)/i.test(e)?"Invalid Name":null:"Name must contain only alphabetical characters"},j=function(e){return/(SELECT|DELETE)/i.test(e)?"Invalid Name":null},P=function(){var e=(0,p.Z)((0,d.Z)().mark((function e(t){var n,r,a,o;return(0,d.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=c?t:(0,m.Z)((0,m.Z)({},t),{},{referral_code:null}),a=(r=n).username,o=r.password,{username:a,password:o},e.next=6,(0,D.z2)(n);case 6:return e.sent,e.next=9,x(t);case 9:M.Am.success("User creation succeeded!"),v("/profile"),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),M.Am.error("User creation failed!");case 16:return e.prev=16,e.finish(16);case 18:case"end":return e.stop()}}),e,null,[[0,13,16,18]])})));return function(t){return e.apply(this,arguments)}}();return(0,R.jsxs)(R.Fragment,{children:[t?(0,R.jsx)(i.Z,{fontWeight:"700",variant:"h2",mb:1,children:t}):null,o,(0,R.jsx)(T.qu,{onSubmit:P,children:function(e,t,n){var r=n.control;return(0,R.jsx)(R.Fragment,{children:(0,R.jsxs)("div",{className:"row mt-3",children:[(0,R.jsx)(T.II,{name:"first_name",errors:t,required:!0,register:e,validate:y,class_name:"col-12",label:"First Name"}),(0,R.jsx)(T.II,{name:"last_name",errors:t,required:!0,register:e,validate:y,class_name:"col-12",label:"Last Name"}),(0,R.jsx)(T.II,{name:"username",errors:t,required:!0,register:e,validate:j,class_name:"col-12",label:"Username"}),(0,R.jsx)(T.II,{name:"email_address",errors:t,required:!0,register:e,validate:g,class_name:"col-12",label:"Email"}),(0,R.jsx)(T.II,{name:"password",type:"password",register:e,errors:t,required:!0,validate:Z,class_name:"col-12",label:"Password"}),(0,R.jsx)(T.Uj,{name:"batch_number",control:r,errors:t,required:!0,class_name:"col-12",label:"Batch",options:(0,q.E)()}),(0,R.jsx)(T.Ph,{name:"sex",control:r,errors:t,required:!0,class_name:"col-12",label:"Gender",options:[{name:"Male",value:"M"},{name:"Female",value:"F"}]}),(0,R.jsx)(F,{control:(0,R.jsx)(L.Z,{defaultChecked:c,onChange:function(){return u(!c)}}),label:"I have a Referral Code",class_name:"col-12",style:{marginBottom:"10px"}}),c&&(0,R.jsx)(T.II,{name:"referral_code",register:e,errors:t,required:c,className:"col-12",label:"Code",disabled:!c}),(0,R.jsx)(a.Z,{children:(0,R.jsx)(h.Z,{color:"primary",variant:"contained",size:"large",fullWidth:!0,type:"submit",children:"Register"})})]})})}}),n]})},B=function(){return(0,R.jsx)(u.Z,{title:"Register",description:"this is Register page",children:(0,R.jsx)(a.Z,{sx:{display:"flex",flexDirection:"column",minHeight:"100vh",position:"relative","&:before":{content:'""',background:"radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",backgroundSize:"100% 100%",animation:"gradient 15s ease infinite",position:"absolute",height:"100%",width:"100%",opacity:"0.3"}},children:(0,R.jsx)(o.ZP,{container:!0,spacing:0,justifyContent:"center",sx:{flex:1},children:(0,R.jsx)(o.ZP,{item:!0,xs:12,sm:12,lg:4,xl:3,display:"flex",justifyContent:"center",alignItems:"center",children:(0,R.jsxs)(l.Z,{elevation:9,sx:{p:4,zIndex:1,width:"100%",maxWidth:"500px"},children:[(0,R.jsx)(a.Z,{display:"flex",alignItems:"center",justifyContent:"center",children:(0,R.jsx)("h3",{children:"CSEDU Alumni Association"})}),(0,R.jsx)(z,{subtext:(0,R.jsx)(i.Z,{variant:"subtitle1",textAlign:"center",color:"textSecondary",mb:1,children:"A CSEDU Social Network"}),subtitle:(0,R.jsxs)(s.Z,{direction:"row",justifyContent:"center",spacing:1,children:[(0,R.jsx)(i.Z,{color:"textSecondary",variant:"h6",fontWeight:"400",children:"Already have an Account?"}),(0,R.jsx)(i.Z,{component:c.rU,to:"/auth/login",fontWeight:"500",sx:{textDecoration:"none",color:"primary.main"},children:"Sign In"})]})})]})})})})})}},6314:function(e,t,n){n.d(t,{Z:function(){return S}});var r=n(4942),a=n(3366),o=n(7462),l=n(2791),i=n(8182),s=n(2466),c=n(4419),u=n(1217),d=n(3457),m=n(6083),p=n(8519),f=n(5080),b=n(1184),h=n(5682),v=n(184),x=["component","direction","spacing","divider","children","className","useFlexGap"],g=(0,f.Z)(),Z=(0,d.Z)("div",{name:"MuiStack",slot:"Root",overridesResolver:function(e,t){return t.root}});function y(e){return(0,m.Z)({props:e,name:"MuiStack",defaultTheme:g})}function j(e,t){var n=l.Children.toArray(e).filter(Boolean);return n.reduce((function(e,r,a){return e.push(r),a<n.length-1&&e.push(l.cloneElement(t,{key:"separator-".concat(a)})),e}),[])}var P=function(e){var t=e.ownerState,n=e.theme,a=(0,o.Z)({display:"flex",flexDirection:"column"},(0,b.k9)({theme:n},(0,b.P$)({values:t.direction,breakpoints:n.breakpoints.values}),(function(e){return{flexDirection:e}})));if(t.spacing){var l=(0,h.hB)(n),i=Object.keys(n.breakpoints.values).reduce((function(e,n){return("object"===typeof t.spacing&&null!=t.spacing[n]||"object"===typeof t.direction&&null!=t.direction[n])&&(e[n]=!0),e}),{}),c=(0,b.P$)({values:t.direction,base:i}),u=(0,b.P$)({values:t.spacing,base:i});"object"===typeof c&&Object.keys(c).forEach((function(e,t,n){if(!c[e]){var r=t>0?c[n[t-1]]:"column";c[e]=r}}));a=(0,s.Z)(a,(0,b.k9)({theme:n},u,(function(e,n){return t.useFlexGap?{gap:(0,h.NA)(l,e)}:{"& > :not(style) + :not(style)":(0,r.Z)({margin:0},"margin".concat((a=n?c[n]:t.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[a])),(0,h.NA)(l,e))};var a})))}return a=(0,b.dt)(n.breakpoints,a)};var w=n(6934),k=n(1402),C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.createStyledComponent,n=void 0===t?Z:t,r=e.useThemeProps,s=void 0===r?y:r,d=e.componentName,m=void 0===d?"MuiStack":d,f=n(P),b=l.forwardRef((function(e,t){var n=s(e),r=(0,p.Z)(n),l=r.component,d=void 0===l?"div":l,b=r.direction,h=void 0===b?"column":b,g=r.spacing,Z=void 0===g?0:g,y=r.divider,P=r.children,w=r.className,k=r.useFlexGap,C=void 0!==k&&k,S=(0,a.Z)(r,x),I={direction:h,spacing:Z,useFlexGap:C},E=(0,c.Z)({root:["root"]},(function(e){return(0,u.Z)(m,e)}),{});return(0,v.jsx)(f,(0,o.Z)({as:d,ownerState:I,ref:t,className:(0,i.Z)(E.root,w)},S,{children:y?j(P,y):P}))}));return b}({createStyledComponent:(0,w.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:function(e,t){return t.root}}),useThemeProps:function(e){return(0,k.Z)({props:e,name:"MuiStack"})}}),S=C}}]);
//# sourceMappingURL=0.df9258b2.chunk.js.map