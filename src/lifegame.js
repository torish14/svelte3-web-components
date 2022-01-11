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

// ライフゲームのルール
function isCellAliveWhenNextTick(oldState, row, col) {
  const directions = [
    [-1, -1], [-1, +0], [+1, +1], [+0, -1],/**/ [+0, +1], [+1, -1], [+1, +0], [+1, +1],
  ]

  // 隣接するセルの生きたセルを教える
  let count = 0

  for (const d of directions) {
    const newRow = row + d[0]
    const newCol = col + d[1]
    if (newRow < 0 || oldState.rowSize - 1 < newRow) {
      continue
    }
    if (newCol < 0 || oldState.colSize - 1 < newCol) {
      continue
    }
    if(oldState.grid[newRow][newCol].isAlive) {
      count++
    }
  }

  if(oldState.grid[row][col].isAlive) {
    // 過疎？
    if(count <= 1) {
      return false
    // 生存？
    } else if(count === 2 || count === 3) {
      return true
    // 過密？
    } else if (count >= 4) {
      return false
    } else {
      // 上記までで条件を網羅しているので、ここには来ない
      throw new Error('実装ミス')
    }
  } else {
    // 誕生？
    if(count === 3) {
      return true
    }
    // 何も起こらない
    return false
  }
}

// ライフゲームのターンをひとつ進める
function moveNextTick(oldState) {
  const newState = JSON.parse(JSON.stringify(oldState))
  for (let i = 0; i < newState.rowSize; i++) {
    for (let j = 0; j < newState.colSize; j++) {
      newState.grid[i][j] = {
        ...newState.grid[i][j],
        isAlive: isCellAliveWhenNextTick(oldState, i, j),
      }
    }
  }
  return newState
}
