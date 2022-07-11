import { computePointScored, computePointScoredOnAdvantage, computePointScoredOnDeuce } from "./computePoint";

export const SCORES = ["0", "15", "30", "40", "Adv"] as const;

type Score = typeof SCORES[number];

export type Player = "playerA" | "playerB";

type GameResult = {
  status: "win";
  player: Player;
};

export type OngoingGame = {
  status: "ongoing" | "deuce" | "advantage";
  game: Record<Player, Score>;
};

export type GameState = OngoingGame | GameResult;

const computeGameResult = (player: Player): GameResult => ({ player, status: "win" });

const addTennisPoint = (player: Player) => (gameState: GameState): GameState => {
  if (gameState.status === "win") {
    return gameState;
  }
  const { game } = gameState;

  if (gameState.status === "deuce") {
    return computePointScoredOnDeuce(gameState, player);
  } else if (gameState.status === "advantage") {
    return computePointScoredOnAdvantage(gameState, player);
  }

  const currentPlayerScoreIndex = SCORES.findIndex(score => score === game[player]);
  if (game[player] === "40") {
    return computeGameResult(player);
  }

  return computePointScored(player, currentPlayerScoreIndex)(gameState);
};

export default addTennisPoint;
