import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm your EduManage AI assistant. I can help you with:\n• Fee status and payment queries\n• Hostel fees and room information\n• Exam schedules and results\n• Attendance records\n• General college information\n\nHow can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickQuestions = [
    { id: 1, text: "What's my fee status?", icon: "CreditCard" },
    { id: 2, text: "Show my attendance", icon: "Calendar" },
    { id: 3, text: "Upcoming exams", icon: "BookOpen" },
    { id: 4, text: "Hostel fee details", icon: "Building" },
    { id: 5, text: "Library hours", icon: "Library" },
    { id: 6, text: "Contact support", icon: "MessageCircle" },
  ];

  const mockResponses = {
    fee: {
      content:
        "Based on your account, here's your fee status:\n\n💰 Total Fees: ₹85,000\n✅ Paid Amount: ₹65,000\n⚠️ Pending: ₹20,000\n📅 Due Date: 15/12/2025\n\nYou can pay online through the fee payment portal. Would you like me to guide you to the payment page?",
      delay: 1500,
    },
    attendance: {
      content:
        "Here's your current attendance summary:\n\n📊 Overall Attendance: 78%\n📚 Mathematics: 85%\n🔬 Physics: 72%\n🧪 Chemistry: 80%\n💻 Computer Science: 90%\n\n⚠️ Note: You need minimum 75% attendance. Physics attendance is below requirement. Would you like tips to improve attendance?",
      delay: 1800,
    },
    exam: {
      content:
        "Your upcoming exams:\n\n📝 Advanced Mathematics\n📅 25/10/2025, 09:00 AM\n📍 Exam Hall A, Seat A-45\n\n🔬 Physics Laboratory\n📅 27/10/2025, 02:00 PM\n📍 Physics Lab 2, Station 12\n\n💻 Computer Programming\n📅 30/10/2025, 10:00 AM\n📍 Computer Lab 1, PC-23\n\nWould you like me to help you download admit cards?",
      delay: 2000,
    },
    hostel: {
      content:
        "Your hostel information:\n\n🏠 Room: A-204, Block A\n👥 Room Type: Double Sharing\n💰 Monthly Fee: ₹8,500\n⚠️ Pending Amount: ₹8,500\n📅 Due: 30/10/2025\n\n🏠 Roommate: Rahul Kumar (B.Tech CSE)\n\nAll facilities are active. Need help with hostel fee payment?",
      delay: 1600,
    },
    library: {
      content:
        "📚 Library Information:\n\n🕒 Working Hours:\nMonday-Friday: 8:00 AM - 10:00 PM\nSaturday: 9:00 AM - 6:00 PM\nSunday: 10:00 AM - 5:00 PM\n\n📖 Current Status:\n• Books Issued: 3/5\n• Overdue Books: 0\n• Fine Amount: ₹0\n\n🆕 New arrivals in Computer Science and Mathematics sections available!",
      delay: 1400,
    },
    support: {
      content:
        "📞 Contact Support:\n\n🎓 Academic Office: +91-9876543210\n🏠 Hostel Office: +91-9876543211\n💰 Fee Office: +91-9876543212\n📚 Library: +91-9876543213\n\n📧 Email: support@edumanage.edu.in\n\n🕒 Office Hours: 9:00 AM - 5:00 PM\n\nFor urgent issues, you can also visit the respective offices directly.",
      delay: 1200,
    },
    default: {
      content:
        "I understand you're asking about that topic. I can help you with:\n\n• Fee status and payments\n• Attendance records\n• Exam schedules\n• Hostel information\n• Library services\n• Contact information\n\nCould you please be more specific about what you'd like to know?",
      delay: 1000,
    },
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  const generateResponse = (userMessage) => {
    const message = userMessage?.toLowerCase();

    if (
      message?.includes("fee") ||
      message?.includes("payment") ||
      message?.includes("₹")
    ) {
      return mockResponses?.fee;
    } else if (
      message?.includes("attendance") ||
      message?.includes("present") ||
      message?.includes("absent")
    ) {
      return mockResponses?.attendance;
    } else if (
      message?.includes("exam") ||
      message?.includes("test") ||
      message?.includes("schedule")
    ) {
      return mockResponses?.exam;
    } else if (
      message?.includes("hostel") ||
      message?.includes("room") ||
      message?.includes("accommodation")
    ) {
      return mockResponses?.hostel;
    } else if (
      message?.includes("library") ||
      message?.includes("book") ||
      message?.includes("hours")
    ) {
      return mockResponses?.library;
    } else if (
      message?.includes("support") ||
      message?.includes("contact") ||
      message?.includes("help") ||
      message?.includes("phone")
    ) {
      return mockResponses?.support;
    } else {
      return mockResponses?.default;
    }
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    const response = generateResponse(messageText);

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: response?.content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, response?.delay);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question?.text);
  };

  const handleKeyPress = (e) => {
    if (e?.key === "Enter" && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content) => {
    return content?.split("\n")?.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content?.split("\n")?.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-elevated hover:shadow-lg transition-all duration-200"
        >
          <Icon name={isOpen ? "X" : "MessageCircle"} size={24} />
        </Button>
      </div>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-card border border-border rounded-lg shadow-elevated z-50 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} color="white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-card-foreground">
                  EduManage AI
                </h4>
                <p className="text-xs text-muted-foreground">
                  Online • Ready to help
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${
                  message?.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message?.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-card-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {formatMessage(message?.content)}
                  </p>
                  <p
                    className={`text-xs mt-1 opacity-70 ${
                      message?.type === "user"
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message?.timestamp?.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-card-foreground p-3 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages?.length === 1 && (
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">
                Quick questions:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions?.map((question) => (
                  <button
                    key={question?.id}
                    onClick={() => handleQuickQuestion(question)}
                    className="flex items-center space-x-2 p-2 text-left text-xs bg-muted/50 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Icon
                      name={question?.icon}
                      size={12}
                      className="text-primary"
                    />
                    <span className="truncate">{question?.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e?.target?.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                disabled={isTyping}
              />
              <Button
                variant="default"
                size="icon"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage?.trim() || isTyping}
                className="w-10 h-10"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
