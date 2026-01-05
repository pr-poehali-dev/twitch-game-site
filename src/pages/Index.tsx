import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Stream {
  id: number;
  game: string;
  viewers: number;
  duration: string;
  thumbnail: string;
}

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  time: string;
}

const Index = () => {
  const [isLive, setIsLive] = useState(true);
  const [viewers, setViewers] = useState(1247);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, user: 'GamerPro', message: 'Отличная игра! 🔥', time: '19:42' },
    { id: 2, user: 'StreamFan', message: 'Когда следующий стрим?', time: '19:43' },
    { id: 3, user: 'NightWolf', message: 'Поддерживаю! GG', time: '19:44' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const recentStreams: Stream[] = [
    { id: 1, game: 'Valorant', viewers: 1523, duration: '3:24:15', thumbnail: '🎮' },
    { id: 2, game: 'CS2', viewers: 892, duration: '2:15:30', thumbnail: '🔫' },
    { id: 3, game: 'Dota 2', viewers: 2105, duration: '4:12:48', thumbnail: '⚔️' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg: ChatMessage = {
        id: chatMessages.length + 1,
        user: 'Ты',
        message: newMessage,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages([...chatMessages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="border-b border-border/40 backdrop-blur-lg bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Tv" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              wuskar999
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur animate-scale-in">
              <div className="relative aspect-video bg-black">
                <iframe
                  src="https://player.twitch.tv/?video=2661833645&parent=localhost&parent=poehali.dev&autoplay=false"
                  className="w-full h-full"
                  allowFullScreen
                  frameBorder="0"
                />
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg pointer-events-none">
                  <Icon name="Eye" size={16} className="text-white" />
                  <span className="text-white font-medium">{viewers.toLocaleString()}</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Стрим wuskar999 🔥</h2>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Gamepad2" size={16} />
                        <span>Valorant</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        <span>Начало в 20:00</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-secondary">
                    <Icon name="Heart" size={18} className="mr-2" />
                    Подписаться
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">FPS</Badge>
                  <Badge variant="secondary">Соревновательный</Badge>
                  <Badge variant="secondary">РУС</Badge>
                </div>
              </div>
            </Card>

            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Icon name="History" size={24} />
                Последние стримы
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {recentStreams.map((stream, index) => (
                  <Card
                    key={stream.id}
                    className="group cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-slide-in overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-5xl relative overflow-hidden">
                      {stream.thumbnail}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                      <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur px-2 py-1 rounded text-xs text-white font-medium">
                        {stream.duration}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="font-semibold group-hover:text-primary transition-colors">
                        {stream.game}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Eye" size={14} />
                        <span>{stream.viewers.toLocaleString()} зрителей</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="h-[calc(100vh-12rem)] flex flex-col border-border/40 bg-card/50 backdrop-blur animate-scale-in sticky top-24">
              <div className="p-4 border-b border-border/40">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Icon name="MessageSquare" size={20} />
                  Чат стрима
                </h3>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="animate-slide-in p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-primary">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="p-4 border-t border-border/40">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Написать сообщение..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="bg-gradient-to-r from-primary to-secondary">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>

        <Card className="mt-8 p-6 border-red-500/50 bg-red-950/20 backdrop-blur animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="ShieldAlert" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-400 mb-1">⛔ Запрещенный список</h3>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-red-400">Шилову Александру</span> запрещено посещать стримы
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-12 grid md:grid-cols-3 gap-6 animate-fade-in">
          <Card className="p-6 text-center border-border/40 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={24} className="text-white" />
            </div>
            <h4 className="font-bold text-xl mb-2">12.5K</h4>
            <p className="text-sm text-muted-foreground">Подписчиков</p>
          </Card>
          <Card className="p-6 text-center border-border/40 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="TrendingUp" size={24} className="text-white" />
            </div>
            <h4 className="font-bold text-xl mb-2">156</h4>
            <p className="text-sm text-muted-foreground">Часов эфира</p>
          </Card>
          <Card className="p-6 text-center border-border/40 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Trophy" size={24} className="text-white" />
            </div>
            <h4 className="font-bold text-xl mb-2">Top 500</h4>
            <p className="text-sm text-muted-foreground">Valorant рейтинг</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;