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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.col, [class^="col-"] {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
}
</style>
