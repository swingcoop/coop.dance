<template>
<page>
    <section class="rsvp">
        <form v-on:submit.prevent="rsvp">
            <h1>R.S.V.P.</h1>

            <p>Course: {{courseTitle}}</p>

            <div v-if="courseFull">
                <p>Thanks for your interest in this class. This course is full.</p>

                <p>If you'd like to be added to the waitlist,
                please <a href="/contact">contact us</a>.</p>
            </div>

            <div v-else>
                <p>
                    Please enter some information to reserve your spot in the class 
                    and help us understand where you're coming from.
                </p>
                <label>
                    <div>Name</div>
                    <input type="text" v-model="name"/>
                </label>

                <!-- <div class="agreement">
                    <div style="margin-bottom: 0.5ex">Please confirm your availability:</div>
                    <input 
                        id="agreed" 
                        type="checkbox"
                        v-model="agreed"/>
                    <label for="agreed">I will be at the first session (April 3) and
                    the second session (April 10).</label>
                </div> -->

                <div>What dance role would you like to have during this class?</div>

                <p>Swing dancing is a conversation, typically between two people. The person who is responsible for moving first is referred to as a lead, whereas the person who moves second is referred to as a follow. Most people who dance long enough learn both roles.</p>
                
                <div>Follow spots remaining: {{followSpots}}</div>
                <div style="margin-bottom: 1em">Lead spots remaining: {{leadSpots}}</div>

                <p v-if="waitlistOpen">
                    If you'd like to be added to the waitlist for this course,
                    please <a href="/contact">contact us</a>.
                </p>

                <select v-model="role">
                    <option value="null">-- Please select --</option>
                    <option v-if="followSpots > 0" value="Follow">Follow</option>
                    <option v-if="leadSpots > 0" value="Lead">Lead</option>
                    <!-- <option value="Any">Any</option> -->
                </select>

                <div>What's your zip code?</div>
                <input type="text" v-model="zip"/>

                <div>And your email address?</div>
                <input type="text" v-model="email"/>

                <div>Anything else you'd like to share?</div>
                <textarea rows="4" v-model="comments"></textarea>

                <div v-if="!submitted" style="text-align: center">
                    <button type="submit" :disabled="sending">RSVP</button>
                    <span v-if="sending" style="margin-left: 1ex">Sending ...</span>
                </div>

                <div v-else>
                    <p>
                    Thank you! You should receive an email within an hour to
                    confirm that everything went through. -- P</p>
                </div>

                <p v-if="error" v-cloak>
                    Sorry, there was an error when we tried to submit your form.
                    Please let us know at rsvp@dance.coop?
                </p>

                <!-- <p v-if="needAgreement" class="need-agreement">
                    <strong>Attention:</strong> To RSVP, please mark that you can attend the first class and the second class, above, and try submitting the form again.
                </p> -->
            </div>
        </form>

    </section>
</page>
</template>

<script>
import axios from 'axios';
import Page from '../components/Page.vue';

export default {
    components: { Page },
    data() {
        return {
            name: null,
            class: null,
            role: null,
            zip: null,
            email: null,
            comments: null,
            submitted: false,
            error: false,
            sending: false,
            rsvpPressed: false,
            courseId: null,
            reservations: null,
            course: null
        }
    },
    computed: {
        courseTitle() {
            return this.course && this.course.Title;
        },
        followSpots() {
            if (!this.reservations)
                return;

            return Math.max(0, 9 - this.reservations.filter(x => x.Role === 'Follow').length);
        },
        leadSpots() {
            if (!this.reservations)
                return;

            return Math.max(0, 9 - this.reservations.filter(x => x.Role === 'Lead').length);
        },
        waitlistOpen() {
            return (this.followSpots === 0 || this.leadSpots === 0);
        },
        courseFull() {
            return (this.followSpots === 0 && this.leadSpots === 0);
        }
    },
    created() {

    },
    mounted() {
        this.courseId = this.$route.query.course;
        var url = '/api/reservations/get';
        if (this.courseId) {
            url += '?course=' + this.courseId;
        }
        axios.get(url).then(res => {
            this.reservations = res.data;
        });

        axios.get('/api/courses/get?id=' + this.courseId).then(res => {
            if (res.data && res.data.length) {
                this.course = res.data.pop();
            }            
        });
    },
    methods: {
        rsvp() {
            this.rsvpPressed = true;
            this.sending = true;
            var data = {
                name: this.name,
                class: this.courseTitle,
                role: this.role,
                zip: this.zip,
                email: this.email,
                comments: this.comments,
                courseId: this.courseId
            };
            axios.post('/api/reservations', data).then(() => {
                this.submitted = true;
                this.sending = false;
            })
            .catch(() => {
                this.error = true;
                this.sending = false;
            });
        }
    }
}
</script>

<style scoped>

</style>