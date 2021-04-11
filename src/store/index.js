import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
// import db from "../../src/firebaseConfig"
// import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
// import router from "../router";
// import { data } from "jquery";
// import db from "../firebaseConfig"
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    admin:false,
    loggedIn:false,
    takeAway:false,
    homeDelivery:false,
    editwork:false,
    Email:'',
    Password:'',
    Timing:'',
    Currency:'',
    City:'',
    Country:'',
    Address1:'',
    Address2:'',
    website:'',
    categoryName:'',
    categoryDescription:'',
    currentUserEmail:'',
    itemName:'',
    itemDescription:'',
    itemCategory:'',
    currentDocID:''
  },
  mutations: {
    setitemCategory(state,val){
      state.itemCategory=val;
    },
    setcurrentDocID(state,val){
      state.currentDocID=val;
    },
    setitemName(state,val){
      state.itemName=val;
    },
    setitemDescription(state,val){
      state.itemDescription=val;
    },
    setCurrentUserEmail(state,val){
      state.currentUserEmail=val;
    },
    setCategoryName(state,val){
      state.categoryName=val;
    },
    setCategoryDescription(state,val){
      state.categoryDescription=val;
    },
    settakeAway(state,val){
      state.takeAway=val;
    },
    setEditWork(state,val){
      state.editwork=val;
    },
    sethomeDelivery(state,val){
      
      state.homeDelivery=val;
    },
    setTiming(state,val){
      state.Timing=val;
    },
    setWebsite(state,val){
      state.website=val;
    },
    setCurrency(state,val){
      state.Currency=val;
    },
    setCountry(state,val){
      state.Country=val;
    },
    setCity(state,val){
      state.City=val;
    },
    setAddress1(state,val){
      state.Address1=val;
    },
    setAddress2(state,val){
      state.Address2=val;
    },
    setEmail(state,val){
      state.Email=val;
    },
    setPassword(state,val){
      state.Password=val;
    },
    setadmin(state,val){
      state.admin=val;
    },
    setloggedIn(state,val){
      state.loggedIn=val;
    }
  },
  actions: {
    // async settakeAway(state,val){
    //   state.commit('settakeAway',val);
    // },
    // settWebsite(state,val){
    //   state.commit('setWebsite',val);
    // },
    // resturantupdate({commit},user=[]){
    //   commit('setResturantData',user)
    // },
    // adminupdate({commit}){
    //   commit('adminchange')
    // },
    // readResturant({commit}){
    //   var demoData=[];
    //   console.log(demoData);
      
    // // console.log('demo data',demoData);
    //     commit('setResturantData',demoData);
        
    //     // router.push('/admin/home');
    // }
  },
  modules: {},
  getters:{
    gettakeAway: state=>state.takeAway,
    getEmail: state=>state.Email
  }
});
