<template>
  <q-btn
    class="col-shrink"
    flat
    rounded
    color="primary"
    icon="help"
    dense
  >
    <q-tooltip>
      Click to open Help
    </q-tooltip>
    <q-menu>
      <q-card
        style="width: 350px;"
      >
        <q-card-section
          class="text-subtitle2 q-py-sm"
        >
          Message keywords
        </q-card-section>
        <q-separator />
        <q-card-section
          class="q-py-sm q-col-gutter-sm"
        >
          <c-row-input>
            <c-row-input-label
              dense
            >
              @name
            </c-row-input-label>
            <c-row-input-content>
              It will be changed to <br> " your name "
            </c-row-input-content>
          </c-row-input>
          <c-row-input>
            <c-row-input-label
              dense
            >
              @schedule
            </c-row-input-label>
            <c-row-input-content>
              It will be changed to <br> " Schedule content "
            </c-row-input-content>
          </c-row-input>
        </q-card-section>
      </q-card>
    </q-menu>
  </q-btn>
</template>
<script lang="ts">
export default {
  name: 'AppManagerFormScriptHelper',
}
</script>
<script setup lang="ts">
import CRowInput from '@/components/commons/inputs/Row/index.vue'
import CRowInputLabel from '@/components/commons/inputs/Row/components/Label.vue'
import CRowInputContent from '@/components/commons/inputs/Row/components/Content.vue'
</script>
