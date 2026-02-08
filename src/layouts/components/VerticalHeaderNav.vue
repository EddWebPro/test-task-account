<script setup lang="ts">
import { useNavigation } from "@/composables/useNavigation";
import PersonalAccounts from "./PersonalAccounts.vue";

const { navigationItems, navigateTo } = useNavigation();
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex align-center justify-space-between mb-4">
        <div class="d-flex align-center">
          <RouterLink :to="'/'">
            <VImg
              src="@/assets/logo.svg"
              width="40px"
              class="mr-3 cursor-pointer"
            />
          </RouterLink>
          <h2 class="text-h6">Account Control</h2>
        </div>
        <PersonalAccounts />
      </div>

      <VDivider class="mb-4" />

      <VList>
        <VListItem
          v-for="item in navigationItems"
          :key="item.path"
          :prepend-icon="item.icon"
          :title="item.title"
          :subtitle="item.description"
          :value="item.path"
          class="navigation-list-item"
          @click="navigateTo(item.path)"
        >
          <template #append>
            <VIcon icon="mdi-chevron-right" />
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style scoped>
.navigation-list-item {
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 4px;
}

.navigation-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
}
</style>
