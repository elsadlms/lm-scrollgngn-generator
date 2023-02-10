<script lang="ts">
  export let width: number = 12;
  export let height: number = 8;
  export let fill: string = "#334155";
  export let direction: string = "up";

  const arrowUp = 'M10.0746 7.00273L11.3333 5.7298L5.99992 0.33606L0.666585 5.7298L1.92525 7.00273L5.99992 2.86033L10.0746 7.00273Z'
  const arrowDown = 'M10.0746 0.336019L11.3333 1.60894L5.99992 7.00269L0.666585 1.60894L1.92525 0.336019L5.99992 4.47841L10.0746 0.336019Z'
</script>

<svg {width} {height} viewBox="0 0 12 8" fill="none">
  <path
    {fill}
    fill-rule="evenodd"
    clip-rule="evenodd"
    d={direction === 'up' ? arrowUp : arrowDown}
  />
</svg>
