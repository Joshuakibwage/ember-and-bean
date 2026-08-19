'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type Props = {
  children: React.ReactNode;
  title?: string;
  message?: string;
};

type State = { hasError: boolean };

class ErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.error("Section failed to load:", error);
    }

    reset = () => this.setState({ hasError: false });

    render() {
        if (this.state.hasError) {
        return (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-destructive">
                Something went wrong
            </p>
            <h3 className="mt-2 font-heading text-xl text-foreground">
                {this.props.title ?? "This section couldn't load."}
            </h3>
            {this.props.message && (
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">{this.props.message}</p>
            )}
            <Button onClick={this.reset} size="sm" className="mt-5 gap-2 rounded-full">
                <RotateCcw size={14} />
                Try again
            </Button>
            </div>
        );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;