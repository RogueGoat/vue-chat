<template>
  <div class="new-message">
    <form @submit.prevent="addMessage()">
      <p v-if="warning" class="warning">{{ warning }}</p>
      <label for="chat-input" class="sr-only">Enter your Message!</label>
      <input placeholder="Enter your Message!" v-model="newMessage" class="chat-input-box" name="chat-input" id="chat-input">
    </form>
  </div>
</template>



<script>
  import chatLog from '@/firebase/init'

  export default {
    name: 'NewMessage',
    props: ['name'],
    data () {
      return {
        newMessage: null,
        warning: null
      }
    },
    methods: {
      addMessage(){
        if (this.newMessage) {
          //async request to database
          chatLog.collection('messages').add({
            content: this.newMessage,
            name: this.name,
            timestamp: Date.now()
          }).catch(err => {
            console.log(err);
          });
          this.newMessage = null;
        } else {
          this.warning = "Please enter a message, first!"
        }
      }
    }
  }
</script>

<style scoped>
  h1 {
    color: #2f2a95;
  }
  p {
    color: #323232;
  }
  .sr-only {
    display: none;
  }
  h3 {
    margin-bottom: 5px;
  }

  .message-list div span {
    display: block;
  }

  li {
    width: 100%;
    min-height: 100px;
    position: relative;
  }
  .responder div {
    padding: 15px;
    border-radius: 10px;
    background: #f4f4f4;
    width: 40%;
    float: left;
  }
  .your-message div {
    padding: 15px;
    border-radius: 10px;
    background: rgba(0,180,201,.5);
    width: 40%;
    float: right;
  }
  .warning {
    color: red;
    position: absolute;
    right: 130px;
    top: -25px;
  }
  form {
    padding-top: 20px;
    position: relative;
  }
  input {
    margin-bottom: 20px;
    width: 80%;
    border-radius: 20px;
    padding: 18px 20px;
    background-color: #fff;
    border: transparent;
  }

</style>
