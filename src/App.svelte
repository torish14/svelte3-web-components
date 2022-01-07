<div class="lifegame-container">
  <div class="lifegame-cells-container">
    <div class="lifegame-cells">
      {#each grid as row, i}
        {#each row as col, j}
          <div class="cell" style="grid-row: {i + 1}" />
        {/each}
      {/each}
    </div>
  </div>
</div>

<script>
const row_size = 20
const column_size = 20

const grid = []
for (let i = 0; i < row_size; i++) {
  grid[i] = []
  for (let j = 0; j < column_size; j++) {
    grid[i][j] = { isAlive: false }
  }
}
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
</style>
