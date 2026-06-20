import { Switch, Route } from "wouter";
import { ProtectedRoute } from "@/lib/protected-route";
import ChatPage from "@/pages/chat-page";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={ChatPage} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}
