import addTennisPoint, { GameOngoing, GameResult, GameState, Player } from ".";
import { createAdvantageGameState, createDeuceGameState, createOngoingGameState } from "./createGameState";

const startGame = (): GameOngoing => {
  return createOngoingGameState("playerA", { playerA: "0", playerB: "0" });
};

describe("Classical points scoring", () => {
  it("Score should be 15-0", () => {
    // Given
    let game = startGame();
    const scoringPlayer: Player = "playerA";

    // When
    const currentGameState = game.scorePoint(scoringPlayer);

    // Then
    expect(currentGameState.status).toEqual("ongoing");
    expect((currentGameState as unknown as GameOngoing).score).toEqual({ playerA: "15", playerB: "0" });
  });

  it("Score should be 0-15", () => {
    // Given
    let game = startGame();
    const scoringPlayer: Player = "playerB";

    // When
    const currentGameState = game.scorePoint(scoringPlayer);

    // Then
    expect(currentGameState.status).toEqual("ongoing");
    expect((currentGameState as unknown as GameOngoing).score).toEqual({ playerA: "0", playerB: "15" });
  });

  it("Score should be 30-0", () => {
    // Given
    let game = startGame();
    const scoringPlayer: Player = "playerA";

    // When
    const currentGameState = game.scorePoint(scoringPlayer).scorePoint(scoringPlayer);

    // Then
    expect(currentGameState.status).toEqual("ongoing");
    expect((currentGameState as unknown as GameOngoing).score).toEqual({ playerA: "30", playerB: "0" });
  });

  it("Score should be 40-0", () => {
    // Given
    let game = startGame();
    const scoringPlayer: Player = "playerB";

    // When
    const currentGameState = game.scorePoint(scoringPlayer).scorePoint(scoringPlayer).scorePoint(scoringPlayer);

    // Then
    expect(currentGameState.status).toEqual("ongoing");
    expect((currentGameState as unknown as GameOngoing).score).toEqual({ playerA: "0", playerB: "40" });
  });

  it("Score should be 40-15", () => {
    // Given
    let game = startGame();

    // When
    const currentGameState = game
      .scorePoint("playerA")
      .scorePoint("playerA")
      .scorePoint("playerA")
      .scorePoint("playerB");

    // Then
    expect(currentGameState.status).toEqual("ongoing");
    expect((currentGameState as unknown as GameOngoing).score).toEqual({ playerA: "40", playerB: "15" });
  });

  it("Game should be won by player A", () => {
    // Given
    let game = startGame();

    // When
    const currentGameState = game
      .scorePoint("playerA")
      .scorePoint("playerA")
      .scorePoint("playerA")
      .scorePoint("playerA");

    // Then
    expect(currentGameState.status).toEqual("win");
    expect((currentGameState as unknown as GameResult).player).toEqual("playerA");
  });

  it("Game should be won by player B", () => {
    // Given
    let game = startGame();

    // When
    const currentGameState = game
      .scorePoint("playerB")
      .scorePoint("playerB")
      .scorePoint("playerB")
      .scorePoint("playerB");

    // Then
    expect(currentGameState.status).toEqual("win");
    expect((currentGameState as unknown as GameResult).player).toEqual("playerB");
  });
});

describe("Points scored when Deuce", () => {
  it("Game should be Adv-40", () => {
    // Given
    let game = startGame();

    // When
    const currentGameState = game
      .scorePoint("playerA")
      .scorePoint("playerA")
      .scorePoint("playerA")
      .scorePoint("playerB")
      .scorePoint("playerB")
      .scorePoint("playerB")
      .scorePoint("playerA");

    // Then
    expect(currentGameState.status).toEqual("advantage");
    expect((currentGameState as unknown as GameResult).player).toEqual("playerA");
  });

  it("Game should be 40-Adv", () => {
    // Given
    const initialScore: GameState = { status: "deuce" };
    const scoringPlayer: Player = "playerB";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "advantage", player: scoringPlayer };
    expect(resultScore).toEqual(expectedResultScore);
  });
});

describe("Points scored when Advantage", () => {
  it("Game should be 40-40", () => {
    // Given
    const initialScore: GameState = { status: "advantage", player: "playerA" };
    const scoringPlayer: Player = "playerB";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "deuce" };
    expect(resultScore).toEqual(expectedResultScore);
  });

  it("Game should be 40-40", () => {
    // Given
    const initialScore: GameState = { status: "advantage", player: "playerB" };
    const scoringPlayer: Player = "playerA";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "deuce" };
    expect(resultScore).toEqual(expectedResultScore);
  });

  it("Game should be won by player A", () => {
    // Given
    const initialScore: GameState = { status: "advantage", player: "playerA" };
    const scoringPlayer: Player = "playerA";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "win", player: "playerA" };
    expect(resultScore).toEqual(expectedResultScore);
  });

  it("Game should be won by player B", () => {
    // Given
    const initialScore: GameState = { status: "advantage", player: "playerB" };
    const scoringPlayer: Player = "playerB";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "win", player: "playerB" };
    expect(resultScore).toEqual(expectedResultScore);
  });
});

describe("Tests on scorePoint methods", () => {
  it("Score point on createDeuceGameState", () => {
    // Given
    const gameState = createDeuceGameState();

    // When
    const nextGameState = gameState.scorePoint("playerA");

    // Then
    expect(nextGameState.status).toEqual("advantage");
  });

  it("Score point on createAdvantageGameState -> win", () => {
    // Given
    const gameState = createAdvantageGameState("playerA");

    // When
    const nextGameState = gameState.scorePoint("playerA");

    // Then
    expect(nextGameState.status).toEqual("win");
  });

  it("Score point on createAdvantageGameState -> deuce", () => {
    // Given
    const gameState = createAdvantageGameState("playerA");

    // When
    const nextGameState = gameState.scorePoint("playerB");

    // Then
    expect(nextGameState.status).toEqual("deuce");
  });

  it("Score point on createOngoingGameState -> deuce", () => {
    // Given
    const gameState = createOngoingGameState("playerA", { playerA: "0", playerB: "0" });

    // When
    const nextGameState = gameState.scorePoint("playerA");

    // Then
    expect(nextGameState.status).toEqual("ongoing");
    expect((nextGameState as unknown as GameOngoing).score).toEqual({ playerA: "15", playerB: "0" });
  });
});
