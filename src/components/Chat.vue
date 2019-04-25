<template>
  <div class="chat container">
    <div class="chat-box">
      <h1>BBI Chat</h1>
      <div class="chat-box-inner">
        <div class="messages">
          <ul class="message-list" v-chat-scroll>
            <li v-for="message in messages" :key="message.id" class="message">
              <div class="info-container">
                <div class="name-time"><h3>{{ message.name }}</h3> <span>{{ message.timestamp }}</span></div>
                <div class="message-container">
                  <span>{{ message.content }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="name">Hello, <h2 class="name-heading">{{ name }}</h2>!</div>
        <form class="chat-respond">
          <NewMessage :name="name" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import NewMessage from '@/components/NewMessage'
  import chatLog from '@/firebase/init'
  import moment from 'moment'

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
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added'){
            let doc = change.doc;
            this.messages.push({
              id: doc.id,
              name: doc.data().name,
              content: doc.data().content,
              timestamp: moment(doc.data().timestamp).format('lll')
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
    height: 100vh;
    background-color: #f4f4f4;
  }

  h3 {
    display: inline-block;
    margin-bottom: 5px;
  }

  .message-list {
    max-height: 300px;
    overflow: auto;
    padding: 20px;
    list-style: none;
  }

  li {
    width: 100%;
    min-height: 100px;
    position: relative;
  }

  .name-time {
    text-align: left;
    padding: 10px;
    border-radius: 20px 20px 0 0;
    background: rgba(0,180,201,.5);
  }
  .message {
    width: 70%;
    border-radius: 20px;
    border: 1px solid rgba(0,180,201,.5);
    margin: 0 auto 20px;
  }
  .message-container {
    padding: 20px;
    text-align: left;
  }
  .messages {
    display: block;
    border-radius: 20px;
    margin: 20px auto 40px;
    width: 80%;
    background: #fff;
  }
</style>
