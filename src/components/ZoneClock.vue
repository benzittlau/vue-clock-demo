<template>
  <div class="col-4">
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
  },
  mounted() {
    this.fetchTimeString();
  },

  methods: {
    fetchTimeString() {
      const url = `/api/timezone/${encodeURIComponent(this.timeZone)}`;

      fetch(url)
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

      setTimeout(this.fetchTimeString.bind(this), 5000);
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
}
</style>
