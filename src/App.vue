<template>
  <div id="app">
    <div class="container">
      <!-- When logged in navbar -->
       
        <div v-if="Slog && Sadmin" class="row">
          
            <div class="col-md-12">
              <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center align-items-center">
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link to="/admin/home" class="nav-link">Home</router-link>
        <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
      </li>
      <li class="nav-item">
        <button type="button" class="nav-link btn btn-outline-success" style="border:none;outline:none;background:transparent;color:grey" data-toggle="modal" data-target="#exampleModal">Add Resturant</button>
      </li>
      <li class="nav-item">
        <input class="nav-link" type="button" style="border:none;outline:none;background:transparent;color:grey" id="signoutbutton" value="signOut" v-on:click="signout">
      </li>
      
    </ul>
  </div>
</nav>
            </div>
     
           
        </div>
        

        <!-- When logged out navbar -->
        <div v-else-if="Slog && Sadmin==false" id="nav">
          <nav class="navbar navbar-expand-lg navbar-light bg-light ">
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown1">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link to="/user/home" class="nav-link">Home</router-link>
      </li>
      <li class="nav-item">
        <button type="button" class="nav-link btn btn-outline-success" style="border:none;outline:none;background:transparent;color:grey" data-toggle="modal" data-target="#additem">Add Item</button>
        <!-- <button type="button" class="nav-link btn btn-outline-success" style="border:none;outline:none;background:transparent;color:grey" data-toggle="modal" data-target="#exampleModal">Add Resturant</button> -->
      </li>
      <li class="nav-item">
        <router-link to="/user/category" class="nav-link">Category</router-link>
      </li>
      <li class="nav-item">
        <input class="nav-link" type="button" style="border:none;outline:none;background:transparent;color:grey" id="signoutbutton" value="signOut" v-on:click="signout">
      </li>
      
    </ul>
  </div>
</nav>

            <div class="row">
              <div class="col-md-6">
                <!-- Modal -->
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="additem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" v-if=Sedit>Edit Item</h5>
            <h5 class="modal-title" id="exampleModalLabel" v-else>Add Item</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                
                <div class="form-group">
                  <label for="itemDescription">Item Description</label>
                  <input type="text" :value=Sitem @change="itemchange" class="form-control" id="itemDescription" placeholder="Description">
                </div>
                <div class="form-group">
                  <label for="itemPrice">Price</label>
                  <input type="number" class="form-control" :value=Sprice @change="pricechange" id="itemPrice" placeholder="price">
                </div>
                <div class="form-group">
                  <label for="inputCatrgory">Category</label>
                    <select @change="categoryChange" :value=SCategory id="inputCatrgory" class="form-control">
                      <option selected value="-1">Choose...</option>
                      <option v-for="(cat,index) in categories" v-bind:key="index" v-bind:value="cat.categoryName">{{cat.categoryName}}</option>
                    </select>
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal"  @click="this.handleClose">Close</button>
            <button type="button" v-if=Sedit class="btn btn-primary" @click="additem">Edit Item</button>
            <button type="button" v-else class="btn btn-primary" @click="additem">Add Item</button>
          </div>
        </div>
      </div>
    </div>
            </div>
        </div>
        </div>
        <div v-else id="nav">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link to="/login" class="nav-link">Login</router-link>
      </li>
      
    </ul>
  </div>
