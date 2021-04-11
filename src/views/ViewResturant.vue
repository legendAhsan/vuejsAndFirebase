<template>
    <div class="container mt-4">
        <table class="table">
            <tr>
                <th scope="row">Email</th>
                <td>{{email}}</td>
            </tr>
            <tr>
                <th scope="row">Password</th>
                <td>{{password}}</td>
            </tr>
            
            <tr>
                <th scope="row">Address 1</th>
                <td>{{address1}}</td>
            </tr>
            <tr>
                <th scope="row">Address 2</th>
                <td>{{address2}}</td>
            </tr>
            <tr>
                <th scope="row">City</th>
                <td>{{city}}</td>
            </tr>
            <tr>
                <th scope="row">Country</th>
                <td>{{country}}</td>
            </tr>
            <tr>
                <th scope="row">Currency</th>
                <td>{{currency}}</td>
            </tr>
            <tr>
                <th scope="row">Timing</th>
                <td v-if="alwaysAvailable==true">{{timing}}</td>
                <td class="d-block" v-else v-for="time in timing" v-bind:key=time.day><strong>{{time.day}}</strong> Start Time: {{time.stime}} End Time: {{time.etime}}</td>
            </tr>
            <tr>
                <th scope="row">Website</th>
                <td>{{website}}</td>
            </tr>
            <tr>
                <th scope="row">Take Away</th>
                <td>{{takeAway}}</td>
            </tr>
            <tr>
                <th scope="row">Home Delivery</th>
                <td>{{homeDelivery}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import db from "../firebaseConfig"
    export default {
        data(){
            return{
                email:'',
                password:'',
                address1:'',
                address2:'',
                website:'',
                timing:[],
                country:'',
                currency:'',
                takeAway:false,
                homeDelivery:false,
                city:'',
                resturantname:'',
                // products:usersData,
                // countries:countries,
                ctr:false,
                alwaysAvailable:false,
            }
        },
        async created(){
            this.email = this.$route.params.email;
            db.collection('ResturantData').where('email','==',this.email).get().then((querySnapshot)=>{
                querySnapshot.forEach(doc => {
                console.log(doc.data().password);
                this.password = doc.data().password,
                this.city=doc.data().city,
                this.address1=doc.data().address1,
                this.address2=doc.data().address2,
                this.currency=doc.data().currency,
                this.country= doc.data().country,
                this.website=doc.data().website,
                this.homeDelivery=doc.data().homedelivery,
                this.takeAway=doc.data().takeaway,
                this.alwaysAvailable=doc.data().alwaysavailable
                let dat=[]
                if(this.alwaysAvailable==false){
                    doc.data().timing.forEach(element => {
                        dat.push({day:element.day,stime:element.key.start,etime:element.key.end})
                    });
                    this.timing=dat;
                }else{
                    this.timing='Always Available'
                }
                // this.timing=doc.data().timing,
                this.resturantname= doc.data().resturantname
                })
          }) 
        }
    }
</script>

<style lang="scss" scoped>

</style>