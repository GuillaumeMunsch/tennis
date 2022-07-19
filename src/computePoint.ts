import { GameState, GameOngoing, Player, SCORES, GameDeuce, GameAdvantage, GameResult } from ".";

export const computePointScoredOnDeuce = (gameState: GameDeuce, player: Player): GameAdvantage => ({
  status: "advantage",
  player,
});

export const computePointScored =
  (player: Player, currentPlayerScoreIndex: number) =>
  (ongoingGameState: GameOngoing): GameState => {
    const playerNextScore = SCORES[currentPlayerScoreIndex + 1];

    const isNextScoreDeuce =
      playerNextScore == "40" &&
      ((player === "playerA" && ongoingGameState.score.playerB === "40") ||
        (player === "playerB" && ongoingGameState.score.playerA === "40"));
    return {
      status: isNextScoreDeuce ? "deuce" : "ongoing",
      score: {
        ...ongoingGameState.score,
        [player]: SCORES[currentPlayerScoreIndex + 1],
      },
    };
  };

export const computePointScoredOnAdvantage = (gameState: GameAdvantage, player: Player): GameDeuce | GameResult => {
  if (player === gameState.player) {
    return {
      status: "win",
      player,
    };
  }
  return {
    status: "deuce",
  };
};
