export interface NavigationItem {
  title: string;
  path: string;
  icon: string;
  description?: string;
  color?: string;
  requiresAuth?: boolean;
  role?: string;
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Учетные записи",
    path: "/accounts",
    icon: "mdi-account-multiple",
    description: "Управление учетными записями",
    color: "primary",
  },
  {
    title: "Пользователи",
    path: "/users",
    icon: "mdi-account-group",
    description: "Список пользователей",
    color: "success",
    requiresAuth: true,
  },
  {
    title: "Настройки",
    path: "/settings",
    icon: "mdi-cog",
    description: "Настройки системы",
    color: "warning",
    role: "admin",
  },
  // Добавляйте новые пункты сюда по мере роста приложения
];
