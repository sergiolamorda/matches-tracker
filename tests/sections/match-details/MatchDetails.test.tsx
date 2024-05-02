import { screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";

import { renderWithRouter } from "../../renderWithRouter";
import { MatchRepository } from "../../../src/modules/matches/domain/MatchRepository";
import { MatchDetails } from "../../../src/sections/match-details/MatchDetails";
import { MatchContextProvider } from "../../../src/sections/match-details/MatchContext";
import { MatchMother } from "../../modules/matches/domain/MatchMother";
import { getPlayByPlayEvents } from "../../../src/modules/matches/application/get/getPlayByPlayEvents";

const mockMatchRepository = mock<MatchRepository>();

describe("MatchDetails", () => {
  it("get match details", async () => {
    const match = MatchMother.create();

    mockMatchRepository.get.mockResolvedValue(match);

    renderWithRouter(
      <MatchContextProvider repository={mockMatchRepository}>
        <MatchDetails />
      </MatchContextProvider>
      , { route: `/matches/${match.id}` }
    );

    const localTeam = await screen.findByText(match.localTeam.abbrevName);
    const visitorTeam = await screen.findByText(match.visitorTeam.abbrevName);

    const localScore = await screen.findByText(match.localScore.toString());
    const visitorScore = await screen.findByText(match.visitorScore.toString());

    expect(localTeam).toBeInTheDocument();
    expect(visitorTeam).toBeInTheDocument();
    expect(localScore).toBeInTheDocument();
    expect(visitorScore).toBeInTheDocument();
  });

  it("show message when match not found", async () => {
    mockMatchRepository.get.mockResolvedValue(null);

    renderWithRouter(
      <MatchContextProvider repository={mockMatchRepository}>
        <MatchDetails />
      </MatchContextProvider>
      , { route: "/matches/1" }
    );

    const message = await screen.findByText(/No se encontró el partido/i);
    expect(message).toBeInTheDocument();
  });

  it("show match details play by play", async () => {
    const match = MatchMother.create();

    const firstEventTypeRepeatedOnFirstPeriod = getPlayByPlayEvents(match.periods[0].events)
      .filter((event) => event.description === match.periods[0].events[0].description)
      .length;

    const lastEventTypeRepeatedOnLastPeriod = getPlayByPlayEvents(match.periods[3].events)
      .filter((event) => event.description === match.periods[3].events[match.periods[3].events.length - 1].description)
      .length;

    mockMatchRepository.get.mockResolvedValue(match);

    renderWithRouter(
      <MatchContextProvider repository={mockMatchRepository}>
        <MatchDetails />
      </MatchContextProvider>
      , { route: `/matches/${match.id}` }
    );

    const playByPlayTab = await screen.findByText(/Play-By-Play/i);
    await playByPlayTab.click();

    const plays = await screen.findAllByText(new RegExp(match.periods[0].events[0].description, "i"));

    const lastPeriodTab = await screen.findByText(`4P`);
    await lastPeriodTab.click();

    const playsLastTab = await screen.findAllByText(new RegExp(match.periods[3].events[match.periods[3].events.length - 1].description, "i"));

    expect(plays).toHaveLength(firstEventTypeRepeatedOnFirstPeriod);
    expect(playsLastTab).toHaveLength(lastEventTypeRepeatedOnLastPeriod);
  });
});