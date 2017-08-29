import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://media.timeout.com/images/101705313/image.jpg',
        id: 'okrpitbpirtbmef',
        title: 'Meetup in New York',
        date: new Date(),
        location: 'New York',
        description: 'It NY'
      },
      {
        imageUrl: 'https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/2050/SITours/paris-in-one-day-sightseeing-tour-in-paris-130592.jpg',
        id: 'egvrepimvpreve',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Parri',
        description: 'It Parin'
      }
    ],
    user: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    createMeetup ({ commit }, payload) {
      const meetup = {
        id: 'dvcwecewvwev',
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date
      }
      // Reach out to firebase and store it
      commit('createMeetup', meetup)
    },
    signUserUp ({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
            registerMeetups: []
          }
          commit('setUser', newUser)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    signUserIn ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
            registerMeetups: []
          }
          commit('setUser', newUser)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    }
  }
})
