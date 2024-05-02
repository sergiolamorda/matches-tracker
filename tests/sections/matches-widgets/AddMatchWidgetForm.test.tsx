import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mock } from "jest-mock-extended";

import { renderWithRouter } from "../../renderWithRouter";
import { MatchWidgetRepository } from "../../../src/modules/matches-widgets/domain/MatchWidgetRepository";
import { AddMatchWidgetForm } from "../../../src/sections/matches-widgets/AddMatchWidgetForm";
import { MatchesWidgetsContextProvider } from "../../../src/sections/matches-widgets/MatchesWidgetsContext";
import { MatchContextProvider } from "../../../src/sections/match-details/MatchContext";
import { MatchWidgetMother } from "../../modules/matches-widgets/domain/MatchWidgetMother";
import { MatchMother } from "../../modules/matches/domain/MatchMother";
import { MatchRepository } from "../../../src/modules/matches/domain/MatchRepository";

const mockMatchWidgetRepository = mock<MatchWidgetRepository>();
const mockMatchRepository = mock<MatchRepository>();

describe("AddMatchWidgetForm", () => {
  it("show widget form when add button is clicked", async () => {
    renderWithRouter(
      <MatchesWidgetsContextProvider repository={mockMatchWidgetRepository}>
        <AddMatchWidgetForm />
      </MatchesWidgetsContextProvider>
    );

    const showFormButton = await screen.findByRole("button", { name: /Añadir/i });
    await userEvent.click(showFormButton);

    const input = await screen.findByLabelText(/ID/i);

    expect(input).toBeInTheDocument();
  })

  it("save new widget when form is submitted", async () => {
    mockMatchWidgetRepository.getAll.mockResolvedValue([]);

    const match = MatchMother.create();
    const newMatchWidget = MatchWidgetMother.create({ 
      id: match.id,
      localLogo: match.localTeam.logo,
      localName: match.localTeam.shortName,
      visitorLogo: match.visitorTeam.logo,
      visitorName: match.visitorTeam.shortName,
    });

    mockMatchRepository.get.mockResolvedValue(match);

    renderWithRouter(
      <MatchesWidgetsContextProvider repository={mockMatchWidgetRepository}>
        <MatchContextProvider repository={mockMatchRepository}>
          <AddMatchWidgetForm />
        </MatchContextProvider>
      </MatchesWidgetsContextProvider>
    );

    const showFormButton = await screen.findByRole("button", { name: /Añadir/i });
    await userEvent.click(showFormButton);

    const input = await screen.findByLabelText(/ID/i);
    await userEvent.type(input, match.id.toString());

    const submitButton = await screen.findByRole("button", { name: /Añadir/i });
    await userEvent.click(submitButton);

    const newShowFormButton = await screen.findByRole("button", { name: /Añadir/i });

    expect(newShowFormButton).toBeInTheDocument();
    expect(mockMatchWidgetRepository.save).toHaveBeenCalledWith(newMatchWidget);
  });

  it("show error when ID is invalid", async () => {
    renderWithRouter(
      <MatchesWidgetsContextProvider repository={mockMatchWidgetRepository}>
        <MatchContextProvider repository={mockMatchRepository}>
          <AddMatchWidgetForm />
        </MatchContextProvider>
      </MatchesWidgetsContextProvider>
    );

    const showFormButton = await screen.findByRole("button", { name: /Añadir/i });
    await userEvent.click(showFormButton);

    const input = await screen.findByLabelText(/ID/i);
    await userEvent.type(input, "INVALID_ID");

    const submitButton = await screen.findByRole("button", { name: /Añadir/i });
    await userEvent.click(submitButton);

    const error = await screen.findByText(/ID no válido/i);

    expect(error).toBeInTheDocument();
  });

  it("show error when ID is already added", async () => {
    const matchWidget = MatchWidgetMother.create();

    mockMatchWidgetRepository.getAll.mockResolvedValue([matchWidget]);

    renderWithRouter(
      <MatchesWidgetsContextProvider repository={mockMatchWidgetRepository}>
        <MatchContextProvider repository={mockMatchRepository}>
          <AddMatchWidgetForm />
        </MatchContextProvider>
      </MatchesWidgetsContextProvider>
    );

    const showFormButton = await screen.findByRole("button", { name: /Añadir/i });
    await userEvent.click(showFormButton);

    const input = await screen.findByLabelText(/ID/i);
    await userEvent.type(input, matchWidget.id.toString());

    const submitButton = await screen.findByRole("button", { name: /Añadir/i });
    await userEvent.click(submitButton);

    const error = await screen.findByText(/El partido ya está añadido/i);

    expect(error).toBeInTheDocument();
  });

  it("show error when ID is not found", async () => {
    mockMatchRepository.get.mockResolvedValue(null);

    renderWithRouter(
      <MatchesWidgetsContextProvider repository={mockMatchWidgetRepository}>
        <MatchContextProvider repository={mockMatchRepository}>
          <AddMatchWidgetForm />
        </MatchContextProvider>
      </MatchesWidgetsContextProvider>
    );

    const showFormButton = await screen.findByRole("button", { name: /Añadir/i });
    await userEvent.click(showFormButton);

    const input = await screen.findByLabelText(/ID/i);
    await userEvent.type(input, "999");

    const submitButton = await screen.findByRole("button", { name: /Añadir/i });
    await userEvent.click(submitButton);

    const error = await screen.findByText(/El ID no corresponde a ningún partido/i);

    expect(error).toBeInTheDocument();
  });
});