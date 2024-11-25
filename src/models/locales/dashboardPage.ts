export interface IDashboardPageContent {
  title: string;
  userSection: {
    title: string;
    userName: string;
  },
  vehicleCard: {
    title: string;
    carName: string;
    carNumber: string;
  },
  callsSection: {
    title: string;
    text: string;
    language: string;
    dateTime: string;
  }
}