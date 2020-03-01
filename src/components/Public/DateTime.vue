<template>
  <div id="DateTime" class="datetime-box">
    <mt-datetime-picker
      ref="picker"
      v-model="dateTime"
      :startDate="startDate"
      :endDate="endDate"
      @cancel="cancel"
      @confirm="confirm"
      :closeOnClickModal="false"
      type="date"
      show-toolbar
      value-format="yyyy-MM-dd"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
  </div>
</template>

<script>
  export default {
    props: ['dateShow', 'startTime', 'endTime'],
    name: 'DateTime',
    data() {
      return {
        dateTime: new Date(),
        startDate: new Date(),
        endDate: this.utils.getAfterNDate(1, 'y'),
        visible: true
      }
    },
    methods: {
      confirm(val){
        this.$emit('confirm', val)
      },
      cancel(){
        this.$emit('cancel')
      }
    },
    watch: {
      dateShow (val) {
        if(val){
          this.$refs.picker.open()
        }else{
          this.$refs.picker.close()
        }
      },
      startTime (val) {
        this.startDate = new Date(val) || new Date()
      },
      endTime (val) {
        this.endDate = new Date(val) || this.utils.getAfterNDate(1, 'y')
      }
    }
  }
</script>

<style lang="scss">

</style>
