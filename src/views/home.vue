<template>
  <div>
    <div>内容一</div>
    <img src="@/assets/imgs/1.jpg" alt="">
  </div>
</template>

<script>
  export default {
    methods:{
     fetch(){
       $tm('search',{
          appkey : 'd279d930804e9d0c3d9f682662a4b6d8',
          keyword:'白菜',
          num: 10
        }).then((res) => {
          console.log(res);
        })
     }
    },
    mounted(){
      console.log(this.$store.state);
      console.log(VUE_APP_API_HOST);
      // this.fetch()
    }
  }
</script>

<style lang="scss" scoped>
img{
  width: 100px;
  height: 100px;
}
</style>