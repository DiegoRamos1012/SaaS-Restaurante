import { MenuItem, OrderItem, Order, Table } from '../types/types';

// Dados mockados de itens do menu
export const mockMenuItems: MenuItem[] = [
  {
    id: 'item-001',
    name: 'Bruschetta Italiana',
    description: 'Pão italiano tostado com tomate, manjericão e azeite',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&auto=format&fit=crop',
    price: 25.9,
    categories: ['Entradas', 'Vegano'],
    availability: 'all-day',
    preparationTime: 10,
    allergens: ['Glúten'],
    onSale: false
  },
  {
    id: 'item-002',
    name: 'Carpaccio de Carne',
    description: 'Finas fatias de carne crua com molho de alcaparras e parmesão',
    image: 'https://images.unsplash.com/photo-1648402746000-f1664ec53bd3?w=600&auto=format&fit=crop',
    price: 32.9,
    categories: ['Entradas', 'Pratos Principais'],
    availability: 'all-day',
    preparationTime: 5,
    allergens: ['Leite'],
    onSale: false
  },
  {
    id: 'item-003',
    name: 'Salada Caprese',
    description: 'Mussarela de búfala, tomate e manjericão ao molho pesto',
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&auto=format&fit=crop',
    price: 28.9,
    categories: ['Entradas', 'Vegano'],
    availability: 'all-day',
    preparationTime: 8,
    allergens: ['Leite', 'Nozes'],
    onSale: true,
    salePrice: 24.9
  },
  {
    id: 'item-004',
    name: 'Risoto de Funghi',
    description: 'Arroz arbóreo com mix de cogumelos e parmesão',
    image: 'https://images.unsplash.com/photo-1633964913876-955d6d6f0902?w=600&auto=format&fit=crop',
    price: 49.9,
    categories: ['Pratos Principais', 'Vegano'],
    availability: 'dinner',
    preparationTime: 25,
    allergens: ['Leite'],
    addons: [
      { id: 'add-001', name: 'Trufas Extras', price: 15 },
      { id: 'add-002', name: 'Parmesão Extra', price: 5 }
    ],
    onSale: false
  },
  {
    id: 'item-005',
    name: 'Filé Mignon ao Molho Madeira',
    description: 'Medalhão de filé com molho madeira e batatas rústicas',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&auto=format&fit=crop',
    price: 62.9,
    categories: ['Pratos Principais'],
    availability: 'dinner',
    preparationTime: 30,
    addons: [
      { id: 'add-003', name: 'Molho Extra', price: 3 },
      { id: 'add-004', name: 'Porção de Arroz', price: 8 }
    ],
    onSale: false
  },
  {
    id: 'item-006',
    name: 'Salmão Grelhado',
    description: 'Filé de salmão com crosta de ervas e legumes salteados',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop',
    price: 58.9,
    categories: ['Pratos Principais'],
    availability: 'dinner',
    preparationTime: 25,
    allergens: ['Camarão'],
    addons: [
      { id: 'add-005', name: 'Purê de Batata', price: 8 },
      { id: 'add-006', name: 'Legumes Extras', price: 6 }
    ],
    onSale: true,
    salePrice: 49.9
  },
  {
    id: 'item-007',
    name: 'Tiramisu',
    description: 'Clássica sobremesa italiana com café e cacau',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop',
    price: 22.9,
    categories: ['Sobremesas'],
    availability: 'all-day',
    preparationTime: 0, // pré-preparado
    allergens: ['Leite', 'Ovos', 'Glúten'],
    onSale: false
  },
  {
    id: 'item-008',
    name: 'Cheesecake de Frutas Vermelhas',
    description: 'Torta cremosa com cobertura de frutas vermelhas',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop',
    price: 24.9,
    categories: ['Sobremesas'],
    availability: 'all-day',
    preparationTime: 0, // pré-preparado
    allergens: ['Leite', 'Ovos', 'Glúten'],
    onSale: false
  },
  {
    id: 'item-009',
    name: 'Vinho Tinto',
    description: 'Taça de vinho tinto seco da casa',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop',
    price: 28.9,
    categories: ['Bebidas'],
    availability: 'all-day',
    preparationTime: 2,
    onSale: false
  },
  {
    id: 'item-010',
    name: 'Água com Gás',
    description: 'Garrafa de 500ml',
    image: 'https://images.unsplash.com/photo-1564601111459-7c18fe959eab?w=600&auto=format&fit=crop',
    price: 6.9,
    categories: ['Bebidas'],
    availability: 'all-day',
    preparationTime: 1,
    onSale: false
  },
  {
    id: 'item-011',
    name: 'Suco Natural',
    description: 'Diversos sabores de frutas frescas',
    image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=600&auto=format&fit=crop',
    price: 12.9,
    categories: ['Bebidas', 'Vegano'],
    availability: 'all-day',
    preparationTime: 5,
    onSale: false
  },
];

