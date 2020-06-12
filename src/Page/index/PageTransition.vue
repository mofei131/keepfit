<template>
  <transition :name="transitionName">
    <!-- exclude="refurbish" -->
      <!-- <keep-alive  exclude="refurbish" >  -->
        <router-view>
        </router-view>
      <!-- </keep-alive>  -->
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        transitionName: 'slide-right-sup'
      }
    },
    created(){
      if(this.$route.query.token){
        this.set_app_token(this.$route.query.token)
      }
    },
    beforeRouteUpdate (to, from, next) {   
      
      if (!window.$backState) {
        this.transitionName = 'slide-right-sup'
      } else {
        this.transitionName = 'slide-left-sup'
      }
      window.$backState = false
      next()
    }
    ,mounted () {   
     
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $time = 0.3s
 
  .page-view
    height 100%
    position absolute
    top 0
    left 0
    width 100%
/*
  .slide-right-sup-enter-active
    -webkit-transition: all $time
  .slide-right-sup-enter
    -webkit-transform: translate3d(100%,0,0)
  .slide-right-sup-enter-to
    -webkit-transform: translate3d(0,0,0)

  .slide-right-sup-leave-active
    -webkit-transition: all $time
  .slide-right-sup-leave
    -webkit-transform: translate3d(0,0,0)
  .slide-right-sup-leave-to
    -webkit-transform: translate3d(-100%,0,0)

  .slide-left-sup-enter-active
    -webkit-transition: all $time
  .slide-left-sup-enter
    -webkit-transform: translate3d(-100%,0,0)
  .slide-left-sup-enter-to
    -webkit-transform: translate3d(0,0,0)

  .slide-left-sup-leave-active
    -webkit-transition: all $time
  .slide-left-sup-leave
    -webkit-transform: translate3d(0,0,0)
  .slide-left-sup-leave-to
    -webkit-transform: translate3d(100%,0,0)
*/

/*
 .child-view {
    position: absolute;
    width:100%;
    transition: all .8s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }*/
</style>
