<template>
  <div class="home">
      <div class="swing">
         <div class="column">
            <section class="section1 title-section rsvp">
               <div class="rings">
                  <img src="../assets/rings.png" class="for-phone"/>
               </div>
               <h1 class="title">The Swing Dance<span class="for-phone"> Cooperative</span></h1>

               <p>Hi. We're here to share swing dancing and host fancy dances and stuff. We're also here to be a part of the <a href="https://www.ica.coop/en/whats-co-op/co-operative-identity-values-principles">cooperative movement</a>.</p>

               <div class="proto-nav-panel">
                  <!-- <a class="button-link" href="/events">Events</a> -->
                  <a class="button-link" href="/mission">Mission</a>
                  <a class="button-link" href="/contact">Contact us</a>
               </div>
            </section>

            <section class="post-title-section">
               <h2>Next Dance: February 22</h2>
               <div class="fun-times">
                  <img src="../assets/swing-dance-banner.jpg" />
               </div>
               <p>
                  You are invited to an evening of swing dancing to the sounds 
                  of the 1920s, 30s and 40s. We're starting our second year of
                  sharing dance classes, hosting fancy dances, and joining the
                  cooperative movement.
               </p>
               <p>
                  The occasion will begin at the historic Olympia Ballroom with 
                  a one-hour intro lesson at 7:30 p.m., followed by music and dancing 
                  from guest DJs.
               </p>

               <div>
                  <h3 style="text-align: left">Schedule</h3>
                  <ul>
                     <li>Saturday, February 22</li>
                     <li>7 p.m. Doors</li>
                     <li>7:30 p.m. Introductory lesson</li>
                     <li>8:30 - 10:30 p.m. Music and dancing</li>
                  </ul>
               </div>

               <div>
                  <h3 style="text-align: left">Location</h3>
                  <ul>
                     <li>Olympia Ballroom</li>
                     <li>116 Legion Way SE, Olympia</li>
                     <li>at Legion &amp; Washington</li>
                  </ul>
               </div>

               <p>By donation. $5-10 suggested.</p>
            </section>

            <section v-if="hasCourses" class="post-title-section">
               <h2>Swing Dance Lessons</h2>
               <noscript>
                  <h4>Regarding JavaScript</h4>
                  <p>Thanks for browsing the web without JavaScript. Our site
                     uses JavaScript on this page, along with 3rd-party libraries
                     hosted on cdn.jsdelivr.net and unpkg.com, to display our
                     schedule.</p>

                  <p>When we have a super cool site, this will no longer be
                     the case, but for now that's where we're at. Please let
                     us know if you have any questions about our tech.</p>

                  <p>&ndash;Philip</p>
               </noscript>

               <p v-if="isGettingCourses">One moment, please ...</p>
               <div v-if="coursesError">
                  <p>We're sorry, there was an error loading our upcoming classes.</p>
                  <p>Please reload the page? Or let us know if this keeps happening.</p>
               </div>

               <div class="course" v-for="course in courses" :key="course.Title" v-cloak>
                  <h4>{{course['Title']}}</h4>

                  <p style="white-space: pre-wrap;">{{course['Description']}}</p>

                  <div v-if="takesReservations(course)">
                     <p>To attend, please make a reservation:</p>
                     <div class="proto-nav-panel">
                        <a class="button-link" :href="rsvpUrl(course)">R.S.V.P.</a>
                     </div>
                  </div>

                  <div>With: {{course['Instructors']}}</div>
                  <div>Dance format: {{course['Dance Format']}}</div>
                  <!-- <div>How to attend: {{course['How to Register']}}</div> -->

                  <div class="schedule" style="margin-top: 1.1em">
                     <div>{{course['Dates Description']}}</div>
                     <div>{{course['Time Description']}}</div>      
                  </div>

                  <div class="venue" style="margin-top: 1.1em">
                     <div>{{course['Venue']['Name']}}</div>
                     <div>{{course['Venue']['Street Address']}}</div>
                     <div>{{course['Venue']['City']}}, 
                           {{course['Venue']['State']}}
                           {{course['Venue']['Zip']}}</div>
                  </div>

                  <p>Hosted by {{course['Organization']}}</p>
               </div>
            </section>

            <section>
               <h2>Saturday Swing Dances</h2>
               <p>Once a month, we host swing dances at the Olympia Ballroom downtown.</p>

               <p>Each dance begins with an introductory lesson. Individuals and partners welcome. All our events are open to the public, and we are an all ages venue.</p>

               <p>Dates for 2020 include:</p>
               <ul>
                  <li>February 22-23</li>
                  <li>March 28</li>
                  <li>April 25</li>
                  <li>May 16</li>
                  <li>June 20-21</li>
                  <li>July 25</li>
                  <li>August 22</li>
                  <li>September 26</li>
                  <li>October 24-25</li>
                  <li>November 14</li>
                  <li>December 19</li>
               </ul>
            </section>

            <!-- <section class="rsvp">
               <form v-on:submit.prevent="rsvp">
                  <h2>R.S.V.P.</h2>
                  <label>Your name</label>
                  <input type="text" v-model="name"/>
                  <label>Email address</label>
                  <input type="text" v-model="email"/>
                  <label>Which course are you taking?</label>
                  <input type="text" v-model="course" placeholder="Mondays, Wednesdays, or both"/>
                  
                  <label>Can you make it to each class?</label>
                  <p>
                     We require that people attend the first two classes 
                     &ndash; we charge a fee if y'all skip, as it makes
                     everything harder.
                  </p>
                  <input type="text" v-model="attendance" placeholder="Yes or please explain"/>

                  <label>Dance role</label>
                  <p>
                     Swing dancing is a conversation of motion between two people. 
                     The person who moves first is said to be the "lead," and the
                     "follow" moves however they'd like in reply.
                  </p>
                  <p> 
                     Please pick one role for your class experience this time, so we can
                     try to keep the classes balanced. We encourage people to learn both 
                     roles. 
                  </p>
                  <p>
                     If you don't care which role you are, please enter "either," and
                     we'll assign you a role during the first class.
                  </p>
                  <input type="text" v-model="role" placeholder="Follow, lead, or either"/>
                  <label>Additional comments or questions</label>
                  <textarea v-model="comments"></textarea>

                  <div v-if="!submitted" style="text-align: center">
                        <button type="submit" :disabled="sending">RSVP</button>
                        <span v-if="sending" style="margin-left: 1ex">Sending ...</span>
                     </div>

                     <div v-else>
                        <p>
                           Thank you! You should receive an email within an hour to
                           confirm that everything went through. &mdash; P</p>
                     </div>

                     <p v-if="error" v-cloak>
                        Sorry, there was an error when we tried to submit your form.
                        Please let us know at rsvp@dance.coop?
                     </p>
                  </div>
               </form>
            </section> -->

            <section class="contact">
               <h2>Keep in touch</h2>

               <div>
                  <div style="margin-top: 2em">With Meetup, you will be emailed when we share new events. It's also a decent way to reach us. On Instagram we're <a href="https://www.instagram.com/swingcoop/">@swingcoop</a>.</div>

                  <div class="proto-nav-panel">
                     <a class="button-link" href="https://www.meetup.com/Swing-Dance-Cooperative/">Meetup</a>
                     <a class="button-link" href="https://www.instagram.com/swingcoop/">Instagram</a>
                  </div>
               </div>
            </section>

            <section class="teachers">
               <h2>Swing Dance Cooperative Staff</h2>
               <h4>Gabrielle</h4>

               <div class="bio">
                  <div class="content">
                     <p>Dancing has been part of her life for as long as she can remember. From little pink slippers to her suede soled heels, expressing herself through dance is one of her greatest passions. Her dance philosophy is that as long as you're smiling, you're doing something right.</p>

                     <div class="photo">
                        <img src="../assets/gabrielle-bio.jpg"/>
                     </div>

                     <p>With over 15 years of experience, Gabrielle has been teaching in Washington and learning all over the States. Despite knowing many styles of dance, Lindy hop is her first love. The pure energy of Lindy is hard to match!</p>

                     <p>She lives for creating solid connections on the dance floor. Her favorite move is a well-executed outside turn, simple but so good!</p>
                  </div>
                  <div class="photo-lg">
                     <img src="../assets/gabrielle-bio.jpg"/>
                  </div>
               </div>

               <h4>Zoe</h4>
               <div class="bio">
                  <div class="content">
                     <p>
                        Lindy hop isn't her first dance, but it is her first love.
                        Zoe learned to swing dance in Corvallis, Oregon, where the vivacious 
                        community introduced her to the people, music, fashion, and movement of swing. 
                     </p>
                     <div class="photo">
                        <img src="../assets/zoe-bio.jpg"/>
                     </div>
                     <p>
                        Having taught dance for a few years, she is excited to build and share 
                        community in Olympia and around Puget Sound.
                     </p>
                     <p>
                        Zoe enjoys connecting with her partner and the music while prancing about the floor.
                        Her favorite move is wobbly legs. 
                     </p>
                  </div>
                  <div class="photo-lg">
                     <img src="../assets/zoe-bio.jpg"/>
                  </div>
               </div>

               <h4>Philip</h4>
               <div class="bio">
                  <div class="content">
                     <p>
                        He took his first dance class to confront his greatest 
                        social fear, dancing in a public space. Philip is a co-founder 
                        of the Corvallis Swing Dance Society, where, among other things,
                        he developed their class
                        curriculum. He has taught for over 10 years, helping thousands 
                        of people discover swing dance in that time.
                     </p>

                     <div class="photo">
                        <img src="../assets/philip-bio.jpg"/>
                     </div>

                     <p>
                        Philip loves old jazz, and the people who created it. He enjoys creating spaces where people feel comfortable expressing themselves, and his favorite move is hopping around.
                     </p>
                  </div>
                  <div class="photo-lg">
                     <img src="../assets/philip-bio.jpg"/>
                  </div>
               </div>
            </section>

            <section class="recommendations">
               <h2>Recommendations</h2>

               <p>If you're wondering if these classes are for you, they probably are. I mean, you're
                  reading about swing dancing on the internet. Let us know if you have any questions.</p>

               <p>Here's an example of Lindy hop from Denver in 2013:</p>

               <iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/FRIlMpVOH7k?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </section>
         </div>
      </div>

      <section class="cooperative">
         <div class="column">
            <h1 class="for-desktop">Cooperative</h1>
            <h1 class="for-phone">About the co-op</h1>
            <p>We're a cooperative, and we identify with the 
               <a href="https://www.ica.coop/en/whats-co-op/co-operative-identity-values-principles">cooperative movement</a> and its values.</p>

            <div class="proto-nav-panel">
               <!-- <a class="button-link" href="/events">Events</a> -->
               <a class="button-link" href="/mission">Mission</a>
               <a class="button-link" href="/contact">Contact us</a>
            </div>

            <div class="close">
               <div class="name">The Swing Dance Cooperative</div>
               <div>Olympia, Washington.</div> 

               <img src="../assets/rings.png" class="rings"/>
            </div>
         </div>
      </section>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';

