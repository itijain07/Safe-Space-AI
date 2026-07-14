export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  JOURNAL: "/journal/new",

  HISTORY: "/history",
  INSIGHTS: "/insights",
  SETTINGS: "/settings",

  NOT_FOUND: "/404",
};

export const getJournalRoute = (id: string) => `/journal/${id}`;

export const getAnalysisRoute = (id: string) => `/analysis/${id}`;