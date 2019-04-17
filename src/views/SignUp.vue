<template>
    <div class="sign-up">
        <p>Let's create a new account!</p>
        <input
            id="name"
            placeholder="Full Name"
            v-model="name"
            type="text"
            name="name"
        ><br>
        <input
            id="email"
            placeholder="Email"
            v-model="email"
            type="email"
            name="email"
        ><br>
        <input 
            type="password" 
            v-model="password" 
            placeholder="Password" 
            ref="password"
        ><br>
        <input 
            type="password" 
            placeholder="Confirm Password" 
        ><br>

        <button @click="signUp">Sign Up</button>
        <span>or go back to <router-link to="/login">login</router-link>.</span>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'signUp',
        data() {
            return {
                name: '',
                email: '',
                password: '',
            }
        },
        methods: {
            signUp: function() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        var user_info = firebase.auth().currentUser;
                        user_info.updateProfile({
                        displayName: this.name,
                        }).then(function() {
                        // Update successful.
                            console.log('successfully created user')
                            console.log('Name: ' + user_info.displayName)
                            console.log('Email: ' + user_info.email)
                            console.log('uid: ' + user_info.uid)
                        }).catch(function(error) {
                        // An error happened.
                            alert('Oops. ' + error.message)
                        });

                        this.$router.replace('home')
                    },
                    (err) => {
                        alert('Oops. ' + err.message)
                    }
                );
            }
        }
    }
</script>

    <style scoped>
        .sign-up {
        margin-top: 40px;
    }
    input {
        margin: 10px 0;
        width: 20%;
        padding: 15px;
    }

    button {
        margin-top: 10px;
        width: 10%;
        cursor: pointer;
    }
    span {
        display: block;
        margin-top: 20px;
        font-size: 11px;
    }
</style>