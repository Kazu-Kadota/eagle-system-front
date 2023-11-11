import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { VehicleAnalysisType } from 'src/constants/analysis';
import { PlateHistoryFormData } from 'src/schemas/plateHistory';
import type { AnalysisVehicleForm } from 'src/schemas/vehicles';
import type { AnalisysType } from 'src/types/analysis';
import type { UserType } from 'src/types/auth';
import type { SelectItem } from 'src/types/util';

export interface VehiclesFormProps {
  analysisTypeLoading: AnalisysType | null;
  register: UseFormRegister<AnalysisVehicleForm>;
  registerPlateHistory: UseFormRegister<PlateHistoryFormData>;
  vehicleAnalysisType: VehicleAnalysisType;
  onChangeVehicleAnalysisType: (value: string) => void;
  analysisType?: AnalisysType;
  errors: any;
  userType?: UserType;
  onRequestAnalysis: () => void;
  onRequestPlateHistoryAnalysis: () => void;
  addVehicleForm: () => void;
  removeVehicleForm: (index: number) => void;
  companiesSelectItems: SelectItem[];
  companiesLoading: boolean;
  vehiclesLength: number;
  errorsPlateHistory: FieldErrors<PlateHistoryFormData>;
  index: number;
}
