import { useContext } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";

import LoginPage from "./pages/authPages/LoginPage/LoginPage";

import { AuthProvider, AuthContext } from "./context/auth";
import ResearchesPage from "./pages/ResearchesPage/ResearchesPage";
import QuestionnairesPage from "./pages/questionnairePage/QuestionnairesPage";
import QuestionsPage from "./pages/questionPage/QuestionsPage";
import AlternativesPage from "./pages/alternativesPage/AlternativesPage";
import SigninPage from "./pages/authPages/signinPage/SigninPage";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando...</div>;
    }
    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<SigninPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            exact
            path="/pesquisas"
            element={
              <Private>
                <ResearchesPage />
              </Private>
            }
          />
          <Route
            exact
            path="/pesquisas/:researchId/filtros"
            element={
              <Private>
                <ResearchesPage />
              </Private>
            }
          />
          <Route
            path="/pesquisas/:researchId/questionarios"
            element={
              <Private>
                <QuestionnairesPage />
              </Private>
            }
          />
          <Route
            path="/pesquisas/:researchId/questionarios/:questionnaireId/questoes"
            element={
              <Private>
                <QuestionsPage />
              </Private>
            }
          />
          <Route
            path="/pesquisas/:researchId/questionarios/:questionnaireId/questoes/:questionId/alternativas"
            element={
              <Private>
                <AlternativesPage />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
