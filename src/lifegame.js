import { writable } from 'svelte/store'

export function createLifeGame(rowSize, colSize) {
  const { subscribe, update } = writable(
    defaultState(rowSize, colSize),
  )

  return {
    subscribe,
    toggle: (row, col) => update((state) => toggle(state, row, col)),
  }
}

// グリットの初期値
function defaultGrid(rowSize, colSize) {
  const grid = []
  for (let i = 0; i < rowSize; i++) {
    grid[i] = []
    for (let j = 0; j < colSize; j++) {
      grid[i][j] = { isAlive: false }
    }
  }
  return grid
}

// ライフゲームの初期値
function defaultState(rowSize, colSize) {
  return {
    grid: defaultGrid(rowSize, colSize),
    rowSize,
    colSize,
  }
}

// グリットのクリックされたセルの生死を反転する
function toggle(oldState, row, col) {
  const newState = JSON.parse(JSON.stringify(oldState))
  newState.grid[row][col] = {
    ...newState.grid[row][col],
    isAlive: !newState.grid[row][col].isAlive,
  }
	return newState
}
