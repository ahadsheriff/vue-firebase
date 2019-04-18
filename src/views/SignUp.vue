<template>
    <div class="sign-up">
        <p>Let's create a new account!</p>
        
        <div class="field">
            <div class="control">
                <input
                    class="input"
                    id="firstName"
                    placeholder="First Name"
                    v-model="firstname"
                    type="text"
                    name="first"
                    required
                ><br>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input
                    class="input"
                    id="lastName"
                    placeholder="Last Name"
                    v-model="lastname"
                    type="text"
                    name="last"
                    required
                ><br>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input
                    class="input"
                    id="email"
                    placeholder="Email"
                    v-model="email"
                    type="email"
                    name="email"
                    required
                ><br>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input 
                    class="input"
                    type="password" 
                    v-model="password" 
                    placeholder="Password" 
                    ref="password"
                    required
                ><br>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input 
                    class="input"
                    type="password" 
                    placeholder="Confirm Password" 
                    required
                ><br>
            </div>
        </div>
        <button @click="signUp">Sign Up</button>
        <span>or go back to <router-link to="/login">login</router-link>.</span>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import { db } from '../main'

    export default {
        name: 'signUp',
        data() {
            return {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            }
        },
        methods: {
            signUp: function() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        console.log("saving user")
                        this.saveUser(user.user.uid)
                    },
                    (err) => {
                        alert('Oops. ' + err.message)
                    }
                );
            },
            saveUser (uid) {
                const userJoined = new Date()
                db.collection('users').doc(uid).set({
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    userJoined: userJoined
                })
                    .then(function (uid) {
                        console.log('Document written with ID: ', uid)
                    })
                    .catch(function (error) {
                        console.error('Error adding document: ', error)
                    })
                this.$router.replace('home')
                console.log("user signed up")
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