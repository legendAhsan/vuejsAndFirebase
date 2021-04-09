<template>

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
      <div class="row">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Country</th>
              <th scope="col">Timing</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="user in userData" v-bind:key="user.email">
              <td>{{user.email}}</td>
              <td>{{user.country}}</td>
              <td>{{user.timing}}</td>
              <td>
                <button type="button" id='btnview' @click="viewResturant(user.email)" data-toggle="modal" data-target="#ViewResturant" class="btn btn-primary">View</button>
                <button type="button" @click="editResturant(user.email)" class="btn btn-primary">Edit</button>
                <button type="button" @click="deleteResturant(user.email)" class="btn btn-primary">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal -->
<div class="modal fade" id="ViewResturant" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Resturant</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h6><strong>Email:</strong> {{view.Email}}</h6>
        <p><strong>Password:</strong> {{this.view.Password}}</p>
        <p><strong>Address1:</strong> {{this.view.Address1}}</p>
        <p><strong>Address2:</strong> {{this.view.Address2}}</p>
        <p><strong>City:</strong> {{this.view.City}}</p>
        <p><strong>Country:</strong> {{this.view.Country}}</p>
        <p><strong>Currency:</strong> {{this.view.Currency}}</p>
        <p><strong>Timing: </strong>{{this.view.Timing}}</p>
        <p><strong>Website:</strong> {{this.view.website}}</p>
        <p><strong>Home Delivery:</strong> {{this.view.homeDelivery}}</p>
        <p><strong>Take Away:</strong> {{this.view.takeAway}}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

    
  </div>
</template>

<script>

// import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import store from "../store/index"
import db from "../firebaseConfig"
// import db from "../firebaseConfig"
export default {
  data(){
    return{
      loggedIn:store.state.admin,
      searchInput:'',
      userData:[],
      currentData:null,
      view:{
        takeAway:false,
        homeDelivery:false,
        Email:'',
        Password:'',
        Timing:'',
        Currency:'',
        City:'',
        Country:'',
        Address1:'',
        Address2:'',
        website:''
      }
    }
  },
  async mounted(){
    const citiesRef = await db.collection('ResturantUsers');
      citiesRef.get().then((snapshot)=>{  
        if(snapshot.empty){
          console.log('No documents. in resturant user');
          return;
        } 
        snapshot.forEach(doc => { 
          db.collection('ResturantData').doc(doc.id).get().then((querySnapshot)=>{
              this.userData.push({
                email:doc.data().email,
                timing: querySnapshot.data().timing,
                country: querySnapshot.data().country,
              });
          })
        })
      })
    },
    methods:{
      async viewResturant(emai){
        const snapshot = await db.collection('ResturantUsers').where('email','==',emai).get();
        if (snapshot.empty) {
          console.log('No matching documents. in he view method');
          return;
        }  
        snapshot.forEach(doc => {
          db.collection('ResturantData').doc(doc.id).get().then((dat)=>{
              this.view.Email=dat.data().em;
              this.view.Password=dat.data().password
              this.view.Address1=dat.data().add1
              this.view.Address2=dat.data().add2
              this.view.City=dat.data().city
              this.view.Country=dat.data().country
              this.view.Currency=dat.data().currency
              this.view.Timing=dat.data().timing
              this.view.website=dat.data().website
              this.view.homeDelivery=dat.data().homedelivery
              this.view.takeAway=dat.data().takeaway

            // })
          })
        })
      },
      async deleteResturant(uid){
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
      },
      async editResturant(email){
        this.$store.commit('setEditWork',true);
        $('#exampleModal').modal('show');
        const snapshot = await db.collection('ResturantData').where('em','==',email).get();
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }  
          snapshot.forEach(querySnapshot => {
            this.$store.commit('setEmail', querySnapshot.data().em);
            this.$store.commit('setPassword', querySnapshot.data().password);
            this.$store.commit('setAddress1', querySnapshot.data().add1);
            this.$store.commit('setAddress2', querySnapshot.data().add2);
            this.$store.commit('setCity', querySnapshot.data().city);
            this.$store.commit('setCountry', querySnapshot.data().country);
            this.$store.commit('setCurrency', querySnapshot.data().currency);
            this.$store.commit('setWebsite', querySnapshot.data().website);
            this.$store.commit('setTiming', querySnapshot.data().timing);
            this.$store.commit('settakeAway', querySnapshot.data().takeaway);
            this.$store.commit('sethomeDelivery', querySnapshot.data().homedelivery );
          })
      },
      async searchResturant(){
        if(this.searchInput!=''){
          const snapshot = await db.collection('ResturantUsers').where('email','==',this.searchInput).get();
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }  
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
