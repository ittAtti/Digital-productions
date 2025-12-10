export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export enum AgentStatus {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface AgentTask {
  id: string;
  name: string;
  description: string;
  prompt: string;
  result: string | null;
  status: AgentStatus;
}
