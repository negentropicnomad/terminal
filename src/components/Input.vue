<template>
    <input type="text" ref="input" class="terminal-input" @keydown.delete="bs" @keydown.up="up" @keydown.down="down" @keypress="keypress" @focus="captureInput" @blur="releaseInput">
</template>

<style scoped>
.terminal-input {
  position: fixed;
  
  border: none;
  caret-color: transparent;
  background: transparent;
  
  height: 100%;
  z-index: 3;
}

.terminal-input:focus {
  outline: none;
}
</style>

<script>
export default {
  methods: {
    bs: function(evt) {
      evt.preventDefault();
      //Also captures delete key which we're ignoring
      if (evt.key == 'Backspace') {
        this.$emit('key', 'Backspace');
      }
    },
    
    up: function(evt) {
      evt.preventDefault();
      this.$emit('key', 'UpArrow');
    },
    
    down: function(evt) {
      evt.preventDefault();
      this.$emit('key', 'DownArrow');
    },
    
    keypress: function(evt) {
      evt.preventDefault();
      this.$emit('key', evt.key);
    },
    
    captureInput: function() {
      this.$emit('captureInput');
    },
    
    releaseInput: function() {
      this.$emit('releaseInput');
    },
    
    resize: function() {
      var i = this.$refs.input;
      var p = i.parentNode;
      i.style.width = p.clientWidth + 'px';
      i.style.height = p.clientHeight + 'px';
      i.style.top = p.offsetTop + 'px';
      i.style.left = p.offsetLeft + 'px';
    },
  },
  
  mounted: function() {
    window.addEventListener('resize', this.resize.bind(this));
    setTimeout(this.resize.bind(this));
  },
}
</script>