export default {
  name: 'home',
  data() { 
    return {
      courses: null,
      name: null,
      course: null,
      role: null,
      zip: null,
      email: null,
      attendance: '',
      comments: null,
      agreed: null,
      submitted: false,
      error: false,
      sending: false,
      rsvpPressed: false,
      hour: new Date().getHours(),
      starterKitReservations: null,
      eventType: null,
      isGettingCourses: false,
      coursesError: null
    };
   },
   computed: {
      greeting() {
         if (this.hour < 3)
            return "evening"
         if (this.hour < 6) 
            return "... morning?"
         if (this.hour < 12)
            return "morning"
         if (this.hour < 17)
            return "afternoon"
         return "evening"
      },
      needAgreement() {
         return this.rsvpPressed && !this.agreed;
      },
      reservations() {
         if (!this.starterKitReservations)
            return [];

         return this.starterKitReservations.map(x => {
            let role = x.Role ? x.Role.replace(" - Waitlist","") : 'Lead';
            return {
               role: role,
               'class': this.classes[role],
               waitlist: x.Role ? x.Role.includes("Waitlist") : false
            }
         });
      },
      followValue() {
         return "Follow" + (this.isNewFollowWaitlisted ? ' - Waitlist' : '');
      },
      leadValue() {
         return "Lead" + (this.isNewLeadWaitlisted ? ' - Waitlist' : '');
      },
      anyValue() {
         return "Any" + (this.isClassFull ? ' - Waitlist' : '');
      },
      follows() {
         return this.reservationsByRole('Follow').length;
      },
      leads() {
         return this.reservationsByRole('Lead').length;
      },
      anys() {
         return this.reservationsByRole('Any').length;
      },
      isClassFull() {
         return this.follows + this.leads + this.anys >= 20;
      },
      isNewFollowWaitlisted() {
         return ((this.follows >= 5) && this.leads + this.anys < this.follows) 
            || this.isClassFull
            || this.reservations.filter(x => x.role === 'Follow' && x.waitlist).length > 0;
      },
      isNewLeadWaitlisted() {
         return ((this.leads >= 5) && this.follows + this.anys < this.leads) 
            || this.isClassFull
            || this.reservations.filter(x => x.role === 'Lead' && x.waitlist).length > 0;
      },
      classes() {
         var val = {};
         if (!this.starterKitReservations)
            return val;

         return {
            'Follow': 'role1',
            'Lead': 'role2'
         };
      },
      hasCourses() {
         return this.courses && this.courses.length;
      }
   },
   methods: {
      takesReservations(course) {
         let howTo = course["How to Register"];
         return howTo && howTo.filter(x => x === "rsvp").length > 0;
      },
      rsvpUrl(course) {
         let courseId = course["Course ID"];
         return courseId ? `/rsvp?course=${courseId}` : '/rsvp';
      },
      rsvp: function () {
         this.rsvpPressed = true;
         // if (this.needAgreement) {
         //    return;
         // }
         this.sending = true;
         var data = {
            name: this.name,
            course: this.course,
            role: this.role,
            attendance: this.attendance,
            email: this.email,
            comments: this.comments,
         };
         axios.post('/api/reservations', data)
         .then(() => {
            this.submitted = true;
            this.sending = false;
            // console.log(data);
         })
         .catch(() => {
            this.error = true;
            this.sending = false;
         });
      },
      shuffle(ok) {
         let a = ok.slice();
         for (let i = a.length - 1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
           [a[i], a[j]] = [a[j], a[i]];
         }
         return a;
      },
      reservationsByRole(role) {
         return this.reservations.filter(x => x.role === role && !x.waitlist);
      }
   },
   created() {
      this.isGettingCourses = true;
      axios.get("/api/courses/get")
      .then(res => {
         this.courses = res.data && res.data.sort((a, b) => {
            if (a['Sort Order'] < b['Sort Order'])
               return -1;
            if (a['Sort Order'] > b['Sort Order'])
               return 1;
            return 0;
         });
         this.isGettingCourses = false;
      })
      .catch(err => {
         this.coursesError = err;
         this.isGettingCourses = false;
      });
   }
}
</script>

