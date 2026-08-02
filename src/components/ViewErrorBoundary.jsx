import { Component } from "react";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

export default class ViewErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.failed) {
      this.setState({ failed: false });
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const fr = typeof document !== "undefined" && document.documentElement.lang === "fr";
    return (
      <section className="view-recovery" role="alert">
        <span><AlertTriangle size={24} /></span>
        <p>{fr ? "Vue temporairement interrompue" : "View temporarily interrupted"}</p>
        <h1>{fr ? "Cette section ne s’est pas ouverte correctement." : "This section could not open cleanly."}</h1>
        <small>{fr ? "Vos données sont conservées. Revenez à la vue d’ensemble ou actualisez cette page." : "Your data is safe. Return to the overview or refresh this view."}</small>
        <div>
          <button type="button" onClick={() => { window.location.hash = "#overview"; }}><ArrowLeft size={16} />{fr ? "Retour à la vue d’ensemble" : "Back to overview"}</button>
          <button type="button" onClick={() => window.location.reload()}><RefreshCw size={16} />{fr ? "Actualiser la vue" : "Refresh view"}</button>
        </div>
      </section>
    );
  }
}
