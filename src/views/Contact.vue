<template>
<div class="swing">
    <div class="column">
    <section class="section1">
        <div class="rings">
            <a href="/">
            <img src="../assets/rings.png" class="for-phone"/>
            </a>
        </div>
        <h1 class="title">The Swing Dance Cooperative</h1>
    </section>

    <section class="rsvp">
        <h2>Contact us</h2>
        <form>
            <div>
                <label>Your name (or stage name)</label>
                <input type="text" v-model="name"/>
            </div>

            <div>
                <label>Please write your message below:</label>
                <textarea v-model="message" rows="6"></textarea>
            </div>

            <div>            
                <label>How should we contact you? (optional)</label>
                <input type="text" v-model="contact"/>
            </div>
            
            <div style="text-align: center">
                <div v-if="error">
                <p>There was an error sending your message.</p> 
                <p>Please email us at info@dance.coop if this isn't working.</p>
                </div>
                <div v-if="isSending">Sending ...</div>
                <div v-else-if="isSent">Sent. Thank you</div>
                <div v-else>
                <button 
                    type="submit" 
                    @click.prevent="sendLetter">Submit</button>
                </div>
            </div>
        </form>
    </section>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        name: null,
        message: null,
        contact: null,

        isSending: false,
        isSent: false,
        error: null
    };
  },
  methods: {
    sendLetter: function () {
      this.isSending = true;

      var data = {
        name: this.name,
        contact: this.contact,
        message: this.message,
      };

      axios.post('/api/letters-add', data)
        .then(() => {
          this.isSending = false;
          this.isSent = true;
        })
        .catch(err => {
          this.isSending = false;
          this.error = err;
        });
    }
  }   
}
</script>

<style scoped>

</style>