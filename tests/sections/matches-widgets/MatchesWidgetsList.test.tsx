import { screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";

import { renderWithRouter } from "../../renderWithRouter";
import { MatchWidgetRepository } from "../../../src/modules/matches-widgets/domain/MatchWidgetRepository";
import { MatchesWidgetsContextProvider } from "../../../src/sections/matches-widgets/MatchesWidgetsContext";
import { MatchesWidgetsList } from "../../../src/sections/matches-widgets/MatchesWidgetsList";
import { MatchWidgetMother } from "../../modules/matches-widgets/domain/MatchWidgetMother";

const mockMatchWidgetRepository = mock<MatchWidgetRepository>();

describe("MatchesWidgetsList component", () => {
  it("show all widgets", async () => {
    const matchesWidgets = MatchWidgetMother.createList(2);

    mockMatchWidgetRepository.getAll.mockResolvedValue(matchesWidgets);

    renderWithRouter(
      <MatchesWidgetsContextProvider repository={mockMatchWidgetRepository}>
        <MatchesWidgetsList />
      </MatchesWidgetsContextProvider>
      , { route: "/" }
    );

    const card = await screen.findByText(matchesWidgets[0].id);
    expect(card).toBeInTheDocument();
  })
});