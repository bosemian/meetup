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
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex((meetup) => meetup.id === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fireKey[id] = payload.fireKey
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.fireKey, payload)
    },
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find((meetup) => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    registerUserForMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref(`/users/${user.id}`).child('/registrations/')
        .push(payload)
        .then((data) => {
          commit('setLoading', false)
          commit('registerUserForMeetup', {
            id: payload,
            fireKey: data.key
          })
        })
        .catch((err) => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    unregisterUserFromMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fireKey) {
        return
      }
      const fireKey = user.fireKey[payload]
      firebase.database().ref(`/users/${user.id}/registrations`)
        .child(fireKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromMeetup', payload)
        })
        .catch((err) => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    // fetch data from firebase server
    loadMeetups ({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch((err) => {
          console.log(err)
          commit('setLoading', true)
        })
    },
    // CreateMeetup
    createMeetup ({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then((key) => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref(`meetups/${key}${ext}`).put(payload.image)
        })
        .then((data) => {
          imageUrl = data.metadata.downloadURLs[0]
          return firebase.database().ref('meetups')
            .child(key).update({ imageUrl: imageUrl })
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((err) => {
          console.log(err)
        })
      // Reach out to firebase and store it
    },
    // SignUp
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fireKey: {}
          }
          commit('setUser', newUser)
        })
        .catch((err) => {
          commit('setLoading', false)
          commit('setError', err)
          console.log(err)
        })
    },
    // updated meetup
    updateMeetupData ({ commit }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups')
        .child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch((err) => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    // SignIn
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fireKey: {}
          }
          commit('setUser', newUser)
        })
        .catch((err) => {
          commit('setLoading', false)
          commit('setError', err)
          console.log(err)
        })
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: [],
        fireKey: {}
      })
    },
    fetchUserData ({ commit, getters }) {
      commit('setLoading', true)
      firebase.database().ref(`/users/${getters.user.id}/registrations`).once('value')
        .then((data) => {
          const values = data.val()
          let registeredMeetups = []
          let swappedPairs = {}
          for (let key in values) {
            registeredMeetups.push(values[key])
            swappedPairs[values[key]] = key
          }
          const updateUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fireKey: swappedPairs
          }
          commit('setLoading', false)
          commit('setUser', updateUser)
        })
        .catch((err) => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    // Clear Error
    clearError ({ commit }) {
      commit('clearError')
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
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
