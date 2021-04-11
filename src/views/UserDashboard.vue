<template>
<div class="container">
    <div class="row mt-3 mb-3">
      <div class="col-md-8" id="timing" >
        <strong>Timing</strong><br/>
        <span v-if="alwaysAvailable==true">{{timing}}</span>
        <span class="d-block" v-else v-for="time in timing" v-bind:key=time.day><strong>{{(time.day).toUpperCase()}}</strong> Start Time: {{time.stime}} End Time: {{time.etime}}</span>
      </div>
    </div>
      <div class="row">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">item Description</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in gettedItems" v-bind:key="index">
              <td>{{index+1}}</td>
              <td>{{item.itemName}}</td>
              <td>{{item.itemPrice}}</td>
              <td>{{item.itemCategory}}</td>
              <td>
                <button type="button" @click="edititem(item.itemid)" class="btn btn-primary">Edit</button>
                <button type="button" @click="deleteitem(item.itemid)" class="btn btn-primary">Delete</button>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    
        
      
    </div>
</template>

<script>
import "firebase/firestore"
import store from "../store/index"
import db from "../firebaseConfig"
    export default {
      data(){
        return {
          gettedItems:[],
          searchInput:'',
          timing:[],
          alwaysAvailable:false
        }
      },
      async created(){
        db.collection('ResturantData').where('email','==',store.state.currentUserEmail).get().then((query)=>{
                if(query.empty) {
                  console.log('No matching documents.');
                }else{
                  let dat=[]
                  query.forEach(doc => {
                    this.alwaysAvailable=doc.data().alwaysavailable;
                    if(this.alwaysAvailable==false){
                      doc.data().timing.forEach(element => {
                          dat.push({day:element.day,stime:element.key.start,etime:element.key.end})
                      });
                      this.timing=dat;
                    }else{
                        this.timing='Always Available'
                    }
                  })
                }
              })
            const snapshot = await db.collection('ResturantItems').where('email','==',store.state.currentUserEmail).get();
            if (snapshot.empty) {
              alert('This resturant has no registered item.')
                return;
            }else{
              snapshot.forEach(doc => {
                this.gettedItems.push({itemid:doc.id,itemCategory:doc.data().itemCategory, itemName:doc.data().itemName,itemPrice:doc.data().itemPrice})
              })
              
            }
            
      },
      methods:{
        async deleteitem(uid){
          try {
            db.collection('ResturantItems').doc(uid).delete().then(()=>{
                alert('Record has been deleted');
                location.reload();
              })
          } catch (error) {
            alert('cannot delete item',error);
          }
        },
        async edititem(uid){
          this.$store.commit('setEditWork',true);
          $('#additem').modal('show');
          const snapshot = await db.collection('ResturantItems').doc(uid).get();
          if (snapshot.empty) {
            return;
          } 
            this.$store.commit('setitemName', snapshot.data().itemName);
            this.$store.commit('setitemCategory', snapshot.data().itemCategory);
            this.$store.commit('setitemDescription', snapshot.data().itemPrice);
          this.$store.commit('setcurrentDocID', uid);
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>