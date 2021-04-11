<template>
  <!-- <div class="container mt-3" v-if="noth==true"><h4>No Resturant to show.</h4></div> -->
  <div class="home">

    <!-- Search Bar code -->
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 mt-3 mb-3">
          <form>
            <div class="input-group">
              <input type="text" class="form-control" v-model="searchInput" placeholder="search for resturant">
              <div class="input-group-btn">
                <button class="btn btn-primary" @click="searchResturant()" type="button">Search
                </button>
              </div>
            </div>
          </form> 
        </div> 
      </div>
      <div v-if="searchfound==true" class="row">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Resturant Name</th>
              <th scope="col">Email</th>
              <th scope="col">Country</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="user in userData" v-bind:key="user.email">
              <td>{{user.resturantname}}</td>
              <td>{{user.email}}</td>
              <td>{{user.country}}</td>
              <td>
                 <router-link :to="{name:'ViewResturant',params:{email:user.email}}" >View<i class="far fa-eye"></i></router-link>
                <!-- <button type="button" id='btnview' @click="viewResturant(user.email)" data-toggle="modal" data-target="#ViewResturant" class="btn btn-primary">View</button> -->
                
                <router-link :to="{name:'EditResturant',params:{email:user.email}}" >Edit<i class="far fa-edit"></i></router-link>
                <!-- <button type="button" @click="editResturant(user.email)" class="btn btn-primary">Edit</button> -->
               
                <button type="button" @click="deleteResturant(user.email)" class="btn btn-primary">Delete<i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div  class="container mt-4" v-else><h4>No resturant found against this email</h4></div>
    </div>
 


    
  </div>
</template>

<script>
import "firebase/auth";
import "firebase/firestore"
import store from "../store/index"
import db from "../firebaseConfig"
export default {
  data(){
    return{
      loggedIn:store.state.admin,
      searchInput:'',
      userData:[],
      currentData:null,
      searchfound:true
    }
  },
  async mounted(){
    const citiesRef = await db.collection('ResturantUsers');
      citiesRef.get().then((snapshot)=>{ 
        if(snapshot.empty){
          return;
        }
        snapshot.forEach(doc => { 
          db.collection('ResturantData').doc(doc.id).get().then((querySnapshot)=>{
              this.userData.push({
                email:querySnapshot.data().email,
                country: querySnapshot.data().country,
                resturantname: querySnapshot.data().resturantname
              });
          })
        })
      })
    },
    methods:{
      async deleteResturant(uid){
        try{
          const snapshot = await db.collection('ResturantUsers').where('email','==',uid).get();
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }  
          snapshot.forEach(doc => {
            console.log(doc.id);
            db.collection('ResturantData').doc(doc.id).delete().then(()=>{
              db.collection('ResturantUsers').doc(doc.id).delete().then(()=>{
                alert('Record has been deleted');
                location.reload();
              })
            })
          });
        }catch(error){
          alert('Sorry! Problem occured while deleting the record');
        }
      },
      async searchResturant(){
        if(this.searchInput!=''){
          const snapshot = await db.collection('ResturantUsers').where('email','==',this.searchInput).get();
          if (snapshot.empty) {
            this.searchfound=false;
            return;
          }
          this.searchfound=true;  
          snapshot.forEach(doc => {
            db.collection('ResturantData').doc(doc.id).get().then((querySnapshot)=>{
                this.userData=[];
                this.userData.push({
                  email:doc.data().email,
                  timing:querySnapshot.data().timing,
                  country:querySnapshot.data().country,
                });
            })
          })
        }else{
          location.reload();
        }
      }
    }
  }
 
  

</script>
