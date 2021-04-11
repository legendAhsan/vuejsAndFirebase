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

      </li>
      <li class="nav-item">
        <router-link to="/admin/addresturant" class="nav-link">Add Resturant</router-link>
      
      </li>
      <li class="nav-item">
        <input class="nav-link" type="button" style="border:none;outline:none;background:transparent;color:grey" id="signoutbutton" value="signOut" v-on:click="signout">
      </li>
      
    </ul>
  </div>
</nav>
            </div>
     
           
        </div>
        

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
 

    <router-view />
  </div>
</template>

<script>

import "firebase/auth";
import "firebase/firestore"
import store from "./store/index"
import db from "./firebaseConfig"

export default {
  data(){
    return{
      editw: store.state.editwork,
      homecheckbox: false,
      takeawaycheckbox: false,
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
      Sedit: () => store.state.editwork,
      Sitem: () => store.state.itemName,
      Sprice: () => store.state.itemDescription,
      SCategory: () => store.state.itemCategory,
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
