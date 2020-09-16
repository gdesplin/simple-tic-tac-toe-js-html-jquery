$(document).ready(function() {
  console.log("im awake")

  self = this
  self.gameBoardState = []
  self.turn = "x"
  self.gameOver = false
  resetGame(self)
  updateTurnDisplay(self)
  console.log(self.gameBoardState) 
  $("[data-square]").click(function() {
    if (self.gameOver || $(this).html() !== '-') {
      return
    }
    console.log($(this).attr("data-square"))
    markSqaure(self, $(this))
    checkForWinner(self)
    checkForTie(self)
    changeTurn(self)
  })
  $(document).on("click", "[data-resetgame]", function() {
    resetGame(self)
  })
});

var resetGame = function(self) {
  self.gameBoardState = [
    { name: "1a", state: null },
    { name: "2a", state: null },
    { name: "3a", state: null },
    { name: "1b", state: null },
    { name: "2b", state: null },
    { name: "3b", state: null },
    { name: "1c", state: null },
    { name: "2c", state: null },
    { name: "3c", state: null }
  ]
  self.gameOver = false
  $("[data-winner]").html("");
  $("[data-square]").each(function() {
    $(this).html("-")
  })
}

var changeTurn = function(self) {
  if (self.turn === 'x') {
    self.turn = 'o'
  } else {
    self.turn = 'x'
  }
  updateTurnDisplay(self)
}

var markSqaure = function(self, element) {
  element.html(self.turn);
  let boardSquare = self.gameBoardState.find(member => member.name === element.attr("data-square"));
  boardSquare.state = self.turn
}

var updateTurnDisplay = function(self) {
  $("[data-turn]").html(self.turn)
}

var checkForWinner = function(self) {
  self.gameBoardState.forEach((element, index, _array) => {
    if (index === 0 || index === 3 || index === 6) {
      if (checkRow(self, index)) {
        declareWinner(self)
      }
    } 
    if (index === 0 || index === 1 || index === 2) {
      if (checkColumn(self, index)) {
        declareWinner(self)
      }
    }
    if (index === 0) {
      if (checkDiagonalRight(self, index)) {
        declareWinner(self)
      }
    } 
    if (index === 2) {
      if (checkDiagonalLeft(self, index)) {
        declareWinner(self)
      }
    }
  })
}
var checkRow = function(self, index) {
  if (!self.gameBoardState[index].state && !self.gameBoardState[index + 1].state && !self.gameBoardState[index + 2].state) {
    return false
  }
  if (self.gameBoardState[index].state === self.gameBoardState[index + 1].state && self.gameBoardState[index].state === self.gameBoardState[index + 2].state) {
    return true
  } else {
    return false
  }
}
var checkColumn = function(self, index) {
  if (!self.gameBoardState[index].state && !self.gameBoardState[index + 3].state && !self.gameBoardState[index + 6].state) {
    return false
  }
  if (self.gameBoardState[index].state === self.gameBoardState[index + 3].state && self.gameBoardState[index].state === self.gameBoardState[index + 6].state) {
    return true
  } else {
    return false
  }
}

var checkDiagonalRight = function(self) {
  if (!self.gameBoardState[0].state && !self.gameBoardState[4].state && !self.gameBoardState[8].state) {
    return false
  }
  if (self.gameBoardState[0].state === self.gameBoardState[4].state && self.gameBoardState[0].state === self.gameBoardState[8].state) {
    return true
  } else {
    return false
  }
}

var checkDiagonalLeft = function(self) {
  if (!self.gameBoardState[2].state && !self.gameBoardState[4].state && !self.gameBoardState[6].state) {
    return false
  }
  if (self.gameBoardState[2].state === self.gameBoardState[4].state && self.gameBoardState[2].state === self.gameBoardState[6].state) {
    return true
  } else {
    return false
  }
}
var declareWinner = function(self) {
  $("[data-winner]").html(
    `
      Player ${self.turn} has won! Please <button data-resetgame="true">reset game</button>.
    `
  )
  self.gameOver = true
}
var checkForTie = function(self) {
  if (!self.gameBoardState.find(member => member.state === null)) {
    $("[data-winner]").html(
      `
        It's a tie! Please <button data-resetgame="true">reset game</button>.
      `
    )
    self.gameOver = true
  }
}