<style scoped>
.tito-ticket-description {
  display: none;
}
#tito-ticket-a-mdnefq-mw,
#tito-ticket-wvqw9lmywwg {
  height: 100px;
}
.tito-checkbox {
  display: block;
  padding-left: 2ex;
  font-size: 3em;
  margin-top: 0.35ex;
}

.rsvp .agreement input {
  width: inherit;
  margin-right: 1.5ex;
}
.agreement {
  margin-top: 0.5em;
  margin-bottom: 1em;
}
.role1 {
  color: #c22;
}
.role2 {
  color: red;
}
.waitlist {
  color: #ddd;
}
.button-link {
  display: inline-block;
  border: solid 1px #c22;
  /* border-radius: 6px; */
  padding: 3ex;
  padding-bottom: 1ex;
  min-width: 70px;
  text-align: center;
  text-decoration: none;
  margin-bottom: 1em;
  border-top: 0; 
  border-left: 0;
  border-right: 0; 
  /* border-bottom: 0; */
}

a.button-link {
  color: #c22;
}
.rsvp a.button-link {
  color: #ffc3bb;
}
.proto-nav-panel {
  margin-top: 1.5em;
  margin-bottom: 1em;
  text-align: center; 
}
.proto-nav-panel .button-link { 
  margin-left: 1ex;
  margin-right: 1ex;
}

.month {
  text-align: center;
}

.events {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
.event {
  position: relative; 
  border: dotted 1px #c22;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
}
.feature .event {
  display: block;
  padding: 2ex;
}
.event.oly-dance {
  border: solid 1px pink;
}
.event .title {
  padding: 1ex;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  text-align: center;
  margin-top: 1.1em;
  margin-bottom: 1.1em;
}
.event .title div {
  margin-bottom: 0.4ex;
}
.event .details {
  position: absolute;
  bottom: 1ex;
  right: 1.2ex;
  font-size: smaller;
}
.message-title {
font-weight: bold;
font-size: larger;
margin-bottom: 0.8em;
}

.event input[type="radio"] {
  display: none;
}
.sel {
  background-color: #c22;
}

.descriptions {
  border: dotted white 8px;
  padding: 2ex;
  margin-bottom: 1.3em;
}
.descriptions h4 {
  margin-top: 0;
}
</style>