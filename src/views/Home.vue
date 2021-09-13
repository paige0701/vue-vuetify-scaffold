<template>
  <v-container fluid>
    <v-card>
      <template v-for="item in selectedWorkouts">
        <common-chip
          :key="item._index"
          :name="item"
          @delete="onDeleteChip"
        />
      </template>
    </v-card>
  </v-container>
</template>
<script>
import CommonChip from "@/components/TheChip";
export default {
  name: 'TheHome',
  components: {
    CommonChip
  },
  data() {
    return {
      selectedWorkouts: ['ashtanga', 'leg', 'arm']
    }
  },
  methods: {
    onDeleteChip() {
      console.info('on delete chip')
    }
  }
}
</script>
