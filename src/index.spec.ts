import addTennisPoint, { GameState, Player } from ".";

describe("Classical points scoring", () => {
  it("Score should be 15-0", () => {
    // Given
    const initialScore: GameState = { status: "ongoing", game: { playerA: "0", playerB: "0" } };
    const scoringPlayer: Player = "playerA";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "ongoing", game: { playerA: "15", playerB: "0" } };
    expect(resultScore).toEqual(expectedResultScore);
  });

  it("Score should be 0-15", () => {
    // Given
    const initialScore: GameState = { status: "ongoing", game: { playerA: "0", playerB: "0" } };
    const scoringPlayer: Player = "playerB";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "ongoing", game: { playerA: "0", playerB: "15" } };
    expect(resultScore).toEqual(expectedResultScore);
  });

  it("Score should be 30-0", () => {
    // Given
    const initialScore: GameState = { status: "ongoing", game: { playerA: "15", playerB: "0" } };
    const scoringPlayer: Player = "playerA";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "ongoing", game: { playerA: "30", playerB: "0" } };
    expect(resultScore).toEqual(expectedResultScore);
  });

  it("Score should be 40-0", () => {
    // Given
    const initialScore: GameState = { status: "ongoing", game: { playerA: "30", playerB: "0" } };
    const scoringPlayer: Player = "playerA";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "ongoing", game: { playerA: "40", playerB: "0" } };
    expect(resultScore).toEqual(expectedResultScore);
  });

  it("Score should be 40-15", () => {
    // Given
    const initialScore: GameState = { status: "ongoing", game: { playerA: "40", playerB: "0" } };
    const scoringPlayer: Player = "playerB";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "ongoing", game: { playerA: "40", playerB: "15" } };
    expect(resultScore).toEqual(expectedResultScore);
  });

  it("Game should be won by player A", () => {
    // Given
    const initialScore: GameState = { status: "ongoing", game: { playerA: "40", playerB: "0" } };
    const scoringPlayer: Player = "playerA";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "win", player: "playerA" };
    expect(resultScore).toEqual(expectedResultScore);
  });

  it("Game should be won by player B", () => {
    // Given
    const initialScore: GameState = { status: "ongoing", game: { playerA: "30", playerB: "40" } };
    const scoringPlayer: Player = "playerB";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "win", player: "playerB" };
    expect(resultScore).toEqual(expectedResultScore);
  });
});

describe("Points scored when Deuce", () => {
  it("Game should be Adv-40", () => {
    // Given
    const initialScore: GameState = { status: "deuce", game: { playerA: "40", playerB: "40" } };
    const scoringPlayer: Player = "playerA";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "advantage", game: { playerA: "Adv", playerB: "40" } };
    expect(resultScore).toEqual(expectedResultScore);
  });

  it("Game should be 40-Adv", () => {
    // Given
    const initialScore: GameState = { status: "deuce", game: { playerA: "40", playerB: "40" } };
    const scoringPlayer: Player = "playerB";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "advantage", game: { playerA: "40", playerB: "Adv" } };
    expect(resultScore).toEqual(expectedResultScore);
  });
});

describe("Points scored when Advantage", () => {
  it("Game should be 40-40", () => {
    // Given
    const initialScore: GameState = { status: "advantage", game: { playerA: "Adv", playerB: "40" } };
    const scoringPlayer: Player = "playerB";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "deuce", game: { playerA: "40", playerB: "40" } };
    expect(resultScore).toEqual(expectedResultScore);
  });

  it("Game should be 40-40", () => {
    // Given
    const initialScore: GameState = { status: "advantage", game: { playerA: "40", playerB: "Adv" } };
    const scoringPlayer: Player = "playerA";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "deuce", game: { playerA: "40", playerB: "40" } };
    expect(resultScore).toEqual(expectedResultScore);
  });

  it("Game should be won by player A", () => {
    // Given
    const initialScore: GameState = { status: "advantage", game: { playerA: "Adv", playerB: "40" } };
    const scoringPlayer: Player = "playerA";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "win", player: "playerA" };
    expect(resultScore).toEqual(expectedResultScore);
  });

  it("Game should be won by player B", () => {
    // Given
    const initialScore: GameState = { status: "advantage", game: { playerA: "40", playerB: "Adv" } };
    const scoringPlayer: Player = "playerB";

    // When
    const resultScore: GameState = addTennisPoint(scoringPlayer)(initialScore);

    // Then
    const expectedResultScore: GameState = { status: "win", player: "playerB" };
    expect(resultScore).toEqual(expectedResultScore);
  });
});
