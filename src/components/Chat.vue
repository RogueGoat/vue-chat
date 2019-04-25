<template>
  <div class="chat container">
    <div class="chat-box">
      <h1>BBI Chat</h1>
      <div class="chat-box-inner">
        <div class="messages">
          <ul class="message-list">
            <!--<li v-for="message in messages" :key="message.id" class="responder">
              <div class="info-container">
                <div><h3>{{ message.name }}</h3> <span>{{ message.timestamp }}</span></div>
                <div class="message-container">
                  <span>{{ message.content }}</span>
                </div>
              </div>
            </li>-->
            <li v-for="message in messages" :key="message.id" class="your-message">
              <div class="info-container">
                <div><h3>{{ message.name }}</h3> <span>{{ message.timestamp }}</span></div>
                <div class="message-container">
                  <span>{{ message.content }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="name">Hello, <h2 class="name-heading">{{ name }}</h2>!</div>
        <form class="chat-respond">
          <!--<label for="chat-input" class="sr-only">Enter your Message!</label>-->
          <NewMessage :name="name" />
          <!--<textarea placeholder="Enter your Message!" class="chat-input-box" name="chat-input" id="chat-input"></textarea>-->
          <button class="btn">Enter</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import NewMessage from '@/components/NewMessage'
  import chatLog from '@/firebase/init'

  export default {
    name: 'Chat',
    props: ['name', 'company'],
    components: {
      NewMessage
    },
    data() {
      return {
        messages: []
      }
    },
    created() {
      let ref = chatLog.collection('messages');
      ref.onSnapshot(snapshot => {
        // console.log('logged');
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added'){
            let doc = change.doc;
            this.messages.push({
              id: doc.id,
              name: doc.data().name,
              content: doc.data().content,
              timestamp: doc.data().timestamp
            });
          }
        });
      })
      console.log();
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
  div.name {
    width: 80%;
    margin: auto;
    text-align: left;
  }
  .name-heading {
    display: inline-block;
  }
  .container {
    border-radius: 20px 20px 0 0;
    padding: 20px;
    background-color: #f4f4f4;
    margin: 0 15px;
  }

  h3 {
    display: inline-block;
    margin-bottom: 5px;
  }

  .message-list {
    padding: 20px;
    list-style: none;
  }

  .message-list div span {
    /*display: block;*/
  }

  .responder {
    text-align: left;
  }
  .your-message {
    text-align: right;
  }
  li {
    width: 100%;
    min-height: 100px;
    position: relative;
  }
  .responder .message-container {
    padding: 15px;
    border-radius: 10px;
    background: #f4f4f4;
    width: 40%;
    float: left;
  }
  .your-message .message-container {
    padding: 15px;
    border-radius: 10px;
    background: rgba(0,180,201,.5);
    width: 40%;
    float: right;
  }
  .messages {
    display: block;
    border-radius: 20px;
    margin: 20px auto 40px;
    min-height: 200px;
    width: 80%;
    background: #fff;
  }

  textarea {
    min-height: 100px;
    width: 80%;
    border-radius: 20px;
    padding: 18px 20px;
    background-color: #fff;
    border: transparent;
  }

  .btn {
    text-align: center;
    cursor: pointer;
    margin: auto;
    display: block;
    width: 100%;
    color: #fff;
    background-color: #00a5b8;
    border-color: #00a5b8;
    border-radius: 20em;
    padding: 18px 20px;
    font-size: 22px;
    line-height: 12px;
    letter-spacing: .05em;
    text-transform: none;
    box-shadow: -6px 0 10px 0 rgba(0,0,0,.2);
    max-width: 290px;
    font-weight: 400;
  }
  .btn:hover {
    border-color: #00b4c9;
    background-color: #00b4c9;
    color: #fff;
  }
</style>
