<template>
  <c-card
    class="tw-shadow-none"
  >
    <c-list
      class="tw-divide-y tw-divide-gray-300"
    >
      <c-list-title>
        test
      </c-list-title>
      <c-list-item
        @click="onClickToId('manager-image-list')"
      >
        Manager Image List
      </c-list-item>
      <c-list-item
        @click="onClickToId('manager-setting')"
      >
        Manager Setting
      </c-list-item>
      <c-list-item
        @click="onClickToId('random-click-message-list')"
      >
        random click message list
      </c-list-item>
      <c-list-item
        @click="onClickToId('morning-message-list')"
      >
        morning message list
      </c-list-item>
      <c-list-item
        @click="onClickToId('lunch-message-list')"
      >
        lunch message list
      </c-list-item>
      <c-list-item
        @click="onClickToId('evening-message-list')"
      >
        evening message list
      </c-list-item>
      <c-list-item
        @click="onClickToId('night-message-list')"
      >
        night message list
      </c-list-item>
    </c-list>
  </c-card>
</template>
<script lang="ts">
export default {
  name: 'FormMangerTitleNavigator',
}
</script>
<script setup lang="ts">
import CList from '@/components/commons/List/index.vue'
import CListItem from '@/components/commons/List/components/Item.vue'
import CListTitle from '@/components/commons/List/components/Title.vue'
import CCard from '@/components/commons/Card/index.vue'

const onClickToId = (elementId: string) => {
  const elementById = document.getElementById(elementId)
  if (elementById) {
    elementById.scrollIntoView({
      behavior: 'smooth'
    })
  }
}
</script>
