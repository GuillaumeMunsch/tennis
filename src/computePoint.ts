import { GameState, OngoingGame, Player, SCORES } from ".";

export const computePointScoredOnDeuce = (gameState: OngoingGame, player: Player): OngoingGame => ({
  status: "advantage",
  game: {
    ...gameState.game,
    [player]: "Adv"
  }
});

export const computePointScored = (player: Player, currentPlayerScoreIndex: number) => (
  ongoingGameState: OngoingGame
): GameState => {
  const playerNextScore = SCORES[currentPlayerScoreIndex + 1];

  const isNextScoreDeuce =
    playerNextScore == "40" &&
    ((player === "playerA" && ongoingGameState.game.playerB === "40") ||
      (player === "playerB" && ongoingGameState.game.playerA === "40"));
  return {
    status: isNextScoreDeuce ? "deuce" : "ongoing",
    game: {
      ...ongoingGameState.game,
      [player]: SCORES[currentPlayerScoreIndex + 1]
    }
  };
};

export const computePointScoredOnAdvantage = (gameState: OngoingGame, player: Player): GameState => {
  const { game } = gameState;
  if (game[player] === "Adv") {
    return {
      status: "win",
      player
    };
  }
  return {
    status: "deuce",
    game: {
      playerA: "40",
      playerB: "40"
    }
  };
};
