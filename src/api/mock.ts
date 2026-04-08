export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'Аблямова Нигора', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Исроилoв Жамшид', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Иванов Иван', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Петров Петр', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'Сидоров Сидор', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: '6', name: 'Смирнова Анна', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: '7', name: 'Кузнецова Мария', avatar: 'https://i.pravatar.cc/150?u=7' },
];

const mockTeams: Team[] = [
  { id: 't1', name: 'Frontend Team' },
  { id: 't2', name: 'Backend Team' },
  { id: 't3', name: 'Design Team' },
  { id: 't4', name: 'QA Team' },
  { id: 't5', name: 'Management' },
];

export const fetchAssignees = async (query: string, isTeam: boolean): Promise<(User | Team)[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const lowerQuery = query.toLowerCase();
  if (isTeam) {
    return mockTeams.filter((team) => team.name.toLowerCase().includes(lowerQuery));
  } else {
    return mockUsers.filter((user) => user.name.toLowerCase().includes(lowerQuery));
  }
};

export const fetchThemes = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [
    { id: 'th1', name: 'Models' },
    { id: 'th2', name: 'UI/UX' },
    { id: 'th3', name: 'Backend' },
    { id: 'th4', name: 'Bugfix' },
  ];
};

export const fetchTags = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [
    { id: 'tg1', name: 'XL', color: 'bg-red-500' },
    { id: 'tg2', name: 'Очень важно', color: 'bg-orange-400' },
    { id: 'tg3', name: 'Срочно', color: 'bg-red-600' },
    { id: 'tg4', name: 'Планово', color: 'bg-blue-400' },
  ];
};

export const fetchPeriodicities = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return [
    { id: 'p1', name: 'Каждый день' },
    { id: 'p2', name: 'Каждую неделю' },
    { id: 'p3', name: 'Каждый месяц' },
  ];
};
