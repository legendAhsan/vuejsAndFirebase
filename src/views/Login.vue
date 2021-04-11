<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-sm-8 offset-sm-2 ">  
                <form @submit.prevent="login">
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
// import store from "../store/index"
import db from "../firebaseConfig"
export default{
    data() { 
        return { 
            email: '', 
            password: '', 
            error:''
        }; 
    },
    methods: {
        async login(){
            const snapshot = await db.collection('ResturantUsers').where('email','==',this.email).get();
            if (snapshot.empty) {
                alert('Incorrect Email or Password');
                return;
            }
            snapshot.forEach(doc => {
                if(this.password==doc.data().password){
                    this.$store.commit('setloggedIn', true);
                    this.$store.commit('setCurrentUserEmail', this.email);
                    if(doc.data().status==1){
                        this.$store.commit('setadmin', true);
                        this.$router.push('/admin/home');
                    }else{
                        this.$store.commit('setadmin', false);
                        this.$router.push('/user/home');
                    }
                }else{
                    this.error='Authentication error';
                    alert(this.error);
                }
            })
        }
    }
}
</script>