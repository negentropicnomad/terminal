<template>
    <div class="terminal-scanlines" ref="scanlines"></div>
</template>

<script>
export default {
  methods: {
    resize: function() {
      var i = this.$refs.scanlines;
      var p = i.parentNode;
      i.style.width = p.clientWidth + 'px';
      i.style.height = p.clientHeight + 'px';
      i.style.top = p.offsetTop + 'px';
      i.style.left = p.offsetLeft + 'px';
    },
  },

  data: function() {
    return {
    }
  },

  computed: {
  },
  
  mounted: function() {
    window.addEventListener('resize', this.resize.bind(this));
    setTimeout(this.resize.bind(this));
  },
}
</script>

<style scoped>
.terminal-scanlines {
  position: fixed;

  padding: 0px;
  
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4wgYEhgf6WgVjwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY2CAgn8AAQgA/yEMS1sAAAAASUVORK5CYII=);
  background-repeat: repeat;
  
  opacity: 0.3;
  
  pointer-events: none;
  
  z-index: 1;
}
</style>