// Dados mockados de itens de pedido
export const mockOrderItems: OrderItem[] = [
  {
    menuItemId: 'item-001',
    name: 'Bruschetta Italiana',
    quantity: 2,
    unitPrice: 25.9,
    total: 51.8
  },
  {
    menuItemId: 'item-005',
    name: 'Filé Mignon ao Molho Madeira',
    quantity: 1,
    unitPrice: 62.9,
    addons: [
      { id: 'add-003', name: 'Molho Extra', price: 3 }
    ],
    total: 65.9
  },
  {
    menuItemId: 'item-006',
    name: 'Salmão Grelhado',
    quantity: 1,
    unitPrice: 49.9, // preço promocional
    total: 49.9
  },
  {
    menuItemId: 'item-009',
    name: 'Vinho Tinto',
    quantity: 2,
    unitPrice: 28.9,
    total: 57.8
  },
  {
    menuItemId: 'item-007',
    name: 'Tiramisu',
    quantity: 1,
    unitPrice: 22.9,
    total: 22.9
  },
  {
    menuItemId: 'item-003',
    name: 'Salada Caprese',
    quantity: 1,
    unitPrice: 24.9, // preço promocional
    total: 24.9
  }
];

// Dados mockados de pedidos
export const mockOrders: Order[] = [
  {
    id: 'order-001',
    tableNumber: 5,
    items: [
      mockOrderItems[0],
      mockOrderItems[1],
      mockOrderItems[3]
    ],
    total: 175.5,
    createdAt: new Date('2023-10-15T19:30:00')
  },
  {
    id: 'order-002',
    tableNumber: 3,
    items: [
      mockOrderItems[2],
      mockOrderItems[4]
    ],
    total: 72.8,
    createdAt: new Date('2023-10-15T20:15:00')
  },
  {
    id: 'order-003',
    tableNumber: 8,
    items: [
      mockOrderItems[0],
      mockOrderItems[5],
      mockOrderItems[3]
    ],
    total: 134.5,
    createdAt: new Date('2023-10-16T19:45:00')
  }
];

// Dados mockados de mesas
export const mockTables: Table[] = [
  {
    id: 'table-001',
    number: 1,
    qrCodeUrl: 'https://example.com/qr/table1'
  },
  {
    id: 'table-002',
    number: 2,
    qrCodeUrl: 'https://example.com/qr/table2'
  },
  {
    id: 'table-003',
    number: 3,
    qrCodeUrl: 'https://example.com/qr/table3'
  },
  {
    id: 'table-004',
    number: 4,
    qrCodeUrl: 'https://example.com/qr/table4'
  },
  {
    id: 'table-005',
    number: 5,
    qrCodeUrl: 'https://example.com/qr/table5'
  },
  {
    id: 'table-006',
    number: 6,
    qrCodeUrl: 'https://example.com/qr/table6'
  },
  {
    id: 'table-007',
    number: 7,
    qrCodeUrl: 'https://example.com/qr/table7'
  },
  {
    id: 'table-008',
    number: 8,
    qrCodeUrl: 'https://example.com/qr/table8'
  },
  {
    id: 'table-009',
    number: 9,
    qrCodeUrl: 'https://example.com/qr/table9'
  },
  {
    id: 'table-010',
    number: 10,
    qrCodeUrl: 'https://example.com/qr/table10'
  }
];
