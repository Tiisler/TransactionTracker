<script setup>
import { ref } from 'vue';
import supabase from './config/supabase';
import { useRouter } from 'vue-router';

const email = ref("")
const password = ref("")
const message = ref("")
const router = useRouter()

async function logIn() {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    if (error) {
        console.log(`error logging in: ${error.message}`)
    }

    if (!error) {
        router.push("/")
    }

}

</script>


<template>
    <div class="backgroundBox">
        <div class="centerBox">
            <form @submit.prevent="logIn">
                <h1>Log in</h1>
                <hr>
                <input type="text" v-model="email" placeholder="email" required>
                <input type="password" v-model="password" placeholder="password" required>
                <button id="loginButton">Log in</button>
                <router-link to="/signup">Don't have an account?</router-link>

            </form>
        </div>
        <p>{{ message }}</p>
    </div>

</template>

<style scoped>
hr {
    border-color: 1px solid black;
    width: 100%;
    margin: 0;
    margin-bottom: 10px;
}

.backgroundBox {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f0f0;
}

.centerBox {
    display: flex;
    background-color: white;
    padding: 20px;
    min-width: 250px;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(70, 67, 67);
    border-radius: 15px;
    box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.2);
}

form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
    align-items: center;
}

input {
    padding: 8px;
    margin: 10px 0;
    width: 240px;
    border-radius: 10px;
    border: 1px solid rgb(70, 67, 67);
    box-shadow: 2px 2px 2px rgb(238, 237, 237);
}

input:focus {
    outline: 1px solid rgb(58, 56, 56);
}

.buttons {
    margin-top: 15px;
}

#loginButton {
    background-color: rgb(25, 180, 59);
    color: white;
    border: 1px solid green;
    padding: 10px 23px;
    border-radius: 4px;
    cursor: pointer;
    border-radius: 10px;
    transition: 200ms;
    font-weight: bold;
    box-shadow: 1px 1px 2px gray;
    margin-top: 12px;
}

#loginButton:hover {
    transform: translateY(-2px);
    background-color: rgb(19, 145, 46);
}

a {
    margin-top: 10px;
    text-decoration: none;
}

a,
a:visited,
a:hover,
a:active {
    text-decoration: none;
    color: rgb(25, 180, 59);
}
</style>