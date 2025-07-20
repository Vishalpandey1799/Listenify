import {
  LayoutDashboard,
  Bot,
  User
} from "lucide-react";

export const Menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/listenify/profile" 
  },
  {
    name: "AI-Tools",
    icon: Bot,
    path: "/listenify/ai-tools"
  },
  {
    name: "Friends",
    icon: User,
    path: "/listenify/connections"
  }
];