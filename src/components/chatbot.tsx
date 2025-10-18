'use client';

import { useState } from 'react';
import { CornerDownLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { hardwareChat } from '@/ai/flows/hardware-chat-flow';

type Message = {
  text: string;
  isUser: boolean;
};

const quickReplies = [
  'Show best gaming PC builds under ₹50,000',
  'Compare Intel vs AMD processors',
  'Suggest compatible components',
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const userMessage: Message = { text, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await hardwareChat(text);
      const botMessage: Message = { text: response, isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage: Message = {
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="max-w-3xl mx-auto shadow-2xl rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Zap className="text-primary" />
          AI Hardware Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] overflow-y-auto pr-4 space-y-4 rounded-lg border bg-muted/50 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                message.isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-sm rounded-2xl px-4 py-2 shadow ${
                  message.isUser
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-background rounded-bl-none'
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-sm rounded-2xl px-4 py-3 shadow bg-background rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex gap-2">
            {quickReplies.map((reply) => (
              <Button
                key={reply}
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => handleSend(reply)}
                disabled={isLoading}
              >
                {reply}
              </Button>
            ))}
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Ask about CPUs, GPUs, compatibility..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="pr-12"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
            >
              <CornerDownLeft size={16} />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
