<template>
    <div>
        <form @submit.prevent="editResturant">
          <div class="modal-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input type="email" class="form-control" v-model="email" id="inputEmail4" placeholder="Email">

                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Password</label>
                    <input type="password" class="form-control" v-model="password" id="inputPassword4" placeholder="Password">
                  
                  </div>
                </div>
                <div class="form-group">
                  <label for="resturantName">Resturant Name</label>
                  <input type="text" class="form-control" v-model="resturantname" id="resturantName" placeholder="Resturant Name">
               
                </div>
                <div class="form-group">
                  <label for="inputAddress">Address</label>
                  <input type="text" class="form-control" v-model="address1" id="inputAddress" placeholder="1234 Main St">

                </div>
                <div class="form-group">
                  <label for="inputAddress2">Address 2</label>
                  <input type="text" class="form-control" v-model="address2" id="inputAddress2" placeholder="Apartment, studio, or floor">
                 
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" v-model="city" id="inputCity">
       
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputState">Country</label>
  
                    <select  v-model="selectcountry" id="inputState" class="form-control">
                      <option selected value="-1">Choose...</option>
                      <option v-for="country in countries" v-bind:key="country.id" v-bind:value="country.name">{{country.name}}</option>
                    </select>
                  </div>
                  <div class="form-group col-md-2">
                    <label for="inputZip">Currency</label>
                    <select v-model="selectcurrency" id="inputZip" class="form-control">
                      <option selected value="-1">Choose...</option>
                      <option v-for="product in products" v-bind:key="product.cc" v-bind:value="product.cc">{{product.name}} {{product.symbal}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="website">Website</label>
                 
                    <input type="text"  v-model="website" class="form-control" id="website" placeholder="website">
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-12">
                    <div>
                        <h6>Time Availability</h6>
                        <div class="radio-btn">
                            <input type="radio" name="time" v-model="alwaysAvailable" id="alwaysAvailable" value="alwaysavailable" @change="certainTimeRangehandle">
                            <label class="ml-1" for="alwaysAvailable">Always Available:</label><br>
                            <input type="radio" name="time" v-model="ctr" id="ctr" value="ctr" @change="certainTimeRangehandle">
                            <label class="ml-1" for="ctr">Certain Time Range:</label>
                        </div>
                        
                        <div  id='ctrdiv' style="display:none">
                            <div class="col-md-12 d-flex justify-content-around">
                            <div>
                                <input type="checkbox" id="sun" name="sunday" class="mr-2" v-model="ct.sunday.istrue" @change="handlechange">
                                <label class="mr-3" for="sun"> Sunday</label>
                            </div>
                            <div id="sunday" style="display:none">
                                <input class="mr-2" type="time" id="sunS" v-model="ct.sunday.start">
                                <input type="time" id="sunE" v-model="ct.sunday.end">
                            </div>
                        </div>
                        <div class="col-md-12 d-flex justify-content-around">
                            <div>
                                <input type="checkbox"  id="mond" class="mr-2" v-model="ct.monday.istrue" name="monday" @change="handlechange" >
                                <label class="mr-3" for="mond"> Monday</label>
                            </div>
                            <div id="monday" style="display:none">
                                <input class="mr-2" type="time" id="mondayS" v-model="ct.monday.start" >
                                <input type="time" id="mondayE" v-model="ct.monday.end">
                            </div>
                        </div>
                        <div class="col-md-12 d-flex justify-content-around">
                            <div>
                                <input type="checkbox"  id="tues" class="mr-2" v-model="ct.tuesday.istrue" name="tuesday" @change="handlechange">
                                <label class="mr-3" for="tues"> Tuesday</label>
                            </div>
                            <div id="tuesday" style="display:none">
                                <input class="mr-2" type="time" id="tuesdayS" v-model="ct.tuesday.start">
                                <input type="time" id="tuesdayE" v-model="ct.tuesday.end">
                            </div>
                        </div>
                        <div class="col-md-12 d-flex justify-content-around">
                            <div>
                                <input type="checkbox"  id="wednes" class="mr-1" v-model="ct.wednesday.istrue" name="wednesday" @change="handlechange">
                                <label class="" for="wednes"> Wednesday</label>
                            </div>
                            <div id="wednesday" style="display:none">
                                <input class="mr-2" type="time" id="wednesdayS" v-model="ct.wednesday.start">
                                <input type="time" id="wednesdayE" v-model="ct.wednesday.end">
                            </div>
                        </div>
                        <div class="col-md-12 d-flex justify-content-around">
                            <div>
                                <input type="checkbox"  id="thurs" class="mr-2" v-model="ct.thursday.istrue" name="thursday" @change="handlechange">
                                <label class="mr-3" for="thurs"> Thursday</label>
                            </div>
                            <div id="thursday" style="display:none">
                                <input class="mr-2" type="time" id="thursdayS" v-model="ct.thursday.start">
                                <input type="time" id="thursdayE" v-model="ct.thursday.end">
                            </div>
                        </div>
                        <div class="col-md-12 d-flex justify-content-around">
                            <div >
                                <input type="checkbox" id="fri" class="mr-2" v-model="ct.friday.istrue" name="friday" @change="handlechange">
                                <label class="mr-4 ml-1" for="fri"> Friday</label>
                            </div>
                            <div id="friday" style="display:none">
                                <input class="mr-2 ml-3" type="time" id="fridayS" v-model="ct.friday.start">
                                <input class="mr-1" type="time" id="fridayE" v-model="ct.friday.end">
                            </div>
                        </div>
                        <div class="col-md-12 d-flex justify-content-around">
                            <div>
                                <input type="checkbox"  id="satur" class="mr-2" v-model="ct.saturday.istrue" name="saturday" @change="handlechange">
                                <label class="mr-3" for="satur"> Saturday</label>
                            </div>
                            <div id="saturday" style="display:none">
                                <input class="mr-2" type="time" id="saturdayS" v-model="ct.saturday.start">
                                <input type="time" id="saturdayE" v-model="ct.saturday.end">
                            </div>
                        </div>
                        </div>
                        
                        
                    </div>
                 
                  </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12 mt-3">
                        <h6>Delivery Option</h6>
                    </div>
                  <div class="form-group col-md-4">
                      <div class="form-check ml-2">
                        <input v-model="homeDelivery"  class="form-check-input" type="checkbox" id="homeDelivery">
                        <label class="form-check-label" for="homeDelivery">
                          Home Delivery
                        </label>
                      </div>
                  </div>
                  <div class="form-group col-md-8">
                      <div class="form-check">
                        <input v-model="takeAway" class="form-check-input" type="checkbox" id="takeAway">
                        <!-- <input  v-model="takecheck" :value="takecheck" class="form-check-input" type="checkbox" id="takeAway"> -->
                        <label class="form-check-label" for="takeAway">
                          Take Away
                        </label>
                      </div>
                  </div>
                </div>
              <button type="submit" class="btn btn-primary" id="btnsave">Edit Resturant</button>
          </div>
          </form>
    </div>
</template>

<script>
import usersData from "../assets/currency.json";
import countries from "../assets/countries.json";
import db from "../firebaseConfig"
    export default {
        data(){
            return{
                email:'',
                password:'',
                address1:'',
                address2:'',
                website:'',
                timing:'',
                selectcountry:'',
                selectcurrency:'',
                takeAway:false,
                homeDelivery:false,
                city:'',
                resturantname:'',
                products:usersData,
                countries:countries,
                ctr:false,
                alwaysAvailable:false,
                ct:{
                    monday:{istrue:false,start:'',end:''},
                    tuesday:{istrue:false,start:'',end:''},
                    wednesday:{istrue:false,start:'',end:''},
                    thursday:{istrue:false,start:'',end:''},
                    friday:{istrue:false,start:'',end:''},
                    saturday:{istrue:false,start:'',end:''},
                    sunday:{istrue:false,start:'',end:''},
                }
            }
        },
        async created() {
            try {
                this.email = this.$route.params.email;
            console.log('created');
            const snapshot = await db.collection('ResturantData').where('email','==',this.email).get();
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }  
                let alltime=[]
                snapshot.forEach(querySnapshot => {
                   this.password=querySnapshot.data().password,
                   this.address1=querySnapshot.data().address1,
                   this.address2=querySnapshot.data().address2,
                   this.website=querySnapshot.data().website,
                   this.alwaysAvailable=querySnapshot.data().alwaysavailable
                   if(this.alwaysAvailable==false){
                       this.ctr=true
                            querySnapshot.data().timing.forEach(element => {
                            alltime.push(element)
                        });
                        this.timing=alltime,
                        this.timing.forEach(element => {
                            console.log(element.alwaysavailable,'timing');
                        });
                   }
                   this.selectcountry=querySnapshot.data().country,
                   this.selectcurrency=querySnapshot.data().currency,
                   this.takeAway=querySnapshot.data().takeaway,
                   this.homeDelivery=querySnapshot.data().homedelivery,
                   this.city=querySnapshot.data().city,
                   this.resturantname=querySnapshot.data().resturantname
                })
            } catch (error) {
                alert('Sorry! A problem occured.');
            }
            
        },
        methods:{
            async editResturant(){
                if(this.email=='' || this.password=='' || this.selectcurrency=='' || this.city=='' || this.selectcountry=='' || this.address1=='' || this.address2=='' || this.website==''){
                    alert('All fields are required');
                    return;
                }
                try {
                    var alltimings=[]
                    if(this.alwaysAvailable!=true){         
                        for (let [key, value] of Object.entries(this.ct)) {
                            if(this.ct[key].istrue==true){
                                alltimings.push({key:value,day:key});
                            }
                        }
                    }else{
                        alltimings=[{alwaysavailable:this.alwaysAvailable}]
                    }

                    const snapshot = await db.collection('ResturantUsers').where('email','==',this.email).get();
                    if (snapshot.empty) {
                        console.log('No matching documents.');
                        return;
                    }
                snapshot.forEach(doc => { 
                        db.collection('ResturantData').doc(doc.id).update({ email:this.email,
                            resturantname:this.resturantname,
                            alwaysavailable:this.alwaysAvailable,
                            password: this.password,address1:this.address1,
                            address2: this.address2,city:this.city,
                            country: this.selectcountry,currency:this.selectcurrency,
                            website: this.website,timing:alltimings,
                            takeaway:this.takeAway,
                            homedelivery:this.homeDelivery 
                        })
                        .then(()=>{alert('Record Updated Successfully'); this.$router.push('/admin/home');})
                    })
                } catch (error) {
                    alert('Problem occured. Try again');
                }
                
            },
            certainTimeRangehandle(){
                if($("input[name=time]:checked").val()=='ctr'){
                    $('#ctrdiv').css("display","block");
                    this.ctr=true;
                    this.alwaysAvailable=false
                }
                else{
                    $('#ctrdiv').css("display","none");
                    this.alwaysAvailable=true;
                    this.ctr=false;
                }
            },
            handlechange(e){
                console.log(e.target.name,this.ct[e.target.name].istrue);
                if(this.ct[e.target.name].istrue){
                    $(`#${e.target.name}`).css("display","block");
                }else{
                    $(`#${e.target.name}`).css("display","none");
                }
            },
        }
        
    }
</script>

<style lang="scss" scoped>

</style>