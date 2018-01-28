<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <zone-clock time-zone="America/Edmonton"></zone-clock>
        <zone-clock time-zone="Asia/Tokyo"></zone-clock>
        <zone-clock time-zone="America/Los_Angeles"></zone-clock>
        <zone-clock time-zone="Asia/Kolkata"></zone-clock>
      </div>
    </div>
  </div>
</template>

<script>
import ZoneClock from './ZoneClock';

export default {
  name: 'ClockWall',
  data() {
    return {
      timezones: [
        'America/Edmonton',
        'Asia/Tokyo',
        'America/Los_Angeles',
        'Asia/Kolkata',
      ],
    };
  },
  components: {
    'zone-clock': ZoneClock,
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
