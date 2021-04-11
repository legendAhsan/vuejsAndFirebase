<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <form @submit.prevent="addCategory">
                    <div class="form-group">
                        <label for="categoryname">Category Name</label>
                        <input type="text" class="form-control" id="categoryname" @change="nameChange" :value=Sname aria-describedby="emailHelp" placeholder="Sweet Dish">
                    </div>
                    <div class="form-group">
                        <label for="categoryDescription">Category Description</label>
                        <input type="text" class="form-control" id="categoryDescription" @change="DescriptionChange" :value=SDescription placeholder="description">
                    </div>
                    <button type="submit" v-if="this.editData.Status==true" class="btn btn-primary">Edit Category</button>
                    <button type="submit" v-else class="btn btn-primary">Add Category</button>
                    </form>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-12">
                <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(category,index) in allCategories" v-bind:key="index">
              <td>{{index+1}}</td>
              <td>{{category.categoryName}}</td>
              <td>{{category.categoryDescription}}</td>
              <td>
                <button type="button" @click="editCategory(category.id)" class="btn btn-primary">Edit</button>
                <button type="button" @click="deleteCategory(category.id)" class="btn btn-primary">Delete</button>
              </td>
            </tr>
                    
                </tbody>
                </table>
            </div>
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
                allCategories:[],
                editData:{
                    status:false,
                    editID:''
                }
            }
        },
        async mounted(){
            this.editData.Status==false;
            this.editData.editID='';
            this.$store.commit('setCategoryName', '');
            this.$store.commit('setCategoryDescription', '');
        
        const snapshot = await db.collection('ResturantCategories').where('categoryUser','==',store.state.currentUserEmail).get();
            if (snapshot.empty) {
                return;
            }
            snapshot.forEach(doc => {
              this.allCategories.push({id:doc.id,categoryName:doc.data().categoryName, categoryDescription:doc.data().categoryDescription})
            })
        },
        computed: {
            Sname: () => store.state.categoryName,
            SDescription: () => store.state.categoryDescription
        },
        methods:{
            nameChange(e){
                this.$store.commit('setCategoryName', e.target.value)
            },
            DescriptionChange(e){
                this.$store.commit('setCategoryDescription', e.target.value)
            },
            async deleteCategory(uid){
                try {
                    db.collection('ResturantCategories').doc(uid).delete().then(()=>{
                        alert('Category has been deleted');
                        location.reload();
                    })
                } catch (error) {
                    alert('cannot delete category',error);
                }
            },
            async editCategory(uid){
                this.editData.Status=true;
                this.editData.editID=uid;
                const snapshot = await db.collection('ResturantCategories').doc(uid).get();
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                this.$store.commit('setCategoryName', snapshot.data().categoryName);
                this.$store.commit('setCategoryDescription', snapshot.data().categoryDescription); 
            },
            addCategory(){
                if(store.state.categoryName=='' || store.state.categoryDescription==''){
                    alert('All fields are required');
                    return;
                }
                if(this.editData.Status==true){
                    db.collection('ResturantCategories').doc(this.editData.editID).update({ categoryUser:store.state.currentUserEmail,categoryName:store.state.categoryName, categoryDescription: store.state.categoryDescription})
                    .then(()=>{
                        this.editData.Status==false;
                        this.editData.editID='';
                        this.$store.commit('setCategoryName', '');
                        this.$store.commit('setCategoryDescription', ''); 
                        location.reload();
                    })
                }else{
                    console.log('ok hai ');
                    db.collection("ResturantCategories").add({ categoryUser:store.state.currentUserEmail,categoryName:store.state.categoryName, categoryDescription: store.state.categoryDescription})
                    .then(()=>{
                        console.log('category added sucessfully');
                        location.reload();
                    })
                    
                }
                
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>