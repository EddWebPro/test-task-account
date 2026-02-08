<script setup lang="ts">
import { ref, watch } from "vue";
import { useAccountStore } from "@/stores/accountStore";
import type { Account, AccountType } from "@/types/Account";

const props = defineProps<{
  account: Account;
}>();

const accountStore = useAccountStore();

const localAccount = ref<Account>({ ...props.account });
const showPassword = ref(false);
const errors = ref({
  login: false,
  password: false,
});

const accountTypes: AccountType[] = ["Локальная", "LDAP"];

// Синхронизация локальных данных с пропсами
watch(
  () => props.account,
  (newVal) => {
    localAccount.value = { ...newVal };
  },
  { deep: true },
);

// Валидация и сохранение
const handleBlur = () => {
  validate();
  if (!errors.value.login && !errors.value.password) {
    accountStore.updateAccount(localAccount.value.id, localAccount.value);
  }
};

// Обработка изменения типа
const handleTypeChange = () => {
  if (localAccount.value.type === "LDAP") {
    localAccount.value.password = null;
    errors.value.password = false;
  } else if (!localAccount.value.password) {
    localAccount.value.password = "";
  }
  accountStore.updateAccount(localAccount.value.id, localAccount.value);
};

// Валидация полей
const validate = () => {
  errors.value.login = !localAccount.value.login.trim();
  errors.value.password =
    localAccount.value.type === "Локальная" &&
    (!localAccount.value.password || !localAccount.value.password.trim());
};

// Удаление записи
const handleDelete = () => {
  accountStore.deleteAccount(localAccount.value.id);
};
</script>

<template>
  <VRow class="mb-2 align-center">
    <!-- Метка -->
    <VCol cols="12" sm="3">
      <VTextField
        v-model="localAccount.label"
        label="Метка"
        variant="outlined"
        density="compact"
        :maxlength="50"
        :counter="50"
        hide-details
        @blur="handleBlur"
      />
    </VCol>

    <!-- Тип записи -->
    <VCol cols="12" sm="2">
      <VSelect
        v-model="localAccount.type"
        label="Тип записи"
        variant="outlined"
        density="compact"
        :items="accountTypes"
        hide-details
        @update:model-value="handleTypeChange"
      />
    </VCol>

    <!-- Логин -->
    <VCol cols="12" sm="3">
      <VTextField
        v-model="localAccount.login"
        label="Логин"
        variant="outlined"
        density="compact"
        :maxlength="100"
        :error="errors.login"
        hide-details
        @blur="handleBlur"
      />
    </VCol>

    <!-- Пароль (только для Локальной) -->
    <VCol cols="12" sm="3">
      <VTextField
        v-if="localAccount.type === 'Локальная'"
        v-model="localAccount.password"
        label="Пароль"
        variant="outlined"
        density="compact"
        :maxlength="100"
        :type="showPassword ? 'text' : 'password'"
        :error="errors.password"
        hide-details
        @blur="handleBlur"
      >
        <template #append-inner>
          <VIcon
            :icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click="showPassword = !showPassword"
          />
        </template>
      </VTextField>
      <div v-else class="text-disabled pa-3">—</div>
    </VCol>

    <!-- Кнопка удаления -->
    <VCol cols="12" sm="1" class="d-flex justify-center">
      <VBtn
        icon="mdi-delete"
        variant="text"
        color="error"
        size="small"
        @click="handleDelete"
      />
    </VCol>
  </VRow>
</template>

<style scoped>
.text-disabled {
  color: rgba(0, 0, 0, 0.38);
}
</style>
