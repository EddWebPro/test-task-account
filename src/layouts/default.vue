<script lang="ts" setup>
import { useNavigation } from "@/composables/useNavigation";
import HorizontalHeaderNav from "./components/HorizontalHeaderNav.vue";
import VerticalHeaderNav from "./components/VerticalHeaderNav.vue";

const { isMobileNavigation } = useNavigation();
//
</script>

<template>
  <VContainer fluid>
    <VerticalHeaderNav v-if="isMobileNavigation" />

    <HorizontalHeaderNav v-else />
  </VContainer>
  <VMain>
    <RouterView />
  </VMain>

  <!-- <AppFooter /> -->
</template>
