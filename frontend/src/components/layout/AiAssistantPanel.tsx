import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIAssistantPanelProps {
  isOpen: boolean
  onToggle: () => void
}

export default function AIAssistantPanel({ isOpen, onToggle }: AIAssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hi! I'm your AI financial assistant. I can help you track expenses, analyze spending patterns, provide budget recommendations, and answer questions about your finances. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response with typing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getAIResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("expense") || lowerInput.includes("spending")) {
      return "Your total expenses this month are $5,230.80. Your largest expense category is Housing at $1,800 (34.4% of total expenses). Food & Dining follows at $650 (12.4%). Would you like me to analyze any specific category or suggest ways to optimize your spending?"
    } else if (lowerInput.includes("budget") || lowerInput.includes("recommendation")) {
      return "Based on your spending patterns, here are my recommendations:\n\n• You're spending 62% of your income, which is healthy\n• Consider increasing emergency fund contributions by $200/month\n• Your housing costs are well within the 30% rule\n• Entertainment spending has increased 15% - consider setting a monthly limit\n\nWould you like a detailed budget plan?"
    } else if (lowerInput.includes("savings") || lowerInput.includes("goal")) {
      return "Great question about savings! You're currently 68% towards your $50,000 savings goal with $34,000 saved. At your current savings rate of $3,219/month, you'll reach your goal in approximately 5 months.\n\nTips to accelerate:\n• Reduce dining out by $100/month\n• Consider a high-yield savings account\n• Set up automatic transfers on payday"
    } else if (lowerInput.includes("income")) {
      return "Your monthly income is $8,450, showing a healthy 12.5% increase from last month. This includes:\n• Primary salary: $7,500\n• Side income: $650\n• Investment returns: $300\n\nYour income growth is trending positively. Would you like suggestions on optimizing your additional income streams?"
    } else if (lowerInput.includes("debt") || lowerInput.includes("loan")) {
      return "Currently tracking $1,200 in credit card debt. Based on your payment history:\n• Minimum payment: $35/month\n• Recommended payment: $200/month\n• Payoff timeline at current rate: 6 months\n\nI recommend paying more than the minimum to save on interest. Would you like a debt payoff strategy?"
    } else if (lowerInput.includes("net worth")) {
      return "Your net worth is $142,350.25, up 8.1% from last month! This includes:\n• Assets: $165,550 (cash, investments, property)\n• Liabilities: $23,200 (loans, credit cards)\n\nYour net worth has grown consistently over the past 7 months. The trend shows excellent financial health!"
    } else {
      return "I can help you with:\n• Expense analysis and categorization\n• Budget recommendations and planning\n• Savings goal tracking and optimization\n• Income and debt management\n• Net worth analysis\n• Financial insights and trends\n\nWhat specific area would you like to explore? You can ask questions like 'How much did I spend on food?' or 'Should I increase my savings rate?'"
    }
  }

  if (!isOpen) {
    return (
      <div className="w-12 bg-white dark:bg-[#0F0F12] border-l border-gray-200 dark:border-[#1F1F23] flex flex-col flex-shrink-0">
        <button
          onClick={onToggle}
          className="p-3 hover:bg-gray-100 dark:hover:bg-[#1F1F23] transition-colors border-b border-gray-200 dark:border-[#1F1F23]"
          title="Open AI Assistant"
        >
          <Maximize2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div className="flex-1 flex items-center justify-center">
          <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 bg-white dark:bg-[#0F0F12] border-l border-gray-200 dark:border-[#1F1F23] flex flex-col flex-shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-[#1F1F23] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
        </div>
        <button
          onClick={onToggle}
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded"
          title="Minimize AI Assistant"
        >
          <Minimize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex gap-3", message.type === "user" ? "justify-end" : "justify-start")}>
            {message.type === "assistant" && (
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[85%] p-3 rounded-lg text-sm leading-relaxed",
                message.type === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-gray-100 dark:bg-[#1F1F23] text-gray-900 dark:text-white rounded-bl-sm",
              )}
            >
              <div className="whitespace-pre-line">{message.content}</div>
              <div className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
            {message.type === "user" && (
              <div className="w-8 h-8 bg-gray-100 dark:bg-[#1F1F23] rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="bg-gray-100 dark:bg-[#1F1F23] p-3 rounded-lg rounded-bl-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-[#1F1F23] flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            placeholder="Ask about your finances..."
            className="flex-1 px-3 py-2 border border-gray-200 dark:border-[#1F1F23] rounded-lg bg-white dark:bg-[#0F0F12] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  )
}
