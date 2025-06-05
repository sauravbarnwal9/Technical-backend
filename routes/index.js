import authRoutes from './authRoute.js';
import budgetRoutes from './budgetRoutes.js';
import summaryRoutes from './summaryRoute.js';
import transactionRoutes from './transactionRoute.js';

export const Routes = [
    ...authRoutes,
    ...budgetRoutes,
    ...summaryRoutes,
    ...transactionRoutes
]