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
    return (
      <section className="view-recovery" role="alert">
        <span><AlertTriangle size={24} /></span>
        <p>Demo view interrupted</p>
        <h1>This section could not open cleanly.</h1>
        <small>Your shared demo data is still safe. Return to the overview or refresh this view.</small>
        <div>
          <button type="button" onClick={() => { window.location.hash = "#overview"; }}><ArrowLeft size={16} />Back to overview</button>
          <button type="button" onClick={() => window.location.reload()}><RefreshCw size={16} />Refresh view</button>
        </div>
      </section>
    );
  }
}
