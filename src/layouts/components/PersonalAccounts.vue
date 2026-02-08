<script setup lang="ts">
const user = {
  initials: "JD",
  fullName: "John Doe",
  email: "john.doe@doe.com",
};

const editAccount = () => {
  console.log("Edit account");
};

const settings = () => {
  console.log("Settings");
};

const disconnect = () => {
  console.log("Disconnect");
};
</script>

<template>
  <VMenu min-width="200px" location="bottom end">
    <template v-slot:activator="{ props }">
      <VBtn icon v-bind="props" variant="text">
        <VAvatar color="primary" size="48">
          <span class="text-h6">{{ user.initials }}</span>
        </VAvatar>
      </VBtn>
    </template>
    <VCard min-width="250">
      <VCardText>
        <div class="text-center">
          <VAvatar color="primary" size="64" class="mb-3">
            <span class="text-h5">{{ user.initials }}</span>
          </VAvatar>
          <h3 class="text-h6">{{ user.fullName }}</h3>
          <p class="text-caption text-medium-emphasis mt-1">
            {{ user.email }}
          </p>
        </div>
      </VCardText>

      <VDivider></VDivider>

      <VList density="compact">
        <VListItem prepend-icon="mdi-account-edit" @click="editAccount">
          <VListItemTitle>Edit Account</VListItemTitle>
        </VListItem>

        <VListItem prepend-icon="mdi-cog" @click="settings">
          <VListItemTitle>Settings</VListItemTitle>
        </VListItem>
      </VList>

      <VDivider></VDivider>

      <VCardActions>
        <VBtn
          block
          variant="text"
          color="error"
          prepend-icon="mdi-logout"
          @click="disconnect"
        >
          Disconnect
        </VBtn>
      </VCardActions>
    </VCard>
  </VMenu>
</template>
