import { defineStore } from "pinia";
import { ref } from "vue";
import type { Account, Tag } from "@/types/Account";

export const useAccountStore = defineStore("account", () => {
  const accounts = ref<Account[]>([]);

  // Загрузка из localStorage при инициализации
  const loadAccounts = () => {
    const saved = localStorage.getItem("accounts");
    if (saved) {
      try {
        accounts.value = JSON.parse(saved);
      } catch (e) {
        console.error("Error loading accounts:", e);
      }
    }
  };

  // Сохранение в localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem("accounts", JSON.stringify(accounts.value));
  };

  // Преобразование строки меток в массив объектов
  const parseTags = (labelString: string): Tag[] => {
    if (!labelString.trim()) return [];
    return labelString
      .split(";")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .map((tag) => ({ text: tag }));
  };

  // Добавление новой учетной записи
  const addAccount = () => {
    const newAccount: Account = {
      id: Date.now().toString(),
      label: "",
      tags: [],
      type: "Локальная",
      login: "",
      password: "",
    };
    accounts.value.push(newAccount);
  };

  // Обновление учетной записи
  const updateAccount = (id: string, data: Partial<Account>) => {
    const index = accounts.value.findIndex((acc) => acc.id === id);
    if (index !== -1) {
      // Если обновляется label, пересчитываем tags
      if (data.label !== undefined) {
        data.tags = parseTags(data.label);
      }

      // Если тип меняется на LDAP, обнуляем пароль
      if (data.type === "LDAP") {
        data.password = null;
      }

      accounts.value[index] = { ...accounts.value[index], ...data };
      saveToLocalStorage();
    }
  };

  // Удаление учетной записи
  const deleteAccount = (id: string) => {
    accounts.value = accounts.value.filter((acc) => acc.id !== id);
    saveToLocalStorage();
  };

  // Валидация учетной записи
  const validateAccount = (account: Account): boolean => {
    if (!account.login.trim()) return false;
    if (account.type === "Локальная" && !account.password) return false;
    return true;
  };

  // Инициализация при создании store
  loadAccounts();

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    validateAccount,
    saveToLocalStorage,
  };
});
