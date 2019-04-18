<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="logout">Logout</button>
    <button @click="deleteAccount">Delete Account</button>
  </div>
</template>

<script>
import firebase from 'firebase';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    logout: function() {
      console.log("user logging out")
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    deleteAccount: function() {
      console.log("deleting account");
      try {
        firebase.auth().currentUser.delete().then(() => {
          console.log("account deleted");
          this.$router.replace('login')
        })
      }
      catch(error) {
        if (error.code == 'auth/requires-recent-login') {
          // The user's credential is too old. She needs to sign in again.
          firebase.auth().signOut().then(function() {
            // The timeout allows the message to be displayed after the UI has
            // changed to the signed out state.
            setTimeout(function() {
              alert('Please sign in again to delete your account.');
            }, 1);
          });
        }
      }
    }
  }
}
</script>
