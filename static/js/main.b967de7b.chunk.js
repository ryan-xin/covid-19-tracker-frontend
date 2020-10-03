(this["webpackJsonpcovid-19-tracker-frontend"]=this["webpackJsonpcovid-19-tracker-frontend"]||[]).push([[0],{135:function(e,a){},217:function(e,a,t){},218:function(e,a,t){},219:function(e,a,t){},220:function(e,a,t){},221:function(e,a,t){},222:function(e,a,t){},223:function(e,a,t){},224:function(e,a,t){},225:function(e,a,t){},226:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(11),c=t(80),o=t.n(c),i=t(2),s=t(7),m=t(5),u=t.n(m),d=t(81),p=t.n(d),b=function(e){var a=Object(n.useState)("andy@ga.co"),t=Object(i.a)(a,2),r=t[0],c=t[1],o=Object(n.useState)("chicken"),s=Object(i.a)(o,2),m=s[0],d=s[1],p=Object(n.useState)(""),b=Object(i.a)(p,2),E=b[0],h=b[1];return l.a.createElement("div",{className:"content"},l.a.createElement("h1",null,"User Login"),l.a.createElement("form",null,l.a.createElement("label",null,"Email:"),l.a.createElement("input",{type:"text",defaultValue:"andy@ga.co",onChange:function(e){c(e.target.value)}}),l.a.createElement("label",null,"Password:"),l.a.createElement("input",{type:"password",defaultValue:"chicken",onChange:function(e){d(e.target.value)}}),l.a.createElement("input",{type:"Submit",placeholder:"Login",className:"button_primary",onClick:function(a){a.preventDefault(),localStorage.removeItem("user"),localStorage.removeItem("admin"),localStorage.removeItem("token"),console.log("Login Submitted"),u.a.post("https://covid19tracker-ryan.herokuapp.com/user/login",{email:r,password:m}).then((function(a){console.log(a.data),localStorage.setItem("user",JSON.stringify(a.data.user)),localStorage.setItem("token",a.data.token),u.a.defaults.headers.common.Authorization="Bearer ".concat(a.data.token),e.history.push("/world"),window.location.reload()})).catch((function(e){console.log(e),401===e.response.status&&h("Invalid email and/or password.")}))}})),l.a.createElement("div",{className:"errorMessage"},l.a.createElement("p",null,E)))},E=t(19),h=t(6),g=t(82),v=function(e){var a,t=Object(n.useState)([]),r=Object(i.a)(t,2),c=r[0],o=r[1],s=Object(n.useState)(""),m=Object(i.a)(s,2),d=m[0],p=m[1],b=Object(n.useState)([]),E=Object(i.a)(b,2),h=E[0],g=E[1],v=Object(n.useState)(!1),f=Object(i.a)(v,2),y=f[0],O=f[1],j=Object(n.useState)(void 0),S=Object(i.a)(j,2),k=S[0],w=S[1],C=function(a){p(a.target.innerText),e.onSelectSuburb(a.target.innerText),g([]),O(!1)};return Object(n.useEffect)((function(){w(e.preSuburb)}),[e.preSuburb]),Object(n.useEffect)((function(){u.a.get("https://covid19tracker-ryan.herokuapp.com/suburbs").then((function(e){console.log(e.data),o(e.data)})).catch((function(e){return console.log(e)}))}),[]),y&&d&&(a=h.length?l.a.createElement("div",{className:"auto_list_outer"},l.a.createElement("div",{className:"auto_list_inner"},l.a.createElement("ul",{className:"options"},h.map((function(e,a){return l.a.createElement("li",{key:e,onClick:C},e)}))))):l.a.createElement("div",{className:"errorMessage"},l.a.createElement("p",null,"No Option!"))),l.a.createElement("div",{className:"auto_wrapper"},l.a.createElement("div",{className:"search"},l.a.createElement("input",{type:"text",className:"search-box",onChange:function(e){console.log("onChanges");var a=e.target.value,t=c.filter((function(e){return e.toLowerCase().indexOf(a.toLowerCase())>-1}));p(a),g(t),O(!0)},onClick:function(e){w("")},value:k||d})),a)},f=function(e){var a=Object(n.useState)({name:"",email:"",password:"",confirmPassword:"",suburb:""}),t=Object(i.a)(a,2),r=t[0],c=t[1],o=Object(n.useState)({blankField:"",email:"",password:"",passwordLength:"",existingEmail:""}),s=Object(i.a)(o,2),m=s[0],d=s[1],p=function(e){var a=e.target.value;c(Object(h.a)(Object(h.a)({},r),{},Object(E.a)({},e.target.name,a)))};return l.a.createElement("div",{className:"content"},l.a.createElement("h1",null,"User Signup"),l.a.createElement("form",null,l.a.createElement("label",null,"Name:"),l.a.createElement("input",{type:"text",name:"name",onChange:p}),l.a.createElement("label",null,"Email:"),l.a.createElement("input",{type:"text",name:"email",onChange:p}),l.a.createElement("label",null,"Password:"),l.a.createElement("input",{type:"text",name:"password",onChange:p}),l.a.createElement("label",null,"Confirm Password:"),l.a.createElement("input",{type:"text",name:"confirmPassword",onChange:p}),l.a.createElement("label",null,"Suburb:"),l.a.createElement(v,{onSelectSuburb:function(e){c(Object(h.a)(Object(h.a)({},r),{},{suburb:e}))}}),l.a.createElement("input",{type:"Submit",placeholder:"Login",className:"button_primary",onClick:function(a){a.preventDefault(),function(){d({blankField:"",email:"",password:"",passwordLength:"",existingEmail:""}),console.log("Signup Submitted");var e={},a=!0;return""!==r.name&&""!==r.email&&""!==r.password&&""!==r.suburb||(e.blankField='Fields can"t be blank.',a=!1),Object(g.isEmail)(r.email)||(e.email="Invalid email.",a=!1),r.password.length<6&&(e.passwordLength="Password must at least 6 characters.",a=!1),r.password!==r.confirmPassword&&(e.password="Please make sure your passwords match.",a=!1),a||d(e),a}()&&u.a.post("https://covid19tracker-ryan.herokuapp.com/user/signup",{name:r.name,email:r.email,password:r.password,suburb:r.suburb}).then((function(a){console.log(a.data),localStorage.setItem("user",JSON.stringify(a.data.user)),localStorage.setItem("token",a.data.token),u.a.defaults.headers.common.Authorization="Bearer ".concat(a.data.token),e.history.push("/world"),window.location.reload()})).catch((function(e){console.dir(e),401===e.response.status&&(console.log(e.response.data.email),d({existingEmail:e.response.data.email}))}))}})),l.a.createElement("div",{className:"errorMessage"},l.a.createElement("p",null,m.blankField),l.a.createElement("p",null,m.email),l.a.createElement("p",null,m.password),l.a.createElement("p",null,m.passwordLength),l.a.createElement("p",null,m.existingEmail)))},y=function(e){var a=Object(n.useState)("ryan@ga.co"),t=Object(i.a)(a,2),r=t[0],c=t[1],o=Object(n.useState)("chicken"),s=Object(i.a)(o,2),m=s[0],d=s[1],p=Object(n.useState)(""),b=Object(i.a)(p,2),E=b[0],h=b[1];return l.a.createElement("div",{className:"content"},l.a.createElement("h1",null,"Admin Login"),l.a.createElement("form",null,l.a.createElement("label",null,"Email:"),l.a.createElement("input",{type:"text",defaultValue:"ryan@ga.co",onChange:function(e){c(e.target.value)}}),l.a.createElement("label",null,"Password:"),l.a.createElement("input",{type:"password",defaultValue:"chicken",onChange:function(e){d(e.target.value)}}),l.a.createElement("input",{type:"Submit",placeholder:"Login",className:"button_primary",onClick:function(a){a.preventDefault(),localStorage.removeItem("user"),localStorage.removeItem("admin"),localStorage.removeItem("token"),u.a.post("https://covid19tracker-ryan.herokuapp.com/admin/login",{email:r,password:m}).then((function(a){console.log(a.data),localStorage.setItem("admin",JSON.stringify(a.data.admin)),localStorage.setItem("token",a.data.token),u.a.defaults.headers.common.Authorization="Bearer ".concat(a.data.token),e.history.push("/admin/profile/".concat(a.data.admin._id)),window.location.reload()})).catch((function(e){console.log(e),401===e.response.status&&h("Invalid email and/or password.")}))}})),l.a.createElement("div",{className:"errorMessage"},l.a.createElement("p",null,E)))},O=t(228),j=t(230),S=t(229),k=function(e){return l.a.createElement("div",{className:"thank_you"},l.a.createElement("div",{className:"thank_you_wrapper"},l.a.createElement("h4",null," To all healthcare workers who were on the frontlines of ",l.a.createElement("br",null)," battling COVID - 19: "),l.a.createElement("h1",null,"Thank You to Our Heros!"),l.a.createElement("h3",null,"Thank you for the sacrifices you make, every day and especially during this pandemic. Your dedication, commitment and courage deserve our deepest gratitude and admiration. Your service to patients is saving countless lives and making thousands of differences. "),l.a.createElement("button",{className:"button_thankyou",onClick:function(){e.onHandleThankYou()}},"Thank You!")))},w=function(e){var a=Object(n.useState)({cases:"-",todayCases:"-",active:"-",deaths:"-",recovered:"-",affectedCountries:"-",updated:"-"}),t=Object(i.a)(a,2),r=t[0],c=t[1],o=Object(n.useState)(!1),s=Object(i.a)(o,2),m=s[0],d=s[1];Object(n.useEffect)((function(){u.a.get("https://disease.sh/v3/covid-19/all").then((function(e){console.log(e.data),0===e.data.cases&&d(!0),c({cases:p(e.data.cases),todayCases:p(e.data.todayCases),active:p(e.data.active),deaths:p(e.data.deaths),recovered:p(e.data.recovered),affectedCountries:p(e.data.affectedCountries),updated:new Date(e.data.updated).toLocaleString()})})).catch((function(e){console.log(e)}))}),[]);var p=function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")};return l.a.createElement("div",null,m&&l.a.createElement(k,{onHandleThankYou:function(e){d(!1)}}),l.a.createElement("div",{className:"dashboard"},l.a.createElement("div",{className:"dashboard_wrapper"},l.a.createElement("div",{className:"update_time"},l.a.createElement("p",null,"Last Update:"),l.a.createElement("h5",null,r.updated)),l.a.createElement("div",{className:"flex-container"},l.a.createElement("div",{className:"flex-item"},l.a.createElement("h4",null,"Total Cases"),l.a.createElement("h1",null,r.cases)),l.a.createElement("div",{className:"flex-item"},l.a.createElement("h4",null,"Today Cases"),l.a.createElement("h1",null,r.todayCases)),l.a.createElement("div",{className:"flex-item"},l.a.createElement("h4",null,"Active Cases"),l.a.createElement("h1",null,r.active))),l.a.createElement("div",{className:"flex-container"},l.a.createElement("div",{className:"flex-item"},l.a.createElement("h4",null,"Deaths"),l.a.createElement("h1",null,r.deaths)),l.a.createElement("div",{className:"flex-item"},l.a.createElement("h4",null,"Recovered"),l.a.createElement("h1",null,r.recovered)),l.a.createElement("div",{className:"flex-item"},l.a.createElement("h4",null,"Affected Countries"),l.a.createElement("h1",null,r.affectedCountries))))))},C=function(e){var a=Object(n.useState)([]),t=Object(i.a)(a,2),r=(t[0],t[1]),c=Object(n.useState)([]),o=Object(i.a)(c,2),s=o[0],m=o[1],d=Object(n.useState)(void 0),p=Object(i.a)(d,2),b=p[0],E=p[1],h=Object(n.useState)({name:"-",cases:"-",todayCases:"-",deaths:"-",recovered:"-",active:"-",updated:"-"}),g=Object(i.a)(h,2),v=g[0],f=g[1];Object(n.useEffect)((function(){console.log("useEffect"),u.a.get("https://disease.sh/v3/covid-19/countries").then((function(e){console.log(e.data),r(e.data);var a={};e.data.forEach((function(e){var t=e.country;a[t]={},a[t].cases=e.cases,a[t].todayCases=e.todayCases,a[t].deaths=e.deaths,a[t].recovered=e.recovered,a[t].active=e.active,a[t].updated=e.updated})),E(a)})).catch((function(e){console.log(e)}))}),[]),Object(n.useEffect)((function(){u.a.get("https://covid19tracker-ryan.herokuapp.com/countries").then((function(e){console.log(e.data),m(e.data)})).catch((function(e){console.log(e)}))}),[]);var y=function(e){return e>7e5?"#4E1504":e>5e5?"#7F270C":e>3e5?"#B33A15":e>1e5?"#E54C1E":e>5e4?"#FF5F1D":e>2e4?"#FF7014":e>1e4?"#FE8209":e>5e3?"#FE9003":e>2e3?"#FEB351":e>1e3?"#FECB88":"#FFECD3"},k=function(e){e.target.setStyle({weight:2,fillOpacity:.6})},C=function(e){e.target.setStyle({weight:1,fillOpacity:.5})},N=function(e){console.log(e.sourceTarget.options.id);var a=e.sourceTarget.options.id;b[a]?f({name:a,cases:_(b[a].cases),todayCases:_(b[a].todayCases),deaths:_(b[a].deaths),recovered:_(b[a].recovered),active:_(b[a].active),updated:new Date(b[a].updated).toLocaleString()}):f({name:a,cases:"Date unavailable",todayCases:"Date unavailable",deaths:"Date unavailable",recovered:"Date unavailable",active:"Date unavailable",updated:"Date unavailable"})},_=function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")};return l.a.createElement("div",null,l.a.createElement("div",{className:"map_container"},l.a.createElement(O.a,{center:[15,25],zoom:3},l.a.createElement(j.a,{url:"https://api.mapbox.com/styles/v1/ryanxin/ckfdup3bt0d5p19rtln7yawiw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicnlhbnhpbiIsImEiOiJja2ZkdTFhajQwNDh6MnRzaG51ZHFsenByIn0.eqvLzhrjtwg78imgHDi6SQ",attribution:'Map data \xa9 <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery \xa9 <a href="https://www.mapbox.com/">Mapbox</a>'}),b&&s.map((function(e){return l.a.createElement(S.a,{key:e.properties.admin,id:e.properties.admin,data:e,style:(a=e.properties.admin,b[a]?{fillColor:y(b[a].cases),weight:1,opacity:.6,color:"white",dashArray:"3",fillOpacity:.5}:{fillColor:y(0),weight:1,opacity:.6,color:"white",dashArray:"3",fillOpacity:.5}),onMouseOver:k,onMouseOut:C,onClick:N});var a}))),l.a.createElement("div",{className:"stats_panel"},l.a.createElement("p",null,"Country:"),l.a.createElement("h4",null,v.name),l.a.createElement("p",null,"Cases:"),l.a.createElement("h4",null,v.cases),l.a.createElement("p",null,"Today Cases:"),l.a.createElement("h4",null,v.todayCases),l.a.createElement("p",null,"Deaths:"),l.a.createElement("h4",null,v.deaths),l.a.createElement("p",null,"Recovered:"),l.a.createElement("h4",null,v.recovered),l.a.createElement("p",null,"Active:"),l.a.createElement("h4",null,v.active),l.a.createElement("p",null,"Last Updated:"),l.a.createElement("h4",null,v.updated)),l.a.createElement(w,null)))},N=t(227),_=t(8),T=function(e){var a=Object(n.useState)([]),t=Object(i.a)(a,2),r=t[0],c=t[1],o=Object(n.useState)({lat:0,lng:0}),s=Object(i.a)(o,2),m=s[0],d=s[1],p=Object(n.useState)({suburb:"-",location:"-",day:"-",month:"-",year:"-",startTime:"-",endTime:"-"}),b=Object(i.a)(p,2),E=b[0],g=b[1],v=new _.Icon({iconUrl:"./caseIcon.svg",iconSize:[40,40]}),f=new _.Icon({iconUrl:"./userIcon.svg",iconSize:[50,50]}),y=function(e){console.log("Clicked"),u.a.get("".concat("https://covid19tracker-ryan.herokuapp.com/cases","/").concat(e.sourceTarget.options.id)).then((function(e){console.log(e.data.singleCase);var a=e.data.singleCase;g(Object(h.a)(Object(h.a)({},E),{},{suburb:a.suburb,location:a.location,day:a.day,month:a.month,year:a.year,startTime:a.startTime,endTime:a.endTime}))})).catch((function(e){return console.log(e)}))};return Object(n.useEffect)((function(){u.a.get("https://covid19tracker-ryan.herokuapp.com/cases").then((function(e){c(e.data)})).catch((function(e){return console.log(e)}))}),[r.length]),Object(n.useEffect)((function(){window.navigator.geolocation&&window.navigator.geolocation.getCurrentPosition((function(e){d({lat:e.coords.latitude,lng:e.coords.longitude})}),console.log)}),[]),l.a.createElement("div",null,l.a.createElement("div",{className:"map_container"},l.a.createElement(O.a,{center:[m.lat,m.lng],zoom:13},l.a.createElement(j.a,{url:"https://api.mapbox.com/styles/v1/ryanxin/ckfdup3bt0d5p19rtln7yawiw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicnlhbnhpbiIsImEiOiJja2ZkdTFhajQwNDh6MnRzaG51ZHFsenByIn0.eqvLzhrjtwg78imgHDi6SQ",attribution:'Map data \xa9 <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery \xa9 <a href="https://www.mapbox.com/">Mapbox</a>'}),r.map((function(e){return l.a.createElement(N.a,{key:e.location,position:[e.lat,e.lng],icon:v,id:e._id,onClick:y})})),l.a.createElement(N.a,{icon:f,position:[m.lat,m.lng]})),l.a.createElement("div",{className:"stats_panel"},l.a.createElement("p",null,l.a.createElement("strong",null,"Suburb: ")),l.a.createElement("h4",null,E.suburb),l.a.createElement("p",null,l.a.createElement("strong",null,"Location: ")),l.a.createElement("h4",null,E.location),l.a.createElement("p",null,l.a.createElement("strong",null,"Date: ")),l.a.createElement("h4",null,E.day," ",E.month," ",E.year),l.a.createElement("p",null,l.a.createElement("strong",null,"Time:")),l.a.createElement("h4",null,"From ",E.startTime,l.a.createElement("strong",null," to "),E.endTime))))},x=t(29),F=function(e){var a=Object(x.a)({requestOptions:{},debounce:300}),t=a.ready,r=a.value,c=a.suggestions,o=c.status,s=c.data,m=a.setValue,u=a.clearSuggestions,d=Object(n.useState)(void 0),p=Object(i.a)(d,2),b=p[0],E=p[1],h=function(a){var t=a.description;return function(){m(t,!1),u(),Object(x.b)({address:t}).then((function(e){return Object(x.c)(e[0])})).then((function(a){var n=a.lat,l=a.lng;console.log(t),console.log("Coordinates: ",{lat:n,lng:l}),e.onSelectLocation(t,n,l)})).catch((function(e){console.log("Error: ",e)}))}};return Object(n.useEffect)((function(){E(e.preLocation)}),[e.preLocation]),l.a.createElement("div",{className:"auto_wrapper"},l.a.createElement("div",{className:"search"},l.a.createElement("input",{value:b||r,onChange:function(e){m(e.target.value)},onClick:function(e){E("")},disabled:!t,placeholder:"e.g. Shopping Mall"})),"OK"===o&&l.a.createElement("div",{className:"auto_list_outer"},l.a.createElement("div",{className:"auto_list_inner"},l.a.createElement("ul",null,s.map((function(e){var a=e.id,t=e.structured_formatting,n=t.main_text,r=t.secondary_text;return l.a.createElement("li",{key:a,onClick:h(e)},l.a.createElement("strong",null,n)," ",l.a.createElement("small",null,r))}))))))},I=function(e){var a=Object(n.useState)({suburb:"",location:"",day:"",month:"",year:"",startTime:"",endTime:"",lat:"",lng:"",suburbs:[]}),t=Object(i.a)(a,2),r=t[0],c=t[1],o=Object(n.useState)({blankField:"",dayFormat:"",yearFormat:"",timeFormat:""}),s=Object(i.a)(o,2),m=s[0],d=s[1],p=function(e){var a=e.target.value;c(Object(h.a)(Object(h.a)({},r),{},Object(E.a)({},e.target.name,a)))};return l.a.createElement("div",{className:"content"},l.a.createElement("h1",null,"Create New Case"),l.a.createElement("form",null,l.a.createElement("label",null,"Suburb:"),l.a.createElement(v,{onSelectSuburb:function(e){c(Object(h.a)(Object(h.a)({},r),{},{suburb:e}))}}),l.a.createElement("label",null,"Location:"),l.a.createElement(F,{onSelectLocation:function(e,a,t){c(Object(h.a)(Object(h.a)({},r),{},{location:e,lat:a,lng:t}))}}),l.a.createElement("div",{className:"form_container"},l.a.createElement("div",{className:"form_container_item"},l.a.createElement("label",null,"Day:"),l.a.createElement("input",{type:"text",name:"day",placeholder:"e.g. 11",onChange:p})),l.a.createElement("div",{className:"form_container_item"},l.a.createElement("label",null,"Month:"),l.a.createElement("select",{type:"text",name:"month",placeholder:"e.g. January",onChange:p},l.a.createElement("option",{value:""},"Select..."),l.a.createElement("option",{value:"January"},"January"),l.a.createElement("option",{value:"February"},"February"),l.a.createElement("option",{value:"March"},"March"),l.a.createElement("option",{value:"April"},"April"),l.a.createElement("option",{value:"May"},"May"),l.a.createElement("option",{value:"June"},"June"),l.a.createElement("option",{value:"July"},"July"),l.a.createElement("option",{value:"August"},"August"),l.a.createElement("option",{value:"September"},"September"),l.a.createElement("option",{value:"October"},"October"),l.a.createElement("option",{value:"November"},"November"),l.a.createElement("option",{value:"December"},"December"))),l.a.createElement("div",{className:"form_container_item"},l.a.createElement("label",null,"Year:"),l.a.createElement("input",{type:"text",name:"year",placeholder:"e.g. 2020",onChange:p}))),l.a.createElement("div",{className:"form_container"},l.a.createElement("div",{className:"form_container_item"},l.a.createElement("label",null,"Start Time:"),l.a.createElement("input",{type:"text",name:"startTime",placeholder:"e.g. 11:00am",onChange:p})),l.a.createElement("div",{className:"form_container_item"},l.a.createElement("label",null,"End Time:"),l.a.createElement("input",{type:"text",name:"endTime",placeholder:"e.g. 2:00pm",onChange:p}))),l.a.createElement("input",{type:"Submit",class:"button_primary",placeholder:"Create",onClick:function(a){a.preventDefault(),console.log("Case create submitted"),function(e){d({blankField:"",dayFormat:"",yearFormat:"",timeFormat:""});var a={},t=!0;""!==r.suburb&&""!==r.location&&""!==r.day&&""!==r.month&&""!==r.year&&""!==r.startTime&&""!==r.endTime||(a.blankField='Fields can"t be blank.',t=!1);/\b([1-9]|[12][0-9]|3[01])\b/.test(r.day)||(a.dayFormat="Invalid date field format.",t=!1);/\b^[2][0]\d{2}\b/.test(r.year)||(a.yearFormat="Invalid year field format.",t=!1);var n=/\b(1[012]|[1-9]):[0-5][0-9](am|pm)$\b/;return n.test(r.startTime)&&n.test(r.endTime)||(a.timeFormat="Invalid time field format.",t=!1),t||d(a),t}()&&u.a.post("https://covid19tracker-ryan.herokuapp.com/cases/create",{suburb:r.suburb,location:r.location,day:r.day,month:r.month,year:r.year,startTime:r.startTime,endTime:r.endTime,lat:r.lat,lng:r.lng}).then((function(a){console.log(a.data);var t=JSON.parse(localStorage.getItem("admin"));e.history.push("/admin/profile/".concat(t._id))})).catch((function(e){return console.log(e)}))}})),l.a.createElement("div",{className:"errorMessage"},l.a.createElement("p",null,m.blankField),l.a.createElement("p",null,m.dayFormat),l.a.createElement("p",null,m.yearFormat),l.a.createElement("p",null,m.timeFormat)))},D=function(e){var a=Object(n.useState)({suburb:"",location:"",day:"",month:"",year:"",startTime:"",endTime:"",lat:"",lng:"",suburbs:[]}),t=Object(i.a)(a,2),r=t[0],c=t[1],o=Object(n.useState)({blankField:"",dayFormat:"",yearFormat:"",timeFormat:""}),s=Object(i.a)(o,2),m=s[0],d=s[1],p=function(e){var a=e.target.value;c(Object(h.a)(Object(h.a)({},r),{},Object(E.a)({},e.target.name,a)))};return Object(n.useEffect)((function(){u.a.get("".concat("https://covid19tracker-ryan.herokuapp.com/cases","/").concat(e.match.params.caseId)).then((function(e){var a=e.data.singleCase;c(Object(h.a)(Object(h.a)({},r),{},{suburb:a.suburb,location:a.location,day:a.day,month:a.month,year:a.year,startTime:a.startTime,endTime:a.endTime,lat:a.lat,lng:a.lng}))})).catch((function(e){return console.log(e)}))}),[]),l.a.createElement("div",{className:"content"},l.a.createElement("h1",null,"Edit Case"),l.a.createElement("form",null,l.a.createElement("label",null,"Suburb:"),l.a.createElement(v,{onSelectSuburb:function(e){c(Object(h.a)(Object(h.a)({},r),{},{suburb:e}))},preSuburb:r.suburb}),l.a.createElement("label",null,"Location:"),l.a.createElement(F,{onSelectLocation:function(e,a,t){c(Object(h.a)(Object(h.a)({},r),{},{location:e,lat:a,lng:t}))},preLocation:r.location}),l.a.createElement("div",{className:"form_container"},l.a.createElement("div",{className:"form_container_item"},l.a.createElement("label",null,"Day:"),l.a.createElement("input",{type:"text",name:"day",placeholder:"e.g. 11",onChange:p,defaultValue:r.day})),l.a.createElement("div",{className:"form_container_item"},l.a.createElement("label",null,"Month:"),l.a.createElement("select",{type:"text",name:"month",value:r.month,placeholder:"e.g. January",onChange:p},l.a.createElement("option",{value:""},"Select..."),l.a.createElement("option",{value:"January"},"January"),l.a.createElement("option",{value:"February"},"February"),l.a.createElement("option",{value:"March"},"March"),l.a.createElement("option",{value:"April"},"April"),l.a.createElement("option",{value:"May"},"May"),l.a.createElement("option",{value:"June"},"June"),l.a.createElement("option",{value:"July"},"July"),l.a.createElement("option",{value:"August"},"August"),l.a.createElement("option",{value:"September"},"September"),l.a.createElement("option",{value:"October"},"October"),l.a.createElement("option",{value:"November"},"November"),l.a.createElement("option",{value:"December"},"December"))),l.a.createElement("div",{className:"form_container_item"},l.a.createElement("label",null,"Year:"),l.a.createElement("input",{type:"text",name:"year",placeholder:"e.g. 2020",onChange:p,defaultValue:r.year}))),l.a.createElement("div",{className:"form_container"},l.a.createElement("div",{className:"form_container_item"},l.a.createElement("label",null,"Start Time:"),l.a.createElement("input",{type:"text",name:"startTime",placeholder:"e.g. 11:00am",onChange:p,defaultValue:r.startTime})),l.a.createElement("div",{div:!0,className:"form_container_item"},l.a.createElement("label",null,"End Time:"),l.a.createElement("input",{type:"text",name:"endTime",placeholder:"e.g. 2:00pm",onChange:p,defaultValue:r.endTime}))),l.a.createElement("input",{type:"Submit",className:"button_primary",placeholder:"Create",onClick:function(a){a.preventDefault(),function(e){d({blankField:"",dayFormat:"",yearFormat:"",timeFormat:""}),console.log("Case create submitted");var a={},t=!0;""!==r.suburb&&""!==r.location&&""!==r.day&&""!==r.month&&""!==r.year&&""!==r.startTime&&""!==r.endTime||(a.blankField='Fields can"t be blank.',t=!1);/\b([1-9]|[12][0-9]|3[01])\b/.test(r.day)||(a.dayFormat="Invalid date field format.",t=!1);/\b^[2][0]\d{2}\b/.test(r.year)||(a.yearFormat="Invalid year field format.",t=!1);var n=/\b(1[012]|[1-9]):[0-5][0-9](am|pm)$\b/;return n.test(r.startTime)&&n.test(r.endTime)||(a.timeFormat="Invalid time field format.",t=!1),t||d(a),t}()&&u.a.post("https://covid19tracker-ryan.herokuapp.com/cases/edit",{suburb:r.suburb,location:r.location,day:r.day,month:r.month,year:r.year,startTime:r.startTime,endTime:r.endTime,lat:r.lat,lng:r.lng,caseId:e.match.params.caseId}).then((function(a){console.log(a.data);var t=JSON.parse(localStorage.getItem("admin"));e.history.push("/admin/profile/".concat(t._id))})).catch((function(e){return console.log(e)})),console.log("Edit case executed")}})),l.a.createElement("div",{className:"errorMessage"},l.a.createElement("p",null,m.blankField),l.a.createElement("p",null,m.dayFormat),l.a.createElement("p",null,m.yearFormat),l.a.createElement("p",null,m.timeFormat)))},L=function(e){var a=Object(n.useState)({}),t=Object(i.a)(a,2),c=t[0],o=t[1],s=Object(n.useState)([]),m=Object(i.a)(s,2),d=m[0],p=m[1],b=function(e){console.log("Delete case executed"),console.log(e.target.id),console.log(c._id),u.a.post("https://covid19tracker-ryan.herokuapp.com/cases/delete",{caseId:e.target.id,adminId:c._id}).then((function(e){console.log(e.data),p(e.data.cases)})).catch((function(e){return console.log(e)}))};return Object(n.useEffect)((function(){u.a.get("".concat("https://covid19tracker-ryan.herokuapp.com/admin/profile","/").concat(e.match.params.adminId)).then((function(e){console.log(e.data),o(e.data.admin),p(e.data.cases)})).catch((function(e){return console.log(e)}))}),[]),l.a.createElement("div",{className:"admin_cases"},l.a.createElement("div",{className:"admin_header"},l.a.createElement("h1",null,"Admin Cases"),l.a.createElement(r.b,{className:"button_secondary button_addcase",to:"/cases/create"},"Add Case")),l.a.createElement("div",{className:"table header"},l.a.createElement("div",null,"Suburb"),l.a.createElement("div",null,"Location"),l.a.createElement("div",null,"Date"),l.a.createElement("div",null,"Time"),l.a.createElement("div",null),l.a.createElement("div",null)),d.map((function(e){return l.a.createElement("div",{key:e._id,className:"table row"},l.a.createElement("div",null,e.suburb),l.a.createElement("div",null,e.location),l.a.createElement("div",null,e.day," ",e.month," ",e.year),l.a.createElement("div",null,e.startTime," - ",e.endTime),l.a.createElement(r.b,{className:"button_third",to:"/cases/edit/".concat(e._id)},"Edit"),l.a.createElement("div",{id:e._id,className:"button_third",onClick:b},"Delete"))})))},J=t(84),M=function(e){var a=e.component,t=Object(J.a)(e,["component"]);return l.a.createElement(s.b,Object.assign({},t,{render:function(e){return localStorage.getItem("token")?l.a.createElement(a,e):l.a.createElement(s.a,{to:"/user/login"})}}))},A=function(e){var a=Object(n.useState)(void 0),t=Object(i.a)(a,2),c=t[0],o=t[1],m=Object(n.useState)(void 0),d=Object(i.a)(m,2),E=d[0],h=d[1],g=Object(n.useState)(!1),v=Object(i.a)(g,2),O=v[0],j=v[1],S=Object(n.useState)(!1),w=Object(i.a)(S,2),N=w[0],_=w[1],x=Object(n.useState)(""),F=Object(i.a)(x,2),J=F[0],A=F[1],B=Object(s.f)();return Object(n.useEffect)((function(){var e=localStorage.getItem("token");e&&(u.a.defaults.headers.common.Authorization="Bearer ".concat(e)),j(!0);var a=JSON.parse(localStorage.getItem("user"));a&&o(a);var t=JSON.parse(localStorage.getItem("admin"));t&&h(t);var n=p()("https://covid19tracker-ryan.herokuapp.com");n.on("connect",(function(){console.log("Websocket connection established!")})),n.on("notification",(function(e){_(!0),A(e.case)}))}),[]),l.a.createElement("div",null,O&&l.a.createElement("div",{className:"main_wrapper"},l.a.createElement(r.a,null,l.a.createElement("nav",null,l.a.createElement("div",{className:"nav_wrapper"},l.a.createElement("div",{className:"nav_left"},l.a.createElement(r.b,{to:"/world"},l.a.createElement("img",{src:"./logo.svg",alt:"logo",className:"logo"}))),l.a.createElement("div",{className:"nav_right"},l.a.createElement("ul",null,c||E?l.a.createElement("div",null,l.a.createElement("li",null,l.a.createElement(r.b,{to:"/world"},"World Cases")),l.a.createElement("li",null,l.a.createElement(r.b,{to:"/sydney"},"Nearby Cases")),E&&l.a.createElement("li",null,l.a.createElement(r.b,{to:"/admin/profile/".concat(E._id)},"Your Cases")),l.a.createElement("li",null,l.a.createElement("a",{onClick:function(e){o(void 0),h(void 0),localStorage.removeItem("user"),localStorage.removeItem("admin"),localStorage.removeItem("token"),B.push("/user/login")}},"Logout"))):l.a.createElement("div",null,l.a.createElement("li",null,l.a.createElement(r.b,{to:"/user/login"},"Login")),l.a.createElement("li",null,l.a.createElement(r.b,{to:"/user/signup"},"Sign Up"))))))),l.a.createElement(M,{exact:!0,path:["/","/world"],component:C}),l.a.createElement(M,{exact:!0,path:"/sydney",component:T}),l.a.createElement(s.b,{exact:!0,path:"/user/login",component:b}),l.a.createElement(s.b,{exact:!0,path:"/user/signup",component:f}),l.a.createElement(s.b,{exact:!0,path:"/admin/login",component:y}),l.a.createElement(M,{exact:!0,path:"/admin/profile/:adminId",component:L}),l.a.createElement(M,{exact:!0,path:"/cases/create",component:I}),l.a.createElement(M,{exact:!0,path:"/cases/edit/:caseId",component:D}),l.a.createElement(s.b,{exact:!0,path:"/thankyoutoourheros",component:k}),l.a.createElement("footer",null,l.a.createElement("div",{className:"footer_wrapper"},l.a.createElement("div",{className:"footer_left"},l.a.createElement("ul",null,l.a.createElement("li",null,"Copyright \xa9 2020 GA-SEI 37 by Ryan Xin"),l.a.createElement("li",null,l.a.createElement("a",{target:"_blank",href:"https://www.linkedin.com/in/ryan-xin/"},"LinkedIn")),l.a.createElement("li",null,l.a.createElement("a",{target:"_blank",href:"https://github.com/ryan-xin"},"GitHub")))),l.a.createElement("div",{className:"footer_right"},!E&&l.a.createElement("p",null,l.a.createElement(r.b,{to:"/admin/login"},"Admin Login"))))),N&&c&&l.a.createElement("div",{className:"notification"},l.a.createElement("h3",null,"New Case Alert"),l.a.createElement("p",null,l.a.createElement("strong",null,"Suburb: ")),l.a.createElement("h4",null,J.suburb),l.a.createElement("p",null,l.a.createElement("strong",null,"Location: ")),l.a.createElement("h4",null,J.location),l.a.createElement("p",null,l.a.createElement("strong",null,"Date: ")),l.a.createElement("h4",null,J.day," ",J.month," ",J.year),l.a.createElement("p",null,l.a.createElement("strong",null,"Time: ")),l.a.createElement("h4",null,"From ",J.startTime," to ",J.endTime),l.a.createElement("span",{className:"button_fourth",onClick:function(e){_(!1)}},"Got it.")))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(217),t(218),t(219),t(220),t(221),t(222),t(223),t(224),t(225);o.a.render(l.a.createElement(r.a,null,l.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},86:function(e,a,t){e.exports=t(226)}},[[86,1,2]]]);
//# sourceMappingURL=main.b967de7b.chunk.js.map