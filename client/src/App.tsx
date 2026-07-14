import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import JournalEditor from "./pages/JournalEditor";
import Analysis from "./pages/Analysis";
import History from "./pages/History";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import { ROUTES } from "./routes";


function Router() {
  return (
    <Switch>
      <Route path={ROUTES.HOME} component={Landing} />
      <Route path={ROUTES.DASHBOARD} component={Dashboard} />
      <Route path="/journal/:id" component={JournalEditor} />
      <Route path="/analysis/:id" component={Analysis} />
      <Route path={ROUTES.HISTORY} component={History} />
      <Route path={ROUTES.INSIGHTS} component={Insights} />
      <Route path={ROUTES.SETTINGS} component={Settings} />
      <Route path={ROUTES.NOT_FOUND} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        switchable
      >
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
