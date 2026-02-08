<script setup lang="ts">
import { useAccountStore } from "@/stores/accountStore";
import AccountItem from "./AccountItem.vue";
import TagsInfo from "./TagsInfo.vue";

const accountStore = useAccountStore();

const addNewAccount = () => {
  accountStore.addAccount();
};
</script>

<template>
  <VContainer fluid>
    <VCard elevation="2">
      <VCardTitle class="d-flex justify-space-between align-center">
        <span class="text-h5">Учетные записи</span>
        <VBtn icon="mdi-plus" color="primary" @click="addNewAccount" />
      </VCardTitle>

      <VCardText>
        <!-- Подсказка -->
        <TagsInfo />

        <!-- Заголовки колонок -->
        <VRow class="mb-2 font-weight-bold text-body-2">
          <VCol cols="12" sm="3">Метка</VCol>
          <VCol cols="12" sm="2">Тип записи</VCol>
          <VCol cols="12" sm="3">Логин</VCol>
          <VCol cols="12" sm="3">Пароль</VCol>
          <VCol cols="12" sm="1"></VCol>
        </VRow>

        <VDivider class="mb-4" />

        <!-- Список учетных записей -->
        <div
          v-if="accountStore.accounts.length === 0"
          class="text-center text-disabled py-8"
        >
          Нет учетных записей. Нажмите "+" для добавления.
        </div>

        <AccountItem
          v-for="account in accountStore.accounts"
          :key="account.id"
          :account="account"
        />
      </VCardText>
    </VCard>
  </VContainer>
</template>
