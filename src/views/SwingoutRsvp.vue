<template>
<page>
    <section class="rsvp">
        <form v-on:submit.prevent="rsvp">
            <h1>Olympia Winter Swingout / R.S.V.P.</h1>
            <label>
                <div>What's your name?</div>
                <input type="text" v-model="name"/>
            </label>

            <div>Which events during the February 22-23 weekend do you plan to attend?</div>
            <div class="checkbox" :class="{ sel: saturdayWorkshops }">
                <input
                    id="saturday-workshops"
                    type="checkbox"
                    v-model="saturdayWorkshops">
                <label for="saturday-workshops">Saturday Workshops</label>
            </div>

            <div class="checkbox" :class="{ sel: saturdayDance }">
                <input
                    id="saturday-dance"
                    type="checkbox"
                    v-model="saturdayDance">
                <label for="saturday-dance">Saturday Dance</label>
            </div>

            <div class="checkbox" :class="{ sel: sunday }">
                <input
                    :disabled="isSundaySoldOut"
                    id="sunday"
                    type="checkbox"
                    v-model="sunday">
                <label for="sunday" v-if="!isSundaySoldOut">Solo Jazz Sunday</label>
                <label v-else>
                    <span style="text-decoration: line-through">Solo Jazz Sunday</span> &nbsp;Sold out
                </label>
            </div>

            <div v-if="saturdayWorkshops">
                <div>What dance role would you like to have on Saturday during the workshops?</div>

                <select v-model="role">
                    <option value="null">&ndash; Please select &ndash;</option>
                    <option value="Follow">Follow</option>
                    <option value="Lead">Lead</option>
                    <option value="Any">Any</option>
                </select>
            </div>

            <div>Check any of these enticing boxes?</div> 
            <div class="checkbox" :class="{ sel: human }">
                <input
                    id="human"
                    type="checkbox"
                    v-model="human">
                <label for="human">I like dancing</label>
            </div>
            <div class="checkbox" :class="{ sel: volunteerWeekend }">
                <input
                    id="volunteer-weekend"
                    type="checkbox"
                    v-model="volunteerWeekend">
                <label for="volunteer-weekend">I'm interested in volunteering during the weekend</label>
            </div>
            <div class="checkbox" :class="{ sel: volunteerCoop }">
                <input
                    id="volunteer-coop"
                    type="checkbox"
                    v-model="volunteerCoop">
                <label for="volunteer-coop">I'm interested in volunteering in general with the Swing Dance Cooperative</label>
            </div>

            <div>And your email address?</div>
            <input type="text" v-model="email"/>

            <div>Anything else you'd like to share?</div>
            <textarea rows="4" v-model="comments"></textarea>

            <p>
                The workshops, classes, and dances are by donation. 
                Our costs for the weekend are about $15 per hour per guest.
            </p>

            <div v-if="!submitted" style="text-align: center">
                <button type="submit" :disabled="sending">Finish RSVP</button>
                <span v-if="sending" style="margin-left: 1ex">Sending ...</span>
            </div>

            <div v-else>
                <p>
                Thank you! You should receive an email within an hour to
                confirm that everything went through.</p>
            </div>

            <p v-if="error" v-cloak>
                Sorry, there was an error when we tried to submit your form.
                Please let us know at rsvp@dance.coop?
            </p>
        </form>
    </section>
</page>
</template>

<script>
// import axios from 'axios'
import Page from '../components/Page.vue';
import axios from 'axios';

export default {
    components: { Page },
    data() {
        return {
            name: null,
            role: null,
            email: null,
            comments: null,
            agreed: null,
            submitted: false,
            error: false,
            sending: false,
            rsvpPressed: false,
            human: false,
            saturdayWorkshops: false,
            saturdayDance: false,
            sunday: false,
            volunteerCoop: false,
            volunteerWeekend: false,
            isSundaySoldOut: false
        };
    },
    methods: {
        rsvp: function () {
            this.rsvpPressed = true;
            this.error = false;

            this.sending = true;
            var data = {
                name: this.name,
                event: 'Olympia Winter Swingout',
                role: this.role,
                email: this.email,
                comments: this.comments,
                human: this.human,
                saturdayWorkshops: this.saturdayWorkshops,
                saturdayDance: this.saturdayDance,
                sunday: this.sunday,
                volunteerCoop: this.volunteerCoop,
                volunteerWeekend: this.volunteerWeekend
            };
            axios.post('/api/swingout-reservations', data)
            .then(() => {
                this.submitted = true;
                this.sending = false;
                // console.log(data);
            })
            .catch(err => {
                // eslint-disable-next-line
                console.log(err);
                this.error = true;
                this.sending = false;
            });
        },
    }
}
</script>

<style scoped>
   .checkbox input {
      width: inherit;
      margin-right: 1.5ex;
      vertical-align: text-top;
      margin-top: 3px;
      margin-bottom: 0;
   }
   .checkbox {
      margin-top: 0.5em;
      margin-bottom: 1em;
   }
   .sel {
      background-color: #c22;
   }

   .checkbox {
      border: solid 1px red;
      border-radius: 5px;
      padding: 2ex;
   }
   .checkbox label {
      cursor: pointer;
   }

</style>