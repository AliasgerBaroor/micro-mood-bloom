
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart2, Users, Sparkles } from 'lucide-react';

const AdminDashboardPage = () => {
  const stats = [
    { title: 'Total Users', value: '245', icon: Users },
    { title: 'Mood Entries', value: '1,892', icon: BarChart2 },
    { title: 'Micro-habits', value: '54', icon: Sparkles },
  ];

  // Recent moods data
  const recentMoods = [
    { user: 'John Doe', mood: 'Happy', timestamp: '2 hours ago' },
    { user: 'Jane Smith', mood: 'Anxious', timestamp: '3 hours ago' },
    { user: 'Mike Johnson', mood: 'Calm', timestamp: '5 hours ago' },
    { user: 'Sarah Williams', mood: 'Hopeful', timestamp: '6 hours ago' },
    { user: 'David Brown', mood: 'Stressed', timestamp: '7 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="flex flex-row items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Mood Logs</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Mood</TableHead>
                <TableHead>Logged</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentMoods.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.user}</TableCell>
                  <TableCell>{entry.mood}</TableCell>
                  <TableCell>{entry.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
