<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-sm-8 offset-sm-2 ">  
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="email">Email address:</label>
                        <input type="email" class="form-control"  v-model="email" id="email">
                    </div>
                    <div class="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" class="form-control" v-model='password' id="pwd">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
   
            </div>
        </div>
    </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
export default{
    data() { 
        return { 
            email: '', 
            password: '', 
            error:''
        }; 
    },
    methods: {
        register(){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user);
                this.$router.push('/login');
            })
            .catch((error) => {
                console.log(error.message);
            });
        }
    }
}
</script>