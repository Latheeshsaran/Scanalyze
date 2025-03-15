import type React from "react"
import {
  Brain,
  TreesIcon as Lungs,
  FileX,
  MessageSquare,
  LayoutDashboard,
  Settings,
  Upload,
  Download,
  FileText,
  Search,
  Zap,
  User,
  LogIn,
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  brain: Brain,
  lungs: Lungs,
  xray: FileX,
  messageSquare: MessageSquare,
  layoutDashboard: LayoutDashboard,
  settings: Settings,
  upload: Upload,
  download: Download,
  fileText: FileText,
  search: Search,
  zap: Zap,
  user: User,
  login: LogIn,
  logout: LogOut,
  moon: Moon,
  sun: Sun,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  menu: Menu,
  close: X,
  medical: ({ ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
      <path d="M16 5h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
      <line x1="12" x2="12" y1="3" y2="21" />
      <line x1="8" x2="8" y1="12" y2="12" />
      <line x1="16" x2="16" y1="12" y2="12" />
    </svg>
  ),
}

