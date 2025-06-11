<template>
  <tr class="border-b">
    <td class="p-2 border">
      <UserFieldName v-if="isEditing" v-model="localName" />
      <span v-else>{{ user.name }}</span>
    </td>

    <td class="p-2 border">
      <UserFieldEmail v-if="isEditing" v-model="localEmail" />
      <span v-else>{{ user.email }}</span>
    </td>

    <td class="p-2 border">
      <UserFieldPassword v-if="isEditing" v-model="localPassword" />
      <span v-else>*********</span>
    </td>

    <td class="p-2 border">
      <UserRowActions
        :isEditing="isEditing"
        :showDelete="false"
        @startEdit="onStartEdit"
        @saveEdit="onSaveEdit"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { User } from '@/domain/models/User'
import { ref, computed, watch } from 'vue'
import UserFieldName from '@/components/shared/UserFieldName.vue'
import UserFieldEmail from '@/components/shared/UserFieldEmail.vue'
import UserFieldPassword from '@/components/shared/UserFieldPassword.vue'
import UserRowActions from '@/components/admin/UserRowActions.vue'

const props = defineProps<{
  user: User
  editingUserId: number | null
}>()

const emit = defineEmits<{
  (e: 'startEdit', user: User): void
  (e: 'saveEdit', userId: number, name: string, email: string, password: string): void
}>()

const localName = ref(props.user.name)
const localEmail = ref(props.user.email)
const localPassword = ref('')

watch(() => props.user, (newUser) => {
  localName.value = newUser.name
  localEmail.value = newUser.email
  localPassword.value = ''
}, { immediate: true })

const isEditing = computed(() => props.editingUserId === props.user.id)

function onStartEdit() {
  emit('startEdit', props.user)
}

function onSaveEdit() {
  emit('saveEdit', props.user.id, localName.value, localEmail.value, localPassword.value)
}
</script>
