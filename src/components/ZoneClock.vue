<template>
  <div class="col-4" v-on:click="refreshCache">
    <h5>{{ timeZone }}</h5>
    <p>{{ timeStringWithFallback }}</p>
  </div>
</template>

<script>
export default {
  name: 'ZoneClock',
  props: ['timeZone'],
  data() {
    return {
      timeString: null,
    };
  },
  computed: {
    // eslint-disable-next-line
    timeStringWithFallback: function() {
      if (this.timeString === null) {
        return '---';
      }

      return this.timeString;
    },

    // eslint-disable-next-line
    timeStringUrl: function() {
      return `/api/timezone/${encodeURIComponent(this.timeZone)}`;
    },
  },
  mounted() {
    this.fetchTimeString();
  },

  methods: {
    refreshCache() {
      // Create a Message Channel
      const messageChannel = new MessageChannel();

      // Handler for recieving message reply from service worker
      messageChannel.port1.onmessage = () => {
        this.fetchTimeString();
      };

      // eslint-disable-next-line no-console
      console.log(`Telling Service Worker to clear cache for: ${this.timeStringUrl} `);
      navigator.serviceWorker.controller.postMessage(
        { url: this.timeStringUrl },
        [messageChannel.port2],
      );
    },

    fetchTimeString() {
      fetch(this.timeStringUrl)
        .then((res) => {
          if (!res.ok) {
            throw Error('Request failed');
          }

          return res.text();
        }).then((timeResponse) => {
          this.timeString = timeResponse;
        }).catch(() => {
          // eslint-disable-next-line no-console
          console.log(`Request for timezone ${this.timeZone} failed.`);
        });
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.col, [class^="col-"] {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
  cursor: pointer;
}
</style>
