import { computePointScored, computePointScoredOnAdvantage, computePointScoredOnDeuce } from "./computePoint";

export const SCORES = ["0", "15", "30", "40", "Adv"] as const;

export type Score = typeof SCORES[number];

export type Player = "playerA" | "playerB";

interface GameStateInterface {
  scorePoint: (player: Player) => GameState;
}

export type GameResult = GameStateInterface & {
  status: "win";
  player: Player;
};

export type GameOngoing = GameStateInterface & {
  status: "ongoing";
  score: Record<Player, Score>;
};

export type GameDeuce = GameStateInterface & {
  status: "deuce";
};

export type GameAdvantage = GameStateInterface & {
  status: "advantage";
  player: Player;
};

export type GameState = GameOngoing | GameDeuce | GameAdvantage | GameResult;

const computeGameResult = (player: Player): GameResult => ({ player, status: "win" });

const addPointByStatusMethod = {
  deuce: computePointScoredOnDeuce,
  advantage: computePointScoredOnAdvantage,
};

const addTennisPoint =
  (player: Player) =>
  (gameState: GameState): GameState => {
    addPointByStatusMethod(gameState.status)(gameState, player);

    if (gameState.status === "win") {
      return gameState;
    }

    if (gameState.status === "deuce") {
      return computePointScoredOnDeuce(gameState, player);
    } else if (gameState.status === "advantage") {
      return computePointScoredOnAdvantage(gameState, player);
    }

    const { score } = gameState;
    const currentPlayerScoreIndex = SCORES.findIndex((score) => score === score[player]);
    if (score[player] === "40") {
      return computeGameResult(player);
    }

    return computePointScored(player, currentPlayerScoreIndex)(gameState);
  };

export default addTennisPoint;
