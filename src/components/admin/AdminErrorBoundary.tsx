import { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props { children: ReactNode }
interface State { hasError: boolean; error: Error | null }

/**
 * Catches render/commit errors anywhere inside the admin area so a bug
 * (e.g. an invalid Radix `<SelectItem value="">`) shows a recoverable
 * error screen instead of unmounting the whole page to a blank white screen.
 */
export class AdminErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[AdminErrorBoundary]', error, info);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-lg w-full bg-white border border-red-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900">Something broke in the admin UI</h2>
              <p className="text-sm text-gray-600 mt-1">
                The page crashed while rendering. The error has been logged to the browser console. Try the buttons below — if it keeps happening, copy the error from DevTools and send it over.
              </p>
              {this.state.error && (
                <pre className="mt-3 text-[11px] bg-gray-50 border rounded p-2 overflow-x-auto text-red-700 font-mono">
                  {this.state.error.message}
                </pre>
              )}
              <div className="flex gap-2 mt-4">
                <Button onClick={this.reset} variant="outline" size="sm">Try again</Button>
                <Button onClick={() => (window.location.href = '/admin')} size="sm">Go to dashboard</Button>
                <Button onClick={() => window.location.reload()} variant="ghost" size="sm">Reload page</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
