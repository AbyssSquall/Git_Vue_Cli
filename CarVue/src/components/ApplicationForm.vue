<template>
    <div>
        <h1>审批单</h1>
        <p>申请人：{{Name}}，目的地是{{Aim}}，车辆借用开始时间{{StartTime}}，车辆借用结束时间{{EndTime}}，借用车辆为{{Car}}，驾驶人员为{{Driver}}</p>
    </div>
</template>
<script>

export default {
  name: 'Car',
  data () {
    return {
      Name: '蔡徐坤',
      Aim:"化粪池",
      StartTime:"2019/04/10 10:00:00",
      EndTime:"2019/04/11 10:00:00",
      Car:"浙B00001",
      Driver:"蔡徐坤",
    }
  },
  components: {
  },
  create:function(){
  },
  mounted:function(){
      console.log(this.$route.query);
      this.Name = this.$route.query.name;
      this.Aim = this.$route.query.aim;
      this.StartTime = this.$route.query.starttime;
      this.EndTime = this.$route.query.endtime;
      this.Car = this.$route.query.car;
      this.Driver = this.$route.query.driver;
  }
}
</script>
