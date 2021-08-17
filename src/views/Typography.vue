<template>
  <v-container fluid>
    <v-card class="mt-5 pa-3">
      <v-card-title>
        typography
      </v-card-title>
      <v-container
        fluid
        class="grey lighten-3"
      >
        <v-card class="pa-3 text-h2 error primary--text">
          Contents
        </v-card>
        <v-card
          class="pa-3"
          outlined
        >
          <p class="text-h1 primary--text darken-1">
            Heading 1
          </p>
          <p class="text-h2 primary--text darken-4">
            Heading 2
          </p>
          <p class="text-h3 secondary">
            Heading 3
          </p>
          <p class="text-h4">
            Heading 4
          </p>
          <p class="text-h5">
            Heading 5
          </p>
          <p class="text-h6">
            Heading 6
          </p>
          Subtitle 1
          Subtitle 2
          Body 1
          Body 2
          BUTTON
          Caption
          OVERLINE
        </v-card>
      </v-container>
      <v-card-title>
        typography - mobile
      </v-card-title>
      <v-container class="orange lighten-3">
        <v-card class="pa-3 text-h2 primary">
          Contents
        </v-card>
        <v-card
          class="pa-3"
          outlined
        >
          <p class="text-h1 text-md-subtitle-1">
            Default is text-h1, when larger than md? subtitle-1
          </p>
          <p class="font-weight-black">
            Font weight bold
          </p>
          <p class="font-weight-light">
            Font weight light
          </p>
          <p class="text-justify">
            THIS IS JUSTIFY - Text breaking and the removal of text-transform is also possible. In the first example, the text-transform: uppercase custom class is overwritten and allows the text casing to remain. In the second example, we break up a longer word to fit the available space.
          </p>
          <p class="text-justify text-md-right">
            DEFAULT IS IS JUSTIFY - when md or larger its right
          </p>
        </v-card>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Typography'
}
</script>
