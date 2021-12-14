import type {ReportData} from '../../types/internal';

export const printReport = async (reportData: ReportData): Promise<void> => {
  void (await Promise.resolve(reportData));
};
