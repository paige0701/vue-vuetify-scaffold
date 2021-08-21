<template>
  <v-list
    dense
    nav
    expand
  >
    <template v-for="(item, index) in items">
      <default-list-group
        v-if="item.items"
        :key="`group-${index}`"
        :item="item"
      />
      <default-list-item
        v-else
        :key="`item-${index}`"
        :item="item"
      />
    </template>
  </v-list>
</template>
<script>
import DefaultListItem from '@/layouts/default/ListItem'
import DefaultListGroup from '@/layouts/default/ListGroup'
export default {
  name: 'DefaultList',
  components: {
    DefaultListItem,
    DefaultListGroup
  },
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
