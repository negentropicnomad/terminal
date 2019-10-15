<template>
    <div class="terminal-log">
        <div class="terminal-entry" v-for="item in entries" :key="item.id" :style="{color: item.color}">{{item.entry}}</div>
    </div>
</template>

<style scoped>
.terminal-log {
  width: 100%;
}

.terminal-entry {
  width: 100%;
}
</style>

<script>
export default {
    props: [
    'maxEntries',
    'defaultColor',
  ],
  
  data: function() {
    return {
      id: 0,
      entries: [],
    };
  },
  
  methods: {
    add: function(text, color) {
      if (typeof color == 'undefined') {
        color = this.defaultColor;
      }
      
      this.entries.push({id: this.id, entry: text, color: color});
      this.id = this.id + 1;
      
      var max = this.maxEntries;
      if (!max) {
        max = 100;
      }
      
      if (this.entries.length > max) {
        this.entries.shift();
      }
    },
  },
}
</script>