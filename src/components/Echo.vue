<template>
    <div class="un-console-echo" :style="echoStyle">{{echoText}}</div>
</template>

<style scoped>
.terminal-echo {
  width: 100%;
}
</style>

<script>
export default {
    props: [
    'disabled',
    'text',
    'captured',
    'echoColor',
  ],
  
  data: function() {
    return {
      prompt: '>',
      cursor: '_',
      blink: 500,
      timer: 0,
      toggle: true
    };
  },
  
  computed: {
    echoStyle: function() {
      var s = {
        display: (this.disabled ? 'none' : 'block'),
        color: this.echoColor,
      };
      
      return s;
    },
    
    cursorVisible: function() {
      return (this.captured && this.toggle);
    },
    
    echoText: function() {
      return this.prompt + this.text + (this.cursorVisible ? this.cursor : '');
    }
  },
  
  methods: {
    toggleCursor: function() {
      this.toggle = !this.toggle;
      this.timer = setTimeout(this.toggleCursor.bind(this), this.blink);
    }
  },
  
  mounted: function() {
    this.timer = setTimeout(this.toggleCursor.bind(this), this.blink);
  },
  
  beforeDestroy: function() {
    clearTimeout(this.timer);
  },
}
</script>