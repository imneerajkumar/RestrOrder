(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{40:function(e,t,a){},41:function(e,t,a){},42:function(e,t,a){},51:function(e,t,a){},69:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var c=a(0),s=a.n(c),r=a(14),n=a.n(r),l=(a(40),a(7)),o=a(3),i=(a(41),a(42),a(1));var d=function(){return Object(i.jsx)("div",{className:"Header",children:Object(i.jsx)("nav",{className:"navbar navbar-expand-lg navbar-dark",children:Object(i.jsxs)("div",{className:"container-fluid",children:[Object(i.jsx)("a",{className:"navbar-brand",href:"/",children:"RestrOrder"}),Object(i.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(i.jsx)("span",{className:"navbar-toggler-icon"})}),Object(i.jsx)("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent",children:Object(i.jsxs)("ul",{className:"navbar-nav me-auto mb-2 mb-lg-0",children:[Object(i.jsx)("li",{className:"nav-item",children:Object(i.jsx)(l.b,{className:"nav-link active","aria-current":"page",to:"/",children:"Home"})}),Object(i.jsx)("li",{className:"nav-item",children:Object(i.jsx)(l.b,{className:"nav-link active",to:"/menu",children:"Menu"})}),Object(i.jsx)("li",{className:"nav-item",children:Object(i.jsx)(l.b,{className:"nav-link active",to:"/checkout",children:"Checkout"})})]})})]})})})};a(51);var j=function(){var e=Object(o.f)();return Object(i.jsx)("div",{className:"Home",children:Object(i.jsx)("div",{className:"container home",children:Object(i.jsxs)("div",{className:"row rowHome",children:[Object(i.jsx)("div",{className:"col details",children:Object(i.jsx)("img",{className:"image",src:"/restaurant.png",alt:"Logo"})}),Object(i.jsxs)("div",{className:"col details",children:[Object(i.jsx)("div",{className:"name",children:"RestrOrder"}),Object(i.jsx)("div",{className:"features",children:'"Best Dishes in the Town, Serve with love."'}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{className:"Button",onClick:function(){e.push("/menu")},children:"Hungry? Order Now"})})]})]})})})},m=a(8),_=a(15),b=a.n(_),h=a(9);a(31),a(69);h.a.configure();var u=function(e){return Object(i.jsxs)("div",{className:"Item",children:[Object(i.jsx)("div",{className:"img-container",children:Object(i.jsx)("img",{className:"img",src:e.item.logo,alt:e.item.name})}),Object(i.jsxs)("div",{className:"Details",children:[Object(i.jsx)("p",{className:"Name",children:e.item.name}),Object(i.jsx)("p",{className:"Description",children:e.item.description})]}),Object(i.jsxs)("div",{className:"Order",children:[Object(i.jsx)("p",{className:"Price",children:"\u20b9"+e.item.price}),Object(i.jsx)("button",{name:e.index,className:"Add",onClick:function(t){h.a.success("".concat(e.item.name," added to cart"),{position:"top-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!1,draggable:!0,progress:void 0,theme:"colored"});var a=t.target.name,c=JSON.parse(localStorage.getItem("order"));c[Number(a)]+=1,localStorage.setItem("order",JSON.stringify(c));var s=Number(localStorage.getItem("total"));localStorage.setItem("total",s+Number(e.item.price))},children:"+"})]})]})};a(70);var O=function(e){var t=Object(c.useState)([0]),a=Object(m.a)(t,2),s=a[0],r=a[1];return b.a.get("/loadmenu").then((function(e){var t=e.data;if(null===localStorage.getItem("order")||JSON.parse(localStorage.getItem("order")).length!==t.length){var a=[];s.forEach((function(e){a.push(0)})),localStorage.setItem("order",JSON.stringify(a)),localStorage.setItem("total",0)}localStorage.setItem("list",JSON.stringify(t)),r(t)})),Object(i.jsxs)("div",{className:"Menu",children:[Object(i.jsx)("p",{className:"menu",children:"MENU"}),s.map((function(e,t){return Object(i.jsx)(u,{item:e,index:t},t)}))]})},g=a(34);a(71);h.a.configure();var N=function(e){var t=Object(o.f)(),a=Object(c.useState)([]),s=Object(m.a)(a,2),r=s[0],n=s[1],l=Object(c.useState)(["",""]),d=Object(m.a)(l,2),j=Object(m.a)(d[0],2),_=j[0],u=j[1],O=d[1],N=Object(c.useState)("hidden"),p=Object(m.a)(N,2),x=p[0],v=p[1],f=Object(c.useState)("show"),S=Object(m.a)(f,2),I=S[0],k=S[1];function y(e){h.a.error("Error: ".concat(e),{position:"top-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!1,draggable:!0,progress:void 0,theme:"colored"})}function C(){h.a.success("Placing your Order",{position:"top-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!1,draggable:!0,progress:void 0,theme:"colored"})}function J(){for(var e=JSON.parse(localStorage.getItem("order")),t=0;t<e.length;t++)e[t]=0;localStorage.setItem("order",JSON.stringify(e)),localStorage.setItem("total",0)}function P(e){var t=Number(e.target.name),a=JSON.parse(localStorage.getItem("order")),c=JSON.parse(localStorage.getItem("list")),s=JSON.parse(localStorage.getItem("total")),r=[];a[t]+=1,s+=Number(c[t].price),localStorage.setItem("order",JSON.stringify(a)),localStorage.setItem("total",JSON.stringify(s)),a.forEach((function(e,t){e>0&&r.push({key:t,name:c[t].name,price:c[t].price,qty:e})})),n(r)}function w(e){var a=Number(e.target.name),c=JSON.parse(localStorage.getItem("order")),s=JSON.parse(localStorage.getItem("list")),r=localStorage.getItem("total"),l=[];c[a]-=1,(r-=Number(s[a].price))<=0&&(y("No order for Checkout"),t.push("/")),localStorage.setItem("order",JSON.stringify(c)),localStorage.setItem("total",JSON.stringify(r)),c.forEach((function(e,t){e>0&&l.push({key:t,name:s[t].name,price:s[t].price,qty:e})})),n(l)}function E(e){b.a.post("/print",{list:r,name:_,number:u,total:Number(localStorage.getItem("total")),mode:e})}return Object(c.useEffect)((function(){if(0===r.length&&null!==localStorage.getItem("order")&&null!==localStorage.getItem("list")){var e=[],a=JSON.parse(localStorage.getItem("order")),c=JSON.parse(localStorage.getItem("list"));localStorage.getItem("total")<=0&&(y("No order for Checkout"),t.push("/")),a.forEach((function(t,a){t>0&&e.push({key:a,name:c[a].name,price:c[a].price,qty:t})})),n(e)}}),[r,t]),Object(i.jsx)("div",{className:"Checkout",children:Object(i.jsx)("div",{className:"container checkout",children:Object(i.jsxs)("div",{className:"row checkout-row",children:[Object(i.jsxs)("div",{className:"col left "+x,children:[Object(i.jsx)("div",{className:"Thank",children:"THANK YOU FOR ORDERING"}),Object(i.jsxs)("div",{className:"fills "+x,children:[Object(i.jsx)("div",{className:"inst",children:"Please fill the details below:"}),Object(i.jsxs)("div",{className:"ind",children:[Object(i.jsx)("div",{className:"label",children:"Name :"}),Object(i.jsx)("input",{className:"input",type:"text",value:_,onChange:function(e){O([e.target.value,u])}})]}),Object(i.jsxs)("div",{className:"ind",children:[Object(i.jsx)("div",{className:"label",children:"Phone:"}),Object(i.jsx)("input",{className:"input",type:"number",value:u,onChange:function(e){O([_,e.target.value])}})]})]}),Object(i.jsxs)("div",{className:"bill",children:[Object(i.jsx)("button",{className:"pay cash",onClick:function(){_.length>0&&10===u.length?(E("Cash"),function(){var e=localStorage.getItem("total"),t=new g.a("p","pt");t.addFont("helvetica","normal"),t.text(200,30,"Restro Order - Your Bill"),t.text(70,50,"Name: ".concat(_)),t.text(360,50,"Phone No.: ".concat(u)),t.text(0,60,"_______________________________________________________________________"),t.text(230,80,"Total: Rs.".concat(e,"/-")),t.text(0,90,"_______________________________________________________________________");var a=120,c=1;r.forEach((function(e){t.text(25,a,"".concat(c,". ")),t.text(75,a,"".concat(e.name)),t.text(255,a,"Qty: ".concat(e.qty)),t.text(325,a,"Rs.".concat(e.price)),t.text(455,a,"Rs.".concat(e.qty*e.price)),a+=40,c+=1})),t.save("Bill.pdf")}(),C(),J(),t.push("/")):y("Please fill the correct details")},children:"Cash Payment"}),Object(i.jsx)("button",{className:"pay upi",onClick:function(){_.length>0&&10===u.length?(E("Online"),C(),J(),t.push("/")):y("Please fill the correct details")},children:"UPI - PayTM, PhonePe.."})]})]}),Object(i.jsxs)("div",{className:"col right",children:[Object(i.jsxs)("div",{className:"Total",children:["Total: ","\u20b9"+localStorage.getItem("total")]}),Object(i.jsx)("div",{className:"Items",children:r.map((function(e,t){return Object(i.jsxs)("div",{className:"item",children:[Object(i.jsxs)("div",{className:"order",children:[Object(i.jsx)("p",{className:"Name",children:e.name}),Object(i.jsx)("p",{className:"Price",children:"\u20b9 "+e.price})]}),Object(i.jsxs)("div",{className:"changeBtns "+I,children:[Object(i.jsx)("button",{name:e.key,className:"change",onClick:w,children:"-"}),Object(i.jsx)("button",{name:e.key,className:"change",onClick:P,children:"+"}),Object(i.jsx)("p",{className:"qty",children:e.qty})]})]},t)}))}),Object(i.jsx)("button",{className:"confirm "+I,onClick:function(){localStorage.getItem("total")>0&&(v("show"),k("hidden"))},children:"Checkout"})]})]})})})};var p=function(){return Object(c.useEffect)((function(){null===localStorage.getItem("total")&&localStorage.setItem("total",0)}),[]),Object(i.jsx)("div",{className:"App",children:Object(i.jsxs)(l.a,{children:[Object(i.jsx)(d,{}),Object(i.jsxs)(o.c,{children:[Object(i.jsx)(o.a,{exact:!0,path:"/",children:Object(i.jsx)(j,{})}),Object(i.jsx)(o.a,{path:"/checkout",children:Object(i.jsx)(N,{})}),Object(i.jsx)(o.a,{path:"/menu",children:Object(i.jsx)(O,{})}),Object(i.jsx)(o.a,{path:"*",children:Object(i.jsx)(j,{})})]})]})})};n.a.render(Object(i.jsx)(s.a.StrictMode,{children:Object(i.jsx)(p,{})}),document.getElementById("root"))}},[[72,1,3]]]);
//# sourceMappingURL=main.994c2261.chunk.js.map