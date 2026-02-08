<script setup lang="ts">
import { useNavigation } from "@/composables/useNavigation";
import PersonalAccounts from "./PersonalAccounts.vue";

const { navigationItems, navigateTo } = useNavigation();
</script>

<template>
  <VCard class="mb-4">
    <VCardText>
      <VRow class="mb-6">
        <VCol cols="12">
          <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <RouterLink :to="'/'">
                <VImg
                  src="@/assets/logo.svg"
                  width="50px"
                  class="mr-4 cursor-pointer"
                />
              </RouterLink>
              <h1 class="text-h4">Account Control</h1>
            </div>
            <PersonalAccounts />
          </div>
        </VCol>
      </VRow>
      <VRow>
        <VCol
          v-for="item in navigationItems"
          :key="item.path"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <VCard
            :color="item.color || 'surface'"
            variant="tonal"
            hover
            class="navigation-card"
            @click="navigateTo(item.path)"
          >
            <VCardText class="text-center">
              <VIcon :icon="item.icon" size="48" class="mb-3" />
              <h3 class="text-h6 mb-2">{{ item.title }}</h3>
              <p v-if="item.description" class="text-caption">
                {{ item.description }}
              </p>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style scoped>
.navigation-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.navigation-card:hover {
  transform: translateY(-4px);
}
</style>
