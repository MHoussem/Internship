 
import Dashboard from "views/Dashboard.js";
import Data from "views/Data";
 import Stream from "views/Stream.js"
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import RealTime from "views/RealTime";
 
 

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/RealTime ",
    name: "RealTime",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <RealTime />,
    layout: "/admin",
  },
  {
    path: "/Stream",
    name: "Stream",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Stream/>,
    layout: "/admin",
  },
  {
    path: "/data",
    name: "Load Data",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: <Data/>,
    layout: "/admin",
  },
 
  {
    path: "/notifications",
    name: "Connexion Devices",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: <Notifications />,
    layout: "/admin",
  },
   
  
  
];
export default routes;
