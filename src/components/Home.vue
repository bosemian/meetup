<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <router-link to="/meetups" tag="button">
          <v-btn large class="info">Explor Meetups</v-btn>
        </router-link>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <router-link to="/meetup/new" tag="button">
          <v-btn large class="info">Organize Meetups</v-btn>
        </router-link>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key="meetup.id"
            @click="onLoadMeetup(meetup.id)">
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
     <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join out awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    }
  },

  methods: {
    onLoadMeetup (id) {
      this.$router.push(`/meetups/${id}`)
    }
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #FFF;
  font-size: 2em;
  padding: 30px;
}
</style>
