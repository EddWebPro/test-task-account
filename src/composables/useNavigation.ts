import { navigationItems } from "@/layouts/navigation/horizontal";
import type { NavigationItem } from "@/layouts/navigation/horizontal";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

export const useNavigation = () => {
  const router = useRouter();
  const { mobile, mdAndDown } = useDisplay();

  // Фильтрация элементов навигации по правам доступа
  const filteredItems = computed(() => {
    // Временно отключена фильтрация по авторизации и ролям
    // const userRole = localStorage.getItem("user_role");
    // const isAuthenticated = !!localStorage.getItem("auth_token");

    // return navigationItems.filter((item) => {
    //   // Проверка авторизации
    //   if (item.requiresAuth && !isAuthenticated) {
    //     return false;
    //   }

    //   // Проверка роли
    //   if (item.role && item.role !== userRole) {
    //     return false;
    //   }

    //   return true;
    // });

    // Пока возвращаем все элементы без фильтрации
    return navigationItems;
  });

  // Навигация на указанный путь
  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Проверка активного маршрута
  const isActive = (path: string) => {
    return router.currentRoute.value.path === path;
  };

  // Определение типа навигации (мобильная/десктопная)
  const isMobileNavigation = computed(() => mobile.value);
  const isTabletNavigation = computed(() => mdAndDown.value);

  return {
    // Данные
    navigationItems: filteredItems,

    // Методы
    navigateTo,
    isActive,

    // Responsive
    isMobileNavigation,
    isTabletNavigation,
  };
};
