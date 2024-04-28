import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./sections/layout/Layout";
import { MatchesWidgetsList } from "./sections/matches-widgets/MatchesWidgetsList";
import { MatchDetails } from "./sections/match-details/MatchDetails";

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <MatchesWidgetsList />
			},
			{
				path: '/matches/:matchId',
				element: <MatchDetails />
			}
		]
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}