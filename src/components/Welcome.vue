<template>
    <div class="welcome container">
      <div class="login">
        <h1>Hey there!</h1>
        <p>Once you enter your name and company we can direct you to a BBI representative!</p>
        <form @submit.prevent="enterChat">
          <p v-if="warning" class="warning">{{ warning }}</p>
          <div class="flex-column">
            <div class="form-group">
              <label for="name" class="sr-only">Name:</label>
              <input placeholder="Your Name" id="name" class="form-control" type="text" name="name" v-model="name">
            </div>
            <div class="form-group second">
              <label for="company" class="sr-only">Company:</label>
              <input placeholder="Company Name" id="company" class="form-control" type="text" name="company" v-model="company">
            </div>
          </div>
          <button class="btn">Let's Go!</button>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      name: null,
      company: null,
      warning: null
    }
  },
  methods: {
    enterChat(){
      if(this.name && this.company){
        this.$router.push({name: 'Chat', params: {name: this.name, company: this.company} })
      } else {
       this.feedback = "Please enter your name and company, so we know who we're talkin' to!"
      }
    }
  }
}
</script>

<style scoped>
  h1, p {
    color: #fff;
    text-align: center;
  }
  .warning {
    color: red;
  }
  .sr-only {
    display: none;
  }
  .container {
    /*position: fixed;*/
    /*bottom: 0;*/
    /*right: 0;*/
    /*left: 0;*/
    border-radius: 20px;
    padding: 20px;
    background-color: #2f2a95;
    margin: 0 15px;
  }

  .flex-column {
    margin: auto;
    max-width: 500px;
    display: flex;
    justify-content: center;
  }

  .form-group.second {
    margin-bottom: 20px;
  }

  input {
    border-radius: 20em;
    padding: 18px 20px;
    background-color: #f4f4f4;
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