</nav>
         
        </div>
    </div>
    
  <!-- Form pop up code starts here -->
    <!-- Modal -->
      
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if=Sedit class="modal-title" id="exampleModalLabel">Edit Resturant</h5>
            <h5 v-else class="modal-title" id="exampleModalLabel" >Add Resturant</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="addResturant">
          <div class="modal-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <!-- <input type="email" class="form-control" v-model="remail" id="inputEmail4" placeholder="Email"> -->
                    <input type="email" :value=SEmail class="form-control" @change="emailchange" id="inputEmail4" placeholder="Email">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Password</label>
                    <!-- <input type="password" class="form-control" v-model="rpassword" id="inputPassword4" placeholder="Password"> -->
                    <input type="password" class="form-control" :value=SPassword @change="passwordChange" id="inputPassword4" placeholder="Password">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputAddress">Address</label>
                  <!-- <input type="text" class="form-control" v-model="raddress1" id="inputAddress" placeholder="1234 Main St"> -->
                  <input type="text" class="form-control" :value=SAddress1 @change="address1Change" id="inputAddress" placeholder="1234 Main St">
                </div>
                <div class="form-group">
                  <label for="inputAddress2">Address 2</label>
                  <!-- <input type="text" class="form-control" v-model="raddress2" id="inputAddress2" placeholder="Apartment, studio, or floor"> -->
                  <input type="text" class="form-control" :value=SAddress2 @change="address2Change" id="inputAddress2" placeholder="Apartment, studio, or floor">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <!-- <input type="text" class="form-control" v-model="rcity" id="inputCity"> -->
                    <input type="text" class="form-control" :value=SCity @change="cityChange" id="inputCity">
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputState">Country</label>
                    <select @change="countryChange" :value=SCountry  id="inputState" class="form-control">
                    <!-- <select  v-model="selectState" id="inputState" class="form-control"> -->
                      <option selected value="-1">Choose...</option>
                      <option v-for="country in countries" v-bind:key="country.id" v-bind:value="country.name">{{country.name}}</option>
                    </select>
                  </div>
                  <div class="form-group col-md-2">
                    <label for="inputZip">Currency</label>
                    <!-- <select v-model="selectcurrency" id="inputZip" class="form-control"> -->
                      <select @change="currencyChange" :value=SCurrency id="inputZip" class="form-control">
                      <option selected value="-1">Choose...</option>
                      <option v-for="product in products" v-bind:key="product.cc" v-bind:value="product.cc">{{product.name}} {{product.symbal}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="website">Website</label>
                    <input type="text"  @change="websiteChange" :value=Swebsite class="form-control" id="website" placeholder="website">
                    <!-- <input type="text"  v-model="rwebsite" class="form-control" id="website" placeholder="website"> -->
                  </div>
                  <div class="form-group col-md-6">
                    <label for="timings">Timings</label>
                    <input type="text"  @change="timingChange" :value=STiming class="form-control" id="timings" placeholder="9AM-6PM">
                    <!-- <input type="text"  v-model="rtiming" class="form-control" id="timings" placeholder="9AM-6PM"> -->
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                      <div class="form-check">
                        <!-- <input v-model="homeDelivery"  class="form-check-input" type="checkbox" id="homeDelivery"> -->
                        <!-- <input type="checkbox" id="homeDelivery" class="form-check-input" > -->
                        <input type="checkbox" id="homeDelivery" :value="homecheck" v-model="homecheck">
                        <label class="form-check-label" for="homeDelivery">
                          Home Delivery
                        </label>
                      </div>
                  </div>
                  <div class="form-group col-md-8">
                      <div class="form-check">
                        <!-- <input v-model="takeAway" class="form-check-input" type="checkbox" id="takeAway"> -->
                        <input  v-model="takecheck" :value="takecheck" class="form-check-input" type="checkbox" id="takeAway">
                        <label class="form-check-label" for="takeAway">
                          Take Away
                        </label>
                      </div>
                  </div>
                </div>
                
              
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="this.handleClose" id="closebtn" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" id="btnsave" v-if=Sedit>Save changes</button>
            <button type="submit" class="btn btn-primary" id="btnsave" v-else>Add</button>
          </div>
          </form>
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import usersData from "../src/assets/currency.json";
import countries from "../src/assets/countries.json";

// import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import store from "./store/index"
import db from "./firebaseConfig"

export default {
  data(){
    return{
      // loggedIn:false,
      // admin:store.state.admin,
      editw: store.state.editwork,
      homecheckbox: false,
      takeawaycheckbox: false,
      products:usersData,
      countries:countries,
      categories:[]
    }
  },
  async mounted(){
    if(this.Sedit!=true){
      this.$store.commit('setitemName', '');
      this.$store.commit('setitemCategory', '-1');
      this.$store.commit('setitemDescription', '');
    }
    
    const snapshot = await db.collection('ResturantCategories').where('categoryUser','==',store.state.currentUserEmail).get();
    if (snapshot.empty) {
      console.log('No matching documents.')
      return;
    }
    snapshot.forEach(doc => {
      this.categories.push({categoryName:doc.data().categoryName})
    })
  },
  computed: {
      Slog: () => store.state.loggedIn,
      Sadmin: () => store.state.admin,
      SEmail: () => store.state.Email,
      SPassword: () => store.state.Password,
      SAddress1: () => store.state.Address1,
      SAddress2: () => store.state.Address2,
      SCity: () => store.state.City,
      SCountry: () => store.state.Country,
      SCurrency: () => store.state.Currency,
      STiming: () => store.state.Timing,
      Swebsite: () => store.state.website,
      Sedit: () => store.state.editwork,
      Sitem: () => store.state.itemName,
      Sprice: () => store.state.itemDescription,
      SCategory: () => store.state.itemCategory,
      homecheck: {
        get: function () {
          return store.state.homeDelivery
        },
        set: function (newValue) {
          this.$store.commit('sethomeDelivery',newValue)
        }
      },
      takecheck: {
        get: function () {
          return store.state.takeAway
        },
        set: function (newValue) {
          // console.log(newValue.target.value);
          this.$store.commit('settakeAway', newValue)
          // this.$store.commit('sethomeDelivery',newValue.target.checked)
        }
      }
  },
  methods:{
    handleClose(){
      this.$store.commit('setEditWork',false);
      this.$store.commit('setitemName', '');
      this.$store.commit('setitemCategory', '-1');
      this.$store.commit('setitemDescription', '');
    },
    signout(){
      window.sessionStorage.clear();
      this.$store.commit('setloggedIn', false);
      this.$router.push('/');
    },
    itemchange(e){
      this.$store.commit('setitemName', e.target.value)
    },
    categoryChange(e){
      this.$store.commit('setitemCategory', e.target.value)
    },
    pricechange(e){
      this.$store.commit('setitemDescription', e.target.value)
    },
    emailchange(e){
      this.$store.commit('setEmail', e.target.value)
    },
    websiteChange(e){
      this.$store.commit('setWebsite', e.target.value)
    },
    passwordChange(e){
      console.log(e.target.value);
      this.$store.commit('setPassword', e.target.value)
    },
    timingChange(e){
      console.log(e.target.value);
      this.$store.commit('setTiming', e.target.value)
    },
    takeAwayChange(e){
      this.$store.commit('settakeAway', e.target.checked)
    },
    homeChange(e){
      this.$store.commit('sethomeDelivery', e.target.checked)
    },
    address1Change(e){
      console.log(e.target.value);
      this.$store.commit('setAddress1', e.target.value)
    },
    address2Change(e){
      console.log(e.target.value);
      this.$store.commit('setAddress2', e.target.value)
    },
    cityChange(e){
      console.log(e.target.value);
      this.$store.commit('setCity', e.target.value)
    },
    countryChange(e){
      this.$store.commit('setCountry', e.target.value)
    },
    currencyChange(e){
      console.log(e.target.value);
      this.$store.commit('setCurrency', e.target.value)
    },
    checkBoxValue(e){ console.log(e.target.value); if(e.target.value){return true}else{return false}},
    async additem(){
      if(store.state.itemName=='' || store.state.itemDescription=='' || store.state.itemCategory=='-1'){
        alert('All fields are required');
        return;
      }
      try {
        if(store.state.editwork==true){
          db.collection('ResturantItems').doc(store.state.currentDocID).update({email:store.state.currentUserEmail, itemName:store.state.itemName, itemPrice:store.state.itemDescription, itemCategory:store.state.itemCategory})
            .then(()=>{
              console.log("updated");
              this.$store.commit('setitemName', '');
              this.$store.commit('setitemCategory', '-1');
              this.$store.commit('setitemDescription', '');
              if(store.state.editwork==true){this.$store.commit('setEditWork',false)}
              $("#additem").modal("hide");
              location.reload();
            })
        }else{
          db.collection("ResturantItems").add({email:store.state.currentUserEmail, itemName:store.state.itemName, itemPrice:store.state.itemDescription, itemCategory:store.state.itemCategory})
          .then(()=>{
              alert('item sucessfully');
              location.reload();
            })
        }
      } catch (error) {
        if(store.state.editwork==true){
          this.$store.commit('setEditWork',false);
        }
        alert('Problem occured while adding a item ',error);
      }
    },
    async addResturant(){
      if(store.state.Email=='' || store.state.Password=='' || store.state.Timing=='' || store.state.Currency=='' || store.state.City=='' || store.state.Country=='' || store.state.Address1=='' || store.state.Address2=='' || store.state.website==''){
        alert('All fields are required');
        return;
      }
      try {
        if(store.state.editwork==true){
          // starting from here
          const snapshot = await db.collection('ResturantUsers').where('email','==',store.state.Email).get();
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
          snapshot.forEach(doc => { 
            db.collection('ResturantData').doc(doc.id).update({ em:store.state.Email,password: store.state.Password,add1:store.state.Address1,add2: store.state.Address2,city:store.state.City,country: store.state.Country,currency:store.state.Currency,website: store.state.website,timing:store.state.Timing,takeaway:store.state.takeAway,homedelivery:store.state.homeDelivery })
            .then(()=>{
              console.log("updated");
              this.$store.commit('setEmail', '');
              this.$store.commit('setPassword', '');
              this.$store.commit('setAddress1', '');
              this.$store.commit('setAddress2', '');
              this.$store.commit('setCity', '');
              this.$store.commit('setCountry', '-1');
              this.$store.commit('setCurrency', '-1');
              this.$store.commit('setWebsite', '');
              this.$store.commit('setTiming', '');
              this.$store.commit('settakeAway', false);
              this.$store.commit('sethomeDelivery', false);
              if(store.state.editwork==true){this.$store.commit('setEditWork',false)}
              $("#exampleModal").modal("hide");
              location.reload();
            })
          })
        }else{
          const currentUser = await db.collection("ResturantUsers").add({email:store.state.Email, password:store.state.Password,status:0});
          db.collection("ResturantData").doc(currentUser.id).set({ em:store.state.Email,password: store.state.Password,add1:store.state.Address1,add2: store.state.Address2,city:store.state.City,country: store.state.Country,currency:store.state.Currency,website: store.state.website,timing:store.state.Timing,takeaway:store.state.takeAway,homedelivery:store.state.homeDelivery })
          .then(()=>{
            if(store.state.editwork==true){this.$store.commit('setEditWork',false)}
            $("#exampleModal").modal("hide");
            location.reload();
          })
        }
      }catch (error) {
        if(store.state.editwork==true){
          this.$store.commit('setEditWork',false);
        }
          console.log(error);
      }
    }
  }
}
</script>

<style lang="scss">
#app{
  justify-content: "center";
}
#signoutbutton{
  background-color: "transparent";
}
</style>
