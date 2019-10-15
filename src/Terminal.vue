<template>
    <div class="terminal" ref="outer" :style="{width: width, height: height, backgroundColor: bgColor}">
      <TerminalLog ref="log" :defaultColor="defaultColor"></TerminalLog>
      <TerminalEcho :captured="captured" :disabled="disabled" :text="currentInput" :echoColor="echoColor" ref="echo"></TerminalEcho>
      <TerminalScanlines></TerminalScanlines>
      <TerminalInput @captureInput="captureInput" @releaseInput="releaseInput" @key="key"></TerminalInput>
  </div>
</template>

<style scoped>
.terminal {
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  
  font-family: "Lucida Console", Monaco, monospace;
  box-sizing: border-box;
}
</style>

<script>
import TerminalLog from './components/Log';
import TerminalEcho from './components/Echo';
import TerminalInput from './components/Input';
import TerminalScanlines from './components/Scanlines';

export default {
  components: {
    TerminalLog,
    TerminalEcho,
    TerminalInput,
    TerminalScanlines
  },

  props: [
    'width',
    'height',
    'scanlines',
    'bgColor',
    'textColor'
  ],

  data: function() {
    return {
      currentInput: '',
      commands: [],
      currentHistory: 0,
      captured: false,
      disabled: true,
      echoColor: this.textColor,
      defaultColor: this.textColor,
      scrollOnInput: true,
      scrollOnOutput: false,
    };
  },
  
  computed: {

  },

  mounted: function() {
    this.$refs.outer.addEventListener('wheel', this.wheel.bind(this), true);
    setTimeout(function() {this.disabled = false}.bind(this), 0);
  },
  
  methods: {
    wheel: function (e) {
      e.stopPropagation();
      this.$refs.outer.scrollTop += e.deltaY;
    },
    key: function(val) {
      if (this.disabled) {
        return;
      }

      if (this.scrollOnInput) {
        this.scroll();
      }
      
      switch (val) {
      case 'Backspace':
        this.currentInput = this.currentInput.slice(0, this.currentInput.length - 1);
        break;
      
      case 'UpArrow':
        this.currentHistory = this.currentHistory - 1;
        if (this.currentHistory < -this.commands.length) {
          this.currentHistory = -this.commands.length;
        } else {
          this.currentInput = this.commands[this.commands.length + this.currentHistory];
        }
        break;
        
      case 'DownArrow':
        this.currentHistory = this.currentHistory + 1;
        if (this.currentHistory > 0) {
          this.currentHistory = 0;
        } else if (this.currentHistory == 0) {
          this.currentInput = '';
        } else {
          this.currentInput = this.commands[this.commands.length + this.currentHistory];
        }
        break;
        
      case 'Enter':
        this.$refs.log.add(this.$refs.echo.prompt + this.currentInput, this.echoColor);
        
        this.commands.push(this.currentInput);
        this.$emit('command', this.currentInput);
        
        if (this.commands.length > 100) {
          this.commands.shift();
        }
        
        this.currentHistory = 0;
        
        this.currentInput = '';
        break;
        
      default:
        this.currentInput += val;
        break;
      }
    },
    
    captureInput: function() {
      this.captured = true;
    },
    
    releaseInput: function() {
      this.captured = false;
    },
    
    scroll: function() {
      setTimeout(function() {this.$refs.outer.scrollTop = this.$refs.outer.scrollHeight;}.bind(this), 0);
    },
    
    addLine: function(text, color) {
      this.$refs.log.add(text, color);
      
      if (this.scrollOnOutput) {
        this.scroll();
      }
    },
    
    disable: function() {
      this.disabled = true;
    },
    
    enable: function() {
      this.disabled = false;
    },
    
    setEchoColor: function(color) {
      this.echoColor = color;
    },
    
    setDefaultColor: function(color) {
      this.defaultColor = color;
    },
  },
}
</script>