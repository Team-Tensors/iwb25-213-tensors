import { useState } from "react";
import { TrendingUp, AlertTriangle, Target, DollarSign, Clock, CheckCircle, X } from "lucide-react";
import { Button } from "../ui/button";

interface Insight {
  id: string;
  type: "recommendation" | "warning" | "goal" | "trend";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "spending" | "saving" | "investment" | "debt" | "budgeting";
  impact: number;
  actionRequired: boolean;
  createdAt: string;
}

interface InsightsListProps {
  insights: Insight[];
  onDismissInsight: (insightId: string) => void;
  onMarkActionComplete: (insightId: string) => void;
}

const priorityColors = {
  high: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  low: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
};

const categoryColors = {
  spending: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  saving: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  investment: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  debt: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  budgeting: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
};

export default function InsightsList({ insights, onDismissInsight, onMarkActionComplete }: InsightsListProps) {
  const [filter, setFilter] = useState<"all" | "high" | "action-required">("all");

  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case "recommendation":
        return <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case "goal":
        return <Target className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case "trend":
        return <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      default:
        return <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const filteredInsights = insights.filter(insight => {
    switch (filter) {
      case "high":
        return insight.priority === "high";
      case "action-required":
        return insight.actionRequired;
      default:
        return true;
    }
  });

  const sortedInsights = filteredInsights.sort((a, b) => {
    // Sort by priority first (high -> medium -> low)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    
    // Then by impact score (descending)
    if (a.impact !== b.impact) {
      return b.impact - a.impact;
    }
    
    // Finally by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Insights</h3>
          <div className="flex space-x-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "high" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("high")}
            >
              High Priority
            </Button>
            <Button
              variant={filter === "action-required" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("action-required")}
            >
              Action Required
            </Button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sortedInsights.map((insight) => (
          <div key={insight.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="flex-shrink-0 mt-1">
                  {getInsightTypeIcon(insight.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {insight.title}
                    </h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[insight.priority]}`}>
                      {insight.priority}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[insight.category]}`}>
                      {insight.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {insight.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>Impact: {insight.impact}/10</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(insight.createdAt).toLocaleDateString()}</span>
                    </div>
                    {insight.actionRequired && (
                      <div className="flex items-center space-x-1 text-orange-500 dark:text-orange-400">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Action Required</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {insight.actionRequired && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMarkActionComplete(insight.id)}
                    className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    title="Mark action as complete"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismissInsight(insight.id)}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  title="Dismiss insight"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedInsights.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            {filter === "all" 
              ? "No insights available. Your AI assistant is analyzing your financial data."
              : `No ${filter === "high" ? "high priority" : "action required"} insights found.`
            }
          </div>
        </div>
      )}
    </div>
  );
}
