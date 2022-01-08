<div class="lifegame-container">
  <div class="lifegame-cells-container">
    <div class="lifegame-cells">
      {#each $lifegame.grid as row, i}
        {#each row as col, j}
          <div
            class="cell"
            class:alive={col.isAlive}
            style="grid-row: {i + 1}"
            on:click={(e) => lifegame.toggle(i, j)}
          />
        {/each}
      {/each}
    </div>
  </div>
</div>

<script>
import { createLifeGame } from './lifegame'

const row_size = 20
const column_size = 20

const lifegame = createLifeGame(row_size, column_size)
</script>

<style>
.lifegame-container {
  display: block;
  width: max-content;
}

.lifegame-cells-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lifegame-cells {
  display: grid;
  grid-gap: 1px;
  background-color: #333;
  border: solid 1px #333;
}

.cell {
  width: 20px;
  height: 20px;
  background-color: #eee;
}

.cell.alive {
  background-color: red;
}
</style>
